import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { articleHeadingSlug, TableOfContents } from "@/components/blog/TableOfContents";
import { CodeBlock } from "@/components/blog/CodeBlock";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  articles,
  getAdjacentArticles,
  getArticleBySlug,
  getRelatedArticles,
} from "@/data/blog";
import { siteConfig } from "@/data/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Blog post not found" };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `${siteConfig.url}/blog/${article.slug}`,
      images: [{ url: article.coverImage ?? article.image }],
      publishedTime: article.publishedAt ?? article.date,
      authors: [article.author],
      tags: article.tags,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = getRelatedArticles(article, 3);
  const { previous, next } = getAdjacentArticles(article.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: `${siteConfig.url}${article.coverImage ?? article.image}`,
    author: {
      "@type": "Person",
      name: article.author,
    },
    datePublished: article.publishedAt ?? article.date,
    keywords: article.tags.join(", "),
  };

  return (
    <div className="bg-background text-foreground">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Section className="py-12 sm:py-16">
        <Container className="max-w-[1120px]">
          <Reveal>
            <ArticleHeader article={article} />
          </Reveal>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <article className="space-y-7">
              {article.content.map((section, index) => (
                <Reveal key={section.heading} delay={(index % 3) * 0.05}>
                  <Card
                    id={articleHeadingSlug(section.heading)}
                    className="scroll-mt-28 rounded-3xl"
                  >
                    <CardContent className="p-6 sm:p-8">
                      <h2 className="text-2xl font-black tracking-[-0.03em]">
                        {section.heading}
                      </h2>
                      <div className="mt-5 space-y-4 text-base leading-8 text-muted-foreground">
                        {section.body.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                      {section.bullets ? (
                        <ul className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
                          {section.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-3">
                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {section.code ? (
                        <CodeBlock
                          code={section.code}
                          language={section.language}
                        />
                      ) : null}
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </article>

            <aside className="space-y-6">
              <Reveal>
                <Card className="sticky top-24 rounded-3xl">
                  <CardContent className="p-6">
                    <TableOfContents article={article} />
                    <div className="mt-6 border-t border-border pt-6">
                      <Link
                        href="/blog/create"
                        className="inline-flex w-full justify-center rounded-xl bg-accent px-4 py-3 text-sm font-black text-accent-foreground"
                      >
                        Create your own post
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            </aside>
          </div>

          <RelatedArticles
            articles={related}
            previous={previous}
            next={next}
          />
        </Container>
      </Section>
    </div>
  );
}
