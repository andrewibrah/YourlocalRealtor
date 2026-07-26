import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * `tailwind-merge`, taught about this project's custom type scale.
 *
 * This is not optional configuration. Out of the box, tailwind-merge sorts
 * `text-*` utilities into two groups it recognises — font sizes it knows
 * (`text-sm`, `text-lg`, …) and colours — and treats anything else prefixed
 * with `text-` as a colour. Our scale is entirely custom (`text-heading-lg`,
 * `text-caption`, …), so a call like
 *
 *     cn("font-display text-heading-lg", "text-gray-300")
 *
 * had tailwind-merge classify `text-heading-lg` as a colour, decide it
 * conflicted with `text-gray-300`, and drop it. The element silently rendered
 * at the inherited font size.
 *
 * That was live in `ProcessList`, `Price`, `Stat`, and several others before an
 * accessibility scan reported a 48px heading measuring 16px. Registering the
 * scale under `font-size` fixes the whole class of bug at the root rather than
 * one call site at a time.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-xl",
            "display-lg",
            "heading-xl",
            "heading-lg",
            "heading-md",
            "body-lg",
            "body",
            "caption",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Prefixes a `public/` asset path with the deployment base path.
 *
 * `next/image` and `next/link` do this automatically; a plain `<img>` does not.
 * Needed because GitHub Pages serves project sites from `/<repo>/` unless a
 * custom domain is configured.
 */
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}

/** Two-digit index used throughout the call-sheet layout: 1 → "01". */
export function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

/**
 * Formats an ISO date for display. Returns null for a null input so callers are
 * forced to handle the "date not yet confirmed" case explicitly rather than
 * silently rendering an empty string.
 */
export function formatDate(iso: string | null): string | null {
  if (!iso) return null;

  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
