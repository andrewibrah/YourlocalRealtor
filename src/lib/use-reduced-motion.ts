"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

/**
 * On the server, assume reduced motion.
 *
 * This is the safe default in both directions. It keeps the server-rendered
 * HTML free of autoplaying media — better for the largest contentful paint,
 * since the poster is what should be painted first — and it means a visitor who
 * *has* asked for reduced motion never receives markup that briefly contradicts
 * that before hydration corrects it.
 */
function getServerSnapshot(): boolean {
  return true;
}

/**
 * Tracks the user's reduced-motion preference, and keeps tracking it — the
 * setting can change while the page is open, and a `matchMedia` read in an
 * effect would miss that.
 *
 * Most reduced-motion handling on this site is pure CSS. This hook exists for
 * the cases CSS cannot express: not fetching a video at all, rather than
 * fetching it and declining to animate it.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
