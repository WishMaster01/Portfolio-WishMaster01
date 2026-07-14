import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types/project";

type ArchitectureDiagramProps = {
  architecture: Project["architecture"];
  compact?: boolean;
};

export function ArchitectureDiagram({ architecture }: ArchitectureDiagramProps) {
  return (
    <Reveal>
      <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
        <CardContent className="space-y-6 p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
              Architecture
            </p>
            <h2 className="text-2xl font-semibold">System structure</h2>
            <p className="leading-7 text-muted-foreground">
              {architecture.summary}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {architecture.layers.map((layer, index) => (
              <div
                key={layer.title}
                className="relative rounded-2xl border border-border bg-surface-elevated p-4"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                  {index + 1}
                </div>
                <h3 className="font-semibold">{layer.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {layer.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}
