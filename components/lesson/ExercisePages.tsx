"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, X, RotateCcw, Eye } from "lucide-react";
import type {
  Mcq,
  Fill,
  Order,
  Numeric,
  Check as CheckT,
} from "@/lib/curriculum/types";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── MCQ (also used for Check) ─────────────────────────────────────────────────
function MultiChoice({
  questions,
  setDone,
}: {
  questions: { q: string; options: string[]; correct: number; fb?: string }[];
  setDone: (b: boolean) => void;
}) {
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    questions.map(() => null),
  );
  useEffect(() => {
    setDone(answers.every((a) => a !== null));
  }, [answers, setDone]);

  return (
    <div className="space-y-5">
      {questions.map((q, qi) => {
        const chosen = answers[qi];
        const answered = chosen !== null;
        const correct = chosen === q.correct;
        return (
          <div key={qi} className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm font-medium text-foreground">{q.q}</p>
            <div className="mt-3 space-y-2">
              {q.options.map((opt, oi) => {
                const isChosen = chosen === oi;
                const isCorrect = answered && oi === q.correct;
                const isWrong = answered && isChosen && !correct;
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={answered && correct}
                    onClick={() =>
                      setAnswers((p) => {
                        const n = [...p];
                        n[qi] = oi;
                        return n;
                      })
                    }
                    className={`flex w-full items-center gap-2 rounded-lg border p-2.5 text-left text-sm transition ${
                      isCorrect
                        ? "border-success/60 bg-success/10"
                        : isWrong
                          ? "border-destructive/60 bg-destructive/10"
                          : "border-border hover:border-primary/40"
                    }`}
                  >
                    <span className="text-foreground">{opt}</span>
                    {isCorrect && <Check className="ml-auto h-4 w-4 text-success" />}
                    {isWrong && <X className="ml-auto h-4 w-4 text-destructive" />}
                  </button>
                );
              })}
            </div>
            {answered && (
              <p
                className={`mt-2 text-xs ${correct ? "text-success" : "text-destructive"}`}
              >
                {correct ? "Correct. " : "Not quite. "}
                {q.fb ?? (!correct ? `Answer: ${q.options[q.correct]}.` : "")}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function McqPage({ page, setDone }: { page: Mcq; setDone: (b: boolean) => void }) {
  return (
    <div className="space-y-4">
      <h2 className="font-serif text-2xl font-semibold tracking-tight">{page.heading}</h2>
      {page.intro && <p className="text-sm text-muted-foreground">{page.intro}</p>}
      <MultiChoice questions={page.questions} setDone={setDone} />
    </div>
  );
}

export function CheckPage({ page, setDone }: { page: CheckT; setDone: (b: boolean) => void }) {
  return (
    <div className="space-y-4">
      <h2 className="font-serif text-2xl font-semibold tracking-tight">{page.heading}</h2>
      {page.intro && <p className="text-sm text-muted-foreground">{page.intro}</p>}
      <MultiChoice
        questions={page.questions.map((q) => ({ ...q }))}
        setDone={setDone}
      />
    </div>
  );
}

// ── Fill ──────────────────────────────────────────────────────────────────────
export function FillPage({ page, setDone }: { page: Fill; setDone: (b: boolean) => void }) {
  const [vals, setVals] = useState<(string | null)[]>(() => page.items.map(() => null));
  useEffect(() => {
    setDone(vals.every((v) => v !== null && v !== ""));
  }, [vals, setDone]);

  return (
    <div className="space-y-4">
      <h2 className="font-serif text-2xl font-semibold tracking-tight">{page.heading}</h2>
      {page.intro && <p className="text-sm text-muted-foreground">{page.intro}</p>}
      <div className="space-y-4">
        {page.items.map((item, i) => {
          const val = vals[i];
          const answered = val !== null && val !== "";
          const correct =
            answered && val!.trim().toLowerCase() === item.answer.trim().toLowerCase();
          const [pre, post] = item.template.split("___");
          return (
            <div key={i} className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-foreground">
                {pre}
                <span
                  className={`mx-1 inline-block min-w-16 rounded border-b-2 px-1 text-center font-medium ${
                    answered
                      ? correct
                        ? "border-success text-success"
                        : "border-destructive text-destructive"
                      : "border-muted-foreground/40 text-muted-foreground"
                  }`}
                >
                  {val || "____"}
                </span>
                {post}
              </p>
              {item.options ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      disabled={correct}
                      onClick={() =>
                        setVals((p) => {
                          const n = [...p];
                          n[i] = opt;
                          return n;
                        })
                      }
                      className={`rounded-lg border px-3 py-1.5 text-sm transition ${
                        val === opt
                          ? correct
                            ? "border-success/60 bg-success/10"
                            : "border-destructive/60 bg-destructive/10"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  value={val ?? ""}
                  onChange={(e) =>
                    setVals((p) => {
                      const n = [...p];
                      n[i] = e.target.value;
                      return n;
                    })
                  }
                  placeholder="Type your answer…"
                  className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                />
              )}
              {answered && !correct && (
                <p className="mt-2 text-xs text-destructive">Answer: {item.answer}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Order (tap to build) ──────────────────────────────────────────────────────
function OrderItemUI({
  item,
  onResolved,
}: {
  item: { tokens: string[]; label?: string };
  onResolved: (b: boolean) => void;
}) {
  const shuffled = useMemo(() => shuffle(item.tokens.map((t, i) => ({ t, i }))), [item]);
  const [picked, setPicked] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);
  const full = picked.length === item.tokens.length;
  const correct = full && picked.every((idx, pos) => shuffled[idx].i === pos);
  const solved = correct || revealed;

  useEffect(() => {
    onResolved(full || revealed);
  }, [full, revealed, onResolved]);

  // Indices into `shuffled` arranged so each token lands in its canonical slot.
  function reveal() {
    const inOrder = Array.from({ length: item.tokens.length }, (_, pos) =>
      shuffled.findIndex((tok) => tok.i === pos),
    );
    setPicked(inOrder);
    setRevealed(true);
  }

  const borderTone = revealed
    ? "border-warning/60"
    : full
      ? correct
        ? "border-success/60"
        : "border-destructive/60"
      : "border-border";

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      {item.label && (
        <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {item.label}
        </div>
      )}
      {/* Assembled */}
      <div className={`mb-3 flex min-h-10 flex-wrap gap-1.5 rounded-lg border border-dashed p-2 ${borderTone}`}>
        {picked.map((idx, pos) => (
          <button
            key={pos}
            type="button"
            disabled={solved}
            onClick={() => setPicked((p) => p.filter((_, k) => k !== pos))}
            className={`rounded px-2 py-1 text-xs text-foreground ${
              revealed ? "bg-warning/15" : "bg-secondary"
            } disabled:cursor-default`}
          >
            <span className="mr-1 font-mono text-[10px] text-muted-foreground tnum">{pos + 1}</span>
            {shuffled[idx].t}
          </button>
        ))}
        {picked.length === 0 && (
          <span className="px-1 py-1 text-xs text-muted-foreground">Tap the steps in order…</span>
        )}
      </div>
      {/* Bank (hidden once solved/revealed) */}
      {!solved && (
        <div className="flex flex-wrap gap-1.5">
          {shuffled.map((tok, idx) =>
            picked.includes(idx) ? null : (
              <button
                key={idx}
                type="button"
                onClick={() => setPicked((p) => [...p, idx])}
                className="rounded-lg border border-border px-2.5 py-1.5 text-xs text-foreground transition hover:border-primary/40"
              >
                {tok.t}
              </button>
            ),
          )}
        </div>
      )}
      <div className="mt-2 flex items-center justify-between gap-2">
        <span
          className={`text-xs ${
            revealed
              ? "text-warning"
              : full
                ? correct
                  ? "text-success"
                  : "text-destructive"
                : "text-muted-foreground"
          }`}
        >
          {revealed
            ? "Revealed — study the correct order above."
            : full
              ? correct
                ? "Correct order."
                : "Not the right order."
              : "Stuck? Reveal the answer to keep moving."}
        </span>
        <div className="flex shrink-0 items-center gap-3">
          {full && !correct && !revealed && (
            <button
              type="button"
              onClick={() => setPicked([])}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-3 w-3" /> Reset
            </button>
          )}
          {!solved && (
            <button
              type="button"
              onClick={reveal}
              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              <Eye className="h-3 w-3" /> Reveal answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function OrderPage({ page, setDone }: { page: Order; setDone: (b: boolean) => void }) {
  const [resolved, setResolved] = useState<boolean[]>(() => page.items.map(() => false));
  useEffect(() => {
    setDone(resolved.every(Boolean));
  }, [resolved, setDone]);

  return (
    <div className="space-y-4">
      <h2 className="font-serif text-2xl font-semibold tracking-tight">{page.heading}</h2>
      {page.intro && <p className="text-sm text-muted-foreground">{page.intro}</p>}
      <div className="space-y-3">
        {page.items.map((item, i) => (
          <OrderItemUI
            key={i}
            item={item}
            onResolved={(b) =>
              setResolved((p) => {
                if (p[i] === b) return p;
                const n = [...p];
                n[i] = b;
                return n;
              })
            }
          />
        ))}
      </div>
    </div>
  );
}

// ── Numeric ───────────────────────────────────────────────────────────────────
export function NumericPage({ page, setDone }: { page: Numeric; setDone: (b: boolean) => void }) {
  const [vals, setVals] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setDone(checked);
  }, [checked, setDone]);

  function fieldOk(f: Numeric["fields"][number]): boolean {
    const raw = vals[f.key];
    if (raw == null || raw.trim() === "") return false;
    const got = Number(raw);
    if (Number.isNaN(got)) return false;
    if (f.tol != null) return Math.abs(got - f.value) <= f.tol;
    if (f.tolPct != null) return Math.abs(got - f.value) <= Math.abs(f.value) * f.tolPct;
    return Math.abs(got - f.value) < 0.005;
  }

  const allFilled = page.fields.every((f) => (vals[f.key] ?? "").trim() !== "");

  return (
    <div className="space-y-4">
      <h2 className="font-serif text-2xl font-semibold tracking-tight">{page.heading}</h2>
      <div className="rounded-xl border border-border bg-card p-4">
        <p className="text-sm text-foreground">{page.prompt}</p>
        <div className="mt-4 space-y-3">
          {page.fields.map((f) => {
            const ok = checked && fieldOk(f);
            const bad = checked && !fieldOk(f);
            return (
              <div key={f.key} className="flex items-center gap-3">
                <label className="w-32 shrink-0 text-sm text-muted-foreground">{f.label}</label>
                <div className="relative flex-1">
                  <input
                    type="number"
                    step="any"
                    disabled={checked}
                    value={vals[f.key] ?? ""}
                    onChange={(e) => setVals((p) => ({ ...p, [f.key]: e.target.value }))}
                    className={`w-full rounded-lg border bg-background px-3 py-2 text-sm tnum outline-none focus:border-primary ${
                      ok ? "border-success/60" : bad ? "border-destructive/60" : "border-border"
                    }`}
                  />
                  {f.unit && (
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      {f.unit}
                    </span>
                  )}
                </div>
                {checked && (
                  <span className="w-20 shrink-0 text-right text-xs tnum text-muted-foreground">
                    = {f.value}
                    {f.unit}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        {!checked ? (
          <button
            type="button"
            onClick={() => setChecked(true)}
            disabled={!allFilled}
            className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            Check
          </button>
        ) : (
          page.worked && (
            <p className="mt-4 rounded-lg border border-border bg-muted/50 p-3 text-xs text-muted-foreground">
              {page.worked}
            </p>
          )
        )}
      </div>
    </div>
  );
}
