import type { Metadata } from "next";
import { ArticleCard } from "@/components/blog/article-card";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { articles } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Engineering notes on portfolio architecture, case studies, and interface systems.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Short technical notes that support the portfolio narrative."
        description="The blog is currently a listing backed by modular article data. Dynamic article pages can be added when long-form content is ready."
      />
      <Section className="pt-10">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <Reveal key={article.slug} delay={index * 0.06}>
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
