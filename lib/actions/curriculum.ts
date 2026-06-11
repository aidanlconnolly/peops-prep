"use server";

import { nanoid } from "nanoid";
import { and, desc, eq } from "drizzle-orm";
import { db, schema } from "@/lib/db/client";
import { currentUserId } from "@/lib/user";
import { findUnit, totalAuthoredLessons } from "@/lib/curriculum";

/* ── Lesson progress ─────────────────────────────────────────────────────── */

export async function markLessonDone(args: {
  unitSlug: string;
  lessonSlug: string;
  score?: number;
}): Promise<{ ok: boolean }> {
  const userId = await currentUserId();
  const now = Date.now();
  const score = args.score ?? 100;
  const existing = await db
    .select({ id: schema.lessonProgress.id, score: schema.lessonProgress.score })
    .from(schema.lessonProgress)
    .where(
      and(
        eq(schema.lessonProgress.userId, userId),
        eq(schema.lessonProgress.lessonSlug, args.lessonSlug),
      ),
    )
    .limit(1);
  if (existing.length > 0) {
    await db
      .update(schema.lessonProgress)
      .set({ score: Math.max(existing[0].score, score), completedAt: now })
      .where(eq(schema.lessonProgress.id, existing[0].id));
  } else {
    await db.insert(schema.lessonProgress).values({
      id: nanoid(),
      userId,
      unitSlug: args.unitSlug,
      lessonSlug: args.lessonSlug,
      score,
      completedAt: now,
    });
  }
  return { ok: true };
}

export async function getAllLessonProgress() {
  const userId = await currentUserId();
  return db
    .select()
    .from(schema.lessonProgress)
    .where(eq(schema.lessonProgress.userId, userId));
}

/* ── Checkpoint attempts ─────────────────────────────────────────────────── */

export async function recordCheckpoint(args: {
  unitSlug: string;
  score: number;
}): Promise<{ ok: boolean; passed: boolean }> {
  const userId = await currentUserId();
  const unit = findUnit(args.unitSlug);
  const passingPct = unit?.checkpoint.passingPct ?? 80;
  const passed = args.score >= passingPct;
  await db.insert(schema.checkpointAttempts).values({
    id: nanoid(),
    userId,
    unitSlug: args.unitSlug,
    score: args.score,
    passed,
    takenAt: Date.now(),
  });
  return { ok: true, passed };
}

export type CheckpointStatus = {
  unitSlug: string;
  bestScore: number;
  passed: boolean;
};

export async function getAllCheckpointStatus(): Promise<CheckpointStatus[]> {
  const userId = await currentUserId();
  const rows = await db
    .select()
    .from(schema.checkpointAttempts)
    .where(eq(schema.checkpointAttempts.userId, userId))
    .orderBy(desc(schema.checkpointAttempts.takenAt));
  const byUnit = new Map<string, CheckpointStatus>();
  for (const r of rows) {
    const cur = byUnit.get(r.unitSlug);
    if (!cur) {
      byUnit.set(r.unitSlug, { unitSlug: r.unitSlug, bestScore: r.score, passed: r.passed });
    } else {
      byUnit.set(r.unitSlug, {
        unitSlug: r.unitSlug,
        bestScore: Math.max(cur.bestScore, r.score),
        passed: cur.passed || r.passed,
      });
    }
  }
  return Array.from(byUnit.values());
}

/* ── Aggregated roadmap summary ──────────────────────────────────────────── */

export type RoadmapSummary = {
  unitsCompleted: string[];
  lessonsCompleted: string[];
  lessonsDoneCount: number;
  totalAuthoredLessons: number;
};

export async function getRoadmapSummary(): Promise<RoadmapSummary> {
  const [lessons, checkpoints] = await Promise.all([
    getAllLessonProgress(),
    getAllCheckpointStatus(),
  ]);
  const lessonsCompleted = lessons.map((l) => l.lessonSlug);
  const unitsCompleted = checkpoints.filter((c) => c.passed).map((c) => c.unitSlug);
  return {
    unitsCompleted,
    lessonsCompleted,
    lessonsDoneCount: lessonsCompleted.length,
    totalAuthoredLessons: totalAuthoredLessons(),
  };
}
