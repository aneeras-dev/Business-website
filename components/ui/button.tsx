import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "primaryOnDark" | "secondaryOnDark";
type Size = "md" | "lg";

/**
 * Pill buttons in the reference style: a solid near-black action on cream
 * (inverted to solid white on the dark bands) beside a quiet outlined one.
 */
const VARIANTS: Record<Variant, string> = {
  primary: "bg-ink text-surface hover:bg-ink/90 shadow-sm",
  secondary: "border border-hairline bg-transparent text-ink hover:bg-ink/[0.04]",
  primaryOnDark: "bg-white text-[#0e1413] hover:bg-white/90 shadow-sm",
  secondaryOnDark: "border border-white/25 bg-transparent text-white hover:bg-white/10",
};

const SIZES: Record<Size, string> = {
  md: "px-5 py-2.5 text-[14px]",
  lg: "px-7 py-3.5 text-[15px]",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "lg",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors",
        VARIANTS[variant],
        SIZES[size],
        className
      )}
    >
      {children}
    </a>
  );
}
