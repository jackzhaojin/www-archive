1. [Home](/)
2. [Technical Writing](/writing/)
3. Seven AEM Capabilities

# Making Sense of 7 AEM Capabilities: Tradeoffs and Where Each One Fits

By [Jack Jin](/) · June 4, 2025 · Updated October 4, 2026 · 9 min read

When AEM comes into a project, the team usually lines up behind one architecture, not all seven. This puts all seven side by side: Classic AEM 6.5, AEM as a Cloud Service, the SPA SDKs, headless Content Fragments with Universal Editor, Universal Editor with Sites, Universal Editor with Edge Delivery Services, and docs-based Edge Delivery. The matrix covers authoring, rendering, storage, delivery and analytics, then I get into when Universal Editor beats the Sites Editor and where each option fits. It's meant to help technical leads ask better questions before a team commits.

---

+--------------------------------------------------------------------+
| Rail                                                               |
+----------------+---------------------------------------------------+
|                | **Since 2025**\                                   |
|                | [What changed since I wrote this](#what-changed)  |
+----------------+---------------------------------------------------+
| ![][image0]    | **Situation**\                                    |
|                | [Why no sales slide shows all seven](#narratives) |
+----------------+---------------------------------------------------+
| ![][image1]    | **The matrix**\                                   |
|                | [The seven options, side by side](#matrix)        |
+----------------+---------------------------------------------------+
|                | **Consensus**\                                    |
|                | [Where Adobe and providers agree](#aligned)       |
+----------------+---------------------------------------------------+
|                | **Editors**\                                      |
|                | [Universal Editor or Sites Editor](#editors)      |
+----------------+---------------------------------------------------+
|                | **Opinion**\                                      |
|                | [My spicier takes](#spicy)                        |
+----------------+---------------------------------------------------+
|                | **Result**\                                       |
|                | [No single pattern wins](#end-up)                 |
+----------------+---------------------------------------------------+
| [Compare two options](#matrix)                                     |
+--------------------------------------------------------------------+

---

+--------------------------------------------------------------------------------------------------------------------+
| Fine Print                                                                                                         |
+--------------------------------------------------------------------------------------------------------------------+
| First published as a LinkedIn article on June 4, 2025. Rewritten for this site in October 2026. This is my         |
| professional blog and doesn't represent Accenture's Adobe practice or our partnership with Adobe. Client scenarios |
| are illustrative: "it's possible to do this", not "we did this x times".                                           |
+--------------------------------------------------------------------------------------------------------------------+

---

## What changed since I wrote this

In July 2025, Adobe added a third supported way to author Edge Delivery sites, da.live, then in early access. I wrote up the three Edge Delivery authoring options and said this title should say 8 capabilities now: [Making sense of the three EDS offerings](/writing/2025-07-13-three-eds-offerings/). Adobe has since [renamed Document Authoring to Experience Workspace](https://www.aem.live/docs/ew/da-is-ew), and its guide [Where to author your site](https://www.aem.live/docs/authoring-guide) now lists four places to author an Edge Delivery site: Experience Workspace, Microsoft SharePoint, Google Drive, and Universal Editor in AEM Sites.

The "Backend dev in AEM" row for the two Edge Delivery columns needs an asterisk too. In 2026 I built Google sign-in on an Edge Delivery site with AEM Edge Functions, code Adobe runs on its CDN in front of the site: [AEM Edge Functions on a laptop](/writing/2026-09-20-aem-edge-functions-google-sign-in/). That still isn't backend development in AEM, but it's server-side code on Edge Delivery again.

The matrix and opinions below are what I published in June 2025. I only wrote out the check marks and warning signs as words.

+------------------------+
| Section Metadata       |
+---------+--------------+
| id      | what-changed |
+---------+--------------+

---

## Why no sales slide shows all seven

When consulting companies go to market, we pick a few of these options to bring to customers. Some because the customer asked for them. At best, we bring what we think is best for the customer. At worst, we focus on what we can execute on.

I don't imagine all seven ever make it onto a single sales slide, from Adobe or from any consulting firm. Winning work is about storytelling and building a narrative. A slide with all seven, shown out of context, will distract and confuse.

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                             |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Illustration: AEM in a circle at the center, with roads leading out to people working on Classic AEM, SPA SDKs, Headless \+ UE, UE \+ Sites, UE \+ EDS and Docs \+ EDS, and an API cloud above.][image2] |
|                                                                                                                                                                                                            |
| One AEM, many roads out of it. Header art from the original post.                                                                                                                                          |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

If Adobe ran a workshop and the client decided on Edge Delivery Services, service providers will bring EDS stories. If a long-time consulting team decided on headless, then headless becomes the focus of Adobe's storytelling too.

At best, consulting firms have the breadth to bring the best solution to the client. Leaner Adobe partners may have to bring what they know, or what they have staffing for.

To me, the big picture of all of Adobe's offerings often gets lost in that process. Seeing the whole map helps my technical brain. I hope it helps yours too, without reading a 20-page readout.

+----------------------+
| Section Metadata     |
+---------+------------+
| id      | narratives |
+---------+------------+

---

## The seven options, side by side

The matrix puts the seven options in columns and the features in rows, from two perspectives: functional (authoring and the end user experience) and non-functional (technical, infrastructure and analytics). I split each into traditional and modern options so a table fits on a screen. Sample sites are the public examples I pointed to in June 2025, my employer's own sites or Adobe references. Some of this is up for debate; when I published it, I asked people to discuss it in the comments so I could learn and update the chart. Each option has tradeoffs across the authoring experience, the delivery model, backend extensibility and real-world publishing speed.

Seven columns are hard to read at once. Pick two options below and the rows line up side by side, with the rows where they differ marked. It opens on AEM as a Cloud Service against docs-based Edge Delivery, the two ends of the range, where almost every row differs. Tick "Only rows that differ" to see just the tradeoffs.

+--------------------------------------------------------------------------------------------------+
| Explainer (option pair)                                                                          |
+--------------------------------------+----------------------------------+------------------------+
| Compare                              | with                             | Only rows that differ  |
+--------------------------------------+----------------------------------+------------------------+
| Classic AEM 6.5 (Core Components)    | Classic AEM 6.5                  | Classic AEM 6.5        |
+--------------------------------------+----------------------------------+------------------------+
| AEM as a Cloud Service (Core         | **AEM as a Cloud Service**       | AEM as a Cloud Service |
| Components)                          |                                  |                        |
+--------------------------------------+----------------------------------+------------------------+
| AEM with SPA SDKs                    | AEM with SPA SDKs                | SPA SDKs               |
+--------------------------------------+----------------------------------+------------------------+
| AEM headless Content Fragments \+ UE | Headless Content Fragments \+ UE | Headless CF \+ UE      |
+--------------------------------------+----------------------------------+------------------------+
| UE with AEM Sites                    | UE with AEM Sites                | UE with Sites          |
+--------------------------------------+----------------------------------+------------------------+
| AEM UE \+ EDS                        | AEM UE \+ EDS                    | UE \+ EDS              |
+--------------------------------------+----------------------------------+------------------------+
| Docs with EDS                        | **Docs with EDS**                | Docs \+ EDS            |
+--------------------------------------+----------------------------------+------------------------+
| functional                           | Functional and authoring                                  |
+--------------------------------------+-----------------------------------------------------------+
| technical                            | Technical and infrastructure                              |
+--------------------------------------+-----------------------------------------------------------+
| {differ} of {total} rows differ between {a} and {b}.                                             |
+--------------------------------------------------------------------------------------------------+
| Same option on both sides. Pick a different one to compare.                                      |
+--------------------------------------------------------------------------------------------------+
| differs                                                                                          |
+--------------------------------------------------------------------------------------------------+
| as Classic AEM 6.5: {value}                                                                      |
+--------------------------------------------------------------------------------------------------+
| Built from the four tables below, so the two always match.                                       |
+--------------------------------------------------------------------------------------------------+

### Functional, authoring and end user experience

+---------------------------------------------------------------------------------------------------------------------------------+
| Explainer (option matrix)                                                                                                       |
+---------------------------------------------------------------------------------------------------------------------------------+
| Traditional options: functional                                                                                                 |
+--------------------------+---------------------------+---------------------------------------------+----------------------------+
| Feature                  | Classic AEM 6.5 (Core     | AEM as a Cloud Service (Core Components)    | AEM with SPA SDKs          |
|                          | Components)               |                                             |                            |
+--------------------------+---------------------------+---------------------------------------------+----------------------------+
| Sample site (June 2025)  | *Should be obvious*       | [accenture.com](https://www.accenture.com/) | *Should not disclose*      |
+--------------------------+---------------------------+---------------------------------------------+----------------------------+
| Authoring mode           | Touch UI                  | Touch UI                                    | Touch UI                   |
+--------------------------+---------------------------+---------------------------------------------+----------------------------+
| Editor used              | Classic dialog XML editor | Classic dialog XML editor                   | Classic editor             |
+--------------------------+---------------------------+---------------------------------------------+----------------------------+
| DAM / asset usage        | AEM Assets                | AEM Assets (cloud-optimized)                | Yes                        |
+--------------------------+---------------------------+---------------------------------------------+----------------------------+
| Authoring speed          | Slowest                   | Faster                                      | Medium                     |
+--------------------------+---------------------------+---------------------------------------------+----------------------------+
| End user personalization | Adobe Target / AJO        | Same                                        | Same                       |
| experience               |                           |                                             |                            |
+--------------------------+---------------------------+---------------------------------------------+----------------------------+
| Author personalization   | Yes, Experience Fragments | Yes, Experience Fragments                   | Depends                    |
| integration (Target)     |                           |                                             |                            |
+--------------------------+---------------------------+---------------------------------------------+----------------------------+
| Business use case fit    | Full control, legacy      | Full stack CMS                              | SPA-heavy frontend, legacy |
+--------------------------+---------------------------+---------------------------------------------+----------------------------+

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Explainer (option matrix)                                                                                                                                                                                                                   |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Modern and headless options: functional                                                                                                                                                                                                     |
+-----------------------+-----------------------+-------------------------------------------------------------+-------------------------------------------------------------------+-----------------------------------------------------------+
| Feature               | AEM headless Content  | UE with AEM Sites                                           | AEM UE \+ EDS                                                     | Docs with EDS                                             |
|                       | Fragments \+ UE       |                                                             |                                                                   |                                                           |
+-----------------------+-----------------------+-------------------------------------------------------------+-------------------------------------------------------------------+-----------------------------------------------------------+
| Sample site (June     | *Should not disclose* | [ue-remote-app.adobe.net](https://ue-remote-app.adobe.net/) | [experienceleague.adobe.com](https://experienceleague.adobe.com/) | [newsroom.accenture.com](https://newsroom.accenture.com/) |
| 2025)                 |                       |                                                             |                                                                   |                                                           |
+-----------------------+-----------------------+-------------------------------------------------------------+-------------------------------------------------------------------+-----------------------------------------------------------+
| Authoring mode        | UE dialogs (Content   | UE dialogs (page \+ model definition)                       | UE dialogs (page \+ model definition)                             | Word or Google Docs                                       |
|                       | Fragments)            |                                                             |                                                                   |                                                           |
+-----------------------+-----------------------+-------------------------------------------------------------+-------------------------------------------------------------------+-----------------------------------------------------------+
| Editor used           | Universal Editor      | Universal Editor                                            | Universal Editor                                                  | Docs editor \+ Sidekick                                   |
+-----------------------+-----------------------+-------------------------------------------------------------+-------------------------------------------------------------------+-----------------------------------------------------------+
| DAM / asset usage     | AEM Assets            | Yes                                                         | Yes                                                               | Optimized via EDS                                         |
|                       | (cloud-optimized)     |                                                             |                                                                   |                                                           |
+-----------------------+-----------------------+-------------------------------------------------------------+-------------------------------------------------------------------+-----------------------------------------------------------+
| Authoring speed       | Fast                  | Medium                                                      | Medium                                                            | Fastest                                                   |
+-----------------------+-----------------------+-------------------------------------------------------------+-------------------------------------------------------------------+-----------------------------------------------------------+
| End user              | Same                  | Same                                                        | Same                                                              | Same                                                      |
| personalization       |                       |                                                             |                                                                   |                                                           |
| experience            |                       |                                                             |                                                                   |                                                           |
+-----------------------+-----------------------+-------------------------------------------------------------+-------------------------------------------------------------------+-----------------------------------------------------------+
| Author                | Yes, Content          | Yes, Experience Fragments                                   | Not sure what's supported out of the box                          | No productized export of content to Target offers         |
| personalization       | Fragments             |                                                             |                                                                   |                                                           |
| integration (Target)  |                       |                                                             |                                                                   |                                                           |
+-----------------------+-----------------------+-------------------------------------------------------------+-------------------------------------------------------------------+-----------------------------------------------------------+
| Business use case fit | API-first, modern,    | Modern Sites authoring?                                     | High-performance sites with AEM features (workflows, permissions) | Editorial, newsrooms, speed, ease of use                  |
|                       | mobile and web        |                                                             |                                                                   |                                                           |
+-----------------------+-----------------------+-------------------------------------------------------------+-------------------------------------------------------------------+-----------------------------------------------------------+

### Non-functional: technical, infrastructure and analytics

+----------------------------------------------------------------------------------------------------------------------+
| Explainer (option matrix)                                                                                            |
+----------------------------------------------------------------------------------------------------------------------+
| Traditional options: technical                                                                                       |
+-------------------------+-------------------------------------+-------------------------+----------------------------+
| Feature                 | Classic AEM 6.5 (Core Components)   | AEM as a Cloud Service  | AEM with SPA SDKs          |
|                         |                                     | (Core Components)       |                            |
+-------------------------+-------------------------------------+-------------------------+----------------------------+
| Client HTML rendering   | AEM renderer                        | AEM renderer            | External (CSR/SSR)         |
+-------------------------+-------------------------------------+-------------------------+----------------------------+
| Backend dev in AEM      | Full                                | Full                    | Yes, limited to content    |
+-------------------------+-------------------------------------+-------------------------+----------------------------+
| Content stored in       | JCR (Sites, XF, CF)                 | JCR (Sites, XF, CF)     | Pages                      |
+-------------------------+-------------------------------------+-------------------------+----------------------------+
| Delivery architecture   | Monolithic / Dispatcher             | Cloud containerized     | Headless app \+ AEM APIs   |
+-------------------------+-------------------------------------+-------------------------+----------------------------+
| Analytics support       | Adobe Analytics via data layer      | Same                    | Varies, depends on the SPA |
+-------------------------+-------------------------------------+-------------------------+----------------------------+
| Technical use case      | Full-stack, high control            | Scalable enterprise CMS | Decoupled UI, app-driven   |
+-------------------------+-------------------------------------+-------------------------+----------------------------+
| Ways to get Markdown or | `.model.json` (or a custom servlet) | `.model.json`           | `.model.json`              |
| JSON                    |                                     |                         |                            |
+-------------------------+-------------------------------------+-------------------------+----------------------------+

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Explainer (option matrix)                                                                                                                                                                  |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Modern and headless options: technical                                                                                                                                                     |
+-----------------------+----------------------+----------------------------------------------------------------------------+----------------------------+-----------------------------------+
| Feature               | AEM headless Content | UE with AEM Sites                                                          | AEM UE \+ EDS              | Docs with EDS                     |
|                       | Fragments \+ UE      |                                                                            |                            |                                   |
+-----------------------+----------------------+----------------------------------------------------------------------------+----------------------------+-----------------------------------+
| Client HTML rendering | External (CSR/SSR)   | AEM-rendered HTML enhanced via `.model.json` endpoints                     | EDS runtime                | EDS runtime                       |
+-----------------------+----------------------+----------------------------------------------------------------------------+----------------------------+-----------------------------------+
| Backend dev in AEM    | Not recommended      | Full                                                                       | None                       | None                              |
+-----------------------+----------------------+----------------------------------------------------------------------------+----------------------------+-----------------------------------+
| Content stored in     | Content Fragments    | Pages                                                                      | Pages                      | Docs (Google Docs or SharePoint)  |
+-----------------------+----------------------+----------------------------------------------------------------------------+----------------------------+-----------------------------------+
| Delivery architecture | Headless app \+      | Headless app \+ AEM Sites headless API, or just AEM                        | AEM Sites \+ `decorate.js` | Markdown to HTML \+ `decorate.js` |
|                       | headless API         | Sites                                                                      |                            |                                   |
+-----------------------+----------------------+----------------------------------------------------------------------------+----------------------------+-----------------------------------+
| Analytics support     | Varies, depends on   | Depends on HTML or JSON                                                    | Varies, depends on the     | Varies, depends on the            |
|                       | the SPA              |                                                                            | implementation             | implementation                    |
+-----------------------+----------------------+----------------------------------------------------------------------------+----------------------------+-----------------------------------+
| Technical use case    | Pure headless        | Editable sites with `.model.json`, or extend typical sites without dialogs | Edge-performant hybrid     | Doc-driven publishing with no CMS |
|                       | delivery             |                                                                            |                            |                                   |
+-----------------------+----------------------+----------------------------------------------------------------------------+----------------------------+-----------------------------------+
| Ways to get Markdown  | GraphQL \+ persisted | `.model.json`, `.infinity.json`                                            | `.md`                      | `.md`                             |
| or JSON               | queries              |                                                                            |                            |                                   |
+-----------------------+----------------------+----------------------------------------------------------------------------+----------------------------+-----------------------------------+

One note on the "UE with AEM Sites" column: its HTML is rendered by AEM and enhanced through `.model.json` endpoints, which is different enough that I said at the time I could make this article eight capabilities.

+--------------------+
| Section Metadata   |
+---------+----------+
| id      | matrix   |
+---------+----------+
| style   | roomy-h3 |
+---------+----------+

---

## Where Adobe and most service providers agree

These are the Adobe perspectives I see generally aligned across service providers:

- Universal Editor is no longer experimental. When properly instrumented, it can edit in context everything from page content to Experience Fragments.
- `.model.json` is still foundational for Sites and SPA use, and developers must define content models carefully to support authoring and preview. It's the OG omnichannel option after `.-1.json`, the raw dump of the JCR, which I've heard of people using as renderable data for the frontend.
- Document-based authoring in Edge Delivery is fast, scalable and predictable. It doesn't support personalization or omnichannel out of the box, but it has the lowest friction for publishing.
- Edge Delivery moves away from rendering every request on a server, toward content generated ahead of time and cached at the edge. That's what makes it fast.
- GraphQL with persisted queries is the direction Adobe is pushing for headless. It brings structure, cacheability and security. I go into the caching side in [the headless article](/writing/2025-05-28-aem-headless-when-frontend-teams-lead/#persisted-queries).
- Most developers underestimate the effort to fully enable Universal Editor. It's not a toggle. It's a shift in the development workflow, with frontend partners building dialogs and maybe even model definitions.

Instrumenting has a concrete meaning. Adobe's [getting started guide](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/developing/universal-editor/getting-started) has every page carry a meta tag pointing at the AEM connection and load Adobe's `cors.js` script, and every editable element carry `data-aue-resource`, `data-aue-type` and `data-aue-prop` attributes that tie it to the content behind it. Somebody has to add those to every component the authors should be able to touch.

+-------------------+
| Section Metadata  |
+---------+---------+
| id      | aligned |
+---------+---------+

---

## When Universal Editor beats the Sites Editor, and when it doesn't

While I built the matrix, I checked an Adobe slide that summed up the three editors against my notes. Its claims held up:

- The Content Fragment Editor is built into AEM, form-based, decoupled from any UI and focused on headless. It's schema-based and mostly used with GraphQL or JSON APIs.
- The Sites Editor is built into AEM, page-based, WYSIWYG with inline editing, tightly coupled to AEM rendering and focused on headful sites. It gets complex for headless, because editable templates and HTL need `.model.json` to serve content headlessly.
- Universal Editor is separate from AEM. It edits both Sites and Content Fragment content inline, supports other backends through extensions (with development setup), supports Edge Delivery Services, and integrates lightly, especially with Edge Delivery and external SPAs.

Universal Editor is less feature-rich than the Sites Editor. It has no editable templates and weaker dialog support. I'd still pick it for headless or hybrid frontends where React or Next.js reads content over APIs, for Edge Delivery, for content reused across web, mobile and kiosks, and wherever the rendering lives outside AEM. The Sites Editor still wins when authors want drag-and-drop layout control, when the site uses editable templates and policies, and when it's built on HTL and Sling Models with heavy use of component dialogs.

One expectation to set early when a client on AEM 6.5 asks about Universal Editor with Sites: the content can likely be migrated, but the components have to be rebuilt, and authoring moves from inside AEM to editing on the live site.

+-------------------+
| Section Metadata  |
+---------+---------+
| id      | editors |
+---------+---------+

---

## My spicier takes on each option

These are my opinions, not aligned with anyone:

- Sites with Universal Editor is a confusing middle ground. You get in-context editing, but only if your `.model.json` and instrumentation are airtight. Or you can use `.infinity.json`, as Adobe's [ue-remote-app.adobe.net](https://ue-remote-app.adobe.net/) sample does, which is also confusing.
- Headless Content Fragments with Universal Editor has a strong omnichannel story, but it can be overkill if you aren't integrating across multiple touchpoints. As I wrote in [Why AEM headless makes sense when frontend teams lead](/writing/2025-05-28-aem-headless-when-frontend-teams-lead/), this pattern fits best when the frontend team is very strong or tightly coupled with another vital system.
- Classic AEM still has one of the best WYSIWYG experiences, but you carry all the weight of on-premise or container-based management. It may not be as cool as Universal Editor, but it's far more functional, and arguably still the best in the industry.
- Docs-based Edge Delivery authoring will scale faster than any other model. It's one of the few models where authoring is so streamlined that content teams can scale independently of deep AEM development.
- Edge Delivery will likely be coupled with other cloud solutions.
- I think moving business logic out of AEM is the right approach overall.

+------------------+
| Section Metadata |
+---------+--------+
| id      | spicy  |
+---------+--------+

---

## No single pattern wins

No single pattern wins. They all exist for a reason.

Sometimes it's political. Sometimes it's what the client asked for. Sometimes it's the shape of the wedding cake.

But knowing the tradeoffs is vital to the first step of any implementation. Not every project has the luxury of time to evaluate seven options. When you've seen the full map, you can steer better.

This matrix isn't a prescription. It's a way to ask better questions.

+------------------+
| Section Metadata |
+---------+--------+
| id      | end-up |
+---------+--------+

---

## Related

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Row List                                                                                                                                                             |
+---------+---------------------------------------------------------------------------------------------------------------------+--------------------------------------+
| Article | [Making sense of the three EDS offerings](/writing/2025-07-13-three-eds-offerings/)                                 | The follow-up when da.live made it   |
|         |                                                                                                                     | eight.                               |
+---------+---------------------------------------------------------------------------------------------------------------------+--------------------------------------+
| Article | [Why AEM headless makes sense when frontend teams lead](/writing/2025-05-28-aem-headless-when-frontend-teams-lead/) | The headless column, from a          |
|         |                                                                                                                     | frontend-first project.              |
+---------+---------------------------------------------------------------------------------------------------------------------+--------------------------------------+
| Article | [The edge CMS shift](/writing/2025-06-08-edge-cms-shift-adobe-eds/)                                                 | The docs-based column, compared with |
|         |                                                                                                                     | the rest of the modern web.          |
+---------+---------------------------------------------------------------------------------------------------------------------+--------------------------------------+

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

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Metadata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| title                   | Making Sense of 7 AEM Capabilities: Tradeoffs and Where Each Fits \| Jack Jin                                                                                                                                                                                                                                                                                                                                                                                         |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| description             | AEM 6.5, AEM as a Cloud Service, SPA SDKs, headless with UE, UE with Sites, UE with EDS and docs-based EDS, compared side by side, plus my opinions.                                                                                                                                                                                                                                                                                                                  |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| template                | article                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image                   | ![Illustration: AEM in the center with paths out to Classic AEM, SPA SDKs, Headless \+ UE, UE \+ Sites, UE \+ EDS and Docs \+ EDS][image3]                                                                                                                                                                                                                                                                                                                            |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image:alt               | Illustration: AEM in the center with paths out to Classic AEM, SPA SDKs, Headless \+ UE, UE \+ Sites, UE \+ EDS and Docs \+ EDS                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| published-time          | 2025-06-04                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| modified-time           | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| json-ld                 | {"@context":"https\://schema.org","@graph":\[{"@type":"Person","@id":"https\://www\.jackzhaojin.com/#person","name":"Jack Jin","url":"https\://www\.jackzhaojin.com/","jobTitle":"Associate Director","worksFor":{"@type":"Organization","name":"Accenture","department":{"@type":"Organization","name":"Adobe Business                                                                                                                                               |
|                         | Group"}},"sameAs":\["https\://www\.linkedin.com/in/jackjin","https\://github.com/jackzhaojin","https\://www\.youtube.com/@jackjin8467","https\://www\.credly.com/users/jack-jin"],"award":\["Adobe Experience Manager Champion, class of 2026-2027","AEM Rockstar winner, Adobe Summit 2024"]},{"@type":"WebSite","@id":"https\://www\.jackzhaojin.com/#website","url":"https\://www\.jackzhaojin.com/","name":"Jack                                                  |
|                         | Jin","publisher":{"@id":"https\://www\.jackzhaojin.com/#person"}},{"@type":"TechArticle","@id":"https\://www\.jackzhaojin.com/writing/2025-06-04-seven-aem-capabilities-tradeoffs/#article","headline":"Making Sense of 7 AEM Capabilities: Tradeoffs and Where Each One Fits","description":"AEM 6.5, AEM as a Cloud Service, SPA SDKs, headless with UE, UE with Sites, UE with EDS and docs-based EDS, compared side by side, plus my                              |
|                         | opinions.","author":{"@id":"https\://www\.jackzhaojin.com/#person"},"publisher":{"@id":"https\://www\.jackzhaojin.com/#person"},"image":"https\://www\.jackzhaojin.com/writing/2025-06-04-seven-aem-capabilities-tradeoffs/media\_188d61220f06925eddf5a693b7b2ac2cb6d22e2a0.jpg","mainEntityOfPage":"https\://www\.jackzhaojin.com/writing/2025-06-04-seven-aem-capabilities-tradeoffs/","isPartOf":{"@id":"https\://www\.jackzhaojin.com/#website"},"about":\["Adobe |
|                         | Experience Manager","AEM as a Cloud Service","Universal Editor","Edge Delivery Services","Content Fragments","AEM SPA                                                                                                                                                                                                                                                                                                                                                 |
|                         | Editor"],"datePublished":"2025-06-04","dateModified":"2026-10-04","inLanguage":"en"},{"@type":"BreadcrumbList","@id":"https\://www\.jackzhaojin.com/writing/2025-06-04-seven-aem-capabilities-tradeoffs/#breadcrumb","itemListElement":\[{"@type":"ListItem","position":1,"name":"Home","item":"https\://www\.jackzhaojin.com/"},{"@type":"ListItem","position":2,"name":"Technical                                                                                   |
|                         | Writing","item":"https\://www\.jackzhaojin.com/writing/"},{"@type":"ListItem","position":3,"name":"Seven AEM Capabilities","item":"https\://www\.jackzhaojin.com/writing/2025-06-04-seven-aem-capabilities-tradeoffs/"}]}]}                                                                                                                                                                                                                                           |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| og:image:alt            | Illustration: AEM in the center with paths out to Classic AEM, SPA SDKs, Headless \+ UE, UE \+ Sites, UE \+ EDS and Docs \+ EDS                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:published\_time | 2025-06-04                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:modified\_time  | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:author          | https\://www\.jackzhaojin.com/                                                                                                                                                                                                                                                                                                                                                                                                                                        |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-summary         | Seven ways to build on AEM side by side, from Classic AEM 6.5 to docs-based Edge Delivery: a functional and technical matrix with a compare-any-two tool, when Universal Editor beats the Sites Editor, and where each option fits.                                                                                                                                                                                                                                   |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-image           | https\://www\.jackzhaojin.com/writing/media\_188d61220f06925eddf5a693b7b2ac2cb6d22e2a0.jpg?width=750\&format=jpg\&optimize=medium                                                                                                                                                                                                                                                                                                                                     |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-topics          | Adobe AEM & EDS                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-reading-time    | 9 min read                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-keywords        | aem 6.5 aem as a cloud service core components spa editor spa sdk content fragments universal editor sites editor content fragment editor edge delivery services document-based authoring sidekick model.json infinity.json graphql persisted queries experience fragments adobe target da.live experience workspace                                                                                                                                                  |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_152f36e8c3cd1767c21916ea8c82f2cceefd08f1f.jpg#width=144&height=92

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_1f774592afb5fb6eb07b3df3f529ac5aa8788b695.png#width=144&height=92

[image2]: https://main--www-eds--jackzhaojin.aem.page/media_14079e86b6796dca6c52f1cfc58f0f369a4ecd696.jpg#width=1200&height=800

[image3]: https://main--www-eds--jackzhaojin.aem.page/media_188d61220f06925eddf5a693b7b2ac2cb6d22e2a0.jpg#width=1280&height=720
