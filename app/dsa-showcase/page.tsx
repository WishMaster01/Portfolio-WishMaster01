import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { dsaStats, dsaTopics } from "@/data/dsa";

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

          <div className="mt-8 grid gap-6 xl:grid-cols-[260px_1fr]">
            <Reveal>
              <Card className="sticky top-24 rounded-2xl">
                <CardContent className="p-5">
                  <h2 className="font-black">Topics</h2>
                  <nav className="mt-4 max-h-[65dvh] space-y-2 overflow-y-auto pr-1">
                    {dsaTopics.map((topic) => (
                      <a
                        key={topic.title}
                        href={`#${topic.title.toLowerCase().replaceAll(" ", "-")}`}
                        className="block rounded-xl px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-accent/10 hover:text-accent"
                      >
                        {topic.title}
                      </a>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </Reveal>

            <div className="grid gap-6">
              {dsaTopics.map((topic, index) => (
                <Reveal key={topic.title} delay={(index % 4) * 0.04}>
                  <Card
                    id={topic.title.toLowerCase().replaceAll(" ", "-")}
                    className="scroll-mt-28 rounded-2xl"
                  >
                    <CardContent className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[0.9fr_1.1fr]">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
                          DSA Topic
                        </p>
                        <h2 className="mt-2 text-2xl font-black">
                          {topic.title}
                        </h2>
                        <p className="mt-4 text-sm leading-7 text-muted-foreground">
                          {topic.description}
                        </p>
                        <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                          {topic.patterns.map((pattern) => (
                            <span
                              key={pattern}
                              className="rounded-xl bg-accent/10 px-3 py-2 font-bold text-accent"
                            >
                              {pattern}
                            </span>
                          ))}
                        </div>
                        <div className="mt-5 grid gap-4 text-sm md:grid-cols-2">
                          <div className="rounded-2xl border border-border bg-background/60 p-4">
                            <p className="font-black">Complexity</p>
                            <p className="mt-2 leading-6 text-muted-foreground">
                              {topic.complexity}
                            </p>
                          </div>
                          <div className="rounded-2xl border border-border bg-background/60 p-4">
                            <p className="font-black">Use Case</p>
                            <p className="mt-2 leading-6 text-muted-foreground">
                              {topic.useCase}
                            </p>
                          </div>
                        </div>
                      </div>
                      <pre className="overflow-x-auto rounded-2xl border border-border bg-background p-5 text-xs leading-6 text-muted-foreground shadow-inner">
                        <code>{topic.code}</code>
                      </pre>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
