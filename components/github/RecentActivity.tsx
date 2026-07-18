import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { GitHubActivity } from "@/types/github";

type RecentActivityProps = {
  activity: GitHubActivity[];
};

export function RecentActivity({ activity }: RecentActivityProps) {
  return (
    <Reveal>
      <Card className="rounded-[2rem] bg-surface/95">
        <CardContent className="p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
            Recent Activity
          </p>
          <h2 className="mt-2 text-2xl font-black text-foreground">
            Latest public GitHub signals
          </h2>

          {activity.length > 0 ? (
            <div className="mt-6 space-y-3">
              {activity.slice(0, 8).map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group block rounded-2xl border border-border bg-background/70 p-4 transition hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/10"
                >
                  <p className="font-black text-foreground transition group-hover:text-accent">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.repo}
                  </p>
                  <p className="mt-2 text-xs font-bold text-accent">
                    {new Date(item.createdAt).toISOString().slice(0, 10)}
                  </p>
                </a>
              ))}
            </div>
          ) : (
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              Recent public activity will appear once GitHub data is available.
            </p>
          )}
        </CardContent>
      </Card>
    </Reveal>
  );
}
