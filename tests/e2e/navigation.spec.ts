import { expect, test } from '@playwright/test';

test.describe('Site navigation', () => {
  test('moves between pages via the nav bar and marks the active tab', async ({
    page,
  }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main navigation' });

    for (const { name, url } of [
      { name: 'Craft', url: '/craft' },
      { name: 'Writing', url: '/writing' },
      { name: 'Home', url: '/' },
    ]) {
      await nav.getByRole('link', { name, exact: true }).click();
      await expect(page).toHaveURL(url);
      await expect(
        nav.getByRole('link', { name, exact: true }),
      ).toHaveAttribute('aria-current', 'page');
    }
  });
});
