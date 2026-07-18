import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";

type TechStackListProps = {
  technologies: string[];
  compact?: boolean;
};

export function TechStackList({ technologies, compact = false }: TechStackListProps) {
  return (
    <Reveal>
      <Card className="rounded-[2rem] bg-surface/95">
        <CardContent className="space-y-4 p-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
              Stack
            </p>
            <h2 className={compact ? "mt-2 text-xl font-black text-foreground" : "mt-2 text-2xl font-black text-foreground"}>
              Tech Stack
            </h2>
          </div>
          <div className={compact ? "grid grid-cols-2 gap-3" : "flex flex-wrap gap-2"}>
            {technologies.map((technology) => (
              <div
                key={technology}
                className="rounded-2xl border border-border bg-background/70 px-3 py-2 text-xs font-bold text-foreground transition hover:border-accent/40 hover:text-accent"
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
