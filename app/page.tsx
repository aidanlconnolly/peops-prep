import Link from "next/link";
import {
  Layers,
  Target,
  BookOpen,
  MessagesSquare,
  Gauge,
  Building2,
  ArrowRight,
  TrendingUp,
  Flame,
  GraduationCap,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { ReadinessTrend } from "@/components/dashboard/ReadinessTrend";
import { ensureConceptDeck } from "@/lib/actions/review";
import { getDashboard } from "@/lib/actions/dashboard";
import type { Domain } from "@/lib/content/types";

export const dynamic = "force-dynamic";

const DOMAIN_ROUTE: Record<Domain, string> = {
  fundamentals: "/learn",
  returns: "/drills",
  diagnostics: "/cases",
  behavioral: "/behavioral",
  technicals: "/behavioral",
  firm: "/firms",
};

const DOMAINS = [
  { href: "/learn", label: "Fundamentals", desc: "Operating-partner model, 100-day plans, EBITDA bridges.", icon: Layers },
  { href: "/drills", label: "Returns & Drills", desc: "Paper LBO, MOIC/IRR, the three return levers.", icon: Target },
  { href: "/cases", label: "Operational Cases", desc: "Diagnose a PortCo, prioritize value-creation levers.", icon: BookOpen },
  { href: "/behavioral", label: "Behavioral", desc: "Influence without authority, STAR, ops commitment.", icon: MessagesSquare },
  { href: "/superday", label: "Mock Superday", desc: "The full Capstone-style chain, timed and scored.", icon: Gauge },
  { href: "/firms", label: "Firm Intel", desc: "Capstone, Bain Capital, Vista, Blackstone & more.", icon: Building2 },
];

function readinessTone(r: number): string {
  if (r >= 80) return "text-success";
  if (r >= 65) return "text-primary";
  if (r >= 45) return "text-warning";
  return "text-muted-foreground";
}

export default async function DashboardPage() {
  await ensureConceptDeck();
  const d = await getDashboard();

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          PeOps Prep
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
          Train for the operations seat.
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Spaced repetition, timed drills, AI-graded cases, and a mock Superday —
          built for private equity portfolio-operations and value-creation
          interviews.
        </p>
      </header>

      {/* Continue learning */}
      {d.nextStep.kind !== "done" ? (
        <Link href={d.nextStep.href}>
          <Card className="flex flex-row items-center gap-4 border-primary/30 bg-accent/30 p-5 transition hover:border-primary/50">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-2xl text-primary-foreground">
              {d.nextStep.unitIcon}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wide text-primary">
                {d.nextStep.kind === "checkpoint" ? "Next — unit checkpoint" : "Continue learning"}
              </p>
              <p className="truncate font-medium text-foreground">
                {d.nextStep.kind === "checkpoint"
                  ? `${d.nextStep.unitTitle} checkpoint`
                  : d.nextStep.lessonTitle}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {d.nextStep.unitTitle} · {d.lessonsDone}/{d.totalLessons} lessons done
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
              {d.nextStep.kind === "checkpoint" ? "Take it" : "Continue"}
              <ArrowRight className="h-4 w-4" />
            </span>
          </Card>
        </Link>
      ) : (
        <Card className="flex flex-row items-center gap-4 border-success/30 bg-success/5 p-5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-success/10 text-success">
            <GraduationCap className="h-6 w-6" />
          </span>
          <div className="flex-1">
            <p className="font-medium text-foreground">Curriculum complete</p>
            <p className="text-xs text-muted-foreground">
              All {d.totalLessons} lessons done. Keep sharp with Drills, Cases, and the Mock Superday.
            </p>
          </div>
        </Card>
      )}

      {/* Readiness + queue + streak */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Readiness
          </p>
          <p className={`mt-2 font-mono text-4xl font-semibold tnum ${readinessTone(d.readiness)}`}>
            {d.readiness}
            <span className="text-base text-muted-foreground">/100</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{d.verdict}</p>
        </Card>
        <Link href="/review">
          <Card className="p-5 transition hover:border-primary/40">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Due today
            </p>
            <p className="mt-2 font-mono text-4xl font-semibold tnum text-foreground">
              {d.due}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {d.totalCards} cards in your deck.
            </p>
          </Card>
        </Link>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Streak
          </p>
          <p className="mt-2 flex items-center gap-1.5 font-mono text-4xl font-semibold tnum text-foreground">
            {d.streak}
            {d.streak > 0 && <Flame className="h-6 w-6 text-warning" />}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {d.streak === 1 ? "day" : "days"} active in a row.
          </p>
        </Card>
      </div>

      {/* Mastery by domain */}
      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="mb-4 text-sm font-semibold text-muted-foreground">
            Mastery by domain
          </h2>
          <div className="space-y-3">
            {d.masteryByDomain.map((m) => (
              <Link key={m.domain} href={DOMAIN_ROUTE[m.domain]} className="block">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{m.label}</span>
                    <span className="tnum text-muted-foreground">
                      {m.touched ? `${m.mastery}%` : "—"}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className={`h-full rounded-full ${
                        m.mastery >= 70 ? "bg-success" : m.mastery >= 40 ? "bg-primary" : "bg-warning"
                      }`}
                      style={{ width: `${m.touched ? m.mastery : 0}%` }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        <Card className="flex flex-col p-5">
          <h2 className="mb-4 text-sm font-semibold text-muted-foreground">
            Readiness trend
          </h2>
          {d.trend.length >= 2 ? (
            <ReadinessTrend data={d.trend} />
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 py-8 text-center">
              <TrendingUp className="h-6 w-6 text-muted-foreground" />
              <p className="max-w-xs text-sm text-muted-foreground">
                Complete timed quiz sessions and mock Superdays to chart your
                readiness over time.
              </p>
            </div>
          )}
        </Card>
      </section>

      {/* Weak-area surfacing */}
      {d.weakAreas.length > 0 && (
        <Card className="border-warning/30 bg-warning/5 p-5">
          <h2 className="mb-1 text-sm font-semibold text-warning">
            Sharpen these next
          </h2>
          <p className="mb-3 text-xs text-muted-foreground">
            Your lowest-mastery domains — drill them to move the readiness needle.
          </p>
          <div className="flex flex-wrap gap-2">
            {d.weakAreas.map((m) => (
              <Link
                key={m.domain}
                href={DOMAIN_ROUTE[m.domain]}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-sm transition hover:border-primary/40"
              >
                {m.label}
                <span className="tnum text-xs text-muted-foreground">{m.mastery}%</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </Card>
      )}

      {/* Domain grid */}
      <section>
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
          Train by domain
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {DOMAINS.map((dom) => {
            const Icon = dom.icon;
            return (
              <Link key={dom.href} href={dom.href}>
                <Card className="group flex h-full flex-row items-start gap-4 p-5 transition hover:border-primary/40">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-medium text-foreground">{dom.label}</h3>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{dom.desc}</p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
