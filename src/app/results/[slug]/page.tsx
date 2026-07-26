import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContactActions } from "@/components/contact/ContactActions";
import { PageHero } from "@/components/layout/PageHero";
import { Badge, StarRating, VerificationNote } from "@/components/primitives/Data";
import { Section, SectionHeading } from "@/components/primitives/Typography";
import { ReviewSourceDisclosure } from "@/components/proof/ProofStory";
import { getProofStory, proofStories } from "@/content/proof";
import { formatPrice } from "@/lib/format";
import { properties } from "@/content/properties";
import { JsonLd, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { pad2 } from "@/lib/utils";

type Params = { slug: string };

const TYPE_LABELS = {
  buyer: "Buyer represented",
  seller: "Seller represented",
  "sell-and-buy": "Sold and bought",
} as const;

export function generateStaticParams(): Params[] {
  return proofStories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = getProofStory(slug);

  if (!story) return {};

  return buildMetadata({
    title: `${story.property.address}, ${story.property.city} — ${formatPrice(
      story.outcome.amount,
    )}`,
    description: story.headline,
    path: `/results/${story.slug}/`,
  });
}

export default async function ResultPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const story = getProofStory(slug);

  if (!story) notFound();

  const relatedProperty = properties.find(
    (property) => property.proofSlug === story.slug,
  );

  /*
   * The case-study template from `docs/02` §Results page: outcome, situation,
   * constraints, actions, result, client excerpt, source and verification.
   */
  const sections = [
    {
      index: 1,
      heading: "The situation",
      body: [story.situation],
    },
    {
      index: 2,
      heading: "What Sharif did",
      body: story.actions,
    },
    {
      index: 3,
      heading: "The result",
      body: [
        `${story.outcome.label} ${formatPrice(story.outcome.amount)}.`,
        ...(story.outcome.acceptedOfferPercentOfList
          ? [
              `Accepted offer at ${story.outcome.acceptedOfferPercentOfList}% of list price${
                story.outcome.acceptedOfferTiming
                  ? `, ${story.outcome.acceptedOfferTiming.toLowerCase()}`
                  : ""
              }.`,
            ]
          : []),
      ],
    },
  ];

  return (
    <>
      <PageHero
        index={pad2(proofStories.indexOf(story) + 1)}
        eyebrow={`${TYPE_LABELS[story.transactionType]} · ${story.property.city}`}
        title={story.headline}
        standfirst={`${story.property.address}, ${story.property.city}, ${story.property.state} ${story.property.postalCode}`}
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Results", href: "/results/" },
          { name: story.property.address, href: `/results/${story.slug}/` },
        ]}
        meta={[
          { label: story.outcome.label, value: formatPrice(story.outcome.amount) },
          { label: "Role", value: TYPE_LABELS[story.transactionType] },
          ...(story.outcome.acceptedOfferPercentOfList
            ? [
                {
                  label: "Accepted offer",
                  value: `${story.outcome.acceptedOfferPercentOfList}% of list`,
                },
              ]
            : []),
          { label: "Closing date", value: "Pending confirmation" },
        ]}
      />

      <Section id="case" tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="flex flex-col gap-10">
            {sections.map((section) => (
              <div key={section.index} className="flex min-w-0 flex-col gap-3">
                <p className="flex items-center gap-3 font-data text-caption tracking-[0.16em] text-gray-600 uppercase">
                  <span aria-hidden="true" className="tabular text-action-ink">
                    {pad2(section.index)}
                  </span>
                  <span aria-hidden="true" className="h-px w-6 bg-gray-300" />
                  {section.heading}
                </p>
                <div className="flex max-w-reading flex-col gap-3 text-body-lg text-pretty text-ink/85">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex min-w-0 flex-col gap-3">
              <p className="flex items-center gap-3 font-data text-caption tracking-[0.16em] text-gray-600 uppercase">
                <span aria-hidden="true" className="tabular text-action-ink">
                  04
                </span>
                <span aria-hidden="true" className="h-px w-6 bg-gray-300" />
                Client perspective
              </p>
              <blockquote className="max-w-reading border-l-2 border-signal pl-5 text-body-lg text-pretty italic text-ink/85">
                “{story.excerpt}”
              </blockquote>
            </div>

            <ul className="flex flex-wrap gap-2">
              {story.capabilities.map((capability) => (
                <li key={capability}>
                  <Badge>{capability}</Badge>
                </li>
              ))}
            </ul>
          </div>

          {/* Source column ---------------------------------------------------- */}
          <aside className="flex flex-col gap-6 rounded-card border border-gray-300 bg-white p-6 lg:sticky lg:top-32 lg:self-start">
            <h2 className="font-data text-caption tracking-[0.16em] text-gray-600 uppercase">
              Source and verification
            </h2>

            {story.ratings.length > 0 ? (
              <div className="flex flex-col gap-2">
                {story.ratings.map((rating) => (
                  <StarRating key={rating.label} {...rating} />
                ))}
              </div>
            ) : null}

            <p className="text-body text-pretty text-gray-600">
              {story.sourceNote}
            </p>

            <ReviewSourceDisclosure story={story} />

            <VerificationNote
              verification={story.verification}
              variant="block"
            />

            {relatedProperty ? (
              <Link
                href={`/properties/${relatedProperty.slug}/`}
                className="inline-flex min-h-11 items-center gap-2 font-semibold text-action-ink underline underline-offset-4 hover:text-ink"
              >
                The property record
                <span aria-hidden="true">→</span>
              </Link>
            ) : null}
          </aside>
        </div>
      </Section>

      <Section id="contact" tone="ink">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            index="05"
            eyebrow="Next"
            tone="paper"
            title="Bring the situation, not the outcome."
            standfirst="This one worked out for reasons specific to it. Yours will have its own."
          />
          <ContactActions tone="paper" />
        </div>
        <p className="mt-10">
          <Link
            href="/results/"
            className="text-action-sky underline underline-offset-4 hover:text-signal"
          >
            Back to all results
          </Link>
        </p>
      </Section>

      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Results", path: "/results/" },
            { name: story.property.address, path: `/results/${story.slug}/` },
          ]),
          /*
           * `Article`, not `Review` and not `AggregateRating`.
           *
           * Google's review-snippet policy does not permit a business to mark up
           * reviews of itself on its own site, and these three screenshots are
           * an owner-selected subset rather than an aggregate. Emitting review
           * markup here would be both a policy violation and a misrepresentation
           * of what the page contains. It is a case study, so it is an Article.
           */
          {
            "@type": "Article",
            headline: story.headline,
            about: `${story.property.address}, ${story.property.city}, ${story.property.state}`,
            articleSection: "Case study",
            inLanguage: "en-US",
          },
        ]}
      />
    </>
  );
}
