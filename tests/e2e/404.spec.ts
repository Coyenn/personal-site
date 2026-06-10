import { expect, test } from '@playwright/test';

test.describe('404 Page', () => {
  test('should show 404 page for non-existent routes', async ({ page }) => {
    await page.goto('/404');

    await expect(page.locator('main').getByText(/Not Found/i)).toBeVisible();

    const homeLink = page.getByText(/go home/i);
    await expect(homeLink).toBeVisible();

    await homeLink.click();
    await expect(page).toHaveURL('/');
  });
});
