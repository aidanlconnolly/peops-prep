import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PaperLboWalker } from "@/components/lbo/PaperLboWalker";
import { getDeal } from "@/lib/lbo-deals";

export default async function PaperLboDealPage({
  params,
  searchParams,
}: {
  params: Promise<{ deal: string }>;
  searchParams: Promise<{ timed?: string }>;
}) {
  const { deal: dealId } = await params;
  const { timed } = await searchParams;
  const deal = getDeal(dealId);
  if (!deal) notFound();

  return (
    <div className="space-y-5">
      <Link
        href="/drills/paper-lbo"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Deals
      </Link>
      <div>
        <h1 className="font-serif text-2xl font-semibold tracking-tight">
          {deal.title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{deal.narrative}</p>
      </div>
      <PaperLboWalker deal={deal} timed={timed === "1"} />
    </div>
  );
}
