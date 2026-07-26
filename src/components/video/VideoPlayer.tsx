"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import type { VideoMedia } from "@/lib/schema";
import { cn, withBasePath } from "@/lib/utils";

/**
 * Single-player coordination.
 *
 * `docs/03`: "Never run more than one video simultaneously." Kept at module
 * scope rather than in context because it is genuinely global to the document
 * and there is no tree boundary that should be able to opt out of it.
 */
let activePlayer: HTMLVideoElement | null = null;

function claimPlayback(element: HTMLVideoElement) {
  if (activePlayer && activePlayer !== element) {
    activePlayer.pause();
  }
  activePlayer = element;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const whole = Math.floor(seconds);
  const m = Math.floor(whole / 60);
  const s = whole % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * Native `<video>` with a thin custom control layer, per the engineering spec.
 *
 * Behaviour required by `docs/03` and `docs/09`:
 *
 *  - click to play; no autoplay with sound, ever;
 *  - captions on by default when audio starts muted;
 *  - pause when scrolled out of view or when the document is hidden;
 *  - only one video playing in the document at a time;
 *  - every control keyboard operable with a visible accessible name;
 *  - a descriptive fallback when the media fails to load.
 *
 * The poster is a real `<img>` rather than the `poster` attribute so it can
 * carry `alt` text and be lazily fetched, and so the "not yet playing" state is
 * a normal accessible image rather than a video internal.
 */
export function VideoPlayer({
  media,
  title,
  className,
  /** Muted looping hero derivative. Never used for a speaking video. */
  heroLoop = false,
}: {
  media: VideoMedia;
  title: string;
  className?: string;
  heroLoop?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const captionsId = `captions-${reactId}`;

  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [captionsOn, setCaptionsOn] = useState(true);
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState(false);

  /* Captions default to on, mirroring the muted default. */
  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    const tracks = element.textTracks;
    for (let i = 0; i < tracks.length; i += 1) {
      tracks[i].mode = captionsOn ? "showing" : "hidden";
    }
  }, [captionsOn, started]);

  /* Pause when offscreen or when the tab is hidden. */
  useEffect(() => {
    const element = videoRef.current;
    const container = containerRef.current;
    if (!element || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !element.paused) {
          element.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(container);

    const onVisibility = () => {
      if (document.hidden && !element.paused) element.pause();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (activePlayer === element) activePlayer = null;
    };
  }, []);

  const togglePlay = useCallback(() => {
    const element = videoRef.current;
    if (!element) return;

    if (element.paused) {
      claimPlayback(element);
      setStarted(true);
      const result: unknown = element.play();
      if (result && typeof (result as Promise<void>).catch === "function") {
        void (result as Promise<void>).catch(() => setFailed(true));
      }
    } else {
      element.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const element = videoRef.current;
    if (!element) return;
    element.muted = !element.muted;
    setMuted(element.muted);
  }, []);

  const seek = useCallback((fraction: number) => {
    const element = videoRef.current;
    if (!element || !Number.isFinite(element.duration)) return;
    element.currentTime = element.duration * fraction;
  }, []);

  if (failed) {
    return (
      <FallbackNotice title={title} className={className} />
    );
  }

  const currentSeconds = (progress / 100) * media.durationSeconds;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative isolate overflow-hidden rounded-media bg-ink",
        className,
      )}
    >
      <video
        ref={videoRef}
        className="frame-vertical block w-full object-cover"
        width={media.width}
        height={media.height}
        playsInline
        muted={muted}
        loop={heroLoop}
        /*
         * Nothing is fetched until the visitor asks for it.
         *
         * `preload="metadata"` looks harmless and is not: a measured load of
         * the home page pulled 14 MB of MP4 before anyone pressed play. The
         * poster is a real <img> and the duration comes from the build-time
         * media manifest, so there is nothing the metadata would tell us that
         * we do not already know.
         *
         * This also removes a dependency on the host honouring range requests.
         * GitHub Pages does; the static server used in local testing does not,
         * and a visitor on a metered connection should not be paying for that
         * difference either way.
         */
        preload="none"
        aria-label={title}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
        onTimeUpdate={(event) => {
          const element = event.currentTarget;
          if (Number.isFinite(element.duration) && element.duration > 0) {
            setProgress((element.currentTime / element.duration) * 100);
          }
        }}
      >
        {media.sources.map((source) => (
          <source
            key={source.src}
            src={withBasePath(source.src)}
            type={source.type}
          />
        ))}
        <track
          id={captionsId}
          kind="captions"
          srcLang="en"
          label="English captions"
          src={withBasePath(media.captions)}
          default
        />
        {/* Rendered by browsers that cannot play any source at all. */}
        <p className="p-6 text-body text-paper">
          Your browser cannot play this video. A full written transcript is
          available below.
        </p>
      </video>

      {/* Poster overlay, shown until the first play. */}
      {!started ? (
        <button
          type="button"
          onClick={togglePlay}
          className="absolute inset-0 z-10 flex size-full cursor-pointer flex-col justify-end"
        >
          <picture>
            <source srcSet={withBasePath(media.posterAvif)} type="image/avif" />
            <img
              src={withBasePath(media.poster)}
              alt=""
              width={media.width}
              height={media.height}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover"
            />
          </picture>
          <span className="media-scrim relative flex items-center gap-3 p-5">
            <span className="flex size-12 items-center justify-center rounded-pill bg-signal text-ink">
              <PlayGlyph />
            </span>
            <span className="text-left font-data text-caption tracking-[0.14em] text-paper uppercase">
              Play — {formatTime(media.durationSeconds)}
            </span>
          </span>
        </button>
      ) : null}

      {/* Control bar. Always present once playback has begun. */}
      {started ? (
        <div className="media-scrim absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 p-3">
          <label className="sr-only" htmlFor={`seek-${reactId}`}>
            Seek through {title}
          </label>
          <input
            id={`seek-${reactId}`}
            type="range"
            min={0}
            max={100}
            step={0.5}
            value={progress}
            onChange={(event) => seek(Number(event.target.value) / 100)}
            className="h-1.5 w-full cursor-pointer accent-signal"
          />
          <div className="flex items-center gap-2">
            <ControlButton onClick={togglePlay} label={playing ? "Pause" : "Play"}>
              {playing ? <PauseGlyph /> : <PlayGlyph />}
            </ControlButton>
            <ControlButton
              onClick={toggleMute}
              label={muted ? "Unmute" : "Mute"}
              pressed={!muted}
            >
              {muted ? <MutedGlyph /> : <SoundGlyph />}
            </ControlButton>
            <ControlButton
              onClick={() => setCaptionsOn((value) => !value)}
              label={captionsOn ? "Turn captions off" : "Turn captions on"}
              pressed={captionsOn}
            >
              <span className="font-data text-caption font-semibold">CC</span>
            </ControlButton>
            <span className="tabular ml-auto font-data text-caption text-paper">
              {formatTime(currentSeconds)} / {formatTime(media.durationSeconds)}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ControlButton({
  onClick,
  label,
  pressed,
  children,
}: {
  onClick: () => void;
  label: string;
  pressed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={pressed}
      className={cn(
        "flex size-11 items-center justify-center rounded-button transition-colors",
        "duration-[--duration-fast]",
        pressed
          ? "bg-signal text-ink"
          : "bg-white/10 text-paper hover:bg-white/20",
      )}
    >
      {children}
    </button>
  );
}

export function FallbackNotice({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "frame-vertical flex flex-col justify-end gap-2 rounded-media border border-ink-rule bg-ink p-5",
        className,
      )}
    >
      <p className="font-data text-caption tracking-[0.14em] text-signal uppercase">
        Video unavailable
      </p>
      <p className="text-body text-paper">{title}</p>
      <p className="text-caption text-ink-muted">
        This film could not be loaded. The full written transcript below carries
        the same information.
      </p>
    </div>
  );
}

/* Icons — one 1.75px rounded-line set, per `docs/04` §Iconography. */

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" {...strokeProps}>
      <path d="M8 5.5v13l10-6.5-10-6.5Z" />
    </svg>
  );
}

function PauseGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" {...strokeProps}>
      <path d="M9 5.5v13M15 5.5v13" />
    </svg>
  );
}

function SoundGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" {...strokeProps}>
      <path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4v-5Z" />
      <path d="M16 9.5a3.5 3.5 0 0 1 0 5M18.5 7a7 7 0 0 1 0 10" />
    </svg>
  );
}

function MutedGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" {...strokeProps}>
      <path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4v-5Z" />
      <path d="m16 9.5 5 5M21 9.5l-5 5" />
    </svg>
  );
}
