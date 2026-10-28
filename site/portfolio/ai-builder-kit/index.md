+-----------------------------------------------------------------------------------------------------------------------+
| Chapter Head                                                                                                          |
+-----------------------------------------------------------------------------------------------------------------------+
| # AI Builder Kit<br>*Skills anyone can install*                                                                       |
|                                                                                                                       |
| Mar - Jun 2026 · 54 commits · a public plugin marketplace                                                             |
|                                                                                                                       |
| **ad hoc** skill by skill, as the need came up. Each ships docs and guardrails; the heaviest one ships its own evals. |
|                                                                                                                       |
| A Claude Code plugin marketplace: nine published skills, written so that people other than the author can install and |
| use them. Two of them get detail here, because they carry the most engineering.                                       |
+-----------------------------------------------------------------------------------------------------------------------+

+--------------------------------------------------------------------------------------------------------------------------------------+
| Showcase (story)                                                                                                                     |
+-----------------------------------------------------------+--------------------------------------------------------------------------+
| Featured skill · Playwright spec → narrated MP4           | A demo video produced by the playwright-demo-video skill                 |
|                                                           |                                                                          |
| ### A test file becomes a demo video                      | [Watch the demo on YouTube](https://www.youtube.com/watch?v=W1wD5tKoF3M) |
|                                                           |                                                                          |
| The rule that makes it work: you cannot narrate what      |                                                                          |
| doesn't exist.                                            |                                                                          |
|                                                           |                                                                          |
| One command records the spec with exact per-action        |                                                                          |
| timestamps, generates ElevenLabs voiceover from the       |                                                                          |
| captions in the test file, and merges freeze-frames and   |                                                                          |
| music into the finished MP4. Before any narration is      |                                                                          |
| written, a mandatory stage zero verifies the app has real |                                                                          |
| data and runs an exploration spec cataloging what         |                                                                          |
| Playwright can actually see. Scenes are built one at a    |                                                                          |
| time, each recorded and verified before the next.         |                                                                          |
+-----------------------------------------------------------+--------------------------------------------------------------------------+
| id                                                        | p-kit-video                                                              |
+-----------------------------------------------------------+--------------------------------------------------------------------------+

