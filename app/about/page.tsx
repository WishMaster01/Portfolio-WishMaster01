import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { experience, principles, skills } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about WishMaster01, engineering principles, skills, and professional focus.",
};

export default function AboutPage() {
  return (
    <Section>
      <Container className="space-y-12">
        <Reveal className="max-w-3xl space-y-5">
          <Badge>About</Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            I build durable digital products with a focus on clarity,
            performance, and maintainable systems.
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            WishMaster01 is a software portfolio focused on practical
            engineering, polished interfaces, and production-aware delivery.
            This foundation is structured to grow into a deeper case-study,
            writing, and contact platform.
          </p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <Reveal>
            <Card>
              <CardHeader>
                <CardTitle>Engineering principles</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                {principles.map((principle) => (
                  <div key={principle.title} className="space-y-2">
                    <h2 className="font-medium">{principle.title}</h2>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.08}>
            <Card>
              <CardHeader>
                <CardTitle>Core stack</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </Reveal>
        </div>

        <Reveal>
          <Card>
            <CardHeader>
              <CardTitle>Experience focus</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-5 md:grid-cols-3">
              {experience.map((item) => (
                <div key={item.title} className="space-y-2">
                  <p className="text-sm font-medium text-accent">
                    {item.period}
                  </p>
                  <h2 className="font-medium">{item.title}</h2>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </Reveal>
      </Container>
    </Section>
  );
}
