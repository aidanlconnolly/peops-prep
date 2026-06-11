"use server";

import { nanoid } from "nanoid";
import { and, desc, eq } from "drizzle-orm";
import { db, schema } from "@/lib/db/client";
import { currentUserId } from "@/lib/user";
import type { Competency } from "@/lib/content/types";
import type { Story } from "@/lib/db/schema";

export async function listStories(): Promise<Story[]> {
  const userId = await currentUserId();
  return db
    .select()
    .from(schema.stories)
    .where(eq(schema.stories.userId, userId))
    .orderBy(desc(schema.stories.createdAt));
}

export async function addStory(input: {
  title: string;
  competencies: Competency[];
  body: string;
}): Promise<void> {
  const userId = await currentUserId();
  if (!input.title.trim() || !input.body.trim()) return;
  await db.insert(schema.stories).values({
    id: nanoid(),
    userId,
    title: input.title.trim(),
    competencies: input.competencies,
    body: input.body.trim(),
    createdAt: Date.now(),
  });
}

export async function deleteStory(id: string): Promise<void> {
  const userId = await currentUserId();
  await db
    .delete(schema.stories)
    .where(and(eq(schema.stories.id, id), eq(schema.stories.userId, userId)));
}
