import { z } from "zod";
import { anthropic, hasAnthropicKey, MODEL_SMART } from "@/lib/anthropic";

export const runtime = "nodejs";

const BodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      }),
    )
    .min(1),
});

const SYSTEM = `You are a sharp, supportive interview coach for private-equity portfolio-operations / value-creation roles (KKR Capstone, Bain Capital Portfolio Group, Vista VCG, Blackstone Portfolio Operations, Apollo APPS, Carlyle, CD&R, TPG Ops). You are coaching an incoming Wharton MBA and ex-BCG consultant (buyside/sellside diligence, arbitrage models, a federal shipyard-throughput operations project).

You can: explain any concept (LBO math, value-creation levers, operating models), generate a fresh operational case or behavioral prompt on demand, drill the user's weak areas, and run a quick mock interview round. Be concise and practical. Push for structure, prioritization, quantification, and influence-without-authority. When you run a mock, ask one question at a time and give crisp feedback before moving on. Use markdown (bold, lists, small tables) but keep answers tight.`;

export async function POST(req: Request) {
  let body: z.infer<typeof BodySchema>;
  try {
    body = BodySchema.parse(await req.json());
  } catch {
    return new Response("bad request", { status: 400 });
  }

  if (!hasAnthropicKey()) {
    return new Response(
      "The AI mentor is offline — set `ANTHROPIC_API_KEY` in the environment to enable it. In the meantime, use the Drills, Cases, and Behavioral sections for self-paced practice.",
      { headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  }

  const stream = anthropic().messages.stream({
    model: MODEL_SMART,
    max_tokens: 1500,
    system: SYSTEM,
    messages: body.messages.map((m) => ({ role: m.role, content: m.content })),
  });

  const encoder = new TextEncoder();
  const rs = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        console.error("mentor stream error:", err);
        controller.enqueue(encoder.encode("\n\n[The mentor hit an error — try again.]"));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(rs, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
