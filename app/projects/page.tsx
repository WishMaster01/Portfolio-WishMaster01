import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { ProjectComparison } from "@/components/projects/project-comparison";
import { ProjectBrowser } from "@/components/projects/project-browser";
import { AuroraBackground } from "@/components/aurora/aurora-background";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects | Sumit Kumar",
  description:
    "Curated production case studies covering AI systems, travel optimization, e-commerce architectures, and responsive full-stack applications.",
};

export default function ProjectsPage() {
  return (
    <AuroraBackground intensity="medium" className="min-h-screen">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20 text-foreground">
        <Reveal className="mb-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-accent shadow-xs">
            <span>Case Study Library</span>
          </div>
          <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-6xl text-foreground">
            Featured Projects
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
            Structured product case studies detailing real architectural trade-offs,
            domain boundaries, performance benchmarks, and production-tested systems.
          </p>
        </Reveal>

        <div className="space-y-12">
          <ProjectBrowser projects={projects} />
          <ProjectComparison projects={projects} />
        </div>
      </div>
    </AuroraBackground>
  );
}
