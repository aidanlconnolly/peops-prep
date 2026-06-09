import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Markdown } from "@/components/Markdown";
import { getFirmBySlug } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

const MODEL_LABEL: Record<string, string> = {
  centralized: "Centralized",
  embedded: "Embedded",
  advisor: "Operator-led",
  hybrid: "Hybrid",
};

export default async function FirmPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const firm = await getFirmBySlug(slug);
  if (!firm) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href="/firms"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All firms
      </Link>

      <header className="space-y-2">
        <h1 className="font-serif text-3xl font-semibold tracking-tight">
          {firm.name}
        </h1>
        <Badge variant="secondary">{MODEL_LABEL[firm.model] ?? firm.model}</Badge>
        <p className="text-muted-foreground">{firm.mbaAccessibility}</p>
      </header>

      <Card className="space-y-3 p-5">
        <h2 className="text-sm font-semibold text-muted-foreground">
          Interview process
        </h2>
        <ol className="space-y-2">
          {firm.interviewProcess.rounds.map((r, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent font-mono text-xs text-accent-foreground tnum">
                {i + 1}
              </span>
              <div>
                <p className="font-medium text-foreground">{r.name}</p>
                <p className="text-sm text-muted-foreground">{r.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </Card>

      <Card className="space-y-2 p-5">
        <h2 className="text-sm font-semibold text-muted-foreground">
          Compensation <span className="font-normal">(approximate)</span>
        </h2>
        <dl className="space-y-1 text-sm">
          {firm.comp.mbaIntern && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">MBA intern</dt>
              <dd className="tnum text-foreground">{firm.comp.mbaIntern}</dd>
            </div>
          )}
          {firm.comp.postMbaAssociateTotal && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Post-MBA associate (total)</dt>
              <dd className="tnum text-foreground">
                {firm.comp.postMbaAssociateTotal}
              </dd>
            </div>
          )}
        </dl>
        {firm.comp.note && (
          <p className="text-sm text-muted-foreground">{firm.comp.note}</p>
        )}
      </Card>

      {firm.recruitingNotes && (
        <Card className="p-5">
          <h2 className="mb-2 text-sm font-semibold text-muted-foreground">
            Recruiting notes
          </h2>
          <Markdown>{firm.recruitingNotes}</Markdown>
        </Card>
      )}

      {firm.fitForMe && (
        <Card className="border-primary/30 bg-accent/40 p-5">
          <h2 className="mb-2 text-sm font-semibold text-primary">Fit for me</h2>
          <Markdown>{firm.fitForMe}</Markdown>
        </Card>
      )}
    </div>
  );
}
