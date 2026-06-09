/**
 * AI free-response grading. Asks Claude to grade a written answer against a
 * weighted rubric and return strict JSON via a forced tool call (cleaner than
 * parsing prose). Validated with zod. Degrades gracefully with no API key.
 *
 * Server-only — imported by Route Handlers, never the client.
 */
import { z } from "zod";
import { anthropic, hasAnthropicKey, MODEL_SMART } from "@/lib/anthropic";
import type { RubricDimension } from "@/lib/content/types";

/** Who's grading + who's being graded — sharpens the feedback. */
export const PERSONA = `You are a senior interviewer for a private-equity portfolio-operations / value-creation team (think KKR Capstone, Bain Capital Portfolio Group, Vista VCG, Blackstone Portfolio Operations). You are evaluating an incoming Wharton MBA and ex-BCG consultant (buyside/sellside diligence, arbitrage models, a federal shipyard-throughput operations project). You are demanding but constructive: reward structure, prioritization, quantification, feasibility, and influence-without-authority. Penalize action-before-diagnosis, hand-waving, and boil-the-ocean answers. Be specific and concise.`;

export type DimensionScore = {
  key: string;
  label: string;
  score: number; // 0..5
  comment: string;
};

export type GradeResult = {
  overall: number; // 0..100, weighted
  dimensions: DimensionScore[];
  strengths: string[];
  gaps: string[];
  suggestion: string;
  /** True when produced by the fallback (no API key / error). */
  unavailable?: boolean;
};

const ScoreSchema = z.object({
  scores: z
    .array(
      z.object({
        key: z.string(),
        score: z.number().min(0).max(5),
        comment: z.string(),
      }),
    )
    .min(1),
  strengths: z.array(z.string()),
  gaps: z.array(z.string()),
  suggestion: z.string(),
});

export type GradeRequest = {
  dimensions: RubricDimension[];
  prompt: string;
  userAnswer: string;
  context?: string;
  modelAnswer?: string;
};

function weightedOverall(
  dims: RubricDimension[],
  scores: { key: string; score: number }[],
): number {
  const byKey = new Map(scores.map((s) => [s.key, s.score]));
  let acc = 0;
  let wsum = 0;
  for (const d of dims) {
    const s = byKey.get(d.key);
    if (s == null) continue;
    acc += (s / 5) * d.weight;
    wsum += d.weight;
  }
  if (wsum === 0) return 0;
  return Math.round((acc / wsum) * 100);
}

export async function gradeFreeResponse(
  req: GradeRequest,
): Promise<GradeResult> {
  const dims = req.dimensions;

  if (!hasAnthropicKey() || req.userAnswer.trim().length < 4) {
    return {
      overall: 0,
      dimensions: dims.map((d) => ({
        key: d.key,
        label: d.label,
        score: 0,
        comment: hasAnthropicKey()
          ? "Write a fuller answer to be graded."
          : "AI grading is offline — set ANTHROPIC_API_KEY to enable it.",
      })),
      strengths: [],
      gaps: [],
      suggestion: hasAnthropicKey()
        ? "Add more substance, then resubmit."
        : "Compare your answer to the model answer below in the meantime.",
      unavailable: !hasAnthropicKey(),
    };
  }

  const tool = {
    name: "submit_grade",
    description: "Return the structured grade for the candidate's answer.",
    input_schema: {
      type: "object" as const,
      properties: {
        scores: {
          type: "array",
          items: {
            type: "object",
            properties: {
              key: { type: "string", description: "rubric dimension key" },
              score: { type: "number", description: "0 to 5" },
              comment: { type: "string", description: "one specific sentence" },
            },
            required: ["key", "score", "comment"],
          },
        },
        strengths: { type: "array", items: { type: "string" } },
        gaps: { type: "array", items: { type: "string" } },
        suggestion: {
          type: "string",
          description: "one tightened rewrite or next-step suggestion",
        },
      },
      required: ["scores", "strengths", "gaps", "suggestion"],
    },
  };

  const rubricText = dims
    .map((d) => `- ${d.key} ("${d.label}", weight ${d.weight}): ${d.guidance ?? ""}`)
    .join("\n");

  const userMsg = [
    `QUESTION:\n${req.prompt}`,
    req.context ? `\nCONTEXT:\n${req.context}` : "",
    `\nRUBRIC (score each 0-5):\n${rubricText}`,
    req.modelAnswer ? `\nREFERENCE / MODEL ANSWER (do not reveal verbatim):\n${req.modelAnswer}` : "",
    `\nCANDIDATE ANSWER:\n${req.userAnswer}`,
    `\nScore every rubric dimension by its key. Be specific in comments, strengths, and gaps. Keep it tight.`,
  ].join("\n");

  try {
    const msg = await anthropic().messages.create({
      model: MODEL_SMART,
      max_tokens: 1200,
      system: PERSONA,
      tools: [tool],
      tool_choice: { type: "tool", name: "submit_grade" },
      messages: [{ role: "user", content: userMsg }],
    });

    const block = msg.content.find((b) => b.type === "tool_use");
    if (!block || block.type !== "tool_use") throw new Error("no tool_use block");
    const parsed = ScoreSchema.parse(block.input);

    const labelByKey = new Map(dims.map((d) => [d.key, d.label]));
    const dimensions: DimensionScore[] = parsed.scores.map((s) => ({
      key: s.key,
      label: labelByKey.get(s.key) ?? s.key,
      score: s.score,
      comment: s.comment,
    }));

    return {
      overall: weightedOverall(dims, parsed.scores),
      dimensions,
      strengths: parsed.strengths,
      gaps: parsed.gaps,
      suggestion: parsed.suggestion,
    };
  } catch (err) {
    console.error("gradeFreeResponse failed:", err);
    return {
      overall: 0,
      dimensions: dims.map((d) => ({
        key: d.key,
        label: d.label,
        score: 0,
        comment: "Grading hit an error — try again.",
      })),
      strengths: [],
      gaps: [],
      suggestion: "The grader is temporarily unavailable. Compare to the model answer below.",
      unavailable: true,
    };
  }
}
