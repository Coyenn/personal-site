import type AxeBuilder from '@axe-core/playwright';
import type { Result } from 'axe-core';
import { expect, test } from '../fixtures';

function format(violations: Result[]): string {
  return JSON.stringify(
    violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      nodes: v.nodes.map((n) => n.html),
    })),
    null,
    2,
  );
}

function audit(makeAxeBuilder: () => AxeBuilder): AxeBuilder {
  return makeAxeBuilder().disableRules(['color-contrast']);
}

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'writing', path: '/writing' },
  { name: 'craft', path: '/craft' },
  { name: 'colophon', path: '/colophon' },
] as const;

test.describe('Accessibility (axe-core)', () => {
  for (const { name, path } of PAGES) {
    test(`${name} page has no detectable WCAG violations`, async ({
      page,
      makeAxeBuilder,
    }) => {
      await page.goto(path);

      const { violations } = await audit(makeAxeBuilder).analyze();

      expect(violations, format(violations)).toEqual([]);
    });
  }

  test('blog post page has no detectable WCAG violations', async ({
    page,
    makeAxeBuilder,
  }) => {
    await page.goto('/writing');
    await page.getByRole('article').first().getByRole('link').click();
    await expect(page).toHaveURL(/\/writing\/.+/);

    const { violations } = await audit(makeAxeBuilder).analyze();

    expect(violations, format(violations)).toEqual([]);
  });

  test('not-found page has no detectable WCAG violations', async ({
    page,
    makeAxeBuilder,
  }) => {
    await page.goto('/this-route-does-not-exist');

    const { violations } = await audit(makeAxeBuilder).analyze();

    expect(violations, format(violations)).toEqual([]);
  });
});

test.describe('Accessibility (structure)', () => {
  for (const { name, path } of PAGES) {
    test(`${name} page exposes core landmarks and a single h1`, async ({
      page,
    }) => {
      await page.goto(path);

      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);

      await expect(page.getByRole('banner')).toBeAttached();
      await expect(page.getByRole('main')).toBeVisible();
      await expect(page.getByRole('contentinfo')).toBeVisible();
      await expect(
        page.getByRole('navigation', { name: 'Main navigation' }),
      ).toBeVisible();

      await expect(page.locator('img:not([alt])')).toHaveCount(0);
    });
  }
});
