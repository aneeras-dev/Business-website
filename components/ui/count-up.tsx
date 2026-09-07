"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: number;
  /** Rendered after the number, e.g. "+" or "%". */
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  /** Decimal places to keep while animating and at rest. */
  decimals?: number;
};

/**
 * Counts from 0 up to `value` the first time it scrolls into view.
 *
 * The final value is rendered into the DOM up front for assistive tech and
 * crawlers (via aria-label on the wrapper), while the visible digits animate.
 * Users who prefer reduced motion see the final number immediately.
 */
export function CountUp({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className,
  decimals = 0,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(latest),
    });

    return () => controls.stop();
  }, [inView, value, duration, reduceMotion]);

  const formatted = display.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span
      ref={ref}
      className={className}
      aria-label={`${prefix}${value.toLocaleString("en-IN")}${suffix}`}
    >
      <span aria-hidden="true">
        {prefix}
        {formatted}
        {suffix}
      </span>
    </span>
  );
}
