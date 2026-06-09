"use client";

import { useEffect } from "react";
import { Lightbulb, Eye } from "lucide-react";
import type {
  Read,
  Framework,
  Worked,
  Compare,
  Insight,
} from "@/lib/curriculum/types";

/** Teaching pages auto-complete: you can always advance after reading. */
function useAutoDone(setDone: (b: boolean) => void) {
  useEffect(() => setDone(true), [setDone]);
}

function Html({ html, className = "" }: { html: string; className?: string }) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function ReadPage({ page, setDone }: { page: Read; setDone: (b: boolean) => void }) {
  useAutoDone(setDone);
  return (
    <div className="space-y-4">
      <h2 className="font-serif text-2xl font-semibold tracking-tight">{page.heading}</h2>
      {page.body.map((p, i) => (
        <p key={i} className="text-[15px] leading-relaxed text-muted-foreground">
          <Html html={p} />
        </p>
      ))}
      {page.keyIdea && (
        <div className="mt-4 rounded-xl bg-accent/40 p-4">
          <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-primary">
            Key idea
          </div>
          <div className="text-sm font-medium text-foreground">{page.keyIdea}</div>
        </div>
      )}
    </div>
  );
}

export function FrameworkPage({ page, setDone }: { page: Framework; setDone: (b: boolean) => void }) {
  useAutoDone(setDone);
  return (
    <div className="space-y-4">
      <h2 className="font-serif text-2xl font-semibold tracking-tight">{page.heading}</h2>
      {page.intro && <p className="text-sm text-muted-foreground">{page.intro}</p>}
      <div className="space-y-2.5">
        {page.items.map((it, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-4">
            <div className="text-sm font-semibold text-foreground">{it.term}</div>
            <div className="mt-1 text-sm text-muted-foreground">{it.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WorkedPage({ page, setDone }: { page: Worked; setDone: (b: boolean) => void }) {
  useAutoDone(setDone);
  return (
    <div className="space-y-4">
      <h2 className="font-serif text-2xl font-semibold tracking-tight">{page.heading}</h2>
      {page.intro && <p className="text-sm text-muted-foreground">{page.intro}</p>}
      <ol className="space-y-2.5">
        {page.steps.map((s, i) => (
          <li key={i} className="flex gap-3 rounded-xl border border-border bg-card p-4">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent font-mono text-xs tnum text-accent-foreground">
              {i + 1}
            </span>
            <div>
              <div className="text-sm font-semibold text-foreground">{s.label}</div>
              <div className="mt-0.5 text-sm text-muted-foreground">{s.detail}</div>
            </div>
          </li>
        ))}
      </ol>
      {page.takeaway && (
        <div className="flex gap-2 rounded-xl border border-primary/30 bg-accent/30 p-4 text-sm">
          <Lightbulb className="h-4 w-4 shrink-0 text-primary" />
          <span className="text-muted-foreground">{page.takeaway}</span>
        </div>
      )}
    </div>
  );
}

export function ComparePage({ page, setDone }: { page: Compare; setDone: (b: boolean) => void }) {
  useAutoDone(setDone);
  return (
    <div className="space-y-4">
      <h2 className="font-serif text-2xl font-semibold tracking-tight">{page.heading}</h2>
      {page.intro && <p className="text-sm text-muted-foreground">{page.intro}</p>}
      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="px-3 py-2 text-left font-medium text-muted-foreground" />
              <th className="px-3 py-2 text-left font-semibold text-foreground">{page.columns[0]}</th>
              <th className="px-3 py-2 text-left font-semibold text-foreground">{page.columns[1]}</th>
            </tr>
          </thead>
          <tbody>
            {page.rows.map((r, i) => (
              <tr key={i} className="border-b border-border/60 last:border-0 align-top">
                <td className="px-3 py-2 font-medium text-muted-foreground">{r.dim}</td>
                <td className="px-3 py-2 text-foreground">{r.a}</td>
                <td className="px-3 py-2 text-foreground">{r.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function InsightPage({ page, setDone }: { page: Insight; setDone: (b: boolean) => void }) {
  useAutoDone(setDone);
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Eye className="h-5 w-5 text-primary" />
        <h2 className="font-serif text-2xl font-semibold tracking-tight">{page.heading}</h2>
      </div>
      <div className="rounded-xl border-l-4 border-primary bg-accent/30 p-4 text-[15px] leading-relaxed text-foreground">
        <Html html={page.body} />
      </div>
    </div>
  );
}
