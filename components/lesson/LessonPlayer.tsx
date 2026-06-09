"use client";

import Link from "next/link";
import { useCallback, useState, useTransition } from "react";
import { ArrowLeft, ArrowRight, Check, PartyPopper } from "lucide-react";
import type { Lesson, LessonPage, Unit } from "@/lib/curriculum/types";
import { markLessonDone } from "@/lib/actions/curriculum";
import { PRACTICE_LINKS } from "@/lib/curriculum";
import {
  ReadPage,
  FrameworkPage,
  WorkedPage,
  ComparePage,
  InsightPage,
} from "./TeachingPages";
import {
  McqPage,
  FillPage,
  OrderPage,
  NumericPage,
  CheckPage,
} from "./ExercisePages";

function PageRenderer({
  page,
  setDone,
}: {
  page: LessonPage;
  setDone: (b: boolean) => void;
}) {
  switch (page.type) {
    case "read":
      return <ReadPage page={page} setDone={setDone} />;
    case "framework":
      return <FrameworkPage page={page} setDone={setDone} />;
    case "worked":
      return <WorkedPage page={page} setDone={setDone} />;
    case "compare":
      return <ComparePage page={page} setDone={setDone} />;
    case "insight":
      return <InsightPage page={page} setDone={setDone} />;
    case "mcq":
      return <McqPage page={page} setDone={setDone} />;
    case "fill":
      return <FillPage page={page} setDone={setDone} />;
    case "order":
      return <OrderPage page={page} setDone={setDone} />;
    case "numeric":
      return <NumericPage page={page} setDone={setDone} />;
    case "check":
      return <CheckPage page={page} setDone={setDone} />;
  }
}

export function LessonPlayer({
  unit,
  lesson,
  nextLessonSlug,
}: {
  unit: Unit;
  lesson: Lesson;
  /** Slug of the next lesson in this unit, or null if this is the last. */
  nextLessonSlug: string | null;
}) {
  const [pageIdx, setPageIdx] = useState(0);
  const [pageDone, setPageDone] = useState<boolean[]>(() =>
    lesson.pages.map(() => false),
  );
  const [completed, setCompleted] = useState(false);
  const [saving, startSave] = useTransition();

  const setDone = useCallback(
    (i: number) => (b: boolean) =>
      setPageDone((prev) => {
        if (prev[i] === b) return prev;
        const next = [...prev];
        next[i] = b;
        return next;
      }),
    [],
  );

  const total = lesson.pages.length;
  const isLast = pageIdx === total - 1;
  const canAdvance = pageDone[pageIdx];

  function next() {
    if (isLast) {
      startSave(async () => {
        await markLessonDone({ unitSlug: unit.slug, lessonSlug: lesson.slug });
        setCompleted(true);
      });
    } else {
      setPageIdx((i) => i + 1);
      document.getElementById("lesson-body")?.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  if (completed) {
    return (
      <div className="mx-auto max-w-md px-6 py-16 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-foreground">
          <PartyPopper className="h-7 w-7" />
        </div>
        <h1 className="mt-4 font-serif text-2xl font-semibold tracking-tight">
          Lesson complete
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{lesson.title}</p>
        <div className="mt-8 flex flex-col items-center gap-3">
          {nextLessonSlug ? (
            <Link
              href={`/learn/${unit.slug}/${nextLessonSlug}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Next lesson <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <Link
              href={`/learn/${unit.slug}/checkpoint`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Take unit checkpoint <ArrowRight className="h-4 w-4" />
            </Link>
          )}
          {PRACTICE_LINKS[unit.slug] && (
            <Link
              href={PRACTICE_LINKS[unit.slug].href}
              className="text-xs font-medium text-primary hover:underline"
            >
              {PRACTICE_LINKS[unit.slug].label} →
            </Link>
          )}
          <Link href="/learn" className="text-xs text-muted-foreground hover:text-foreground">
            ← Back to roadmap
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-3rem)] flex-col">
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-border pb-3">
        <Link
          href="/learn"
          className="shrink-0 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[10px] font-bold uppercase tracking-widest text-primary">
            {unit.icon} {unit.title}
          </div>
          <div className="truncate text-sm font-semibold text-foreground">{lesson.title}</div>
        </div>
        <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
          {lesson.pages.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition-all ${
                i === pageIdx
                  ? "scale-150 bg-primary"
                  : i < pageIdx
                    ? "bg-primary/50"
                    : "bg-secondary"
              }`}
            />
          ))}
        </div>
        <div className="shrink-0 text-xs font-semibold text-muted-foreground tnum sm:hidden">
          {pageIdx + 1}/{total}
        </div>
      </header>

      {/* Progress bar */}
      <div className="h-1 w-full bg-secondary">
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${((pageIdx + 1) / total) * 100}%` }}
        />
      </div>

      {/* Body */}
      <div id="lesson-body" className="flex-1 overflow-y-auto py-6">
        <div className="mx-auto max-w-2xl">
          <PageRenderer key={pageIdx} page={lesson.pages[pageIdx]} setDone={setDone(pageIdx)} />
        </div>
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-between gap-3 border-t border-border pt-3">
        <button
          type="button"
          onClick={() => pageIdx > 0 && setPageIdx((i) => i - 1)}
          disabled={pageIdx === 0}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-secondary disabled:opacity-40"
        >
          Back
        </button>
        <button
          type="button"
          onClick={next}
          disabled={!canAdvance || saving}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-40"
        >
          {saving ? "Saving…" : isLast ? (
            <>
              Finish <Check className="h-4 w-4" />
            </>
          ) : (
            <>
              Next <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </footer>
    </div>
  );
}
