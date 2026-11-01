/*
 * The archive's own robots.txt, shared by the Worker (src/worker.mjs) and the check
 * (tools/check.mjs). Its own module because the Worker's entry may export only handlers.
 */

/**
 * The one host that answers with site/robots.txt (www's copy): the host www's Worker reads if it
 * ever falls back to the archive (ARCHIVE_ORIGIN), so www keeps its own robots.txt then. Every
 * other host, archive.jackzhaojin.com and local dev included, answers with ROBOTS.
 */
export const FALLBACK_HOST = 'www-archive.jackzhaojin.workers.dev';

/**
 * robots.txt on the archive. Google and Bing may crawl, so that they read the noindex header
 * every response sends: a page blocked here could still be listed from a link elsewhere, as the
 * crawler would never see its noindex. Everyone else, the AI crawlers included (they read
 * robots.txt, most don't read noindex), is turned away. Google-Extended and Applebot-Extended
 * aren't named, so they fall under `*`.
 */
export const ROBOTS = `# archive.jackzhaojin.com is the record of www.jackzhaojin.com as served, not the site. Every
# response here sends X-Robots-Tag: noindex, nofollow, and every page's canonical link is its
# page on www. Google and Bing may crawl, only to read that noindex (a page blocked here could
# still be listed from a link elsewhere). Every other crawler, AI ones included, is turned away.
User-agent: Googlebot
User-agent: Bingbot
Content-Signal: search=no, ai-input=no, ai-train=no
Allow: /

User-agent: *
Content-Signal: search=no, ai-input=no, ai-train=no
Disallow: /
`;
