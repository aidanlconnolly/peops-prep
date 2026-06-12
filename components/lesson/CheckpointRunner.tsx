"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, X, Trophy, RotateCcw } from "lucide-react";
import { recordCheckpoint } from "@/lib/actions/curriculum";
import { PRACTICE_LINKS } from "@/lib/curriculum";
import type { Unit } from "@/lib/curriculum/types";

export function CheckpointRunner({ unit }: { unit: Unit }) {
  const questions = unit.checkpoint.questions;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    questions.map(() => null),
  );
  const [done, setDone] = useState(false);
  const [saved, setSaved] = useState<{ passed: boolean } | null>(null);

  const q = questions[index];
  const chosen = answers[index];

  function choose(i: number) {
    setAnswers((p) => {
      const n = [...p];
      n[index] = i;
      return n;
    });
  }

  async function finish() {
    const correct = answers.filter((a, i) => a === questions[i].correct).length;
    const score = Math.round((correct / questions.length) * 100);
    setDone(true);
    const res = await recordCheckpoint({ unitSlug: unit.slug, score });
    setSaved({ passed: res.passed });
  }

  function retry() {
    setAnswers(questions.map(() => null));
    setIndex(0);
    setDone(false);
    setSaved(null);
  }

  if (done) {
    const correct = answers.filter((a, i) => a === questions[i].correct).length;
    const score = Math.round((correct / questions.length) * 100);
    const passed = saved?.passed ?? score >= unit.checkpoint.passingPct;
    return (
      <div className="mx-auto max-w-lg py-12 text-center">
        <div
          className={`mx-auto grid h-14 w-14 place-items-center rounded-full ${
            passed ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
          }`}
        >
          {passed ? <Trophy className="h-7 w-7" /> : <RotateCcw className="h-7 w-7" />}
        </div>
        <p className="mt-4 font-mono text-5xl font-semibold tnum">{score}%</p>
        <p className={`mt-1 font-medium ${passed ? "text-success" : "text-warning"}`}>
          {passed ? "Unit complete!" : `Need ${unit.checkpoint.passingPct}% to pass`}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {correct}/{questions.length} correct
        </p>
        <div className="mt-6 flex justify-center gap-3">
          {!passed && (
            <button
              onClick={retry}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-secondary"
            >
              Try again
            </button>
          )}
          <Link
            href="/learn"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Back to roadmap
          </Link>
        </div>
        {passed && PRACTICE_LINKS[unit.slug] && (
          <Link
            href={PRACTICE_LINKS[unit.slug].href}
            className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
          >
            {PRACTICE_LINKS[unit.slug].label} →
          </Link>
        )}

        {/* Answer review — see the right answer for every question */}
        <div className="mt-10 text-left">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Review answers
          </h2>
          <div className="space-y-3">
            {questions.map((rq, qi) => {
              const picked = answers[qi];
              const wasRight = picked === rq.correct;
              return (
                <div key={qi} className="rounded-xl border border-border bg-card p-4">
                  <p className="text-sm font-medium text-foreground">
                    <span className="text-muted-foreground tnum">{qi + 1}. </span>
                    {rq.q}
                  </p>
                  <div className="mt-3 space-y-1.5">
                    {rq.options.map((opt, oi) => {
                      const isCorrect = oi === rq.correct;
                      const isPicked = picked === oi;
                      const wrongPick = isPicked && !isCorrect;
                      return (
                        <div
                          key={oi}
                          className={`flex items-center gap-2 rounded-lg border p-2.5 text-sm ${
                            isCorrect
                              ? "border-success/60 bg-success/10"
                              : wrongPick
                                ? "border-destructive/60 bg-destructive/10"
                                : "border-border"
                          }`}
                        >
                          <span className="flex-1 text-foreground">{opt}</span>
                          {isPicked && !isCorrect && (
                            <span className="text-[10px] font-medium uppercase tracking-wide text-destructive">
                              Your answer
                            </span>
                          )}
                          {isCorrect && (
                            <span className="text-[10px] font-medium uppercase tracking-wide text-success">
                              {isPicked ? "Your answer ✓" : "Correct"}
                            </span>
                          )}
                          {isCorrect ? (
                            <Check className="h-4 w-4 shrink-0 text-success" />
                          ) : wrongPick ? (
                            <X className="h-4 w-4 shrink-0 text-destructive" />
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                  {!wasRight && picked == null && (
                    <p className="mt-2 text-xs text-muted-foreground">You skipped this one.</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="flex items-center justify-between">
        <Link
          href="/learn"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Roadmap
        </Link>
        <span className="tnum text-xs text-muted-foreground">
          {index + 1} / {questions.length}
        </span>
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          {unit.icon} {unit.title} — checkpoint
        </p>
        <h1 className="mt-1 font-serif text-2xl font-semibold tracking-tight">Unit checkpoint</h1>
        <p className="text-sm text-muted-foreground">Pass at {unit.checkpoint.passingPct}% to complete the unit.</p>
      </div>

      <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(index / questions.length) * 100}%` }} />
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="text-base font-medium text-foreground">{q.q}</p>
        <div className="mt-4 space-y-2">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => choose(i)}
              className={`flex w-full items-center gap-2 rounded-lg border p-3 text-left text-sm transition ${
                chosen === i ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
              }`}
            >
              <span className="text-foreground">{opt}</span>
              {chosen === i && <Check className="ml-auto h-4 w-4 text-primary" />}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => (index + 1 >= questions.length ? finish() : setIndex((i) => i + 1))}
          disabled={chosen === null}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-40"
        >
          {index + 1 >= questions.length ? "Submit" : "Next"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
