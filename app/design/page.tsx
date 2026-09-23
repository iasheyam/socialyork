import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Design System — SocialYork",
  robots: { index: false, follow: false },
};

const COLORS: {
  name: string;
  token: string;
  hex: string;
  swatchClass: string;
  usage: string;
}[] = [
  { name: "Void", token: "--color-void", hex: "#000000", swatchClass: "bg-void", usage: "Default section background." },
  { name: "Surface", token: "--color-surface", hex: "#0b0b0b", swatchClass: "bg-surface", usage: "Slightly-raised panels on void (e.g. reel cards, video frames)." },
  { name: "Hairline", token: "--color-hairline", hex: "#1c1b18", swatchClass: "bg-hairline", usage: "Dividers and borders. Dark enough to read on both void and paper." },
  { name: "Ink", token: "--color-ink", hex: "#ece7db", swatchClass: "bg-ink", usage: "Primary text on void. Warm bone, never pure white." },
  { name: "Ink Dim", token: "--color-ink-dim", hex: "#8f8a7e", swatchClass: "bg-ink-dim", usage: "Secondary text on void (captions, metadata)." },
  { name: "Ink Faint", token: "--color-ink-faint", hex: "#56524a", swatchClass: "bg-ink-faint", usage: "Tertiary/placeholder text on void." },
  { name: "Gold", token: "--color-gold", hex: "#c8a253", swatchClass: "bg-gold", usage: "The one chromatic accent. Eyebrows, primary CTAs, highlights. Never used for large text blocks or body copy." },
  { name: "Paper", token: "--color-paper", hex: "#e9e4d8", swatchClass: "bg-paper", usage: "Background for inverted sections (Reporting, Top Clients, /influencers)." },
  { name: "Paper Ink", token: "--color-paper-ink", hex: "#0c0b09", swatchClass: "bg-paper-ink", usage: "Primary text on paper sections." },
  { name: "Paper Dim", token: "--color-paper-dim", hex: "#55514a", swatchClass: "bg-paper-dim", usage: "Secondary text on paper sections." },
];

function ColorSwatch({
  name,
  hex,
  swatchClass,
  usage,
}: {
  name: string;
  hex: string;
  swatchClass: string;
  usage: string;
}) {
  return (
    <div className="space-y-3">
      <div
        className={`h-20 w-full rounded-[4px] border border-white/10 ${swatchClass}`}
      />
      <div className="space-y-1">
        <p className="font-display text-lg text-ink">{name}</p>
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-ink-dim">
          {hex}
        </p>
        <p className="text-sm leading-relaxed text-ink-dim">{usage}</p>
      </div>
    </div>
  );
}

function DocSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-8 border-t border-hairline py-16">
      <h2 className="font-display text-3xl text-ink">{title}</h2>
      {children}
    </section>
  );
}

const VOICE_RULES = [
  "Short, declarative sentences. Say the thing, then stop.",
  "Plain and specific over clever. “More customers, more revenue” beats abstract claims.",
  "Numbers are measured, never estimated. If it's not verified, it stays a [DEMO: token], visibly.",
  "No agency filler: never “scroll-stopping,” “elevate,” “curated,” “bespoke,” “unlock,” “seamless,” “leverage.”",
  "One idea per section. Don't stack multiple pitches into one screen.",
  "Em dash (—) for asides, not semicolons or parentheses, matching the rest of the copy.",
];

