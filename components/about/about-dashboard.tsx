"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  aboutCapabilities,
  aboutDrivers,
  aboutJourney,
  aboutStats,
  profile,
} from "@/data/profile";

export function AboutDashboard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="space-y-10">
      <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(220px,40vw)] sm:items-center sm:gap-8 xl:grid-cols-[1fr_520px]">
        <div className="space-y-6">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <p className="text-xs font-black uppercase tracking-[0.28em] text-accent">
              About WishMaster01
            </p>
            <h1 className="mt-3 text-[clamp(1.9rem,8vw,4rem)] font-black leading-tight tracking-[-0.05em] text-foreground sm:text-6xl">
              Building practical AI, SaaS, and full-stack product experiences.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground sm:mt-5 sm:text-base sm:leading-8">
              I&apos;m WishMaster01, a {profile.role}. I build structured,
              scalable, and user-centered web applications with a strong focus
              on product clarity, maintainable architecture, and production
              readiness.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            {aboutStats.map((item, index) => (
              <motion.div
                key={item.label}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.05, duration: 0.35 }}
              >
                <Card className="h-full overflow-hidden rounded-2xl bg-surface/95 sm:rounded-3xl">
                  <CardContent className="relative p-3 sm:p-5">
                    <div className="absolute right-0 top-0 h-14 w-14 rounded-bl-full bg-accent/10 sm:h-20 sm:w-20" />
                    <p className="relative text-xl font-black text-accent sm:text-3xl">
                      {item.value}
                    </p>
                    <p className="relative mt-1 text-xs font-black text-foreground sm:text-base">
                      {item.label}
                    </p>
                    <p className="relative mt-2 hidden text-sm leading-6 text-muted-foreground sm:mt-3 sm:block">
                      {item.detail}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative hidden sm:block sm:min-h-[380px] xl:min-h-[460px]"
        >
          <div className="absolute inset-3 rounded-[2rem] bg-accent/10 blur-2xl sm:inset-6 sm:rounded-[3rem] sm:blur-3xl" />
          <div className="absolute right-2 top-5 h-20 w-16 bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_45%,transparent)_1.5px,transparent_1.5px)] [background-size:14px_14px] sm:right-6 sm:top-8 sm:h-32 sm:w-24" />
          <div className="about-character-frame relative z-10 mx-auto flex h-[220px] w-full max-w-[150px] items-end justify-center overflow-hidden rounded-2xl border border-border bg-surface/80 shadow-xl shadow-foreground/5 sm:h-[380px] sm:max-w-[430px] sm:rounded-[2.25rem] xl:h-[460px] xl:max-w-[520px]">
            <Image
              src="/about-page-character-cutout.png"
              alt="WishMaster01 about page character"
              width={540}
              height={520}
              priority
              className="about-character-image h-[205px] w-auto object-contain sm:h-[350px] xl:h-[430px]"
            />
          </div>
          <div className="absolute bottom-3 left-1/2 z-20 hidden w-[min(86%,360px)] -translate-x-1/2 rounded-2xl border border-border bg-surface/90 p-4 text-center shadow-xl shadow-foreground/10 backdrop-blur sm:block xl:bottom-7">
            <p className="font-black text-foreground">
              Available for opportunities
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Full-stack, AI, SaaS, and product UI work.
            </p>
          </div>
        </motion.div>
      </div>

      <section className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div>
          <div className="mb-5">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-accent">
              What drives me
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-foreground">
              Engineering habits behind the portfolio
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {aboutDrivers.map((item, index) => (
              <motion.div
                key={item.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: (index % 4) * 0.05, duration: 0.35 }}
              >
                <Card className="group h-full rounded-[2rem] bg-surface/95 transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10">
                  <CardContent className="p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-sm font-black text-accent-foreground">
                      {index + 1}
                    </span>
                    <h3 className="mt-5 text-xl font-black text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <aside className="space-y-6 xl:sticky xl:top-28 xl:self-start">
          <Card className="overflow-hidden rounded-[2rem] bg-accent text-accent-foreground shadow-xl shadow-accent/20">
            <CardContent className="p-6">
              <h2 className="font-black">Focus areas</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {profile.focusAreas.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-background/15 px-3 py-1.5 text-xs font-black"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] bg-surface/95">
            <CardContent className="p-6">
              <h2 className="font-black text-foreground">Principles</h2>
              <div className="mt-5 space-y-4">
                {profile.principles.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-border bg-background/70 p-4"
                  >
                    <p className="font-black text-foreground">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </section>

      <section>
        <div className="mb-5">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-accent">
            Capability Map
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-foreground">
            What I can execute across a product
          </h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {aboutCapabilities.map((group, index) => (
            <motion.div
              key={group.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.05, duration: 0.35 }}
            >
              <Card className="h-full rounded-[2rem] bg-surface/95">
                <CardContent className="p-6">
                  <h3 className="text-xl font-black text-foreground">
                    {group.title}
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-bold text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-6 text-center">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-accent">
            My Journey
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-foreground">
            From fundamentals to production-minded products
          </h2>
        </div>
        <div className="relative grid gap-5 lg:grid-cols-5">
          {aboutJourney.map((item, index) => (
            <motion.div
              key={item.year}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.05, duration: 0.35 }}
              className="relative"
            >
              {index < aboutJourney.length - 1 ? (
                <span className="absolute left-10 right-[-1.25rem] top-10 hidden h-px bg-accent/30 lg:block" />
              ) : null}
              <Card className="relative h-full rounded-[2rem] bg-surface/95">
                <CardContent className="p-5">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-sm font-black text-accent-foreground">
                    {item.year}
                  </span>
                  <h3 className="mt-5 font-black text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
