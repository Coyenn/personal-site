import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: 'tests',

  // Run all tests in parallel.
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Parallelize across CPU cores. The site is static, so there's no shared
  // state to serialize on; let Playwright pick the worker count.
  workers: undefined,

  // Reporter to use
  reporter: 'list',

  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: 'http://localhost:3000',

    // Collect trace when retrying the failed test.
    trace: 'on-first-retry',
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  // Start the app before running tests.
  // On CI, test against a production build: routes are precompiled (every
  // request is ~ms instead of the dev server's 7-10s on-demand compile) and
  // it exercises the same output users get. Locally, use the dev server and
  // reuse one if it's already running.
  webServer: {
    command: process.env.CI ? 'bun run build && bun run start' : 'bun run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    // A cold production build needs more than the default 60s.
    timeout: 120_000,
  },
});
