import Link from "next/link";

import { PlanMyMove } from "@/components/contact/PlanMyMoveButton";
import { Hero } from "@/components/home/Hero";
import { IndexRail, type RailSection } from "@/components/layout/IndexRail";
import { Section, SectionHeading } from "@/components/primitives/Typography";
import { ProofStoryCard } from "@/components/proof/ProofStory";
import { BuyerSeries } from "@/components/video/BuyerSeries";
import { VideoCard } from "@/components/video/VideoCard";
import { SourceLink, VideoFrame } from "@/components/video/VideoFrame";
import { decisionRail, intentRoutes, sellerFaq } from "@/content/editorial";
import { proofStories } from "@/content/proof";
import { buyerSeries, getVideo, propertyFilms } from "@/content/videos";
import { JsonLd, absoluteUrl, breadcrumbSchema } from "@/lib/seo";

const RAIL: RailSection[] = [
  { id: "hero", label: "Opening", tone: "ink" },
  { id: "decide", label: "Where to start", tone: "paper" },
  { id: "budget", label: "What a budget buys", tone: "paper" },
  { id: "first-home", label: "First home", tone: "ink" },
  { id: "films", label: "Property films", tone: "ink" },
  { id: "proof", label: "The receipts", tone: "paper" },
  { id: "sell", label: "Before you list", tone: "paper" },
  { id: "plan", label: "Plan the move", tone: "ink" },
];

