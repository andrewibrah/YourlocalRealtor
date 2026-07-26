import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContactActions } from "@/components/contact/ContactActions";
import { PageHero } from "@/components/layout/PageHero";
import { Badge, Price } from "@/components/primitives/Data";
import { Disclaimer } from "@/components/primitives/Editorial";
import { Section, SectionHeading } from "@/components/primitives/Typography";
import { ProofStoryCard } from "@/components/proof/ProofStory";
import { areas, getArea } from "@/content/areas";
import { propertyDisclaimer } from "@/content/editorial";
import { getProofStory } from "@/content/proof";
import { formatPrice } from "@/lib/format";
import { PROPERTY_STATUS_LABELS, getProperty } from "@/content/properties";
import {
  JsonLd,
  absoluteUrl,
  breadcrumbSchema,
  buildMetadata,
} from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return areas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getArea(slug);

  if (!area) return {};

  return buildMetadata({
    // City + service in the title, which is the strongest single on-page local
    // signal available. See `docs/seo-strategy.md`.
    title: `Real estate agent in ${area.name}, ${area.region} — buying and selling`,
    description: `${area.standfirst} Buyer and seller representation in ${area.name}, New York.`,
    path: `/areas/${area.slug}/`,
  });
}

export default async function AreaPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const area = getArea(slug);

  if (!area) notFound();

  const stories = area.proofSlugs
    .map((storySlug) => getProofStory(storySlug))
    .filter((story) => story !== undefined);

  const areaProperties = area.propertySlugs
    .map((propertySlug) => getProperty(propertySlug))
    .filter((property) => property !== undefined);

  const total = stories.reduce((sum, story) => sum + story.outcome.amount, 0);

  return (
    <>
      <PageHero
        index="10"
        eyebrow={`${area.name}, ${area.region}`}
        title={`Buying and selling in ${area.name}.`}
        standfirst={area.standfirst}
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: area.name, href: `/areas/${area.slug}/` },
        ]}
        meta={[
          {
            label: "Documented closings here",
            value: String(stories.length).padStart(2, "0"),
          },
          { label: "Combined, these", value: formatPrice(total) },
          {
            label: "Postal codes documented",
            value: area.documentedPostalCodes.join(" · "),
          },
        ]}
      />

      <Section id="context" tone="paper">
        <SectionHeading
          index="01"
          eyebrow={`Working in ${area.name}`}
          title={`What the work here has actually looked like.`}
        />
        <div className="mt-8 flex max-w-reading flex-col gap-5 text-body-lg text-pretty text-ink/85">
          {area.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>

      {stories.length > 0 ? (
        <Section id="proof" tone="quiet">
          <SectionHeading
            index="02"
            eyebrow="Documented here"
            title={`Transactions closed in ${area.name}.`}
            standfirst="Each one links to the full case study and the source review."
          />
          <ul className="mt-10 grid gap-8 lg:grid-cols-2">
            {stories.map((story) => (
              <li key={story.slug} className="flex min-w-0">
                <ProofStoryCard story={story} className="w-full" />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {areaProperties.length > 0 ? (
        <Section id="properties" tone="ink">
          <SectionHeading
            index="03"
            eyebrow="Property records"
            tone="paper"
            title={`Properties in ${area.name}.`}
          />
          <ul className="mt-10 grid gap-px overflow-hidden rounded-card border border-ink-rule bg-ink-rule">
            {areaProperties.map((property) => (
              <li key={property.slug} className="bg-ink">
                <Link
                  href={`/properties/${property.slug}/`}
                  className="group grid gap-4 p-6 transition-colors hover:bg-white/[0.05] lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10"
                >
                  <div className="flex flex-col gap-2">
                    <Badge tone="onInk">
                      {PROPERTY_STATUS_LABELS[property.status]}
                    </Badge>
                    <span className="font-display text-heading-md text-paper transition-colors group-hover:text-signal">
                      {property.title}
                    </span>
                  </div>
                  {property.price ? (
                    <Price
                      label={property.price.label}
                      amount={property.price.amount}
                      tone="paper"
                      size="md"
                      className="lg:text-right"
                    />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
          <Disclaimer tone="paper" className="mt-10">
            {propertyDisclaimer}
          </Disclaimer>
        </Section>
      ) : null}

      <Section id="contact" tone="quiet">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            index="04"
            eyebrow="Next"
            title={`Talk about a specific ${area.name} move.`}
            standfirst="Buying, selling, or both. No form, no account, nothing submitted from this website."
          />
          <ContactActions />
        </div>
        <p className="mt-10 text-body text-gray-600">
          Also working in{" "}
          {areas
            .filter((other) => other.slug !== area.slug)
            .map((other) => (
              <Link
                key={other.slug}
                href={`/areas/${other.slug}/`}
                className="font-semibold text-action-ink underline underline-offset-4 hover:text-ink"
              >
                {other.name}
              </Link>
            ))}
          .
        </p>
      </Section>

      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: area.name, path: `/areas/${area.slug}/` },
          ]),
          {
            "@type": "WebPage",
            "@id": absoluteUrl(`/areas/${area.slug}/`),
            name: `Real estate agent in ${area.name}, ${area.region}`,
            about: {
              "@type": "City",
              name: area.name,
              containedInPlace: { "@type": "State", name: "New York" },
            },
          },
        ]}
      />
    </>
  );
}
