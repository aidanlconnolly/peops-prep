"use server";

import { and, eq, isNotNull } from "drizzle-orm";
import { db, schema } from "@/lib/db/client";
import { currentUserId } from "@/lib/user";
import { DOMAIN_LABELS, type Domain } from "@/lib/content/types";

export type DomainMastery = {
  domain: Domain;
  label: string;
  mastery: number; // 0..100
  touched: boolean;
};

export type TrendPoint = { label: string; score: number };

export type DashboardData = {
  readiness: number;
  verdict: string;
  streak: number;
  due: number;
  totalCards: number;
  masteryByDomain: DomainMastery[];
  weakAreas: DomainMastery[];
  trend: TrendPoint[];
  attemptsCount: number;
};

function dayKey(ms: number): string {
  const d = new Date(ms);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function computeStreak(timestamps: number[]): number {
  if (timestamps.length === 0) return 0;
  const days = new Set(timestamps.map(dayKey));
  const today = new Date();
  const todayKey = dayKey(today.getTime());
  const yesterdayKey = dayKey(today.getTime() - 86_400_000);
  // Streak only counts if active today or yesterday.
  if (!days.has(todayKey) && !days.has(yesterdayKey)) return 0;
  let streak = 0;
  const cursor = new Date(today.getTime());
  if (!days.has(todayKey)) cursor.setTime(cursor.getTime() - 86_400_000);
  // count back consecutive days
  for (let i = 0; i < 3650; i++) {
    if (days.has(dayKey(cursor.getTime()))) {
      streak += 1;
      cursor.setTime(cursor.getTime() - 86_400_000);
    } else break;
  }
  return streak;
}

function verdictFor(readiness: number): string {
  if (readiness >= 80) return "Interview-ready";
  if (readiness >= 65) return "On track";
  if (readiness >= 45) return "Developing";
  return "Early days";
}

export async function getDashboard(): Promise<DashboardData> {
  const userId = currentUserId();

  const [topics, questions, attempts, cards, doneSessions] = await Promise.all([
    db.select().from(schema.topics),
    db.select({ id: schema.questions.id, topicId: schema.questions.topicId }).from(schema.questions),
    db.select().from(schema.attempts).where(eq(schema.attempts.userId, userId)),
    db
      .select()
      .from(schema.fsrsCards)
      .where(and(eq(schema.fsrsCards.userId, userId), eq(schema.fsrsCards.refType, "concept"))),
    db
      .select()
      .from(schema.sessions)
      .where(and(eq(schema.sessions.userId, userId), isNotNull(schema.sessions.endedAt))),
  ]);

  const domainOfTopic = new Map(topics.map((t) => [t.id, t.domain as Domain]));
  const domainOfQuestion = new Map(
    questions.map((q) => [q.id, domainOfTopic.get(q.topicId)]),
  );
  // Concepts are loaded via fsrs refId → concept → topic; fetch concept topics.
  const concepts = await db
    .select({ id: schema.concepts.id, topicId: schema.concepts.topicId })
    .from(schema.concepts);
  const domainOfConcept = new Map(
    concepts.map((c) => [c.id, domainOfTopic.get(c.topicId)]),
  );

  // Per-domain question accuracy.
  const qAgg = new Map<Domain, { correct: number; total: number }>();
  for (const a of attempts) {
    if (a.refType !== "question" || a.isCorrect == null) continue;
    const d = domainOfQuestion.get(a.refId);
    if (!d) continue;
    const cur = qAgg.get(d) ?? { correct: 0, total: 0 };
    cur.total += 1;
    if (a.isCorrect) cur.correct += 1;
    qAgg.set(d, cur);
  }

  // Per-domain concept maturity (mature = reviewed at least twice or in Review state).
  const cAgg = new Map<Domain, { mature: number; total: number }>();
  for (const card of cards) {
    const d = domainOfConcept.get(card.refId);
    if (!d) continue;
    const cur = cAgg.get(d) ?? { mature: 0, total: 0 };
    cur.total += 1;
    if (card.reps >= 2 || card.fsrsState.state === 2) cur.mature += 1;
    cAgg.set(d, cur);
  }

  // Per-domain free-response (case/behavioral/technical) average score (0..1).
  const frAgg = new Map<Domain, { sum: number; n: number }>();
  const frDomain: Record<string, Domain> = {
    case: "diagnostics",
    behavioral: "behavioral",
    technical: "technicals",
  };
  for (const a of attempts) {
    const d = frDomain[a.refType];
    if (!d || a.score == null) continue;
    const cur = frAgg.get(d) ?? { sum: 0, n: 0 };
    cur.sum += a.score;
    cur.n += 1;
    frAgg.set(d, cur);
  }

  const domains = Object.keys(DOMAIN_LABELS) as Domain[];
  const masteryByDomain: DomainMastery[] = domains.map((domain) => {
    const signals: number[] = [];
    const q = qAgg.get(domain);
    if (q && q.total > 0) signals.push((q.correct / q.total) * 100);
    const c = cAgg.get(domain);
    if (c && c.total > 0) signals.push((c.mature / c.total) * 100);
    const f = frAgg.get(domain);
    if (f && f.n > 0) signals.push((f.sum / f.n) * 100);
    const touched = signals.length > 0;
    const mastery = touched
      ? Math.round(signals.reduce((a, b) => a + b, 0) / signals.length)
      : 0;
    return { domain, label: DOMAIN_LABELS[domain], mastery, touched };
  });

  // Recent mock-Superday score component.
  const superdays = doneSessions
    .filter((s) => s.mode === "superday" && s.scorecard)
    .sort((a, b) => (b.endedAt ?? 0) - (a.endedAt ?? 0));
  const recentSuperday =
    superdays.length > 0
      ? Number((superdays[0].scorecard as { overall?: number })?.overall ?? 0)
      : null;

  const touchedMasteries = masteryByDomain.filter((m) => m.touched);
  const avgMastery =
    touchedMasteries.length > 0
      ? touchedMasteries.reduce((a, m) => a + m.mastery, 0) / touchedMasteries.length
      : 0;
  const readiness =
    recentSuperday != null
      ? Math.round(0.8 * avgMastery + 0.2 * recentSuperday)
      : Math.round(avgMastery);

  // Trend from completed sessions over time.
  const trend: TrendPoint[] = doneSessions
    .filter((s) => s.scorecard)
    .sort((a, b) => (a.endedAt ?? 0) - (b.endedAt ?? 0))
    .map((s) => {
      const sc = s.scorecard as { overall?: number; total?: number; correct?: number };
      let score = 0;
      if (typeof sc.overall === "number") score = sc.overall;
      else if (sc.total) score = Math.round(((sc.correct ?? 0) / sc.total) * 100);
      const d = new Date(s.endedAt ?? s.startedAt);
      return { label: `${d.getMonth() + 1}/${d.getDate()}`, score };
    })
    .slice(-12);

  const due = cards.filter((c) => c.fsrsDue <= Date.now()).length;
  const streak = computeStreak([
    ...attempts.map((a) => a.createdAt),
    ...cards.filter((c) => c.lastReviewedAt).map((c) => c.lastReviewedAt!),
  ]);

  const weakAreas = [...masteryByDomain]
    .filter((m) => m.touched)
    .sort((a, b) => a.mastery - b.mastery)
    .slice(0, 3);

  return {
    readiness,
    verdict: verdictFor(readiness),
    streak,
    due,
    totalCards: cards.length,
    masteryByDomain,
    weakAreas,
    trend,
    attemptsCount: attempts.length,
  };
}
