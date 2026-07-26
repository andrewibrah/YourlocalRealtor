import type { NextConfig } from "next";

/**
 * GitHub Pages serves a *project* site from `https://<user>.github.io/<repo>/`,
 * not from the domain root. Without `basePath` every asset, route, and link
 * resolves one level too high and the deployed site 404s on everything.
 *
 * Driven by an environment variable rather than hard-coded so the same build
 * works for a project site, a user site, and a custom domain — the last two
 * both serve from the root and leave this empty.
 *
 * `assetPrefix` is set to the same value: `basePath` alone covers routes and
 * `next/image`, but static assets referenced directly need the prefix too.
 *
 * Anything reading a `public/` path in application code goes through
 * `withBasePath()` in `src/lib/utils.ts`, which reads the same variable.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
