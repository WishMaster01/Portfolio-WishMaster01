import type { Metadata } from "next";
import Link from "next/link";
import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { articles, blogCategories, blogTags } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical blogs on Next.js, AI, Prisma, PostgreSQL, payments, real-time systems, deployment, and DSA by WishMaster01.",
};

export default function BlogPage() {
  return (
    <div className="bg-background text-foreground">
      <Section className="py-12 sm:py-16">
        <Container className="max-w-[1180px]">
          <Reveal className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-accent">
                Technical writing
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-5xl">
                Blog
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                Technical notes, architecture breakdowns, AI ideas, backend
                systems, deployment guides, and CS concepts written for
                practical builders.
              </p>
            </div>
            <Link
              href="/blog/create"
              className="inline-flex w-fit rounded-xl bg-accent px-5 py-3 text-sm font-black text-accent-foreground shadow-lg shadow-accent/20 transition hover:-translate-y-0.5"
            >
              Create Blog
            </Link>
          </Reveal>

          <Reveal className="mb-8 grid gap-4 rounded-3xl border border-border bg-surface/70 p-5 sm:grid-cols-3">
            <div>
              <p className="text-3xl font-black">{articles.length}</p>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                articles
              </p>
            </div>
            <div>
              <p className="text-3xl font-black">{blogCategories.length - 1}</p>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                categories
              </p>
            </div>
            <div>
              <p className="text-3xl font-black">{blogTags.length}</p>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                tags
              </p>
            </div>
          </Reveal>

          <BlogExplorer
            articles={articles}
            categories={blogCategories}
            tags={blogTags}
          />
        </Container>
      </Section>
    </div>
  );
}
