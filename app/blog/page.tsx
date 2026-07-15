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
              <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                Blog
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
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

          <Reveal className="mb-7 flex flex-wrap gap-3">
            {filters.map((filter, index) => (
              <Link
                key={filter}
                href="/blog"
                className={
                  index === 0
                    ? "rounded-full bg-accent px-5 py-2 text-sm font-bold text-accent-foreground"
                    : "rounded-full border border-border bg-surface px-5 py-2 text-sm font-bold text-muted-foreground transition hover:border-accent/50 hover:text-accent"
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
                  <CardContent className="grid gap-5 p-4 md:grid-cols-[220px_1fr_auto] md:items-center">
                    <Link
                      href={`/blog/${article.slug}`}
                      className="relative h-40 overflow-hidden rounded-xl md:h-32"
                    >
                      <Image
                        src={article.image}
                        alt={article.coverAlt}
                        fill
                        sizes="(min-width: 768px) 220px, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </Link>
                    <div>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link href={`/blog/${article.slug}`}>
                        <h2 className="mt-3 text-xl font-black transition group-hover:text-accent">
                          {article.title}
                        </h2>
                      </Link>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                        {article.excerpt}
                      </p>
                      <p className="mt-3 text-xs font-semibold text-muted-foreground">
                        {article.date} • {article.readingTime} •{" "}
                        {article.category}
                      </p>
                    </div>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="text-sm font-black text-accent md:justify-self-end"
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
