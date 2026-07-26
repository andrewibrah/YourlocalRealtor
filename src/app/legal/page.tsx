import type { Metadata } from "next";

import { NoticePage } from "@/components/layout/NoticePage";
import { JsonLd, breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Legal",
  description:
    "Terms of use, the limits of what this site claims, media and testimonial rights status, and the disclaimers that apply to everything published here.",
  path: "/legal/",
});

export default function LegalPage() {
  return (
    <>
      <NoticePage
        index="16"
        eyebrow="Legal"
        title="What this site is, and is not."
        standfirst="A marketing site for a real-estate agent. It is not a listing service, a lender, an appraiser, a law firm, or an accountant, and nothing on it should be relied on as though it were."
        lastReviewed="26 July 2026"
        blocks={[
          {
            heading: "Not advice",
            body: [
              "Everything published here is general educational information about how buying and selling work. It is not mortgage, lending, appraisal, investment, legal, or tax advice, and it is not an offer of credit.",
              "No page here predicts what any property will sell for, promises an interest rate, guarantees an outcome, or estimates the value of a specific property. Decisions about your own transaction should be made with a licensed lender, attorney, and tax professional who know your circumstances.",
            ],
          },
          {
            heading: "Not a listing service",
            body: [
              "This site is not an IDX or MLS product and does not offer property search.",
              "Properties shown are documented past transactions or marketing films. Nothing on this site is an offer to sell, a solicitation of an offer to buy, or a representation that any property is currently available. A property film does not imply that the property is on the market now.",
              "Where a price or a status is shown, it is shown with the date it was true, or with an explicit note that the date has not been confirmed.",
            ],
          },
          {
            heading: "Accuracy and verification",
            body: [
              "This site distinguishes between what has been verified and what has not, and it says which is which on the page rather than in a footnote.",
              "Content marked as pending a master file, indexed from a published post, or pending approval has not been confirmed against an original source. It is presented as provisional and should be treated that way until the marker is removed.",
            ],
          },
          {
            heading: "Client reviews",
            body: [
              "The three client reviews quoted on this site were published on Sharif's agent review profile. They are quoted verbatim, with omissions marked by an ellipsis. No wording has been changed and no claim has been strengthened.",
              "The original screenshots are reproduced behind a disclosure on each page so the source can be checked directly.",
              "Written permission to reuse these reviews in marketing has not yet been recorded, and the transaction details in them have not yet been independently confirmed. Both are outstanding.",
            ],
          },
          {
            heading: "Media rights",
            body: [
              "No video file is hosted on this site. The films referenced were published on a social platform, and publishing there does not grant the right to re-host them on a website — nor does a platform's music licence transfer to a website.",
              "No media on this site has been scraped, hotlinked, or embedded from another platform. Where a film has not been released here, the entry links to the original published post as attribution and nothing more.",
              "Property photographs appearing inside the reproduced review screenshots carry a Multiple Listing Service credit and are reproduced only as part of the unaltered source image. They are not extracted or reused separately.",
            ],
          },
          {
            heading: "Brokerage identification",
            body: [
              "New York requires marketing material to identify the brokerage and the licensee's title. Those details have not been confirmed for this site and are therefore not stated anywhere on it. See the brokerage notices page for the full list of what is outstanding.",
            ],
          },
          {
            heading: "External links",
            body: [
              "Links to other websites are provided for reference. This site does not control them and is not responsible for their content, their accuracy, or their privacy practices.",
            ],
          },
          {
            heading: "Status of this page",
            body: [
              "This page has not been reviewed by counsel or by the brokerage's compliance process. It describes the site's actual behaviour and the limits of its claims, and it is not itself legal advice.",
            ],
          },
        ]}
      />
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Legal", path: "/legal/" },
          ]),
        ]}
      />
    </>
  );
}
