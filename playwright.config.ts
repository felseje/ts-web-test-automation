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
    headless: true,
    trace: "on-first-retry",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
    testIdAttribute: "data-test",
    baseURL: process.env.BASE_URL ?? ""
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } }
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ]
});
