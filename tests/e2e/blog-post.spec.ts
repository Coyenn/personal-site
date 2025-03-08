import { expect, test } from '@playwright/test';

test.describe('Blog Post Page', () => {
  test('should navigate to a blog post and display content correctly', async ({
    page,
  }) => {
    // First go to the writing page
    await page.goto('/writing');

    // Click on the first blog post
    await page.locator('article').first().click();

    // Check if we're on the blog post page
    await expect(page).toHaveURL(/\/writing\/.+/);

    // Check if the post content is visible
    const articleContent = page.locator('article');
    await expect(articleContent).toBeVisible();

    // Check if there's a back link
    const backLink = page.getByRole('link', { name: /all posts/i });
    await expect(backLink).toBeVisible();
  });

  test('should have proper metadata', async ({ page }) => {
    // First go to the writing page
    await page.goto('/writing');

    // Click on the first blog post
    await page.locator('article').first().click();

    // Check if the page has a title
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);

    // Check if there's a meta description
    const metaDescription = await page
      .locator('meta[name="description"]')
      .getAttribute('content');
    expect(metaDescription?.length).toBeGreaterThan(0);
  });
});
