import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";

type TechStackListProps = {
  technologies: string[];
  compact?: boolean;
};

export function TechStackList({ technologies, compact = false }: TechStackListProps) {
  return (
    <Reveal>
      <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
        <CardContent className="space-y-4 p-6">
          <div>
            <h2 className={compact ? "text-lg font-bold text-slate-950" : "text-2xl font-semibold"}>
              Tech Stack
            </h2>
          </div>
          <div className={compact ? "grid grid-cols-2 gap-3" : "flex flex-wrap gap-2"}>
            {technologies.map((technology) => (
              <div
                key={technology}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800"
              >
                {technology}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}
