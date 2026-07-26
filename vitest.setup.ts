import "@testing-library/jest-dom/vitest";

/**
 * jsdom does not implement `matchMedia`.
 *
 * Components that branch on `prefers-reduced-motion` read it through
 * `useSyncExternalStore`, which calls the snapshot synchronously during render
 * — so without this stub any component tree containing the hero loop throws.
 *
 * The stub reports "no preference", which is the more demanding path: it is the
 * branch that mounts the video element. Reduced-motion behaviour itself is
 * verified in the accessibility suite against a real browser, where the media
 * query is real.
 */
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
}
