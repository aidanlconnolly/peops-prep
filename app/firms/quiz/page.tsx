import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { QuizRunner } from "@/components/quiz/QuizRunner";
import { getQuizQuestions, startSession } from "@/lib/actions/quiz";

export const dynamic = "force-dynamic";

export default async function FirmQuizPage() {
  const questions = await getQuizQuestions({ topicIds: ["firm-models"] });
  const sessionId = await startSession("firm_quiz");

  return (
    <div className="space-y-5">
      <Link
        href="/firms"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Firms
      </Link>
      <QuizRunner questions={questions} mode="practice" sessionId={sessionId} />
    </div>
  );
}
