import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { SITE } from "@/lib/content";
import { jsonLd } from "@/lib/schema";
import "./globals.css";

// Type pairing taken from tripknot.in: Figtree for UI and body copy,
// Bricolage Grotesque for the oversized display headings.
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const TITLE = "TripKnot Business | Grow Your Hotel, Restaurant or Travel Agency";
const DESCRIPTION =
  "Join TripKnot Business and reach more travelers. Create a free listing, generate leads, receive bookings, and grow your tourism business.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: TITLE,
    template: `%s | ${SITE.name}`,
  },
  description: DESCRIPTION,
  applicationName: SITE.name,
  keywords: [
    "tripknot business",
    "hotel listing platform",
    "travel agency marketing",
    "restaurant listing platform",
    "tourism business growth",
    "hotel lead generation",
    "travel booking platform",
    "restaurant promotion",
  ],
  authors: [{ name: SITE.brand, url: `https://${SITE.domain}` }],
  creator: SITE.brand,
  publisher: SITE.brand,
  category: "business",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: SITE.name,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@tripknot",
    site: "@tripknot",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f4ef",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /*
     * The font variables must live on <html>. Tailwind declares --font-sans on
     * :root, so if --font-figtree were only defined on <body> the token would
     * be invalid where it is declared and silently fall back to system fonts.
     */
    <html lang="en-IN" className={`${figtree.variable} ${bricolage.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/*
          Scroll reveals render at opacity:0 and are animated in by Framer
          Motion. Without JS that would leave most of the page invisible, so
          force the finished state for anyone who never runs the script.
        */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<style>
              [style*="opacity:0"] {
                opacity: 1 !important;
                transform: none !important;
              }
            </style>`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-surface"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
