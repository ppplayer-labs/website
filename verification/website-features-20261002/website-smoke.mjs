import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import puppeteer from 'puppeteer';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const output = `${root}/verification/website-features-20261002`;
const base = process.env.PP_WEBSITE_PREVIEW_URL || 'http://localhost:3110';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  // Verify local application rendering independently of external ads/analytics.
  await page.setRequestInterception(true);
  page.on('request', request => {
    const url = request.url();
    if (url.startsWith(base) || url.startsWith('data:') || url.startsWith('blob:')) request.continue();
    else request.abort();
  });
  const errors = [];
  const failedAssets = [];
  page.on('pageerror', e => errors.push(String(e)));
  page.on('response', response => {
    if (response.url().startsWith(base + '/_next/') && response.status() >= 400) failedAssets.push(response.url());
  });
  try {
    for (const [route, lang, title] of [
      ['/', 'en', 'Your library. More ways to play.'],
      ['/pt-BR', 'pt-BR', 'Sua biblioteca. Mais formas de ouvir.'],
      ['/fr', 'en', 'Your library. More ways to play.'],
      ['/ar', 'en', 'Your library. More ways to play.'],
      ['/changelog', 'en', 'Your library. More ways to play.'],
      ['/pt-BR/changelog', 'pt-BR', 'Sua biblioteca. Mais formas de ouvir.'],
    ]) {
      for (const width of [320, 390, 1280]) {
        await page.setViewport({ width, height: 844 });
        await page.setCookie({ name: 'NEXT_LOCALE', value: 'en', url: base });
        const response = await page.goto(base + route, { waitUntil: 'networkidle2' });
        assert.equal(response.status(), 200, route);
        try {
          await page.waitForFunction(() => !document.querySelector('[class*="z-[10000]"]'), { timeout: 10000 });
        } catch (e) {
          console.log('Hydration diagnostics', { errors, failedAssets, readyState: await page.evaluate(() => document.readyState) });
          throw e;
        }
        const section = await page.$('#playback-updates');
        assert.ok(section, route);
        const data = await section.evaluate(el => ({
          lang: el.lang, text: el.textContent,
          heading: el.querySelector('h2').textContent,
          items: el.querySelectorAll('h3').length,
          links: [...el.querySelectorAll('a')].map(a => a.getAttribute('href')),
          width: el.getBoundingClientRect().width,
        }));
        assert.equal(data.lang, lang);
        assert.equal(data.heading, title);
        assert.equal(data.items, 4);
        assert.ok(data.width <= width, `section overflows ${route} at ${width}`);
        assert.ok(data.links.some(h => h.endsWith('/blog/play-on-local-files-ios')));
        assert.ok(data.text.includes(lang === 'pt-BR' ? 'pendentes' : 'pending'));
        const prefix = route === '/' ? 'en' : route === '/pt-BR' ? 'pt-BR' : null;
        if (prefix && [390, 1280].includes(width)) {
          // Capture the normal viewport with navigation above the section.
          await section.evaluate(el => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
          await page.evaluate(() => window.scrollBy({ top: -64, behavior: 'instant' }));
          await page.screenshot({ path: `${output}/${prefix}-${width}.png` });
        }
        console.log(`PASS ${route} ${width}px: localized/fallback copy, four cards, guide link, release status`);
      }
    }
    for (const route of ['/blog/play-on-local-files-ios', '/pt-BR/blog/play-on-local-files-ios', '/fr/blog/play-on-local-files-ios']) {
      await page.setViewport({ width: 390, height: 844 });
      await page.setCookie({ name: 'NEXT_LOCALE', value: 'en', url: base });
      const response = await page.goto(base + route, { waitUntil: 'networkidle2' });
      assert.equal(response.status(), 200);
      const text = await page.$eval('main', el => el.textContent);
      assert.ok(text.includes('AirPlay'));
      assert.ok(text.includes('Chromecast'));
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
      assert.equal(overflow, false, route);
      console.log(`PASS ${route}: guide renders without mobile overflow`);
    }
    // Every advertised locale must render the new section without missing messages.
    const routing = fs.readFileSync(`${root}/i18n/routing.ts`, 'utf8');
    const locales = [...routing.match(/locales: \[([^\]]+)\]/)[1].matchAll(/'([^']+)'/g)].map(m => m[1]);
    for (const locale of locales) {
      const route = locale === 'en' ? '' : `/${locale}`;
      const response = await fetch(`${base}${route}/changelog`);
      assert.equal(response.status, 200, locale);
      const html = await response.text();
      assert.ok(html.includes('id="playback-updates"'), locale);
      assert.ok(!html.includes('MISSING_MESSAGE'), locale);
    }
    assert.deepEqual(errors, []);
    assert.deepEqual(failedAssets, []);
    console.log(`PASS all ${locales.length} locale changelogs; no browser runtime errors`);
  } finally {
    await browser.close();
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
