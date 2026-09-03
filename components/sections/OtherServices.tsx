import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { site } from "@/content/site";

/**
 * Secondary capabilities after Service 02. Deliberately lighter than the two
 * flagship services -- a compact two-column list, no per-item display headline,
 * no index -- so the hierarchy reads: 01 and 02 are the pitch, this is scope.
 */
export function OtherServices() {
  const { label, lead, items } = site.otherServices;
  return (
    <Section id="other-services">
      <Reveal className="space-y-9">
        <Eyebrow>{label}</Eyebrow>

        <p className="max-w-2xl font-display leading-[1.3] text-[clamp(1.35rem,2.6vw,2rem)] text-current/85">
          {lead}
        </p>

        <ul className="grid max-w-3xl grid-cols-1 gap-x-12 sm:grid-cols-2">
          {items.map((item) => (
            <li
              key={item.name}
              className="border-t border-hairline py-4 first:border-t-0 sm:[&:nth-child(2)]:border-t-0"
            >
              <span className="font-display text-lg text-ink">{item.name}</span>
              {item.note ? (
                <span className="mt-1 block text-sm leading-relaxed text-ink-dim">
                  {item.note}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
