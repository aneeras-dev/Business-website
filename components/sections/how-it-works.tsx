"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { STEPS } from "@/lib/content";
import { EASE, viewportOnce } from "@/lib/motion";

export function HowItWorks() {
  const trackRef = useRef<HTMLOListElement>(null);

  // Drives the rail fill: starts when the list enters view, completes near its end.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.75", "end 0.55"],
  });
  const railScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="relative scroll-mt-24 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1184px] px-5 sm:px-8">
        <SectionHeading
          id="how-heading"
          eyebrow="How it works"
          title={
            <>
              From sign-up to steady bookings in{" "}
              <span className="text-accent">five steps</span>
            </>
          }
          description="No technical setup, no agency fees. Most partners are live the same day they join."
        />

        <div className="relative mx-auto mt-16 max-w-3xl">
          <ol ref={trackRef} className="relative space-y-10 sm:space-y-12">
            {/* Rail: a static hairline with a gradient fill tied to scroll. */}
            <div
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-[21px] w-px bg-hairline sm:left-[27px]"
            >
              <motion.div
                style={{ scaleY: railScale }}
                className="h-full w-full origin-top bg-teal-600"
              />
            </div>

            {STEPS.map((step, i) => (
              <StepRow key={step.n} step={step} index={i} progress={scrollYProgress} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function StepRow({
  step,
  index,
  progress,
}: {
  step: (typeof STEPS)[number];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  /*
   * Each node lights up as the rail fill reaches it. The unlit floor stays
   * high enough that the step number is still legible before it is reached.
   */
  const threshold = index / STEPS.length;
  const nodeOpacity = useTransform(
    progress,
    [threshold - 0.06, threshold + 0.04],
    [0.65, 1]
  );
  const nodeScale = useTransform(
    progress,
    [threshold - 0.06, threshold + 0.04],
    [0.9, 1]
  );
  const ringOpacity = useTransform(
    progress,
    [threshold - 0.06, threshold + 0.04],
    [0, 1]
  );

  return (
    <motion.li
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.06 }}
      className="relative flex gap-5 sm:gap-7"
    >
      <motion.span
        style={{ opacity: nodeOpacity, scale: nodeScale }}
        className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full border border-hairline bg-surface-raised text-[14px] tabular-nums sm:size-14 sm:text-[16px]"
      >
        <span className="font-display text-accent">{step.n}</span>
        {/* Accent ring fades in only once the rail fill reaches this step. */}
        <motion.span
          aria-hidden="true"
          style={{ opacity: ringOpacity }}
          className="absolute inset-0 rounded-full ring-2 ring-teal-600/40"
        />
      </motion.span>

      <div className="pt-1 sm:pt-2.5">
        <h3 className="font-display text-[22px] sm:text-[26px]">{step.title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-muted text-pretty">
          {step.description}
        </p>
      </div>
    </motion.li>
  );
}
