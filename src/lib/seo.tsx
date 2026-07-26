import type { Metadata } from "next";

import { areas } from "@/content/areas";
import { brokerage, brokerageIsApproved, siteConfig, telHref } from "@/lib/site-config";

/**
 * SEO and structured data.
 *
 * The local-search strategy and every decision recorded here is documented in
 * `docs/seo-strategy.md`.
 *
 * The single most important rule in this file: **structured data must not
 * assert anything the site cannot substantiate.** Schema markup is read by
 * search engines and AI assistants as machine-readable fact, so fabricating an
 * address, a rating, or a licence number here is worse than fabricating it in
 * body copy — it is a claim made in a format designed to be trusted and reused.
 * Where a value is unapproved it is omitted entirely rather than guessed.
 */

export function absoluteUrl(path = "/"): string {
  const base = `${siteConfig.url}${siteConfig.basePath}`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.defaultTitle,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* -------------------------------------------------------------------------- */
/* Structured data                                                            */
/* -------------------------------------------------------------------------- */

type Json = Record<string, unknown>;

export const AGENT_ID = absoluteUrl("/#agent");
export const PERSON_ID = absoluteUrl("/#person");

/**
 * `RealEstateAgent` is the correct type for both an individual agent and a
 * brokerage — Schema.org has no `RealEstateBrokerage` type.
 *
 * This is modelled as a **service-area business**: there is no verified public
 * office address, so `address` is omitted and `areaServed` carries the
 * geography instead. Google lists `address` as required for full LocalBusiness
 * rich results, which means this markup is deliberately incomplete until the
 * brokerage office address is approved. That gap is tracked as a blocking SEO
 * item rather than closed with an invented address.
 *
 * Deliberately absent:
 *   `aggregateRating` — three owner-selected review screenshots are not an
 *   aggregate of all reviews. Marking them up as one would misrepresent them.
 *   `geo` — no verified coordinates exist.
 *   `priceRange` — no verified fee information exists.
 */
export function realEstateAgentSchema(): Json {
  const node: Json = {
    "@type": "RealEstateAgent",
    "@id": AGENT_ID,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    areaServed: areas.map((area) => ({
      "@type": "City",
      name: area.name,
      containedInPlace: { "@type": "State", name: "New York" },
    })),
    knowsAbout: [
      "Residential real estate",
      "First-time homebuyer education",
      "Seller representation",
      "Competitive offer strategy",
      "Multi-family property sales",
      "Property marketing films",
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Buyer representation",
          serviceType: "Residential buyer representation",
          areaServed: areas.map((area) => area.name),
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Seller representation",
          serviceType: "Residential listing and seller representation",
          areaServed: areas.map((area) => area.name),
        },
      },
    ],
  };

  if (telHref && siteConfig.contact.phone.status === "configured") {
    node.telephone = siteConfig.contact.phone.value;
  }

  if (brokerageIsApproved && brokerage.officeAddress) {
    node.address = {
      "@type": "PostalAddress",
      streetAddress: brokerage.officeAddress,
      addressRegion: "NY",
      addressCountry: "US",
    };
  }

  if (brokerageIsApproved && brokerage.name) {
    node.parentOrganization = { "@type": "Organization", name: brokerage.name };
  }

  return node;
}

export function personSchema(): Json {
  const node: Json = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: siteConfig.name,
    url: absoluteUrl("/about/"),
    jobTitle: brokerageIsApproved
      ? brokerage.licensedTitle
      : "Real estate agent",
    worksFor: { "@id": AGENT_ID },
  };

  if (brokerageIsApproved && brokerage.name) {
    node.memberOf = { "@type": "Organization", name: brokerage.name };
  }

  return node;
}

export function breadcrumbSchema(
  trail: { name: string; path: string }[],
): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function faqSchema(
  items: { question: string; answer: string[] }[],
): Json {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.join(" "),
      },
    })),
  };
}

/**
 * `ItemList` for hub pages. Helps AI-search surfaces enumerate what a listing
 * page actually contains instead of guessing from the DOM.
 */
export function itemListSchema(
  name: string,
  items: { name: string; path: string }[],
): Json {
  return {
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

/**
 * Renders a JSON-LD graph.
 *
 * `JSON.stringify` output is injected via `dangerouslySetInnerHTML`, which is
 * the documented Next.js approach for JSON-LD. It is safe here because every
 * value originates from typed local content validated at build time — there is
 * no user input, no CMS, and no runtime data source anywhere in this
 * application. `<` is still escaped so a stray sequence in copy can never break
 * out of the script element.
 */
export function JsonLd({ graph }: { graph: Json[] }) {
  const payload = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  }).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: payload }}
    />
  );
}
