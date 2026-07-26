import type { Video } from "@/lib/schema";
import { cn, pad2 } from "@/lib/utils";

/**
 * The Film Slate.
 *
 * Stands in for a video whose licensed master has not arrived. It is not a grey
 * box, a spinner, or a stock image — `docs/08` is explicit that placeholder
 * media cannot survive release review, and a fake frame would be worse than an
 * honest absence.
 *
 * Instead it is a composed production artifact built entirely from CSS and real
 * metadata: index, series, topic, and status. It reads as something the call
 * sheet would actually contain, it never claims to be a frame of the film, and
 * its state is carried by text rather than by colour.
 *
 * When `video.media` is populated this component is not rendered at all — the
 * real player takes its place with no other change.
 */
export function VideoSlate({
  video,
  className,
  compact = false,
}: {
  video: Video;
  className?: string;
  compact?: boolean;
}) {
  const index =
    video.episode !== null
      ? pad2(video.episode)
      : video.category === "property-tour"
        ? "FILM"
        : "REEL";

  return (
    <div
      className={cn(
        "frame-vertical relative isolate overflow-hidden rounded-media",
        "border border-ink-rule bg-ink text-paper",
        className,
      )}
    >
      {/* Slate stripes. Purely decorative, hidden from assistive tech. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 flex h-3"
      >
        {["bg-signal", "bg-paper", "bg-action", "bg-ink-rule", "bg-signal"].map(
          (tone, i) => (
            <span key={i} className={cn("flex-1", tone)} />
          ),
        )}
      </div>

      {/* Corner registration marks. */}
      <div
        aria-hidden="true"
        className="absolute inset-5 top-8 border border-ink-rule"
      />

      <div className="relative flex h-full flex-col justify-between p-5 pt-10">
        <div className="flex items-start justify-between gap-3">
          <span className="tabular font-data text-caption tracking-[0.2em] text-signal uppercase">
            {index}
          </span>
          <span className="font-data text-caption tracking-[0.14em] text-ink-muted uppercase">
            9:16
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <p
            className={cn(
              "font-display text-balance text-paper",
              compact ? "text-heading-md" : "text-heading-lg",
            )}
          >
            {video.topic}
          </p>
          {!compact ? (
            <p className="max-w-[28ch] text-caption text-ink-muted">
              {video.outcome}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 border-t border-ink-rule pt-3">
          <p className="font-data text-caption tracking-[0.14em] text-signal uppercase">
            Awaiting licensed master
          </p>
          <p className="text-caption text-ink-muted">
            The film exists. The web-cleared export, captions, and transcript do
            not yet.
          </p>
        </div>
      </div>
    </div>
  );
}
