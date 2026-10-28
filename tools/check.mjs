#!/usr/bin/env node
/*
 * Checks a served copy of the snapshot against snapshot.json:
 * - every file answers 200 at its URL with the bytes the manifest records (redirects followed:
 *   the host sends /x.html to /x, and that's fine);
 * - each block a page uses has its code (blocks/<name>/<name>.js and .css), each template a
 *   page names has templates/<name>/<name>.js, and each nav or footer it names is there;
 * - every _redirects line answers 301 to its destination;
 * - pages send X-Robots-Tag noindex (from _headers), and a missing path answers 404 with the
 *   site's 404 page.
 *
 *   node tools/check.mjs --base http://localhost:8790          after `npm run serve`
 *   node tools/check.mjs --base https://archive.jackzhaojin.com after a deploy
 *
 * Exit 1 when any check fails.
 */
import { readFile } from 'node:fs/promises';
import {
  get, opt, pool, readManifest, sha256,
} from './lib.mjs';

const args = process.argv.slice(2);
const base = opt(args, '--base', 'http://localhost:8790').replace(/\/$/, '');
const manifest = await readManifest();
if (!manifest) {
  console.error('check: no snapshot.json; run tools/snapshot.mjs first');
  process.exit(1);
}
const failures = [];
const fail = (message) => failures.push(message);
let hops = 0;

/** GET with redirects followed (at most 3), counting the hops. */
async function follow(path) {
  let url = `${base}${path}`;
  for (let i = 0; i < 4; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const res = await get(url);
    const location = res.headers.get('location');
    if (res.status < 300 || res.status >= 400 || !location) return res;
    // eslint-disable-next-line no-await-in-loop
    await res.arrayBuffer();
    hops += 1;
    url = new URL(location, url).href;
  }
  throw new Error(`${path}: too many redirects`);
}

// 1. Every file, byte for byte.
const entries = Object.entries(manifest.files).filter(([, entry]) => entry.url);
await pool(entries, async ([file, entry]) => {
  const res = await follow(entry.url);
  const body = Buffer.from(await res.arrayBuffer());
  if (res.status !== 200) fail(`${entry.url}: HTTP ${res.status}`);
  else if (sha256(body) !== entry.sha256) fail(`${entry.url}: bytes differ from ${file}`);
}, 12);

// 2. The code each page needs.
const has = (file) => Boolean(manifest.files[file]);
const pages = entries.filter(([, entry]) => entry.kind === 'page');
for (const [file] of pages) {
  // eslint-disable-next-line no-await-in-loop
  const html = await readFile(`site/${file}`, 'utf8');
  // A block is a div with a class directly inside a section (main > div > div); sections carry
  // their style as a class too, one level up.
  const main = html.slice(html.indexOf('<main'), html.lastIndexOf('</main>'));
  const blocks = new Set();
  let depth = 0;
  for (const [tag, attrs] of main.matchAll(/<div\b([^>]*)>|<\/div>/g)) {
    if (tag === '</div>') { depth -= 1; continue; }
    const name = attrs?.match(/class="([a-z0-9-]+)/)?.[1];
    if (depth === 1 && name && name !== 'section-metadata') blocks.add(name);
    depth += 1;
  }
  for (const block of blocks) {
    for (const ext of ['js', 'css']) {
      if (!has(`blocks/${block}/${block}.${ext}`)) fail(`${file}: block ${block} has no blocks/${block}/${block}.${ext}`);
    }
  }
  const template = html.match(/<meta name="template" content="([^"]+)"/)?.[1];
  if (template && !has(`templates/${template}/${template}.js`)) fail(`${file}: template ${template} has no code`);
  for (const [, fragment] of html.matchAll(/<meta name="(?:nav|footer)" content="(\/[^"]+)"/g)) {
    if (!has(`${fragment.slice(1)}.plain.html`)) fail(`${file}: its fragment ${fragment} is not in the snapshot`);
  }
}

// 3. Redirects.
const redirects = (await readFile('site/_redirects', 'utf8')).split('\n')
  .filter((line) => line && !line.startsWith('#')).map((line) => line.split(' '));
await pool(redirects, async ([from, to, status]) => {
  const res = await get(`${base}${from}`);
  await res.arrayBuffer();
  const location = res.headers.get('location');
  const target = location && new URL(location, `${base}${from}`);
  const expected = new URL(to, `${base}${from}`);
  if (String(res.status) !== status || !target || target.href !== expected.href) {
    fail(`redirect ${from}: ${res.status} ${location || '(none)'}, expected ${status} ${to}`);
  }
}, 12);

// 4. noindex, and the 404 page.
const home = await follow('/');
await home.arrayBuffer();
if (home.headers.get('x-robots-tag') !== 'noindex, nofollow') fail(`/: x-robots-tag is ${home.headers.get('x-robots-tag')}`);
const missing = await follow(`/archive-check-${Date.now()}/`);
const missingBody = Buffer.from(await missing.arrayBuffer());
if (missing.status !== 404) fail(`missing path: HTTP ${missing.status}, expected 404`);
if (sha256(missingBody) !== manifest.files['404.html']?.sha256) fail('missing path: body is not site/404.html');

console.log(`check ${base}: ${entries.length} files, ${pages.length} pages, ${redirects.length} redirects, ${hops} redirect hops followed`);
if (failures.length) {
  console.log(`check: FAIL (${failures.length})\n  ${failures.slice(0, 40).join('\n  ')}`);
  process.exit(1);
}
console.log('check: PASS');
