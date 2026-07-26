import { describe, expect, it } from "vitest";

import { areas } from "@/content/areas";
import {
  buyerFaq,
  buyerProcess,
  decisionRail,
  philosophy,
  sellerFaq,
  sellerProcess,
} from "@/content/editorial";
import { availabilityCaveat, properties } from "@/content/properties";
import { proofStories } from "@/content/proof";
import { videos } from "@/content/videos";

/**
 * Compliance regression tests.
 *
 * These are not tests of the framework — they are tests of the things that
 * would be expensive to get wrong: fair-housing language, unverified claims
 * presented as fact, and video records published without captions.
 *
 * They exist because all three are the kind of mistake that gets introduced
 * later, by someone editing copy in a hurry, long after the reasoning in the
 * requirements pack has been forgotten.
 */

/** Every user-visible string in the content layer, flattened. */
function allCopy(): { source: string; text: string }[] {
  const out: { source: string; text: string }[] = [];

  for (const video of videos) {
    out.push({ source: `video:${video.slug}`, text: video.topic });
    out.push({ source: `video:${video.slug}`, text: video.outcome });
  }

  for (const story of proofStories) {
    out.push({ source: `proof:${story.slug}`, text: story.headline });
    out.push({ source: `proof:${story.slug}`, text: story.situation });
    out.push({ source: `proof:${story.slug}`, text: story.actions.join(" ") });
    // `excerpt` is a verbatim client quotation and is deliberately excluded:
    // editing a client's own words to satisfy a lint rule would misrepresent
    // the review, which `docs/09` forbids outright.
  }

  for (const property of properties) {
    out.push({ source: `property:${property.slug}`, text: property.title });
    out.push({ source: `property:${property.slug}`, text: property.description });
    for (const fact of property.facts) {
      out.push({
        source: `property:${property.slug}`,
        text: `${fact.label} ${fact.value}`,
      });
    }
  }

  for (const area of areas) {
    out.push({ source: `area:${area.slug}`, text: area.standfirst });
    out.push({ source: `area:${area.slug}`, text: area.body.join(" ") });
  }

  for (const item of [...buyerFaq, ...sellerFaq]) {
    out.push({ source: "faq", text: item.question });
    out.push({ source: "faq", text: item.answer.join(" ") });
  }

  for (const step of [...buyerProcess, ...sellerProcess]) {
    out.push({ source: "process", text: `${step.title} ${step.body}` });
  }

  for (const item of philosophy) {
    out.push({ source: "philosophy", text: `${item.title} ${item.body}` });
  }

  for (const item of decisionRail) {
    out.push({ source: "decision-rail", text: `${item.label} ${item.body}` });
  }

  return out;
}

describe("fair housing", () => {
  /**
   * Subjective neighbourhood characterisation, per `docs/09`. These words
   * invite a reader to infer who belongs somewhere, which is how steering
   * happens through description rather than refusal.
   */
  const STEERING_TERMS = [
    "safe neighborhood",
    "safe neighbourhood",
    "safe area",
    "family-friendly",
    "family friendly",
    "perfect for families",
    "great for families",
    "good schools",
    "great schools",
    "best schools",
    "school district",
    "up-and-coming",
    "up and coming",
    "desirable area",
    "exclusive community",
    "prestigious",
    "quiet neighborhood",
    "quiet neighbourhood",
    "ideal for",
  ];

  it("uses no subjective neighbourhood or steering language", () => {
    const offenders = allCopy().flatMap(({ source, text }) => {
      const lower = text.toLowerCase();
      return STEERING_TERMS.filter((term) => lower.includes(term)).map(
        (term) => `${source}: "${term}"`,
      );
    });

    expect(offenders).toEqual([]);
  });

  it("makes no reference to protected classes in property or area copy", () => {
    const PROTECTED = [
      "christian",
      "muslim",
      "jewish",
      "catholic",
      "no kids",
      "no children",
      "adults only",
      "empty nester",
      "young professional",
    ];

    const offenders = allCopy().flatMap(({ source, text }) => {
      const lower = text.toLowerCase();
      return PROTECTED.filter((term) => lower.includes(term)).map(
        (term) => `${source}: "${term}"`,
      );
    });

    expect(offenders).toEqual([]);
  });
});

