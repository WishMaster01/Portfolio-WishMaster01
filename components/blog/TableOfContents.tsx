import Link from "next/link";
import type { Article } from "@/types/article";

type TableOfContentsProps = {
  article: Article;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function TableOfContents({ article }: TableOfContentsProps) {
  return (
    <nav aria-label="Table of contents">
      <h2 className="font-black">Table of contents</h2>
      <ol className="mt-4 space-y-3">
        {article.content.map((section, index) => (
          <li key={section.heading}>
            <Link
              href={`#${slugify(section.heading)}`}
              className="group flex gap-3 text-sm font-bold text-muted-foreground transition hover:text-accent"
            >
              <span className="text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{section.heading}</span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export { slugify as articleHeadingSlug };
