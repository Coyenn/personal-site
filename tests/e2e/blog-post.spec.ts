import { expect, test } from '@playwright/test';

test.describe('Blog Post Page', () => {
  test('should navigate to a blog post and display content correctly', async ({
    page,
  }) => {
    await page.goto('/writing');

    await page.locator('main article a').first().click();

    await expect(page).toHaveURL(/\/writing\/.+/);

    const articleContent = page.locator('main article').first();
    await expect(articleContent).toBeVisible();

    const backLink = page.getByRole('link', { name: /all posts/i });
    await expect(backLink).toBeVisible();
  });

  test('should have proper metadata', async ({ page }) => {
    await page.goto('/writing');

    await page.locator('main article a').first().click();

    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);

    const metaDescription = await page
      .locator('meta[name="description"]')
      .getAttribute('content');
    expect(metaDescription?.length).toBeGreaterThan(0);
  });
});
