import { test, expect } from "@playwright/test";
import { loginAs, loginAsStandardUser } from "../auth/login.spec";

test.describe("Shopping Cart - Valid Scenarios", () => {
  test("add single item to cart", async ({ page }) => {
    await loginAsStandardUser(page);

    // Add Sauce Labs Backpack to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Verify cart badge shows 1 item
    await expect(
      page.locator('[data-test="shopping-cart-badge"]')
    ).toContainText("1");

    // Verify the button text changes to "Remove"
    await expect(
      page.locator('[data-test="remove-sauce-labs-backpack"]')
    ).toContainText("Remove");
  });

  test("add multiple items to cart", async ({ page }) => {
    await loginAsStandardUser(page);

    // By Id selector as an example
    await page.locator("#add-to-cart-sauce-labs-backpack").click();

    //By XPath selector as an example
    await page
      .locator('xpath=//button[@name="add-to-cart-sauce-labs-bike-light"]')
      .click();

    //By CSS selector as an example
    await page
      .locator('button[name="add-to-cart-sauce-labs-bolt-t-shirt"]')
      .click();

    // Verify cart badge shows 3 items
    await expect(
      page.locator('[data-test="shopping-cart-badge"]')
    ).toContainText("3");
  });

  test("remove item from cart", async ({ page }) => {
    await loginAsStandardUser(page);

    // Add an item to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Remove the item from cart
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    // Verify cart badge is not visible
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(
      0
    );

    // Verify the button text changes back to "Add to cart"
    await expect(
      page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
    ).toContainText("Add to cart");
  });

  test("verify cart contents after adding items", async ({ page }) => {
    await loginAsStandardUser(page);

    // Add items to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page
      .locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
      .click();

    // Verify cart badge shows 2 items
    await expect(
      page.locator('[data-test="shopping-cart-badge"]')
    ).toContainText("2");

    // Navigate to cart
    await page.locator('[data-test="shopping-cart-link"]').click();

    // verify correct items are in the cart
    await expect(
      page.locator(
        '[data-test="item-4-title-link"] [data-test="inventory-item-name"]'
      )
    ).toContainText("Sauce Labs Backpack");
    await expect(
      page.locator(
        '[data-test="item-0-title-link"] [data-test="inventory-item-name"]'
      )
    ).toContainText("Sauce Labs Bike Light");
  });

  test("verify cart is empty after removing all items", async ({ page }) => {
    await loginAsStandardUser(page);

    // Add items to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page
      .locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
      .click();

    // Navigate to cart
    await page.locator('[data-test="shopping-cart-link"]').click();

    // Remove all items from cart
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();

    // Verify cart is empty
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(
      0
    );
  });

  test("continue shopping from cart", async ({ page }) => {
    await loginAsStandardUser(page);

    // Add an item to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Navigate to cart
    await page.locator('[data-test="shopping-cart-link"]').click();

    // Click "Continue Shopping"
    await page.locator('[data-test="continue-shopping"]').click();

    // Verify we are back on the inventory page
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("cart persists  after navigating different page", async ({ page }) => {
    await loginAsStandardUser(page);
    // Add an item to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Navigate to another page (About page)
    await page.getByRole("button", { name: "Open Menu" }).click();
    await page.locator('[data-test="about-sidebar-link"]').click();

    // Navigate back to inventory
    await page.goBack();
    await expect(
      page.locator('[data-test="shopping-cart-badge"]')
    ).toContainText("1");
  });

  test("verify all items can be added to cart", async ({ page }) => {
    await loginAsStandardUser(page);

    // Add all items to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page
      .locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')
      .click();
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    await page
      .locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
      .click();
    await page
      .locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')
      .click();
    await page
      .locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]')
      .click();

    // Verify cart badge shows correct number of items
    await expect(
      page.locator('[data-test="shopping-cart-badge"]')
    ).toContainText("6");
  });
});

test.describe("Shopping Cart - Negative Scenarios", () => {
  test(" Cart without login", async ({ page }) => {
    // Attempt to navigate directly to cart page without logging in
    await page.goto("https://www.saucedemo.com/inventory.html");

    // Verify the URL redirected to login
    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });

  test("empty cart checkout attempt", async ({ page }) => {
    test.fixme(
      true,
      "BUG-123: Checkout button should be disabled for empty cart"
    );

    // Navigate to cart
    await page.locator('[data-test="shopping-cart-link"]').click();

    // CURRENT BEHAVIOR (BUG): Checkout button is enabled even with empty cart
    // EXPECTED BEHAVIOR: Button should be disabled to prevent empty cart checkout
    await expect(page.locator('[data-test="checkout"]')).toBeDisabled();
  });

  test("invalid cart URL access", async ({ page }) => {
    await loginAsStandardUser(page);

    // Try to access an invalid cart item (element that doesn't exist)
    const invalidItem = page.locator(
      '[data-test="remove-sauce-labs-backpack2"]'
    );

    // Verify the invalid element doesn't exist
    await expect(invalidItem).not.toBeVisible();
    await expect(invalidItem).toHaveCount(0);
  });

  test("login as problem_user and add to cart", async ({ page }) => {
    // Login as problem_user
    await loginAs(page, "problem_user", "secret_sauce");

    // Get all product images
    const images = await page.locator("img.inventory_item_img");
    await images.first().waitFor(); // Wait for at least one to be visible

    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const src = await images.nth(i).getAttribute("src");
      expect(src).toContain("/static/media/sl-404.168b1cce10384b857a6f.jpg");
    }
  });

  test("cart badge with zero items", async ({ page }) => {
    await loginAsStandardUser(page);

    // Verify cart badge is not visible initially
    const cartBadge = page.locator(".shopping_cart_badge");
    await expect(cartBadge).not.toBeVisible();

    // Add item to cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Remove item from cart
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    // Verify badge appears with "0"
    await expect(cartBadge).not.toBeVisible;
    await expect(cartBadge).toHaveCount(0);
  });
});
