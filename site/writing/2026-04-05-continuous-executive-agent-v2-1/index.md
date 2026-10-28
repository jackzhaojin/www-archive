1. [Home](/)
2. [Technical Writing](/writing/)
3. 24/7 Coding Agent v2.1

# A 24/7 Coding Agent at v2.1: An Executive Loop, Swappable Workers and When to Ask a Human

By [Jack Jin](/) · April 5, 2026 · Updated October 4, 2026 · 15 min read · Includes my 19:46 video

A harness still needs you to start it. This is what it takes to keep one going around the clock, from the Continuous Executive Agent at v2.1: an executive loop under PM2 that picks goals off a queue and breaks them into steps, workers on Claude, Codex or Kimi K2.5 behind one interface, deterministic validation, an agentic diagnosis from the third failure and a hand-off to a human at ten. With the code at the release I demoed at AI Tinkerers Columbus on April 6, 2026, a recorded walkthrough and the live Q\&A.

---

+------------------------------------------------------------------------------------+
| Rail                                                                               |
+----------------------------------------+-------------------------------------------+
|                                        | **Part 1**\                               |
|                                        | [A harness still needs you](#why)         |
+----------------------------------------+-------------------------------------------+
| ![][image0]                            | **Part 2**\                               |
|                                        | [Executive, workers, two repos](#layers)  |
+----------------------------------------+-------------------------------------------+
| ![][image1]                            | **Part 3**\                               |
|                                        | [Retry, diagnose, ask a human](#failure)  |
+----------------------------------------+-------------------------------------------+
| ![][image2]                            | **Part 4**\                               |
|                                        | [v1.1 and v1.2: logs, a workspace](#v1)   |
+----------------------------------------+-------------------------------------------+
| ![][image3]                            | **Part 5**\                               |
|                                        | [v1.3: credentials, a demo video](#v13)   |
+----------------------------------------+-------------------------------------------+
| ![][image4]                            | **Part 6**\                               |
|                                        | [v2.0: accounts, skills, dashboard](#v20) |
+----------------------------------------+-------------------------------------------+
| ![][image5]                            | **Part 7**\                               |
|                                        | [v2.1: Codex, Kimi, a bigger build](#v21) |
+----------------------------------------+-------------------------------------------+
|                                        | **Part 8**\                               |
|                                        | [Harnesses inside the agent](#v22)        |
+----------------------------------------+-------------------------------------------+
| ![][image6]                            | **Part 9**\                               |
|                                        | [Questions from the room](#questions)     |
+----------------------------------------+-------------------------------------------+
|                                        | **Wrap-up**\                              |
|                                        | [Harnesses first, then v3.0](#next)       |
+----------------------------------------+-------------------------------------------+
| [Watch the walkthrough, 19:46](#video)                                             |
|                                                                                    |
| [Watch the live talk, 10:58](#video-live)                                          |
|                                                                                    |
| [Code on GitHub](https://github.com/jackzhaojin/continuous-agent/tree/0717635)     |
+------------------------------------------------------------------------------------+

---

The walkthrough is the main video. It goes release by release, and so does this page. Every part links to its moment in the video if you'd rather watch.

---

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure                                                                                                                                                                                                                                                                      |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [I Built a 24/7 Coding Agent That Codes While I Sleep](https://youtu.be/hxJpum9fNaU)                                                                                                                                                                                        |
|                                                                                                                                                                                                                                                                             |
| Recorded April 18, 2026, as a virtual version of the talk plus what I built after it. Each part below links to its moment, or [watch it on YouTube](https://youtu.be/hxJpum9fNaU). The live talk from April 6 is further down, under [questions from the room](#questions). |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Fine Print                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Code: [continuous-agent](https://github.com/jackzhaojin/continuous-agent/tree/0717635) at `v2.1.4` (`0717635`), tagged the evening before the talk. Deck: [15 slides, in the repo](https://github.com/jackzhaojin/continuous-agent/blob/e43ae97/docs/technical-highlights/2.2/2026-04-06-ai-tinkerer-pre-session-slides.pdf). I gave the talk at [AI Tinkerers Columbus on April 6, 2026](/talks/ai-tinkerers-2026/), and it was featured in AI Tinkerers' global [Community Spotlights](https://post-training.aitinkerers.org/p/ai-tinkerers-23-community-spotlights), picked from hundreds of demos. First published on LinkedIn on April 5, 2026. Rewritten for this site in October 2026. |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| id      | video  |
+---------+--------+

---

## 1. A harness still needs you to start it

Before we talk about 24/7 agents, we have to talk about harnesses. A harness is a layer on top of a coding agent that puts the prompts in for you. If you do spec-driven development, you end up typing the same prompts over and over in the same pattern, and at some point you think: if only the AI would put in the prompts for me. That's a harness. I wrote about [how I build them](/writing/2026-01-05-from-prompts-to-harness/) in January.

At the talk I asked the room three questions. Who has done spec-driven development? A good number of hands. Who has built a harness they're happy with? Two or three. Who has put that harness in a 24/7 loop? One hand. Everyone starts on the left: ad hoc prompting, then specs, then skills, then harnesses to build great things. I wanted to see what comes next.

I had three reasons to go past a harness:

1. I still have to start it. The harness might do very meaningful work, and it's probably where the sweet spot is, but I still put in the prompt packet and kick it off.
2. Nothing runs back to back. If I have five harnesses to run, I start every one of them myself.
3. Logging and observability are on me. Tracking how a run is going and managing everything the harnesses produce is my own due diligence, with no central place for it.

So I built my own claw, an always-on agent in the spirit of OpenClaw, focused on 24/7 development. In the video I call it my AI dark factory: a claw that keeps coding and building around the clock.

Watch this part [0:27 Harnesses first](https://youtu.be/hxJpum9fNaU?t=27) [1:09 Three reasons to go further](https://youtu.be/hxJpum9fNaU?t=69) [0:00 The three questions, live](https://youtu.be/l3wIHurjERk?t=0)

+------------------+
| Section Metadata |
+---------+--------+
| id      | why    |
+---------+--------+

---

## 2. An executive loop, separate workers and two repos

The agent has three layers.

The first is the executive. It mixes deterministic and agentic parts. PM2, the Node process manager, keeps it alive. A TypeScript loop runs the same phases on every iteration: check the inbox, health check, process my inputs, select work, break it down, execute, validate, update state, diagnose and escalate. The decisions inside those phases, like which goal is next, how to split it and why a build failed, are agentic. They live in executive skills that used to be prompt files.

I didn't expect that much deterministic code. I ended up with a crazy amount of TypeScript, because I wanted things done my way rather than left to the agent. I think everyone building agents and harnesses ends up mixing the two.

The second layer is the workers. Very early on I decided the worker would be separate from the executive, with its own instructions and its own skills. Think of a management team and a working team. The workers are good at coding. Reports, retrospectives and escalations flow back up to the executive.

The third is two repos. The agent itself lives in `continuous-agent`. Everything the workers build goes into a second repo, `ai-sandbox`, filed by day and project type. The agent's constitution says workers never write to the agent's own codebase. Keeping every project means I can go back later, fire it up, see how the build went and run a retrospective on it.

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Hand-drawn diagram, Continuous Coding Agent v2.1 System Architecture. Executive Brain: Phase 1 health check, Phase 2 human inputs from needs-you and the queue, Phase 3 work selection P0 to P4, Phase 3b goal breakdown into 2 to 5 steps, a prompt builder with a vendor adapter, skills and rules, goal bundles, and state and ledgers in Notion, Discord and work-ledger.jsonl. Worker Execution: Phase 4 worker spawner with a vendor registry sending work to the Claude Agent SDK, the OpenAI Codex SDK or Kimi K2.5, all writing to the ai-sandbox output monorepo with GitHub Pages deploy. Feedback Loop: Phase 5 validation, a strategy selector on failure, Phase 7 agentic diagnosis after three failures, Phase 8 block to needs-you.md after ten. Notes: runs 24/7 via PM2, and the two-repo architecture.][image7] |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| The system map I showed at the talk. Purple boxes are agentic, blue are deterministic, green are me or an outside system, orange are worker vendors.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Watch this part [2:32 The three layers](https://youtu.be/hxJpum9fNaU?t=152) [1:05 All that TypeScript, live](https://youtu.be/l3wIHurjERk?t=65) [1:50 A management team and a working team](https://youtu.be/l3wIHurjERk?t=110)

+------------------+
| Section Metadata |
+---------+--------+
| id      | layers |
+---------+--------+

---

## 3. A failing goal retries, gets a diagnosis, then asks a human

The bottom row of that diagram matters most when nobody is watching. After a worker finishes, Phase 5 runs deterministic verifiers against the worker's output folder: does it build, and are the definition-of-done items there. A failure is counted, and the goal goes back into the loop. The retry prompt tells the worker which attempt it is on, what the last error was, and that it must try a different approach. The approaches themselves live in a strategy bank in [`strategy-selector.ts`](https://github.com/jackzhaojin/continuous-agent/blob/0717635/src/agentic/intelligence/strategy-selector.ts#L31-L190): scaffold first, minimal manual setup, copy a working example, decompose the problem and a few more.

From the third failure, Phase 7 runs an agentic diagnosis. A model reads the failure and returns a root cause, a suggested fix, and whether to retry or escalate. At ten attempts, the limit in the agent's constitution, Phase 8 blocks the goal, writes it to `needs-you.md` and sends a Discord message. Then the loop moves on to the next goal. This is the failure path in the code I demoed:

+------------------------------------------------------------------------------------------------------------------------+
| Code (wrap)                                                                                                            |
+------------------------------------------------------------------------------------------------------------------------+
| src/core/executive-loop.ts, lines 645 to 719, trimmed                                                                  |
|                                                                                                                        |
| [0717635 on GitHub](https://github.com/jackzhaojin/continuous-agent/blob/0717635/src/core/executive-loop.ts#L645-L719) |
+------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                    |
|   // === PHASE 7: AGENTIC DIAGNOSIS (after 3 failures) ===                                                             |
|   if (retry.attempts >= 3) {                                                                                           |
|     logAgentic('PHASE 7: Agentic Diagnosis (Investigate Failure)');                                                    |
|     …                                                                                                                  |
|     if (diagnosis.escalateToHuman) {                                                                                   |
|       logAgentic('  Decision: Escalate to human (needs-you.md)');                                                      |
|       …                                                                                                                |
|       return 'work_failed';                                                                                            |
|     }                                                                                                                  |
|                                                                                                                        |
|     if (diagnosis.shouldRetry && diagnosis.suggestedFix) {                                                             |
|       logAgentic('  Decision: Apply suggested fix and retry');                                                         |
|       …                                                                                                                |
|       return 'work_failed'; // Will retry next iteration                                                               |
|     }                                                                                                                  |
|                                                                                                                        |
|     logAgentic('  Decision: Continue normal retry logic');                                                             |
|   }                                                                                                                    |
|                                                                                                                        |
|   // === PHASE 8: MAX RETRIES REACHED ===                                                                              |
|   if (retry.attempts >= MAX_RETRIES) {                                                                                 |
|     logDeterministic('PHASE 8: Max Retries Reached (Constitution Limit)');                                             |
|     …                                                                                                                  |
|     await writeToNeedsYou(workItem, retry.attempts, retry.lastError, contractId);                                      |
|     …                                                                                                                  |
|     return 'work_failed';                                                                                              |
|   }                                                                                                                    |
|                                                                                                                        |
|   // Continue retrying                                                                                                 |
|   return 'work_failed';                                                                                                |
| ```                                                                                                                    |
+------------------------------------------------------------------------------------------------------------------------+

Four things can happen to a goal on that path. Pick one to see the attempts it takes and the log the executive writes along the way, using the code's own messages. The fourth is an edge case I found reading the code, and the one worth knowing if you build a loop like this: the limit only fires when the diagnosis has no fix to offer.

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Explainer (retry ladder)                                                                                                                                                                                                                                                            |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| A goal on the failure path of executive-loop.ts at v2.1.4 (simulated goal, real branches)                                                                                                                                                                                           |
|                                                                                                                                                                                                                                                                                     |
| [source](https://github.com/jackzhaojin/continuous-agent/blob/0717635/src/core/executive-loop.ts#L583-L719)                                                                                                                                                                         |
+-------------------------------------------------------+------------------------------------------------------+-------------------------------------------------------+------------------------------------------------------+-------------------------------------------------------+
| Passes on the second try                              | 1                                                    |                                                       | pass                                                 | Passed on the second try.                             |
|                                                       |                                                      |                                                       |                                                      | Under three failures there is                         |
|                                                       |                                                      |                                                       |                                                      | no diagnosis: the retry                               |
|                                                       |                                                      |                                                       |                                                      | prompt carries the last error                         |
|                                                       |                                                      |                                                       |                                                      | and asks for a different                              |
|                                                       |                                                      |                                                       |                                                      | approach.                                             |
+-------------------------------------------------------+------------------------------------------------------+-------------------------------------------------------+------------------------------------------------------+-------------------------------------------------------+
| Never passes, no fix found                            | 10                                                   | Decision: Continue normal                             | blocked                                              | Blocked after 10 failed                               |
|                                                       |                                                      | retry logic                                           |                                                      | attempts, the limit in the                            |
|                                                       |                                                      |                                                       |                                                      | constitution. The goal goes                           |
|                                                       |                                                      |                                                       |                                                      | to needs-you.md, Discord                              |
|                                                       |                                                      |                                                       |                                                      | pings me, and the loop moves                          |
|                                                       |                                                      |                                                       |                                                      | on to the next goal.                                  |
+-------------------------------------------------------+------------------------------------------------------+-------------------------------------------------------+------------------------------------------------------+-------------------------------------------------------+
| Diagnosis asks for a human                            | 3                                                    | Decision: Escalate to human                           | escalated                                            | Blocked early, after 3                                |
|                                                       |                                                      | (needs-you.md)                                        |                                                      | attempts. The diagnosis                               |
|                                                       |                                                      |                                                       |                                                      | decided this needs a human,                           |
|                                                       |                                                      |                                                       |                                                      | so the goal goes to                                   |
|                                                       |                                                      |                                                       |                                                      | needs-you.md with the                                 |
|                                                       |                                                      |                                                       |                                                      | diagnosis attached.                                   |
+-------------------------------------------------------+------------------------------------------------------+-------------------------------------------------------+------------------------------------------------------+-------------------------------------------------------+
| Diagnosis keeps suggesting                            | 12                                                   | Decision: Apply suggested fix                         | running                                              | Still retrying at attempt 12,                         |
| fixes                                                 |                                                      | and retry                                             |                                                      | past the limit of 10. A                               |
|                                                       |                                                      |                                                       |                                                      | suggested fix returns before                          |
|                                                       |                                                      |                                                       |                                                      | the limit check, so the limit                         |
|                                                       |                                                      |                                                       |                                                      | never fires while the                                 |
|                                                       |                                                      |                                                       |                                                      | diagnosis keeps finding                               |
|                                                       |                                                      |                                                       |                                                      | fixes.                                                |
+-------------------------------------------------------+------------------------------------------------------+-------------------------------------------------------+------------------------------------------------------+-------------------------------------------------------+
| Failed attempts on this goal                          | What the executive logs                                                                                                                                                                                                     |
+-------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| - failed, retried with a different approach                                                                                                                                                                                                                                         |
| - failed, diagnosis ran                                                                                                                                                                                                                                                             |
| - failed, diagnosis suggested a fix                                                                                                                                                                                                                                                 |
| - passed                                                                                                                                                                                                                                                                            |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| - limit: 10                                                                                                                                                                                                                                                                         |
| - diagnosis: 3                                                                                                                                                                                                                                                                      |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                                                                                                                                                                                 |
| PHASE 6: Update State (Failure)                                                                                                                                                                                                                                                     |
|   Attempt 1/10 failed                                                                                                                                                                                                                                                               |
| PHASE 6: Update State (Failure)                                                                                                                                                                                                                                                     |
|   Attempt 2/10 failed                                                                                                                                                                                                                                                               |
| PHASE 6: Update State (Failure)                                                                                                                                                                                                                                                     |
|   Attempt 3/10 failed                                                                                                                                                                                                                                                               |
| PHASE 7: Agentic Diagnosis (Investigate Failure)                                                                                                                                                                                                                                    |
|   Decision: Continue normal retry logic                                                                                                                                                                                                                                             |
|   # attempts 4 to 9 repeat the same pattern                                                                                                                                                                                                                                         |
| PHASE 6: Update State (Failure)                                                                                                                                                                                                                                                     |
|   Attempt 10/10 failed                                                                                                                                                                                                                                                              |
| PHASE 7: Agentic Diagnosis (Investigate Failure)                                                                                                                                                                                                                                    |
|   Decision: Continue normal retry logic                                                                                                                                                                                                                                             |
| PHASE 8: Max Retries Reached (Constitution Limit)                                                                                                                                                                                                                                   |
|   Marking as blocked after 10 attempts                                                                                                                                                                                                                                              |
| ```                                                                                                                                                                                                                                                                                 |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| A simplified model of one goal. The branches, the limits (diagnosis from the third failure, block at ten) and the log messages come from `executive-loop.ts` at `0717635`; the goal and the diagnosis answers are made up. Purple lines are agentic, light lines are deterministic. |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Two details are worth knowing if you build something similar. A diagnosis that suggests a fix returns before the ten-attempt check, so a goal keeps retrying past ten as long as the diagnosis keeps finding fixes. And the attempt count is written to `STEPS.json`, so a PM2 restart doesn't reset it.

When the agent needs me, it writes to `workspace/needs-you.md`: a table with the action, why it can't do it, and a column for my response. I answer with `[APPROVED]`, `[DECISION]`, `[INFO]` or `[SKIP]`, and the deck says it picks that up within about 30 seconds. The constitution sets the hard limits around all of this.

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Deck slide, Safety and Intelligence: Key Systems. The Constitution: eight immutable hard limits in workspace/constitution.md that the agent cannot override, enforced at the deterministic layer: no spending beyond $20 per month per service, no permanent deletions, no external publishing without approval, no credential exposure, no access control expansion, no output in the agent codebase, all activity must be logged, ten retries minimum before blocking. Human Interaction through workspace/needs-you.md with APPROVED, DECISION, INFO and SKIP responses. A retry system with strategy rotation: simplify scope, research first, break into subtasks, different tools.][image8] |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Slide 7 of the deck: the eight limits the agent can't override, and how it asks me for help.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Watch this part [16:12 The diagram from the talk](https://youtu.be/hxJpum9fNaU?t=972)

+-------------------+
| Section Metadata  |
+---------+---------+
| id      | failure |
+---------+---------+

---

## 4. v1.1 and v1.2 set up turn-by-turn logs and a workspace for prompt packets

I do believe the 24/7 agent makes a lot more sense if we start from the beginning. The git tags give the timeline: v1.0 on January 24, v1.1 on January 25, v1.2 on January 28 and v1.3 on February 4.

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                        |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Deck slide, Evolution: From v1.0 to v2.1. Six release cards: 1.0 Foundation, January 24, 2026; 1.1 Intelligence, January 25; 1.2 Organization, January 28; 1.3 Security, February 4; 2.0 Identity, March 29; 2.1 Multi-Vendor, April 1, marked latest. Footer: 65 plus days, 5 releases, 40 plus features.][image9] |
|                                                                                                                                                                                                                                                                                                                       |
| Slide 8 of the deck: the releases up to the talk, with what each one added.                                                                                                                                                                                                                                           |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

The beginning has humble roots. After many tries over two days, the agent produced a fairly simple app that works: a transaction manager where you add and remove transactions, saved in local storage so a refresh doesn't lose them. A very straightforward proof of concept.

What it set up mattered more than the app. From the very first days I logged every worker's interaction with the Claude Agent SDK turn by turn, for every worker task, and kept track of what the executive was doing too. So there was observability at the executive level, the worker level and the turn level: exactly what went in and exactly what happened. Since v1.1, my AI and I have been able to use that history to improve how workers do things.

v1.2 brought the workspace. Work moves through workflow states (drafts, on deck, in progress by priority, completed), with templates so the AI or I can write input packets. I don't think of prompts when building something 24/7. You don't give it a simple prompt; you give it a prompt packet, a large set of material to build from over a long time. Every completed goal keeps its steps, its progress log and its handoff documents.

The other big feature of v1.2 was Notion. Agents build through the night while I'm sleeping, and Notion gives me something readable instead of digging through executive logs and ledgers. That early version was still buggy, and I didn't have good work classifications yet.

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Compare (touch)                                                                                                                                                                                                                                                                                                                              |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| First app, v1.1         | ![The Transaction Manager app on localhost: total income, total expenses and balance cards, an add transaction form, and a recent transactions list with one food entry][image10]                                                                                                                                  |
|                         |                                                                                                                                                                                                                                                                                                                    |
|                         | The first app the agent built: a transaction manager that keeps its data in local storage.                                                                                                                                                                                                                         |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| A goal bundle, v1.2     | ![The workspace in VS Code: completed goal folders on the left, and the PROMPT.md of a Full-Stack Retro Analytics Dashboard goal with frontmatter for title, slug, status complete, priority P2, complexity high, tags and an output path in ai-sandbox, next to its progress log and step handoff files][image11] |
|                         |                                                                                                                                                                                                                                                                                                                    |
|                         | A completed goal bundle: PROMPT.md with its frontmatter, a progress log and a handoff file for each step.                                                                                                                                                                                                          |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Notion milestones, v1.2 | ![The Agent Milestones database in Notion, timeline view for February 1, 2026, showing two SKILL-BUILD rows for a Playwright demo video skill, each with its contract ID][image12]                                                                                                                                 |
|                         |                                                                                                                                                                                                                                                                                                                    |
|                         | Agent Milestones in Notion: one row per worker contract, here the night the demo video skill was built.                                                                                                                                                                                                            |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Watch this part [3:56 From the beginning](https://youtu.be/hxJpum9fNaU?t=236) [4:51 Turn-by-turn logging](https://youtu.be/hxJpum9fNaU?t=291) [5:32 The workspace](https://youtu.be/hxJpum9fNaU?t=332) [6:36 Notion](https://youtu.be/hxJpum9fNaU?t=396)

+------------------+
| Section Metadata |
+---------+--------+
| id      | v1     |
+---------+--------+

---

## 5. v1.3 split credentials into three tiers and made its own demo video

v1.3 was the hardening sprint, and the first version that worked in a somewhat secure manner. I realized my credentials were mismanaged. I never committed them to git, but they were intertwined across everything I was building. Now there are three tiers. The executive has its own credentials. The workers, the ones doing the building, have theirs, for example the keys a Codex or Anthropic worker needs. The apps have a third set. The deck adds that the tiers are physically separate files, and the spawner checks on every run that executive keys never reach a worker.

For apps that need a database, the rule is one Supabase database with a separate schema per app. If I build 60 apps with this agent, I'm not creating 60 Supabase accounts or upgrading my databases.

Something I thought was really cool came next. By then the agent had finished seven or eight projects, and I needed a way to have them demoed back to me. So the agent built a Playwright demo skill, and a worker used it to make a narrated video of the recipe app it had built. I didn't make that video. My prompt packet said I wanted a video at the end of the project, with the bugs fixed while the demo was being generated, and the AI did all of that with a skill it built for itself. Not every day do we have something that's arguably self-improving and then actually works without human intervention. I wrote about the [Playwright demo pattern](/writing/2026-01-29-playwright-stakeholder-demos/) on its own as well.

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                              |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![A frame of the agent-made demo video: the recipe app's Recent Recipes section with Vegan Buddha Bowl, Mediterranean Grilled Chicken Salad and Classic Spaghetti Carbonara cards, and the video's caption, Let's explore all available recipes][image13]                                   |
|                                                                                                                                                                                                                                                                                             |
| A frame from the agent's own 1:21 demo of its recipe app, captions included. The [video file](https://github.com/jackzhaojin/ai-sandbox/blob/monorepo/legacy-v2.2/projects/nextjs/2026-01-29/1769685367609/recipe-discovery-platform/demo-output/demo-final.mp4) is in the ai-sandbox repo. |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Watch this part [7:11 Three credential tiers](https://youtu.be/hxJpum9fNaU?t=431) [8:58 The demo video skill](https://youtu.be/hxJpum9fNaU?t=538)

+------------------+
| Section Metadata |
+---------+--------+
| id      | v13    |
+---------+--------+

---

## 6. v2.0 gave the agent her own accounts, skills and a dashboard

After v1.3 the repo went quiet from early February to late March, until I picked it back up for the AI Tinkerers talk. v2.0, tagged March 29, is a fairly large release, with three big parts.

First, identity. The agent now has her own Gmail account, her own Notion space and her own Discord account, so she can message me whenever it makes sense. Checking her inbox is Phase 0.5 of every loop, so I can send her goals by email, and she posts completions and blocks to her Discord.

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![The agent's Discord channel: three Step Completed messages for the B2B Postal Checkout Flow goal at priority P2, steps 35, 36 and 37 of 55, posted at 2:06, 2:15 and 2:38 AM on April 12, 2026, including an end-to-end journey verification gate][image14] |
|                                                                                                                                                                                                                                                               |
| Her Discord at 2 AM on April 12, during a 55-step run: step completions as they happen, without opening a log.                                                                                                                                                |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Second, skills. In v1.2 and v1.3 I kept rewriting prompt markdown files, at one point around 40 of them, and it felt really awkward. By then I was using skills heavily in my day job and all my other AI projects. So v2.0 took the prompts out and moved them into skills, split into executive skills and worker skills. Letting the AI choose its skills is what makes it more agentic.

Third, something visual. Reading log files and ledgers in the codebase was always a pain. The v2.0 dashboard still reads the same markdown files locally, with some deterministic logic on top: is it running, is it doing anything, is it blocked, what's blocked, what needs me.

Not everything worked on stage. The executive validation loop was the part not working as well as it should, and the Discord notification I expected live during the talk didn't fire. I kept that moment in the recording.

Watch this part [10:21 Agent identity](https://youtu.be/hxJpum9fNaU?t=621) [11:07 Skills instead of prompt files](https://youtu.be/hxJpum9fNaU?t=667) [12:05 The dashboard](https://youtu.be/hxJpum9fNaU?t=725) [3:46 What wasn't working, live](https://youtu.be/l3wIHurjERk?t=226)

+------------------+
| Section Metadata |
+---------+--------+
| id      | v20    |
+---------+--------+

---

## 7. v2.1 added Codex and Kimi K2.5 workers and took on a much bigger build

Right before the talk I started to worry about how long I could keep running Agent SDK workers on my Claude subscription. So the two biggest features of v2.1 were OpenAI Codex and Kimi K2.5 as alternative workers. A vendor registry puts them behind one interface. A goal can name its vendor in its `PROMPT.md` frontmatter with `worker_vendor`, or the `WORKER_VENDOR` environment variable sets it for everything.

How do you make skills work across vendors? I chose not to write separate skills for each one. Instead, each vendor gets a pre-prompt that puts it in the mindset of that agent. I'm a huge Claude person. Kimi K2.5 is a lot cheaper, and its subscription goes a very long way in agentic coding.

To show it off, I fed the exact same prompt packet, a personal finance dashboard, to Claude, to Codex, to Kimi K2.5 through its Wire SDK and to Kimi K2.5 through its CLI. One prompt packet, built four ways. With a harness I'd have to run each of those myself. With the 24/7 agent I just put in the prompt packet and it runs them. I did the Kimi Wire integration for the richer agentic interaction, but the CLI is what I went with going forward.

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Deck slide, Multi-Vendor Worker Support. Three vendor cards: Claude, the default, on the Claude Agent SDK with an OAuth token, score 88 of 130, third place; OpenAI Codex on Codex SDK threads with codex login, score 115 of 130, first place; Kimi K2.5, dual mode with Wire SDK and CLI, scores 92 for the CLI in second place and 87 for Wire in fourth. Below: the same prompt, build a finance dashboard, run across all four vendor modes, deployed at jackzhaojin.github.io/ai-sandbox, with per-goal vendor override in PROMPT.md frontmatter, a normalized AgentWorkerMessage format, end-to-end vendor tests and a GitHub Pages deployment pipeline.][image15] |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Slide 10 of the deck: the four builds of the same finance dashboard, scored out of 130. All four are [deployed in the ai-sandbox](https://www.jackzhaojin.com/ai-sandbox/).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Then I wanted to really challenge it. Instead of a dashboard that takes two or three steps, something that would take 20, 30, 50 steps to finish: a build I had done myself in my early days of spec-driven development, which took me around 40 hours. The goal was a B2B postal checkout flow, and the vendor was Kimi K2.5 through its CLI.

The first try did really badly. The [retrospective](https://github.com/jackzhaojin/continuous-agent/blob/e43ae97/ai-docs/v2/2026-04-01-v2.1/retro-b2b-postal-checkout-v2.1.5.md) says it plainly: the executive re-broke the goal from 6 coarse steps into 32, the worker built more than 40 components and wrote 217 test cases, and the result was an assembly of parts, not a working end-to-end application. The screens looked decent, but they weren't wired to a database, and I had to step in twice to fix bugs in my own code.

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                        |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![The retrospective file on GitHub: Retrospective, B2B Postal Checkout Flow, Longest Autonomous Run. Date April 6, 2026, vendor Kimi CLI in stream-json mode, about 11 hours wall clock, result GOAL\_COMPLETED with 32 of 32 steps, 52 git commits and 217 test cases written, followed by the start of the timeline table][image16] |
|                                                                                                                                                                                                                                                                                                                                       |
| The retrospective I did with the agent on the evening of the talk. Every step was marked complete, and it still wasn't a working app.                                                                                                                                                                                                 |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

It was really good at testing each of the seven screens of the flow on its own, and it never tested end to end, because I never told it to. So instead of fixing the output that night, I tossed the whole thing and had it run again. That's the mentality I'm learning from all this: instead of perfecting the output, you perfect the input, or you perfect the harness. If you think you're only 80% there, throw the output away.

The [second run](https://github.com/jackzhaojin/continuous-agent/blob/e43ae97/ai-docs/v2/2026-04-01-v2.1/retro-b2b-postal-checkout-v2.1.6.md), on April 11 and 12, was much better. It ran longer, it built a lot more, and it did a lot more end-to-end testing, with integration gates inserted every few steps. It finished 55 steps with no human intervention, and the database shows plenty of rows inserted by its tests. It still didn't work end to end as a demoable product. We're making progress, though, and Kimi K2.5 performed fairly well as a worker on both runs.

Watch this part [12:45 Codex and Kimi K2.5](https://youtu.be/hxJpum9fNaU?t=765) [14:16 The bigger challenge](https://youtu.be/hxJpum9fNaU?t=856) [2:42 One pre-prompt per vendor, live](https://youtu.be/l3wIHurjERk?t=162) [4:34 Perfect the input, live](https://youtu.be/l3wIHurjERk?t=274)

+------------------+
| Section Metadata |
+---------+--------+
| id      | v21    |
+---------+--------+

---

## 8. After the talk, harnesses run inside the agent

Before, harnesses and the 24/7 agent were two separate things. After the talk I merged the frameworks into one harness CLI, released as v2.2 on April 12. Harnesses are now defined once, and I can run one inside the 24/7 agent as a goal's execution pattern or on its own. According to the [changelog](https://github.com/jackzhaojin/continuous-agent/blob/e43ae97/CHANGELOG.md), that release brought three harnesses (a generic one, an Edge Delivery site builder and a study harness) and 105 passing tests.

```
# on its own
npm run harness -- --name <name> --prompt <path>

# inside the 24/7 agent, in the goal's PROMPT.md frontmatter
execution_pattern: harness
```

Before this, my harnesses only worked on Claude. Now they also run on Kimi K2.5, because the multi-worker support carried over. Harnesses are probably what's actually useful in a productive sense. This is a tinkering project, so the 24/7 agent gets the attention.

Watch this part [17:10 Harnesses inside the agent](https://youtu.be/hxJpum9fNaU?t=1030)

+------------------+
| Section Metadata |
+---------+--------+
| id      | v22    |
+---------+--------+

---

## 9. Questions from the room on long runs, testing and getting better

AI Tinkerers recorded the live talk on April 6: five minutes of me talking really fast with 15 tabs open, then questions. The answers cover things the walkthrough skips.

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | questions |
+---------+-----------+

---

+----------------------------------------------------------------------------------------------------------------+
| Figure                                                                                                         |
+----------------------------------------------------------------------------------------------------------------+
| [My 24/7 Coding Agent in 5 Minutes: Live Talk and Q\&A at AI Tinkerers Columbus](https://youtu.be/l3wIHurjERk) |
|                                                                                                                |
| Recorded live on April 6, 2026, at AI Tinkerers Columbus. [Watch it on YouTube](https://youtu.be/l3wIHurjERk). |
+----------------------------------------------------------------------------------------------------------------+

### What's the longest problem you've had it work on?

I told the room the longest I'd run it was nine hours. You get there by giving it an overly complex task, with a database layer and a UI layer, something extremely time intensive, and trusting the executive to break it down. The executive loop is very deterministic, but interpreting a task and splitting it into 30, 40 or 60 tasks is agentic. A bigger task comes from a bigger spec package. At that point it's not even a prompt anymore; it's way bigger than the context window.

### How long did you spend on the specification?

Less up front than some approaches people publish. I size the work by turns. I aim for about 60 turns per task, each task has a 200-turn cap, and each one gets an hour. For the run that week I had to restart, because the tasks weren't refined enough, took over 200 turns and failed. And unlike a harness, I want higher priority work to come in first and cut ahead of other tasks.

### Do you test the individual pieces or the whole flow?

Both, at the executive level and the worker level. I really messed up in that iteration: I had end-to-end testing at the module level, but not the whole flow. The executive needs a process for it, and workers need to test the whole flow, not just the thing they're building. Just like real life, you need the management rigor and a team that knows what it's doing. It costs more tokens, and maybe that's what I have to do for now.

### How do you keep the agent online overnight?

Being transparent, my harness is better than my 24-hour agent right now, and I'm not doing a good job of keeping the agent online. It's open source because Robb Winkle, who runs AI Tinkerers Columbus, asked me to open source it, and the code is out there for anyone who wants to try it.

### How does it get better?

I literally do a retrospective with my agent: what was done correctly and what could be done better. That feeds into the input, so the prompt packet gets more detail and runs get more consistent, and into the executive and worker skills. My first version had zero skills. Now I'm all in on skills. If a skill isn't right, we fix it, so next time the AI has a better idea of what it's doing.

Watch this part [5:58 The longest run](https://youtu.be/l3wIHurjERk?t=358) [7:17 Sizing work by turns](https://youtu.be/l3wIHurjERk?t=437) [8:33 Testing the whole flow](https://youtu.be/l3wIHurjERk?t=513) [9:25 Keeping it online](https://youtu.be/l3wIHurjERk?t=565) [10:15 Retrospectives into skills](https://youtu.be/l3wIHurjERk?t=615)

+----------------------+
| Section Metadata     |
+---------+------------+
| id      | video-live |
+---------+------------+

---

## 10. Build harnesses first, and what came after v2.1

My advice at the end of the talk: if you want to go on this journey, build harnesses first. Then put one in an endless loop. You still talk to your harness; a 24/7 loop means the harness talks to you. Harnesses are probably the sweet spot for professional work. The 24/7 agent is for fun.

The roadmap I showed in April had three stops. 2.4 would be a hardening sprint from the retrospectives. 3.0 would add a cloud database, so I don't lose my ledgers, contracts and work if my laptop ever goes. 3.1 would double down on observability, with the 2.0 dashboard moved to the cloud and made way better.

In practice, v2.3 (April 18) gave every project its own worktree, and v2.4 (April 19) shipped the hardening from those retrospectives. v3.0 took a different turn: instead of a cloud database for logs, it became memory, a second brain the executive writes to and reads from before it acts. It shipped on May 31, and I wrote it up in [Continuous Executive Agent V3.0: The Second Brain](/writing/2026-05-31-continuous-agent-second-brain/). That was also the last commit to the repo.

Let's connect if you're building anything agent powered, especially if you have an open-source repo to share. I learn more from conversations than from giving talks.

Watch this part [18:19 The roadmap](https://youtu.be/hxJpum9fNaU?t=1099) [5:39 Build harnesses first, live](https://youtu.be/l3wIHurjERk?t=339)

+------------------+
| Section Metadata |
+---------+--------+
| id      | next   |
+---------+--------+

---

## Related

+-------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Row List                                                                                                                                                    |
+-----------+---------------------------------------------------------------------------------------------------------+---------------------------------------+
| Writing   | [Continuous Executive Agent V3.0: The Second Brain](/writing/2026-05-31-continuous-agent-second-brain/) | The next release: memory the          |
|           |                                                                                                         | executive writes as it works and      |
|           |                                                                                                         | reads before it acts.                 |
+-----------+---------------------------------------------------------------------------------------------------------+---------------------------------------+
| Portfolio | [Continuous Executive Agent: a 24/7 coding agent](/portfolio/continuous-executive-agent/)               | Every release from v1.0 to v3.0,      |
|           |                                                                                                         | measured from its own ledgers.        |
+-----------+---------------------------------------------------------------------------------------------------------+---------------------------------------+
| Talk      | [OpenClaw 24/7 Development Agent](/talks/ai-tinkerers-2026/)                                            | AI Tinkerers Columbus, April 6, 2026. |
+-----------+---------------------------------------------------------------------------------------------------------+---------------------------------------+

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

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Metadata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| title                   | 24/7 Coding Agent v2.1: Executive Loop and Escalation \| Jack Jin                                                                                                                                                                                                                                                                                                                                                                                                                                        |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| description             | How a 24/7 coding agent works: an executive loop on PM2, workers on Claude, Codex or Kimi K2.5, and a failure path that retries, diagnoses, then asks a human.                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| template                | article                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image                   | ![Jack's hand-drawn system architecture of the Continuous Coding Agent v2.1: executive brain, multi-vendor worker execution and a self-correcting feedback loop][image17]                                                                                                                                                                                                                                                                                                                                |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image:alt               | Jack's hand-drawn system architecture of the Continuous Coding Agent v2.1: executive brain, multi-vendor worker execution and a self-correcting feedback loop                                                                                                                                                                                                                                                                                                                                            |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| published-time          | 2026-04-05                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| modified-time           | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| json-ld                 | {"@context":"https\://schema.org","@graph":\[{"@type":"Person","@id":"https\://www\.jackzhaojin.com/#person","name":"Jack Jin","url":"https\://www\.jackzhaojin.com/","jobTitle":"Associate Director","worksFor":{"@type":"Organization","name":"Accenture","department":{"@type":"Organization","name":"Adobe Business                                                                                                                                                                                  |
|                         | Group"}},"sameAs":\["https\://www\.linkedin.com/in/jackjin","https\://github.com/jackzhaojin","https\://www\.youtube.com/@jackjin8467","https\://www\.credly.com/users/jack-jin"],"award":\["Adobe Experience Manager Champion, class of 2026-2027","AEM Rockstar winner, Adobe Summit 2024"]},{"@type":"WebSite","@id":"https\://www\.jackzhaojin.com/#website","url":"https\://www\.jackzhaojin.com/","name":"Jack                                                                                     |
|                         | Jin","publisher":{"@id":"https\://www\.jackzhaojin.com/#person"}},{"@type":"TechArticle","@id":"https\://www\.jackzhaojin.com/writing/2026-04-05-continuous-executive-agent-v2-1/#article","headline":"A 24/7 Coding Agent at v2.1: An Executive Loop, Swappable Workers and When to Ask a Human","description":"How a 24/7 coding agent works: an executive loop on PM2, workers on Claude, Codex or Kimi K2.5, and a failure path that retries, diagnoses, then asks a                                 |
|                         | human.","author":{"@id":"https\://www\.jackzhaojin.com/#person"},"publisher":{"@id":"https\://www\.jackzhaojin.com/#person"},"image":"https\://www\.jackzhaojin.com/writing/2026-04-05-continuous-executive-agent-v2-1/media\_1df225dcdcf372149a58c4e9508fa0e6d0d5187c7.jpg","mainEntityOfPage":"https\://www\.jackzhaojin.com/writing/2026-04-05-continuous-executive-agent-v2-1/","isPartOf":{"@id":"https\://www\.jackzhaojin.com/#website"},"about":\["Autonomous coding agents","Claude Agent       |
|                         | SDK","PM2","Multi-vendor AI workers","AI Tinkerers Columbus"],"datePublished":"2026-04-05","dateModified":"2026-10-04","inLanguage":"en","video":\[{"@id":"https\://www\.jackzhaojin.com/writing/2026-04-05-continuous-executive-agent-v2-1/#video"},{"@id":"https\://www\.jackzhaojin.com/writing/2026-04-05-continuous-executive-agent-v2-1/#video-live"}]},{"@type":"VideoObject","@id":"https\://www\.jackzhaojin.com/writing/2026-04-05-continuous-executive-agent-v2-1/#video","name":"I Built a   |
|                         | 24/7 Coding Agent That Codes While I Sleep","description":"A recorded walkthrough of my AI Tinkerers Columbus talk on the continuous coding executive agent, release by release from v1.1 to v2.2, plus the                                                                                                                                                                                                                                                                                              |
|                         | roadmap.","thumbnailUrl":"https\://www\.jackzhaojin.com/writing/2026-04-05-continuous-executive-agent-v2-1/media\_1df225dcdcf372149a58c4e9508fa0e6d0d5187c7.jpg","uploadDate":"2026-04-18T19:51:24Z","duration":"PT19M46S","embedUrl":"https\://www\.youtube-nocookie.com/embed/hxJpum9fNaU"},{"@type":"VideoObject","@id":"https\://www\.jackzhaojin.com/writing/2026-04-05-continuous-executive-agent-v2-1/#video-live","name":"My 24/7 Coding Agent in 5 Minutes: Live Talk \+ Q\&A at AI Tinkerers   |
|                         | Columbus (April 6, 2026)","description":"The live five-minute talk on the continuous coding agent at AI Tinkerers Columbus, followed by questions from the                                                                                                                                                                                                                                                                                                                                               |
|                         | room.","thumbnailUrl":"https\://i.ytimg.com/vi/l3wIHurjERk/maxresdefault.jpg","uploadDate":"2026-07-30T05:31:16Z","duration":"PT10M58S","embedUrl":"https\://www\.youtube-nocookie.com/embed/l3wIHurjERk"},{"@type":"BreadcrumbList","@id":"https\://www\.jackzhaojin.com/writing/2026-04-05-continuous-executive-agent-v2-1/#breadcrumb","itemListElement":\[{"@type":"ListItem","position":1,"name":"Home","item":"https\://www\.jackzhaojin.com/"},{"@type":"ListItem","position":2,"name":"Technical |
|                         | Writing","item":"https\://www\.jackzhaojin.com/writing/"},{"@type":"ListItem","position":3,"name":"24/7 Coding Agent v2.1","item":"https\://www\.jackzhaojin.com/writing/2026-04-05-continuous-executive-agent-v2-1/"}]}]}                                                                                                                                                                                                                                                                               |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| og:image:alt            | Jack's hand-drawn system architecture of the Continuous Coding Agent v2.1: executive brain, multi-vendor worker execution and a self-correcting feedback loop                                                                                                                                                                                                                                                                                                                                            |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:published\_time | 2026-04-05                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:modified\_time  | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:author          | https\://www\.jackzhaojin.com/                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-summary         | What it takes to keep a harness going around the clock: an executive loop on PM2, swappable workers on Claude, Codex and Kimi K2.5, and a failure path that retries, diagnoses, then asks a human. Release by release, with the code, the walkthrough and the live Q\&A.                                                                                                                                                                                                                                 |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-image           | https\://www\.jackzhaojin.com/writing/media\_1df225dcdcf372149a58c4e9508fa0e6d0d5187c7.jpg?width=750\&format=jpg\&optimize=medium                                                                                                                                                                                                                                                                                                                                                                        |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-topics          | AI Engineering                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-reading-time    | 15 min read                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-video-time      | 19:46 video                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-talk-url        | https\://www\.jackzhaojin.com/talks/#ai-tinkerers-2026                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-talk-label      | Given as a talk at AI Tinkerers Columbus, April 6, 2026                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-talk-note       | Featured in AI Tinkerers' global Community Spotlights                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-url       | https\://youtu.be/hxJpum9fNaU                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-label     | Watch on YouTube                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-keywords        | talk ai tinkerers columbus featured in ai tinkerers' global community spotlights continuous agent 24/7 coding agent autonomous coding agent claude agent sdk openai codex kimi k2.5 pm2 harness openclaw ai tinkerers columbus notion discord supabase playwright spec-driven development needs-you.md                                                                                                                                                                                                   |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_195f7949a1335e111356f8e8a5d33d9998c4aa0b3.jpg#width=144&height=92

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_158f0bc10991ba942206202f39a41bf5b262c8a73.jpg#width=144&height=92

[image2]: https://main--www-eds--jackzhaojin.aem.page/media_19d9a723d900349795b26cff4e49807baed622439.jpg#width=144&height=92

[image3]: https://main--www-eds--jackzhaojin.aem.page/media_1d5c105ff1fdd630cc21cf367801266d4b1f535a8.jpg#width=144&height=92

[image4]: https://main--www-eds--jackzhaojin.aem.page/media_1cdfb1bff7359952110d20558f959c6f52793fbc2.jpg#width=144&height=92

[image5]: https://main--www-eds--jackzhaojin.aem.page/media_135629cac923af19655dcc236b8f871f6648e5962.jpg#width=144&height=92

[image6]: https://main--www-eds--jackzhaojin.aem.page/media_1d7e461fd4cd0a03ca2444ad13c3bf9ead0c3f87a.jpg#width=144&height=92

[image7]: https://main--www-eds--jackzhaojin.aem.page/media_1a3541c456bef3b605d10276afd1888bb2d176896.jpg#width=1600&height=1138

[image8]: https://main--www-eds--jackzhaojin.aem.page/media_1c4faf7a3cb99e69546a516a58e976cab27e44e97.jpg#width=1600&height=900

[image9]: https://main--www-eds--jackzhaojin.aem.page/media_11db329ea959b704d8dd1026b20f783ffd49d0e76.jpg#width=1600&height=900

[image10]: https://main--www-eds--jackzhaojin.aem.page/media_1767a1966652be774904e78d4481ec2071d15e9ba.jpg#width=1280&height=540

[image11]: https://main--www-eds--jackzhaojin.aem.page/media_139b9f99d5976d2a29904f62e2c0d7204b8b27bd9.jpg#width=1280&height=482

[image12]: https://main--www-eds--jackzhaojin.aem.page/media_11e594763d63711ded4967e803ee96cc93278fe67.jpg#width=1280&height=478

[image13]: https://main--www-eds--jackzhaojin.aem.page/media_1a7a7d97dd9c27f1f4fb426788db52fc2e4fdb367.jpg#width=1280&height=500

[image14]: https://main--www-eds--jackzhaojin.aem.page/media_18a262d3aca9c390e63f68a9c6851f53554064cd0.jpg#width=1000&height=872

[image15]: https://main--www-eds--jackzhaojin.aem.page/media_131f3155c55c0e37de8a87c861e82c3b1e6fd60fa.jpg#width=1600&height=900

[image16]: https://main--www-eds--jackzhaojin.aem.page/media_1137308ae03e130481efaf1711504905d140493ca.jpg#width=1280&height=444

[image17]: https://main--www-eds--jackzhaojin.aem.page/media_1df225dcdcf372149a58c4e9508fa0e6d0d5187c7.jpg#width=1280&height=720