export default function DesignSystemPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 sm:px-10 lg:px-16">
      <header className="space-y-4 pb-12">
        <Eyebrow>Internal / Editing Team</Eyebrow>
        <h1 className="font-display leading-[1.05] tracking-[-0.02em] text-[clamp(2.25rem,5vw,3.75rem)] text-ink">
          SocialYork Design System
        </h1>
        <p className="max-w-2xl text-[1.05rem] leading-relaxed text-ink-dim">
          The visual and voice guidelines behind socialyork.com, in one
          reference. This page isn&apos;t indexed by search engines &mdash;
          it&apos;s for the team.
        </p>
      </header>

      <DocSection title="Voice & Tone">
        <ul className="max-w-2xl space-y-3">
          {VOICE_RULES.map((rule) => (
            <li
              key={rule}
              className="flex gap-3 text-[1rem] leading-relaxed text-ink-dim"
            >
              <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-gold" />
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </DocSection>

      <DocSection title="Color">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {COLORS.map((c) => (
            <ColorSwatch key={c.name} {...c} />
          ))}
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-ink-faint">
          Gold is the only chromatic accent on the site. It never appears as a
          large fill or body-text color &mdash; only eyebrows, primary
          buttons, stat numbers, and small highlights.
        </p>
      </DocSection>

      <DocSection title="Typography">
        <div className="space-y-10">
          <div className="space-y-3">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-dim">
              Display &mdash; Fraunces
            </p>
            <p className="font-display text-5xl text-ink">
              Aa Bb Cc &mdash; 0123456789
            </p>
            <p className="text-sm text-ink-dim">
              Every heading, hero line, and hero wordmark. Serif, warm,
              editorial. Never used for body copy or UI labels.
            </p>
          </div>
          <div className="space-y-3">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-dim">
              Body / Sans &mdash; Hanken Grotesk
            </p>
            <p className="font-sans text-xl text-ink">
              Aa Bb Cc &mdash; 0123456789
            </p>
            <p className="text-sm text-ink-dim">
              Base body font (set on &lt;body&gt;). Paragraph copy, form
              inputs.
            </p>
          </div>
          <div className="space-y-3">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-dim">
              Mono &mdash; Geist Mono
            </p>
            <p className="font-mono text-xl uppercase tracking-[0.14em] text-ink">
              Aa Bb Cc &mdash; 0123456789
            </p>
            <p className="text-sm text-ink-dim">
              Eyebrows, buttons, form labels, captions &mdash; always
              uppercase with wide tracking. Never for headings or paragraphs.
            </p>
          </div>
        </div>
      </DocSection>

      <DocSection title="Components">
        <div className="space-y-10">
          <div className="space-y-3">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-dim">
              Eyebrow
            </p>
            <Eyebrow index="01">Content Marketing</Eyebrow>
            <p className="max-w-xl text-sm leading-relaxed text-ink-dim">
              Gold, mono, uppercase, wide tracking. Index is optional &mdash;
              use it for the two flagship services and Reporting; omit it for
              everything else.
            </p>
          </div>

          <div className="space-y-3">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-dim">
              Primary button
            </p>
            <button
              type="button"
              className="rounded-full bg-gold px-6 py-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-void transition-colors hover:bg-gold/90"
            >
              Let&apos;s Connect
            </button>
            <p className="max-w-xl text-sm leading-relaxed text-ink-dim">
              Solid gold pill, mono uppercase label, void text for contrast.
              The only filled button style on the site.
            </p>
          </div>

          <div className="space-y-3">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-dim">
              Section tones
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2 rounded-[4px] border border-hairline bg-void p-6">
                <p className="font-display text-lg text-ink">Void (default)</p>
                <p className="text-sm text-ink-dim">
                  Used for most sections: Hero, Positioning, Services, Other
                  Services, Closing.
                </p>
              </div>
              <div className="space-y-2 rounded-[4px] border border-hairline bg-paper p-6">
                <p className="font-display text-lg text-paper-ink">
                  Paper (inverted)
                </p>
                <p className="text-sm text-paper-dim">
                  Reserved for Top Clients, Reporting, and the /influencers
                  page &mdash; a deliberate contrast beat, not the default.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DocSection>

      <DocSection title="Layout & Spacing">
        <ul className="max-w-2xl space-y-3 text-[1rem] leading-relaxed text-ink-dim">
          <li>
            One idea per screen. Sections default to{" "}
            <code className="font-mono text-ink">py-24 md:py-36 lg:py-44</code>{" "}
            vertical padding.
          </li>
          <li>
            Content sits in a single{" "}
            <code className="font-mono text-ink">max-w-5xl</code> column,
            left-aligned &mdash; echoes the hero&apos;s bottom-left anchor.
          </li>
          <li>
            Full-screen &ldquo;quiet&rdquo; sections (Positioning, Reporting,
            Closing) use <code className="font-mono text-ink">center</code>{" "}
            on the Section component: a vertically-centered,
            near-full-viewport block.
          </li>
          <li>
            Horizontal padding scales:{" "}
            <code className="font-mono text-ink">
              px-6 sm:px-10 lg:px-16
            </code>
            .
          </li>
        </ul>
      </DocSection>

      <footer className="border-t border-hairline pt-10">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-faint">
          All copy lives in content/site.ts &mdash; components read from it,
          nothing is hardcoded in JSX.
        </p>
      </footer>
    </main>
  );
}
