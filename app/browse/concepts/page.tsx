import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Markdown } from "@/components/Markdown";
import { DOMAIN_LABELS } from "@/lib/content/types";
import { listConcepts, listTopics } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export default async function BrowseConceptsPage() {
  const [concepts, topics] = await Promise.all([listConcepts(), listTopics()]);
  const topicById = new Map(topics.map((t) => [t.id, t]));

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Link
          href="/learn"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Learn
        </Link>
        <h1 className="font-serif text-3xl font-semibold tracking-tight">
          All concepts
        </h1>
        <p className="text-muted-foreground">
          {concepts.length} flashcards across {topics.length} topics.
        </p>
      </div>

      <div className="space-y-3">
        {concepts.map((c) => {
          const topic = topicById.get(c.topicId);
          return (
            <Card key={c.id} className="space-y-3 p-5">
              <div className="flex flex-wrap items-center gap-1.5">
                {topic && (
                  <Badge variant="secondary">
                    {DOMAIN_LABELS[topic.domain]}
                  </Badge>
                )}
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="font-medium text-foreground">
                <Markdown>{c.front}</Markdown>
              </div>
              <div className="border-t border-border pt-3 text-sm text-muted-foreground">
                <Markdown>{c.back}</Markdown>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
