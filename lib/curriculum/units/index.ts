import type { Unit } from "../types";
import { UNIT_OPERATING_MODEL } from "./01-operating-model";
import { UNIT_VALUE_CREATION_PLAN } from "./02-value-creation-plan";
import { UNIT_RETURNS_FOUNDATIONS } from "./03-returns-foundations";

/** All fully-authored ("built") units, in roadmap order. */
export const UNITS: Unit[] = [
  UNIT_OPERATING_MODEL,
  UNIT_VALUE_CREATION_PLAN,
  UNIT_RETURNS_FOUNDATIONS,
];

export function findUnit(slug: string): Unit | undefined {
  return UNITS.find((u) => u.slug === slug);
}

export function findLesson(
  unitSlug: string,
  lessonSlug: string,
): { unit: Unit; lessonIndex: number } | undefined {
  const unit = findUnit(unitSlug);
  if (!unit) return undefined;
  const lessonIndex = unit.lessons.findIndex((l) => l.slug === lessonSlug);
  if (lessonIndex < 0) return undefined;
  return { unit, lessonIndex };
}

export function findUnitByLessonSlug(lessonSlug: string): Unit | undefined {
  return UNITS.find((u) => u.lessons.some((l) => l.slug === lessonSlug));
}
