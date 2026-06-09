import Link from "next/link";
import Image from "next/image";
import {
  Layers,
  Target,
  BookOpen,
  MessagesSquare,
  Gauge,
  Building2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { ensureConceptDeck } from "@/lib/actions/review";

export const dynamic = "force-dynamic";

const IMG = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1100&q=75`;
const HERO_IMG =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=70";

type Feature = {
  tag: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
  img: string;
  icon: LucideIcon;
};

const FEATURES: Feature[] = [
  {
    tag: "Learn",
    title: "The learning journey",
    desc: "A zig-zag roadmap of units and lessons — the operating-partner model, 100-day plans, EBITDA bridges — unlocking as you clear each unit checkpoint.",
    cta: "Open the roadmap",
    href: "/learn",
    img: IMG("1456513080510-7bf3a84b82f8"),
    icon: GraduationCap,
  },
  {
    tag: "Review",
    title: "Spaced repetition",
    desc: "FSRS-tuned flashcards that resurface each concept exactly when you're about to forget it, so the fundamentals stick before interview day.",
    cta: "Review your deck",
    href: "/review",
    img: IMG("1454165804606-c3d57bc86b40"),
    icon: Layers,
  },
  {
    tag: "Drills",
    title: "Returns, step by step",
    desc: "Multi-format quizzes and an interactive paper-LBO walker — MOIC, IRR, and the three return levers, validated at every step of the waterfall.",
    cta: "Start a drill",
    href: "/drills",
    img: IMG("1554224155-6726b3ff858f"),
    icon: Target,
  },
  {
    tag: "Cases",
    title: "Diagnose a PortCo",
    desc: "Operational cases with real exhibits. Work the business, prioritize value-creation levers, and get AI-graded against a weighted rubric.",
    cta: "Crack a case",
    href: "/cases",
    img: IMG("1565793298595-6a879b1d9492"),
    icon: BookOpen,
  },
  {
    tag: "Behavioral",
    title: "Tell it like an operator",
    desc: "STAR-graded behavioral and ops-technical reps, plus a “My stories” library so your strongest anecdotes stay sharp, tagged, and reusable.",
    cta: "Practice a story",
    href: "/behavioral",
    img: IMG("1600880292203-757bb62b4baf"),
    icon: MessagesSquare,
  },
  {
    tag: "Mock Superday",
    title: "The full gauntlet",
    desc: "A chained, timed, AI-graded mock interview — the Capstone-style superday from first question to final scorecard.",
    cta: "Enter a Superday",
    href: "/superday",
    img: IMG("1521737604893-d14cc237f11d"),
    icon: Gauge,
  },
  {
    tag: "Firms",
    title: "Know the shops",
    desc: "Profiles of KKR Capstone, Bain Capital, Vista, Blackstone PortOps, Apollo and more — plus a firm quiz to lock the details in.",
    cta: "Study the firms",
    href: "/firms",
    img: IMG("1444653614773-995cb1ef9efa"),
    icon: Building2,
  },
  {
    tag: "Mentor",
    title: "A coach on call",
    desc: "A streaming AI mentor that knows your weak spots and your saved stories. Ask it anything, drill on demand, sharpen before the real thing.",
    cta: "Talk to the coach",
    href: "/mentor",
    img: IMG("1573497620053-ea5300f94f21"),
    icon: Sparkles,
  },
];

function FeatureRow({ f, index }: { f: Feature; index: number }) {
  const reverse = index % 2 === 1;
  const Icon = f.icon;
  return (
    <Link
      href={f.href}
      className="group grid overflow-hidden rounded-2xl border border-border bg-card transition hover:border-primary/40 hover:shadow-lg md:grid-cols-2"
    >
      <div
        className={`relative min-h-[220px] md:min-h-[300px] ${
          reverse ? "md:order-2" : ""
        }`}
      >
        <Image
          src={f.img}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-lg bg-background/85 text-primary backdrop-blur">
          <Icon className="h-4.5 w-4.5" />
        </span>
      </div>
      <div className="flex flex-col justify-center gap-3 p-7 md:p-10">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {f.tag}
        </span>
        <h3 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
          {f.title}
        </h3>
        <p className="text-muted-foreground">{f.desc}</p>
        <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          {f.cta}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export default async function HomePage() {
  await ensureConceptDeck();

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-border">
        <Image
          src={HERO_IMG}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/65 to-black/35" />
        <div className="relative px-6 py-20 sm:px-12 sm:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Pe Ops Prep
          </p>
          <h1 className="mt-3 max-w-2xl font-serif text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Train for the operations seat.
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/75 sm:text-lg">
            Spaced repetition, timed drills, AI-graded cases, and a mock
            Superday — built for private equity portfolio-operations and
            value-creation interviews.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Start learning
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/superday"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Try a mock Superday
            </Link>
          </div>
        </div>
      </section>

      {/* Zig-zag tour of every surface */}
      <section className="space-y-5">
        {FEATURES.map((f, i) => (
          <FeatureRow key={f.href} f={f} index={i} />
        ))}
      </section>
    </div>
  );
}
