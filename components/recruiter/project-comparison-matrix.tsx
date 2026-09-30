"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { trackRecruiterEvent } from "./recruiter-analytics";

export type ProjectComparisonRow = {
  slug: string;
  project: string;
  category: string;
  role: string;
  stack: string[];
  complexity: "High" | "Medium-High" | "Medium";
  architecture: string;
  challenge: string;
  status: "Active Development" | "Production Foundation" | "Production Ready";
  liveUrl?: string;
  githubUrl: string;
};

const comparisonData: ProjectComparisonRow[] = [
  {
    slug: "infinityai",
    project: "InfinityAI",
    category: "AI SaaS Workspace",
    role: "Full-Stack AI Product Engineer",
    stack: ["Next.js App Router", "TypeScript", "Tailwind CSS", "OpenRouter/Gemini", "Zod"],
    complexity: "High",
    architecture: "Server Route Boundaries + AI Provider Router with 3-tier fallback",
    challenge: "Provider-agnostic streaming & transactional usage accounting without leaking API keys",
    status: "Active Development",
    githubUrl: "https://github.com/WishMaster01/infinityai",
  },
  {
    slug: "explorex",
    project: "ExploreX",
    category: "Travel & Discovery Platform",
    role: "Full-Stack Engineer",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    complexity: "High",
    architecture: "Multi-parameter filter pipeline + relational schema with indexed geography",
    challenge: "Compound multi-criteria query optimization & instant client-side state reconciliation",
    status: "Production Ready",
    githubUrl: "https://github.com/WishMaster01/explorex",
  },
  {
    slug: "wishcart",
    project: "WishCart",
    category: "Full-Stack E-Commerce",
    role: "Frontend & API Engineer",
    stack: ["Next.js", "TypeScript", "Zustand", "Tailwind CSS", "Stripe-ready"],
    complexity: "Medium-High",
    architecture: "Optimistic UI mutations + server-validated cart synchronization",
    challenge: "Cart state reconciliation across concurrent browser tabs & race condition prevention",
    status: "Production Foundation",
    githubUrl: "https://github.com/WishMaster01/wishcart",
  },
  {
    slug: "vyvo",
    project: "Vyvo",
    category: "Interactive Audio Experience",
    role: "Product Engineer",
    stack: ["Next.js", "React 19", "Web Audio API", "Framer Motion", "Tailwind CSS"],
    complexity: "Medium",
    architecture: "Client Web Audio graph + server-rendered catalog and audio preset models",
    challenge: "Low-latency browser audio buffer synthesis without blocking main thread frame rates",
    status: "Active Development",
    githubUrl: "https://github.com/WishMaster01/vyvo",
  },
  {
    slug: "dailyessentials",
    project: "DailyEssentials",
    category: "Everyday Commerce & Catalog",
    role: "Full-Stack Developer",
    stack: ["Next.js", "Prisma", "PostgreSQL", "Zod", "Tailwind CSS"],
    complexity: "Medium",
    architecture: "Normalized relational schema with atomic inventory decrement guards",
    challenge: "Concurrent checkout inventory decrement and order lifecycle transition safety",
    status: "Production Foundation",
    githubUrl: "https://github.com/WishMaster01/dailyessentials",
  },
];

