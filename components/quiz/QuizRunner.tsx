"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check, X, Clock, BookmarkPlus, ArrowRight, RotateCcw } from "lucide-react";
import { Markdown } from "@/components/Markdown";
import { OrderInput } from "@/components/quiz/OrderInput";
import type { Question } from "@/lib/db/schema";
import {
  gradeMc,
  gradeScenario,
  gradeOrder,
  gradeFill,
  gradeNumeric,
  type NumericResult,
} from "@/lib/grading/quiz";
import { recordAttempt, finishSession } from "@/lib/actions/quiz";
import { enqueueCard } from "@/lib/actions/review";

type Mode = "practice" | "timed";

type Result = {
  correct: boolean;
  numeric?: NumericResult;
};

const TYPE_LABEL: Record<string, string> = {
  mc: "Multiple choice",
  numeric: "Numeric",
  order: "Ordering",
  fill: "Fill-in",
  scenario: "Scenario",
};

// ── Per-question countdown (keyed remount resets it cleanly) ──
function Timer({
  seconds,
  paused,
  onExpire,
}: {
  seconds: number;
  paused: boolean;
  onExpire: () => void;
}) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    if (paused) return;
    if (left <= 0) {
      onExpire();
      return;
    }
    const id = setTimeout(() => setLeft(left - 1), 1000);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left, paused]);

  const pct = Math.max(0, (left / seconds) * 100);
  return (
    <div className="flex items-center gap-2">
      <Clock className="h-4 w-4 text-muted-foreground" />
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-secondary">
        <div
          className={`h-full rounded-full transition-all ${
            pct < 25 ? "bg-destructive" : "bg-primary"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="tnum text-xs text-muted-foreground">{left}s</span>
    </div>
  );
}

export function QuizRunner({
  questions,
  mode,
  sessionId,
}: {
  questions: Question[];
  mode: Mode;
  sessionId?: string;
}) {
  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, unknown>>({});
  const [results, setResults] = useState<Record<string, Result>>({});
  const [enqueued, setEnqueued] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);

  const q = questions[index];
  const submitted = q ? results[q.id] != null : false;

  const defaults = useMemo(() => {
    const map: Record<string, unknown> = {};
    for (const question of questions) {
      switch (question.type) {
        case "mc":
          map[question.id] = [];
          break;
        case "scenario":
        case "fill":
          map[question.id] = question.type === "fill" ? "" : "";
          break;
        case "order":
          map[question.id] = (question.choices ?? []).map((c) => c.id);
          break;
        case "numeric":
          map[question.id] = {};
          break;
      }
    }
    return map;
  }, [questions]);

  function getResponse(qid: string): unknown {
    return responses[qid] ?? defaults[qid];
  }

  function setResponse(qid: string, value: unknown) {
    setResponses((r) => ({ ...r, [qid]: value }));
  }

  function grade(question: Question): Result {
    switch (question.type) {
      case "mc":
        return { correct: gradeMc(question.answer, getResponse(question.id) as string[]) };
      case "scenario":
        return {
          correct: gradeScenario(question.answer, getResponse(question.id) as string),
        };
      case "order":
        return {
          correct: gradeOrder(question.answer, getResponse(question.id) as string[]),
        };
      case "fill":
        return { correct: gradeFill(question.answer, getResponse(question.id) as string) };
      case "numeric": {
        const res = gradeNumeric(
          question.answer,
          getResponse(question.id) as Record<string, string>,
        );
        return { correct: res.correct, numeric: res };
      }
    }
  }

  async function submit() {
    if (!q || submitted) return;
    const result = grade(q);
    setResults((r) => ({ ...r, [q.id]: result }));
    await recordAttempt({
      refType: "question",
      refId: q.id,
      isCorrect: result.correct,
      userAnswer: getResponse(q.id),
      sessionId,
    });
  }

  async function sendToReview() {
    if (!q || enqueued[q.id]) return;
    setEnqueued((e) => ({ ...e, [q.id]: true }));
    await enqueueCard("question", q.id);
  }

  const correctCount = Object.values(results).filter((r) => r.correct).length;

  async function next() {
    if (index + 1 >= questions.length) {
      setDone(true);
      if (sessionId) {
        await finishSession(sessionId, {
          total: questions.length,
          correct: Object.values(results).filter((r) => r.correct).length,
        });
      }
      return;
    }
    setIndex((i) => i + 1);
  }

  if (done) {
    const pct = Math.round((correctCount / questions.length) * 100);
    return (
      <div className="mx-auto max-w-md py-12 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          Session complete
        </p>
        <p className="mt-3 font-mono text-5xl font-semibold tnum">
          {correctCount}/{questions.length}
        </p>
        <p className="mt-1 text-muted-foreground">{pct}% correct</p>
        <div className="mt-6 flex justify-center gap-3">
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

  if (!q) return null;
  const choices = q.choices ?? [];

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <span className="tnum text-xs text-muted-foreground">
          {index + 1} / {questions.length}
        </span>
        {mode === "timed" && q.timeLimitSec && !submitted && (
          <Timer
            key={q.id}
            seconds={q.timeLimitSec}
            paused={submitted}
            onExpire={submit}
          />
        )}
      </div>

      {/* Prompt */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <span className="mb-3 inline-block rounded bg-secondary px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          {TYPE_LABEL[q.type]}
        </span>
        <div className="text-lg font-medium text-foreground">
          <Markdown>{q.prompt}</Markdown>
        </div>

        <div className="mt-5">
          {/* MC / Scenario */}
          {(q.type === "mc" || q.type === "scenario") && (
            <div className="space-y-2">
              {choices.map((ch) => {
                const sel =
                  q.type === "mc"
                    ? (getResponse(q.id) as string[]).includes(ch.id)
                    : getResponse(q.id) === ch.id;
                const isCorrectChoice =
                  q.answer.type === "mc"
                    ? q.answer.correct.includes(ch.id)
                    : q.answer.type === "scenario"
                      ? q.answer.correct === ch.id
                      : false;
                const stateClass = submitted
                  ? isCorrectChoice
                    ? "border-success/60 bg-success/10"
                    : sel
                      ? "border-destructive/60 bg-destructive/10"
                      : "border-border"
                  : sel
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/40";
                return (
                  <button
                    key={ch.id}
                    disabled={submitted}
                    onClick={() => {
                      if (q.type === "mc") {
                        const cur = getResponse(q.id) as string[];
                        const multi = q.answer.type === "mc" && q.answer.multi;
                        if (multi) {
                          setResponse(
                            q.id,
                            cur.includes(ch.id)
                              ? cur.filter((x) => x !== ch.id)
                              : [...cur, ch.id],
                          );
                        } else {
                          setResponse(q.id, [ch.id]);
                        }
                      } else {
                        setResponse(q.id, ch.id);
                      }
                    }}
                    className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left text-sm transition ${stateClass}`}
                  >
                    <span className="mt-0.5 font-mono text-xs uppercase text-muted-foreground">
                      {ch.id}
                    </span>
                    <span className="flex-1">
                      <span className="text-foreground">{ch.text}</span>
                      {submitted && ch.rationale && (
                        <span className="mt-1 block text-xs text-muted-foreground">
                          {ch.rationale}
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Order */}
          {q.type === "order" && (
            <OrderInput
              choices={choices}
              order={getResponse(q.id) as string[]}
              onChange={(o) => setResponse(q.id, o)}
              disabled={submitted}
              correctOrder={
                submitted && q.answer.type === "order" ? q.answer.correct : undefined
              }
            />
          )}

          {/* Fill */}
          {q.type === "fill" && (
            <input
              type="text"
              disabled={submitted}
              value={getResponse(q.id) as string}
              onChange={(e) => setResponse(q.id, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !submitted) submit();
              }}
              placeholder="Type your answer…"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          )}

          {/* Numeric */}
          {q.type === "numeric" && q.answer.type === "numeric" && (
            <div className="space-y-3">
              {q.answer.fields.map((f) => {
                const vals = getResponse(q.id) as Record<string, string>;
                const fieldRes = results[q.id]?.numeric?.fields.find(
                  (x) => x.key === f.key,
                );
                return (
                  <div key={f.key} className="flex items-center gap-3">
                    <label className="w-32 shrink-0 text-sm text-muted-foreground">
                      {f.label}
                    </label>
                    <div className="relative flex-1">
                      <input
                        type="number"
                        step="any"
                        disabled={submitted}
                        value={vals[f.key] ?? ""}
                        onChange={(e) =>
                          setResponse(q.id, { ...vals, [f.key]: e.target.value })
                        }
                        className={`w-full rounded-lg border bg-background px-3 py-2 text-sm tnum outline-none focus:border-primary ${
                          submitted
                            ? fieldRes?.ok
                              ? "border-success/60"
                              : "border-destructive/60"
                            : "border-border"
                        }`}
                      />
                      {f.unit && (
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                          {f.unit}
                        </span>
                      )}
                    </div>
                    {submitted && (
                      <span className="w-20 shrink-0 text-right text-xs text-muted-foreground tnum">
                        = {f.value}
                        {f.unit}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Feedback */}
      {submitted && (
        <div
          className={`rounded-xl border p-4 ${
            results[q.id].correct
              ? "border-success/40 bg-success/5"
              : "border-destructive/40 bg-destructive/5"
          }`}
        >
          <div className="flex items-center gap-2 font-medium">
            {results[q.id].correct ? (
              <>
                <Check className="h-4 w-4 text-success" />
                <span className="text-success">Correct</span>
              </>
            ) : (
              <>
                <X className="h-4 w-4 text-destructive" />
                <span className="text-destructive">Not quite</span>
              </>
            )}
          </div>
          {q.explanation && (
            <div className="mt-2 text-sm text-muted-foreground">
              <Markdown>{q.explanation}</Markdown>
            </div>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between gap-3">
        {submitted ? (
          <>
            <button
              onClick={sendToReview}
              disabled={enqueued[q.id]}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground disabled:opacity-60"
            >
              <BookmarkPlus className="h-4 w-4" />
              {enqueued[q.id] ? "Added to review" : "Send to review"}
            </button>
            <button
              onClick={next}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              {index + 1 >= questions.length ? "Finish" : "Next"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </>
        ) : (
          <button
            onClick={submit}
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            <RotateCcw className="h-4 w-4" /> Submit
          </button>
        )}
      </div>
    </div>
  );
}
