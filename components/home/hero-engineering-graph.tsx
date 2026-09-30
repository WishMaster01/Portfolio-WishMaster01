"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type NodeData = {
  id: string;
  label: string;
  role: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  category: "core" | "backend" | "ai" | "data" | "devops";
  accent: string;
};

const nodes: NodeData[] = [
  {
    id: "nextjs",
    label: "Next.js 16",
    role: "App Router & SSR Edge",
    x: 48,
    y: 42,
    category: "core",
    accent: "from-cyan-400 to-blue-500",
  },
  {
    id: "react",
    label: "React 19",
    role: "Concurrent Component Tree",
    x: 20,
    y: 28,
    category: "core",
    accent: "from-cyan-400 to-teal-400",
  },
  {
    id: "ai",
    label: "Hybrid AI",
    role: "BM25 + 256-dim RAG Engine",
    x: 78,
    y: 26,
    category: "ai",
    accent: "from-purple-400 to-pink-500",
  },
  {
    id: "nodejs",
    label: "Node.js",
    role: "Cryptographic Auth & APIs",
    x: 24,
    y: 64,
    category: "backend",
    accent: "from-emerald-400 to-teal-500",
  },
  {
    id: "postgres",
    label: "PostgreSQL",
    role: "Prisma Relational Source of Truth",
    x: 52,
    y: 78,
    category: "data",
    accent: "from-blue-400 to-indigo-500",
  },
  {
    id: "redis",
    label: "Redis",
    role: "Distributed Caching & Rate Limits",
    x: 80,
    y: 68,
    category: "data",
    accent: "from-rose-400 to-red-500",
  },
  {
    id: "python",
    label: "Python",
    role: "Data & ML Pipelines",
    x: 82,
    y: 46,
    category: "backend",
    accent: "from-amber-400 to-orange-500",
  },
  {
    id: "docker",
    label: "Docker",
    role: "Containerized Micro-environments",
    x: 16,
    y: 84,
    category: "devops",
    accent: "from-sky-400 to-blue-600",
  },
  {
    id: "github",
    label: "GitHub",
    role: "CI/CD & Automated Verification",
    x: 48,
    y: 12,
    category: "devops",
    accent: "from-violet-400 to-purple-600",
  },
];

const connections = [
  ["github", "nextjs"],
  ["nextjs", "react"],
  ["nextjs", "ai"],
  ["nextjs", "nodejs"],
  ["nodejs", "postgres"],
  ["nodejs", "redis"],
  ["nextjs", "postgres"],
  ["ai", "python"],
  ["nodejs", "docker"],
  ["ai", "redis"],
];

export function HeroEngineeringGraph() {
  const shouldReduceMotion = useReducedMotion();
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const activeNodeData = nodes.find((n) => n.id === activeNode);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[540px] select-none rounded-[2.5rem] border border-border/80 bg-surface/75 p-6 shadow-2xl shadow-accent/10 backdrop-blur-2xl lg:max-w-[580px]">
      {/* Background Aurora Sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-[2.5rem] overflow-hidden"
      >
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-[var(--ambient-one)] to-[var(--ambient-two)] opacity-20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gradient-to-tr from-[var(--ambient-three)] to-[var(--accent)] opacity-20 blur-3xl" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:20px_20px] opacity-60" />
      </div>

      {/* Top Status Bar */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[11px] font-black uppercase tracking-wider text-muted-foreground">
            Architecture Matrix
          </span>
        </div>
        <span className="rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-accent">
          {activeNodeData ? activeNodeData.role : "Hover node to inspect"}
        </span>
      </div>

      {/* Desktop & Tablet Graph (Hidden on small mobile) */}
      <div className="relative mt-4 h-[calc(100%-3rem)] w-full hidden sm:block">
        {/* SVG Connecting Lines */}
        <svg
          className="absolute inset-0 h-full w-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="aurora-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--ambient-one)" stopOpacity="0.5" />
              <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--ambient-two)" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="active-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--ambient-two)" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {connections.map(([fromId, toId]) => {
            const fromNode = nodes.find((n) => n.id === fromId);
            const toNode = nodes.find((n) => n.id === toId);
            if (!fromNode || !toNode) return null;

            const isConnectedToActive =
              activeNode && (activeNode === fromId || activeNode === toId);

            return (
              <line
                key={`${fromId}-${toId}`}
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke={isConnectedToActive ? "url(#active-line-grad)" : "url(#aurora-line-grad)"}
                strokeWidth={isConnectedToActive ? 2.5 : 1.2}
                strokeDasharray={isConnectedToActive ? "none" : "4,4"}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Interactive Floating Nodes */}
        {nodes.map((node) => {
          const isActive = activeNode === node.id;
          const isConnected =
            activeNode &&
            connections.some(
              ([f, t]) =>
                (f === activeNode && t === node.id) ||
                (t === activeNode && f === node.id),
            );

          return (
            <motion.div
              key={node.id}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: [0, -4, 0],
                      transition: {
                        duration: 3 + (node.x % 3),
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }
              }
            >
              <button
                type="button"
                className={`group relative flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-black shadow-md backdrop-blur-md transition-all duration-300 ${
                  isActive
                    ? "scale-110 border-accent bg-accent text-accent-foreground shadow-accent/30"
                    : isConnected
                    ? "scale-105 border-accent/60 bg-surface-elevated text-foreground"
                    : "border-border/80 bg-surface/90 text-foreground hover:border-accent/50 hover:bg-surface-elevated"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 rounded-full bg-gradient-to-r ${node.accent} ${
                    isActive ? "animate-ping" : ""
                  }`}
                />
                <span className="tracking-tight">{node.label}</span>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Compact Animated Technology Cluster (< 640px) */}
      <div className="mt-4 flex flex-wrap gap-2 sm:hidden">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="flex items-center gap-1.5 rounded-xl border border-border/80 bg-surface/90 px-3 py-1.5 text-xs font-bold text-foreground"
          >
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${node.accent}`}
            />
            <span>{node.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
