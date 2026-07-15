import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { articles, getArticleBySlug } from "@/data/blog";

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
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image }],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = articles
    .filter((item) => item.slug !== article.slug)
    .filter(
      (item) =>
        item.category === article.category ||
        item.tags.some((tag) => article.tags.includes(tag)),
    )
    .slice(0, 3);

  return (
    <div className="bg-background text-foreground">
      <Section className="py-12 sm:py-16">
        <Container className="max-w-[1120px]">
          <Reveal>
            <Link
              href="/blog"
              className="text-sm font-black text-accent hover:opacity-80"
            >
              ← Back to Blog
            </Link>
            <div className="mt-6 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.045em] sm:text-6xl">
              {article.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
              {article.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-muted-foreground">
              <span>{article.author}</span>
              <span>•</span>
              <time dateTime={article.date}>{article.date}</time>
              <span>•</span>
              <span>{article.readingTime}</span>
              <span>•</span>
              <span>{article.category}</span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-border shadow-2xl shadow-accent/10">
              <Image
                src={article.image}
                alt={article.coverAlt}
                fill
                priority
                sizes="(min-width: 1120px) 1120px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
            <article className="space-y-7">
              {article.content.map((section, index) => (
                <Reveal key={section.heading} delay={(index % 3) * 0.05}>
                  <Card className="rounded-2xl">
                    <CardContent className="p-6 sm:p-8">
                      <h2 className="text-2xl font-black">
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
                              <span className="mt-2 h-2 w-2 rounded-full bg-accent" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {section.code ? (
                        <pre className="mt-6 overflow-x-auto rounded-2xl border border-border bg-background p-5 text-xs leading-6 text-muted-foreground">
                          <code>{section.code}</code>
                        </pre>
                      ) : null}
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </article>

            <aside className="space-y-6">
              <Reveal>
                <Card className="sticky top-24 rounded-2xl">
                  <CardContent className="p-6">
                    <h2 className="font-black">Article Info</h2>
                    <dl className="mt-5 space-y-4 text-sm">
                      <div>
                        <dt className="font-bold text-muted-foreground">
                          Category
                        </dt>
                        <dd className="mt-1">{article.category}</dd>
                      </div>
                      <div>
                        <dt className="font-bold text-muted-foreground">
                          Reading time
                        </dt>
                        <dd className="mt-1">{article.readingTime}</dd>
                      </div>
                      <div>
                        <dt className="font-bold text-muted-foreground">
                          Author
                        </dt>
                        <dd className="mt-1">{article.author}</dd>
                      </div>
                    </dl>
                    <Link
                      href="/blog/create"
                      className="mt-6 inline-flex w-full justify-center rounded-xl bg-accent px-4 py-3 text-sm font-black text-accent-foreground"
                    >
                      Create your own post
                    </Link>
                  </CardContent>
                </Card>
              </Reveal>
            </aside>
          </div>

          {related.length ? (
            <section className="mt-14">
              <Reveal>
                <h2 className="text-2xl font-black">Related Posts</h2>
              </Reveal>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {related.map((item, index) => (
                  <Reveal key={item.slug} delay={index * 0.05}>
                    <Link href={`/blog/${item.slug}`}>
                      <Card className="h-full overflow-hidden rounded-2xl transition hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10">
                        <div className="relative h-36">
                          <Image
                            src={item.image}
                            alt={item.coverAlt}
                            fill
                            sizes="33vw"
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-5">
                          <p className="text-xs font-bold text-accent">
                            {item.category}
                          </p>
                          <h3 className="mt-2 font-black">{item.title}</h3>
                        </CardContent>
                      </Card>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </section>
          ) : null}
        </Container>
      </Section>
    </div>
  );
}
