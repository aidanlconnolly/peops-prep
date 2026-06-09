import { MentorChat } from "@/components/mentor/MentorChat";

export const dynamic = "force-dynamic";

export default function MentorPage() {
  return (
    <div className="space-y-4">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          AI Mentor
        </p>
        <h1 className="mt-1 font-serif text-2xl font-semibold tracking-tight">
          Mentor
        </h1>
      </header>
      <MentorChat />
    </div>
  );
}
