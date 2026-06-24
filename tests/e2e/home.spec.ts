import { expect, test } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders the title and intro heading', async ({ page }) => {
    await expect(page).toHaveTitle(/Tim Ritter/);

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Tim');
  });

  test('links to featured projects and reveals the studios', async ({
    page,
  }) => {
    await expect(
      page.getByRole('link', { name: 'Create T3 App' }),
    ).toHaveAttribute('href', 'https://create.t3.gg');

    await expect(page.getByRole('link', { name: 'Iso' })).toHaveAttribute(
      'href',
      'https://github.com/Coyenn/iso',
    );

    await expect(page.getByText(/Luminary Games/)).toBeVisible();
  });

  test('exposes the contact email link', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'hi@tim.cv' })).toHaveAttribute(
      'href',
      'mailto:hi@tim.cv',
    );
  });
});
