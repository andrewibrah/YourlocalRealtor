import manifest from "../../generated/media-manifest.json";
import {
  parseCollection,
  videoSchema,
  type Video,
  type VideoMedia,
} from "@/lib/schema";

/**
 * Video registry.
 *
 * Masters were supplied by the content owner and live in
 * `sharif-site-definition/assets/videos/`. They are never modified. The web
 * derivatives, posters, and caption files shipped from `public/media/` are
 * produced by `scripts/encode-media.sh` and `scripts/transcribe.py`, and every
 * one of them is traced back to its master by SHA-256 in
 * `generated/media-manifest.json`.
 *
 * Dimensions, durations, and file paths are read from that manifest rather than
 * typed here, because hand-maintained media metadata drifts out of sync with
 * the files the moment anything is re-encoded.
 *
 * Editorial discipline is unchanged from before the masters arrived: `topic`
 * and `outcome` describe what a film covers. Neither quotes dialogue. The
 * spoken content now lives in the transcript, where it belongs, sourced from
 * the audio rather than from a post caption.
 */

type ManifestEntry = {
  durationSeconds: number;
  width: number;
  height: number;
  poster: string | null;
  posterAvif: string | null;
  captions: string | null;
  transcript: string[];
  captionsRequired: boolean;
};

const media = manifest as Record<string, ManifestEntry>;

/**
 * Builds a media package, or returns null when the film cannot be published
 * accessibly yet.
 *
 * The null path is the important one. A film with an audio track and no caption
 * file must not be published — WCAG 2.2 SC 1.2.2 and `docs/03` both make
 * captions a gate, not a nice-to-have. Returning null here means the component
 * layer renders the Film Slate instead, and no page has to know about it.
 */
function mediaFor(slug: string): VideoMedia | null {
  const entry = media[slug];
  if (!entry) return null;

  if (!entry.poster || !entry.posterAvif) return null;
  if (entry.captionsRequired && !entry.captions) return null;
  if (entry.transcript.length === 0) return null;

  return {
    posterAvif: entry.posterAvif,
    poster: entry.poster,
    sources: [{ src: `/media/${slug}.mp4`, type: "video/mp4" }],
    captions: entry.captions!,
    transcript: entry.transcript,
    durationSeconds: entry.durationSeconds,
    width: entry.width,
    height: entry.height,
  };
}

