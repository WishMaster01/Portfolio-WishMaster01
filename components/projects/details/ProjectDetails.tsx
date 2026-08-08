import { ArchitectureDiagram } from "@/components/projects/details/ArchitectureDiagram";
import { ChallengeSection } from "@/components/projects/details/ChallengeSection";
import { FeatureGrid } from "@/components/projects/details/FeatureGrid";
import { FutureScope } from "@/components/projects/details/FutureScope";
import { ProblemSolution } from "@/components/projects/details/ProblemSolution";
import { ProjectNavigation } from "@/components/projects/details/ProjectNavigation";
import { ProjectOverview } from "@/components/projects/details/ProjectOverview";
import { RelatedProjects } from "@/components/projects/details/RelatedProjects";
import { ProjectTimeline } from "@/components/projects/details/ProjectTimeline";
import { ScreenshotGallery } from "@/components/projects/details/ScreenshotGallery";
import { TechStackList } from "@/components/projects/details/TechStackList";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types/project";

type ProjectDetailsProps = {
  project: Project;
  relatedProjects: Project[];
};

const tabs = [
  { href: "#overview", label: "Overview" },
  { href: "#features", label: "Features" },
  { href: "#architecture", label: "Architecture" },
  { href: "#screenshots", label: "Screenshots" },
  { href: "#challenges", label: "Challenges" },
  { href: "#future-scope", label: "Future Scope" },
];

function ProjectTabs() {
  return (
    <div className="sticky top-20 z-30 -mx-4 border-y border-border bg-background/85 px-4 backdrop-blur-xl sm:mx-0 sm:rounded-2xl sm:border">
      <nav
        className="flex gap-2 overflow-x-auto py-3 text-sm font-bold"
        aria-label="Project sections"
      >
        {tabs.map((tab) => (
          <a
            key={tab.href}
            href={tab.href}
            className="shrink-0 rounded-full border border-transparent px-4 py-2 text-muted-foreground transition hover:border-accent/30 hover:bg-accent/10 hover:text-accent"
          >
            {tab.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

function ProjectRightRail({ project }: { project: Project }) {
  const quickLinks = [
    { label: "Live Demo", href: project.liveUrl },
    { label: "GitHub Repository", href: project.githubUrl },
    { label: "Case Study", href: `/projects/${project.slug}/case-study` },
    { label: "Architecture", href: `/projects/${project.slug}/architecture` },
    { label: "Engineering", href: `/projects/${project.slug}/engineering` },
    { label: "Project API JSON", href: `/api/projects/${project.slug}` },
  ];

  return (
    <aside className="space-y-6 xl:sticky xl:top-28 xl:self-start">
      <Card className="rounded-4xl bg-surface/95">
        <CardContent className="p-4 sm:p-6">
          <h2 className="font-black text-foreground">Quick Links</h2>
          <div className="mt-5 grid gap-3">
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="flex items-center justify-between rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm font-bold text-foreground transition hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
              >
                {link.label}
                <span aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden rounded-4xl bg-accent text-accent-foreground shadow-xl shadow-accent/20">
        <CardContent className="p-4 sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] opacity-80">
            Project Metrics
          </p>
          <div className="mt-5 grid grid-cols-3 gap-2 xl:grid-cols-1 xl:gap-3">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl bg-background/15 p-3 sm:p-4"
              >
                <p className="text-xl font-black sm:text-2xl">{metric.value}</p>
                <p className="mt-1 text-xs opacity-90 sm:text-sm">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <TechStackList technologies={project.technologies} compact />
      <ProjectTimeline milestones={project.milestones} compact />
    </aside>
  );
}

function DeepDiveSections({ project }: { project: Project }) {
  return (
    <Reveal>
      <Card className="rounded-4xl bg-surface/95">
        <CardContent className="p-5 sm:p-7">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
            Product Deep Dive
          </p>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {project.sections.map((section) => (
              <div
                key={section.title}
                className="rounded-2xl border border-border bg-background/70 p-5"
              >
                <h3 className="font-black text-foreground">{section.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}

export function ProjectDetails({ project, relatedProjects }: ProjectDetailsProps) {
  return (
    <div className="mt-6 grid gap-6 xl:mt-8 xl:grid-cols-[minmax(0,1fr)_410px] xl:gap-8">
      <main className="min-w-0 space-y-6">
        <ProjectTabs />

        <section
          id="overview"
          className="scroll-mt-32 grid gap-6 lg:grid-cols-2"
        >
          <ProjectOverview project={project} />
          <ProblemSolution
            problem={project.problem}
            solution={project.solution}
            impact={project.impact}
          />
        </section>

        <DeepDiveSections project={project} />

        <section id="features" className="scroll-mt-32">
          <FeatureGrid features={project.features} />
        </section>

        <section id="architecture" className="scroll-mt-32">
          <ArchitectureDiagram architecture={project.architecture} />
        </section>

        <section id="screenshots" className="scroll-mt-32">
          <ScreenshotGallery screenshots={project.screenshots} />
        </section>

        <section
          id="challenges"
          className="scroll-mt-32 grid gap-6 lg:grid-cols-2"
        >
          <ChallengeSection challenges={project.challenges} />
          <FutureScope items={project.futureScope} />
        </section>

        <section id="future-scope" className="scroll-mt-32">
          <RelatedProjects projects={relatedProjects} />
        </section>

        <section className="scroll-mt-32">
          <ProjectNavigation currentSlug={project.slug} />
        </section>
      </main>

      <ProjectRightRail project={project} />
    </div>
  );
}
