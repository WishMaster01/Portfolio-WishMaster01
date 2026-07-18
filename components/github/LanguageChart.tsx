import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { GitHubLanguage } from "@/types/github";

type LanguageChartProps = {
  languages: GitHubLanguage[];
};

export function LanguageChart({ languages }: LanguageChartProps) {
  const topLanguages = languages.slice(0, 8);

  return (
    <Reveal>
      <Card className="rounded-[2rem] bg-surface/95">
        <CardContent className="p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
            Language Matrix
          </p>
          <h2 className="mt-2 text-2xl font-black text-foreground">
            Repository language usage
          </h2>

          {topLanguages.length > 0 ? (
            <div className="mt-6 space-y-4">
              {topLanguages.map((language, index) => (
                <div key={language.name}>
                  <div className="flex justify-between gap-4 text-sm font-bold">
                    <span className="flex items-center gap-2 text-foreground">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: language.color }}
                      />
                      {language.name}
                    </span>
                    <span className="text-accent">{language.percentage}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-accent/10">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${language.percentage}%`,
                        backgroundColor: language.color,
                        transitionDelay: `${index * 80}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              Language data will appear after GitHub repositories are loaded.
            </p>
          )}
        </CardContent>
      </Card>
    </Reveal>
  );
}
