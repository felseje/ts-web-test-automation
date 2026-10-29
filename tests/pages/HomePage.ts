import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productCards: Locator;
  readonly productNames: Locator;
  readonly searchCaption: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.getByTestId("search-query");
    this.searchButton = page.getByTestId("search-submit");
    this.productCards = page.locator("a.card");
    this.productNames = page.getByTestId("product-name");
    this.searchCaption = page.getByTestId("search-caption");
  }

  async open() {
    await super.navigate("/");
  }

  async searchFor(term: string) {
    await super.fill(this.searchInput, term);
    await super.click(this.searchButton);
  }
}
