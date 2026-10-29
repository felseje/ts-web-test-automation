import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  private readonly _subtitle: Locator;
  private readonly _emailInput: Locator;
  private readonly _passwordInput: Locator;
  private readonly _submitButton: Locator;
  private readonly _errorMessage: Locator;
  private readonly _togglePasswordButton: Locator;
  private readonly _registerLink: Locator;
  private readonly _forgotPasswordLink: Locator;

  public static readonly URL: string =
    "https://practicesoftwaretesting.com/auth/login";

  public constructor(page: Page) {
    super(page);
    this._subtitle = page.locator("//h3[contains(text(),'Login')]");
    this._emailInput = page.getByTestId("email");
    this._passwordInput = page.getByTestId("password");
    this._submitButton = page.getByTestId("login-submit");
    this._errorMessage = page.getByTestId("login-error");
    this._togglePasswordButton = page.locator(
      "//input/parent::div/child::div/child::button"
    );
    this._registerLink = this.page.getByTestId("register-link");
    this._forgotPasswordLink = this.page.getByTestId("forgot-password-link");
  }

  public get subtitle(): Locator {
    return this._subtitle;
  }

  public get emailInput(): Locator {
    return this._emailInput;
  }

  public get passwordInput(): Locator {
    return this._passwordInput;
  }

  public get submitButton(): Locator {
    return this._submitButton;
  }

  public get errorMessage(): Locator {
    return this._errorMessage;
  }

  public get togglePasswordButton(): Locator {
    return this._togglePasswordButton;
  }

  public get registerLink(): Locator {
    return this._registerLink;
  }

  public get forgotPasswordLink(): Locator {
    return this._forgotPasswordLink;
  }

  public async getErrorMessage(): Promise<string> {
    return super.getText(this._errorMessage);
  }

  public async open() {
    await super.navigate(LoginPage.URL);
  }

  public async typeEmail(email: string) {
    await super.type(this._emailInput, email);
  }

  public async typePassword(password: string) {
    await super.type(this._passwordInput, password);
  }

  public async clickSubmit() {
    await super.click(this._submitButton);
  }

  public async clickTogglePassword() {
    await super.click(this._togglePasswordButton);
  }

  public async clickRegisterLink() {
    await super.click(this._registerLink);
  }

  public async clickForgotPasswordLink() {
    await super.click(this._forgotPasswordLink);
  }

  public async login(email: string, password: string) {
    await this._emailInput.scrollIntoViewIfNeeded();
    await this.typeEmail(email);
    await this.typePassword(password);
    await this.takeScreenshot();
    await this._submitButton.scrollIntoViewIfNeeded();
    await this.clickSubmit();
  }
}
