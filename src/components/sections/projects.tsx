"use client";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Cloud,
  Database,
  Github,
  Layers,
  Network,
  Server,
  Shield,
  Terminal,
} from "lucide-react";
import { projects, type Project } from "@/content/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { fadeUp, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ICONS = {
  server: Server,
  cloud: Cloud,
  terminal: Terminal,
  shield: Shield,
  activity: Activity,
  layers: Layers,
  database: Database,
  network: Network,
} as const;

export function Projects() {
  return (
    <section id="projects" className="section bg-surface-muted/40">
      <div className="container-page">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've"
          accent="built and broken"
          description="Infrastructure work is hard to screenshot, so each card states what it does and what measurably improved because of it."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = ICONS[project.icon];

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={fadeUp}
      transition={{ delay: (index % 3) * 0.08 }}
      className={cn(
        "glass hover-lift group relative flex flex-col overflow-hidden rounded-3xl",
        // The featured card spans two columns and gets the emerald treatment.
        project.featured && "md:col-span-2 lg:col-span-2",
      )}
    >
      {/* Architecture placeholder — a schematic band rather than a grey box. */}
      <div
        className={cn(
          "relative flex h-40 items-center justify-center overflow-hidden border-b border-line",
          project.featured
            ? "bg-gradient-to-br from-brand-600 to-brand-800"
            : "bg-gradient-to-br from-brand-50 to-brand-100/40 dark:from-brand-400/10 dark:to-brand-600/5",
        )}
      >
        <div className="bg-grid absolute inset-0 opacity-[0.35]" />

        <Icon
          className={cn(
            "relative size-12 transition-transform duration-500 group-hover:scale-110",
            project.featured ? "text-white/90" : "text-brand-600 dark:text-brand-400",
          )}
        />

        {project.featured ? (
          <span className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
            Featured
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-bold">{project.title}</h3>
        <p className="mt-1 text-sm font-medium text-brand-700 dark:text-brand-300">
          {project.subtitle}
        </p>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
          {project.description}
        </p>

        {/* Outcome — the part a hiring manager actually scans for. */}
        <p className="mt-4 rounded-xl border border-brand-600/15 bg-brand-50/60 px-3.5 py-2.5 text-xs font-medium text-brand-800 dark:border-brand-400/15 dark:bg-brand-400/8 dark:text-brand-200">
          {project.outcome}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line bg-surface/60 px-2.5 py-1 text-[11px] font-medium text-ink-soft"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* Buttons render only when a real URL exists — an empty "Demo" link
            that goes nowhere is worse than no button. */}
        {project.repo || project.demo ? (
          <div className="mt-6 flex gap-2 border-t border-line pt-5">
            {project.repo ? (
              <Button asChild variant="outline" size="sm">
                <a href={project.repo} target="_blank" rel="noreferrer noopener">
                  <Github />
                  Code
                </a>
              </Button>
            ) : null}
            {project.demo ? (
              <Button asChild size="sm">
                <a href={project.demo} target="_blank" rel="noreferrer noopener">
                  <ArrowUpRight />
                  Live Demo
                </a>
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}
