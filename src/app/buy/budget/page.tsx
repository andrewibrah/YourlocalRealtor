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
  title: "What a budget actually buys",
  description:
    "Skip the generic affordability calculator. Understand what a real budget produces in property type, location, and tradeoffs before you start touring.",
  path: "/buy/budget/",
});

/**
 * Market Lens.
 *
 * `docs/08`: this content "must not imply mortgage, investment, appraisal, or
 * legal advice" and `docs/03` requires it to stay "educational, not a live
 * affordability guarantee".
 *
 * So there is no calculator here, and no worked example with invented figures.
 * What a budget produces in this market is exactly the kind of claim that needs
 * a source, and the source is the film — which has not been released yet. What
 * *is* safe to publish is the anatomy of the question: the variables that move
 * the answer. That is useful, it is true regardless of market conditions, and
 * it does not put a number in a visitor's head that nobody has verified.
 */
const BUDGET_VARIABLES = [
  {
    index: "01",
    title: "The number is not the price",
    body: "What you can spend on a property and what you can spend in total are different figures. Closing costs, inspection, and moving all land in the same few weeks as the down payment.",
  },
  {
    index: "02",
    title: "Property type moves it most",
    body: "The same figure buys a very different thing depending on whether you are looking at a single-family, a condo with common charges, or a multi-family where part of the property may carry itself.",
  },
  {
    index: "03",
    title: "Taxes and carrying costs are part of the price",
    body: "Two properties at the same asking price can have monthly costs that are not close to each other. The asking price is the part that gets advertised; the carrying cost is the part you live with.",
  },
  {
    index: "04",
    title: "Condition is a budget line",
    body: "A property that needs work is cheaper on the day you buy it and not necessarily cheaper by the end of the year. What needs doing, and when it needs doing, belongs in the number.",
  },
  {
    index: "05",
    title: "Location changes what the figure produces",
    body: "The same budget produces different results in different parts of Staten Island and Brooklyn. That is a matter of what has actually sold, not of how an area is described.",
  },
] as const;

export default function BudgetPage() {
  const video = getVideo("budget-500k");

  return (
    <>
      <PageHero
        index="04"
        eyebrow="Market decisions"
        title="What does $500K actually buy?"
        standfirst="A calculator tells you what a bank might lend you. It does not tell you what that produces in this market. Those are different questions and only one of them is useful when you are standing in a house."
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Buy", href: "/buy/" },
          { name: "What a budget buys", href: "/buy/budget/" },
        ]}
        meta={[
          { label: "Format", value: "Property film" },
          { label: "Coverage", value: "Staten Island · Brooklyn" },
          { label: "Not", value: "A mortgage quote" },
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
              eyebrow="The film"
              title="Start with what the budget produces."
              standfirst="The figures in the film belong to the film. This page does not restate them, because the licensed master has not been reviewed yet and a number without a source is not information."
            />
            <Disclaimer>{financialDisclaimer}</Disclaimer>
          </div>
        </div>
      </Section>

      <Section id="variables" tone="quiet">
        <SectionHeading
          index="02"
          eyebrow="What moves the answer"
          title="Five things that change what a budget produces."
          standfirst="These hold regardless of what the market is doing this month, which is why they are worth understanding before you look at a single listing."
        />

        <ol className="mt-10 flex flex-col">
          {BUDGET_VARIABLES.map((item) => (
            <li
              key={item.index}
              className="grid gap-x-6 gap-y-3 border-t border-gray-300 py-8 md:grid-cols-[4rem_1fr]"
            >
              <span className="tabular font-display text-heading-lg leading-none text-gray-600">
                {item.index}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-heading-md text-balance">
                  {item.title}
                </h3>
                <p className="max-w-reading text-body-lg text-pretty text-gray-600">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="contact" tone="ink">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            index="03"
            eyebrow="Next"
            tone="paper"
            title="Build your range against something real."
            standfirst="Your lender produces the borrowing figure. This conversation is about what that figure actually buys here, and what it costs to hold."
          />
          <ContactActions tone="paper" />
        </div>
      </Section>

      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Buy", path: "/buy/" },
            { name: "What a budget buys", path: "/buy/budget/" },
          ]),
        ]}
      />
    </>
  );
}
