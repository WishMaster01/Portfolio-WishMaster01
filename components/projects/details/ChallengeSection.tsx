import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types/project";

type ChallengeSectionProps = {
  challenges: Project["challenges"];
  compact?: boolean;
};

export function ChallengeSection({ challenges }: ChallengeSectionProps) {
  return (
    <Reveal>
      <Card className="h-full rounded-2xl border-slate-200 bg-white shadow-sm">
        <CardContent className="space-y-5 p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-100 text-violet-700">
              ◇
            </span>
            <h2 className="text-xl font-bold text-slate-950">Challenges Faced</h2>
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            {challenges.map((challenge) => (
              <li key={challenge.title} className="list-inside list-disc">
                {challenge.title}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </Reveal>
  );
}
