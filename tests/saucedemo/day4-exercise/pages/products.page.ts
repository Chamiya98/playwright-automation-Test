import { Locator, Page, expect } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly productsTitle: Locator;
  readonly productsCount: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsTitle = page.locator(".title");
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.productsCount = page.locator(".inventory_item");
  }
  
  async addProductToCartByName(productName: string) {
    await this.page.locator(`[data-test="add-to-cart-${productName}"]`).click();
  }

  async verifyProductCount(value: number) {
    await expect(this.productsCount).toHaveCount(value);
  }
}
