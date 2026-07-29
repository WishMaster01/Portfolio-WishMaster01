import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PerformanceMetrics } from "@/components/engineering/performance-metrics";
import { PipelineSection } from "@/components/engineering/pipeline-section";
import { ReliabilityChecklist } from "@/components/engineering/reliability-checklist";
import { TestSuiteGrid } from "@/components/engineering/test-suite-grid";
import { Reveal } from "@/components/motion/reveal";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { getProjectEngineering } from "@/server/queries/get-project-engineering";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const engineeringSections = [
  ["Testing strategy", "#testing"],
  ["Measured performance", "#performance"],
  ["Reliability controls", "#reliability"],
  ["Validation pipeline", "#pipeline"],
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
  const project = await getProjectEngineering(slug);

  if (!project) {
    return {
      title: "Engineering not found",
    };
  }

  return {
    title: `${project.title} Engineering Quality`,
    description: project.engineering.testingSummary,
    alternates: {
      canonical: `/projects/${project.slug}/engineering`,
    },
    openGraph: {
      type: "article",
      url: `${siteConfig.url}/projects/${project.slug}/engineering`,
      title: `${project.title} Engineering | ${siteConfig.name}`,
      description: project.engineering.testingSummary,
      siteName: siteConfig.name,
    },
  };
}

export default async function EngineeringPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectEngineering(slug);

  if (!project?.engineering) {
    notFound();
  }

  const engineering = project.engineering;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: `${project.title} Engineering Quality`,
            description: engineering.testingSummary,
            author: {
              "@type": "Person",
              name: siteConfig.creator,
            },
            mainEntityOfPage: `${siteConfig.url}/projects/${project.slug}/engineering`,
          }),
        }}
      />

      <Reveal delay={0.05}>
        <nav
          aria-label="Engineering sections"
          className="mt-4 flex flex-wrap gap-2"
        >
          {engineeringSections.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="group inline-flex items-center gap-2 rounded-2xl border border-border bg-surface/85 px-4 py-3 text-sm font-black text-muted-foreground transition hover:border-accent/45 hover:bg-accent/10 hover:text-accent"
            >
              <span>{label}</span>
              <span className="transition group-hover:translate-x-1">→</span>
            </Link>
          ))}
        </nav>
      </Reveal>

      <main className="mt-14 min-w-0 space-y-16 sm:mt-16 sm:space-y-20">
        <TestSuiteGrid suites={engineering.testSuites} />
        <PerformanceMetrics metrics={engineering.performance} />
        <ReliabilityChecklist
          reliability={engineering.reliability}
          security={engineering.security}
          monitoring={engineering.monitoring}
        />
        <PipelineSection steps={engineering.ciCd} />
      </main>
    </>
  );
}
