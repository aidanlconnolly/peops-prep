import Link from "next/link";
import { BookOpen, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { listCases } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

const DIFFICULTY: Record<number, string> = { 1: "Warm-up", 2: "Standard", 3: "Hard" };

export default async function CasesPage() {
  const cases = await listCases();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          Operational Cases
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight">
          PortCo case library
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Frame, diagnose, prioritize levers, draft a 100-day plan, name the
          metrics. AI grading against each rubric arrives in a later phase.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {cases.map((c) => (
          <Link key={c.id} href={`/cases/${c.slug}`}>
            <Card className="group flex h-full flex-col gap-3 p-5 transition hover:border-primary/40">
              <div className="flex items-start justify-between gap-2">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <BookOpen className="h-4 w-4" />
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
              </div>
              <div>
                <h2 className="font-medium leading-tight text-foreground">
                  {c.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{c.sector}</p>
              </div>
              <Badge variant="secondary" className="w-fit">
                {DIFFICULTY[c.difficulty] ?? "Standard"}
              </Badge>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
