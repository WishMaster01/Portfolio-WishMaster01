import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const dsaStats = [
  { value: "500+", label: "Problems solved" },
  { value: "20+", label: "Core patterns" },
  { value: "10+", label: "Topic tracks" },
] as const;

export default function DsaShowcasePage() {
  return (
    <>
      <PageHeader
        eyebrow="DSA Showcase"
        title="Problem-solving practice across core data structures and algorithms."
        description="A focused snapshot of DSA consistency, pattern recognition, and interview-ready fundamentals."
      />
      <Section className="pt-0">
        <Container className="grid gap-6 md:grid-cols-3">
          {dsaStats.map((item) => (
            <Card key={item.label}>
              <CardContent className="p-6">
                <p className="text-4xl font-black text-accent">{item.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </Container>
      </Section>
    </>
  );
}
