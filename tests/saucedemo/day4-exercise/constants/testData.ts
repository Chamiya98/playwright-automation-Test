// constants/testData.ts
export const USERS = {
  VALID_USERNAME: "standard_user",
  VALID_PASSWORD: "secret_sauce",
  LOCKED_OUT_USER: "locked_out_user",
  INVALID_USERNAME: "invalid_user",
  INVALID_PASSWORD: "invalid_password",
};

export const ERROR_MESSAGES = {
  USERNAME_REQUIRED: "Username is required",
  PASSWORD_REQUIRED: "Password is required",
  INVALID_CREDENTIALS:
    "Epic sadface: Username and password do not match any user in this service",
  LOCKED_OUT: "Epic sadface: Sorry, this user has been locked out.",
};

export const EXPECTED_RESULTS = {
  EXPECTED_PRODUCTS_COUNT: 6,
  PASSWORD_INPUT_TYPE: "password",
  THANK_YOU_MESSAGE: "Thank you for your order!",
  CHECKOUT_COMPLETE_TITLE: "Checkout: Complete!",
};
