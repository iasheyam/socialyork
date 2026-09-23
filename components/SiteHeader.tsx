"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      {open ? (
        <path
          d="M4 4l10 10M14 4L4 14"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M2 5h14M2 9h14M2 13h14"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

/**
 * Fixed header, revealed once the hero has resolved: wordmark, two secondary
 * links (client login destination TBD -- no portal yet) and the primary CTA,
 * on a dark frosted-glass bar that content scrolls under. Below `sm`, the
 * secondary links move into a burger-triggered dropdown next to the CTA
 * instead of disappearing.
 */
export function SiteHeader() {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > window.innerHeight * 0.7;
      setVisible(next);
      if (!next) setMenuOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const tabIndex = visible ? 0 : -1;
  const menuTabIndex = visible && menuOpen ? 0 : -1;

  return (
    <header
      data-visible={visible}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.05] bg-gradient-to-b from-void/90 to-void/75 px-6 backdrop-blur-2xl backdrop-saturate-150 transition-transform duration-500 ease-out data-[visible=false]:-translate-y-full data-[visible=true]:translate-y-0 motion-reduce:transition-none sm:px-10 lg:px-16"
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center">
        <Link
          href="/#top"
          aria-label={`${site.meta.name} — back to top`}
          tabIndex={tabIndex}
          className="font-display text-[0.95rem] tracking-tight text-ink transition-opacity hover:opacity-70"
        >
          {site.meta.name}
        </Link>

        <nav className="ml-auto flex items-center gap-5 sm:gap-8">
          <Link
            href="/influencers"
            tabIndex={tabIndex}
            className="hidden font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-dim transition-colors hover:text-ink sm:inline-block"
          >
            Join as Influencer
          </Link>
          <a
            href="#"
            tabIndex={tabIndex}
            className="hidden font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-dim transition-colors hover:text-ink sm:inline-block"
          >
            Client Login
          </a>
          <Link
            href="/#contact"
            tabIndex={tabIndex}
            className="rounded-full bg-gold px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-void transition-colors hover:bg-gold/90"
          >
            Let&apos;s Connect
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            tabIndex={tabIndex}
            className="flex h-8 w-8 items-center justify-center text-ink transition-opacity hover:opacity-70 sm:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </nav>
      </div>

      <div
        className={cn(
          "overflow-hidden transition-[grid-template-rows] duration-300 ease-out sm:hidden",
          "grid",
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0">
          <nav className="flex flex-col border-t border-white/[0.05] px-6 py-2">
            <Link
              href="/influencers"
              tabIndex={menuTabIndex}
              onClick={() => setMenuOpen(false)}
              className="py-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-dim transition-colors hover:text-ink"
            >
              Join as Influencer
            </Link>
            <a
              href="#"
              tabIndex={menuTabIndex}
              onClick={() => setMenuOpen(false)}
              className="py-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-dim transition-colors hover:text-ink"
            >
              Client Login
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
