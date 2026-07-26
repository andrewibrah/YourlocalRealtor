import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  // The static file server used for these runs is single-threaded and starts
  // dropping connections once the suite requests pages carrying ~40 MB of
  // media in parallel. That surfaced as ERR_CONNECTION_RESET and hydration
  // timeouts — harness noise, not product defects. One worker keeps the signal
  // trustworthy at a cost of a few seconds.
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-safari", use: { ...devices["iPhone 14"] } },
  ],
  webServer: {
    command: "npm run build && python3 -m http.server 4173 --directory out",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
