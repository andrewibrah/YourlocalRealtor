import type { Metadata } from "next";

import { ContactActions } from "@/components/contact/ContactActions";
import { PageHero } from "@/components/layout/PageHero";
import { Disclaimer } from "@/components/primitives/Editorial";
import { Section, SectionHeading } from "@/components/primitives/Typography";
import { BuyerSeries } from "@/components/video/BuyerSeries";
import { VideoCard } from "@/components/video/VideoCard";
import { financialDisclaimer } from "@/content/editorial";
import { buyerSeries } from "@/content/videos";
import {
  JsonLd,
  breadcrumbSchema,
  buildMetadata,
  itemListSchema,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "First-time homebuyer series",
  description:
    "A five-part sequence for first-time buyers in New York, in order — from working out the money to holding the deal together through closing.",
  path: "/buy/first-home/",
});

export default function FirstHomePage() {
  return (
    <>
      <PageHero
        index="03"
        eyebrow="Buyer runway"
        title="Five moves between deciding and closing."
        standfirst="Watch them in order. Each one ends with something to do rather than something else to research. Your place in the sequence is remembered on this device only."
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Buy", href: "/buy/" },
          { name: "First home", href: "/buy/first-home/" },
        ]}
        meta={[
          { label: "Parts", value: "05" },
          { label: "Account required", value: "None" },
          { label: "Progress stored", value: "This device only" },
        ]}
      />

      <Section id="runway" tone="paper">
        <SectionHeading
          index="01"
          eyebrow="The sequence"
          title="The runway."
        />
        <div className="mt-10">
          <BuyerSeries episodes={buyerSeries} />
        </div>
      </Section>

      <Section id="episodes" tone="quiet">
        <SectionHeading
          index="02"
          eyebrow="Every part"
          title="Open any part directly."
          standfirst="Each part has its own page with the transcript, once the licensed master and captions are in place."
        />
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {buyerSeries.map((episode) => (
            <li key={episode.slug}>
              <VideoCard video={episode} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="after" tone="ink">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            index="03"
            eyebrow="After part five"
            tone="paper"
            title="Now it is your situation, not a general one."
            standfirst="The series covers what is true for everyone. What comes next depends on your cash, your timing, and the specific property — which is a conversation, not a video."
          />
          <ContactActions tone="paper" />
        </div>
        <Disclaimer tone="paper" className="mt-12">
          {financialDisclaimer}
        </Disclaimer>
      </Section>

      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Buy", path: "/buy/" },
            { name: "First home", path: "/buy/first-home/" },
          ]),
          itemListSchema(
            "First-time homebuyer series",
            buyerSeries.map((episode) => ({
              name: episode.topic,
              path: `/videos/${episode.slug}/`,
            })),
          ),
        ]}
      />
    </>
  );
}
