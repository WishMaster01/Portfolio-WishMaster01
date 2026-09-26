import type { Metadata } from "next";
import { Suspense } from "react";
import { DeveloperActivityWrapper } from "@/components/developer-activity/DeveloperActivityWrapper";
import { GitHubStatsSkeleton } from "@/components/github/GitHubStatsSkeleton";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Engineering Activity | GitHub Codebase & LeetCode Telemetry",
  description:
    "Live engineering activity for WishMaster01 combining public GitHub repositories, commit velocity, and LeetCode algorithmic problem solving (Easy, Medium, Hard breakdown).",
  alternates: {
    canonical: "/activity",
  },
};

export default function ActivityPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Section className="py-10 sm:py-14 lg:py-16">
        <Container className="max-w-[1440px]">
          <div className="mb-10 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full bg-accent/10 px-3.5 py-1 text-xs font-black uppercase tracking-[0.2em] text-accent">
                Dual Platform Telemetry
              </span>
              <span className="rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-black uppercase tracking-[0.2em] text-amber-500">
                Codebase &amp; DSA Mastery
              </span>
            </div>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
              Developer Activity Hub
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Verifiable engineering telemetry bridging full-stack software architecture
              on GitHub with competitive algorithmic problem solving on LeetCode. Real repositories,
              commit velocity, and rigorous data structure implementations.
            </p>
          </div>

          <Suspense fallback={<GitHubStatsSkeleton />}>
            <DeveloperActivityWrapper />
          </Suspense>
        </Container>
      </Section>
    </div>
  );
}
