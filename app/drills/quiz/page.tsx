import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { QuizRunner } from "@/components/quiz/QuizRunner";
import { getQuizQuestions, startSession } from "@/lib/actions/quiz";
import type { QuestionType } from "@/lib/content/types";

export const dynamic = "force-dynamic";

const VALID_TYPES: QuestionType[] = ["mc", "numeric", "order", "fill", "scenario"];

export default async function QuizPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; topics?: string; types?: string; limit?: string }>;
}) {
  const { mode, topics, types, limit } = await searchParams;
  const timed = mode === "timed";

  const topicIds = topics ? topics.split(",").filter(Boolean) : undefined;
  const typeFilter = types
    ? (types.split(",").filter((t) => VALID_TYPES.includes(t as QuestionType)) as QuestionType[])
    : undefined;
  // `limit` absent → default sprint of 12 (card clicks). `limit=all` → no cap.
  // Otherwise a positive integer caps the set.
  let effectiveLimit: number | undefined = 12;
  if (limit === "all") {
    effectiveLimit = undefined;
  } else if (limit != null) {
    const n = Number(limit);
    if (Number.isFinite(n) && n > 0) effectiveLimit = n;
  }

  const questions = await getQuizQuestions({
    topicIds,
    types: typeFilter,
    limit: effectiveLimit,
  });
  const sessionId = await startSession(timed ? "timed_quiz" : "practice_quiz");

  return (
    <div className="space-y-5">
      <Link
        href="/drills"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Drills
      </Link>
      <QuizRunner
        questions={questions}
        mode={timed ? "timed" : "practice"}
        sessionId={sessionId}
      />
    </div>
  );
}
