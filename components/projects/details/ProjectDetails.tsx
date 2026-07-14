import Link from "next/link";
import { ArchitectureDiagram } from "@/components/projects/details/ArchitectureDiagram";
import { ChallengeSection } from "@/components/projects/details/ChallengeSection";
import { FeatureGrid } from "@/components/projects/details/FeatureGrid";
import { FutureScope } from "@/components/projects/details/FutureScope";
import { ProblemSolution } from "@/components/projects/details/ProblemSolution";
import { ProjectHero } from "@/components/projects/details/ProjectHero";
import { ProjectNavigation } from "@/components/projects/details/ProjectNavigation";
import { ProjectOverview } from "@/components/projects/details/ProjectOverview";
import { ProjectTimeline } from "@/components/projects/details/ProjectTimeline";
import { ScreenshotGallery } from "@/components/projects/details/ScreenshotGallery";
import { TechStackList } from "@/components/projects/details/TechStackList";
import { navigation } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import type { Project } from "@/types/project";

type ProjectDetailsProps = {
  project: Project;
};

const tabs = [
  { href: "#overview", label: "Overview", icon: "▣" },
  { href: "#features", label: "Features", icon: "✦" },
  { href: "#tech-stack", label: "Tech Stack", icon: "⌘" },
  { href: "#architecture", label: "Architecture", icon: "⌁" },
  { href: "#screenshots", label: "Screenshots", icon: "▤" },
  { href: "#challenges", label: "Challenges", icon: "◇" },
  { href: "#future-scope", label: "Future Scope", icon: "◴" },
];

