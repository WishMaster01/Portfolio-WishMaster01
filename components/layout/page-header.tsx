import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <Section className="pb-10">
      <Container className="max-w-4xl space-y-5">
        <Badge>{eyebrow}</Badge>
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">{description}</p>
      </Container>
    </Section>
  );
}
