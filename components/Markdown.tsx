import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** Lightweight markdown renderer (tables, bold, lists). Inline-friendly. */
export function Markdown({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <div className={`prose-editorial ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
