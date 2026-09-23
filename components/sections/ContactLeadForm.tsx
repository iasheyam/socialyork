"use client";

import { useForm, ValidationError } from "@formspree/react";
import { site } from "@/content/site";

const FORMSPREE_ID = "meaokvjo";

const FIELD =
  "w-full border-b border-hairline bg-transparent py-3 text-[1rem] text-current placeholder:text-current/35 focus:border-gold focus:outline-none";

const LABEL =
  "font-mono text-[0.68rem] uppercase tracking-[0.14em] text-current/60";

const ERROR = "font-mono text-[0.68rem] text-red-500";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className={LABEL}>{label}</span>
      {children}
    </label>
  );
}

/**
 * Lead form under Contact. Separate Formspree form from the influencer
 * application -- submits over AJAX, so the visitor never leaves this page.
 */
export function ContactLeadForm() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID);

  if (state.succeeded) {
    return (
      <div className="space-y-3 border-t border-hairline pt-10">
        <p className="font-display text-2xl text-current">
          {site.contactForm.successHeading}
        </p>
        <p className="max-w-md text-current/65">
          {site.contactForm.successBody}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <Field label="First name">
          <input type="text" name="firstName" required className={FIELD} />
          <ValidationError
            prefix="First name"
            field="firstName"
            errors={state.errors}
            className={ERROR}
          />
        </Field>
        <Field label="Last name">
          <input type="text" name="lastName" required className={FIELD} />
          <ValidationError
            prefix="Last name"
            field="lastName"
            errors={state.errors}
            className={ERROR}
          />
        </Field>
        <Field label="Email">
          <input type="email" name="email" required className={FIELD} />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
            className={ERROR}
          />
        </Field>
        <Field label="Phone">
          <input type="tel" name="phone" required className={FIELD} />
          <ValidationError
            prefix="Phone"
            field="phone"
            errors={state.errors}
            className={ERROR}
          />
        </Field>
        <Field label="Company (optional)">
          <input type="text" name="company" className={FIELD} />
        </Field>
        <Field label="Website (optional)">
          <input type="text" name="website" className={FIELD} />
        </Field>
      </div>

      <div className="space-y-3">
        <button
          type="submit"
          disabled={state.submitting}
          className="rounded-full bg-gold px-6 py-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-void transition-colors hover:bg-gold/90 disabled:opacity-50"
        >
          {state.submitting ? "Sending…" : site.contactForm.submitLabel}
        </button>
        <ValidationError errors={state.errors} className={ERROR} />
      </div>
    </form>
  );
}
