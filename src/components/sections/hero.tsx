"use client";

import { motion } from "framer-motion";
import { ArrowDown, Linkedin, Mail, MapPin } from "lucide-react";
import { profile } from "@/content/profile";
import { useTypewriter } from "@/hooks/use-typewriter";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { HeroVisual } from "@/components/sections/hero-visual";
import { fadeUp, stagger } from "@/lib/motion";

export function Hero() {
  const typed = useTypewriter(profile.roles);

  return (
    // items-start, not items-center: centring inside a full-height section
    // means the taller the visitor's screen, the further the content sinks
    // below the navbar. Anchoring to the top keeps the gap constant everywhere.
    <section id="home" className="relative flex min-h-svh items-start pt-28 sm:pt-32">
      <div className="container-page grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        {/* ---------------- Copy ---------------- */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger(0.09, 0.15)}
          className="flex flex-col items-start"
        >
          {/* Availability badge — text lives in content/profile.ts, and setting
              it to null removes the badge entirely. */}
          {profile.availability ? (
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/20 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-700 dark:border-brand-400/20 dark:bg-brand-400/10 dark:text-brand-300">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-500 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-brand-500" />
                </span>
                {profile.availability}
              </span>
            </motion.div>
          ) : null}

          <motion.p
            variants={fadeUp}
            className="mt-8 text-lg font-medium text-ink-soft"
          >
            Hi, I&rsquo;m
          </motion.p>

          {/* Three typography knobs, in the order you are most likely to touch:
                text-5xl / sm:text-6xl / lg:text-7xl → size at each breakpoint
                leading-[1.05]                       → line height
                tracking-[-0.02em]                   → letter spacing
              Lower tracking = tighter letters. Lower leading = tighter lines. */}
          <motion.h1
            variants={fadeUp}
            className="mt-2 text-5xl font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-6xl lg:text-7xl"
          >
            {profile.name}
          </motion.h1>

          {/* Typing line. The animated text is hidden from assistive tech and a
              static equivalent is exposed instead — a screen reader announcing
              one character at a time would be unusable. */}
          <motion.div
            variants={fadeUp}
            className="mt-5 flex h-10 items-center text-xl font-semibold sm:text-2xl"
          >
            <span aria-hidden className="text-gradient">
              {typed}
            </span>
            <span
              aria-hidden
              className="animate-caret ml-1 inline-block h-[1.15em] w-[3px] rounded-full bg-brand-500"
            />
            <span className="sr-only">
              {profile.role}. Also: {profile.roles.join(", ")}.
            </span>
          </motion.div>

          {/* Justified only from lg up. Justification distributes leftover
              space across a line, so it needs roughly 45-75 characters to hide
              that space. A phone column fits about 40, which forces the gaps
              into visible rivers and hyphenates words mid-thought. Ragged right
              is the correct setting at that width, not a compromise. */}
          <motion.p
            variants={fadeUp}
            lang="en"
            className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg lg:hyphens-auto lg:text-justify"
          >
            {profile.intro}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-ink-faint"
          >
            <MapPin className="size-4" />
            {profile.location}
          </motion.div>

          {/* CTAs */}
          {/* Full width and stacked on phones: two pills of different widths
              left-aligned read as ragged. They sit side by side from sm up. */}
          <motion.div
            variants={fadeUp}
            className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center"
          >
            {/* Contact is the primary action now that the CV is not published. */}
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href="#contact">
                <Mail />
                Contact Me
              </a>
            </Button>

            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Linkedin />
                LinkedIn
              </a>
            </Button>

          </motion.div>

          {/* Stats */}
          <motion.dl
            variants={fadeUp}
            className="mt-12 grid w-full max-w-lg grid-cols-3 gap-4 border-t border-line pt-8"
          >
            {profile.stats.map((stat) => (
              <div key={stat.label}>
                {/* Value first, then label — reversed visually with flex-col so
                    the number reads large above its caption, without repeating
                    the label for screen readers. */}
                <div className="flex flex-col">
                  <dd className="font-display text-3xl font-bold text-brand-700 dark:text-brand-400">
                    <Counter
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={"decimals" in stat ? stat.decimals : 0}
                    />
                  </dd>
                  {/* min-h keeps the row's baseline even on phones, where
                      "Services self-hosted" wraps to two lines and the others
                      do not. Released at sm, where all three fit on one line. */}
                  <dt className="mt-1 min-h-8 text-xs font-medium leading-tight text-ink-faint sm:min-h-0">
                    {stat.label}
                  </dt>
                </div>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ---------------- Visual ---------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
        >
          <HeroVisual />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-faint transition-colors hover:text-brand-700 sm:flex"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.24em]">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
