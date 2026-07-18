import { Card, CardContent } from "@/components/ui/card";
import { experienceItems } from "@/data/experience";

export function ExperienceSection() {
  return (
    <Card className="rounded-3xl bg-surface">
      <CardContent className="p-5 sm:p-6">
        <h2 className="text-xl font-black">Experience</h2>
        <div className="mt-6 space-y-5">
          {experienceItems.map((item) => (
            <article
              key={`${item.company}-${item.title}`}
              className="rounded-2xl border border-border bg-background/70 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-black">{item.title}</h3>
                  <p className="mt-1 text-sm font-bold text-accent">
                    {item.company}
                  </p>
                  <p className="mt-1 text-xs font-bold text-muted-foreground">
                    {item.location}
                  </p>
                </div>
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-black text-accent">
                  {item.period}
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {item.summary}
              </p>
              <ul className="mt-4 space-y-2">
                {item.achievements.slice(0, 3).map((achievement) => (
                  <li
                    key={achievement}
                    className="flex gap-3 text-sm leading-6 text-muted-foreground"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
