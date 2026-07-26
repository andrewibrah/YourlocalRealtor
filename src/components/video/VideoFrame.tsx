import dynamic from "next/dynamic";

import type { Video } from "@/lib/schema";
import { cn } from "@/lib/utils";

import { VideoSlate } from "./VideoSlate";

/**
 * The player is loaded on demand.
 *
 * A static import put its chunk into the client reference manifest for every
 * route containing a video frame, so roughly 9 KB gzipped of player, controls,
 * and icons downloaded on pages where no video can play — currently every page,
 * since no licensed master has been supplied. Splitting it means the cost is
 * paid only by pages that actually have playable media.
 */
const VideoPlayer = dynamic(() =>
  import("./VideoPlayer").then((module) => module.VideoPlayer),
);

/**
 * Renders whichever state a video is actually in.
 *
 * This is the single place that decides between the real player and the Film
 * Slate. Every surface on the site goes through it, so when the licensed
 * exports arrive the change is one field in `content/videos.ts` and nothing
 * else moves.
 */
export function VideoFrame({
  video,
  className,
  compact = false,
  heroLoop = false,
}: {
  video: Video;
  className?: string;
  compact?: boolean;
  heroLoop?: boolean;
}) {
  if (video.media) {
    return (
      <VideoPlayer
        media={video.media}
        title={video.topic}
        className={className}
        heroLoop={heroLoop}
      />
    );
  }

  return <VideoSlate video={video} className={className} compact={compact} />;
}

/**
 * Provenance link to the original post.
 *
 * This is a plain outbound anchor and nothing more. No embed script, no
 * oEmbed, no scraped media, no hotlinked video file — `docs/03` prohibits all
 * of those, and `docs/05` prohibits loading an Instagram embed above the fold.
 * A link is the honest way to say "the film exists and here is where it was
 * published" while the web-cleared export is still outstanding.
 */
export function SourceLink({
  video,
  tone = "ink",
  className,
}: {
  video: Video;
  tone?: "ink" | "paper";
  className?: string;
}) {
  // Nothing to credit when no source post has been identified.
  if (!video.sourceUrl) return null;

  return (
    <a
      href={video.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 font-data text-caption tracking-[0.08em] uppercase",
        "underline underline-offset-4",
        tone === "ink"
          ? "text-action-ink hover:text-ink"
          : "text-action-sky hover:text-signal",
        className,
      )}
    >
      View the original post
      <span aria-hidden="true">↗</span>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
