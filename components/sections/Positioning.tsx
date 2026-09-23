import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { site } from "@/content/site";

/** The turn from noise to argument -- now a titled case, not just two lines. */
export function Positioning() {
  const { title, paragraphs } = site.positioning;
  return (
    <Section id="positioning" center>
      <Reveal className="space-y-8">
        <h2 className="max-w-4xl font-display leading-[1.04] tracking-[-0.02em] text-[clamp(2.25rem,6vw,5.25rem)] text-ink">
          {title}
        </h2>

        <div className="space-y-6">
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="font-display leading-[1.32] tracking-[-0.01em] text-[clamp(1.125rem,2.2vw,1.75rem)] text-ink/70"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
