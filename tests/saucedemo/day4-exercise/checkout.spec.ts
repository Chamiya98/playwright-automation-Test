import { test, expect } from "./fixtures/saucedemo-fixtures";
import { USERS, EXPECTED_RESULTS } from "./constants/testData";
import { faker } from "@faker-js/faker";

// Common setup before each test
test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(USERS.VALID_USERNAME, USERS.VALID_PASSWORD);
  await loginPage.verifySuccessfulLogin();
});

test.describe("should Single product checkout", () => {
  test("should login with valid credentials.", async ({
    productsPage,
    cartPage,
  }) => {
    // Add a single product to the cart
    await productsPage.addToCartByIndex(0);

    // Verify that the shopping cart badge shows 1 item
    await expect(productsPage.shoppingCartBadge).toBeVisible();
    await expect(productsPage.shoppingCartBadge).toHaveText("1");

    // Navigate to the cart page
    await productsPage.clickOnShoppingCart();

    // Verify that the cart page shows 1 items
    await productsPage.verifyCartItemCount(1);

    // Proceed to checkout
    await cartPage.checkoutButton.click();

    // Fill in checkout information
    await cartPage.firstNameInput.fill(faker.person.firstName());
    await cartPage.lastNameInput.fill(faker.person.lastName());
    await cartPage.postalCodeInput.fill(faker.location.zipCode());
    await cartPage.continueButton.click();

    // Finish the checkout
    await cartPage.finishButton.click();

    // Verify that the order is complete
    await expect(cartPage.completeHeader).toBeVisible();
    await expect(cartPage.completeHeader).toHaveText(
      EXPECTED_RESULTS.CHECKOUT_COMPLETE_TITLE
    );
    await expect(cartPage.thankYouMessage).toHaveText(
      EXPECTED_RESULTS.THANK_YOU_MESSAGE
    );
  });

  test("should Multiple products checkout.", async ({
    productsPage,
    cartPage,
  }) => {
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

    // Verify that the cart page shows 6 items
    await productsPage.verifyCartItemCount(
      EXPECTED_RESULTS.EXPECTED_PRODUCTS_COUNT
    );

    // Proceed to checkout
    await cartPage.checkoutButton.click();

    // Fill in checkout information
    await cartPage.firstNameInput.fill(faker.person.firstName());
    await cartPage.lastNameInput.fill(faker.person.lastName());
    await cartPage.postalCodeInput.fill(faker.location.zipCode());
    await cartPage.continueButton.click();

    // Finish the checkout
    await cartPage.finishButton.click();

    // Verify that the order is complete
    await expect(cartPage.completeHeader).toBeVisible();
    await expect(cartPage.completeHeader).toHaveText(
      EXPECTED_RESULTS.CHECKOUT_COMPLETE_TITLE
    );
    await expect(cartPage.thankYouMessage).toHaveText(
      EXPECTED_RESULTS.THANK_YOU_MESSAGE
    );
  });

  test("should add and remove products from cart before checkout.", async ({
    productsPage,
  }) => {
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
    productsPage,
    cartPage,
  }) => {
    // Add a product to the cart
    await productsPage.addToCartByIndex(0);

    // Verify that the shopping cart badge shows 1 item
    await expect(productsPage.shoppingCartBadge).toBeVisible();
    await expect(productsPage.shoppingCartBadge).toHaveText("1");

    // Navigate to the cart page
    await productsPage.clickOnShoppingCart();

    // Verify that the cart page shows 1 items
    await productsPage.verifyCartItemCount(1);

    // Click on Continue Shopping
    await cartPage.continueShoppingButton.click();
  });
});
