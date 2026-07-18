import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types/project";

type ArchitectureDiagramProps = {
  architecture: Project["architecture"];
};

export function ArchitectureDiagram({ architecture }: ArchitectureDiagramProps) {
  return (
    <Reveal>
      <Card className="rounded-[2rem] bg-surface/95">
        <CardContent className="space-y-6 p-6">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
              Architecture
            </p>
            <h2 className="mt-2 text-2xl font-black text-foreground">
              System structure
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {architecture.summary}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {architecture.layers.map((layer, index) => (
              <div
                key={layer.title}
                className="relative overflow-hidden rounded-2xl border border-border bg-background/70 p-5 transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10"
              >
                <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-accent/10" />
                <div className="relative mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-sm font-black text-accent-foreground">
                  {index + 1}
                </div>
                <h3 className="relative font-black text-foreground">
                  {layer.title}
                </h3>
                <p className="relative mt-2 text-sm leading-6 text-muted-foreground">
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
