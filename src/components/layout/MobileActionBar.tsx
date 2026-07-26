import Link from "next/link";

import { PlanMyMove } from "@/components/contact/PlanMyMoveButton";
import { siteConfig, smsHref, telHref } from "@/lib/site-config";

/**
 * Mobile action bar.
 *
 * `docs/02`: "The mobile action bar exposes Call, Text, and Plan without
 * covering captions." The body reserves `--action-bar-height` of padding so the
 * bar never sits on top of page content, and it is not rendered at all at `lg`.
 *
 * When the phone destination has not been approved yet, Call and Text collapse
 * into a single link to the contact page rather than rendering dead protocol
 * links.
 */
export function MobileActionBar() {
  const tel = telHref;
  const sms = smsHref;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-rule bg-ink lg:hidden">
      <div className="on-ink flex items-stretch gap-2 p-2">
        {tel && sms ? (
          <>
            <a
              href={tel}
              className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-button border border-ink-rule text-caption font-semibold tracking-[0.1em] text-paper uppercase"
            >
              Call
            </a>
            <a
              href={sms}
              className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-button border border-ink-rule text-caption font-semibold tracking-[0.1em] text-paper uppercase"
            >
              Text
            </a>
          </>
        ) : (
          <Link
            href="/contact/"
            className="flex min-h-11 flex-1 items-center justify-center rounded-button border border-ink-rule text-caption font-semibold tracking-[0.1em] text-paper uppercase"
          >
            Contact
            <span className="sr-only">
              {" "}
              — direct call and text destinations are not live yet
            </span>
          </Link>
        )}

        <PlanMyMove
          variant="bar"
          size="md"
          label="Plan my move"
          className="flex-[1.4] text-caption tracking-[0.1em] uppercase"
        />
      </div>
      <p className="sr-only">
        Quick actions for {siteConfig.name}. The main page content is above.
      </p>
    </div>
  );
}
