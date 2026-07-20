"use client";

import dynamic from "next/dynamic";
import { Reveal } from "@/components/motion/reveal";

const MermaidRenderer = dynamic(
  () =>
    import("./mermaid-renderer").then((module) => module.MermaidRenderer),
  {
    ssr: false,
    loading: () => (
      <div className="h-80 animate-pulse rounded-3xl border border-border bg-surface-elevated" />
    ),
  },
);

type ArchitectureDiagramProps = {
  definition: string | null;
};

export function ArchitectureDiagram({ definition }: ArchitectureDiagramProps) {
  if (!definition) {
    return null;
  }

  return (
    <Reveal>
      <section aria-labelledby="architecture-diagram-heading">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
              Visual map
            </p>
            <h2
              id="architecture-diagram-heading"
              className="mt-2 text-3xl font-black tracking-[-0.04em] text-foreground sm:text-4xl"
            >
              Architecture diagram
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Mermaid-rendered system map showing how traffic, services,
            providers, storage, and integration boundaries connect.
          </p>
        </div>

        <div className="mt-8 overflow-x-auto rounded-[2rem] border border-border bg-surface/85 p-4 shadow-2xl shadow-accent/10 backdrop-blur sm:p-6">
          <MermaidRenderer definition={definition} />
        </div>
      </section>
    </Reveal>
  );
}
