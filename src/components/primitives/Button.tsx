import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "onInk";
type Size = "md" | "lg";

const base =
  // 44px minimum touch target (docs/04 §Focus and accessibility).
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-button " +
  "font-body font-semibold no-underline transition-colors " +
  "duration-[--duration-fast] ease-[--ease-enter] " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-action-dark",
  secondary:
    "border border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-ink/5",
  ghost: "bg-transparent text-ink underline underline-offset-4 hover:text-action-ink",
  // Used on ink surfaces. Signal yellow on ink measures 12.6:1.
  onInk: "bg-signal text-ink hover:bg-white",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-body",
  lg: "px-7 py-4 text-body-lg",
};

type SharedProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: SharedProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * A link styled as a button. Used for every primary call to action, because
 * every call to action on this site navigates or opens a protocol handler —
 * none of them submit anything.
 */
export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: SharedProps & ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}

/**
 * An external or protocol (`tel:`, `sms:`, `mailto:`) link styled as a button.
 * `next/link` is not used because these targets are not app routes.
 */
export function ActionLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: SharedProps & ComponentPropsWithoutRef<"a">) {
  return (
    <a
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </a>
  );
}
