import { test as base } from "@playwright/test";
import { HomePage } from "@pages/HomePage";
import { AccountPage } from "@pages/AccountPage";
import { LoginPage } from "@pages/LoginPage";
import { RegisterPage } from "@pages/RegisterPage";

type Pages = {
  homePage: HomePage;
  accountPage: AccountPage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
};

export const test = base.extend<Pages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  }
});
