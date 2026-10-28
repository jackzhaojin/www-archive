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

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Showcase (story, wide)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
+---------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| *Dec 2025 - Jan 2026* · v1.0 as designed · recovered from git | [![The v1 content platform plan: a UI/UX specification feeds a mock-content generator (Claude Agent SDK producing PDFs and HTML into Azure Storage), a Make.com / Workfront Fusion content builder calls MCP tools (Playwright, AEM da.live get/update/create/publish) into the da.live EDS site, an evals container on an Oracle VM pairs deterministic and agentic logic four ways each, and a site-building harness runs planning and task agents through research, build, and validate with a human-in-the-loop escape hatch.][image1]](https://www.jackzhaojin.com/portfolio/content-factory/media_10de7b658d46847194e3aacd11e51d1ddd14c324f.png) |
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

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_11c940e5626375d2bbd50ff1f01d01dad41f70a86.png#width=2700&height=1460

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_10de7b658d46847194e3aacd11e51d1ddd14c324f.png#width=2600&height=2012
