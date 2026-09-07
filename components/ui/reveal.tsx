"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before this element starts animating. */
  delay?: number;
  variants?: Variants;
  as?: ElementType;
};

/**
 * Scroll-triggered reveal. Animates once when the element scrolls into view.
 * Framer Motion drops the transform entirely when the user prefers reduced
 * motion, so this degrades to a plain fade.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  /** Gap in seconds between each child animating in. */
  gap?: number;
  delay?: number;
  as?: ElementType;
};

/**
 * Wraps a list so its children reveal one after another. Children must be
 * `motion` elements using the `hidden` / `show` variant keys — `RevealItem`
 * below is the ready-made one.
 */
export function StaggerGroup({
  children,
  className,
  gap = 0.09,
  delay = 0,
  as = "div",
}: StaggerGroupProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={stagger(gap, delay)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  variants = fadeUp,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  as?: ElementType;
}) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}
