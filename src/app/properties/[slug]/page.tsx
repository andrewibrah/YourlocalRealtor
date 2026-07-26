import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContactActions } from "@/components/contact/ContactActions";
import { PageHero } from "@/components/layout/PageHero";
import { Badge, Price, VerificationNote } from "@/components/primitives/Data";
import { Disclaimer } from "@/components/primitives/Editorial";
import { Section, SectionHeading } from "@/components/primitives/Typography";
import { ProofStoryCard } from "@/components/proof/ProofStory";
import { SourceLink, VideoFrame } from "@/components/video/VideoFrame";
import { propertyDisclaimer } from "@/content/editorial";
import { getProofStory } from "@/content/proof";
import {
  PROPERTY_STATUS_LABELS,
  availabilityCaveat,
  getProperty,
  properties,
} from "@/content/properties";
import { getVideo } from "@/content/videos";
import { JsonLd, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return properties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getProperty(slug);

  if (!property) return {};

  return buildMetadata({
    title: property.title,
    description: property.description,
    path: `/properties/${property.slug}/`,
  });
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const property = getProperty(slug);

  if (!property) notFound();

  const proof = property.proofSlug ? getProofStory(property.proofSlug) : undefined;
  const video = property.videoSlug ? getVideo(property.videoSlug) : undefined;
  const asOf = formatDate(property.statusAsOf);
  const caveat = availabilityCaveat(property);

  return (
    <>
      <PageHero
        index="08"
        eyebrow={`${PROPERTY_STATUS_LABELS[property.status]}${
          property.locality ? ` · ${property.locality}` : ""
        }`}
        title={property.title}
        standfirst={property.description}
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Properties", href: "/properties/" },
          { name: property.title, href: `/properties/${property.slug}/` },
        ]}
        meta={[
          {
            label: property.price?.label ?? "Price",
            value: property.price
              ? new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(property.price.amount)
              : "Not stated",
          },
          { label: "Status", value: PROPERTY_STATUS_LABELS[property.status] },
          {
            // `docs/09` requires an "as of" date beside every status and price
            // claim. Where the date is genuinely unknown that is said plainly
            // rather than the qualifier being dropped.
            label: "Status as of",
            value: asOf ?? "Date pending confirmation",
          },
        ]}
      />

      <Section id="detail" tone="paper">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div className="flex min-w-0 flex-col gap-8">
            <SectionHeading
              index="01"
              eyebrow="The record"
              title="What is documented."
              standfirst="Everything below comes from the transaction record or the client's own account of it. Nothing has been added."
            />

            {property.facts.length > 0 ? (
              <dl className="grid gap-px overflow-hidden rounded-card border border-gray-300 bg-gray-300 sm:grid-cols-2">
                {property.facts.map((fact) => (
                  <div key={fact.label} className="flex flex-col gap-1 bg-white p-5">
                    <dt className="font-data text-caption tracking-[0.14em] text-gray-600 uppercase">
                      {fact.label}
                    </dt>
                    <dd className="font-display text-heading-md text-ink">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="max-w-reading rounded-card border border-gray-300 bg-gray-100 p-5 text-body text-gray-600">
                No property facts have been verified for this entry yet. Nothing
                is listed here rather than filling the space with detail that has
                not been confirmed.
              </p>
            )}

            {property.price ? (
              <div className="flex flex-col gap-2">
                <Price
                  label={property.price.label}
                  amount={property.price.amount}
                />
                {!asOf ? (
                  <p className="text-caption text-warning-ink">
                    The closing date for this transaction has not been confirmed
                    and is not shown.
                  </p>
                ) : null}
              </div>
            ) : null}

            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={property.status === "sold" ? "sold" : "neutral"}>
                {PROPERTY_STATUS_LABELS[property.status]}
              </Badge>
              {property.locality && property.region ? (
                <Badge tone="neutral">
                  {property.locality}, {property.region}
                </Badge>
              ) : null}
            </div>

            <VerificationNote
              verification={property.verification}
              variant="block"
            />

            {caveat ? <Disclaimer>{caveat}</Disclaimer> : null}
            <Disclaimer>{propertyDisclaimer}</Disclaimer>
          </div>

          {video ? (
            <div className="flex min-w-0 flex-col gap-3 lg:sticky lg:top-32 lg:max-w-sm lg:self-start">
              <VideoFrame video={video} />
              <SourceLink video={video} />
            </div>
          ) : null}
        </div>
      </Section>

      {proof ? (
        <Section id="proof" tone="quiet">
          <SectionHeading
            index="02"
            eyebrow="The client's account"
            title="What the client said about it."
          />
          <div className="mt-10 max-w-2xl">
            <ProofStoryCard story={proof} headingLevel="h3" />
          </div>
        </Section>
      ) : null}

      <Section id="contact" tone="ink">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            index={proof ? "03" : "02"}
            eyebrow="Next"
            tone="paper"
            title={
              property.status === "sold"
                ? "Want this handled the same way?"
                : "Want your property filmed like this?"
            }
            standfirst={
              property.status === "listed"
                ? "Ask about this property, or about having yours marketed the same way."
                : "This property is not available. The process that produced this result is."
            }
          />
          <ContactActions tone="paper" />
        </div>
        <p className="mt-10 text-body text-ink-muted">
          <Link
            href="/properties/"
            className="text-action-sky underline underline-offset-4 hover:text-signal"
          >
            Back to all properties
          </Link>
        </p>
      </Section>

      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Properties", path: "/properties/" },
            { name: property.title, path: `/properties/${property.slug}/` },
          ]),
          /*
           * No `RealEstateListing`, no `Offer`, no `availability`. This is a
           * closed transaction or a marketing film — describing it in listing
           * markup would tell search engines a property is for sale when it is
           * not. `Residence` with a postal address is the accurate description
           * and nothing more is claimed.
           */
          ...(property.address && property.locality && property.region
            ? [
                {
                  "@type": "Residence",
                  name: property.title,
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: property.address,
                    addressLocality: property.locality,
                    addressRegion: property.region,
                    addressCountry: "US",
                  },
                },
              ]
            : []),
        ]}
      />
    </>
  );
}
