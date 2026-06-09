import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export default function DrillsPage() {
  return (
    <PagePlaceholder kicker="Returns & Drills" title="Drills">
      <span className="block">
        The quiz engine and interactive paper-LBO walker arrive in Phase 3.
      </span>
      <Link
        href="/browse/questions"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        Browse the question bank <ArrowRight className="h-4 w-4" />
      </Link>
    </PagePlaceholder>
  );
}
