"use client";

import { useState } from "react";
import { Sparkles, Loader2, Eye, ChevronRight, Check } from "lucide-react";
import { GradePanel } from "@/components/grade/GradePanel";
import { useDraft } from "@/lib/useDraft";
import type { GradeResult } from "@/lib/grading/ai";

export type PracticeItem = {
  id: string;
  kind: "behavioral" | "technical";
  tag?: string;
  prompt: string;
  exampleAnswer: string;
};

export function FreeResponsePractice({ items }: { items: PracticeItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const {
    value: answer,
    setValue: setAnswer,
    clear: clearDraft,
    hydrated,
  } = useDraft<string>(`peops:draft:practice:${activeId}`, "");
  const [grading, setGrading] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [showExample, setShowExample] = useState(false);

  const active = items.find((i) => i.id === activeId);

  function pick(id: string) {
    setActiveId(id);
    setResult(null);
    setShowExample(false);
  }

  async function grade() {
    if (!active) return;
    setGrading(true);
    setResult(null);
    try {
      const res = await fetch("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: active.kind, refId: active.id, userAnswer: answer }),
      });
      setResult(await res.json());
      setShowExample(true);
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

  if (!active) return <p className="text-muted-foreground">No prompts yet.</p>;

  const words = answer.split(/\s+/).filter(Boolean).length;

  return (
    <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
      {/* Prompt list */}
      <aside className="space-y-1">
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => pick(it.id)}
            className={`flex w-full items-start gap-2 rounded-lg border p-3 text-left text-sm transition ${
              it.id === activeId
                ? "border-primary/50 bg-accent/40"
                : "border-border hover:bg-secondary"
            }`}
          >
            <ChevronRight
              className={`mt-0.5 h-4 w-4 shrink-0 ${
                it.id === activeId ? "text-primary" : "text-muted-foreground"
              }`}
            />
            <span className="min-w-0">
              {it.tag && (
                <span className="block text-[10px] uppercase tracking-wide text-primary">
                  {it.tag}
                </span>
              )}
              <span className="line-clamp-2 text-foreground">{it.prompt}</span>
            </span>
          </button>
        ))}
      </aside>

      {/* Workspace */}
      <div className="space-y-5">
        <div className="rounded-2xl border border-border bg-card p-6">
          {active.tag && (
            <span className="mb-2 inline-block rounded bg-secondary px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              {active.tag}
            </span>
          )}
          <p className="text-lg font-medium text-foreground">{active.prompt}</p>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Structure your answer (STAR for behaviorals)…"
            rows={8}
            className="mt-4 w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-primary"
          />
          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground tnum">{words} words</span>
              {hydrated && words > 0 && (
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Check className="h-3 w-3 text-success" /> Draft saved
                </span>
              )}
              {words > 0 && (
                <button
                  onClick={() => {
                    setAnswer("");
                    clearDraft();
                  }}
                  className="text-xs text-muted-foreground transition hover:text-destructive"
                >
                  Clear
                </button>
              )}
            </div>
            <button
              onClick={grade}
              disabled={grading || words < 5}
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

        {active.exampleAnswer && (
          <div className="rounded-2xl border border-border bg-card p-6">
            {showExample ? (
              <>
                <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                  What strong looks like
                </h3>
                <p className="text-sm text-muted-foreground">{active.exampleAnswer}</p>
              </>
            ) : (
              <button
                onClick={() => setShowExample(true)}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
              >
                <Eye className="h-4 w-4" /> Reveal a strong-answer guide
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
