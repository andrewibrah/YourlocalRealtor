import type { Metadata } from "next";
import Link from "next/link";

import { ContactActions } from "@/components/contact/ContactActions";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/primitives/Typography";
import { areas } from "@/content/areas";
import { philosophy } from "@/content/editorial";
import { proofStories } from "@/content/proof";
import { formatPrice } from "@/lib/format";
import { JsonLd, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { brokerageIsApproved } from "@/lib/site-config";
import { pad2 } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "How Sharif works",
  description:
    "Operating philosophy rather than a biography: direct communication, local judgement, education before pressure, process control, and negotiation.",
  path: "/about/",
});

export default function AboutPage() {
  const total = proofStories.reduce(
    (sum, story) => sum + story.outcome.amount,
    0,
  );

  return (
    <>
      <PageHero
        index="11"
        eyebrow="How this works"
        title="Say the useful thing first."
        standfirst="This page is about how the work gets done, not a career summary. What matters to someone about to make a large decision is the operating method, not a list of adjectives."
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about/" },
        ]}
        meta={[
          { label: "Coverage", value: "Staten Island · Brooklyn" },
          {
            label: "Documented transactions",
            value: pad2(proofStories.length),
          },
          { label: "Combined, these three", value: formatPrice(total) },
        ]}
      />

      <Section id="philosophy" tone="paper">
        <SectionHeading
          index="01"
          eyebrow="Operating philosophy"
          title="Four things that shape every transaction."
        />
        <ol className="mt-10 flex flex-col">
          {philosophy.map((item, index) => (
            <li
              key={item.title}
              className="grid gap-x-6 gap-y-3 border-t border-gray-300 py-8 md:grid-cols-[4rem_1fr]"
            >
              <span className="tabular font-display text-heading-lg leading-none text-gray-600">
                {pad2(index + 1)}
              </span>
              <div className="flex flex-col gap-2">
                <h2 className="font-display text-heading-md text-balance">
                  {item.title}
                </h2>
                <p className="max-w-reading text-body-lg text-pretty text-gray-600">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="areas" tone="quiet">
        <SectionHeading
          index="02"
          eyebrow="Local judgement"
          title="Where the work has actually happened."
          standfirst="Local knowledge is a claim everyone makes. These are the boroughs with documented transactions behind them."
        />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {areas.map((area) => (
            <li key={area.slug}>
              <Link
                href={`/areas/${area.slug}/`}
                className="group flex h-full flex-col gap-3 rounded-card border border-gray-300 bg-white p-6 transition-colors hover:border-ink"
              >
                <span className="font-display text-heading-md text-ink transition-colors group-hover:text-action-ink">
                  {area.name}
                </span>
                <span className="text-body text-pretty text-gray-600">
                  {area.standfirst}
                </span>
                <span className="mt-auto pt-2 font-data text-caption tracking-[0.12em] text-action-ink uppercase">
                  Postal codes: {area.documentedPostalCodes.join(" · ")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="credentials" tone="paper">
        <SectionHeading
          index="03"
          eyebrow="Brokerage and credentials"
          title="What is not stated here yet."
        />
        <div className="mt-8 flex max-w-reading flex-col gap-5 text-body-lg text-pretty text-ink/85">
          {brokerageIsApproved ? (
            <p>See the brokerage notices page for licensing details.</p>
          ) : (
            <>
              <p>
                New York requires marketing material to identify the brokerage
                and the agent&rsquo;s licensed title. Those details have not been
                confirmed for this site yet, so they are not printed anywhere on
                it.
              </p>
              <p>
                That is a deliberate gap rather than an oversight. A licence
                number or a brokerage name is the kind of claim that has to be
                right, and there is no version of &ldquo;approximately
                right&rdquo; that is acceptable.
              </p>
              <p>
                <Link
                  href="/brokerage-notices/"
                  className="font-semibold text-action-ink underline underline-offset-4 hover:text-ink"
                >
                  What is outstanding, in full
                </Link>
              </p>
            </>
          )}
        </div>
      </Section>

      <Section id="contact" tone="ink">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            index="04"
            eyebrow="Next"
            tone="paper"
            title="Start with a straight answer."
            standfirst="If the answer is that you should wait, that is the answer you will get."
          />
          <ContactActions tone="paper" />
        </div>
      </Section>

      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about/" },
          ]),
        ]}
      />
    </>
  );
}
