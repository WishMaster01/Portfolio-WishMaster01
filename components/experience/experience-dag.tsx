import { Card, CardContent } from "@/components/ui/card";
import { topologicalSort, type GraphEdge } from "@/lib/algorithms/graph-utils";
import type { ExperienceItem } from "@/types/experience";

type ExperienceDagProps = {
  items: ExperienceItem[];
  edges: GraphEdge[];
};

export function ExperienceDag({ items, edges }: ExperienceDagProps) {
  const nodes = items.map((item) => item.title);
  const order = topologicalSort(nodes, edges);
  const itemMap = new Map(items.map((item) => [item.title, item]));

  return (
    <Card className="rounded-[2rem] bg-surface/95">
      <CardContent className="p-5 sm:p-6">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
          Career DAG
        </p>
        <h2 className="mt-2 text-2xl font-black text-foreground">
          Topological progression of portfolio experience
        </h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          This timeline is modeled as a directed acyclic graph. The order below
          is resolved through topological sorting instead of hard-coded visual
          placement alone.
        </p>

        <div className="mt-5 grid gap-3">
          {order.map((title, index) => {
            const item = itemMap.get(title);

            if (!item) {
              return null;
            }

            return (
              <div
                key={title}
                className="rounded-2xl border border-border bg-background/70 p-4"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
                  Stage {index + 1}
                </p>
                <p className="mt-2 font-black text-foreground">{item.title}</p>
                <p className="mt-1 text-sm font-semibold text-muted-foreground">
                  {item.period}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.summary}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
