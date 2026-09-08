import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

/**
 * One entry, because the portal is a single page. If the per-category and
 * pricing sections are ever split into their own routes, add them here — a
 * sitemap of one URL is doing very little work.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [`${SITE.url}/opengraph-image.png`, `${SITE.url}/logo.png`],
    },
  ];
}
