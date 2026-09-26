import type { MetadataRoute } from "next";
import { articles } from "@/data/blog";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

// Canonical public routes only (no admin, private APIs, or internal draft tools)
const publicStaticRoutes = [
  "",
  "/projects",
  "/engineering",
  "/experience",
  "/about",
  "/skills",
  "/blog",
  "/github",
  "/resume",
  "/contact",
  "/recruiter",
  "/dsa-showcase",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  const staticEntries: MetadataRoute.Sitemap = publicStaticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1.0 : route === "/recruiter" || route === "/projects" ? 0.9 : 0.7,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.flatMap((project) => [
    {
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/projects/${project.slug}/case-study`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects/${project.slug}/architecture`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/projects/${project.slug}/engineering`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
  ]);

  const blogEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...projectEntries, ...blogEntries];
}
