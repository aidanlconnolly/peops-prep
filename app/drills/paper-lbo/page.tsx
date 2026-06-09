import Link from "next/link";
import { ArrowLeft, Calculator, Timer } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LBO_DEALS } from "@/lib/lbo-deals";

export default function PaperLboIndex() {
  return (
    <div className="space-y-6">
      <Link
        href="/drills"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Drills
      </Link>

      <header>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          Paper LBO
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight">
          Step-walker
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Work a deal from entry EV to IRR, validated at each step, ending in a
          return-attribution waterfall. Pick a deal — add the clock for a sprint.
        </p>
      </header>

      <div className="space-y-3">
        {LBO_DEALS.map((d) => (
          <Card key={d.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                <Calculator className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-medium text-foreground">{d.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d.narrative}</p>
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <Link
                href={`/drills/paper-lbo/${d.id}`}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Start
              </Link>
              <Link
                href={`/drills/paper-lbo/${d.id}?timed=1`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-secondary"
              >
                <Timer className="h-4 w-4" /> Timed
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
