import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The call-sheet index label. Mono, uppercase, letter-spaced, always paired
 * with a real heading. `docs/04`: "Use uppercase only for labels under 24
 * characters."
 */
export function IndexLabel({
  index,
  children,
  className,
  tone = "ink",
}: {
  index?: string;
  children: ReactNode;
  className?: string;
  tone?: "ink" | "paper";
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-data text-caption font-medium tracking-[0.18em] uppercase",
        tone === "ink" ? "text-gray-600" : "text-ink-muted",
        className,
      )}
    >
      {index ? (
        <span
          aria-hidden="true"
          className={cn(
            "tabular",
            tone === "ink" ? "text-action-ink" : "text-signal",
          )}
        >
          {index}
        </span>
      ) : null}
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-6 shrink-0",
          tone === "ink" ? "bg-gray-300" : "bg-ink-rule",
        )}
      />
      <span>{children}</span>
    </p>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  standfirst,
  tone = "ink",
  as: Tag = "h2",
  className,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  standfirst?: ReactNode;
  tone?: "ink" | "paper";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={cn("flex max-w-[52rem] flex-col gap-5", className)}>
      <IndexLabel index={index} tone={tone}>
        {eyebrow}
      </IndexLabel>
      <Tag
        className={cn(
          "font-display text-heading-xl text-balance",
          tone === "ink" ? "text-ink" : "text-paper",
        )}
      >
        {title}
      </Tag>
      {standfirst ? (
        <p
          className={cn(
            "max-w-reading text-body-lg text-pretty",
            tone === "ink" ? "text-gray-600" : "text-ink-muted",
          )}
        >
          {standfirst}
        </p>
      ) : null}
    </div>
  );
}

/** Constrained reading column. Max 45rem, per `docs/04` §Grid and spacing. */
export function Prose({
  children,
  tone = "ink",
  className,
}: {
  children: ReactNode;
  tone?: "ink" | "paper";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex max-w-reading flex-col gap-5 text-body-lg text-pretty",
        tone === "ink" ? "text-ink/85" : "text-ink-muted",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Section wrapper. Owns vertical rhythm (72px mobile, 112–160px desktop) and
 * the surface switch between paper and ink, so no page hand-rolls either.
 */
export function Section({
  id,
  tone = "paper",
  children,
  className,
  bleed = false,
}: {
  id?: string;
  tone?: "paper" | "ink" | "quiet";
  children: ReactNode;
  className?: string;
  /** Skips the inner max-width container for full-bleed media sections. */
  bleed?: boolean;
}) {
  const surfaces = {
    paper: "bg-paper text-ink",
    quiet: "bg-gray-100 text-ink",
    ink: "on-ink bg-ink text-paper",
  } as const;

  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-18 lg:py-32",
        surfaces[tone],
        className,
      )}
    >
      {bleed ? (
        children
      ) : (
        <div className="page-gutter mx-auto w-full max-w-page">{children}</div>
      )}
    </section>
  );
}
