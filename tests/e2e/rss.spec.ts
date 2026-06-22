import { expect, test } from '@playwright/test';

test.describe('RSS feed', () => {
  test('serves a valid feed of writing posts', async ({ page }) => {
    const response = await page.goto('/rss');

    expect(response?.status()).toBe(200);
    expect(response?.headers()['content-type']).toContain('xml');

    const body = (await response?.text()) ?? '';
    expect(body).toContain('<rss');
    expect(body).toContain('<channel>');
    expect(body).toContain('Tim Ritter | Writing');
    expect(body).toContain('https://tim.cv/writing/');
  });
});
