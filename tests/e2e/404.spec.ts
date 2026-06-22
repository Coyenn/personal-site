import { expect, test } from '@playwright/test';

test.describe('Not found page', () => {
  test('returns 404 for unknown routes and links home', async ({ page }) => {
    const response = await page.goto('/this-route-does-not-exist');

    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole('heading', { level: 1, name: /not found/i }),
    ).toBeVisible();

    await page.getByRole('link', { name: /go home/i }).click();
    await expect(page).toHaveURL('/');
  });
});
