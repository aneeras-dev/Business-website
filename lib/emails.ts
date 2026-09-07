import { SITE } from "@/lib/content";
import { BUSINESS_TYPES, PLAN_OPTIONS, type SalesEnquiry } from "@/lib/sales";

/**
 * Email bodies for the sales flow. Hand-built tables with inline styles,
 * because email clients strip <style> blocks and ignore most modern CSS.
 *
 * Every interpolated value is enquiry data typed by a stranger, so it is HTML
 * escaped on the way in.
 */

const INK = "#0e1413";
const MUTED = "#5a625f";
const CREAM = "#f6f4ef";
const TEAL = "#0d7a7b";
const HAIRLINE = "#e4e1d9";

const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function labelFor(list: { value: string; label: string }[], value: string): string {
  return list.find((item) => item.value === value)?.label ?? value;
}

/** Turns newlines into <br> after escaping, for the free-text message. */
function escMultiline(value: string): string {
  return esc(value).replace(/\r?\n/g, "<br>");
}

function shell(bodyHtml: string, preheader: string): string {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${CREAM};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid ${HAIRLINE};border-radius:16px;overflow:hidden;">
      <tr><td style="padding:24px 32px;border-bottom:1px solid ${HAIRLINE};">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td style="vertical-align:middle;">
            <img src="${SITE.url}/logo-email.png" alt="TripKnot" width="146" height="36" style="display:block;border:0;outline:none;text-decoration:none;height:36px;width:146px;">
          </td>
          <td style="vertical-align:middle;padding-left:10px;">
            <span style="font-family:${FONT};font-size:12px;font-weight:600;color:${TEAL};background:rgba(13,122,123,0.10);padding:4px 9px;border-radius:999px;white-space:nowrap;">Business</span>
          </td>
        </tr></table>
      </td></tr>
      ${bodyHtml}
      <tr><td style="padding:20px 32px;background:${CREAM};border-top:1px solid ${HAIRLINE};">
        <p style="margin:0;font-family:${FONT};font-size:12px;line-height:1.7;color:${MUTED};">
          ${SITE.name} &middot; ${SITE.address}<br>
          <a href="tel:${SITE.phone}" style="color:${MUTED};text-decoration:none;">${SITE.phoneDisplay}</a>
          &middot;
          <a href="mailto:${SITE.email}" style="color:${MUTED};text-decoration:none;">${SITE.email}</a><br>
          Questions? Just reply to this email.
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

function detailRows(enquiry: SalesEnquiry): string {
  const rows: [string, string][] = [
    ["Business", enquiry.businessName],
    ["Contact", enquiry.contactName],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone],
    ["Business type", labelFor(BUSINESS_TYPES, enquiry.businessType)],
    ["City", enquiry.city],
    ["Plan", labelFor(PLAN_OPTIONS, enquiry.plan)],
  ];

  const cells = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 0;font-family:${FONT};font-size:13px;color:${MUTED};width:140px;vertical-align:top;">${esc(label)}</td>
        <td style="padding:8px 0;font-family:${FONT};font-size:14px;color:${INK};font-weight:600;">${esc(value)}</td>
      </tr>`
    )
    .join("");

  const message = enquiry.message.trim()
    ? `
      <tr>
        <td style="padding:8px 0;font-family:${FONT};font-size:13px;color:${MUTED};vertical-align:top;">Message</td>
        <td style="padding:8px 0;font-family:${FONT};font-size:14px;color:${INK};line-height:1.6;">${escMultiline(enquiry.message.trim())}</td>
      </tr>`
    : "";

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${cells}${message}</table>`;
}

function detailText(enquiry: SalesEnquiry): string {
  const lines = [
    `Business:      ${enquiry.businessName}`,
    `Contact:       ${enquiry.contactName}`,
    `Email:         ${enquiry.email}`,
    `Phone:         ${enquiry.phone}`,
    `Business type: ${labelFor(BUSINESS_TYPES, enquiry.businessType)}`,
    `City:          ${enquiry.city}`,
    `Plan:          ${labelFor(PLAN_OPTIONS, enquiry.plan)}`,
  ];
  if (enquiry.message.trim()) {
    lines.push("", "Message:", enquiry.message.trim());
  }
  return lines.join("\n");
}

