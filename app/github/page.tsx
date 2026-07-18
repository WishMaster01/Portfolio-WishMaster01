import type { Metadata } from "next";
import { Suspense } from "react";
import { GitHubDashboard } from "@/components/github/GitHubDashboard";
import { GitHubStatsSkeleton } from "@/components/github/GitHubStatsSkeleton";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "GitHub Stats",
  description:
    "Live GitHub statistics dashboard for WishMaster01 with repositories, followers, stars, languages, pinned repositories, contribution activity, and recent activity.",
};

export default function GitHubStatsPage() {
  return (
    <div className="bg-background text-foreground">
      <Section className="py-12 sm:py-16">
        <Container className="max-w-[1380px]">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-accent">
              Futuristic Developer Telemetry
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              GitHub Statistics Dashboard
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
              Live server-side GitHub analytics with cached API calls,
              repository ranking, language aggregation, pinned repositories,
              contribution activity, and recent public activity.
            </p>
          </div>

          <Suspense fallback={<GitHubStatsSkeleton />}>
            <GitHubDashboard />
          </Suspense>
        </Container>
      </Section>
    </div>
  );
}
