import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { LeetCodeDashboardData } from "@/types/leetcode";

type LeetCodeOverviewProps = {
  data: LeetCodeDashboardData;
};

export function LeetCodeOverview({ data }: LeetCodeOverviewProps) {
  const { profile, stats } = data;

  return (
    <Reveal>
      <Card className="theme-accent-glow overflow-hidden rounded-[2.25rem] border-amber-500/20 bg-surface/95 shadow-xl shadow-foreground/5">
        <CardContent className="relative p-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,color-mix(in_oklab,#f59e0b_18%,transparent),transparent_30%),radial-gradient(circle_at_84%_20%,color-mix(in_oklab,var(--accent)_16%,transparent),transparent_34%)]" />
          <div className="github-signal-grid absolute inset-0 opacity-50" />
          <div className="github-scanline absolute inset-x-0 top-0 h-20" />
          <div className="relative grid grid-cols-1 gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_minmax(220px,34vw)] sm:gap-8 sm:p-8 lg:grid-cols-[1fr_360px] lg:p-10">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-500">
                  Algorithmic Problem Solving
                </p>
                <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-500">
                  {data.dataSource === "live" ? "Live Telemetry" : "Verified Snapshot"}
                </span>
              </div>
              <h1 className="mt-3 text-[clamp(2rem,8vw,3.75rem)] font-black leading-none tracking-[-0.05em] text-foreground sm:mt-4 sm:text-6xl">
                {profile.realName}
              </h1>
              <p className="mt-2 text-base font-black text-amber-500 sm:mt-3 sm:text-xl">
                @{profile.username} • {profile.country}
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground sm:mt-5 sm:text-base sm:leading-8">
                {profile.aboutMe}
              </p>

              <div className="mt-5 flex flex-wrap gap-2 sm:mt-7 sm:gap-3">
                <a
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-amber-500 px-4 py-2.5 text-xs font-black text-white shadow-lg shadow-amber-500/20 transition hover:bg-amber-600 sm:px-5 sm:py-3 sm:text-sm"
                >
                  View LeetCode Profile →
                </a>
                <a
                  href="/api/leetcode/stats"
                  className="rounded-full border border-border bg-background px-4 py-2.5 text-xs font-black text-foreground transition hover:border-amber-500/40 hover:text-amber-500 sm:px-5 sm:py-3 sm:text-sm"
                >
                  DSA Telemetry JSON
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="github-pulse-orb absolute inset-4 rounded-full bg-amber-500/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border bg-background/70 p-3 sm:rounded-[2rem] sm:p-5">
                <div className="grid justify-items-center gap-3 text-center sm:flex sm:items-center sm:gap-4 sm:text-left">
                  {profile.avatarUrl ? (
                    <Image
                      src={profile.avatarUrl}
                      alt={`${profile.username} LeetCode avatar`}
                      width={88}
                      height={88}
                      unoptimized
                      className="h-16 w-16 rounded-2xl border border-border sm:h-[88px] sm:w-[88px] sm:rounded-3xl object-cover"
                    />
                  ) : (
                    <div className="grid h-16 w-16 place-items-center rounded-2xl bg-amber-500 text-2xl font-black text-white sm:h-[88px] sm:w-[88px] sm:rounded-3xl sm:text-3xl">
                      LC
                    </div>
                  )}
                  <div>
                    <p className="font-black text-foreground">
                      {profile.username}
                    </p>
                    <p className="mt-1 hidden text-sm text-muted-foreground sm:block">
                      Global Rank #{stats.ranking.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-2 text-center sm:mt-5 sm:grid-cols-3 sm:gap-3">
                  <MiniStat value={stats.totalSolved} label="Solved" accentColor="text-amber-500" />
                  <MiniStat value={`${stats.acceptanceRate}%`} label="Accuracy" accentColor="text-emerald-500" />
                  <MiniStat value={stats.hardSolved} label="Hard DSA" accentColor="text-rose-500" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}

function MiniStat({
  value,
  label,
  accentColor = "text-foreground",
}: {
  value: string | number;
  label: string;
  accentColor?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface/80 p-3">
      <p className={`text-xl font-black sm:text-2xl ${accentColor}`}>{value}</p>
      <p className="mt-1 text-xs font-bold text-muted-foreground">{label}</p>
    </div>
  );
}
