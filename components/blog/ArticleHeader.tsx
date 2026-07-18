import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/article";
import { siteConfig } from "@/data/site";

type ArticleHeaderProps = {
  article: Article;
};

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const articleUrl = `${siteConfig.url}/blog/${article.slug}`;
  const encodedTitle = encodeURIComponent(article.title);
  const encodedUrl = encodeURIComponent(articleUrl);

  return (
    <header>
      <Link href="/blog" className="text-sm font-black text-accent">
        &lt;- Back to Blog
      </Link>

      <div className="mt-6 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-accent">
            {article.category}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-[-0.05em] sm:text-6xl">
            {article.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {article.summary}
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-5">
          <p className="text-sm font-black">Article details</p>
          <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Author</dt>
              <dd className="font-bold">{article.author}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Reading</dt>
              <dd className="font-bold">{article.readingTime}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Published</dt>
              <dd className="font-bold">{article.date}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Views</dt>
              <dd className="font-bold">
                {article.views?.toLocaleString() ?? "Fresh"}
              </dd>
            </div>
          </dl>
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
              className="rounded-xl border border-border px-3 py-2 text-xs font-black transition hover:border-accent hover:text-accent"
              target="_blank"
              rel="noreferrer"
            >
              Share X
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
              className="rounded-xl border border-border px-3 py-2 text-xs font-black transition hover:border-accent hover:text-accent"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
              className="rounded-xl border border-border px-3 py-2 text-xs font-black transition hover:border-accent hover:text-accent"
            >
              Email
            </a>
          </div>
        </div>
      </div>

      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-border shadow-2xl shadow-accent/10">
        <Image
          src={article.coverImage ?? article.image}
          alt={article.coverAlt}
          fill
          priority
          sizes="(min-width: 1120px) 1120px, 100vw"
          className="object-cover"
        />
      </div>
    </header>
  );
}
