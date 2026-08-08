"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { allAlgorithmTopics, dsaLearningPath } from "@/data/dsa";
import { cn } from "@/lib/utils";

const algorithmGroups = [
  {
    label: "gradient thinking",
    items: ["Arrays", "Linked Lists", "Stacks", "Queues"],
  },
  {
    label: "Relationship modeling",
    items: ["Trees", "Graphs"],
  },
  {
    label: "Optimization",
    items: ["Searching", "Sorting", "Dynamic Programming", "Greedy Algorithms"],
  },
  {
    label: "Exhaustive search",
    items: ["Backtracking", "Bit Manipulation"],
  },
] as const;

function topicSlug(title: string) {
  return title.toLowerCase().replaceAll(" ", "-");
}

export function DsaTopicShowcase() {
  const [selectedTitle, setSelectedTitle] = useState<string>(
    allAlgorithmTopics[0].title,
  );
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const syncFromHash = () => {
      const hash = decodeURIComponent(window.location.hash.replace("#", ""));
      const matchedTopic = allAlgorithmTopics.find(
        (topic) => topicSlug(topic.title) === hash,
      );

      if (matchedTopic) {
        setSelectedTitle(matchedTopic.title);
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);

    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const selectedTopic = useMemo(
    () =>
      allAlgorithmTopics.find((topic) => topic.title === selectedTitle) ??
      allAlgorithmTopics[0],
    [selectedTitle],
  );

  function selectTopic(title: string) {
    setSelectedTitle(title);
    window.history.replaceState(null, "", `#${topicSlug(title)}`);
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden rounded-[2rem] border-accent/20 bg-surface/95 shadow-xl shadow-foreground/5">
        <CardContent className="relative p-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_28%),radial-gradient(circle_at_88%_10%,color-mix(in_oklab,var(--ambient-two)_14%,transparent),transparent_30%)]" />

          <div className="relative grid gap-5 p-4 sm:gap-8 sm:p-7 md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_360px] lg:p-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-accent">
                DSA Algorithm Dashboard
              </p>
              <h2 className="mt-3 max-w-3xl text-2xl font-black tracking-[-0.04em] text-foreground sm:text-4xl">
                Learn the topic, identify the pattern, then implement the
                solution.
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                Select a DSA topic from the dropdown. The page updates in place
                with detailed recognition cues, solving strategy, example
                walkthrough, pitfalls, and Java implementation.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3 sm:mt-6">
                {dsaLearningPath.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, transform: "translateY(10px)" }
                    }
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : { opacity: 1, transform: "translateY(0)" }
                    }
                    transition={{ delay: index * 0.05, duration: 0.22 }}
                    className="rounded-2xl border border-border bg-background/70 p-4"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-sm font-black text-accent-foreground">
                      {index + 1}
                    </div>
                    <h3 className="mt-3 font-black text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <aside className="rounded-3xl border border-border bg-background/80 p-4 shadow-sm sm:p-5">
              <label
                htmlFor="dsa-topic"
                className="text-xs font-black uppercase tracking-[0.22em] text-accent"
              >
                Choose Topic
              </label>
              <select
                id="dsa-topic"
                value={selectedTopic.title}
                onChange={(event) => selectTopic(event.target.value)}
                className="mt-3 w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-black text-foreground shadow-sm transition focus:border-accent"
              >
                {allAlgorithmTopics.map((topic) => (
                  <option key={topic.title} value={topic.title}>
                    {topic.title}
                  </option>
                ))}
              </select>

              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-1 md:mt-5">
                <div className="rounded-2xl border border-border bg-surface/80 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Category
                  </p>
                  <p className="mt-1 font-black text-foreground">
                    {selectedTopic.category}
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-surface/80 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Difficulty
                  </p>
                  <p className="mt-1 font-black text-foreground">
                    {selectedTopic.difficulty}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {algorithmGroups.map((group) => (
          <Card key={group.label} className="rounded-3xl bg-surface/90">
            <CardContent className="p-4 sm:p-5">
              <h3 className="font-black text-foreground">{group.label}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => {
                  const isActive = selectedTopic.title === item;

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => selectTopic(item)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-bold transition",
                        isActive
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border bg-background text-muted-foreground hover:border-accent/50 hover:text-accent",
                      )}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div
        id={topicSlug(selectedTopic.title)}
        className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px] xl:gap-6"
      >
        <motion.section
          key={selectedTopic.title}
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.18 }}
          className="space-y-6"
        >
          <Card className="rounded-[2rem] bg-surface/95">
            <CardContent className="p-5 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-accent">
                    Selected DSA Topic
                  </p>
                  <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-foreground sm:text-4xl">
                    {selectedTopic.title}
                  </h2>
                </div>
                <span className="rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-accent">
                  {selectedTopic.difficulty}
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-muted-foreground sm:mt-5 sm:text-base sm:leading-8">
                {selectedTopic.explanation}
              </p>

              <p className="mt-4 rounded-2xl border border-border bg-background/70 p-4 text-sm leading-7 text-muted-foreground sm:mt-5">
                {selectedTopic.visualExplanation}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {selectedTopic.patterns.map((pattern) => (
                  <span
                    key={pattern}
                    className="rounded-full bg-accent/10 px-3 py-1.5 text-sm font-bold text-accent"
                  >
                    {pattern}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <InfoList
              title="How to recognize this pattern"
              items={selectedTopic.recognition}
            />
            <InfoList
              title="Solving approach"
              items={selectedTopic.approach}
              ordered
            />
          </div>

          <Card className="rounded-[2rem] bg-surface/95">
            <CardContent className="p-5 sm:p-7">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
                Detailed Example
              </p>
              <h3 className="mt-2 text-xl font-black text-foreground sm:text-2xl">
                {selectedTopic.example.problem}
              </h3>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4">
                <ExampleBox label="Input" value={selectedTopic.example.input} />
                <ExampleBox
                  label="Output"
                  value={selectedTopic.example.output}
                />
              </div>

              <p className="mt-5 rounded-2xl border border-border bg-background/70 p-4 text-sm leading-7 text-muted-foreground">
                {selectedTopic.example.explanation}
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] bg-surface/95">
            <CardContent className="p-5 sm:p-7">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
                Java Reference Implementation
              </p>
              <pre className="mt-4 max-h-[520px] overflow-x-auto rounded-2xl border border-border bg-background p-4 text-[11px] leading-6 text-muted-foreground shadow-inner sm:p-5 sm:text-xs">
                <code>{selectedTopic.javaCode}</code>
              </pre>
            </CardContent>
          </Card>
        </motion.section>

        <aside className="space-y-6 xl:sticky xl:top-28 xl:self-start">
          <Card className="rounded-[2rem] bg-surface/95">
            <CardContent className="p-5">
              <h3 className="font-black text-foreground">Complexity</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                <span className="block">
                  Time: {selectedTopic.timeComplexity}
                </span>
                <span className="mt-2 block">
                  Space: {selectedTopic.spaceComplexity}
                </span>
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] bg-surface/95">
            <CardContent className="p-5">
              <h3 className="font-black text-foreground">Where it is used</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {selectedTopic.useCases.join(" • ")}
              </p>
            </CardContent>
          </Card>

          <InfoList title="Common mistakes" items={selectedTopic.pitfalls} />

          <Card className="rounded-[2rem] bg-accent text-accent-foreground shadow-xl shadow-accent/20">
            <CardContent className="p-5">
              <h3 className="font-black">Practice focus</h3>
              <div className="mt-4 grid gap-2">
                {selectedTopic.relatedProblems.map((problem) => (
                  <div
                    key={problem}
                    className="rounded-2xl bg-background/15 px-4 py-3 text-sm font-bold"
                  >
                    {problem}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function InfoList({
  title,
  items,
  ordered = false,
}: {
  title: string;
  items: readonly string[];
  ordered?: boolean;
}) {
  const ListTag = ordered ? "ol" : "ul";

  return (
    <Card className="rounded-[2rem] bg-surface/95">
      <CardContent className="p-5 sm:p-6">
        <h3 className="font-black text-foreground">{title}</h3>
        <ListTag className="mt-4 space-y-3">
          {items.map((item, index) => (
            <li
              key={item}
              className="flex gap-3 text-sm leading-7 text-muted-foreground"
            >
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-black text-accent">
                {ordered ? index + 1 : "•"}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ListTag>
      </CardContent>
    </Card>
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
