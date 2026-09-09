import { Logo } from "@/components/ui/logo";
import { LEGAL_DOCS, NAV_LINKS, SITE } from "@/lib/content";

const COLUMNS = [
  { heading: "Platform", links: NAV_LINKS },
  {
    heading: "Partners",
    links: [
      { href: "#start", label: "Hotels & Stays" },
      { href: "#start", label: "Restaurants" },
      { href: "#start", label: "Travel Agencies" },
      { href: "/pricing", label: "Compare plans" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "#faq", label: "Help centre" },
      { href: "#start", label: "Contact sales" },
    ],
  },
  {
    heading: "Legal",
    links: LEGAL_DOCS.map((doc) => ({ href: `/legal/${doc.slug}`, label: doc.label })),
  },
];

/** Full-bleed near-black footer, matching the reference site. */
export function SiteFooter() {
  return (
    <footer className="bg-[#0b100f] text-white/70">
      <div className="mx-auto max-w-[1184px] px-5 py-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(4,1fr)] lg:gap-8">
          <div>
            <Logo variant="light" className="h-9 w-auto" />
            <p className="mt-4 max-w-xs text-[14.5px] leading-relaxed text-pretty text-white/55">
              Smart itineraries, hidden gems, and travel that fits the way you actually move.
            </p>
            <address className="mt-5 space-y-1.5 text-[14.5px] not-italic">
              <p className="text-white/55">{SITE.address}</p>
              <p>
                <a
                  href={`tel:${SITE.phone}`}
                  className="text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  {SITE.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  {SITE.email}
                </a>
              </p>
            </address>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="text-[11.5px] font-semibold tracking-[0.16em] text-white uppercase">
                {column.heading}
              </h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={`${column.heading}-${link.label}`}>
                    <a
                      href={link.href}
                      className="text-[14.5px] text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-7 text-[13.5px] text-white/45 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {SITE.brand} | Aneeras LLP.
          </p>
          <p>Built for the curious &mdash; made in India</p>
        </div>
      </div>
    </footer>
  );
}
