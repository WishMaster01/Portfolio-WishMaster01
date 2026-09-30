import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@/components/icons/arrow-left";
import { Reveal } from "@/components/motion/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/ui/section-header";
import { AuroraBackground } from "@/components/aurora/aurora-background";

export const metadata: Metadata = {
  title: "Performance Engineering | Sumit Kumar",
  description:
    "Performance optimizations implemented across Next.js Server Components, in-memory dual LFU/LRU caches, image loading, and GitHub API scheduled refresh.",
  alternates: {
    canonical: "/engineering/performance",
  },
};

const performanceStrategies = [
  {
    title: "Server Components by Default",
    category: "Bundle Optimization",
    description:
      "All non-interactive content, markdown documentation, case-study texts, and database queries execute on the server. Zero client JavaScript is shipped for static layouts.",
  },
  {
    title: "Dual In-Memory Caching (LRU & LFU)",
    category: "Latency Elimination",
    description:
      "Frequently accessed user preferences and BM25 search queries are stored in memory caches with bounded sizes, lowering repetitive query latency from ~25ms to <0.05ms.",
  },
  {
    title: "GitHub API Telemetry Caching",
    category: "External Rate Limit Protection",
    description:
      "Visitor requests never trigger raw external requests to GitHub. Public statistics and contribution heatmaps are cached with periodic background revalidation.",
  },
  {
    title: "Selective Image Optimization",
    category: "Asset Delivery",
    description:
      "All project previews and avatars use Next.js next/image with responsive WebP/AVIF transcoding, explicit aspect ratios, and priority hints to prevent layout shifts.",
  },
  {
    title: "Database Query Indexing & Projection",
    category: "Database Performance",
    description:
      "Prisma queries select only necessary scalar fields rather than fetching full records. Relational lookups rely on b-tree indexes on slugs, published status, and foreign keys.",
  },
  {
    title: "Adaptive Visual Motion",
    category: "Client Rendering",
    description:
      "Heavy particle layers, cursor spotlights, and continuous background animations automatically step down on mobile screens (<1024px) or when prefers-reduced-motion is active.",
  },
];

export default function PerformancePage() {
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
          eyebrow="Speed, Efficiency & Resilience"
          title="Performance Engineering Practices"
          description="A transparent inventory of real performance techniques implemented in this codebase to guarantee fast TTFB, minimal client JavaScript, and smooth 60fps animations."
        />

        {/* Performance Strategies Grid */}
        <section className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {performanceStrategies.map((strat, index) => (
              <Reveal key={strat.title} delay={index * 0.04}>
                <GlassCard className="h-full p-6 sm:p-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent bg-accent/15 px-2.5 py-0.5 rounded-full">
                        {strat.category}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">
                        VERIFIED
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-foreground">
                      {strat.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      {strat.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/70 flex items-center gap-2 text-xs font-mono text-accent">
                    <span>⚡</span> Optimized Architecture
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </AuroraBackground>
  );
}
