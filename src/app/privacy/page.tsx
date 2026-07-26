import type { Metadata } from "next";

import { NoticePage } from "@/components/layout/NoticePage";
import { JsonLd, breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy",
  description:
    "This website collects nothing. No forms, no accounts, no cookies, no analytics, no tracking pixels, no third-party scripts.",
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <>
      <NoticePage
        index="14"
        eyebrow="Privacy"
        title="This website collects nothing."
        standfirst="That is not a positioning statement. It is a description of the architecture: there is no server, no database, and no endpoint that could receive anything even if it were sent."
        lastReviewed="26 July 2026"
        blocks={[
          {
            heading: "What this site collects",
            body: [
              "Nothing.",
              "There is no contact form, no newsletter signup, no account, no login, and no search that sends anything anywhere. The site is a set of static files. It has no server-side code, no database, and no API that could store or forward information.",
            ],
          },
          {
            heading: "Cookies and tracking",
            body: [
              "This site sets no cookies. It runs no analytics, no tracking pixel, no session-replay tool, no advertising tag, and no third-party script of any kind.",
              "Because nothing is tracked, there is no cookie banner. A consent prompt for tracking that does not exist would be theatre.",
              "Fonts are served from this site itself rather than from a font provider, so visiting a page does not tell any third party that you were here.",
            ],
          },
          {
            heading: "Local storage",
            body: [
              "One thing is stored, and it stays on your own device: which parts of the first-home series you have opened. It exists so the series can show you where you left off.",
              "It is a list of episode names in your browser's local storage. It contains no identifier, it is never transmitted, and nobody but you can read it. There is a visible control on the series page to clear it, and clearing your browser data removes it.",
            ],
          },
          {
            heading: "When you call, text, or email",
            body: [
              "Those links hand control to software you already have — your phone app, your messaging app, your email client. What you write goes from your device to Sharif. It does not pass through this website and is not logged here.",
              "The starter message provided is generic and fully editable before you send it. No detail about you is pre-filled, and nothing about you is encoded into any link on this site.",
            ],
          },
          {
            heading: "What you should not send",
            body: [
              "Please do not send any of the following, by any channel:",
              [
                "Social Security number",
                "Date of birth",
                "Driver's licence, passport, or other identity document",
                "Tax returns or bank statements",
                "Account or routing numbers",
                "Credit reports or pre-approval files",
                "Detailed records of your assets or debts",
              ],
              "None of these are needed to start a conversation. If a lender or an attorney needs them later, they will collect them through their own secure process — not through a text message.",
            ],
          },
          {
            heading: "Hosting",
            body: [
              "This site is hosted on GitHub Pages and served over HTTPS. As with any web host, GitHub processes the network requests needed to deliver pages, which is handled under GitHub's own terms.",
              "GitHub Pages does not allow custom HTTP response headers to be set. That means certain browser security headers cannot be applied to this site, which is documented in the release record rather than glossed over. The compensating position is straightforward: there is no login, no session, no secret, no form, and no personal data on this site for such a header to protect.",
            ],
          },
          {
            heading: "Status of this notice",
            body: [
              "This notice describes the website's technical behaviour, which is verifiable from the source. It has not yet been reviewed by counsel or by the brokerage's compliance process, and it does not cover how Sharif handles your information after you contact him directly — that is governed by the brokerage's own privacy practices.",
            ],
          },
        ]}
      />
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Privacy", path: "/privacy/" },
          ]),
        ]}
      />
    </>
  );
}
