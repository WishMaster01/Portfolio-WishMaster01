import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AnalyticsChart } from "@/components/admin/analytics-chart";
import { BlogEditor } from "@/components/admin/blog-editor";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { MessageViewer } from "@/components/admin/message-viewer";
import { MetricCard } from "@/components/admin/metric-card";
import { ProjectForm } from "@/components/admin/project-form";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { dsaTopics } from "@/data/dsa";
import { resume } from "@/data/resume";
import { skillGroups } from "@/data/skills";
import { getPrisma } from "@/lib/server/prisma";
import { listBlogs } from "@/lib/server/repositories/blogs";
import { listProjects } from "@/lib/server/repositories/projects";
import type { Article } from "@/types/article";
import type { Project } from "@/types/project";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description:
    "Admin dashboard for managing WishMaster01 portfolio content, messages, newsletter, resume, DSA content, settings, and analytics.",
};

type CountDelegate = {
  count: () => Promise<number>;
};

type MessageDelegate = {
  findMany: (args: unknown) => Promise<unknown[]>;
};

type ContactMessageRecord = {
  id?: string;
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  status?: string;
  createdAt?: Date | string;
};

async function getAdminStats() {
  const prisma = await getPrisma();
  const contactMessage = prisma?.contactMessage as
    | (CountDelegate & MessageDelegate)
    | undefined;
  const newsletterSubscription = prisma?.newsletterSubscription as
    | CountDelegate
    | undefined;
  const newsletterSubscriber = prisma?.newsletterSubscriber as
    | CountDelegate
    | undefined;

  const [messages, messageCount, newsletterCount] = await Promise.all([
    contactMessage
      ?.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      })
      .catch(() => []) ?? [],
    contactMessage?.count().catch(() => 0) ?? 0,
    newsletterSubscriber?.count().catch(() => 0) ??
      newsletterSubscription?.count().catch(() => 0) ??
      0,
  ]);

  return {
    messages: messages.map(mapMessage),
    messageCount,
    newsletterCount,
  };
}

function mapMessage(message: unknown) {
  const record = message as ContactMessageRecord;

  return {
    id: record.id ?? `${record.email ?? "message"}-${record.createdAt ?? ""}`,
    name: record.name ?? "Unknown",
    email: record.email ?? "unknown@example.com",
    subject: record.subject ?? "Contact message",
    message: record.message ?? "No message body available.",
    status: record.status ?? "NEW",
    createdAt:
      record.createdAt instanceof Date
        ? record.createdAt.toISOString()
        : record.createdAt ?? new Date().toISOString(),
  };
}

const projectColumns: DataTableColumn<Project>[] = [
  {
    key: "project",
    label: "Project",
    render: (project) => (
      <div>
        <p className="font-black">{project.title}</p>
        <p className="mt-1 text-xs text-muted-foreground">/{project.slug}</p>
      </div>
    ),
  },
  {
    key: "category",
    label: "Category",
    render: (project) => project.category,
  },
  {
    key: "stack",
    label: "Stack",
    render: (project) => (
      <div className="flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((item) => (
          <span
            key={item}
            className="rounded-full bg-accent/10 px-2 py-1 text-xs font-bold text-accent"
          >
            {item}
          </span>
        ))}
      </div>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (project) => (
      <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-black uppercase text-emerald-500">
        {project.status}
      </span>
    ),
  },
];

const blogColumns: DataTableColumn<Article>[] = [
  {
    key: "title",
    label: "Article",
    render: (article) => (
      <div>
        <p className="font-black">{article.title}</p>
        <p className="mt-1 text-xs text-muted-foreground">/{article.slug}</p>
      </div>
    ),
  },
  {
    key: "category",
    label: "Category",
    render: (article) => article.category,
  },
  {
    key: "reading",
    label: "Reading",
    render: (article) => article.readingTime,
  },
  {
    key: "state",
    label: "State",
    render: (article) => (
      <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-black uppercase text-accent">
        {article.published ? "Published" : "Draft"}
      </span>
    ),
  },
];

