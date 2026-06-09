import type { ReactNode } from "react";

export function PagePlaceholder({
  title,
  kicker,
  children,
}: {
  title: string;
  kicker: string;
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl py-10">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
        {kicker}
      </p>
      <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight">
        {title}
      </h1>
      <p className="mt-3 text-muted-foreground">
        {children ?? "Coming online in a later build phase."}
      </p>
    </div>
  );
}
