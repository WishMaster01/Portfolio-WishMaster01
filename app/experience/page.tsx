import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { experienceItems } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional journey and experience highlights for WishMaster01.",
};

const highlights = [
  "2+ Years of hands-on experience",
  "10+ Complete full-stack projects",
  "AI integration in multiple applications",
  "Strong problem-solving and DSA skills",
  "Working with startups and individual clients",
] as const;

export default function ExperiencePage() {
  return (
    <div className="bg-background text-foreground">
      <Section className="py-16">
        <Container className="max-w-[1380px]">
          <div className="mb-8">
            <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              My Experience
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              My professional journey so far
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
            <div className="relative space-y-6">
              <span className="absolute left-5 top-8 hidden h-[calc(100%-4rem)] w-px bg-accent/30 md:block" />
              {experienceItems.map((item) => (
                <div key={`${item.company}-${item.title}`} className="relative">
                  <span className="absolute left-3 top-8 hidden h-4 w-4 rounded-full border-4 border-background bg-accent md:block" />
                  <Card className="rounded-2xl md:ml-12">
                    <CardContent className="p-6">
                      <div className="flex flex-col justify-between gap-2 sm:flex-row">
                        <div>
                          <h2 className="text-xl font-black">{item.title}</h2>
                          <p className="mt-1 text-sm font-semibold text-muted-foreground">
                            {item.company}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-accent">
                          {item.period}
                        </p>
                      </div>
                      <p className="mt-5 text-sm leading-7 text-muted-foreground">
                        {item.summary}
                      </p>
                      <ul className="mt-5 space-y-2 text-sm leading-6 text-muted-foreground">
                        {item.achievements.map((achievement) => (
                          <li key={achievement}>• {achievement}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            <aside className="space-y-6">
              <Card className="rounded-2xl">
                <CardContent className="p-6">
                  <h2 className="font-black">Experience Highlights</h2>
                  <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
                    {highlights.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="rounded-2xl">
                <CardContent className="p-6">
                  <h2 className="font-black">Education</h2>
                  <div className="mt-5 space-y-5 text-sm text-muted-foreground">
                    <div>
                      <p className="font-black text-foreground">
                        B.Tech in Computer Science & Engineering
                      </p>
                      <p>2022 - 2026</p>
                      <p>Lovely Professional University, Punjab</p>
                    </div>
                    <div>
                      <p className="font-black text-foreground">
                        Relevant Coursework
                      </p>
                      <p>
                        Data Structures & Algorithms, DBMS, OOPs, Operating
                        Systems, Computer Networks, Software Engineering
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </Container>
      </Section>
    </div>
  );
}
