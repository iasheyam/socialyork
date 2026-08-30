"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

/**
 * Small fixed wordmark, revealed only after the hero has resolved. No nav --
 * there is nowhere else to go on a single page. `mix-blend-difference` keeps it
 * legible over both the black sections and the bone Guarantee screen.
 */
export function Wordmark() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#top"
      aria-label={`${site.meta.name} — back to top`}
      tabIndex={visible ? 0 : -1}
      data-visible={visible}
      className="fixed left-5 top-4 z-50 font-display text-[0.95rem] tracking-tight text-white opacity-0 mix-blend-difference transition-opacity duration-500 data-[visible=false]:pointer-events-none data-[visible=true]:opacity-100 motion-reduce:transition-none sm:left-8 sm:top-5"
    >
      {site.meta.name}
    </a>
  );
}
