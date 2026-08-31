/**
 * Loads Instagram's official embed script once, on demand. Callers gate this
 * behind an IntersectionObserver so nothing third-party loads until the reel
 * carousel nears the viewport.
 */

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const EMBED_SRC = "https://www.instagram.com/embed.js";
let loader: Promise<void> | null = null;

export function loadInstagramEmbed(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.instgrm) return Promise.resolve();
  if (loader) return loader;

  loader = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = EMBED_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loader = null;
      reject(new Error("Instagram embed.js failed to load"));
    };
    document.body.appendChild(script);
  });
  return loader;
}

/** Ask Instagram to turn any unprocessed .instagram-media blockquotes into embeds. */
export function processInstagramEmbeds(): void {
  window.instgrm?.Embeds.process();
}
