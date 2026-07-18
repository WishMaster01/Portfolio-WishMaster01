import { Card, CardContent } from "@/components/ui/card";
import { resume } from "@/data/resume";

export function AchievementsSection() {
  return (
    <Card className="rounded-3xl bg-surface">
      <CardContent className="p-5 sm:p-6">
        <h2 className="text-xl font-black">Achievements</h2>
        <div className="mt-5 grid gap-3">
          {resume.achievements.map((achievement, index) => (
            <div
              key={achievement}
              className="flex gap-4 rounded-2xl border border-border bg-background/70 p-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-sm font-black text-accent-foreground">
                {index + 1}
              </span>
              <p className="text-sm leading-7 text-muted-foreground">
                {achievement}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