function ProjectSidebar() {
  const sidebarLinks = [
    ...navigation.main,
    { href: "/resume", label: "Resume" },
  ].filter(
    (item, index, items) =>
      items.findIndex((candidate) => candidate.href === item.href) === index,
  );

  return (
    <aside className="hidden min-h-dvh w-[248px] shrink-0 border-r border-slate-200/80 bg-white/90 px-4 py-8 shadow-[8px_0_40px_rgba(15,23,42,0.03)] xl:flex xl:flex-col">
      <Link href="/" className="flex flex-col items-center gap-3">
        <div className="grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 text-3xl font-black text-white shadow-xl shadow-violet-500/20">
          W
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-950">
          {siteConfig.name}
        </span>
      </Link>

      <nav className="mt-12 grid gap-2 text-sm" aria-label="Project page sidebar">
        {sidebarLinks.map((item) => {
          const isActive = item.href === "/projects";

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition",
                isActive
                  ? "bg-violet-100 text-violet-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
              ].join(" ")}
            >
              <span className="grid h-5 w-5 place-items-center text-xs">
                {isActive ? "▣" : "○"}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="font-semibold text-slate-950">Let&apos;s work together</h2>
          <p className="mt-2 text-xs leading-5 text-slate-600">
            I&apos;m always open to exciting opportunities and collaborations.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/20"
          >
            Get In Touch →
          </Link>
        </div>

        <div className="flex justify-center gap-4 border-t border-slate-200 pt-5 text-sm text-slate-500">
          <a href={siteConfig.social.github} aria-label="GitHub">
            GitHub
          </a>
          <a href={siteConfig.social.linkedin} aria-label="LinkedIn">
            LinkedIn
          </a>
        </div>
        <p className="text-center text-xs leading-5 text-slate-500">
          © 2026 {siteConfig.name}
          <br />
          All rights reserved.
        </p>
      </div>
    </aside>
  );
}

function ProjectTopNav() {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-transparent bg-[#fbfbfd]/85 px-4 backdrop-blur-xl lg:px-8">
      <nav className="hidden gap-8 text-sm font-medium text-slate-700 lg:flex">
        {navigation.main.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={[
              "border-b-2 py-2 transition",
              item.href === "/projects"
                ? "border-violet-600 text-violet-700"
                : "border-transparent hover:text-slate-950",
            ].join(" ")}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-3">
        <Link
          href="/projects"
          className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-950 shadow-sm"
          aria-label="Search projects"
        >
          ⌕
        </Link>
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-950 shadow-sm"
          aria-label="Theme controls"
        >
          ☼
        </button>
        <div className="grid h-11 w-11 place-items-center rounded-full bg-slate-950 text-white shadow-sm">
          W
        </div>
      </div>
    </header>
  );
}

function ProjectTabs() {
  return (
    <div className="sticky top-20 z-30 border-b border-slate-200 bg-[#fbfbfd]/90 backdrop-blur-xl">
      <nav className="flex gap-7 overflow-x-auto px-1 text-sm font-medium text-slate-700">
        {tabs.map((tab, index) => (
          <a
            key={tab.href}
            href={tab.href}
            className={[
              "flex shrink-0 items-center gap-2 border-b-2 py-4 transition",
              index === 0
                ? "border-violet-600 text-violet-700"
                : "border-transparent hover:text-slate-950",
            ].join(" ")}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

function ProjectRightRail({ project }: { project: Project }) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-28">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-bold text-slate-950">Quick Links</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            { label: "Live Demo ↗", href: project.liveUrl, icon: "↗" },
            { label: "GitHub Repository", href: project.githubUrl, icon: "◉" },
            { label: "Watch Demo", href: project.liveUrl, icon: "▶" },
            { label: "Documentation", href: `/api/projects/${project.slug}`, icon: "▣" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 transition hover:border-violet-200 hover:bg-violet-50"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-violet-100 text-violet-700">
                {link.icon}
              </span>
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <TechStackList technologies={project.technologies} compact />
      <ProjectTimeline milestones={project.milestones} compact />

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-bold text-slate-950">Share This Project</h2>
        <div className="mt-5 flex gap-3">
          {["X", "in", "f", "🔗"].map((item) => (
            <button
              key={item}
              type="button"
              className="grid h-12 w-12 place-items-center rounded-xl border border-slate-200 bg-white font-semibold text-violet-700 transition hover:bg-violet-50"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <div className="min-h-dvh bg-[#fbfbfd] text-slate-950">
      <div className="flex">
        <ProjectSidebar />
        <div className="min-w-0 flex-1">
          <ProjectTopNav />
          <div className="mx-auto grid max-w-[1620px] gap-8 px-4 pb-10 lg:grid-cols-[minmax(0,1fr)_430px] lg:px-8">
            <main className="min-w-0">
              <div className="pt-6">
                <div className="mb-6 flex items-center gap-3 text-sm text-slate-500">
                  <Link href="/">Home</Link>
                  <span>›</span>
                  <Link href="/projects">Projects</Link>
                  <span>›</span>
                  <span>{project.title}</span>
                </div>
                <ProjectHero project={project} />
                <ProjectTabs />

                <div className="space-y-4 py-4">
                  <section id="overview" className="grid gap-4 xl:grid-cols-2">
                    <ProjectOverview project={project} compact />
                    <ProblemSolution
                      problem={project.problem}
                      solution={project.solution}
                      impact={project.impact}
                      compact
                    />
                  </section>

                  <section id="features">
                    <FeatureGrid features={project.features} compact />
                  </section>

                  <section id="tech-stack" className="lg:hidden">
                    <TechStackList technologies={project.technologies} compact />
                  </section>

                  <section id="architecture">
                    <ArchitectureDiagram architecture={project.architecture} compact />
                  </section>

                  <section id="screenshots">
                    <ScreenshotGallery screenshots={project.screenshots} compact />
                  </section>

                  <section id="challenges" className="grid gap-4 xl:grid-cols-2">
                    <ChallengeSection challenges={project.challenges} compact />
                    <FutureScope items={project.futureScope} compact />
                  </section>

                  <section id="future-scope">
                    <ProjectNavigation currentSlug={project.slug} />
                  </section>
                </div>
              </div>
            </main>

            <div className="hidden pt-32 lg:block">
              <ProjectRightRail project={project} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
