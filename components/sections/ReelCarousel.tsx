"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Demo } from "@/components/Demo";
import type { Reel } from "@/content/site";

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={dir === "left" ? "rotate-180" : undefined}
    >
      <path
        d="M6 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-void/45 backdrop-blur-sm">
      <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden>
        <path d="M1 1l12 7-12 7z" fill="currentColor" />
      </svg>
    </span>
  );
}

interface ReelCarouselContent {
  label: string;
  note: string;
  items: Reel[];
}

/** Carousel of Instagram reels -- reused under both Service 01 and Service 02. */
export function ReelCarousel({ content }: { content: ReelCarouselContent }) {
  const { label, note, items } = content;
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>("[data-slide]");
    const amount = slide ? slide.offsetWidth + 24 : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * amount, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="pt-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p
          data-eyebrow
          className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-gold"
        >
          {label}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={atStart}
            aria-label="Previous"
            className="flex h-9 w-9 items-center justify-center rounded-[3px] border border-hairline text-ink-dim transition-colors hover:text-ink disabled:pointer-events-none disabled:opacity-25"
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={atEnd}
            aria-label="Next"
            className="flex h-9 w-9 items-center justify-center rounded-[3px] border border-hairline text-ink-dim transition-colors hover:text-ink disabled:pointer-events-none disabled:opacity-25"
          >
            <Chevron dir="right" />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label={`${label} — scroll for more`}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => {
          const isDemo = item.url.startsWith("[DEMO:");
          return (
            <li
              key={i}
              data-slide
              className="w-[260px] shrink-0 snap-start sm:w-[280px]"
            >
              {isDemo ? (
                <div className="flex aspect-[9/16] flex-col items-center justify-center gap-3 rounded-[4px] border border-dashed border-ink-faint/50 p-4 text-center">
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-faint">
                    Instagram reel
                  </span>
                  <span className="text-xs text-ink-dim">
                    <Demo>{item.url}</Demo>
                  </span>
                </div>
              ) : (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-[9/16] overflow-hidden rounded-[4px] bg-surface"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.cover}
                    alt={`${label} — Instagram reel ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-white transition-opacity duration-300 group-hover:opacity-90">
                    <PlayGlyph />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-void/85 to-transparent px-3 pb-3 pt-8 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-ink">
                    View on Instagram
                    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
                      <path
                        d="M2 8l6-6M3 2h5v5"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        fill="none"
                        strokeLinecap="square"
                      />
                    </svg>
                  </span>
                </a>
              )}
            </li>
          );
        })}
      </ul>

      {note ? (
        <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ink-faint">
          <Demo>{note}</Demo>
        </p>
      ) : null}
    </div>
  );
}
