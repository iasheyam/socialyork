import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { site } from "@/content/site";

/** Closing call to action: the contact form lives on /contact. */
export function Closing() {
  return (
    <Section id="contact" center>
      <Reveal className="space-y-10">
        <h2 className="max-w-3xl font-display leading-[1.1] tracking-[-0.02em] text-[clamp(1.9rem,4.5vw,3.25rem)]">
          {site.closing.heading}
        </h2>

        <p className="max-w-lg text-[1.05rem] leading-relaxed text-current/65">
          {site.closing.body}
        </p>

        <Link
          href="/contact"
          className="inline-block rounded-full bg-gold px-7 py-3.5 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-void transition-colors hover:bg-gold/90"
        >
          Contact us
        </Link>
      </Reveal>
    </Section>
  );
}