+------------------------------------------------------------------------------------------------------------------+
| Proof Links                                                                                                      |
+------------------------------------------------------------------------------------------------------------------+
| [The skill, in the repo ↗](https://github.com/jackzhaojin/ai-builder-kit/tree/main/skills/playwright-demo-video) |
+------------------------------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Showcase (story, flip)                                                                                                                                                                                                                                                                                                                                                              |
+-----------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Featured skill · text → draw\.io XML → rendered PNG       | [![Reference output of the drawio skill: an agentic harness diagram with a four-color semantic palette, deterministic processor, planning and task agents, and dashed human-readable handoff loops.][image0]](https://www.jackzhaojin.com/portfolio/ai-builder-kit/media_168b9e496e080be4a8c8f483745a3198e45dad030.png) |
|                                                           |                                                                                                                                                                                                                                                                                                                         |
| ### Diagrams that check their own work                    | The skill's reference output. The four-color semantic palette here is the same one on diagrams across this page.                                                                                                                                                                                                        |
|                                                           |                                                                                                                                                                                                                                                                                                                         |
| The skill writes the XML, exports a PNG through the       |                                                                                                                                                                                                                                                                                                                         |
| draw\.io CLI, then reads the image back and fixes what    |                                                                                                                                                                                                                                                                                                                         |
| looks wrong.                                              |                                                                                                                                                                                                                                                                                                                         |
|                                                           |                                                                                                                                                                                                                                                                                                                         |
| Every diagram goes through a render-view-fix loop,        |                                                                                                                                                                                                                                                                                                                         |
| usually two to four passes, with versioned files kept as  |                                                                                                                                                                                                                                                                                                                         |
| iteration history. An eight-question interview with       |                                                                                                                                                                                                                                                                                                                         |
| recommended defaults settles the decisions that shape the |                                                                                                                                                                                                                                                                                                                         |
| result: frames, flow direction, color axis, how           |                                                                                                                                                                                                                                                                                                                         |
| exceptions are marked. The style rules live in reference  |                                                                                                                                                                                                                                                                                                                         |
| files the skill must read before generating, because the  |                                                                                                                                                                                                                                                                                                                         |
| rules interact.                                           |                                                                                                                                                                                                                                                                                                                         |
|                                                           |                                                                                                                                                                                                                                                                                                                         |
| The skill also ships its own eval harness: two benchmark  |                                                                                                                                                                                                                                                                                                                         |
| diagrams, graded by a script against roughly twenty       |                                                                                                                                                                                                                                                                                                                         |
| assertions each, XML mechanics and brand rules alike. The |                                                                                                                                                                                                                                                                                                                         |
| baseline run without the skill passed 15 of 18            |                                                                                                                                                                                                                                                                                                                         |
| assertions; with the skill, all of them. The second       |                                                                                                                                                                                                                                                                                                                         |
| iteration folded review findings back in as three new     |                                                                                                                                                                                                                                                                                                                         |
| assertions per eval, and the runs are kept in the repo. A |                                                                                                                                                                                                                                                                                                                         |
| skill you can't score is a skill you can't improve.       |                                                                                                                                                                                                                                                                                                                         |
+-----------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| id                                                        | p-kit-drawio                                                                                                                                                                                                                                                                                                            |
+-----------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Proof Links                                                                                                                                                                                                           |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [The skill, in the repo ↗](https://github.com/jackzhaojin/ai-builder-kit/tree/main/skills/drawio) [Its evals, with the benchmark runs ↗](https://github.com/jackzhaojin/ai-builder-kit/tree/main/skills/drawio/evals) |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Showcase (story)                                                                                                                                                      |
+-----------------------------------------------------------+-----------------------------------------------------------------------------------------------------------+
| *Mar - Jun 2026* · shipped skills, in the wild            | ![Hand-drawn diagram mapping AI skills to team enablement objectives: one skill node, many hands][image1] |
|                                                           |                                                                                                           |
| ### The toolbox, published                                | One skill node, many hands. The moment personal tooling became team enablement.                           |
|                                                           |                                                                                                           |
| drawio diagrams · branded decks · Playwright demo videos  |                                                                                                           |
| · conversation loggers · an auditable HLX admin executor. |                                                                                                           |
| Install, don't rebuild.                                   |                                                                                                           |
|                                                           |                                                                                                           |
| The rest of the shelf: the HLX admin skill wraps an admin |                                                                                                           |
| API so configuration becomes describe, review the diff,   |                                                                                                           |
| apply. Branded decks, conversation loggers, a structured  |                                                                                                           |
| git-commit skill, competing-PR triage, and an             |                                                                                                           |
| AI-knowledge harvester round it out. Each ships with its  |                                                                                                           |
| own docs and guardrails.                                  |                                                                                                           |
+-----------------------------------------------------------+-----------------------------------------------------------------------------------------------------------+
| id                                                        | p-kit                                                                                                     |
+-----------------------------------------------------------+-----------------------------------------------------------------------------------------------------------+

+----------------------------------+
| Stat Chips                       |
+----------------------------------+
| - **9** published skills         |
| - **54** commits, Mar - Jun 2026 |
+----------------------------------+

+-------------------------------------------------------------------+
| Proof Links                                                       |
+-------------------------------------------------------------------+
| [ai-builder-kit ↗](https://github.com/jackzhaojin/ai-builder-kit) |
+-------------------------------------------------------------------+

+------------------------+
| Section Metadata       |
+---------+--------------+
| id      | ch-kit       |
+---------+--------------+
| style   | chapter, kit |
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

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Metadata                                                                                                                                                                                                                      |
+-----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| title           | AI Builder Kit \| Jack Jin                                                                                                                                                                                  |
+-----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| description     | A Claude Code plugin marketplace: nine published skills, written so that people other than the author can install and use them.                                                                             |
+-----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| template        | portfolio                                                                                                                                                                                                   |
+-----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image           | ![Reference output of the drawio skill: an agentic harness diagram with a four-color semantic palette, deterministic processor, planning and task agents, and dashed human-readable handoff loops.][image0] |
+-----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| project-order   | 4                                                                                                                                                                                                           |
+-----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| project-dates   | 2026                                                                                                                                                                                                        |
+-----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| project-kind    | ad hoc                                                                                                                                                                                                      |
+-----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| project-anchors | ch-kit p-kit-video p-kit-drawio p-kit                                                                                                                                                                       |
+-----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_168b9e496e080be4a8c8f483745a3198e45dad030.png#width=944&height=844

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_10e69e5d16239b688fa7ed51e4499dce5918084ff.png#width=2322&height=943
