"use client";

import { useEffect, useRef, useState } from "react";
import { Demo } from "@/components/Demo";
import { Eyebrow } from "@/components/Eyebrow";
import type { ServiceSection } from "@/content/site";

/**
 * Same "pins, holds, then releases" beat as HowWeDoItReveal's title card, but
 * without the curtain -- there's no preceding section to cover here. The
 * eyebrow/title/body stick to the top of the screen for a stretch of scroll,
 * then release into whatever follows (the reel carousel) in normal flow.
 */
export function ServiceSticky({ service }: { service: ServiceSection }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState<boolean | null>(null);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

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

  if (reduced !== false) {
    return (
      <section
        id={`service-${service.index}`}
        className="bg-void px-6 py-24 sm:px-10 lg:px-16"
      >
        <div className="mx-auto w-full max-w-5xl text-left">{titleCard}</div>
      </section>
    );
  }

  return (
    <section
      ref={wrapperRef}
      id={`service-${service.index}`}
      className="relative h-[90svh] bg-void"
    >
      <div className="sticky top-0 flex h-[65svh] min-h-[440px] w-full items-start bg-void px-6 pt-24 sm:px-10 sm:pt-28 lg:px-16">
        <div className="mx-auto w-full max-w-5xl text-left">{titleCard}</div>
      </div>
    </section>
  );
}
