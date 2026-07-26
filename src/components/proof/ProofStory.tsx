import Link from "next/link";

import { Badge, Price, StarRating, VerificationNote } from "@/components/primitives/Data";
import type { ProofStory } from "@/lib/schema";
import { cn, withBasePath } from "@/lib/utils";

const TYPE_LABELS: Record<ProofStory["transactionType"], string> = {
  buyer: "Buyer represented",
  seller: "Seller represented",
  "sell-and-buy": "Sold and bought",
};

/**
 * The Receipt.
 *
 * The sale price is the visual anchor, but it never appears alone — `docs/01`
 * requires every proof story to carry the outcome, the property, Sharif's role,
 * a client excerpt, the capability demonstrated, and source attribution. A big
 * number with no scope is exactly the unverifiable claim the brand strategy
 * rules out.
 *
 * The client's words are HTML. The screenshot sits behind a disclosure, per
 * `docs/02`: "Display the short excerpt as HTML. Place the original screenshot
 * behind a 'View source review' disclosure rather than using it as the readable
 * interface."
 */
export function ProofStoryCard({
  story,
  tone = "ink",
  className,
  headingLevel: Heading = "h3",
}: {
  story: ProofStory;
  tone?: "ink" | "paper";
  className?: string;
  headingLevel?: "h2" | "h3";
}) {
  const { property, outcome } = story;

  return (
    <article
      className={cn(
        "flex min-w-0 flex-col gap-6 rounded-card border p-6 lg:p-8",
        tone === "ink"
          ? "border-gray-300 bg-white"
          : "border-ink-rule bg-white/[0.03]",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={tone === "ink" ? "sold" : "onInk"}>
          {TYPE_LABELS[story.transactionType]}
        </Badge>
        {outcome.acceptedOfferPercentOfList ? (
          <Badge tone="signal">
            {outcome.acceptedOfferPercentOfList}% of list
          </Badge>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Price
          label={outcome.label}
          amount={outcome.amount}
          tone={tone}
          size="lg"
        />
        <p
          className={cn(
            "font-data text-body",
            tone === "ink" ? "text-gray-600" : "text-ink-muted",
          )}
        >
          {property.address}, {property.city}, {property.state}{" "}
          {property.postalCode}
        </p>
        {outcome.acceptedOfferTiming ? (
          <p
            className={cn(
              "text-caption",
              tone === "ink" ? "text-gray-600" : "text-ink-muted",
            )}
          >
            {outcome.acceptedOfferTiming}
          </p>
        ) : null}
      </div>

      <Heading
        className={cn(
          "font-display text-heading-md text-balance",
          tone === "ink" ? "text-ink" : "text-paper",
        )}
      >
        {story.headline}
      </Heading>

      <blockquote
        className={cn(
          "border-l-2 pl-5 text-body-lg text-pretty italic",
          tone === "ink"
            ? "border-signal text-ink/85"
            : "border-signal text-ink-muted",
        )}
      >
        “{story.excerpt}”
      </blockquote>

      <ul className="flex flex-wrap gap-2">
        {story.capabilities.map((capability) => (
          <li key={capability}>
            <Badge tone={tone === "ink" ? "neutral" : "onInk"}>{capability}</Badge>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-4">
        <Link
          href={`/results/${story.slug}/`}
          className={cn(
            "inline-flex min-h-11 items-center gap-2 self-start font-semibold underline underline-offset-4",
            tone === "ink"
              ? "text-action-ink hover:text-ink"
              : "text-action-sky hover:text-signal",
          )}
        >
          Read the case study
          <span aria-hidden="true">→</span>
        </Link>

        <ReviewSourceDisclosure story={story} tone={tone} />
        <VerificationNote verification={story.verification} tone={tone} />
      </div>
    </article>
  );
}

/**
 * The original screenshot, behind a disclosure.
 *
 * Kept in a `<details>` so nobody is *required* to read text inside an image to
 * get the content — the readable version is already above — while the source
 * remains one click away for anyone who wants to check it. The image is lazy,
 * carries explicit dimensions to reserve layout, and its `alt` describes what
 * the image is rather than repeating the quote that is already in the DOM.
 */
export function ReviewSourceDisclosure({
  story,
  tone = "ink",
}: {
  story: ProofStory;
  tone?: "ink" | "paper";
}) {
  return (
    <details className="group">
      <summary
        className={cn(
          "flex min-h-11 cursor-pointer list-none items-center gap-2 font-data text-caption tracking-[0.1em] uppercase",
          tone === "ink"
            ? "text-gray-600 hover:text-ink"
            : "text-ink-muted hover:text-paper",
        )}
      >
        <span
          aria-hidden="true"
          className="transition-transform duration-[--duration-fast] group-open:rotate-90"
        >
          ▸
        </span>
        View source review
      </summary>

      <div className="mt-4 flex flex-col gap-4">
        {story.ratings.length > 0 ? (
          <div
            className={cn(
              "flex flex-col gap-2 rounded-card border p-4",
              tone === "ink" ? "border-gray-300" : "border-ink-rule",
            )}
          >
            <p
              className={cn(
                "font-data text-caption tracking-[0.1em] uppercase",
                tone === "ink" ? "text-gray-600" : "text-ink-muted",
              )}
            >
              Ratings in the source review
            </p>
            {story.ratings.map((rating) => (
              <StarRating key={rating.label} {...rating} tone={tone} />
            ))}
          </div>
        ) : null}

        {/*
          A plain `<img>`, not `next/image`.

          The static export sets `images.unoptimized: true`, so `next/image`
          performs no resizing, no format negotiation, and no srcset generation
          here — it renders an `<img>` with the same `src`. What it does do is
          pull a client component into the bundle on every page that shows a
          proof story. Explicit dimensions reserve the layout box just as well,
          and `loading="lazy"` keeps it off the initial load, which matters
          because this sits inside a closed disclosure.
        */}
        <img
          src={withBasePath(story.sourceAsset)}
          alt={`Screenshot of the original published client review for ${story.property.address}. The full text is transcribed above.`}
          width={story.sourceAssetWidth}
          height={story.sourceAssetHeight}
          loading="lazy"
          decoding="async"
          className="h-auto w-full max-w-md rounded-card border border-gray-300"
        />

        <p
          className={cn(
            "max-w-reading text-caption",
            tone === "ink" ? "text-gray-600" : "text-ink-muted",
          )}
        >
          {story.sourceNote}
        </p>
      </div>
    </details>
  );
}