export default async function AdminPage() {
  const [projects, blogs, adminStats] = await Promise.all([
    listProjects(),
    listBlogs(),
    getAdminStats(),
  ]);
  const skillCount = skillGroups.reduce(
    (count, group) => count + group.skills.length,
    0,
  );
  const resumeSections = [
    resume.education.length,
    resume.achievements.length,
    resume.certifications.length,
    resume.strengths.length,
  ].reduce((sum, value) => sum + value, 0);

  return (
    <div className="relative overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[var(--theme-texture)] bg-[length:var(--theme-texture-size)] opacity-60" />
      <Section className="py-8 sm:py-10">
        <Container className="max-w-[1500px]">
          <div className="grid gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
            <Reveal>
              <AdminSidebar />
            </Reveal>

            <div className="min-w-0 space-y-6">
              <Reveal>
                <AdminHeader projects={projects.length} blogs={blogs.length} />
              </Reveal>

              <Reveal delay={0.04}>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <MetricCard
                    label="Projects"
                    value={`${projects.length}`}
                    detail="Case studies and product detail pages."
                    icon="▣"
                    tone="violet"
                  />
                  <MetricCard
                    label="Blogs"
                    value={`${blogs.length}`}
                    detail="Published and database-backed technical articles."
                    icon="✎"
                    tone="cyan"
                  />
                  <MetricCard
                    label="Messages"
                    value={`${adminStats.messageCount}`}
                    detail="Stored contact messages from PostgreSQL."
                    icon="@"
                    tone="emerald"
                  />
                  <MetricCard
                    label="Newsletter"
                    value={`${adminStats.newsletterCount}`}
                    detail="Subscriber records ready for campaigns."
                    icon="✉"
                    tone="amber"
                  />
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <DataTable
                  title="Projects module"
                  description="Review the current project inventory before creating, patching, or deleting records through protected admin APIs."
                  rows={projects}
                  columns={projectColumns}
                />
              </Reveal>

              <Reveal delay={0.08}>
                <ProjectForm />
              </Reveal>

              <Reveal delay={0.1}>
                <DataTable
                  title="Blogs module"
                  description="Structured technical content with categories, reading time, tags, and publication state."
                  rows={blogs}
                  columns={blogColumns}
                />
              </Reveal>

              <Reveal delay={0.12}>
                <BlogEditor />
              </Reveal>

              <div className="grid gap-6 xl:grid-cols-2">
                <Reveal delay={0.14}>
                  <AdminInfoModule
                    id="skills"
                    title="Skills module"
                    eyebrow="Skills"
                    description={`${skillGroups.length} grouped skill areas and ${skillCount} individual technologies are available for admin editing in a future form workflow.`}
                    items={skillGroups.map((group) => ({
                      label: group.title,
                      value: `${group.level}%`,
                    }))}
                  />
                </Reveal>

                <Reveal delay={0.16}>
                  <AdminInfoModule
                    id="dsa-content"
                    title="DSA content module"
                    eyebrow="DSA"
                    description={`${dsaTopics.length} algorithm topics are structured with definitions, Java code, examples, complexity, use cases, and related practice problems.`}
                    items={dsaTopics.slice(0, 6).map((topic) => ({
                      label: topic.title,
                      value: topic.difficulty,
                    }))}
                  />
                </Reveal>
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
                <Reveal delay={0.18}>
                  <MessageViewer messages={adminStats.messages} />
                </Reveal>

                <Reveal delay={0.2}>
                  <AdminInfoModule
                    id="resume"
                    title="Resume module"
                    eyebrow="Resume"
                    description={`${resumeSections} resume records are grouped across education, achievements, certifications, and strengths. PDF generation remains separated from themed website rendering.`}
                    items={[
                      {
                        label: "Profile",
                        value: resume.name,
                      },
                      {
                        label: "Education",
                        value: `${resume.education.length}`,
                      },
                      {
                        label: "Achievements",
                        value: `${resume.achievements.length}`,
                      },
                      {
                        label: "Certifications",
                        value: `${resume.certifications.length}`,
                      },
                    ]}
                  />
                </Reveal>
              </div>

              <div className="grid gap-6 xl:grid-cols-2">
                <Reveal delay={0.22}>
                  <AdminInfoModule
                    id="newsletter"
                    title="Newsletter module"
                    eyebrow="Newsletter"
                    description="Subscriber storage is database-ready. Campaign publishing should remain server-side with unsubscribe and consent handling."
                    items={[
                      {
                        label: "Subscribers",
                        value: `${adminStats.newsletterCount}`,
                      },
                      { label: "Consent", value: "Required" },
                      { label: "Unsubscribe", value: "Planned" },
                    ]}
                  />
                </Reveal>

                <Reveal delay={0.24}>
                  <AdminInfoModule
                    id="settings"
                    title="Settings module"
                    eyebrow="Settings"
                    description="Theme preferences, reduced motion, font scale, SEO defaults, admin keys, and provider configuration belong in this module."
                    items={[
                      { label: "Theme system", value: "Active" },
                      { label: "AI providers", value: "Fallback-ready" },
                      { label: "GitHub API", value: "Cached" },
                      { label: "Resend", value: "Server-only" },
                    ]}
                  />
                </Reveal>
              </div>

              <Reveal delay={0.26}>
                <AnalyticsChart
                  title="Content distribution"
                  description="A fast visual summary of the main portfolio content areas currently connected to the admin dashboard."
                  items={[
                    {
                      label: "Projects",
                      value: projects.length,
                      tone: "var(--accent)",
                    },
                    {
                      label: "Blogs",
                      value: blogs.length,
                      tone: "var(--ambient-two)",
                    },
                    {
                      label: "DSA topics",
                      value: dsaTopics.length,
                      tone: "var(--ambient-one)",
                    },
                    {
                      label: "Skill groups",
                      value: skillGroups.length,
                      tone: "var(--ambient-three)",
                    },
                  ]}
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

function AdminInfoModule({
  id,
  eyebrow,
  title,
  description,
  items,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: Array<{ label: string; value: string }>;
}) {
  return (
    <section
      id={id}
      className="h-full rounded-[2rem] border border-border bg-surface/85 p-5 shadow-sm shadow-foreground/5 backdrop-blur sm:p-6"
    >
      <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div
            key={`${item.label}-${item.value}`}
            className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-background/60 p-4"
          >
            <span className="text-sm font-bold text-muted-foreground">
              {item.label}
            </span>
            <span className="text-sm font-black text-accent">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
