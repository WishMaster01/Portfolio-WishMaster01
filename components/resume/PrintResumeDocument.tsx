import { education, experienceItems } from "@/data/experience";
import { projects } from "@/data/projects";
import { resume } from "@/data/resume";
import { skillGroups } from "@/data/skills";

export function PrintResumeDocument() {
  return (
    <article
      className="print-resume mx-auto max-w-[780px] bg-white p-0 text-[#111827]"
      style={{ display: "none" }}
    >
      <header className="border-b-2 border-[#111827] pb-3">
        <h1 className="text-3xl font-black tracking-[-0.04em]">
          {resume.name}
        </h1>
        <p className="mt-1 text-base font-bold">{resume.title}</p>
        <p className="mt-2 text-[11px] leading-5">
          {resume.location} | {resume.email} | {resume.github} |{" "}
          {resume.portfolio}
        </p>
      </header>

      <section className="mt-4">
        <h2 className="resume-print-heading">Profile</h2>
        <p className="mt-1 text-[11px] leading-5">{resume.summary}</p>
      </section>

      <div className="mt-4 grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <section>
            <h2 className="resume-print-heading">Experience</h2>
            <div className="mt-2 space-y-3">
              {experienceItems.slice(0, 3).map((item) => (
                <div key={`${item.company}-${item.title}`}>
                  <div className="flex justify-between gap-3">
                    <h3 className="text-[12px] font-black">{item.title}</h3>
                    <span className="shrink-0 text-[10px] font-bold">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-[#4f46e5]">
                    {item.company}
                  </p>
                  <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[10px] leading-4">
                    {item.achievements.slice(0, 2).map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="resume-print-heading">Projects</h2>
            <div className="mt-2 space-y-2">
              {projects.slice(0, 5).map((project) => (
                <div key={project.slug}>
                  <h3 className="text-[11px] font-black">{project.title}</h3>
                  <p className="text-[10px] leading-4">
                    {project.summary} Stack: {project.stack.slice(0, 4).join(", ")}.
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-4">
          <section>
            <h2 className="resume-print-heading">Skills</h2>
            <div className="mt-2 space-y-2">
              {skillGroups.slice(0, 6).map((group) => (
                <p key={group.title} className="text-[10px] leading-4">
                  <span className="font-black">{group.title}:</span>{" "}
                  {group.skills.join(", ")}
                </p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="resume-print-heading">Education</h2>
            <div className="mt-2">
              <h3 className="text-[11px] font-black">{education.degree}</h3>
              <p className="text-[10px] font-bold text-[#4f46e5]">
                {education.institution} | {education.period}
              </p>
              <p className="mt-1 text-[10px] leading-4">
                {education.coursework}
              </p>
            </div>
          </section>

          <section>
            <h2 className="resume-print-heading">Achievements</h2>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-[10px] leading-4">
              {resume.achievements.slice(0, 4).map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="resume-print-heading">Certifications</h2>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-[10px] leading-4">
              {resume.certifications.map((certification) => (
                <li key={certification.title}>
                  <span className="font-black">{certification.title}</span> -{" "}
                  {certification.issuer}, {certification.year}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
}
