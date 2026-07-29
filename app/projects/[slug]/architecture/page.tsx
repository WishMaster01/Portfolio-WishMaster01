import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchitectureDiagram } from "@/components/architecture/architecture-diagram";
import { ComponentGrid } from "@/components/architecture/component-grid";
import { DecisionRecords } from "@/components/architecture/decision-records";
import { QualityPanel } from "@/components/architecture/quality-panel";
import { RequestFlow } from "@/components/architecture/request-flow";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { getProjectArchitecture } from "@/server/queries/get-project-architecture";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const architectureSections = [
  ["Architecture diagram", "#diagram"],
  ["System components", "#components"],
  ["Request and data flow", "#request-flow"],
  ["API boundaries", "#api-flow"],
  ["Security model", "#security"],
  ["Scaling strategy", "#scaling"],
  ["Decision records", "#decisions"],
  ["Deployment operations", "#operations"],
  ["Risks and controls", "#risks"],
] as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectArchitecture(slug);

  if (!project) {
    return {
      title: "Architecture not found",
    };
  }

  return {
    title: `${project.title} Architecture`,
    description: project.architecture.summary,
    alternates: {
      canonical: `/projects/${project.slug}/architecture`,
    },
    openGraph: {
      type: "article",
      url: `${siteConfig.url}/projects/${project.slug}/architecture`,
      title: `${project.title} Architecture | ${siteConfig.name}`,
      description: project.architecture.summary,
      siteName: siteConfig.name,
    },
  };
}

