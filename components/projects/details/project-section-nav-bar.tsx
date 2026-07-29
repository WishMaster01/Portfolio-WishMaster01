import { ProjectSectionNav } from "@/components/projects/details/project-section-nav";
import { cn } from "@/lib/utils";

type ProjectSectionNavBarProps = {
  slug: string;
  className?: string;
};

export function ProjectSectionNavBar({
  slug,
  className,
}: ProjectSectionNavBarProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-surface/80 px-2 shadow-sm shadow-foreground/5 sm:px-3",
        className,
      )}
    >
      <ProjectSectionNav
        slug={slug}
        className="static top-auto border-b-0 bg-transparent"
      />
    </div>
  );
}
