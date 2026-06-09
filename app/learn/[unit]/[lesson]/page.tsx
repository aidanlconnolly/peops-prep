import { notFound } from "next/navigation";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";
import { findLesson } from "@/lib/curriculum";

export const dynamic = "force-dynamic";

export default async function LessonRoute({
  params,
}: {
  params: Promise<{ unit: string; lesson: string }>;
}) {
  const { unit: unitSlug, lesson: lessonSlug } = await params;
  const found = findLesson(unitSlug, lessonSlug);
  if (!found) notFound();

  const { unit, lessonIndex } = found;
  const lesson = unit.lessons[lessonIndex];
  const nextLessonSlug = unit.lessons[lessonIndex + 1]?.slug ?? null;

  return <LessonPlayer unit={unit} lesson={lesson} nextLessonSlug={nextLessonSlug} />;
}
