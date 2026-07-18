import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { resume } from "@/data/resume";
import { skillGroups, skillHighlights } from "@/data/skills";

export function SkillsSection() {
  return (
    <Card className="rounded-3xl bg-surface">
      <CardContent className="p-5 sm:p-6">
        <h2 className="text-xl font-black">Skills</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {resume.strengths.map((strength) => (
            <Badge key={strength} variant="secondary">
              {strength}
            </Badge>
          ))}
          {skillHighlights.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-1">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-2xl border border-border bg-background/70 p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-black">{group.title}</h3>
                <span className="text-sm font-black text-accent">
                  {group.level}%
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-foreground/10">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${group.level}%` }}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {group.focus}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
