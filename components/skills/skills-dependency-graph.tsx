"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  bfsLayers,
  dfsTraversal,
  type GraphEdge,
  type GraphNode,
} from "@/lib/algorithms/graph-utils";

type SkillsDependencyGraphProps = {
  nodes: GraphNode[];
  edges: GraphEdge[];
  startNodeId: string;
};

export function SkillsDependencyGraph({
  nodes,
  edges,
  startNodeId,
}: SkillsDependencyGraphProps) {
  const layers = bfsLayers(startNodeId, edges);
  const dfsOrder = dfsTraversal(startNodeId, edges);
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));

  return (
    <Card className="rounded-[2rem] bg-surface/95">
      <CardContent className="p-5 sm:p-6">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
          Skill Dependency Graph
        </p>
        <h2 className="mt-2 text-2xl font-black text-foreground">
          BFS layers and DFS traversal across core engineering skills
        </h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          This graph models how frontend, backend, database, product, quality,
          and AI capabilities compound. Breadth-first layers show learning
          proximity; depth-first traversal shows one plausible execution path.
        </p>

        <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
          <div className="space-y-4">
            {layers.map((layer, index) => (
              <div key={`layer-${index}`} className="rounded-2xl border border-border bg-background/70 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
                  BFS Layer {index}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {layer.map((nodeId) => (
                    <span
                      key={nodeId}
                      className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-bold text-foreground"
                    >
                      {nodeMap.get(nodeId)?.label ?? nodeId}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-background/70 p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
              DFS Traversal
            </p>
            <div className="mt-4 space-y-3">
              {dfsOrder.map((nodeId, index) => (
                <div
                  key={nodeId}
                  className="flex items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3"
                >
                  <span className="text-sm font-bold text-muted-foreground">
                    Step {index + 1}
                  </span>
                  <span className="text-sm font-black text-foreground">
                    {nodeMap.get(nodeId)?.label ?? nodeId}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
