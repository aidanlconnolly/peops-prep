import { NextResponse } from "next/server";
import { z } from "zod";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import { db, schema } from "@/lib/db/client";
import { currentUserId } from "@/lib/user";
import { gradeFreeResponse } from "@/lib/grading/ai";
import type { RefType } from "@/lib/content/types";

export const runtime = "nodejs";

const BodySchema = z.object({
  kind: z.enum(["case", "behavioral", "technical"]),
  refId: z.string(),
  userAnswer: z.string(),
  context: z.string().optional(),
  sessionId: z.string().optional(),
});

export async function POST(req: Request) {
  let body: z.infer<typeof BodySchema>;
  try {
    body = BodySchema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  // Resolve the rubric + prompt + model answer for the referenced item.
  let dimensions;
  let prompt = "";
  let modelAnswer: string | undefined;
  let refType: RefType;

  if (body.kind === "case") {
    const rows = await db
      .select()
      .from(schema.cases)
      .where(eq(schema.cases.id, body.refId))
      .limit(1);
    const c = rows[0];
    if (!c) return NextResponse.json({ error: "not found" }, { status: 404 });
    dimensions = c.rubric.dimensions;
    prompt = `${c.title} — ${c.prompt}`;
    modelAnswer = c.modelAnswer || undefined;
    refType = "case";
  } else if (body.kind === "behavioral") {
    const rows = await db
      .select()
      .from(schema.behavioralPrompts)
      .where(eq(schema.behavioralPrompts.id, body.refId))
      .limit(1);
    const b = rows[0];
    if (!b) return NextResponse.json({ error: "not found" }, { status: 404 });
    dimensions = b.rubric.dimensions;
    prompt = b.prompt;
    modelAnswer = b.exampleStrongAnswer || undefined;
    refType = "behavioral";
  } else {
    const rows = await db
      .select()
      .from(schema.opsTechnicals)
      .where(eq(schema.opsTechnicals.id, body.refId))
      .limit(1);
    const t = rows[0];
    if (!t) return NextResponse.json({ error: "not found" }, { status: 404 });
    dimensions = t.rubric.dimensions;
    prompt = t.prompt;
    modelAnswer = t.idealAnswer || undefined;
    refType = "technical";
  }

  const result = await gradeFreeResponse({
    dimensions,
    prompt,
    userAnswer: body.userAnswer,
    context: body.context,
    modelAnswer,
  });

  // Record the attempt (best-effort).
  try {
    await db.insert(schema.attempts).values({
      id: nanoid(),
      userId: currentUserId(),
      refType,
      refId: body.refId,
      score: result.overall / 100,
      userAnswer: { text: body.userAnswer },
      aiFeedback: JSON.stringify(result),
      sessionId: body.sessionId ?? null,
      createdAt: Date.now(),
    });
  } catch (err) {
    console.error("attempt insert failed:", err);
  }

  return NextResponse.json(result);
}
