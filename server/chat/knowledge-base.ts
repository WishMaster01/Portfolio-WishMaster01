import { articles } from "@/data/blog";
import { experienceItems } from "@/data/experience";
import { profile } from "@/data/profile";
import { projectArchitectures } from "@/data/project-architectures";
import { projects } from "@/data/projects";
import { resume } from "@/data/resume";
import { services, siteConfig } from "@/data/site";
import { skillGroups, skillHighlights } from "@/data/skills";
import { dsaTopics } from "@/data/dsa";

export type KnowledgeDocumentType =
  | "project"
  | "case-study"
  | "engineering-architecture"
  | "skill"
  | "experience"
  | "blog"
  | "dsa"
  | "profile"
  | "service";

export type KnowledgeDocument = {
  id: string;
  type: KnowledgeDocumentType;
  title: string;
  content: string;
  source: string;
  slug?: string;
  tags: string[];
  metadata: Record<string, unknown>;
  updatedAt: string;
  embedding?: number[];
};

let cachedKnowledgeBase: KnowledgeDocument[] | null = null;

export function buildKnowledgeBase(): KnowledgeDocument[] {
  if (cachedKnowledgeBase) {
    return cachedKnowledgeBase;
  }

  const docs: KnowledgeDocument[] = [];
  const now = new Date().toISOString();

  // 1. Projects & Case Studies
  for (const project of projects) {
    const arch = projectArchitectures[project.slug];
    const archDetails = arch
      ? [
          `Architecture Summary: ${arch.summary}`,
          `Components: ${arch.components.map((c) => `${c.name}: ${c.responsibility} (Tech: ${c.technologies.join(", ")})`).join("; ")}`,
          `Decisions: ${arch.decisions.map((d) => `${d.title}: ${d.reason} (Tradeoff: ${d.tradeoff})`).join("; ")}`,
          `Scaling Strategy: ${arch.scalingStrategy.map((s) => `${s.title}: ${s.description}`).join("; ")}`,
        ].join("\n")
      : "";

    docs.push({
      id: `project-${project.slug}`,
      type: "project",
      title: `Project: ${project.title} (${project.category})`,
      slug: project.slug,
      source: `/projects/${project.slug}`,
      tags: [...project.stack, project.category, "project", "case-study"],
      content: [
        `Project Title: ${project.title}`,
        `Category: ${project.category} (${project.year}) - Status: ${project.status}`,
        `Role: ${project.role} (Timeline: ${project.timeline})`,
        `Summary: ${project.summary}`,
        `Problem Statement: ${project.problem}`,
        `Engineering Solution: ${project.solution}`,
        `Business & Technical Impact: ${project.impact}`,
        `Technology Stack: ${project.stack.join(", ")}`,
        `Key Highlights: ${project.highlights.join("; ")}`,
        `Performance Metrics: ${project.metrics.map((m) => `${m.label}: ${m.value}`).join(", ")}`,
        archDetails,
      ].filter(Boolean).join("\n"),
      metadata: {
        category: project.category,
        year: project.year,
        role: project.role,
        stack: project.stack,
        liveUrl: project.liveUrl,
        githubUrl: project.githubUrl,
      },
      updatedAt: now,
    });
  }

  // 2. Blog Posts & Technical Articles
  for (const article of articles) {
    docs.push({
      id: `blog-${article.slug}`,
      type: "blog",
      title: `Article: ${article.title}`,
      slug: article.slug,
      source: `/blog/${article.slug}`,
      tags: [...article.tags, article.category, "blog", "technical-article"],
      content: [
        `Title: ${article.title}`,
        `Category: ${article.category} | Reading Time: ${article.readingTime}`,
        `Date: ${article.date} | Author: ${article.author}`,
        `Excerpt: ${article.excerpt}`,
        `Executive Summary: ${article.summary}`,
        `Tags: ${article.tags.join(", ")}`,
        `Key Takeaways: ${article.content.slice(0, 2).map((section) => `${section.heading}: ${section.body.join(" ")}`).join("; ")}`,
      ].join("\n"),
      metadata: {
        category: article.category,
        readingTime: article.readingTime,
        published: article.published,
      },
      updatedAt: now,
    });
  }

  // 3. Experience & Professional Career
  for (const item of experienceItems) {
    const expId = `${item.company}-${item.title}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    docs.push({
      id: `experience-${expId}`,
      type: "experience",
      title: `Experience: ${item.title} at ${item.company}`,
      source: "/about",
      tags: [...(item.stack ?? []), "experience", "career", item.company],
      content: [
        `Role: ${item.title} at ${item.company}`,
        `Period: ${item.period} | Location: ${item.location}`,
        `Overview: ${item.summary}`,
        item.impact ? `Impact: ${item.impact}` : "",
        item.stack ? `Technologies: ${item.stack.join(", ")}` : "",
        `Key Achievements: ${item.achievements.join("; ")}`,
      ].filter(Boolean).join("\n"),
      metadata: {
        company: item.company,
        role: item.title,
        period: item.period,
      },
      updatedAt: now,
    });
  }

  // 4. Skills & Technical Competencies
  for (const group of skillGroups) {
    docs.push({
      id: `skills-${group.title.toLowerCase().replace(/\s+/g, "-")}`,
      type: "skill",
      title: `Skills Domain: ${group.title}`,
      source: "/about",
      tags: [group.title.toLowerCase(), "skills", "technologies", ...group.skills.map((s) => s.toLowerCase())],
      content: [
        `Skill Category: ${group.title}`,
        `Description: ${group.description}`,
        `Focus Areas: ${group.focus}`,
        `Skills: ${group.skills.join(", ")}`,
        `Proficiency Level: ${group.level}%`,
        `Top Focus: ${skillHighlights.join(", ")}`,
      ].join("\n"),
      metadata: {
        groupTitle: group.title,
        skillCount: group.skills.length,
        level: group.level,
      },
      updatedAt: now,
    });
  }

  // 5. DSA & Algorithmic Specializations
  for (const topic of dsaTopics) {
    const slug = topic.title.toLowerCase().replace(/\s+/g, "-");
    docs.push({
      id: `dsa-${slug}`,
      type: "dsa",
      title: `Algorithm & Data Structure: ${topic.title}`,
      slug,
      source: `/dsa/${slug}`,
      tags: [slug, topic.difficulty.toLowerCase(), ...topic.patterns, "dsa", "algorithms"],
      content: [
        `Topic: ${topic.title} (Difficulty: ${topic.difficulty})`,
        `Complexity: ${topic.complexity}`,
        `Core Patterns: ${topic.patterns.join(", ")}`,
        `Description: ${topic.description}`,
        `Pattern Recognition: ${topic.recognition.join("; ")}`,
        `Approach Guidelines: ${topic.approach.join("; ")}`,
        `Common Pitfalls: ${topic.pitfalls.join("; ")}`,
        `Production Use Cases: ${topic.useCase}`,
      ].join("\n"),
      metadata: {
        difficulty: topic.difficulty,
        complexity: topic.complexity,
      },
      updatedAt: now,
    });
  }

  // 6. Profile & Engineering Philosophy
  docs.push({
    id: "profile-overview",
    type: "profile",
    title: `Developer Profile: ${siteConfig.name}`,
    source: "/about",
    tags: ["profile", "bio", "principles", "wishmaster01", "philosophy"],
    content: [
      `Name: ${siteConfig.name} (${resume.title})`,
      `Short Bio: ${profile.shortBio}`,
      `Detailed Bio: ${profile.longBio}`,
      `Core Focus Areas: ${profile.focusAreas.join(", ")}`,
      `Engineering Principles: ${profile.principles.map((p) => `${p.title}: ${p.description}`).join("; ")}`,
      `Education & Credentials: ${resume.education.map((e) => `${e.label}: ${e.detail}`).join("; ")}`,
      `Key Strengths: ${resume.strengths.join(", ")}`,
      `Contact: Email: ${siteConfig.email}, GitHub: ${siteConfig.social.github}, LinkedIn: ${siteConfig.social.linkedin}`,
    ].join("\n"),
    metadata: {
      name: siteConfig.name,
      email: siteConfig.email,
    },
    updatedAt: now,
  });

  // 7. Services Offered
  for (const service of services) {
    const serviceId = service.title.toLowerCase().replace(/\s+/g, "-");
    docs.push({
      id: `service-${serviceId}`,
      type: "service",
      title: `Service: ${service.title}`,
      source: "/services",
      tags: ["services", "consulting", "offerings", service.title.toLowerCase()],
      content: [
        `Service: ${service.title}`,
        `Description: ${service.description}`,
        `Deliverables: ${service.deliverables.join("; ")}`,
      ].join("\n"),
      metadata: {
        serviceId,
      },
      updatedAt: now,
    });
  }

  cachedKnowledgeBase = docs;
  return docs;
}
