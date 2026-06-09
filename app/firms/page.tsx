import Link from "next/link";
import { Building2, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { listFirms } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

const MODEL_LABEL: Record<string, string> = {
  centralized: "Centralized",
  embedded: "Embedded",
  advisor: "Operator-led",
  hybrid: "Hybrid",
};

export default async function FirmsPage() {
  const firms = await listFirms();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          Firm Intel
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight">
          The ops platforms
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Model, interview process, comp, and MBA accessibility for the major
          portfolio-operations groups. Comp figures are approximate — re-verify
          before an interview.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {firms.map((f) => (
          <Link key={f.id} href={`/firms/${f.slug}`}>
            <Card className="group flex h-full flex-col gap-3 p-5 transition hover:border-primary/40">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                    <Building2 className="h-4 w-4" />
                  </span>
                  <h2 className="font-medium leading-tight text-foreground">
                    {f.name}
                  </h2>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="secondary">{MODEL_LABEL[f.model] ?? f.model}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{f.mbaAccessibility}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
