import { BehavioralTabs } from "@/components/behavioral/BehavioralTabs";
import type { PracticeItem } from "@/components/practice/FreeResponsePractice";
import { COMPETENCY_LABELS } from "@/lib/content/types";
import { listBehavioral, listTechnicals } from "@/lib/db/queries";
import { listStories } from "@/lib/actions/stories";

export const dynamic = "force-dynamic";

export default async function BehavioralPage() {
  const [behavioralRows, technicalRows, stories] = await Promise.all([
    listBehavioral(),
    listTechnicals(),
    listStories(),
  ]);

  const behavioral: PracticeItem[] = behavioralRows.map((b) => ({
    id: b.id,
    kind: "behavioral",
    tag: COMPETENCY_LABELS[b.competency],
    prompt: b.prompt,
    exampleAnswer: b.exampleStrongAnswer,
  }));

  const technical: PracticeItem[] = technicalRows.map((t) => ({
    id: t.id,
    kind: "technical",
    tag: t.tags[0],
    prompt: t.prompt,
    exampleAnswer: t.idealAnswer,
  }));

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          Behavioral / Influence
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight">
          Practice & stories
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          STAR-graded behavioral and operational-technical practice, plus a
          library of your reusable anecdotes.
        </p>
      </header>

      <BehavioralTabs
        behavioral={behavioral}
        technical={technical}
        stories={stories}
      />
    </div>
  );
}
