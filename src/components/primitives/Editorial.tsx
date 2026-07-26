import type { FaqItem, ProcessStep } from "@/lib/schema";
import { cn, pad2 } from "@/lib/utils";

/**
 * FAQ.
 *
 * `<details>`/`<summary>` rather than a scripted accordion: it works with
 * JavaScript disabled, it is keyboard operable and announced correctly with no
 * ARIA of our own, and browser find-in-page can reach closed answers. A
 * hand-built accordion would only lose those properties.
 */
export function Faq({
  items,
  tone = "ink",
  className,
}: {
  items: FaqItem[];
  tone?: "ink" | "paper";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      {items.map((item, index) => (
        <details
          key={item.question}
          className={cn(
            "group border-t",
            tone === "ink" ? "border-gray-300" : "border-ink-rule",
          )}
        >
          <summary
            className={cn(
              "flex min-h-11 cursor-pointer list-none items-start gap-4 py-5 text-body-lg text-pretty",
              tone === "ink" ? "text-ink" : "text-paper",
            )}
          >
            <span
              className={cn(
                "tabular mt-1 shrink-0 font-data text-caption",
                tone === "ink" ? "text-action-ink" : "text-signal",
              )}
            >
              {pad2(index + 1)}
            </span>
            <span className="flex-1 font-display text-heading-md">
              {item.question}
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "mt-1 shrink-0 transition-transform duration-[--duration-fast] group-open:rotate-45",
                tone === "ink" ? "text-gray-600" : "text-ink-muted",
              )}
            >
              +
            </span>
          </summary>
          <div
            className={cn(
              "flex max-w-reading flex-col gap-3 pb-6 pl-10 text-body-lg text-pretty",
              tone === "ink" ? "text-gray-600" : "text-ink-muted",
            )}
          >
            {item.answer.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}

/** Numbered process list. The index is content, not decoration. */
export function ProcessList({
  steps,
  tone = "ink",
  className,
}: {
  steps: ProcessStep[];
  tone?: "ink" | "paper";
  className?: string;
}) {
  return (
    <ol className={cn("flex flex-col", className)}>
      {steps.map((step) => (
        <li
          key={step.index}
          className={cn(
            "grid gap-x-6 gap-y-3 border-t py-8 md:grid-cols-[4rem_1fr]",
            tone === "ink" ? "border-gray-300" : "border-ink-rule",
          )}
        >
          <span
            className={cn(
              "tabular font-display text-heading-lg leading-none",
              tone === "ink" ? "text-gray-600" : "text-ink-muted",
            )}
          >
            {pad2(step.index)}
          </span>
          <div className="flex flex-col gap-2">
            <h3
              className={cn(
                "font-display text-heading-md text-balance",
                tone === "ink" ? "text-ink" : "text-paper",
              )}
            >
              {step.title}
            </h3>
            <p
              className={cn(
                "max-w-reading text-body-lg text-pretty",
                tone === "ink" ? "text-gray-600" : "text-ink-muted",
              )}
            >
              {step.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/**
 * Disclaimer block. Deliberately plain and legible rather than tucked into
 * small grey print — a disclaimer nobody can read is not a disclaimer.
 */
export function Disclaimer({
  children,
  tone = "ink",
  className,
}: {
  children: React.ReactNode;
  tone?: "ink" | "paper";
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "max-w-reading rounded-card border-l-4 p-5",
        tone === "ink"
          ? "border-warning bg-gray-100 text-gray-600"
          : "border-signal bg-white/[0.04] text-ink-muted",
        className,
      )}
    >
      <p className="mb-1 font-data text-caption tracking-[0.14em] uppercase">
        Please read
      </p>
      <p className="text-body text-pretty">{children}</p>
    </aside>
  );
}
