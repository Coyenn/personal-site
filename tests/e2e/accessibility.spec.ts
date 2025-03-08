import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('home page should have proper heading structure', async ({ page }) => {
    await page.goto('/');

    // Check if there's at least one h1 heading
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // Check if all images have alt text
    const images = page.locator('img:not([alt])');
    const imagesWithoutAlt = await images.count();
    expect(imagesWithoutAlt).toBe(0);

    // Check if the page has a title
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });

  test('writing page should have proper heading structure', async ({
    page,
  }) => {
    await page.goto('/writing');

    // Check if there's at least one h1 heading
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // Check if all images have alt text
    const images = page.locator('img:not([alt])');
    const imagesWithoutAlt = await images.count();
    expect(imagesWithoutAlt).toBe(0);
  });

  test('craft page should have proper heading structure', async ({ page }) => {
    await page.goto('/craft');

    // Check if there's at least one h1 heading
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // Check if all images have alt text
    const images = page.locator('img:not([alt])');
    const imagesWithoutAlt = await images.count();
    expect(imagesWithoutAlt).toBe(0);
  });

  test('colophon page should have proper heading structure', async ({
    page,
  }) => {
    await page.goto('/colophon');

    // Check if there's at least one h1 heading
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // Check if all images have alt text
    const images = page.locator('img:not([alt])');
    const imagesWithoutAlt = await images.count();
    expect(imagesWithoutAlt).toBe(0);
  });
});
