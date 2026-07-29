import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import { getProjectCaseStudy } from "@/server/queries/get-project-case-study";

type HeroPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectCaseStudyHero({ params }: HeroPageProps) {
  const { slug } = await params;
  const project = await getProjectCaseStudy(slug);

  if (!project?.caseStudy) {
    return null;
  }

  return (
    <CaseStudyHero
      title={project.title}
      slug={project.slug}
      coverImage={project.coverImage}
      liveUrl={project.liveUrl}
      githubUrl={project.githubUrl}
    />
  );
}
