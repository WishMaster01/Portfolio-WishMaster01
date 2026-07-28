import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/article";
import { Card, CardContent } from "@/components/ui/card";

type BlogCardProps = {
  article: Article;
};

export function BlogCard({ article }: BlogCardProps) {
  return (
    <Card className="group h-full overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10">
      <Link
        href={`/blog/${article.slug}`}
        className="relative block aspect-[16/9] overflow-hidden"
      >
        <Image
          src={article.coverImage ?? article.image}
          alt={article.coverAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-80" />
        <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-accent backdrop-blur">
          {article.category}
        </span>
      </Link>

      <CardContent className="flex flex-col p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent/10 px-3 py-1 text-[11px] font-bold text-accent"
            >
              #{tag}
            </span>
          ))}
        </div>

        <Link href={`/blog/${article.slug}`}>
          <h2 className="mt-4 line-clamp-2 text-xl font-black tracking-[-0.03em] transition group-hover:text-accent">
            {article.title}
          </h2>
        </Link>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
          {article.excerpt}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold text-muted-foreground">
          <time dateTime={article.date}>{article.date}</time>
          <span>{article.readingTime}</span>
          <span>{article.views?.toLocaleString() ?? "Fresh"} views</span>
        </div>

        <Link
          href={`/blog/${article.slug}`}
          className="mt-5 inline-flex text-sm font-black text-accent"
        >
          Read article -&gt;
        </Link>
      </CardContent>
    </Card>
  );
}
