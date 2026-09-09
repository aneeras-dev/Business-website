import type { MetadataRoute } from "next";
import { LEGAL_DOCS, SITE } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [`${SITE.url}/opengraph-image.png`, `${SITE.url}/logo.png`],
    },
    {
      url: `${SITE.url}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...LEGAL_DOCS.map(
      (doc): MetadataRoute.Sitemap[number] => ({
        url: `${SITE.url}/legal/${doc.slug}`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.3,
      })
    ),
  ];
}
