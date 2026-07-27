"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Soft emerald light that trails the pointer.
 *
 * The native cursor is left completely alone — this is ambient lighting only,
 * not a cursor replacement. Skipped on touch devices (no pointer to follow) and
 * when the visitor prefers reduced motion.
 *
 * To remove the effect entirely, delete <CursorGlow /> from app/layout.tsx.
 */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-500);
  const y = useMotionValue(-500);

  // Low stiffness: the glow drifts after the pointer rather than sticking to it.
  const glowX = useSpring(x, { stiffness: 90, damping: 22, mass: 0.8 });
  const glowY = useSpring(y, { stiffness: 90, damping: 22, mass: 0.8 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    // Park the glow off-screen when the pointer leaves the window.
    const onLeave = () => {
      x.set(-500);
      y.set(-500);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 mix-blend-multiply blur-[90px] dark:mix-blend-screen"
      style={{
        x: glowX,
        y: glowY,
        background: "radial-gradient(circle, rgb(34 197 94 / 0.30) 0%, transparent 65%)",
      }}
    />
  );
}
