import { siteConfig } from "@/data/site";

export function RootJsonLd() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: siteConfig.creator,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/projects?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.creator,
    url: siteConfig.url,
    jobTitle: "Full-Stack AI & SaaS Engineer",
    description: siteConfig.description,
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
      siteConfig.social.leetcode,
    ].filter(Boolean),
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma ORM",
      "Redis",
      "Node.js",
      "Artificial Intelligence",
      "Algorithms & Data Structures",
      "System Architecture",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}

export type BreadcrumbItem = {
  name: string;
  item: string;
};

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.item.startsWith("http")
        ? crumb.item
        : `${siteConfig.url}${crumb.item}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}

export type SoftwareAppJsonLdProps = {
  name: string;
  description: string;
  url: string;
  category: string;
  codeRepository?: string;
  keywords?: string[];
};

export function SoftwareApplicationJsonLd({
  name,
  description,
  url,
  category,
  codeRepository,
  keywords,
}: SoftwareAppJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    applicationCategory: category,
    operatingSystem: "Web",
    codeRepository,
    keywords: keywords?.join(", "),
    author: {
      "@type": "Person",
      name: siteConfig.creator,
      url: siteConfig.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
