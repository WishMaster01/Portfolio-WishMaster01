import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about WishMaster01, full-stack AI and SaaS development focus, values, and journey.",
};

const stats = [
  { value: "2+", label: "Years of Experience" },
  { value: "15+", label: "Projects Completed" },
  { value: "500+", label: "DSA Problems" },
  { value: "10+", label: "Certifications" },
] as const;

const drivers = [
  {
    icon: "Doc",
    title: "Problem Solver",
    description:
      "I love solving real-world problems using code and creating impactful solutions.",
  },
  {
    icon: "Chat",
    title: "Lifelong Learner",
    description:
      "Always exploring new technologies, frameworks and better ways to build.",
  },
  {
    icon: "Link",
    title: "Clean & Scalable Code",
    description:
      "I write maintainable, efficient and scalable code with best practices.",
  },
  {
    icon: "Home",
    title: "Building for Impact",
    description:
      "I build products that create value and make a positive difference.",
  },
] as const;

const journey = [
  { year: "2022", text: "Started my coding journey" },
  { year: "2023", text: "Built my first full-stack applications" },
  { year: "2024", text: "Explored AI & SaaS products" },
  { year: "2025", text: "Building scalable solutions & helping users" },
] as const;

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="mx-auto w-full max-w-[1680px] px-5 py-16 sm:px-8 lg:px-14">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              About Me
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              Get to know me better
            </p>
            <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground">
              I&apos;m WishMaster01, a passionate Full-Stack AI &amp; SaaS
              Developer who loves building intelligent, scalable and
              user-centric applications. I enjoy turning ideas into real
              products that solve meaningful problems.
            </p>

            <Card className="mt-10 overflow-hidden rounded-2xl">
              <CardContent className="grid divide-y divide-border p-0 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
                {stats.map((item) => (
                  <div key={item.label} className="px-6 py-6">
                    <p className="text-2xl font-black text-accent">
                      {item.value}
                    </p>
                    <p className="mt-1 text-xs font-medium text-muted-foreground">
                      {item.label}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.08} className="relative min-h-[420px]">
            <div className="absolute left-1/2 top-1/2 h-[370px] w-[370px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10" />
            <div className="absolute right-[12%] top-[14%] h-32 w-24 bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_45%,transparent)_1.5px,transparent_1.5px)] [background-size:14px_14px]" />
            <div className="about-character-frame relative z-10 mx-auto flex h-[420px] w-full max-w-[540px] items-end justify-center overflow-hidden rounded-[2rem]">
              <Image
                src="/about-page-character-cutout.png"
                alt="WishMaster01 about page character"
                width={540}
                height={520}
                priority
                className="about-character-image h-[400px] w-auto object-contain"
              />
            </div>
          </Reveal>
        </div>

        <section className="mt-16">
          <h2 className="text-center text-lg font-black">What Drives Me</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {drivers.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
              <Card className="rounded-2xl">
                <CardContent className="p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-xs font-black text-accent">
                    {item.icon}
                  </span>
                  <h3 className="mt-5 font-black">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-center text-lg font-black">My Journey</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {journey.map((item, index) => (
              <Reveal key={item.year} delay={index * 0.05} className="relative">
                {index < journey.length - 1 ? (
                  <span className="absolute left-6 right-[-1.5rem] top-8 hidden h-px bg-accent/35 md:block" />
                ) : null}
                <p className="text-sm font-black text-accent">{item.year}</p>
                <div className="relative mt-4 h-3 w-3 rounded-full bg-accent" />
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {item.text}
                </p>
              </Reveal>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
