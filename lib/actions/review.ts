"use server";

import { nanoid } from "nanoid";
import { and, eq, lte, sql } from "drizzle-orm";
import { db, schema } from "@/lib/db/client";
import { currentUserId } from "@/lib/user";
import {
  applyRating,
  freshCardState,
  previewIntervals,
  type Rating1to4,
} from "@/lib/srs";
import type { RefType } from "@/lib/content/types";

/**
 * Seed a per-user FSRS card for every concept the user doesn't yet have.
 * Idempotent and cheap: one select + one bulk insert of the missing ids.
 */
export async function ensureConceptDeck(): Promise<{ added: number }> {
  const userId = currentUserId();
  const concepts = await db
    .select({ id: schema.concepts.id })
    .from(schema.concepts);

  const existing = await db
    .select({ refId: schema.fsrsCards.refId })
    .from(schema.fsrsCards)
    .where(
      and(
        eq(schema.fsrsCards.userId, userId),
        eq(schema.fsrsCards.refType, "concept"),
      ),
    );
  const have = new Set(existing.map((r) => r.refId));
  const missing = concepts.filter((c) => !have.has(c.id));
  if (missing.length === 0) return { added: 0 };

  const now = Date.now();
  await db.insert(schema.fsrsCards).values(
    missing.map((c) => {
      const state = freshCardState();
      return {
        id: nanoid(),
        userId,
        refType: "concept" as RefType,
        refId: c.id,
        fsrsDue: new Date(state.due).getTime(),
        fsrsState: state,
        reps: 0,
        lapses: 0,
        createdAt: now,
      };
    }),
  );
  return { added: missing.length };
}

/** Generic: enqueue a single ref (e.g. a missed question) into the deck. */
export async function enqueueCard(
  refType: RefType,
  refId: string,
): Promise<void> {
  const userId = currentUserId();
  const existing = await db
    .select({ id: schema.fsrsCards.id })
    .from(schema.fsrsCards)
    .where(
      and(
        eq(schema.fsrsCards.userId, userId),
        eq(schema.fsrsCards.refType, refType),
        eq(schema.fsrsCards.refId, refId),
      ),
    )
    .limit(1);
  if (existing.length > 0) return;

  const state = freshCardState();
  await db.insert(schema.fsrsCards).values({
    id: nanoid(),
    userId,
    refType,
    refId,
    fsrsDue: new Date(state.due).getTime(),
    fsrsState: state,
    reps: 0,
    lapses: 0,
    createdAt: Date.now(),
  });
}

export type DueCard = {
  cardId: string;
  refType: RefType;
  refId: string;
  front: string;
  back: string;
  tags: string[];
  /** Pre-computed next-interval labels for the four rating buttons. */
  intervals: Record<Rating1to4, string>;
};

/** Concept cards currently due (due <= now), oldest first. */
export async function getDueCards(limit = 40): Promise<DueCard[]> {
  const userId = currentUserId();
  const rows = await db
    .select({
      cardId: schema.fsrsCards.id,
      refType: schema.fsrsCards.refType,
      refId: schema.fsrsCards.refId,
      fsrsState: schema.fsrsCards.fsrsState,
      front: schema.concepts.front,
      back: schema.concepts.back,
      tags: schema.concepts.tags,
    })
    .from(schema.fsrsCards)
    .innerJoin(
      schema.concepts,
      eq(schema.fsrsCards.refId, schema.concepts.id),
    )
    .where(
      and(
        eq(schema.fsrsCards.userId, userId),
        eq(schema.fsrsCards.refType, "concept"),
        lte(schema.fsrsCards.fsrsDue, Date.now()),
      ),
    )
    .orderBy(schema.fsrsCards.fsrsDue)
    .limit(limit);

  return rows.map((r) => ({
    cardId: r.cardId,
    refType: r.refType,
    refId: r.refId,
    front: r.front,
    back: r.back,
    tags: r.tags,
    intervals: previewIntervals(r.fsrsState),
  }));
}

/** Apply an FSRS rating to a card and reschedule. */
export async function rateCard(
  cardId: string,
  rating: Rating1to4,
): Promise<void> {
  const userId = currentUserId();
  const rows = await db
    .select()
    .from(schema.fsrsCards)
    .where(
      and(
        eq(schema.fsrsCards.id, cardId),
        eq(schema.fsrsCards.userId, userId),
      ),
    )
    .limit(1);
  if (rows.length === 0) return;

  const { state, dueMs, lapses } = applyRating(rows[0].fsrsState, rating);
  await db
    .update(schema.fsrsCards)
    .set({
      fsrsState: state,
      fsrsDue: dueMs,
      reps: rows[0].reps + 1,
      lapses,
      lastReviewedAt: Date.now(),
    })
    .where(eq(schema.fsrsCards.id, cardId));
}

export type DeckStats = { total: number; due: number };

export async function getDeckStats(): Promise<DeckStats> {
  const userId = currentUserId();
  const [{ total }] = await db
    .select({ total: sql<number>`count(*)` })
    .from(schema.fsrsCards)
    .where(eq(schema.fsrsCards.userId, userId));
  const [{ due }] = await db
    .select({ due: sql<number>`count(*)` })
    .from(schema.fsrsCards)
    .where(
      and(
        eq(schema.fsrsCards.userId, userId),
        lte(schema.fsrsCards.fsrsDue, Date.now()),
      ),
    );
  return { total: Number(total), due: Number(due) };
}
