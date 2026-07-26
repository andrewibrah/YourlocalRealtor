import {
  mailtoHref,
  schedulingHref,
  siteConfig,
  smsHref,
  starterMessage,
  telHref,
} from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * The contact action list.
 *
 * GitHub Pages is static hosting. It cannot securely execute a form handler,
 * hold a secret, rate-limit, or deliver mail, so this release has no submission
 * form at all (`docs/05` §Contact flow). Conversion is `tel:`, `sms:`,
 * `mailto:`, and an optional approved scheduling link — nothing else.
 *
 * Two states matter equally:
 *
 *   configured — the destination is approved and the protocol link is live.
 *   pending    — the destination has not been approved yet. The action renders
 *                as visibly unavailable with the reason stated. It does **not**
 *                render a plausible-looking dead `tel:` link, which is what
 *                shipping the `.env.example` placeholder would produce.
 *
 * No visitor data is collected, encoded into a URL, or sent anywhere. The
 * starter message is generic and fully editable in the visitor's own client
 * before they send it.
 */
export function ContactActions({
  tone = "ink",
  className,
}: {
  tone?: "ink" | "paper";
  className?: string;
}) {
  const { phone, email, scheduling } = siteConfig.contact;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <ChannelAction
        tone={tone}
        href={telHref}
        label="Call Sharif"
        detail={phone.status === "configured" ? phone.display : phone.reason}
        available={phone.status === "configured"}
        glyph={<PhoneGlyph />}
        emphasis
      />
      <ChannelAction
        tone={tone}
        href={smsHref}
        label="Text Sharif"
        detail={
          phone.status === "configured"
            ? "Opens your messaging app with a starter message you can edit."
            : phone.reason
        }
        available={phone.status === "configured"}
        glyph={<MessageGlyph />}
      />
      <ChannelAction
        tone={tone}
        href={mailtoHref}
        label="Email Sharif"
        detail={
          email.status === "configured"
            ? email.display
            : email.reason
        }
        available={email.status === "configured"}
        glyph={<MailGlyph />}
      />
      {scheduling.status === "configured" ? (
        <ChannelAction
          tone={tone}
          href={schedulingHref}
          label="Book a conversation"
          detail={scheduling.display}
          available
          external
          glyph={<CalendarGlyph />}
        />
      ) : null}

      <div
        className={cn(
          "mt-2 flex flex-col gap-2 border-t pt-4 text-caption",
          tone === "ink"
            ? "border-gray-300 text-gray-600"
            : "border-ink-rule text-ink-muted",
        )}
      >
        <p>
          <span className="font-semibold">Starter message:</span> “
          {starterMessage}” — edit it before you send.
        </p>
        <p>
          If a button does not open on your device, use the phone number or email
          address shown above directly.
        </p>
        <p>
          Nothing is submitted from this website. There is no form, no account,
          and no data collected here.
        </p>
      </div>
    </div>
  );
}

function ChannelAction({
  href,
  label,
  detail,
  available,
  glyph,
  tone,
  emphasis = false,
  external = false,
}: {
  href: string | null;
  label: string;
  detail: string;
  available: boolean;
  glyph: React.ReactNode;
  tone: "ink" | "paper";
  emphasis?: boolean;
  external?: boolean;
}) {
  const body = (
    <>
      <span
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-button",
          available
            ? emphasis
              ? "bg-signal text-ink"
              : tone === "ink"
                ? "bg-ink text-paper"
                : "bg-white/10 text-paper"
            : tone === "ink"
              ? "bg-gray-100 text-gray-600"
              : "bg-white/5 text-ink-muted",
        )}
      >
        {glyph}
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span
          className={cn(
            "font-display text-heading-md leading-tight",
            available
              ? tone === "ink"
                ? "text-ink"
                : "text-paper"
              : tone === "ink"
                ? "text-gray-600"
                : "text-ink-muted",
          )}
        >
          {label}
          {!available ? (
            /*
             * The warning token (#A15C00) only reaches 3.55:1 on ink, so the
             * marker switches to signal yellow (12.7:1) on dark surfaces. The
             * text itself carries the state either way — the colour is never
             * the only signal.
             */
            <span
              className={cn(
                "ml-2 align-middle font-data text-caption tracking-[0.1em] uppercase",
                tone === "ink" ? "text-warning-ink" : "text-signal",
              )}
            >
              Not yet live
            </span>
          ) : null}
        </span>
        <span
          className={cn(
            "text-caption text-pretty",
            tone === "ink" ? "text-gray-600" : "text-ink-muted",
          )}
        >
          {detail}
          {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
        </span>
      </span>
    </>
  );

  const shell = cn(
    "flex items-center gap-4 rounded-card border p-3 text-left transition-colors",
    "duration-[--duration-fast] ease-[--ease-enter]",
    tone === "ink" ? "border-gray-300" : "border-ink-rule",
  );

  if (!available || !href) {
    return (
      <div
        className={cn(shell, tone === "ink" ? "bg-gray-100/60" : "bg-white/[0.03]")}
        // Not a link and not focusable: there is nowhere to go. The state is
        // announced by the visible "Not yet live" text, which is inside the
        // accessible name of the heading line.
      >
        {body}
      </div>
    );
  }

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        shell,
        tone === "ink"
          ? "bg-white hover:border-ink hover:bg-gray-100"
          : "bg-white/[0.04] hover:border-signal hover:bg-white/[0.08]",
      )}
    >
      {body}
    </a>
  );
}

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function PhoneGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" {...strokeProps}>
      <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />
    </svg>
  );
}

function MessageGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" {...strokeProps}>
      <path d="M20 12.5a7.5 7.5 0 0 1-10.9 6.7L4 20.5l1.4-4.6A7.5 7.5 0 1 1 20 12.5Z" />
    </svg>
  );
}

function MailGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" {...strokeProps}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

function CalendarGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" {...strokeProps}>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3.5v3M16 3.5v3" />
    </svg>
  );
}
