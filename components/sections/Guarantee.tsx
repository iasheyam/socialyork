import { Demo } from "@/components/Demo";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { site } from "@/content/site";

/**
 * The strongest thing on the page, so it is the only inverted screen: bone
 * paper, black type, set larger than the service sections. That contrast is the
 * structural distinction -- no badge, no box.
 */
export function Guarantee() {
  const { index, label, title, body } = site.guarantee;
  return (
    <Section id="guarantee" tone="paper" center>
      <Reveal className="space-y-9">
        <Eyebrow index={index}>{label}</Eyebrow>

        <h2 className="max-w-4xl font-display leading-[0.98] tracking-[-0.025em] text-[clamp(2.25rem,6.5vw,5rem)]">
          {title}
        </h2>

        <div className="max-w-2xl space-y-5 text-[1.15rem] leading-relaxed text-current/70">
          {body.map((paragraph, i) => (
            <p key={i}>
              <Demo>{paragraph}</Demo>
            </p>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
