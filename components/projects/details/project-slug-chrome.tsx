import { ProjectBreadcrumbSection } from "@/components/projects/details/project-breadcrumb-section";
import { ProjectSectionNavBar } from "@/components/projects/details/project-section-nav-bar";

type ProjectSlugChromeProps = {
  slug: string;
  title: string;
  hero: React.ReactNode;
  children: React.ReactNode;
};

export function ProjectSlugChrome({
  slug,
  title,
  hero,
  children,
}: ProjectSlugChromeProps) {
  return (
    <>
      <ProjectBreadcrumbSection slug={slug} title={title} />
      {hero}
      <ProjectSectionNavBar slug={slug} className="mt-6" />
      {children}
    </>
  );
}
