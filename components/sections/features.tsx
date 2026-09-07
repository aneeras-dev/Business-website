"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { FEATURES } from "@/lib/content";
import { EASE, fadeUp, stagger, viewportOnce } from "@/lib/motion";

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[32rem] -translate-y-1/2 bg-linear-to-b from-transparent via-teal-600/[0.05] to-transparent"
      />

      <div className="mx-auto max-w-[1184px] px-5 sm:px-8">
        <SectionHeading
          id="features-heading"
          eyebrow="How TripKnot helps you grow"
          title={
            <>
              Everything you need to turn{" "}
              <span className="text-accent">searches into revenue</span>
            </>
          }
          description="Six ways TripKnot works in the background while you run your business."
        />

        <motion.div
          variants={stagger(0.08, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((feature) => (
            <motion.article
              key={feature.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="group relative overflow-hidden rounded-[22px] border border-hairline bg-surface-raised/60 p-6 backdrop-blur-xl transition-colors duration-300 hover:border-teal-600/30"
            >
              <span
                className={`inline-grid size-11 place-items-center rounded-[12px] ${feature.chip}`}
              >
                <feature.icon className="size-5" strokeWidth={2} />
              </span>

              <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.01em]">
                {feature.title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted text-pretty">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
