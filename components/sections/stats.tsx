"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/ui/count-up";
import { STATS } from "@/lib/content";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export function Stats() {
  return (
    <section aria-labelledby="stats-heading" className="relative py-8 sm:py-12">
      <div className="mx-auto max-w-[1184px] px-5 sm:px-8">
        <h2 id="stats-heading" className="sr-only">
          TripKnot by the numbers
        </h2>

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-[24px] border border-hairline bg-surface-raised"
        >
          <p className="eyebrow relative border-b border-hairline px-6 py-4 text-center">
            Trusted growth, measured every month
          </p>

          <dl className="relative grid grid-cols-2 divide-x divide-y divide-hairline lg:grid-cols-4 lg:divide-y-0">
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="group px-6 py-8 text-center transition-colors hover:bg-surface/40 sm:py-10"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="font-display block text-[2.25rem] text-accent tabular-nums sm:text-[2.75rem] lg:text-[3.25rem]">
                    <CountUp value={stat.value} suffix={stat.suffix} duration={2.4} />
                  </span>
                  <span className="mt-2 block text-[13.5px] text-ink-muted">
                    {stat.label}
                  </span>
                </dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
