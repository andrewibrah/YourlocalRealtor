import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/layout/PageHero";
import { Badge, Price } from "@/components/primitives/Data";
import { Disclaimer } from "@/components/primitives/Editorial";
import { Section, SectionHeading } from "@/components/primitives/Typography";
import { VideoCard } from "@/components/video/VideoCard";
import { propertyDisclaimer } from "@/content/editorial";
import {
  PROPERTY_STATUS_LABELS,
  listedProperties,
  properties,
} from "@/content/properties";
import { propertyFilms } from "@/content/videos";
import {
  JsonLd,
  breadcrumbSchema,
  buildMetadata,
  itemListSchema,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Properties and property films",
  description:
    "Documented closed transactions in Staten Island and Brooklyn, and the property films produced for them. A curated record — not a listing search.",
  path: "/properties/",
});

export default function PropertiesPage() {
  const filmsWithoutPage = propertyFilms.filter(
    (film) => !properties.some((property) => property.videoSlug === film.slug),
  );

  return (
    <>
      <PageHero
        index="07"
        eyebrow="The work"
        title="Properties, and the films made for them."
        standfirst="A curated record of documented transactions and the marketing films produced alongside them. This is not a listing search, and nothing here is presented as currently available."
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Properties", href: "/properties/" },
        ]}
        meta={[
          { label: "Documented", value: String(properties.length).padStart(2, "0") },
          { label: "Films", value: String(propertyFilms.length).padStart(2, "0") },
          { label: "IDX / MLS search", value: "Not offered" },
        ]}
      />

      <Section id="properties" tone="paper">
        <SectionHeading
          index="01"
          eyebrow="Documented"
          title="Every property with something verified to say."
          standfirst="Each entry links to the transaction record it came from. Where a date, a price, or an address has not been confirmed, it is not stated."
        />

        <ul className="mt-12 grid gap-px overflow-hidden rounded-card border border-gray-300 bg-gray-300">
          {properties.map((property) => (
            <li key={property.slug} className="bg-white">
              <Link
                href={`/properties/${property.slug}/`}
                className="group grid gap-4 p-6 transition-colors duration-[--duration-fast] hover:bg-gray-100 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10 lg:p-8"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={property.status === "sold" ? "sold" : "neutral"}>
                      {PROPERTY_STATUS_LABELS[property.status]}
                    </Badge>
                    {property.locality ? (
                      <Badge tone="neutral">{property.locality}</Badge>
                    ) : null}
                  </div>

                  <h2 className="font-display text-heading-lg text-balance text-ink transition-colors group-hover:text-action-ink">
                    {property.title}
                  </h2>

                  <p className="max-w-reading text-body text-pretty text-gray-600">
                    {property.description}
                  </p>
                </div>

                {property.price ? (
                  <Price
                    label={property.price.label}
                    amount={property.price.amount}
                    size="md"
                    className="lg:text-right"
                  />
                ) : (
                  <p className="font-data text-caption tracking-[0.14em] text-gray-600 uppercase lg:text-right">
                    No price stated
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {listedProperties.length > 0 ? (
          <Disclaimer className="mt-12">
            Prices and availability shown for marketed listings are as published
            with each film. This site is not a listing service and does not track
            current status — confirm both before relying on either.
          </Disclaimer>
        ) : null}
        <Disclaimer className="mt-6">{propertyDisclaimer}</Disclaimer>
      </Section>

      {filmsWithoutPage.length > 0 ? (
        <Section id="films" tone="ink">
          <SectionHeading
            index="02"
            eyebrow="Property films"
            tone="paper"
            title="More films, no property record yet."
            standfirst="These films exist but no address, price, or transaction detail has been verified for them — so they live in the library rather than being given a property page with nothing on it."
          />
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filmsWithoutPage.map((film) => (
              <li key={film.slug}>
                <VideoCard video={film} tone="paper" />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Properties", path: "/properties/" },
          ]),
          itemListSchema(
            "Documented properties",
            properties.map((property) => ({
              name: property.title,
              path: `/properties/${property.slug}/`,
            })),
          ),
        ]}
      />
    </>
  );
}
