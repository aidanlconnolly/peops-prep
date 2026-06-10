"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Firm } from "@/lib/db/schema";

const MODEL_LABEL: Record<string, string> = {
  centralized: "Centralized",
  embedded: "Embedded",
  advisor: "Operator-led",
  hybrid: "Hybrid",
};

export function FirmCompare({ firms }: { firms: Firm[] }) {
  // All firms selected by default; toggle to narrow the comparison.
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(firms.map((f) => f.id)),
  );

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id); // keep at least one
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const rows = firms.filter((f) => selected.has(f.id));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {firms.map((f) => (
          <button
            key={f.id}
            onClick={() => toggle(f.id)}
            className={`rounded-full border px-2.5 py-1 text-xs transition ${
              selected.has(f.id)
                ? "border-primary/50 bg-accent text-accent-foreground"
                : "border-border text-muted-foreground hover:bg-secondary"
            }`}
          >
            {f.name}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-card text-left">
              <Th className="sticky left-0 bg-card">Firm</Th>
              <Th>Model</Th>
              <Th>MBA accessibility</Th>
              <Th>Post-MBA comp</Th>
              <Th>Intern comp</Th>
              <Th>Process</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((f) => (
              <tr key={f.id} className="border-b border-border last:border-0 align-top">
                <td className="sticky left-0 bg-background px-4 py-3 font-medium text-foreground">
                  <Link
                    href={`/firms/${f.slug}`}
                    className="group inline-flex items-center gap-1 hover:text-primary"
                  >
                    {f.name}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="secondary">{MODEL_LABEL[f.model] ?? f.model}</Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{f.mbaAccessibility}</td>
                <td className="px-4 py-3 text-muted-foreground tnum">
                  {f.comp.postMbaAssociateTotal ?? "—"}
                </td>
                <td className="px-4 py-3 text-muted-foreground tnum">
                  {f.comp.mbaIntern ?? "—"}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {f.interviewProcess.rounds.length} rounds
                  </span>
                  <span className="mt-0.5 block text-xs">
                    {f.interviewProcess.rounds.map((r) => r.name).join(" → ")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <th
      className={`px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground ${className}`}
    >
      {children}
    </th>
  );
}
