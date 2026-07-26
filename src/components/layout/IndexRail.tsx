"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type RailSection = {
  id: string;
  label: string;
  /**
   * The number shown in the rail.
   *
   * Carried explicitly rather than derived from array position. The rail
   * previously rendered `index + 1`, so it counted 01…08 while the sections
   * themselves were labelled 00…07 on screen — the hero read "00" and the rail
   * highlighted "01", and every entry below it was off by one. Passing the
   * section's own index makes the two read from the same source and stay in
   * step when a section is added or removed.
   */
  index: string;
  /**
   * The surface this section is painted on. The rail floats over the page, so
   * it has to invert with whatever is behind it — a single fixed colour would
   * be invisible over half the page. Because the rail is vertically centred and
   * the active section is by definition the one occupying the middle of the
   * viewport, the active section's tone is always the tone behind the rail.
   */
  tone: "ink" | "paper";
};

/**
 * The Rail — the promoted signature interaction.
 *
 * A scrubber for the page. It mirrors the structure of a call sheet: numbered
 * rows, a marker showing where you are, and the ability to jump. The metaphor
 * is not decorative — Sharif's own output is a numbered sequence, so the index
 * is the honest shape of the content.
 *
 * Deliberate constraints:
 *
 *  - It is a real `<nav>` of real anchor links, so it works as navigation, not
 *    just as an indicator. Keyboard users get the same jumps as pointer users.
 *  - The active row is marked by `aria-current`, a text-weight change, *and* a
 *    yellow bar. Never yellow alone.
 *  - It renders only at `xl` and above, where there is genuinely spare gutter.
 *    Below that the header nav and action bar already cover navigation, and a
 *    floating rail would compete with content.
 *  - If `IntersectionObserver` is unavailable or JavaScript fails, the rail
 *    simply never mounts. Nothing else on the page depends on it.
 *  - No scroll hijacking. Clicking a row is an ordinary in-page anchor; the
 *    browser's own smooth-scroll (disabled under reduced motion by the global
 *    stylesheet) does the movement.
 */
export function IndexRail({ sections }: { sections: RailSection[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }

        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }

        if (best) setActiveId(best);
      },
      {
        // Bias towards the section occupying the middle of the viewport.
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.01, 0.5, 1],
      },
    );

    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }

    observerRef.current = observer;
    return () => observer.disconnect();
  }, [sections]);

  const onInk =
    (sections.find((section) => section.id === activeId) ?? sections[0])?.tone ===
    "ink";

  return (
    <nav
      aria-label="Page sections"
      className={cn(
        "fixed top-1/2 right-4 z-30 hidden -translate-y-1/2 xl:block",
        onInk && "on-ink",
      )}
    >
      <ul className="flex flex-col gap-1">
        {sections.map((section) => {
          const active = section.id === activeId;

          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "group flex min-h-11 items-center justify-end gap-3 rounded-button py-1 pr-2 pl-3",
                  "transition-colors duration-[--duration-fast]",
                )}
              >
                <span
                  className={cn(
                    "max-w-0 overflow-hidden rounded-button text-right font-data text-caption whitespace-nowrap",
                    /*
                     * The expanded label sits over whatever the rail is
                     * floating above — on the home page that is a bright,
                     * moving video frame, against which plain text is
                     * unreadable. A solid chip guarantees contrast regardless
                     * of what is behind it. Collapsed, the padding is hidden by
                     * `max-w-0` and `opacity-0`.
                     */
                    "group-hover:px-2 group-hover:py-1",
                    "group-focus-visible:px-2 group-focus-visible:py-1",
                    onInk ? "bg-ink" : "bg-paper",
                    "transition-all duration-[--duration-standard] ease-[--ease-enter]",
                    /*
                     * Labels expand on hover and focus only — never merely
                     * because a section is active. An always-open active label
                     * reached ~14rem back into the content column and sat on
                     * top of the hero video, unreadable and looking like a
                     * defect. Active state is still carried by the bold number,
                     * the longer yellow bar, and `aria-current`, and the label
                     * text stays in the DOM for assistive technology whatever
                     * its visual width.
                     */
                    "group-hover:max-w-[14rem] group-hover:opacity-100",
                    "group-focus-visible:max-w-[14rem] group-focus-visible:opacity-100",
                    "max-w-0 opacity-0",
                    active
                      ? onInk
                        ? "text-paper"
                        : "text-ink"
                      : onInk
                        ? "text-ink-muted"
                        : "text-gray-600",
                  )}
                >
                  {section.label}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "tabular font-data text-caption transition-colors duration-[--duration-fast]",
                    active
                      ? cn("font-semibold", onInk ? "text-paper" : "text-ink")
                      : onInk
                        ? "text-ink-muted"
                        : "text-gray-600",
                  )}
                >
                  {section.index}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "block h-0.5 origin-right transition-all",
                    "duration-[--duration-standard] ease-[--ease-enter]",
                    active
                      ? "w-6 bg-signal"
                      : onInk
                        ? "w-3 bg-ink-rule"
                        : "w-3 bg-gray-300",
                  )}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
