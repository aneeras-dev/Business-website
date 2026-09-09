import type { Metadata } from "next";
import { SalesDialogProvider } from "@/components/sales-dialog";
import { FinalCta } from "@/components/sections/final-cta";
import { PricingExplorer } from "@/components/sections/pricing-explorer";
import { PricingHero } from "@/components/sections/pricing-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SITE } from "@/lib/content";

const TITLE = "Pricing";
const DESCRIPTION =
  "Compare TripKnot Business plans for hotels, restaurants, and travel agencies. Free listing, transparent monthly pricing, and a full feature-by-feature comparison.";
const OG_TITLE = `${TITLE} | ${SITE.name}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    type: "website",
    url: `${SITE.url}/pricing`,
    siteName: SITE.name,
    title: OG_TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: DESCRIPTION,
  },
};

export default function PricingPage() {
  return (
    <SalesDialogProvider>
      <SiteHeader />
      <main id="main">
        <PricingHero />
        <section aria-label="Pricing plans and feature comparison" className="pb-20 sm:pb-28">
          <div className="mx-auto max-w-[1184px] px-5 sm:px-8">
            <PricingExplorer />
          </div>
        </section>
        <FinalCta />
      </main>
      <SiteFooter />
    </SalesDialogProvider>
  );
}
