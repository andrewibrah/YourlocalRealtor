import type { Metadata } from "next";

import { ContactActions } from "@/components/contact/ContactActions";
import { InkCta, PageHero } from "@/components/layout/PageHero";
import { Disclaimer, Faq, ProcessList } from "@/components/primitives/Editorial";
import { Section, SectionHeading } from "@/components/primitives/Typography";
import { ProofStoryCard } from "@/components/proof/ProofStory";
import { VideoCard } from "@/components/video/VideoCard";
import { SourceLink, VideoFrame } from "@/components/video/VideoFrame";
import {
  propertyDisclaimer,
  sellerFaq,
  sellerProcess,
} from "@/content/editorial";
import { proofStoriesFor } from "@/content/proof";
import { getVideo, propertyFilms } from "@/content/videos";
import { JsonLd, breadcrumbSchema, buildMetadata, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Selling a home in Staten Island and Brooklyn",
  description:
    "A listing is exposure. A sale is execution. Pricing, preparation, property films, showings, and negotiation for Staten Island and Brooklyn sellers.",
  path: "/sell/",
});

export default function SellPage() {
  const sellerVideo = getVideo("seller-questions");
  const sellerProof = proofStoriesFor("seller-side");

  return (
    <>
      <PageHero
        index="02"
        eyebrow="Selling · Staten Island & Brooklyn"
        title="A listing is exposure. A sale is execution."
        standfirst="Position the property, create attention, control the process, and negotiate the result. Most of that is decided before the sign goes up."
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Sell", href: "/sell/" },
        ]}
        actions={
          <>
            <InkCta href="#contact">Get a seller plan</InkCta>
            <InkCta href="#marketing" variant="outline">
              See the marketing
            </InkCta>
          </>
        }
        meta={[
          { label: "Documented sale", value: "$1,960,000" },
          { label: "Accepted offer", value: "98% of list" },
          { label: "Time to offer", value: "First week" },
          { label: "Coverage", value: "Staten Island · Brooklyn" },
        ]}
      />

      {/* Questions -------------------------------------------------------------- */}
      <Section id="questions" tone="paper">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <SectionHeading
              index="01"
              eyebrow="Before you list"
              title="Ask better questions."
              standfirst="Every one of these gets answered whether you ask it or not. Better to answer them on purpose."
            />
            <Faq items={sellerFaq} />
          </div>

          {sellerVideo ? (
            <div
              className="flex flex-col gap-3 lg:sticky lg:top-32 lg:max-w-sm lg:self-start lg:justify-self-end"
            >
              <VideoFrame video={sellerVideo} />
              <SourceLink video={sellerVideo} />
            </div>
          ) : null}
        </div>
      </Section>

      {/* Pricing / process ------------------------------------------------------- */}
      <Section id="process" tone="quiet">
        <SectionHeading
          index="02"
          eyebrow="Pricing and positioning"
          title="The first two weeks are the whole negotiation."
          standfirst="Attention is highest at launch and you only get it once. Everything in this list is aimed at not wasting it."
        />
        <ProcessList steps={sellerProcess} className="mt-10" />
      </Section>

      {/* Marketing --------------------------------------------------------------- */}
      <Section id="marketing" tone="ink">
        <SectionHeading
          index="03"
          eyebrow="Property marketing"
          tone="paper"
          title="Your property gets a film, not a slideshow."
          standfirst="A property film puts a buyer inside the layout before they decide whether to book a showing. That is a different job from twelve photographs."
        />

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {propertyFilms.map((film) => (
            <li key={film.slug}>
              <VideoCard video={film} tone="paper" />
            </li>
          ))}
        </ul>

        <Disclaimer tone="paper" className="mt-12">
          {propertyDisclaimer}
        </Disclaimer>
      </Section>

      {/* Proof -------------------------------------------------------------------- */}
      <Section id="proof" tone="paper">
        <SectionHeading
          index="04"
          eyebrow="Seller results"
          title="What changed the outcome?"
          standfirst="Two documented seller-side transactions. The situation, the decision, and the result — in the clients' own words."
        />
        <ul className="mt-10 grid gap-8 lg:grid-cols-2">
          {sellerProof.map((story) => (
            <li key={story.slug} className="flex">
              <ProofStoryCard story={story} className="w-full" />
            </li>
          ))}
        </ul>
      </Section>

      {/* Sell and buy -------------------------------------------------------------- */}
      <Section id="sell-and-buy" tone="quiet">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            index="05"
            eyebrow="Selling and buying"
            title="If you are doing both, it is one transaction."
          />
          <div className="flex max-w-reading flex-col gap-5 text-body-lg text-pretty text-ink/85">
            <p>
              The order of accepted offers, contingencies, and closing dates has
              to be planned before either transaction is in motion. Getting that
              wrong is how people end up in a rental between two houses, or
              carrying two mortgages.
            </p>
            <p>
              On the documented Brooklyn transaction on this site, an accepted
              offer was secured on the client&rsquo;s next house{" "}
              <strong className="font-semibold text-ink">
                before their current property was listed
              </strong>
              . The next house was not even the listing agent&rsquo;s deal.
            </p>
            <p>
              That is the coordination. It is not a service line on a brochure —
              it is a sequencing decision that gets made once, early, and cannot
              be undone later.
            </p>
          </div>
        </div>
      </Section>

      {/* Contact -------------------------------------------------------------------- */}
      <Section id="contact" tone="ink">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            index="06"
            eyebrow="Next"
            tone="paper"
            title="Get a seller plan before you commit to a price."
            standfirst="One conversation about pricing, preparation, and timing. No form, no account, nothing submitted from this website."
          />
          <ContactActions tone="paper" />
        </div>
      </Section>

      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Sell", path: "/sell/" },
          ]),
          faqSchema(sellerFaq),
        ]}
      />
    </>
  );
}
