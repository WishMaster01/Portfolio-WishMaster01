import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types/project";

type FeatureGridProps = {
  features: Project["features"];
};

export function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <Reveal>
      <Card className="rounded-[2rem] bg-surface/95">
        <CardContent className="space-y-6 p-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
              Features
            </p>
            <h2 className="mt-2 text-2xl font-black text-foreground">
              Key product capabilities
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border bg-background/70 p-5 transition hover:-translate-y-1 hover:border-accent/40 hover:bg-accent/10"
              >
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-accent text-sm font-black text-accent-foreground">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-black text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}
