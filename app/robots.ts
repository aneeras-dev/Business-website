import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

/**
 * Crawl rules.
 *
 * The AI crawlers are listed explicitly rather than left to the wildcard.
 * Silence already means "allowed", so this changes nothing technically — it
 * records the decision, so nobody has to guess later whether answer engines
 * were meant to have access.
 *
 * `Google-Extended` is the one that is not merely documentation: it governs
 * whether the content can ground Gemini and AI Overviews, which is the main
 * surface this page wants to appear in.
 */
const ANSWER_ENGINE_BOTS = [
  "Google-Extended", // Gemini grounding + AI Overviews
  "GPTBot", // OpenAI crawler
  "OAI-SearchBot", // ChatGPT search index
  "ChatGPT-User", // user-initiated ChatGPT fetches
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Applebot-Extended",
  "CCBot", // Common Crawl, feeds many models
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Nothing here to index, and it accepts POSTed enquiries.
        disallow: "/api/",
      },
      {
        userAgent: ANSWER_ENGINE_BOTS,
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
