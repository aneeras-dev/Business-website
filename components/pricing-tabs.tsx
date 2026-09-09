"use client";

import { motion } from "framer-motion";
import { PRICING_TABS, type CategoryId } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The Hotels/Restaurants/Agencies switcher, shared by the homepage pricing
 * teaser and the full /pricing page so both stay driven by the same tab set.
 */
export function CategoryTabs({
  active,
  onChange,
}: {
  active: CategoryId;
  onChange: (id: CategoryId) => void;
}) {
  return (
    <div className="flex justify-center">
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
              onClick={() => onChange(tab.id)}
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
  );
}
