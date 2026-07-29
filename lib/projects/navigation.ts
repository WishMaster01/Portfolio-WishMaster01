export type ProjectNavItem = {
  label: string;
  href: string;
};

export function getProjectNavigation(slug: string): ProjectNavItem[] {
  return [
    {
      label: "Overview",
      href: `/projects/${slug}`,
    },
    {
      label: "Case Study",
      href: `/projects/${slug}/case-study`,
    },
    {
      label: "Architecture",
      href: `/projects/${slug}/architecture`,
    },
    {
      label: "Engineering",
      href: `/projects/${slug}/engineering`,
    },
  ];
}

export function isProjectNavItemActive(
  pathname: string,
  href: string,
  slug: string,
) {
  if (href === `/projects/${slug}`) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getProjectSectionLabel(
  pathname: string,
  slug: string,
): string | undefined {
  if (pathname === `/projects/${slug}/case-study`) {
    return "Case Study";
  }

  if (pathname === `/projects/${slug}/architecture`) {
    return "Architecture";
  }

  if (pathname === `/projects/${slug}/engineering`) {
    return "Engineering";
  }

  return undefined;
}
