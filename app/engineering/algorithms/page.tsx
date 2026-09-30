import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@/components/icons/arrow-left";
import { Reveal } from "@/components/motion/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/ui/section-header";
import { AuroraBackground } from "@/components/aurora/aurora-background";
import { AlgorithmsShowcase } from "@/components/engineering/algorithms-section";

export const metadata: Metadata = {
  title: "Algorithms & Data Structures | Sumit Kumar",
  description:
    "11 production data structures and algorithms implemented in TypeScript: LRU/LFU caching, BM25 retrieval, Prefix Tries, vector similarity, and string distance.",
  alternates: {
    canonical: "/engineering/algorithms",
  },
};

const practicalApplications = [
  {
    title: "In-Memory Dual Caching (LRU & LFU)",
    description:
      "Used to cache frequent user theme preferences and repetitive search queries, bypassing database latency and reducing roundtrips from ~25ms to <0.05ms.",
    source: "lib/algorithms/lru-cache.ts & lfu-cache.ts",
  },
  {
    title: "BM25 Text Search & Scoring",
    description:
      "Powers the site-wide command palette (Cmd+K) and the candidate retrieval phase of the Aurora AI assistant with term-frequency and inverse document frequency scoring.",
    source: "lib/algorithms/bm25.ts",
  },
  {
    title: "Prefix Trie Autocomplete",
    description:
      "Enables instant prefix-based auto-completion across project titles, tags, and technologies with linear-in-query-length retrieval O(L).",
    source: "lib/algorithms/trie.ts",
  },
  {
    title: "Vector Cosine Similarity",
    description:
      "Computes semantic similarity across 256-dimensional embeddings for project case studies and architectural decisions to construct grounded LLM prompts.",
    source: "lib/algorithms/vector-similarity.ts",
  },
];

export default function AlgorithmsPage() {
  return (
    <AuroraBackground intensity="medium" className="min-h-screen">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-20 text-foreground space-y-16">
        {/* Navigation Breadcrumb */}
        <Link
          href="/engineering"
          className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Engineering Hub
        </Link>

        {/* Header */}
        <SectionHeader
          eyebrow="Algorithmic Engineering"
          title="In-Repository Algorithms &amp; Data Structures"
          description="11 production algorithms implemented natively in TypeScript with formal time/space complexity analysis and direct use cases throughout this portfolio."
        />

        {/* Real-world portfolio applications */}
        <section className="space-y-6">
          <SectionHeader
            eyebrow="Portfolio Grounding"
            title="Where These Algorithms Run"
            description="Algorithms are not ornamental LeetCode puzzles here: they power real user workflows."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {practicalApplications.map((app, index) => (
              <Reveal key={app.title} delay={index * 0.04}>
                <GlassCard className="h-full p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-black uppercase text-accent tracking-wider font-mono">
                      Application 0{index + 1}
                    </span>
                    <h3 className="text-base font-black text-foreground">
                      {app.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {app.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border/70">
                    <span className="text-[11px] font-mono text-accent">
                      {app.source}
                    </span>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Interactive Algorithms Showcase Component */}
        <section className="space-y-6">
          <SectionHeader
            eyebrow="Interactive Catalog"
            title="Algorithm Deep Dive &amp; Complexity"
            description="Inspect time complexity, space complexity, implementation patterns, and repository source paths."
          />

          <GlassCard className="p-6 sm:p-8 border-accent/25">
            <AlgorithmsShowcase />
          </GlassCard>
        </section>
      </div>
    </AuroraBackground>
  );
}
