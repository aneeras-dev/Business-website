import { BUSINESS_TYPE_LABELS, type CategoryId } from "@/lib/content";

/**
 * Shape and validation for a sales enquiry. Imported by both the dialog and
 * the route handler so the browser and the server agree on what is valid —
 * client-side checks are for feedback only, never for trust.
 */

export type PlanInterest = "free" | "essential" | "growth" | "unsure";

export type SalesEnquiry = {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  businessType: CategoryId | "";
  city: string;
  plan: PlanInterest;
  message: string;
};

export type EnquiryErrors = Partial<Record<keyof SalesEnquiry, string>>;

export const EMPTY_ENQUIRY: SalesEnquiry = {
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  businessType: "",
  city: "",
  plan: "free",
  message: "",
};

/** Same names shown on the homepage, so the dropdown never contradicts the marketing copy. */
const BUSINESS_TYPE_ORDER: CategoryId[] = ["hotels", "restaurants", "agencies"];

export const BUSINESS_TYPES: { value: CategoryId; label: string }[] = BUSINESS_TYPE_ORDER.map(
  (value) => ({ value, label: BUSINESS_TYPE_LABELS[value] })
);

export const PLAN_OPTIONS: { value: PlanInterest; label: string }[] = [
  { value: "free", label: "Free Listing" },
  { value: "essential", label: "Essential — ₹899/month" },
  { value: "growth", label: "Growth — ₹1,499/month" },
  { value: "unsure", label: "Not sure yet" },
];

/** Maps a plan name from the pricing table onto a form value. */
export function planNameToInterest(name: string): PlanInterest {
  const key = name.toLowerCase();
  if (key.includes("free")) return "free";
  if (key.includes("essential")) return "essential";
  if (key.includes("growth")) return "growth";
  return "unsure";
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Strips spaces, dashes, and an Indian country code down to bare digits. */
export function normalisePhone(raw: string): string {
  return raw.replace(/[\s()-]/g, "").replace(/^(\+91|0091|91)/, "");
}

export function validateEnquiry(input: Partial<SalesEnquiry>): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  if (text(input.businessName).length < 2) {
    errors.businessName = "Enter your business name.";
  }
  if (text(input.contactName).length < 2) {
    errors.contactName = "Enter your name.";
  }
  if (!EMAIL.test(text(input.email))) {
    errors.email = "Enter a valid email address.";
  }

  const phone = normalisePhone(text(input.phone));
  if (!/^\d{10}$/.test(phone)) {
    errors.phone = "Enter a 10-digit mobile number.";
  }

  if (!BUSINESS_TYPES.some((t) => t.value === input.businessType)) {
    errors.businessType = "Select your business type.";
  }
  if (text(input.city).length < 2) {
    errors.city = "Enter your city or destination.";
  }
  if (input.plan && !PLAN_OPTIONS.some((p) => p.value === input.plan)) {
    errors.plan = "Select a plan.";
  }
  if (text(input.message).length > 1000) {
    errors.message = "Keep this under 1000 characters.";
  }

  return errors;
}

export function hasErrors(errors: EnquiryErrors): boolean {
  return Object.keys(errors).length > 0;
}
