import { test, expect } from "./fixtures/saucedemo-fixtures";

test.describe("Login Test with fixture", () => {
  test("should login with valid credentials.", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await loginPage.verifySuccessfulLogin();
  });

  test("should add six products after login.", async ({
    loginPage,
    productsPage,
  }) => {
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await loginPage.verifySuccessfulLogin();
    await expect(productsPage.productsCount).toHaveCount(6);
  });

  test("should not login with empty username.", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login("", "secret_sauce");
    await loginPage.verifyLoginError("Username is required");
  });

  test("should not login with empty password.", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login("standard_user", "");
    await loginPage.verifyLoginError("Password is required");
  });

  test("should not login with invalid credentials.", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login("invalid_user", "invalid_password");
    await loginPage.verifyLoginError(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("should not login with locked out user.", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login("locked_out_user", "secret_sauce");
    await loginPage.verifyLoginError(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });

  test("should close error message on login failure.", async ({
    loginPage,
  }) => {
    await loginPage.goto();
    await loginPage.login("invalid_user", "invalid_password");
    await loginPage.verifyLoginError(
      "Epic sadface: Username and password do not match any user in this service"
    );

    await loginPage.closeError();

    // Verify error message is closed
    await expect(loginPage.errorMessage).toHaveCount(0);
  });

  test("should see masked password input.", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.passwordInput.fill("secret_sauce");
    await expect(loginPage.passwordInput).toHaveAttribute("type", "password");
  });
});
