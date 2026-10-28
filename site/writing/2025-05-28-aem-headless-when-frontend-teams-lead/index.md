1. [Home](/)
2. [Technical Writing](/writing/)
3. AEM Headless When Frontend Teams Lead

# Why AEM Headless Makes Sense When Frontend Teams Lead

By [Jack Jin](/) · May 28, 2025 · Updated October 4, 2026 · 5 min read

Some clients have already put years into their frontend: a Next.js or Vue application, or a UI tightly coupled to an ERP or commerce system. When AEM comes into that picture, I think AEM headless, with Universal Editor added on top, can be a better call than forcing classic Sites authoring. Here is how I'd start that kind of project, the parts that need care, and when I would not recommend it.

---

+-----------------------------------------------------------------------------------+
| Rail                                                                              |
+--------------------+--------------------------------------------------------------+
|                    | **Since 2025**\                                              |
|                    | [What changed since I wrote this](#what-changed)             |
+--------------------+--------------------------------------------------------------+
| ![][image0]        | **Situation**\                                               |
|                    | [When the frontend came first](#situation)                   |
+--------------------+--------------------------------------------------------------+
|                    | **Approach**\                                                |
|                    | [One page, three components](#start-small)                   |
+--------------------+--------------------------------------------------------------+
| ![][image1]        | **Caching**\                                                 |
|                    | [Persisted queries for caching](#persisted-queries)          |
+--------------------+--------------------------------------------------------------+
|                    | **Authoring**\                                               |
|                    | [Translation, personalization, preview](#global-and-preview) |
+--------------------+--------------------------------------------------------------+
| ![][image2]        | **Result**\                                                  |
|                    | [Where it works, where it doesn't](#outcome)                 |
+--------------------+--------------------------------------------------------------+
| [Try the cache lab](#persisted-queries)                                           |
+-----------------------------------------------------------------------------------+

---

+-------------------------------------------------------------------------------------------------------------------+
| Fine Print                                                                                                        |
+-------------------------------------------------------------------------------------------------------------------+
| First published as a LinkedIn article on May 28, 2025. Rewritten for this site in October 2026. The scenarios are |
| illustrative: I write "it's possible to do this" rather than "we did this x times" to protect current and past    |
| clients.                                                                                                          |
+-------------------------------------------------------------------------------------------------------------------+

---

## What changed since I wrote this

I kept the original article light on omnichannel strategy and AEM's full headless capabilities on purpose, and said I'd come back to them. I did in July 2025: [AEM headless and omnichannel architecture](/writing/2025-07-12-aem-headless-omnichannel-architecture/) walks through three diagrams for getting content out of AEM to websites, apps and email. A week after this article, I also put headless next to the other ways to build on AEM in [Making sense of 7 AEM capabilities](/writing/2025-06-04-seven-aem-capabilities-tradeoffs/).

The advice below is what I wrote in May 2025. The two Adobe mechanics I show, persisted queries and Universal Editor instrumentation, are checked against Adobe's current documentation and linked.

+------------------------+
| Section Metadata       |
+---------+--------------+
| id      | what-changed |
+---------+--------------+

---

## When the frontend came before the CMS

Picture a client that has invested heavily in its frontend stack. Maybe it's a sleek Next.js application, or maybe the team has fallen in love with Vue. Maybe the UI is tightly coupled to an ERP or an ecommerce system. Switching all of that out to fit a CMS feels like a non-starter. In many modern organizations the frontend is no longer just a layer. It's the foundation.

Sometimes content comes second, if at all. The UI must go live, and content follows.

+------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                             |
+------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Illustration: a frontend platform connected to an ERP system, an e-commerce system, a database and a customer, with a cloud service above them.][image3] |
|                                                                                                                                                            |
| The starting point in this kind of project: the frontend is already wired to the systems the business runs on, and the CMS arrives last. Header art from   |
| the original post.                                                                                                                                         |
+------------------------------------------------------------------------------------------------------------------------------------------------------------+

When AEM comes in as a headless CMS, some clients worry they're stepping back in time. They expect to lose WYSIWYG, in-context editing and the power their authors once had. I've seen this cycle repeat across 18 years in content management. This time, it can be different.

Frontend teams often want full ownership, too. HTL components were a step up from JSPs, sure. A fully decoupled frontend lets the team own the entire experience, from layout to routing, animation to rendering.

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | situation |
+---------+-----------+

---

## Start with one page and three components

A smart starting point is to start together and start small. One approach: spin up a single page with just three components. Don't boil the ocean. Build trust and a shared vocabulary first. Get one working pattern, and learn together.

In the explorations that go well, you'll often find working sessions every day, sometimes twice a day, during the proof of concept. They're more than a sync. The teams solve problems together and walk through the code and the content structures side by side.

+-----------------------+
| Section Metadata      |
+---------+-------------+
| id      | start-small |
+---------+-------------+

---

## Use persisted queries so responses can be cached

GraphQL persisted queries have emerged as a clear win for security and caching. Adobe's [persisted queries documentation](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/headless/graphql-api/persisted-queries) explains the mechanism. A standard GraphQL query is sent as a POST, and the response to a POST can't easily be cached. A persisted query is saved in AEM ahead of time and run with a GET, and a GET response can be cached at the Dispatcher and the CDN. The two URL formats, as Adobe documents them:

```
GET <AEM_HOST>/graphql/execute.json/<PERSISTENT_PATH>
GET <AEM_HOST>/graphql/execute.json/<PERSISTENT_QUERY_PATH>;variable1=value1;variable2=value2
```

Variables go on the end of the URL, each after a semicolon. That detail matters for caching. Every combination of values is its own URL, so it's its own cache entry.

The model below shows what that means for traffic. Each press of "Send request" is one request from the frontend, and it starts with five already sent. Pick the regular query or the persisted one, pick a locale, and send: a POST goes to AEM every time, while a repeat GET for the same URL is answered by the cache and never reaches AEM.

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Explainer (persisted query)                                                                                                                                                                                     |
+---------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------+
| cache lab · regular query vs persisted query                        | illustrative names                                                                                                                        |
+---------------------------------------------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------+
| Query                                                               | Regular, POST                                | Persisted, GET                                                                             |
+---------------------------------------------------------------------+----------------------------------------------+---------------------------------------------+----------------------------------------------+
| Variable `locale`                                                   | en                                           | de                                          | fr                                           |
+---------------------------------------------------------------------+----------------------------------------------+---------------------------------------------+----------------------------------------------+
| Send request                                                        | Start over                                                                                                                                |
+---------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------+
| `/graphql/execute.json/my-site/articles-by-locale;locale={locale}`  | `<GraphQL endpoint>, with the query and locale "{locale}" in the request body`                                                            |
+---------------------------------------------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------+
| Browser                                                             | CDN and Dispatcher cache                     | AEM publish                                                                                |
+---------------------------------------------------------------------+----------------------------------------------+---------------------------------------------+----------------------------------------------+
| \#                                                                  | Request                                      | Cache                                       | Reached AEM                                  |
+---------------------------------------------------------------------+----------------------------------------------+---------------------------------------------+----------------------------------------------+
| 1                                                                   | `POST` locale=en                             | not cacheable                               | yes                                          |
+---------------------------------------------------------------------+----------------------------------------------+---------------------------------------------+----------------------------------------------+
| 2                                                                   | `POST` locale=en                             | not cacheable                               | yes                                          |
+---------------------------------------------------------------------+----------------------------------------------+---------------------------------------------+----------------------------------------------+
| 3                                                                   | `GET` ;locale=en                             | miss, stored                                | yes                                          |
+---------------------------------------------------------------------+----------------------------------------------+---------------------------------------------+----------------------------------------------+
| 4                                                                   | `GET` ;locale=en                             | hit                                         | no                                           |
+---------------------------------------------------------------------+----------------------------------------------+---------------------------------------------+----------------------------------------------+
| 5                                                                   | `GET` ;locale=de                             | miss, stored                                | yes                                          |
+---------------------------------------------------------------------+----------------------------------------------+---------------------------------------------+----------------------------------------------+
| **Not cacheable.** A POST goes past the cache to AEM every time,    | not cacheable                                | yes                                                                                        |
| even when it asks for exactly the same thing.                       |                                              |                                                                                            |
+---------------------------------------------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------+
| **Cache hit.** This exact URL was stored by an earlier request, so  | hit                                          | no                                                                                         |
| AEM never sees this one.                                            |                                              |                                                                                            |
+---------------------------------------------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------+
| **Cache miss.** First time this URL is asked for, so AEM answers    | miss, stored                                 | yes                                                                                        |
| and the response is stored under `;locale={locale}`. Send it again. |                                              |                                                                                            |
+---------------------------------------------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------+
| Five requests, in order. Two POSTs and the first GET for each locale reach AEM. The repeated GET is served from the cache.                                                                                      |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Five requests so far:** both POSTs reached AEM, the first GET for each locale reached AEM once, and the repeat GET came from the cache. Send `;locale=en` again and AEM never sees it.                        |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Started over with an empty cache. Pick a query and a locale, then send a request, and send the same persisted query twice.                                                                                      |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| {sent} sent · {reached} reached AEM · {cached} served from cache                                                                                                                                                |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| A simplified model of the rule in Adobe's documentation: a POST is not served from the cache, and a GET is cached under its full URL, variables included. The project and query names are made up, the CDN and  |
| Dispatcher are drawn as one cache, and real caches also expire entries, which this leaves out.                                                                                                                  |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

There's nuance, though. With 12 page templates and a library of 30 or more components, you'll want to avoid writing the same query definitions over and over.

+-----------------------------+
| Section Metadata            |
+---------+-------------------+
| id      | persisted-queries |
+---------+-------------------+
| style   | code-wrap-wide    |
+---------+-------------------+

---

## Plan for translation, personalization and preview

Internationalization is front and center too. In AEM as a Cloud Service, structured content, language roots and translation workflows help manage global scale. Going headless doesn't mean ignoring localization. Translation workflows and translation projects apply here just as much.

Personalization is another layer that fits well. It's possible to publish content fragments into Adobe Target or other personalization platforms. In some cases those fragments are personalized for persona segments mapped from Adobe Experience Platform or other data sources. I'd prefer the targeting tool to choose which content to show, and avoid persona tagging in AEM. Sometimes that isn't practical, and that's OK. All of this allows scalable, dynamic experiences without coupling the logic into the frontend.

Finally, preview matters. In-context preview in AEM as a Cloud Service reconnects authors to what they're publishing, even in a decoupled setup. With Universal Editor instrumentation, editors see their edits reflected live in the experience. Instrumentation is work the frontend team does in its own markup. These lines are from Adobe's [Universal Editor getting started guide](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/developing/universal-editor/getting-started):

```
<meta name="urn:adobe:aue:system:aemconnection" content="aem:https://localhost:4502">
<script src="https://universal-editor-service.adobe.io/cors.js" async></script>

<ul data-aue-resource="urn:aemconnection:/content/example/list" data-aue-type="container">
  <p data-aue-prop="name" data-aue-type="text">Jane Doe</p>
```

The meta tag points the editor at the AEM instance, the script lets the editor talk to the page, and the `data-aue-*` attributes tie each element to the content and property behind it. The frontend still renders the page its own way. The attributes are what let an author click an element and edit the content behind it.

+------------------------------+
| Section Metadata             |
+---------+--------------------+
| id      | global-and-preview |
+---------+--------------------+
| style   | code-wrap-wide     |
+---------+--------------------+

---

## Where it works, and when I wouldn't recommend it

In successful models, the frontend is already up and running. Universal Editor becomes an additive layer rather than a blocker. Strong frontend teams thrive here. They move fast, deliver rich experiences, and AEM becomes the source of structured truth.

If the frontend leans into server-side rendering, for example Next.js in production mode with React Server Components, the performance story is strong: fast loads, prefetching, and SEO-friendly markup with minimal compromise.

+-------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                      |
+-------------------------------------------------------------------------------------------------------------------------------------+
| ![Illustration titled Robust UI \+ AEM UE: a monitor showing a rich web page with charts inside a Universal Editor window.][image4] |
|                                                                                                                                     |
| The end state I was arguing for: the frontend team's UI stays, and Universal Editor is added on top for authors. Header art from    |
| the original post.                                                                                                                  |
+-------------------------------------------------------------------------------------------------------------------------------------+

Would I recommend AEM headless to everyone? Not quite. It depends on your team setup. If you have a passionate frontend team deeply committed to its stack, or a UI tightly coupled with another system, then forcing classic AEM Sites authoring might be the real architectural mistake. Maybe even an architectural sin.

+-------------------+
| Section Metadata  |
+---------+---------+
| id      | outcome |
+---------+---------+

---

## Related

+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| Row List                                                                                                                                               |
+---------+---------------------------------------------------------------------------------------------------------+------------------------------------+
| Article | [AEM headless and omnichannel architecture](/writing/2025-07-12-aem-headless-omnichannel-architecture/) | The omnichannel follow-up this     |
|         |                                                                                                         | article promised, with three       |
|         |                                                                                                         | diagrams.                          |
+---------+---------------------------------------------------------------------------------------------------------+------------------------------------+
| Article | [Making sense of 7 AEM capabilities](/writing/2025-06-04-seven-aem-capabilities-tradeoffs/)             | Headless next to six other ways to |
|         |                                                                                                         | build on AEM, side by side.        |
+---------+---------------------------------------------------------------------------------------------------------+------------------------------------+
| Article | [AEM caching in production architectures](/writing/2025-09-01-aem-caching-production-architectures/)    | More on the caching layers a       |
|         |                                                                                                         | persisted query lands in.          |
+---------+---------------------------------------------------------------------------------------------------------+------------------------------------+

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

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Metadata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| title                   | Why AEM Headless Makes Sense When Frontend Teams Lead \| Jack Jin                                                                                                                                                                                                                                                                                                                                                                                                             |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| description             | When a client's Next.js or Vue frontend comes first, AEM headless can be the right call. How I'd start, persisted queries, preview, and when I wouldn't.                                                                                                                                                                                                                                                                                                                      |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| template                | article                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image                   | ![Illustration titled Robust UI \+ AEM UE: a rich web page inside a Universal Editor window][image5]                                                                                                                                                                                                                                                                                                                                                                          |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image:alt               | Illustration titled Robust UI \+ AEM UE: a rich web page inside a Universal Editor window                                                                                                                                                                                                                                                                                                                                                                                     |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| published-time          | 2025-05-28                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| modified-time           | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| json-ld                 | {"@context":"https\://schema.org","@graph":\[{"@type":"Person","@id":"https\://www\.jackzhaojin.com/#person","name":"Jack Jin","url":"https\://www\.jackzhaojin.com/","jobTitle":"Associate Director","worksFor":{"@type":"Organization","name":"Accenture","department":{"@type":"Organization","name":"Adobe Business                                                                                                                                                       |
|                         | Group"}},"sameAs":\["https\://www\.linkedin.com/in/jackjin","https\://github.com/jackzhaojin","https\://www\.youtube.com/@jackjin8467","https\://www\.credly.com/users/jack-jin"],"award":\["Adobe Experience Manager Champion, class of 2026-2027","AEM Rockstar winner, Adobe Summit 2024"]},{"@type":"WebSite","@id":"https\://www\.jackzhaojin.com/#website","url":"https\://www\.jackzhaojin.com/","name":"Jack                                                          |
|                         | Jin","publisher":{"@id":"https\://www\.jackzhaojin.com/#person"}},{"@type":"TechArticle","@id":"https\://www\.jackzhaojin.com/writing/2025-05-28-aem-headless-when-frontend-teams-lead/#article","headline":"Why AEM Headless Makes Sense When Frontend Teams Lead","description":"When a client's Next.js or Vue frontend comes first, AEM headless can be the right call. How I'd start, persisted queries, preview, and when I                                             |
|                         | wouldn't.","author":{"@id":"https\://www\.jackzhaojin.com/#person"},"publisher":{"@id":"https\://www\.jackzhaojin.com/#person"},"image":"https\://www\.jackzhaojin.com/writing/2025-05-28-aem-headless-when-frontend-teams-lead/media\_1ac99f227a6bec1fb1d1af20374eabba92e36c21c.jpg","mainEntityOfPage":"https\://www\.jackzhaojin.com/writing/2025-05-28-aem-headless-when-frontend-teams-lead/","isPartOf":{"@id":"https\://www\.jackzhaojin.com/#website"},"about":\["AEM |
|                         | headless","Content Fragments","GraphQL persisted queries","Universal Editor","Next.js"],"datePublished":"2025-05-28","dateModified":"2026-10-04","inLanguage":"en"},{"@type":"BreadcrumbList","@id":"https\://www\.jackzhaojin.com/writing/2025-05-28-aem-headless-when-frontend-teams-lead/#breadcrumb","itemListElement":\[{"@type":"ListItem","position":1,"name":"Home","item":"https\://www\.jackzhaojin.com/"},{"@type":"ListItem","position":2,"name":"Technical       |
|                         | Writing","item":"https\://www\.jackzhaojin.com/writing/"},{"@type":"ListItem","position":3,"name":"AEM Headless When Frontend Teams Lead","item":"https\://www\.jackzhaojin.com/writing/2025-05-28-aem-headless-when-frontend-teams-lead/"}]}]}                                                                                                                                                                                                                               |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| og:image:alt            | Illustration titled Robust UI \+ AEM UE: a rich web page inside a Universal Editor window                                                                                                                                                                                                                                                                                                                                                                                     |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:published\_time | 2025-05-28                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:modified\_time  | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:author          | https\://www\.jackzhaojin.com/                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-summary         | When a client's Next.js or Vue frontend came first, I think AEM headless with Universal Editor on top beats forcing classic Sites authoring. How I'd start, why persisted queries matter for caching, and when I wouldn't recommend it.                                                                                                                                                                                                                                       |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-image           | https\://www\.jackzhaojin.com/writing/media\_1ac99f227a6bec1fb1d1af20374eabba92e36c21c.jpg?width=750\&format=jpg\&optimize=medium                                                                                                                                                                                                                                                                                                                                             |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-topics          | Adobe AEM & EDS                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-reading-time    | 5 min read                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-keywords        | aem headless content fragments graphql persisted queries universal editor next.js react server components vue adobe target adobe experience platform aem as a cloud service translation dispatcher cdn caching                                                                                                                                                                                                                                                                |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_1e6a907df624bdaa2765c77d3c53727b40d0557df.jpg#width=144&height=92

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_1e40d465053e36b4626b9ba2e2edfe0d7f63d5f54.png#width=144&height=92

[image2]: https://main--www-eds--jackzhaojin.aem.page/media_177c80e5c547f2c46f370cc0b6d3de1204086eb6a.jpg#width=144&height=92

[image3]: https://main--www-eds--jackzhaojin.aem.page/media_1e127c90d96939b00bbf50f0e6e48756bdc7dc8c1.jpg#width=1200&height=800

[image4]: https://main--www-eds--jackzhaojin.aem.page/media_1e3c64c108a2a6c8454b8fd3281018ee1284f624c.jpg#width=1200&height=800

[image5]: https://main--www-eds--jackzhaojin.aem.page/media_1ac99f227a6bec1fb1d1af20374eabba92e36c21c.jpg#width=1280&height=720
