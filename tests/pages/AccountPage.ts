import { BasePage } from "@pages/BasePage";
import { Page, Locator } from "@playwright/test";

export class AccountPage extends BasePage {
  private readonly _pageTitle;
  private readonly _navMenu;
  private readonly _navMyAccount;
  private readonly _navMyFavorites;
  private readonly _navMyProfile;
  private readonly _navMyInvoices;
  private readonly _navMyMessages;
  private readonly _navSignOut;
  private readonly _navFavorites;
  private readonly _navProfile;
  private readonly _navInvoices;
  private readonly _navMessages;

  public constructor(page: Page) {
    super(page);
    this._pageTitle = page.getByTestId("page-title");
    this._navMenu = page.getByTestId("nav-menu");
    this._navMyAccount = page.getByTestId("nav-my-account");
    this._navMyFavorites = page.getByTestId("nav-my-favorites");
    this._navMyProfile = page.getByTestId("nav-my-profile");
    this._navMyInvoices = page.getByTestId("nav-my-invoices");
    this._navMyMessages = page.getByTestId("nav-my-messages");
    this._navSignOut = page.getByTestId("nav-sign-out");
    this._navFavorites = page.getByTestId("nav-favorites");
    this._navProfile = page.getByTestId("nav-profile");
    this._navInvoices = page.getByTestId("nav-invoices");
    this._navMessages = page.getByTestId("nav-messages");
  }

  public get pageTitle(): Locator {
    return this._pageTitle;
  }

  public async getPageTitle(): Promise<string> {
    return await super.getText(this._pageTitle);
  }

  public async getUserName(): Promise<string> {
    return await super.getText(this._navMenu);
  }
}
