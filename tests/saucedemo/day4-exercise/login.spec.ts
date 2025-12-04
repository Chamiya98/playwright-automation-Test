import { test, expect } from "./fixtures/saucedemo-fixtures";
import {
  USERS,
  EXPECTED_RESULTS,
  NEGATIVE_LOGIN_SCENARIOS,
} from "./constants/testData";

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

  // Parameterized negative login tests
  NEGATIVE_LOGIN_SCENARIOS.forEach(
    ({ description, username, password, expectedError }) => {
      test(`should not login with ${description}`, async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login(username, password);
        await loginPage.verifyLoginError(expectedError);
      });
    }
  );

  test("should close error message on login failure.", async ({
    loginPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(USERS.INVALID_USERNAME, USERS.INVALID_PASSWORD);
    await loginPage.verifyLoginError(NEGATIVE_LOGIN_SCENARIOS[2].expectedError);

    await loginPage.closeError();
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
