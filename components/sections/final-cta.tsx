"use client";

import { motion } from "framer-motion";
import { BadgeCheck, PhoneCall } from "lucide-react";
import { useSalesDialog } from "@/components/sales-dialog";
import { EASE, fadeUp, stagger, viewportOnce } from "@/lib/motion";

export function FinalCta() {
  const { openSalesDialog } = useSalesDialog();

  return (
    <section
      id="start"
      aria-labelledby="cta-heading"
      className="relative scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative mx-auto max-w-[1184px] overflow-hidden rounded-[32px] bg-[#0b100f] px-6 py-20 text-center sm:px-12 sm:py-28"
      >
        <GradientMesh />

        <motion.div
          variants={stagger(0.1, 0.15)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-[0.18em] text-teal-400 uppercase"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-moss-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-moss-400" />
            </span>
            Onboarding partners now
          </motion.span>

          <motion.h2
            id="cta-heading"
            variants={fadeUp}
            className="font-display mx-auto mt-6 max-w-3xl text-[2.75rem] text-balance text-white sm:text-[4.25rem]"
          >
            Ready to Grow Your Business?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-[16.5px] leading-relaxed text-pretty text-white/60 sm:text-[18px]"
          >
            Join TripKnot today and connect with travelers actively planning their next
            adventure.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <motion.button
              type="button"
              onClick={() => openSalesDialog()}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              <PhoneCall className="size-4" />
              Talk to sales
            </motion.button>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-[13px] text-white/60"
          >
            {["Free forever plan", "No credit card required", "Cancel anytime"].map(
              (item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <BadgeCheck className="size-4 text-teal-400" />
                  {item}
                </li>
              )
            )}
          </motion.ul>
        </motion.div>
      </motion.div>
    </section>
  );
}

/** Slow-drifting colour blobs over a faint grid — the animated mesh background. */
function GradientMesh() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -left-20 size-[30rem] rounded-full bg-teal-600/40 blur-[110px]"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -right-20 -bottom-28 size-[32rem] rounded-full bg-teal-400/22 blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-1/3 left-1/2 size-[26rem] -translate-x-1/2 rounded-full bg-rust-600/18 blur-[120px]"
      />

      {/* Vignette keeps the headline legible over the moving colour. */}
      <div className="absolute inset-0 bg-linear-to-t from-[#0b100f]/80 via-[#0b100f]/20 to-[#0b100f]/60" />
    </div>
  );
}
