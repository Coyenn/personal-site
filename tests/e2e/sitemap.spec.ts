import { test, expect } from '@playwright/test';

test.describe('Sitemap', () => {
  test('should return valid sitemap', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');

    // Check if the response status is 200
    expect(response?.status()).toBe(200);

    // Check if the content type is XML
    const contentType = response?.headers()['content-type'];
    expect(contentType).toContain('xml');

    // Check if the response contains sitemap elements
    const text = await page.content();
    expect(text).toContain('<urlset');
    expect(text).toContain('<url>');
    expect(text).toContain('<loc>');

    // Check if the sitemap contains the main routes
    expect(text).toContain('/writing');
    expect(text).toContain('/craft');
    expect(text).toContain('/colophon');
  });
});
