import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { articles } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical blogs on Next.js, AI, Prisma, PostgreSQL, and DSA by WishMaster01.",
};

const filters = ["All", "Web Development", "AI", "Backend", "DSA"];

export default function BlogPage() {
  return (
    <div className="bg-background text-foreground">
      <Section className="py-12 sm:py-16">
        <Container className="max-w-[1180px]">
          <Reveal className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-black tracking-[-0.04em] sm:text-5xl">
                Blog
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                Technical notes, architecture breakdowns, AI ideas, and CS
                concepts written for practical builders.
              </p>
            </div>
            <Link
              href="/blog/create"
              className="inline-flex w-fit rounded-xl bg-accent px-5 py-3 text-sm font-black text-accent-foreground shadow-lg shadow-accent/20 transition hover:-translate-y-0.5"
            >
              Create Blog
            </Link>
          </Reveal>

          <Reveal className="-mx-4 mb-7 flex gap-3 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            {filters.map((filter, index) => (
              <Link
                key={filter}
                href="/blog"
                className={
                  index === 0
                    ? "shrink-0 rounded-full bg-accent px-5 py-2 text-sm font-bold text-accent-foreground"
                    : "shrink-0 rounded-full border border-border bg-surface px-5 py-2 text-sm font-bold text-muted-foreground transition hover:border-accent/50 hover:text-accent"
                }
              >
                {filter}
              </Link>
            ))}
          </Reveal>

          <div className="space-y-5">
            {articles.map((article, index) => (
              <Reveal key={article.slug} delay={(index % 4) * 0.05}>
                <Card className="group overflow-hidden rounded-2xl transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10">
                  <CardContent className="grid grid-cols-[96px_minmax(0,1fr)] gap-3 p-3 sm:grid-cols-[180px_1fr] sm:gap-5 sm:p-4 lg:grid-cols-[220px_1fr_auto] lg:items-center">
                    <Link
                      href={`/blog/${article.slug}`}
                      className="relative h-full min-h-28 overflow-hidden rounded-xl sm:min-h-36 lg:h-32 lg:min-h-0"
                    >
                      <Image
                        src={article.image}
                        alt={article.coverAlt}
                        fill
                        sizes="(min-width: 768px) 220px, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </Link>
                    <div className="min-w-0">
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-bold text-accent sm:px-3 sm:text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link href={`/blog/${article.slug}`}>
                        <h2 className="mt-2 line-clamp-2 text-base font-black leading-tight transition group-hover:text-accent sm:mt-3 sm:text-xl">
                          {article.title}
                        </h2>
                      </Link>
                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                        {article.excerpt}
                      </p>
                      <p className="mt-2 text-[11px] font-semibold text-muted-foreground sm:mt-3 sm:text-xs">
                        {article.date} • {article.readingTime} •{" "}
                        {article.category}
                      </p>
                    </div>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="col-span-2 text-sm font-black text-accent sm:col-span-2 lg:col-span-1 lg:justify-self-end"
                    >
                      Read More →
                    </Link>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
