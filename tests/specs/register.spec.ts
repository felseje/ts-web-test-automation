import { test, expect } from "../fixtures";
import { generateUser } from "@factories/user-factory";

test.describe("Register Page", () => {
  test("Should open the register page and display form elements", async ({
    registerPage,
    step
  }) => {
    // Act
    await step(
      "Opening the register page",
      async () => await registerPage.open()
    );

    // Assert
    await step("Verifying form fields and elements are enabled", async () => {
      await expect(registerPage.subtitle).toBeVisible();
      await expect(registerPage.firstNameInput).toBeEnabled();
      await expect(registerPage.lastNameInput).toBeEnabled();
      await expect(registerPage.dateOfBirthInput).toBeEnabled();
      await expect(registerPage.countrySelect).toBeEnabled();
      await expect(registerPage.postalCodeInput).toBeEnabled();
      await expect(registerPage.houseNumberInput).toBeEnabled();
      await expect(registerPage.streetInput).toBeEnabled();
      await expect(registerPage.cityInput).toBeEnabled();
      await expect(registerPage.stateInput).toBeEnabled();
      await expect(registerPage.phoneInput).toBeEnabled();
      await expect(registerPage.emailInput).toBeEnabled();
      await expect(registerPage.passwordInput).toBeEnabled();
      await expect(registerPage.registerButton).toBeEnabled();
    });
  });

  test("Should register a new user", async ({
    registerPage,
    loginPage,
    step
  }) => {
    // Arrange
    const userData = generateUser();

    // Act
    const response = await step(
      "Opening the page, filling out the registration form, and submitting it",
      async () => {
        await registerPage.open();
        return await registerPage.registerUser(userData);
      }
    );

    // Assert
    await step(
      "Verifying successful redirection to the login page",
      async () => {
        expect(response.status()).toBe(201);
        await expect(loginPage.subtitle).toBeVisible();
      }
    );
  });
});
