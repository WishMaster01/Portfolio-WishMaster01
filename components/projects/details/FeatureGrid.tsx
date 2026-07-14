import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types/project";

type FeatureGridProps = {
  features: Project["features"];
  compact?: boolean;
};

export function FeatureGrid({ features, compact = false }: FeatureGridProps) {
  return (
    <Reveal>
      <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
        <CardContent className="space-y-5 p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-100 text-violet-700">
              ✦
            </span>
            <h2 className="text-xl font-bold text-slate-950">Key Features</h2>
          </div>
          <div className={compact ? "grid gap-x-10 gap-y-3 md:grid-cols-2" : "grid gap-4 md:grid-cols-3"}>
          {features.map((feature) => (
            <div key={feature.title} className="flex gap-2 text-sm text-slate-700">
              <span className="mt-1 text-violet-600">⊙</span>
              <div>
                <h3 className="font-medium text-slate-950">{feature.title}</h3>
                <p className="mt-1 leading-6 text-slate-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}
