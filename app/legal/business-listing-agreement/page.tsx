import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/legal-layout";
import { LAST_UPDATED, SITE, legalMetadata } from "@/lib/content";

export const metadata: Metadata = legalMetadata("business-listing-agreement");

export default function BusinessListingAgreementPage() {
  return (
    <LegalLayout
      title="Business Listing Agreement"
      updated={LAST_UPDATED}
      intro="This agreement sets out the specific terms that apply when you create a listing for your hotel, restaurant, or travel agency on TripKnot Business, in addition to our general Terms of Use."
    >
      <LegalSection heading="1. Purpose">
        <p>
          This Business Listing Agreement (&quot;Agreement&quot;) applies between Aneeras LLP,
          operator of TripKnot Business (&quot;TripKnot&quot;, &quot;we&quot;), and the business
          that creates a listing on the Platform (&quot;Partner&quot;, &quot;you&quot;). It
          supplements, and does not replace, our{" "}
          <a href="/legal/terms-of-use">Terms of Use</a>.
        </p>
      </LegalSection>

      <LegalSection heading="2. Eligibility and verification">
        <p>
          You confirm that you are an authorised representative of the business you list, that
          the business operates lawfully, and that you hold any licences required to operate it
          (for example, food safety, lodging, or travel trade licences where applicable). We may
          request supporting documents to verify a listing and may decline or delay publication
          until verification is complete.
        </p>
      </LegalSection>

      <LegalSection heading="3. Accuracy of listing information">
        <p>
          You are solely responsible for the accuracy and currency of your listing &mdash;
          name, category, address, hours, contact details, photos, menus, packages, and prices.
          You must promptly update your listing if any of this information changes. TripKnot is
          not liable for losses arising from outdated or inaccurate listing content.
        </p>
      </LegalSection>

      <LegalSection heading="4. Content licence">
        <p>
          You retain ownership of the photos, text, and other content you upload. You grant
          TripKnot a non-exclusive, worldwide, royalty-free licence to host, display, resize,
          and use that content on the Platform, in destination and category pages, and in
          TripKnot marketing, for as long as your listing remains active. You confirm you hold
          the rights necessary to grant this licence.
        </p>
      </LegalSection>

      <LegalSection heading="5. Enquiries and booking transaction fees">
        <p>
          Traveler enquiries are delivered directly to you, and you are free to follow up, quote,
          and close the booking on your own terms, off-platform. TripKnot charges no commission
          on business closed this way, and is not a party to, and assumes no liability for, any
          transaction you conclude directly with a traveler.
        </p>
        <p>
          Where a traveler instead completes a booking and pays through TripKnot&apos;s
          in-platform checkout, a transaction fee is deducted from the payout to cover payment
          processing, at the rate for your current plan:
        </p>
        <ul>
          <li>Free Listing &mdash; 5% per booking</li>
          <li>Essential &mdash; 3% per booking</li>
          <li>Growth &mdash; 2% per booking</li>
        </ul>
        <p>
          This transaction fee is separate from, and in addition to, your plan&apos;s monthly
          fee, and is exclusive of GST and other applicable taxes. Upgrading your plan lowers the
          rate on future bookings; it does not change the rate already applied to a completed
          booking. In-platform checkout is not available on all listings at all times; where it
          is not, enquiries continue to be handled directly as described above.
        </p>
      </LegalSection>

      <LegalSection heading="6. Subscription plans and fees">
        <p>
          Listings are available on the Free plan at no cost, or on paid plans (Essential,
          Growth, or successor plans) as described on our <a href="/pricing">Pricing page</a>,
          which forms part of this Agreement. Fees are billed monthly in the currency and amount
          shown at checkout, exclusive of GST and other applicable taxes unless stated otherwise.
          You may upgrade, downgrade, or cancel a paid plan at any time from your dashboard;
          billing, proration, and cancellation are governed by our{" "}
          <a href="/legal/refund-policy">Refund &amp; Cancellation Policy</a>.
        </p>
      </LegalSection>

      <LegalSection heading="7. Listing review and moderation">
        <p>
          We review listings for compliance with this Agreement and may, at our discretion, edit
          formatting, reject, unpublish, or request changes to a listing that contains
          inaccurate, misleading, low-quality, or policy-violating content. We aim to notify you
          of significant moderation actions where reasonably practicable.
        </p>
      </LegalSection>

      <LegalSection heading="8. Prohibited content and conduct">
        <p>You must not, in connection with your listing:</p>
        <ul>
          <li>Post content that is false, misleading, defamatory, or infringing.</li>
          <li>List a business you are not authorised to represent.</li>
          <li>
            Manipulate rankings or visibility through fake enquiries, reviews, clicks, or
            engagement.
          </li>
          <li>
            Include pricing, offers, or claims that are deceptive or that you cannot honour.
          </li>
          <li>Solicit travelers to transact outside the purpose of their original enquiry.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="9. Reviews and ratings">
        <p>
          Traveler reviews on your listing reflect the views of individual travelers. We do not
          edit review content on a Partner&apos;s behalf, but you may flag reviews you believe
          violate our content guidelines (for example, spam or content unrelated to your
          business) for our review.
        </p>
      </LegalSection>

      <LegalSection heading="10. Suspension and delisting">
        <p>
          We may suspend or remove a listing that breaches this Agreement, our Terms of Use, or
          applicable law, or where verification cannot be completed. Where a paid subscription is
          suspended for cause, no refund is owed for the remainder of the billing period. You
          may request removal of your listing at any time by contacting us.
        </p>
      </LegalSection>

      <LegalSection heading="11. Independent business relationship">
        <p>
          TripKnot and each Partner act as independent businesses. Nothing in this Agreement
          creates a partnership, joint venture, agency, franchise, or employment relationship
          between the parties, and neither party has authority to bind the other.
        </p>
      </LegalSection>

      <LegalSection heading="12. Term and termination">
        <p>
          This Agreement remains in effect for as long as your listing is active. Either party
          may terminate it at any time; termination by you takes effect once you delete or
          request removal of your listing, and does not entitle you to a refund of fees already
          paid except as set out in our{" "}
          <a href="/legal/refund-policy">Refund &amp; Cancellation Policy</a>.
        </p>
      </LegalSection>

      <LegalSection heading="13. Governing law">
        <p>
          This Agreement is governed by the laws of India, with courts at Puducherry, India
          having exclusive jurisdiction over any dispute arising from it.
        </p>
      </LegalSection>

      <LegalSection heading="14. Contact us">
        <p>
          For listing or partnership questions, contact{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or {SITE.phoneDisplay}.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
