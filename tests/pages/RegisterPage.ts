import { Locator, Page, Response } from "@playwright/test";
import { BasePage } from "./BasePage";
import { UserData } from "@models/UserData";
import type { PersonalData } from "@models/PersonalData";
import type { ContactData } from "@models/ContactData";
import type { AddressData } from "@models/AddressData";

export class RegisterPage extends BasePage {
  private readonly _subtitle: Locator;
  private readonly _firstNameInput: Locator;
  private readonly _lastNameInput: Locator;
  private readonly _dateOfBirthInput: Locator;
  private readonly _countrySelect: Locator;
  private readonly _postalCodeLookupLoading: Locator;
  private readonly _postalCodeInput: Locator;
  private readonly _houseNumberInput: Locator;
  private readonly _streetInput: Locator;
  private readonly _cityInput: Locator;
  private readonly _stateInput: Locator;
  private readonly _phoneInput: Locator;
  private readonly _emailInput: Locator;
  private readonly _passwordInput: Locator;
  private readonly _registerButton: Locator;

  public static readonly URL: string =
    "https://practicesoftwaretesting.com/auth/register";

  public constructor(page: Page) {
    super(page);
    this._subtitle = page.locator(
      "//h3[contains(text(),'Customer registration')]"
    );
    this._firstNameInput = page.getByTestId("first-name");
    this._lastNameInput = page.getByTestId("last-name");
    this._dateOfBirthInput = page.getByTestId("dob");
    this._countrySelect = page.getByTestId("country");
    this._postalCodeLookupLoading = page.getByTestId("postcode-lookup-loading");
    this._postalCodeInput = page.getByTestId("postal_code");
    this._houseNumberInput = page.getByTestId("house_number");
    this._streetInput = page.getByTestId("street");
    this._cityInput = page.getByTestId("city");
    this._stateInput = page.getByTestId("state");
    this._phoneInput = page.getByTestId("phone");
    this._emailInput = page.getByTestId("email");
    this._passwordInput = page.getByTestId("password");
    this._registerButton = page.getByTestId("register-submit");
  }

  public get subtitle(): Locator {
    return this._subtitle;
  }

  public get firstNameInput(): Locator {
    return this._firstNameInput;
  }

  public get lastNameInput(): Locator {
    return this._lastNameInput;
  }

  public get dateOfBirthInput(): Locator {
    return this._dateOfBirthInput;
  }

  public get countrySelect(): Locator {
    return this._countrySelect;
  }

  public get postalCodeInput(): Locator {
    return this._postalCodeInput;
  }

  public get houseNumberInput(): Locator {
    return this._houseNumberInput;
  }

  public get streetInput(): Locator {
    return this._streetInput;
  }

  public get cityInput(): Locator {
    return this._cityInput;
  }

  public get stateInput(): Locator {
    return this._stateInput;
  }

  public get phoneInput(): Locator {
    return this._phoneInput;
  }

  public get emailInput(): Locator {
    return this._emailInput;
  }

  public get passwordInput(): Locator {
    return this._passwordInput;
  }

  public get registerButton(): Locator {
    return this._registerButton;
  }

  public async open() {
    await super.navigate(RegisterPage.URL);
  }

  public async typeFirstName(firstName: string) {
    await super.type(this._firstNameInput, firstName);
  }

  public async typeLastName(lastName: string) {
    await super.type(this._lastNameInput, lastName);
  }

  public async typeDateOfBirth(dateOfBirth: string) {
    await super.type(this._dateOfBirthInput, dateOfBirth);
  }

  public async selectCountry(country: string) {
    await super.selectOption(this._countrySelect, country);
  }

  public async typePostalCode(postalCode: string) {
    await super.type(this._postalCodeInput, postalCode);
  }

  public async typeHouseNumber(houseNumber: string) {
    await super.type(this._houseNumberInput, houseNumber);
  }

  public async typeStreet(street: string) {
    await super.type(this._streetInput, street);
  }

  public async typeCity(city: string) {
    await super.type(this._cityInput, city);
  }

  public async typeState(state: string) {
    await super.type(this._stateInput, state);
  }

  public async typePhone(phone: string) {
    await super.type(this._phoneInput, phone);
  }

  public async typeEmail(email: string) {
    await super.type(this._emailInput, email);
  }

  public async typePassword(password: string) {
    await super.type(this._passwordInput, password);
  }

  public async clickRegisterButton() {
    await super.click(this._registerButton);
  }

  public async typePersonalData(personalData: PersonalData) {
    await this._firstNameInput.scrollIntoViewIfNeeded();
    await this.typeFirstName(personalData.firstName);
    await this.typeLastName(personalData.lastName);
    await this.typeDateOfBirth(personalData.dateOfBirth);
  }

  public async typeAddressData(addressData: AddressData) {
    await this._countrySelect.scrollIntoViewIfNeeded();
    await this.selectCountry(addressData.country);
    await this.typePostalCode(addressData.postalCode);
    await this.typeHouseNumber(addressData.houseNumber);
    await super.waitForVisible(this._postalCodeLookupLoading);
    await super.waitForHidden(this._postalCodeLookupLoading);
    await super.clearAll(this._streetInput, this._cityInput, this._stateInput);
    await this.typeStreet(addressData.street);
    await this.typeCity(addressData.city);
    await this.typeState(addressData.state);
  }

  public async typeContactData(contactData: ContactData) {
    await this._phoneInput.scrollIntoViewIfNeeded();
    await this.typePhone(contactData.phone);
    await this.typeEmail(contactData.email);
  }

  public async registerUser(userData: UserData): Promise<Response> {
    await this.typePersonalData(userData.personal);
    await super.takeScreenshot();
    await this.typeAddressData(userData.address);
    await super.takeScreenshot();
    await this.typeContactData(userData.contact);
    await super.takeScreenshot();
    await this.typePassword(userData.password);
    await super.takeScreenshot();
    await this._registerButton.scrollIntoViewIfNeeded();
    return this.waitForResponse(
      {
        url: /\/users\/register$/,
        method: "POST",
        timeout: 10_000
      },
      async () => {
        await this.clickRegisterButton();
      }
    );
  }
}
