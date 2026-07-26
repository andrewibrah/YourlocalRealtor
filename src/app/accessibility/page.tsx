import type { Metadata } from "next";

import { NoticePage } from "@/components/layout/NoticePage";
import { JsonLd, breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Accessibility",
  description:
    "The accessibility target for this site, what has been tested, what is known to be outstanding, and how to report a barrier.",
  path: "/accessibility/",
});

export default function AccessibilityPage() {
  return (
    <>
      <NoticePage
        index="13"
        eyebrow="Accessibility"
        title="Accessibility statement"
        standfirst="The target is WCAG 2.2 Level AA. This page says what has been tested, what has not, and what is known to be outstanding — because a statement that only lists successes is not useful to anyone."
        lastReviewed="26 July 2026"
        blocks={[
          {
            heading: "The standard this site targets",
            body: [
              "This website is built to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA.",
              "That is a technical target, not a legal opinion, and meeting it is treated here as a release blocker rather than as polish added at the end.",
            ],
          },
          {
            heading: "What has been built in",
            body: [
              [
                "Semantic landmarks, one h1 per page, and a heading order that follows the reading order.",
                "A visible skip link to the main content as the first focusable element.",
                "Full keyboard operation. Every control is reachable and operable without a pointer.",
                "A 3px focus ring with a 2px offset that changes colour on dark surfaces so it stays visible everywhere.",
                "Touch targets of at least 44 by 44 pixels.",
                "Text contrast meeting 4.5:1, and 3:1 for large text and essential interface graphics.",
                "No information carried by colour alone. Status is always accompanied by text.",
                "Reduced-motion support: with the system setting enabled, all travel, transitions, and smooth scrolling are removed while every piece of content stays present.",
                "Layout that holds at 200% browser zoom and 400% text resize.",
                "Content that does not depend on JavaScript. The site is readable and navigable with scripting disabled.",
              ],
            ],
          },
          {
            heading: "Video and media",
            body: [
              "No video on this site autoplays with sound, and only one video can play at a time.",
              "Every speaking video will ship with captions on by default and a full written transcript on the same page. That is enforced by the content schema: a video record cannot be published without a caption file and a transcript.",
              "No film has been released on this site yet, so no captioned media has been tested in production. That testing is outstanding and is listed below.",
              "Where a video fails to load, a written description and the transcript remain available.",
            ],
          },
          {
            heading: "How this has been tested",
            body: [
              "Automated checks run in continuous integration on every change using axe-core, covering the WCAG 2.0 A/AA, 2.1 AA, and 2.2 AA rule sets. A failure blocks the build.",
              "Automated testing is necessary and not sufficient. It reliably catches perhaps a third of real barriers.",
            ],
          },
          {
            heading: "What is outstanding",
            body: [
              "The following are known gaps. They are recorded here rather than omitted.",
              [
                "Screen-reader testing with NVDA, JAWS, and VoiceOver has not been completed.",
                "Testing on real mobile devices, as opposed to emulated viewports, has not been completed.",
                "No captioned video has been tested in production, because no licensed video master has been supplied yet.",
                "Contact destinations are not live yet, so protocol-link behaviour has not been verified on real devices.",
                "A full manual audit against every WCAG 2.2 AA success criterion has not been signed off by a third party.",
              ],
            ],
          },
          {
            heading: "Reporting a barrier",
            body: [
              "If something on this site prevents you from doing what you came to do, please say so. A description of what you were trying to do, the page, and the device or assistive technology you were using is enough to act on.",
              "Accessibility problems are treated as defects, not as feature requests.",
            ],
          },
        ]}
      />
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Accessibility", path: "/accessibility/" },
          ]),
        ]}
      />
    </>
  );
}
