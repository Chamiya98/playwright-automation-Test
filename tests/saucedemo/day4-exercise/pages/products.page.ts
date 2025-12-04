import { Locator, Page, expect } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly productsCount: Locator;
  readonly cartItems: Locator;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsCount = page.locator(".inventory_item");
    this.cartItems = page.locator(".cart_item");
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.shoppingCartBadge = page.locator(".shopping_cart_badge");
    this.shoppingCartButton = page.locator(".shopping_cart_link");
  }

  async addProductToCartByName(productName: string) {
    await this.page.locator(`[data-test="add-to-cart-${productName}"]`).click();
  }

  async verifyProductCount(value: number) {
    await expect(this.productsCount).toHaveCount(value);
  }

  async clickOnShoppingCart() {
    await this.shoppingCartButton.click();
  }

  async addToCartByIndex(index: number) {
    await this.productsCount
      .nth(index)
      .locator('button[data-test^="add-to-cart"]')
      .click();
  }

  async verifyCartItemCount(expectedCount: number) {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  async removeFromCartByIndex(index: number) {
    await this.productsCount
      .nth(index)
      .locator('button[data-test^="remove"]')
      .click();
  }
}
