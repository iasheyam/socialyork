import { Demo } from "@/components/Demo";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import type { ServiceSection } from "@/content/site";

export function Service({
  service,
  children,
  hideHeader = false,
}: {
  service: ServiceSection;
  children?: React.ReactNode;
  /**
   * Skip the eyebrow/title/body -- use when that content is already shown by
   * something upstream (e.g. HowWeDoItReveal), so this just carries the
   * section id/padding for whatever comes after it (like the reel carousel).
   */
  hideHeader?: boolean;
}) {
  if (hideHeader) {
    return (
      <Section
        id={`service-${service.index}`}
        className="pt-10 md:pt-12 lg:pt-12"
      >
        {children}
      </Section>
    );
  }

  return (
    <Section id={`service-${service.index}`}>
      <Reveal className="space-y-9">
        <Eyebrow index={service.index}>{service.label}</Eyebrow>

        <h2 className="max-w-3xl font-display leading-[1.06] tracking-[-0.02em] text-[clamp(2rem,5vw,3.75rem)]">
          {service.title}
        </h2>

        <div className="max-w-2xl space-y-5 text-[1.05rem] leading-relaxed text-current/65">
          {service.body.map((paragraph, i) => (
            <p key={i}>
              <Demo>{paragraph}</Demo>
            </p>
          ))}
        </div>

        {children}
      </Reveal>
    </Section>
  );
}
