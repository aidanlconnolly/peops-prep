import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Markdown } from "@/components/Markdown";
import { listQuestions } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

const TYPE_LABEL: Record<string, string> = {
  mc: "Multiple choice",
  numeric: "Numeric",
  order: "Ordering",
  fill: "Fill-in",
  scenario: "Scenario",
};

export default async function BrowseQuestionsPage() {
  const questions = await listQuestions();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Link
          href="/drills"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Drills
        </Link>
        <h1 className="font-serif text-3xl font-semibold tracking-tight">
          Question bank
        </h1>
        <p className="text-muted-foreground">
          {questions.length} questions across five formats. The interactive runner
          arrives in Phase 3.
        </p>
      </div>

      <div className="space-y-3">
        {questions.map((q) => (
          <Card key={q.id} className="space-y-3 p-5">
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge>{TYPE_LABEL[q.type] ?? q.type}</Badge>
              {q.timeLimitSec && (
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> {q.timeLimitSec}s
                </span>
              )}
              {q.tags.map((t) => (
                <span
                  key={t}
                  className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="font-medium text-foreground">
              <Markdown>{q.prompt}</Markdown>
            </div>
            {q.choices && (
              <ul className="space-y-1 text-sm text-muted-foreground">
                {q.choices.map((ch) => (
                  <li key={ch.id} className="flex gap-2">
                    <span className="font-mono uppercase text-faint">{ch.id}.</span>
                    <span>{ch.text}</span>
                  </li>
                ))}
              </ul>
            )}
            <details className="border-t border-border pt-3 text-sm">
              <summary className="cursor-pointer font-medium text-muted-foreground">
                Answer & explanation
              </summary>
              <div className="mt-2 text-muted-foreground">
                <Markdown>{q.explanation}</Markdown>
              </div>
            </details>
          </Card>
        ))}
      </div>
    </div>
  );
}
