import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/legal-layout";
import { LAST_UPDATED, SITE, legalMetadata } from "@/lib/content";

export const metadata: Metadata = legalMetadata("cookie-policy");

export default function CookiePolicyPage() {
  return (
    <LegalLayout
      title="Cookie Policy"
      updated={LAST_UPDATED}
      intro="This policy explains the cookies and similar technologies TripKnot Business uses, and how you can control them."
    >
      <LegalSection heading="1. What cookies are">
        <p>
          Cookies are small text files placed on your device when you visit a website. They let
          a site remember information about your visit, such as your preferences and how you use
          the site.
        </p>
      </LegalSection>

      <LegalSection heading="2. How we use cookies">
        <ul>
          <li>
            <strong>Essential cookies</strong> &mdash; required for core functionality such as
            keeping you signed in to your Partner dashboard and remembering security settings.
            These cannot be switched off.
          </li>
          <li>
            <strong>Analytics cookies</strong> &mdash; we use Google Analytics to understand how
            visitors use the site, which pages are popular, and how listings perform, so we can
            improve the Platform. These cookies collect information in an aggregated, generally
            anonymous form.
          </li>
          <li>
            <strong>Functional cookies</strong> &mdash; remember choices you make (like dismissed
            banners) so we don&apos;t ask again on your next visit.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="3. Third-party cookies">
        <p>
          Some cookies are set by third-party services we use, principally Google Analytics.
          These providers may use the information collected in line with their own privacy
          policies. We do not use cookies for third-party advertising.
        </p>
      </LegalSection>

      <LegalSection heading="4. Managing cookies">
        <p>
          Most browsers let you view, delete, and block cookies through their settings. Blocking
          essential cookies may prevent parts of the Platform, such as signing in to your
          dashboard, from working correctly. You can also opt out of Google Analytics tracking
          using{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google&apos;s browser opt-out add-on
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="5. Changes to this policy">
        <p>
          We may update this policy as the cookies and technologies we use change. The &quot;Last
          updated&quot; date above reflects the current version.
        </p>
      </LegalSection>

      <LegalSection heading="6. Contact us">
        <p>
          Questions about this policy can be sent to{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
