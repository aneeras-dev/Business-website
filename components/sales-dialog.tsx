"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Loader2, X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { EASE } from "@/lib/motion";
import {
  BUSINESS_TYPES,
  EMPTY_ENQUIRY,
  PLAN_OPTIONS,
  hasErrors,
  validateEnquiry,
  type EnquiryErrors,
  type PlanInterest,
  type SalesEnquiry,
} from "@/lib/sales";
import type { CategoryId } from "@/lib/content";
import { cn } from "@/lib/utils";

export type SalesPrefill = {
  businessType?: CategoryId;
  plan?: PlanInterest;
  /** Shown under the dialog title, e.g. the plan the visitor clicked. */
  context?: string;
};

type SalesDialogApi = { openSalesDialog: (prefill?: SalesPrefill) => void };

const SalesDialogContext = createContext<SalesDialogApi | null>(null);

/** Opens the sales dialog from any client component below the provider. */
export function useSalesDialog(): SalesDialogApi {
  const ctx = useContext(SalesDialogContext);
  if (!ctx) {
    throw new Error("useSalesDialog must be used within <SalesDialogProvider>");
  }
  return ctx;
}

export function SalesDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<SalesPrefill>({});

  const openSalesDialog = useCallback((next?: SalesPrefill) => {
    setPrefill(next ?? {});
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return (
    <SalesDialogContext.Provider value={{ openSalesDialog }}>
      {children}
      <SalesDialog open={open} prefill={prefill} onClose={close} />
    </SalesDialogContext.Provider>
  );
}

type Status = "idle" | "submitting" | "success" | "error";

function SalesDialog({
  open,
  prefill,
  onClose,
}: {
  open: boolean;
  prefill: SalesPrefill;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<SalesEnquiry>(EMPTY_ENQUIRY);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formMessage, setFormMessage] = useState("");

  /*
   * showModal() puts the dialog in the top layer, which gives us the focus
   * trap, Escape handling, and an inert background for free.
   */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;

    if (!dialog.open) dialog.showModal();

    setValues({
      ...EMPTY_ENQUIRY,
      businessType: prefill.businessType ?? "",
      plan: prefill.plan ?? "free",
    });
    setErrors({});
    setStatus("idle");
    setFormMessage("");

    // showModal focuses the dialog itself; move to the first real field.
    const focus = window.setTimeout(() => firstFieldRef.current?.focus(), 60);

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(focus);
      document.body.style.overflow = overflow;
    };
  }, [open, prefill]);

  // close() also hands focus back to whatever opened the dialog.
  function handleExitComplete() {
    dialogRef.current?.close();
  }

  function update<K extends keyof SalesEnquiry>(key: K, value: SalesEnquiry[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    // Clear a field's error as soon as the visitor edits it.
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validateEnquiry(values);
    if (hasErrors(found)) {
      setErrors(found);
      setStatus("idle");
      setFormMessage("");
      // Move focus to the first field that failed.
      const firstKey = Object.keys(found)[0];
      const el = event.currentTarget.querySelector<HTMLElement>(`[name="${firstKey}"]`);
      el?.focus();
      return;
    }

    setStatus("submitting");
    setFormMessage("");

    let response: Response;
    try {
      response = await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
    } catch {
      // Only a fetch rejection means the request never completed.
      setStatus("error");
      setFormMessage(
        "We could not reach the server. Check your connection and try again, or email partners@tripknot.in."
      );
      return;
    }

    /*
     * The body is not guaranteed to be JSON — a crashed route or a proxy in
     * front of the app can return an HTML error page. Parsing defensively
     * keeps that from being reported as a network failure, which would send
     * the visitor chasing the wrong problem.
     */
    const data = await response.json().catch(() => null);

    if (response.ok) {
      setStatus("success");
      return;
    }

    setErrors(data?.errors ?? {});
    setStatus("error");
    setFormMessage(
      data?.message ??
        `Something went wrong on our side (error ${response.status}). Please try again, or email partners@tripknot.in.`
    );
  }

  return (
    <dialog
      ref={dialogRef}
      // Escape fires `cancel`; intercept it so the exit animation can play.
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="fixed inset-0 m-0 h-full max-h-full w-full max-w-full bg-transparent p-0 backdrop:bg-transparent"
    >
      <AnimatePresence onExitComplete={handleExitComplete}>
        {open && (
          <div className="flex h-full items-center justify-center p-4 sm:p-6">
            <motion.button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 cursor-default bg-[#0b100f]/55 backdrop-blur-[2px]"
            />

            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.99 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative z-10 max-h-[90dvh] w-full max-w-xl overflow-y-auto rounded-[24px] border border-hairline bg-surface-raised shadow-[0_30px_80px_-30px_rgba(14,20,19,0.5)]"
            >
              {status === "success" ? (
                <SuccessPanel onClose={onClose} />
              ) : (
                <EnquiryForm
                  values={values}
                  errors={errors}
                  status={status}
                  formMessage={formMessage}
                  context={prefill.context}
                  firstFieldRef={firstFieldRef}
                  onChange={update}
                  onSubmit={handleSubmit}
                  onClose={onClose}
                />
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </dialog>
  );
}

function EnquiryForm({
  values,
  errors,
  status,
  formMessage,
  context,
  firstFieldRef,
  onChange,
  onSubmit,
  onClose,
}: {
  values: SalesEnquiry;
  errors: EnquiryErrors;
  status: Status;
  formMessage: string;
  context?: string;
  firstFieldRef: React.RefObject<HTMLInputElement | null>;
  onChange: <K extends keyof SalesEnquiry>(key: K, value: SalesEnquiry[K]) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}) {
  const titleId = useId();
  const submitting = status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate aria-labelledby={titleId}>
      <header className="flex items-start justify-between gap-4 border-b border-hairline px-6 py-5 sm:px-7">
        <div>
          <p className="eyebrow">Talk to sales</p>
          <h2 id={titleId} className="font-display mt-2 text-[28px]">
            Let&rsquo;s grow your business.
          </h2>
          <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">
            {context
              ? `About the ${context}. We reply within one business day.`
              : "Tell us about your business and we will reply within one business day."}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="-mt-1 grid size-9 shrink-0 place-items-center rounded-full border border-hairline text-ink-muted transition-colors hover:bg-ink/[0.04] hover:text-ink"
        >
          <X className="size-[18px]" />
        </button>
      </header>

      <div className="grid gap-4 px-6 py-6 sm:grid-cols-2 sm:px-7">
        <Field label="Business name" name="businessName" error={errors.businessName}>
          {(props) => (
            <input
              {...props}
              ref={firstFieldRef}
              type="text"
              autoComplete="organization"
              placeholder="Backwater Retreat"
              value={values.businessName}
              onChange={(e) => onChange("businessName", e.target.value)}
            />
          )}
        </Field>

        <Field label="Your name" name="contactName" error={errors.contactName}>
          {(props) => (
            <input
              {...props}
              type="text"
              autoComplete="name"
              placeholder="Rajesh Menon"
              value={values.contactName}
              onChange={(e) => onChange("contactName", e.target.value)}
            />
          )}
        </Field>

        <Field label="Email" name="email" error={errors.email}>
          {(props) => (
            <input
              {...props}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@business.com"
              value={values.email}
              onChange={(e) => onChange("email", e.target.value)}
            />
          )}
        </Field>

        <Field
          label="Phone"
          name="phone"
          error={errors.phone}
          hint="WhatsApp preferred"
        >
          {(props) => (
            <input
              {...props}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="98765 43210"
              value={values.phone}
              onChange={(e) => onChange("phone", e.target.value)}
            />
          )}
        </Field>

        <Field label="Business type" name="businessType" error={errors.businessType}>
          {(props) => (
            <SelectShell>
              <select
                {...props}
                value={values.businessType}
                onChange={(e) =>
                  onChange(
                    "businessType",
                    e.target.value as SalesEnquiry["businessType"]
                  )
                }
              >
                <option value="">Select one</option>
                {BUSINESS_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </SelectShell>
          )}
        </Field>

        <Field label="City or destination" name="city" error={errors.city}>
          {(props) => (
            <input
              {...props}
              type="text"
              autoComplete="address-level2"
              placeholder="Pondicherry"
              value={values.city}
              onChange={(e) => onChange("city", e.target.value)}
            />
          )}
        </Field>

        <Field
          label="Plan you are interested in"
          name="plan"
          error={errors.plan}
          className="sm:col-span-2"
        >
          {(props) => (
            <SelectShell>
              <select
                {...props}
                value={values.plan}
                onChange={(e) => onChange("plan", e.target.value as PlanInterest)}
              >
                {PLAN_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </SelectShell>
          )}
        </Field>

        <Field
          label="Anything else?"
          name="message"
          error={errors.message}
          optional
          className="sm:col-span-2"
        >
          {(props) => (
            <textarea
              {...props}
              rows={3}
              placeholder="Number of rooms, current occupancy, what you want to improve…"
              value={values.message}
              onChange={(e) => onChange("message", e.target.value)}
            />
          )}
        </Field>
      </div>

      <footer className="flex flex-col gap-3 border-t border-hairline px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <p
          role={status === "error" ? "alert" : undefined}
          className={cn(
            "text-[13px] leading-relaxed",
            status === "error" ? "text-rust-600" : "text-ink-muted"
          )}
        >
          {status === "error" && formMessage
            ? formMessage
            : "No spam. We only use these details to contact you about listing."}
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-[15px] font-semibold text-surface transition-colors hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send enquiry
              <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </footer>
    </form>
  );
}

function SuccessPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="px-6 py-12 text-center sm:px-10">
      <span className="mx-auto grid size-14 place-items-center rounded-full bg-teal-600/10 text-teal-600">
        <Check className="size-7" strokeWidth={2.5} />
      </span>
      <h2 className="font-display mt-6 text-[30px]">Thanks — we have it.</h2>
      <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-ink-muted text-pretty">
        Someone from the partnerships team will be in touch within one business day.
        Keep an eye on your inbox and WhatsApp.
      </p>
      <button
        type="button"
        onClick={onClose}
        autoFocus
        className="mt-8 inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-[15px] font-semibold text-surface transition-colors hover:bg-ink/90"
      >
        Done
      </button>
    </div>
  );
}

const CONTROL =
  "w-full rounded-[12px] border bg-surface px-3.5 py-2.5 text-[15px] text-ink transition-colors placeholder:text-ink-faint focus:outline-none";

/**
 * Renders a labelled control. The child is a function so each input keeps its
 * own element type while sharing the id, name, and error wiring.
 */
function Field({
  label,
  name,
  error,
  hint,
  optional,
  className,
  children,
}: {
  label: string;
  name: keyof SalesEnquiry;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: (props: {
    id: string;
    name: string;
    className: string;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
  }) => ReactNode;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-1.5 flex items-baseline gap-2 text-[13.5px] font-semibold"
      >
        {label}
        {optional && (
          <span className="text-[12px] font-normal text-ink-faint">Optional</span>
        )}
      </label>

      {children({
        id,
        name,
        className: cn(
          CONTROL,
          error
            ? "border-rust-600 focus:border-rust-600"
            : "border-hairline focus:border-teal-600"
        ),
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy,
      })}

      {error ? (
        <p id={errorId} className="mt-1.5 text-[12.5px] text-rust-600">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="mt-1.5 text-[12.5px] text-ink-faint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/** Wraps a native select so it can carry a custom chevron. */
function SelectShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative [&>select]:appearance-none [&>select]:pr-10">
      {children}
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-ink-muted"
      />
    </div>
  );
}
