import { Card, CardContent } from "@/components/ui/card";
import { shortestPath, type GraphEdge, type GraphNode } from "@/lib/algorithms/graph-utils";

type NavigationGraphProps = {
  nodes: GraphNode[];
  edges: GraphEdge[];
  start: string;
  target: string;
};

export function NavigationGraph({
  nodes,
  edges,
  start,
  target,
}: NavigationGraphProps) {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const result = shortestPath(start, target, edges);

  return (
    <Card className="rounded-[2rem] bg-surface/95">
      <CardContent className="p-5 sm:p-6">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
          Navigation Graph
        </p>
        <h2 className="mt-2 text-2xl font-black text-foreground">
          Shortest recruiter route through the portfolio
        </h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          The route map is modeled as a weighted navigation graph. The path below
          is resolved with shortest-path reasoning instead of only listing links.
        </p>

        <div className="mt-5 rounded-2xl border border-border bg-background/70 p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
            Example path
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {result.path.map((nodeId, index) => (
              <span key={nodeId} className="contents">
                <span className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-bold text-foreground">
                  {nodeMap.get(nodeId)?.label ?? nodeId}
                </span>
                {index < result.path.length - 1 ? (
                  <span className="text-sm font-black text-accent">→</span>
                ) : null}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Total weighted distance:{" "}
            <span className="font-black text-foreground">{result.distance}</span>
          </p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {nodes.map((node) => (
            <div
              key={node.id}
              className="rounded-2xl border border-border bg-background/70 p-4"
            >
              <p className="font-black text-foreground">{node.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{node.id}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
