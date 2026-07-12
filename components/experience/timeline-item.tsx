import { Card, CardContent } from "@/components/ui/card";
import type { ExperienceItem } from "@/types/experience";

type TimelineItemProps = {
  item: ExperienceItem;
};

export function TimelineItem({ item }: TimelineItemProps) {
  return (
    <Card>
      <CardContent className="grid gap-6 p-6 md:grid-cols-[0.32fr_1fr]">
        <div className="space-y-1">
          <p className="text-sm font-medium text-accent">{item.period}</p>
          <p className="text-sm text-muted-foreground">{item.location}</p>
        </div>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-sm text-muted-foreground">{item.company}</p>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            {item.summary}
          </p>
          <ul className="grid gap-2 text-sm text-muted-foreground">
            {item.achievements.map((achievement) => (
              <li key={achievement} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
