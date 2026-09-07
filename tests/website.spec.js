import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const widths = [320, 360, 375, 390, 412, 430, 480, 768, 820, 1024, 1280, 1440, 1920];
for (const width of widths) {
  test(`clean responsive layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 500 ? 844 : 1000 });
    const exceptions = [];
    page.on('pageerror', (error) => exceptions.push(error.message));
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    for (const section of ['#work', '#services', '#process', '#quote', '.footer'])
      await page.locator(section).scrollIntoViewIfNeeded();
    const issues = await page.evaluate(() => {
      const findings = [];
      if (document.documentElement.scrollWidth > innerWidth) findings.push('Document overflow');
      document
        .querySelectorAll('h1,h2,h3,p,.button,input,select,textarea,.project-card,.service-card')
        .forEach((element) => {
          if (!element.checkVisibility()) return;
          const rect = element.getBoundingClientRect();
          if (rect.width && (rect.left < -1 || rect.right > innerWidth + 1))
            findings.push(
              `${element.tagName} outside viewport: ${element.textContent?.slice(0, 35)}`,
            );
          if (
            element.matches('h1,h2,h3,p,.button') &&
            element.scrollWidth > element.clientWidth + 2
          )
            findings.push(`Text overflow: ${element.textContent.slice(0, 35)}`);
        });
      return findings;
    });
    expect(issues).toEqual([]);
    expect(exceptions).toEqual([]);
  });
}

test('mobile menu traps focus, locks scrolling, closes with Escape and navigation', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  const menu = page.locator('#mobile-menu');
  await expect(menu).toBeVisible();
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => !!document.activeElement.closest('#mobile-menu'))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(menu).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await menu.getByRole('link', { name: 'Services', exact: false }).click();
  await expect(menu).not.toBeVisible();
  await expect(page).toHaveURL(/#services$/);
});

test('project filters, empty states, modal navigation and focus restoration', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Fairings', exact: true }).click();
  await expect(page.locator('.empty-state')).toBeVisible();
  await page.getByRole('button', { name: 'Full Repaint', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(1);
  const card = page.locator('.project-card');
  await card.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Next photo' }).click();
  await expect(page.locator('.photo-controls')).toContainText('2 / 2');
  await page.keyboard.press('ArrowLeft');
  await expect(page.locator('.photo-controls')).toContainText('1 / 2');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(card).toBeFocused();
});

test('comparison works with keyboard and pointer', async ({ page }) => {
  await page.goto('/');
  const range = page.getByRole('slider', { name: 'Before and after comparison' });
  await range.focus();
  await page.keyboard.press('End');
  await expect(range).toHaveValue('100');
  await page.keyboard.press('Home');
  await expect(range).toHaveValue('0');
  await range.scrollIntoViewIfNeeded();
  const rect = await range.boundingBox();
  await page.mouse.click(rect.x + rect.width * 0.75, rect.y + rect.height * 0.5);
  expect(Number(await range.inputValue())).toBeGreaterThan(60);
});

test('quote preselection, validation, image handling, and honest download', async ({ page }) => {
  await page.goto('/');
  await page.locator('.service-card').nth(2).getByRole('link').click();
  await expect(page.getByLabel('Type of service')).toHaveValue('Mags / Wheel Paint');
  await page.getByRole('button', { name: 'Save my quote request' }).click();
  await expect(page.getByLabel('Your name')).toBeFocused();
  await expect(page.getByLabel('Your name')).toHaveAttribute('aria-invalid', 'true');
  await page.getByLabel('Your name').fill('Sample Rider');
  await page.getByLabel('Contact number').fill('+63 912 345 6789');
  await page.getByLabel('Email or Messenger').fill('rider@example.com');
  await page.getByLabel('Motorcycle brand').fill('Yamaha');
  await page.getByLabel('Motorcycle model').fill('NMAX');
  await page.getByLabel('Part to be painted').fill('Wheels');
  await page.getByLabel('Reference image').setInputFiles({
    name: 'invalid.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('not an image'),
  });
  await expect(page.locator('#image-error')).toBeVisible();
  await page.getByLabel('Reference image').setInputFiles('public/images/custom.jpg');
  await expect(page.locator('#image-error')).toHaveCount(0);
  const pending = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Save my quote request' }).click();
  const download = await pending;
  expect(download.suggestedFilename()).toBe('garworkz-quote-request.txt');
  await expect(page.getByRole('status')).toContainText('Nothing has been sent');
});

test('landscape, very short desktop, images and reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const [width, height] of [
    [568, 320],
    [844, 390],
    [1024, 500],
    [1920, 600],
    [280, 700],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
    await page.locator('.footer').scrollIntoViewIfNeeded();
    for (const image of await page.locator('main img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty('complete', true);
      expect(await image.evaluate((element) => element.naturalWidth)).toBeGreaterThan(0);
    }
  }
});

test('no WCAG A/AA accessibility violations on page, mobile navigation, or project dialog', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  for (const step of await page.locator('.reveal').all()) {
    await step.scrollIntoViewIfNeeded();
    await expect(step).toHaveCSS('opacity', '1');
  }
  const audit = async () => {
    await page.evaluate(() =>
      Promise.allSettled(document.getAnimations().map((animation) => animation.finished)),
    );
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      results.violations.map(({ id, nodes }) => ({
        id,
        elements: nodes.map((node) => node.target),
      })),
    ).toEqual([]);
  };
  await audit();
  await page.getByRole('button', { name: 'Open menu' }).click();
  await audit();
  await page.keyboard.press('Escape');
  await page.locator('.project-card').first().click();
  await audit();
  await page.keyboard.press('Escape');
  await page.setViewportSize({ width: 1440, height: 1000 });
  await audit();
});

test('touch comparison and swipe gallery work on a phone', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:5173');
  const range = page.getByRole('slider');
  await range.scrollIntoViewIfNeeded();
  const box = await range.boundingBox();
  await page.touchscreen.tap(box.x + box.width * 0.75, box.y + box.height / 2);
  expect(Number(await range.inputValue())).toBeGreaterThan(60);
  await page.locator('.project-card').first().tap();
  const photo = page.locator('.modal-photo');
  const photoBox = await photo.boundingBox();
  const session = await context.newCDPSession(page);
  const y = photoBox.y + photoBox.height / 2;
  await session.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ x: photoBox.x + photoBox.width * 0.8, y }],
  });
  await session.send('Input.dispatchTouchEvent', {
    type: 'touchMove',
    touchPoints: [{ x: photoBox.x + photoBox.width * 0.2, y }],
  });
  await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await expect(page.locator('.photo-controls')).toContainText('2 / 2');
  await context.close();
});
