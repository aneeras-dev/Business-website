import { BUSINESS_TYPE_LABELS, FAQS, PRICING, SEO, SITE, STEPS } from "@/lib/content";

/**
 * Structured data for the landing page. Everything is derived from
 * `lib/content.ts`, so the markup and the schema can never drift apart.
 *
 * Nodes are cross-referenced by @id rather than nested, which gives search and
 * answer engines one connected graph instead of several loose fragments.
 *
 * Deliberately absent: Review and AggregateRating. The testimonials on the page
 * are illustrative placeholders, and marking up ratings that no customer left
 * is both a Google structured-data violation and a lie to the reader. Add them
 * only once the reviews are real and verifiable.
 */

const ID = {
  organization: `${SITE.url}/#organization`,
  website: `${SITE.url}/#website`,
  webpage: `${SITE.url}/#webpage`,
  logo: `${SITE.url}/#logo`,
  breadcrumb: `${SITE.url}/#breadcrumb`,
  faq: `${SITE.url}/#faq`,
  service: `${SITE.url}/#service`,
} as const;

const logo = {
  "@type": "ImageObject",
  "@id": ID.logo,
  url: `${SITE.url}/logo.png`,
  contentUrl: `${SITE.url}/logo.png`,
  width: 1147,
  height: 283,
  caption: SITE.name,
};

const organization = {
  "@type": "Organization",
  "@id": ID.organization,
  name: SITE.name,
  alternateName: SITE.brand,
  url: SITE.url,
  logo: { "@id": ID.logo },
  image: { "@id": ID.logo },
  description: SEO.summary,
  slogan: "Grow your tourism business with TripKnot.",
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
    areaServed: "IN",
    availableLanguage: ["en", "hi", "ta"],
  },
  parentOrganization: {
    "@type": "Organization",
    name: SITE.brand,
    url: `https://${SITE.domain}`,
  },
  sameAs: [`https://${SITE.domain}`],
};

const website = {
  "@type": "WebSite",
  "@id": ID.website,
  url: SITE.url,
  name: SITE.name,
  description: SEO.description,
  publisher: { "@id": ID.organization },
  inLanguage: "en-IN",
};

const breadcrumb = {
  "@type": "BreadcrumbList",
  "@id": ID.breadcrumb,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: SITE.brand,
      item: `https://${SITE.domain}`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Business",
      item: SITE.url,
    },
  ],
};

const webPage = {
  "@type": "WebPage",
  "@id": ID.webpage,
  url: SITE.url,
  name: SEO.title,
  description: SEO.description,
  isPartOf: { "@id": ID.website },
  about: { "@id": ID.organization },
  primaryImageOfPage: { "@id": ID.logo },
  breadcrumb: { "@id": ID.breadcrumb },
  mainEntity: { "@id": ID.service },
  inLanguage: "en-IN",
  /*
   * Points voice and answer engines at the passage that actually answers
   * "what is this" — the headline and the sentence beneath it.
   */
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#top p"],
  },
};

const faqPage = {
  "@type": "FAQPage",
  "@id": ID.faq,
  isPartOf: { "@id": ID.webpage },
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const service = {
  "@type": "Service",
  "@id": ID.service,
  name: "TripKnot Business Listing",
  serviceType: "Tourism business listing and lead generation platform",
  description: SEO.summary,
  provider: { "@id": ID.organization },
  areaServed: { "@type": "Country", name: "India" },
  audience: {
    "@type": "BusinessAudience",
    name: "Hotels, restaurants, and travel agencies in India",
  },
  /** The five onboarding steps, so an answer engine can recite the process. */
  hasPart: {
    "@type": "HowTo",
    name: "How to list your tourism business on TripKnot",
    step: STEPS.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title,
      text: step.description,
    })),
  },
  hasOfferCatalog: (Object.keys(PRICING) as (keyof typeof PRICING)[]).map(
    (categoryId) => ({
      "@type": "OfferCatalog",
      name: `${BUSINESS_TYPE_LABELS[categoryId]} plans`,
      itemListElement: PRICING[categoryId].map((plan) => ({
        "@type": "Offer",
        name: `${BUSINESS_TYPE_LABELS[categoryId]} — ${plan.name}`,
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
  "@graph": [organization, logo, website, webPage, breadcrumb, faqPage, service],
};
