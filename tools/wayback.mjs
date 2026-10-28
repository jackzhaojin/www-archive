#!/usr/bin/env node
/*
 * Asks the Wayback Machine to capture www's pages (anonymous Save Page Now, no keys) and keeps
 * the latest capture of each in wayback.json, one line per URL. The captures are an outside,
 * timestamped record of what www served; the snapshot is the copy we can rebuild from.
 *
 *   node tools/wayback.mjs                       every page in snapshot.json
 *   node tools/wayback.mjs --paths /,/writing/   only these
 *   node tools/wayback.mjs --gap 15              seconds between captures (default 10)
 *
 * One capture at a time, gently: Save Page Now limits anonymous use. A 429 or 5xx waits a
 * minute and tries again; three failures in a row stop the run.
 */
import { readFile, writeFile } from 'node:fs/promises';
import {
  SITE, USER_AGENT, opt, readManifest,
} from './lib.mjs';

const args = process.argv.slice(2);
const gap = Number(opt(args, '--gap', '10')) * 1000;
const only = opt(args, '--paths', '');
const manifest = await readManifest();
const paths = only ? only.split(',') : Object.values(manifest.files)
  .filter((entry) => entry.kind === 'page').map((entry) => entry.url).sort();
const sleep = (ms) => new Promise((resolve) => { setTimeout(resolve, ms); });

let record = {};
try { record = JSON.parse(await readFile('wayback.json', 'utf8')); } catch { /* first run */ }
const write = () => writeFile('wayback.json', `{\n${Object.keys(record).sort()
  .map((url) => `  ${JSON.stringify(url)}: ${JSON.stringify(record[url])}`).join(',\n')}\n}\n`);

/** One capture: Save Page Now answers 302 to the new capture's /web/<timestamp>/<url>. */
async function capture(url) {
  const res = await fetch(`https://web.archive.org/save/${url}`, {
    redirect: 'manual',
    headers: { 'user-agent': USER_AGENT },
    signal: AbortSignal.timeout(150000),
  });
  await res.arrayBuffer();
  const location = res.headers.get('location') || '';
  const at = location.match(/\/web\/(\d{14})\//)?.[1];
  if (res.status >= 300 && res.status < 400 && at) return { capture: location, at };
  throw Object.assign(new Error(`HTTP ${res.status}`), { status: res.status });
}

let saved = 0;
let streak = 0;
for (const [i, path] of paths.entries()) {
  const url = `${SITE}${path}`;
  let done = false;
  for (let attempt = 1; attempt <= 3 && !done; attempt += 1) {
    try {
      // eslint-disable-next-line no-await-in-loop
      record[url] = await capture(url);
      saved += 1;
      streak = 0;
      done = true;
      console.log(`  ${i + 1}/${paths.length} ${path}  ${record[url].at}`);
    } catch (error) {
      console.log(`  ${i + 1}/${paths.length} ${path}  ${error.message}, attempt ${attempt}`);
      // eslint-disable-next-line no-await-in-loop
      if (attempt < 3) await sleep(60000);
    }
  }
  if (!done) streak += 1;
  // eslint-disable-next-line no-await-in-loop
  await write();
  if (streak >= 3) {
    console.log('wayback: stopped after 3 pages failed in a row');
    break;
  }
  // eslint-disable-next-line no-await-in-loop
  if (i < paths.length - 1) await sleep(gap);
}
console.log(`wayback: ${saved} of ${paths.length} captured; wayback.json has ${Object.keys(record).length} URLs`);
process.exit(saved === paths.length ? 0 : 1);
