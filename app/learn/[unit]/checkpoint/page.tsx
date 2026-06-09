import { notFound } from "next/navigation";
import { CheckpointRunner } from "@/components/lesson/CheckpointRunner";
import { findUnit } from "@/lib/curriculum";

export const dynamic = "force-dynamic";

export default async function CheckpointRoute({
  params,
}: {
  params: Promise<{ unit: string }>;
}) {
  const { unit: unitSlug } = await params;
  const unit = findUnit(unitSlug);
  if (!unit) notFound();

  return <CheckpointRunner unit={unit} />;
}
