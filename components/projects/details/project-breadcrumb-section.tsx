"use client";

import { usePathname } from "next/navigation";
import { ProjectBreadcrumb } from "@/components/projects/details/project-breadcrumb";
import { getProjectSectionLabel } from "@/lib/projects/navigation";

type ProjectBreadcrumbSectionProps = {
  slug: string;
  title: string;
};

export function ProjectBreadcrumbSection({
  slug,
  title,
}: ProjectBreadcrumbSectionProps) {
  const pathname = usePathname();
  const section = getProjectSectionLabel(pathname, slug);

  return (
    <ProjectBreadcrumb
      title={title}
      slug={section ? slug : undefined}
      section={section}
    />
  );
}
