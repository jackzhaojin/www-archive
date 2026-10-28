# www-archive

The archive of [www.jackzhaojin.com](https://www.jackzhaojin.com) as it is served: every page, with its Markdown copy and its body fragment, the nav and footer, the sheets (indexes, redirects), the code the pages load and every image they use. The live site runs on Adobe's AEM Edge Delivery Services, with its content in DA (da.live). This repo is the copy that lives outside Adobe, and its history is the record of what was published when.

| | |
|---|---|
| `site/` | The snapshot. It runs as a site on a static host: a Cloudflare Worker serves it at [archive.jackzhaojin.com](https://archive.jackzhaojin.com), noindex. |
| `snapshot.json` | Every file in `site/`: its URL, kind, type, size and sha256, when the snapshot was taken, and the [www-eds](https://github.com/jackzhaojin/www-eds) commit the code came from. One line per file, so `git log -p snapshot.json` is the history of every page. |
| `wayback.json` | The latest [Wayback Machine](https://web.archive.org/) capture of each page: an outside, timestamped witness. |
| `tools/` | `snapshot.mjs` takes it, `check.mjs` tests a served copy, `wayback.mjs` asks for the captures. |
| `wrangler.jsonc` | The Worker: `site/` as static files, the custom domain, `workers.dev` on. |

## Taking a snapshot

After publishing on www. It reads the list of code files from a www-eds checkout next to this repo (`../www-eds`, at `origin/main`) and fetches everything else from www.

```bash
nvm use && npm i                   # once
npm run snapshot                   # prints what changed since the last one
npm run serve                      # wrangler dev on :8790; leave it running
npm run check                      # every file byte for byte, blocks, redirects, noindex, the 404
git add -A && git commit -m "snapshot: <what changed>" && git push
npm run deploy                     # archive.jackzhaojin.com
npm run check:live
npm run wayback -- --paths /writing/<slug>/   # the pages that changed; no flag captures every page
```

There's no schedule yet: a snapshot is taken by hand after a publish.

## What a snapshot holds

| Kind | What | Stored as |
|---|---|---|
| page | every page in the sitemap and the query index, and every same-site page they link to, as www serves it (the www Worker fills the listings and JSON-LD into the HTML) | `<path>/index.html` |
| plain, md | each page's body fragment and Markdown copy, as Edge Delivery serves them | `<path>/index.plain.html`, `<path>/index.md` |
| fragment | the nav and the footer | `nav.plain.html`, `footer.plain.html` and their `.md` |
| sheet | the query, writing, talks and portfolio indexes, the redirects sheet, metadata, the sitemap config | `<name>.json` |
| crawler | `robots.txt`, `sitemap.xml` | as is |
| code | every file www-eds serves: its tracked files at `origin/main` minus `.hlxignore` (blocks, scripts, styles, templates, widgets, fonts, icons, `head.html`, `404.html`, the root files) | as is |
| media | every `media_<hash>` file a page, fragment or sheet uses, at full size. The names are content hashes, so a later snapshot copies them instead of fetching them again | next to the page that uses it |
| generated | `_redirects` from the redirects sheet (301s), `_headers` with `X-Robots-Tag: noindex, nofollow` | the host reads them; they aren't served |

Links that turned out not to be pages (redirects, 404s) are listed in `snapshot.json` under `notPages`.

## What it doesn't hold

- **DA itself:** drafts, unpublished pages, DA's version history, and the editor's block library (`/docs/library/`, preview only). Each published page's Markdown and fragment carry its full content, so a page can be authored again from here.
- **The 7 GitHub Pages project sites** under www (`/bruce-lava-dash/` and the others): each one is its own repo.
- **What pages embed from elsewhere:** the YouTube players, external links.
- **Image sizes:** the host ignores Edge Delivery's resize query (`?width=750&format=webply`) and serves the original. Heavier, same picture.

## If Adobe goes away

1. **Keep www up:** www's Worker ([www-eds/edge](https://github.com/jackzhaojin/www-eds/tree/main/edge)) fetches Edge Delivery from `ORIGIN_HOSTNAME`. Set it to `www-archive.jackzhaojin.workers.dev` in `edge/wrangler.toml` and deploy, and www serves this snapshot. On www the Worker drops the noindex header, so search is unaffected.
2. **Or host it anywhere** that reads `_redirects` and `_headers` (Cloudflare, Netlify): take the noindex rule out of `_headers` first if it is to be the site itself.
3. **To rebuild on another platform,** the `.md` copies are the content and `site/` shows how each page looked.

The writing is CC BY 4.0 ([/terms/](https://www.jackzhaojin.com/terms/)).
