import { test, expect } from '@playwright/test';

test('Visit Page', async ({ page }) => {
  await page.goto('http://localhost:7777/');
  await page.screenshot({ path: 'screenshot.png' });
  const pageTitle = await page.title();
  expect(pageTitle).toContain('MBT');
});