"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { TESTIMONIALS } from "@/lib/content";
import { EASE, fadeUp, stagger, viewportOnce } from "@/lib/motion";

export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1184px] px-5 sm:px-8">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Partner stories"
          title={
            <>
              Businesses growing on <span className="text-accent">TripKnot today</span>
            </>
          }
          description="Hotels, restaurants, and agencies who stopped waiting to be found."
        />

        <motion.div
          variants={stagger(0.12, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 grid gap-6 lg:grid-cols-3"
        >
          {TESTIMONIALS.map((t) => (
            <motion.figure
              key={t.name}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.32, ease: EASE }}
              className="group relative flex flex-col overflow-hidden rounded-[24px] border border-hairline bg-surface-raised/70 p-7 backdrop-blur-xl transition-shadow duration-300 hover:shadow-2xl hover:shadow-ink/10"
            >
              <Quote
                aria-hidden="true"
                className="absolute top-6 right-6 size-10 text-ink/[0.05] transition-transform duration-500 group-hover:scale-110"
                strokeWidth={1.5}
              />

              <div className="flex gap-0.5" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    aria-hidden="true"
                    className="size-4 fill-rust-400 text-rust-400"
                  />
                ))}
              </div>

              <blockquote className="relative mt-5 flex-1 text-[19px] leading-[1.5] text-balance">
                {t.quote}
              </blockquote>

              <figcaption className="mt-7 flex items-center gap-3 border-t border-hairline pt-6">
                <span
                  aria-hidden="true"
                  className={`grid size-11 shrink-0 place-items-center rounded-full ${t.accent} text-[14px] font-semibold text-white`}
                >
                  {t.initials}
                </span>
                <span className="leading-tight">
                  <span className="block text-[14.5px] font-semibold">{t.name}</span>
                  <span className="block text-[13px] text-ink-muted">{t.role}</span>
                  <span className="block text-[12px] text-ink-muted/80">
                    {t.location}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
