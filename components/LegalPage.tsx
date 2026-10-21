import { Eyebrow } from "@/components/Eyebrow";
import { Section } from "@/components/Section";

export type LegalSection = { heading: string; body: React.ReactNode };

/** Shared shell for long-form legal copy (/privacy, /terms). */
export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <Section tone="paper" className="pt-32 sm:pt-36 lg:pt-40">
      <article className="max-w-2xl space-y-10">
        <header className="space-y-6">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="font-display leading-[1.06] tracking-[-0.02em] text-[clamp(2.25rem,5.5vw,4rem)]">
            {title}
          </h1>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-current/60">
            Last updated {updated}
          </p>
          <p className="text-[1.05rem] leading-relaxed text-current/70">{intro}</p>
        </header>

        {sections.map((s, i) => (
          <section key={s.heading} className="space-y-3">
            <h2 className="font-display text-xl tracking-tight">
              {i + 1}. {s.heading}
            </h2>
            <div className="space-y-3 leading-relaxed text-current/70">{s.body}</div>
          </section>
        ))}
      </article>
    </Section>
  );
}
