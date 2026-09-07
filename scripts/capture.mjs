import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

await mkdir('artifacts', { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ reducedMotion: 'reduce' });
for (const [name, width, height] of [
  ['desktop', 1440, 1000],
  ['mobile', 390, 844],
  ['small-phone', 320, 568],
  ['tablet', 820, 1180],
]) {
  await page.setViewportSize({ width, height });
  await page.goto('http://127.0.0.1:5174');
  await page.evaluate(() => document.fonts.ready);
  for (const image of await page.locator('main img').all()) await image.scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `artifacts/${name}.png`, fullPage: true });
  await page.screenshot({ path: `artifacts/${name}-hero.png` });
  for (const selector of ['#work', '#services', '#process', '#quote']) {
    await page.locator(selector).scrollIntoViewIfNeeded();
    await page.screenshot({ path: `artifacts/${name}-${selector.slice(1)}.png` });
  }
}
await browser.close();
console.log('Saved desktop, mobile, small-phone, and tablet screenshots.');
