import Link from "next/link";
import { siteConfig } from "@/data/site";

const modules = [
  "Dashboard",
  "Projects",
  "Blogs",
  "Skills",
  "Messages",
  "Newsletter",
  "Resume",
  "DSA content",
  "Settings",
  "Analytics",
] as const;

export function AdminSidebar() {
  return (
    <aside className="rounded-[2rem] border border-border bg-surface/85 p-4 shadow-sm shadow-foreground/5 backdrop-blur lg:sticky lg:top-28">
      <Link href="/" className="flex items-center gap-3 rounded-2xl p-2">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/10 text-2xl font-black text-accent">
          W
        </span>
        <span>
          <span className="block text-sm font-black">{siteConfig.name}</span>
          <span className="text-xs text-muted-foreground">Admin Console</span>
        </span>
      </Link>

      <nav className="mt-5 grid gap-2" aria-label="Admin modules">
        {modules.map((module, index) => (
          <a
            key={module}
            href={`#${module.toLowerCase().replace(/\s+/g, "-")}`}
            className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-sm font-bold text-muted-foreground transition duration-300 hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
          >
            <span>{module}</span>
            <span className="text-xs opacity-60 transition group-hover:opacity-100">
              {String(index + 1).padStart(2, "0")}
            </span>
          </a>
        ))}
      </nav>

      <div className="mt-5 rounded-2xl border border-accent/25 bg-accent/10 p-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
          Security
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Admin mutation APIs require a server-verified admin key. The UI never
          makes hidden buttons the only protection layer.
        </p>
      </div>
    </aside>
  );
}
