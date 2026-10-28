#!/usr/bin/env node
/*
 * Takes a snapshot of www.jackzhaojin.com as it is served, into site/, and lists every file in
 * snapshot.json (path, URL, type, size, sha256, one line each, so `git diff` shows what changed).
 *
 *   node tools/snapshot.mjs [--base https://www.jackzhaojin.com] [--code ../www-eds]
 *
 * Everything is fetched from --base. The pages come through the www Worker, so the listings and
 * JSON-LD it fills in are in the HTML, as crawlers get them.
 * - pages: the sitemap, the query index and every same-site page they link to, each as its
 *   HTML, its .plain.html and its .md (EDS serves all three);
 * - the nav and footer fragments (the defaults and any a page names in its nav or footer
 *   metadata), as .plain.html and .md;
 * - the sheets: the query, writing, talks and portfolio indexes, redirects, metadata, the
 *   sitemap config, and any other .json a page links to;
 * - the crawler files: robots.txt and sitemap.xml;
 * - the code: every file www-eds serves (its files at origin/main, minus .hlxignore);
 * - media: every media_<hash> file a page, fragment or sheet uses, at full size. The names are
 *   content hashes, so a file kept from the last snapshot is copied, not fetched again.
 * Written for the host: _redirects from the redirects sheet, _headers with noindex.
 * Exit 1 when a page, fragment, sheet or code file can't be fetched.
 */
import { execFileSync } from 'node:child_process';
import {
  access, cp, mkdir, readFile, rename, rm, writeFile,
} from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  SITE, companions, fileFor, get, opt, pool, readManifest, sha256,
} from './lib.mjs';

const args = process.argv.slice(2);
const base = opt(args, '--base', SITE).replace(/\/$/, '');
const code = resolve(opt(args, '--code', '../www-eds'));
const OUT = 'site';
const NEXT = '.snapshot-next';
const SHEETS = ['/query-index.json', '/writing-index.json', '/talks-index.json', '/portfolio-index.json',
  '/redirects.json', '/metadata.json', '/sitemap.json'];
const FRAGMENTS = ['/nav', '/footer'];
const CRAWLER = ['/robots.txt', '/sitemap.xml'];
/** The hosts that serve this site's media: www and the Edge Delivery origin. */
const MEDIA_HOSTS = new Set([new URL(base).host, 'www.jackzhaojin.com',
  'main--www-eds--jackzhaojin.aem.live', 'main--www-eds--jackzhaojin.aem.page']);
