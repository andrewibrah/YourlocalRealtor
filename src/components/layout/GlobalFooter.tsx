import Link from "next/link";

import { areas } from "@/content/areas";
import {
  brokerage,
  brokerageIsApproved,
  brokerageIsIdentified,
  siteConfig,
  telHref,
} from "@/lib/site-config";

const COLUMNS = [
  {
    heading: "Buy",
    links: [
      { href: "/buy/", label: "Buying overview" },
      { href: "/buy/first-home/", label: "First-home series" },
      { href: "/buy/budget/", label: "What a budget buys" },
      { href: "/buy/buy-vs-rent/", label: "Buy or rent" },
    ],
  },
  {
    heading: "Sell",
    links: [
      { href: "/sell/", label: "Selling overview" },
      { href: "/results/", label: "Results" },
      { href: "/properties/", label: "Properties" },
      { href: "/videos/", label: "Film library" },
    ],
  },
  {
    heading: "About",
    links: [
      { href: "/about/", label: "How Sharif works" },
      { href: "/contact/", label: "Contact" },
      ...areas.map((area) => ({
        href: `/areas/${area.slug}/`,
        label: area.name,
      })),
    ],
  },
  {
    heading: "Notices",
    links: [
      { href: "/fair-housing/", label: "Fair housing" },
      { href: "/brokerage-notices/", label: "Brokerage notices" },
      { href: "/accessibility/", label: "Accessibility" },
      { href: "/privacy/", label: "Privacy" },
      { href: "/legal/", label: "Legal" },
    ],
  },
] as const;

export function GlobalFooter() {
  return (
    <footer className="on-ink border-t border-ink-rule bg-ink text-paper">
      <div className="page-gutter mx-auto flex w-full max-w-page flex-col gap-12 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="flex flex-col gap-4">
            <p className="font-display text-heading-md text-paper">
              Sharif Abdelkader
            </p>
            <p className="max-w-[32ch] text-body text-ink-muted">
              Straight answers, serious property films, and hands-on
              representation for New York buyers and sellers.
            </p>
            <p className="font-data text-caption tracking-[0.16em] text-signal uppercase">
              {siteConfig.coverage.join(" · ")}
            </p>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="mb-3 font-data text-caption tracking-[0.16em] text-ink-muted uppercase">
                {column.heading}
              </h2>
              <ul className="flex flex-col">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex min-h-11 items-center text-body text-paper transition-colors hover:text-signal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Regulatory block. ------------------------------------------------ */}
        <div className="flex flex-col gap-6 border-t border-ink-rule pt-8">
          <div className="flex flex-col gap-3">
            <h2 className="font-data text-caption tracking-[0.16em] text-ink-muted uppercase">
              Brokerage and licensing
            </h2>
            {brokerageIsIdentified ? (
              <address className="max-w-reading text-body text-ink-muted not-italic">
                <span className="font-semibold text-paper">
                  {brokerage.licensedTitle
                    ? `${brokerage.licensedTitle}, `
                    : null}
                  {brokerage.name}
                </span>
                {brokerage.licenseNumber ? (
                  <>
                    <br />
                    Licence {brokerage.licenseNumber}
                  </>
                ) : null}
                {brokerage.officeAddress ? (
                  <>
                    <br />
                    {brokerage.officeAddress}
                  </>
                ) : null}
                {telHref ? (
                  <>
                    <br />
                    <a
                      href={telHref}
                      className="text-action-sky underline underline-offset-4 hover:text-signal"
                    >
                      {siteConfig.contact.phone.status === "configured"
                        ? siteConfig.contact.phone.display
                        : null}
                    </a>
                  </>
                ) : null}
              </address>
            ) : null}

            {!brokerageIsApproved ? (
              /*
               * The firm is identified, but New York also requires the
               * licensee's title — and that has not been supplied. Stating the
               * gap is the correct behaviour: an approximated licence line is a
               * regulatory problem, not a copy problem.
               */
              <p className="max-w-reading text-caption text-ink-muted">
                <span className="font-data tracking-[0.1em] text-signal uppercase">
                  Pending —{" "}
                </span>
                the licensed title and licence number required on New York
                real-estate advertising have not been confirmed and are not
                stated here. See{" "}
                <Link
                  href="/brokerage-notices/"
                  className="text-action-sky underline underline-offset-4 hover:text-signal"
                >
                  brokerage notices
                </Link>
                .
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-data text-caption tracking-[0.16em] text-ink-muted uppercase">
              Equal housing opportunity
            </h2>
            <p className="max-w-reading text-body text-ink-muted">
              All real-estate services described here are offered without regard
              to race, colour, religion, sex, disability, familial status,
              national origin, or any other class protected by federal, New York
              State, or New York City law. Read the{" "}
              <Link
                href="/fair-housing/"
                className="text-action-sky underline underline-offset-4 hover:text-signal"
              >
                fair-housing notice
              </Link>
              .
            </p>
          </div>

          <p className="max-w-reading text-caption text-ink-muted">
            Nothing on this website is an offer to sell, a representation that a
            property is currently available, a licensed listing search service,
            or mortgage, legal, or tax advice. Properties shown are documented
            past work or marketing films.
          </p>
        </div>

        <p className="font-data text-caption text-ink-muted">
          © {new Date().getFullYear()} {siteConfig.name}. This site collects no
          visitor data.
        </p>
      </div>
    </footer>
  );
}
