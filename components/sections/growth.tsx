"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingDown, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { EASE, fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const WITHOUT_CHAIN = ["Limited Reach", "Low Visibility", "Fewer Leads"];
const WITH_CHAIN = ["More Visibility", "More Leads", "More Bookings", "More Revenue"];

/** Flat-to-falling bars for the "without"panel. */
const FLAT_SERIES = [42, 38, 40, 33, 36, 29, 31, 26];
/** Compounding bars for the "with"panel. */
const RISING_SERIES = [28, 36, 44, 52, 63, 74, 88, 100];

export function Growth() {
  return (
    <section
      aria-labelledby="growth-heading"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1184px] px-5 sm:px-8">
        <SectionHeading
          id="growth-heading"
          eyebrow="The difference"
          title={
            <>
              Same business. <span className="text-accent">Very different year.</span>
            </>
          }
          description="Visibility compounds. Every month you are not discoverable is a month of bookings going to the listing above yours."
        />

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
          <Panel
            variant="without"
            title="Without TripKnot"
            caption="Walk-ins and word of mouth only"
            chain={WITHOUT_CHAIN}
            series={FLAT_SERIES}
            delta="-12%"
          />

          {/* Divider that reads as a hand-off between the two states. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
            className="flex items-center justify-center lg:flex-col"
          >
            <span className="hidden h-full w-px bg-linear-to-b from-transparent via-hairline to-transparent lg:block" />
            <span className="grid size-12 shrink-0 place-items-center rounded-full border border-hairline bg-surface-raised text-teal-600 lg:my-4">
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="grid place-items-center"
              >
                {/* Points down while the panels stack, right once they sit side by side. */}
                <ArrowRight
                  className="size-5 rotate-90 lg:rotate-0"
                  strokeWidth={2.4}
                />
              </motion.span>
            </span>
            <span className="hidden h-full w-px bg-linear-to-b from-transparent via-hairline to-transparent lg:block" />
          </motion.div>

          <Panel
            variant="with"
            title="With TripKnot"
            caption="Discovered by travelers planning ahead"
            chain={WITH_CHAIN}
            series={RISING_SERIES}
            delta="+38%"
          />
        </div>
      </div>
    </section>
  );
}

function Panel({
  variant,
  title,
  caption,
  chain,
  series,
  delta,
}: {
  variant: "with" | "without";
  title: string;
  caption: string;
  chain: string[];
  series: number[];
  delta: string;
}) {
  const positive = variant === "with";

  return (
    <motion.div
      variants={stagger(0.08, positive ? 0.25 : 0.05)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn(
        "relative overflow-hidden rounded-[24px] border p-7 sm:p-8",
        positive
          ? "border-transparent bg-[#0e1413] text-white"
          : "border-hairline bg-surface-raised"
      )}
    >
      {positive && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 -right-20 size-72 rounded-full bg-teal-600/25 blur-3xl"
        />
      )}

      <div className="relative">
        <motion.div
          variants={fadeUp}
          className="flex items-start justify-between gap-4"
        >
          <div>
            <h3
              className={cn(
                "font-display text-[26px]",
                positive ? "text-white" : "text-ink-muted"
              )}
            >
              {title}
            </h3>
            <p
              className={cn(
                "mt-1.5 text-[13.5px]",
                positive ? "text-white/55" : "text-ink-muted"
              )}
            >
              {caption}
            </p>
          </div>
          <span
            className={cn(
              "inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-semibold tabular-nums",
              positive ? "bg-teal-400/15 text-teal-400" : "bg-ink/[0.06] text-ink-muted"
            )}
          >
            {positive ? (
              <TrendingUp className="size-3.5" />
            ) : (
              <TrendingDown className="size-3.5" />
            )}
            {delta}
          </span>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-7">
          <BarChart series={series} positive={positive} />
        </motion.div>

        <motion.ul variants={fadeUp} className="mt-7 flex flex-wrap items-center gap-2">
          {chain.map((node, i) => (
            // The arrow leads its pill so the pair wraps together, rather than
            // leaving a connector dangling at the end of a line.
            <li key={node} className="flex items-center gap-2">
              {i > 0 && (
                <motion.span
                  animate={positive ? { x: [0, 3, 0] } : undefined}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                  aria-hidden="true"
                  className={positive ? "text-teal-400" : "text-ink-faint"}
                >
                  <ArrowRight className="size-3.5" strokeWidth={2.5} />
                </motion.span>
              )}
              <span
                className={cn(
                  "rounded-full px-3 py-1.5 text-[13px] font-medium",
                  positive
                    ? "bg-white/10 text-white ring-1 ring-white/15"
                    : "text-ink-muted ring-1 ring-hairline"
                )}
              >
                {node}
              </span>
            </li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
}

function BarChart({ series, positive }: { series: number[]; positive: boolean }) {
  return (
    <div
      className="flex h-32 items-end gap-1.5 sm:gap-2"
      role="img"
      aria-label={
        positive
          ? "Bar chart showing bookings compounding month over month"
          : "Bar chart showing flat then declining bookings"
      }
    >
      {series.map((value, i) => (
        <motion.div
          key={i}
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: `${value}%`, opacity: 1 }}
          viewport={viewportOnce}
          transition={{
            duration: 0.7,
            ease: EASE,
            delay: (positive ? 0.35 : 0.15) + i * 0.06,
          }}
          className={cn(
            "flex-1 rounded-t-md",
            positive ? "bg-teal-600" : "bg-slate-400/30"
          )}
        />
      ))}
    </div>
  );
}
