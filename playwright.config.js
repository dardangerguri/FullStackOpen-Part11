import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e-tests',
  use: {
    headless: true,
    baseURL: 'http://localhost:3001'
  },
  webServer: {
    command: 'NODE_ENV=test npm start',
    url: 'http://localhost:3001',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})
