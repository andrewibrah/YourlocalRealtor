"use client";

import { useSyncExternalStore } from "react";

/** No client will ever change hydration state, so the subscription is a no-op. */
const noopSubscribe = () => () => {};
const onClient = () => true;
const onServer = () => false;

/**
 * True once the component has hydrated on the client.
 *
 * `useSyncExternalStore` is the right tool rather than `useState` plus an
 * effect: it gives React an explicit server snapshot, so the server render and
 * the first client render agree by construction instead of by convention, and
 * it does not schedule a cascading render.
 *
 * Used only for copy that must differ before and after hydration. Nothing
 * functional is gated on it — the site works without JavaScript.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(noopSubscribe, onClient, onServer);
}
