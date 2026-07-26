import type { Metadata } from "next";

import { NoticePage } from "@/components/layout/NoticePage";
import { JsonLd, breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Fair housing",
  description:
    "Equal housing opportunity, the protected classes under federal, New York State, and New York City law, and how this site is written to avoid steering.",
  path: "/fair-housing/",
});

export default function FairHousingPage() {
  return (
    <>
      <NoticePage
        index="15"
        eyebrow="Fair housing"
        title="Equal housing opportunity."
        standfirst="Real-estate services described on this site are offered to everyone on the same terms. This page also explains the editorial rules this site follows so that its own copy cannot steer anyone."
        lastReviewed="26 July 2026"
        blocks={[
          {
            heading: "The commitment",
            body: [
              "All real-estate services described on this website are offered without regard to race, colour, religion, sex, disability, familial status, or national origin, as required by the federal Fair Housing Act.",
              "New York State and New York City law protect additional classes, which may include age, creed, sexual orientation, gender identity or expression, military status, marital status, partnership status, lawful source of income including housing vouchers, immigration or citizenship status, status as a victim of domestic violence, and pregnancy.",
              "Refusing to rent or sell, or treating anyone differently in the terms of a transaction, on any of those bases is unlawful.",
            ],
          },
          {
            heading: "Source of income",
            body: [
              "In New York, refusing to consider a prospective buyer or tenant because of their lawful source of income — including housing assistance vouchers, Social Security, disability benefits, alimony, or child support — is unlawful.",
            ],
          },
          {
            heading: "How this site is written",
            body: [
              "Steering happens through description as much as through refusal. A site that describes one area as suitable for a particular kind of person is steering, whether or not it intends to be.",
              "So this site follows a specific editorial rule: it does not characterise neighbourhoods subjectively at all.",
              "You will not find the words safe, family-friendly, up-and-coming, desirable, exclusive, prestigious, or good schools anywhere on this site describing a location. Not because those words are individually forbidden in every context, but because they invite the reader to infer who belongs somewhere — and that inference is the harm.",
              "What is published instead is objective and checkable: addresses, postal codes, property types, transaction outcomes, and dates. If you want to know about schools, commutes, services, or anything else about an area, those are questions with public, official sources, and you should use them and reach your own conclusions.",
            ],
          },
          {
            heading: "Advertising and targeting",
            body: [
              "No demographic targeting is used to decide who sees marketing for a property. Marketing is not directed towards or away from any protected class.",
              "Property descriptions describe the property, not the kind of person who should live in it.",
            ],
          },
          {
            heading: "If you believe you have been discriminated against",
            body: [
              "You can file a complaint with the U.S. Department of Housing and Urban Development, the New York State Division of Human Rights, or the New York City Commission on Human Rights, depending on where the conduct occurred.",
              "You do not need permission from anyone involved in the transaction to do so, and you do not need to raise it with them first.",
            ],
          },
          {
            heading: "Status of this notice",
            body: [
              "New York requires specific fair-housing notice and disclosure language, in a specified form, to be provided and displayed by licensees. The exact required notice, the current New York Department of State advertising checklist, and the official Equal Housing Opportunity artwork have not yet been reviewed and approved for this site by the brokerage's compliance process.",
              "Until that review is complete, this page states the commitment and the editorial rules in plain terms. It is not a substitute for the official required notice, and it is not legal advice.",
            ],
          },
        ]}
      />
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Fair housing", path: "/fair-housing/" },
          ]),
        ]}
      />
    </>
  );
}
