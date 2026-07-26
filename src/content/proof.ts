import { parseCollection, proofStorySchema, type ProofStory } from "@/lib/schema";

/**
 * Proof stories.
 *
 * Source: the three client review screenshots supplied in
 * `sharif-site-definition/assets/reviews/`, read directly rather than taken
 * second-hand from `data/testimonials.json` — the JSON summaries paraphrase the
 * reviews, and `docs/09` requires that shortening never alter the claim. Every
 * `excerpt` below is verbatim from the screenshot, with elision marked.
 *
 * `situation` and `actions` restate only what the client themselves wrote. No
 * inference has been added about market conditions, strategy, commission,
 * timelines, or Sharif's side of the transaction.
 *
 * All three remain `awaiting-approval`: the reviews are published on Sharif's
 * agent profile, but written permission to reuse them in marketing has not been
 * recorded, and the property photographs inside the screenshots carry a
 * Multiple Listing Service attribution. See `docs/content-verification.md`.
 */
const records: ProofStory[] = [
  {
    slug: "brehaut-seller-rescue",
    headline: "Two agents had already failed. The third sold it.",
    transactionType: "seller",
    property: {
      address: "327 Brehaut Ave",
      city: "Staten Island",
      state: "NY",
      postalCode: "10307",
    },
    outcome: { label: "Sold for", amount: 960000, currency: "USD" },
    capabilities: [
      "Patience",
      "Local knowledge",
      "Process support",
      "Negotiation",
    ],
    situation:
      "The seller had already been through two separate agents before reaching Sharif, and described both experiences as disasters.",
    actions: [
      "Sold the home quickly.",
      "Stayed visibly on the seller's side when things went wrong rather than going quiet.",
      "Drove over in person and went through boxes of paperwork to find closing documents from a closing twenty years earlier.",
    ],
    excerpt:
      "First, let me start off by saying I went through two separate agents, both which were one disaster after another! before finding Sharif… He sold my home quickly. if something wasn't going right he never made you feel like he wasn't on your side! I recall a time we were looking for important documents from a closing 20 years ago — He came right over and helped he looked through boxes of papers just to ensure that we had the right documents.",
    ratings: [
      { label: "Local knowledge", stars: 5, outOf: 5 },
      { label: "Process expertise", stars: 5, outOf: 5 },
      { label: "Responsiveness", stars: 4, outOf: 5 },
      { label: "Negotiation skills", stars: 5, outOf: 5 },
    ],
    sourceAsset: "/reviews/327-brehaut-ave-960k.jpg",
    sourceAssetWidth: 908,
    sourceAssetHeight: 1100,
    sourceNote:
      "Client review published on Sharif's agent review profile (shfkader123). The property photograph in the screenshot is credited to a Multiple Listing Service and is reproduced here only as part of the unaltered source image.",
    verification: "awaiting-approval",
  },
  {
    slug: "meisner-buyer-win",
    headline: "Nearly lost in a bidding war. Won anyway.",
    transactionType: "buyer",
    property: {
      address: "181 Meisner Ave",
      city: "Staten Island",
      state: "NY",
      postalCode: "10306",
    },
    outcome: { label: "Sold for", amount: 1299999, currency: "USD" },
    capabilities: [
      "Bidding strategy",
      "Mortgage support",
      "Guidance",
      "Client care",
    ],
    situation:
      "The buyer had their heart set on a property and came close to losing it in a bidding war.",
    actions: [
      "Kept the deal alive through the competing-offer stage.",
      "Worked the financing side so the buyer secured the best terms available to them on their mortgage.",
      "Answered questions and worries throughout rather than only at the decision points.",
    ],
    excerpt:
      "There was a moment when I nearly lost the property I had my heart set on in a bidding war but Sharif fought tirelessly to make sure I came out on top. He also went above and beyond to ensure I secured the best possible terms on my mortgage which made all the difference… If a had to choose a realtor again I would pick Sharif every single time without hesitation.",
    ratings: [
      { label: "Local knowledge", stars: 5, outOf: 5 },
      { label: "Process expertise", stars: 5, outOf: 5 },
      { label: "Responsiveness", stars: 5, outOf: 5 },
      { label: "Negotiation skills", stars: 5, outOf: 5 },
    ],
    sourceAsset: "/reviews/181-meisner-ave-1299999.jpg",
    sourceAssetWidth: 858,
    sourceAssetHeight: 1100,
    sourceNote:
      "Client review published on Sharif's agent review profile (shfkader123). The property photograph in the screenshot is credited to a Multiple Listing Service and is reproduced here only as part of the unaltered source image.",
    verification: "awaiting-approval",
  },
  {
    slug: "brooklyn-sell-and-buy",
    headline: "Accepted offer on the next house before this one was listed.",
    transactionType: "sell-and-buy",
    property: {
      address: "2031 60th St",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11204",
    },
    outcome: {
      label: "Sold for",
      amount: 1960000,
      currency: "USD",
      acceptedOfferPercentOfList: 98,
      acceptedOfferTiming: "Within the first week on market",
    },
    capabilities: [
      "Seller strategy",
      "Network",
      "Communication",
      "Transaction coordination",
    ],
    situation:
      "A three-family Brooklyn property owner needed to sell and buy at the same time, without being left between two closings.",
    actions: [
      "Took an accepted offer at 98% of list price within the first week on market.",
      "Used his network to secure an accepted offer on the client's next house before the current property was even listed.",
      "Carried the purchase side even though the next house was not his deal.",
    ],
    excerpt:
      "He sold my three-family property in Brooklyn with an accepted offer at 98% of the list price, within the first week on the market! … Using his network and exceptional communication skills, Sharif managed to secure an accepted offer on the next house I wanted to buy, even before listing my current property making the process stress-free. The house I was buying next wasn't even his deal, but still made sure I secured my dream home.",
    ratings: [
      { label: "Local knowledge", stars: 5, outOf: 5 },
      { label: "Process expertise", stars: 5, outOf: 5 },
      { label: "Responsiveness", stars: 5, outOf: 5 },
      { label: "Negotiation skills", stars: 5, outOf: 5 },
    ],
    sourceAsset: "/reviews/2031-60th-st-1960000.jpg",
    sourceAssetWidth: 939,
    sourceAssetHeight: 1100,
    sourceNote:
      "Client review published on Sharif's agent review profile (shfkader123). The property photograph in the screenshot is credited to a Multiple Listing Service and is reproduced here only as part of the unaltered source image.",
    verification: "awaiting-approval",
  },
];

export const proofStories = parseCollection(
  proofStorySchema,
  "content/proof.ts",
  records,
);

export const proofBySlug = new Map(
  proofStories.map((story) => [story.slug, story]),
);

export function getProofStory(slug: string): ProofStory | undefined {
  return proofBySlug.get(slug);
}

export function proofStoriesFor(
  type: ProofStory["transactionType"] | "seller-side",
): ProofStory[] {
  if (type === "seller-side") {
    return proofStories.filter(
      (story) =>
        story.transactionType === "seller" ||
        story.transactionType === "sell-and-buy",
    );
  }

  return proofStories.filter((story) => story.transactionType === type);
}

export function proofStoriesInCity(city: string): ProofStory[] {
  return proofStories.filter((story) => story.property.city === city);
}

