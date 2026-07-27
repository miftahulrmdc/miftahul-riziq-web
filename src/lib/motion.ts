import type { Variants, Transition } from "framer-motion";

/**
 * Shared motion vocabulary.
 *
 * Every section reuses these so the whole site eases identically — mixing
 * bespoke curves per component is the fastest way to make a site feel amateur.
 */

/** Long, decelerating curve. Matches --ease-out-quint in globals.css. */
export const EASE_OUT_QUINT: Transition["ease"] = [0.22, 1, 0.36, 1];

/** Default viewport config: fire once, slightly before the element is centred. */
export const VIEWPORT = { once: true, margin: "-80px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_QUINT },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT_QUINT } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_OUT_QUINT },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_OUT_QUINT },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_OUT_QUINT },
  },
};

/**
 * Parent variant that cascades children.
 * `staggerChildren` is kept short — long cascades feel sluggish on grids.
 */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});
