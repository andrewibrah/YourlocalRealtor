"use client";

import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { cn, withBasePath } from "@/lib/utils";

/** Starts playback, tolerating browsers where `play()` does not return a promise. */
function play(element: HTMLVideoElement): void {
  const result: unknown = element.play();
  if (result && typeof (result as Promise<void>).catch === "function") {
    void (result as Promise<void>).catch(() => {});
  }
}

/**
 * The home hero loop.
 *
 * The only place on this site where a video starts by itself, and it is allowed
 * only under strict conditions from `docs/03`: muted autoplay is permitted for
 * the chosen hero derivative alone, and audio must never start on its own.
 *
 * This clip has **no audio track at all** — it is stripped during encoding
 * rather than muted, so there is nothing to unmute and nothing to caption. That
 * also means it carries no information, which is what makes it safe to suppress
 * entirely under reduced motion.
 *
 * Behaviour:
 *   - Reduced motion: the poster is shown and the video is never fetched.
 *   - Otherwise: `preload="none"` until mounted, then the source is attached
 *     and playback begins. A hero that autoplays should not also be the thing
 *     blocking first paint.
 *   - Offscreen or hidden tab: paused, so it never burns battery in the
 *     background.
 *   - Playback failure: the poster stays. Nothing depends on the video.
 */
export function HeroLoop({
  src,
  poster,
  posterAvif,
  width,
  height,
  className,
}: {
  src: string;
  poster: string;
  posterAvif: string;
  width: number;
  height: number;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Derived, not stored. The server snapshot is "reduced", so the first paint
  // is always the poster alone and the video element is added only once the
  // client confirms motion is welcome.
  const active = !usePrefersReducedMotion();

  useEffect(() => {
    const element = videoRef.current;
    if (!active || !element) return;

    // Consistent with the other observers on this site: if the API is missing,
    // the enhancement is skipped rather than the component crashing.
    if (typeof IntersectionObserver === "undefined") {
      play(element);
      return;
    }

    // `play()` resolves to a promise in modern browsers but returns undefined
    // in older ones (and under jsdom), so the result is guarded rather than
    // assumed. Autoplay refusal — data saver, low power mode — is expected and
    // silent: the poster simply remains.
    play(element);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play(element);
        else element.pause();
      },
      { threshold: 0.15 },
    );
    observer.observe(element);

    const onVisibility = () => {
      if (document.hidden) element.pause();
      else play(element);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [active]);

  return (
    <div
      className={cn(
        "frame-vertical relative isolate overflow-hidden rounded-media bg-ink",
        className,
      )}
    >
      <picture>
        <source srcSet={withBasePath(posterAvif)} type="image/avif" />
        <img
          src={withBasePath(poster)}
          alt=""
          width={width}
          height={height}
          /* The hero poster is the LCP candidate — it must not be lazy. */
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
      </picture>

      {active ? (
        <video
          ref={videoRef}
          className="absolute inset-0 size-full object-cover"
          width={width}
          height={height}
          muted
          loop
          playsInline
          /* No audio track exists on this derivative. */
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={withBasePath(src)} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
