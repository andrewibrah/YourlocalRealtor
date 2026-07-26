"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export const NAV_ITEMS = [
  { href: "/buy/", label: "Buy" },
  { href: "/sell/", label: "Sell" },
  { href: "/videos/", label: "Videos" },
  { href: "/properties/", label: "Properties" },
  { href: "/results/", label: "Results" },
  { href: "/about/", label: "About" },
] as const;

/**
 * Primary navigation.
 *
 * A client component only because the active state needs the current path. The
 * active marker is a yellow underline *and* `aria-current`, never colour alone
 * — `docs/04`: "Yellow is never used alone to communicate status."
 *
 * There is no JavaScript menu on mobile. The nav becomes a horizontally
 * scrollable strip, which keeps every destination one tap away, needs no open
 * or close state, and cannot trap focus.
 */
export function NavLinks({ variant }: { variant: "desktop" | "strip" }) {
  const pathname = usePathname();

  return (
    <ul
      className={cn(
        "flex items-center",
        variant === "desktop"
          ? "gap-1"
          : "-mx-5 gap-1 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
      )}
    >
      {NAV_ITEMS.map((item) => {
        const active = pathname.startsWith(item.href);

        return (
          <li key={item.href} className="shrink-0">
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex min-h-11 items-center px-3 font-data text-caption tracking-[0.14em] uppercase",
                "transition-colors duration-[--duration-fast]",
                active ? "text-signal" : "text-ink-muted hover:text-paper",
              )}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-3 bottom-1.5 h-0.5 origin-left transition-transform",
                  "duration-[--duration-standard] ease-[--ease-enter]",
                  active ? "scale-x-100 bg-signal" : "scale-x-0 bg-paper",
                )}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
