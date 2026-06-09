/**
 * Static paper-LBO deals for the step-walker. Step targets are derived from the
 * pure math in lib/returns.ts so the validated answers can't drift from reality.
 */
import { computeLbo, round, type LboInputs } from "@/lib/returns";

export type LboStep = {
  key: string;
  label: string;
  prompt: string;
  answer: number;
  unit: string;
  tol?: number;
  tolPct?: number;
  explain: string;
};

export type LboDeal = {
  id: string;
  title: string;
  narrative: string;
  inputs: LboInputs;
  steps: LboStep[];
};

function buildSteps(inp: LboInputs): LboStep[] {
  const r = computeLbo(inp);
  return [
    {
      key: "entryEv",
      label: "Entry enterprise value",
      prompt: `Entry at ${inp.entryMultiple.toFixed(1)}x on $${inp.entryEbitda}M EBITDA. What is the entry EV?`,
      answer: r.entryEv,
      unit: "$M",
      tol: 1,
      explain: `EV = EBITDA × multiple = $${inp.entryEbitda}M × ${inp.entryMultiple.toFixed(1)}x = $${r.entryEv}M.`,
    },
    {
      key: "entryEquity",
      label: "Sponsor equity (entry)",
      prompt: `Financed ${Math.round(inp.leveragePct * 100)}% debt. How much sponsor equity goes in?`,
      answer: r.entryEquity,
      unit: "$M",
      tol: 1,
      explain: `Debt = ${Math.round(inp.leveragePct * 100)}% × $${r.entryEv}M = $${r.entryDebt}M. Equity = EV − debt = $${r.entryEquity}M.`,
    },
    {
      key: "exitEv",
      label: "Exit enterprise value",
      prompt: `EBITDA grows to $${inp.exitEbitda}M; exit at ${inp.exitMultiple.toFixed(1)}x. What is the exit EV?`,
      answer: r.exitEv,
      unit: "$M",
      tol: 1,
      explain: `Exit EV = $${inp.exitEbitda}M × ${inp.exitMultiple.toFixed(1)}x = $${r.exitEv}M.`,
    },
    {
      key: "exitEquity",
      label: "Exit equity value",
      prompt: `Net debt is paid down to $${inp.exitNetDebt}M at exit. What is the exit equity value?`,
      answer: r.exitEquity,
      unit: "$M",
      tol: 1,
      explain: `Exit equity = exit EV − net debt = $${r.exitEv}M − $${inp.exitNetDebt}M = $${r.exitEquity}M.`,
    },
    {
      key: "moic",
      label: "MOIC",
      prompt: "What multiple on invested capital (MOIC) does that imply?",
      answer: round(r.moic, 2),
      unit: "x",
      tol: 0.05,
      explain: `MOIC = exit equity ÷ entry equity = $${r.exitEquity}M ÷ $${r.entryEquity}M = ${round(r.moic, 2)}x.`,
    },
    {
      key: "irr",
      label: "Approx IRR",
      prompt: `Over a ${inp.holdYears}-year hold, approximately what IRR is that?`,
      answer: round(r.irr, 0),
      unit: "%",
      tolPct: 0.15,
      explain: `IRR ≈ MOIC^(1/years) − 1 = ${round(r.moic, 2)}^(1/${inp.holdYears}) − 1 ≈ ${round(r.irr, 0)}%. Rule of 72 sanity-checks it.`,
    },
  ];
}

const DEAL_INPUTS: { id: string; title: string; narrative: string; inputs: LboInputs }[] = [
  {
    id: "classic-275x",
    title: "Classic 2.75x",
    narrative:
      "A clean, flat-multiple growth-and-paydown deal — the canonical paper LBO.",
    inputs: {
      entryEbitda: 100,
      entryMultiple: 10,
      leveragePct: 0.6,
      exitEbitda: 150,
      exitMultiple: 10,
      exitNetDebt: 400,
      holdYears: 5,
    },
  },
  {
    id: "mid-market",
    title: "Mid-market roll-up",
    narrative: "Smaller cap, more leverage, healthy organic EBITDA growth.",
    inputs: {
      entryEbitda: 50,
      entryMultiple: 8,
      leveragePct: 0.55,
      exitEbitda: 75,
      exitMultiple: 8,
      exitNetDebt: 120,
      holdYears: 5,
    },
  },
  {
    id: "multiple-expansion",
    title: "Re-rating play",
    narrative:
      "Growth plus a two-turn multiple expansion at exit — all three levers fire.",
    inputs: {
      entryEbitda: 40,
      entryMultiple: 9,
      leveragePct: 0.6,
      exitEbitda: 60,
      exitMultiple: 11,
      exitNetDebt: 180,
      holdYears: 5,
    },
  },
];

export const LBO_DEALS: LboDeal[] = DEAL_INPUTS.map((d) => ({
  ...d,
  steps: buildSteps(d.inputs),
}));

export function getDeal(id: string): LboDeal | undefined {
  return LBO_DEALS.find((d) => d.id === id);
}
