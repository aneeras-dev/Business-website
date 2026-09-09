"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CategoryTabs } from "@/components/pricing-tabs";
import { PlanCard } from "@/components/pricing-plan-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { PRICING, type CategoryId } from "@/lib/content";
import { EASE, viewportOnce } from "@/lib/motion";

export function Pricing() {
  const [active, setActive] = useState<CategoryId>("hotels");
  const plans = PRICING[active];

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1184px] px-5 sm:px-8">
        <SectionHeading
          id="pricing-heading"
          eyebrow="Pricing"
          title={
            <>
              Start free. Upgrade when the{" "}
              <span className="text-accent">enquiries roll in</span>
            </>
          }
          description="Transparent monthly pricing with no commission on the bookings you win. Cancel any time."
        />

        {/* Category tabs */}
        <div className="mt-12">
          <CategoryTabs active={active} onChange={setActive} />
        </div>

        {/* Plan grid — re-mounts per category so cards animate on switch. */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            role="tabpanel"
            id={`panel-${active}`}
            aria-labelledby={`tab-${active}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="mt-12 grid items-start gap-6 lg:grid-cols-3"
          >
            {plans.map((plan, i) => (
              <PlanCard key={plan.name} plan={plan} index={i} categoryId={active} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-[14.5px] font-semibold text-ink underline-offset-4 hover:underline"
          >
            Compare every plan in detail
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          className="mt-4 text-center text-[13.5px] text-ink-muted"
        >
          All prices in INR, billed monthly, exclusive of GST. Platform fees application.
        </motion.p>
      </div>
    </section>
  );
}
