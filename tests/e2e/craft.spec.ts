import { expect, test } from '@playwright/test';

test.describe('Craft page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/craft');
  });

  test('renders the title and heading', async ({ page }) => {
    await expect(page).toHaveTitle(/Craft/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('renders gallery media', async ({ page }) => {
    const media = page.locator('main img, main video');
    await expect(media.first()).toBeVisible();
    expect(await media.count()).toBeGreaterThan(0);
  });
});
