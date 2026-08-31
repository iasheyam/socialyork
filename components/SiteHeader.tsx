"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

/**
 * Fixed header, revealed once the hero has resolved. No nav -- there is nowhere
 * else to go on a single page -- just the wordmark on a dark frosted-glass bar
 * that content scrolls under.
 */
export function SiteHeader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-visible={visible}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-gradient-to-b from-void/75 to-void/45 px-6 backdrop-blur-xl backdrop-saturate-150 transition-transform duration-500 ease-out data-[visible=false]:-translate-y-full data-[visible=true]:translate-y-0 motion-reduce:transition-none sm:px-10 lg:px-16"
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center">
        <a
          href="#top"
          aria-label={`${site.meta.name} — back to top`}
          tabIndex={visible ? 0 : -1}
          className="font-display text-[0.95rem] tracking-tight text-ink transition-opacity hover:opacity-70"
        >
          {site.meta.name}
        </a>
      </div>
    </header>
  );
}
