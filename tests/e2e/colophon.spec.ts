import { expect, test } from '@playwright/test';

test.describe('Colophon page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/colophon');
  });

  test('renders the title and heading', async ({ page }) => {
    await expect(page).toHaveTitle(/Colophon/);
    await expect(
      page.getByRole('heading', { level: 1, name: 'Colophon' }),
    ).toBeVisible();
  });

  test('credits the tech stack and inspirations', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Next.js' })).toHaveAttribute(
      'href',
      'https://nextjs.org',
    );
    await expect(page.getByRole('link', { name: 'GitHub' })).toBeVisible();
    await expect(
      page.getByRole('list', { name: 'Inspiration' }).getByRole('listitem'),
    ).toHaveCount(7);
  });
});