export default function HomePage() {
  const budgetVideo = getVideo("budget-500k");
  const sellerVideo = getVideo("seller-questions");

  return (
    <>
      <IndexRail sections={RAIL} />

      <Hero />

      {/* 01 — Decision rail ---------------------------------------------------- */}
      <Section id="decide" tone="paper">
        <SectionHeading
          index="01"
          eyebrow="Where to start"
          title="What do you need to understand first?"
          standfirst="Four entry points. Pick the one that matches the decision actually in front of you."
        />

        <ul className="mt-12 grid gap-px overflow-hidden rounded-card border border-gray-300 bg-gray-300 sm:grid-cols-2 lg:grid-cols-4">
          {decisionRail.map((item) => (
            <li key={item.index} className="bg-paper">
              <Link
                href={item.href}
                className="group flex h-full flex-col gap-4 p-6 transition-colors duration-[--duration-fast] hover:bg-white"
              >
                <span className="tabular font-data text-caption tracking-[0.16em] text-action-ink uppercase">
                  {item.index}
                </span>
                <span className="font-display text-heading-md text-balance text-ink">
                  {item.label}
                </span>
                <span className="text-body text-pretty text-gray-600">
                  {item.body}
                </span>
                <span className="mt-auto inline-flex items-center gap-2 pt-2 font-semibold text-action-ink underline underline-offset-4">
                  {item.action}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-[--duration-fast] group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* 02 — What a budget buys ------------------------------------------------ */}
      <Section id="budget" tone="quiet">
        <div className="grid gap-10 lg:grid-cols-[20rem_1fr] lg:items-center lg:gap-16">
          {budgetVideo ? (
            <div className="flex flex-col gap-3 lg:max-w-sm">
              <VideoFrame video={budgetVideo} />
              <SourceLink video={budgetVideo} />
            </div>
          ) : null}

          <div className="flex flex-col gap-8">
            <SectionHeading
              index="02"
              eyebrow="Market decisions"
              title="What does $500K actually buy?"
              standfirst="Skip the generic calculator. See the kind of property, the location, and the tradeoffs a real budget produces — then work out your own range from something concrete."
            />
            <div>
              <Link
                href="/buy/budget/"
                className="inline-flex min-h-11 items-center gap-2 rounded-button bg-ink px-7 py-4 text-body-lg font-semibold text-paper transition-colors hover:bg-action-dark"
              >
                Build my buying range
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* 03 — First-time buyer sequence ----------------------------------------- */}
      <Section id="first-home" tone="ink">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <SectionHeading
              index="03"
              eyebrow="First home"
              tone="paper"
              title={
                <>
                  Five moves between{" "}
                  <span className="text-signal">“I want a home”</span> and
                  closing.
                </>
              }
              standfirst="Watch the sequence in order. Leave with the next action, not five more tabs to research."
            />
            <div>
              <Link
                href="/buy/first-home/"
                className="inline-flex min-h-11 items-center gap-2 rounded-button bg-signal px-7 py-4 text-body-lg font-semibold text-ink transition-colors hover:bg-white"
              >
                Start part one
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <BuyerSeries episodes={buyerSeries} tone="paper" />
        </div>
      </Section>

      {/* 04 — Property films ----------------------------------------------------- */}
      <Section id="films" tone="ink" className="border-t border-ink-rule">
        <SectionHeading
          index="04"
          eyebrow="Property films"
          tone="paper"
          title="Do not just list the house. Make people feel it."
          standfirst="High-energy property films built to stop attention and show the property with intent — not twelve photographs and a floor plan."
        />

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {propertyFilms.map((film) => (
            <li key={film.slug}>
              <VideoCard video={film} tone="paper" />
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/properties/"
            className="inline-flex min-h-11 items-center gap-2 rounded-button border border-ink-rule px-7 py-4 text-body-lg font-semibold text-paper transition-colors hover:border-signal hover:text-signal"
          >
            See the properties
          </Link>
          <Link
            href="/sell/"
            className="inline-flex min-h-11 items-center gap-2 rounded-button bg-signal px-7 py-4 text-body-lg font-semibold text-ink transition-colors hover:bg-white"
          >
            Market my property like this
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Section>

      {/* 05 — Proof -------------------------------------------------------------- */}
      <Section id="proof" tone="paper">
        <SectionHeading
          index="05"
          eyebrow="The receipts"
          title="The result is the receipt."
          standfirst="Exact properties. Real constraints. Clients explaining, in their own words, what changed the outcome."
        />

        <ul className="mt-12 grid gap-8 lg:grid-cols-3">
          {proofStories.map((story) => (
            <li key={story.slug} className="flex">
              <ProofStoryCard story={story} className="w-full" />
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <Link
            href="/results/"
            className="inline-flex min-h-11 items-center gap-2 rounded-button bg-ink px-7 py-4 text-body-lg font-semibold text-paper transition-colors hover:bg-action-dark"
          >
            See the proof in full
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Section>

      {/* 06 — Seller questions ---------------------------------------------------- */}
      <Section id="sell" tone="quiet">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <SectionHeading
              index="06"
              eyebrow="Selling"
              title="Before you list, ask better questions."
              standfirst="Pricing, preparation, timing, marketing, offers, and the next move all change the outcome. Most of them get decided by default."
            />

            <ul className="flex flex-col">
              {sellerFaq.slice(0, 4).map((item, index) => (
                <li
                  key={item.question}
                  className="flex gap-4 border-t border-gray-300 py-4"
                >
                  <span className="tabular font-data text-caption text-action-ink">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-body-lg text-pretty text-ink">
                    {item.question}
                  </span>
                </li>
              ))}
            </ul>

            <div>
              <Link
                href="/sell/"
                className="inline-flex min-h-11 items-center gap-2 rounded-button bg-ink px-7 py-4 text-body-lg font-semibold text-paper transition-colors hover:bg-action-dark"
              >
                Get a seller plan
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {sellerVideo ? (
            <div
              className="flex flex-col gap-3 lg:max-w-sm lg:justify-self-end"
            >
              <VideoFrame video={sellerVideo} />
              <SourceLink video={sellerVideo} />
            </div>
          ) : null}
        </div>
      </Section>

      {/* 07 — Closing -------------------------------------------------------------- */}
      <Section id="plan" tone="ink">
        <SectionHeading
          index="07"
          eyebrow="Next"
          tone="paper"
          title="Make the next move with a plan."
          standfirst="Buy, sell, do both, or get clear before deciding. Say which one and the conversation starts in the right place."
        />

        <ul className="mt-12 grid gap-px overflow-hidden rounded-card border border-ink-rule bg-ink-rule sm:grid-cols-2 lg:grid-cols-4">
          {intentRoutes.map((route) => (
            <li key={route.label} className="bg-ink">
              <Link
                href={route.href}
                className="group flex h-full flex-col gap-3 p-6 transition-colors duration-[--duration-fast] hover:bg-white/[0.05]"
              >
                <span className="font-display text-heading-md text-paper">
                  {route.label}
                </span>
                <span className="text-body text-pretty text-ink-muted">
                  {route.body}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-auto pt-2 text-signal transition-transform duration-[--duration-fast] group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-4">
          <PlanMyMove variant="onInk" size="lg" className="self-start" />
          <p className="max-w-reading text-caption text-ink-muted">
            There is no form on this website. No account, no submission, no data
            collected. Contact goes straight to a phone call, a text, or an
            email that you write and send yourself.
          </p>
        </div>
      </Section>

      <JsonLd
        graph={[
          breadcrumbSchema([{ name: "Home", path: "/" }]),
          {
            "@type": "WebSite",
            "@id": absoluteUrl("/#website"),
            url: absoluteUrl("/"),
            name: "Sharif Abdelkader — New York Real Estate",
            inLanguage: "en-US",
          },
        ]}
      />
    </>
  );
}
