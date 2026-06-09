"use client";

import { Check, AlertTriangle, Lightbulb, Sparkles } from "lucide-react";
import type { GradeResult } from "@/lib/grading/ai";

function ScoreBar({ score }: { score: number }) {
  const pct = (score / 5) * 100;
  const color =
    score >= 4 ? "bg-success" : score >= 2.5 ? "bg-primary" : "bg-destructive";
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function GradePanel({ result }: { result: GradeResult }) {
  return (
    <div className="space-y-5 rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h3 className="font-medium">AI feedback</h3>
        </div>
        {!result.unavailable && (
          <span className="font-mono text-2xl font-semibold tnum text-foreground">
            {result.overall}
            <span className="text-sm text-muted-foreground">/100</span>
          </span>
        )}
      </div>

      {result.unavailable && (
        <p className="rounded-lg border border-warning/40 bg-warning/5 p-3 text-sm text-muted-foreground">
          {result.suggestion}
        </p>
      )}

      {/* Dimension scores */}
      <div className="space-y-3">
        {result.dimensions.map((d) => (
          <div key={d.key} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground">{d.label}</span>
              <span className="tnum text-muted-foreground">{d.score}/5</span>
            </div>
            <ScoreBar score={d.score} />
            {d.comment && (
              <p className="text-xs text-muted-foreground">{d.comment}</p>
            )}
          </div>
        ))}
      </div>

      {result.strengths.length > 0 && (
        <div>
          <p className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-success">
            <Check className="h-4 w-4" /> Strengths
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {result.strengths.map((s, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-success">·</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.gaps.length > 0 && (
        <div>
          <p className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-warning">
            <AlertTriangle className="h-4 w-4" /> Gaps
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {result.gaps.map((g, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-warning">·</span>
                {g}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!result.unavailable && result.suggestion && (
        <div className="flex gap-2 rounded-lg border border-primary/30 bg-accent/30 p-3 text-sm">
          <Lightbulb className="h-4 w-4 shrink-0 text-primary" />
          <span className="text-muted-foreground">{result.suggestion}</span>
        </div>
      )}
    </div>
  );
}
