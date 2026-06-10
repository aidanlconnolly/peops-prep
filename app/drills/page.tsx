import Link from "next/link";
import {
  Target,
  Timer,
  Calculator,
  ListChecks,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { QuizFilters } from "@/components/quiz/QuizFilters";
import { listTopics } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

const DRILLS = [
  {
    href: "/drills/quiz?mode=practice",
    label: "Practice quiz",
    desc: "Mixed formats, untimed, instant feedback and explanations.",
    icon: Target,
  },
  {
    href: "/drills/quiz?mode=timed",
    label: "Timed sprint",
    desc: "12 questions against the clock — a scored session.",
    icon: Timer,
  },
  {
    href: "/drills/paper-lbo",
    label: "Paper-LBO walker",
    desc: "Step through a deal, validated stage by stage, with a return waterfall.",
    icon: Calculator,
  },
  {
    href: "/browse/questions",
    label: "Browse the bank",
    desc: "Read every question and worked solution at your own pace.",
    icon: ListChecks,
  },
];

export default async function DrillsPage() {
  const topics = await listTopics();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          Returns & Drills
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight">
          Drills
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Multiple choice, numeric returns math, ordering, fill-in, and
          operational-judgment scenarios — plus the interactive paper LBO.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {DRILLS.map((d) => {
          const Icon = d.icon;
          return (
            <Link key={d.href} href={d.href}>
              <Card className="group flex h-full flex-row items-start gap-4 p-5 transition hover:border-primary/40">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-medium text-foreground">{d.label}</h3>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{d.desc}</p>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <QuizFilters
        topics={topics.map((t) => ({ id: t.id, name: t.name, domain: t.domain }))}
      />
    </div>
  );
}
