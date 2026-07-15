import type { MetadataRoute } from "next";
import { articles } from "@/data/blog";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

const staticRoutes = [
  "",
  "/about",
  "/skills",
  "/experience",
  "/resume",
  "/blog",
  "/blog/create",
  "/contact",
  "/projects",
  "/services",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...projects.map((project) => ({
      url: `${siteConfig.url}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...articles.map((article) => ({
      url: `${siteConfig.url}/blog/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
