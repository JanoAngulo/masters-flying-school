import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: 'tests/e2e',
  // Both projects share one baseline per screenshot name, so legacy captures become the reference for Nuxt.
  snapshotPathTemplate: '{testDir}/__screenshots__/{arg}{ext}',
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: 'disabled' } },
  webServer: [
    { command: 'npx serve legacy -l 4100 --no-clipboard', port: 4100, reuseExistingServer: true },
    { command: 'npx serve .output/public -l 4200 --no-clipboard', port: 4200, reuseExistingServer: true },
  ],
  projects: [
    { name: 'legacy', testMatch: /parity\.spec\.ts/, use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:4100' } },
    { name: 'nuxt', use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:4200' } },
  ],
})
