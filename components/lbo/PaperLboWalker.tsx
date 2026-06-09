"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, X, Eye, ArrowRight, Trophy } from "lucide-react";
import { ReturnWaterfall } from "@/components/lbo/ReturnWaterfall";
import { computeLbo, round } from "@/lib/returns";
import type { LboDeal, LboStep } from "@/lib/lbo-deals";

function withinTol(step: LboStep, got: number): boolean {
  if (step.tol != null && Math.abs(got - step.answer) <= step.tol) return true;
  if (step.tolPct != null && Math.abs(got - step.answer) <= Math.abs(step.answer) * step.tolPct)
    return true;
  return false;
}

function Elapsed() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const id = setTimeout(() => setS(s + 1), 1000);
    return () => clearTimeout(id);
  }, [s]);
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return (
    <span className="tnum text-xs text-muted-foreground">
      {mm}:{ss}
    </span>
  );
}

export function PaperLboWalker({
  deal,
  timed = false,
}: {
  deal: LboDeal;
  timed?: boolean;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"input" | "correct" | "revealed">("input");
  const [wrongTries, setWrongTries] = useState(0);
  const [firstTry, setFirstTry] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);

  const step = deal.steps[stepIndex];
  const result = computeLbo(deal.inputs);

  function check() {
    const got = Number(value);
    if (value.trim() === "" || Number.isNaN(got)) return;
    if (withinTol(step, got)) {
      setFirstTry((f) => [...f, wrongTries === 0]);
      setStatus("correct");
    } else {
      setWrongTries((w) => w + 1);
      setStatus("input");
    }
  }

  function reveal() {
    setFirstTry((f) => [...f, false]);
    setStatus("revealed");
  }

  function next() {
    if (stepIndex + 1 >= deal.steps.length) {
      setDone(true);
      return;
    }
    setStepIndex((i) => i + 1);
    setValue("");
    setWrongTries(0);
    setStatus("input");
  }

  if (done) {
    const correctFirst = firstTry.filter(Boolean).length;
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground">
            <Trophy className="h-6 w-6" />
          </div>
          <h2 className="mt-3 font-serif text-2xl font-semibold">
            {round(result.moic, 2)}x · ~{round(result.irr, 0)}% IRR
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {correctFirst}/{deal.steps.length} steps right on the first try.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="mb-1 text-sm font-semibold text-muted-foreground">
            Return attribution
          </h3>
          <p className="mb-4 text-xs text-muted-foreground">
            Where the equity gain came from ($M).
          </p>
          <ReturnWaterfall result={result} />
          <dl className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">EBITDA growth</dt>
              <dd className="tnum font-medium text-foreground">
                ${Math.round(result.attribution.ebitdaGrowth)}M
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Multiple</dt>
              <dd className="tnum font-medium text-foreground">
                ${Math.round(result.attribution.multipleExpansion)}M
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Debt paydown</dt>
              <dd className="tnum font-medium text-foreground">
                ${Math.round(result.attribution.debtPaydown)}M
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex justify-center">
          <Link
            href="/drills"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-secondary"
          >
            Back to drills
          </Link>
        </div>
      </div>
    );
  }

  const solved = status === "correct" || status === "revealed";

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="tnum">
          Step {stepIndex + 1} / {deal.steps.length}
        </span>
        {timed && <Elapsed />}
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${(stepIndex / deal.steps.length) * 100}%` }}
        />
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-primary">
          {step.label}
        </p>
        <p className="mt-2 text-lg font-medium text-foreground">{step.prompt}</p>

        <div className="mt-5 flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type="number"
              step="any"
              autoFocus
              disabled={solved}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !solved) check();
              }}
              placeholder="Your answer…"
              className={`w-full rounded-lg border bg-background px-3 py-2.5 text-sm tnum outline-none focus:border-primary ${
                status === "correct"
                  ? "border-success/60"
                  : status === "revealed"
                    ? "border-warning/60"
                    : wrongTries > 0
                      ? "border-destructive/60"
                      : "border-border"
              }`}
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {step.unit}
            </span>
          </div>
          {!solved && (
            <button
              onClick={check}
              className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Check
            </button>
          )}
        </div>

        {/* Inline status */}
        {wrongTries > 0 && status === "input" && (
          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-sm text-destructive">
              <X className="h-4 w-4" /> Not quite — try again.
            </span>
            <button
              onClick={reveal}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <Eye className="h-3.5 w-3.5" /> Reveal
            </button>
          </div>
        )}

        {solved && (
          <div
            className={`mt-4 rounded-lg border p-3 text-sm ${
              status === "correct"
                ? "border-success/40 bg-success/5"
                : "border-warning/40 bg-warning/5"
            }`}
          >
            <div className="flex items-center gap-1.5 font-medium">
              {status === "correct" ? (
                <>
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-success">
                    Correct — {step.answer}
                    {step.unit}
                  </span>
                </>
              ) : (
                <span className="text-warning">
                  Answer: {step.answer}
                  {step.unit}
                </span>
              )}
            </div>
            <p className="mt-1 text-muted-foreground">{step.explain}</p>
          </div>
        )}
      </div>

      {solved && (
        <div className="flex justify-end">
          <button
            onClick={next}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            {stepIndex + 1 >= deal.steps.length ? "See results" : "Next step"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
