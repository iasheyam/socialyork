import type { Metadata } from "next";
import { InstagramIcon } from "@/components/InstagramIcon";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { ContactLeadForm } from "@/components/sections/ContactLeadForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Contact — ${site.meta.name}`,
  description: site.closing.body,
  alternates: { canonical: "/contact" },
};

/** Contact: a lead form (delivered via Formspree), direct contact info, and socials. */
export default function ContactPage() {
  const { email, phone, phoneHref, instagram } = site.contact;
  return (
    <Section id="contact" className="pt-32 sm:pt-36 lg:pt-40">
      <Reveal className="space-y-10">
        <Eyebrow>Contact</Eyebrow>

        <h1 className="max-w-3xl font-display leading-[1.1] tracking-[-0.02em] text-[clamp(1.9rem,4.5vw,3.25rem)]">
          {site.closing.heading}
        </h1>

        <p className="max-w-lg text-[1.05rem] leading-relaxed text-current/65">
          {site.closing.body}
        </p>

        <ContactLeadForm />

        <div className="space-y-2 border-t border-hairline pt-8 font-mono text-sm">
          <p>
            <a href={`mailto:${email}`} className="text-current/80 underline-offset-4 hover:underline">
              {email}
            </a>
          </p>
          <p>
            <a href={`tel:${phoneHref}`} className="text-current/80 underline-offset-4 hover:underline">
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
