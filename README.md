# TripKnot Business — Partner Landing Page

Conversion-focused B2B landing page for [tripknot.in](https://tripknot.in), aimed at
hotels, restaurants, and travel agencies across India.

## Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** — CSS-first config, no `tailwind.config.js`
- **Framer Motion 13** for animation
- **Lucide React** for icons

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
npm run lint
```

## Structure

```
app/
  api/sales/route.ts   validates enquiries and sends both emails via Resend
  layout.tsx           metadata, JSON-LD, fonts
  page.tsx             composes the sections in order
  globals.css          design tokens and keyframes
  opengraph-image.tsx  social card rendered at request time
  twitter-image.tsx    re-exports the OG image
  robots.ts / sitemap.ts
components/
  sales-dialog.tsx     enquiry modal + open-from-anywhere provider
  site-header.tsx      sticky nav, mobile menu
  site-footer.tsx
  sections/            one file per landing-page section
  ui/                  logo, reveal, count-up, section-heading, button
lib/
  content.ts           all copy and pricing data (single source of truth)
  sales.ts             enquiry shape + validation, shared client and server
  emails.ts            confirmation + lead notification email bodies
  schema.ts            JSON-LD derived from content.ts
  motion.ts            shared variants and easing
  utils.ts             cn() class joiner
```

### Content is data

Every headline, benefit, plan, and FAQ lives in `lib/content.ts`. `lib/schema.ts`
builds the Organization, WebSite, FAQPage, and Service/Offer structured data from
that same module, so the rendered page and the SEO markup cannot drift apart.
To change pricing or copy, edit `lib/content.ts` only.

## Design system

Theme, layout, and typography are taken from the live marketing site,
[tripknot.in](https://www.tripknot.in/), so the partner portal reads as the same
brand. Tokens below were sampled from that site's computed styles.

**Type** — Figtree for UI and body copy, Bricolage Grotesque for display
headings, both via `next/font/google`. The `.font-display` utility carries the
house treatment: weight 600, `-0.035em` tracking, `0.96` line-height.

**Palette**

| Role              | Hex       | Token            |
| ----------------- | --------- | ---------------- |
| Page ground       | `#F6F4EF` | `surface`        |
| Cards             | `#FFFFFF` | `surface-raised` |
| Ink               | `#0E1413` | `ink`            |
| Muted text        | `#5A625F` | `ink-muted`      |
| Faint text        | `#A8A99F` | `ink-faint`      |
| Primary accent    | `#0D7A7B` | `teal-600`       |
| Accent on dark    | `#5BC1C2` | `teal-400`       |
| Secondary accent  | `#B84A32` | `rust-600`       |
| Dark bands        | `#0B100F` | —                |
| Hairline          | `rgba(14,20,19,0.08)` | `hairline` |

`moss-*` is the one addition — tripknot.in ships only teal and terracotta, and
the three business categories need a third distinguishable accent that still
sits in the warm earth palette.

**Layout** — 1184px content column, section openers centred (tracked teal
eyebrow → oversized display heading → short muted line), flat white cards with
22–24px corners and a hairline border rather than shadows, pill buttons (solid
ink on cream, solid white on the dark bands), and near-black inset panels at
32px for the closing CTA.

## Brand mark

`public/logo.svg` is the supplied master lockup: mark + "TripKnot" wordmark +
the tagline "Don't Just Travel. Connect." That file is left untouched.

`components/ui/logo.tsx` inlines the mark and wordmark as a React component —
no network request, crisp at any size, and no `next/image` warning (the image
optimizer rejects SVG by default anyway). Two deliberate changes from the
master file:

- **The tagline is dropped.** It is unreadable below roughly 200px wide, and
  the header lockup renders at ~146px.
- **The wordmark is nudged down 19 units.** The master lockup centres the mark
  against wordmark *and* tagline; without the tagline it needs re-centring.

`variant="light"` recolours the wordmark to `#F6F4EF` for the near-black
footer. The mark's gradient is unchanged in both variants.

`public/logo-lockup.png` is the same lockup rasterised at 2x, for the emails —
inline SVG is stripped by Gmail and most clients. Its `src` is absolute
(`SITE.url`), since a mail client resolves it outside the app; regenerate it
from `public/logo.svg` if the mark ever changes.

### Icons and social card

All file-convention metadata in `app/`, so Next emits the tags and cache-busts:

| File | Purpose |
| --- | --- |
| `icon.svg` | Primary favicon — vector, crisp at every size |
| `favicon.ico` | Legacy fallback, 16/32/48 packed from the same artwork |
| `apple-icon.png` | 180x180 on white (iOS composites transparency to black) |
| `opengraph-image.png` + `.alt.txt` | Social card |
| `twitter-image.png` + `.alt.txt` | Same card for Twitter/X |

The `.alt.txt` sidecars are read **verbatim** — write them with no trailing
newline, or the newline lands inside the `content` attribute.

If the tagline is ever needed at a large size, use `public/logo.svg` directly.

## Theme

Single light theme, matching tripknot.in — there is no dark mode and no theme
toggle. `color-scheme` is pinned to `light` so browser UI does not invert form
controls. The near-black bands (footer, featured pricing plan, the "With
TripKnot" panel, the closing CTA) are painted explicitly where they are used,
not driven by a theme.

Note that next/font variables are set on `<html>`, not `<body>`. Tailwind
declares `--font-sans` on `:root`; if the font variable is only defined further
down the tree, that token is invalid where it is declared and type silently
falls back to system fonts.

## Sales enquiry form

A modal enquiry form, opened from two places:

- every **pricing plan CTA** (Get Started Free / Start Essential / Start Growth)
- **Talk to sales** in the closing CTA

`components/sales-dialog.tsx` holds the provider, dialog, and form.
`SalesDialogProvider` wraps the page in `app/page.tsx`; any client component
below it can call `useSalesDialog().openSalesDialog(prefill)`.

**Prefill.** Opening from a pricing card passes the business type (from the
selected pricing tab) and the plan, and the dialog subtitle names the plan —
"About the Growth plan." Opening from Talk to sales starts blank.

**Built on native `<dialog>` + `showModal()`**, so focus trapping, Escape, the
inert background, and focus restoration are browser-provided rather than
reimplemented. Framer Motion animates a panel inside it; `onCancel` is
intercepted so Escape can play the exit animation before `close()` runs.

**Validation** lives in `lib/sales.ts` and runs in both places — in the browser
for inline feedback, and again in the route handler, since the client pass can
be bypassed. Submitting with errors moves focus to the first invalid field.

### Email delivery

`app/api/sales/route.ts` sends two emails through [Resend](https://resend.com)
on every valid submission:

1. **To the enquirer** — a confirmation echoing back what they submitted.
2. **To the partnerships inbox** — the lead itself, with `replyTo` set to the
   enquirer so hitting reply reaches them directly.

Both bodies live in `lib/emails.ts` as table-based HTML with inline styles
(email clients strip `<style>` blocks), each with a plain-text alternative.
Every interpolated value is HTML-escaped — it is text typed by a stranger.

The two sends run through `Promise.allSettled` and are **not** treated equally:

| Outcome | Response | Why |
| --- | --- | --- |
| Admin email fails | `502` + "email us directly" | The lead would be lost, so never report success |
| Confirmation fails | `200` | The lead is captured; a missing courtesy email is not worth a duplicate submission |
| `RESEND_API_KEY` unset | `500` | Fail loudly rather than drop leads silently |

### Configuration

Copy `.env.example` to `.env.local`:

```
RESEND_API_KEY=          # server-only, never prefix NEXT_PUBLIC_
SALES_FROM_EMAIL=        # domain must be verified in Resend
SALES_ADMIN_EMAIL=       # inbox that receives leads
```

`mail.tripknot.in` is the verified sending domain. `SALES_FROM_EMAIL` **must**
sit on a domain verified in Resend or every send is rejected.

To exercise the flow without emailing anyone real, point `SALES_ADMIN_EMAIL` at
Resend's simulator addresses — `delivered@resend.dev`, `bounced@resend.dev`, or
`complained@resend.dev`.

## Accessibility

- One `<h1>`, ordered headings, single `<main>`, skip-to-content link
- Tabs use `role="tablist"` / `aria-selected` / `aria-controls`; the accordion
  uses `aria-expanded` with labelled regions
- Counters expose the final value via `aria-label` while the digits animate
- Charts carry `role="img"` with descriptive labels; decorative layers are
  `aria-hidden`
- `prefers-reduced-motion` is honoured in CSS and by Framer Motion
- The logo is a single `<svg role="img">` with an `aria-label`
- A `<noscript>` rule reveals scroll-reveal content when JS never runs
- The enquiry dialog uses native `<dialog>`, so focus trapping and Escape are
  browser behaviour; fields carry `aria-invalid` and `aria-describedby`

## Notes

- Pricing CTAs and Talk to sales open the enquiry dialog. The "Start free
  listing" buttons in the header and hero still scroll to `#start`; point them
  at the real signup route when it exists.
- Stats, testimonials, and dashboard figures are illustrative placeholders.
  Replace them in `lib/content.ts` before launch. Note the testimonial
  locations are the partners' cities, not TripKnot's address.
- Business address, phone, and email live once in `SITE` (`lib/content.ts`) and
  feed the footer, both email templates, and the Organization structured data.
- Enquiries are delivered by email only. If lead volume grows, add persistence
  so a Resend outage cannot lose one.
- `SITE.url` in `lib/content.ts` drives `metadataBase`, canonical URLs, the
  sitemap, and JSON-LD `@id` values. Update it if the domain changes.
