import Link from "next/link";
import {
  Layers,
  Target,
  BookOpen,
  MessagesSquare,
  Gauge,
  Building2,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { ensureConceptDeck, getDeckStats } from "@/lib/actions/review";

export const dynamic = "force-dynamic";

const DOMAINS = [
  {
    href: "/learn",
    label: "Fundamentals",
    desc: "Operating-partner model, 100-day plans, EBITDA bridges.",
    icon: Layers,
  },
  {
    href: "/drills",
    label: "Returns & Drills",
    desc: "Paper LBO, MOIC/IRR, the three return levers.",
    icon: Target,
  },
  {
    href: "/cases",
    label: "Operational Cases",
    desc: "Diagnose a PortCo, prioritize value-creation levers.",
    icon: BookOpen,
  },
  {
    href: "/behavioral",
    label: "Behavioral",
    desc: "Influence without authority, STAR, ops commitment.",
    icon: MessagesSquare,
  },
  {
    href: "/superday",
    label: "Mock Superday",
    desc: "The full Capstone-style chain, timed and scored.",
    icon: Gauge,
  },
  {
    href: "/firms",
    label: "Firm Intel",
    desc: "Capstone, Bain Capital, Vista, Blackstone & more.",
    icon: Building2,
  },
];

export default async function DashboardPage() {
  await ensureConceptDeck();
  const stats = await getDeckStats();

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          PeOps Prep
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
          Train for the operations seat.
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Spaced repetition, timed drills, AI-graded cases, and a mock Superday —
          built for private equity portfolio-operations and value-creation
          interviews.
        </p>
      </header>

      {/* Readiness + queue placeholders (wired in later phases) */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Readiness
          </p>
          <p className="mt-2 font-mono text-4xl font-semibold tnum text-foreground">
            —
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Builds from mastery + mock scores.
          </p>
        </Card>
        <Link href="/learn">
          <Card className="p-5 transition hover:border-primary/40">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Due today
            </p>
            <p className="mt-2 font-mono text-4xl font-semibold tnum text-foreground">
              {stats.due}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {stats.total} cards in your deck.
            </p>
          </Card>
        </Link>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Streak
          </p>
          <p className="mt-2 font-mono text-4xl font-semibold tnum text-foreground">
            0
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Days active in a row.
          </p>
        </Card>
      </div>

      {/* Domain grid */}
      <section>
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
          Train by domain
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {DOMAINS.map((d) => {
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
                    <p className="mt-1 text-sm text-muted-foreground">
                      {d.desc}
                    </p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
