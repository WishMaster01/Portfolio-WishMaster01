import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";

export function CombinedPlatformBanner() {
  return (
    <Reveal>
      <Card className="theme-accent-glow overflow-hidden rounded-[2.25rem] border-accent/30 bg-surface/95 shadow-xl">
        <CardContent className="relative p-6 sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,color-mix(in_oklab,var(--accent)_16%,transparent),transparent_40%),radial-gradient(circle_at_85%_30%,color-mix(in_oklab,#f59e0b_14%,transparent),transparent_40%)]" />
          <div className="github-signal-grid absolute inset-0 opacity-40" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-black uppercase tracking-wider text-accent">
                  Dual Technical Telemetry
                </span>
                <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-black uppercase tracking-wider text-amber-500">
                  GitHub + LeetCode
                </span>
              </div>
              <h2 className="mt-3 text-2xl font-black tracking-[-0.03em] text-foreground sm:text-3xl">
                Engineering Velocity & Algorithmic Problem Solving
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                Verifiable real-time signals spanning full-stack system architecture on GitHub (Next.js, Node.js, AI SaaS) and 149+ competitive DSA solves on LeetCode with Java & C++.
              </p>

              <div className="mt-5 flex flex-wrap gap-4 text-xs font-bold text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <strong className="text-foreground">17</strong> Public Repos
                </span>
                <span className="flex items-center gap-1.5">
                  <strong className="text-foreground">137+</strong> Yearly Contributions
                </span>
                <span className="flex items-center gap-1.5">
                  <strong className="text-emerald-500">36</strong> Easy
                </span>
                <span className="flex items-center gap-1.5">
                  <strong className="text-amber-500">94</strong> Medium
                </span>
                <span className="flex items-center gap-1.5">
                  <strong className="text-rose-500">19</strong> Hard
                </span>
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href="/activity"
                className="rounded-full bg-accent px-5 py-3 text-sm font-black text-accent-foreground shadow-lg shadow-accent/20 transition hover:bg-accent/90"
              >
                Explore Activity Hub →
              </Link>
              <a
                href="https://leetcode.com/u/WishMaster01/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-amber-500/30 bg-amber-500/10 px-5 py-3 text-sm font-black text-amber-500 transition hover:bg-amber-500/20"
              >
                LeetCode Profile ↗
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}
