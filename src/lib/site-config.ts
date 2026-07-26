/**
 * Site configuration.
 *
 * Everything here is resolved at build time from `NEXT_PUBLIC_*` environment
 * variables and inlined into the static output. There are no runtime secrets —
 * a static export cannot keep one, and this release has nothing that needs one.
 *
 * The important behaviour is the *unconfigured* path. `.env.example` ships
 * deliberately invalid placeholders, and the real phone, email, and scheduling
 * destinations are a business-owner deliverable that is still outstanding. A
 * `tel:+10000000000` link on a live site is worse than no link, so contact
 * destinations are treated as a tri-state: configured, placeholder, or absent.
 * The UI renders an honest pending state for the latter two instead of a
 * plausible-looking dead link.
 *
 * Validated with plain TypeScript rather than Zod, deliberately. This module is
 * reachable from client components — the contact panel needs it — and pulling
 * a schema library across that boundary costs roughly 45 KB gzipped to check
 * four strings. Zod earns its place validating the content collections at build
 * time on the server, which is where it stays.
 */

/** Values that are structurally valid but known not to be real. */
function isPlaceholderPhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, "");
  // +1 followed by all zeros, or any number whose significant digits are all
  // the same character (000…, 111…, 555 0100-style reserved ranges excluded
  // deliberately — those are placeholders too).
  return (
    digits.length < 10 ||
    /^1?0+$/.test(digits) ||
    /^(\d)\1+$/.test(digits.replace(/^1/, ""))
  );
}

function isPlaceholderEmail(raw: string): boolean {
  return /(^|@)(example|test|invalid)\.(invalid|com|test|example)$/i.test(raw);
}

/**
 * The business line published by Sharif in his own listing captions
 * (`sharif-site-definition/assets/videos/videos.md`). It is already public
 * marketing information, so it is the default rather than a placeholder — but
 * it stays overridable by environment variable so a different destination can
 * be swapped in without a code change.
 */
const PUBLISHED_PHONE = "+19179512142";

const raw = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://example.invalid",
  phone: process.env.NEXT_PUBLIC_PHONE || PUBLISHED_PHONE,
  // No email address has been published or approved yet.
  email: process.env.NEXT_PUBLIC_EMAIL || "",
  schedulingUrl: process.env.NEXT_PUBLIC_SCHEDULING_URL || "",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export type ContactChannel =
  | { status: "configured"; value: string; display: string }
  | { status: "pending"; reason: string };

function resolvePhone(): ContactChannel {
  if (!raw.phone || isPlaceholderPhone(raw.phone)) {
    return {
      status: "pending",
      reason: "Awaiting the approved business line from the brokerage.",
    };
  }

  const digits = raw.phone.replace(/\D/g, "");
  const national = digits.length === 11 ? digits.slice(1) : digits;
  const display =
    national.length === 10
      ? `(${national.slice(0, 3)}) ${national.slice(3, 6)}-${national.slice(6)}`
      : raw.phone;

  return { status: "configured", value: raw.phone, display };
}

function resolveEmail(): ContactChannel {
  if (!raw.email || !raw.email.includes("@") || isPlaceholderEmail(raw.email)) {
    return {
      status: "pending",
      reason: "Awaiting the approved brokerage email address.",
    };
  }

  return { status: "configured", value: raw.email, display: raw.email };
}

function resolveScheduling(): ContactChannel {
  // Optional by design. Absent is a valid, non-blocking outcome — the copy deck
  // says to show the scheduling action "only when an approved scheduling URL
  // exists".
  if (!raw.schedulingUrl) {
    return { status: "pending", reason: "No scheduling link has been approved." };
  }

  // HTTPS only. An `http:` scheduling link would downgrade the visitor's
  // connection, and a `javascript:` one would be an injection vector, so the
  // protocol is checked rather than assumed.
  let parsed: URL;
  try {
    parsed = new URL(raw.schedulingUrl);
  } catch {
    return {
      status: "pending",
      reason: "The configured scheduling link is not a valid URL.",
    };
  }

  if (parsed.protocol !== "https:") {
    return {
      status: "pending",
      reason: "The configured scheduling link is not served over HTTPS.",
    };
  }

  return {
    status: "configured",
    value: parsed.toString(),
    display: parsed.hostname,
  };
}

