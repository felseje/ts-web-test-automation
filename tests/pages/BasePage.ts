import { Locator, Page, Response, test } from "@playwright/test";
import type { HttpMethod } from "@models/http-verbs";

interface WaitForResponseOptions {
  url: string | RegExp;
  method?: HttpMethod;
  timeout?: number;
}

export abstract class BasePage {
  readonly navSignIn: Locator;
  readonly navMenu: Locator;

  protected constructor(protected readonly page: Page) {
    this.navSignIn = page.getByTestId("nav-sign-in");
    this.navMenu = page.getByTestId("nav-menu");
  }

  protected async waitForResponse(
    { url, method, timeout }: WaitForResponseOptions,
    action: () => Promise<unknown>
  ): Promise<Response> {
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (response) => {
          if (method && response.request().method() !== method) {
            return false;
          }

          const responseUrl = response.url();
          return url instanceof RegExp
            ? url.test(responseUrl)
            : responseUrl === url;
        },
        { timeout }
      ),
      action()
    ]);

    return response;
  }

  protected async navigate(path: string): Promise<void> {
    await this.page.goto(path);
  }

  protected async reload(): Promise<void> {
    await this.page.reload();
  }

  protected async goBack(): Promise<void> {
    await this.page.goBack();
  }

  protected async goForward(): Promise<void> {
    await this.page.goForward();
  }

  protected async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  protected async fill(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }

  protected async type(
    locator: Locator,
    value: string,
    delay: number = 75
  ): Promise<void> {
    await locator.pressSequentially(value, { delay: delay });
  }

  protected async selectOption(locator: Locator, value: string): Promise<void> {
    await locator.selectOption(value);
  }

  protected async check(locator: Locator): Promise<void> {
    await locator.check();
  }

  protected async uncheck(locator: Locator): Promise<void> {
    await locator.uncheck();
  }

  protected async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  protected async isEnabled(locator: Locator): Promise<boolean> {
    return locator.isEnabled();
  }

  protected async getText(locator: Locator): Promise<string> {
    return (await locator.textContent()) ?? "";
  }

  protected async getValue(locator: Locator): Promise<string> {
    return locator.inputValue();
  }

  protected async clearAll(...locators: Locator[]): Promise<void> {
    for (const locator of locators) {
      // eslint-disable-next-line no-await-in-loop
      await locator.clear();
    }
  }

  protected async waitForVisible(
    locator: Locator,
    ignore: boolean = false
  ): Promise<void> {
    try {
      await locator.waitFor({ state: "visible", timeout: 2_500 });
      await locator.scrollIntoViewIfNeeded();
    } catch (e) {
      if (ignore) {
        console.warn(
          `An exception occurred while waiting for locator '${locator}'`,
          e
        );
        return;
      }
      throw e;
    }
  }

  protected async waitForHidden(locator: Locator): Promise<void> {
    await locator.waitFor({ state: "hidden" });
  }

  protected async waitForUrl(url: string | RegExp): Promise<void> {
    await this.page.waitForURL(url);
  }

  protected async press(locator: Locator, key: string): Promise<void> {
    await locator.press(key);
  }

  protected async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  protected async takeScreenshot(title?: string): Promise<void> {
    if (this.page.isClosed()) {
      return;
    }

    try {
      const currentTestInfo = test.info();
      const screenshot = await this.page.screenshot({ fullPage: true });
      const name = title ?? currentTestInfo.title;

      await currentTestInfo.attach(`${name}.png`, {
        body: screenshot,
        contentType: "image/png"
      });
    } catch (err) {
      console.warn(`Falha ao tirar print na página: ${err}`);
    }
  }
}
