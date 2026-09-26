import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { UnifiedActivityItem } from "@/types/developer-activity";

type UnifiedActivityFeedProps = {
  feed: UnifiedActivityItem[];
};

export function UnifiedActivityFeed({ feed }: UnifiedActivityFeedProps) {
  return (
    <Reveal>
      <Card className="rounded-[2rem] bg-surface/95">
        <CardContent className="p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
                Unified Telemetry Stream
              </p>
              <h2 className="mt-2 text-2xl font-black text-foreground">
                Chronological Activity Feed
              </h2>
            </div>
            <p className="text-xs font-bold text-muted-foreground">
              Merged commits, repository pushes & accepted algorithmic solutions
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {feed.slice(0, 10).map((item) => {
              const badgeClasses =
                item.platform === "github"
                  ? "bg-accent/10 text-accent border-accent/20"
                  : item.badgeVariant === "rose"
                    ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
                    : item.badgeVariant === "amber"
                      ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                      : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";

              return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col gap-2 rounded-2xl border border-border bg-background/70 p-4 transition hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span
                      className={`mt-0.5 shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${badgeClasses}`}
                    >
                      {item.badge}
                    </span>
                    <div className="min-w-0">
                      <p className="font-black text-foreground transition group-hover:text-accent truncate">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center justify-between sm:justify-end gap-3 text-xs text-muted-foreground">
                    <span>
                      {new Date(item.timestamp).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="font-bold text-accent group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}
