import { expect, test } from '@playwright/test';

test.describe('Blog post page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/writing');
    const href = await page
      .getByRole('article')
      .first()
      .getByRole('link')
      .getAttribute('href');
    await page.goto(href ?? '/writing');
    await expect(page).toHaveURL(/\/writing\/.+/);
  });

  test('renders the article with a heading and back link', async ({ page }) => {
    await expect(page.getByRole('article')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('link', { name: /all posts/i })).toBeVisible();
  });

  test('exposes a title and meta description', async ({ page }) => {
    await expect(page).toHaveTitle(/.+/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /.+/,
    );
  });

  test('toggles focus mode while the F key is held', async ({ page }) => {
    const body = page.locator('body');
    await expect(body).not.toHaveClass(/\bfocus\b/);

    await page.keyboard.down('F');
    await expect(body).toHaveClass(/\bfocus\b/);

    await page.keyboard.up('F');
    await expect(body).not.toHaveClass(/\bfocus\b/);
  });
});
