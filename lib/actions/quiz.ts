"use server";

import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import { db, schema } from "@/lib/db/client";
import { currentUserId } from "@/lib/user";
import type { Question } from "@/lib/db/schema";
import type { QuestionType, RefType } from "@/lib/content/types";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Questions for a quiz session. Single local user → returning the answer key to
 * the client is fine (instant self-grading). Optionally filter by type / limit.
 */
export async function getQuizQuestions(opts?: {
  types?: QuestionType[];
  limit?: number;
}): Promise<Question[]> {
  const all = await db.select().from(schema.questions);
  let pool = all;
  if (opts?.types && opts.types.length > 0) {
    pool = pool.filter((q) => opts.types!.includes(q.type));
  }
  const shuffled = shuffle(pool);
  return opts?.limit ? shuffled.slice(0, opts.limit) : shuffled;
}

export async function recordAttempt(input: {
  refType: RefType;
  refId: string;
  isCorrect?: boolean;
  score?: number;
  userAnswer?: unknown;
  timeTakenSec?: number;
  sessionId?: string;
}): Promise<void> {
  const userId = currentUserId();
  await db.insert(schema.attempts).values({
    id: nanoid(),
    userId,
    refType: input.refType,
    refId: input.refId,
    isCorrect: input.isCorrect ?? null,
    score: input.score ?? null,
    userAnswer: (input.userAnswer as object) ?? null,
    timeTakenSec: input.timeTakenSec ?? null,
    sessionId: input.sessionId ?? null,
    createdAt: Date.now(),
  });
}

export async function startSession(mode: string): Promise<string> {
  const userId = currentUserId();
  const id = nanoid();
  await db.insert(schema.sessions).values({
    id,
    userId,
    mode,
    startedAt: Date.now(),
  });
  return id;
}

export async function finishSession(
  id: string,
  scorecard: Record<string, unknown>,
): Promise<void> {
  await db
    .update(schema.sessions)
    .set({ endedAt: Date.now(), scorecard })
    .where(eq(schema.sessions.id, id));
}
