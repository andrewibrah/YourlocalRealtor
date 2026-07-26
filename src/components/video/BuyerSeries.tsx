"use client";

import Link from "next/link";
import { useEffect } from "react";

import type { Video } from "@/lib/schema";
import { cn, pad2 } from "@/lib/utils";

import { useSeriesProgress } from "./seriesProgress";

/**
 * Buyer Runway — the five-part sequence as a guided runway rather than a
 * playlist.
 *
 * Layout follows `docs/02`: a vertical stepper on mobile, a split on desktop.
 * The yellow marker shows position; the checkmark and the "Opened" text carry
 * the same information without relying on colour.
 */
export function BuyerSeries({
  episodes,
  tone = "ink",
}: {
  episodes: Video[];
  tone?: "ink" | "paper";
}) {
  const { visited, ready, reset } = useSeriesProgress();
  const done = episodes.filter((episode) => visited.includes(episode.slug)).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p
          className={cn(
            "font-data text-caption tracking-[0.14em] uppercase",
            tone === "ink" ? "text-gray-600" : "text-ink-muted",
          )}
        >
          {ready ? (
            <>
              <span className="tabular">
                {pad2(done)} / {pad2(episodes.length)}
              </span>{" "}
              opened on this device
            </>
          ) : (
            <>Progress is stored on this device only</>
          )}
        </p>

        {ready && done > 0 ? (
          <button
            type="button"
            onClick={reset}
            className={cn(
              "min-h-11 font-data text-caption tracking-[0.1em] uppercase underline underline-offset-4",
              tone === "ink"
                ? "text-gray-600 hover:text-ink"
                : "text-ink-muted hover:text-paper",
            )}
          >
            Clear progress
          </button>
        ) : null}
      </div>

      {/* Progress bar. Decorative — the count above is the accessible source. */}
      <div
        aria-hidden="true"
        className={cn(
          "flex h-1 gap-1",
          tone === "ink" ? "bg-transparent" : "bg-transparent",
        )}
      >
        {episodes.map((episode) => (
          <span
            key={episode.slug}
            className={cn(
              "h-full flex-1 rounded-pill transition-colors duration-[--duration-standard]",
              visited.includes(episode.slug)
                ? "bg-signal"
                : tone === "ink"
                  ? "bg-gray-300"
                  : "bg-ink-rule",
            )}
          />
        ))}
      </div>

      <ol className="flex flex-col">
        {episodes.map((episode) => {
          const opened = visited.includes(episode.slug);

          return (
            <li key={episode.slug}>
              <Link
                href={`/videos/${episode.slug}/`}
                className={cn(
                  "group flex items-start gap-5 border-t py-6 transition-colors duration-[--duration-fast]",
                  tone === "ink"
                    ? "border-gray-300 hover:bg-white"
                    : "border-ink-rule hover:bg-white/[0.04]",
                )}
              >
                <span
                  className={cn(
                    "tabular mt-1 flex size-11 shrink-0 items-center justify-center rounded-pill font-data text-caption font-semibold",
                    opened
                      ? "bg-signal text-ink"
                      : tone === "ink"
                        ? "bg-gray-100 text-gray-600"
                        : "bg-white/5 text-ink-muted",
                  )}
                >
                  {pad2(episode.episode ?? 0)}
                </span>

                <span className="flex min-w-0 flex-col gap-1">
                  <span
                    className={cn(
                      "font-display text-heading-md text-balance transition-colors",
                      tone === "ink"
                        ? "text-ink group-hover:text-action-ink"
                        : "text-paper group-hover:text-signal",
                    )}
                  >
                    {episode.topic}
                  </span>
                  <span
                    className={cn(
                      "text-body text-pretty",
                      tone === "ink" ? "text-gray-600" : "text-ink-muted",
                    )}
                  >
                    {episode.outcome}
                  </span>
                  {opened ? (
                    <span
                      className={cn(
                        "font-data text-caption tracking-[0.1em] uppercase",
                        tone === "ink" ? "text-success" : "text-signal",
                      )}
                    >
                      ✓ Opened
                    </span>
                  ) : null}
                </span>

                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-2 ml-auto shrink-0 transition-transform duration-[--duration-fast] group-hover:translate-x-1",
                    tone === "ink" ? "text-gray-600" : "text-ink-muted",
                  )}
                >
                  →
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/**
 * Records that an episode was opened. Rendered on the video detail page.
 * Produces no UI.
 */
export function MarkSeriesStep({ slug }: { slug: string }) {
  const { markVisited } = useSeriesProgress();

  useEffect(() => {
    markVisited(slug);
  }, [markVisited, slug]);

  return null;
}
