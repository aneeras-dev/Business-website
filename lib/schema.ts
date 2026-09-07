import { FAQS, PRICING, SITE } from "@/lib/content";

/**
 * Structured data for the landing page. Everything is derived from
 * `lib/content.ts`, so the markup and the schema can never drift apart.
 */

const organization = {
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  alternateName: SITE.brand,
  url: SITE.url,
  logo: {
    "@type": "ImageObject",
    url: `${SITE.url}/opengraph-image`,
  },
  description:
    "TripKnot Business helps hotels, restaurants, and travel agencies across India get discovered by travelers, generate qualified leads, and grow revenue.",
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.city,
    addressCountry: "IN",
  },
  telephone: SITE.phone,
  email: SITE.email,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: SITE.email,
    telephone: SITE.phone,
    availableLanguage: ["en", "hi", "ta"],
  },
  sameAs: [`https://${SITE.domain}`],
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  publisher: { "@id": `${SITE.url}/#organization` },
  inLanguage: "en-IN",
};

const faqPage = {
  "@type": "FAQPage",
  "@id": `${SITE.url}/#faq`,
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const CATEGORY_LABELS = {
  hotels: "Hotels & Stays",
  restaurants: "Restaurants",
  agencies: "Travel Agencies",
} as const;

const service = {
  "@type": "Service",
  "@id": `${SITE.url}/#service`,
  name: "TripKnot Business Listing",
  serviceType: "Tourism business listing and lead generation platform",
  provider: { "@id": `${SITE.url}/#organization` },
  areaServed: { "@type": "Country", name: "India" },
  hasOfferCatalog: (Object.keys(PRICING) as (keyof typeof PRICING)[]).map(
    (categoryId) => ({
      "@type": "OfferCatalog",
      name: `${CATEGORY_LABELS[categoryId]} plans`,
      itemListElement: PRICING[categoryId].map((plan) => ({
        "@type": "Offer",
        name: `${CATEGORY_LABELS[categoryId]} — ${plan.name}`,
        description: plan.tagline,
        price: plan.price,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: plan.price,
          priceCurrency: "INR",
          unitCode: "MON",
          billingDuration: 1,
        },
        itemOffered: {
          "@type": "Service",
          name: plan.name,
          description: plan.features.join(", "),
        },
      })),
    })
  ),
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [organization, website, faqPage, service],
};
