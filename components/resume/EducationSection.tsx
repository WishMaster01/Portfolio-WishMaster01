import { Card, CardContent } from "@/components/ui/card";
import { education } from "@/data/experience";
import { resume } from "@/data/resume";

export function EducationSection() {
  return (
    <Card className="rounded-3xl bg-surface">
      <CardContent className="p-5 sm:p-6">
        <h2 className="text-xl font-black">Education</h2>
        <div className="mt-5 rounded-2xl border border-border bg-background/70 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-black">{education.degree}</h3>
              <p className="mt-1 text-sm font-bold text-accent">
                {education.institution}
              </p>
            </div>
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-black text-accent">
              {education.period}
            </span>
          </div>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            {education.coursework}
          </p>
        </div>
        {resume.education.map((item) => (
          <div
            key={item.label}
            className="mt-4 rounded-2xl border border-border bg-background/70 p-5"
          >
            <h3 className="font-black">{item.label}</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {item.detail}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
