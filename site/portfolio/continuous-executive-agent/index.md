+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Chapter Head                                                                                                                                                    |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| # Continuous Executive Agent<br>*A 24/7 coding agent*                                                                                                           |
|                                                                                                                                                                 |
| Jan 24 - May 31, 2026 · 374 commits · 16 releases · ran 24/7 for four months                                                                                    |
|                                                                                                                                                                 |
| **incremental specs** to build it: a dated spec and plan per release, ai-docs v1 through v3. **dark factory** when it ran: nobody watched the overnight builds. |
|                                                                                                                                                                 |
| A coding agent that runs around the clock under PM2. It selects work from a priority queue, spawns isolated workers, validates with deterministic verifiers,    |
| retries with a different strategy on each failure, and escalates to a human only when stuck.                                                                    |
|                                                                                                                                                                 |
| This section goes release by release: a foundation era, an identity-and-multi-vendor era, and a memory era. Four months. The output repo ended up with thirty   |
| projects, most of them built overnight.                                                                                                                         |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| Scene (clock tower)                                                   |
+------------+----------------------------------------------------------+
| label      | A clock tower whose movement is three meshing gears: the |
|            | large executive wheel turns the dial's single hand       |
|            | through the eight phases of its loop and drives the      |
|            | management wheel, which drives the small worker pinion,  |
|            | and each turn of the pinion lays one stone of the piece  |
|            | at the tower's foot.                                     |
+------------+----------------------------------------------------------+
| executive  | **Executive**                                            |
|            |                                                          |
|            | picks the goal                                           |
+------------+----------------------------------------------------------+
| management | **Management**                                           |
|            |                                                          |
|            | breaks it down                                           |
+------------+----------------------------------------------------------+
| worker     | **Worker**                                               |
|            |                                                          |
|            | builds it                                                |
+------------+----------------------------------------------------------+

+--------------------------------------------------------------------+
| Stats (lifetime)                                                   |
+-------------------------+------------------------------------------+
| label                   | Lifetime metrics of the continuous agent |
+-------------------------+------------------------------------------+
| Lifetime, measured from its own ledgers                            |
+--------------------------------------------------------------------+
| - **571** worker contracts                                         |
| - **41** goals completed autonomously                              |
| - **30** projects built                                            |
| - **3338** verifier runs                                           |
| - ***8*** human interventions, total                               |
+--------------------------------------------------------------------+
| Counted from the append-only ledgers in the repo.                  |
+--------------------------------------------------------------------+

