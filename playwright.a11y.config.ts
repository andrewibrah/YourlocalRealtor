import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/a11y",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4174",
    trace: "on-first-retry",
    /*
     * Scan the settled state.
     *
     * Without this, axe samples colours while scroll-reveal transitions are
     * still interpolating opacity and reports contrast failures against blended
     * intermediate values that no user ever reads. Reduced motion collapses
     * those transitions to 1ms, so every measurement is taken at rest — and it
     * also means the reduced-motion experience is the one being audited, which
     * is the stricter of the two.
     */
    contextOptions: { reducedMotion: "reduce" },
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run build && node scripts/static-server.mjs out 4174",
    url: "http://127.0.0.1:4174",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
