"use client";

import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import {
  getComparisonRows,
  isIncludedAt,
  PRICING,
  type CategoryId,
  type ComparisonRow,
} from "@/lib/content";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const TIERS: { id: ComparisonRow["from"]; heading: string }[] = [
  { id: "free", heading: "Included in Free Listing" },
  { id: "essential", heading: "Everything in Free, plus" },
  { id: "growth", heading: "Everything in Essential, plus" },
];

/** `PRICING[category]` is always ordered Free, Essential, Growth — this names that order. */
const PLAN_TIER_ORDER: ComparisonRow["from"][] = ["free", "essential", "growth"];

/** Full feature-by-feature matrix for the active category, derived from `PRICING`. */
export function PricingComparison({ categoryId }: { categoryId: CategoryId }) {
  const plans = PRICING[categoryId];
  const rows = getComparisonRows(categoryId);

  return (
    <motion.div
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="mt-16"
    >
      <motion.h3
        variants={fadeUp}
        className="font-display text-center text-[1.75rem] sm:text-[2.25rem]"
      >
        Compare every feature
      </motion.h3>
      <motion.p
        variants={fadeUp}
        className="mx-auto mt-3 max-w-lg text-center text-[15px] leading-relaxed text-ink-muted text-pretty"
      >
        A full breakdown of what each plan includes, so there is no guesswork before you
        upgrade.
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="mt-10 overflow-x-auto rounded-[24px] border border-hairline bg-surface-raised"
      >
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-hairline">
              <th scope="col" className="px-6 py-5 text-[13.5px] font-semibold text-ink-muted">
                Feature
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.name}
                  scope="col"
                  className={cn(
                    "px-4 py-5 text-center text-[14px] font-semibold",
                    plan.featured && "text-teal-600"
                  )}
                >
                  {plan.name}
                  <span className="mt-0.5 block text-[12.5px] font-normal text-ink-faint">
                    ₹{plan.price.toLocaleString("en-IN")}/mo
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          {TIERS.map((tier) => {
            const tierRows = rows.filter((row) => row.from === tier.id);
            if (tierRows.length === 0) return null;

            return (
              <tbody key={tier.id} className="border-b border-hairline last:border-b-0">
                <tr>
                  <th
                    colSpan={plans.length + 1}
                    scope="colgroup"
                    className="bg-surface-muted/60 px-6 py-2.5 text-left text-[11.5px] font-semibold tracking-[0.08em] text-ink-faint uppercase"
                  >
                    {tier.heading}
                  </th>
                </tr>
                {tierRows.map((row) => (
                  <tr key={row.feature} className="border-t border-hairline/60">
                    <td className="px-6 py-3.5 text-[14px] text-ink">{row.feature}</td>
                    {plans.map((plan, i) => {
                      const included = isIncludedAt(row, PLAN_TIER_ORDER[i]);
                      return (
                        <td key={plan.name} className="px-4 py-3.5 text-center">
                          {included ? (
                            <Check
                              className="mx-auto size-4 text-teal-600"
                              strokeWidth={3}
                            />
                          ) : (
                            <Minus className="mx-auto size-4 text-ink-faint/50" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            );
          })}
        </table>
      </motion.div>
    </motion.div>
  );
}
