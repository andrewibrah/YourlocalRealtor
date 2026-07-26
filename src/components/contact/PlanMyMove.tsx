"use client";

import { useCallback, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The primary conversion action.
 *
 * Progressive enhancement is the whole design here. The trigger is a real
 * anchor to `/contact/`, server-rendered. With JavaScript disabled — or before
 * hydration, or if a chunk fails — clicking it navigates to the contact page,
 * which contains the same actions. Only once the component has mounted does it
 * intercept the click and open a native `<dialog>` instead.
 *
 * `<dialog>.showModal()` is used rather than a hand-rolled overlay because the
 * platform already provides focus containment, inert background, Escape to
 * close, and correct semantics. Re-implementing those is how focus traps get
 * shipped.
 *
 * The dialog's contents arrive as `children` from a Server Component rather
 * than being imported here. Only the open/close behaviour needs to run in the
 * browser, so only the open/close behaviour is shipped to it — the contact
 * list, its icons, and the site configuration all stay server-rendered. That is
 * worth about 14 KB of gzipped JavaScript on every page, since this component
 * appears in the root layout twice.
 */
export function PlanMyMoveDialog({
  className,
  variant = "primary",
  size = "lg",
  label = "Plan my move",
  children,
}: {
  className?: string;
  variant?: "primary" | "onInk" | "bar";
  size?: "md" | "lg";
  label?: string;
  /** Server-rendered dialog body. */
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    const dialog = dialogRef.current;

    // No hydration flag is needed. If this handler is running at all then
    // JavaScript is live and the ref is attached; if it never runs, the anchor
    // navigates to /contact/ on its own. `showModal` is still feature-detected
    // for browsers without dialog support, which also fall back to navigation.
    if (!dialog || typeof dialog.showModal !== "function") return;

    // Let modified clicks (new tab, new window) behave normally.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    dialog.showModal();
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  const styles = {
    primary: "bg-ink text-paper hover:bg-action-dark",
    onInk: "bg-signal text-ink hover:bg-white",
    bar: "bg-signal text-ink",
  } as const;

  return (
    <>
      <a
        href="/contact/"
        onClick={open}
        className={cn(
          "inline-flex min-h-11 items-center justify-center gap-2 rounded-button",
          "font-body font-semibold no-underline transition-colors",
          "duration-[--duration-fast] ease-[--ease-enter]",
          size === "lg" ? "px-7 py-4 text-body-lg" : "px-5 py-2.5 text-body",
          styles[variant],
          className,
        )}
      >
        {label}
        <span aria-hidden="true">→</span>
      </a>

      <dialog
        ref={dialogRef}
        aria-labelledby="plan-my-move-title"
        onClick={(event) => {
          // Click on the backdrop (the dialog element itself) closes.
          if (event.target === dialogRef.current) close();
        }}
        className={cn(
          "m-auto w-[min(34rem,calc(100vw-2rem))] rounded-card border border-gray-300",
          "bg-paper p-0 text-ink shadow-none",
          "backdrop:bg-ink/70",
        )}
      >
        <div className="flex flex-col gap-5 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="font-data text-caption tracking-[0.16em] text-gray-600 uppercase">
                Direct contact
              </p>
              <h2
                id="plan-my-move-title"
                className="font-display text-heading-lg"
              >
                Make the next move directly.
              </h2>
            </div>
            <button
              type="button"
              onClick={close}
              className="flex size-11 shrink-0 items-center justify-center rounded-button border border-gray-300 bg-white transition-colors hover:border-ink"
              aria-label="Close"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
              >
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          {children}
        </div>
      </dialog>
    </>
  );
}
