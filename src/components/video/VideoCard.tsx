import Link from "next/link";

import { VIDEO_CATEGORY_LABELS } from "@/content/video-taxonomy";
import type { Video } from "@/lib/schema";
import { cn, pad2 } from "@/lib/utils";

import { VerificationNote } from "@/components/primitives/Data";
import { VideoFrame } from "./VideoFrame";

/**
 * Video card.
 *
 * Anatomy is fixed by `docs/03` §Video card anatomy: 9:16 frame, topic label,
 * direct title, duration, one-sentence outcome, play control, transcript
 * control, contextual CTA.
 *
 * Duration and the transcript control are omitted rather than faked while the
 * master file is outstanding — showing "0:00" or an empty transcript drawer
 * would be inventing metadata. Both appear automatically once `video.media`
 * exists, because the fields come from the media package.
 */
export function VideoCard({
  video,
  className,
  tone = "ink",
}: {
  video: Video;
  className?: string;
  tone?: "ink" | "paper";
}) {
  const href = `/videos/${video.slug}/`;

  return (
    <article
      className={cn(
        "group flex flex-col gap-4",
        className,
      )}
    >
      <Link
        href={href}
        className={cn(
          "block overflow-hidden rounded-media transition-transform",
          "duration-[--duration-standard] ease-[--ease-enter]",
          "hover:-translate-y-1 focus-visible:-translate-y-1",
        )}
      >
        <VideoFrame video={video} compact />
        <span className="sr-only">Open {video.topic}</span>
      </Link>

      <div className="flex flex-col gap-2">
        <p
          className={cn(
            "flex items-center gap-2 font-data text-caption tracking-[0.14em] uppercase",
            tone === "ink" ? "text-gray-600" : "text-ink-muted",
          )}
        >
          {video.episode !== null ? (
            <span className={tone === "ink" ? "text-action-ink" : "text-signal"}>
              {pad2(video.episode)}
            </span>
          ) : null}
          <span>{VIDEO_CATEGORY_LABELS[video.category]}</span>
        </p>

        <h3 className="font-display text-heading-md text-balance">
          <Link
            href={href}
            className={cn(
              "transition-colors duration-[--duration-fast]",
              tone === "ink"
                ? "text-ink hover:text-action-ink"
                : "text-paper hover:text-signal",
            )}
          >
            {video.topic}
          </Link>
        </h3>

        <p
          className={cn(
            "text-body text-pretty",
            tone === "ink" ? "text-gray-600" : "text-ink-muted",
          )}
        >
          {video.outcome}
        </p>

        <VerificationNote verification={video.verification} tone={tone} />
      </div>
    </article>
  );
}
