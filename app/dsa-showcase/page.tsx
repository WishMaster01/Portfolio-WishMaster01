import { Reveal } from "@/components/motion/reveal";
import { DsaTopicShowcase } from "@/components/dsa/dsa-topic-showcase";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { dsaStats } from "@/data/dsa";

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

          <Reveal className="mt-8" delay={0.08}>
            <DsaTopicShowcase />
          </Reveal>
        </Container>
      </Section>
    </div>
  );
}
