import { Reveal } from "@/components/motion/reveal";

type LessonSectionProps = {
  lessons: string[];
};

export function LessonSection({ lessons }: LessonSectionProps) {
  return (
    <section aria-labelledby="lessons-heading">
      <Reveal>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
          Engineering reflection
        </p>
        <h2
          id="lessons-heading"
          className="mt-3 text-3xl font-black tracking-[-0.045em] sm:text-4xl"
        >
          Lessons that improve the next build
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {lessons.map((lesson, index) => (
          <Reveal key={lesson} delay={index * 0.04}>
            <article className="flex h-full gap-4 rounded-[2rem] border border-border bg-surface/85 p-5 shadow-sm shadow-foreground/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-accent/40 sm:p-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent text-sm font-black text-accent-foreground">
                {index + 1}
              </span>
              <p className="text-sm leading-7 text-muted-foreground">
                {lesson}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
