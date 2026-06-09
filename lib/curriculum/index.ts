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

/**
 * Where each unit's skills get practiced — surfaced as a "Practice" deep-link
 * on the lesson/checkpoint completion screens, connecting Learn to the rest
 * of the app.
 */
export const PRACTICE_LINKS: Record<string, { href: string; label: string }> = {
  "returns-foundations": { href: "/drills", label: "Drill the returns math" },
  "paper-lbo": { href: "/drills/paper-lbo", label: "Run the paper-LBO walker" },
  "return-attribution": { href: "/drills/paper-lbo", label: "See the return waterfall" },
  "value-creation-levers": { href: "/cases", label: "Work an operational case" },
  "diagnosing-a-portco": { href: "/cases", label: "Work an operational case" },
  "influence-without-authority": { href: "/behavioral", label: "Practice behaviorals" },
  "star-and-stories": { href: "/behavioral", label: "Build your story bank" },
  "operational-technicals": { href: "/behavioral", label: "Practice ops technicals" },
  "firm-intel": { href: "/firms", label: "Browse firms & take the quiz" },
  "the-superday": { href: "/superday", label: "Run the Mock Superday" },
};

export type NextStep =
  | {
      kind: "lesson";
      unitSlug: string;
      unitTitle: string;
      unitIcon: string;
      lessonSlug: string;
      lessonTitle: string;
      href: string;
    }
  | { kind: "checkpoint"; unitSlug: string; unitTitle: string; unitIcon: string; href: string }
  | { kind: "done" };

/** Compute which unit slugs are unlocked given the completed units. */
export function unlockedUnitSlugs(completedUnits: Set<string>): Set<string> {
  const stageUnlocked: Record<number, boolean> = { 1: true };
  for (const s of STAGES) {
    if (s.number === 1) continue;
    const prev = UNIT_OUTLINE.filter((u) => u.stage === s.number - 1);
    stageUnlocked[s.number] = prev.length > 0 && prev.every((u) => completedUnits.has(u.slug));
  }
  const open = new Set<string>();
  for (const stage of STAGES) {
    const stageUnits = UNITS.filter((u) => u.stage === stage.number);
    stageUnits.forEach((u, i) => {
      const unitOpen =
        stageUnlocked[stage.number] && (i === 0 || completedUnits.has(stageUnits[i - 1].slug));
      if (unitOpen) open.add(u.slug);
    });
  }
  return open;
}

/** The next thing to do on the journey — for the dashboard "Continue" card. */
export function getNextStep(
  completedLessons: string[],
  completedUnits: string[],
): NextStep {
  const doneL = new Set(completedLessons);
  const doneU = new Set(completedUnits);
  const open = unlockedUnitSlugs(doneU);
  for (const unit of UNITS) {
    if (!open.has(unit.slug) || doneU.has(unit.slug)) continue;
    const nextLesson = unit.lessons.find((l) => !doneL.has(l.slug));
    if (nextLesson) {
      return {
        kind: "lesson",
        unitSlug: unit.slug,
        unitTitle: unit.title,
        unitIcon: unit.icon,
        lessonSlug: nextLesson.slug,
        lessonTitle: nextLesson.title,
        href: `/learn/${unit.slug}/${nextLesson.slug}`,
      };
    }
    // All lessons done, checkpoint not yet passed.
    return {
      kind: "checkpoint",
      unitSlug: unit.slug,
      unitTitle: unit.title,
      unitIcon: unit.icon,
      href: `/learn/${unit.slug}/checkpoint`,
    };
  }
  return { kind: "done" };
}
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
