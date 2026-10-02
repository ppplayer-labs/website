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
    const messages = locale => JSON.parse(fs.readFileSync(`${root}/messages/${locale}.json`, 'utf8'));
    for (const [route, lang] of [
      ['/', 'en'], ['/pt-BR', 'pt-BR'], ['/de', 'de'], ['/fr', 'fr'], ['/ar', 'ar'],
      ['/changelog', 'en'], ['/pt-BR/changelog', 'pt-BR'],
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
          heading: (() => { const heading = el.querySelector('h2').cloneNode(true); heading.querySelectorAll('[aria-hidden="true"]').forEach(node => node.remove()); return heading.textContent; })(),
          items: el.querySelectorAll('h3').length,
          links: [...el.querySelectorAll('a')].map(a => a.getAttribute('href')),
          width: el.getBoundingClientRect().width,
        }));
        assert.equal(data.lang, lang);
        assert.equal(data.heading, messages(lang).platforms.title);
        assert.equal(data.items, 4);
        assert.ok(data.width <= width, `section overflows ${route} at ${width}`);
        assert.ok(data.links.some(h => h.endsWith('/blog/play-on-local-files-ios')));
        assert.ok(data.text.includes(messages(lang).playbackUpdates.note));
        assert.equal(await section.evaluate(el => getComputedStyle(el).direction), lang === 'ar' ? 'rtl' : 'ltr');
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${route} ${width}px`);
        const prefix = route === '/' ? 'en' : route === '/pt-BR' ? 'pt-BR' : null;
        if (prefix && [390, 1280].includes(width)) {
          // Capture the normal viewport with navigation above the section.
          await section.evaluate(el => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
          await page.evaluate(() => window.scrollBy({ top: -64, behavior: 'instant' }));
          await page.screenshot({ path: `${output}/${prefix}-${width}.png` });
        }
        console.log(`PASS ${route} ${width}px: translated copy, four cards, guide link, release status`);
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
      const text = await page.evaluate(html => new DOMParser().parseFromString(html, 'text/html').querySelector('#playback-updates').textContent, html);
      assert.ok(text.includes(messages(locale).playbackUpdates.note), `${locale}: translated release status`);
      for (const key of ['local', 'output', 'queue', 'pause']) {
        assert.ok(text.includes(messages(locale).playbackUpdates[key]), `${locale}: translated ${key}`);
      }
    }
    assert.deepEqual(errors, []);
    assert.deepEqual(failedAssets, []);
    console.log(`PASS all ${locales.length} locale changelogs; no browser runtime errors`);
  } finally {
    await browser.close();
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
