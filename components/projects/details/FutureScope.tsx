import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";

type FutureScopeProps = {
  items: string[];
};

export function FutureScope({ items }: FutureScopeProps) {
  return (
    <Reveal delay={0.05}>
      <Card className="h-full rounded-[2rem] bg-surface/95">
        <CardContent className="space-y-5 p-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
              Future Scope
            </p>
            <h2 className="mt-2 text-2xl font-black text-foreground">
              What I would build next
            </h2>
          </div>
          <div className="grid gap-3">
            {items.map((item, index) => (
              <div
                key={item}
                className="flex gap-3 rounded-2xl border border-border bg-background/70 p-4 text-sm leading-6 text-muted-foreground"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-xs font-black text-accent-foreground">
                  {index + 1}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}
