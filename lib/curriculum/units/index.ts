import type { Unit } from "../types";
import { UNIT_OPERATING_MODEL } from "./01-operating-model";
import { UNIT_VALUE_CREATION_PLAN } from "./02-value-creation-plan";
import { UNIT_RETURNS_FOUNDATIONS } from "./03-returns-foundations";
import { UNIT_PAPER_LBO } from "./04-paper-lbo";
import { UNIT_RETURN_ATTRIBUTION } from "./05-return-attribution";
import { UNIT_VALUE_CREATION_LEVERS } from "./06-value-creation-levers";
import { UNIT_DIAGNOSING_A_PORTCO } from "./07-diagnosing-a-portco";
import { UNIT_INFLUENCE_WITHOUT_AUTHORITY } from "./08-influence-without-authority";
import { UNIT_STAR_AND_STORIES } from "./09-star-and-stories";
import { UNIT_OPERATIONAL_TECHNICALS } from "./10-operational-technicals";
import { UNIT_FIRM_INTEL } from "./11-firm-intel";
import { UNIT_THE_SUPERDAY } from "./12-the-superday";

/** All fully-authored ("built") units, in roadmap order. */
export const UNITS: Unit[] = [
  // Stage 1 — Foundations
  UNIT_OPERATING_MODEL,
  UNIT_VALUE_CREATION_PLAN,
  UNIT_RETURNS_FOUNDATIONS,
  // Stage 2 — Returns & the paper LBO
  UNIT_PAPER_LBO,
  UNIT_RETURN_ATTRIBUTION,
  // Stage 3 — Operational diagnostics
  UNIT_VALUE_CREATION_LEVERS,
  UNIT_DIAGNOSING_A_PORTCO,
  // Stage 4 — Behavioral & influence
  UNIT_INFLUENCE_WITHOUT_AUTHORITY,
  UNIT_STAR_AND_STORIES,
  // Stage 5 — The interview
  UNIT_OPERATIONAL_TECHNICALS,
  UNIT_FIRM_INTEL,
  UNIT_THE_SUPERDAY,
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
