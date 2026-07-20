import { Reveal } from "@/components/motion/reveal";

type RecruiterSkillsProps = {
  skills: string[];
};

export function RecruiterSkills({ skills }: RecruiterSkillsProps) {
  return (
    <section id="skills" aria-labelledby="recruiter-skills-heading">
      <Reveal>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
          Top skills
        </p>
        <h2
          id="recruiter-skills-heading"
          className="mt-3 text-3xl font-black tracking-[-0.045em] sm:text-4xl"
        >
          Practical stack recruiters can scan fast
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {skills.slice(0, 16).map((skill, index) => (
          <Reveal key={skill} delay={index * 0.025}>
            <div className="rounded-2xl border border-border bg-surface/85 p-4 shadow-sm shadow-foreground/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-accent/5">
              <span className="text-xs font-black text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-sm font-black">{skill}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
