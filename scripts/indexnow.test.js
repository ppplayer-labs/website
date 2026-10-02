/* eslint-disable @typescript-eslint/no-require-imports */
const {test} = require('node:test');
const assert = require('node:assert/strict');
const {spawnSync} = require('node:child_process');
const {mkdtempSync, mkdirSync, writeFileSync, rmSync} = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {run, sitemapUrls, waitForRevision, KEY, MAX_BATCH} = require('./indexnow');
const {sourceRevision} = require('./indexnow-revision');
const sitemap = urls => `<urlset>${urls.map(url => `<url><loc>${url}</loc></url>`).join('')}</urlset>`;
const response = (body, status = 200) => ({status, text: async () => body});

function server({key = KEY, keyStatus = 200, xml = sitemap(['https://ppplayer.com/']), sitemapStatus = 200, status = 200, deployed = 'revision'} = {}) {
  const calls = [];
  const fetchImpl = async (url, options) => {
    calls.push({url, options});
    if (url.includes('/indexnow-revision.txt')) return response(deployed);
    if (url.endsWith(`/${KEY}.txt`)) return response(key, keyStatus);
    if (url.endsWith('/sitemap.xml')) return response(xml, sitemapStatus);
    if (url === 'https://api.indexnow.org/indexnow') return response('test response', status);
    throw new Error(`Unexpected request: ${url}`);
  };
  return {calls, fetchImpl, revision: () => 'revision', log: () => {}};
}

test('decodes XML query entities and deduplicates canonical page URLs', () => {
  assert.deepEqual(sitemapUrls(sitemap(['https://ppplayer.com', 'https://ppplayer.com/', 'https://ppplayer.com/search?a=1&amp;b=2'])),
    ['https://ppplayer.com/', 'https://ppplayer.com/search?a=1&b=2']);
});

for (const bad of [
  '<html><loc>https://ppplayer.com/</loc></html>', '<urlset></urlset>',
  '<sitemapindex><loc>https://ppplayer.com/sitemap.xml</loc></sitemapindex>',
  sitemap(['https://example.com/']), sitemap(['https://www.ppplayer.com/']),
  sitemap(['https://ppplayer.com:8443/']), sitemap(['https://user@ppplayer.com/']),
  sitemap(['https://ppplayer.com/#section']), sitemap(['javascript:alert(1)']),
  sitemap(['https://ppplayer.com/?a=&unknown;']),
]) {
  test(`rejects an invalid sitemap: ${bad.slice(0, 75)}`, () => assert.throws(() => sitemapUrls(bad)));
}

test('dry run checks the live key and sitemap without a submission', async () => {
  const fixture = server();
  assert.equal(await run({...fixture, dryRun: true}), 1);
  assert.equal(fixture.calls.length, 2);
  assert.ok(fixture.calls.every(call => call.options.method !== 'POST'));
});

for (const status of [200, 202]) {
  test(`handles IndexNow HTTP ${status} according to the protocol`, async () => {
    const logs = [];
    const fixture = server({status});
    await run({...fixture, log: message => logs.push(message)});
    const post = fixture.calls.find(call => call.options.method === 'POST');
    const body = JSON.parse(post.options.body);
    assert.equal(body.key, KEY);
    assert.equal(body.host, 'ppplayer.com');
    assert.equal(body.keyLocation, `https://ppplayer.com/${KEY}.txt`);
    assert.deepEqual(body.urlList, ['https://ppplayer.com/']);
    assert.ok(logs.some(log => log.includes('does not guarantee indexing')));
    if (status === 202) assert.ok(logs.some(log => log.includes('key validation pending')));
  });
}

for (const status of [204, 400, 403, 422, 429, 500]) {
  test(`HTTP ${status} fails instead of reporting success or retrying`, async () => {
    const fixture = server({status});
    await assert.rejects(run(fixture), new RegExp(`HTTP ${status}`));
    assert.equal(fixture.calls.filter(call => call.options.method === 'POST').length, 1);
  });
}

