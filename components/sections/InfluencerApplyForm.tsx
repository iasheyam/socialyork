"use client";

import { useForm, ValidationError } from "@formspree/react";
import { site } from "@/content/site";

const FORMSPREE_ID = "xwlpbwgn";

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
 * Influencer application form. Submits to Formspree over AJAX (@formspree/react),
 * so the visitor never leaves this page -- no redirect to a Formspree-hosted
 * page, just this success state driven by `state.succeeded`.
 */
export function InfluencerApplyForm() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID);

  if (state.succeeded) {
    return (
      <div className="space-y-3 border-t border-hairline pt-10">
        <p className="font-display text-2xl text-current">
          {site.influencerApply.successHeading}
        </p>
        <p className="max-w-md text-current/65">
          {site.influencerApply.successBody}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <Field label="Full name">
          <input type="text" name="name" required className={FIELD} />
          <ValidationError
            prefix="Name"
            field="name"
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
        <Field label="Instagram handle">
          <input
            type="text"
            name="instagram"
            required
            placeholder="@yourhandle"
            className={FIELD}
          />
          <ValidationError
            prefix="Instagram handle"
            field="instagram"
            errors={state.errors}
            className={ERROR}
          />
        </Field>
        <Field label="Other platform (optional)">
          <input
            type="text"
            name="otherPlatform"
            placeholder="TikTok, YouTube, etc."
            className={FIELD}
          />
        </Field>
        <Field label="Follower count">
          <input
            type="text"
            name="followers"
            required
            placeholder="e.g. 25K"
            className={FIELD}
          />
          <ValidationError
            prefix="Follower count"
            field="followers"
            errors={state.errors}
            className={ERROR}
          />
        </Field>
        <Field label="Content niche">
          <input
            type="text"
            name="niche"
            required
            placeholder="Beauty, food, fitness..."
            className={FIELD}
          />
          <ValidationError
            prefix="Content niche"
            field="niche"
            errors={state.errors}
            className={ERROR}
          />
        </Field>
      </div>

      <Field label="Anything else? (optional)">
        <textarea
          name="message"
          rows={3}
          className={`${FIELD} resize-none`}
        />
      </Field>

      <div className="space-y-3">
        <button
          type="submit"
          disabled={state.submitting}
          className="rounded-full bg-gold px-6 py-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-void transition-colors hover:bg-gold/90 disabled:opacity-50"
        >
          {state.submitting ? "Submitting…" : site.influencerApply.submitLabel}
        </button>
        <ValidationError errors={state.errors} className={ERROR} />
      </div>
    </form>
  );
}
