"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Building2, Calendar, Cloud, MapPin, Server, Wrench } from "lucide-react";
import { experience, type ExperienceItem } from "@/content/experience";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeUp, VIEWPORT } from "@/lib/motion";

const ICONS = { server: Server, cloud: Cloud, wrench: Wrench } as const;

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);

  // The rail "draws" itself as the timeline scrolls through the viewport.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 65%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="section bg-surface-muted/40">
      <div className="container-page">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've"
          accent="operated"
          description="Five years across enterprise data centres, managed services and hybrid cloud infrastructure."
        />

        <div ref={timelineRef} className="relative mt-16">
          {/* Rail — track plus the emerald fill that follows scroll. */}
          <div
            aria-hidden
            className="absolute left-5 top-2 hidden h-[calc(100%-1rem)] w-px bg-line sm:block"
          >
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="h-full w-full bg-gradient-to-b from-brand-500 via-brand-600 to-brand-500"
            />
          </div>

          <ol className="flex flex-col gap-8">
            {experience.map((item, i) => (
              <TimelineCard key={item.company} item={item} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ item, index }: { item: ExperienceItem; index: number }) {
  const Icon = ICONS[item.icon];

  return (
    <motion.li
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={fadeUp}
      transition={{ delay: index * 0.06 }}
      className="relative sm:pl-16"
    >
      {/* Node marker on the rail */}
      <span
        aria-hidden
        className="absolute left-0 top-6 hidden size-10 place-items-center rounded-full border border-line bg-surface shadow-[var(--shadow-soft)] sm:grid"
      >
        <Icon className="size-4 text-brand-600 dark:text-brand-400" />
        {item.current ? (
          <span className="absolute inset-0 rounded-full border-2 border-brand-500/50 [animation:pulse-ring_2.4s_ease-out_infinite]" />
        ) : null}
      </span>

      <article className="glass hover-lift rounded-3xl p-6 sm:p-8">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-xl font-bold sm:text-2xl">
                {item.role}
              </h3>
              {item.current ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  <span className="size-1.5 rounded-full bg-white" />
                  Current
                </span>
              ) : null}
            </div>

            <p className="mt-1.5 inline-flex items-center gap-2 font-medium text-brand-700 dark:text-brand-300">
              <Building2 className="size-4" />
              {item.company}
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-1.5 text-sm text-ink-faint sm:items-end">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              {item.period}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              {item.location}
            </span>
          </div>
        </header>

        <p className="mt-5 leading-relaxed text-ink-soft">{item.summary}</p>

        <ul className="mt-5 flex flex-col gap-2.5">
          {item.highlights.map((point) => (
            <li key={point} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
              <span
                aria-hidden
                className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-brand-500"
              />
              {point}
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
          {item.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line bg-surface/60 px-3 py-1 text-xs font-medium text-ink-soft"
            >
              {tech}
            </li>
          ))}
        </ul>
      </article>
    </motion.li>
  );
}
