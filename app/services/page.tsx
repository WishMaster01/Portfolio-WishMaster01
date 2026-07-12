import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { services } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Product engineering, front-end architecture, and implementation services by WishMaster01.",
};

export default function ServicesPage() {
  return (
    <Section>
      <Container className="space-y-10">
        <Reveal className="max-w-3xl space-y-5">
          <Badge>Services</Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Practical execution across product, interface, and system
            foundations.
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            The service model is designed for focused delivery: clear scope,
            measurable output, and maintainable implementation.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.06}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-6 text-muted-foreground">
                    {service.description}
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {service.deliverables.map((deliverable) => (
                      <li key={deliverable} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