export default async function ArchitecturePage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectArchitecture(slug);

  if (!project?.architecture) {
    notFound();
  }

  const architecture = project.architecture;
  const primaryTechnologies = Array.from(
    new Set(
      architecture.components.flatMap((component) => component.technologies),
    ),
  ).slice(0, 10);

  const systemStats = [
    {
      label: "Core components",
      value: architecture.components.length,
      detail: "Separated technical responsibilities",
    },
    {
      label: "Runtime steps",
      value: architecture.requestFlow.length,
      detail: "End-to-end request lifecycle",
    },
    {
      label: "Architecture decisions",
      value: architecture.decisions.length,
      detail: "Documented engineering tradeoffs",
    },
    {
      label: "Risk controls",
      value: architecture.risks.reduce(
        (total, risk) => total + risk.checks.length,
        0,
      ),
      detail: "Production failure mitigations",
    },
  ];

  const blueprintCards = [
    {
      title: "Boundary strategy",
      body: "The page separates client UI, route handlers, domain services, provider integrations, persistence, and operational controls so each layer has a clear job.",
    },
    {
      title: "Production thinking",
      body: "The architecture names validation, authorization, rate limits, fallbacks, deployment checks, and failure modes instead of stopping at a visual diagram.",
    },
    {
      title: "Recruiter readability",
      body: "The structure is written so a technical recruiter or interviewer can quickly understand system depth, decisions, and tradeoffs.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: `${project.title} Architecture`,
            description: architecture.summary,
            author: {
              "@type": "Person",
              name: siteConfig.creator,
            },
            mainEntityOfPage: `${siteConfig.url}/projects/${project.slug}/architecture`,
          }),
        }}
      />

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {systemStats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.04}>
            <article className="h-full rounded-[1.75rem] border border-border bg-surface/85 p-5 shadow-sm shadow-foreground/5 backdrop-blur transition hover:-translate-y-1 hover:border-accent/45 hover:shadow-2xl hover:shadow-accent/10">
              <p className="text-3xl font-black text-accent">{stat.value}</p>
              <h2 className="mt-3 text-lg font-black tracking-tight text-foreground">
                {stat.label}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {stat.detail}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {blueprintCards.map((card, index) => (
          <Reveal key={card.title} delay={index * 0.05}>
            <article className="h-full rounded-[1.75rem] border border-border bg-surface/75 p-5 shadow-sm shadow-foreground/5 backdrop-blur">
              <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-black text-accent">
                Blueprint {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-4 text-xl font-black tracking-tight text-foreground">
                {card.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {card.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
        <Reveal>
          <section className="h-full rounded-4xl border border-border bg-surface/90 p-5 shadow-xl shadow-foreground/5 backdrop-blur sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
              Page index
            </p>
            <nav
              aria-label="Architecture sections"
              className="mt-4 flex flex-wrap gap-2 text-sm font-black"
            >
              {architectureSections.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="group inline-flex items-center gap-2 rounded-2xl border border-border bg-background/55 px-4 py-3 text-muted-foreground transition hover:border-accent/45 hover:bg-accent/10 hover:text-accent"
                >
                  <span>{label}</span>
                  <span className="transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                "System-design explanation for interview review.",
                "Technical map of boundaries, flows, and tradeoffs.",
                "Production-readiness checklist for future implementation.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-2xl border border-border bg-background/55 p-4 text-sm leading-6 text-muted-foreground"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.05}>
          <section className="h-full rounded-4xl border border-accent/20 bg-surface/90 p-5 shadow-xl shadow-accent/10 backdrop-blur sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
              Technology surface
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {primaryTechnologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-black text-accent"
                >
                  {technology}
                </span>
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              <Button asChild>
                <a href={project.liveUrl} target="_blank" rel="noreferrer">
                  Live Demo
                </a>
              </Button>
              <Button asChild variant="secondary">
                <a href={project.githubUrl} target="_blank" rel="noreferrer">
                  GitHub Repository
                </a>
              </Button>
              <Button asChild variant="secondary">
                <Link href={`/projects/${project.slug}/case-study`}>
                  Case Study
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href={`/projects/${project.slug}/engineering`}>
                  Engineering
                </Link>
              </Button>
            </div>
          </section>
        </Reveal>
      </div>

      <main className="mt-14 min-w-0 space-y-14 sm:mt-16 sm:space-y-16">
        <div id="diagram" className="scroll-mt-28">
          <ArchitectureDiagram definition={architecture.diagramDefinition} />
        </div>

        <div id="components" className="scroll-mt-28">
          <ComponentGrid components={architecture.components} />
        </div>

        <div id="request-flow" className="scroll-mt-28">
          <RequestFlow
            steps={architecture.requestFlow}
            flows={architecture.dataFlow}
          />
        </div>

        <div id="api-flow" className="scroll-mt-28">
          <QualityPanel
            eyebrow="API boundaries"
            title="API and service flow"
            description="Server-side routes coordinate validation, authorization, provider calls, persistence, and external integrations."
            items={architecture.apiFlow}
            variant="flow"
          />
        </div>

        <div id="security" className="scroll-mt-28">
          <QualityPanel
            eyebrow="Security model"
            title="Security and authorization"
            description="The security design keeps secrets server-side, scopes access by ownership, and applies controls around expensive or sensitive operations."
            items={architecture.securityFlow}
            variant="flow"
          />
        </div>

        <div id="scaling" className="scroll-mt-28">
          <QualityPanel
            eyebrow="Scale plan"
            title="Scaling strategy"
            description="These choices keep the system maintainable as features, data volume, provider usage, and admin workflows grow."
            items={architecture.scalingStrategy}
          />
        </div>

        <div id="decisions" className="scroll-mt-28">
          <DecisionRecords decisions={architecture.decisions} />
        </div>

        <div id="operations" className="scroll-mt-28">
          <QualityPanel
            eyebrow="Production readiness"
            title="Deployment and operations"
            description="Deployment is treated as an engineering surface: environment boundaries, validation, caching, fallbacks, and operational checks are designed up front."
            items={architecture.deployment}
          />
        </div>

        <div id="risks" className="scroll-mt-28">
          <QualityPanel
            eyebrow="Risk management"
            title="Known risks and controls"
            description="A credible architecture names failure modes explicitly and defines the controls that reduce production risk."
            items={architecture.risks}
          />
        </div>
      </main>
    </>
  );
}
