import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types/project";

type ScreenshotGalleryProps = {
  screenshots: Project["screenshots"];
};

export function ScreenshotGallery({ screenshots }: ScreenshotGalleryProps) {
  return (
    <Reveal>
      <Card className="rounded-[2rem] bg-surface/95">
        <CardContent className="space-y-6 p-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
              Screenshots
            </p>
            <h2 className="mt-2 text-2xl font-black text-foreground">
              Interface surfaces
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {screenshots.map((screenshot, index) => (
              <div
                key={screenshot.title}
                className="group overflow-hidden rounded-2xl border border-border bg-background/70 transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10"
              >
                <div className="grid aspect-video place-items-center bg-[radial-linear(circle_at_50%_30%,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_42%),linear-linear(135deg,var(--surface-elevated),var(--background))] p-8">
                  <div className="rounded-2xl border border-border bg-surface/80 p-5 shadow-lg transition group-hover:scale-105">
                    <Image
                      src={screenshot.image}
                      alt={`${screenshot.title} screenshot`}
                      width={80}
                      height={80}
                      className="h-14 w-14 opacity-70"
                    />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
                    Surface {index + 1}
                  </p>
                  <h3 className="mt-2 font-black text-foreground">
                    {screenshot.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {screenshot.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}
