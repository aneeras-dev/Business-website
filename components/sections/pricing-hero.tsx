"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

export function PricingHero() {
  return (
    <section className="relative overflow-hidden px-5 pt-36 pb-16 text-center sm:px-8 sm:pt-44">
      <motion.div
        variants={stagger(0.11)}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-3xl"
      >
        <motion.p variants={fadeUp} className="eyebrow">
          Pricing
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-display mt-6 text-[2.75rem] text-balance sm:text-[4rem]"
        >
          Simple pricing, <span className="text-accent">every feature compared.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-ink-muted text-pretty"
        >
          Start free, upgrade when the enquiries roll in. No commission on enquiries you
          close yourself, ever.
        </motion.p>
      </motion.div>
    </section>
  );
}
