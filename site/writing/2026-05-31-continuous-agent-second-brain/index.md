1. [Home](/)
2. [Technical Writing](/writing/)
3. Agent memory for a 24/7 coding agent

# Agent Memory for a 24/7 Coding Agent: Five Memory Types, Five Hooks and Retrieval in Plain English

By [Jack Jin](/) · May 31, 2026 · Updated October 4, 2026 · 8 min read

An agent without memory runs every task like it's the first time. This is how version 3.0 of my 24/7 coding agent gives its executive a second brain: a mem0 Cloud store it writes to as it works and reads from before it acts, while git and markdown stay the source of truth. It covers five memory types, five hooks in the loop, retrieval in plain English, and an empty-string bug that failed every write while the log said ok.

---

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Rail                                                                                                                                                                                   |
+--------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------+
| ![][image0]                                                                                | **Part 1**\                                                                               |
|                                                                                            | [Execute but not learn](#why)                                                             |
+--------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------+
| ![][image1]                                                                                | **Part 2**\                                                                               |
|                                                                                            | [A second brain, git canonical](#brain)                                                   |
+--------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------+
| ![][image2]                                                                                | **Part 3**\                                                                               |
|                                                                                            | [Five memory types](#types)                                                               |
+--------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------+
|                                                                                            | **Part 4**\                                                                               |
|                                                                                            | [Storing with five hooks](#hooks)                                                         |
+--------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------+
| ![][image3]                                                                                | **Part 5**\                                                                               |
|                                                                                            | [Retrieving in plain English](#retrieval)                                                 |
+--------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------+
| ![][image4]                                                                                | **Part 6**\                                                                               |
|                                                                                            | [Rollout and the empty-string bug](#build)                                                |
+--------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------+
|                                                                                            | **Wrap-up**\                                                                              |
|                                                                                            | [Hook A off, what's next](#next)                                                          |
+--------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------+
| [Code on GitHub](https://github.com/jackzhaojin/continuous-agent/tree/e43ae97)                                                                                                         |
|                                                                                                                                                                                        |
| [The deck, 15 slides](https://github.com/jackzhaojin/continuous-agent/blob/e43ae97/docs/technical-highlights/3.0/Continuous%20Executive%20Agent%20V3.0%20-%20The%20Second%20Brain.pdf) |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

---

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Fine Print                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Code: [continuous-agent](https://github.com/jackzhaojin/continuous-agent/tree/e43ae97) at `e43ae97`, the May 31 commit after the `v3.0.0` tag. Deck: [15 slides, in the repo](https://github.com/jackzhaojin/continuous-agent/blob/e43ae97/docs/technical-highlights/3.0/Continuous%20Executive%20Agent%20V3.0%20-%20The%20Second%20Brain.pdf). The agent itself, up to v2.1, is in [my AI Tinkerers write-up](/writing/2026-04-05-continuous-executive-agent-v2-1/). First published on LinkedIn on May 31, 2026. Rewritten for this site in October 2026. |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

---

## 1. Without memory, my agent could execute but not learn

Memory is the hard part of agentic systems. An agent without memory runs every task like it's the first time. The model is smart, the tools work, and nothing compounds. The real problem was never reasoning. It's storage and retrieval.

Before V3.0, my agent had traces but no memory. Its history lived in scattered JSONL ledgers, markdown retrospectives and ad hoc logs. Those were useful traces, but nothing an agent could trust or query. The deck names four gaps: context spread across formats with no single way in, retrospectives that were valuable but not structured for reuse, no stable contract for what the system can do and what happened before, and blind worker spawns, where every worker started with zero context. The agent could execute, but it couldn't learn.

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                                                                 |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Deck slide, Scattered Knowledge, No Recall. The agent's operational history lived in scattered JSONL ledgers, markdown retros and ad hoc logs. Four cards: Fragmented Context, Unstructured Retros, No Memory Contract, Blind Worker Spawns. Result: limited planning quality, repeatability and autonomous decision-making; the agent could execute but not learn.][image5] |
|                                                                                                                                                                                                                                                                                                                                                                                |
| Slide 4 of the deck: where things stood before V3.0.                                                                                                                                                                                                                                                                                                                           |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

One idea shaped the whole design. A memory you store but never read back might as well not exist. If a tree falls in the forest and nobody hears it, did it make a sound? If an agent saves a lesson and never retrieves it, did it learn anything? Storage is the easy half. Retrieval decides whether the memory was ever real.

+------------------+
| Section Metadata |
+---------+--------+
| id      | why    |
+---------+--------+

---

## 2. A second brain the executive owns, with git as the source of truth

V3.0 turns that scattered history into a second brain. The executive writes to it as it works and reads from it before it acts. mem0 Cloud hosts the store. Git and markdown stay canonical: the store is a derived copy, shaped for retrieval, and when the two disagree, the repo wins. The store can always be rebuilt from the repo. The harvester writes high-signal memories only, never raw chat history.

I locked four pillars before writing the code, in the hosting decision on May 15:

1. Executive tier only. Workers never call mem0, never hold the API key and never get the MCP server. They get relevant context fed to them in a memory pack.
2. Git is the source of truth. mem0 stores knowledge derived from the repo, not authored content.
3. Skills first, not a TypeScript module. The contract lives in `SKILL.md` files, and deterministic helpers sit in each skill's `references/` folder, run through Bash. The one TypeScript file under `src/agentic/memory/` runs the hooks and holds no prompts.
4. One writer. Only the `memory-harvester` skill, run by the executive, writes to mem0. A direct `client.add()` from a worker or a script is an anti-pattern. Its partner, `memory-reader`, is read-only.

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Hand-drawn diagram, V3.0 Memory: Ingestion and Retrieval Lifecycle. Write path, where the executive is the sole writer: write hooks C, E and D feed the memory-harvester, which classifies each fact, then classify and validate against schema v1.0.0, then mem0.add() and poll until SUCCEEDED, into the mem0 second brain. Read path, read-only: read hooks A, B and D call the memory-reader, which runs a natural-language agentic search and returns a synthesis or a Memory Pack, which goes into the worker's CLAUDE.md as static markdown. A memory-snapshot makes a daily JSON backup. Notes: 0 to 3 writes per run, 3 to 8 per weekly retro; no graph traversal, the executive decides in natural language which memories serve this goal.][image6] |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| My diagram of both paths. On the left, hooks feed the only writer. On the right, hooks ask the reader, and the worker only ever sees the result as markdown.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| id      | brain  |
+---------+--------+

---

## 3. Five memory types, each with a confidence range

I started with a taxonomy, because not all memory is the same:

+------------------------------------------------------------------+
| Data Table                                                       |
+------------+---------------------------------------+-------------+
| Type       | What it holds                         | Confidence  |
+------------+---------------------------------------+-------------+
| Principle  | The rules that never change, from the | 1.0         |
|            | constitution and the PRDs. Immutable. |             |
+------------+---------------------------------------+-------------+
| Semantic   | Cross-run facts: what works and what  | 0.7 to 0.95 |
|            | fails.                                |             |
+------------+---------------------------------------+-------------+
| Procedural | How to do something, learned from     | 0.6 to 0.9  |
|            | doing it.                             |             |
+------------+---------------------------------------+-------------+
| Episodic   | What actually happened in a given     | 1.0         |
|            | run, with a timestamp.                |             |
+------------+---------------------------------------+-------------+
| Reflective | Patterns distilled across many runs.  | 0.7 to 0.95 |
+------------+---------------------------------------+-------------+

Every memory also carries all four of mem0's scope IDs: `user_id`, `agent_id`, `app_id` and `run_id`. mem0 only requires one. I wanted all four, so retrieval filters never drift. `agent_id` is always `executive`, `app_id` is the project the lesson is useful for (or `_global` for cross-project lessons), and every `run_id` starts with a date. A versioned metadata envelope carries the type, confidence, the trigger that wrote it and the source file it came from. `classify.ts` rejects a malformed payload before mem0 ever sees it.

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Hand-drawn diagram, V3.0 Memory: Taxonomy and Metadata. Left, five memory types: principle, immutable rules from the constitution, PRDs and specs, confidence 1.0, never overwritten; semantic, cross-run facts, confidence 0.7 to 0.95; procedural, reusable how-to and step sequences that worked, 0.6 to 0.9; episodic, a timestamped record that this run happened, 1.0, about one per run; reflective, patterns observed across many runs and retros, 0.7 to 0.95. Right, the metadata envelope at schema v1.0.0: four scope IDs with agent\_id always executive, classification, provenance, environment isolation, and optional aids: outcome, up to eight tags, expires\_at.][image7] |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| My taxonomy diagram from the repo: the five types on the left, and the envelope every write is wrapped in on the right.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| id      | types  |
+---------+--------+

---

## 4. Storing memory automatically with five hooks in the loop

Storage is automatic. Hooks inside the agent's loop write things down: after a run it classifies the outcome, and after a retrospective it distills the lesson. The agent never decides to remember. Remembering is just part of how it runs.

+-------------------------------------------------------------------------+
| Data Table                                                              |
+------+--------------------------+---------------------------------------+
| Hook | Where it runs            | What it does                          |
+------+--------------------------+---------------------------------------+
| A    | Before work selection    | Reads. Consults memory before the     |
|      |                          | executive picks a goal.               |
+------+--------------------------+---------------------------------------+
| B    | Before a worker spawns   | Reads, for the worker. Bakes a memory |
|      |                          | pack into the worker's `CLAUDE.md`.   |
+------+--------------------------+---------------------------------------+
| C    | After a successful run   | Writes. Classifies the outcome and    |
|      |                          | stores 0 to 3 memories.               |
+------+--------------------------+---------------------------------------+
| D    | Before failure diagnosis | Reads, and writes only on a           |
|      |                          | repeated-failure pattern. Surfaces    |
|      |                          | earlier failures with similar         |
|      |                          | signals.                              |
+------+--------------------------+---------------------------------------+
| E    | After a retrospective    | Writes. Distills reflective memories  |
|      |                          | from the retro document.              |
+------+--------------------------+---------------------------------------+

Each hook is its own `SKILL.md`, and one function runs all five. `runMemoryHook()` checks the master switch, `V3_MEMORY_ENABLED`, then the hook's own flag. A hook that's switched off returns without doing anything. Errors come back as values instead of exceptions, so memory can never stop the loop.

+--------------------------------------------------------------------------------------------------------------------------+
| Code                                                                                                                     |
+--------------------------------------------------------------------------------------------------------------------------+
| src/agentic/memory/run-hook.ts, lines 76 to 87                                                                           |
|                                                                                                                          |
| [e43ae97 on GitHub](https://github.com/jackzhaojin/continuous-agent/blob/e43ae97/src/agentic/memory/run-hook.ts#L76-L87) |
+--------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                      |
| export async function runMemoryHook(                                                                                     |
|   name: HookName,                                                                                                        |
|   ctx: HookContext,                                                                                                      |
| ): Promise<HookResult> {                                                                                                 |
|   const flag = HOOK_FLAG[name];                                                                                          |
|                                                                                                                          |
|   if (!memoryEnabled()) {                                                                                                |
|     return { ran: false, skipped: true, reason: "V3_MEMORY_ENABLED off", finalText: "" };                                |
|   }                                                                                                                      |
|   if (!isTrue(process.env[flag])) {                                                                                      |
|     return { ran: false, skipped: true, reason: `${flag} off`, finalText: "" };                                          |
|   }                                                                                                                      |
| ```                                                                                                                      |
+--------------------------------------------------------------------------------------------------------------------------+

The rollout was staged, one hook per week, and every hook flag ships off in `.env.executive.example`. Stage 1 was Hook C, write only and the lowest risk. Hook E needs the most judgment, so it came last. At go-live, B, C, D and E were on and A was off.

Below, pick what happens in one pass of the loop, and the list on the right shows which hooks run, in order. It starts on the common case, a goal that passes. Two things to notice: every hook runs in the executive, so the worker never touches mem0, and Hook A is skipped because its flag is off. Untick a hook and the loop carries on without it. That per-hook switch is what let me turn them on one per week.

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Explainer (hook switchboard)                                                                                                                                                                                                                      |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Which hooks run in one pass of the loop                                                                                                                                                                                                           |
|                                                                                                                                                                                                                                                   |
| [source](https://github.com/jackzhaojin/continuous-agent/blob/e43ae97/src/core/executive-loop.ts#L317-L347)                                                                                                                                       |
+--------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------+
| What happens this pass                                                               | What runs, in order                                                                                                                                        |
|                                                                                      |                                                                                                                                                            |
| Hook flags, as they were at go-live                                                  | This pass: one hook reads memory, one hook writes it. The worker never calls mem0.                                                                         |
|                                                                                      |                                                                                                                                                            |
| - **A, before picking work (reads)** `V3_MEM_HOOK_PRE_WORK` off                      |                                                                                                                                                            |
| - **B, before a worker starts (reads)** `V3_MEM_HOOK_PRE_SPAWN`                      |                                                                                                                                                            |
| - **C, after a run passes (writes)** `V3_MEM_HOOK_POST_RUN`                          |                                                                                                                                                            |
| - **D, before diagnosing a failure (reads)** `V3_MEM_HOOK_FAIL_DIAG`                 |                                                                                                                                                            |
| - **E, after a retrospective (writes)** `V3_MEM_HOOK_POST_RETRO`                     |                                                                                                                                                            |
+--------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Situation                                                                                                                                                                                                                                         |
+--------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------+
| A goal passes                                                                        | 1. **Pick the next goal** A goal is queued, so the loop may check memory first.                                                                            |
|                                                                                      | 2. **Hook A, before picking work** *reads mem0* 3 to 8 plain-English searches. For now the                                                                 |
|                                                                                      |    answer is only logged, not used to pick the goal.\                                                                                                      |
|                                                                                      |    *skipped* Its flag is off, so it returns without touching mem0.                                                                                         |
|                                                                                      | 3. **Hook B, before a worker starts** *reads mem0* Searches mem0 and builds a memory pack of 2K tokens or less.\                                           |
|                                                                                      |    *skipped* Its flag is off, so it returns without touching mem0.                                                                                         |
|                                                                                      | 4. **The worker builds** The pack is added to the worker's CLAUDE.md. The worker reads                                                                     |
|                                                                                      |    plain markdown and never calls mem0.\                                                                                                                   |
|                                                                                      |    No pack this time. The worker starts with nothing from earlier runs.                                                                                    |
|                                                                                      | 5. **Checks pass** State, ledgers, Notion and Discord are updated.                                                                                         |
|                                                                                      | 6. **Hook C, after a run passes** *writes mem0* The harvester picks 0 to 3 memories from                                                                   |
|                                                                                      |    this run (a record of what happened, maybe a lesson) and writes them.\                                                                                  |
|                                                                                      |    *skipped* Its flag is off, so it returns without touching mem0.                                                                                         |
+--------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------+
| A goal fails a third time                                                            | 1. **Pick the next goal** A goal is queued, so the loop may check memory first.                                                                            |
|                                                                                      | 2. **Hook A, before picking work** *reads mem0* 3 to 8 plain-English searches. For now the answer is only logged, not used to pick the goal.\              |
|                                                                                      |    *skipped* Its flag is off, so it returns without touching mem0.                                                                                         |
|                                                                                      | 3. **Hook B, before a worker starts** *reads mem0* Searches mem0 and builds a memory pack of 2K tokens or less.\                                           |
|                                                                                      |    *skipped* Its flag is off, so it returns without touching mem0.                                                                                         |
|                                                                                      | 4. **The worker builds** The pack is added to the worker's CLAUDE.md. The worker reads plain markdown and never calls mem0.\                               |
|                                                                                      |    No pack this time. The worker starts with nothing from earlier runs.                                                                                    |
|                                                                                      | 5. **Checks fail, for the third time** So the loop moves on to diagnosing the failure.                                                                     |
|                                                                                      | 6. **Hook D, before diagnosing a failure** *reads, may write* Finds earlier failures with similar signals before                                           |
|                                                                                      |    the diagnosis. It writes only when it spots a repeated-failure pattern.\                                                                                |
|                                                                                      |    *skipped* Its flag is off, so it returns without touching mem0.                                                                                         |
|                                                                                      | 7. **Diagnose the failure** The executive decides: retry with a fix, escalate, or keep retrying.                                                           |
+--------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Nothing queued, retro due                                                            | 1. **Hook A, before picking work** *not called* Nothing is queued, so the loop doesn't spend searches on nothing. This guard was one of the go-live fixes. |
|                                                                                      | 2. **The weekly retrospective runs** With no work queued, the loop writes a retro document.                                                                |
|                                                                                      | 3. **Hook E, after a retrospective** *writes mem0* Turns the new retro into lessons and writes them to mem0.\                                              |
|                                                                                      |    *skipped* Its flag is off, so it returns without touching mem0.                                                                                         |
+--------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Nothing queued at all                                                                | 1. **Hook A, before picking work** *not called* Nothing is queued, so the loop doesn't spend searches on nothing. This guard was one of the go-live fixes. |
|                                                                                      | 2. **Nothing to do** The loop sleeps 30 seconds and checks again.                                                                                          |
+--------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------+
| A simplified model of the loop. The order follows `executive-loop.ts` and the on/off check follows `run-hook.ts` at `e43ae97`. It doesn't simulate what each search finds.                                                                        |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

One fix from go-live shows up in the "nothing queued" cases. Hook A used to fire on every 30-second idle loop, about 8 to 14 retrievals each time, consulting memory about nothing. Now it only runs when a bundle is actually queued.

+------------------+
| Section Metadata |
+---------+--------+
| id      | hooks  |
+---------+--------+

---

## 5. Retrieving memory by asking questions in plain English

Retrieval got the most thought. I almost shipped a fixed checklist of queries, then scrapped it. Instead, `memory-reader` treats retrieval as a judgment call: the executive decides which past knowledge serves the goal in front of it, and asks for it in full sentences instead of short keyword bags.

```
# before: a keyword bag
npm install build first try clean success

# after: a question
What's the best pattern for building a Node module that passed all verifiers on first try?
```

mem0 ranks results by embedding similarity, so a whole question carries intent that a list of keywords loses. It also doesn't walk a graph from one fact to a related one, so the reader plans on 3 to 8 queries and refines each one from what came back. That iteration is the multi-hop. It stops when the top results stop changing, when it has at least three relevant memories, or after about eight queries.

The result for a worker is small on purpose. The memory pack is capped at 2K tokens, cut by score if it runs over, with a confidence floor of 0.7. It's appended to the worker's generated `CLAUDE.md` as static markdown. In the end-to-end test, Hook B's pack told a worker to follow a prior run's module pattern and not to push, as the constitution requires.

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Deck slide, Agentic Retrieval and Memory Pack. The shift: the memory-reader was reframed from a fixed query checklist into an agentic judgment task, asking in full natural-language sentences. Before: npm install build first try clean success. After: What's the best pattern for building a Node module that passed all verifiers on first try? 3 to 8 refined queries per turn, a memory pack of 2K tokens or less. Memory pack flow: the executive decides what memory serves this goal, natural-language search through the memory-reader skill, the pack is baked into CLAUDE.md for the worker spawn, the worker executes with context and never queries mem0. E2E validated.][image8] |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Slide 10 of the deck: from a checklist of queries to questions, and how the answer reaches a worker.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | retrieval |
+---------+-----------+
| style   | code-wrap |
+---------+-----------+

---

## 6. Rolling it out, and the empty-string bug that failed every write

Before any hook code, I built two proofs of concept, one on the mem0 SDK and one through its MCP server. Both validated mem0's asynchronous writes. Integration came next: the skills wired into the loop, the CLI, and a backfill of the existing corpus. The whole build took about eight weeks.

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Deck slide, The 8-Week Build Journey. Timeline: April 3 to 19, the vision, started as a v2.3 cloud DB goal and evolved into second-brain positioning; May 15, hosting decision, mem0 Cloud chosen, four pillars locked; May 16, POC and taxonomy, SDK and MCP POCs, five memory types; May 16, implementation plan, five hooks, staged rollout; May 23 to 24, integration, MCP setup, skills wired, CLI built, corpus backfilled; May 30 to 31, go-live and tag. Key milestones: two POCs in one day, taxonomy defined in one session, and the silent bug. Quote from the implementation plan, May 16: we have zero data on whether the playbooks produce useful memories; staging gives an audit window between each addition.][image9] |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Slide 13 of the deck: the build, week by week.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

The brain didn't start empty. The backfill migrated about 134 memories through four harvest lanes (principles, retros, capabilities and episodic records from completed projects), and 22 test memories were purged. The executive talks to mem0 through one deterministic surface, `./bin/mem0`, driven through Bash. It bakes in the gotchas: the filter format, snake and camel casing, auth, polling for async writes and schema validation. The mem0 MCP server is only for me to use by hand; the agent goes through the CLI. A PM2 cron entry snapshots the whole store to JSON at 04:00 every day, as a disaster recovery backup.

The staged rollout came straight from the implementation plan. On May 16 I wrote: "We have zero data on whether the playbooks produce useful memories; staging gives an audit window between each addition."

One bug failed silently. The documented production line in `.env.executive` is `V3_MEM0_COHORT=` with nothing after it. dotenv loads that as an empty string, and an empty string isn't null or undefined, so the `??` chain in `applyDefaults()` kept it. Every write got stamped with `cohort: ""`, and the validator rejected every single one. The hook still logged `ok`, because the agent's turn itself had succeeded. I root-caused and fixed it on go-live day, in [`b4f4554`](https://github.com/jackzhaojin/continuous-agent/commit/b4f4554):

+-------------------------------------------------------------------------------------+
| Code                                                                                |
+-------------------------------------------------------------------------------------+
| memory-harvester/references/defaults.ts, the fix in b4f4554                         |
|                                                                                     |
| [b4f4554 on GitHub](https://github.com/jackzhaojin/continuous-agent/commit/b4f4554) |
+-------------------------------------------------------------------------------------+
| ```                                                                                 |
|   const cohortFromEnv = process.env.V3_MEM0_COHORT;                                 |
|   const cohortFromEnv = process.env.V3_MEM0_COHORT \|\| undefined;                  |
|                                                                                     |
|   // unchanged, a few lines down:                                                   |
|   const cohort = m.cohort ?? cohortFromEnv ?? undefined;                            |
|   if (cohort !== undefined) metadata.cohort = cohort;                               |
| ```                                                                                 |
+-------------------------------------------------------------------------------------+

The same commit made the hook log a histogram of the tools it called and the last 400 characters of its answer, so a harvest whose writes all fail can't read as success anymore.

The lab below follows the cohort value from the `.env` file to the validator. It starts on the bug: the empty production line, with the code before the fix. Switch to "After the fix" and the same empty line is left out instead of rejected. The other two settings work with either version of the code. Only the empty line breaks.

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Explainer (empty cohort)                                                                                                                                                                            |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Follow one empty setting to a rejected write                                                                                                                                                        |
|                                                                                                                                                                                                     |
| [source](https://github.com/jackzhaojin/continuous-agent/blob/e43ae97/.claude/skills/memory-harvester/references/classify.ts#L214-L221)                                                             |
+-------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------+
| The line in .env.executive                | Follow the value                                                                                                                                        |
|                                           |                                                                                                                                                         |
| The code                                  | 1. **.env.executive** `V3_MEM0_COHORT=`                                                                                                                 |
|                                           | 2. **process.env.V3\_MEM0\_COHORT** `""`                                                                                                                |
| defaults.ts                               | 3. **cohortFromEnv** `""`                                                                                                                               |
|                                           | 4. **metadata.cohort** `""`\                                                                                                                            |
|                                           |    `(left out)`                                                                                                                                         |
|                                           | 5. **classify.ts** `metadata.cohort: when set, must be a non-empty string`\                                                                             |
|                                           |    `valid`                                                                                                                                              |
|                                           |                                                                                                                                                         |
|                                           | Every write is rejected before it reaches mem0.                                                                                                         |
|                                           |                                                                                                                                                         |
|                                           | The write passes validation and goes to mem0.                                                                                                           |
+-------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------+
| Env line                                                                                                                                                                                            |
+-------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------+
| Empty, as in production                   | `V3_MEM0_COHORT=`                                                                                                                                       |
+-------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------+
| A test value                              | `V3_MEM0_COHORT=smoke-2026-05-16`                                                                                                                       |
+-------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------+
| No line at all                            | `# no V3_MEM0_COHORT line`                                                                                                                              |
+-------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------+
| Code version                                                                                                                                                                                        |
+-------------------------------------------+------------------------------------------------------------------+-------------------------------------------+------------------------------------------+
| Before the fix                            | ```                                                              | \[MEMORY] hook post-run-harvest ran: N    | \[MEMORY] hook post-run-harvest ran: N   |
|                                           | // defaults.ts before b4f4554                                    | tool calls, …ms, ok                       | tool calls, …ms, ok                      |
|                                           | const cohortFromEnv = process.env.V3_MEM0_COHORT;                |                                           |                                          |
|                                           | const cohort = m.cohort ?? cohortFromEnv ?? undefined;           | The hook log still says ok: the agent     | Same log line as a failed run would      |
|                                           | if (cohort !== undefined) metadata.cohort = cohort;              | turn succeeded, even though every write   | print.                                   |
|                                           | ```                                                              | failed.                                   |                                          |
+-------------------------------------------+------------------------------------------------------------------+-------------------------------------------+------------------------------------------+
| After the fix                             | ```                                                              | \[MEMORY] hook post-run-harvest ran: N    | \[MEMORY] hook post-run-harvest ran: N   |
|                                           | // defaults.ts after b4f4554                                     | tool calls \[Read×…, Bash×…], …ms, ok     | tool calls \[Read×…, Bash×…], …ms, ok    |
|                                           | const cohortFromEnv = process.env.V3_MEM0_COHORT \|\| undefined; | \[MEMORY] hook post-run-harvest result    | \[MEMORY] hook post-run-harvest result   |
|                                           | const cohort = m.cohort ?? cohortFromEnv ?? undefined;           | tail: …validation error                   | tail: …memories written                  |
|                                           | if (cohort !== undefined) metadata.cohort = cohort;              |                                           |                                          |
|                                           | ```                                                              | After the fix the log also carries the    | After the fix the log also carries the   |
|                                           |                                                                  | tool histogram and the tail of the hook's | tool histogram and the tail of the       |
|                                           |                                                                  | answer, so a failed harvest shows up.     | hook's answer, so a failed harvest shows |
|                                           |                                                                  |                                           | up.                                      |
+-------------------------------------------+------------------------------------------------------------------+-------------------------------------------+------------------------------------------+
| The `??` and `\|\|` run live in your browser, and the rule is the one in `classify.ts`. The log lines follow the format in `run-hook.ts`, with counts and timings left out.                         |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| id      | build  |
+---------+--------+

---

## 7. Why Hook A is still off, and what's next

The full loop (read, pack, execute, write) is validated end to end. Hook A is still off. It stays audit-only until its synthesis actually changes which goal gets picked. Until then it's pure retrieval cost against the retrieval budget on my mem0 plan, and read hooks are the expensive side.

The deck's roadmap from there: turn on Hook A once its synthesis earns that, build the V3.1 observability dashboard on top of memory I can trust, try multiple agents in parallel with partitioned scope in V4.0, and keep a self-hosted path, with a migration to open-source mem0 ready.

V3.0 is the agent I've been building in the open since January, and the code is all on [GitHub](https://github.com/jackzhaojin/continuous-agent). If you're building memory into your own agents, I'd like to know how you handle retrieval.

+------------------+
| Section Metadata |
+---------+--------+
| id      | next   |
+---------+--------+

---

## Related

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Row List                                                                                                                                                               |
+-----------+---------------------------------------------------------------------------------------------------------------------+--------------------------------------+
| Writing   | [A 24/7 Coding Agent: the Continuous Executive Agent at v2.1](/writing/2026-04-05-continuous-executive-agent-v2-1/) | The executive loop, the workers and  |
|           |                                                                                                                     | the failure ladder this memory plugs |
|           |                                                                                                                     | into.                                |
+-----------+---------------------------------------------------------------------------------------------------------------------+--------------------------------------+
| Portfolio | [Continuous Executive Agent: a 24/7 coding agent](/portfolio/continuous-executive-agent/)                           | Every release from v1.0 to v3.0.     |
+-----------+---------------------------------------------------------------------------------------------------------------------+--------------------------------------+

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

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Metadata                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| title                   | Agent Memory for a 24/7 Coding Agent, with mem0 \| Jack Jin                                                                                                                                                                                                                                                                                                                                                                                                  |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| description             | Agent memory for a 24/7 coding agent with mem0: five memory types, five lifecycle hooks, plain-English retrieval and git as the source of truth.                                                                                                                                                                                                                                                                                                             |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| template                | article                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image                   | ![Jack's hand-drawn diagram, V3.0 Memory Taxonomy and Metadata: five memory types and the versioned metadata envelope][image10]                                                                                                                                                                                                                                                                                                                              |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image:alt               | Jack's hand-drawn diagram, V3.0 Memory Taxonomy and Metadata: five memory types and the versioned metadata envelope                                                                                                                                                                                                                                                                                                                                          |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| published-time          | 2026-05-31                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| modified-time           | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| json-ld                 | {"@context":"https\://schema.org","@graph":\[{"@type":"Person","@id":"https\://www\.jackzhaojin.com/#person","name":"Jack Jin","url":"https\://www\.jackzhaojin.com/","jobTitle":"Associate Director","worksFor":{"@type":"Organization","name":"Accenture","department":{"@type":"Organization","name":"Adobe Business                                                                                                                                      |
|                         | Group"}},"sameAs":\["https\://www\.linkedin.com/in/jackjin","https\://github.com/jackzhaojin","https\://www\.youtube.com/@jackjin8467","https\://www\.credly.com/users/jack-jin"],"award":\["Adobe Experience Manager Champion, class of 2026-2027","AEM Rockstar winner, Adobe Summit 2024"]},{"@type":"WebSite","@id":"https\://www\.jackzhaojin.com/#website","url":"https\://www\.jackzhaojin.com/","name":"Jack                                         |
|                         | Jin","publisher":{"@id":"https\://www\.jackzhaojin.com/#person"}},{"@type":"TechArticle","@id":"https\://www\.jackzhaojin.com/writing/2026-05-31-continuous-agent-second-brain/#article","headline":"Agent Memory for a 24/7 Coding Agent: Five Memory Types, Five Hooks and Retrieval in Plain English","description":"Agent memory for a 24/7 coding agent with mem0: five memory types, five lifecycle hooks, plain-English retrieval and git as the      |
|                         | source of                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|                         | truth.","author":{"@id":"https\://www\.jackzhaojin.com/#person"},"publisher":{"@id":"https\://www\.jackzhaojin.com/#person"},"image":"https\://www\.jackzhaojin.com/writing/2026-05-31-continuous-agent-second-brain/media\_163a1b6295480ee5c8de385f2458a82c2e5625751.jpg","mainEntityOfPage":"https\://www\.jackzhaojin.com/writing/2026-05-31-continuous-agent-second-brain/","isPartOf":{"@id":"https\://www\.jackzhaojin.com/#website"},"about":\["Agent |
|                         | memory","mem0","Autonomous coding agents","Claude Agent SDK","Retrieval"],"datePublished":"2026-05-31","dateModified":"2026-10-04","inLanguage":"en"},{"@type":"BreadcrumbList","@id":"https\://www\.jackzhaojin.com/writing/2026-05-31-continuous-agent-second-brain/#breadcrumb","itemListElement":\[{"@type":"ListItem","position":1,"name":"Home","item":"https\://www\.jackzhaojin.com/"},{"@type":"ListItem","position":2,"name":"Technical            |
|                         | Writing","item":"https\://www\.jackzhaojin.com/writing/"},{"@type":"ListItem","position":3,"name":"Agent memory for a 24/7 coding agent","item":"https\://www\.jackzhaojin.com/writing/2026-05-31-continuous-agent-second-brain/"}]}]}                                                                                                                                                                                                                       |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| og:image:alt            | Jack's hand-drawn diagram, V3.0 Memory Taxonomy and Metadata: five memory types and the versioned metadata envelope                                                                                                                                                                                                                                                                                                                                          |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:published\_time | 2026-05-31                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:modified\_time  | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:author          | https\://www\.jackzhaojin.com/                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-summary         | How a 24/7 coding agent gets a memory: mem0 behind the executive only, git as the source of truth, five memory types, five hooks in the loop, retrieval in plain English, and the bug that failed every write while logging ok.                                                                                                                                                                                                                              |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-image           | https\://www\.jackzhaojin.com/writing/media\_163a1b6295480ee5c8de385f2458a82c2e5625751.jpg?width=750\&format=jpg\&optimize=medium                                                                                                                                                                                                                                                                                                                            |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-topics          | AI Engineering                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-reading-time    | 8 min read                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-keywords        | agent memory mem0 second brain memory taxonomy episodic memory semantic memory procedural memory retrieval natural-language search lifecycle hooks claude agent sdk continuous agent dotenv pm2                                                                                                                                                                                                                                                              |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_157837eeeb8258b38567827c2475aa68cfac7e094.jpg#width=144&height=92

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_11a7961fb31e3cdb8fa270563872a706f5a013f0a.jpg#width=144&height=92

[image2]: https://main--www-eds--jackzhaojin.aem.page/media_1bd05f34d900d3e01072ab778ed0520df3a703fd1.jpg#width=144&height=92

[image3]: https://main--www-eds--jackzhaojin.aem.page/media_1e7aa2aced4ba90eb8900403defd07f75f110f6e2.jpg#width=144&height=92

[image4]: https://main--www-eds--jackzhaojin.aem.page/media_1be90731959813d188a8016f90eba67170f14e957.jpg#width=144&height=92

[image5]: https://main--www-eds--jackzhaojin.aem.page/media_180b5f9828324c4c69e3c4a7363ca04f869c1ec3d.jpg#width=1600&height=900

[image6]: https://main--www-eds--jackzhaojin.aem.page/media_1abf2360243dd81d65d07d98907b1ccbced61b110.jpg#width=1600&height=666

[image7]: https://main--www-eds--jackzhaojin.aem.page/media_1fa5d8efbb133e4144c6034e38c579fc0c6b8e67e.jpg#width=1600&height=912

[image8]: https://main--www-eds--jackzhaojin.aem.page/media_16c9e27972128f45a3a2f4d0cd6772fd63ec7d874.jpg#width=1600&height=900

[image9]: https://main--www-eds--jackzhaojin.aem.page/media_1ba2a29933aae10b254691ce5bbbf6262ddc3467f.jpg#width=1600&height=900

[image10]: https://main--www-eds--jackzhaojin.aem.page/media_163a1b6295480ee5c8de385f2458a82c2e5625751.jpg#width=1280&height=720
