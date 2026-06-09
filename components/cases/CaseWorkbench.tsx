"use client";

import { useState } from "react";
import { Sparkles, Loader2, Eye } from "lucide-react";
import { GradePanel } from "@/components/grade/GradePanel";
import { Markdown } from "@/components/Markdown";
import type { GradeResult } from "@/lib/grading/ai";

const STAGES = [
  { key: "frame", label: "1 · Frame the situation", hint: "What's really going on? Size the problem." },
  { key: "diagnose", label: "2 · Diagnose root issues", hint: "The 2–3 drivers behind the numbers." },
  { key: "prioritize", label: "3 · Prioritize the levers", hint: "Highest-ROI first; why this sequence." },
  { key: "plan", label: "4 · 100-day plan", hint: "Concrete early moves with owners." },
  { key: "metrics", label: "5 · Metrics to track", hint: "Leading + lagging indicators." },
] as const;

export function CaseWorkbench({
  caseId,
  modelAnswer,
}: {
  caseId: string;
  modelAnswer: string;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [grading, setGrading] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [showModel, setShowModel] = useState(false);

  function compose(): string {
    return STAGES.map((s) => {
      const a = (answers[s.key] ?? "").trim();
      return a ? `${s.label.replace(/^\d+ · /, "")}:\n${a}` : "";
    })
      .filter(Boolean)
      .join("\n\n");
  }

  async function grade() {
    setGrading(true);
    setResult(null);
    try {
      const res = await fetch("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "case", refId: caseId, userAnswer: compose() }),
      });
      setResult(await res.json());
      setShowModel(true);
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

  const wordCount = compose().split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-5">
      <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-sm font-semibold text-muted-foreground">
          Work the case
        </h2>
        {STAGES.map((s) => (
          <div key={s.key} className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">{s.label}</label>
            <textarea
              value={answers[s.key] ?? ""}
              onChange={(e) =>
                setAnswers((a) => ({ ...a, [s.key]: e.target.value }))
              }
              placeholder={s.hint}
              rows={3}
              className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-primary"
            />
          </div>
        ))}

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground tnum">{wordCount} words</span>
          <button
            onClick={grade}
            disabled={grading || wordCount < 5}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            {grading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Grading…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Grade my answer
              </>
            )}
          </button>
        </div>
      </div>

      {result && <GradePanel result={result} />}

      {modelAnswer && (
        <div className="rounded-2xl border border-border bg-card p-6">
          {showModel ? (
            <>
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                Model answer
              </h3>
              <Markdown>{modelAnswer}</Markdown>
            </>
          ) : (
            <button
              onClick={() => setShowModel(true)}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <Eye className="h-4 w-4" /> Reveal model answer
            </button>
          )}
        </div>
      )}
    </div>
  );
}
