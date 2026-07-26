import type { Metadata } from "next";
import Link from "next/link";

import { ContactActions } from "@/components/contact/ContactActions";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/primitives/Typography";
import { intentRoutes } from "@/content/editorial";
import { JsonLd, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Call, text, or email directly. There is no form on this website, no account, and no data collected.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        index="12"
        eyebrow="Direct contact"
        title="Make the next move directly."
        standfirst="Choose the channel that works now. Nothing is submitted from this website — every option below hands control to an app you already have."
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact/" },
        ]}
        meta={[
          { label: "Forms on this site", value: "None" },
          { label: "Data collected", value: "None" },
          {
            label: "Channels live",
            value: siteConfig.hasLiveChannel ? "Yes" : "Pending approval",
          },
        ]}
      />

      <Section id="channels" tone="paper">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <SectionHeading
              index="01"
              eyebrow="Channels"
              title="Pick one."
              standfirst="Call for anything time-sensitive. Text if you want to send an address or a link. Email if you want a written record."
            />

            <div className="flex flex-col gap-4 text-body text-gray-600">
              <h2 className="font-display text-heading-md text-ink">
                What happens with what you send
              </h2>
              <p>
                Whatever you write goes from your phone or your email client
                straight to Sharif. It does not pass through this website, it is
                not stored here, and it is not logged anywhere by this site.
              </p>
              <p>
                Please do not send Social Security numbers, dates of birth,
                identity documents, tax returns, bank statements, account
                numbers, or credit reports. None of those are needed to start a
                conversation, and this site is not set up to receive them.
              </p>
              <p>
                <Link
                  href="/privacy/"
                  className="font-semibold text-action-ink underline underline-offset-4 hover:text-ink"
                >
                  Read the privacy notice
                </Link>
              </p>
            </div>
          </div>

          <ContactActions />
        </div>
      </Section>

      <Section id="intent" tone="quiet">
        <SectionHeading
          index="02"
          eyebrow="Not ready to call?"
          title="Start where you actually are."
        />
        <ul className="mt-10 grid gap-px overflow-hidden rounded-card border border-gray-300 bg-gray-300 sm:grid-cols-2 lg:grid-cols-4">
          {intentRoutes.map((route) => (
            <li key={route.label} className="bg-white">
              <Link
                href={route.href}
                className="group flex h-full flex-col gap-3 p-6 transition-colors hover:bg-gray-100"
              >
                <span className="font-display text-heading-md text-ink">
                  {route.label}
                </span>
                <span className="text-body text-pretty text-gray-600">
                  {route.body}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-auto pt-2 text-action-ink transition-transform duration-[--duration-fast] group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact/" },
          ]),
        ]}
      />
    </>
  );
}
