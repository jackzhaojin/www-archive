1. [Home](/)
2. [Technical Writing](/writing/)
3. The Edge CMS Shift

# The Edge CMS Shift: How Adobe EDS Stacks Up Against the Modern Web

By [Jack Jin](/) · June 8, 2025 · Updated October 4, 2026 · 6 min read

Adobe's Edge Delivery Services (EDS) keeps content in Word or Google Docs, code in GitHub, and renders pages at the edge. Here is how it compares with Cloudflare Pages, Netlify with a composable CMS, Next.js static generation, Hugo and Jekyll on five things enterprises need: the authoring surface, preview, personalization, enterprise workflows and edge support. Along the way, how Adobe's CMS thinking got from CQ5 to EDS, and the gaps EDS still had in June 2025.

---

+--------------------------------------------------------------------------------+
| Rail                                                                           |
+------------------+-------------------------------------------------------------+
|                  | **Since 2025**\                                             |
|                  | [What changed since I wrote this](#what-changed)            |
+------------------+-------------------------------------------------------------+
|                  | **Situation**\                                              |
|                  | [Why the enterprise is ready for the edge](#ready-for-edge) |
+------------------+-------------------------------------------------------------+
| ![][image0]      | **History**\                                                |
|                  | [From CQ5 to EDS](#cq5-to-eds)                              |
+------------------+-------------------------------------------------------------+
| ![][image1]      | **Comparison**\                                             |
|                  | [EDS and five other platforms](#compared)                   |
+------------------+-------------------------------------------------------------+
|                  | **Result**\                                                 |
|                  | [Where EDS could go](#where-next)                           |
+------------------+-------------------------------------------------------------+
| [Compare by capability](#compared)                                             |
+--------------------------------------------------------------------------------+

---

+----------------------------------------------------------------------------------------------------------------------+
| Fine Print                                                                                                           |
+----------------------------------------------------------------------------------------------------------------------+
| First published as a LinkedIn article on June 8, 2025. Rewritten for this site in October 2026. Client scenarios are |
| illustrative: "it's possible to do this", not "we did this x times".                                                 |
+----------------------------------------------------------------------------------------------------------------------+

---

## What changed since I wrote this

Two things moved. The first is authoring. In July 2025 Adobe added da.live, then in early access, as a third supported way to author Edge Delivery sites, which I covered in [Making sense of the three EDS offerings](/writing/2025-07-13-three-eds-offerings/). Document Authoring has since been [renamed Experience Workspace](https://www.aem.live/docs/ew/da-is-ew), and Adobe's guide [Where to author your site](https://www.aem.live/docs/authoring-guide) lists four options: Experience Workspace, Microsoft SharePoint, Google Drive, and Universal Editor in AEM Sites.

The second is code at the edge. Below I say EDS has no backend code. In 2026 Adobe made Edge Functions generally available: your own code running on Adobe's CDN in front of an Edge Delivery site, and I used them to add Google sign-in and members-only pages in [AEM Edge Functions on a laptop](/writing/2026-09-20-aem-edge-functions-google-sign-in/). The pages are still static and cached. What's new is that you can choose to run code in front of them.

The rest is my June 2025 view, including the platform comparison, which I haven't re-checked against those products since.

+------------------------+
| Section Metadata       |
+---------+--------------+
| id      | what-changed |
+---------+--------------+

---

## Why the enterprise is ready for the edge

There's a clear shift in how enterprise content is delivered. Traditional CMS platforms, once deeply embedded in monolithic infrastructure, are being split apart. Systems are going modular. Authoring is becoming more distributed. The frontend is decoupled, the backend is lean, and publishing needs to be instant.

Many organizations feel this tension. Marketing teams need to move faster. Developers want to simplify their stacks. Authors want fewer tools to learn. Docs are intuitive; Google Docs or Word already feel like home. The idea that those surfaces can power live websites is no longer science fiction. It's architecture.

Adobe isn't entering an overcrowded space this time. It's bringing something new at the enterprise level. Edge Delivery Services brings static generation, content workflows and edge rendering together in one system, ready for enterprise scale.

+--------------------------+
| Section Metadata         |
+---------+----------------+
| id      | ready-for-edge |
+---------+----------------+

---

## How Adobe's CMS went from CQ5 to Edge Delivery

When Day entered the CMS space with CQ5, it wasn't first. But it was better. Authoring stood out, Dispatcher came bundled, and TarMK made deployment easier. Compared to Documentum and others, CQ offered a unified way to manage content that was both powerful and intuitive.

Then came AEM as a Cloud Service, a big step forward. Infrastructure became Adobe's responsibility, and clients stopped worrying about replication queues and JVM tuning. It moved AEM into the containerized world. Even so, many of the legacy assumptions stayed. Authoring was still tied to Sites. Deployment pipelines still needed DevOps overhead. Monoliths got smaller, but they didn't disappear.

+----------------------+
| Section Metadata     |
+---------+------------+
| id      | cq5-to-eds |
+---------+------------+

---

+-----------------------------------------------------------------------------------------------------------------+
| Explainer (era steps)                                                                                           |
+-----------------------------------------------------------------------------------------------------------------+
| CQ5 and on-premise AEM                                                                                          |
|                                                                                                                 |
| Better, not first                                                                                               |
|                                                                                                                 |
| - Authoring that stood out                                                                                      |
| - Dispatcher bundled                                                                                            |
| - TarMK made deployment easier                                                                                  |
+-----------------------------------------------------------------------------------------------------------------+
| AEM as a Cloud Service                                                                                          |
|                                                                                                                 |
| Infrastructure becomes Adobe's job                                                                              |
|                                                                                                                 |
| - Containers, no JVM tuning                                                                                     |
| - Authoring still tied to Sites                                                                                 |
| - Pipelines still need DevOps                                                                                   |
+-----------------------------------------------------------------------------------------------------------------+
| Edge Delivery Services                                                                                          |
|                                                                                                                 |
| A reimagining                                                                                                   |
|                                                                                                                 |
| - No backend code, no Dispatcher                                                                                |
| - GitHub for templates and blocks                                                                               |
| - Word or Google Docs for content                                                                               |
| - Rendered at the edge                                                                                          |
+-----------------------------------------------------------------------------------------------------------------+
| The three steps as I described them in June 2025, from the platform that won on authoring to the one that moved |
| rendering to the edge.                                                                                          |
+-----------------------------------------------------------------------------------------------------------------+

Edge Delivery Services is the next big leap. It's not an upgrade of AEM; it's a reimagining. Fully cloud native. No backend code, no runtime errors, no Dispatcher. Templates live in GitHub, content lives in Word or Google Docs, and the path to edge rendering is fast. AEM came later as a content repository, with the same concept.

In my view the model is foolproof by design. There's nothing to compile, and nothing to break and give you a 500. Business teams use Docs. Developers define templates and blocks. Pages get rendered at the edge, which means fast performance, easy collaboration and no cold starts.

Cloud platforms like Azure are more and more the invisible backbone of modern websites, and next to an edge-native delivery system like EDS they shine. They're more than hosting environments: they offer API orchestration, durable functions and serverless compute. These are the tools of a modern cloud engineer, and they complement Edge Delivery well.

And Adobe is betting early. I didn't see this as a trend-following move. I saw it as a market-breaking one.

+-----------------------+
| Section Metadata      |
+---------+-------------+
| id      | eras-figure |
+---------+-------------+

---

## How EDS compares with five other platforms

It's tempting to put EDS in the same category as static site generators or edge-hosted frameworks. On the surface the architecture looks familiar: static HTML, Git-based deployments, fast global delivery. That's where the similarities end.

Most developer-first platforms focus on building fast websites, and they assume developers do the authoring. Markdown, YAML and command line tools are fine for personal blogs or startups. Enterprise organizations need more: legal reviews, structured approvals, personalized content delivery, and preview links that don't require standing up a preview server.

That's where I think EDS shines. It isn't cobbled together from third-party services or custom glue code. Authoring, previewing, publishing and personalization come as one, with edge performance, and it meets legal and compliance needs without giving up speed. Here's how I compared it with five popular options in June 2025, on the same five capabilities.

Pick a capability below to line up all six platforms on that one row. Authoring and enterprise workflows are where they split most: the other five assume a developer does the authoring, or leave approvals to custom work.

+----------------------------------------------------------------------------------------------------------------------+
| Explainer (capability pivot)                                                                                         |
+----------------------------------------------------------------------------------------------------------------------+
| Pick a capability                                                                                                    |
+----------------------------------------------------------------------------------------------------------------------+
| Six platforms, five enterprise capabilities, as I saw them in June 2025                                              |
+------------------+-------------------+-------------------+-------------------+-------------------+-------------------+
| Platform         | Authoring surface | Preview support   | Personalization   | Enterprise        | Edge support      |
|                  |                   |                   |                   | workflows         |                   |
+------------------+-------------------+-------------------+-------------------+-------------------+-------------------+
| Full table       | Authoring         | Preview           | Personalization   | Workflows         | Edge              |
+------------------+-------------------+-------------------+-------------------+-------------------+-------------------+
| **Adobe EDS**    | Google Docs or    | Live with         | Can be integrated | Native review,    | First-class,      |
|                  | Word              | Universal Editor, | manually with AEP | approval and      | deeply integrated |
|                  |                   | or preview on     | and Adobe Target  | legal             |                   |
|                  |                   | aem.live          |                   | compatibility     |                   |
|                  |                   |                   |                   | with Universal    |                   |
|                  |                   |                   |                   | Editor and Sites  |                   |
+------------------+-------------------+-------------------+-------------------+-------------------+-------------------+
| Cloudflare Pages | Markdown          | Manual or         | Not natively      | Requires custom   | Excellent, but    |
|                  |                   | CLI-based         | supported         | implementation    | developer-driven  |
+------------------+-------------------+-------------------+-------------------+-------------------+-------------------+
| Netlify \+       | CMS UI \+         | Possible with     | Varies with the   | Partial, often    | Strong, but       |
| composable CMS   | Markdown          | configuration     | CMS integration   | pieced together   | fragmented        |
| (for example     |                   |                   |                   |                   |                   |
| Sanity)          |                   |                   |                   |                   |                   |
+------------------+-------------------+-------------------+-------------------+-------------------+-------------------+
| Next.js static   | Developer-built,  | Available, but    | Possible with     | Not native, needs | Optimized with    |
| generation       | or a headless CMS | takes effort      | middleware or     | architecture      | the Next.js Edge  |
|                  |                   |                   | APIs              |                   | Runtime           |
+------------------+-------------------+-------------------+-------------------+-------------------+-------------------+
| Hugo             | Markdown, Word    | Local preview     | Not built in      | Manual. The       | Requires          |
|                  | with extensions   | with the CLI      |                   | Word-to-Hugo      | configuration,    |
|                  |                   |                   |                   | workflow exists,  | not native        |
|                  |                   |                   |                   | but it's fragile  |                   |
+------------------+-------------------+-------------------+-------------------+-------------------+-------------------+
| Jekyll           | Markdown          | Local only        | Not supported     | Minimal           | Limited without a |
|                  |                   |                   |                   |                   | custom CDN setup  |
+------------------+-------------------+-------------------+-------------------+-------------------+-------------------+
| Each view reads from the same table. "Full table" shows all five capabilities at once. My June 2025 view, not        |
| re-checked against these products since.                                                                             |
+----------------------------------------------------------------------------------------------------------------------+

The Hugo row is from experience. I built jackconsults.com with Hugo and explored pipelines that turn Word documents into Hugo pages. The workflow exists, but it's fragile.

The bigger difference is in what these platforms prioritize. Most developer-first tools treat authoring as an afterthought. They optimize for builds, not for business enablement. EDS flips that. It starts with authors, not code. It supports the preview cycle, not just the publish. And it supports teams beyond marketing: legal, governance, campaign managers. Everyone gets a seat at the table.

My conclusion in June 2025: EDS is complete, from authoring to publishing and from compliance to performance. To me it was the first enterprise-ready edge CMS.

+--------------------+
| Section Metadata   |
+---------+----------+
| id      | compared |
+---------+----------+

---

## Where EDS could go, and what it still lacked in June 2025

Adobe's move with EDS is bold. Unlike the early days of CQ, there's no crowd to stand out from. This is new territory, and Adobe is leading it.

EDS is more than a shift in technology. It reshapes how teams think and operate. Business users keep working in tools they already know and trust, like Word or Google Docs. Developers define templates and step aside, so authors can publish confidently and independently.

The backend doesn't slow things down. There's no complex infrastructure to debug or deploy, and pages render fast and reliably from the edge. Frontend teams are still critical: they build the templates and the scaffolding. Once that's done, business teams can preview and publish on their own, without waiting.

My notes from that week also had a wishlist. For business teams to run campaigns without developers, Edge Delivery needed more parity with Sites: content fragments, variations, and easy authoring for personalization. And since marketing briefs already live in documents, maybe EDS just needs a better default template to deliver them.

This is the kind of architecture shift that changes more than platforms. It changes how teams work. In June 2025 I was doubling down on Adobe's bet on EDS, and I liked my odds.

+----------------------+
| Section Metadata     |
+---------+------------+
| id      | where-next |
+---------+------------+

---

## Related

+-----------------------------------------------------------------------------------------------------------------------------------------------+
| Row List                                                                                                                                      |
+---------+---------------------------------------------------------------------------------------------+---------------------------------------+
| Article | [Making sense of 7 AEM capabilities](/writing/2025-06-04-seven-aem-capabilities-tradeoffs/) | The week before: EDS next to the      |
|         |                                                                                             | other six ways to build on AEM.       |
+---------+---------------------------------------------------------------------------------------------+---------------------------------------+
| Article | [Making sense of the three EDS offerings](/writing/2025-07-13-three-eds-offerings/)         | Docs, Universal Editor and da.live, a |
|         |                                                                                             | month later.                          |
+---------+---------------------------------------------------------------------------------------------+---------------------------------------+
| Article | [AEM Edge Functions on a laptop](/writing/2026-09-20-aem-edge-functions-google-sign-in/)    | Code back at the edge: Google sign-in |
|         |                                                                                             | on an Edge Delivery site.             |
+---------+---------------------------------------------------------------------------------------------+---------------------------------------+

+-------------------------------------------------------------------------------------------+
| Author Box                                                                                |
+------+------------------------------------------------------------------------------------+
| JJ   | Jack Jin                                                                           |
|      |                                                                                    |
|      | Associate Director in Accenture's Adobe Business Group, Columbus, Ohio. AEM        |
|      | Champion (class of 2026-2027), AEM Rockstar winner at Adobe Summit 2024 and Adobe  |
|      | Certified Master. I build AI agent systems on AEM and Edge Delivery Services, then |
|      | write up what I learn.                                                             |
|      |                                                                                    |
|      | [Portfolio](/portfolio/) [Talks](/talks/) [GitHub](https://github.com/jackzhaojin) |
+------+------------------------------------------------------------------------------------+

+-------------------+
| Section Metadata  |
+---------+---------+
| style   | related |
+---------+---------+

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Metadata                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| title                   | The Edge CMS Shift: How Adobe EDS Stacks Up \| Jack Jin                                                                                                                                                                                                                                                                                                                                                                                         |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| description             | Adobe Edge Delivery Services next to Cloudflare Pages, Netlify, Next.js, Hugo and Jekyll on five enterprise needs, and Adobe's CMS path from CQ5 to EDS.                                                                                                                                                                                                                                                                                        |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| template                | article                                                                                                                                                                                                                                                                                                                                                                                                                                         |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image                   | ![Header art: How Adobe EDS Stacks Up Against the Modern Web, server racks on the left and a network of edge nodes with document icons on the right][image2]                                                                                                                                                                                                                                                                                    |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image:alt               | Header art: How Adobe EDS Stacks Up Against the Modern Web, server racks on the left and a network of edge nodes with document icons on the right                                                                                                                                                                                                                                                                                               |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| published-time          | 2025-06-08                                                                                                                                                                                                                                                                                                                                                                                                                                      |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| modified-time           | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                      |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| json-ld                 | {"@context":"https\://schema.org","@graph":\[{"@type":"Person","@id":"https\://www\.jackzhaojin.com/#person","name":"Jack Jin","url":"https\://www\.jackzhaojin.com/","jobTitle":"Associate Director","worksFor":{"@type":"Organization","name":"Accenture","department":{"@type":"Organization","name":"Adobe Business                                                                                                                         |
|                         | Group"}},"sameAs":\["https\://www\.linkedin.com/in/jackjin","https\://github.com/jackzhaojin","https\://www\.youtube.com/@jackjin8467","https\://www\.credly.com/users/jack-jin"],"award":\["Adobe Experience Manager Champion, class of 2026-2027","AEM Rockstar winner, Adobe Summit 2024"]},{"@type":"WebSite","@id":"https\://www\.jackzhaojin.com/#website","url":"https\://www\.jackzhaojin.com/","name":"Jack                            |
|                         | Jin","publisher":{"@id":"https\://www\.jackzhaojin.com/#person"}},{"@type":"TechArticle","@id":"https\://www\.jackzhaojin.com/writing/2025-06-08-edge-cms-shift-adobe-eds/#article","headline":"The Edge CMS Shift: How Adobe EDS Stacks Up Against the Modern Web","description":"Adobe Edge Delivery Services next to Cloudflare Pages, Netlify, Next.js, Hugo and Jekyll on five enterprise needs, and Adobe's CMS path from CQ5 to          |
|                         | EDS.","author":{"@id":"https\://www\.jackzhaojin.com/#person"},"publisher":{"@id":"https\://www\.jackzhaojin.com/#person"},"image":"https\://www\.jackzhaojin.com/writing/2025-06-08-edge-cms-shift-adobe-eds/media\_166877728c4ebdca76b36bc487c059375b5030f28.jpg","mainEntityOfPage":"https\://www\.jackzhaojin.com/writing/2025-06-08-edge-cms-shift-adobe-eds/","isPartOf":{"@id":"https\://www\.jackzhaojin.com/#website"},"about":\["Edge |
|                         | Delivery Services","Adobe Experience Manager","Static site generation","Cloudflare                                                                                                                                                                                                                                                                                                                                                              |
|                         | Pages","Netlify","Next.js","Hugo","Jekyll"],"datePublished":"2025-06-08","dateModified":"2026-10-04","inLanguage":"en"},{"@type":"BreadcrumbList","@id":"https\://www\.jackzhaojin.com/writing/2025-06-08-edge-cms-shift-adobe-eds/#breadcrumb","itemListElement":\[{"@type":"ListItem","position":1,"name":"Home","item":"https\://www\.jackzhaojin.com/"},{"@type":"ListItem","position":2,"name":"Technical                                  |
|                         | Writing","item":"https\://www\.jackzhaojin.com/writing/"},{"@type":"ListItem","position":3,"name":"The Edge CMS Shift","item":"https\://www\.jackzhaojin.com/writing/2025-06-08-edge-cms-shift-adobe-eds/"}]}]}                                                                                                                                                                                                                                 |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| og:image:alt            | Header art: How Adobe EDS Stacks Up Against the Modern Web, server racks on the left and a network of edge nodes with document icons on the right                                                                                                                                                                                                                                                                                               |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:published\_time | 2025-06-08                                                                                                                                                                                                                                                                                                                                                                                                                                      |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:modified\_time  | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                      |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:author          | https\://www\.jackzhaojin.com/                                                                                                                                                                                                                                                                                                                                                                                                                  |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-summary         | Edge Delivery Services next to Cloudflare Pages, Netlify, Next.js, Hugo and Jekyll on five things enterprises need, plus how Adobe's CMS thinking got from CQ5 to EDS and the gaps EDS still had in June 2025.                                                                                                                                                                                                                                  |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-image           | https\://www\.jackzhaojin.com/writing/media\_166877728c4ebdca76b36bc487c059375b5030f28.jpg?width=750\&format=jpg\&optimize=medium                                                                                                                                                                                                                                                                                                               |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-topics          | Adobe AEM & EDS                                                                                                                                                                                                                                                                                                                                                                                                                                 |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-reading-time    | 6 min read                                                                                                                                                                                                                                                                                                                                                                                                                                      |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-keywords        | edge delivery services aem cq5 day software aem as a cloud service static site generation cloudflare pages netlify sanity next.js hugo jekyll google docs word universal editor azure edge functions da.live experience workspace                                                                                                                                                                                                               |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_1d7f165fd5fd1a6ab95c167e697639dd95a4186ac.png#width=144&height=92

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_1597aa743ad1e69c61203815440e4918918171059.png#width=144&height=92

[image2]: https://main--www-eds--jackzhaojin.aem.page/media_166877728c4ebdca76b36bc487c059375b5030f28.jpg#width=1280&height=720
