import { test as base, Page, TestInfo } from "@playwright/test";

type StepFn = <T>(title: string, body: () => Promise<T>) => Promise<T>;

export const test = base.extend<{ step: StepFn }>({
  step: async ({ page }, use, testInfo) => {
    let i = 0;

    await use(async (title, body) => {
      try {
        return await base.step(title, body);
      } finally {
        await captureScreenshot(page, title, ++i, testInfo);
      }
    });
  }
});

async function captureScreenshot(
  page: Page,
  title: string,
  index: number,
  testInfo: TestInfo
): Promise<void> {
  if (page.isClosed()) {
    return;
  }

  try {
    const body = await page.screenshot({ fullPage: true });
    await testInfo.attach(title, { body, contentType: "image/png" });
  } catch (err) {
    console.warn(`Failed to screenshot "${title}":`, err);
  }
}
