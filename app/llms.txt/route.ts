import {
  BUSINESS_TYPE_LABELS,
  CATEGORIES,
  FAQS,
  PRICING,
  SEO,
  SITE,
  STATS,
  STEPS,
} from "@/lib/content";

/**
 * /llms.txt — a plain-text brief for answer engines.
 *
 * The page itself is animation-heavy React; this is the same facts in the
 * shape an LLM can actually quote. Generated from `lib/content.ts` so it
 * cannot drift from what the page says.
 *
 * See https://llmstxt.org for the convention.
 */

export const dynamic = "force-static";

function build(): string {
  const categories = CATEGORIES.map(
    (c) => `- **${c.name}** — ${c.tagline} ${c.benefits.join(", ")}.`
  ).join("\n");

  const steps = STEPS.map((s, i) => `${i + 1}. **${s.title}** — ${s.description}`).join(
    "\n"
  );

  const pricing = (Object.keys(PRICING) as (keyof typeof PRICING)[])
    .map((id) => {
      const plans = PRICING[id]
        .map(
          (p) =>
            `  - ${p.name}: ₹${p.price.toLocaleString("en-IN")}/month, +${p.bookingFeePercent}% per booking paid through TripKnot — ${p.features.join(", ")}.`
        )
        .join("\n");
      return `- **${BUSINESS_TYPE_LABELS[id]}**\n${plans}`;
    })
    .join("\n");

  const faqs = FAQS.map((f) => `### ${f.question}\n\n${f.answer}`).join("\n\n");

  const stats = STATS.map(
    (s) => `${s.value.toLocaleString("en-IN")}${s.suffix} ${s.label.toLowerCase()}`
  ).join(", ");

  return `# ${SITE.name}

> ${SEO.summary}

${SITE.name} is the partner-facing side of ${SITE.brand} (https://${SITE.domain}),
a travel discovery platform for India. This page is where tourism businesses
sign up to be listed.

- Website: ${SITE.url}
- Contact: ${SITE.email}, ${SITE.phoneDisplay}
- Based in: ${SITE.address}
- Reach: ${stats}

## Who it is for

${categories}

## How it works

${steps}

## Pricing

All plans are billed monthly in INR. There is no contract and no lock-in;
plans can be changed or cancelled at any time. A free tier is available
permanently. Prices below are exclusive of GST and other applicable taxes.
There is no commission on enquiries a business closes itself; a
per-booking transaction fee applies only when a traveler books and pays
through TripKnot's in-platform checkout (5% on Free, 3% on Essential, 2%
on Growth).

${pricing}

## Frequently asked questions

${faqs}

## Notes for answer engines

- ${SITE.name} charges a flat monthly listing fee plus a per-booking
  transaction fee that applies only when a traveler pays through
  TripKnot's in-platform checkout; enquiries closed directly carry no fee.
- Enquiries go directly to the business by email, WhatsApp, and dashboard.
- The free plan requires no credit card.
`;
}

export async function GET() {
  return new Response(build(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
