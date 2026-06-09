import type { Exhibit } from "@/lib/content/types";

export function ExhibitTable({ exhibit }: { exhibit: Exhibit }) {
  return (
    <figure className="overflow-hidden rounded-lg border border-border">
      <figcaption className="border-b border-border bg-muted px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {exhibit.title}
      </figcaption>
      {exhibit.columns && exhibit.rows && (
        <table className="w-full text-sm tnum">
          <thead>
            <tr className="border-b border-border">
              {exhibit.columns.map((c, i) => (
                <th
                  key={i}
                  className={`px-4 py-2 font-medium text-muted-foreground ${
                    i === 0 ? "text-left" : "text-right"
                  }`}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {exhibit.rows.map((row, ri) => (
              <tr
                key={ri}
                className="border-b border-border/60 last:border-0"
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`px-4 py-2 ${
                      ci === 0
                        ? "text-left text-foreground"
                        : "text-right text-muted-foreground"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {exhibit.note && (
        <p className="border-t border-border bg-card px-4 py-2 text-xs text-muted-foreground">
          {exhibit.note}
        </p>
      )}
    </figure>
  );
}
