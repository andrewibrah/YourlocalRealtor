import type { Metadata } from "next";
import Link from "next/link";

import { ContactActions } from "@/components/contact/ContactActions";
import { InkCta, PageHero } from "@/components/layout/PageHero";
import { Disclaimer, Faq, ProcessList } from "@/components/primitives/Editorial";
import { Section, SectionHeading } from "@/components/primitives/Typography";
import { ProofStoryCard } from "@/components/proof/ProofStory";
import { BuyerSeries } from "@/components/video/BuyerSeries";
import { SourceLink, VideoFrame } from "@/components/video/VideoFrame";
import {
  buyerFaq,
  buyerProcess,
  financialDisclaimer,
} from "@/content/editorial";
import { proofStoriesFor } from "@/content/proof";
import { buyerSeries, getVideo } from "@/content/videos";
import { JsonLd, breadcrumbSchema, buildMetadata, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Buying a home in Staten Island and Brooklyn",
  description:
    "Understand the money, representation, offer, inspection, financing, and closing before pressure makes the decisions for you. Buyer education and representation across Staten Island and Brooklyn.",
  path: "/buy/",
});

export default function BuyPage() {
  const budgetVideo = getVideo("budget-500k");
  const rentVideo = getVideo("buy-vs-rent");
  const buyerProof = proofStoriesFor("buyer");

  return (
    <>
      <PageHero
        index="01"
        eyebrow="Buying · Staten Island & Brooklyn"
        title="Buying gets expensive when the sequence is wrong."
        standfirst="Understand the money, representation, the offer, the inspection, the financing, and the closing before pressure makes the decisions for you."
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Buy", href: "/buy/" },
        ]}
        actions={
          <>
            <InkCta href="/buy/first-home/">Start the buyer plan</InkCta>
            <InkCta href="/buy/budget/" variant="outline">
              See what a budget buys
            </InkCta>
          </>
        }
        meta={[
          { label: "Series", value: "5 parts" },
          { label: "Coverage", value: "Staten Island · Brooklyn" },
          { label: "Documented buyer win", value: "$1,299,999" },
        ]}
      />

      {/* Series ---------------------------------------------------------------- */}
      <Section id="series" tone="paper">
        <SectionHeading
          index="01"
          eyebrow="First home"
          title="The five-part sequence."
          standfirst="In order. Each part ends with the next thing to do, not with more research."
        />
        <div className="mt-10">
          <BuyerSeries episodes={buyerSeries} />
        </div>
      </Section>

      {/* Budget + rent --------------------------------------------------------- */}
      <Section id="decisions" tone="ink">
        <SectionHeading
          index="02"
          eyebrow="Two decisions first"
          tone="paper"
          title="Start with the math, not the pressure."
          standfirst="Two questions decide most of what follows: what your budget actually produces, and whether buying beats renting for your situation right now."
        />

        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:gap-16">
          {[
            {
              video: budgetVideo,
              title: "What $500K actually buys",
              body: "Property type, location, and tradeoffs at a real number — instead of a calculator that does not know this market.",
              href: "/buy/budget/",
              cta: "Build my buying range",
            },
            {
              video: rentVideo,
              title: "Buy or rent",
              body: "Timing, cash, monthly cost, flexibility, and the specific property. The answer is different for different people.",
              href: "/buy/buy-vs-rent/",
              cta: "Compare my situation",
            },
          ].map((item) =>
            item.video ? (
              <div key={item.href} className="flex flex-col gap-5">
                <div className="max-w-[18rem]">
                  <VideoFrame video={item.video} compact />
                </div>
                <h3 className="font-display text-heading-lg text-balance text-paper">
                  {item.title}
                </h3>
                <p className="max-w-reading text-body-lg text-pretty text-ink-muted">
                  {item.body}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <InkCta href={item.href}>{item.cta}</InkCta>
                  <SourceLink video={item.video} tone="paper" />
                </div>
              </div>
            ) : null,
          )}
        </div>
      </Section>

      {/* Process --------------------------------------------------------------- */}
      <Section id="process" tone="paper">
        <SectionHeading
          index="03"
          eyebrow="The process"
          title="What actually happens, in order."
          standfirst="Five stages. The expensive mistakes almost always come from doing one of them out of sequence."
        />
        <ProcessList steps={buyerProcess} className="mt-10" />
      </Section>

      {/* Proof ------------------------------------------------------------------ */}
      <Section id="proof" tone="quiet">
        <SectionHeading
          index="04"
          eyebrow="Competitive offers"
          title="What a bidding war looks like when it works out."
          standfirst="One documented Staten Island buyer transaction, in the client's own words."
        />
        <ul className="mt-10 grid gap-8 lg:grid-cols-2">
          {buyerProof.map((story) => (
            <li key={story.slug} className="flex">
              <ProofStoryCard story={story} className="w-full" />
            </li>
          ))}
        </ul>
      </Section>

      {/* FAQ + disclaimer -------------------------------------------------------- */}
      <Section id="questions" tone="paper">
        <SectionHeading
          index="05"
          eyebrow="Buyer questions"
          title="The questions buyers actually ask."
        />
        <Faq items={buyerFaq} className="mt-10" />
        <Disclaimer className="mt-12">{financialDisclaimer}</Disclaimer>
      </Section>

      {/* Contact ---------------------------------------------------------------- */}
      <Section id="contact" tone="ink">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <SectionHeading
            index="06"
            eyebrow="Next"
            tone="paper"
            title="Get your range before you get attached to a house."
            standfirst="One conversation. No form, no account, nothing submitted from this website."
          />
          <ContactActions tone="paper" />
        </div>
        <p className="mt-10 text-body text-ink-muted">
          Selling as well?{" "}
          <Link
            href="/sell/"
            className="text-action-sky underline underline-offset-4 hover:text-signal"
          >
            The seller plan is here
          </Link>
          .
        </p>
      </Section>

      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Buy", path: "/buy/" },
          ]),
          faqSchema(buyerFaq),
        ]}
      />
    </>
  );
}
