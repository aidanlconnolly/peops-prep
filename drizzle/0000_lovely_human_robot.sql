CREATE TABLE `attempts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`ref_type` text NOT NULL,
	`ref_id` text NOT NULL,
	`is_correct` integer,
	`score` real,
	`user_answer` text,
	`time_taken_sec` integer,
	`ai_feedback` text,
	`session_id` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `attempts_user_idx` ON `attempts` (`user_id`,`ref_type`);--> statement-breakpoint
CREATE TABLE `behavioral_prompts` (
	`id` text PRIMARY KEY NOT NULL,
	`competency` text NOT NULL,
	`prompt` text NOT NULL,
	`rubric` text NOT NULL,
	`example_strong_answer` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `cases` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`sector` text NOT NULL,
	`company_context` text NOT NULL,
	`prompt` text NOT NULL,
	`rubric` text NOT NULL,
	`exhibits` text DEFAULT '[]' NOT NULL,
	`model_answer` text DEFAULT '' NOT NULL,
	`difficulty` integer DEFAULT 2 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cases_slug_unique` ON `cases` (`slug`);--> statement-breakpoint
CREATE TABLE `concepts` (
	`id` text PRIMARY KEY NOT NULL,
	`topic_id` text NOT NULL,
	`front` text NOT NULL,
	`back` text NOT NULL,
	`difficulty` integer DEFAULT 2 NOT NULL,
	`tags` text DEFAULT '[]' NOT NULL,
	FOREIGN KEY (`topic_id`) REFERENCES `topics`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `concepts_topic_idx` ON `concepts` (`topic_id`);--> statement-breakpoint
CREATE TABLE `firms` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`model` text NOT NULL,
	`mba_accessibility` text NOT NULL,
	`interview_process` text NOT NULL,
	`comp` text NOT NULL,
	`recruiting_notes` text DEFAULT '' NOT NULL,
	`fit_for_me` text DEFAULT '' NOT NULL,
	`order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `firms_slug_unique` ON `firms` (`slug`);--> statement-breakpoint
CREATE TABLE `fsrs_cards` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`ref_type` text NOT NULL,
	`ref_id` text NOT NULL,
	`fsrs_due` integer NOT NULL,
	`fsrs_state` text NOT NULL,
	`reps` integer DEFAULT 0 NOT NULL,
	`lapses` integer DEFAULT 0 NOT NULL,
	`last_reviewed_at` integer,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `fsrs_user_ref_idx` ON `fsrs_cards` (`user_id`,`ref_type`,`ref_id`);--> statement-breakpoint
CREATE INDEX `fsrs_user_due_idx` ON `fsrs_cards` (`user_id`,`fsrs_due`);--> statement-breakpoint
CREATE TABLE `ops_technicals` (
	`id` text PRIMARY KEY NOT NULL,
	`prompt` text NOT NULL,
	`ideal_answer` text NOT NULL,
	`rubric` text NOT NULL,
	`tags` text DEFAULT '[]' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `questions` (
	`id` text PRIMARY KEY NOT NULL,
	`topic_id` text NOT NULL,
	`type` text NOT NULL,
	`prompt` text NOT NULL,
	`choices` text,
	`answer` text NOT NULL,
	`explanation` text DEFAULT '' NOT NULL,
	`difficulty` integer DEFAULT 2 NOT NULL,
	`time_limit_sec` integer,
	`tags` text DEFAULT '[]' NOT NULL,
	FOREIGN KEY (`topic_id`) REFERENCES `topics`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `questions_topic_idx` ON `questions` (`topic_id`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`mode` text NOT NULL,
	`started_at` integer NOT NULL,
	`ended_at` integer,
	`scorecard` text
);
--> statement-breakpoint
CREATE TABLE `stories` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`competencies` text DEFAULT '[]' NOT NULL,
	`body` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `topics` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`domain` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `topics_slug_unique` ON `topics` (`slug`);--> statement-breakpoint
CREATE TABLE `user_stats` (
	`user_id` text PRIMARY KEY NOT NULL,
	`streak_days` integer DEFAULT 0 NOT NULL,
	`last_active_date` text,
	`readiness_score` integer DEFAULT 0 NOT NULL,
	`mastery_by_topic` text DEFAULT '{}' NOT NULL,
	`updated_at` integer NOT NULL
);
