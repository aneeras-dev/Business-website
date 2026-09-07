"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { CATEGORIES } from "@/lib/content";
import { EASE, fadeUp, stagger, viewportOnce } from "@/lib/motion";

export function Categories() {
  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="relative scroll-mt-24 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1184px] px-5 sm:px-8">
        <SectionHeading
          id="categories-heading"
          eyebrow="Built for your business"
          title={
            <>
              One platform, tuned to <span className="text-accent">how you earn</span>
            </>
          }
          description="Whether you rent rooms, serve plates, or sell itineraries, TripKnot connects you to travelers already planning a trip to your destination."
        />

        <motion.div
          variants={stagger(0.13, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 grid gap-6 lg:grid-cols-3"
        >
          {CATEGORIES.map((category) => (
            <motion.article
              key={category.id}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="group relative flex flex-col overflow-hidden rounded-[24px] border border-hairline bg-surface-raised/70 p-7 backdrop-blur-xl transition-shadow duration-300 hover:shadow-2xl hover:shadow-ink/10"
            >
              <div className="relative">
                <span
                  className={`inline-grid size-12 place-items-center rounded-[14px] ${category.accent.chip}`}
                >
                  <category.icon className="size-[22px]" strokeWidth={2} />
                </span>

                <h3 className="font-display mt-6 text-[28px]">{category.name}</h3>
                <p className={`mt-1.5 text-sm font-medium ${category.accent.text}`}>
                  {category.tagline}
                </p>

                <ul className="mt-6 space-y-3">
                  {category.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-[15px]">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-moss-600/12 text-moss-600">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      <span className="text-ink-muted">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#start"
                className="relative mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-hairline px-5 py-3 text-[14px] font-semibold transition-colors hover:bg-ink/[0.04]"
              >
                {category.cta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
