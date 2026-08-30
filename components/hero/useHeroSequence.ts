"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * Hero sequence state machine, kept separate from layout so a reduced mobile
 * version can be dropped in later without touching this file.
 *
 * Modes:
 *  - "static"   poster frame with all three lines resolved. Reduced motion,
 *               no-JS, and (this phase) anything below desktop. A deliberate
 *               good-looking state, not a degraded one.
 *  - "sequence" desktop with motion allowed: the clips crossfade in a
 *               continuous loop (1 -> 2 -> 3 -> 1 ...) while the two lines land
 *               and then resolve. The footage never stops.
 *
 * Scroll is never locked. Any scroll / key intent during the sequence jumps
 * the text straight to the resolved line.
 */

export type HeroMode = "static" | "sequence";
/** 0 no lines, 1 line one, 2 both lines, 3 resolved (lines out, resolve in) */
export type TextStage = 0 | 1 | 2 | 3;

const DESKTOP_QUERY = "(min-width: 1024px)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

const T_LINE_ONE = 900;
const T_LINE_TWO = 3400;
const T_RESOLVE = 6500;
/** how long each clip holds before it crossfades to the next */
const T_CLIP = 2600;

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface HeroSequence {
  mode: HeroMode;
  textStage: TextStage;
  clipIndex: number;
  resolveNow: () => void;
}

export function useHeroSequence(clipCount: number): HeroSequence {
  // SSR / first paint: the static resolved state. Safe with no JS, and
  // corrected before paint by the layout effect below when JS runs.
  const [mode, setMode] = useState<HeroMode>("static");
  const [textStage, setTextStage] = useState<TextStage>(0);
  const [clipIndex, setClipIndex] = useState(0);
  const timers = useRef<number[]>([]);
  const clipTimer = useRef<number | null>(null);
  const resolved = useRef(false);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    if (clipTimer.current !== null) {
      window.clearTimeout(clipTimer.current);
      clipTimer.current = null;
    }
  };

  const resolveNow = () => {
    if (resolved.current) return;
    resolved.current = true;
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setTextStage(3);
  };

  useIsoLayoutEffect(() => {
    const reduced = window.matchMedia(REDUCED_QUERY).matches;
    const desktop = window.matchMedia(DESKTOP_QUERY).matches;

    if (reduced || !desktop || clipCount === 0) {
      setMode("static");
      setTextStage(0);
      setClipIndex(0);
      return;
    }

    setMode("sequence");
    setTextStage(0);
    setClipIndex(0);

    // Continuous loop through the clips: 1 -> 2 -> 3 -> 1 -> ...
    let current = 0;
    const advanceClip = () => {
      current = (current + 1) % clipCount;
      setClipIndex(current);
      clipTimer.current = window.setTimeout(advanceClip, T_CLIP);
    };
    clipTimer.current = window.setTimeout(advanceClip, T_CLIP);

    timers.current.push(
      window.setTimeout(() => setTextStage(1), T_LINE_ONE),
      window.setTimeout(() => setTextStage(2), T_LINE_TWO),
      window.setTimeout(() => {
        resolved.current = true;
        setTextStage(3);
      }, T_RESOLVE),
    );

    const cut = () => resolveNow();
    const passive = { passive: true } as const;
    window.addEventListener("wheel", cut, passive);
    window.addEventListener("touchmove", cut, passive);
    window.addEventListener("scroll", cut, passive);
    const onKey = (e: KeyboardEvent) => {
      if (
        ["ArrowDown", "PageDown", "End", "Home", " ", "Spacebar"].includes(e.key)
      ) {
        resolveNow();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      clearTimers();
      window.removeEventListener("wheel", cut);
      window.removeEventListener("touchmove", cut);
      window.removeEventListener("scroll", cut);
      window.removeEventListener("keydown", onKey);
    };
  }, [clipCount]);

  return { mode, textStage, clipIndex, resolveNow };
}
