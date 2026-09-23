"use client";

import { useEffect, useRef, useState } from "react";
import { Demo } from "@/components/Demo";
import { Eyebrow } from "@/components/Eyebrow";
import type { ServiceSection } from "@/content/site";
import { site } from "@/content/site";

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

/** Fraction of the pinned scroll range that holds still before the curtain starts sliding. */
const HOLD = 0.4;

function ArrowDown() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M6 1.5v8M2.5 6 6 9.5 9.5 6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Pill outline (158x42, rx=21, inset 1px) traced as an explicit path starting
// at top-centre and going clockwise, rather than an SVG <rect> (which always
// starts partway along the top-left) -- so the loading trace begins dead
// centre at the top, matching the arrow/label above it.
const PILL_PATH =
  "M80 1 L138 1 A21 21 0 0 1 159 22 A21 21 0 0 1 138 43 L22 43 A21 21 0 0 1 1 22 A21 21 0 0 1 22 1 L80 1 Z";

/**
 * "Unveil" chip: a fixed-size pill whose border traces itself in -- gold,
 * starting from nothing -- as `fill` goes 0 to 1, like a loading ring. A faint
 * static outline underneath shows the full pill shape from the start.
 */
function UnveilChip({ fill }: { fill: number }) {
  return (
    <div className="relative h-11 w-40">
      <svg viewBox="0 0 160 44" className="absolute inset-0 h-full w-full" fill="none">
        <path
          d={PILL_PATH}
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1"
          className="text-ink"
        />
        <path
          d={PILL_PATH}
          pathLength={1}
          strokeDasharray={`${fill} ${1 - fill}`}
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          className="text-gold"
        />
      </svg>
      <div className="relative flex h-full w-full items-center justify-center gap-2 font-display tracking-[-0.02em] text-ink">
        <span>Let&apos;s Unveil</span>
        <ArrowDown />
      </div>
    </div>
  );
}

/**
 * "How do we do it" is a solid curtain pinned full-screen. It holds still for
 * the first stretch of scroll (a deliberate "stuck" beat -- an "Unveil" chip
 * hints that more scrolling moves it) before sliding straight up and off,
 * tracking the scroll position directly for the rest (no CSS transition, no
 * separate timing) -- uncovering Service 01's title card, which sits fully in
 * place underneath it the whole time.
 *
 * Driven by a rAF-throttled scroll listener rather than CSS scroll-timeline,
 * so it behaves identically in every browser. Falls back to a plain stacked,
 * static layout under prefers-reduced-motion -- no pin, no motion, no
 * listener at all.
 */
export function HowWeDoItReveal({ service }: { service: ServiceSection }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState<boolean | null>(null);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduced !== false) return;
    const el = wrapperRef.current;
    if (!el) return;

    let ticking = false;
    const compute = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      setProgress(total <= 0 ? 1 : clamp(-rect.top / total, 0, 1));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(compute);
      }
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  const titleCard = (
    <div className="max-w-3xl space-y-9">
      <Eyebrow index={service.index}>{service.label}</Eyebrow>
      <h2 className="font-display leading-[1.06] tracking-[-0.02em] text-[clamp(2rem,5vw,3.75rem)] text-ink">
        {service.title}
      </h2>
      <div className="max-w-2xl space-y-5 text-[1.05rem] leading-relaxed text-ink/65">
        {service.body.map((paragraph, i) => (
          <p key={i}>
            <Demo>{paragraph}</Demo>
          </p>
        ))}
      </div>
    </div>
  );

  // Reduced motion (or not yet known, for a flash-free SSR-safe first paint):
  // plain stacked static content, no pin, no curtain, no scroll listener.
  if (reduced !== false) {
    return (
      <section
        id="how-we-do-it"
        aria-label={site.howWeDoIt.heading}
        className="flex flex-col items-center justify-center gap-16 bg-void px-6 py-32 text-center sm:px-10 lg:px-16"
      >
        <h2 className="font-display leading-[1.04] tracking-[-0.02em] text-[clamp(2.25rem,6vw,4.5rem)] text-ink">
          {site.howWeDoIt.heading}
        </h2>
        <div className="mx-auto w-full max-w-5xl text-left">{titleCard}</div>
      </section>
    );
  }

  const slide = clamp((progress - HOLD) / (1 - HOLD), 0, 1);
  const holdFill = clamp(progress / HOLD, 0, 1);

  return (
    <section
      ref={wrapperRef}
      id="how-we-do-it"
      aria-label={site.howWeDoIt.heading}
      className="relative h-[200svh]"
    >
      <div className="sticky top-0 h-[60svh] min-h-[440px] w-full">
        {/* Card: sits still underneath, fully in place from the start. */}
        <div className="absolute inset-x-0 top-0 flex min-h-full items-start bg-void px-6 pt-24 sm:px-10 sm:pt-28 lg:px-16">
          <div className="mx-auto w-full max-w-5xl text-left">{titleCard}</div>
        </div>

        {/*
          Curtain: holds still, then slides straight up 1:1 with scroll. Sized
          to the full viewport (not the smaller pin box above) so "How do we do
          it?" sits at true screen-centre and the chip anchors to the true
          screen bottom, however short the pin box itself is.
        */}
        <div
          aria-hidden
          style={{ transform: `translateY(${-slide * 100}%)` }}
          className="absolute inset-x-0 top-0 z-10 flex h-[100svh] min-h-[560px] items-center justify-center bg-void px-6 will-change-transform"
        >
          <h2 className="text-center font-display leading-[1.04] tracking-[-0.02em] text-[clamp(2.5rem,7vw,6rem)] text-ink">
            {site.howWeDoIt.heading}
          </h2>

          <div className="absolute inset-x-0 bottom-8 flex justify-center sm:bottom-10">
            <UnveilChip fill={holdFill} />
          </div>
        </div>
      </div>
    </section>
  );
}
