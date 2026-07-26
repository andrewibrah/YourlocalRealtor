import type { Metadata } from "next";

import { ContactActions } from "@/components/contact/ContactActions";
import { PageHero } from "@/components/layout/PageHero";
import { Disclaimer } from "@/components/primitives/Editorial";
import { Section, SectionHeading } from "@/components/primitives/Typography";
import { SourceLink, VideoFrame } from "@/components/video/VideoFrame";
import { financialDisclaimer } from "@/content/editorial";
import { getVideo } from "@/content/videos";
import { JsonLd, breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Buying versus renting",
  description:
    "The buy-or-rent decision depends on timing, cash, monthly cost, flexibility, and the specific property — not on a slogan. Here is how to weigh it.",
  path: "/buy/buy-vs-rent/",
});

/**
 * The comparison surface.
 *
 * Deliberately a set of factors rather than a calculator. A calculator would
 * have to assume a rate, an appreciation figure, and a holding period — none of
 * which are verified, all of which are effectively financial advice, and all of
 * which `docs/09` rules out. Naming the factors honestly is more useful than a
 * false precision that produces a number the visitor then treats as a decision.
 */
const FACTORS = [
  {
    factor: "How long you plan to stay",
    buying: "The transaction costs of buying and selling need time to be worth paying. A short horizon makes them expensive.",
    renting: "A short or uncertain horizon is the strongest single argument for renting.",
  },
  {
    factor: "Cash on hand",
    buying: "You need the down payment and the closing costs and a reserve after both. Emptying the account to close is how a small repair becomes a crisis.",
    renting: "Requires far less up front, which can be the deciding constraint regardless of what the monthly numbers say.",
  },
  {
    factor: "Monthly cost, all in",
    buying: "Mortgage, taxes, insurance, maintenance, and any common charges. The mortgage payment on its own is not the comparison.",
    renting: "Usually simpler to compare, but it moves at each renewal and you do not control by how much.",
  },
  {
    factor: "Flexibility",
    buying: "Selling takes months and costs money. If your work or family situation might move, that is a real cost, not a footnote.",
    renting: "You can leave at the end of a lease. That option has value even if you never use it.",
  },
  {
    factor: "The specific property",
    buying: "A property that suits you at a price that made sense can beat the general case. This is why the general case is not the answer.",
    renting: "If nothing available fits what you actually need, waiting is a decision rather than a failure.",
  },
  {
    factor: "Control",
    buying: "You decide what gets changed, and you carry what breaks.",
    renting: "Someone else decides what gets changed, and someone else carries what breaks.",
  },
] as const;

export default function BuyVsRentPage() {
  const video = getVideo("buy-vs-rent");

  return (
    <>
      <PageHero
        index="05"
        eyebrow="Market decisions"
        title="Start with the math, not the pressure."
        standfirst="The right answer depends on timing, cash, monthly cost, flexibility, and the property — not on a slogan about throwing money away."
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Buy", href: "/buy/" },
          { name: "Buy or rent", href: "/buy/buy-vs-rent/" },
        ]}
        meta={[
          { label: "Factors", value: "06" },
          { label: "Calculator", value: "None — on purpose" },
          { label: "Not", value: "Financial advice" },
        ]}
      />

      <Section id="film" tone="paper">
        <div className="grid gap-10 lg:grid-cols-[20rem_1fr] lg:gap-16">
          {video ? (
            <div className="flex flex-col gap-3 lg:max-w-sm">
              <VideoFrame video={video} />
              <SourceLink video={video} />
            </div>
          ) : null}
          <div className="flex flex-col gap-8">
            <SectionHeading
              index="01"
              eyebrow="Why there is no calculator here"
              title="A calculator would have to guess."
              standfirst="Any buy-versus-rent calculator has to assume a rate, an appreciation figure, and how long you will stay. Change those three assumptions and the answer flips. A tool that hides its assumptions behind a single number is not helping you decide — it is deciding for you."
            />
            <Disclaimer>{financialDisclaimer}</Disclaimer>
          </div>
        </div>
      </Section>

      <Section id="factors" tone="quiet">
        <SectionHeading
          index="02"
          eyebrow="The comparison"
          title="Six factors that actually decide it."
          standfirst="Work through these honestly and you will usually find the answer is already obvious for your situation."
        />

        {/* Table on wide screens; stacked cards on narrow ones. Wrapped so it
            scrolls inside its own container rather than the page. */}
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[48rem] border-collapse text-left">
            <caption className="sr-only">
              Factors in the buy-versus-rent decision, with what each factor
              means for buying and for renting.
            </caption>
            <thead>
              <tr className="border-b border-gray-300">
                <th
                  scope="col"
                  className="w-1/4 py-4 pr-6 font-data text-caption tracking-[0.14em] text-gray-600 uppercase"
                >
                  Factor
                </th>
                <th
                  scope="col"
                  className="py-4 pr-6 font-data text-caption tracking-[0.14em] text-action-ink uppercase"
                >
                  Buying
                </th>
                <th
                  scope="col"
                  className="py-4 font-data text-caption tracking-[0.14em] text-gray-600 uppercase"
                >
                  Renting
                </th>
              </tr>
            </thead>
            <tbody>
              {FACTORS.map((row) => (
                <tr key={row.factor} className="border-b border-gray-300 align-top">
                  <th
                    scope="row"
                    className="py-6 pr-6 font-display text-heading-md text-balance"
                  >
                    {row.factor}
                  </th>
                  <td className="py-6 pr-6 text-body text-pretty text-ink/85">
                    {row.buying}
                  </td>
                  <td className="py-6 text-body text-pretty text-gray-600">
                    {row.renting}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="contact" tone="ink">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            index="03"
            eyebrow="Next"
            tone="paper"
            title="Compare your situation, not the general one."
            standfirst="Bring your timeline, your cash position, and what you are paying now. Fifteen minutes usually settles it in one direction or the other."
          />
          <ContactActions tone="paper" />
        </div>
      </Section>

      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Buy", path: "/buy/" },
            { name: "Buy or rent", path: "/buy/buy-vs-rent/" },
          ]),
        ]}
      />
    </>
  );
}
