import { test, expect } from '@playwright/test';

test.describe('Colophon Page', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/colophon');

    // Check if the page title contains "Colophon"
    await expect(page).toHaveTitle(/Colophon/);

    // Check if the main heading is visible
    const heading = page.getByRole('heading', { name: /Colophon/i });
    await expect(heading).toBeVisible();
  });
});
