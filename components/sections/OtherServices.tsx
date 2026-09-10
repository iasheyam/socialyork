import type { ReactNode } from "react";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { site } from "@/content/site";

/** Line icons keyed by `icon` in site.otherServices.items. */
const ICONS: Record<string, ReactNode> = {
  code: (
    <>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </>
  ),
  pin: (
    <>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 2.5l2.3 7.2L21.5 12l-7.2 2.3L12 21.5l-2.3-7.2L2.5 12l7.2-2.3z" />
      <path d="M18.5 3.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
    </>
  ),
  megaphone: (
    <>
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </>
  ),
};

function ServiceIcon({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="mt-0.5 h-5 w-5 shrink-0 text-gold"
    >
      {ICONS[name] ?? null}
    </svg>
  );
}

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
              className="flex gap-4 border-t border-hairline py-5 first:border-t-0 sm:[&:nth-child(2)]:border-t-0"
            >
              <ServiceIcon name={item.icon} />
              <div className="space-y-1">
                <p className="font-display text-lg text-ink">{item.name}</p>
                <p className="text-sm leading-relaxed text-ink-dim">
                  {item.subtitle}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
