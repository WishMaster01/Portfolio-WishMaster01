import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { GitHubRepository } from "@/types/github";

type PinnedRepositoriesProps = {
  repositories: GitHubRepository[];
};

export function PinnedRepositories({ repositories }: PinnedRepositoriesProps) {
  return (
    <Reveal>
      <Card className="rounded-[2rem] bg-surface/95">
        <CardContent className="p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
                Pinned / Ranked Repositories
              </p>
              <h2 className="mt-2 text-2xl font-black text-foreground">
                High-signal GitHub projects
              </h2>
            </div>
            <a
              href="/api/github/repositories"
              className="text-sm font-black text-accent"
            >
              Repositories API →
            </a>
          </div>

          {repositories.length > 0 ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {repositories.slice(0, 6).map((repo, index) => (
                <a
                  key={repo.fullName}
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="github-float group rounded-2xl border border-border bg-background/70 p-5 transition hover:-translate-y-1 hover:border-accent/40 hover:bg-accent/10 hover:shadow-lg hover:shadow-accent/10"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
                        Repo {index + 1}
                      </p>
                      <h3 className="mt-2 text-xl font-black text-foreground">
                        {repo.name}
                      </h3>
                    </div>
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-black text-accent">
                      ★ {repo.stars}
                    </span>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {repo.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-bold text-muted-foreground">
                      {repo.language}
                    </span>
                    <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-bold text-muted-foreground">
                      Forks {repo.forks}
                    </span>
                    <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-bold text-muted-foreground">
                      Rank {repo.rankScore}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              Repository data will appear after GitHub API data is available.
            </p>
          )}
        </CardContent>
      </Card>
    </Reveal>
  );
}
