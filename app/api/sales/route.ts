import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildAdminEmail, buildConfirmationEmail } from "@/lib/emails";
import {
  hasErrors,
  normalisePhone,
  validateEnquiry,
  type SalesEnquiry,
} from "@/lib/sales";

/**
 * Receives a sales enquiry, notifies the partnerships inbox, and confirms back
 * to the enquirer.
 *
 * Validation is re-run here with the same module the client uses, because the
 * client-side pass is only for feedback and can be bypassed.
 */

const FROM =
  process.env.SALES_FROM_EMAIL ?? "TripKnot Business <partners@mail.tripknot.in>";
const ADMIN = process.env.SALES_ADMIN_EMAIL ?? "partners@tripknot.in";

const CONTACT_FALLBACK =
  "We could not send your enquiry just now. Please email partners@tripknot.in and we will pick it up.";

function badRequest(message: string) {
  return NextResponse.json({ ok: false, message }, { status: 400 });
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return badRequest("Malformed request body.");
  }

  if (typeof payload !== "object" || payload === null) {
    return badRequest("Malformed request body.");
  }

  const errors = validateEnquiry(payload as Partial<SalesEnquiry>);
  if (hasErrors(errors)) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const raw = payload as SalesEnquiry;
  const enquiry: SalesEnquiry = {
    businessName: raw.businessName.trim(),
    contactName: raw.contactName.trim(),
    email: raw.email.trim(),
    phone: normalisePhone(raw.phone.trim()),
    businessType: raw.businessType,
    city: raw.city.trim(),
    plan: raw.plan,
    message: (raw.message ?? "").trim(),
  };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Fail loudly rather than dropping the lead into a void.
    console.error("[sales] RESEND_API_KEY is not set; enquiry was not delivered.");
    return NextResponse.json({ ok: false, message: CONTACT_FALLBACK }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const adminEmail = buildAdminEmail(enquiry);
  const confirmation = buildConfirmationEmail(enquiry);

  /*
   * The admin notification is the one that must land — it is the lead itself.
   * The confirmation is a courtesy, so a failure there is logged but does not
   * fail the request and make the visitor submit twice.
   */
  const [adminResult, confirmationResult] = await Promise.allSettled([
    resend.emails.send({
      from: FROM,
      to: ADMIN,
      replyTo: enquiry.email,
      subject: adminEmail.subject,
      html: adminEmail.html,
      text: adminEmail.text,
    }),
    resend.emails.send({
      from: FROM,
      to: enquiry.email,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    }),
  ]);

  const adminFailed =
    adminResult.status === "rejected" || Boolean(adminResult.value?.error);

  if (adminFailed) {
    console.error(
      "[sales] admin notification failed",
      adminResult.status === "rejected" ? adminResult.reason : adminResult.value.error,
      { businessName: enquiry.businessName, email: enquiry.email }
    );
    return NextResponse.json({ ok: false, message: CONTACT_FALLBACK }, { status: 502 });
  }

  if (confirmationResult.status === "rejected" || confirmationResult.value?.error) {
    console.warn(
      "[sales] confirmation to enquirer failed (lead was still captured)",
      confirmationResult.status === "rejected"
        ? confirmationResult.reason
        : confirmationResult.value.error
    );
  }

  console.info("[sales] enquiry delivered", {
    businessName: enquiry.businessName,
    email: enquiry.email,
    plan: enquiry.plan,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
