/**
 * Drizzle schema. Content tables are the source of truth for the curriculum
 * (loaded from typed seed files); user-state tables hold per-user progress for
 * the single local user (see lib/user.ts). JSON columns are typed via the
 * shared shapes in lib/content/types.ts.
 */
import {
  sqliteTable,
  text,
  integer,
  real,
  index,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import type {
  Domain,
  QuestionType,
  QuestionAnswer,
  Choice,
  Rubric,
  Exhibit,
  RefType,
  Competency,
  OpsModel,
  InterviewProcess,
  FirmComp,
} from "@/lib/content/types";

// ── FSRS serialized card state (mirrors ts-fsrs Card, ISO strings for dates) ──
export type FsrsCardState = {
  due: string;
  stability: number;
  difficulty: number;
  elapsed_days: number;
  scheduled_days: number;
  reps: number;
  lapses: number;
  state: number;
  last_review?: string;
};

// ── Content ───────────────────────────────────────────────────────────────────

export const topics = sqliteTable("topics", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  domain: text("domain").$type<Domain>().notNull(),
  description: text("description").notNull().default(""),
  order: integer("order").notNull().default(0),
});

export const concepts = sqliteTable(
  "concepts",
  {
    id: text("id").primaryKey(),
    topicId: text("topic_id")
      .notNull()
      .references(() => topics.id),
    front: text("front").notNull(),
    back: text("back").notNull(),
    difficulty: integer("difficulty").notNull().default(2),
    tags: text("tags", { mode: "json" }).$type<string[]>().notNull().default([]),
  },
  (t) => [index("concepts_topic_idx").on(t.topicId)],
);

export const questions = sqliteTable(
  "questions",
  {
    id: text("id").primaryKey(),
    topicId: text("topic_id")
      .notNull()
      .references(() => topics.id),
    type: text("type").$type<QuestionType>().notNull(),
    prompt: text("prompt").notNull(),
    choices: text("choices", { mode: "json" }).$type<Choice[] | null>(),
    answer: text("answer", { mode: "json" }).$type<QuestionAnswer>().notNull(),
    explanation: text("explanation").notNull().default(""),
    difficulty: integer("difficulty").notNull().default(2),
    timeLimitSec: integer("time_limit_sec"),
    tags: text("tags", { mode: "json" }).$type<string[]>().notNull().default([]),
  },
  (t) => [index("questions_topic_idx").on(t.topicId)],
);

export const cases = sqliteTable("cases", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  sector: text("sector").notNull(),
  companyContext: text("company_context").notNull(),
  prompt: text("prompt").notNull(),
  rubric: text("rubric", { mode: "json" }).$type<Rubric>().notNull(),
  exhibits: text("exhibits", { mode: "json" }).$type<Exhibit[]>().notNull().default([]),
  modelAnswer: text("model_answer").notNull().default(""),
  difficulty: integer("difficulty").notNull().default(2),
});

export const behavioralPrompts = sqliteTable("behavioral_prompts", {
  id: text("id").primaryKey(),
  competency: text("competency").$type<Competency>().notNull(),
  prompt: text("prompt").notNull(),
  rubric: text("rubric", { mode: "json" }).$type<Rubric>().notNull(),
  exampleStrongAnswer: text("example_strong_answer").notNull().default(""),
});

export const opsTechnicals = sqliteTable("ops_technicals", {
  id: text("id").primaryKey(),
  prompt: text("prompt").notNull(),
  idealAnswer: text("ideal_answer").notNull(),
  rubric: text("rubric", { mode: "json" }).$type<Rubric>().notNull(),
  tags: text("tags", { mode: "json" }).$type<string[]>().notNull().default([]),
});

export const firms = sqliteTable("firms", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  model: text("model").$type<OpsModel>().notNull(),
  mbaAccessibility: text("mba_accessibility").notNull(),
  interviewProcess: text("interview_process", { mode: "json" })
    .$type<InterviewProcess>()
    .notNull(),
  comp: text("comp", { mode: "json" }).$type<FirmComp>().notNull(),
  recruitingNotes: text("recruiting_notes").notNull().default(""),
  fitForMe: text("fit_for_me").notNull().default(""),
  order: integer("order").notNull().default(0),
});

// ── User state / progress ──────────────────────────────────────────────────────

