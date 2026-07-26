/**
 * Video taxonomy — labels and filter order.
 *
 * Split out from `content/videos.ts` on purpose. The video records are
 * validated with Zod at build time, and the filter UI is a client component;
 * importing the labels from the records module would pull the validator into
 * the browser bundle for the sake of six strings.
 *
 * `VideoCategory` is imported as a type only, so nothing is emitted.
 */
import type { VideoCategory } from "@/lib/schema";

export const VIDEO_CATEGORY_LABELS: Record<VideoCategory, string> = {
  budget: "Market decisions",
  "buyer-education": "Buying",
  "seller-education": "Selling",
  "first-time-buyer": "First home",
  "property-tour": "Property films",
};

/** Filter order for the library page. */
export const VIDEO_FILTERS = [
  { id: "all", label: "Everything" },
  { id: "buyer-education", label: "Buying" },
  { id: "seller-education", label: "Selling" },
  { id: "first-time-buyer", label: "First home" },
  { id: "property-tour", label: "Property films" },
  { id: "budget", label: "Market decisions" },
] as const;
