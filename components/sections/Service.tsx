import { Demo } from "@/components/Demo";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import type { ServiceSection } from "@/content/site";

export function Service({
  service,
  children,
}: {
  service: ServiceSection;
  children?: React.ReactNode;
}) {
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
