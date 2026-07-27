"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  GraduationCap,
  Lock,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { about } from "@/content/about";
import { profile } from "@/content/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { fadeUp, slideInRight } from "@/lib/motion";
import { cn } from "@/lib/utils";

const PILLAR_ICONS = {
  "shield-check": ShieldCheck,
  lock: Lock,
  workflow: Workflow,
  "file-text": FileText,
} as const;

export function About() {
  return (
    <section id="about" className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow={about.eyebrow}
          title={about.title}
          accent={about.subtitle}
          accentBlock
          align="left"
          className="max-w-3xl"
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* ---------- Narrative ---------- */}
          <RevealGroup className="flex flex-col gap-6">
            {about.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className={cn(
                  "leading-relaxed text-ink-soft",
                  // Lead paragraph gets slightly more weight and size.
                  i === 0 && "text-lg text-ink",
                )}
              >
                {para}
              </motion.p>
            ))}

            {/* Education */}
            <motion.div
              variants={fadeUp}
              className="glass mt-2 flex items-start gap-4 rounded-2xl p-5"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400">
                <GraduationCap className="size-5" />
              </span>
              <div>
                <p className="font-display font-semibold">
                  {profile.education.degree}
                </p>
                <p className="mt-0.5 text-sm text-ink-soft">
                  {profile.education.institution} · {profile.education.location}
                </p>
                <p className="mt-1 text-xs font-medium text-ink-faint">
                  {profile.education.period}
                </p>
              </div>
            </motion.div>

            {/* Career trajectory */}
            <motion.div variants={fadeUp} className="mt-2">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
                Career trajectory
              </p>
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
                {about.trajectory.map((step, i) => (
                  <li key={step.label} className="flex items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full px-3.5 py-1.5 text-xs font-semibold",
                        step.state === "current"
                          ? "bg-brand-600 text-white shadow-[0_6px_16px_-6px_rgb(22_163_74/0.7)]"
                          : step.state === "next"
                            ? "border border-brand-600/30 bg-brand-50 text-brand-700 dark:bg-brand-400/10 dark:text-brand-300"
                            : "border border-line text-ink-faint",
                      )}
                    >
                      {step.label}
                    </span>
                    {i < about.trajectory.length - 1 ? (
                      <ArrowRight className="size-3.5 shrink-0 text-ink-faint" />
                    ) : null}
                  </li>
                ))}
              </ol>
            </motion.div>
          </RevealGroup>

          {/* ---------- Pillars ---------- */}
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1" stagger={0.1}>
            {about.pillars.map((pillar) => {
              const Icon = PILLAR_ICONS[pillar.icon];
              return (
                <motion.article
                  key={pillar.title}
                  variants={slideInRight}
                  className="glass hover-lift group rounded-2xl p-5"
                >
                  <span className="mb-4 grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-400/10 dark:text-brand-400">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-display text-base font-semibold">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    {pillar.body}
                  </p>
                </motion.article>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
