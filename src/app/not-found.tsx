import Link from "next/link";

import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/primitives/Typography";

const DESTINATIONS = [
  { href: "/buy/", label: "Buying", body: "Start with the range, not the listings." },
  { href: "/sell/", label: "Selling", body: "Start with the price and the preparation." },
  { href: "/results/", label: "Results", body: "Three documented transactions." },
  { href: "/videos/", label: "Film library", body: "Everything, by decision." },
] as const;

export default function NotFound() {
  return (
    <>
      <PageHero
        index="404"
        eyebrow="Page not found"
        title="That page is not here."
        standfirst="Either the address is wrong or the page has moved. Nothing is broken — here is where most people were heading."
      />

      <Section tone="paper">
        <SectionHeading
          index="01"
          eyebrow="Try one of these"
          title="Where to go instead."
        />
        <ul className="mt-10 grid gap-px overflow-hidden rounded-card border border-gray-300 bg-gray-300 sm:grid-cols-2 lg:grid-cols-4">
          {DESTINATIONS.map((item) => (
            <li key={item.href} className="bg-white">
              <Link
                href={item.href}
                className="group flex h-full flex-col gap-3 p-6 transition-colors hover:bg-gray-100"
              >
                <span className="font-display text-heading-md text-ink">
                  {item.label}
                </span>
                <span className="text-body text-pretty text-gray-600">
                  {item.body}
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
    </>
  );
}
