/* eslint-disable @typescript-eslint/no-require-imports */
const {setTimeout: delay} = require('node:timers/promises');
const {sourceRevision} = require('./indexnow-revision');

const HOST = 'ppplayer.com';
const KEY = '89672819860ae89515d68ecd19484382';
const ORIGIN = `https://${HOST}`;
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const SITEMAP_URL = `${ORIGIN}/sitemap.xml`;
const REVISION_URL = `${ORIGIN}/indexnow-revision.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const REQUEST_TIMEOUT_MS = 20000;
const MAX_BATCH = 10000;

function decodeXml(text) {
  return text.replace(/&([^;]+);/g, (_, entity) => {
    const named = {amp: '&', lt: '<', gt: '>', quot: '"', apos: "'"};
    if (Object.hasOwn(named, entity)) return named[entity];
    if (/^#(?:\d+|x[\da-f]+)$/i.test(entity)) {
      return String.fromCodePoint(entity[1].toLowerCase() === 'x' ? parseInt(entity.slice(2), 16) : Number(entity.slice(1)));
    }
    throw new Error(`Unsupported XML entity: &${entity};`);
  });
}

function sitemapUrls(xml) {
  if (!/<urlset\b/.test(xml) || !/<\/urlset>/.test(xml) || /<sitemapindex\b/.test(xml)) {
    throw new Error('Expected a complete URL sitemap, not HTML or a sitemap index.');
  }
  const urls = new Set();
  for (const match of xml.matchAll(/<loc>([\s\S]*?)<\/loc>/g)) {
    const raw = decodeXml(match[1].trim());
    const url = new URL(raw);
    if (!['http:', 'https:'].includes(url.protocol) || url.hostname !== HOST || url.port || url.username || url.password || url.hash) {
      throw new Error(`Sitemap URL does not belong to the canonical host: ${raw}`);
    }
    urls.add(url.href);
  }
  if (!urls.size) throw new Error('No page URLs found in sitemap.xml.');
  return [...urls];
}

async function readResponse(fetchImpl, url, options = {}) {
  const response = await fetchImpl(url, {
    redirect: 'error',
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    headers: {'Cache-Control': 'no-cache', ...options.headers},
    ...options,
  });
  return {status: response.status, body: await response.text()};
}

async function waitForRevision(expected, {
  fetchImpl = fetch, sleep = delay, now = Date.now, maxWaitMs = 0, pollMs = 15000, log = console.log,
} = {}) {
  const deadline = now() + maxWaitMs;
  for (;;) {
    let reason;
    try {
      const response = await readResponse(fetchImpl, `${REVISION_URL}?revision=${expected}`);
      if (response.status === 200 && response.body.trim() === expected) return;
      reason = `HTTP ${response.status}; deployed revision does not match`;
    } catch (error) {
      reason = error.message;
    }
    if (now() >= deadline) throw new Error(`Website deployment is not ready: ${reason}. No URLs submitted.`);
    log(`Waiting for this website revision to deploy (${reason}).`);
    await sleep(Math.min(pollMs, Math.max(0, deadline - now())));
  }
}

async function run({
  dryRun = false, waitForDeployment = false, fetchImpl = fetch, revision = sourceRevision, log = console.log,
} = {}) {
  if (!dryRun) {
    await waitForRevision(revision(), {fetchImpl, maxWaitMs: waitForDeployment ? 600000 : 0, log});
  }
  const key = await readResponse(fetchImpl, KEY_LOCATION);
  if (key.status !== 200 || key.body.trim() !== KEY) throw new Error(`IndexNow verification file is missing or incorrect (HTTP ${key.status}).`);
  const sitemap = await readResponse(fetchImpl, SITEMAP_URL);
  if (sitemap.status !== 200) throw new Error(`Failed to fetch sitemap (HTTP ${sitemap.status}).`);
  const urlList = sitemapUrls(sitemap.body);
  log(`Validated ${urlList.length} unique page URLs on ${HOST}.`);
  if (dryRun) {
    log('Dry run: key and live sitemap validated; deployment readiness not checked; no IndexNow POST sent.');
    return urlList.length;
  }
  for (let offset = 0; offset < urlList.length; offset += MAX_BATCH) {
    const batch = urlList.slice(offset, offset + MAX_BATCH);
    const result = await readResponse(fetchImpl, ENDPOINT, {
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: JSON.stringify({host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: batch}),
    });
    if (![200, 202].includes(result.status)) {
      throw new Error(`IndexNow rejected batch (HTTP ${result.status}): ${result.body.slice(0, 500)}. No automatic retry.`);
    }
    log(`IndexNow received ${batch.length} URLs (HTTP ${result.status}${result.status === 202 ? '; key validation pending' : ''}). This does not guarantee indexing.`);
  }
  return urlList.length;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.some(arg => !['--dry-run', '--wait-for-deployment'].includes(arg))) {
    console.error('Usage: node scripts/indexnow.js [--dry-run] [--wait-for-deployment]');
    process.exitCode = 1;
  } else {
    run({dryRun: args.includes('--dry-run'), waitForDeployment: args.includes('--wait-for-deployment')}).catch(error => {
      console.error(`IndexNow failed: ${error.message}`);
      process.exitCode = 1;
    });
  }
}
module.exports = {run, sitemapUrls, waitForRevision, HOST, KEY, MAX_BATCH};
