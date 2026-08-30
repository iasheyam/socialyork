import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { site } from "@/content/site";

/** Contact. Plain -- no form, no calendar. The conversation started in person. */
export function Closing() {
  const { email, phone, phoneHref } = site.contact;
  return (
    <Section id="contact" center>
      <Reveal className="space-y-10">
        <h2 className="max-w-3xl font-display leading-[1.1] tracking-[-0.02em] text-[clamp(1.9rem,4.5vw,3.25rem)]">
          {site.closing.heading}
        </h2>

        <div className="space-y-3 font-mono text-lg sm:text-xl">
          <p>
            <a
              href={`mailto:${email}`}
              className="text-ink underline-offset-4 hover:underline"
            >
              {email}
            </a>
          </p>
          <p>
            <a
              href={`tel:${phoneHref}`}
              className="text-ink underline-offset-4 hover:underline"
            >
              {phone}
            </a>
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
