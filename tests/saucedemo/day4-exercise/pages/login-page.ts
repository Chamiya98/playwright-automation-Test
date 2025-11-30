import { Locator, Page, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly closeErrorButton: Locator;
  readonly homePageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole("textbox", { name: "Username" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.errorMessage = page.locator('h3[data-test="error"]');
    this.closeErrorButton = page.locator('button[class="error-button"]');
    this.homePageTitle = page.locator(".title");
  }

  async goto() {
    await this.page.goto("/");
    expect(this.page).toHaveTitle("Swag Labs");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async closeError() {
    await this.closeErrorButton.click();
  }

  async verifySuccessfulLogin() {
    await expect(this.homePageTitle).toBeVisible();
    await expect(this.homePageTitle).toHaveText("Products");
  }

  async verifyLoginError(message: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
  }
}
