import type { ReactNode } from "react";

import { formatPrice } from "@/lib/format";
import type { Verification } from "@/lib/schema";
import { cn } from "@/lib/utils";

/**
 * Oversized price. `docs/04` visual principle 2: "Numbers are visual objects."
 *
 * The label is not decorative — a bare "$1,960,000" with no scope is exactly
 * the unscoped statistic `docs/01` warns against. Label and amount always ship
 * together.
 */
export function Price({
  label,
  amount,
  tone = "ink",
  size = "lg",
  className,
}: {
  label: string;
  amount: number;
  tone?: "ink" | "paper";
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <p className={cn("flex flex-col gap-1", className)}>
      <span
        className={cn(
          "font-data text-caption font-medium tracking-[0.16em] uppercase",
          tone === "ink" ? "text-gray-600" : "text-ink-muted",
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "tabular font-display leading-none",
          /*
           * A price is a single unbreakable token set at display scale. Under
           * heavy text zoom it cannot shrink, so it forced its grid cell to
           * ~1280px and pushed the whole page into horizontal scrolling.
           * Allowing a break keeps the number fully readable and lets the page
           * reflow — an unusual line break at 400% zoom is a far better outcome
           * than a horizontally scrolling page.
           */
          "[overflow-wrap:anywhere]",
          size === "lg" ? "text-display-lg" : "text-heading-xl",
          tone === "ink" ? "text-ink" : "text-paper",
        )}
      >
        {formatPrice(amount)}
      </span>
    </p>
  );
}

export function Stat({
  value,
  label,
  tone = "ink",
  className,
}: {
  value: string;
  label: string;
  tone?: "ink" | "paper";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span
        className={cn(
          "tabular font-display text-heading-lg leading-none",
          tone === "ink" ? "text-ink" : "text-signal",
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          "text-caption",
          tone === "ink" ? "text-gray-600" : "text-ink-muted",
        )}
      >
        {label}
      </span>
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "signal" | "sold" | "onInk";
  className?: string;
}) {
  const tones = {
    neutral: "border-gray-300 bg-white text-gray-600",
    signal: "border-signal bg-signal text-ink",
    sold: "border-success/30 bg-success/10 text-success-ink",
    onInk: "border-ink-rule bg-white/5 text-ink-muted",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border px-3 py-1",
        "font-data text-caption font-medium tracking-[0.1em] uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Star rating read from a source review.
 *
 * Rendered as text plus shapes, never shapes alone — the accessible name
 * carries the value so it does not depend on colour or glyph recognition.
 */
export function StarRating({
  label,
  stars,
  outOf,
  tone = "ink",
}: {
  label: string;
  stars: number;
  outOf: number;
  tone?: "ink" | "paper";
}) {
  return (
    <div className="flex min-w-0 flex-wrap items-center justify-between gap-x-4 gap-y-1">
      <span
        className={cn(
          "min-w-0 text-caption",
          tone === "ink" ? "text-gray-600" : "text-ink-muted",
        )}
      >
        {label}
      </span>
      <span className="flex shrink-0 items-center gap-1.5">
        <span aria-hidden="true" className="flex gap-0.5">
          {Array.from({ length: outOf }, (_, i) => (
            <span
              key={i}
              className={cn(
                "block size-2 rounded-full",
                i < stars
                  ? tone === "ink"
                    ? "bg-action"
                    : "bg-signal"
                  : tone === "ink"
                    ? "bg-gray-300"
                    : "bg-ink-rule",
              )}
            />
          ))}
        </span>
        <span
          className={cn(
            "tabular font-data text-caption",
            tone === "ink" ? "text-ink" : "text-paper",
          )}
        >
          {stars}/{outOf}
        </span>
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Verification                                                               */
/* -------------------------------------------------------------------------- */

const VERIFICATION_COPY: Record<Exclude<Verification, "verified">, string> = {
  "awaiting-master":
    "Awaiting the licensed master file. Topic is confirmed by the content owner; exact wording, length, and any property detail are not yet verified.",
  "public-index-only":
    "Confirmed from the published post title or caption only. The media itself has not been verified against a master file.",
  /*
   * Covers two sources that share the same status: a client review transcribed
   * from a supplied screenshot, and a film transcript generated from the
   * master's own audio. Both are transcriptions of supplied material awaiting
   * the same approval, so the wording names the class rather than assuming one
   * — the earlier copy said "review screenshot" and appeared, wrongly, under
   * every video on the site.
   */
  "awaiting-approval":
    "Transcribed from supplied source material — a client review or the film's own audio — and awaiting written approval plus confirmation of the details.",
};

const VERIFICATION_SHORT: Record<Exclude<Verification, "verified">, string> = {
  "awaiting-master": "Pending master",
  "public-index-only": "Indexed source",
  "awaiting-approval": "Pending approval",
};

/**
 * The provisional marker.
 *
 * `sharif-site-definition/AGENTS.md` requires unresolved verification state to
 * be visibly tracked and to never become a public factual claim. This is how
 * that shows up in the interface: quietly, in mono, next to the claim it
 * qualifies — not as a warning banner, and not hidden either.
 *
 * Renders nothing for `verified` content, so removing these markers is a
 * content-approval action, not a code change.
 */
export function VerificationNote({
  verification,
  tone = "ink",
  variant = "inline",
  className,
}: {
  verification: Verification;
  tone?: "ink" | "paper";
  variant?: "inline" | "block";
  className?: string;
}) {
  if (verification === "verified") return null;

  if (variant === "inline") {
    return (
      <p
        className={cn(
          "font-data text-caption tracking-[0.08em] uppercase",
          tone === "ink" ? "text-warning-ink" : "text-signal",
          className,
        )}
      >
        <span aria-hidden="true">◦ </span>
        {VERIFICATION_SHORT[verification]}
      </p>
    );
  }

  return (
    <p
      className={cn(
        "border-l-2 py-1 pl-4 text-caption",
        tone === "ink"
          ? "border-warning/50 text-gray-600"
          : "border-signal/50 text-ink-muted",
        className,
      )}
    >
      <span className="font-data tracking-[0.08em] uppercase">
        {VERIFICATION_SHORT[verification]}
      </span>{" "}
      — {VERIFICATION_COPY[verification]}
    </p>
  );
}
