import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * A bare `userAgent: "*"` block covers AI crawlers too, but naming them
 * explicitly makes the intent unambiguous -- these are the bots behind
 * ChatGPT, Claude, Perplexity, and Google's AI features indexing/citing
 * this site.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `https://${site.meta.domain}/sitemap.xml`,
  };
}
