import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Markdown } from "@/components/Markdown";
import { ExhibitTable } from "@/components/ExhibitTable";
import { getCaseBySlug } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = await getCaseBySlug(slug);
  if (!c) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href="/cases"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All cases
      </Link>

      <header className="space-y-2">
        <Badge variant="secondary">{c.sector}</Badge>
        <h1 className="font-serif text-3xl font-semibold tracking-tight">
          {c.title}
        </h1>
      </header>

      <Card className="p-5">
        <h2 className="mb-2 text-sm font-semibold text-muted-foreground">
          Context
        </h2>
        <Markdown>{c.companyContext}</Markdown>
      </Card>

      {c.exhibits.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground">Exhibits</h2>
          {c.exhibits.map((ex, i) => (
            <ExhibitTable key={i} exhibit={ex} />
          ))}
        </div>
      )}

      <Card className="border-primary/30 p-5">
        <h2 className="mb-2 text-sm font-semibold text-primary">Your task</h2>
        <Markdown>{c.prompt}</Markdown>
      </Card>

      <Card className="p-5">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
          Rubric
        </h2>
        <ul className="space-y-1.5 text-sm">
          {c.rubric.dimensions.map((d) => (
            <li key={d.key} className="flex items-baseline justify-between gap-4">
              <span className="text-foreground">{d.label}</span>
              <span className="tnum text-muted-foreground">
                {Math.round(d.weight * 100)}%
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {c.modelAnswer && (
        <details className="rounded-lg border border-border bg-card p-5">
          <summary className="cursor-pointer text-sm font-semibold text-muted-foreground">
            Model answer (reveal)
          </summary>
          <div className="mt-3">
            <Markdown>{c.modelAnswer}</Markdown>
          </div>
        </details>
      )}
    </div>
  );
}
