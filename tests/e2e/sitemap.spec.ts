import { expect, test } from '@playwright/test';

test.describe('Sitemap', () => {
  test('should return valid sitemap', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');

    expect(response?.status()).toBe(200);

    const contentType = response?.headers()['content-type'];
    expect(contentType).toContain('xml');

    const text = await response?.text();
    expect(text).toContain('<urlset');
    expect(text).toContain('<url>');
    expect(text).toContain('<loc>');

    expect(text).toContain('https://tim.cv/writing');
    expect(text).toContain('https://tim.cv/craft');
    expect(text).toContain('https://tim.cv/colophon');
  });
});
