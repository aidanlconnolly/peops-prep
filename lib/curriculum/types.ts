/**
 * Structured-curriculum types — a Duolingo-style taught journey for PE-ops.
 * A lesson is an ordered array of `pages` that interleave TEACHING pages
 * (read/framework/worked/compare/insight) with EXERCISE pages
 * (mcq/fill/order/numeric/check). Each page is rendered by a small component
 * and reports `done` back to the LessonPlayer to gate the Next button.
 *
 * Teaching prose may contain inline HTML (<strong>, <em>) for emphasis.
 */

// ── Teaching pages ───────────────────────────────────────────────────────────

/** Core teaching page: a heading + rich body paragraphs, optional key idea. */
export type Read = {
  type: "read";
  heading: string;
  body: string[];
  keyIdea?: string;
};

/** A named framework / taxonomy: a list of term → explanation rows. */
export type Framework = {
  type: "framework";
  heading: string;
  intro?: string;
  items: { term: string; detail: string }[];
};

/** A stepped worked example (a margin bridge, a paper LBO, a diagnosis). */
export type Worked = {
  type: "worked";
  heading: string;
  intro?: string;
  steps: { label: string; detail: string }[];
  takeaway?: string;
};

/** A two-column comparison (centralized vs embedded, cost vs growth). */
export type Compare = {
  type: "compare";
  heading: string;
  intro?: string;
  columns: [string, string];
  rows: { dim: string; a: string; b: string }[];
};

/** Interviewer's-eye callout — what they're really testing. */
export type Insight = {
  type: "insight";
  heading: string;
  body: string;
};

// ── Exercise pages ───────────────────────────────────────────────────────────

export type McqQuestion = {
  q: string;
  options: string[];
  /** index of the correct option */
  correct: number;
  /** feedback shown after answering */
  fb?: string;
};

export type Mcq = {
  type: "mcq";
  heading: string;
  intro?: string;
  questions: McqQuestion[];
};

export type FillItem = {
  /** sentence containing `___` for the blank */
  template: string;
  answer: string;
  /** optional choices; if absent the user types */
  options?: string[];
  hint?: string;
};

export type Fill = {
  type: "fill";
  heading: string;
  intro?: string;
  items: FillItem[];
};

export type OrderItem = {
  /** tokens in canonical order; shuffled for the user */
  tokens: string[];
  label?: string;
};

export type Order = {
  type: "order";
  heading: string;
  intro?: string;
  items: OrderItem[];
};

export type NumericField = {
  key: string;
  label: string;
  value: number;
  unit?: string;
  tol?: number;
  tolPct?: number;
};

export type Numeric = {
  type: "numeric";
  heading: string;
  prompt: string;
  fields: NumericField[];
  worked?: string;
};

export type CheckQuestion = {
  q: string;
  options: string[];
  correct: number;
};

export type Check = {
  type: "check";
  heading: string;
  intro?: string;
  questions: CheckQuestion[];
};

export type LessonPage =
  | Read
  | Framework
  | Worked
  | Compare
  | Insight
  | Mcq
  | Fill
  | Order
  | Numeric
  | Check;

/** A teaching page type (no answer gating beyond viewing). */
export const TEACHING_TYPES = ["read", "framework", "worked", "compare", "insight"] as const;

export type Lesson = {
  slug: string;
  title: string;
  summary?: string;
  estMinutes: number;
  pages: LessonPage[];
};

export type UnitCheckpoint = {
  passingPct: number;
  questions: CheckQuestion[];
};

export type Unit = {
  slug: string;
  stage: number;
  order: number;
  icon: string;
  title: string;
  tagline: string;
  lessons: Lesson[];
  checkpoint: UnitCheckpoint;
};

export type Stage = {
  number: number;
  title: string;
  blurb: string;
};

/** Lightweight outline entry — used for locked "soon" previews in the roadmap. */
export type UnitPreview = {
  slug: string;
  stage: number;
  order: number;
  icon: string;
  title: string;
  tagline: string;
};
