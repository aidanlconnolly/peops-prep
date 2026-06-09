"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Loader2, ArrowRight, Gauge, Clock } from "lucide-react";
import { GradePanel } from "@/components/grade/GradePanel";
import { finishSession } from "@/lib/actions/quiz";
import { ROUND_LABELS, type SuperdayStation } from "@/lib/superday";
import type { GradeResult } from "@/lib/grading/ai";

type StationScore = {
  round: number;
  title: string;
  score: number;
  gaps: string[];
};

/** Self-ticking elapsed clock (setState lives in the timeout callback). */
function Elapsed() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const id = setTimeout(() => setS(s + 1), 1000);
    return () => clearTimeout(id);
  }, [s]);
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground tnum">
      <Clock className="h-3.5 w-3.5" />
      {mm}:{ss}
    </span>
  );
}

function lboGrade(station: Extract<SuperdayStation, { type: "lbo" }>, moic: number, irr: number): GradeResult {
  const moicOk = Math.abs(moic - station.moic) <= 0.05;
  const irrOk = Math.abs(irr - station.irr) <= Math.abs(station.irr) * 0.15;
  const overall = (moicOk ? 60 : 0) + (irrOk ? 40 : 0);
  return {
    overall,
    dimensions: [
      { key: "moic", label: "MOIC", score: moicOk ? 5 : 1, comment: `Target ${station.moic}x` },
      { key: "irr", label: "IRR", score: irrOk ? 5 : 1, comment: `Target ~${station.irr}%` },
    ],
    strengths: [
      moicOk ? "MOIC correct." : "",
      irrOk ? "IRR in range." : "",
    ].filter(Boolean),
    gaps: [
      moicOk ? "" : "Re-check the exit-equity build for MOIC.",
      irrOk ? "" : "Anchor IRR off the 5-year MOIC table.",
    ].filter(Boolean),
    suggestion: overall === 100 ? "Clean." : "Drill the paper-LBO walker to lock the mechanics.",
  };
}

