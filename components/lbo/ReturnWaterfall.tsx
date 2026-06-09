"use client";

import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import type { LboResult } from "@/lib/returns";

/**
 * Equity value-creation bridge: entry equity → +EBITDA growth → +multiple
 * expansion → +debt paydown → exit equity, drawn as a floating-bar waterfall.
 * Each bar is a [start, end] range so it floats at the right height (recharts
 * renders 2-element array dataKeys as floating bars natively).
 */
export function ReturnWaterfall({ result }: { result: LboResult }) {
  const { entryEquity, exitEquity, attribution } = result;

  const rows: {
    name: string;
    range: [number, number];
    delta: number;
    fill: string;
  }[] = [];

  rows.push({
    name: "Entry equity",
    range: [0, entryEquity],
    delta: entryEquity,
    fill: "var(--chart-5)",
  });
  let running = entryEquity;
  const adds: [string, number, string][] = [
    ["EBITDA growth", attribution.ebitdaGrowth, "var(--chart-1)"],
    ["Multiple", attribution.multipleExpansion, "var(--chart-2)"],
    ["Debt paydown", attribution.debtPaydown, "var(--chart-3)"],
  ];
  for (const [name, delta, fill] of adds) {
    rows.push({ name, range: [running, running + delta], delta, fill });
    running += delta;
  }
  rows.push({
    name: "Exit equity",
    range: [0, exitEquity],
    delta: exitEquity,
    fill: "var(--primary)",
  });

  const max = Math.max(entryEquity, exitEquity, running) * 1.12;

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} margin={{ top: 24, right: 8, left: 8, bottom: 8 }}>
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
            interval={0}
          />
          <YAxis hide domain={[0, max]} />
          <Bar dataKey="range" radius={[3, 3, 0, 0]} isAnimationActive={false}>
            {rows.map((r, i) => (
              <Cell key={i} fill={r.fill} />
            ))}
            <LabelList
              dataKey="delta"
              position="top"
              formatter={(v) => `$${Math.round(Number(v))}M`}
              style={{ fontSize: 11, fill: "var(--foreground)" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
