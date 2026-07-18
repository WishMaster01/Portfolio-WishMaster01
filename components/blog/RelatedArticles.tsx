import Link from "next/link";
import type { Article } from "@/types/article";
import { BlogCard } from "@/components/blog/BlogCard";

type RelatedArticlesProps = {
  articles: Article[];
  previous?: Article | null;
  next?: Article | null;
};

export function RelatedArticles({
  articles,
  previous,
  next,
}: RelatedArticlesProps) {
  return (
    <section className="mt-14 space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        {previous ? (
          <Link
            href={`/blog/${previous.slug}`}
            className="rounded-2xl border border-border bg-surface p-5 transition hover:-translate-y-1 hover:border-accent/50"
          >
            <p className="text-xs font-black uppercase tracking-[0.22em] text-muted-foreground">
              Previous
            </p>
            <h2 className="mt-2 font-black">{previous.title}</h2>
          </Link>
        ) : null}
        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="rounded-2xl border border-border bg-surface p-5 transition hover:-translate-y-1 hover:border-accent/50 sm:text-right"
          >
            <p className="text-xs font-black uppercase tracking-[0.22em] text-muted-foreground">
              Next
            </p>
            <h2 className="mt-2 font-black">{next.title}</h2>
          </Link>
        ) : null}
      </div>

      {articles.length ? (
        <div>
          <h2 className="text-2xl font-black tracking-[-0.03em]">
            Related articles
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {articles.map((article) => (
              <BlogCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