/** Confirmation sent to the person who filled in the form. */
export function buildConfirmationEmail(enquiry: SalesEnquiry) {
  const firstName = enquiry.contactName.trim().split(/\s+/)[0];

  const html = shell(
    `<tr><td style="padding:32px;">
      <h1 style="margin:0 0 14px;font-family:${FONT};font-size:24px;line-height:1.25;font-weight:700;color:${INK};letter-spacing:-0.02em;">
        Thanks, ${esc(firstName)} — we have your enquiry.
      </h1>
      <p style="margin:0 0 20px;font-family:${FONT};font-size:15px;line-height:1.65;color:${MUTED};">
        Someone from the TripKnot partnerships team will get back to you within
        one business day. Here is what you sent us:
      </p>
      <div style="padding:18px 20px;background:${CREAM};border:1px solid ${HAIRLINE};border-radius:12px;">
        ${detailRows(enquiry)}
      </div>
      <p style="margin:22px 0 0;font-family:${FONT};font-size:15px;line-height:1.65;color:${MUTED};">
        If anything above is wrong, just reply to this email and we will fix it.
      </p>
    </td></tr>`,
    `We have your enquiry — the TripKnot team will reply within one business day.`
  );

  const text = `Thanks, ${firstName} — we have your enquiry.

Someone from the TripKnot partnerships team will get back to you within one
business day. Here is what you sent us:

${detailText(enquiry)}

If anything above is wrong, just reply to this email and we will fix it.

${SITE.name}, ${SITE.address}
${SITE.phoneDisplay} | ${SITE.email}`;

  return {
    subject: "We have your enquiry — TripKnot Business",
    html,
    text,
  };
}

/** Lead notification sent to the internal inbox. */
export function buildAdminEmail(enquiry: SalesEnquiry) {
  const type = labelFor(BUSINESS_TYPES, enquiry.businessType);
  const plan = labelFor(PLAN_OPTIONS, enquiry.plan);

  const html = shell(
    `<tr><td style="padding:32px;">
      <p style="margin:0 0 6px;font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${TEAL};">
        New partner enquiry
      </p>
      <h1 style="margin:0 0 6px;font-family:${FONT};font-size:24px;line-height:1.25;font-weight:700;color:${INK};letter-spacing:-0.02em;">
        ${esc(enquiry.businessName)}
      </h1>
      <p style="margin:0 0 22px;font-family:${FONT};font-size:14px;color:${MUTED};">
        ${esc(type)} &middot; ${esc(enquiry.city)} &middot; interested in ${esc(plan)}
      </p>
      <div style="padding:18px 20px;background:${CREAM};border:1px solid ${HAIRLINE};border-radius:12px;">
        ${detailRows(enquiry)}
      </div>
      <p style="margin:24px 0 0;">
        <a href="mailto:${esc(enquiry.email)}" style="display:inline-block;background:${INK};color:#ffffff;font-family:${FONT};font-size:14px;font-weight:600;text-decoration:none;padding:12px 22px;border-radius:999px;">
          Reply to ${esc(enquiry.contactName)}
        </a>
      </p>
      <p style="margin:16px 0 0;font-family:${FONT};font-size:13px;color:${MUTED};">
        Replying to this email also reaches them directly.
      </p>
    </td></tr>`,
    `${enquiry.businessName} — ${type} in ${enquiry.city}`
  );

  const text = `NEW PARTNER ENQUIRY

${enquiry.businessName}
${type} · ${enquiry.city} · interested in ${plan}

${detailText(enquiry)}

Reply to this email to reach ${enquiry.contactName} directly.

${SITE.name}, ${SITE.address}
${SITE.phoneDisplay} | ${SITE.email}`;

  return {
    subject: `New partner enquiry: ${enquiry.businessName} (${type})`,
    html,
    text,
  };
}