const phone = resolvePhone();
const email = resolveEmail();
const scheduling = resolveScheduling();

/**
 * Starter message for `sms:` and `mailto:`. Contains no budget, address, or
 * personal detail — the visitor edits it in their own client before sending.
 * Per `docs/05`, no visitor data may be encoded into a URL.
 */
export const starterMessage =
  "Hi Sharif — I'm planning a move in New York and want to talk through the next step.";

export const starterSubject = "Planning a move in New York";

export const siteConfig = {
  name: "Sharif Abdelkader",
  role: "New York Real Estate",
  titleTemplate: "%s | Sharif Abdelkader — New York Real Estate",
  defaultTitle: "Sharif Abdelkader — New York Real Estate",
  description:
    "Straight answers, serious property films, and hands-on representation for New York buyers and sellers. Know the move before you make it.",
  url: raw.siteUrl.replace(/\/$/, ""),
  basePath: raw.basePath,
  coverage: ["Staten Island", "Brooklyn"],
  contact: { phone, email, scheduling },
  /** True when at least one direct channel can actually be dialled or mailed. */
  hasLiveChannel:
    phone.status === "configured" ||
    email.status === "configured" ||
    scheduling.status === "configured",
} as const;

/** `tel:` href, or null when the destination is not yet approved. */
export const telHref =
  phone.status === "configured" ? `tel:${phone.value.replace(/[^\d+]/g, "")}` : null;

/** `sms:` href with an editable starter body. */
export const smsHref =
  phone.status === "configured"
    ? `sms:${phone.value.replace(/[^\d+]/g, "")}?&body=${encodeURIComponent(starterMessage)}`
    : null;

/** `mailto:` href with an editable starter subject and body. */
export const mailtoHref =
  email.status === "configured"
    ? `mailto:${email.value}?subject=${encodeURIComponent(
        starterSubject,
      )}&body=${encodeURIComponent(starterMessage)}`
    : null;

export const schedulingHref =
  scheduling.status === "configured" ? scheduling.value : null;

/**
 * Brokerage identification.
 *
 * New York advertising rules require the brokerage name and the licensee's
 * title on marketing material. The brokerage name, office address, and office
 * telephone were published by Sharif himself in his listing captions
 * (`sharif-site-definition/assets/videos/videos.md`), so they are stated here.
 *
 * The licensed title and licence number were not, and are still null. Those are
 * exactly the claims that have to be exactly right, and there is no acceptable
 * approximation — so the site says what it knows and visibly records what it
 * does not, rather than filling the gap.
 */
export const brokerage = {
  name: "Homes R Us Realty",
  officeAddress: "111 Fingerboard Road, Staten Island, NY 10305",
  officePhone: PUBLISHED_PHONE,
  /** Not supplied. Required before this site is used as NY advertising. */
  licensedTitle: null as string | null,
  licenseNumber: null as string | null,
} as const;

/** True when the brokerage name is known — enough to identify the firm. */
export const brokerageIsIdentified = brokerage.name !== null;

/**
 * True only when *every* required advertising field is present. Gates the
 * indexability of the brokerage-notices page and the launch checklist.
 */
export const brokerageIsApproved =
  brokerageIsIdentified &&
  brokerage.licensedTitle !== null &&
  brokerage.licenseNumber !== null;

/** What is still outstanding, rendered directly on /brokerage-notices/. */
export const brokerageGaps = [
  brokerage.licensedTitle === null
    ? "Sharif's licensed title, in the exact wording the licence permits."
    : null,
  brokerage.licenseNumber === null
    ? "The licence number, if it must be displayed in this advertising context."
    : null,
  "Sign-off against the current New York Department of State real-estate advertising checklist.",
  "The exact required fair-housing notice wording and the approved Equal Housing Opportunity artwork.",
  "An approved public email address for the site.",
].filter((item): item is string => item !== null);
