/*
 * The archive Worker: site/ as static files, except robots.txt, which is the archive's own
 * (src/robots.mjs) on every host but workers.dev. site/robots.txt stays www's copy, as served:
 * it is the record, and www's Worker serves it on www if it ever falls back to the archive
 * (ARCHIVE_ORIGIN, which is workers.dev). Only /robots.txt reaches this script
 * (run_worker_first in wrangler.jsonc); everything else is served without it.
 */
import { FALLBACK_HOST, ROBOTS } from './robots.mjs';

export default {
  /**
   * @param {Request} request The incoming request
   * @param {{ASSETS: Fetcher}} env The static assets binding (site/)
   */
  async fetch(request, env) {
    const { hostname, pathname } = new URL(request.url);
    if (pathname !== '/robots.txt' || hostname === FALLBACK_HOST) return env.ASSETS.fetch(request);
    return new Response(ROBOTS, {
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'cache-control': 'public, max-age=0, must-revalidate',
        'x-robots-tag': 'noindex, nofollow',
      },
    });
  },
};
