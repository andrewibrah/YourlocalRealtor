import type { MetadataRoute } from "next";

import { areas } from "@/content/areas";
import { properties } from "@/content/properties";
import { proofStories } from "@/content/proof";
import { videos } from "@/content/videos";
import { absoluteUrl } from "@/lib/seo";
import { brokerageIsApproved } from "@/lib/site-config";

/**
 * Required by `output: "export"` — metadata routes must be explicitly marked
 * static so Next.js emits a file rather than a request handler.
 */
export const dynamic = "force-static";

/**
 * Sitemap.
 *
 * Generated at build time into a static `sitemap.xml`. Priorities reflect the
 * hub-and-spoke structure: the two service pages and the two area pages carry
 * the local intent, the proof pages carry the trust, and the library carries
 * the depth.
 *
 * `/brokerage-notices/` is excluded while it is a list of outstanding items
 * rather than the required disclosures — it is marked `noindex` for the same
 * reason, and a sitemap entry for a noindex page is a contradictory signal.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/buy/", priority: 0.9 },
    { path: "/sell/", priority: 0.9 },
    { path: "/results/", priority: 0.8 },
    { path: "/properties/", priority: 0.7 },
    { path: "/videos/", priority: 0.7 },
    { path: "/buy/first-home/", priority: 0.7 },
    { path: "/buy/budget/", priority: 0.6 },
    { path: "/buy/buy-vs-rent/", priority: 0.6 },
    { path: "/about/", priority: 0.6 },
    { path: "/contact/", priority: 0.6 },
    { path: "/fair-housing/", priority: 0.3 },
    { path: "/accessibility/", priority: 0.3 },
    { path: "/privacy/", priority: 0.3 },
    { path: "/legal/", priority: 0.3 },
    ...(brokerageIsApproved
      ? [{ path: "/brokerage-notices/", priority: 0.3 }]
      : []),
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route.priority,
    })),
    ...areas.map((area) => ({
      url: absoluteUrl(`/areas/${area.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...proofStories.map((story) => ({
      url: absoluteUrl(`/results/${story.slug}/`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...properties.map((property) => ({
      url: absoluteUrl(`/properties/${property.slug}/`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...videos.map((video) => ({
      url: absoluteUrl(`/videos/${video.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
