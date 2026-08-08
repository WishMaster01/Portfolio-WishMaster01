import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { DsaTopicShowcase } from "@/components/dsa/dsa-topic-showcase";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { allAlgorithmTopics, dsaStats } from "@/data/dsa";

const productionIntegrations = [
  {
    title: "Command palette",
    detail:
      "Trie-backed prefix search plus fuzzy recovery ranks commands beyond simple string iteration.",
  },
  {
    title: "Project explorer",
    detail:
      "Inverted-index retrieval and TF-IDF-style scoring rank project case studies by relevance.",
  },
  {
    title: "Blog search",
    detail:
      "BM25-style ranking, prefix matching, and fuzzy title recovery improve technical article discovery.",
  },
  {
    title: "Recruiter mode",
    detail:
      "A binary-heap priority queue surfaces the strongest projects by engineering signal instead of fixed ordering.",
  },
] as const;

export default function DsaShowcasePage() {
  return (
    <div className="bg-background text-foreground">
      <Section className="py-12 sm:py-16">
        <Container className="max-w-[1380px]">
          <Reveal className="mb-8">
            <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              DSA Showcase
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
              My DSA journey with topic-wise explanations, patterns, use cases,
              complexity notes, and Java examples.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dsaStats.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.04}>
                <Card className="rounded-2xl">
                  <CardContent className="p-5">
                    <p className="text-2xl font-black text-accent">
                      {item.value}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.label}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8" delay={0.06}>
            <Card className="rounded-[2rem] border-accent/20 bg-surface/95">
              <CardContent className="p-5 sm:p-7">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-accent">
                  Production Algorithm Usage
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">
                  Real DSA already wired into this portfolio
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
                  This section is not isolated from the product. Search, ranking,
                  and recruiter-facing content now use real algorithmic
                  primitives inside the portfolio itself.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {productionIntegrations.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-border bg-background/70 p-4"
                    >
                      <p className="font-black text-foreground">{item.title}</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal className="mt-8" delay={0.08}>
            <DsaTopicShowcase />
          </Reveal>

          <Reveal className="mt-8" delay={0.12}>
            <Card className="rounded-[2rem] border-accent/20 bg-surface/95">
              <CardContent className="p-5 sm:p-7">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-accent">
                      Dedicated topic pages
                    </p>
                    <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">
                      Open a full DSA guide
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                      Each page includes definition, visual explanation, Java
                      code, complexity, real-world use cases, and related
                      problems.
                    </p>
                  </div>
                  <Link
                    href="/dsa-showcase/arrays"
                    className="inline-flex w-fit rounded-xl bg-accent px-5 py-3 text-sm font-black text-accent-foreground shadow-lg shadow-accent/20 transition hover:-translate-y-0.5"
                  >
                    Start with Arrays
                  </Link>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {allAlgorithmTopics.map((topic, index) => (
                    <Reveal key={topic.slug} delay={(index % 8) * 0.03}>
                      <Link
                        href={`/dsa-showcase/${topic.slug}`}
                        className="block rounded-2xl border border-border bg-background/70 p-4 transition hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10"
                      >
                        <p className="text-sm font-black">{topic.title}</p>
                        <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">
                          {topic.explanation}
                        </p>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </Container>
      </Section>
    </div>
  );
}
