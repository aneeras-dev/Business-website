import type { Transition, Variants } from "framer-motion";

/** Smooth, slightly-overshooting ease used across the page. */
export const EASE: Transition["ease"] = [0.16, 1, 0.3, 1];

/** Standard "rise into place" reveal for headings, copy, and cards. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: EASE },
  },
};

/**
 * Parent container that walks its children in sequence. Pair with `fadeUp`
 * (or any variant using the same `hidden`/`show` keys) on each child.
 */
export function stagger(staggerChildren = 0.09, delayChildren = 0): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren, delayChildren },
    },
  };
}

/** Shared viewport config: fire once, slightly before the element is centred. */
export const viewportOnce = { once: true, margin: "-80px" } as const;