export const fsrsCards = sqliteTable(
  "fsrs_cards",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    refType: text("ref_type").$type<RefType>().notNull(),
    refId: text("ref_id").notNull(),
    fsrsDue: integer("fsrs_due").notNull(),
    fsrsState: text("fsrs_state", { mode: "json" }).$type<FsrsCardState>().notNull(),
    reps: integer("reps").notNull().default(0),
    lapses: integer("lapses").notNull().default(0),
    lastReviewedAt: integer("last_reviewed_at"),
    createdAt: integer("created_at").notNull(),
  },
  (t) => [
    uniqueIndex("fsrs_user_ref_idx").on(t.userId, t.refType, t.refId),
    index("fsrs_user_due_idx").on(t.userId, t.fsrsDue),
  ],
);

export const attempts = sqliteTable(
  "attempts",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    refType: text("ref_type").$type<RefType>().notNull(),
    refId: text("ref_id").notNull(),
    isCorrect: integer("is_correct", { mode: "boolean" }),
    score: real("score"),
    userAnswer: text("user_answer", { mode: "json" }),
    timeTakenSec: integer("time_taken_sec"),
    aiFeedback: text("ai_feedback"),
    sessionId: text("session_id"),
    createdAt: integer("created_at").notNull(),
  },
  (t) => [index("attempts_user_idx").on(t.userId, t.refType)],
);

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  mode: text("mode").notNull(), // "quiz" | "superday" | "paper_lbo" | ...
  startedAt: integer("started_at").notNull(),
  endedAt: integer("ended_at"),
  scorecard: text("scorecard", { mode: "json" }).$type<Record<string, unknown>>(),
});

/** Structured-curriculum lesson completion — one row per completed lesson. */
export const lessonProgress = sqliteTable(
  "lesson_progress",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    unitSlug: text("unit_slug").notNull(),
    lessonSlug: text("lesson_slug").notNull(),
    score: integer("score").notNull().default(100),
    completedAt: integer("completed_at").notNull(),
  },
  (t) => [uniqueIndex("lesson_user_slug_idx").on(t.userId, t.lessonSlug)],
);

/** Unit checkpoint attempts — a unit is "complete" once an attempt passes. */
export const checkpointAttempts = sqliteTable(
  "checkpoint_attempts",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    unitSlug: text("unit_slug").notNull(),
    score: integer("score").notNull(),
    passed: integer("passed", { mode: "boolean" }).notNull(),
    takenAt: integer("taken_at").notNull(),
  },
  (t) => [index("checkpoint_user_unit_idx").on(t.userId, t.unitSlug)],
);

/** Reusable behavioral anecdotes the mentor can reference, tagged to competencies. */
export const stories = sqliteTable("stories", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  competencies: text("competencies", { mode: "json" })
    .$type<Competency[]>()
    .notNull()
    .default([]),
  body: text("body").notNull(),
  createdAt: integer("created_at").notNull(),
});

export const userStats = sqliteTable("user_stats", {
  userId: text("user_id").primaryKey(),
  streakDays: integer("streak_days").notNull().default(0),
  lastActiveDate: text("last_active_date"),
  readinessScore: integer("readiness_score").notNull().default(0),
  masteryByTopic: text("mastery_by_topic", { mode: "json" })
    .$type<Record<string, number>>()
    .notNull()
    .default({}),
  updatedAt: integer("updated_at").notNull(),
});

// ── Inferred row types ─────────────────────────────────────────────────────────
export type Topic = typeof topics.$inferSelect;
export type Concept = typeof concepts.$inferSelect;
export type Question = typeof questions.$inferSelect;
export type Case = typeof cases.$inferSelect;
export type BehavioralPrompt = typeof behavioralPrompts.$inferSelect;
export type OpsTechnical = typeof opsTechnicals.$inferSelect;
export type Firm = typeof firms.$inferSelect;
export type FsrsCard = typeof fsrsCards.$inferSelect;
export type Attempt = typeof attempts.$inferSelect;
export type SessionRow = typeof sessions.$inferSelect;
export type UserStats = typeof userStats.$inferSelect;
export type Story = typeof stories.$inferSelect;
export type LessonProgress = typeof lessonProgress.$inferSelect;
export type CheckpointAttempt = typeof checkpointAttempts.$inferSelect;
