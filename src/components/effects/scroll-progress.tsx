"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Emerald progress bar pinned to the top of the viewport.
 * Spring-smoothed so fast wheel scrolling does not make it jitter.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 34,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-brand-600 via-brand-400 to-brand-600"
    />
  );
}
