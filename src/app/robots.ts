import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";

/**
 * Required by `output: "export"` — metadata routes must be explicitly marked
 * static so Next.js emits a file rather than a request handler.
 */
export const dynamic = "force-static";

/**
 * robots.txt
 *
 * Everything public is crawlable, including by AI-search crawlers. That is a
 * deliberate choice rather than an oversight: this site's entire job is to be
 * found and quoted accurately by someone deciding who to call, and the
 * assistants people now ask for local recommendations are part of that. There
 * is nothing here to protect — no accounts, no private data, no paywall.
 *
 * `/brokerage-notices/` is disallowed while it is a list of outstanding
 * compliance items rather than the required disclosures. It carries `noindex`
 * for the same reason and is removed from both once the details are approved.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/brokerage-notices/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
