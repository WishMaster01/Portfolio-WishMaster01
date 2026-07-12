import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { SkillGroup } from "@/types/skill";

type SkillGroupCardProps = {
  group: SkillGroup;
};

export function SkillGroupCard({ group }: SkillGroupCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="space-y-5 p-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">{group.title}</h2>
          <p className="text-sm leading-6 text-muted-foreground">
            {group.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {group.skills.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
