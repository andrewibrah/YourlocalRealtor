import { z } from "zod";

/**
 * Content schemas.
 *
 * These run at module-evaluation time, which for a static export means they run
 * during `next build`. Invalid content fails the build rather than shipping a
 * broken or unverified claim. That is deliberate: per
 * `sharif-site-definition/AGENTS.md`, unresolved verification state is a
 * blocker, not a warning.
 */

/* -------------------------------------------------------------------------- */
/* Verification                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Verification state travels with every piece of content that makes a factual
 * claim. `verified` is the only value that may be presented to the public as
 * settled fact; everything else must be surfaced as provisional in the UI and
 * listed in `docs/content-verification.md`.
 */
export const verificationSchema = z.enum([
  /** Approved by the business owner. Safe to state plainly. */
  "verified",
  /** Supplied by the client but not yet confirmed against the original master. */
  "awaiting-master",
  /** Read off a public index (post title/caption); media itself unconfirmed. */
  "public-index-only",
  /** Transcribed from a client-supplied screenshot; needs written approval. */
  "awaiting-approval",
]);

export type Verification = z.infer<typeof verificationSchema>;

/** True when a claim may be rendered without a provisional marker. */
export function isPublishable(verification: Verification): boolean {
  return verification === "verified";
}

/* -------------------------------------------------------------------------- */
/* Video                                                                      */
/* -------------------------------------------------------------------------- */

export const videoCategorySchema = z.enum([
  "budget",
  "buyer-education",
  "seller-education",
  "first-time-buyer",
  "property-tour",
]);

export type VideoCategory = z.infer<typeof videoCategorySchema>;

/**
 * A released media package. Absent until a rights-cleared export, poster,
 * caption file, and transcript all exist — see
 * `sharif-site-definition/docs/03-video-content-system.md`.
 *
 * The schema requires captions and a transcript alongside the sources, so it is
 * structurally impossible to publish a speaking video without them.
 */
