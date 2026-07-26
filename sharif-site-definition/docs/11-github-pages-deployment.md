# GitHub Actions and GitHub Pages Deployment

## Decision

GitHub Actions is the only CI/CD system. GitHub Pages is the only website host.
The application is a Next.js static export. No Vercel account, adapter,
function, analytics product, image optimizer, or runtime dependency is
permitted.

GitHub Actions performs the deployment; GitHub Pages serves the generated
HTML, CSS, JavaScript, images, captions, and video references.

## Architectural consequences

Supported:

- App Router pages that can be generated at build time;
- local typed content and JSON;
- client-side interactive components;
- native video and lightweight animation;
- static metadata, sitemap, robots, and structured data;
- custom domain and HTTPS;
- call, text, email, and approved scheduling links.

Not supported:

- Server Actions, route handlers, API routes, runtime middleware;
- server-side rendering or incremental regeneration;
- secret-backed services;
- secure form submission, authentication, sessions, or databases;
- Next.js server image optimization;
- arbitrary custom HTTP response headers.

Any agent that introduces one of these unsupported features has changed the
architecture and must fail review.

## Repository contract

Copy `templates/github-pages/` to the repository root. The build must produce
`out/`. Pages must use **GitHub Actions** as its publishing source.

Repository settings:

1. Enable Pages and select **GitHub Actions**.
2. Create/protect the `github-pages` environment.
3. Restrict production deployment to the default branch.
4. Require pull-request review and passing CI before merge.
5. Enable Dependabot alerts and dependency review.
6. Enable secret scanning and push protection where available.
7. Enforce HTTPS.
8. Configure and verify the custom domain; prevent domain takeover by keeping
   DNS and repository settings synchronized.

## Workflow behavior

- Pull requests run lint, type check, tests, static build, accessibility checks,
  and browser journeys without deploying.
- Pushes to `main` rebuild from a clean checkout and deploy the exact `out/`
  artifact.
- The deployment job receives only `pages: write` and `id-token: write`; build
  receives `contents: read`.
- Concurrency prevents overlapping production deployments.
- Production does not deploy from forks or pull-request events.
- Action references must be replaced with reviewed immutable commit SHAs
  before production and updated deliberately.

## Static-export requirements

- `output: "export"`
- `images.unoptimized: true`
- `trailingSlash: true`
- no dynamic route without `generateStaticParams`
- no request-dependent cookies, headers, or search-parameter rendering
- no server-only fetch at request time
- asset paths tested both at the Pages subpath and custom domain
- `public/.nojekyll` included

## Media strategy

GitHub Pages can host lightweight images, captions, and small video derivatives,
but large video libraries will make repository history and deployment
artifacts expensive. Keep source footage out of Git. The initial release may
ship a tightly limited, optimized set only after measuring artifact and page
weight. If GitHub limits become binding, that is a documented product limit;
do not silently introduce another host.

## Rollback

Revert the failing change and rerun the deployment workflow. Retain build
artifacts long enough to diagnose the failure, but do not treat Actions
artifacts as the only backup of source media. The rollback drill must confirm
that the previous verified version is restored at the production URL.

## Official references

- [GitHub: configure Pages publishing with Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub's official Next.js Pages workflow](https://github.com/actions/starter-workflows/blob/main/pages/nextjs.yml)
- [GitHub Actions deployments](https://docs.github.com/actions/deployment/about-deployments/deploying-with-github-actions)
- [GitHub Pages custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports)
