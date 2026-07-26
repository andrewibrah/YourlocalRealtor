import { z } from "zod";

import { parseCollection, verificationSchema } from "@/lib/schema";

/**
 * Coverage areas.
 *
 * These pages exist because dedicated local pages are the strongest local
 * organic signal available to a site with no physical storefront — but they are
 * also the easiest thing in local SEO to get badly wrong. A location page that
 * survives having its city name swapped for another city is a doorway page, and
 * Google has demonstrably penalised that pattern.
 *
 * So every area page here is anchored to transactions that actually closed in
 * that borough. Swap "Staten Island" for "Brooklyn" on the Staten Island page
 * and the addresses, the amounts, and the transaction types all become false.
 * That is the test these pages are built to pass.
 *
 * Fair-housing discipline (`docs/09`): no subjective neighbourhood
 * characterisation. Nothing here describes an area as safe, family-friendly,
 * up-and-coming, desirable, or good for any group of people. The content is
 * transactions, property types, postal codes, and process.
 */
const areaSchema = z.object({
  slug: z.string().regex(/^[a-z0-9][a-z0-9-]*$/),
  name: z.string().min(1),
  /** Used in titles and headings. */
  region: z.string().length(2),
  /** One-line positioning specific to this borough. */
  standfirst: z.string().min(1),
  /** Objective, sourced context. No market predictions, no lifestyle claims. */
  body: z.array(z.string().min(1)).min(1),
  /** Postal codes where a transaction is documented. */
  documentedPostalCodes: z.array(z.string().min(5)).default([]),
  /** Proof-story slugs that closed in this area. */
  proofSlugs: z.array(z.string().min(1)).default([]),
  /** Property slugs located in this area. */
  propertySlugs: z.array(z.string().min(1)).default([]),
  verification: verificationSchema,
});

export type Area = z.infer<typeof areaSchema>;

const records: Area[] = [
  {
    slug: "staten-island",
    name: "Staten Island",
    region: "NY",
    standfirst:
      "Two documented Staten Island closings, a seller rescue and a competitive buyer win, plus the film work.",
    body: [
      "Most of the transactions documented on this site closed on Staten Island. They are not the same kind of transaction, which is the point — one was a seller who had already been through two agents, the other was a buyer who nearly lost the property in a bidding war.",
      "Those two situations need opposite things. The seller needed someone who would stay in the process when it got difficult, including driving over to dig through twenty-year-old paperwork to find closing documents. The buyer needed someone who would hold a competing-offer situation together and then improve the mortgage terms on the way through.",
      "If you are selling here, the first conversation is about pricing, preparation, and what the property actually needs before it is seen. If you are buying here, the first conversation is about your range and how you want to handle competition, before you are standing in a house you have already decided you want.",
    ],
    documentedPostalCodes: ["10306", "10307"],
    proofSlugs: ["brehaut-seller-rescue", "meisner-buyer-win"],
    propertySlugs: [
      "181-meisner-ave-staten-island",
      "327-brehaut-ave-staten-island",
      "1-mcclean-avenue",
    ],
    verification: "awaiting-approval",
  },
  {
    slug: "brooklyn",
    name: "Brooklyn",
    region: "NY",
    standfirst:
      "A three-family sale at 98% of list inside the first week, with the next purchase already secured.",
    body: [
      "The documented Brooklyn transaction is a three-family property that sold with an accepted offer at 98% of list price within the first week on market.",
      "The part that mattered more to the client was the sequencing. An accepted offer on their next house was secured before their current property was listed — so they were never caught between two closings. That second house was not even Sharif's deal.",
      "Multi-family and sell-and-buy transactions have more moving parts than a single sale. The coordination is the work: what gets signed first, what is contingent on what, and who is talking to the other side while it happens.",
    ],
    documentedPostalCodes: ["11204"],
    proofSlugs: ["brooklyn-sell-and-buy"],
    propertySlugs: ["2031-60th-st-brooklyn"],
    verification: "awaiting-approval",
  },
];

export const areas = parseCollection(areaSchema, "content/areas.ts", records);

export const areasBySlug = new Map(areas.map((area) => [area.slug, area]));

export function getArea(slug: string): Area | undefined {
  return areasBySlug.get(slug);
}
