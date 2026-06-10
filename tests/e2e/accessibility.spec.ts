import { expect, test } from '@playwright/test';

test.describe('Accessibility', () => {
  test('home page should have proper heading structure', async ({ page }) => {
    await page.goto('/');

    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    const images = page.locator('img:not([alt])');
    const imagesWithoutAlt = await images.count();
    expect(imagesWithoutAlt).toBe(0);

    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });

  test('writing page should have proper heading structure', async ({
    page,
  }) => {
    await page.goto('/writing');

    const h1Count = await page.locator('main h1').count();
    expect(h1Count).toBe(1);

    const images = page.locator('img:not([alt])');
    const imagesWithoutAlt = await images.count();
    expect(imagesWithoutAlt).toBe(0);
  });

  test('craft page should have proper heading structure', async ({ page }) => {
    await page.goto('/craft');

    const h1Count = await page.locator('main h1').count();
    expect(h1Count).toBe(1);

    const images = page.locator('img:not([alt])');
    const imagesWithoutAlt = await images.count();
    expect(imagesWithoutAlt).toBe(0);
  });

  test('colophon page should have proper heading structure', async ({
    page,
  }) => {
    await page.goto('/colophon');

    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    const images = page.locator('img:not([alt])');
    const imagesWithoutAlt = await images.count();
    expect(imagesWithoutAlt).toBe(0);
  });
});
