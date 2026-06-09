/**
 * Shared content types used by the Drizzle schema (for JSON column generics),
 * the seed files, and the quiz/case runners. Keeping them in one place means
 * the seed data and the UI agree on shape.
 */

export type Domain =
  | "fundamentals"
  | "returns"
  | "diagnostics"
  | "behavioral"
  | "technicals"
  | "firm";

export const DOMAIN_LABELS: Record<Domain, string> = {
  fundamentals: "Fundamentals",
  returns: "Returns Fluency",
  diagnostics: "Operational Diagnostics",
  behavioral: "Behavioral / Influence",
  technicals: "Operational Technicals",
  firm: "Firm Intel",
};

export type QuestionType = "mc" | "numeric" | "order" | "fill" | "scenario";

/** What a per-user FSRS card / attempt can point at. */
export type RefType =
  | "concept"
  | "question"
  | "case"
  | "behavioral"
  | "technical";

// ── Question payloads ────────────────────────────────────────────────────────

/** A choice for `mc` / `scenario` questions. */
export type Choice = {
  id: string;
  text: string;
  /** Per-choice rationale (shown after answering — key for scenario judgment). */
  rationale?: string;
};

/** Tolerance band for a single numeric field. */
export type NumericField = {
  key: string;
  label: string;
  /** Accepted answer. */
  value: number;
  /** Absolute tolerance (e.g. 0.05 on a 2.75x MOIC). Mutually fine with `tolPct`. */
  tol?: number;
  /** Relative tolerance as a fraction (e.g. 0.1 = ±10%). */
  tolPct?: number;
  /** Display suffix, e.g. "x", "%", "$M". */
  unit?: string;
};

/** Discriminated answer keyed by question type. Stored as a JSON column. */
export type QuestionAnswer =
  | { type: "mc"; correct: string[]; multi: boolean }
  | { type: "numeric"; fields: NumericField[] }
  | { type: "order"; correct: string[] } // ordered list of choice ids
  | { type: "fill"; accepted: string[] } // case-insensitive, fuzzy-matched
  | { type: "scenario"; correct: string };

// ── Rubrics (AI grading) ─────────────────────────────────────────────────────

export type RubricDimension = {
  key: string;
  label: string;
  weight: number; // 0..1, should sum to ~1 across dimensions
  guidance?: string;
};

export type Rubric = {
  dimensions: RubricDimension[];
};

// ── Case exhibits ────────────────────────────────────────────────────────────

export type Exhibit = {
  title: string;
  kind: "table" | "figure";
  columns?: string[];
  rows?: (string | number)[][];
  note?: string;
};

// ── Firm profile payloads ────────────────────────────────────────────────────

export type OpsModel = "centralized" | "embedded" | "advisor" | "hybrid";

export type InterviewRound = {
  name: string;
  detail: string;
};

export type InterviewProcess = {
  rounds: InterviewRound[];
};

export type FirmComp = {
  mbaIntern?: string;
  postMbaAssociateTotal?: string;
  note?: string;
};

// ── Behavioral competencies ──────────────────────────────────────────────────

export type Competency =
  | "influence"
  | "drive_change"
  | "ops_commitment"
  | "conflict"
  | "leadership"
  | "failure";

export const COMPETENCY_LABELS: Record<Competency, string> = {
  influence: "Influence without authority",
  drive_change: "Driving change",
  ops_commitment: "Commitment to PE-ops",
  conflict: "Conflict",
  leadership: "Leadership",
  failure: "Failure / learning",
};
