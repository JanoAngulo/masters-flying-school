import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: 'tests/e2e',
  webServer: [
    { command: 'npx serve .output/public -l 4200 --no-clipboard', port: 4200, reuseExistingServer: true },
  ],
  projects: [
    { name: 'nuxt', use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:4200' } },
  ],
})