+------------------------------------------------------------------------+
| Showcase (story, wide)                                                 |
+-------------------------------------------------------+----------------+
| Repository SVGs · drawn Nov 19, 2026                  |                |
|                                                       |                |
| ### Three views of *the same agent*                   |                |
|                                                       |                |
| Who hands work to whom, one turn of the loop, and the |                |
| whole system on one page.                             |                |
+-------------------------------------------------------+----------------+
| id                                                    | p-cea-diagrams |
+-------------------------------------------------------+----------------+

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Tabs (diagram deck)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| label        | Continuous agent engineering diagrams                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| System index                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Delegation   | 01 · delegation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|              | #### AI using AI using AI                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|              | I drop goals into a priority queue and answer only when the agent is blocked. The executive loop spawns coding workers, each its own AI, and each worker's cognition is a vendor model. Every handoff crosses deterministic code.                                                                                                                                                                                                                                                                                    |
|              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|              | [![AI using AI using AI: the delegation stack. The human at the top is the async gate; below it the executive loop running 24/7 on PM2, then the coding workers spawned per goal on Claude Agent SDK, OpenAI Codex or Kimi, then the vendor model. A deterministic gate sits on every handoff: the constitution, credential tiers and the sandbox, and the AgentWorkerProvider seam.][image0]](https://www.jackzhaojin.com/portfolio/continuous-executive-agent/media_18934561dd07474d048c6eb80a7e9acad1f10b526.svg) |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| The loop     | 02 · runtime                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|              | #### One iteration, then again, forever                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|              | Select the top goal, spawn a worker, verify the output, pick up the next. A failed worker never kills the loop: it retries with a different strategy, diagnoses after 3 failures, and blocks for a human after 10.                                                                                                                                                                                                                                                                                                   |
|              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|              | [![The executive loop, one iteration: check inbox, health check, process inputs, select work, breakdown, execute, validate, update state, then continue immediately. On failure it diagnoses and retries with a new strategy, and blocks after 10 failures. Agentic phases are blue, deterministic phases gray.][image1]](https://www.jackzhaojin.com/portfolio/continuous-executive-agent/media_1e4234333e753f6d9ce3ce2ca6762ff09f94bf5fc.svg)                                                                      |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Architecture | 03 · structure                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|              | #### Two repos, three layers, many vendors                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|              | The agent's brain is its own repo, and everything it builds lands in a sibling repo. Intelligence is agentic, the edges are plain code, and git is the only durable store.                                                                                                                                                                                                                                                                                                                                           |
|              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|              | [![Architecture: the goal queue, needs-you.md, identity and the constitution on the left; the continuous-agent repo in the middle with core, agentic, deterministic, skills, ledgers and execution patterns; the vendor abstraction, the ai-sandbox output repo, the V3.0 second brain and the credential tiers on the right.][image2]](https://www.jackzhaojin.com/portfolio/continuous-executive-agent/media_118daa7e9e3c7cd8fc666f297202d57a99c991dd1.svg)                                                        |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------+
| Showcase (story, wide)                                            |
+----------------------------------------------------+--------------+
| v1.0.0 → v3.0.0 · 16 tags                          |              |
|                                                    |              |
| ### Release history                                |              |
|                                                    |              |
| Dates from git tags. Summaries from the changelog. |              |
+----------------------------------------------------+--------------+
| id                                                 | p-cea-ladder |
+----------------------------------------------------+--------------+

+-------------------------------------------------------------------------------------+
| Timeline (ladder)                                                                   |
+-------------------------------------------------------------------------------------+
| Era 1 · Foundation · Jan 24 - Feb 4                                                 |
+-------------------------+-----------------------------------------------------------+
| v1.0                    | Jan 24, 2026 · built in a single day                      |
|                         |                                                           |
|                         | #### Foundation                                           |
|                         |                                                           |
|                         | The 8-phase executive loop. Two-repo architecture: the    |
|                         | brain never receives worker output. A constitution of 8   |
|                         | immutable limits, including a $20/month spend cap.        |
|                         | Contracts, deterministic verifiers, PM2, append-only      |
|                         | ledgers.                                                  |
+-------------------------+-----------------------------------------------------------+
| v1.1                    | Jan 25, 2026                                              |
|                         |                                                           |
|                         | #### Intelligence                                         |
|                         |                                                           |
|                         | Goals over 100 turns auto-split into steps. Strategy      |
|                         | rotation: every retry must try something different.       |
|                         | Agentic diagnosis after three failures. The needs-you.md  |
|                         | protocol: I answer in a markdown table, it notices within |
|                         | thirty seconds.                                           |
+-------------------------+-----------------------------------------------------------+
| v1.2                    | Jan 28, 2026                                              |
|                         |                                                           |
|                         | #### Organization                                         |
|                         |                                                           |
|                         | Goal bundles: each goal a directory with its own prompt,  |
|                         | machine-readable steps, contract log, and progress log.   |
|                         | Workspace lifecycle drafts → ondeck → in-progress →       |
|                         | completed, promoted by priority.                          |
+-------------------------+-----------------------------------------------------------+
| v1.3                    | Feb 4, 2026                                               |
|                         |                                                           |
|                         | #### Security                                             |
|                         |                                                           |
|                         | Three physically separated credential tiers with leak     |
|                         | detection on every spawn. OAuth-first: the whole system   |
|                         | runs on a Claude subscription, no API key.                |
+-------------------------+-----------------------------------------------------------+
| Era 2 · Identity & Multi-Vendor · Mar 29 - Apr 19                                   |
+-------------------------+-----------------------------------------------------------+
| v2.0                    | Mar 29, 2026                                              |
|                         |                                                           |
|                         | #### Identity: the agent gets its own accounts            |
|                         |                                                           |
|                         | Its own Gmail: it receives goals by email. Its own        |
|                         | Discord: it reports completions and blocks. Skills and    |
|                         | playbooks with a track record: every skill carries a      |
|                         | success rate. A read-only dashboard. I became a guest in  |
|                         | my agent's workspace.                                     |
+-------------------------+-----------------------------------------------------------+
| v2.1                    | Apr 1 - 5, 2026                                           |
|                         |                                                           |
|                         | #### Multi-vendor: the bake-off                           |
|                         |                                                           |
|                         | A vendor abstraction layer: Claude, OpenAI Codex, and     |
|                         | Kimi workers behind one interface. Then the experiment:   |
|                         | the same finance-dashboard spec run across all four       |
|                         | vendor modes, deployed live, and scored by the harness    |
|                         | itself.                                                   |
+-------------------------+-----------------------------------------------------------+
| v2.2                    | Apr 12, 2026                                              |
|                         |                                                           |
|                         | #### Harness framework                                    |
|                         |                                                           |
|                         | Three multi-agent plan-then-build pipelines became        |
|                         | first-class citizens, runnable standalone or driven by    |
|                         | the executive. 105 passing tests; the whole orchestrator  |
|                         | exercised end-to-end in about a second with zero API      |
|                         | calls.                                                    |
+-------------------------+-----------------------------------------------------------+
| v2.3-2.4                | Apr 18 - 19, 2026                                         |
|                         |                                                           |
|                         | #### Build targets & hard lessons                         |
|                         |                                                           |
|                         | Worktree isolation per project. Progressive skill         |
|                         | disclosure with a verifier that fails a contract if a     |
|                         | required skill was never consulted. And a favorite war    |
|                         | story: a prompt saying "No UI, no database" got           |
|                         | post-processed into a plan whose step zero provisioned    |
|                         | database tables. The hallucinating prerequisite-inserter  |
|                         | was found and fixed.                                      |
+-------------------------+-----------------------------------------------------------+
| Era 3 · The Second Brain · May 16 - 31                                              |
+-------------------------+-----------------------------------------------------------+
| v3.0                    | May 31, 2026                                              |
|                         |                                                           |
|                         | #### Memory                                               |
|                         |                                                           |
|                         | A mem0-backed second brain. Five memory types, five       |
|                         | lifecycle hooks, memory packs baked into each worker's    |
|                         | context, \~134 memories backfilled. Git stays canonical:  |
|                         | if the store and the repo disagree, the repo wins. The    |
|                         | riskiest hook stayed off until the memories earned trust. |
+-------------------------+-----------------------------------------------------------+

+---------------------------------------------------------------------------+
| Showcase (story)                                                          |
+-----------------------------------------------------------+---------------+
| *Apr 6, 2026* · demoed live at AI Tinkerers Columbus      |               |
|                                                           |               |
| ### The multi-vendor bake-off                             |               |
|                                                           |               |
| Same spec, four vendor modes, seven verifiers each. The   |               |
| harness did the scoring.                                  |               |
|                                                           |               |
| Demoed on the running system, no slides. One night that   |               |
| week the ledger shows Codex finishing its build and       |               |
| passing validation at 3:56 AM, with nobody awake. The     |               |
| demo video shown was produced by the agent end to end: 81 |               |
| seconds, zero keystrokes.                                 |               |
|                                                           |               |
| > "Is it perfect? No. Is it close? Also no. But I'm proud |               |
| > of where it's at."                                      |               |
+-----------------------------------------------------------+---------------+
| id                                                        | p-cea-bakeoff |
+-----------------------------------------------------------+---------------+

+------------------------------------------------------------------------+
| Panel (bakeoff)                                                        |
+------------------------------+-----------------------------------------+
| label                        | Multi-vendor bake-off scores out of 130 |
+------------------------------+-----------------------------------------+
| replay                       | Replay the bake-off bars                |
+------------------------------+-----------------------------------------+
| max                          | 130                                     |
+------------------------------+-----------------------------------------+
| Same spec · four vendor modes · scored /130 by the harness             |
+------------------------------+-----------------------------------------+
| OpenAI Codex                 | 115                                     |
+------------------------------+-----------------------------------------+
| Kimi K2.5 CLI                | 92                                      |
+------------------------------+-----------------------------------------+
| Claude                       | 88                                      |
+------------------------------+-----------------------------------------+
| Kimi Wire                    | 87                                      |
+------------------------------+-----------------------------------------+
| All four deployed live from the agent's own output repo.               |
+------------------------------------------------------------------------+
| ↻ replay                                                               |
+------------------------------------------------------------------------+

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Frame (sub, portrait)                                                                                                                                                                                                                                |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![AI Tinkerers Community Spotlight graphic: a black and gold halftone portrait of Jack, arms crossed, with the text Top Global Demo, number one top pick, my own version of OpenClaw focused on 24x7 development, Columbus, April 20, 2026.][image3] |
|                                                                                                                                                                                                                                                      |
| Two weeks later, AI Tinkerers named it the #1 Top Global Demo in their April 2026 Community Spotlights and made this graphic. Their design, not mine.                                                                                                |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Proof Links                                                                                                                                                                                                                              |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [All four dashboards, deployed ↗](https://www.jackzhaojin.com/ai-sandbox/) [continuous-agent, open source ↗](https://github.com/jackzhaojin/continuous-agent) [ai-sandbox, its output repo ↗](https://github.com/jackzhaojin/ai-sandbox) |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Showcase (story, flip)                                                                                                                                              |
+-----------------------------------------------------------+---------------------------------------------------------------------------------------------------------+
| *Mar - Apr 2026* · the identity era, up close             | ![Discord workspace owned and operated by the autonomous agent, posting its own status updates][image4] |
|                                                           |                                                                                                         |
| ### Its own Gmail, Discord, *and Notion*                  | The agent's own Discord. I read it like a colleague's channel.                                          |
|                                                           |                                                                                                         |
| An always-on agent needs its own accounts, not borrowed   |                                                                                                         |
| ones.                                                     |                                                                                                         |
|                                                           |                                                                                                         |
| It receives goals by email and reports to its own Discord |                                                                                                         |
| channel. I am a guest in the agent's workspace, and the   |                                                                                                         |
| working rhythm is reading the overnight commits in the    |                                                                                                         |
| morning. Human interaction is markdown files, not a chat  |                                                                                                         |
| box waiting for input.                                    |                                                                                                         |
+-----------------------------------------------------------+---------------------------------------------------------------------------------------------------------+
| id                                                        | p-cea-identity                                                                                          |
+-----------------------------------------------------------+---------------------------------------------------------------------------------------------------------+

+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Frame (sub)                                                                                                                                                      |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Hand-drawn architecture diagram of Continuous Executive Agent v2.1: executive brain, multi-vendor worker execution, and self-correcting feedback loop][image5] |
|                                                                                                                                                                  |
| The v2.1 system map, hand-drawn: executive brain, worker execution, feedback loop.                                                                               |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+-------------+
| Proof Links |
+-------------+
|             |
+-------------+

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Showcase (story)                                                                                                                                                                                                                                                                                                                                                                    |
+-----------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| *May 31, 2026* · v3.0 · the closing release               | [![Diagram of the memory system's write path (hooks feed a harvester that validates and writes to mem0) and read path (a reader runs natural-language searches and builds memory packs)][image6]](https://www.jackzhaojin.com/portfolio/continuous-executive-agent/media_189e5a24b2bfd7e8d5ba58b0146cf55368e9c7acd.png) |
|                                                           |                                                                                                                                                                                                                                                                                                                         |
| ### The agent gets a second brain                         | The write path and the read path. One writer, one reader, no agent scribbles wherever it wants.                                                                                                                                                                                                                         |
|                                                           |                                                                                                                                                                                                                                                                                                                         |
| Storage is the easy half. Retrieval decides whether a     |                                                                                                                                                                                                                                                                                                                         |
| memory was ever real.                                     |                                                                                                                                                                                                                                                                                                                         |
|                                                           |                                                                                                                                                                                                                                                                                                                         |
| Five memory types, from immutable principles to           |                                                                                                                                                                                                                                                                                                                         |
| reflective lessons. Workers never touch the store: they   |                                                                                                                                                                                                                                                                                                                         |
| get a curated, two-thousand-token memory pack baked into  |                                                                                                                                                                                                                                                                                                                         |
| their context. The best war story is the silent bug: an   |                                                                                                                                                                                                                                                                                                                         |
| empty-string config value made every single write fail    |                                                                                                                                                                                                                                                                                                                         |
| while the logs said "ok." Found, fixed, and the logging   |                                                                                                                                                                                                                                                                                                                         |
| redesigned so a total failure can never look like success |                                                                                                                                                                                                                                                                                                                         |
| again.                                                    |                                                                                                                                                                                                                                                                                                                         |
+-----------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| id                                                        | p-cea-brain                                                                                                                                                                                                                                                                                                             |
+-----------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------+
| Proof Links                                                                         |
+-------------------------------------------------------------------------------------+
| [The memory design, in the repo ↗](https://github.com/jackzhaojin/continuous-agent) |
+-------------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------------------------------------+
| Showcase (story, flip)                                                                                         |
+----------------------------------------------------------+-----------------------------------------------------+
| *Apr 6, 2026* · community demo, AI Tinkerers Columbus    | The live talk, AI Tinkerers Columbus                |
|                                                          |                                                     |
| ### OpenClaw 24/7 Development Agent                      | [Watch the live talk](https://youtu.be/l3wIHurjERk) |
|                                                          |                                                     |
| A demo of a continuous coding agent, its execution loop, |                                                     |
| and the boundaries around autonomous work. Picked as the |                                                     |
| #1 Top Global Demo in AI Tinkerers' April 2026 Community |                                                     |
| Spotlights, out of hundreds of demos.                    |                                                     |
+----------------------------------------------------------+-----------------------------------------------------+
| id                                                       | ai-tinkerers-2026                                   |
+----------------------------------------------------------+-----------------------------------------------------+

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Proof Links                                                                                                                                                                      |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [Read the write-up](/writing/2026-04-05-continuous-executive-agent-v2-1/) [Community Spotlights ↗](https://post-training.aitinkerers.org/p/ai-tinkerers-23-community-spotlights) |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------------------------------------------+
| Panel (edge)                                                                                                         |
+-----------------------------------------------------------+----------------------------------------------------------+
| label                                                     | Where the continuous agent story goes next               |
+-----------------------------------------------------------+----------------------------------------------------------+
| Where it went next                                                                                                   |
+-----------------------------------------------------------+----------------------------------------------------------+
| #### The roadmap said multi-agent                         | #### It shipped as a different repo                      |
|                                                           |                                                          |
| The v3.0 deck closes with "Multi-Agent (V4.0): parallel   | Five weeks after v3.0, Anima Mesh's first commit landed. |
| agents, partitioned scope." That version was never tagged | The founding document names this system as its           |
| here.                                                     | predecessor. The monolith's V4 is the mesh at the top of |
|                                                           | this page.                                               |
+-----------------------------------------------------------+----------------------------------------------------------+

+------------------------+
| Section Metadata       |
+---------+--------------+
| id      | ch-cea       |
+---------+--------------+
| style   | chapter, cea |
+---------+--------------+

---

## Related

+-----------------------------------------------------------+
| Row List (related, dynamic)                               |
+--------------+--------------------------------------------+
| Source       | [/writing-index.json](/writing-index.json) |
+--------------+--------------------------------------------+

---

[All projects](/portfolio/)

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Metadata                                                                                                                                                                                                                                                               |
+-----------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| title           | Continuous Executive Agent \| Jack Jin                                                                                                                                                                                                               |
+-----------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| description     | A coding agent that runs around the clock under PM2.                                                                                                                                                                                                 |
+-----------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| template        | portfolio                                                                                                                                                                                                                                            |
+-----------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image           | ![AI Tinkerers Community Spotlight graphic: a black and gold halftone portrait of Jack, arms crossed, with the text Top Global Demo, number one top pick, my own version of OpenClaw focused on 24x7 development, Columbus, April 20, 2026.][image3] |
+-----------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| project-order   | 6                                                                                                                                                                                                                                                    |
+-----------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| project-dates   | 2026                                                                                                                                                                                                                                                 |
+-----------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| project-kind    | incremental specs                                                                                                                                                                                                                                    |
+-----------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| project-anchors | ch-cea p-cea-ladder p-cea-bakeoff p-cea-identity p-cea-brain                                                                                                                                                                                         |
+-----------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_18934561dd07474d048c6eb80a7e9acad1f10b526.svg#width=1280\&height=912

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_1e4234333e753f6d9ce3ce2ca6762ff09f94bf5fc.svg#width=1280\&height=760

[image2]: https://main--www-eds--jackzhaojin.aem.page/media_118daa7e9e3c7cd8fc666f297202d57a99c991dd1.svg#width=1280\&height=900

[image3]: https://main--www-eds--jackzhaojin.aem.page/media_1a8bd467b72556e1f8080e23b1e04a7e52140bb18.jpg#width=800\&height=1071

[image4]: https://main--www-eds--jackzhaojin.aem.page/media_1150aca0fa772527411056ec242c94d2bee10b797.png#width=1536\&height=1340

[image5]: https://main--www-eds--jackzhaojin.aem.page/media_1fe703736ea6e41fc7b7cdb8678c8dd6c6c445412.png#width=3039\&height=2160

[image6]: https://main--www-eds--jackzhaojin.aem.page/media_189e5a24b2bfd7e8d5ba58b0146cf55368e9c7acd.png#width=4220\&height=1754
