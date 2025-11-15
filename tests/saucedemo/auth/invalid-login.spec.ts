import test, { expect } from "@playwright/test";

test.describe("SauceDemo - Login Tests", () => {
  // This runs before each test
  test.beforeEach(async ({ page }) => {
    // Navigate to login page
    await page.goto("/");

    // Wait for page to load
    await expect(page.locator(".login_logo")).toBeVisible();
  });

  test("verify empty username and password", async ({ page }) => {
    // Click login without filling fields
    await page.locator('[data-test="login-button"]').click();

    // Verify error message
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText(
      "Epic sadface: Username is required"
    );
  });

  test("verify login with empty username", async ({ page }) => {
    // Fill password
    await page.locator('[data-test="password"]').fill("secret_sauce");

    // Click login without filling fields
    await page.locator('[data-test="login-button"]').click();

    // Verify error message
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText(
      "Epic sadface: Username is required"
    );
  });

  test("verify login with empty password", async ({ page }) => {
    // Fill username using data-test attribute
    await page.locator('[data-test="username"]').fill("standard_user");

    // Click login without filling username fields
    await page.locator('[data-test="login-button"]').click();

    // Verify error message
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText(
      "Epic sadface: Password is required"
    );
  });

  test("verify login with invalid username ", async ({ page }) => {
    //Fill invalid username
    await page.locator('[data-test="username"]').fill("error_user");

    // Fill password
    await page.locator('[data-test="password"]').fill("secret_sauce");

    // Click login button
    await page.locator('[data-test="login-button"]').click();

    // Verify error message
    await expect(page.locator('[data-test="error"]')).toContainText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("verify login with invalid password", async ({ page }) => {
    // Fill valid username
    await page.locator('[data-test="username"]').fill("error_user");

    // Fill Invalid password
    await page.locator('[data-test="password"]').fill("test123");

    // Click login button
    await page.locator('[data-test="login-button"]').click();

    // Verify error message
    await expect(page.locator('[data-test="error"]')).toContainText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("verify username is case sensitive - uppercase", async ({ page }) => {
    // Fill case sensitive username
    await page.locator('[data-test="username"]').fill("STANDARD_USER");

    // Fill valid password
    await page.locator('[data-test="password"]').fill("secret_sauce");

    // Click login button
    await page.locator('[data-test="login-button"]').click();

    // Verify error message
    await expect(page.locator('[data-test="error"]')).toContainText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("verify password is case sensitive - uppercase", async ({ page }) => {
    // Fill invalid username
    await page.locator('[data-test="username"]').fill("standard_user");

    // Fill case sensitive password
    await page.locator('[data-test="password"]').fill("SECRET_SAUCE");

    // Click login button
    await page.locator('[data-test="login-button"]').click();

    // Verify error message
    await expect(page.locator('[data-test="error"]')).toContainText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });
});
