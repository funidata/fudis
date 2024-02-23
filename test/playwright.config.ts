import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./visual-regression",
  /* Run tests __in files__ in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI || process.env.CONTAINER ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html", { host: "0.0.0.0" }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:6006",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },
  /* Configure projects for major browsers */
  projects: [
    /*
     * Chrome and Edge are not included here on purpose because they will be installed globally
     * meaning that if someone installs Playwright browsers on their local machine, their regular
     * Chrome might be messed up.
     *
     * DO NOT enable Chrome or Edge here without consulting with the team first. Chromium should
     * be enough for now, and if we decide to test against Chrome, it should probably be done only
     * in containers.
     *
     * Note that `devices["Desktop Chrome"]` installs chromium by default which should cover
     * testing against Chrome and Edge.
     * See https://playwright.dev/docs/browsers#chromium for more.
     */
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    /* Test against mobile viewports. */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
    {
      name: "Mobile Safari Big Landscape",
      use: { ...devices["iPhone 14 Pro Max landscape"] },
    },
    {
      name: "Mobile Chrome Big Landscape",
      use: { ...devices["Pixel 7 landscape"] },
    },
  ],
});
