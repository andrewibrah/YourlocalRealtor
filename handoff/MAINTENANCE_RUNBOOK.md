# Maintenance runbook

Everything routine, with the exact file to change.

---

## Go-live checklist

Deployed to https://andrewibrah.github.io/YourlocalRealtor/ on 2026-07-26.

1. ~~Create the GitHub repository and push.~~ Done — `andrewibrah/YourlocalRealtor`.
2. ~~Settings → Pages → Source: GitHub Actions.~~ Done.
3. **Settings → Environments →** create `github-pages` and restrict deployments
   to `main`. *Still outstanding — deployment currently has no branch
   protection.*
4. **Set `NEXT_PUBLIC_SITE_URL`** to the real URL (repository variable). Without
   it, canonicals and the sitemap point at `example.invalid`.
5. If deploying to `user.github.io/<repo>` rather than a custom domain, **set
   `NEXT_PUBLIC_BASE_PATH=/<repo>`**.
6. **Pin every GitHub Action to a commit SHA** — see
   `docs/repo-security-checklist.md`.
7. **Enable** Dependabot alerts, secret scanning, push protection, branch
   protection on `main`, and Enforce HTTPS.
8. **Clear the blockers** in `docs/content-verification.md` §1.

---

## Common changes

### Add a closed transaction

`src/content/proof.ts` — one record. Then add the matching property in
`src/content/properties.ts` and reference it from the relevant area in
`src/content/areas.ts`.

The transaction appears automatically on the home page, `/results/`, the area
page, and the property page. Cross-references are validated by test.

### Add or update a listing

`src/content/properties.ts`, `status: "listed"`. The availability caveat is
attached by the content layer — it cannot be forgotten.

**When a listing sells:** change `status` to `"sold"`, change the price label
from `"Listed at"` to `"Sold for"`, and set `statusAsOf` to the closing date.

### Add a film

See `handoff/MEDIA_WORKFLOW.md`. Three scripts, one content record.

### Approve the brokerage details

`src/lib/site-config.ts` → `brokerage.licensedTitle` and
`brokerage.licenseNumber`.

Setting both removes the pending notices in the footer and on `/about/`, makes
`/brokerage-notices/` indexable, and adds it to the sitemap and `robots.txt`.

### Add the email address

Set `NEXT_PUBLIC_EMAIL`. The email action switches from "Not yet live" to a real
`mailto:` with a starter subject and body.

### Add a scheduling link

Set `NEXT_PUBLIC_SCHEDULING_URL`. Must be HTTPS — anything else is rejected and
the action stays hidden.

### Mark content as verified

After the business owner confirms a claim:

1. Change `verification` to `"verified"` on the record.
2. Record the evidence in `docs/content-verification.md`.
3. Run `npm run test:unit` — a test asserts nothing is `verified` while it is
   still listed as outstanding, so this fails until step 2 is real.

The on-page provisional marker disappears automatically.

### Add a coverage area

`src/content/areas.ts`. **Only add an area with documented transactions behind
it.** A test enforces that no two areas share a proof story. An area page with
nothing specific to it is a doorway page, and those get penalised — see
`docs/seo-strategy.md`.

### Change a colour, size, or spacing value

`src/app/globals.css`, inside `@theme`. Nothing else defines visual values.

**If you add a new `text-*` size token, add it to the `font-size` list in
`src/lib/utils.ts`** or `tailwind-merge` will silently drop it wherever a text
colour is also applied.

---

## Deploying

Push to `main`. The workflow lints, type-checks, runs all three suites, builds,
verifies `out/index.html`, and deploys.

A failing test blocks deployment. That is the point — do not weaken a test to
make a deploy pass.

## A trap worth knowing about

`NEXT_PUBLIC_BASE_PATH` is set on the **build step** of `deploy-pages.yml`, not
on the workflow.

That is deliberate. As a workflow-level `env` it also reached the test step,
whose Playwright suites build and serve the site themselves and then navigate to
`/`, `/buy/`, and so on. A base-path build served from the root 404s on every
one of those, so the entire suite failed and the deploy never ran — the first
Pages deployment failed for exactly this reason.

Only the artifact that ships needs the subpath. If you move the variables back
up to workflow level, CI will go red and the cause will not be obvious.

## Rolling back

1. **Re-run a previous deployment.** Actions → Deploy GitHub Pages → the last
   good run → *Re-run all jobs*. Fastest path.
2. **Revert and push.** `git revert <sha> && git push`. The workflow redeploys
   automatically.

**The rollback drill has not been performed.** Now that the site is live, do it
once and confirm the production URL serves the previous version.

## Backups

- **Source and content:** git. Push to GitHub.
- **Video masters:** `sharif-site-definition/assets/videos/`, ~50 MB. These are
  the only copies in this repository and they are not a backup. **Keep them
  somewhere else as well.** Actions artifacts are not a backup either.
- **Rights evidence** (releases, permissions, music licences): keep **outside**
  this repository. It is public.

## Incident procedure

1. Disable the affected media, link, or page — do not take the whole site down.
2. Revoke anything exposed; preserve logs.
3. Notify the code and business contacts.
4. Determine what was affected, with counsel if personal data is involved.
5. The business owner and counsel decide on notifications.
6. Correct, verify, document, then restore.

Because the site holds no personal data, no secrets, and no accounts, the
realistic incident is a content error — a wrong price, an unapproved review — and
the response is to correct the content record and redeploy.

## Health checks

| When | What |
| --- | --- |
| Weekly | Dependabot pull requests |
| Monthly | Confirm contact links still work on a real phone |
| Monthly | Confirm listing statuses are still accurate |
| Quarterly | Lighthouse against the production URL |
| Quarterly | Re-read `docs/content-verification.md` for items that have since been resolved |
| On any content change | `npm run test:unit` |
