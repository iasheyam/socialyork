"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { useHeroSequence } from "./useHeroSequence";

const LINE =
  "block font-display leading-[1.04] tracking-[-0.02em] text-[clamp(2.25rem,6vw,5.25rem)] transition-[opacity,transform] duration-[650ms] ease-out";

/**
 * Autoplay needs the `muted` DOM *property* set before play() is called. React
 * does not reliably reflect the `muted` JSX prop to the element, so set it on a
 * ref and kick playback ourselves; browsers otherwise block the autoplay.
 */
function HeroVideo({ clip }: { clip: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;

    const play = () => {
      const attempt = video.play();
      if (attempt && typeof attempt.catch === "function") {
        attempt.catch(() => {
          /* autoplay refused -- poster frame stands in */
        });
      }
    };

    play();
    video.addEventListener("loadeddata", play, { once: true });
    video.addEventListener("canplay", play, { once: true });
    return () => {
      video.removeEventListener("loadeddata", play);
      video.removeEventListener("canplay", play);
    };
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      playsInline
      loop
      preload="auto"
      poster={`/video/${clip}.jpg`}
      tabIndex={-1}
    >
      <source src={`/video/${clip}.webm`} type="video/webm" />
      <source src={`/video/${clip}.mp4`} type="video/mp4" />
    </video>
  );
}

export function Hero() {
  const { mode, step } = useHeroSequence();
  const [lineOne, lineTwo] = site.hero.lines;
  const clip = site.hero.clips[0];

  const inSequence = mode === "sequence";
  const black = inSequence && step === 3;
  const showMedia = mode === "static" || (inSequence && step < 3);
  const showVideo = inSequence && step < 3;
  const showLineOne = mode === "static" || (inSequence && step >= 1 && step < 3);
  const showLineTwo = mode === "static" || (inSequence && step >= 2 && step < 3);
  const showResolve = !inSequence || step === 3;

  return (
    <section
      id="top"
      aria-label={site.meta.name}
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-void"
    >
      {/* Media layer. Poster paints on first paint; video layers over it. */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 transition-opacity duration-150 ease-linear",
          black ? "opacity-0" : "opacity-100",
        )}
      >
        {showMedia && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/video/${clip}.jpg`}
              alt=""
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {showVideo && <HeroVideo clip={clip} />}
            <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/25 to-void/10" />
          </>
        )}
      </div>

      {/* Type layer, bottom-left anchored. */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-8 sm:px-10 sm:pb-10 lg:px-16 lg:pb-14">
        <div className="mx-auto max-w-5xl">
          <h1 className="sr-only">
            {lineOne} {lineTwo} {site.hero.resolve}
          </h1>

          <div aria-hidden className="text-ink">
            {!black && (
              <div className="space-y-1">
                <span
                  className={cn(
                    LINE,
                    showLineOne
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0",
                  )}
                >
                  {lineOne}
                </span>
                <span
                  className={cn(
                    LINE,
                    showLineTwo
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0",
                  )}
                >
                  {lineTwo}
                </span>
              </div>
            )}

            <span
              className={cn(
                "mt-[0.35em] block max-w-[18ch] font-display leading-[1.04] tracking-[-0.02em] text-[clamp(2.25rem,6vw,5.25rem)]",
                "transition-opacity duration-[1100ms] ease-out",
                showResolve ? "opacity-100" : "opacity-0",
              )}
            >
              {site.hero.resolve}
            </span>
          </div>
        </div>
      </div>

      {showResolve && (
        <span className="pointer-events-none absolute bottom-8 right-6 font-mono text-[0.62rem] uppercase tracking-[0.3em] text-ink-dim sm:right-10 lg:right-16">
          Scroll
        </span>
      )}
    </section>
  );
}
