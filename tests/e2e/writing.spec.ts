import { expect, test } from '@playwright/test';

test.describe('Writing Page', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/writing');

    // Check if the page title contains "Writing"
    await expect(page).toHaveTitle(/Writing/);
  });

  test('should navigate to a blog post', async ({ page }) => {
    await page.goto('/writing');

    // Click on the first blog post
    const firstArticle = page.locator('article').first();
    await firstArticle.click();

    // Check if we're on the blog post page
    await expect(page).toHaveURL(/\/writing\/.+/);
  });

  test('should have a working back link on blog post page', async ({
    page,
  }) => {
    await page.goto('/writing');

    // Click on the first blog post
    await page.locator('article').first().click();

    // Check if we're on the blog post page
    await expect(page).toHaveURL(/\/writing\/.+/);

    // Click on the back link
    await page.getByRole('link', { name: /all posts/i }).click();

    // Check if we're back on the writing page
    await expect(page).toHaveURL('/writing');
  });
});
