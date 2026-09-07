"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
  align?: "center" | "left";
  /** Renders for placement on a dark band. */
  tone?: "light" | "dark";
  /** Heading id, so the parent <section> can point aria-labelledby at it. */
  id?: string;
};

/**
 * Section opener in the house style: a small tracked-out teal label, an
 * oversized Bricolage headline, then a short line of muted copy.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "center",
  tone = "light",
  id,
}: SectionHeadingProps) {
  const onDark = tone === "dark";

  return (
    <motion.div
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <motion.p variants={fadeUp} className={cn("eyebrow", onDark && "text-teal-400")}>
        {eyebrow}
      </motion.p>

      <motion.h2
        id={id}
        variants={fadeUp}
        className={cn(
          "font-display mt-5 text-[2.5rem] text-balance sm:text-[3.5rem] lg:text-[4.25rem]",
          onDark && "text-white"
        )}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          variants={fadeUp}
          className={cn(
            "mx-auto mt-5 max-w-xl text-[16.5px] leading-relaxed text-pretty",
            onDark ? "text-white/65" : "text-ink-muted"
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
