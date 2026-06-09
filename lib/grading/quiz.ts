/**
 * Pure, client-safe graders for each question type. Given the stored answer key
 * and the user's response, return whether it's correct (+ per-field detail for
 * numeric). Used for instant feedback in the quiz runner.
 */
import type { QuestionAnswer, NumericField } from "@/lib/content/types";

export type NumericResult = {
  correct: boolean;
  fields: { key: string; ok: boolean; expected: number; got: number | null }[];
};

function normalizeText(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[.,;:!?]+$/g, "")
    .replace(/\s+/g, " ");
}

/** Levenshtein distance for fuzzy fill matching (tolerant of a typo). */
function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...new Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

export function gradeMc(answer: QuestionAnswer, selected: string[]): boolean {
  if (answer.type !== "mc") return false;
  const want = new Set(answer.correct);
  const got = new Set(selected);
  if (want.size !== got.size) return false;
  for (const id of want) if (!got.has(id)) return false;
  return true;
}

export function gradeScenario(answer: QuestionAnswer, selected: string): boolean {
  return answer.type === "scenario" && answer.correct === selected;
}

export function gradeOrder(answer: QuestionAnswer, ordered: string[]): boolean {
  if (answer.type !== "order") return false;
  if (ordered.length !== answer.correct.length) return false;
  return ordered.every((id, i) => id === answer.correct[i]);
}

export function gradeFill(answer: QuestionAnswer, input: string): boolean {
  if (answer.type !== "fill") return false;
  const got = normalizeText(input);
  if (!got) return false;
  return answer.accepted.some((a) => {
    const want = normalizeText(a);
    if (got === want) return true;
    // Allow a one-character typo on words of length >= 4.
    if (want.length >= 4 && levenshtein(got, want) <= 1) return true;
    return false;
  });
}

function fieldOk(f: NumericField, got: number): boolean {
  if (f.tol != null && Math.abs(got - f.value) <= f.tol) return true;
  if (f.tolPct != null && Math.abs(got - f.value) <= Math.abs(f.value) * f.tolPct)
    return true;
  // Default: exact to 2 decimals if no tolerance given.
  if (f.tol == null && f.tolPct == null)
    return Math.abs(got - f.value) < 0.005;
  return false;
}

export function gradeNumeric(
  answer: QuestionAnswer,
  values: Record<string, string>,
): NumericResult {
  if (answer.type !== "numeric") return { correct: false, fields: [] };
  const fields = answer.fields.map((f) => {
    const raw = values[f.key];
    const got = raw == null || raw.trim() === "" ? null : Number(raw);
    const ok = got != null && !Number.isNaN(got) && fieldOk(f, got);
    return { key: f.key, ok, expected: f.value, got };
  });
  return { correct: fields.every((f) => f.ok), fields };
}
