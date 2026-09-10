"use client";

import { useEffect, useRef, useState } from "react";
import type { Client } from "@/content/site";

/**
 * Reel-shaped (9:16) video above a client name.
 *
 * Google Drive's `/preview` player mis-renders below ~400px wide (the video gets
 * clipped and off-centre). So the iframe is rendered at a comfortable width and
 * scaled down to fit the frame; the frame's aspect ratio keeps the scaled iframe
 * flush on all sides.
 */
const RENDER_WIDTH = 560;
const RENDER_HEIGHT = (RENDER_WIDTH * 16) / 9;

export function ClientReel({ client }: { client: Client }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = frameRef.current;
    if (!el || !client.video) return;
    const measure = () => setScale(el.clientWidth / RENDER_WIDTH);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [client.video]);

  return (
    <div
      ref={frameRef}
      className="relative aspect-[9/16] w-full overflow-hidden rounded-[4px] border border-hairline bg-surface"
    >
      {client.video ? (
        <iframe
          src={client.video}
          title={`${client.name} — reel`}
          loading="lazy"
          allow="autoplay; fullscreen"
          allowFullScreen
          className="absolute left-0 top-0 origin-top-left border-0"
          style={{
            width: RENDER_WIDTH,
            height: RENDER_HEIGHT,
            transform: `scale(${scale})`,
            visibility: scale ? "visible" : "hidden",
          }}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-faint">
            Reel
          </span>
        </div>
      )}
    </div>
  );
}
