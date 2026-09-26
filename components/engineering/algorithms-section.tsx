"use client";

import { useState } from "react";
import {
  engineeringAlgorithms,
} from "@/data/engineering-algorithms";
import { Reveal } from "@/components/motion/reveal";

const categories = [
  "All",
  "Caching & Memory",
  "Information Retrieval & NLP",
  "Search & Ordering",
  "Graph & Similarity",
] as const;

export function AlgorithmsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string>(engineeringAlgorithms[0].id);

  const filtered =
    selectedCategory === "All"
      ? engineeringAlgorithms
      : engineeringAlgorithms.filter((a) => a.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider transition ${
              selectedCategory === cat
                ? "bg-accent text-accent-foreground shadow-md shadow-accent/25"
                : "border border-border bg-surface text-muted-foreground hover:border-accent/40 hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Algorithm list */}
      <div className="grid gap-4">
        {filtered.map((algo, index) => {
          const isExpanded = expandedId === algo.id;

          return (
            <Reveal key={algo.id} delay={index * 0.03}>
              <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition hover:border-accent/40">
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? "" : algo.id)}
                  className="flex w-full items-center justify-between p-5 text-left transition"
                  aria-expanded={isExpanded}
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base font-black text-foreground sm:text-lg">
                        {algo.name}
                      </span>
                      <span className="rounded-md bg-accent/10 px-2.5 py-0.5 text-xs font-bold text-accent">
                        {algo.category}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span>Time: <strong className="text-foreground">{algo.timeComplexity.average}</strong></span>
                      <span>•</span>
                      <span>Space: <strong className="text-foreground">{algo.spaceComplexity}</strong></span>
                    </div>
                  </div>

                  <span className="ml-4 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border bg-background text-sm font-bold text-muted-foreground">
                    {isExpanded ? "−" : "+"}
                  </span>
                </button>

                {isExpanded && (
                  <div className="border-t border-border bg-background/50 p-5 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-xl border border-border/80 bg-surface p-4">
                        <h4 className="text-xs font-black uppercase tracking-wider text-accent">
                          Why It Exists
                        </h4>
                        <p className="mt-2 text-sm leading-6 text-foreground">
                          {algo.whyItExists}
                        </p>
                      </div>

                      <div className="rounded-xl border border-border/80 bg-surface p-4">
                        <h4 className="text-xs font-black uppercase tracking-wider text-accent">
                          Portfolio Application
                        </h4>
                        <p className="mt-2 text-sm leading-6 text-foreground">
                          {algo.portfolioUsage}
                        </p>
                        <p className="mt-3 text-xs text-muted-foreground">
                          Implemented in: <code className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-accent">{algo.sourceFile}</code>
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border bg-surface p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black uppercase tracking-wider text-accent">
                          Implementation & Example
                        </h4>
                        <span className="text-xs text-muted-foreground font-mono">TypeScript</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {algo.exampleExplanation}
                      </p>
                      <pre className="mt-3 overflow-x-auto rounded-lg bg-surface-elevated p-3 text-xs font-mono text-foreground leading-relaxed border border-border/60">
                        <code>{algo.codeSnippet}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