describe("advertising claims", () => {
  it("never implies a property is currently available", () => {
    // There is deliberately no "active" or "for sale" status in the schema.
    const statuses = new Set(properties.map((property) => property.status));
    for (const status of statuses) {
      expect(["sold", "listed", "marketing-film"]).toContain(status);
    }
  });

  it("attaches an availability caveat to every marketed listing", () => {
    for (const property of properties) {
      if (property.status === "listed") {
        expect(availabilityCaveat(property)).toBeTruthy();
      } else {
        expect(availabilityCaveat(property)).toBeNull();
      }
    }
  });

  it("never states a price without a label giving it scope", () => {
    for (const property of properties) {
      if (property.price) {
        expect(property.price.label.trim().length).toBeGreaterThan(0);
      }
    }

    for (const story of proofStories) {
      expect(story.outcome.label.trim().length).toBeGreaterThan(0);
    }
  });

  it("makes no guarantee, superlative, or ranking claim", () => {
    const FORBIDDEN = [
      "guarantee",
      "guaranteed",
      "#1",
      "number one",
      "best agent",
      "top agent",
      "always sells",
      "never loses",
    ];

    const offenders = allCopy().flatMap(({ source, text }) => {
      const lower = text.toLowerCase();
      return FORBIDDEN.filter((term) => lower.includes(term)).map(
        (term) => `${source}: "${term}"`,
      );
    });

    expect(offenders).toEqual([]);
  });
});

describe("verification state", () => {
  it("marks every unapproved claim as provisional rather than verified", () => {
    // Nothing has been approved by the business owner yet. If any record flips
    // to "verified", that must be a deliberate act accompanied by evidence in
    // docs/content-verification.md — not an accident.
    for (const story of proofStories) {
      expect(story.verification).not.toBe("verified");
    }
    for (const video of videos) {
      expect(video.verification).not.toBe("verified");
    }
  });

  it("never states a status date it does not have", () => {
    for (const property of properties) {
      // Null is allowed and handled in the UI. A malformed or invented date is
      // not: the schema only accepts ISO dates.
      if (property.statusAsOf !== null) {
        expect(property.statusAsOf).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    }
  });
});

describe("video publication rules", () => {
  it("cannot publish a playable video without captions and a transcript", () => {
    for (const video of videos) {
      if (video.media) {
        expect(video.media.captions.length).toBeGreaterThan(0);
        expect(video.media.transcript.length).toBeGreaterThan(0);
        expect(video.media.sources.length).toBeGreaterThan(0);
      }
    }
  });

  it("links to original posts rather than embedding or hotlinking them", () => {
    for (const video of videos) {
      if (video.sourceUrl) {
        expect(video.sourceUrl).toMatch(/^https:\/\/www\.instagram\.com\/reel\//);
      }
      // No media path may point at a third-party host.
      for (const source of video.media?.sources ?? []) {
        expect(source.src.startsWith("/")).toBe(true);
      }
    }
  });

  it("keeps the first-home series contiguous and in order", () => {
    const episodes = videos
      .filter((video) => video.series === "first-time-homebuyer")
      .map((video) => video.episode);

    expect(episodes.sort((a, b) => (a ?? 0) - (b ?? 0))).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("cross-references", () => {
  it("resolves every property → proof and property → video reference", () => {
    const proofSlugs = new Set(proofStories.map((story) => story.slug));
    const videoSlugs = new Set(videos.map((video) => video.slug));

    for (const property of properties) {
      if (property.proofSlug) expect(proofSlugs.has(property.proofSlug)).toBe(true);
      if (property.videoSlug) expect(videoSlugs.has(property.videoSlug)).toBe(true);
    }
  });

  it("resolves every area → proof and area → property reference", () => {
    const proofSlugs = new Set(proofStories.map((story) => story.slug));
    const propertySlugs = new Set(properties.map((property) => property.slug));

    for (const area of areas) {
      for (const slug of area.proofSlugs) expect(proofSlugs.has(slug)).toBe(true);
      for (const slug of area.propertySlugs) {
        expect(propertySlugs.has(slug)).toBe(true);
      }
    }
  });

  it("keeps every area page non-swappable", () => {
    // The doorway-page test: an area page must be anchored to evidence that is
    // unique to it. If two areas ever share their whole proof set, one of them
    // has become a template.
    for (const area of areas) {
      expect(area.proofSlugs.length).toBeGreaterThan(0);
      const others = areas.filter((other) => other.slug !== area.slug);
      for (const other of others) {
        const overlap = area.proofSlugs.filter((slug) =>
          other.proofSlugs.includes(slug),
        );
        expect(overlap).toEqual([]);
      }
    }
  });
});