const MEDIA = /(?:https?:\/\/[a-z0-9.-]+)?[^\s"'()<>,[\]]*media_[0-9a-f]{8,}\.[a-z0-9]+/gi;

const git = (...cmd) => execFileSync('git', ['-C', code, ...cmd], { encoding: 'utf8' });
const files = {};
const warnings = [];
const failures = [];
const previous = await readManifest();
const exists = (path) => access(path).then(() => true, () => false);

/**
 * Fetches a path and stores it under NEXT as `kind`; returns its text when it is text. A miss
 * (not a 200, or not HTML when `html` is set) fails the run when `required`, else it goes to
 * `misses` (the warnings by default).
 */
async function save(path, kind, { required = true, html = false, misses = warnings } = {}) {
  const res = await get(`${base}${path}`);
  const type = res.headers.get('content-type') || '';
  if (res.status !== 200 || (html && !type.startsWith('text/html'))) {
    await res.arrayBuffer();
    const location = res.headers.get('location');
    const miss = `${path}: ${res.status}${location ? ` -> ${location}` : ''}${res.status === 200 ? ` ${type}` : ''}`;
    (required ? failures : misses).push(`${kind} ${miss}`);
    return null;
  }
  const body = Buffer.from(await res.arrayBuffer());
  const file = fileFor(path);
  await mkdir(dirname(join(NEXT, file)), { recursive: true });
  await writeFile(join(NEXT, file), body);
  files[file] = { url: path, kind, type, bytes: body.length, sha256: sha256(body) };
  const text = /^(text\/|application\/(json|xml|javascript))/.test(type) ? body.toString('utf8') : null;
  if (text?.includes('/cdn-cgi/l/email-protection')) {
    warnings.push(`${path}: Cloudflare email obfuscation is on; its markup changes on every fetch`);
  }
  return text;
}

/** The www-eds files EDS serves: tracked at origin/main, minus what .hlxignore leaves out. */
function codeFiles() {
  try { git('fetch', '-q', 'origin', 'main'); } catch { warnings.push('www-eds: git fetch failed, using the local origin/main'); }
  const commit = git('rev-parse', 'origin/main').trim();
  if (git('rev-parse', 'HEAD').trim() !== commit) warnings.push(`www-eds: HEAD is not origin/main (${commit.slice(0, 7)}); .hlxignore is read from the checkout`);
  const ignored = new Set(git('ls-files', '--cached', '--ignored', '--exclude-from=.hlxignore').split('\n'));
  const paths = git('ls-tree', '-r', '--name-only', 'origin/main').split('\n')
    .filter((path) => path && !ignored.has(path));
  return { commit, paths: paths.map((path) => `/${path}`) };
}

/** Same-site page links in an HTML page: no extension, or .html, and not a code file. */
function pageLinks(html, from, skip) {
  const out = new Set();
  for (const [, href] of html.matchAll(/href="([^"#?]+)[^"]*"/g)) {
    const url = new URL(href.replaceAll('&#x26;', '&').replaceAll('&amp;', '&'), from);
    const last = url.pathname.split('/').pop();
    if (url.host !== new URL(base).host) continue;
    if (/\.[a-z0-9]+$/i.test(last) && !last.endsWith('.html')) continue;
    if (skip.projectSites.includes(url.pathname.split('/')[1]) || skip.code.has(url.pathname)) continue;
    if (/\.plain\.html$/.test(url.pathname)) continue;
    out.add(url.pathname);
  }
  return out;
}

/** Media paths a text names: www or EDS origin URLs, or relative to where the text is served. */
function mediaRefs(text, from) {
  const out = new Set();
  for (const [match] of text.matchAll(MEDIA)) {
    try {
      const url = new URL(match, from);
      if (MEDIA_HOSTS.has(url.host)) out.add(url.pathname);
    } catch { /* not a URL */ }
  }
  return out;
}

const started = Date.now();
await rm(NEXT, { recursive: true, force: true });
await mkdir(NEXT, { recursive: true });
const { PROJECT_SITES: projectSites } = await import(pathToFileURL(join(code, 'edge/src/routes.mjs')));
const { commit, paths: codePaths } = codeFiles();
const codeSet = new Set(codePaths);

// The pages: the sitemap and the query index, then every same-site page link, breadth first.
const sitemap = await save('/sitemap.xml', 'crawler');
const queryIndex = await save('/query-index.json', 'sheet');
const pages = new Set([
  ...[...(sitemap || '').matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => new URL(loc).pathname),
  ...(queryIndex ? JSON.parse(queryIndex).data.map((row) => row.path) : []),
]);
const texts = [];
const seen = new Set(pages);
const notPages = [];
let queue = [...pages];
while (queue.length) {
  const batch = queue;
  queue = [];
  // eslint-disable-next-line no-await-in-loop
  await pool(batch, async (path) => {
    // A listed page must be there; a linked one that isn't a page (a redirect, a 404) is noted.
    const listed = pages.has(path);
    const html = await save(path, 'page', { required: listed, html: true, misses: notPages });
    if (!html) return;
    pages.add(path);
    const { plain, md } = companions(path);
    texts.push([await save(plain, 'plain', { required: false }), `${base}${plain}`]);
    texts.push([await save(md, 'md', { required: false }), `${base}${md}`]);
    texts.push([html, `${base}${path}`]);
    pageLinks(html, `${base}${path}`, { projectSites, code: codeSet }).forEach((link) => {
      if (!seen.has(link)) { seen.add(link); queue.push(link); }
    });
  });
}

// Fragments (the defaults and any a page names), sheets (the known ones and any a page links
// to), crawler files, code.
const named = texts.flatMap(([text]) => [...(text || '').matchAll(/<meta name="(?:nav|footer)" content="(\/[^"]+)"/g)].map(([, path]) => path));
for (const fragment of new Set([...FRAGMENTS, ...named])) {
  const { plain, md } = companions(fragment);
  texts.push([await save(plain, 'fragment'), `${base}${plain}`]);
  texts.push([await save(md, 'fragment', { required: false }), `${base}${md}`]);
}
const linkedSheets = new Set(texts.flatMap(([text, from]) => [...(text || '').matchAll(/href="([^"]+\.json)"/g)]
  .map(([, href]) => new URL(href, from)).filter((url) => MEDIA_HOSTS.has(url.host)).map((url) => url.pathname)));
for (const sheet of new Set([...SHEETS, ...linkedSheets])) {
  if (!files[fileFor(sheet)]) texts.push([await save(sheet, 'sheet'), `${base}${sheet}`]);
}
for (const file of CRAWLER) if (!files[fileFor(file)]) await save(file, 'crawler');
await pool(codePaths, (path) => save(path, 'code'));

// Media: copied from the last snapshot when the hash-named file is already there.
const media = new Set(texts.flatMap(([text, from]) => (text ? [...mediaRefs(text, from)] : [])));
let reused = 0;
await pool([...media].sort(), async (path) => {
  const file = fileFor(path);
  const old = previous?.files?.[file];
  if (old && await exists(join(OUT, file))) {
    await mkdir(dirname(join(NEXT, file)), { recursive: true });
    await cp(join(OUT, file), join(NEXT, file));
    files[file] = old;
    reused += 1;
    return;
  }
  await save(path, 'media', { required: false });
});

// For the host: the redirects sheet as _redirects, and noindex everywhere.
const redirects = JSON.parse(await readFile(join(NEXT, 'redirects.json'), 'utf8')).data
  .filter((row) => row.Source?.startsWith('/') && row.Destination)
  .map((row) => `${row.Source} ${row.Destination} 301`);
const generated = {
  _redirects: `# Generated by tools/snapshot.mjs from /redirects.json (the site's redirects sheet).\n${redirects.join('\n')}\n`,
  _headers: '# This host is the record of www.jackzhaojin.com, not a copy for search engines.\n/*\n  X-Robots-Tag: noindex, nofollow\n',
};
for (const [file, text] of Object.entries(generated)) {
  await writeFile(join(NEXT, file), text);
  files[file] = { url: null, kind: 'generated', type: 'text/plain', bytes: Buffer.byteLength(text), sha256: sha256(text) };
}

if (failures.length) {
  console.error(`snapshot: FAIL, ${failures.length} required files missing\n  ${failures.join('\n  ')}`);
  process.exit(1);
}

// Swap the new snapshot in and write the manifest, one line per file.
await rm(OUT, { recursive: true, force: true });
await rename(NEXT, OUT);
const counts = {};
Object.values(files).forEach(({ kind }) => { counts[kind] = (counts[kind] || 0) + 1; });
const head = {
  taken: new Date().toISOString(),
  base,
  code: { repo: 'jackzhaojin/www-eds', commit },
  counts,
  bytes: Object.values(files).reduce((sum, { bytes }) => sum + bytes, 0),
  warnings: [...warnings].sort(),
  notPages: notPages.sort(),
};
const lines = Object.keys(files).sort().map((file) => `    ${JSON.stringify(file)}: ${JSON.stringify(files[file])}`);
const json = JSON.stringify(head, null, 2).replace(/\n}$/, `,\n  "files": {\n${lines.join(',\n')}\n  }\n}\n`);
await writeFile('snapshot.json', json);

// What changed since the last snapshot.
const before = previous?.files || {};
const added = Object.keys(files).filter((file) => !before[file]);
const removed = Object.keys(before).filter((file) => !files[file]);
const changed = Object.keys(files).filter((file) => before[file] && before[file].sha256 !== files[file].sha256);
console.log(`snapshot: ${Object.keys(files).length} files, ${(head.bytes / 1e6).toFixed(1)} MB, in ${((Date.now() - started) / 1000).toFixed(0)} s`);
console.log(`  ${Object.entries(counts).map(([kind, n]) => `${kind} ${n}`).join(', ')}; media reused ${reused}`);
console.log(`  code: www-eds ${commit.slice(0, 7)}`);
if (previous) {
  console.log(`  since ${previous.taken}: ${added.length} added, ${changed.length} changed, ${removed.length} removed`);
  for (const [label, list] of [['+', added], ['~', changed], ['-', removed]]) {
    list.filter((file) => /^(page|sheet|fragment)$/.test((files[file] || before[file]).kind))
      .forEach((file) => console.log(`    ${label} ${(files[file] || before[file]).url}`));
  }
}
if (notPages.length) console.log(`  links that are not pages: ${notPages.length} (see snapshot.json notPages)`);
warnings.forEach((warning) => console.log(`  warn ${warning}`));
