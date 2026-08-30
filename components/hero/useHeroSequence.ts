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
 *  - "blackout" the resolved end state only: black, still, resolve line.
 *               Repeat visitors land here -- nobody sits through it twice.
 *  - "sequence" first desktop visit: noise, two lines, hard stop, resolve.
 *
 * Scroll is never locked. Any scroll / key intent during the sequence cuts
 * straight to the resolved state.
 */

export type HeroMode = "static" | "blackout" | "sequence";
export type HeroStep = 0 | 1 | 2 | 3;

const SEEN_KEY = "sy_hero_seen";
const DESKTOP_QUERY = "(min-width: 1024px)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

const T_LINE_ONE = 900;
const T_LINE_TWO = 3400;
const T_HARD_STOP = 6400;

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function markSeen() {
  try {
    window.localStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* storage blocked -- sequence will simply run again next visit */
  }
}

export interface HeroSequence {
  mode: HeroMode;
  step: HeroStep;
  resolveNow: () => void;
}

export function useHeroSequence(): HeroSequence {
  // SSR / first paint: the static resolved state. Safe with no JS, and
  // corrected before paint by the layout effect below when JS runs.
  const [mode, setMode] = useState<HeroMode>("static");
  const [step, setStep] = useState<HeroStep>(0);
  const timers = useRef<number[]>([]);
  const settled = useRef(false);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const resolveNow = () => {
    if (settled.current) return;
    settled.current = true;
    clearTimers();
    markSeen();
    setStep(3);
  };

  useIsoLayoutEffect(() => {
    const reduced = window.matchMedia(REDUCED_QUERY).matches;
    const desktop = window.matchMedia(DESKTOP_QUERY).matches;

    // `?replay` forces the full sequence -- handy for reviewing the hero without
    // clearing storage or opening a private window.
    const replay = new URLSearchParams(window.location.search).has("replay");

    let seen = false;
    try {
      seen = !replay && window.localStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* storage blocked -- treat as first visit */
    }

    if (reduced || !desktop) {
      setMode("static");
      setStep(0);
      return;
    }

    if (seen) {
      settled.current = true;
      setMode("blackout");
      setStep(3);
      return;
    }

    setMode("sequence");
    setStep(0);
    timers.current.push(
      window.setTimeout(() => setStep(1), T_LINE_ONE),
      window.setTimeout(() => setStep(2), T_LINE_TWO),
      window.setTimeout(() => {
        settled.current = true;
        markSeen();
        setStep(3);
      }, T_HARD_STOP),
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
  }, []);

  return { mode, step, resolveNow };
}
