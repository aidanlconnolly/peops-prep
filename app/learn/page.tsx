import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ReviewSession } from "@/components/review/ReviewSession";
import { ensureConceptDeck, getDueCards, getDeckStats } from "@/lib/actions/review";

export const dynamic = "force-dynamic";

export default async function LearnPage() {
  // Seed any new concepts into the deck, then load what's due.
  await ensureConceptDeck();
  const [due, stats] = await Promise.all([getDueCards(40), getDeckStats()]);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
            Fundamentals
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight">
            Daily review
          </h1>
          <p className="mt-2 text-muted-foreground">
            Spaced-repetition flashcards. Rate yourself honestly — FSRS schedules
            the next look.
          </p>
        </div>
        <Link
          href="/browse/concepts"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          Browse all {stats.total} cards <ArrowRight className="h-4 w-4" />
        </Link>
      </header>

      {due.length > 0 ? (
        <ReviewSession cards={due} />
      ) : (
        <Card className="mx-auto flex max-w-md flex-col items-center gap-3 py-14 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground">
            <Layers className="h-6 w-6" />
          </span>
          <h2 className="font-serif text-xl font-semibold">Nothing due</h2>
          <p className="max-w-xs text-sm text-muted-foreground">
            All {stats.total} cards are scheduled for later. Missed quiz items will
            also resurface here.
          </p>
        </Card>
      )}
    </div>
  );
}
