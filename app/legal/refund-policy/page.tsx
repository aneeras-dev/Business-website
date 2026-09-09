import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/legal-layout";
import { LAST_UPDATED, SITE, legalMetadata } from "@/lib/content";

export const metadata: Metadata = legalMetadata("refund-policy");

export default function RefundPolicyPage() {
  return (
    <LegalLayout
      title="Refund & Cancellation Policy"
      updated={LAST_UPDATED}
      intro="How billing, cancellation, and refunds work for TripKnot Business paid subscription plans. There is no contract and no lock-in on any plan."
    >
      <LegalSection heading="1. Free listing">
        <p>
          The Free plan costs nothing and has no billing cycle. You can create, use, and delete
          a Free listing at any time; this policy applies only to paid plans.
        </p>
      </LegalSection>

      <LegalSection heading="2. Billing cycle">
        <p>
          Paid plans (Essential, Growth, or successor plans described on our{" "}
          <a href="/pricing">Pricing page</a>) are billed monthly in advance from the date you
          subscribe, and renew automatically each month unless cancelled before the renewal
          date.
        </p>
      </LegalSection>

      <LegalSection heading="3. Cancellation">
        <p>
          You can cancel a paid plan at any time from your Partner dashboard. Cancellation stops
          future renewals; you keep access to the paid plan&apos;s features for the remainder of
          the billing period you already paid for, and your listing then reverts automatically
          to the Free plan &mdash; it is never deleted, and you keep your reviews and listing
          history.
        </p>
      </LegalSection>

      <LegalSection heading="4. Upgrades and downgrades">
        <p>
          You may switch between paid plans at any time. Upgrades take effect immediately and
          are pro-rated: we credit the unused portion of your current plan toward the new
          plan&apos;s cost, so you only pay the difference for the remainder of the cycle.
          Downgrades take effect at the start of your next billing period.
        </p>
      </LegalSection>

      <LegalSection heading="5. Booking transaction fees">
        <p>
          Where a traveler books and pays through TripKnot&apos;s in-platform checkout, a
          transaction fee (5% on Free, 3% on Essential, 2% on Growth, exclusive of GST) is
          deducted from the payout to cover payment processing, as described in our{" "}
          <a href="/legal/business-listing-agreement">Business Listing Agreement</a>. If the
          underlying booking is refunded to the traveler, we refund our transaction fee for that
          booking in the same proportion; the fee is otherwise non-refundable.
        </p>
      </LegalSection>

      <LegalSection heading="6. Refunds">
        <p>
          Fees already charged for a billing period are generally non-refundable, including
          where you cancel partway through a month or stop using your listing without
          cancelling. We make an exception and issue a full or partial refund where:
        </p>
        <ul>
          <li>You were charged more than once for the same billing period by error.</li>
          <li>A technical fault on our side prevented your listing from being published.</li>
          <li>Required by applicable consumer protection law.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="7. Failed or disputed payments">
        <p>
          If a renewal payment fails, we will attempt to notify you and retry the charge. If
          payment is not resolved within a reasonable period, your plan will be downgraded to
          Free at the end of the current billing period. If you believe a charge was made in
          error, contact us before disputing it with your bank or card issuer so we can
          investigate first.
        </p>
      </LegalSection>

      <LegalSection heading="8. How to request a refund">
        <p>
          Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with your account details and
          the reason for the request. We aim to respond within 5 business days. Approved refunds
          are returned to the original payment method within 7&ndash;10 business days.
        </p>
      </LegalSection>

      <LegalSection heading="9. Changes to this policy">
        <p>
          We may update this policy from time to time; material changes will be notified by
          email or through the dashboard before they take effect.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
