import Link from "next/link";
import type { ReactNode } from "react";

import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/primitives/Typography";
import { pad2 } from "@/lib/utils";

export type NoticeBlock = {
  heading: string;
  /** Paragraphs. Strings render as `<p>`; arrays render as a bulleted list. */
  body: (string | string[])[];
};

/**
 * Shared shell for the notice pages: accessibility, privacy, fair housing,
 * legal, and brokerage.
 *
 * These pages are legally significant and are treated as first-class content
 * rather than dumped into a small-print footer. Same slate hero, same reading
 * width, same numbering — so a visitor who lands here from a footer link is
 * still recognisably on the same site.
 */
export function NoticePage({
  index,
  eyebrow,
  title,
  standfirst,
  lastReviewed,
  blocks,
  children,
}: {
  index: string;
  eyebrow: string;
  title: string;
  standfirst: string;
  lastReviewed: string;
  blocks: NoticeBlock[];
  children?: ReactNode;
}) {
  return (
    <>
      <PageHero
        index={index}
        eyebrow={eyebrow}
        title={title}
        standfirst={standfirst}
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: eyebrow, href: "#" },
        ]}
        meta={[
          { label: "Last reviewed", value: lastReviewed },
          { label: "Status", value: "Awaiting business approval" },
        ]}
      />

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
          <nav
            aria-label="On this page"
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <h2 className="mb-3 font-data text-caption tracking-[0.16em] text-gray-600 uppercase">
              On this page
            </h2>
            <ol className="flex flex-col">
              {blocks.map((block, i) => (
                <li key={block.heading}>
                  <a
                    href={`#${slugify(block.heading)}`}
                    className="flex min-h-11 items-center gap-3 text-body text-gray-600 underline-offset-4 hover:text-ink hover:underline"
                  >
                    <span className="tabular font-data text-caption text-action-ink">
                      {pad2(i + 1)}
                    </span>
                    {block.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex max-w-reading flex-col gap-12">
            {blocks.map((block, i) => (
              <section
                key={block.heading}
                id={slugify(block.heading)}
                className="flex scroll-mt-28 flex-col gap-4"
              >
                <p className="flex items-center gap-3 font-data text-caption tracking-[0.16em] text-gray-600 uppercase">
                  <span aria-hidden="true" className="tabular text-action-ink">
                    {pad2(i + 1)}
                  </span>
                  <span aria-hidden="true" className="h-px w-6 bg-gray-300" />
                </p>
                <h2 className="font-display text-heading-lg text-balance">
                  {block.heading}
                </h2>
                {block.body.map((item, index) =>
                  Array.isArray(item) ? (
                    <ul key={index} className="flex list-disc flex-col gap-2 pl-5">
                      {item.map((entry) => (
                        <li
                          key={entry}
                          className="text-body-lg text-pretty text-ink/85"
                        >
                          {entry}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p
                      key={index}
                      className="text-body-lg text-pretty text-ink/85"
                    >
                      {item}
                    </p>
                  ),
                )}
              </section>
            ))}

            {children}

            <p className="border-t border-gray-300 pt-6 text-body text-gray-600">
              Questions about anything on this page?{" "}
              <Link
                href="/contact/"
                className="font-semibold text-action-ink underline underline-offset-4 hover:text-ink"
              >
                Get in touch
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
