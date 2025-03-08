import { expect, test } from '@playwright/test';

test.describe('404 Page', () => {
  test('should show 404 page for non-existent routes', async ({ page }) => {
    await page.goto('/404');

    // Check if the page contains 404 text
    await expect(page.getByText(/Not Found/i)).toBeVisible();

    // Check if there's a link back to the home page
    const homeLink = page.getByText(/go home/i);
    await expect(homeLink).toBeVisible();

    // Click on the home link and check if it navigates to the home page
    await homeLink.click();
    await expect(page).toHaveURL('/');
  });
});
