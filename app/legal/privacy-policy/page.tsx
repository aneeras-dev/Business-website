import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/legal-layout";
import { LAST_UPDATED, SITE, legalMetadata } from "@/lib/content";

export const metadata: Metadata = legalMetadata("privacy-policy");

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      updated={LAST_UPDATED}
      intro="This policy explains what information TripKnot Business collects from partner businesses and their end customers, how we use it, and the choices you have."
    >
      <LegalSection heading="1. Who this policy covers">
        <p>
          Aneeras LLP (&quot;Aneeras&quot;, &quot;TripKnot&quot;, &quot;we&quot;,
          &quot;our&quot;, or &quot;us&quot;) operates TripKnot Business (&quot;the
          Platform&quot;), a listing and lead-generation platform for hotels, restaurants, and
          travel agencies. This Privacy Policy covers the businesses that create a partner
          account or listing with us (&quot;Partners&quot;, &quot;you&quot;), and, where
          relevant, the travelers whose enquiries Partners receive through the Platform. It does
          not cover the separate consumer-facing TripKnot app or website, which has its own
          privacy policy.
        </p>
      </LegalSection>

      <LegalSection heading="2. Information we collect">
        <p>We collect information in three ways:</p>
        <ul>
          <li>
            <strong>Information you give us directly</strong> &mdash; account details (name,
            business name, email, phone number, password), business profile content (category,
            address, hours, description, photos, menus, packages, offers), billing and tax
            details for paid plans, and any correspondence with our support or sales team.
          </li>
          <li>
            <strong>Information collected automatically</strong> &mdash; log data (IP address,
            device and browser type, pages viewed), and usage/analytics data about how your
            listing performs (views, saves, map clicks, direction taps). See our{" "}
            <a href="/legal/cookie-policy">Cookie Policy</a> for details on cookies and similar
            technologies.
          </li>
          <li>
            <strong>Information from travelers</strong> &mdash; when a traveler submits an
            enquiry to your listing, we collect their name, contact details, and enquiry
            content, and pass this directly to you so you can respond. We are a conduit for
            this exchange; we do not sell or rent traveler contact details.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="3. How we use information">
        <ul>
          <li>To create, verify, and operate your business listing and account.</li>
          <li>To route traveler enquiries to the correct Partner.</li>
          <li>To process subscription payments, invoices, and taxes for paid plans.</li>
          <li>
            To provide analytics on your listing&apos;s performance (views, saves, clicks,
            campaign results).
          </li>
          <li>
            To send service communications: account, billing, enquiry, and policy
            notifications.
          </li>
          <li>
            With your consent or opt-in, to send product updates and promotional messages,
            which you can opt out of at any time.
          </li>
          <li>To detect, investigate, and prevent fraud, abuse, and policy violations.</li>
          <li>To comply with legal obligations and enforce our agreements.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="4. How we share information">
        <p>We do not sell your personal information. We share it only with:</p>
        <ul>
          <li>
            <strong>Service providers</strong> who help us run the Platform &mdash; hosting,
            email delivery, analytics, payment processing, and customer support tooling &mdash;
            bound by contract to use the data only to provide that service.
          </li>
          <li>
            <strong>Travelers</strong>, who see the business profile information you choose to
            publish (name, address, photos, hours, offers, and similar public listing content).
          </li>
          <li>
            <strong>Legal and safety purposes</strong> &mdash; where required by law, court
            order, or governmental request, or to protect the rights, property, or safety of
            TripKnot, our Partners, or the public.
          </li>
          <li>
            <strong>Business transfers</strong> &mdash; if TripKnot is involved in a merger,
            acquisition, or asset sale, information may be transferred as part of that
            transaction, subject to the same protections described here.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="5. Data retention">
        <p>
          We retain account and listing information for as long as your account is active, and
          for a reasonable period afterward to comply with legal, tax, and accounting
          requirements, resolve disputes, and enforce our agreements. Traveler enquiry data
          shared with you is retained on our systems for a limited operational window and then
          deleted or anonymised; how long you retain it once received is governed by your own
          data practices and applicable law.
        </p>
      </LegalSection>

      <LegalSection heading="6. Data security">
        <p>
          We use administrative, technical, and physical safeguards designed to protect
          information against unauthorised access, alteration, disclosure, or destruction,
          including encryption in transit and access controls on production systems. No method
          of transmission or storage is completely secure, and we cannot guarantee absolute
          security.
        </p>
      </LegalSection>

      <LegalSection heading="7. Your rights and choices">
        <p>
          Subject to applicable law, including India&apos;s Digital Personal Data Protection
          Act, 2023, you may request access to, correction of, or deletion of your personal
          information, and may withdraw consent for optional communications at any time. You can
          update most account and listing details directly from your Partner dashboard, or
          contact us using the details below and we will respond within a reasonable time.
        </p>
      </LegalSection>

      <LegalSection heading="8. Children's privacy">
        <p>
          TripKnot Business is intended for business owners and representatives who are at least
          18 years old. We do not knowingly collect personal information from children.
        </p>
      </LegalSection>

      <LegalSection heading="9. Where we store information">
        <p>
          We store and process information on servers located in India and, where our service
          providers require it, in other countries with appropriate safeguards in place.
        </p>
      </LegalSection>

      <LegalSection heading="10. Changes to this policy">
        <p>
          We may update this policy from time to time. If we make material changes, we will
          notify Partners by email or through the dashboard before the change takes effect. The
          &quot;Last updated&quot; date at the top of this page always reflects the current
          version.
        </p>
      </LegalSection>

      <LegalSection heading="11. Contact us">
        <p>
          For privacy questions, access requests, or grievances, contact our team at{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or write to us at {SITE.address}.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
