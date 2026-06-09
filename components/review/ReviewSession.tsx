"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { Markdown } from "@/components/Markdown";
import { rateCard, type DueCard } from "@/lib/actions/review";
import { RATING_LABELS, type Rating1to4 } from "@/lib/srs";

const RATING_STYLES: Record<Rating1to4, string> = {
  1: "border-destructive/40 text-destructive hover:bg-destructive/10",
  2: "border-warning/40 text-warning hover:bg-warning/10",
  3: "border-primary/40 text-primary hover:bg-primary/10",
  4: "border-success/40 text-success hover:bg-success/10",
};

export function ReviewSession({ cards }: { cards: DueCard[] }) {
  const [queue] = useState(cards);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [reviewed, setReviewed] = useState(0);

  const card = queue[index];
  const done = index >= queue.length;

  const grade = useCallback(
    async (rating: Rating1to4) => {
      if (!card) return;
      setRevealed(false);
      setReviewed((n) => n + 1);
      setIndex((i) => i + 1);
      // Fire-and-forget persistence; UI already advanced for snappiness.
      await rateCard(card.cardId, rating);
    },
    [card],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (done) return;
      if (!revealed && (e.code === "Space" || e.code === "Enter")) {
        e.preventDefault();
        setRevealed(true);
        return;
      }
      if (revealed && ["1", "2", "3", "4"].includes(e.key)) {
        e.preventDefault();
        grade(Number(e.key) as Rating1to4);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [revealed, done, grade]);

  if (done) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-foreground">
          <Check className="h-7 w-7" />
        </div>
        <h2 className="mt-4 font-serif text-2xl font-semibold">Caught up</h2>
        <p className="mt-2 text-muted-foreground">
          You reviewed {reviewed} {reviewed === 1 ? "card" : "cards"}. Come back
          when more are due.
        </p>
      </div>
    );
  }

  const progress = Math.round((reviewed / queue.length) * 100);

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      {/* Progress */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="tnum">
          {reviewed} / {queue.length}
        </span>
        <span className="tnum">{progress}%</span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Card — keyed so each new card fades in; no exit (avoids stuck-card). */}
      <motion.div
        key={card.cardId}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="rounded-2xl border border-border bg-card p-8"
      >
        <div className="flex flex-wrap gap-1.5">
          {card.tags.map((t) => (
            <span
              key={t}
              className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-3 text-lg font-medium text-foreground">
          <Markdown>{card.front}</Markdown>
        </div>

        {revealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-5 border-t border-border pt-5 text-muted-foreground"
          >
            <Markdown>{card.back}</Markdown>
          </motion.div>
        )}
      </motion.div>

      {/* Controls */}
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-medium text-primary-foreground transition hover:opacity-90"
        >
          <RotateCcw className="h-4 w-4" /> Reveal answer
          <kbd className="ml-1 rounded bg-black/20 px-1.5 text-xs">space</kbd>
        </button>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {([1, 2, 3, 4] as Rating1to4[]).map((r) => (
            <button
              key={r}
              onClick={() => grade(r)}
              className={`flex flex-col items-center gap-0.5 rounded-xl border bg-card py-3 text-sm font-medium transition ${RATING_STYLES[r]}`}
            >
              {RATING_LABELS[r]}
              <span className="tnum text-xs opacity-70">
                {card.intervals[r]}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
