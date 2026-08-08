export type GraphNode = {
  id: string;
  label: string;
  weight?: number;
};

export type GraphEdge = {
  from: string;
  to: string;
  weight?: number;
};

export function buildAdjacencyList(edges: GraphEdge[]) {
  const adjacency = new Map<string, string[]>();

  for (const edge of edges) {
    if (!adjacency.has(edge.from)) {
      adjacency.set(edge.from, []);
    }

    adjacency.get(edge.from)!.push(edge.to);

    if (!adjacency.has(edge.to)) {
      adjacency.set(edge.to, []);
    }
  }

  return adjacency;
}

export function bfsLayers(start: string, edges: GraphEdge[]) {
  const adjacency = buildAdjacencyList(edges);
  const visited = new Set<string>([start]);
  const queue: Array<{ id: string; depth: number }> = [{ id: start, depth: 0 }];
  const layers = new Map<number, string[]>();

  while (queue.length > 0) {
    const current = queue.shift()!;

    if (!layers.has(current.depth)) {
      layers.set(current.depth, []);
    }

    layers.get(current.depth)!.push(current.id);

    for (const next of adjacency.get(current.id) ?? []) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push({ id: next, depth: current.depth + 1 });
      }
    }
  }

  return Array.from(layers.entries())
    .sort((left, right) => left[0] - right[0])
    .map(([, ids]) => ids);
}

export function dfsTraversal(start: string, edges: GraphEdge[]) {
  const adjacency = buildAdjacencyList(edges);
  const visited = new Set<string>();
  const order: string[] = [];

  function visit(node: string) {
    if (visited.has(node)) {
      return;
    }

    visited.add(node);
    order.push(node);

    for (const next of adjacency.get(node) ?? []) {
      visit(next);
    }
  }

  visit(start);
  return order;
}

export function topologicalSort(nodes: string[], edges: GraphEdge[]) {
  const adjacency = buildAdjacencyList(edges);
  const indegree = new Map(nodes.map((node) => [node, 0]));

  for (const edge of edges) {
    indegree.set(edge.to, (indegree.get(edge.to) ?? 0) + 1);
  }

  const queue = nodes.filter((node) => (indegree.get(node) ?? 0) === 0);
  const order: string[] = [];

  while (queue.length > 0) {
    const current = queue.shift()!;
    order.push(current);

    for (const next of adjacency.get(current) ?? []) {
      indegree.set(next, (indegree.get(next) ?? 0) - 1);

      if ((indegree.get(next) ?? 0) === 0) {
        queue.push(next);
      }
    }
  }

  return order;
}

export function shortestPath(
  start: string,
  target: string,
  edges: GraphEdge[],
) {
  const adjacency = new Map<string, Array<{ id: string; weight: number }>>();

  for (const edge of edges) {
    if (!adjacency.has(edge.from)) {
      adjacency.set(edge.from, []);
    }

    adjacency.get(edge.from)!.push({
      id: edge.to,
      weight: edge.weight ?? 1,
    });
  }

  const distances = new Map<string, number>([[start, 0]]);
  const previous = new Map<string, string>();
  const pending = new Set<string>([start]);

  while (pending.size > 0) {
    const current = Array.from(pending).reduce((best, node) =>
      (distances.get(node) ?? Number.POSITIVE_INFINITY) <
      (distances.get(best) ?? Number.POSITIVE_INFINITY)
        ? node
        : best,
    );

    pending.delete(current);

    if (current === target) {
      break;
    }

    for (const next of adjacency.get(current) ?? []) {
      const nextDistance = (distances.get(current) ?? 0) + next.weight;

      if (nextDistance < (distances.get(next.id) ?? Number.POSITIVE_INFINITY)) {
        distances.set(next.id, nextDistance);
        previous.set(next.id, current);
        pending.add(next.id);
      }
    }
  }

  if (!distances.has(target)) {
    return {
      path: [] as string[],
      distance: Number.POSITIVE_INFINITY,
    };
  }

  const path: string[] = [];
  let current: string | undefined = target;

  while (current) {
    path.unshift(current);
    current = previous.get(current);
  }

  return {
    path,
    distance: distances.get(target) ?? Number.POSITIVE_INFINITY,
  };
}
