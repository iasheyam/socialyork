"use client";

import { memo, useEffect, useRef, useState } from "react";
import { loadInstagramEmbed, processInstagramEmbeds } from "@/lib/instagram";

/**
 * A single Instagram reel embed. The embed script is loaded lazily -- only once
 * this element gets within ~600px of the viewport -- then Instagram replaces the
 * blockquote with its iframe card. If the script fails, we fall back to a plain
 * link out to the reel.
 */
export const InstagramEmbed = memo(function InstagramEmbed({
  url,
}: {
  url: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;

    const start = () => {
      loadInstagramEmbed()
        .then(() => {
          if (!cancelled) processInstagramEmbeds();
        })
        .catch(() => {
          if (!cancelled) setFailed(true);
        });
    };

    if (typeof IntersectionObserver === "undefined") {
      start();
      return () => {
        cancelled = true;
      };
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          io.disconnect();
          start();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, [url]);

  if (failed) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex aspect-[9/16] items-center justify-center rounded-[4px] border border-hairline p-4 text-center font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ink-dim underline-offset-4 hover:text-ink hover:underline"
      >
        View reel on Instagram
      </a>
    );
  }

  return (
    <div ref={ref}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          margin: 0,
          padding: 0,
          minWidth: "100%",
          width: "100%",
          background: "#000",
        }}
      >
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ink-dim"
        >
          View reel on Instagram
        </a>
      </blockquote>
    </div>
  );
});
