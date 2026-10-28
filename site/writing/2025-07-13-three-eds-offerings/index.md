1. [Home](/)
2. [Technical Writing](/writing/)
3. Three EDS Authoring Offerings

# Three Ways to Author on AEM Edge Delivery Services: Documents, Universal Editor and da.live

By [Jack Jin](/) · July 13, 2025 · Updated October 4, 2026 · 3 min read

Edge Delivery Services supports more than one way to author content: documents in Google Docs or Word, AEM with the Universal Editor, and da.live, which Adobe had just added in early access when I posted this in July 2025. One diagram shows the three differ only in the authoring interface and where the content is stored. From preview and publish onward they share the same path to the edge, so picking one means picking an editor and a place for the content to live.

---

+------------------------------------------------------------------------------------+
| Rail                                                                               |
+-------------------------------+----------------------------------------------------+
|                               | **First**\                                         |
|                               | [What changed since 2025](#changed)                |
+-------------------------------+----------------------------------------------------+
| ![][image0]                   | **Part 1**\                                        |
|                               | [Documents in Google Docs or Word](#documents)     |
+-------------------------------+----------------------------------------------------+
| ![][image1]                   | **Part 2**\                                        |
|                               | [AEM with the Universal Editor](#universal-editor) |
+-------------------------------+----------------------------------------------------+
| ![][image2]                   | **Part 3**\                                        |
|                               | [da.live, the newest one](#da-live)                |
+-------------------------------+----------------------------------------------------+
| ![][image3]                   | **Part 4**\                                        |
|                               | [One shared path to the edge](#shared)             |
+-------------------------------+----------------------------------------------------+
|                               | **Part 5**\                                        |
|                               | [My June 2025 opinions](#opinions)                 |
+-------------------------------+----------------------------------------------------+
| [Edge Delivery docs on aem.live](https://www.aem.live/docs/)                       |
+------------------------------------------------------------------------------------+

---

+---------------------------------------------------------------------------------------------------------------------+
| Fine Print                                                                                                          |
+---------------------------------------------------------------------------------------------------------------------+
| First published as a LinkedIn video on July 13, 2025. Rewritten for this site in October 2026 from the post and the |
| diagram I drew for it.                                                                                              |
+---------------------------------------------------------------------------------------------------------------------+

---

## What changed since July 2025

- Adobe's [developer tutorial on aem.live](https://www.aem.live/developer/da-tutorial) now uses Document Authoring, the editor at da.live, as the content source "to get you to a live website as fast as possible." It notes that the Universal Editor can be configured for the same project.
- Adobe has since [renamed Document Authoring to Experience Workspace](https://www.aem.live/docs/ew/da-is-ew), and the documentation that used to live on docs.da.live has [moved into aem.live](https://www.aem.live/docs/ew/about). Adobe's [guide to where to author](https://www.aem.live/docs/authoring-guide) now lists four options: Experience Workspace, SharePoint, Google Drive and the Universal Editor in AEM Sites. SharePoint and Google Drive are the two homes for offering 1 below, so the diagram still holds.
- In October 2025 I built on da.live: I wrote [an MCP server for da.live](/writing/2025-10-05-mcp-server-for-eds-da-live/), then [tested it across AI platforms](/writing/2025-10-12-da-live-mcp-across-ai-platforms/).

+-------------------+
| Section Metadata  |
+---------+---------+
| id      | changed |
+---------+---------+

---

## 1. Documents in Google Docs or Word, the original offering

The first offering is the one Edge Delivery Services started with. Authors write in a document editor, Google Docs or Microsoft Word, and the document is the content. Edge Delivery supports [Google Drive and Microsoft SharePoint](https://www.aem.live/docs/authoring-guide) as content sources for these documents.

In June 2025 I put it this way: docs are intuitive, and Google Docs or Word already feel like home. The idea that those surfaces can power live websites is no longer science fiction. It's architecture.

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | documents |
+---------+-----------+

---

## 2. AEM with the Universal Editor, content stored as AEM nodes

The second offering came later, with the same concept. Authors work in AEM through the Universal Editor, and the content is stored where AEM content has always been stored, as AEM nodes. On my diagram I noted what drives the editor: JSON configs and HTML5 data attributes in the page.

+----------------------------+
| Section Metadata           |
+---------+------------------+
| id      | universal-editor |
+---------+------------------+

---

## 3. da.live, the newest offering, edited in the browser

In July 2025 Adobe had just added a third supported authoring capability for Edge Delivery Services: da.live, in early access at the time. Authors write in da.live, in the browser, and the content is stored in Adobe's cloud.

How exactly Adobe stores it, I didn't know. On the diagram I wrote "Blobs / NoSQL DB?", question mark included. That was my guess, and I've left it as a guess.

With da.live, the seven AEM capabilities I'd [written about in June 2025](/writing/2025-06-04-seven-aem-capabilities-tradeoffs/) should be eight now.

+-------------------+
| Section Metadata  |
+---------+---------+
| id      | da-live |
+---------+---------+

---

## 4. All three share one path from publish to the edge

This is how it all works, to me. The three offerings differ only on the left side of the diagram: the authoring interface and where the content is stored. From preview and publish onward, everything is shared. A preview or publish listener picks up the change, Edge Delivery compiles the content together with the code ahead of time, like a static site generator, and the result is served from the edge to browsers and devices.

Pick an offering below to trace its path through my diagram. The first two steps change from one offering to the next; the last three stay the same for all of them, which is the point of the diagram.

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Explainer (offering path)                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Hand-drawn diagram with four column headings: Authoring Interface, Content Storage, EDS Processing and compiling, User. Three rows on the left: Document Editor to Document; Universal Editor (json configs and html5 data attr) to AEM Nodes; da.live to Adobe's Cloud, Blobs / NoSQL DB? All three storage boxes point to one Preview / Publish Listener, then Compile content \+ code (SSG), then Edge Delivery. Browser / Devices points to Edge Delivery.][image4] |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| *Pick an offering*                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| - docs-editor: .711% 17.99% 14.02% 17.00%                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| - docs-store: 21.85% 17.99% 14.02% 17.00%                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| - ue-editor: .711% 49.50% 14.02% 17.00%                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| - ue-store: 21.85% 49.50% 14.02% 17.00%                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| - da-editor: .711% 81.19% 14.02% 17.00%                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| - da-store: 21.85% 81.35% 14.02% 17.00%                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| - listener: 42.99% 49.50% 14.02% 17.00%                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| - compile: 64.13% 49.50% 14.02% 17.00%                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| - edge: 85.27% 49.50% 14.02% 17.00%                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| - browser: 85.27% 17.82% 14.02% 17.00%                                                                                                                                                                                                                                                                                                                                                                                                                                    |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 1. **Author.**                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|    - *Documents:* In a document editor: Google Docs or Microsoft Word.                                                                                                                                                                                                                                                                                                                                                                                                    |
|    - *Universal Editor:* In AEM, through the Universal Editor, driven by JSON configs and HTML5 data attributes.                                                                                                                                                                                                                                                                                                                                                          |
|    - *da.live:* In da.live, in the browser.                                                                                                                                                                                                                                                                                                                                                                                                                               |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 2. **Store.**                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|    - *Documents:* As a document.                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|    - *Universal Editor:* As AEM nodes.                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|    - *da.live:* In Adobe's cloud. I guessed blobs or a NoSQL database.                                                                                                                                                                                                                                                                                                                                                                                                    |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 3. **Preview or publish.** One listener picks up the change, whichever editor it came from.                                                                                                                                                                                                                                                                                                                                                                               |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 4. **Compile.** Content and code are compiled together ahead of time, like a static site generator (SSG).                                                                                                                                                                                                                                                                                                                                                                 |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 5. **Deliver.** Edge Delivery serves the result to browsers and devices.                                                                                                                                                                                                                                                                                                                                                                                                  |
+--------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Documents**                                                                                                                                          | `docs-editor docs-store listener compile edge browser`                                                                                                  | Documents: the content starts as a document in Google Docs or Word.                                                                                    |
+--------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| Universal Editor                                                                                                                                       | `ue-editor ue-store listener compile edge browser`                                                                                                      | Universal Editor: the content starts as AEM nodes, edited in AEM.                                                                                      |
+--------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| da.live                                                                                                                                                | `da-editor da-store listener compile edge browser`                                                                                                      | da.live: the content starts in Adobe’s cloud, edited in the browser.                                                                                   |
+--------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| What's shared                                                                                                                                          | `listener compile edge browser`                                                                                                                         | Shared by all three: preview or publish, compile content with code, deliver from the edge.                                                             |
+--------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| My diagram from July 2025, with the selected offering's path outlined. [Open the diagram full size](https://www.jackzhaojin.com/writing/2025-07-13-three-eds-offerings/media_19cc8f5dc766a4c9ac545943530219c58d94b0350.png).                                                                                                                                                                                                                                              |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Read that way, choosing an offering means choosing an authoring interface and a place for the content to live. The delivery side is drawn only once.

+------------------+
| Section Metadata |
+---------+--------+
| id      | shared |
+---------+--------+

---

## 5. My June 2025 opinions on document authoring and the Universal Editor

These are the opinions I'd already put in writing a month earlier, in [Making sense of seven AEM capabilities](/writing/2025-06-04-seven-aem-capabilities-tradeoffs/):

- Document-based authoring in Edge Delivery is fast, scalable and predictable. It doesn't support personalization or omnichannel out of the box, but it offers the lowest friction for publishing.
- Docs-based authoring will scale faster than any other model. The authoring experience is streamlined enough that content teams can scale without deep AEM development effort.
- Most developers underestimate the effort to fully enable the Universal Editor. It's not just a toggle. It's a dev workflow shift, with frontend partners building dialogs and maybe even model definitions.

For how Edge Delivery compares with the rest of the modern web, outside Adobe, see [How Adobe EDS stacks up against the modern web](/writing/2025-06-08-edge-cms-shift-adobe-eds/).

+--------------------+
| Section Metadata   |
+---------+----------+
| id      | opinions |
+---------+----------+

---

## Related

+---------------------------------------------------------------------------------------------------------------------------------------------------+
| Row List                                                                                                                                          |
+---------+-------------------------------------------------------------------------------------------------+---------------------------------------+
| Article | [How Adobe EDS Stacks Up Against the Modern Web](/writing/2025-06-08-edge-cms-shift-adobe-eds/) | Edge Delivery next to the rest of the |
|         |                                                                                                 | edge CMS world, June 2025.            |
+---------+-------------------------------------------------------------------------------------------------+---------------------------------------+
| Article | [Making Sense of Seven AEM Capabilities](/writing/2025-06-04-seven-aem-capabilities-tradeoffs/) | The seven that da.live made eight.    |
+---------+-------------------------------------------------------------------------------------------------+---------------------------------------+
| Article | [An MCP Server for EDS and da.live](/writing/2025-10-05-mcp-server-for-eds-da-live/)            | What I built on da.live three months  |
|         |                                                                                                 | later.                                |
+---------+-------------------------------------------------------------------------------------------------+---------------------------------------+

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

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Metadata                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| title                   | Three Ways to Author on AEM Edge Delivery Services \| Jack Jin                                                                                                                                                                                                                                                                                                                                                                         |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| description             | Edge Delivery Services authoring in July 2025: Google Docs or Word, AEM with the Universal Editor, and da.live. One diagram: how they differ, what they share.                                                                                                                                                                                                                                                                         |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| template                | article                                                                                                                                                                                                                                                                                                                                                                                                                                |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| title-keep-together     | da.live                                                                                                                                                                                                                                                                                                                                                                                                                                |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image                   | ![Jack's hand-drawn diagram of the three Edge Delivery Services authoring offerings: document editor, Universal Editor and da.live, each with its storage, all flowing into one preview and publish listener, a compile step and Edge Delivery.][image5]                                                                                                                                                                               |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image:alt               | Jack's hand-drawn diagram of the three Edge Delivery Services authoring offerings: document editor, Universal Editor and da.live, each with its storage, all flowing into one preview and publish listener, a compile step and Edge Delivery.                                                                                                                                                                                          |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| published-time          | 2025-07-13                                                                                                                                                                                                                                                                                                                                                                                                                             |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| modified-time           | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                             |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| json-ld                 | {"@context":"https\://schema.org","@graph":\[{"@type":"Person","@id":"https\://www\.jackzhaojin.com/#person","name":"Jack Jin","url":"https\://www\.jackzhaojin.com/","jobTitle":"Associate Director","worksFor":{"@type":"Organization","name":"Accenture","department":{"@type":"Organization","name":"Adobe Business                                                                                                                |
|                         | Group"}},"sameAs":\["https\://www\.linkedin.com/in/jackjin","https\://github.com/jackzhaojin","https\://www\.youtube.com/@jackjin8467","https\://www\.credly.com/users/jack-jin"],"award":\["Adobe Experience Manager Champion, class of 2026-2027","AEM Rockstar winner, Adobe Summit 2024"]},{"@type":"WebSite","@id":"https\://www\.jackzhaojin.com/#website","url":"https\://www\.jackzhaojin.com/","name":"Jack                   |
|                         | Jin","publisher":{"@id":"https\://www\.jackzhaojin.com/#person"}},{"@type":"TechArticle","@id":"https\://www\.jackzhaojin.com/writing/2025-07-13-three-eds-offerings/#article","headline":"Three Ways to Author on AEM Edge Delivery Services: Documents, Universal Editor and da.live","description":"Edge Delivery Services authoring in July 2025: Google Docs or Word, AEM with the Universal Editor, and da.live. One diagram:    |
|                         | how they differ, what they                                                                                                                                                                                                                                                                                                                                                                                                             |
|                         | share.","author":{"@id":"https\://www\.jackzhaojin.com/#person"},"publisher":{"@id":"https\://www\.jackzhaojin.com/#person"},"image":"https\://www\.jackzhaojin.com/writing/2025-07-13-three-eds-offerings/media\_139fbe8752c895686ed464176b668d08affea265e.jpg","mainEntityOfPage":"https\://www\.jackzhaojin.com/writing/2025-07-13-three-eds-offerings/","isPartOf":{"@id":"https\://www\.jackzhaojin.com/#website"},"about":\["AEM |
|                         | Edge Delivery Services","Document Authoring","da.live","Universal Editor","Content                                                                                                                                                                                                                                                                                                                                                     |
|                         | authoring"],"datePublished":"2025-07-13","dateModified":"2026-10-04","inLanguage":"en","wordCount":782},{"@type":"BreadcrumbList","@id":"https\://www\.jackzhaojin.com/writing/2025-07-13-three-eds-offerings/#breadcrumb","itemListElement":\[{"@type":"ListItem","position":1,"name":"Home","item":"https\://www\.jackzhaojin.com/"},{"@type":"ListItem","position":2,"name":"Technical                                              |
|                         | Writing","item":"https\://www\.jackzhaojin.com/writing/"},{"@type":"ListItem","position":3,"name":"Three EDS Authoring Offerings","item":"https\://www\.jackzhaojin.com/writing/2025-07-13-three-eds-offerings/"}]}]}                                                                                                                                                                                                                  |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| og:image:alt            | Jack's hand-drawn diagram of the three Edge Delivery Services authoring offerings: document editor, Universal Editor and da.live, each with its storage, all flowing into one preview and publish listener, a compile step and Edge Delivery.                                                                                                                                                                                          |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:published\_time | 2025-07-13                                                                                                                                                                                                                                                                                                                                                                                                                             |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:modified\_time  | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                             |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:author          | https\://www\.jackzhaojin.com/                                                                                                                                                                                                                                                                                                                                                                                                         |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-summary         | Documents, the Universal Editor and da.live on one diagram: the three Edge Delivery authoring options differ only in the editor and where content is stored. From preview and publish on, the path to the edge is shared.                                                                                                                                                                                                              |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-image           | https\://www\.jackzhaojin.com/writing/media\_139fbe8752c895686ed464176b668d08affea265e.jpg?width=750\&format=jpg\&optimize=medium                                                                                                                                                                                                                                                                                                      |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-topics          | Adobe AEM & EDS                                                                                                                                                                                                                                                                                                                                                                                                                        |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-reading-time    | 3 min read                                                                                                                                                                                                                                                                                                                                                                                                                             |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-keywords        | aem edge delivery services eds document authoring da.live universal editor google docs microsoft word sharepoint google drive aem.live document-based authoring                                                                                                                                                                                                                                                                        |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_159a2baf6c2d017ea2d34f2718cbc06934518c50a.png#width=144&height=92

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_12a5cc32abbbbef1fe1cd42a759f4d590b1ba50c5.png#width=144&height=92

[image2]: https://main--www-eds--jackzhaojin.aem.page/media_12fb17e89d56af02ad6eacde92381240942f4a30f.png#width=144&height=92

[image3]: https://main--www-eds--jackzhaojin.aem.page/media_11db501df9c4a71b510a46acf8bbe97fc3e910459.png#width=144&height=92

[image4]: https://main--www-eds--jackzhaojin.aem.page/media_19cc8f5dc766a4c9ac545943530219c58d94b0350.png#width=1600&height=690

[image5]: https://main--www-eds--jackzhaojin.aem.page/media_139fbe8752c895686ed464176b668d08affea265e.jpg#width=1280&height=720
