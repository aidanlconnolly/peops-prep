"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2, BookMarked } from "lucide-react";
import { COMPETENCY_LABELS, type Competency } from "@/lib/content/types";
import type { Story } from "@/lib/db/schema";
import { addStory, deleteStory } from "@/lib/actions/stories";

const COMPETENCIES = Object.keys(COMPETENCY_LABELS) as Competency[];

export function StoryLibrary({ initial }: { initial: Story[] }) {
  const [stories, setStories] = useState<Story[]>(initial);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState<Competency[]>([]);
  const [pending, startTransition] = useTransition();

  function toggleTag(c: Competency) {
    setTags((t) => (t.includes(c) ? t.filter((x) => x !== c) : [...t, c]));
  }

  function save() {
    if (!title.trim() || !body.trim()) return;
    startTransition(async () => {
      await addStory({ title, competencies: tags, body });
      // Optimistic local refresh (single user; ids regenerated on reload).
      setStories((s) => [
        {
          id: `tmp-${Date.now()}`,
          userId: "me",
          title: title.trim(),
          competencies: tags,
          body: body.trim(),
          createdAt: Date.now(),
        },
        ...s,
      ]);
      setTitle("");
      setBody("");
      setTags([]);
      setOpen(false);
    });
  }

  function remove(id: string) {
    setStories((s) => s.filter((x) => x.id !== id));
    startTransition(async () => {
      if (!id.startsWith("tmp-")) await deleteStory(id);
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Reusable BCG anecdotes tagged to competencies — your STAR backbone.
        </p>
        <button
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> Add story
        </button>
      </div>

      {open && (
        <div className="space-y-3 rounded-2xl border border-border bg-card p-5">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title — e.g. Shipyard throughput turnaround"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <div className="flex flex-wrap gap-1.5">
            {COMPETENCIES.map((c) => (
              <button
                key={c}
                onClick={() => toggleTag(c)}
                className={`rounded-full border px-2.5 py-1 text-xs transition ${
                  tags.includes(c)
                    ? "border-primary/50 bg-accent text-accent-foreground"
                    : "border-border text-muted-foreground hover:bg-secondary"
                }`}
              >
                {COMPETENCY_LABELS[c]}
              </button>
            ))}
          </div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="The STAR story…"
            rows={5}
            className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg border border-border px-3 py-1.5 text-sm transition hover:bg-secondary"
            >
              Cancel
            </button>
            <button
              onClick={save}
              disabled={pending || !title.trim() || !body.trim()}
              className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {stories.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border py-12 text-center">
          <BookMarked className="h-6 w-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            No stories yet. Add your reusable anecdotes so the mentor can lean on them.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {stories.map((s) => (
            <div key={s.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-medium text-foreground">{s.title}</h3>
                <button
                  onClick={() => remove(s.id)}
                  className="text-muted-foreground transition hover:text-destructive"
                  aria-label="Delete story"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              {s.competencies.length > 0 && (
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {s.competencies.map((c) => (
                    <span
                      key={c}
                      className="rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground"
                    >
                      {COMPETENCY_LABELS[c]}
                    </span>
                  ))}
                </div>
              )}
              <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
