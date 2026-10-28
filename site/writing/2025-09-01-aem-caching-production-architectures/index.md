1. [Home](/)
2. [Technical Writing](/writing/)
3. AEM Caching in Production

# AEM Caching in Production: How Cache-Control Moves Through Every Layer

By [Jack Jin](/) · September 1, 2025 · Updated October 4, 2026 · 9 min read · Includes my 9:56 video

Whether AEM caching is easy or hard depends on how many layers change the `Cache-Control` header on its way up: from the Java publish layer, through the dispatcher, Adobe's Fastly CDN and a client CDN, to the browser. This follows the header through each layer, shows how `stale-while-revalidate` keeps responses fast, and ends with three tips for documenting and testing caching one layer at a time.

---

+---------------------------------------------------------------------------------------------------------------------------------------------------+
| Rail                                                                                                                                              |
+-------------------------------------------------------------------------+-------------------------------------------------------------------------+
|                                                                         | **First**\                                                              |
|                                                                         | [What I checked again in 2026](#changed)                                |
+-------------------------------------------------------------------------+-------------------------------------------------------------------------+
| ![][image0]                                                             | **Part 1**\                                                             |
|                                                                         | [A typical AEM setup](#part-1)                                          |
+-------------------------------------------------------------------------+-------------------------------------------------------------------------+
| ![][image1]                                                             | **Part 2**\                                                             |
|                                                                         | [Publish sets the headers](#part-2)                                     |
+-------------------------------------------------------------------------+-------------------------------------------------------------------------+
| ![][image2]                                                             | **Part 3**\                                                             |
|                                                                         | [The dispatcher's own rules](#part-3)                                   |
+-------------------------------------------------------------------------+-------------------------------------------------------------------------+
| ![][image3]                                                             | **Part 4**\                                                             |
|                                                                         | [Adobe's CDN and serving stale](#part-4)                                |
+-------------------------------------------------------------------------+-------------------------------------------------------------------------+
| ![][image4]                                                             | **Part 5**\                                                             |
|                                                                         | [Respect below, override above](#part-5)                                |
+-------------------------------------------------------------------------+-------------------------------------------------------------------------+
| ![][image5]                                                             | **Part 6**\                                                             |
|                                                                         | [Decoupled apps own their cache](#part-6)                               |
+-------------------------------------------------------------------------+-------------------------------------------------------------------------+
|                                                                         | **Part 7**\                                                             |
|                                                                         | [Three tips for caching](#part-7)                                       |
+-------------------------------------------------------------------------+-------------------------------------------------------------------------+
|                                                                         | **Wrap-up**\                                                            |
|                                                                         | [Know the flow](#wrap)                                                  |
+-------------------------------------------------------------------------+-------------------------------------------------------------------------+
| [Watch the video, 9:56](#video)                                                                                                                   |
|                                                                                                                                                   |
| [Adobe's caching docs](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/content-delivery/caching) |
+---------------------------------------------------------------------------------------------------------------------------------------------------+

---

+-------------------------------------------------------------------------------------------------------------------+
| Fine Print                                                                                                        |
+-------------------------------------------------------------------------------------------------------------------+
| First published as a LinkedIn video on September 1, 2025, with the diagram drawn live. Rewritten for this site in |
| October 2026, with Adobe's documentation checked again.                                                           |
+-------------------------------------------------------------------------------------------------------------------+

---

+---------------------------------------------------------------------------------------------------------------------------------------+
| Figure                                                                                                                                |
+---------------------------------------------------------------------------------------------------------------------------------------+
| [AEM Caching in Production: How Cache-Control Moves Through Every Layer](https://youtu.be/E7jNBsUvXm0)                                |
|                                                                                                                                       |
| Recorded September 1, 2025. Each part below links to its moment in the video, or [watch it on YouTube](https://youtu.be/E7jNBsUvXm0). |
+---------------------------------------------------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| id      | video  |
+---------+--------+

---

## What I checked again in October 2026

Three things add to what I said on camera, so here they are before the walkthrough.

- In the video I said the dispatcher ignores whatever cache headers the publish layer sends. That's how it behaves out of the box. Adobe's [caching page for AEM as a Cloud Service](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/content-delivery/caching) adds that the dispatcher also respects those expiration headers when `enableTTL` is turned on in its configuration.
- The same page recommends `stale-while-revalidate` and `stale-if-error`, the background refresh I talk about in part 4, and suggests a 30-minute `stale-while-revalidate` on all cache control headers as a starting point.
- My own newer work added a layer. [AEM Edge Functions](/writing/2026-09-20-aem-edge-functions-google-sign-in/) run code on Adobe's CDN, after the CDN cache and before your backends, and they have a fetch cache of their own. In my demo, the function turns that cache off, and a personalized page is never stored by a shared cache:

+--------------------------------------------------------------------------------------------------------------------+
| Code                                                                                                               |
+--------------------------------------------------------------------------------------------------------------------+
| src/proxy.js, lines 27 to 30 and 62 to 63                                                                          |
|                                                                                                                    |
| [1c3485f on GitHub](https://github.com/jackzhaojin/adapt-to-2026-edge-functions/blob/1c3485f/src/proxy.js#L27-L63) |
+--------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                |
|   // "pass" keeps the function's own fetch cache out of the picture. Edge Delivery                                 |
|   // already caches at the origin and the CDN caches in front of the function, and                                 |
|   // neither of those would purge this third copy when content changes.                                            |
|   const res = await fetch(upstream, { cacheOverride: new CacheOverride('pass') });                                 |
|                                                                                                                    |
|   // A page with someone's name in it must never be stored by a shared cache.                                      |
|   if (session.user) headers.set('cache-control', 'private, no-store');                                             |
| ```                                                                                                                |
+--------------------------------------------------------------------------------------------------------------------+

+-------------------+
| Section Metadata  |
+---------+---------+
| id      | changed |
+---------+---------+

---

## 1. A typical AEM production setup, from the browser down to publish

A few months before this video, one of my clients had a conversation about caching. Someone said caching is really hard and complicated. Someone else said caching is really easy. I wanted to break that conversation down for them at the time, but it wasn't the right moment. This is that breakdown.

I drew it from the requester's side, the way a request travels. These days a browser typically goes to a CDN first. That first CDN hosts your certificate, and it's often the client's own. Security teams love their WAF rules and aren't always sure how Adobe's CDN works, so most of the time you end up with a CDN in front that isn't Adobe's native one.

Behind it sits Adobe's CDN, which is Fastly. Adobe documents how to [put your own CDN in front of Adobe's](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/content-delivery/cdn). On camera I first said to CNAME one CDN to the other, then corrected myself: you don't CNAME, you set Adobe's CDN as the origin of your CDN. Follow Adobe's instructions, including the edge key header (`X-AEM-Edge-Key`), so it stays locked down.

Under Adobe's CDN is the dispatcher, which matters a lot to those of us who have been doing AEM forever. Under that is the Java publish layer. That's the typical setup. From here I go bottom up, because the bottom is where the headers start.

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                               |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Hand-drawn board titled AEM and Web Caching, with the question Caching is hard? caching is easy? A browser at the top goes to a client CDN. The client CDN splits into two paths: on the left, Adobe's Fastly CDN, then the dispatcher, then the Java publish layer; on the right, an application that uses a database and Redis.][image6] |
|                                                                                                                                                                                                                                                                                                                                              |
| The board I drew live in the video. The left path is the typical AEM setup; the right path comes up in part 6.                                                                                                                                                                                                                               |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Watch this part [0:00 The debate](https://youtu.be/E7jNBsUvXm0?t=0) [0:40 Drawing a typical AEM production setup](https://youtu.be/E7jNBsUvXm0?t=40)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-1 |
+---------+--------+

---

## 2. The Java publish layer doesn't cache, but it sets the headers

In the Java layer we have the publish server. We haven't cached things here for a long time, especially on AEM as a Cloud Service, where everything is containerized. It's just not recommended anymore, and more modern architectures solve the same problem. I remember caching here ten years ago for ecommerce, because there was no better place for it at the time.

This layer still does something very important. The publish layer can set the `Cache-Control` response header, and maybe `Surrogate-Control` too. That matters because the dispatcher might pass those headers on, or it might override them.

For headless AEM, content fragments and GraphQL let you set those cache headers yourself. Adobe's [persisted queries documentation](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/headless/graphql-api/persisted-queries) lists them: `Cache-Control` `max-age` for the browser, and `Surrogate-Control` `max-age`, `stale-while-revalidate` and `stale-if-error` for the CDN. Assuming the dispatcher passes them along, they reach every tier above.

Watch this part [2:04 The Java publish layer sets the headers](https://youtu.be/E7jNBsUvXm0?t=124) [2:52 Cache headers for headless AEM](https://youtu.be/E7jNBsUvXm0?t=172)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-2 |
+---------+--------+

---

## 3. The dispatcher caches by its own .any rules and can set new headers

The dispatcher is next. It's very important for those of us who've been doing AEM forever. Unlike everything above it in the stack, it ignores whatever the publish layer says about caching. Its caching logic is configured in the dispatcher's `.any` files, which is fantastic.

It does get a say in the headers it sends up. It can set its own response headers for the tier above, or it can pass the publish layer's headers along without setting or unsetting anything. And as those of us who've used the dispatcher forever know, it caches the headers too, along with the content. The dispatcher was certainly great for its time.

Setting headers at this tier looks like this. It's the example from Adobe's caching page, an Apache `mod_headers` rule in the dispatcher configuration that gives the browser and the CDN different lifetimes:

+-----------------------------------------------------------------------------------------------------------------------------------------+
| Code                                                                                                                                    |
+-----------------------------------------------------------------------------------------------------------------------------------------+
| Dispatcher vhost, from Adobe's caching documentation                                                                                    |
|                                                                                                                                         |
| [Adobe docs](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/content-delivery/caching) |
+-----------------------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                                     |
| <LocationMatch "^/content/.*\.(html)$">                                                                                                 |
|     Header set Cache-Control "max-age=200"                                                                                              |
|     Header set Surrogate-Control "max-age=3600"                                                                                         |
|     Header set Age 0                                                                                                                    |
| </LocationMatch>                                                                                                                        |
| ```                                                                                                                                     |
+-----------------------------------------------------------------------------------------------------------------------------------------+

The browser keeps the page for 200 seconds and Adobe's CDN for an hour. The header relay in part 5 uses these two values.

Watch this part [3:04 The dispatcher and its .any rules](https://youtu.be/E7jNBsUvXm0?t=184)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-3 |
+---------+--------+

---

## 4. Adobe's CDN reads Surrogate-Control and serves stale while it checks

Next is Adobe's CDN. It respects a header called `Surrogate-Control`, a response header meant for the CDN. If you set `Surrogate-Control` at the dispatcher, Adobe's CDN absolutely respects it. It respects `Cache-Control` as well. So instead of a `.any` file, this layer is configured by the response headers from the two layers below it.

Adobe's CDN also does something I found really cool, and I've always loved this feature: it checks for staleness in the background. Once a cached response goes stale, and as long as you've allowed it, the CDN still returns the cached copy right away. Then it makes its own request to the dispatcher and fetches fresh data. Say that takes a second. The cache is refreshed without the browser, or anyone, ever seeing it. Response times stay fast.

The setting behind it is `stale-while-revalidate`, defined in [RFC 5861](https://www.rfc-editor.org/rfc/rfc5861). Drag the slider to change how old the cached copy is when a request arrives. The result says what the CDN does and whether the browser waits. With these values, a page can be served up to 30 minutes past its lifetime, and no reader ever waits for the refresh:

+--------------------------------------------------------------------------------------------------------------------------------+
| Explainer (stale timeline)                                                                                                     |
+--------------------------------------------------------------------------------------------------------------------------------+
| Cache-Control: max-age=300, stale-while-revalidate=1800                                                                        |
|                                                                                                                                |
| demo values                                                                                                                    |
+--------------------------------------+-----------------------------------------------------------------------------------------+
| The request arrives when the cached  | stale-while-revalidate on                                                               |
| copy is **8 minutes** old            |                                                                                         |
+--------------------------------------+-----------------------------+-----------------------------------------------------------+
| fresh                                | stale, served while         | too old                                                   |
|                                      | refreshing                  |                                                           |
+--------------------------------------+-----------------------------+-----------------------------+-----------------------------+
| 0                                    | 5 min                       | 35 min                      | 45 min                      |
+--------------------------------------+-----------------------------+-----------------------------+-----------------------------+
| 1. **Fresh, up to 5 minutes old.** The CDN answers from cache. The dispatcher isn't contacted.                                 |
| 2. **Stale, up to 30 minutes past that.** The CDN answers from cache right away, then asks the dispatcher for a fresh copy in  |
|    the background. The next visitor gets the fresh one.                                                                        |
| 3. **Older than that, or no stale-while-revalidate.** The request waits while the CDN fetches from the dispatcher.             |
+--------------------------------------+-----------------------------------------------------------------------------------------+
| Browser waits                        | CDN to dispatcher                                                                       |
+--------------------------------------+-----------------------------+-----------------------------+-----------------------------+
| Fresh: the copy is {age} old, inside | Stale but allowed: the CDN  | Too old: past max-age plus  | Without                     |
| max-age. The CDN answers from cache  | answers from cache right    | stale-while-revalidate. The | stale-while-revalidate,     |
| and the dispatcher never hears about | away, then spends a second  | request waits the full      | anything past max-age means |
| it.                                  | fetching a fresh copy from  | second while the CDN        | a wait: the browser sits    |
|                                      | the dispatcher in the       | fetches from the            | through the full second     |
|                                      | background. The browser     | dispatcher.                 | while the CDN fetches from  |
|                                      | never waits for it.         |                             | the dispatcher.             |
+--------------------------------------+-----------------------------+-----------------------------+-----------------------------+
| Demo values, with the dispatcher taking one second to answer, as in my example. The rules follow RFC 5861; your real lifetimes |
| come from the headers your lower layers send.                                                                                  |
+--------------------------------------------------------------------------------------------------------------------------------+

Watch this part [4:01 Adobe's CDN and Surrogate-Control](https://youtu.be/E7jNBsUvXm0?t=241) [6:14 Serving stale while the CDN refreshes](https://youtu.be/E7jNBsUvXm0?t=374)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-4 |
+---------+--------+

---

## 5. Every layer respects the one below and can override it for the one above

The client CDN is similar. It can override what it receives, and if it doesn't, it respects whatever the layer below sent. Adobe's caching page notes that `Surrogate-Control` applies to the Adobe-managed CDN, and a customer-managed CDN may need a different header depending on the provider. The browser is the last cache, and it respects the same `Cache-Control` header. If it receives `Cache-Control: public` with a `max-age`, the browser absolutely looks at that and works out what to do.

Long story short: every CDN respects the cache control of the layer below it, and has the ability to override it for the layer above. This is where it gets complicated. It can be really simple: the Java layer's header passes through all the way to the browser. Or the dispatcher changes it, then Adobe's CDN changes it again, then the client CDN changes it again, and the browser sees whatever came out last. Whether you should pass it straight through depends on your requirements, and that's a topic for another day.

Here is that rule on one page. Response headers travel up from the Java publish layer at the bottom to the browser at the top. Each layer in the middle has a switch: pass the header on, or change it. Set every switch to pass it on and you get the simple design; flip more of them and the result says which layer ended up deciding how long the browser keeps the page. Each layer also shows the two things I document for it: what it does, and what it returns to the layer above.

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Explainer (header relay)                                                                                                                                                                                                                                                                                                                                            |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| One page, five layers                                                                                                                                                                                                                                                                                                                                               |
|                                                                                                                                                                                                                                                                                                                                                                     |
| Headers travel up from the bottom                                                                                                                                                                                                                                                                                                                                   |
+----------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Does                                                                                                     | Returns                                                                                                                                                                                                                                                  |
+----------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Browser**                                                                                              | Caches the page for {cc} seconds, from `Cache-Control`.                                                                                                                                                                                                  |
|                                                                                                          |                                                                                                                                                                                                                                                          |
| last cache                                                                                               | The page to the reader.                                                                                                                                                                                                                                  |
|                                                                                                          |                                                                                                                                                                                                                                                          |
| *browser*                                                                                                |                                                                                                                                                                                                                                                          |
+----------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------+
| **Client CDN**                                                                                           | **Pass it on**                                                                                                                                | Change it                                                                                                |
|                                                                                                          |                                                                                                                                               |                                                                                                          |
| Akamai, Azure Front Door, whatever is                                                                    | Caches for {cc} seconds, from `Cache-Control`.                                                                                                | Overrides: caches for 120 seconds by its own rule and returns that.                                      |
| in front                                                                                                 |                                                                                                                                               |                                                                                                          |
|                                                                                                          | `Cache-Control: max-age={cc}`                                                                                                                 | `Cache-Control: max-age=120`                                                                             |
| *client CDN*                                                                                             |                                                                                                                                               |                                                                                                          |
+----------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------+
| **Adobe's CDN**                                                                                          | **Pass it on**                                                                                                                                | Change it                                                                                                |
|                                                                                                          |                                                                                                                                               |                                                                                                          |
| Fastly                                                                                                   | Caches for {ttl} seconds, from `{src}`.                                                                                                       | Caches for {ttl} seconds, from `{src}`. Replaces `Cache-Control` for the layer above.                    |
|                                                                                                          |                                                                                                                                               |                                                                                                          |
| *Adobe's CDN*                                                                                            | `Cache-Control: max-age={cc}`                                                                                                                 | `Cache-Control: max-age=60`                                                                              |
+----------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------+
| **Dispatcher**                                                                                           | Pass it on                                                                                                                                    | **Set its own**                                                                                          |
|                                                                                                          |                                                                                                                                               |                                                                                                          |
| .any files                                                                                               | Caches the page and its headers by its `.any` rules, and passes the headers on untouched.                                                     | Caches the page and its headers by its `.any` rules, then sets its own headers.                          |
|                                                                                                          |                                                                                                                                               |                                                                                                          |
| *dispatcher*                                                                                             | `Cache-Control: max-age={cc}`                                                                                                                 | `Cache-Control: max-age=200` `Surrogate-Control: max-age=3600`                                           |
+----------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------+
| **Java publish layer**                                                                                   | Renders the page. Caches nothing.                                                                                                                                                                                                                        |
|                                                                                                          |                                                                                                                                                                                                                                                          |
| no caching here, sets the first                                                                          | `Cache-Control: max-age=300`                                                                                                                                                                                                                             |
| header                                                                                                   |                                                                                                                                                                                                                                                          |
|                                                                                                          |                                                                                                                                                                                                                                                          |
| *publish layer*                                                                                          |                                                                                                                                                                                                                                                          |
+----------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------+
| As shown: the dispatcher replaces the                                                                    | Simple: the publish layer's header goes straight through. The browser keeps the page for **{cc} seconds**, and Adobe's CDN for {ttl} seconds. | The browser keeps the page for **{cc} seconds**, a value set by the {by}. Adobe's CDN                    |
| publish layer's header with Adobe's                                                                      |                                                                                                                                               | keeps it for {ttl} seconds. {count} changed the headers on the way up ({changed}).                       |
| example values, so the browser keeps                                                                     |                                                                                                                                               | Each one is another block to document and a layer to test on its own.                                    |
| the page for 200 seconds and Adobe's                                                                     |                                                                                                                                               |                                                                                                          |
| CDN for an hour. With JavaScript on,                                                                     |                                                                                                                                               |                                                                                                          |
| you can switch each layer between                                                                        |                                                                                                                                               |                                                                                                          |
| passing the header on and changing                                                                       |                                                                                                                                               |                                                                                                          |
| it.                                                                                                      |                                                                                                                                               |                                                                                                          |
+----------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------+
| A simplified model of the rule from the video. The publish value (300 seconds) and the override values at the two CDNs (60 and 120 seconds) are demo values; the dispatcher values are Adobe's example. Above Adobe's CDN the relay follows `Cache-Control` only, because `Surrogate-Control` is the header Adobe's CDN reads.                                      |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Watch this part [4:27 Respect the layer below, override for the layer above](https://youtu.be/E7jNBsUvXm0?t=267)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-5 |
+---------+--------+

---

## 6. In a decoupled architecture, the application owns its cache

In a more modern architecture, arguably you shouldn't be caching in the publish layer at all. On the board I drew a second branch under the client CDN. AEM is known as a monolith. This one is more decoupled. I just called it the application.

Instead of reverse proxying to Adobe's CDN, which we absolutely could, the client CDN can reverse proxy straight to the application. The application has its database and, since this is about caching, a separate Redis cache it checks before going to the database.

Watch this part [5:25 Decoupled apps own their cache](https://youtu.be/E7jNBsUvXm0?t=325)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-6 |
+---------+--------+

---

## 7. Three tips to document each layer, test each layer and start early

To sum it up: caching can be hard because there are many layers that control it, and the browser is one of them. When something is caching, or sticky caching, it could be any of these layers. Here are the three tips I shared.

First, document each layer. Each layer can set the header, modify it, respect it and react to it. It's like a big science experiment. For past clients, I've kept a matrix where each row is a path pattern and each layer gets two columns. The first column is the behavior: what the layer actually does, what gets cached and what doesn't. The second is what it actually returns to the layer above. For the dispatcher: what is the `.any` file doing, and what does it return? For Fastly: what is it doing with `Surrogate-Control`, and what does it return? The same for Akamai, Azure Front Door or whatever CDN is in front. And document the browser's behavior too.

+--------------------------------------------------------------------+
| Data Table (sr caption, fill in, span first)                       |
+--------------------+--------------+--------------+-----------------+
| Path pattern       | Layer        | What it does | What it returns |
+--------------------+--------------+--------------+-----------------+
| `/content/*.html`\ | Java publish |              |                 |
| (illustrative)     |              |              |                 |
+--------------------+--------------+--------------+-----------------+
| Dispatcher         |              |                                |
+--------------------+--------------+--------------------------------+
| Adobe's CDN        |              |                                |
+--------------------+--------------+--------------------------------+
| Client CDN         |              |                                |
+--------------------+--------------+--------------------------------+
| Browser            |              |                                |
+--------------------+--------------+--------------------------------+
| Template for the caching matrix, one row per path pattern          |
+--------------------------------------------------------------------+

The header relay in part 5 fills in one of these blocks for whatever design you pick.

Second, test each layer on its own. Make sure you can validate it without depending on the others. You don't need a lot of test cases.

Third, start early. Don't wait until the last minute. As you build: validate the dispatcher, then Fastly, then stage and production, where sometimes the client's CDN only exists in those environments. I think a lot of the reason caching gets left out is that teams do it the day or the week before go-live. That's when things fall apart and don't get documented.

Watch this part [7:05 Why caching gets hard](https://youtu.be/E7jNBsUvXm0?t=425) [7:38 Tip 1: document each layer](https://youtu.be/E7jNBsUvXm0?t=458) [8:56 Tip 2: test each layer](https://youtu.be/E7jNBsUvXm0?t=536) [9:20 Tip 3: start early](https://youtu.be/E7jNBsUvXm0?t=560)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-7 |
+---------+--------+

---

## Caching can be simple or complex, as long as you know the flow

So is caching hard or easy? It can be simple: the publish layer sets a header and every layer passes it straight through. It can be complex: the header changes at every tier. Either way, understanding how the headers flow is critical for performance.

What I left for another day is how specific requirements should drive the design itself. And yes, Redis is misspelled on the board; I drew it live.

+------------------+
| Section Metadata |
+---------+--------+
| id      | wrap   |
+---------+--------+

---

## Related

+-------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Row List                                                                                                                                                    |
+---------+------------------------------------------------------------------------------------------------------------+--------------------------------------+
| Article | [AEM Edge Functions on a Laptop](/writing/2026-09-20-aem-edge-functions-google-sign-in/)                   | Code on Adobe's CDN, with a fetch    |
|         |                                                                                                            | cache of its own that my demo turns  |
|         |                                                                                                            | off.                                 |
+---------+------------------------------------------------------------------------------------------------------------+--------------------------------------+
| Article | [AEM Headless and Omnichannel: Three Diagrams](/writing/2025-07-12-aem-headless-omnichannel-architecture/) | Where the content behind these       |
|         |                                                                                                            | headers comes from, in three channel |
|         |                                                                                                            | patterns.                            |
+---------+------------------------------------------------------------------------------------------------------------+--------------------------------------+
| Article | [Making Sense of Seven AEM Capabilities](/writing/2025-06-04-seven-aem-capabilities-tradeoffs/)            | The AEM options this caching stack   |
|         |                                                                                                            | sits under.                          |
+---------+------------------------------------------------------------------------------------------------------------+--------------------------------------+

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

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Metadata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| title                   | AEM Caching in Production: How Cache-Control Moves Through Every Layer \| Jack Jin                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| description             | How Cache-Control and Surrogate-Control move from AEM publish through the dispatcher, Adobe's CDN and a client CDN, with three tips for getting caching right.                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| template                | article                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| title-keep-together     | Cache-Control                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| heading-keep-together   | Surrogate-Control                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| theme                   | code-nowrap, board-mat                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image                   | ![Jack's hand-drawn board: AEM and Web Caching. Caching is hard? caching is easy? Browser, client CDN, Adobe's Fastly CDN, dispatcher and Java publish layer, plus an application with a database and Redis.][image7]                                                                                                                                                                                                                                                                                                                                                                                |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image:alt               | Jack's hand-drawn board: AEM and Web Caching. Caching is hard? caching is easy? Browser, client CDN, Adobe's Fastly CDN, dispatcher and Java publish layer, plus an application with a database and Redis.                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| published-time          | 2025-09-01                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| modified-time           | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| json-ld                 | {"@context":"https\://schema.org","@graph":\[{"@type":"Person","@id":"https\://www\.jackzhaojin.com/#person","name":"Jack Jin","url":"https\://www\.jackzhaojin.com/","jobTitle":"Associate Director","worksFor":{"@type":"Organization","name":"Accenture","department":{"@type":"Organization","name":"Adobe Business Group"}},"sameAs":\["https\://www\.linkedin.com/in/jackjin","https\://github.com/jackzhaojin","https\://www\.youtube.com/@jackjin8467","https\://www\.credly.com/users/jack-jin"],"award":\["Adobe Experience Manager Champion, class of 2026-2027","AEM Rockstar winner,    |
|                         | Adobe Summit 2024"]},{"@type":"WebSite","@id":"https\://www\.jackzhaojin.com/#website","url":"https\://www\.jackzhaojin.com/","name":"Jack Jin","publisher":{"@id":"https\://www\.jackzhaojin.com/#person"}},{"@type":"TechArticle","@id":"https\://www\.jackzhaojin.com/writing/2025-09-01-aem-caching-production-architectures/#article","headline":"AEM Caching in Production: How Cache-Control Moves Through Every Layer","description":"How Cache-Control and Surrogate-Control move from AEM publish through the dispatcher, Adobe's CDN and a client CDN, with three tips for getting        |
|                         | caching right.","author":{"@id":"https\://www\.jackzhaojin.com/#person"},"publisher":{"@id":"https\://www\.jackzhaojin.com/#person"},"image":"https\://www\.jackzhaojin.com/writing/2025-09-01-aem-caching-production-architectures/media\_1ad47c0497f8dfb38c963483d29eb286187e651b3.jpg","mainEntityOfPage":"https\://www\.jackzhaojin.com/writing/2025-09-01-aem-caching-production-architectures/","isPartOf":{"@id":"https\://www\.jackzhaojin.com/#website"},"about":\["AEM as a Cloud Service","Web caching","Cache-Control","Surrogate-Control","AEM Dispatcher","Fastly                      |
|                         | CDN","stale-while-revalidate"],"datePublished":"2025-09-01","dateModified":"2026-10-04","inLanguage":"en","wordCount":1999,"video":{"@id":"https\://www\.jackzhaojin.com/writing/2025-09-01-aem-caching-production-architectures/#video"}},{"@type":"VideoObject","@id":"https\://www\.jackzhaojin.com/writing/2025-09-01-aem-caching-production-architectures/#video","name":"AEM Caching in Production: How Cache-Control Moves Through Every Layer","description":"Whether AEM caching is easy or hard depends on how many layers change the Cache-Control header on its way up: from the Java    |
|                         | publish layer, through the dispatcher, Adobe's Fastly CDN and a client CDN, to the                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|                         | browser.","thumbnailUrl":"https\://www\.jackzhaojin.com/writing/2025-09-01-aem-caching-production-architectures/media\_1ad47c0497f8dfb38c963483d29eb286187e651b3.jpg","uploadDate":"2026-10-03T19:56:52Z","duration":"PT9M56S","embedUrl":"https\://www\.youtube-nocookie.com/embed/E7jNBsUvXm0"},{"@type":"BreadcrumbList","@id":"https\://www\.jackzhaojin.com/writing/2025-09-01-aem-caching-production-architectures/#breadcrumb","itemListElement":\[{"@type":"ListItem","position":1,"name":"Home","item":"https\://www\.jackzhaojin.com/"},{"@type":"ListItem","position":2,"name":"Technical |
|                         | Writing","item":"https\://www\.jackzhaojin.com/writing/"},{"@type":"ListItem","position":3,"name":"AEM Caching in Production","item":"https\://www\.jackzhaojin.com/writing/2025-09-01-aem-caching-production-architectures/"}]}]}                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| og:image:alt            | Jack's hand-drawn board: AEM and Web Caching. Caching is hard? caching is easy? Browser, client CDN, Adobe's Fastly CDN, dispatcher and Java publish layer, plus an application with a database and Redis.                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:published\_time | 2025-09-01                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:modified\_time  | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:author          | https\://www\.jackzhaojin.com/                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-summary         | How Cache-Control moves from AEM publish through the dispatcher, Adobe's Fastly CDN and a client CDN to the browser, with a header relay you can switch layer by layer, a stale-while-revalidate timeline, and three tips for documenting and testing each layer.                                                                                                                                                                                                                                                                                                                                    |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-image           | https\://www\.jackzhaojin.com/writing/media\_1ad47c0497f8dfb38c963483d29eb286187e651b3.jpg?width=750\&format=jpg\&optimize=medium                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-topics          | Adobe AEM & EDS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-reading-time    | 9 min read                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-video-time      | 9:56 video                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-url       | https\://youtu.be/E7jNBsUvXm0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-label     | Watch on YouTube                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-keywords        | aem caching cache-control surrogate-control stale-while-revalidate stale-if-error rfc 5861 aem dispatcher .any files enablettl fastly adobe cdn bring your own cdn x-aem-edge-key akamai azure front door redis persisted queries aem edge functions                                                                                                                                                                                                                                                                                                                                                 |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_165e1503e6aa58bcb38b81423a1c606d438c03c22.png#width=144&height=92

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_141f1723b2767e923cf4fde323c5b26fbaf26b2b8.png#width=144&height=92

[image2]: https://main--www-eds--jackzhaojin.aem.page/media_1f56ec09e286836897dec7522b517c88190f23527.png#width=144&height=92

[image3]: https://main--www-eds--jackzhaojin.aem.page/media_1c32cf2a9e5092571b7a31ed429bc7cffe4952a5e.png#width=144&height=92

[image4]: https://main--www-eds--jackzhaojin.aem.page/media_1e1565bde729efbe1b31752554ca29bd3c25e0b86.png#width=144&height=92

[image5]: https://main--www-eds--jackzhaojin.aem.page/media_1ca93e1ddee02435e07bce6359c3a0fdd9b3b8f13.png#width=144&height=92

[image6]: https://main--www-eds--jackzhaojin.aem.page/media_1503c621c29a4e363fa6c0290c167741bd26257a6.png#width=1200&height=1212

[image7]: https://main--www-eds--jackzhaojin.aem.page/media_1ad47c0497f8dfb38c963483d29eb286187e651b3.jpg#width=1280&height=720
