import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function Loading() {
  return (
    <Section>
      <Container className="space-y-8" aria-busy="true" aria-live="polite">
        <div className="max-w-3xl space-y-4">
          <div className="h-7 w-36 animate-pulse rounded-full bg-surface-elevated" />
          <div className="h-12 w-full animate-pulse rounded-2xl bg-surface-elevated" />
          <div className="h-6 w-2/3 animate-pulse rounded-2xl bg-surface-elevated" />
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-56 animate-pulse rounded-3xl border border-border bg-surface"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
