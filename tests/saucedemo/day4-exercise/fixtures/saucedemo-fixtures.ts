import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { ProductsPage } from "../pages/products.page";

export const test = base.extend<{
  loginPage: LoginPage;
  productsPage: ProductsPage;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },
});

export const expect = test.expect;
