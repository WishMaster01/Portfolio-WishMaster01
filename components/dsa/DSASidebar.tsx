import Link from "next/link";
import type { AlgorithmTopic } from "@/types/dsa";
import { cn } from "@/lib/utils";

type DSASidebarProps = {
  topics: AlgorithmTopic[];
  activeSlug?: string;
};

export function DSASidebar({ topics, activeSlug }: DSASidebarProps) {
  return (
    <aside className="rounded-3xl border border-border bg-surface/85 p-4 shadow-xl shadow-foreground/5 backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-accent">
            DSA map
          </p>
          <h2 className="mt-1 font-black">Topics</h2>
        </div>
        <Link
          href="/dsa-showcase"
          className="rounded-full border border-border px-3 py-1.5 text-xs font-black text-muted-foreground transition hover:border-accent hover:text-accent"
        >
          Overview
        </Link>
      </div>

      <nav className="mt-5 grid gap-2" aria-label="DSA topics">
        {topics.map((topic) => {
          const isActive = topic.slug === activeSlug;

          return (
            <Link
              key={topic.slug}
              href={`/dsa-showcase/${topic.slug}`}
              className={cn(
                "rounded-2xl border px-4 py-3 text-sm font-black transition",
                isActive
                  ? "border-accent bg-accent text-accent-foreground shadow-lg shadow-accent/20"
                  : "border-border bg-background/70 text-muted-foreground hover:border-accent/50 hover:text-accent",
              )}
            >
              {topic.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
