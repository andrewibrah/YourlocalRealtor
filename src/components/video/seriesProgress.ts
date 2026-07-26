"use client";

import { useCallback, useSyncExternalStore } from "react";

import { useHydrated } from "@/lib/use-hydrated";

/**
 * Local, non-identifying series progress.
 *
 * `docs/03`: "Store episode completion locally; do not require an account."
 * `docs/08`: "Completion state is local and non-identifying."
 *
 * This is `localStorage` and nothing else. No cookie, no identifier, no
 * network call, no fingerprint. The value is a list of episode slugs the
 * visitor has opened on this device. It is not sent anywhere, nobody else can
 * read it, and there is a visible control to clear it.
 *
 * Modelled as an external store because that is exactly what it is. Every
 * access is wrapped, because `localStorage` throws in Safari private mode and
 * when storage is disabled by policy — progress tracking failing must never
 * break the page.
 */
const STORAGE_KEY = "sharif:series-progress:v1";
const CHANGE_EVENT = "sharif:series-progress-change";

/** Stable empty reference. Returning a fresh `[]` would loop React forever. */
const EMPTY: readonly string[] = Object.freeze([]);

/*
 * `getSnapshot` must return a referentially stable value while the underlying
 * data is unchanged, so the parsed array is memoised against the raw string.
 */
let cachedRaw: string | null = null;
let cachedValue: readonly string[] = EMPTY;

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function getSnapshot(): readonly string[] {
  const raw = readRaw();

  if (raw === cachedRaw) return cachedValue;

  cachedRaw = raw;

  if (!raw) {
    cachedValue = EMPTY;
    return cachedValue;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    cachedValue = Array.isArray(parsed)
      ? Object.freeze(
          parsed.filter((value): value is string => typeof value === "string"),
        )
      : EMPTY;
  } catch {
    cachedValue = EMPTY;
  }

  return cachedValue;
}

function getServerSnapshot(): readonly string[] {
  return EMPTY;
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onChange);
  // Fires when another tab writes to storage.
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function write(value: string[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Storage unavailable. Progress simply does not persist.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useSeriesProgress() {
  const visited = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useHydrated();

  const markVisited = useCallback((slug: string) => {
    const current = getSnapshot();
    if (current.includes(slug)) return;
    write([...current, slug]);
  }, []);

  const reset = useCallback(() => write([]), []);

  return { visited, ready, markVisited, reset };
}
