+----------------------------------------------------------------------------------------------------------------------+
| Chapter Head                                                                                                         |
+----------------------------------------------------------------------------------------------------------------------+
| # The Content Factory<br>*A decoupled agent mesh*                                                                    |
|                                                                                                                      |
| Oct 2025 - Jun 2026 · 2 repos · 317 commits · 16 core releases                                                       |
|                                                                                                                      |
| **incremental specs** Spec Kit bundles (spec, plan, tasks) in the v1 era; a dated plan in ai-docs per release in the |
| mesh era. Six days from PRD to deployed mesh, because the spec came first.                                           |
|                                                                                                                      |
| Talk material for adaptTo() 2026, built for real: a mesh of independently-addressable A2A agents that generate,      |
| migrate, and evaluate CMS content. Different vendors compose over an open protocol. Quality is measured, not vibed.  |
|                                                                                                                      |
| The arc runs in three eras. Oct 2025: an MCP server for AEM's da.live, on Azure Functions. A 94-commit December push |
| tags v1.0 on New Year's Day: evals in a Docker container, Make.com scenarios calling the Functions to do the         |
| authoring, and by mid-January, Adobe Summit 2026 blog material coming out of the same repo. Then a quiet spring. In  |
| June, v2.0 rebuilds it as four agents: coordinator, content-gen, migration, eval. Six days from PRD to a deployed    |
| mesh on Cloudflare Workers and Containers.                                                                           |
+----------------------------------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------+
| Scene (closed loop)                                                     |
+-------------+-----------------------------------------------------------+
| label       | A three-petal loop through the coordinator: one run goes  |
|             | out to content-gen, migration and eval in turn and always |
|             | comes back through the coordinator, leaving a messy       |
|             | legacy page, the same page as clean blocks, and four      |
|             | score bars, until the coordinator's ring closes.          |
+-------------+-----------------------------------------------------------+
| coordinator | **Coordinator**                                           |
|             |                                                           |
|             | routes the loop                                           |
+-------------+-----------------------------------------------------------+
| content-gen | **Content-gen**                                           |
|             |                                                           |
|             | legacy page                                               |
+-------------+-----------------------------------------------------------+
| migration   | **Migration**                                             |
|             |                                                           |
|             | Kimi authors                                              |
+-------------+-----------------------------------------------------------+
| eval        | **Eval**                                                  |
|             |                                                           |
|             | Claude judges                                             |
+-------------+-----------------------------------------------------------+

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Showcase (story, wide)                                                                                                                                                                                                                                                                                                                                                                                       |
+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| *Jun 11, 2026* · v2.0.0 · the closed loop                 | [![The closed-loop pipeline: a coordinator asks content-gen to fabricate a synthetic legacy page, hands it to the migration agent to author into da.live, and hands that to the eval agent to score across four dimensions.][image0]](https://www.jackzhaojin.com/portfolio/content-factory/media_11c940e5626375d2bbd50ff1f01d01dad41f70a86.png) |
|                                                           |                                                                                                                                                                                                                                                                                                                                                  |
| ### Generate → migrate → evaluate, *intelligently routed* | The closed loop, from the repo's own docs. The coordinator can enter or exit the loop anywhere.                                                                                                                                                                                                                                                  |
|                                                           |                                                                                                                                                                                                                                                                                                                                                  |
| One pipeline, two model vendors, zero contract changes.   |                                                                                                                                                                                                                                                                                                                                                  |
| Kimi authors. Claude judges. Neither knows the other      |                                                                                                                                                                                                                                                                                                                                                  |
| exists.                                                   |                                                                                                                                                                                                                                                                                                                                                  |
+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| id                                                        | p-factory-loop                                                                                                                                                                                                                                                                                                                                   |
+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+--------------------------------------------------+
| Stat Chips                                       |
+--------------------------------------------------+
| - **91** eval score on a real Kimi-authored page |
| - **\~9 min** for a real agentic migration       |
| - **\~11 min** full closed loop, real everything |
| - **4/4** cloud acceptance, e2e                  |
+--------------------------------------------------+

+----------------------------------------------------------------------------+
| Showcase (story, flip)                                                     |
+-----------------------------------------------------------+----------------+
| The through-line, v1.0 → v2.5 · the biggest single        |                |
| component                                                 |                |
|                                                           |                |
| ### The eval outlived both architectures                  |                |
|                                                           |                |
| If agents author content, something has to say whether    |                |
| it's good. That something gets versioned, deployed, and   |                |
| tested like a product of its own.                         |                |
|                                                           |                |
| Four dimensions: structure, accessibility, content        |                |
| fidelity, visual correctness. In v1 the eval shipped as   |                |
| its own Docker container. In v2 it became an agent in the |                |
| mesh, so every migration lands with a score attached. The |                |
| payoff came in v2.5, when the numbers said the site       |                |
| redesign was failing: the error turned out to be in the   |                |
| eval's own methodology, and scoring generated pages on    |                |
| their own merits moved a real article from 67 to 89.      |                |
| Numbers you can argue with beat vibes you can't.          |                |
+-----------------------------------------------------------+----------------+
| id                                                        | p-factory-eval |
+-----------------------------------------------------------+----------------+

+-----------------------------------------------------------------------------+
| Panel (compare)                                                             |
+-----------------+-----------------------------------------------------------+
| label           | The eval component across v1 and v2                       |
+-----------------+-----------------------------------------------------------+
| One eval engine, two deployments                                            |
+-----------------+-----------------------------------------------------------+
| v1.0            | A deployable container: a Next.js eval app with four      |
|                 | agents, each pairing deterministic checks (axe-core,      |
|                 | Cheerio, Playwright) with model judgment. Still running   |
|                 | as the frozen backup.                                     |
+-----------------+-----------------------------------------------------------+
| the engine      | The scoring engine survived the rewrite. It was copied    |
|                 | out of the v1 app, not rebuilt.                           |
+-----------------+-----------------------------------------------------------+
| v2.0            | An addressable A2A agent in the mesh: any vendor's output |
|                 | gets scored the same way, on every run.                   |
+-----------------+-----------------------------------------------------------+

+-----------------------------------------------------------------------------+
| Showcase (story)                                                            |
+-----------------------------------------------------------+-----------------+
| *Jun 18, 2026* · v2.2 · the factory runs daily            |                 |
|                                                           |                 |
| ### A daily unattended run                                |                 |
|                                                           |                 |
| A daily cron submits a run with no topic. The coordinator |                 |
| ideates one, generates, migrates, evaluates, and parks it |                 |
| in preview. A human curates later.                        |                 |
|                                                           |                 |
| Two lessons came out of production. Streams die crossing  |                 |
| the Worker-to-container hop, so the store, not the        |                 |
| stream, is the contract: every agent persists full task   |                 |
| state and consumers recover by polling. And containers    |                 |
| get no native database bindings, so the Worker proxies    |                 |
| queries.                                                  |                 |
+-----------------------------------------------------------+-----------------+
| id                                                        | p-factory-story |
+-----------------------------------------------------------+-----------------+

+--------------------------------------------------------------------------+
| Panel (compare)                                                          |
+--------------+-----------------------------------------------------------+
| label        | The demo story: a 2002 travel blog migrated to a modern   |
|              | CMS by agents                                             |
+--------------+-----------------------------------------------------------+
| The demo, before and after                                               |
+--------------+-----------------------------------------------------------+
| before       | "Katie's Travel Journal," a hand-coded, circa-2002 travel |
|              | blog. Plain HTML, zero framework.                         |
+--------------+-----------------------------------------------------------+
| the mesh     | An agent mesh migrates it: one vendor authors into        |
|              | da.live, another scores structure, accessibility,         |
|              | fidelity, visuals.                                        |
+--------------+-----------------------------------------------------------+
| after        | The Wilderness Journal: a modern Edge Delivery Services   |
|              | site, 14 blocks, every migration scored.                  |
+--------------+-----------------------------------------------------------+

+-------------------------------------+
| Stat Chips                          |
+-------------------------------------+
| - **20.6K** lines of TypeScript     |
| - **27** e2e files · no mocks, ever |
| - **5** JSON Schema contracts       |
+-------------------------------------+

+-----------------------------------------------------------------------------------------------------------------------------------------+
| Proof Links                                                                                                                             |
+-----------------------------------------------------------------------------------------------------------------------------------------+
| [azure-da-mcp ↗](https://github.com/jackzhaojin/azure-da-mcp) [adapt-to-2026-demo ↗](https://github.com/jackzhaojin/adapt-to-2026-demo) |
+-----------------------------------------------------------------------------------------------------------------------------------------+

+------------------------------------------------------------------------------+
| Showcase (story, wide)                                                       |
+---------------------------------------------------------+--------------------+
| Repository SVGs · the v2 design                         |                    |
|                                                         |                    |
| ### Four views of *the mesh*                            |                    |
|                                                         |                    |
| The whole mesh, the two protocols, the server side, and |                    |
| dev ops. One color code throughout: a person in black,  |                    |
| deterministic code in blue, a model deciding in red, a  |                    |
| mix of both in purple.                                  |                    |
+---------------------------------------------------------+--------------------+
| id                                                      | p-factory-diagrams |
+---------------------------------------------------------+--------------------+

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Tabs (diagram deck)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
+-------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| label       | Content factory architecture diagrams                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
+-------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| System index                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
+-------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| The mesh    | 01 · the whole mesh                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|             | #### Four agents, one Worker, one store                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|             | Four agents behind one Cloudflare Worker, one shared store (D1 in the cloud, SQLite locally, same SQL), and artifacts on R2. Every agent writes full task state on every change, so any consumer can recover from tasks/get.                                                                                                                                                                                                                                                                                                           |
|             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|             | [![The whole mesh: humans on the dashboard, GitHub Actions schedules, external systems through an edge shim, and the mesh itself all enter one Cloudflare Worker. Inside it the coordinator container routes A2A messages to the content-gen, migration and eval containers, with D1 as the one store and R2 for artifact bytes. Pages land on da.live as preview only, and two model vendors share one protocol.][image1]](https://www.jackzhaojin.com/portfolio/content-factory/media_16e973cd55264b91bb4091f79fbe0f2034db547a9.svg) |
+-------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| A2A and MCP | 02 · protocols                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|             | #### Two protocols, two jobs                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|             | A2A is agent to agent: Agent Cards, tasks, streams. MCP is agent to tool: a browser, a CMS, a filesystem. Every door into the mesh, every MCP server, and every named tool behind each. The mesh also exposes its own read-only MCP server, so a person can ask Claude Desktop how a run scored.                                                                                                                                                                                                                                       |
|             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|             | [![Two protocols, two jobs: the coordinator is both an A2A client and server, calling content-gen, migration and eval over A2A. Migration and eval reach their tools over MCP: the da.live MCP server for the CMS, Playwright MCP for a browser, and a filesystem MCP for eval screenshots. A read-only store-mcp lets a person in Claude Desktop query the store.][image2]](https://www.jackzhaojin.com/portfolio/content-factory/media_11019a9ec7d2dfa91996b7a936df27e708ffd62f3.svg)                                                |
+-------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Server side | 03 · cloud                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|             | #### One Worker, four containers, one database, one bucket                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|             | One Worker, four containers with their sizes, D1, R2, the tunnel, the custom domains, and everything outside Cloudflare: Google OAuth, the da.live MCP on Azure Functions, the model vendors, and da.live.                                                                                                                                                                                                                                                                                                                             |
|             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|             | [![The server side on Cloudflare: five custom domains routed to one Worker that holds every binding and secret, four containers with their vCPU and memory sizes, D1, R2, container scratch disk and a legacy tunnel. Outside Cloudflare: GitHub Actions, Google OAuth, the da.live MCP on Azure Functions, the model vendors and da.live.][image3]](https://www.jackzhaojin.com/portfolio/content-factory/media_1c6893fa959cf07e36966c5fc03e7cc9049b6082f.svg)                                                                        |
+-------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Dev ops     | 04 · release                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|             | #### Trunk-based and tag-driven                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|             | A release is a git tag. The tag builds four images and rolls the Worker, and the same GitHub Actions scheduler runs the daily production loop. Also shown: the four test tiers and what heals itself.                                                                                                                                                                                                                                                                                                                                  |
|             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|             | [![Dev ops: local dev, CI on main and pull requests, cutting a release tag, the deploy-agents workflow and Cloudflare live, with v1 tags taking a separate road to the frozen 1.0 app. Below: four test tiers (fast, live, soak, cloud), the loops GitHub Actions runs, and what the system watches and heals on its own.][image4]](https://www.jackzhaojin.com/portfolio/content-factory/media_1d860dfef6af0e7dbdf9aae929acd1949f56bb281.svg)                                                                                         |
+-------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Showcase (story, wide)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
+---------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| *Dec 2025 - Jan 2026* · v1.0 as designed · recovered from git | [![The v1 content platform plan: a UI/UX specification feeds a mock-content generator (Claude Agent SDK producing PDFs and HTML into Azure Storage), a Make.com / Workfront Fusion content builder calls MCP tools (Playwright, AEM da.live get/update/create/publish) into the da.live EDS site, an evals container on an Oracle VM pairs deterministic and agentic logic four ways each, and a site-building harness runs planning and task agents through research, build, and validate with a human-in-the-loop escape hatch.][image5]](https://www.jackzhaojin.com/portfolio/content-factory/media_10de7b658d46847194e3aacd11e51d1ddd14c324f.png) |
|                                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ### The v1 platform, *in its planned final form*              | Drawn while v1 was being built: Agent SDK content generation, a Make.com builder over MCP, the evals container, and the site-building harness. The Excalidraw was later recovered from git history.                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|                                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Five subsystems around one EDS site. Color is the semantic    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| axis this page's diagrams still use: deterministic in blue,   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| agentic in red, mixed in purple.                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
+---------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| id                                                            | p-factory-v1plan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+---------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| label                                                         | Open the v1 platform diagram full size                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
+---------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+------------------------------------------------------------------------------+
| Showcase (story, flip)                                                       |
+-----------------------------------------------------------+------------------+
| *Oct 2025* · where this repo started                      |                  |
|                                                           |                  |
| ### First, AEM content operations became tool calls       |                  |
|                                                           |                  |
| The origin build: an MCP server for AEM's da.live, then   |                  |
| the same server proven from Claude, Gemini, Azure OpenAI, |                  |
| and n8n. No client-specific forks.                        |                  |
|                                                           |                  |
| The repo's first life was interoperability with the CMS I |                  |
| work on professionally: expose AEM Edge Delivery's        |                  |
| content operations, get, update, create, publish, over    |                  |
| MCP once, and every agent that speaks the protocol        |                  |
| inherits them. Everything else in this chapter stands on  |                  |
| that server. The mesh grew out of asking what happens     |                  |
| when the agents themselves get addresses too.             |                  |
+-----------------------------------------------------------+------------------+
| id                                                        | p-factory-origin |
+-----------------------------------------------------------+------------------+

+------------------------------------------------------------------------------------+
| Panel (wire)                                                                       |
+---------------------------+--------------------------------------------------------+
| label                     | Diagram: request and response flowing between an agent |
|                           | and a CMS                                              |
+---------------------------+--------------------------------------------------------+
| agent                     | AEM                                                    |
+---------------------------+--------------------------------------------------------+
| create page · update content · publish, as tool calls                              |
+------------------------------------------------------------------------------------+

+-------------+
| Proof Links |
+-------------+
|             |
+-------------+

+----------------------------------------------------------------------------------------------------------------------------+
| Showcase (story)                                                                                                           |
+------------------------------------------------------------------+---------------------------------------------------------+
| *Sep 29, 2026* · conference session, adaptTo() 2026, Berlin      | The recorded talk, adaptTo() 2026                       |
|                                                                  |                                                         |
| ### AI Agent-Driven Content Migration for Edge Delivery Services | [Watch the recorded talk](https://youtu.be/V6vqbTWOiRU) |
|                                                                  |                                                         |
| AI-assisted migration into DA.live and EDS, with orchestration,  |                                                         |
| evaluation, and human review.                                    |                                                         |
|                                                                  |                                                         |
| Our talk, Katie Phillips from Best Buy and me, the first talk of |                                                         |
| the second day: AI agents that migrate content to Edge Delivery  |                                                         |
| Services.                                                        |                                                         |
|                                                                  |                                                         |
| **My take**                                                      |                                                         |
|                                                                  |                                                         |
| Three things I'd call out:                                       |                                                         |
|                                                                  |                                                         |
| - Like most talks at the conference, ours is very agentic. It's  |                                                         |
|   also AI using AI, where most of the other talks were about     |                                                         |
|   humans using AI.                                               |                                                         |
| - We think about evals.                                          |                                                         |
| - It's a multi-step process, and the AI agents share a common    |                                                         |
|   working process.                                               |                                                         |
|                                                                  |                                                         |
| That fits content migration well, because you want to run things |                                                         |
| in parallel. Sometimes you spin up tens or hundreds of agents to |                                                         |
| migrate a bunch of pages, run evals, throw the results away and  |                                                         |
| do it again. AI using AI can do that in a very scalable way.     |                                                         |
+------------------------------------------------------------------+---------------------------------------------------------+
| id                                                               | adaptto-2026                                            |
+------------------------------------------------------------------+---------------------------------------------------------+

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Frame (sub)                                                                                                                                                                                                                                                                                                        |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Slide titled Conceptually: One Framework, Any Content Process: any trigger (human UI, deterministic, AI trigger) flows through a migrator, an eval step, an orchestrator, a generator and a human step to human oversight, preview publish and final publish, with human governance on the entire flow.][image6] |
|                                                                                                                                                                                                                                                                                                                    |
| From our slides: one framework for any content process, with any trigger, any route through the agents, and four places a human can step in. Slide: Jack Jin and Katie Phillips, adaptTo() 2026.                                                                                                                   |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Proof Links                                                                                                                                                                                             |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [View event source ↗](https://adapt.to/2026/schedule/ai-agent-driven-content-migration-for-edge-delivery-services) [Slides (PDF)](/portfolio/content-factory/adaptto-2026-content-migration-slides.pdf) |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+----------------------------+
| Section Metadata           |
+---------+------------------+
| id      | ch-factory       |
+---------+------------------+
| style   | chapter, factory |
+---------+------------------+

---

## Related

+-----------------------------------------------------------+
| Row List (related, dynamic)                               |
+--------------+--------------------------------------------+
| Source       | [/writing-index.json](/writing-index.json) |
+--------------+--------------------------------------------+

---

[All projects](/portfolio/)

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Metadata                                                                                                                                                                                                                                              |
+-----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| title           | The Content Factory \| Jack Jin                                                                                                                                                                                                     |
+-----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| description     | Talk material for adaptTo() 2026, built for real: a mesh of independently-addressable A2A agents that generate, migrate, and evaluate CMS content.                                                                                  |
+-----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| template        | portfolio                                                                                                                                                                                                                           |
+-----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image           | ![The closed-loop pipeline: a coordinator asks content-gen to fabricate a synthetic legacy page, hands it to the migration agent to author into da.live, and hands that to the eval agent to score across four dimensions.][image0] |
+-----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| project-order   | 3                                                                                                                                                                                                                                   |
+-----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| project-dates   | 2025 to 2026                                                                                                                                                                                                                        |
+-----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| project-kind    | incremental specs                                                                                                                                                                                                                   |
+-----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| project-anchors | ch-factory p-factory-loop p-factory-eval p-factory-story p-factory-v1plan p-factory-origin                                                                                                                                          |
+-----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_11c940e5626375d2bbd50ff1f01d01dad41f70a86.png#width=2700\&height=1460

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_16e973cd55264b91bb4091f79fbe0f2034db547a9.svg#width=1280\&height=1000

[image2]: https://main--www-eds--jackzhaojin.aem.page/media_11019a9ec7d2dfa91996b7a936df27e708ffd62f3.svg#width=1280\&height=1090

[image3]: https://main--www-eds--jackzhaojin.aem.page/media_1c6893fa959cf07e36966c5fc03e7cc9049b6082f.svg#width=1280\&height=960

[image4]: https://main--www-eds--jackzhaojin.aem.page/media_1d860dfef6af0e7dbdf9aae929acd1949f56bb281.svg#width=1280\&height=880

[image5]: https://main--www-eds--jackzhaojin.aem.page/media_10de7b658d46847194e3aacd11e51d1ddd14c324f.png#width=2600\&height=2012

[image6]: https://main--www-eds--jackzhaojin.aem.page/media_171df61d09bc33c267241324008e5305eb073f5ea.jpg#width=1600\&height=900
