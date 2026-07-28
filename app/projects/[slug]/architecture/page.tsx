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
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
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
    <div className="relative overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[var(--theme-texture)] bg-[length:var(--theme-texture-size)] opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
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

      <Section className="py-8 sm:py-12">
        <Container className="max-w-[1360px]">
          <Reveal>
            <section className="relative overflow-hidden rounded-[2.5rem] border border-accent/20 bg-surface/90 p-6 shadow-2xl shadow-accent/10 backdrop-blur sm:p-8 lg:p-10">
              <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-[color-mix(in_oklab,var(--ambient-two)_18%,transparent)] blur-3xl" />

              <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
                <div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex text-sm font-black text-accent transition hover:opacity-75"
                  >
                    Back to project details
                  </Link>

                  <p className="mt-6 inline-flex rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-accent">
                    Architecture and system design
                  </p>
                  <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-[-0.06em] sm:text-5xl lg:text-6xl">
                    {project.title} technical blueprint
                  </h1>
                  <p className="mt-3 text-base font-black text-accent sm:text-lg">
                    {project.category}
                  </p>
                  <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                    {architecture.summary}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button asChild>
                      <a href={project.liveUrl} target="_blank" rel="noreferrer">
                        Live Demo
                      </a>
                    </Button>
                    <Button asChild variant="secondary">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub Repository
                      </a>
                    </Button>
                    <Button asChild variant="secondary">
                      <Link href={`/projects/${project.slug}/case-study`}>
                        Read Case Study
                      </Link>
                    </Button>
                    <Button asChild variant="secondary">
                      <Link href={`/projects/${project.slug}/engineering`}>
                        Engineering Quality
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="relative rounded-[2rem] border border-border bg-background/65 p-5 shadow-xl shadow-foreground/5">
                  <div className="grid gap-3">
                    {[
                      ["Client", "Next.js UI"],
                      ["Server", "Validation + services"],
                      ["Providers", "External adapters"],
                      ["Storage", "Database + assets"],
                    ].map(([label, value], index) => (
                      <div key={label} className="relative flex items-center gap-3">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent/10 text-xs font-black text-accent ring-1 ring-accent/20">
                          {index + 1}
                        </span>
                        <div className="min-w-0 rounded-2xl border border-border bg-surface/85 px-4 py-3">
                          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground">
                            {label}
                          </p>
                          <p className="mt-1 text-sm font-black text-foreground">
                            {value}
                          </p>
                        </div>
                        {index < 3 ? (
                          <span className="absolute left-[21px] top-11 h-3 w-px bg-accent/35" />
                        ) : null}
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-accent/20 bg-accent/10 p-4">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
                      Main idea
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Build stable boundaries first, then let features grow
                      without leaking provider, database, billing, or admin
                      concerns into the UI layer.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {systemStats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.04}>
                <article className="h-full rounded-[1.75rem] border border-border bg-surface/85 p-5 shadow-sm shadow-foreground/5 backdrop-blur transition hover:-translate-y-1 hover:border-accent/45 hover:shadow-2xl hover:shadow-accent/10">
                  <p className="text-3xl font-black text-accent">
                    {stat.value}
                  </p>
                  <h2 className="mt-3 text-lg font-black tracking-[-0.025em] text-foreground">
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
                  <h2 className="mt-4 text-xl font-black tracking-[-0.025em] text-foreground">
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
              <section className="h-full rounded-[2rem] border border-border bg-surface/90 p-5 shadow-xl shadow-foreground/5 backdrop-blur sm:p-6">
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
              <section className="h-full rounded-[2rem] border border-accent/20 bg-surface/90 p-5 shadow-xl shadow-accent/10 backdrop-blur sm:p-6">
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
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
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
                <ArchitectureDiagram
                  definition={architecture.diagramDefinition}
                />
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

            {/*
              <aside className="space-y-5">
                <section className="rounded-[2rem] border border-border bg-surface/90 p-5 shadow-xl shadow-foreground/5 backdrop-blur">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
                    Page index
                  </p>
                  <nav
                    aria-label="Architecture sections"
                    className="mt-4 grid gap-2 text-sm font-black"
                  >
                    {architectureSections.map(([label, href]) => (
                      <Link
                        key={href}
                        href={href}
                        className="group flex items-center justify-between rounded-2xl border border-border bg-background/55 px-4 py-3 text-muted-foreground transition hover:border-accent/45 hover:bg-accent/10 hover:text-accent"
                      >
                        <span>{label}</span>
                        <span className="transition group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    ))}
                  </nav>
                </section>

                <section className="rounded-[2rem] border border-accent/20 bg-surface/90 p-5 shadow-xl shadow-accent/10 backdrop-blur">
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
                </section>

                <section className="rounded-[2rem] border border-border bg-surface/90 p-5 shadow-xl shadow-foreground/5 backdrop-blur">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
                    Read this as
                  </p>
                  <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted-foreground">
                    {[
                      "A system-design explanation for interview review.",
                      "A technical map of boundaries, flows, and tradeoffs.",
                      "A production-readiness checklist for future implementation.",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 rounded-2xl border border-border bg-background/55 p-3"
                      >
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="grid gap-3 rounded-[2rem] border border-border bg-surface/90 p-5 shadow-xl shadow-foreground/5 backdrop-blur">
                  <Button asChild>
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      Live Demo
                    </a>
                  </Button>
                  <Button asChild variant="secondary">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub Repository
                    </a>
                  </Button>
                  <Button asChild variant="secondary">
                    <Link href={`/projects/${project.slug}/case-study`}>
                      Case Study
                    </Link>
                  </Button>
                </section>
              </aside>
            */}
        </Container>
      </Section>
    </div>
  );
}
