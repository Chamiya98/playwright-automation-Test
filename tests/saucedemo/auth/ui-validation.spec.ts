import test, { expect } from "@playwright/test";

test.describe("SauceDemo - Login Tests", () => {
  // This runs before each test
  test.beforeEach(async ({ page }) => {
    // Navigate to login page
    await page.goto("/");

    // Wait for page to load
    await expect(page.locator(".login_logo")).toBeVisible();
  });

  test("should display Swag Labs logo", async ({ page }) => {
    const logo = page.locator(".login_logo");
    await expect(logo).toBeVisible();
    await expect(logo).toHaveText("Swag Labs");
  });

  test("should verify page title", async ({ page }) => {
    await expect(page).toHaveTitle("Swag Labs");
  });

  test("should verify username filed", async ({ page }) => {
    await expect(page.locator('[data-test="username"]')).toBeVisible();
    await expect(page.locator('[data-test="username"]')).toHaveAttribute(
      "placeholder",
      "Username"
    );
  });

  test("should verify password filed", async ({ page }) => {
    await expect(page.locator('[data-test="password"]')).toBeVisible();
    await expect(page.locator('[data-test="password"]')).toHaveAttribute(
      "placeholder",
      "Password"
    );
  });

  test("should list all test usernames", async ({ page }) => {
    const usernamesText = await page
      .locator("#login_credentials")
      .textContent();

    const expectedUsers = [
      "standard_user",
      "locked_out_user",
      "problem_user",
      "performance_glitch_user",
      "error_user",
      "visual_user",
    ];

    expectedUsers.forEach((username) => {
      expect(usernamesText).toContain(username);
    });
  });

  test("should display password information", async ({ page }) => {
    const passwordSection = page.locator(".login_password");
    await expect(passwordSection).toBeVisible();

    const passwordText = await passwordSection.textContent();
    expect(passwordText).toContain("Password for all users");
    expect(passwordText).toContain("secret_sauce");
  });

  // Method 3: Comprehensive check - type, value, and attribute
  test("should verify password masking properties", async ({ page }) => {
    const passwordInput = page.locator('[data-test="password"]');

    // Check initial type
    const inputType = await passwordInput.getAttribute("type");
    expect(inputType).toBe("password");

    // Enter password
    await passwordInput.fill("JayashanTest");

    // Verify type hasn't changed
    const typeAfterInput = await passwordInput.getAttribute("type");
    expect(typeAfterInput).toBe("password");

    // Verify value is stored correctly
    await expect(passwordInput).toHaveValue("JayashanTest");
  });

  test("should verify password masking properties2", async ({ page }) => {

    //click login button 
    await page.locator('[data-test="login-button"]').click();

    //verify error message
    await expect(page.locator('[data-test="error"]')).toContainText("Epic sadface: Username is required");

    //close error message.
    await page.locator('[data-test="error-button"]').click();

    // Verify error is no longer visible
    await expect(page.locator('[data-test="error"]')).toBeHidden();

  });
});
