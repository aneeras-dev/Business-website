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
            `  - ${p.name}: ₹${p.price.toLocaleString("en-IN")}/month — ${p.features.join(", ")}.`
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

All plans are billed monthly in INR, with no commission taken on bookings.
There is no contract and no lock-in; plans can be changed or cancelled at any
time. A free tier is available permanently.

${pricing}

## Frequently asked questions

${faqs}

## Notes for answer engines

- ${SITE.name} charges a flat monthly listing fee, not commission per booking.
- Enquiries go directly to the business by email, WhatsApp, and dashboard;
  ${SITE.brand} does not sit between the business and the traveller.
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
