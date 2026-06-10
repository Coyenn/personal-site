import { expect, test } from '@playwright/test';

test.describe('Liquid glass effect', () => {
  test('filter SVG is present on the craft page', async ({ page }) => {
    await page.goto('/craft');
    await page.waitForLoadState('networkidle');

    await expect(
      page.locator('header svg[aria-hidden]').first(),
    ).toBeAttached();
    await expect(page.locator('header svg feImage').first()).toBeAttached();
  });

  test('lens region changes content after scroll', async ({ page }) => {
    await page.goto('/craft');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    const headerBox = await page.locator('header > div').first().boundingBox();
    if (!headerBox) throw new Error('header nav pill not found');

    const clip = {
      x: headerBox.x,
      y: headerBox.y,
      width: headerBox.width,
      height: headerBox.height,
    };

    const before = await page.screenshot({ clip });
    await page.evaluate(() => {
      window.scrollTo(0, 600);
      window.dispatchEvent(new Event('scroll'));
    });
    await page.waitForTimeout(500);
    const after = await page.screenshot({ clip });

    expect(before).not.toEqual(after);
  });

  test('clone holder is populated', async ({ page }) => {
    await page.goto('/craft');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    const cloneHolder = page
      .locator('header [class*="absolute"][class*="left-0"][class*="top-0"]')
      .first();
    await expect(cloneHolder).toBeAttached();
    const children = await cloneHolder.evaluate((el) => el.children.length);
    expect(children).toBeGreaterThan(0);
  });

  test('WebKit: clone videos are replaced with img still frames', async ({
    page,
    browserName,
  }) => {
    test.skip(browserName !== 'webkit', 'WebKit-specific');

    await page.goto('/craft');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(800);

    const cloneHolder = page
      .locator('header [class*="absolute"][class*="left-0"][class*="top-0"]')
      .first();

    expect(await cloneHolder.locator('video').count()).toBe(0);

    const realVideoCount = await page.locator('main video').count();
    expect(await cloneHolder.locator('img[data-video-still]').count()).toBe(
      realVideoCount,
    );
  });

  test('offscreen videos are paused at top of page', async ({ page }) => {
    await page.goto('/craft');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    const states = await page.evaluate(() =>
      Array.from(document.querySelectorAll<HTMLVideoElement>('main video')).map(
        (v) => ({
          paused: v.paused,
          inViewport: v.getBoundingClientRect().top < window.innerHeight + 300,
        }),
      ),
    );

    for (const v of states.filter((v) => !v.inViewport)) {
      expect(v.paused).toBe(true);
    }
  });

  test('WebKit: -webkit-filter blur is applied to glass overlay', async ({
    page,
    browserName,
  }) => {
    test.skip(browserName !== 'webkit', 'WebKit-specific');

    await page.goto('/craft');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page.locator('header feGaussianBlur').first()).toBeAttached();

    const hasFilter = await page.evaluate(() => {
      const header = document.querySelector('header');
      if (!header) return false;
      for (const div of header.querySelectorAll<HTMLDivElement>('div')) {
        const s = div.style;
        const webkitFilter = s.getPropertyValue('-webkit-filter');
        const filter = s.getPropertyValue('filter');
        if (webkitFilter?.includes('url(') || filter?.includes('url(')) {
          return true;
        }
      }
      return false;
    });

    expect(hasFilter).toBe(true);
  });

  test('rAF loop parks when idle', async ({ page }) => {
    await page.goto('/craft');
    await page.waitForLoadState('networkidle');
    await page.mouse.wheel(0, 200);
    await page.waitForTimeout(600);

    const mutationCount = await page.evaluate(
      () =>
        new Promise<number>((resolve) => {
          const cloneHolder = document
            .querySelector('header')
            ?.querySelector(
              '[class*="absolute"][class*="left-0"][class*="top-0"]',
            );
          if (!cloneHolder) return resolve(0);

          let count = 0;
          const observer = new MutationObserver(
            (mutations) =>
              (count += mutations.filter(
                (m) => m.type === 'attributes',
              ).length),
          );
          observer.observe(cloneHolder, {
            attributes: true,
            subtree: true,
            attributeFilter: ['style'],
          });
          setTimeout(() => {
            observer.disconnect();
            resolve(count);
          }, 1000);
        }),
    );

    expect(mutationCount).toBeLessThan(5);
  });
});
