import { Card, CardContent } from "@/components/ui/card";
import { resume } from "@/data/resume";

export function CertificationSection() {
  return (
    <Card className="rounded-3xl bg-surface">
      <CardContent className="p-5 sm:p-6">
        <h2 className="text-xl font-black">Certifications</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-3 xl:grid-cols-1">
          {resume.certifications.map((certification) => (
            <div
              key={certification.title}
              className="rounded-2xl border border-border bg-background/70 p-5"
            >
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-black text-accent">
                {certification.year}
              </span>
              <h3 className="mt-4 font-black">{certification.title}</h3>
              <p className="mt-1 text-sm font-bold text-accent">
                {certification.issuer}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {certification.detail}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
