"use client";

import { useEffect } from "react";

/**
 * Marks the document as hydrated.
 *
 * Sets `data-hydrated` on the root element, which gives CSS a hook for
 * "JavaScript is live" styling and gives the end-to-end suite a truthful signal
 * for when progressively-enhanced controls become interactive. Without it a
 * test can click an enhanced control one frame early, take the
 * no-JavaScript fallback, and report a failure that describes nothing a user
 * would experience.
 *
 * This replaced a scroll-reveal observer. See the note in `globals.css` for why
 * that was removed rather than fixed.
 */
export function ClientBootstrap() {
  useEffect(() => {
    document.documentElement.dataset.hydrated = "true";
  }, []);

  return null;
}
