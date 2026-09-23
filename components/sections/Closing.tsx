import { ContactLeadForm } from "@/components/sections/ContactLeadForm";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { site } from "@/content/site";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect
        x="1.5"
        y="1.5"
        width="15"
        height="15"
        rx="4.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <circle cx="9" cy="9" r="3.8" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="13.15" cy="4.85" r="0.9" fill="currentColor" />
    </svg>
  );
}

/** Contact: a lead form (delivered via Formspree), direct contact info, and socials. */
export function Closing() {
  const { email, phone, phoneHref, instagram } = site.contact;
  return (
    <Section id="contact" center>
      <Reveal className="space-y-10">
        <h2 className="max-w-3xl font-display leading-[1.1] tracking-[-0.02em] text-[clamp(1.9rem,4.5vw,3.25rem)]">
          {site.closing.heading}
        </h2>

        <p className="max-w-lg text-[1.05rem] leading-relaxed text-current/65">
          {site.closing.body}
        </p>

        <ContactLeadForm />

        <div className="space-y-2 border-t border-hairline pt-8 font-mono text-sm">
          <p>
            <a
              href={`mailto:${email}`}
              className="text-current/80 underline-offset-4 hover:underline"
            >
              {email}
            </a>
          </p>
          <p>
            <a
              href={`tel:${phoneHref}`}
              className="text-current/80 underline-offset-4 hover:underline"
            >
              {phone}
            </a>
          </p>
        </div>

        <div className="space-y-3">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-current/60">
            Follow us
          </p>
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="SocialYork on Instagram"
            className="inline-flex text-current/80 transition-colors hover:text-gold"
          >
            <InstagramIcon />
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
