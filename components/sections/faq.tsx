"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { FAQS } from "@/lib/content";
import { EASE, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Faq() {
  // Single-open accordion; the first question starts expanded.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative scroll-mt-24 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1184px] px-5 sm:px-8">
        <SectionHeading
          id="faq-heading"
          eyebrow="FAQ"
          title={
            <>
              Questions, <span className="text-accent">answered</span>
            </>
          }
          description="Everything partners ask before they join. Still unsure? Talk to our team."
        />

        <div className="mx-auto mt-14 max-w-3xl space-y-3">
          {FAQS.map((faq, i) => {
            const expanded = open === i;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.45, ease: EASE, delay: i * 0.06 }}
                className={cn(
                  "overflow-hidden rounded-[22px] border backdrop-blur-xl transition-colors duration-300",
                  expanded
                    ? "border-teal-600/30 bg-surface-raised/85"
                    : "border-hairline bg-surface-raised/50 hover:border-teal-600/20"
                )}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : i)}
                    aria-expanded={expanded}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                    className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                  >
                    <span className="text-[17px] font-semibold tracking-[-0.01em] sm:text-[18px]">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: expanded ? 45 : 0 }}
                      transition={{ duration: 0.28, ease: EASE }}
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-full border transition-colors",
                        expanded
                          ? "border-transparent bg-ink text-surface"
                          : "border-hairline text-ink-muted"
                      )}
                    >
                      <Plus className="size-4" strokeWidth={2.5} />
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      key="panel"
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-[15.5px] leading-relaxed text-ink-muted text-pretty">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