export function ProjectComparisonMatrix() {
  return (
    <section aria-labelledby="project-comparison-heading" className="space-y-6">
      <Reveal>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
              Recruiter Evaluation
            </p>
            <h2
              id="project-comparison-heading"
              className="mt-2 text-3xl font-black tracking-[-0.04em] text-foreground sm:text-4xl"
            >
              Project Comparison Matrix
            </h2>
          </div>
          <p className="max-w-md text-xs text-muted-foreground sm:text-right">
            Side-by-side engineering evaluation: roles, architectural patterns, and real engineering challenges.
          </p>
        </div>
      </Reveal>

      {/* Desktop Table View */}
      <Reveal delay={0.04}>
        <div className="hidden lg:block overflow-hidden rounded-[2rem] border border-border bg-surface/90 shadow-xl shadow-foreground/5 backdrop-blur">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-background/80 text-[11px] font-black uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th scope="col" className="px-5 py-4">Project &amp; Role</th>
                  <th scope="col" className="px-5 py-4">Stack</th>
                  <th scope="col" className="px-4 py-4">Complexity</th>
                  <th scope="col" className="px-5 py-4">Architecture</th>
                  <th scope="col" className="px-5 py-4">Key Engineering Challenge</th>
                  <th scope="col" className="px-4 py-4">Status</th>
                  <th scope="col" className="px-5 py-4 text-right">Links</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {comparisonData.map((row) => (
                  <tr
                    key={row.slug}
                    className="transition-colors hover:bg-accent/5"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/projects/${row.slug}`}
                        className="font-black text-foreground hover:text-accent hover:underline text-sm"
                        onClick={() => trackRecruiterEvent("recruiter_project_clicked", row.slug)}
                      >
                        {row.project}
                      </Link>
                      <p className="text-[11px] font-bold text-accent">{row.category}</p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">{row.role}</p>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex max-w-[200px] flex-wrap gap-1">
                        {row.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded bg-surface-elevated px-1.5 py-0.5 text-[10px] font-bold text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-black ${
                          row.complexity === "High"
                            ? "bg-purple-500/10 text-purple-500 border border-purple-500/20"
                            : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                        }`}
                      >
                        {row.complexity}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-muted-foreground leading-relaxed max-w-[220px]">
                      {row.architecture}
                    </td>

                    <td className="px-5 py-4 text-foreground/80 leading-relaxed max-w-[240px]">
                      {row.challenge}
                    </td>

                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-black text-emerald-500 border border-emerald-500/20 whitespace-nowrap">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {row.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2 font-bold">
                        <Link
                          href={`/projects/${row.slug}/case-study`}
                          className="rounded-md border border-border bg-background px-2.5 py-1 text-[11px] text-foreground hover:border-accent hover:text-accent transition"
                          onClick={() => trackRecruiterEvent("recruiter_project_clicked", `${row.slug}:case-study`)}
                        >
                          Case Study
                        </Link>
                        <a
                          href={row.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-md border border-border bg-background px-2 py-1 text-[11px] text-muted-foreground hover:border-foreground hover:text-foreground transition"
                          onClick={() => trackRecruiterEvent("recruiter_github_clicked", row.githubUrl)}
                        >
                          Code
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>

      {/* Mobile Card View (Zero horizontal scroll blowout) */}
      <div className="grid gap-4 lg:hidden">
        {comparisonData.map((row) => (
          <article
            key={row.slug}
            className="rounded-2xl border border-border bg-surface/90 p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <Link
                  href={`/projects/${row.slug}`}
                  className="text-lg font-black text-foreground hover:text-accent"
                  onClick={() => trackRecruiterEvent("recruiter_project_clicked", row.slug)}
                >
                  {row.project}
                </Link>
                <p className="text-xs font-bold text-accent">{row.category}</p>
                <p className="text-xs text-muted-foreground">{row.role}</p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-black text-emerald-500 border border-emerald-500/20 shrink-0">
                {row.status}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1">
              {row.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded bg-surface-elevated px-1.5 py-0.5 text-[10px] font-bold text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-4 space-y-2 border-t border-border/60 pt-3 text-xs">
              <div>
                <span className="font-black text-foreground">Architecture: </span>
                <span className="text-muted-foreground">{row.architecture}</span>
              </div>
              <div>
                <span className="font-black text-foreground">Key Challenge: </span>
                <span className="text-muted-foreground">{row.challenge}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
              <span className="text-[11px] font-bold text-muted-foreground">
                Complexity: <span className="font-black text-foreground">{row.complexity}</span>
              </span>
              <div className="flex gap-2">
                <Link
                  href={`/projects/${row.slug}/case-study`}
                  className="rounded-md border border-border bg-background px-3 py-1 text-xs font-black text-foreground hover:text-accent hover:border-accent"
                  onClick={() => trackRecruiterEvent("recruiter_project_clicked", `${row.slug}:case-study`)}
                >
                  Case Study
                </Link>
                <a
                  href={row.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-border bg-background px-3 py-1 text-xs font-bold text-muted-foreground hover:text-foreground"
                  onClick={() => trackRecruiterEvent("recruiter_github_clicked", row.githubUrl)}
                >
                  GitHub
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
