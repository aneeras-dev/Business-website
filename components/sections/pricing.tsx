"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { useSalesDialog } from "@/components/sales-dialog";
import { SectionHeading } from "@/components/ui/section-heading";
import { PRICING, PRICING_TABS, type CategoryId, type Plan } from "@/lib/content";
import { EASE, viewportOnce } from "@/lib/motion";
import { planNameToInterest } from "@/lib/sales";
import { cn } from "@/lib/utils";

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
        <div className="mt-12 flex justify-center">
          <div
            role="tablist"
            aria-label="Business category"
            className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-hairline bg-surface-raised/70 p-1.5 backdrop-blur-xl"
          >
            {PRICING_TABS.map((tab) => {
              const selected = tab.id === active;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  id={`tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setActive(tab.id)}
                  className={cn(
                    "relative rounded-full px-4 py-2.5 text-[14px] font-semibold transition-colors sm:px-5",
                    selected ? "text-surface" : "text-ink-muted hover:text-ink"
                  )}
                >
                  {/* Shared layout pill slides between tabs. */}
                  {selected && (
                    <motion.span
                      layoutId="pricing-tab-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-ink"
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <tab.icon className="size-4" strokeWidth={2.2} />
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
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

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          className="mt-10 text-center text-[13.5px] text-ink-muted"
        >
          All prices in INR, billed monthly, inclusive of platform fees. GST invoice
          provided.
        </motion.p>
      </div>
    </section>
  );
}

function PlanCard({
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
