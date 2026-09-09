"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/ui/logo";
import { NAV_LINKS } from "@/lib/content";

/**
 * Sticky bar in the reference chrome: wordmark left, centred nav, one solid
 * pill action right, over a translucent cream with a hairline underneath.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-surface/70 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex h-[71px] max-w-[1184px] items-center justify-between gap-6 px-5 sm:px-8"
      >
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Logo className="h-8 w-auto sm:h-9" />
          <span className="hidden rounded-full bg-teal-600/10 px-2 py-0.5 text-[11px] font-semibold text-teal-600 sm:inline">
            Business
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[15px] text-ink-muted transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href="#start"
            className="hidden rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-surface transition-colors hover:bg-ink/90 sm:block"
          >
            Start free listing
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-9 place-items-center rounded-full border border-hairline text-ink-muted lg:hidden"
          >
            {open ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-hairline bg-surface/95 backdrop-blur-md lg:hidden"
          >
            <ul className="mx-auto max-w-[1184px] space-y-1 px-5 py-4 sm:px-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-[14px] px-3 py-2.5 text-[15px] text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#start"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-ink px-3 py-3 text-center text-[15px] font-semibold text-surface"
                >
                  Start free listing
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
