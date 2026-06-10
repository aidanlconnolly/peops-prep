"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, Play } from "lucide-react";

type TopicOption = { id: string; name: string; domain: string };

const TYPE_OPTIONS: { value: string; label: string }[] = [
  { value: "mc", label: "Multiple choice" },
  { value: "numeric", label: "Numeric" },
  { value: "order", label: "Ordering" },
  { value: "fill", label: "Fill-in" },
  { value: "scenario", label: "Scenario" },
];

const COUNTS = [5, 10, 15, 0]; // 0 → all

export function QuizFilters({ topics }: { topics: TopicOption[] }) {
  const router = useRouter();
  const [topicIds, setTopicIds] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [count, setCount] = useState(10);
  const [timed, setTimed] = useState(false);

  function toggle(list: string[], setList: (v: string[]) => void, v: string) {
    setList(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  }

  const href = useMemo(() => {
    const p = new URLSearchParams();
    p.set("mode", timed ? "timed" : "practice");
    if (topicIds.length) p.set("topics", topicIds.join(","));
    if (types.length) p.set("types", types.join(","));
    p.set("limit", count > 0 ? String(count) : "all");
    return `/drills/quiz?${p.toString()}`;
  }, [topicIds, types, count, timed]);

  return (
    <section className="space-y-4 rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold text-foreground">Build a custom set</h2>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Topics{" "}
          <span className="font-normal normal-case">
            {topicIds.length === 0 ? "— all" : `— ${topicIds.length} selected`}
          </span>
        </p>
        <div className="flex flex-wrap gap-1.5">
          {topics.map((t) => (
            <Chip
              key={t.id}
              active={topicIds.includes(t.id)}
              onClick={() => toggle(topicIds, setTopicIds, t.id)}
            >
              {t.name}
            </Chip>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Formats{" "}
          <span className="font-normal normal-case">
            {types.length === 0 ? "— all" : `— ${types.length} selected`}
          </span>
        </p>
        <div className="flex flex-wrap gap-1.5">
          {TYPE_OPTIONS.map((t) => (
            <Chip
              key={t.value}
              active={types.includes(t.value)}
              onClick={() => toggle(types, setTypes, t.value)}
            >
              {t.label}
            </Chip>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">Length</span>
            <div className="flex gap-1">
              {COUNTS.map((c) => (
                <Chip key={c} active={count === c} onClick={() => setCount(c)}>
                  {c === 0 ? "All" : c}
                </Chip>
              ))}
            </div>
          </div>
          <label className="flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={timed}
              onChange={(e) => setTimed(e.target.checked)}
              className="accent-primary"
            />
            Timed
          </label>
        </div>
        <button
          onClick={() => router.push(href)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          <Play className="h-4 w-4" /> Start set
        </button>
      </div>
    </section>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-2.5 py-1 text-xs transition ${
        active
          ? "border-primary/50 bg-accent text-accent-foreground"
          : "border-border text-muted-foreground hover:bg-secondary"
      }`}
    >
      {children}
    </button>
  );
}
