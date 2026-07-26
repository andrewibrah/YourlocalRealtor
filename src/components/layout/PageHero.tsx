import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Inner-page hero.
 *
 * Same slate grammar as the home hero — index, rule, promise line, optional
 * mono data strip — so every page reads as a page of the same call sheet rather
 * than a differently designed template.
 */
export function PageHero({
  index,
  eyebrow,
  title,
  standfirst,
  actions,
  meta,
  breadcrumb,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  standfirst?: ReactNode;
  actions?: ReactNode;
  meta?: { label: string; value: string }[];
  breadcrumb?: { name: string; href: string }[];
}) {
  return (
    <section className="on-ink bg-ink text-paper">
      <div className="page-gutter mx-auto w-full max-w-page">
        {breadcrumb && breadcrumb.length > 0 ? (
          <nav aria-label="Breadcrumb" className="pt-6">
            <ol className="flex flex-wrap items-center gap-2 font-data text-caption text-ink-muted">
              {breadcrumb.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  {index > 0 ? <span aria-hidden="true">/</span> : null}
                  <Link
                    href={crumb.href}
                    className="underline-offset-4 hover:text-signal hover:underline"
                  >
                    {crumb.name}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="flex flex-col gap-7 py-14 lg:py-20">
          <p className="flex items-center gap-3 font-data text-caption tracking-[0.2em] text-signal uppercase">
            <span aria-hidden="true" className="tabular">
              {index}
            </span>
            <span aria-hidden="true" className="h-px w-8 bg-ink-rule" />
            {eyebrow}
          </p>

          <h1 className="max-w-[18ch] font-display text-display-lg text-balance text-paper">
            {title}
          </h1>

          {standfirst ? (
            <p className="max-w-reading text-body-lg text-pretty text-ink-muted">
              {standfirst}
            </p>
          ) : null}

          {actions ? (
            <div className="flex flex-wrap items-center gap-3 pt-1">{actions}</div>
          ) : null}
        </div>

        {meta && meta.length > 0 ? (
          <dl
            className={cn(
              "grid grid-cols-2 gap-x-6 gap-y-6 border-t border-ink-rule py-6",
              meta.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
            )}
          >
            {meta.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <dt className="font-data text-caption tracking-[0.16em] text-ink-muted uppercase">
                  {item.label}
                </dt>
                <dd className="tabular font-data text-body-lg text-paper">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}

/** Shared link style for a primary CTA on an ink surface. */
export function InkCta({
  href,
  children,
  variant = "signal",
}: {
  href: string;
  children: ReactNode;
  variant?: "signal" | "outline";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-button px-7 py-4 text-body-lg font-semibold transition-colors duration-[--duration-fast]",
        variant === "signal"
          ? "bg-signal text-ink hover:bg-white"
          : "border border-ink-rule text-paper hover:border-signal hover:text-signal",
      )}
    >
      {children}
    </Link>
  );
}
