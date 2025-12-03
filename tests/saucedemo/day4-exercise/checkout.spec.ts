import { test, expect } from "./fixtures/saucedemo-fixtures";

test.describe("should Single product checkout", () => {
  test("should login with valid credentials.", async ({
    loginPage,
    productsPage,
    cartPage,
  }) => {
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await loginPage.verifySuccessfulLogin();

    // Add a single product to the cart
    await productsPage.addToCartByIndex(0);

    // Verify that the shopping cart badge shows 1 item
    await expect(productsPage.shoppingCartBadge).toBeVisible();
    await expect(productsPage.shoppingCartBadge).toHaveText("1");

    // Navigate to the cart page
    await productsPage.clickOnShoppingCart();

    // Verify that the cart page shows 1 item
    const cartItems = productsPage.page.locator(".cart_item");
    await expect(cartItems).toHaveCount(1);

    // Proceed to checkout
    await cartPage.checkoutButton.click();

    // Fill in checkout information
    await cartPage.firstNameInput.fill("Jayashan");
    await cartPage.lastNameInput.fill("Chamika");
    await cartPage.postalCodeInput.fill("10900");
    await cartPage.continueButton.click();

    // Finish the checkout
    await cartPage.finishButton.click();

    // Verify that the order is complete
    await expect(cartPage.completeHeader).toBeVisible();
    await expect(cartPage.completeHeader).toHaveText("Checkout: Complete!");
    await expect(cartPage.thankYouMessage).toHaveText(
      "Thank you for your order!"
    );
  });

  test("should Multiple products checkout.", async ({
    loginPage,
    productsPage,
    cartPage,
  }) => {
    // Login to the application
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await loginPage.verifySuccessfulLogin();

    // Add two products to the cart
    await productsPage.addToCartByIndex(0);
    await productsPage.addToCartByIndex(1);
    await productsPage.addToCartByIndex(2);
    await productsPage.addToCartByIndex(3);
    await productsPage.addToCartByIndex(4);
    await productsPage.addToCartByIndex(5);

    // Verify that the shopping cart badge shows 2 items
    await expect(productsPage.shoppingCartBadge).toBeVisible();
    await expect(productsPage.shoppingCartBadge).toHaveText("6");

    // Navigate to the cart page
    await productsPage.clickOnShoppingCart();

    // Verify that the cart page shows 2 items
    const cartItems = productsPage.page.locator(".cart_item");
    await expect(cartItems).toHaveCount(6);

    // Proceed to checkout
    await cartPage.checkoutButton.click();

    // Fill in checkout information
    await cartPage.firstNameInput.fill("Jayashan");
    await cartPage.lastNameInput.fill("Chamika");
    await cartPage.postalCodeInput.fill("10900");
    await cartPage.continueButton.click();

    // Finish the checkout
    await cartPage.finishButton.click();

    // Verify that the order is complete
    await expect(cartPage.completeHeader).toBeVisible();
    await expect(cartPage.completeHeader).toHaveText("Checkout: Complete!");
    await expect(cartPage.thankYouMessage).toHaveText(
      "Thank you for your order!"
    );
  });

  test("should add and remove products from cart before checkout.", async ({
    loginPage,
    productsPage,
  }) => {
    // Login to the application
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await loginPage.verifySuccessfulLogin();

    // Add two products to the cart
    await productsPage.addToCartByIndex(0);
    await productsPage.addToCartByIndex(1);

    // Verify that the shopping cart badge shows 2 items
    await expect(productsPage.shoppingCartBadge).toBeVisible();
    await expect(productsPage.shoppingCartBadge).toHaveText("2");

    // Remove one product from the cart
    await productsPage.removeFromCartByIndex(0);

    // Verify that the shopping cart badge shows 1 item
    await expect(productsPage.shoppingCartBadge).toBeVisible();
    await expect(productsPage.shoppingCartBadge).toHaveText("1");
  });

  test("should proceed with continue shopping navigation", async ({
    loginPage,
    productsPage,
    cartPage,
  }) => {
    // Login to the application
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await loginPage.verifySuccessfulLogin();

    // Add a product to the cart
    await productsPage.addToCartByIndex(0);

    // Verify that the shopping cart badge shows 1 item
    await expect(productsPage.shoppingCartBadge).toBeVisible();
    await expect(productsPage.shoppingCartBadge).toHaveText("1");

    // Navigate to the cart page
    await productsPage.clickOnShoppingCart();

    // Verify that the cart page shows 1 item
    const cartItems = productsPage.page.locator(".cart_item");
    await expect(cartItems).toHaveCount(1);

    // Click on Continue Shopping
    await cartPage.continueShoppingButton.click();
  });
});
