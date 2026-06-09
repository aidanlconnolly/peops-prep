CREATE TABLE `peops_checkpoint_attempts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`unit_slug` text NOT NULL,
	`score` integer NOT NULL,
	`passed` integer NOT NULL,
	`taken_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `peops_checkpoint_user_unit_idx` ON `peops_checkpoint_attempts` (`user_id`,`unit_slug`);--> statement-breakpoint
CREATE TABLE `peops_lesson_progress` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`unit_slug` text NOT NULL,
	`lesson_slug` text NOT NULL,
	`score` integer DEFAULT 100 NOT NULL,
	`completed_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `peops_lesson_user_slug_idx` ON `peops_lesson_progress` (`user_id`,`lesson_slug`);