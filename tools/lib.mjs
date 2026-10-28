/*
 * What the snapshot, the check and the Wayback capture share: the site, the file a URL path is
 * stored in, a fetch that retries, a small worker pool and sha256.
 */
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

export const SITE = 'https://www.jackzhaojin.com';
export const USER_AGENT = 'www-archive (+https://github.com/jackzhaojin/www-archive)';

/** The value after a flag (`--base x`), or the fallback. */
export function opt(args, name, fallback) {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}

/** sha256 of a buffer or string, hex. */
export const sha256 = (data) => createHash('sha256').update(data).digest('hex');

/**
 * The file a served path is stored in under site/: a folder path is its index.html
 * (`/writing/x/` is `writing/x/index.html`), anything with an extension keeps its name, and a
 * path without one is `<path>.html`, which is how the host serves it back.
 * @param {string} path URL path, starting with /
 */
export function fileFor(path) {
  if (path.endsWith('/')) return `${path.slice(1)}index.html`;
  if (/\.[a-z0-9]+$/i.test(path.split('/').pop())) return path.slice(1);
  return `${path.slice(1)}.html`;
}

/** The .plain.html and .md paths EDS serves for a page path. */
export function companions(path) {
  const stem = path.endsWith('/') ? `${path}index` : path;
  return { plain: `${stem}.plain.html`, md: `${stem}.md` };
}

/**
 * fetch with retries on network errors, 429 and 5xx, and redirects left to the caller.
 * @param {string} url
 * @param {RequestInit} [init]
 */
export async function get(url, init = {}, tries = 4) {
  let last;
  for (let attempt = 1; attempt <= tries; attempt += 1) {
    try {
      const res = await fetch(url, {
        redirect: 'manual',
        ...init,
        headers: { 'user-agent': USER_AGENT, ...init.headers },
      });
      if (res.status !== 429 && res.status < 500) return res;
      last = new Error(`HTTP ${res.status}`);
    } catch (error) {
      last = error;
    }
    await new Promise((resolve) => { setTimeout(resolve, 500 * 2 ** attempt); });
  }
  throw new Error(`${url}: ${last.message}`);
}

/**
 * Runs `work` over `items`, `size` at a time, and returns the results in order.
 * @template T, R
 * @param {T[]} items
 * @param {(item: T) => Promise<R>} work
 */
export async function pool(items, work, size = 8) {
  const out = new Array(items.length);
  let next = 0;
  const lane = async () => {
    while (next < items.length) {
      const i = next;
      next += 1;
      // eslint-disable-next-line no-await-in-loop
      out[i] = await work(items[i]);
    }
  };
  await Promise.all(Array.from({ length: Math.min(size, items.length) }, lane));
  return out;
}

/** snapshot.json, or null before the first snapshot. */
export async function readManifest(file = 'snapshot.json') {
  try {
    return JSON.parse(await readFile(file, 'utf8'));
  } catch {
    return null;
  }
}
