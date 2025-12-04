import { test, expect } from "./fixtures/saucedemo-fixtures";
import { USERS, ERROR_MESSAGES, EXPECTED_RESULTS } from "./constants/testData";

test.describe("Login Test with fixture", () => {
  test("should login with valid credentials.", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(USERS.VALID_USERNAME, USERS.VALID_PASSWORD);
    await loginPage.verifySuccessfulLogin();
  });

  test("should add six products after login.", async ({
    loginPage,
    productsPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(USERS.VALID_USERNAME, USERS.VALID_PASSWORD);
    await loginPage.verifySuccessfulLogin();
    await expect(productsPage.productsCount).toHaveCount(
      EXPECTED_RESULTS.EXPECTED_PRODUCTS_COUNT
    );
  });

  test("should not login with empty username.", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login("", USERS.VALID_PASSWORD);
    await loginPage.verifyLoginError(ERROR_MESSAGES.USERNAME_REQUIRED);
  });

  test("should not login with empty password.", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(USERS.VALID_USERNAME, "");
    await loginPage.verifyLoginError(ERROR_MESSAGES.PASSWORD_REQUIRED);
  });

  test("should not login with invalid credentials.", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(USERS.INVALID_USERNAME, USERS.INVALID_PASSWORD);
    await loginPage.verifyLoginError(ERROR_MESSAGES.INVALID_CREDENTIALS);
  });

  test("should not login with locked out user.", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(USERS.LOCKED_OUT_USER, USERS.VALID_PASSWORD);
    await loginPage.verifyLoginError(ERROR_MESSAGES.LOCKED_OUT);
  });

  test("should close error message on login failure.", async ({
    loginPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(USERS.INVALID_USERNAME, USERS.INVALID_PASSWORD);
    await loginPage.verifyLoginError(ERROR_MESSAGES.INVALID_CREDENTIALS);

    await loginPage.closeError();

    // Verify error message is closed
    await expect(loginPage.errorMessage).toHaveCount(0);
  });

  test("should see masked password input.", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.passwordInput.fill(USERS.VALID_PASSWORD);
    await expect(loginPage.passwordInput).toHaveAttribute(
      "type",
      EXPECTED_RESULTS.PASSWORD_INPUT_TYPE
    );
  });
});
