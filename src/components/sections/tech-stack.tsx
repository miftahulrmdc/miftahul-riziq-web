"use client";

import { motion } from "framer-motion";
import { techStack } from "@/content/tech-stack";
import { TechIcon } from "@/components/ui/tech-icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { scaleIn, VIEWPORT } from "@/lib/motion";

export function TechStack() {
  return (
    <section id="stack" className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Tools of the"
          accent="trade"
          description="What I reach for day to day, at work and in the rack at home."
        />

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
          className="mt-14 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6"
        >
          {techStack.map((tech) => (
            <motion.li key={tech.slug} variants={scaleIn}>
              <div className="glass hover-lift group flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl p-3">
                <TechIcon
                  slug={tech.slug}
                  className="size-8 text-ink-soft transition-all duration-300 group-hover:scale-110 group-hover:text-brand-700 dark:group-hover:text-brand-400"
                />
                <span className="text-center text-[11px] font-semibold text-ink-soft transition-colors group-hover:text-ink">
                  {tech.name}
                </span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
