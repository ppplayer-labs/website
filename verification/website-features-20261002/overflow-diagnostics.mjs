import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';
const base = process.env.PP_WEBSITE_PREVIEW_URL || 'http://localhost:3111';
const browser = await puppeteer.launch({headless: true});
try {
 const page = await browser.newPage();
 for (const [locale, width] of [['en',320],['de',390],['ar',390]]) {
  await page.setViewport({width,height:844});
  await page.setCookie({name:'NEXT_LOCALE',value:'en',url:base});
  await page.goto(`${base}${locale === 'en' ? '' : '/' + locale}`, {waitUntil:'networkidle2'});
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${locale}: page overflows`);
  const section = await page.$('#playback-updates');
  await section.evaluate(el => el.scrollIntoView({block:'start',behavior:'instant'}));
  await new Promise(resolve => setTimeout(resolve,500));
  await page.screenshot({path:`verification/website-features-20261002/localization-${locale}-${width}.png`});
  console.log(`PASS ${locale} ${width}px: no horizontal overflow; screenshot saved`);
 }
} finally {await browser.close();}
