import Link from "next/link";

import { PlanMyMove } from "@/components/contact/PlanMyMoveButton";
import { siteConfig } from "@/lib/site-config";

import { NavLinks } from "./NavLinks";

/**
 * Global header.
 *
 * Ink throughout, so it merges into the hero slate at the top of the page and
 * reads as a fixed strip over the paper sections below — the same relationship
 * a slate has to the footage it precedes.
 */
export function GlobalHeader() {
  return (
    <header className="on-ink sticky top-0 z-40 border-b border-ink-rule bg-ink">
      <div className="page-gutter mx-auto flex w-full max-w-page flex-col">
        <div className="flex items-center justify-between gap-4 py-3">
          <Link
            href="/"
            className="flex flex-col leading-none no-underline"
            aria-label={`${siteConfig.name} — home`}
          >
            <span className="font-display text-body-lg font-extrabold tracking-tight text-paper">
              Sharif Abdelkader
            </span>
            <span className="font-data text-caption tracking-[0.22em] text-ink-muted uppercase">
              {siteConfig.coverage.join(" · ")} · NY
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <NavLinks variant="desktop" />
          </nav>

          <PlanMyMove variant="onInk" size="md" className="hidden lg:inline-flex" />
        </div>

        <nav aria-label="Primary" className="lg:hidden">
          <NavLinks variant="strip" />
        </nav>
      </div>
    </header>
  );
}