const records: Video[] = [
  /* Education ------------------------------------------------------------- */
  {
    slug: "why-me",
    instagramId: "DACAYKGyaHg",
    sourceUrl: "https://www.instagram.com/reel/DACAYKGyaHg/",
    category: "seller-education",
    series: null,
    episode: null,
    topic: "What happens when you hire the wrong agent",
    outcome:
      "Two Staten Island homes that sat with other agents, walked through end to end — what changed, and what it changed the outcome by.",
    cta: { label: "Get a seller plan", href: "/sell/" },
    media: mediaFor("why-me"),
    verification: "awaiting-approval",
  },
  {
    slug: "budget-500k",
    instagramId: "DDXoM1aS-mn",
    sourceUrl: "https://www.instagram.com/reel/DDXoM1aS-mn/",
    category: "budget",
    series: null,
    episode: null,
    topic: "What a $500,000 budget buys in Staten Island",
    outcome:
      "What the number actually produces on the North Shore, Mid Island, and South Shore — by property type and condition, not by calculator.",
    cta: { label: "Build my buying range", href: "/buy/budget/" },
    media: mediaFor("budget-500k"),
    verification: "awaiting-approval",
  },
  {
    slug: "buy-vs-rent",
    instagramId: "DDf1RVvOpQS",
    sourceUrl: "https://www.instagram.com/reel/DDf1RVvOpQS/",
    category: "buyer-education",
    series: null,
    episode: null,
    topic: "Buying versus renting",
    outcome:
      "Frames the decision around timing, cash, monthly cost, and flexibility instead of a slogan.",
    cta: { label: "Compare my situation", href: "/buy/buy-vs-rent/" },
    media: mediaFor("buy-vs-rent"),
    verification: "awaiting-approval",
  },
  {
    slug: "seller-questions",
    instagramId: "DDLVnpxuuJH",
    sourceUrl: "https://www.instagram.com/reel/DDLVnpxuuJH/",
    category: "seller-education",
    series: null,
    episode: null,
    topic: "Questions sellers ask",
    outcome:
      "The questions worth asking before you sign a listing agreement, not after.",
    cta: { label: "Get a seller plan", href: "/sell/" },
    // No master supplied for this reel yet — renders as a slate.
    media: mediaFor("seller-questions"),
    verification: "public-index-only",
  },

  /* First-time buyer series ------------------------------------------------ */
  {
    slug: "first-home-01",
    instagramId: "DBKJwTvSq9N",
    sourceUrl: "https://www.instagram.com/reel/DBKJwTvSq9N/",
    category: "first-time-buyer",
    series: "first-time-homebuyer",
    episode: 1,
    topic: "First-time homebuyer — part one",
    outcome: "Where the sequence starts.",
    cta: { label: "Continue to part two", href: "/videos/first-home-02/" },
    media: mediaFor("first-home-01"),
    verification: "awaiting-approval",
  },
  {
    slug: "first-home-02",
    instagramId: "DBPQjg1SV8K",
    sourceUrl: "https://www.instagram.com/reel/DBPQjg1SV8K/",
    category: "first-time-buyer",
    series: "first-time-homebuyer",
    episode: 2,
    topic: "First-time homebuyer — part two",
    outcome: "The second move in the sequence.",
    cta: { label: "Continue to part three", href: "/videos/first-home-03/" },
    media: mediaFor("first-home-02"),
    verification: "awaiting-approval",
  },
  {
    slug: "first-home-03",
    instagramId: "DBed1EYS4NY",
    sourceUrl: "https://www.instagram.com/reel/DBed1EYS4NY/",
    category: "first-time-buyer",
    series: "first-time-homebuyer",
    episode: 3,
    topic: "First-time homebuyer — part three",
    outcome: "The third move in the sequence.",
    cta: { label: "Continue to part four", href: "/videos/first-home-04/" },
    media: mediaFor("first-home-03"),
    verification: "awaiting-approval",
  },
  {
    slug: "first-home-04",
    instagramId: "DBwbtSAOtJq",
    sourceUrl: "https://www.instagram.com/reel/DBwbtSAOtJq/",
    category: "first-time-buyer",
    series: "first-time-homebuyer",
    episode: 4,
    topic: "First-time homebuyer — part four",
    outcome: "The fourth move in the sequence.",
    cta: { label: "Continue to part five", href: "/videos/first-home-05/" },
    media: mediaFor("first-home-04"),
    verification: "awaiting-approval",
  },
  {
    slug: "first-home-05",
    instagramId: "DCQK966oY-E",
    sourceUrl: "https://www.instagram.com/reel/DCQK966oY-E/",
    category: "first-time-buyer",
    series: "first-time-homebuyer",
    episode: 5,
    topic: "First-time homebuyer — part five",
    outcome: "The last move before you are working with a real plan.",
    cta: { label: "Plan my move", href: "/contact/" },
    media: mediaFor("first-home-05"),
    verification: "awaiting-approval",
  },

  /* Property films --------------------------------------------------------- */
  {
    slug: "tour-14-ottavio-promenade",
    instagramId: "DEkaIGEuo80",
    sourceUrl: "https://www.instagram.com/reel/DEkaIGEuo80/",
    category: "property-tour",
    series: "property-tours",
    episode: null,
    topic: "14 Ottavio Promenade, Tottenville",
    outcome:
      "A waterfront property film — how a listing at this level gets presented.",
    cta: {
      label: "About this property",
      href: "/properties/14-ottavio-promenade/",
    },
    media: mediaFor("tour-14-ottavio-promenade"),
    verification: "awaiting-approval",
  },
  {
    slug: "tour-10-seidman-ave",
    instagramId: "DbES_-Shf9Z",
    sourceUrl: "https://www.instagram.com/reel/DbES_-Shf9Z/",
    category: "property-tour",
    series: "property-tours",
    episode: null,
    topic: "10 Seidman Avenue, Annadale",
    outcome:
      "A 4,200 square-foot house on a 10,000 square-foot lot, filmed room by room.",
    cta: { label: "About this property", href: "/properties/10-seidman-ave/" },
    media: mediaFor("tour-10-seidman-ave"),
    verification: "awaiting-approval",
  },
  {
    slug: "tour-1-mcclean-avenue",
    instagramId: "DZV7SoHhOTt",
    sourceUrl: "https://www.instagram.com/reel/DZV7SoHhOTt/",
    category: "property-tour",
    series: "property-tours",
    episode: null,
    topic: "1 McClean Avenue, Fort Wadsworth",
    outcome:
      "A renovated Side Hall Colonial at the entrance to Fort Wadsworth.",
    cta: { label: "About this property", href: "/properties/1-mcclean-avenue/" },
    // Master for this reel was not among the supplied files.
    media: mediaFor("tour-1-mcclean-avenue"),
    verification: "public-index-only",
  },
  {
    slug: "brand-film",
    // Supplied as a standalone edit; no source post was identified for it.
    instagramId: null,
    sourceUrl: null,
    category: "property-tour",
    series: null,
    episode: null,
    topic: "The reel",
    outcome: "The edit, without a property attached to it.",
    cta: { label: "Plan my move", href: "/contact/" },
    media: mediaFor("brand-film"),
    verification: "awaiting-approval",
  },
];

export const videos = parseCollection(videoSchema, "content/videos.ts", records);

export const videosBySlug = new Map(videos.map((video) => [video.slug, video]));

export function getVideo(slug: string): Video | undefined {
  return videosBySlug.get(slug);
}

/** The five-part sequence, always in episode order. */
export const buyerSeries = videos
  .filter((video) => video.series === "first-time-homebuyer")
  .sort((a, b) => (a.episode ?? 0) - (b.episode ?? 0));

export const propertyFilms = videos.filter(
  (video) => video.series === "property-tours",
);

/** The muted, silent hero derivative. Not a library entry. */
export const heroLoop = (() => {
  const entry = media["hero-loop"];
  if (!entry?.poster || !entry.posterAvif) return null;

  return {
    posterAvif: entry.posterAvif,
    poster: entry.poster,
    src: "/media/hero-loop.mp4",
    width: entry.width,
    height: entry.height,
    durationSeconds: entry.durationSeconds,
  };
})();

/** True when at least one video can actually be played. Drives empty states. */
export const anyVideoReleased = videos.some((video) => video.media !== null);
