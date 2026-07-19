import Link from "next/link";
import { Button } from "@/components/ui/button";

type AdminHeaderProps = {
  projects: number;
  blogs: number;
};

export function AdminHeader({ projects, blogs }: AdminHeaderProps) {
  return (
    <header
      id="dashboard"
      className="relative overflow-hidden rounded-[2rem] border border-accent/20 bg-surface/85 p-6 shadow-sm shadow-foreground/5 backdrop-blur sm:p-8"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-[color-mix(in_oklab,var(--ambient-two)_18%,transparent)] blur-3xl" />
      <div className="relative flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="inline-flex rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-accent">
            Enterprise admin dashboard
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.055em] sm:text-5xl">
            Manage portfolio content from one structured console.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Projects, blogs, skills, messages, newsletter, resume, DSA content,
            settings, and analytics are grouped into admin-ready modules with
            server-side API protection for mutations.
          </p>
        </div>

        <div className="grid gap-3 rounded-3xl border border-border bg-background/60 p-4 sm:min-w-72">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">
              Content inventory
            </span>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-500">
              Live
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {projects} projects and {blogs} articles currently indexed.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button asChild size="sm">
              <Link href="/projects">View Projects</Link>
            </Button>
            <Button asChild size="sm" variant="secondary">
              <Link href="/blog">View Blog</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
