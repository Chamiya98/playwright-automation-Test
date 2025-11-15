import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  
  // Timeout configurations
  timeout: 30000,              // 30 seconds per test
  expect: {
    timeout: 5000              // 5 seconds for assertions
  },
  
  use: {
    // Base URL - use relative paths in tests
    baseURL: 'https://www.saucedemo.com',
    
    // Browser options
    headless: false,           // Show browser
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    
    // Action timeout
    actionTimeout: 10000,      // 10 seconds
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
