import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { GitHubDashboardData } from "@/types/github";

type GitHubOverviewProps = {
  data: GitHubDashboardData;
};

export function GitHubOverview({ data }: GitHubOverviewProps) {
  const { profile } = data;

  return (
    <Reveal>
      <Card className="theme-accent-glow overflow-hidden rounded-[2.25rem] border-accent/20 bg-surface/95 shadow-xl shadow-foreground/5">
        <CardContent className="relative p-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_30%),radial-gradient(circle_at_84%_20%,color-mix(in_oklab,var(--ambient-two)_16%,transparent),transparent_34%)]" />
          <div className="github-signal-grid absolute inset-0 opacity-50" />
          <div className="github-scanline absolute inset-x-0 top-0 h-20" />
          <div className="relative grid grid-cols-[minmax(0,1fr)_minmax(112px,34vw)] gap-4 p-4 sm:gap-8 sm:p-8 lg:grid-cols-[1fr_360px] lg:p-10">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent">
                Live GitHub Intelligence
              </p>
              <h1 className="mt-3 text-[clamp(2rem,8vw,3.75rem)] font-black leading-none tracking-[-0.05em] text-foreground sm:mt-4 sm:text-6xl">
                {profile.name}
              </h1>
              <p className="mt-2 text-base font-black text-accent sm:mt-3 sm:text-xl">
                @{profile.username}
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground sm:mt-5 sm:text-base sm:leading-8">
                {profile.bio}
              </p>

              <div className="mt-5 flex flex-wrap gap-2 sm:mt-7 sm:gap-3">
                <a
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-accent px-4 py-2.5 text-xs font-black text-accent-foreground shadow-lg shadow-accent/20 transition hover:bg-accent/90 sm:px-5 sm:py-3 sm:text-sm"
                >
                  View GitHub Profile →
                </a>
                <a
                  href="/api/github/profile"
                  className="rounded-full border border-border bg-background px-4 py-2.5 text-xs font-black text-foreground transition hover:border-accent/40 hover:text-accent sm:px-5 sm:py-3 sm:text-sm"
                >
                  API JSON
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="github-pulse-orb absolute inset-4 rounded-full bg-accent/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border bg-background/70 p-3 sm:rounded-[2rem] sm:p-5">
                <div className="grid justify-items-center gap-3 text-center sm:flex sm:items-center sm:gap-4 sm:text-left">
                  {profile.avatarUrl ? (
                    <Image
                      src={profile.avatarUrl}
                      alt={`${profile.username} GitHub avatar`}
                      width={88}
                      height={88}
                      className="h-16 w-16 rounded-2xl border border-border sm:h-[88px] sm:w-[88px] sm:rounded-3xl"
                    />
                  ) : (
                    <div className="grid h-16 w-16 place-items-center rounded-2xl bg-accent text-2xl font-black text-accent-foreground sm:h-[88px] sm:w-[88px] sm:rounded-3xl sm:text-3xl">
                      W
                    </div>
                  )}
                  <div>
                    <p className="font-black text-foreground">
                      {profile.username}
                    </p>
                    <p className="mt-1 hidden text-sm text-muted-foreground sm:block">
                      GitHub member since{" "}
                      {new Date(profile.createdAt).getFullYear()}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-2 text-center sm:mt-5 sm:grid-cols-3 sm:gap-3">
                  <MiniStat value={profile.publicRepos} label="Repos" />
                  <MiniStat value={profile.followers} label="Followers" />
                  <MiniStat value={profile.following} label="Following" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}

function MiniStat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface/80 p-3">
      <p className="text-2xl font-black text-foreground">{value}</p>
      <p className="mt-1 text-xs font-bold text-muted-foreground">{label}</p>
    </div>
  );
}
