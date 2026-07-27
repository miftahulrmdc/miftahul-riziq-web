"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/content/profile";

/**
 * Intro overlay with an animated "MR" monogram.
 *
 * Deliberately short (~1.4s) and skipped entirely for reduced-motion users:
 * a splash screen that outstays its welcome is an obstacle, not a flourish.
 */
export function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }

    // Lock scrolling while the overlay is up so the page cannot move underneath.
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => setDone(true), 1400);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] grid place-items-center bg-surface"
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col items-center gap-8">
            {/* Monogram: the stroke draws itself, then the fill fades in. */}
            <motion.svg
              viewBox="0 0 120 120"
              className="size-24"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.rect
                x="6"
                y="6"
                width="108"
                height="108"
                rx="28"
                fill="none"
                stroke="var(--color-brand-600)"
                strokeWidth="3"
                initial={{ pathLength: 0, opacity: 0.2 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.text
                x="60"
                y="60"
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-brand-600 font-display"
                style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-0.04em" }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
              >
                {profile.initials}
              </motion.text>
            </motion.svg>

            {/* Indeterminate progress sliver */}
            <div className="h-0.5 w-40 overflow-hidden rounded-full bg-line">
              <motion.div
                className="h-full w-full rounded-full bg-brand-600"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            <motion.p
              className="text-xs font-medium uppercase tracking-[0.28em] text-ink-faint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Booting infrastructure
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
