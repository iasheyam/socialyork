import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";

/** The turn from noise to argument. One quiet screen. */
export function Positioning() {
  return (
    <Section id="positioning" center>
      <Reveal className="space-y-8">
        {site.positioning.map((paragraph, i) => (
          <p
            key={i}
            className={cn(
              "font-display leading-[1.32] tracking-[-0.01em] text-[clamp(1.5rem,3.2vw,2.6rem)]",
              i === 0 ? "text-ink" : "text-ink/70",
            )}
          >
            {paragraph}
          </p>
        ))}
      </Reveal>
    </Section>
  );
}
