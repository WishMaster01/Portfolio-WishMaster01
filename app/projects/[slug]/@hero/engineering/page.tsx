import { EngineeringHero } from "@/components/engineering/engineering-hero";
import { getProjectEngineering } from "@/server/queries/get-project-engineering";

type HeroPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectEngineeringHero({ params }: HeroPageProps) {
  const { slug } = await params;
  const project = await getProjectEngineering(slug);

  if (!project?.engineering) {
    return null;
  }

  const engineering = project.engineering;

  return (
    <EngineeringHero
      title={project.title}
      slug={project.slug}
      category={project.category}
      liveUrl={project.liveUrl}
      githubUrl={project.githubUrl}
      testingSummary={engineering.testingSummary}
      suiteCount={engineering.testSuites.length}
      metricCount={engineering.performance.length}
      controlCount={engineering.reliability.length}
    />
  );
}
