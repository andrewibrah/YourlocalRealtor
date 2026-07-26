# Risk, Security, Accessibility, and Regulatory Minimums

This is a product and engineering control document, not legal advice or a
substitute for counsel, the brokerage's compliance process, a signed services
agreement, or a current regulatory review. The final business entity,
brokerage relationship, operating locations, integrations, and campaign
methods determine the exact obligations.

## Default risk posture

The first release is a public marketing site with no user accounts, no
submission form, no file uploads, no payments, no valuation engine, no
mortgage qualification, no IDX/MLS search, and no collection of visitor data
by the application. Data avoidance is the primary risk control.

## Blocking minimum standards

### Security and privacy

- OWASP ASVS 5.0 Level 1 principles applied to the static application,
  build/deployment chain, and integrations.
- NIST SSDF 1.1-informed build controls: protected source, reviewed changes,
  reproducible builds where practical, dependency provenance, and documented
  remediation.
- HTTPS enforcement, least-privilege Actions permissions, approved media
  origins, protected deployment environment, and safe failure states.
- Dependency lockfile, automated dependency/secret/SAST checks, release SBOM,
  and no unresolved critical or high exploitable findings.
- No personal data in URLs, analytics, replay tools, logs, error traces,
  frontend bundles, fixtures, or public issue trackers.
- No hidden administrator access, shared credentials, or developer backdoors.
- Maintain processor inventory, data flow, retention/deletion plan, backup and
  recovery procedure, incident contacts, and secret-rotation handoff.

The New York SHIELD Act requires reasonable safeguards when a business holds
New Yorkers' private information. V1 does not collect it.

### Data restrictions

The application collects nothing in v1. `tel:`, `sms:`, and `mailto:` hand
control to software chosen by the visitor. Prefilled copy contains no sensitive
details. The site does not embed a client-side mailer, public database write,
form relay, tracking pixel, session replay, or exposed API key.

Prohibited: Social Security number, birth date, ID, tax return, bank statement,
account or routing number, credit report, preapproval file, precise asset/debt
record, access code, protected-class data, document upload, or lead form.

### GitHub Pages limitation

GitHub Pages does not expose arbitrary custom HTTP response-header
configuration. Full CSP/HSTS/Permissions-Policy/X-Frame-Options control is
therefore unavailable. Record this as an accepted hosting limitation. The
compensating controls are a static-only application, HTTPS enforcement, no
secrets, no forms, no authentication, no private data, minimal dependencies,
no third-party scripts by default, and dependency/build review. Do not claim
full security-header compliance.

### Accessibility

- WCAG 2.2 AA is the technical release target.
- Semantic landmarks, logical headings, skip link, keyboard operability,
  visible focus, predictable focus order, and accessible names.
- Contrast: 4.5:1 normal text, 3:1 large text and essential UI graphics.
- Touch targets meet WCAG 2.2 sizing requirements or their permitted spacing
  exception.
- Error identification, instructions, status announcements, and no timeout
  that silently loses entered data.
- Captions, transcript, pause, mute, volume, and descriptive fallback for
  speech/video; no dependency on autoplay.
- 200% zoom and 400% text resize remain usable without two-dimensional
  scrolling except where intrinsically necessary.
- Reduced motion removes nonessential travel and loops.
- Automated testing is necessary but insufficient: manual keyboard,
  screen-reader, zoom, contrast, video, and real-device review are blockers.

### Real-estate advertising and fair housing

- A New York brokerage/compliance reviewer must approve the final license,
  brokerage identity, advertising disclosure, team/title language, contact
  information, and required fair-housing notice/link using the current New
  York Department of State checklist.
- Show the Equal Housing Opportunity mark/statement where approved and use
  official artwork.
- Never use demographic targeting or language that expresses a preference,
  limitation, or exclusion related to a protected class.
- Avoid steering language and subjective neighborhood claims such as “safe,”
  “family-friendly,” or “good schools.” Use objective, sourced information and
  let users make their own choices.
- Verify property status, price, transaction role, list/sale comparison, date,
  scope, and attribution. Add “as of” dates where information changes.
- Do not imply an active listing, licensed IDX service, appraisal, guaranteed
  result, mortgage approval, investment return, legal advice, or tax advice.

### Media, testimonial, and marketing rights

- Obtain written rights for footage, photography, music, logos, properties,
  on-camera participants, testimonials, and any MLS-derived material.
- Instagram availability does not establish website reuse rights. Do not
  scrape, hotlink, or assume an Instagram music license transfers to the site.
- Preserve review meaning; edits may shorten for readability but cannot alter
  the claim. Keep attribution and permission evidence.
- Marketing texts and automated calls remain off until consent language,
  consent records, vendor behavior, opt-out handling, and TCPA compliance are
  approved.
- Commercial email must follow CAN-SPAM requirements, including accurate
  sender/subject information, identification where required, a valid physical
  address, and a functioning opt-out process.

## Responsibility boundary

| Area | Code owner | Business owner/client | Shared |
| --- | --- | --- | --- |
| Application | Secure implementation, tests, headers, configuration and handoff documentation | Approved hosting/integration accounts and timely operational decisions | Change approval and rollback |
| Content | Render approved content accurately | Accuracy, licensing, disclosures, availability, claims and testimonial permission | Source verification |
| Data | Minimize collection, protect transport/storage, document flows | Lawful purpose, privacy notice, retention, deletion and lead handling | Processor approval and incident plan |
| Accessibility | Implement and test the technical target | Maintain accessible replacement content after handoff | Manual acceptance and remediation |
| Operations | No hidden access; remove developer repository access at handoff | Own GitHub, domain, inbox, billing and staff training | Backups, monitoring and incident contacts |
| Compliance | Surface gates and prevent unapproved technical behavior | Obtain brokerage/counsel approval and operate within it | Signed launch checklist |

These boundaries should be reflected in the contract, acceptance criteria,
warranty period, maintenance scope, third-party cost ownership, content
approval process, limitation-of-liability language, and incident procedure.

## Incident minimum

1. Disable the affected media, link, analytics, or integration without taking
   the whole site down.
2. Revoke exposed credentials and preserve relevant logs.
3. Notify the designated code and business contacts.
4. Determine affected systems/data with counsel and providers.
5. The business owner and counsel decide legally required notifications.
6. Correct, verify, document, and only then restore the affected feature.

## Authoritative references

- [W3C WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [OWASP Application Security Verification Standard](https://owasp.org/www-project-application-security-verification-standard/)
- [NIST Secure Software Development Framework 1.1](https://csrc.nist.gov/pubs/sp/800/218/final)
- [New York real-estate advertising checklist](https://dos.ny.gov/system/files/documents/2021/03/real-estate-advertising-checklist.pdf)
- [New York fair-housing guidance](https://dos.ny.gov/fair-housing-guidance)
- [New York housing and anti-discrimination notice](https://dos.ny.gov/system/files/documents/2025/03/nys-housing-and-anti-discrimination-notice_02.2025.pdf)
- [HUD Fair Housing Act overview](https://www.hud.gov/helping-americans/fair-housing-act-overview)
- [HUD Equal Housing Opportunity graphics](https://www.hud.gov/contactus/hudgraphics)
- [New York SHIELD Act guidance](https://ag.ny.gov/resources/organizations/data-breach-reporting/shield-act)
- [FCC TCPA resources](https://www.fcc.gov/tags/telephone-consumer-protection-act-tcpa)
- [FTC CAN-SPAM compliance guide](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business)
