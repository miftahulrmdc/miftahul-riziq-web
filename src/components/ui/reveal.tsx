"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { fadeUp, VIEWPORT } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  /** Override the default fade-up animation. */
  variants?: Variants;
  /** Seconds to wait before animating — useful for manual sequencing. */
  delay?: number;
  className?: string;
  /** Render as something other than a div (e.g. "li", "section"). */
  as?: ElementType;
}

/**
 * Scroll-triggered entrance wrapper.
 *
 * Fires once when the element nears the viewport. All decorative motion is
 * disabled globally under `prefers-reduced-motion` via globals.css, so this
 * stays accessible without a per-component check.
 */
export function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  className,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Parent that cascades `Reveal`-style children.
 * Children must declare their own variants (e.g. `variants={fadeUp}`).
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </motion.div>
  );
}
