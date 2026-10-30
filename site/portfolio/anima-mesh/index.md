+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Chapter Head                                                                                                                                                                                                                                                   |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| # Anima Mesh<br>*The company-of-0 experiment*                                                                                                                                                                                                                  |
|                                                                                                                                                                                                                                                                |
| Jul - Oct 2026 · 3 repos                                                                                                                                                                                                                                       |
|                                                                                                                                                                                                                                                                |
| **ad hoc** no spec preceded the code. The structure came from releases: 57 tags through v2.4.0, a changelog per minor line, and platform failures written down as learnings.                                                                                   |
|                                                                                                                                                                                                                                                                |
| AnimaMesh runs a mesh of brains with agents. Each brain is one layer of someone's world, kept as a private knowledge bundle: a person's life, a company, or a team or group in between. Agents wake on their own heartbeat, do the preparable work, and bring  |
| back a draft to approve or edit. A human remains the approval gate for money, filings, publishing, credentials, and access.                                                                                                                                    |
|                                                                                                                                                                                                                                                                |
| It started as the company-of-0, a company's back office run from one private repo: compliance checks, bookkeeping prep, document memory, governance, research, and inbound triage. Version 2.0 made a brain a layer. Brains link only when both sides agree,   |
| the brain that owns the data decides what crosses, and members with roles make a brain multi-player. Since v2.3 a brain can live in a Slack channel, and since v2.4 it can be kept in git, OneDrive, SharePoint, Google Drive, or Dropbox.                     |
|                                                                                                                                                                                                                                                                |
| Cloud execution is primary. A Worker reads the brain as one tarball, runs the agents that are due, verifies their artifacts, and lands one commit before a brief or reply is sent. The CLI uses the same engine for setup, recovery, and subprocess-only       |
| harnesses.                                                                                                                                                                                                                                                     |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Engine source, public                                                                                                                                                                                                                                          |
|                                                                                                                                                                                                                                                                |
| [github.com/jackzhaojin/anima-mesh ↗](https://github.com/jackzhaojin/anima-mesh)                                                                                                                                                                               |
|                                                                                                                                                                                                                                                                |
| Apache 2.0 · v2.4.0 · TypeScript on Cloudflare Workers · the brains stay private                                                                                                                                                                               |
|                                                                                                                                                                                                                                                                |
| [README ↗](https://github.com/jackzhaojin/anima-mesh#readme) [Architecture notes ↗](https://github.com/jackzhaojin/anima-mesh/blob/main/docs/architecture.md) [Scrubbed sample brain ↗](https://github.com/jackzhaojin/anima-mesh/tree/main/docs/sample-brain) |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+----------------------------------------------------------------------+
| Scene (brain mesh)                                                   |
+----------+-----------------------------------------------------------+
| label    | Three brains drawn as constellations of points, an org    |
|          | brain, a shared brain with three people seated around it  |
|          | and one person's own brain with that person at its gate,  |
|          | where an agent wakes on the person's heartbeat, crosses a |
|          | link both brains agreed to and brings back a draft that   |
|          | waits at the gate until the person approves it.           |
+----------+-----------------------------------------------------------+
| org      | **Org brain**                                             |
|          |                                                           |
|          | runs a company                                            |
+----------+-----------------------------------------------------------+
| shared   | **Shared brain**                                          |
|          |                                                           |
|          | multi-player                                              |
+----------+-----------------------------------------------------------+
| person   | **Person brain**                                          |
|          |                                                           |
|          | one human's life                                          |
+----------+-----------------------------------------------------------+
| gate     | **Approval gate**                                         |
|          |                                                           |
|          | approve or edit                                           |
+----------+-----------------------------------------------------------+

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Showcase (story, wide)                                                                                                                                                                                                                                                                                                                                                                                       |
+----------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Since v0.3 · Cloudflare Workers \+ Durable Objects \+    | [![AnimaMesh cloud architecture: Discord and a browser connect to separate Cloudflare Workers; Heartbeat and Direction Durable Objects run against a private GitHub brain, read-only context sources, and fetch-based model APIs.][image0]](https://www.jackzhaojin.com/portfolio/anima-mesh/media_14d1ac0ad972a1c6f26b89203d3287054e1dcc6d6.svg) |
| GitHub                                                   |                                                                                                                                                                                                                                                                                                                                                   |
|                                                          | The normal operating path. The cloud tier runs while the laptop is closed; the laptop tier remains available for local tools and recovery.                                                                                                                                                                                                        |
| ### Cloud first, one private brain per instance          |                                                                                                                                                                                                                                                                                                                                                   |
|                                                          |                                                                                                                                                                                                                                                                                                                                                   |
| Durable Objects hold alarms, locks, queues, and budgets. |                                                                                                                                                                                                                                                                                                                                                   |
| The private GitHub repo holds knowledge and evidence.    |                                                                                                                                                                                                                                                                                                                                                   |
| Read sources stay external.                              |                                                                                                                                                                                                                                                                                                                                                   |
+----------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| id                                                       | p-anima-arch                                                                                                                                                                                                                                                                                                                                      |
+----------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| label                                                    | Open the cloud architecture diagram full size                                                                                                                                                                                                                                                                                                     |
+----------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+------------------------------------------------------------------------------+
| Showcase (story, wide)                                                       |
+-----------------------------------------------------------+------------------+
| Repository SVGs · synced with the Aug 2 implementation    |                  |
|                                                           |                  |
| ### Six views of the *same system*                        |                  |
|                                                           |                  |
| State, reach, runtime, feedback, staffing, and ownership. |                  |
| Each view follows a seam that exists in the code.         |                  |
+-----------------------------------------------------------+------------------+
| id                                                        | p-anima-diagrams |
+-----------------------------------------------------------+------------------+

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Tabs (diagram deck)                                                                                                                                                                                                                                                                                                                                                  |
+-------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| label             | Anima Mesh engineering diagrams                                                                                                                                                                                                                                                                                                                  |
+-------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| System index                                                                                                                                                                                                                                                                                                                                                         |
+-------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Brain             | 01 · state                                                                                                                                                                                                                                                                                                                                       |
|                   |                                                                                                                                                                                                                                                                                                                                                  |
|                   | #### One organization as plain files                                                                                                                                                                                                                                                                                                             |
|                   |                                                                                                                                                                                                                                                                                                                                                  |
|                   | Knowledge, agent definitions, deploy configuration, approvals, reports, and an append-only ledger live in one private repo. No engine code lives there.                                                                                                                                                                                          |
|                   |                                                                                                                                                                                                                                                                                                                                                  |
|                   | [![Anatomy of a brain: one organization stored as plain files, including knowledge, the agent roster, evidence surfaces, cloud deployment configuration, and two writers sharing one git history.][image1]](https://www.jackzhaojin.com/portfolio/anima-mesh/media_1c6fb199d61ab20c5cee4193bfc9059e82a8f88e8.svg)                                |
+-------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Resource reach    | 02 · reach                                                                                                                                                                                                                                                                                                                                       |
|                   |                                                                                                                                                                                                                                                                                                                                                  |
|                   | #### The files stay where their truth already lives                                                                                                                                                                                                                                                                                              |
|                   |                                                                                                                                                                                                                                                                                                                                                  |
|                   | SharePoint, mail, and GitHub are scoped inputs. Reads are consented and read-only; writes pass a deterministic gate and land in the ledger.                                                                                                                                                                                                      |
|                   |                                                                                                                                                                                                                                                                                                                                                  |
|                   | [![Resource reach diagram: SharePoint and OneDrive, a company mailbox, and GitHub repos feed a private brain through read-only seams; resulting briefs, commits, public issues, and approvals are gated and ledgered.][image2]](https://www.jackzhaojin.com/portfolio/anima-mesh/media_109642e92e2eb13f6c9a0127a81728473fd32ce20.svg)            |
+-------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| One beat          | 03 · runtime                                                                                                                                                                                                                                                                                                                                     |
|                   |                                                                                                                                                                                                                                                                                                                                                  |
|                   | #### One alarm, then one evidence commit                                                                                                                                                                                                                                                                                                         |
|                   |                                                                                                                                                                                                                                                                                                                                                  |
|                   | The beat reads the whole brain, runs due spokes sequentially, runs the hub last, commits once, and only then sends the brief.                                                                                                                                                                                                                    |
|                   |                                                                                                                                                                                                                                                                                                                                                  |
|                   | [![Heartbeat sequence: one Durable Object alarm reads the brain, evaluates which agents are due, runs spokes sequentially and the hub last, commits all evidence once, delivers the brief, and rearms itself.][image3]](https://www.jackzhaojin.com/portfolio/anima-mesh/media_12bba0e49da938253ad97bdeaeb91bd810c27a499.svg)                    |
+-------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Defect loop       | 04 · feedback                                                                                                                                                                                                                                                                                                                                    |
|                   |                                                                                                                                                                                                                                                                                                                                                  |
|                   | #### The brain reports defects on its own engine                                                                                                                                                                                                                                                                                                 |
|                   |                                                                                                                                                                                                                                                                                                                                                  |
|                   | A gated report crosses a leak guard, title deduplication, and a per-run cap before it becomes a public issue. The fix returns through a tagged engine release.                                                                                                                                                                                   |
|                   |                                                                                                                                                                                                                                                                                                                                                  |
|                   | [![Defect loop: an agent proposes an engine issue, deterministic code checks its whitelist, scans for identity leaks, deduplicates the title, caps filing, and ledgers the result before a maintainer fixes and tags the engine.][image4]](https://www.jackzhaojin.com/portfolio/anima-mesh/media_1df7dfe6c3bc119c8c99771f9d79124f35ad47a89.svg) |
+-------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Roster            | 05 · staffing                                                                                                                                                                                                                                                                                                                                    |
|                   |                                                                                                                                                                                                                                                                                                                                                  |
|                   | #### The roster is data, not deployment                                                                                                                                                                                                                                                                                                          |
|                   |                                                                                                                                                                                                                                                                                                                                                  |
|                   | Each agent is frontmatter plus prose. Its file carries model, harness, rhythm, sources, read paths, web budget, whitelist, and autonomy level.                                                                                                                                                                                                   |
|                   |                                                                                                                                                                                                                                                                                                                                                  |
|                   | [![Agent roster lifecycle: generic templates become private markdown agent files whose frontmatter declares cognition, schedule, sources, web budget, whitelist, and autonomy level.][image5]](https://www.jackzhaojin.com/portfolio/anima-mesh/media_177b789b8c2a0e2b31ebfeab54716fc13c7555b8a.svg)                                             |
+-------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Engine / instance | 06 · ownership                                                                                                                                                                                                                                                                                                                                   |
|                   |                                                                                                                                                                                                                                                                                                                                                  |
|                   | #### Generic engine, isolated company state                                                                                                                                                                                                                                                                                                      |
|                   |                                                                                                                                                                                                                                                                                                                                                  |
|                   | The public repo owns reusable logic and tests. Each private instance owns identity, knowledge, credential bindings, deploy configuration, and durable evidence.                                                                                                                                                                                  |
|                   |                                                                                                                                                                                                                                                                                                                                                  |
|                   | [![Engine and instance topology: a public, instance-agnostic engine is pinned by version from private brain repos that own their knowledge, configuration, deployment workspace, credentials, and evidence.][image6]](https://www.jackzhaojin.com/portfolio/anima-mesh/media_19c7034a77c23c15fbcb32f160b17ccc6479e9e8f.svg)                      |
+-------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------+
| Showcase (story)                                                        |
+----------------------------------------------------------+--------------+
| Running since *Jul 6, 2026* · cloud primary since Jul 11 |              |
|                                                          |              |
| ### Nine agents, one *approval gate*                     |              |
|                                                          |              |
| From the docs: "the initiative inverts: you stop driving |              |
| the operations and start reviewing them."                |              |
|                                                          |              |
| Nine agent concepts run on daily, weekly, monthly, and   |              |
| quarterly rhythms. Due spokes run sequentially; the hub  |              |
| runs last and reads their fresh reports. Discord and     |              |
| Gmail feed direction runs. A separately credentialed     |              |
| dashboard shows the evidence and can trigger a beat.     |              |
| Role-declared `reads:` paths are inlined into every      |              |
| prompt, with missing context named instead of silently   |              |
| dropped.                                                 |              |
|                                                          |              |
| > "A reply that isn't backed by a commit is a            |              |
| > hallucination with a send button."                     |              |
+----------------------------------------------------------+--------------+
| id                                                       | p-anima-beat |
+----------------------------------------------------------+--------------+

+----------------------------------------------------------------------+
| Panel (pulse)                                                        |
+-----------------------+----------------------------------------------+
| label                 | The daily heartbeat, with production numbers |
+-----------------------+----------------------------------------------+
| replay                | Replay the heartbeat animation               |
+-----------------------+----------------------------------------------+
| The beat · 08:00 America/New\_York, every day                        |
+----------------------------------------------------------------------+
| - **330** ledger entries                                             |
| - **81** agent reports                                               |
| - **38** commits by the mesh                                         |
| - **9** agents on roster                                             |
+----------------------------------------------------------------------+
| ↻ replay the beat                                                    |
+----------------------------------------------------------------------+

+---------------------------------------------------------------------------------------------------+
| Proof Links                                                                                       |
+---------------------------------------------------------------------------------------------------+
| [anima-mesh, the engine ↗](https://github.com/jackzhaojin/anima-mesh) `brain · private by design` |
+-------------------------------------------------+-------------------------------------------------+
| title                                           | The company's own repo stays private by policy  |
+-------------------------------------------------+-------------------------------------------------+

+---------------------------------------------------------------------------+
| Showcase (story, flip)                                                    |
+-----------------------------------------------------------+---------------+
| 57 tags through v2.4.0 · Apache-2.0                       |               |
|                                                           |               |
| ### Safety lives in code, never in prompts                |               |
|                                                           |               |
| Everything between wake-up and gate is model judgment.    |               |
| Gates, ladder, ledger, and verifiers are deterministic    |               |
| code.                                                     |               |
|                                                           |               |
| Five constitutionally gated action classes cover money    |               |
| movement, government filings, publishing, credentials,    |               |
| and access expansion. Three reversible write paths ship   |               |
| today: schedule updates, draft writes, and defect         |               |
| reports. Each request is parsed, checked against the same |               |
| ladder and whitelist gate, and ledgered whether applied   |               |
| or denied.                                                |               |
+-----------------------------------------------------------+---------------+
| id                                                        | p-anima-rules |
+-----------------------------------------------------------+---------------+

+-------------------------------------------------------------------------------+
| Panel (glossary)                                                              |
+-------------------+-----------------------------------------------------------+
| label             | The project's own vocabulary                              |
+-------------------+-----------------------------------------------------------+
| Its own vocabulary · click a word                                             |
+-------------------+-----------------------------------------------------------+
| company-of-0      | An organization whose entire back office is run by        |
|                   | agents. Humans supply judgment and signatures, nothing    |
|                   | else.                                                     |
+-------------------+-----------------------------------------------------------+
| the beat          | One daily Durable Object alarm. Read the brain, run the   |
|                   | due agents, verify in code, commit once, deliver a brief. |
+-------------------+-----------------------------------------------------------+
| autonomy ladder   | L1 report-only → L2 draft-for-approval → L3 whitelisted   |
|                   | reversible actions → L4 external actions. Promotion is a  |
|                   | frontmatter edit with git history as the record.          |
+-------------------+-----------------------------------------------------------+
| a direction       | An inbound message from the human that becomes one        |
|                   | agentic run. The second entry point, budgeted at 20 per   |
|                   | day.                                                      |
+-------------------+-----------------------------------------------------------+
| propose / dispose | A fenced block in a model's output. Applied only through  |
|                   | the gate, always ledgered. Model judgment proposes;       |
|                   | deterministic code disposes.                              |
+-------------------+-----------------------------------------------------------+
| nags              | Reminders that ride in every prompt and repeat every      |
|                   | beat, with age, until done.                               |
+-------------------+-----------------------------------------------------------+
| select a term.                                                                |
+-------------------------------------------------------------------------------+

+-------------------------------------------+
| Stat Chips                                |
+-------------------------------------------+
| - **3** gated write paths                 |
| - **2** fetch-only cloud harnesses        |
| - **1** evidence commit per beat or drain |
+-------------------------------------------+

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Proof Links                                                                                                                                                                                       |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [Architecture notes ↗](https://github.com/jackzhaojin/anima-mesh/blob/main/docs/architecture.md) [Scrubbed sample brain ↗](https://github.com/jackzhaojin/anima-mesh/tree/main/docs/sample-brain) |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------------------------------------------+
| Showcase (story)                                                                                                     |
+------------------------------------------------------------+---------------------------------------------------------+
| *Aug 3, 2026* · community talk, AI Tinkerers Columbus      | The recorded talk, AI Tinkerers Columbus                |
|                                                            |                                                         |
| ### AnimaMesh: An Engine for Running a Company with Agents | [Watch the recorded talk](https://youtu.be/zYytfy1PAkc) |
|                                                            |                                                         |
| The Company of Zero demo: one open source engine on        |                                                         |
| Cloudflare Workers, a private markdown brain per company,  |                                                         |
| and agents that bring me the day's work. It took second    |                                                         |
| place in AI Tinkerers' global Top AI Demos that week.      |                                                         |
+------------------------------------------------------------+---------------------------------------------------------+
| id                                                         | ai-tinkerers-2026-animamesh                             |
+------------------------------------------------------------+---------------------------------------------------------+

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Proof Links                                                                                                                                                                                                  |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [Read the write-up](/writing/2026-08-15-anima-mesh-company-of-zero/) [Top AI Demos #40 ↗](https://post-training.aitinkerers.org/p/top-ai-demos-40-zero-cost-companies-declarative-agents-and-llm-world-sims) |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+-----------------------------------------------------------------------------------------------------------------------+
| Panel (edge)                                                                                                          |
+-----------------------------------------------------------+-----------------------------------------------------------+
| label                                                     | Project context and evidence                              |
+-----------------------------------------------------------+-----------------------------------------------------------+
| What this project collects                                                                                            |
+-----------------------------------------------------------+-----------------------------------------------------------+
| #### Four coordination approaches                         | #### Operational evidence                                 |
|                                                           |                                                           |
| Three coordinator systems came before it, each with a     | The private brain records 38 commits authored by the      |
| different coupling: the continuous agent below, a tightly | mesh, 330 append-only ledger entries, and 81 reports      |
| coupled monolith; the conversion factory's hub and four   | since July 6. The cloud schedule and the repo history are |
| spokes; and the content factory's loosely coupled A2A     | the evidence surfaces; the portfolio only summarizes      |
| mesh. Anima Mesh is the extracted lesson: keep            | them.                                                     |
| coordination in shared state and model judgment, while    |                                                           |
| deterministic code owns gates, ledgers, verification, and |                                                           |
| scheduling.                                               |                                                           |
+-----------------------------------------------------------+-----------------------------------------------------------+
| "The initiative inverts: you stop driving the company's operations and start reviewing them."                         |
+-----------------------------------------------------------------------------------------------------------------------+

+------------------------------------+
| Section Metadata                   |
+---------+--------------------------+
| id      | ch-anima                 |
+---------+--------------------------+
| style   | chapter, anima, flagship |
+---------+--------------------------+

---

## Related

+-----------------------------------------------------------+
| Row List (related, dynamic)                               |
+--------------+--------------------------------------------+
| Source       | [/writing-index.json](/writing-index.json) |
+--------------+--------------------------------------------+

---

[All projects](/portfolio/)

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Metadata                                                                                                                                                                                                                                                    |
+-----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| title           | Anima Mesh \| Jack Jin                                                                                                                                                                                                                    |
+-----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| description     | AnimaMesh runs a mesh of private brains with agents: a person's life, a company, and the teams inside it, with a human as the approval gate.                                                                                              |
+-----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| template        | portfolio                                                                                                                                                                                                                                 |
+-----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image           | ![AnimaMesh cloud architecture: Discord and a browser connect to separate Cloudflare Workers; Heartbeat and Direction Durable Objects run against a private GitHub brain, read-only context sources, and fetch-based model APIs.][image0] |
+-----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| project-order   | 1                                                                                                                                                                                                                                         |
+-----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| project-dates   | 2026                                                                                                                                                                                                                                      |
+-----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| project-kind    | ad hoc                                                                                                                                                                                                                                    |
+-----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| project-anchors | ch-anima p-anima-arch p-anima-diagrams p-anima-beat p-anima-rules                                                                                                                                                                         |
+-----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_14d1ac0ad972a1c6f26b89203d3287054e1dcc6d6.svg#width=1280&height=1000

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_1c6fb199d61ab20c5cee4193bfc9059e82a8f88e8.svg#width=1280&height=1010

[image2]: https://main--www-eds--jackzhaojin.aem.page/media_109642e92e2eb13f6c9a0127a81728473fd32ce20.svg#width=1280&height=880

[image3]: https://main--www-eds--jackzhaojin.aem.page/media_12bba0e49da938253ad97bdeaeb91bd810c27a499.svg#width=1280&height=1100

[image4]: https://main--www-eds--jackzhaojin.aem.page/media_1df7dfe6c3bc119c8c99771f9d79124f35ad47a89.svg#width=1280&height=760

[image5]: https://main--www-eds--jackzhaojin.aem.page/media_177b789b8c2a0e2b31ebfeab54716fc13c7555b8a.svg#width=1280&height=760

[image6]: https://main--www-eds--jackzhaojin.aem.page/media_19c7034a77c23c15fbcb32f160b17ccc6479e9e8f.svg#width=1280&height=980
