import type { Metadata } from "next";
import { ExperienceDashboard } from "@/components/experience/experience-dashboard";
import { Reveal } from "@/components/motion/reveal";
import { AuroraBackground } from "@/components/aurora/aurora-background";

export const metadata: Metadata = {
  title: "Experience | Sumit Kumar",
  description:
    "Professional journey, production engineering achievements, architectural decisions, and working principles for Sumit Kumar.",
};

export default function ExperiencePage() {
  return (
    <AuroraBackground intensity="medium" className="min-h-screen">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20 text-foreground">
        <Reveal className="mb-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-accent shadow-xs">
            <span>Engineering Career & Track Record</span>
          </div>
          <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-6xl text-foreground">
            Experience & Journey
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
            Hands-on software development experience, AI/SaaS products delivered,
            disciplined architectural standards, and core engineering principles.
          </p>
        </Reveal>

        <ExperienceDashboard />
      </div>
    </AuroraBackground>
  );
}
