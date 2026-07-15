import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { articles } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts, tutorials, and insights from WishMaster01.",
};

const filters = ["All", "Web Development", "AI", "Tutorials", "Career", "DSA"];

const visuals = [
  "from-[#16002e] via-[#4c1d95] to-[#070014]",
  "from-[#b9f4ff] via-[#38bdf8] to-[#03657a]",
  "from-[#fff1dc] via-[#d97706] to-[#7c2d12]",
  "from-[#dbeafe] via-[#60a5fa] to-[#1e3a8a]",
];

export default function BlogPage() {
  return (
    <div className="bg-background text-foreground">
      <Section className="py-16">
        <Container className="max-w-[1120px]">
          <div className="mb-8">
            <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Blog
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              Thoughts, tutorials and insights
            </p>
          </div>

          <div className="mb-7 flex flex-wrap gap-3">
            {filters.map((filter, index) => (
              <button
                key={filter}
                type="button"
                className={
                  index === 0
                    ? "rounded-full bg-accent px-5 py-2 text-sm font-bold text-accent-foreground"
                    : "rounded-full border border-border bg-surface px-5 py-2 text-sm font-bold text-muted-foreground"
                }
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="space-y-5">
            {articles.map((article, index) => (
              <Card key={article.slug} className="overflow-hidden rounded-2xl">
                <CardContent className="grid gap-5 p-4 md:grid-cols-[190px_1fr_auto] md:items-center">
                  <div
                    className={`h-32 rounded-xl bg-gradient-to-br ${visuals[index % visuals.length]}`}
                  />
                  <div>
                    <h2 className="text-xl font-black">{article.title}</h2>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {article.excerpt}
                    </p>
                    <p className="mt-3 text-xs font-semibold text-muted-foreground">
                      {article.date} • {article.readingTime} •{" "}
                      {article.category}
                    </p>
                  </div>
                  <Link
                    href="/blog"
                    className="text-sm font-black text-accent md:justify-self-end"
                  >
                    Read More →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex rounded-xl border border-accent px-6 py-3 text-sm font-black text-accent"
            >
              View All Articles →
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
