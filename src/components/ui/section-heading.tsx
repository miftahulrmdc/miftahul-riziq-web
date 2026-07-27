"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, VIEWPORT } from "@/lib/motion";

interface SectionHeadingProps {
  /** Small uppercase label above the title. */
  eyebrow: string;
  title: string;
  /** Optional emerald-gradient continuation of the title. */
  accent?: string;
  /** Put the accent on its own line instead of flowing after the title. */
  accentBlock?: boolean;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Shared section header. Using one component everywhere is what keeps the
 * vertical rhythm identical from section to section.
 */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  accentBlock = false,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <motion.header
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      className={cn(
        "flex flex-col gap-4",
        centered ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <motion.div variants={fadeUp}>
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/20 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700 dark:border-brand-400/20 dark:bg-brand-400/10 dark:text-brand-300">
          <span className="size-1.5 rounded-full bg-brand-500" />
          {eyebrow}
        </span>
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className="max-w-3xl text-4xl font-bold leading-[1.1] sm:text-5xl"
      >
        {title}
        {accent ? (
          // `block` forces its own line; otherwise it flows inline after the
          // title with a leading space.
          <span
            className={cn(
              "text-gradient",
              // On its own line the accent reads as a subheading, so it sits a
              // little smaller. `em` scales with the parent, which keeps the
              // ratio identical at every breakpoint — change 0.82 to resize.
              accentBlock ? "block text-[0.82em]" : "inline",
            )}
          >
            {accentBlock ? accent : ` ${accent}`}
          </span>
        ) : null}
      </motion.h2>

      {description ? (
        <motion.p
          variants={fadeUp}
          className={cn(
            "max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg",
            centered && "mx-auto",
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.header>
  );
}
