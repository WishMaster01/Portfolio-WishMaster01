import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Technologies, tools, and engineering strengths for WishMaster01.",
};

const skillSections = [
  {
    title: "Programming Languages",
    items: ["JavaScript", "TypeScript", "Python", "Java", "C++", "SQL"],
  },
  {
    title: "Frontend Development",
    items: ["React.js", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "JavaScript"],
  },
  {
    title: "Backend Development",
    items: ["Node.js", "Express.js", "Prisma", "PostgreSQL", "REST APIs", "Socket.io"],
  },
  {
    title: "Tools & Platforms",
    items: ["Git", "GitHub", "Docker", "Vercel", "Firebase", "Postman"],
  },
  {
    title: "Tools & Others",
    items: ["VS Code", "Figma", "Linux", "PostgreSQL/Neon", "MongoDB", "Prisma ORM"],
  },
] as const;

const overview = [
  { label: "JavaScript", value: 90 },
  { label: "TypeScript", value: 85 },
  { label: "React.js", value: 90 },
  { label: "Next.js", value: 85 },
  { label: "Node.js", value: 85 },
  { label: "Python", value: 80 },
  { label: "SQL / PostgreSQL", value: 85 },
] as const;

const strengths = [
  "Building scalable web applications",
  "Creating AI-powered solutions",
  "Designing clean and responsive UI",
  "Writing efficient and maintainable code",
  "Solving DSA problems effectively",
] as const;

export default function SkillsPage() {
  return (
    <div className="bg-background text-foreground">
      <Section className="py-16">
        <Container className="max-w-[1380px]">
          <Reveal className="mb-8">
            <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              My Skills
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              Technologies and tools I work with
            </p>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="space-y-5">
              {skillSections.map((section, index) => (
                <Reveal key={section.title} delay={(index % 3) * 0.05}>
                  <Card className="rounded-2xl">
                    <CardContent className="p-5">
                      <h2 className="text-sm font-black">{section.title}</h2>
                      <div className="mt-5 grid grid-cols-3 gap-4 sm:grid-cols-6">
                        {section.items.map((item) => (
                          <div
                            key={item}
                            className="grid justify-items-center gap-2 text-center"
                          >
                            <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-xs font-black text-accent">
                              {item.slice(0, 2)}
                            </span>
                            <span className="text-xs font-semibold text-muted-foreground">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>

            <aside className="space-y-6">
              <Card className="rounded-2xl">
                <CardContent className="p-6">
                  <h2 className="font-black">Skills Overview</h2>
                  <div className="mt-5 space-y-4">
                    {overview.map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-xs font-bold">
                          <span>{item.label}</span>
                          <span>{item.value}%</span>
                        </div>
                        <div className="mt-2 h-2 rounded-full bg-accent/10">
                          <div
                            className="h-full rounded-full bg-accent"
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden rounded-2xl bg-accent text-accent-foreground">
                <CardContent className="p-6">
                  <h2 className="font-black">What I&apos;m Good At</h2>
                  <ul className="mt-5 space-y-3 text-sm leading-6">
                    {strengths.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </aside>
          </div>
        </Container>
      </Section>
    </div>
  );
}
