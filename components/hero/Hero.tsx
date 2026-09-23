"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { useHeroSequence } from "./useHeroSequence";

const LINE =
  "block font-display leading-[1.04] tracking-[-0.02em] text-[clamp(2.25rem,6vw,5.25rem)] transition-[opacity,transform] duration-[650ms] ease-out";

const RESOLVE =
  "block font-display leading-[1.05] tracking-[-0.02em] text-[clamp(2rem,5vw,4.25rem)] transition-[opacity,transform] duration-[650ms] ease-out";

/** SocialYork line: same type, but as a highlighted mark -- paper block behind the name. */
const RESOLVE_HIGHLIGHT =
  "inline-block bg-paper px-3 py-0.5 font-display leading-[1.05] tracking-[-0.02em] text-[clamp(2rem,5vw,4.25rem)] text-paper-ink transition-[opacity,transform] duration-[650ms] ease-out";

/** Gap between the two resolve lines landing, mirroring the build lines' beat. */
const RESOLVE_STAGGER = 500;

/**
 * One clip in the hero montage. All clips stay playing and looping; the montage
 * crossfades between them by toggling `active` (opacity, ~700ms), looping
 * 1 -> 2 -> 3 -> 1 forever.
 *
 * Autoplay needs the `muted` DOM *property* set before play() is called; React
 * does not reliably reflect the `muted` JSX prop, so we set it on the ref and
 * kick playback ourselves. Non-eager clips defer loading until the first clip
 * is under way ("lazy-loaded past the first clip").
 */
function HeroVideo({
  clip,
  active,
  eager,
}: {
  clip: string;
  active: boolean;
  eager: boolean;
}) {
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

    video.addEventListener("canplay", play, { once: true });

    if (eager) {
      play();
      return () => video.removeEventListener("canplay", play);
    }

    const id = window.setTimeout(() => {
      video.preload = "auto";
      video.load();
      play();
    }, 700);
    return () => {
      window.clearTimeout(id);
      video.removeEventListener("canplay", play);
    };
  }, [eager]);

  return (
    <video
      ref={ref}
      className={cn(
        "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out",
        active ? "opacity-100" : "opacity-0",
      )}
      muted
      playsInline
      loop
      preload={eager ? "auto" : "none"}
      poster={`/video/${clip}.jpg`}
      tabIndex={-1}
    >
      <source src={`/video/${clip}.webm`} type="video/webm" />
      <source src={`/video/${clip}.mp4`} type="video/mp4" />
    </video>
  );
}

/**
 * Resolve lines land on mount, one after the other -- the same slide-up-and-fade
 * as the two build lines, not a group fade.
 */
function ResolveLine({ lines }: { lines: [string, string] }) {
  const [shown, setShown] = useState<0 | 1 | 2>(0);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setShown(1));
    const timer = window.setTimeout(() => setShown(2), RESOLVE_STAGGER);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, []);
  return (
    <div className="space-y-1">
      <span
        className={cn(
          RESOLVE_HIGHLIGHT,
          shown >= 1 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        )}
      >
        {lines[0]}
      </span>
      <span
        className={cn(
          RESOLVE,
          shown >= 2 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        )}
      >
        {lines[1]}
      </span>
    </div>
  );
}

export function Hero() {
  const clips = site.hero.clips;
  const { mode, textStage, clipIndex } = useHeroSequence(clips.length);
  const [lineOne, lineTwo] = site.hero.lines;
  const posterClip = clips[0];

  const isStatic = mode === "static";
  const resolved = textStage === 3;

  const showLineOne = isStatic || textStage >= 1;
  const showLineTwo = isStatic || textStage >= 2;
  const showResolve = isStatic || resolved;

  return (
    <section
      id="top"
      aria-label={site.meta.name}
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-void"
    >
      {/* Media layer. Poster paints first; the clips crossfade in a loop. */}
      <div aria-hidden className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/video/${posterClip}.jpg`}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {!isStatic &&
          clips.map((clip, i) => (
            <HeroVideo
              key={clip}
              clip={clip}
              active={i === clipIndex}
              eager={i === 0}
            />
          ))}
        <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/25 to-void/10" />
      </div>

      <h1 className="sr-only">
        {lineOne} {lineTwo} {site.hero.resolve.join(" ")}
      </h1>

      {/* Type layer, top-left anchored: the two build lines, staying on screen once shown. */}
      <div className="absolute inset-x-0 top-0 px-6 pt-8 sm:px-10 sm:pt-10 lg:px-16 lg:pt-14">
        <div className="mx-auto max-w-5xl">
          <div aria-hidden className="space-y-1 text-ink">
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
        </div>
      </div>

      {/* Type layer, bottom-left anchored: the resolve lines. */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-8 sm:px-10 sm:pb-10 lg:px-16 lg:pb-14">
        <div className="mx-auto max-w-5xl">
          <div aria-hidden className="text-ink">
            {isStatic ? (
              <div className="space-y-1">
                <span className={RESOLVE_HIGHLIGHT}>
                  {site.hero.resolve[0]}
                </span>
                <span className={RESOLVE}>{site.hero.resolve[1]}</span>
              </div>
            ) : showResolve ? (
              <ResolveLine lines={site.hero.resolve} />
            ) : null}
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
