/**
 * Curriculum dispatcher — the single import surface for the structured journey.
 * (No language dimension: PeOps Prep has one curriculum.)
 */
import type { Unit, Stage, UnitPreview } from "./types";
import {
  UNITS,
  findUnit,
  findLesson,
  findUnitByLessonSlug,
} from "./units/index";
import { STAGES, UNIT_OUTLINE } from "./stages";

export type { Unit, Stage, UnitPreview };
export type { Lesson, LessonPage } from "./types";

export function getUnits(): Unit[] {
  return UNITS;
}

export function getStages(): Stage[] {
  return STAGES;
}

export function getUnitOutline(): UnitPreview[] {
  return UNIT_OUTLINE;
}

/** Slugs of units that are fully authored (interactive), vs preview-only. */
export function getBuiltUnitSlugs(): Set<string> {
  return new Set(UNITS.map((u) => u.slug));
}

export { findUnit, findLesson, findUnitByLessonSlug };

/** Total authored lessons across all built units. */
export function totalAuthoredLessons(): number {
  return UNITS.reduce((s, u) => s + u.lessons.length, 0);
}