export function SuperdayRunner({
  stations,
  sessionId,
}: {
  stations: SuperdayStation[];
  sessionId: string;
}) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [moic, setMoic] = useState("");
  const [irr, setIrr] = useState("");
  const [grading, setGrading] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [scores, setScores] = useState<StationScore[]>([]);
  const [done, setDone] = useState(false);

  const station = stations[index];

  async function gradeStation() {
    if (!station) return;
    setGrading(true);
    setResult(null);
    try {
      let res: GradeResult;
      if (station.type === "lbo") {
        res = lboGrade(station, Number(moic), Number(irr));
      } else {
        const body =
          station.type === "adhoc"
            ? {
                kind: "adhoc",
                refId: station.id,
                userAnswer: answer,
                sessionId,
                adhoc: {
                  prompt: station.prompt,
                  dimensions: station.dimensions,
                  modelAnswer: station.modelAnswer,
                },
              }
            : {
                kind: station.type,
                refId: station.refId,
                userAnswer: answer,
                sessionId,
              };
        const r = await fetch("/api/grade", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        res = await r.json();
      }
      setResult(res);
    } catch {
      setResult({
        overall: 0,
        dimensions: [],
        strengths: [],
        gaps: [],
        suggestion: "Network error — try again.",
        unavailable: true,
      });
    } finally {
      setGrading(false);
    }
  }

  async function next() {
    if (result) {
      setScores((s) => [
        ...s,
        {
          round: station.round,
          title: station.title,
          score: result.overall,
          gaps: result.gaps,
        },
      ]);
    }
    const isLast = index + 1 >= stations.length;
    setAnswer("");
    setMoic("");
    setIrr("");
    setResult(null);
    if (isLast) {
      const finalScores = result
        ? [
            ...scores,
            { round: station.round, title: station.title, score: result.overall, gaps: result.gaps },
          ]
        : scores;
      setDone(true);
      await finishSession(sessionId, {
        stations: finalScores,
        overall: Math.round(
          finalScores.reduce((a, s) => a + s.score, 0) / Math.max(1, finalScores.length),
        ),
      });
    } else {
      setIndex((i) => i + 1);
    }
  }

  if (done) {
    return <Scorecard scores={scores} />;
  }

  const canGrade =
    station.type === "lbo"
      ? moic.trim() !== "" && irr.trim() !== ""
      : answer.split(/\s+/).filter(Boolean).length >= 5;

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="rounded bg-accent px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent-foreground">
            {station.roundLabel}
          </span>
          <span className="tnum text-xs text-muted-foreground">
            {index + 1} / {stations.length}
          </span>
        </div>
        <Elapsed />
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${(index / stations.length) * 100}%` }}
        />
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-medium text-foreground">{station.title}</h2>
        <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">
          {station.prompt}
        </p>

        {station.type === "lbo" ? (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="space-y-1">
              <span className="text-xs text-muted-foreground">MOIC</span>
              <input
                type="number"
                step="any"
                disabled={!!result}
                value={moic}
                onChange={(e) => setMoic(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm tnum outline-none focus:border-primary"
              />
            </label>
            <label className="space-y-1">
              <span className="text-xs text-muted-foreground">IRR (%)</span>
              <input
                type="number"
                step="any"
                disabled={!!result}
                value={irr}
                onChange={(e) => setIrr(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm tnum outline-none focus:border-primary"
              />
            </label>
          </div>
        ) : (
          <textarea
            value={answer}
            disabled={!!result}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Your answer…"
            rows={7}
            className="mt-4 w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
        )}

        {!result && (
          <div className="mt-3 flex justify-end">
            <button
              onClick={gradeStation}
              disabled={grading || !canGrade}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
            >
              {grading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Grading…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Submit
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {result && <GradePanel result={result} />}

      {result && (
        <div className="flex justify-end">
          <button
            onClick={next}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            {index + 1 >= stations.length ? "See scorecard" : "Next station"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function verdict(overall: number): { label: string; tone: string } {
  if (overall >= 80) return { label: "Interview-ready", tone: "text-success" };
  if (overall >= 65) return { label: "Close — tighten the gaps", tone: "text-primary" };
  if (overall >= 50) return { label: "Developing", tone: "text-warning" };
  return { label: "Needs reps", tone: "text-destructive" };
}

function Scorecard({ scores }: { scores: StationScore[] }) {
  const overall = Math.round(
    scores.reduce((a, s) => a + s.score, 0) / Math.max(1, scores.length),
  );
  const v = verdict(overall);
  const byRound = [1, 2, 3, 4].map((r) => {
    const rs = scores.filter((s) => s.round === r);
    const avg = rs.length
      ? Math.round(rs.reduce((a, s) => a + s.score, 0) / rs.length)
      : null;
    return { round: r, label: ROUND_LABELS[r - 1], avg };
  });
  const topFixes = Array.from(new Set(scores.flatMap((s) => s.gaps))).slice(0, 3);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground">
          <Gauge className="h-6 w-6" />
        </div>
        <p className="mt-3 font-mono text-5xl font-semibold tnum">{overall}</p>
        <p className={`mt-1 font-medium ${v.tone}`}>{v.label}</p>
      </div>

      <div className="space-y-3 rounded-2xl border border-border bg-card p-6">
        <h3 className="text-sm font-semibold text-muted-foreground">By round</h3>
        {byRound.map((r) => (
          <div key={r.round} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground">{r.label}</span>
              <span className="tnum text-muted-foreground">
                {r.avg == null ? "—" : `${r.avg}/100`}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${r.avg ?? 0}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {topFixes.length > 0 && (
        <div className="rounded-2xl border border-warning/30 bg-warning/5 p-6">
          <h3 className="mb-2 text-sm font-semibold text-warning">
            Top 3 things to fix
          </h3>
          <ol className="space-y-1.5 text-sm text-muted-foreground">
            {topFixes.map((f, i) => (
              <li key={i} className="flex gap-2">
                <span className="tnum text-warning">{i + 1}.</span>
                {f}
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="flex justify-center gap-3">
        <Link
          href="/superday"
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-secondary"
        >
          Run again
        </Link>
        <Link
          href="/"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
