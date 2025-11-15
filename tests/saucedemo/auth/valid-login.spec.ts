import test, { expect } from "@playwright/test";

test.describe("SauceDemo - Login Tests", () => {
  // This runs before each test
  test.beforeEach(async ({ page }) => {
    // Navigate to login page
    await page.goto("/");

    // Wait for page to load
    await expect(page.locator(".login_logo")).toBeVisible();
  });

  test("verify login successfully with standard_user", async ({ page }) => {
    // Fill username using data-test attribute
    await page.locator('[data-test="username"]').fill("standard_user");

    // Fill password
    await page.locator('[data-test="password"]').fill("secret_sauce");

    // Click login button
    await page.locator('[data-test="login-button"]').click();

    // Verify successful login
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page.locator(".title")).toContainText("Products");
  });

  test("verify login successfully with problem_user", async ({ page }) => {
    // Fill username using data-test attribute
    await page.locator('[data-test="username"]').fill("problem_user");

    // Fill password
    await page.locator('[data-test="password"]').fill("secret_sauce");

    // Click login button
    await page.locator('[data-test="login-button"]').click();

    // Verify successful login
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page.locator(".title")).toContainText("Products");
  });

  test("verify login successfully with performance_glitch_user ", async ({
    page,
  }) => {
    // Fill username using data-test attribute
    await page
      .locator('[data-test="username"]')
      .fill("performance_glitch_user");

    // Fill password
    await page.locator('[data-test="password"]').fill("secret_sauce");

    // Click login button
    await page.locator('[data-test="login-button"]').click({ timeout: 10000 });

    // Verify successful login with extended timeout
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html", {
      timeout: 15000,
    });

    await expect(page.locator(".title")).toContainText("Products");
  });

  test("verify login successfully with error_user", async ({ page }) => {
    // Fill username using data-test attribute
    await page.locator('[data-test="username"]').fill("error_user");

    // Fill password
    await page.locator('[data-test="password"]').fill("secret_sauce");

    // Click login button
    await page.locator('[data-test="login-button"]').click();

    // Verify successful login
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page.locator(".title")).toContainText("Products");
  });

  test("verify login successfully with visual_user", async ({ page }) => {
    // Fill username using data-test attribute
    await page.locator('[data-test="username"]').fill("visual_user");

    // Fill password
    await page.locator('[data-test="password"]').fill("secret_sauce");

    // Click login button
    await page.locator('[data-test="login-button"]').click();

    // Verify successful login
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page.locator(".title")).toContainText("Products");
  });

  test("verify login successfully with locked_out_user ", async ({ page }) => {
    // Fill username using data-test attribute
    await page.locator('[data-test="username"]').fill("locked_out_user ");

    // Fill password
    await page.locator('[data-test="password"]').fill("secret_sauce");

    // Click login button
    await page.locator('[data-test="login-button"]').click();

    // Verify error message
    await expect(page.locator('[data-test="error"]')).toContainText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });
});
