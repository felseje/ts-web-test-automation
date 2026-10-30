import { defineConfig, devices } from "@playwright/test";
import { validateEnv } from "@utils/env-validator";
import dotenv from "dotenv";

dotenv.config();

validateEnv("API_URL", "BASE_URL", "ADMIN_EMAIL", "ADMIN_PASSWORD");

export default defineConfig({
  testDir: "./tests/specs",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ["list"],
    [
      "html",
      {
        outputFolder: "playwright-report",
        open: "never"
      }
    ]
  ],

  use: {
    ...devices["Desktop Chrome"],

    baseURL: process.env.BASE_URL,
    headless: true,

    locale: "en-US",
    timezoneId: "UTC",
    colorScheme: "light",
    deviceScaleFactor: 1,
    viewport: { width: 1366, height: 768 },

    trace: "on-first-retry",
    video: "retain-on-failure",
    screenshot: "only-on-failure",

    testIdAttribute: "data-test"
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1366, height: 768 }
      }
    }
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ]
});