export const videoMediaSchema = z.object({
  /**
   * Poster frame. AVIF with a JPEG fallback — see the note in
   * `scripts/encode-media.sh` on why not WebP.
   */
  posterAvif: z.string().min(1),
  poster: z.string().min(1),
  /** Playable derivatives, largest last. */
  sources: z
    .array(
      z.object({
        src: z.string().min(1),
        type: z.enum(["video/mp4", "video/webm"]),
      }),
    )
    .min(1),
  /** WebVTT captions. Mandatory for speech. */
  captions: z.string().min(1),
  /** Verbatim transcript, rendered as readable HTML-safe text. */
  transcript: z.array(z.string().min(1)).min(1),
  durationSeconds: z.number().positive(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export type VideoMedia = z.infer<typeof videoMediaSchema>;

export const videoSchema = z.object({
  /** URL segment. Also the analytics content ID. */
  slug: z
    .string()
    .regex(/^[a-z0-9][a-z0-9-]*$/, "slug must be lowercase kebab-case"),
  /**
   * Instagram shortcode and post URL, used for provenance/attribution only —
   * never to embed, scrape, or hotlink.
   *
   * Nullable because not every supplied master corresponds to a post anyone has
   * identified. An empty string would have been the lazy option; null forces
   * the UI to decide what to do when there is no source to credit.
   */
  instagramId: z.string().min(1).nullable(),
  sourceUrl: z.url().nullable(),
  category: videoCategorySchema,
  series: z.string().nullable(),
  episode: z.number().int().positive().nullable(),
  /**
   * The topic. Doc 03 states user-supplied purposes and link order are
   * canonical for the pack, so the subject is safe to state. Exact spoken
   * wording, hooks, and durations are not, and must never be invented.
   */
  topic: z.string().min(1),
  /**
   * What the viewer gets. Written at topic level only — never a paraphrase of
   * dialogue that has not been transcribed.
   */
  outcome: z.string().min(1),
  cta: z.object({
    label: z.string().min(1),
    href: z.string().min(1),
  }),
  media: videoMediaSchema.nullable(),
  verification: verificationSchema,
});

export type Video = z.infer<typeof videoSchema>;

/* -------------------------------------------------------------------------- */
/* Proof story                                                                */
/* -------------------------------------------------------------------------- */

export const proofStorySchema = z.object({
  slug: z.string().regex(/^[a-z0-9][a-z0-9-]*$/),
  headline: z.string().min(1),
  transactionType: z.enum(["buyer", "seller", "sell-and-buy"]),
  property: z.object({
    address: z.string().min(1),
    city: z.string().min(1),
    state: z.string().length(2),
    postalCode: z.string().min(5),
  }),
  outcome: z.object({
    label: z.string().min(1),
    amount: z.number().int().positive(),
    currency: z.literal("USD"),
    /** Only present where the pack supplies it. Never estimated. */
    acceptedOfferPercentOfList: z.number().int().min(1).max(200).optional(),
    acceptedOfferTiming: z.string().optional(),
  }),
  capabilities: z.array(z.string().min(1)).min(1),
  /** The situation the client was in. Drawn only from the supplied review. */
  situation: z.string().min(1),
  /** What Sharif did. Drawn only from the supplied review. */
  actions: z.array(z.string().min(1)).min(1),
  /**
   * The client's own words. Verbatim, with elision marked by an ellipsis.
   * Shortening for readability is permitted; altering the claim is not
   * (`docs/09` §Media, testimonial, and marketing rights).
   */
  excerpt: z.string().min(1),
  /**
   * Per-category ratings shown in the source review. Recorded because they are
   * legible in the screenshot, so rendering them as text removes one more
   * reason to make a visitor read an image.
   *
   * These are deliberately NOT emitted as `aggregateRating` structured data:
   * three owner-selected screenshots are not an aggregate of all reviews, and
   * marking them up as one would misrepresent them to search engines.
   */
  ratings: z
    .array(
      z.object({
        label: z.string().min(1),
        stars: z.number().int().min(1).max(5),
        outOf: z.literal(5),
      }),
    )
    .default([]),
  /** Path under `public/` to the original review screenshot. */
  sourceAsset: z.string().min(1),
  sourceAssetWidth: z.number().int().positive(),
  sourceAssetHeight: z.number().int().positive(),
  sourceNote: z.string().min(1),
  verification: verificationSchema,
});

export type ProofStory = z.infer<typeof proofStorySchema>;

/* -------------------------------------------------------------------------- */
/* Property                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Status is deliberately restricted. There is no "active" or "for sale" value,
 * because this release is not a licensed IDX product and must not imply an
 * active listing (`docs/09` §Real-estate advertising and fair housing).
 */
export const propertyStatusSchema = z.enum([
  /** Closed transaction, presented as documented past work. */
  "sold",
  /**
   * Marketed by Sharif at the stated price at the time the film was published.
   *
   * Deliberately not called "active" or "for sale". This is a record of what
   * was marketed, not a live availability feed — the site has no connection to
   * an MLS and cannot know whether a property is still on the market. Every
   * surface that renders this status also renders the instruction to confirm
   * current availability, which is enforced by the component rather than left
   * to whoever writes the next page.
   */
  "listed",
  /** A film exists; listing status is not asserted in either direction. */
  "marketing-film",
]);

export const propertySchema = z.object({
  slug: z.string().regex(/^[a-z0-9][a-z0-9-]*$/),
  /** Null where no address has been verified. Never guessed. */
  address: z.string().min(1).nullable(),
  locality: z.string().min(1).nullable(),
  region: z.string().length(2).nullable(),
  title: z.string().min(1),
  status: propertyStatusSchema,
  /**
   * The date the status and price were true. `docs/09` requires an "as of" date
   * beside every price, status, and market claim.
   *
   * Null is permitted and is *not* a shortcut: the supplied review screenshots
   * carry no closing dates, so the date is genuinely unknown. Components render
   * an explicit "date pending confirmation" note rather than omitting the
   * qualifier or inventing one.
   */
  statusAsOf: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .nullable(),
  price: z
    .object({
      label: z.string().min(1),
      amount: z.number().int().positive(),
      currency: z.literal("USD"),
    })
    .nullable(),
  /** Objective, sourced facts only. No subjective neighbourhood language. */
  facts: z
    .array(z.object({ label: z.string().min(1), value: z.string().min(1) }))
    .default([]),
  description: z.string().min(1),
  /** Slug of the related video record, when one exists. */
  videoSlug: z.string().nullable(),
  /** Slug of the related proof story, when one exists. */
  proofSlug: z.string().nullable(),
  verification: verificationSchema,
});

export type Property = z.infer<typeof propertySchema>;

/* -------------------------------------------------------------------------- */
/* Editorial content                                                          */
/* -------------------------------------------------------------------------- */

export const faqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.array(z.string().min(1)).min(1),
});

export type FaqItem = z.infer<typeof faqItemSchema>;

export const processStepSchema = z.object({
  index: z.number().int().positive(),
  title: z.string().min(1),
  body: z.string().min(1),
});

export type ProcessStep = z.infer<typeof processStepSchema>;

/* -------------------------------------------------------------------------- */
/* Parse helpers                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Parses a content collection and throws a readable, sourced error on failure.
 * `label` names the file so a build failure points at the content, not at Zod.
 */
export function parseCollection<T extends z.ZodTypeAny>(
  schema: T,
  label: string,
  value: unknown,
): z.infer<T>[] {
  const result = z.array(schema).safeParse(value);

  if (!result.success) {
    throw new Error(
      `Invalid content in ${label}:\n${z.prettifyError(result.error)}`,
    );
  }

  return result.data;
}
