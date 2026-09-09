import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/legal-layout";
import { LAST_UPDATED, SITE, legalMetadata } from "@/lib/content";

export const metadata: Metadata = legalMetadata("terms-of-use");

export default function TermsOfUsePage() {
  return (
    <LegalLayout
      title="Terms of Use"
      updated={LAST_UPDATED}
      intro="These terms govern access to and use of the TripKnot Business website and partner dashboard. Terms specific to creating a listing are set out separately in our Business Listing Agreement."
    >
      <LegalSection heading="1. Acceptance of these terms">
        <p>
          By accessing or using TripKnot Business (&quot;the Platform&quot;), operated by
          Aneeras LLP (&quot;TripKnot&quot;, &quot;we&quot;, &quot;us&quot;), you agree to be
          bound by these Terms of Use. If you are using the Platform on behalf of a business,
          you confirm you have authority to bind that business, and &quot;you&quot; refers to
          both you and that business. If you do not agree, do not use the Platform.
        </p>
      </LegalSection>

      <LegalSection heading="2. Eligibility">
        <p>
          You must be at least 18 years old and able to form a binding contract to create an
          account. The Platform is intended for hotels, restaurants, travel agencies, and
          similar tourism businesses operating lawfully in the jurisdictions where they list.
        </p>
      </LegalSection>

      <LegalSection heading="3. Your account">
        <p>
          You are responsible for the accuracy of the information you provide when registering,
          for keeping your login credentials confidential, and for all activity that occurs
          under your account. Notify us immediately at{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> if you suspect unauthorised access.
        </p>
      </LegalSection>

      <LegalSection heading="4. Description of the service">
        <p>
          TripKnot Business is a listing and lead-generation platform that helps tourism
          businesses create a public profile, appear in traveler search and discovery, and
          receive enquiries directly from travelers. You may close a booking directly with a
          traveler at no commission, or, where available, let the traveler book and pay through
          TripKnot&apos;s in-platform checkout, which carries a transaction fee described in our{" "}
          <a href="/legal/business-listing-agreement">Business Listing Agreement</a>.
        </p>
      </LegalSection>

      <LegalSection heading="5. Plans and fees">
        <p>
          The Platform offers a free listing tier and paid subscription tiers, described on our{" "}
          <a href="/pricing">Pricing page</a>. Billing, cancellation, upgrades, and refunds for
          paid plans are governed by our{" "}
          <a href="/legal/refund-policy">Refund &amp; Cancellation Policy</a>.
        </p>
      </LegalSection>

      <LegalSection heading="6. Acceptable use">
        <p>You agree not to:</p>
        <ul>
          <li>Post false, misleading, or fraudulent listing information.</li>
          <li>
            Upload content you do not have the rights to use, or that infringes a third
            party&apos;s intellectual property.
          </li>
          <li>Attempt to gain unauthorised access to the Platform or other accounts.</li>
          <li>
            Interfere with or disrupt the Platform&apos;s operation, including through scraping,
            reverse engineering, or automated data collection not expressly permitted.
          </li>
          <li>
            Use traveler contact details received through the Platform for any purpose other
            than responding to that traveler&apos;s enquiry, or share them with third parties
            without consent.
          </li>
          <li>Use the Platform for any unlawful purpose.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="7. Content and intellectual property">
        <p>
          You retain ownership of the content you upload (photos, descriptions, menus, offers).
          By uploading it, you grant TripKnot a worldwide, royalty-free licence to host,
          reproduce, and display that content on the Platform and in related marketing, for as
          long as your listing is active. The TripKnot name, logo, and Platform software are our
          property or that of our licensors, and nothing in these terms grants you rights to
          them beyond what is needed to use the service.
        </p>
      </LegalSection>

      <LegalSection heading="8. Third-party links">
        <p>
          The Platform may link to third-party websites or services we do not control. We are
          not responsible for their content, policies, or practices.
        </p>
      </LegalSection>

      <LegalSection heading="9. Disclaimers">
        <p>
          The Platform is provided &quot;as is&quot; and &quot;as available&quot;, without
          warranties of any kind, express or implied, including merchantability, fitness for a
          particular purpose, and non-infringement. We do not guarantee any specific volume of
          traffic, enquiries, or bookings.
        </p>
      </LegalSection>

      <LegalSection heading="10. Limitation of liability">
        <p>
          To the maximum extent permitted by law, TripKnot and its officers, employees, and
          affiliates will not be liable for any indirect, incidental, special, or consequential
          damages, or for lost profits or revenue, arising from your use of the Platform. Our
          total liability for any claim relating to the Platform will not exceed the amount you
          paid us in the twelve months preceding the claim.
        </p>
      </LegalSection>

      <LegalSection heading="11. Indemnification">
        <p>
          You agree to indemnify and hold TripKnot harmless from any claims, losses, or expenses
          (including reasonable legal fees) arising from your listing content, your breach of
          these terms, or your violation of any law or third-party right.
        </p>
      </LegalSection>

      <LegalSection heading="12. Suspension and termination">
        <p>
          You may stop using the Platform and close your account at any time. We may suspend or
          terminate access to a listing that violates these terms, our{" "}
          <a href="/legal/business-listing-agreement">Business Listing Agreement</a>, or
          applicable law, with notice where reasonably practicable.
        </p>
      </LegalSection>

      <LegalSection heading="13. Governing law and disputes">
        <p>
          These terms are governed by the laws of India. Courts at Puducherry, India have
          exclusive jurisdiction over any dispute arising from these terms or your use of the
          Platform.
        </p>
      </LegalSection>

      <LegalSection heading="14. Changes to these terms">
        <p>
          We may update these terms from time to time. Material changes will be notified by
          email or through the dashboard before they take effect. Continued use of the Platform
          after a change takes effect constitutes acceptance of the updated terms.
        </p>
      </LegalSection>

      <LegalSection heading="15. Contact us">
        <p>
          Questions about these terms can be sent to{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or {SITE.phoneDisplay}.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
