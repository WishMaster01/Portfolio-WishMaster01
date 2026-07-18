import type { AlgorithmTopic, PracticeProblem } from "@/types/dsa";
import Link from "next/link";
import { AlgorithmVisualizer } from "@/components/dsa/AlgorithmVisualizer";
import { CodeViewer } from "@/components/dsa/CodeViewer";
import { DSASidebar } from "@/components/dsa/DSASidebar";
import { InteractiveSubmission } from "@/components/dsa/InteractiveSubmission";
import { ProblemList } from "@/components/dsa/ProblemList";
import { TopicOverview } from "@/components/dsa/TopicOverview";
import { UseCaseSection } from "@/components/dsa/UseCaseSection";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";

type DsaTopicPageProps = {
  topic: AlgorithmTopic;
  topics: AlgorithmTopic[];
  problems: PracticeProblem[];
};

export function DsaTopicPage({ topic, topics, problems }: DsaTopicPageProps) {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <DSASidebar topics={topics} activeSlug={topic.slug} />
          </div>
        </Reveal>

        <div className="space-y-6">
          <Reveal>
            <Link
              href="/dsa-showcase"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 px-4 py-2 text-sm font-black text-muted-foreground shadow-sm transition hover:-translate-x-1 hover:border-accent/50 hover:text-accent"
            >
              <span aria-hidden="true">&larr;</span>
              Back to DSA Showcase
            </Link>
          </Reveal>

          <Reveal>
            <TopicOverview topic={topic} />
          </Reveal>

          <Reveal delay={0.04}>
            <AlgorithmVisualizer topic={topic} />
          </Reveal>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-6">
              <Reveal delay={0.08}>
                <Card className="rounded-3xl bg-surface">
                  <CardContent className="p-5 sm:p-6">
                    <h2 className="text-xl font-black">Definition</h2>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      {topic.explanation}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>

              <Reveal delay={0.1}>
                <Card className="rounded-3xl bg-surface">
                  <CardContent className="p-5 sm:p-6">
                    <h2 className="text-xl font-black">Example</h2>
                    <h3 className="mt-4 font-black">
                      {topic.example.problem}
                    </h3>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <ExampleBox label="Input" value={topic.example.input} />
                      <ExampleBox label="Output" value={topic.example.output} />
                    </div>
                    <p className="mt-5 rounded-2xl border border-border bg-background/70 p-4 text-sm leading-7 text-muted-foreground">
                      {topic.example.explanation}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>

              <Reveal delay={0.12}>
                <CodeViewer code={topic.javaCode} />
              </Reveal>
            </div>

            <aside className="space-y-6">
              <Reveal delay={0.1}>
                <Checklist title="Recognition cues" items={topic.recognition} />
              </Reveal>
              <Reveal delay={0.12}>
                <Checklist title="Solving approach" items={topic.approach} />
              </Reveal>
              <Reveal delay={0.14}>
                <Checklist title="Common mistakes" items={topic.pitfalls} />
              </Reveal>
            </aside>
          </div>

          <Reveal delay={0.16}>
            <UseCaseSection useCases={topic.useCases} />
          </Reveal>

          <Reveal delay={0.18}>
            <ProblemList problems={problems} />
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.2}>
        <InteractiveSubmission topic={topic} />
      </Reveal>
    </div>
  );
}

function ExampleBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background/70 p-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
        {label}
      </p>
      <p className="mt-2 font-mono text-sm leading-6 text-foreground">
        {value}
      </p>
    </div>
  );
}

function Checklist({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="rounded-3xl bg-surface">
      <CardContent className="p-5">
        <h2 className="font-black">{title}</h2>
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-7 text-muted-foreground">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
