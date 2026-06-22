import { expect, test } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders the title and intro heading', async ({ page }) => {
    await expect(page).toHaveTitle(/Tim Ritter/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Design Engineer',
    );
  });

  test('lists projects with external links', async ({ page }) => {
    const projects = page.getByRole('list', { name: 'Projects' });

    await expect(projects.getByRole('listitem')).toHaveCount(6);
    await expect(
      projects.getByRole('link', { name: 'Create T3 App' }),
    ).toHaveAttribute('href', 'https://create.t3.gg');
  });

  test('exposes the contact email link', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Contact' })).toHaveAttribute(
      'href',
      'mailto:hi@tim.cv',
    );
  });
});
