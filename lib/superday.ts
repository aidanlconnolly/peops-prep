/**
 * Mock-Superday script. Chains the Capstone-style sequence — initial screen →
 * first round → superday technical block → final — into one timed session,
 * pulling real seed prompts plus a couple of ad-hoc fit questions.
 */
import { inArray, eq } from "drizzle-orm";
import { db, schema } from "@/lib/db/client";
import { LBO_DEALS } from "@/lib/lbo-deals";
import { computeLbo, round as rnd } from "@/lib/returns";
import type { RubricDimension } from "@/lib/content/types";

export type SuperdayStation =
  | {
      id: string;
      round: number;
      roundLabel: string;
      title: string;
      type: "behavioral" | "case" | "technical";
      refId: string;
      prompt: string;
      modelAnswer?: string;
    }
  | {
      id: string;
      round: number;
      roundLabel: string;
      title: string;
      type: "adhoc";
      prompt: string;
      dimensions: RubricDimension[];
      modelAnswer?: string;
    }
  | {
      id: string;
      round: number;
      roundLabel: string;
      title: string;
      type: "lbo";
      prompt: string;
      moic: number;
      irr: number;
    };

export const ROUND_LABELS = [
  "Initial screen",
  "First round",
  "Superday",
  "Final",
];

const FIT_DIMS: RubricDimension[] = [
  { key: "motivation", label: "Motivation", weight: 0.3, guidance: "Genuine, specific reasons for PE ops." },
  { key: "structure", label: "Structure", weight: 0.25, guidance: "Clear, easy-to-follow narrative." },
  { key: "fit", label: "Fit / evidence", weight: 0.25, guidance: "Backed by real experience." },
  { key: "concision", label: "Concision", weight: 0.2, guidance: "Tight, ~2 minutes." },
];

const STRATEGIC_DIMS: RubricDimension[] = [
  { key: "insight", label: "Strategic insight", weight: 0.4, guidance: "A real point of view on where ops value creation is heading." },
  { key: "evidence", label: "Evidence", weight: 0.3, guidance: "Grounded in trends/examples, not platitudes." },
  { key: "fit", label: "Firm fit", weight: 0.3, guidance: "Connects the view to why this seat." },
];

export async function buildSuperday(): Promise<SuperdayStation[]> {
  const behavioralIds = ["b-influence-1"];
  const technicalIds = ["t-salesforce-reorg", "t-skeptical-ceo-procurement"];
  const caseId = "case-industrial-distributor";

  const [behavioral, technicals, caseRows] = await Promise.all([
    db
      .select()
      .from(schema.behavioralPrompts)
      .where(inArray(schema.behavioralPrompts.id, behavioralIds)),
    db
      .select()
      .from(schema.opsTechnicals)
      .where(inArray(schema.opsTechnicals.id, technicalIds)),
    db.select().from(schema.cases).where(eq(schema.cases.id, caseId)).limit(1),
  ]);

  const b = behavioral[0];
  const c = caseRows[0];
  const deal = LBO_DEALS[0];
  const r = computeLbo(deal.inputs);

  const stations: SuperdayStation[] = [];

  // Round 1 — Initial screen
  stations.push({
    id: "sd-motivation",
    round: 1,
    roundLabel: ROUND_LABELS[0],
    title: "Motivation & resume walkthrough",
    type: "adhoc",
    prompt:
      "Walk me through your background and why you want a private-equity portfolio-operations seat — and why ops rather than a deal-side role.",
    dimensions: FIT_DIMS,
  });

  // Round 2 — First round (behavioral + case)
  if (b) {
    stations.push({
      id: "sd-behavioral",
      round: 2,
      roundLabel: ROUND_LABELS[1],
      title: "Behavioral — influence without authority",
      type: "behavioral",
      refId: b.id,
      prompt: b.prompt,
      modelAnswer: b.exampleStrongAnswer,
    });
  }
  if (c) {
    stations.push({
      id: "sd-case",
      round: 2,
      roundLabel: ROUND_LABELS[1],
      title: "Operational case",
      type: "case",
      refId: c.id,
      prompt: `${c.companyContext}\n\n${c.prompt}`,
      modelAnswer: c.modelAnswer,
    });
  }

  // Round 3 — Superday technical block
  stations.push({
    id: "sd-lbo",
    round: 3,
    roundLabel: ROUND_LABELS[2],
    title: "Returns — paper LBO",
    type: "lbo",
    prompt: `${deal.title}: entry $${deal.inputs.entryEbitda}M EBITDA at ${deal.inputs.entryMultiple.toFixed(1)}x, ${Math.round(deal.inputs.leveragePct * 100)}% debt; EBITDA grows to $${deal.inputs.exitEbitda}M, exit at ${deal.inputs.exitMultiple.toFixed(1)}x, net debt $${deal.inputs.exitNetDebt}M at exit over ${deal.inputs.holdYears} years. Give MOIC and approximate IRR.`,
    moic: rnd(r.moic, 2),
    irr: rnd(r.irr, 0),
  });
  for (const t of technicals) {
    stations.push({
      id: `sd-${t.id}`,
      round: 3,
      roundLabel: ROUND_LABELS[2],
      title: "Operational technical",
      type: "technical",
      refId: t.id,
      prompt: t.prompt,
      modelAnswer: t.idealAnswer,
    });
  }

  // Round 4 — Final
  stations.push({
    id: "sd-final",
    round: 4,
    roundLabel: ROUND_LABELS[3],
    title: "Fit & strategic thinking",
    type: "adhoc",
    prompt:
      "Where do you think operational value creation in PE is heading over the next five years, and how does that shape where you want to build your career?",
    dimensions: STRATEGIC_DIMS,
  });

  return stations;
}
