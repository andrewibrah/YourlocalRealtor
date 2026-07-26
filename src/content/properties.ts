import { parseCollection, propertySchema, type Property } from "@/lib/schema";

/**
 * Curated property records.
 *
 * This is not an IDX or MLS product and must never read like one
 * (`docs/09` — "Do not imply an active listing, licensed IDX service,
 * appraisal, guaranteed result…"). There is deliberately no `active` status in
 * the schema.
 *
 * Two kinds of record exist:
 *
 *   `sold`            — a closed transaction, documented past work, evidenced
 *                       by a client review.
 *   `marketing-film`  — a property film exists. Listing status is not asserted
 *                       in any direction.
 *
 * Only properties with something verified to say get a detail page. The other
 * three property films live in the video library instead of becoming thin
 * near-duplicate pages.
 */
const records: Property[] = [
  /* Marketed listings ------------------------------------------------------
   *
   * Facts below are taken verbatim from the listing captions Sharif published
   * with each film (`sharif-site-definition/assets/videos/videos.md`).
   *
   * Three things in those captions are deliberately NOT reproduced:
   *
   *   - "one of Staten Island's most desirable neighborhoods" and "quiet,
   *     tree-lined street" — subjective neighbourhood characterisation, barred
   *     by `docs/09` and by the fair-housing rules this site follows.
   *   - "unlock approximately 500,000 in potential equity" — a speculative
   *     return claim. `docs/09` forbids implying an investment return or a
   *     valuation.
   *   - proximity-to-schools language, which invites exactly the inference
   *     fair-housing rules exist to prevent.
   *
   * What remains is measurable: address, price as marketed, square footage,
   * lot size, room counts, and construction facts.
   */
  {
    slug: "14-ottavio-promenade",
    address: "14 Ottavio Promenade",
    locality: "Staten Island",
    region: "NY",
    title: "14 Ottavio Promenade, Tottenville",
    status: "listed",
    statusAsOf: null,
    price: { label: "Listed at", amount: 3098888, currency: "USD" },
    facts: [
      { label: "Interior", value: "10,000 sq ft" },
      { label: "Lot", value: "Almost half an acre" },
      { label: "Setting", value: "Waterfront" },
      { label: "Neighbourhood", value: "Tottenville" },
      { label: "Postal code", value: "10307" },
    ],
    description:
      "A 10,000 square-foot waterfront property on almost half an acre in Tottenville, marketed by Sharif at $3,098,888.",
    videoSlug: "tour-14-ottavio-promenade",
    proofSlug: null,
    verification: "awaiting-approval",
  },
  {
    slug: "10-seidman-ave",
    address: "10 Seidman Ave",
    locality: "Staten Island",
    region: "NY",
    title: "10 Seidman Avenue, Annadale",
    status: "listed",
    statusAsOf: null,
    price: { label: "Listed at", amount: 1299999, currency: "USD" },
    facts: [
      { label: "Interior", value: "4,200 sq ft" },
      { label: "Lot", value: "10,000 sq ft" },
      { label: "Bedrooms", value: "4" },
      { label: "Bathrooms", value: "3" },
      { label: "Basement", value: "Full, finished" },
      { label: "Attic", value: "Full, finished" },
      { label: "Neighbourhood", value: "South East Annadale" },
    ],
    description:
      "A 4,200 square-foot house on an oversized 10,000 square-foot lot in South East Annadale, with four bedrooms, three bathrooms, and both a finished basement and a finished attic.",
    videoSlug: "tour-10-seidman-ave",
    proofSlug: null,
    verification: "awaiting-approval",
  },
  {
    slug: "1-mcclean-avenue",
    address: "1 McClean Avenue",
    locality: "Staten Island",
    region: "NY",
    title: "1 McClean Avenue, Fort Wadsworth",
    status: "listed",
    statusAsOf: null,
    price: { label: "Listed at", amount: 1299998, currency: "USD" },
    facts: [
      { label: "Style", value: "Custom-built Side Hall Colonial" },
      { label: "Bedrooms", value: "4" },
      { label: "Attic", value: "Finished" },
      { label: "Basement", value: "Fully finished, private side entrance" },
      { label: "Exterior", value: "Backyard with new pavers" },
      { label: "Location", value: "At the entrance to Fort Wadsworth" },
    ],
    description:
      "A renovated custom-built Side Hall Colonial at the entrance to Fort Wadsworth, with four bedrooms, a finished attic, and a fully finished basement with its own side entrance.",
    videoSlug: "tour-1-mcclean-avenue",
    proofSlug: null,
    verification: "public-index-only",
  },

  /* Closed transactions ---------------------------------------------------- */
  {
    slug: "2031-60th-st-brooklyn",
    address: "2031 60th St",
    locality: "Brooklyn",
    region: "NY",
    title: "2031 60th St, Brooklyn",
    status: "sold",
    statusAsOf: null,
    price: { label: "Sold for", amount: 1960000, currency: "USD" },
    facts: [
      // Every fact here is stated by the client in their own review.
      { label: "Property type", value: "Three-family" },
      { label: "Accepted offer", value: "98% of list price" },
      { label: "Time to accepted offer", value: "First week on market" },
      { label: "Postal code", value: "11204" },
    ],
    description:
      "A three-family Brooklyn property sold with an accepted offer at 98% of list price inside the first week on market — while an accepted offer was already secured on the owner's next home.",
    videoSlug: null,
    proofSlug: "brooklyn-sell-and-buy",
    verification: "awaiting-approval",
  },
  {
    slug: "181-meisner-ave-staten-island",
    address: "181 Meisner Ave",
    locality: "Staten Island",
    region: "NY",
    title: "181 Meisner Ave, Staten Island",
    status: "sold",
    statusAsOf: null,
    price: { label: "Sold for", amount: 1299999, currency: "USD" },
    facts: [
      // "Represented" is deliberately absent. The client review reads from the
      // buyer's side, while Sharif's own film describes relisting and selling
      // this property — which is the listing side. Both may be true, but the
      // transaction role is unresolved and is not asserted until it is
      // confirmed. Tracked in docs/content-verification.md.
      { label: "Competing offers", value: "Yes" },
      { label: "Offers received", value: "Over 10 within 30 days" },
      { label: "Sale price", value: "100% of list price" },
      { label: "Postal code", value: "10306" },
    ],
    description:
      "Two agents had already tried to sell this property. It was relisted at the same price, and drew more than ten offers inside thirty days.",
    videoSlug: null,
    proofSlug: "meisner-buyer-win",
    verification: "awaiting-approval",
  },
  {
    slug: "327-brehaut-ave-staten-island",
    address: "327 Brehaut Ave",
    locality: "Staten Island",
    region: "NY",
    title: "327 Brehaut Ave, Staten Island",
    status: "sold",
    statusAsOf: null,
    price: { label: "Sold for", amount: 960000, currency: "USD" },
    facts: [
      { label: "Represented", value: "Seller" },
      { label: "Prior agents", value: "Two, before this sale" },
      { label: "Postal code", value: "10307" },
    ],
    description:
      "A Staten Island seller had already been through two agents. This is the sale that closed, including a search through twenty-year-old paperwork to get it there.",
    videoSlug: null,
    proofSlug: "brehaut-seller-rescue",
    verification: "awaiting-approval",
  },
];

export const properties = parseCollection(
  propertySchema,
  "content/properties.ts",
  records,
);

export const propertiesBySlug = new Map(
  properties.map((property) => [property.slug, property]),
);

export function getProperty(slug: string): Property | undefined {
  return propertiesBySlug.get(slug);
}

export const soldProperties = properties.filter(
  (property) => property.status === "sold",
);

export function propertiesInLocality(locality: string): Property[] {
  return properties.filter((property) => property.locality === locality);
}

export const PROPERTY_STATUS_LABELS: Record<Property["status"], string> = {
  sold: "Sold",
  listed: "Marketed by Sharif",
  "marketing-film": "Property film",
};

/**
 * The caveat that must accompany any marketed listing.
 *
 * Returned from the content layer rather than written into each page, so it is
 * impossible to render a price without it. This site has no MLS connection and
 * cannot know current availability; saying so plainly is the difference between
 * a record of past marketing and an implied active listing.
 */
export function availabilityCaveat(property: Property): string | null {
  if (property.status !== "listed") return null;
  return "Price and availability are as marketed at the time this film was published. This site is not a listing service and does not track current status — confirm both before relying on either.";
}

export const listedProperties = properties.filter(
  (property) => property.status === "listed",
);
