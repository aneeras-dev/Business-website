import { SalesDialogProvider } from "@/components/sales-dialog";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Categories } from "@/components/sections/categories";
import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { FinalCta } from "@/components/sections/final-cta";
import { Growth } from "@/components/sections/growth";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";

export default function Page() {
  return (
    <SalesDialogProvider>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Stats />
        <Categories />
        <Features />
        <HowItWorks />
        <Growth />
        <Pricing />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </SalesDialogProvider>
  );
}
