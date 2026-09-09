"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CategoryTabs } from "@/components/pricing-tabs";
import { PlanCard } from "@/components/pricing-plan-card";
import { PricingComparison } from "@/components/sections/pricing-comparison";
import { PRICING, type CategoryId } from "@/lib/content";
import { EASE } from "@/lib/motion";

/**
 * The /pricing page body: one category tab set drives both the plan cards
 * and the comparison table below them, so switching tabs updates both.
 */
export function PricingExplorer() {
  const [active, setActive] = useState<CategoryId>("hotels");
  const plans = PRICING[active];

  return (
    <div>
      <CategoryTabs active={active} onChange={setActive} />

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

      <p className="mt-10 text-center text-[13.5px] text-ink-muted">
        All prices in INR, billed monthly, exclusive of GST. Platform fees application.
      </p>

      <PricingComparison categoryId={active} />
    </div>
  );
}
