import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { SEO, SITE } from "@/lib/content";
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

const TITLE = SEO.title;
const DESCRIPTION = SEO.description;

/*
 * GA4. The measurement ID is public — it ships in the client bundle on every
 * site using Analytics — so it is inlined as the default rather than hidden
 * behind an env var that someone has to remember to set on the host. Override
 * with NEXT_PUBLIC_GA_ID, or set it to an empty string to switch GA off.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-3JE5QYE9JF";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: TITLE,
    template: `%s | ${SITE.name}`,
  },
  description: DESCRIPTION,
  applicationName: SITE.name,
  keywords: [...SEO.keywords],
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
  /*
   * Site-verification tokens. DNS verification is preferable, but the HTML tag
   * is the quickest route into Search Console — set the env var and redeploy.
   */
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : {},
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
        {/*
          Production only, so `npm run dev` never pollutes the property with
          localhost traffic. Loaded after hydration, so it stays off the
          critical path.
        */}
        {process.env.NODE_ENV === "production" && GA_ID ? (
          <GoogleAnalytics gaId={GA_ID} />
        ) : null}
      </body>
    </html>
  );
}
