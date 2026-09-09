"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Eye,
  IndianRupee,
  MousePointerClick,
  TrendingUp,
  Users,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { CountUp } from "@/components/ui/count-up";
import { EASE, fadeUp, stagger } from "@/lib/motion";

const METRICS = [
  { label: "Views", value: 12480, icon: Eye, bar: "bg-teal-600" },
  { label: "Leads", value: 386, icon: Users, bar: "bg-teal-400" },
  { label: "Bookings", value: 142, icon: CalendarCheck, bar: "bg-moss-600" },
];

/** Monthly revenue index driving the hero chart. */
const SERIES = [18, 26, 22, 38, 34, 52, 61, 58, 74, 82, 91, 100];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-24 sm:pt-44">
      <Backdrop />

      <div className="mx-auto max-w-[1184px] px-5 sm:px-8">
        <motion.div
          variants={stagger(0.11)}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.p variants={fadeUp} className="eyebrow">
            For hotels &middot; restaurants &middot; travel agencies
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display mt-6 text-[3.1rem] text-balance sm:text-[4.75rem] lg:text-[6.2rem]"
          >
            Grow your business
            <br />
            <span className="text-accent">with TripKnot.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-7 max-w-xl text-[17px] leading-relaxed text-ink-muted text-pretty sm:text-[18px]"
          >
            Get discovered by thousands of travelers searching for hotels, restaurants,
            experiences, and travel services across India.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <ButtonLink href="#start" className="w-full sm:w-auto">
              Start free listing
              <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink
              href="/pricing"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              View pricing
            </ButtonLink>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-[13.5px] text-ink-muted"
          >
            {[
              "Free forever plan",
              "Live in 10 minutes",
            ].map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <BadgeCheck className="size-4 text-teal-600" />
                {item}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <DashboardMock />
      </div>
    </section>
  );
}

/** Soft warm wash behind the hero, in keeping with the calm cream ground. */
function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="animate-drift absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-teal-400/12 blur-[130px]" />
      <div
        className="animate-drift absolute top-40 -left-24 size-[28rem] rounded-full bg-rust-400/10 blur-[130px]"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="animate-drift absolute top-52 -right-20 size-[30rem] rounded-full bg-moss-400/10 blur-[130px]"
        style={{ animationDelay: "-14s" }}
      />
    </div>
  );
}

function DashboardMock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
      className="relative mx-auto mt-20 max-w-3xl"
    >
      <div className="relative rounded-[24px] border border-hairline bg-surface-raised p-2 shadow-[0_24px_70px_-30px_rgba(14,20,19,0.35)]">
        <div className="rounded-[18px] bg-surface-muted/70">
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
            <span className="size-2.5 rounded-full bg-rust-400/70" />
            <span className="size-2.5 rounded-full bg-sand-400/80" />
            <span className="size-2.5 rounded-full bg-teal-400/80" />
            <div className="ml-3 flex-1 truncate rounded-full bg-surface-raised px-3 py-1 text-[11.5px] text-ink-faint">
              business.tripknot.in / dashboard
            </div>
          </div>

          <div className="space-y-4 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11.5px] font-semibold tracking-[0.14em] text-ink-faint uppercase">
                  This month
                </p>
                <p className="mt-0.5 text-[15px] font-semibold">Performance overview</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-600/10 px-2.5 py-1 text-[11.5px] font-semibold text-teal-600">
                <TrendingUp className="size-3" />
                Live
              </span>
            </div>

            {/* Metric tiles */}
            <div className="grid grid-cols-3 gap-2.5">
              {METRICS.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.12, duration: 0.5, ease: EASE }}
                  className="rounded-[14px] border border-hairline bg-surface-raised p-3.5"
                >
                  <metric.icon className="size-4 text-ink-faint" strokeWidth={2.2} />
                  <p className="font-display mt-2 text-[22px] tabular-nums">
                    <CountUp value={metric.value} duration={2.2} />
                  </p>
                  <p className="text-[11.5px] text-ink-muted">{metric.label}</p>
                  <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-hairline">
                    <motion.div
                      className={`h-full rounded-full ${metric.bar}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${60 + i * 14}%` }}
                      transition={{ delay: 1 + i * 0.12, duration: 1.1, ease: EASE }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Revenue growth chart */}
            <div className="rounded-[14px] border border-hairline bg-surface-raised p-4">
              <div className="mb-3 flex items-end justify-between">
                <div>
                  <p className="text-[11.5px] text-ink-muted">Revenue growth</p>
                  <p className="font-display flex items-center text-[26px] tabular-nums">
                    <IndianRupee className="size-4" strokeWidth={2.5} />
                    <CountUp value={248500} duration={2.4} />
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-moss-600/10 px-2.5 py-1 text-[11.5px] font-semibold text-moss-600">
                  <TrendingUp className="size-3" />
                  +38%
                </span>
              </div>
              <RevenueChart />
            </div>
          </div>
        </div>
      </div>

      {/* Floating notification cards */}
      <FloatingCard
        className="-top-10 -left-6"
        delay={1.3}
        drift={-9}
        icon={<MousePointerClick className="size-4 text-teal-600" />}
        title="New enquiry"
        subtitle="2 guests / 14 Mar"
      />
      <FloatingCard
        className="-right-8 -bottom-8"
        delay={1.6}
        drift={9}
        icon={<CalendarCheck className="size-4 text-moss-600" />}
        title="Booking confirmed"
        subtitle="Deluxe room / 3 nights"
      />
    </motion.div>
  );
}

function RevenueChart() {
  /*
   * The viewBox stays close to the rendered aspect ratio and scales uniformly.
   * Stretching it would distort the dash pattern Framer Motion uses to animate
   * pathLength, cutting the stroke off partway along the line.
   */
  const width = 520;
  const height = 88;
  const max = Math.max(...SERIES);

  const points = SERIES.map((v, i) => {
    const x = (i / (SERIES.length - 1)) * width;
    const y = height - (v / max) * (height - 8) - 4;
    return [x, y] as const;
  });

  const line = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      role="img"
      aria-label="Revenue trending upward over the last twelve months"
    >
      <defs>
        <linearGradient id="tk-hero-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d7a7b" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#0d7a7b" stopOpacity="0" />
        </linearGradient>
      </defs>

      <motion.path
        d={area}
        fill="url(#tk-hero-area)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="#0d7a7b"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.9, duration: 1.6, ease: EASE }}
      />
    </svg>
  );
}

function FloatingCard({
  className,
  delay,
  drift,
  icon,
  title,
  subtitle,
}: {
  className: string;
  delay: number;
  /** Vertical travel in px for the idle float. */
  drift: number;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: EASE }}
      className={`absolute z-10 hidden lg:block ${className}`}
    >
      <motion.div
        animate={{ y: [0, drift, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay }}
        className="flex items-center gap-3 rounded-[16px] border border-hairline bg-surface-raised px-4 py-3 shadow-[0_16px_40px_-20px_rgba(14,20,19,0.4)]"
      >
        <span className="grid size-9 place-items-center rounded-[10px] bg-surface-muted">
          {icon}
        </span>
        <div className="leading-tight">
          <p className="text-[12.5px] font-semibold">{title}</p>
          <p className="text-[11.5px] text-ink-muted">{subtitle}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
