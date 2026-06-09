/**
 * Drizzle schema. Phase 0 wires a single table so the DB client compiles and
 * the build passes; Phase 1 expands this to the full content + progress model.
 */
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const userStats = sqliteTable("user_stats", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  streakDays: integer("streak_days").notNull().default(0),
  lastActiveDate: text("last_active_date"),
  readinessScore: integer("readiness_score").notNull().default(0),
  masteryByTopic: text("mastery_by_topic", { mode: "json" })
    .$type<Record<string, number>>()
    .default({}),
  updatedAt: integer("updated_at").notNull(),
});

export type UserStats = typeof userStats.$inferSelect;
