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

export const NEGATIVE_LOGIN_SCENARIOS = [
  {
    description: "empty username",
    username: "",
    password: USERS.VALID_PASSWORD,
    expectedError: ERROR_MESSAGES.USERNAME_REQUIRED,
  },
  {
    description: "empty password",
    username: USERS.VALID_USERNAME,
    password: "",
    expectedError: ERROR_MESSAGES.PASSWORD_REQUIRED,
  },
  {
    description: "invalid credentials",
    username: USERS.INVALID_USERNAME,
    password: USERS.INVALID_PASSWORD,
    expectedError: ERROR_MESSAGES.INVALID_CREDENTIALS,
  },
  {
    description: "locked out user",
    username: USERS.LOCKED_OUT_USER,
    password: USERS.VALID_PASSWORD,
    expectedError: ERROR_MESSAGES.LOCKED_OUT,
  },
];
