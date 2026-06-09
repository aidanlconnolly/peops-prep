import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { QuizRunner } from "@/components/quiz/QuizRunner";
import { getQuizQuestions, startSession } from "@/lib/actions/quiz";

export const dynamic = "force-dynamic";

export default async function QuizPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const { mode } = await searchParams;
  const timed = mode === "timed";
  const questions = await getQuizQuestions({ limit: timed ? 12 : 12 });
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