for (const config of [{key: 'wrong'}, {keyStatus: 404}, {sitemapStatus: 503}, {xml: '<html>unavailable</html>'}]) {
  test(`invalid live data sends no notification: ${JSON.stringify(config)}`, async () => {
    const fixture = server(config);
    await assert.rejects(run(fixture));
    assert.ok(fixture.calls.every(call => call.options.method !== 'POST'));
  });
}

test('a stale deployment cannot submit URLs', async () => {
  const fixture = server({deployed: 'old revision'});
  await assert.rejects(run(fixture), /deployment is not ready/);
  assert.equal(fixture.calls.length, 1);
});

test('a network failure fails cleanly without proceeding', async () => {
  await assert.rejects(run({dryRun: true, fetchImpl: async () => {throw new Error('offline');}}), /offline/);
});

test('waits through missing and old markers, then accepts the deployed revision', async () => {
  let clock = 0;
  const responses = [response('', 404), response('old'), response('new')];
  await waitForRevision('new', {fetchImpl: async () => responses.shift(), now: () => clock, sleep: async ms => {clock += ms;}, maxWaitMs: 100, pollMs: 10, log: () => {}});
  assert.equal(clock, 20);
});

test('deployment polling has a finite deadline', async () => {
  let clock = 0;
  await assert.rejects(waitForRevision('new', {fetchImpl: async () => response('old'), now: () => clock, sleep: async ms => {clock += ms;}, maxWaitMs: 20, pollMs: 10, log: () => {}}), /No URLs submitted/);
  assert.equal(clock, 20);
});

test('submissions are split at the 10000 URL protocol limit', async () => {
  const fixture = server({xml: sitemap(Array.from({length: MAX_BATCH + 1}, (_, i) => `https://ppplayer.com/page/${i}`))});
  assert.equal(await run(fixture), MAX_BATCH + 1);
  assert.deepEqual(fixture.calls.filter(call => call.options.method === 'POST').map(call => JSON.parse(call.options.body).urlList.length), [10000, 1]);
});

test('requests have deadlines and reject redirects', async () => {
  const fixture = server();
  await run({...fixture, dryRun: true});
  assert.ok(fixture.calls.every(call => call.options.signal instanceof AbortSignal && call.options.redirect === 'error'));
});

test('source revision reflects deployed content, excludes the marker and local artifacts', t => {
  const root = mkdtempSync(path.join(os.tmpdir(), 'ppplayer-indexnow-'));
  t.after(() => rmSync(root, {recursive: true, force: true}));
  for (const name of ['app', 'components', 'content', 'i18n', 'lib', 'messages', 'public']) mkdirSync(path.join(root, name));
  for (const name of ['middleware.ts', 'next.config.ts', 'package.json', 'package-lock.json', 'postcss.config.mjs', 'tsconfig.json']) writeFileSync(path.join(root, name), name);
  const before = sourceRevision(root);
  writeFileSync(path.join(root, 'public/indexnow-revision.txt'), 'previous marker');
  writeFileSync(path.join(root, 'public/.DS_Store'), 'local file');
  assert.equal(sourceRevision(root), before);
  writeFileSync(path.join(root, 'messages/en.json'), 'new translation');
  assert.notEqual(sourceRevision(root), before);
  const added = sourceRevision(root);
  rmSync(path.join(root, 'messages/en.json'));
  assert.notEqual(sourceRevision(root), added);
  assert.equal(sourceRevision(root), before);
});

test('invalid CLI arguments return a failing process exit code', () => {
  const result = spawnSync(process.execPath, [path.join(__dirname, 'indexnow.js'), '--unknown']);
  assert.equal(result.status, 1);
  assert.match(result.stderr.toString(), /Usage:/);
});


test('provider-specific pending verification stays a failure with actionable guidance', async () => {
  const fixture = server();
  const fetchImpl = async (url, options) => {
    const result = await fixture.fetchImpl(url, options);
    return options.method === 'POST' ? response(JSON.stringify({errorCode: 'SiteVerificationNotCompleted'}), 403) : result;
  };
  await assert.rejects(run({...fixture, fetchImpl}), /verification is still pending.*Retry the workflow/);
  assert.equal(fixture.calls.filter(call => call.options.method === 'POST').length, 1);
});
