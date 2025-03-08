import { test, expect } from '@playwright/test';

test.describe('Craft Page', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/craft');

    // Check if the page title contains "Craft"
    await expect(page).toHaveTitle(/Craft/);

    // Check if the main heading is visible
    const heading = page.getByRole('heading', { name: /Craft/i });
    await expect(heading).toBeVisible();
  });
});
