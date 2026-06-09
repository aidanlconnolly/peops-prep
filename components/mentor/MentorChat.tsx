"use client";

import { useRef, useState } from "react";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { Markdown } from "@/components/Markdown";

type Msg = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "Give me a fresh operational case to work.",
  "Drill me on paper-LBO math.",
  "Explain the centralized vs embedded ops model.",
  "Run a quick mock behavioral round.",
];

export function MentorChat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  async function send(text: string) {
    const content = text.trim();
    if (!content || streaming) return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);

    try {
      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.body) throw new Error("no stream");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      let streamDone = false;
      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) {
          streamDone = true;
          break;
        }
        acc += decoder.decode(value, { stream: true });
        const text = acc;
        setMessages((m) =>
          m.map((msg, idx) =>
            idx === m.length - 1 ? { role: "assistant", content: text } : msg,
          ),
        );
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
      }
    } catch {
      setMessages((m) =>
        m.map((msg, idx) =>
          idx === m.length - 1
            ? {
                role: "assistant",
                content: "Something went wrong reaching the mentor. Try again.",
              }
            : msg,
        ),
      );
    } finally {
      setStreaming(false);
    }
  }

  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col">
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto pb-4">
        {messages.length === 0 ? (
          <div className="mx-auto max-w-md pt-10 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="mt-3 font-serif text-xl font-semibold">Your PE-ops mentor</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Generate a case, drill your weak spots, or run a mock round.
            </p>
            <div className="mt-5 grid gap-2">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-lg border border-border px-3 py-2 text-left text-sm text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card"
                }`}
              >
                {m.role === "assistant" ? (
                  m.content ? (
                    <Markdown>{m.content}</Markdown>
                  ) : (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  )
                ) : (
                  m.content
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-end gap-2 border-t border-border pt-3"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          placeholder="Ask the mentor…"
          rows={1}
          className="flex-1 resize-none rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
        />
        <button
          type="submit"
          disabled={streaming || !input.trim()}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
