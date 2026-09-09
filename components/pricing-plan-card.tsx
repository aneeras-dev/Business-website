"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useSalesDialog } from "@/components/sales-dialog";
import type { CategoryId, Plan } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { planNameToInterest } from "@/lib/sales";
import { cn } from "@/lib/utils";

/** A single plan card, shared by the homepage pricing teaser and the full /pricing page. */
export function PlanCard({
  plan,
  index,
  categoryId,
}: {
  plan: Plan;
  index: number;
  categoryId: CategoryId;
}) {
  const isFree = plan.price === 0;
  const { openSalesDialog } = useSalesDialog();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.09 }}
      whileHover={{ y: -6 }}
      className={cn(
        "relative flex h-full flex-col rounded-[24px] border p-8 transition-colors duration-300",
        plan.featured
          ? "border-transparent bg-[#0e1413] text-white lg:-mt-4 lg:pt-10 lg:pb-10"
          : "border-hairline bg-surface-raised"
      )}
    >
      {plan.featured && (
        <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-teal-600 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-white uppercase">
          <Sparkles className="size-3" />
          {plan.badge}
        </span>
      )}

      <div className="relative">
        <h3
          className={cn(
            "text-[15px] font-semibold tracking-[0.02em]",
            plan.featured ? "text-white/70" : "text-ink-muted"
          )}
        >
          {plan.name}
        </h3>

        <p className="mt-4 flex items-baseline gap-1">
          <span className="font-display text-[3rem] tabular-nums">
            ₹{plan.price.toLocaleString("en-IN")}
          </span>
          <span
            className={cn(
              "text-[15px]",
              plan.featured ? "text-white/60" : "text-ink-muted"
            )}
          >
            /month
          </span>
        </p>

        <p
          className={cn(
            "mt-1.5 text-[12.5px]",
            plan.featured ? "text-white/45" : "text-ink-faint"
          )}
        >
          + {plan.bookingFeePercent}% per booking paid through TripKnot
        </p>

        <p
          className={cn(
            "mt-3 min-h-[2.75rem] text-[14.5px] leading-relaxed text-pretty",
            plan.featured ? "text-white/60" : "text-ink-muted"
          )}
        >
          {plan.tagline}
        </p>

        <button
          type="button"
          onClick={() =>
            openSalesDialog({
              businessType: categoryId,
              plan: planNameToInterest(plan.name),
              context: `${plan.name} plan`,
            })
          }
          className={cn(
            "mt-6 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[15px] font-semibold transition-all",
            plan.featured
              ? "bg-white text-[#0e1413] hover:bg-white/90"
              : "border border-hairline text-ink hover:bg-ink/[0.04]"
          )}
        >
          {plan.cta}
          <ArrowRight className="size-4" />
        </button>

        <ul
          className={cn(
            "mt-7 space-y-3.5 border-t pt-7",
            plan.featured ? "border-white/15" : "border-hairline"
          )}
        >
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-[14.5px]">
              <span
                className={cn(
                  "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                  plan.featured
                    ? "bg-white/15 text-white"
                    : "bg-teal-600/10 text-teal-600"
                )}
              >
                <Check className="size-3" strokeWidth={3} />
              </span>
              <span
                className={
                  plan.featured
                    ? "text-white/85"
                    : isFree
                      ? "text-ink-muted"
                      : "text-ink"
                }
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
