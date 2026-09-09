import Link from "next/link";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { LEGAL_DOCS } from "@/lib/content";

type LegalLayoutProps = {
  title: string;
  updated: string;
  /** One-line summary shown under the title, above the body. */
  intro?: string;
  children: ReactNode;
};

/** Shared chrome for every /legal/[slug] page: hero title + prose body + a jump list to the other legal docs. */
export function LegalLayout({ title, updated, intro, children }: LegalLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="px-5 pt-32 pb-20 sm:px-8 sm:pt-40 sm:pb-28">
          <div className="mx-auto max-w-[740px]">
            <p className="eyebrow">Legal</p>
            <h1 className="font-display mt-5 text-[2.25rem] text-balance sm:text-[3rem]">
              {title}
            </h1>
            <p className="mt-4 text-[14.5px] text-ink-muted">Last updated {updated}</p>
            {intro && (
              <p className="mt-6 text-[16.5px] leading-relaxed text-ink-muted text-pretty">
                {intro}
              </p>
            )}

            <div className="mt-12 space-y-10">{children}</div>

            <nav
              aria-label="Other legal documents"
              className="mt-16 border-t border-hairline pt-8"
            >
              <p className="text-[11.5px] font-semibold tracking-[0.16em] text-ink-faint uppercase">
                More legal documents
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {LEGAL_DOCS.map((doc) => (
                  <li key={doc.slug}>
                    <Link
                      href={`/legal/${doc.slug}`}
                      className="text-[14.5px] text-teal-600 underline-offset-4 hover:underline"
                    >
                      {doc.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

/** One numbered/titled clause within a legal page, with consistent prose styling for its body. */
export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-[1.3rem] text-ink sm:text-[1.45rem]">{heading}</h2>
      <div
        className="mt-3 space-y-4 text-[15px] leading-relaxed text-ink-muted text-pretty
        [&_a]:text-teal-600 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-teal-700
        [&_strong]:font-semibold [&_strong]:text-ink
        [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5
        [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5"
      >
        {children}
      </div>
    </section>
  );
}
