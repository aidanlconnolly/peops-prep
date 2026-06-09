import { asc } from "drizzle-orm";
import { db, schema } from "@/lib/db/client";

export async function listTopics() {
  return db.select().from(schema.topics).orderBy(asc(schema.topics.order));
}

export async function listConcepts() {
  return db.select().from(schema.concepts);
}

export async function listQuestions() {
  return db.select().from(schema.questions);
}

export async function listCases() {
  return db.select().from(schema.cases).orderBy(asc(schema.cases.title));
}

export async function getCaseBySlug(slug: string) {
  const rows = await db
    .select()
    .from(schema.cases)
    .where(eqSlug(schema.cases.slug, slug))
    .limit(1);
  return rows[0] ?? null;
}

export async function listFirms() {
  return db.select().from(schema.firms).orderBy(asc(schema.firms.order));
}

export async function getFirmBySlug(slug: string) {
  const rows = await db
    .select()
    .from(schema.firms)
    .where(eqSlug(schema.firms.slug, slug))
    .limit(1);
  return rows[0] ?? null;
}

export async function listBehavioral() {
  return db.select().from(schema.behavioralPrompts);
}

export async function listTechnicals() {
  return db.select().from(schema.opsTechnicals);
}

// Small helper so we don't import `eq` in every caller.
import { eq, type Column } from "drizzle-orm";
function eqSlug(col: Column, slug: string) {
  return eq(col, slug);
}
