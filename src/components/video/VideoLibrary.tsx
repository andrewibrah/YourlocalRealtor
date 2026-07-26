"use client";

import { useMemo, useState } from "react";

import { VIDEO_FILTERS } from "@/content/video-taxonomy";
import type { Video } from "@/lib/schema";
import { cn } from "@/lib/utils";

import { VideoCard } from "./VideoCard";

/**
 * Filterable library.
 *
 * The default state is "everything", and it is server-rendered. With
 * JavaScript disabled the full library is still on the page and every video is
 * still reachable — the filter is an enhancement that narrows a list, never a
 * gate that hides content behind a script.
 *
 * Filters are a radio group in behaviour, so they are marked up as one: a
 * `role="group"` of buttons carrying `aria-pressed`, with a live count so the
 * result of pressing one is announced rather than only visible.
 */
export function VideoLibrary({ videos }: { videos: Video[] }) {
  const [filter, setFilter] = useState<string>("all");

  const visible = useMemo(
    () =>
      filter === "all"
        ? videos
        : videos.filter((video) => video.category === filter),
    [filter, videos],
  );

  return (
    <div className="flex flex-col gap-10">
      <div
        role="group"
        aria-label="Filter the library by topic"
        className="-mx-1 flex flex-wrap gap-2"
      >
        {VIDEO_FILTERS.map((option) => {
          const active = filter === option.id;
          const count =
            option.id === "all"
              ? videos.length
              : videos.filter((video) => video.category === option.id).length;

          if (count === 0) return null;

          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(option.id)}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 rounded-pill border px-4",
                "font-data text-caption tracking-[0.12em] uppercase",
                "transition-colors duration-[--duration-fast]",
                active
                  ? "border-ink bg-ink text-paper"
                  : "border-gray-300 bg-white text-gray-600 hover:border-ink hover:text-ink",
              )}
            >
              {option.label}
              <span className="tabular opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="font-data text-caption text-gray-600">
        Showing <span className="tabular">{visible.length}</span> of{" "}
        <span className="tabular">{videos.length}</span> films.
      </p>

      <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((video) => (
          <li key={video.slug}>
            <VideoCard video={video} />
          </li>
        ))}
      </ul>
    </div>
  );
}
