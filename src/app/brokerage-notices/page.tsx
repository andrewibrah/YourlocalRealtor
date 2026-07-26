import type { Metadata } from "next";

import { NoticePage } from "@/components/layout/NoticePage";
import { JsonLd, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { brokerage, brokerageIsApproved } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Brokerage notices",
  description:
    "Brokerage identification, licensed title, and New York real-estate advertising disclosures — including exactly what is still outstanding.",
  path: "/brokerage-notices/",
  // Not useful in search results while it is a list of gaps rather than the
  // required disclosures. Flip to indexable once the details are approved.
  noIndex: !brokerageIsApproved,
});

export default function BrokerageNoticesPage() {
  return (
    <>
      <NoticePage
        index="17"
        eyebrow="Brokerage notices"
        title="Brokerage identification and advertising disclosures."
        standfirst="New York requires specific identification and disclosure on real-estate advertising. This page records what is required, what is present, and what is still outstanding."
        lastReviewed="26 July 2026"
        blocks={
          brokerageIsApproved
            ? [
                {
                  heading: "Brokerage",
                  body: [
                    [
                      `Brokerage: ${brokerage.name ?? "—"}`,
                      `Licensed title: ${brokerage.licensedTitle ?? "—"}`,
                      `Licence number: ${brokerage.licenseNumber ?? "—"}`,
                      `Office address: ${brokerage.officeAddress ?? "—"}`,
                      `Office telephone: ${brokerage.officePhone ?? "—"}`,
                    ],
                  ],
                },
              ]
            : [
                {
                  heading: "Current status",
                  body: [
                    "The brokerage details required on New York real-estate advertising have not been supplied or approved for this website. They are therefore not stated anywhere on it.",
                    "This is deliberate. Publishing an approximate brokerage name, an unverified licence number, or a guessed office address would be a regulatory problem rather than a copy problem, and there is no acceptable approximate version of a licence number.",
                  ],
                },
                {
                  heading: "What is required before launch",
                  body: [
                    "The following must be supplied by the brokerage and confirmed before this site is presented publicly as advertising:",
                    [
                      "The full legal name of the brokerage under which Sharif is licensed.",
                      "Sharif's licensed title, in the exact wording the licence permits.",
                      "The licence number, if it is required to be displayed in the applicable advertising context.",
                      "The brokerage's office address and telephone number, in the form required for advertising.",
                      "Any team name, and confirmation that its use complies with New York team-advertising rules.",
                      "The brokerage's approved logo files and any required placement rules.",
                      "The exact required fair-housing notice and disclosure wording, and where it must appear.",
                      "The official Equal Housing Opportunity artwork approved for use.",
                      "Confirmation of the approved telephone number and email address for public display.",
                      "Sign-off against the current New York Department of State real-estate advertising checklist.",
                    ],
                  ],
                },
                {
                  heading: "What is already in place",
                  body: [
                    "Independently of brokerage approval, the site already:",
                    [
                      "Publishes an equal housing opportunity commitment and a fair-housing notice page.",
                      "Avoids subjective neighbourhood characterisation and demographic targeting entirely.",
                      "States an 'as of' date, or an explicit note that the date is unconfirmed, beside every price and status.",
                      "Marks every unverified claim as provisional on the page where it appears.",
                      "Makes no claim about IDX, MLS search, appraisal, mortgage approval, or guaranteed results.",
                      "Collects no visitor data of any kind.",
                    ],
                  ],
                },
                {
                  heading: "Effect of these gaps",
                  body: [
                    "Until the items above are supplied and approved, this site should not be used as public real-estate advertising in New York. It is complete and functional as a build; it is not cleared as advertising.",
                    "The moment the details are supplied, they populate from a single configuration file and appear in the footer and on this page automatically. No page needs to be rewritten.",
                  ],
                },
              ]
        }
      />
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Brokerage notices", path: "/brokerage-notices/" },
          ]),
        ]}
      />
    </>
  );
}
