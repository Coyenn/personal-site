import { expect, test } from '@playwright/test';

test.describe('Craft page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/craft');
  });

  test('renders the title and heading', async ({ page }) => {
    await expect(page).toHaveTitle(/Craft/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('renders keyboard-accessible gallery items', async ({ page }) => {
    const triggers = page.locator('[aria-haspopup="dialog"]');
    await expect(triggers.first()).toBeVisible();

    await expect(triggers.first()).toHaveAttribute('aria-expanded', 'false');
    await expect(triggers.first()).toHaveAttribute('tabindex', '0');
    await expect(page.getByRole('button')).not.toHaveCount(0);
  });
});
