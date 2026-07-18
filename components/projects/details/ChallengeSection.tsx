import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types/project";

type ChallengeSectionProps = {
  challenges: Project["challenges"];
};

export function ChallengeSection({ challenges }: ChallengeSectionProps) {
  return (
    <Reveal>
      <Card className="h-full rounded-[2rem] bg-surface/95">
        <CardContent className="space-y-5 p-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
              Challenges
            </p>
            <h2 className="mt-2 text-2xl font-black text-foreground">
              Problems handled during planning
            </h2>
          </div>
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <div
                key={challenge.title}
                className="rounded-2xl border border-border bg-background/70 p-4"
              >
                <h3 className="font-black text-foreground">{challenge.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {challenge.description}
                </p>
                <p className="mt-3 rounded-xl bg-accent/10 px-3 py-2 text-sm leading-6 text-accent">
                  Resolution: {challenge.resolution}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}
