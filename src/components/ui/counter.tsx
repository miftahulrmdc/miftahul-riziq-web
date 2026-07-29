"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  /** Animation length in ms. */
  duration?: number;
  className?: string;
}

/**
 * Counts up from zero the first time it scrolls into view.
 *
 * Driven by rAF rather than a motion value so the displayed number can be
 * formatted to a fixed decimal count without flicker.
 */
export function Counter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1600,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // No negative margin: the hero stats sit near the bottom edge on a phone, and
  // requiring them to be 60px inside the viewport meant they could load visible
  // but never start counting.
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    // Respect the user's motion preference: jump straight to the final value.
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo — fast start, long settle. Reads as "precise" rather than linear.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      if (progress < 1) {
        setDisplay(value * eased);
        frame = requestAnimationFrame(tick);
      } else {
        // Land on the exact number rather than value * 0.99999.
        setDisplay(value);
      }
    };

    frame = requestAnimationFrame(tick);

    // Safety net. requestAnimationFrame is throttled or paused entirely while
    // the tab is in the background or the window is unfocused, which leaves the
    // number frozen part-way — the counter shows 0+ while its neighbours have
    // finished. A stat like years of experience must never depend on an
    // animation completing, so force the final value once the run should be over.
    const settle = setTimeout(() => setDisplay(value), duration + 600);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settle);
    };
  }, [inView, value, duration]);

  // Last resort, independent of the observer. If the element never registers as
  // in view — a missed IntersectionObserver callback, a browser that pauses
  // observers on a backgrounded tab — the count-up never starts and the number
  // sits at zero. "0+ years in IT" on a portfolio is a damaging thing to show,
  // so after a grace period the real figure is put on screen regardless.
  useEffect(() => {
    const fallback = setTimeout(() => {
      setDisplay((current) => (current === 0 && value !== 0 ? value : current));
    }, 3000);
    return () => clearTimeout(fallback);
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
