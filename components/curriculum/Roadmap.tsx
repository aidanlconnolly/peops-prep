"use client";

import Link from "next/link";
import { Check, Lock, ArrowRight } from "lucide-react";
import type { Stage, Unit, UnitPreview } from "@/lib/curriculum/types";

export function Roadmap({
  stages,
  unitOutline,
  builtUnits,
  unitsCompleted,
  lessonsCompleted,
}: {
  stages: Stage[];
  unitOutline: UnitPreview[];
  builtUnits: Unit[];
  unitsCompleted: string[];
  lessonsCompleted: string[];
}) {
  const completedUnits = new Set(unitsCompleted);
  const completedLessons = new Set(lessonsCompleted);
  const builtSlugs = new Set(builtUnits.map((u) => u.slug));

  // Stage N unlocked when all prior-stage units are complete (N=1 always open).
  const stageUnlocked: Record<number, boolean> = { 1: true };
  for (const stage of stages) {
    if (stage.number === 1) continue;
    const prevUnits = unitOutline.filter((u) => u.stage === stage.number - 1);
    stageUnlocked[stage.number] =
      prevUnits.length > 0 && prevUnits.every((u) => completedUnits.has(u.slug));
  }

  return (
    <div className="space-y-12">
      {stages.map((stage) => {
        const units = unitOutline.filter((u) => u.stage === stage.number);
        const unlocked = stageUnlocked[stage.number];
        return (
          <section key={stage.number}>
            <div
              className={`mb-6 border-l-2 pl-4 ${unlocked ? "border-primary" : "border-border opacity-60"}`}
            >
              <div className="text-[10px] font-bold uppercase tracking-widest text-primary">
                Stage {stage.number}
              </div>
              <h2 className="font-serif text-xl font-semibold tracking-tight">
                {stage.title}
                {!unlocked && (
                  <span className="ml-2 text-xs font-normal text-muted-foreground">🔒 Locked</span>
                )}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{stage.blurb}</p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 top-2 hidden h-[calc(100%-1rem)] w-px -translate-x-1/2 border-l border-dashed border-border sm:block" />
              <ul className="space-y-6">
                {units.map((u, i) => (
                  <UnitNode
                    key={u.slug}
                    unit={u}
                    side={i % 2 === 0 ? "left" : "right"}
                    isBuilt={builtSlugs.has(u.slug)}
                    isCompleted={completedUnits.has(u.slug)}
                    isUnlocked={unlocked && (i === 0 || completedUnits.has(units[i - 1].slug))}
                    completedLessons={completedLessons}
                    builtUnits={builtUnits}
                  />
                ))}
              </ul>
            </div>
          </section>
        );
      })}
    </div>
  );
}

function UnitNode({
  unit,
  side,
  isBuilt,
  isCompleted,
  isUnlocked,
  completedLessons,
  builtUnits,
}: {
  unit: UnitPreview;
  side: "left" | "right";
  isBuilt: boolean;
  isCompleted: boolean;
  isUnlocked: boolean;
  completedLessons: Set<string>;
  builtUnits: Unit[];
}) {
  const built = isBuilt ? builtUnits.find((b) => b.slug === unit.slug) : undefined;
  const lessons = built?.lessons ?? [];
  const doneCount = lessons.filter((l) => completedLessons.has(l.slug)).length;
  const allLessonsDone = lessons.length > 0 && doneCount === lessons.length;

  const status: "complete" | "active" | "available" | "locked" | "preview" = isCompleted
    ? "complete"
    : !isBuilt
      ? "preview"
      : !isUnlocked
        ? "locked"
        : doneCount > 0
          ? "active"
          : "available";

  const ring =
    status === "complete"
      ? "border-success/50"
      : status === "active"
        ? "border-primary/50 ring-1 ring-primary/20"
        : status === "preview" || status === "locked"
          ? "border-border opacity-70"
          : "border-border";

  let href: string | null = null;
  if (isBuilt && isUnlocked && built) {
    if (isCompleted) href = `/learn/${unit.slug}/${lessons[0].slug}`;
    else if (allLessonsDone) href = `/learn/${unit.slug}/checkpoint`;
    else {
      const nextLesson = lessons.find((l) => !completedLessons.has(l.slug)) ?? lessons[0];
      href = `/learn/${unit.slug}/${nextLesson.slug}`;
    }
  }

  const cta =
    status === "complete"
      ? "Review"
      : status === "active"
        ? allLessonsDone
          ? "Take checkpoint"
          : "Continue"
        : status === "available"
          ? "Start"
          : null;

  const card = (
    <div className={`w-full rounded-xl border bg-card p-4 transition ${ring} ${href ? "hover:-translate-y-0.5 hover:shadow-md" : ""}`}>
      <div className="flex items-start gap-3">
        <span
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-2xl ${
            status === "complete"
              ? "bg-success/10"
              : status === "active"
                ? "bg-accent"
                : "bg-secondary"
          }`}
        >
          {unit.icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Unit {unit.order}
          </div>
          <div className="text-sm font-semibold leading-tight text-foreground">{unit.title}</div>
        </div>
        {status === "complete" && <Check className="h-4 w-4 shrink-0 text-success" />}
        {status === "locked" && <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />}
        {status === "preview" && (
          <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            soon
          </span>
        )}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{unit.tagline}</p>

      {lessons.length > 0 && (
        <div className="mt-3 flex items-center gap-1.5">
          {lessons.map((l) => (
            <span
              key={l.slug}
              title={l.title}
              className={`h-1.5 w-1.5 rounded-full ${
                completedLessons.has(l.slug) ? "bg-success" : "bg-secondary"
              }`}
            />
          ))}
          <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground tnum">
            {doneCount > 0 ? `${doneCount}/${lessons.length}` : `${lessons.length} lessons`}
          </span>
        </div>
      )}

      {cta && (
        <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
          {cta} <ArrowRight className="h-3 w-3" />
        </div>
      )}
    </div>
  );

  return (
    <li className={`flex ${side === "left" ? "sm:justify-start" : "sm:justify-end"}`}>
      <div className="sm:w-[calc(50%-1.25rem)]">
        {href ? (
          <Link href={href} className="block">
            {card}
          </Link>
        ) : (
          card
        )}
      </div>
    </li>
  );
}
