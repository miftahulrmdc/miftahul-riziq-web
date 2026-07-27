"use client";

import { motion } from "framer-motion";
import { Activity, Cloud, Database, Network, Server, Shield } from "lucide-react";
import { skillGroups, type SkillGroup } from "@/content/skills";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeUp, VIEWPORT } from "@/lib/motion";

const ICONS = {
  server: Server,
  network: Network,
  cloud: Cloud,
  activity: Activity,
  shield: Shield,
  database: Database,
} as const;

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Skills"
          title="The stack I"
          accent="actually run"
          description="Self-assessed proficiency, calibrated honestly — anything above 80 is something I would happily be interviewed on in depth."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.title} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const Icon = ICONS[group.icon];

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={fadeUp}
      transition={{ delay: (index % 3) * 0.08 }}
      className="glass hover-lift group flex flex-col rounded-3xl p-6"
    >
      <header className="flex items-center gap-3.5">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-400/10 dark:text-brand-400">
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          <h3 className="font-display font-bold">{group.title}</h3>
          <p className="mt-0.5 truncate text-xs text-ink-faint">
            {group.description}
          </p>
        </div>
      </header>

      <ul className="mt-6 flex flex-col gap-4">
        {group.skills.map((skill, i) => (
          <li key={skill.name}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <span className="text-sm font-medium">{skill.name}</span>
              <span className="shrink-0 text-xs font-semibold tabular-nums text-ink-faint">
                {skill.level}%
              </span>
            </div>

            {/* Progress bar. role="meter" gives assistive tech the value
                without needing the visual width. */}
            <div
              role="meter"
              aria-valuenow={skill.level}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={skill.name}
              className="h-1.5 overflow-hidden rounded-full bg-line"
            >
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={VIEWPORT}
                transition={{
                  duration: 1.1,
                  delay: 0.15 + i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
