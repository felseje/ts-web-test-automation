import { test, expect } from "../fixtures";

test.describe("Login Page", () => {
  test("Should open login page", async ({ loginPage, step }) => {
    // Act
    await step("Opening the login page", async () => await loginPage.open());

    // Assert
    await step("Verifying elements are enabled and visible", async () => {
      await expect(loginPage.subtitle).toBeEnabled();
      await expect(loginPage.subtitle).toBeVisible();
      await expect(loginPage.emailInput).toBeEnabled();
      await expect(loginPage.emailInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeEnabled();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.togglePasswordButton).toBeEnabled();
      await expect(loginPage.togglePasswordButton).toBeVisible();
      await expect(loginPage.submitButton).toBeEnabled();
      await expect(loginPage.submitButton).toBeVisible();
      await expect(loginPage.registerLink).toBeEnabled();
      await expect(loginPage.registerLink).toBeVisible();
      await expect(loginPage.forgotPasswordLink).toBeEnabled();
      await expect(loginPage.forgotPasswordLink).toBeVisible();
    });
  });

  test("Should login successfully", async ({
    user,
    loginPage,
    accountPage,
    step
  }) => {
    // Arrange
    const { payload, created } = user;
    const expectedUserName = `${created.first_name.trim()} ${created.last_name.trim()}`;

    // Act
    await step(
      "Navigating to login page and submitting credentials",
      async () => {
        await loginPage.open();
        await loginPage.login(created.email, payload.password);
      }
    );

    // Assert
    await step("Verifying redirection to the account page", async () => {
      await expect(accountPage.pageTitle).toBeVisible();
      await expect(accountPage.pageTitle).toHaveText("My account");
      await expect(accountPage.navMenu).toBeEnabled();
      await expect(accountPage.navMenu).toBeVisible();
      await expect(accountPage.navMenu).toHaveText(expectedUserName);
    });
  });

  test("Should display an error alert when invalid credentials are entered", async ({
    loginPage,
    step
  }) => {
    // Arrange
    const user = { email: "zecatester@qa.com.br", password: "S3nh4@t3st3" };

    // Act
    await step("Attempting login with invalid data", async () => {
      await loginPage.open();
      await loginPage.login(user.email, user.password);
    });

    // Assert
    await step("Verifying error message display", async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage.trim()).toBe("Invalid email or password");
    });
  });

  test("Should redirect to the register page", async ({
    loginPage,
    registerPage,
    step
  }) => {
    // Arrange
    await step("Opening the login page", async () => await loginPage.open());

    // Act
    await step(
      "Clicking the register link",
      async () => await loginPage.clickRegisterLink()
    );

    // Assert
    await step("Verifying redirection to the register page", async () => {
      await expect(registerPage.subtitle).toBeVisible();
      await expect(registerPage.registerButton).toBeEnabled();
    });
  });
});
