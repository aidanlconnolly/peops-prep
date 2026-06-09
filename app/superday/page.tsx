import Link from "next/link";
import { Gauge, Play, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SuperdayRunner } from "@/components/superday/SuperdayRunner";
import { buildSuperday, ROUND_LABELS } from "@/lib/superday";
import { startSession } from "@/lib/actions/quiz";

export const dynamic = "force-dynamic";

export default async function SuperdayPage({
  searchParams,
}: {
  searchParams: Promise<{ start?: string }>;
}) {
  const { start } = await searchParams;
  const stations = await buildSuperday();

  if (start === "1") {
    const sessionId = await startSession("superday");
    return (
      <div className="space-y-5">
        <h1 className="font-serif text-2xl font-semibold tracking-tight">
          Mock Superday
        </h1>
        <SuperdayRunner stations={stations} sessionId={sessionId} />
      </div>
    );
  }

  const rounds = ROUND_LABELS.map((label, i) => ({
    label,
    count: stations.filter((s) => s.round === i + 1).length,
  }));

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header className="text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground">
          <Gauge className="h-6 w-6" />
        </div>
        <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight">
          Mock Superday
        </h1>
        <p className="mt-2 text-muted-foreground">
          The full Capstone-style chain in one sitting — {stations.length}{" "}
          stations, AI-graded, ending in a scorecard with your top fixes.
        </p>
      </header>

      <Card className="divide-y divide-border p-0">
        {rounds.map((r, i) => (
          <div key={r.label} className="flex items-center gap-4 p-4">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary font-mono text-xs tnum text-muted-foreground">
              {i + 1}
            </span>
            <div className="flex-1">
              <p className="font-medium text-foreground">{r.label}</p>
              <p className="text-xs text-muted-foreground">
                {r.count} {r.count === 1 ? "station" : "stations"}
              </p>
            </div>
          </div>
        ))}
      </Card>

      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" /> ~30–40 minutes
        </span>
        <Link
          href="/superday?start=1"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          <Play className="h-4 w-4" /> Start Superday
        </Link>
      </div>
    </div>
  );
}
