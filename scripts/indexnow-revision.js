/* eslint-disable @typescript-eslint/no-require-imports */
const {createHash} = require('node:crypto');
const {readFileSync, readdirSync, writeFileSync} = require('node:fs');
const path = require('node:path');
const ROOT = path.resolve(__dirname, '..');
const MARKER = 'public/indexnow-revision.txt';

// Stable across GitHub checkout and Docker contexts, which exclude .git.
function sourceRevision(root = ROOT) {
  const files = [];
  function visit(relative) {
    for (const entry of readdirSync(path.join(root, relative), {withFileTypes: true})) {
      const name = relative + '/' + entry.name;
      if (entry.name === '.DS_Store' || name === MARKER) continue;
      if (entry.isDirectory()) visit(name);
      else if (entry.isFile()) files.push(name);
      else throw new Error(`Unsupported source entry: ${name}`);
    }
  }
  for (const directory of ['app', 'components', 'content', 'i18n', 'lib', 'messages', 'public']) visit(directory);
  files.push('Dockerfile', '.dockerignore', '.nvmrc', 'middleware.ts', 'next.config.ts', 'package.json', 'package-lock.json', 'postcss.config.mjs', 'tsconfig.json');
  const hash = createHash('sha256');
  for (const file of files.sort()) {
    const bytes = readFileSync(path.join(root, file));
    hash.update(file + '\0' + bytes.length + '\0');
    hash.update(bytes);
  }
  return hash.digest('hex');
}

if (require.main === module) {
  const revision = sourceRevision();
  writeFileSync(path.join(ROOT, MARKER), revision + '\n');
  console.log(`IndexNow deployment revision: ${revision}`);
}
module.exports = {sourceRevision};
