import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { GitHubDashboardData } from "@/types/github";

type GitHubStatsCardsProps = {
  stats: GitHubDashboardData["stats"];
};

export function GitHubStatsCards({ stats }: GitHubStatsCardsProps) {
  const cards = [
    { label: "Repositories", value: stats.repositories, detail: "Public source repositories" },
    { label: "Followers", value: stats.followers, detail: "GitHub developer network" },
    { label: "Stars", value: stats.stars, detail: "Community repository stars" },
    { label: "Languages", value: stats.languages, detail: "Detected language stack" },
    { label: "Forks", value: stats.forks, detail: "Repository fork activity" },
    { label: "Contributions", value: stats.contributions, detail: "GitHub contribution calendar" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-6">
      {cards.map((card, index) => (
        <Reveal key={card.label} delay={(index % 6) * 0.04}>
          <Card className="group h-full overflow-hidden rounded-3xl bg-surface/95 transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10">
            <CardContent className="relative p-4 sm:p-5">
              <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-full bg-accent/10 transition group-hover:bg-accent/20 sm:h-20 sm:w-20" />
              <div className="absolute inset-x-0 bottom-0 h-1 bg-accent/20">
                <div className="h-full w-1/2 rounded-full bg-accent transition duration-500 group-hover:w-full" />
              </div>
              <p className="relative text-2xl font-black text-accent sm:text-3xl">
                {card.value}
              </p>
              <p className="relative mt-1 text-sm font-black text-foreground sm:text-base">
                {card.label}
              </p>
              <p className="relative mt-2 hidden text-xs leading-5 text-muted-foreground sm:mt-3 sm:block">
                {card.detail}
              </p>
            </CardContent>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}
