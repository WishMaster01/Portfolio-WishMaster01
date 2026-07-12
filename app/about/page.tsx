import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about WishMaster01, engineering focus, principles, and portfolio direction.",
};

export default function AboutPage() {
  return (
    <>
      <Section className="pb-10">
        <Container className="max-w-4xl space-y-5">
          <Badge>About</Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {profile.shortBio}
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            {profile.longBio}
          </p>
        </Container>
      </Section>

      <Section className="pt-10">
        <Container className="grid gap-6 lg:grid-cols-[0.75fr_1fr]">
          <Reveal>
            <Card>
              <CardContent className="space-y-4 p-6">
                <h2 className="text-xl font-semibold">Focus areas</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.focusAreas.map((area) => (
                    <Badge key={area} variant="secondary">
                      {area}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {profile.principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 0.06}>
                <Card className="h-full">
                  <CardContent className="space-y-2 p-6">
                    <h2 className="font-semibold">{principle.title}</h2>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {principle.description}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
