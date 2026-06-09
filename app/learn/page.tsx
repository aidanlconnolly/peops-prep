import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export default function LearnPage() {
  return (
    <PagePlaceholder kicker="Fundamentals" title="Learn">
      <span className="block">
        Flashcards with spaced repetition land in Phase 2.
      </span>
      <Link
        href="/browse/concepts"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        Browse all concepts <ArrowRight className="h-4 w-4" />
      </Link>
    </PagePlaceholder>
  );
}
