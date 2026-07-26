import { describe, expect, it } from "vitest";

import {
  breadcrumbSchema,
  personSchema,
  realEstateAgentSchema,
} from "@/lib/seo";
import {
  brokerage,
  mailtoHref,
  schedulingHref,
  siteConfig,
  smsHref,
  starterMessage,
  telHref,
} from "@/lib/site-config";

/**
 * Contact-safety and structured-data tests.
 *
 * The contact tests guard the "zero data collection" guarantee and the
 * placeholder-detection logic — the thing standing between the shipped site and
 * a live `tel:+10000000000` link.
 *
 * The structured-data tests guard against the most consequential SEO mistake
 * available here: asserting something to a search engine that the site cannot
 * substantiate.
 */

describe("contact safety", () => {
  it("does not produce protocol links from placeholder destinations", () => {
    // With .env.example values (+10000000000 / example.invalid) every channel
    // must resolve to pending, not to a dead link.
    if (siteConfig.contact.phone.status === "pending") {
      expect(telHref).toBeNull();
      expect(smsHref).toBeNull();
    }
    if (siteConfig.contact.email.status === "pending") {
      expect(mailtoHref).toBeNull();
    }
    if (siteConfig.contact.scheduling.status === "pending") {
      expect(schedulingHref).toBeNull();
    }
  });

  it("only ever emits an https scheduling link", () => {
    if (schedulingHref) {
      expect(schedulingHref.startsWith("https://")).toBe(true);
    }
  });

  it("puts no personal or sensitive data in the starter message", () => {
    const SENSITIVE = [
      "ssn",
      "social security",
      "date of birth",
      "budget",
      "salary",
      "income",
      "account number",
      "routing",
      "credit score",
    ];

    const lower = starterMessage.toLowerCase();
    for (const term of SENSITIVE) {
      expect(lower).not.toContain(term);
    }
  });

  it("never fabricates brokerage identification", () => {
    // Every field must be either a real approved value or explicitly null.
    // An empty string or a placeholder would render as a real claim.
    for (const [key, value] of Object.entries(brokerage)) {
      if (value !== null) {
        expect(typeof value, `brokerage.${key}`).toBe("string");
        expect((value as string).trim().length, `brokerage.${key}`).toBeGreaterThan(0);
      }
    }
  });
});

describe("structured data", () => {
  const agent = realEstateAgentSchema() as Record<string, unknown>;

  it("uses RealEstateAgent, the only correct type for an agent or brokerage", () => {
    expect(agent["@type"]).toBe("RealEstateAgent");
  });

  it("never emits an aggregateRating", () => {
    // Three owner-selected review screenshots are not an aggregate of all
    // reviews. Marking them up as one misrepresents them to search engines and
    // breaches Google's review-snippet policy for self-serving reviews.
    expect(agent.aggregateRating).toBeUndefined();
    expect(agent.review).toBeUndefined();
  });

  it("omits address and geo entirely rather than inventing them", () => {
    // Modelled as a service-area business until the brokerage office address is
    // approved. `areaServed` carries the geography instead.
    expect(agent.address).toBeUndefined();
    expect(agent.geo).toBeUndefined();
    expect(Array.isArray(agent.areaServed)).toBe(true);
    expect((agent.areaServed as unknown[]).length).toBeGreaterThan(0);
  });

  it("omits telephone when the phone destination is a placeholder", () => {
    if (siteConfig.contact.phone.status === "pending") {
      expect(agent.telephone).toBeUndefined();
    }
  });

  it("does not claim a brokerage relationship that is unapproved", () => {
    const person = personSchema() as Record<string, unknown>;
    expect(agent.parentOrganization).toBeUndefined();
    expect(person.memberOf).toBeUndefined();
  });

  it("builds breadcrumbs with absolute, ordered items", () => {
    const crumbs = breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Buy", path: "/buy/" },
    ]) as { itemListElement: { position: number; item: string }[] };

    expect(crumbs.itemListElement.map((item) => item.position)).toEqual([1, 2]);
    for (const item of crumbs.itemListElement) {
      expect(item.item.startsWith("http")).toBe(true);
    }
  });
});
