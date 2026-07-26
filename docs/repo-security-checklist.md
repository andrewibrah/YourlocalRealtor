# Repository Security Checklist

This checklist documents the manual GitHub repository settings that must be configured via the GitHub UI/API before production launch. These settings cannot be configured by editing files in the repository.

## Manual Configuration (GitHub UI/API)

- [ ] **GitHub Pages Publishing Source**
  - Navigate to Settings > Pages
  - Set "Build and deployment" → "Source" to "GitHub Actions"

- [ ] **GitHub Pages Deployment Environment**
  - Navigate to Settings > Environments
  - Create the `github-pages` environment
  - Configure environment protection rules (require reviewers and/or restrict deployment to `main` branch)

- [ ] **Dependabot Configuration**
  - Navigate to Settings > Code security and analysis
  - Enable "Dependabot alerts"
  - Enable "Dependency graph"
  - Enable "Dependabot security updates"

- [ ] **Secret Scanning**
  - Navigate to Settings > Code security and analysis
  - Enable "Secret scanning"
  - Enable "Push protection" (optional but recommended)

- [ ] **HTTPS Enforcement**
  - Navigate to Settings > Pages
  - Enable "Enforce HTTPS" for the GitHub Pages site
  - If using a custom domain, ensure it is configured with appropriate DNS records and HTTPS support

- [ ] **Branch Protection Rules**
  - Navigate to Settings > Branches
  - Add branch protection rule for `main`:
    - Require pull request reviews before merging (suggest 1 reviewer minimum)
    - Require status checks to pass before merging (enforce CI status checks)
    - Require branches to be up to date before merging

- [ ] **Action Version Pinning (Blocking Follow-up Task)**
  - Before production deployment, replace all `@v<N>` major-version action tags in `.github/workflows/*.yml` files with reviewed immutable commit SHAs
  - This includes:
    - `actions/checkout@v4` → `actions/checkout@<SHA>`
    - `actions/setup-node@v4` → `actions/setup-node@<SHA>`
    - `actions/configure-pages@v5` → `actions/configure-pages@<SHA>`
    - `actions/upload-pages-artifact@v3` → `actions/upload-pages-artifact@<SHA>`
    - `actions/deploy-pages@v5` → `actions/deploy-pages@<SHA>`
    - `github/codeql-action/*@v3` → `github/codeql-action/*@<SHA>`
    - `actions/dependency-review-action@v4` → `actions/dependency-review-action@<SHA>`
  - Find commit SHAs via GitHub release pages or `git ls-remote`
  - This ensures immutable action versions for security and reproducibility

## Automated Configuration (Already Implemented)

The following security controls are configured via repository files and workflows:

- ✅ **CI/CD Pipeline** (`.github/workflows/ci.yml`)
  - Lint, type check, unit tests, accessibility tests, and e2e tests on all pull requests and pushes to main
  - Static export build verification

- ✅ **GitHub Pages Deployment** (`.github/workflows/deploy-pages.yml`)
  - Automatic deployment to GitHub Pages on push to main
  - Least-privilege permissions: `pages: write`, `id-token: write` on deploy job only
  - Read-only permissions on build job

- ✅ **Dependabot Configuration** (`.github/dependabot.yml`)
  - Weekly npm dependency updates (groups minor/patch, max 10 PRs)
  - Weekly GitHub Actions dependency updates

- ✅ **CodeQL Static Analysis** (`.github/workflows/codeql.yml`)
  - Automatic CodeQL scanning on pull requests and pushes to main
  - Weekly scheduled scans
  - JavaScript/TypeScript language analysis

- ✅ **Dependency Review** (`.github/workflows/dependency-review.yml`)
  - Automated dependency review on all pull requests
  - Fails on high-severity security vulnerabilities
