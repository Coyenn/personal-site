import { expect, test } from '@playwright/test';

test.describe('Writing page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/writing');
  });

  test('renders the title and a list of posts', async ({ page }) => {
    await expect(page).toHaveTitle(/Writing/);
    await expect(
      page.getByRole('heading', { level: 1, name: 'Writing' }),
    ).toBeVisible();
    await expect(page.getByRole('article')).not.toHaveCount(0);
  });

  test('navigates to a post and back to the list', async ({ page }) => {
    await page.getByRole('article').first().getByRole('link').click();
    await page.waitForURL(/\/writing\/.+/);

    await page.getByRole('link', { name: /all posts/i }).click();
    await page.waitForURL(/\/writing$/);
  });
});
