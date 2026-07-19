import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import { DecisionMatrix } from "@/components/case-study/decision-matrix";
import { LessonSection } from "@/components/case-study/lesson-section";
import { OutcomeGrid } from "@/components/case-study/outcome-grid";
import { ProblemSection } from "@/components/case-study/problem-section";
import { ProcessTimeline } from "@/components/case-study/process-timeline";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { getProjectCaseStudy } from "@/server/queries/get-project-case-study";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

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
  const project = await getProjectCaseStudy(slug);

  if (!project) {
    return {
      title: "Case study not found",
    };
  }

  return {
    title: `${project.title} Case Study`,
    description: project.caseStudy.problem,
    alternates: {
      canonical: `/projects/${project.slug}/case-study`,
    },
    openGraph: {
      type: "article",
      url: `${siteConfig.url}/projects/${project.slug}/case-study`,
      title: `${project.title} Case Study | ${siteConfig.name}`,
      description: project.caseStudy.problem,
      siteName: siteConfig.name,
      images: [
        {
          url: project.coverImage,
          width: 1200,
          height: 630,
          alt: `${project.title} case study preview`,
        },
      ],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectCaseStudy(slug);

  if (!project?.caseStudy) {
    notFound();
  }

  const caseStudy = project.caseStudy;

  return (
    <div className="relative overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[var(--theme-texture)] bg-[length:var(--theme-texture-size)] opacity-60" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `${project.title} Case Study`,
            description: caseStudy.problem,
            author: {
              "@type": "Person",
              name: siteConfig.creator,
            },
            mainEntityOfPage: `${siteConfig.url}/projects/${project.slug}/case-study`,
          }),
        }}
      />
      <Section className="py-8 sm:py-12">
        <Container className="max-w-[1280px]">
          <CaseStudyHero
            title={project.title}
            slug={project.slug}
            coverImage={project.coverImage}
            liveUrl={project.liveUrl}
            githubUrl={project.githubUrl}
          />

          <div className="mt-14 space-y-16 sm:mt-20 sm:space-y-20">
            <ProblemSection
              background={caseStudy.background}
              problem={caseStudy.problem}
              targetUsers={caseStudy.targetUsers}
              role={caseStudy.role}
            />

            <DecisionMatrix
              constraints={caseStudy.constraints}
              goals={caseStudy.goals}
            />

            <ProcessTimeline phases={caseStudy.process} />

            <OutcomeGrid outcomes={caseStudy.outcomes} />

            <LessonSection lessons={caseStudy.lessons} />
          </div>
        </Container>
      </Section>
    </div>
  );
}
