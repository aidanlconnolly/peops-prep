import Link from "next/link";
import { Layers, ArrowRight } from "lucide-react";
import { Roadmap } from "@/components/curriculum/Roadmap";
import {
  getStages,
  getUnitOutline,
  getUnits,
} from "@/lib/curriculum";
import { getRoadmapSummary } from "@/lib/actions/curriculum";

export const dynamic = "force-dynamic";

export default async function LearnPage() {
  const summary = await getRoadmapSummary();
  const stages = getStages();
  const unitOutline = getUnitOutline();
  const builtUnits = getUnits();

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
            Learning journey
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Learn the fundamentals
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            A taught path from the operating model to interview-ready. Each lesson
            teaches first, then quizzes you — pass the unit checkpoint to unlock
            what&apos;s next.
          </p>
        </div>
        <Link
          href="/review"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-secondary"
        >
          <Layers className="h-4 w-4" /> Flashcard review
        </Link>
      </header>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="tnum font-medium text-foreground">
          {summary.lessonsDoneCount}
        </span>
        <span>of {summary.totalAuthoredLessons} lessons complete</span>
        <ArrowRight className="h-3.5 w-3.5" />
        <span className="tnum font-medium text-foreground">
          {summary.unitsCompleted.length}
        </span>
        <span>units passed</span>
      </div>

      <Roadmap
        stages={stages}
        unitOutline={unitOutline}
        builtUnits={builtUnits}
        unitsCompleted={summary.unitsCompleted}
        lessonsCompleted={summary.lessonsCompleted}
      />
    </div>
  );
}
