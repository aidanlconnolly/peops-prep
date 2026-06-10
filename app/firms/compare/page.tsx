import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FirmCompare } from "@/components/firms/FirmCompare";
import { listFirms } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export default async function FirmComparePage() {
  const firms = await listFirms();

  return (
    <div className="space-y-6">
      <Link
        href="/firms"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Firms
      </Link>

      <header>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          Firm Intel
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight">
          Compare the platforms
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Model, accessibility, comp, and process side by side. Toggle firms to
          narrow the table. Comp figures are approximate — re-verify before an
          interview.
        </p>
      </header>

      <FirmCompare firms={firms} />
    </div>
  );
}
