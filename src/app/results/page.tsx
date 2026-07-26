import type { Metadata } from "next";

import { ContactActions } from "@/components/contact/ContactActions";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/primitives/Typography";
import { ProofStoryCard } from "@/components/proof/ProofStory";
import { proofStories } from "@/content/proof";
import { formatPrice } from "@/lib/format";
import {
  JsonLd,
  breadcrumbSchema,
  buildMetadata,
  itemListSchema,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Results and case studies",
  description:
    "Three documented New York transactions with the exact property, the constraint, what changed the outcome, and the client's own account. Proof without the sales speech.",
  path: "/results/",
});

export default function ResultsPage() {
  const total = proofStories.reduce(
    (sum, story) => sum + story.outcome.amount,
    0,
  );

  return (
    <>
      <PageHero
        index="09"
        eyebrow="Proof"
        title="Proof without the sales speech."
        standfirst="Three transactions, each with the exact property, the constraint the client was under, what changed the outcome, and the client's own words. The source review sits behind every one of them."
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Results", href: "/results/" },
        ]}
        meta={[
          {
            label: "Transactions documented here",
            value: String(proofStories.length).padStart(2, "0"),
          },
          { label: "Combined, these three", value: formatPrice(total) },
          { label: "Boroughs", value: "Staten Island · Brooklyn" },
        ]}
      />

      <Section id="scope" tone="paper">
        <SectionHeading
          index="01"
          eyebrow="What this number is"
          title="Three transactions. Not a career total."
          standfirst="This page documents three specific transactions and nothing else. The combined figure is the sum of those three, itemised below. It is not a lifetime sales volume, a team figure, or a brokerage figure, and it should not be read as one."
        />
      </Section>

      <Section id="cases" tone="quiet">
        <SectionHeading
          index="02"
          eyebrow="Case studies"
          title="The receipts."
        />
        <ul className="mt-12 grid gap-8 lg:grid-cols-3">
          {proofStories.map((story) => (
            <li key={story.slug} className="flex">
              <ProofStoryCard story={story} className="w-full" headingLevel="h3" />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="contact" tone="ink">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            index="03"
            eyebrow="Next"
            tone="paper"
            title="Your situation is not one of these three."
            standfirst="Which is the point of talking about it rather than reading about someone else's."
          />
          <ContactActions tone="paper" />
        </div>
      </Section>

      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Results", path: "/results/" },
          ]),
          itemListSchema(
            "Documented transactions",
            proofStories.map((story) => ({
              name: story.headline,
              path: `/results/${story.slug}/`,
            })),
          ),
        ]}
      />
    </>
  );
}
