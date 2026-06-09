/**
 * Idempotent content seed. Stable ids mean re-running replaces content without
 * disturbing user progress (fsrs_cards / attempts reference content by stable
 * string id, not an enforced FK). Run: `npm run seed` (source .env.local first).
 *
 * Uses relative imports so `tsx` runs it without tsconfig path resolution.
 */
import { db, schema } from "../lib/db/client";
import {
  TOPICS,
  CONCEPTS,
  QUESTIONS,
  CASES,
  BEHAVIORAL_PROMPTS,
  OPS_TECHNICALS,
  FIRMS,
} from "../seed";

async function main() {
  console.log("Seeding PeOps Prep content…");

  // Delete children before parents (concepts/questions FK → topics).
  await db.delete(schema.concepts);
  await db.delete(schema.questions);
  await db.delete(schema.topics);
  await db.delete(schema.cases);
  await db.delete(schema.behavioralPrompts);
  await db.delete(schema.opsTechnicals);
  await db.delete(schema.firms);

  await db.insert(schema.topics).values(TOPICS);
  await db.insert(schema.concepts).values(CONCEPTS);
  await db.insert(schema.questions).values(QUESTIONS);
  await db.insert(schema.cases).values(CASES);
  await db.insert(schema.behavioralPrompts).values(BEHAVIORAL_PROMPTS);
  await db.insert(schema.opsTechnicals).values(OPS_TECHNICALS);
  await db.insert(schema.firms).values(FIRMS);

  console.log(
    `Seeded: ${TOPICS.length} topics, ${CONCEPTS.length} concepts, ` +
      `${QUESTIONS.length} questions, ${CASES.length} cases, ` +
      `${BEHAVIORAL_PROMPTS.length} behavioral prompts, ` +
      `${OPS_TECHNICALS.length} ops technicals, ${FIRMS.length} firms.`,
  );
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
