1. [Home](/)
2. [Technical Writing](/writing/)
3. From Prompts to Harness

# From Prompts to Harness: How Deterministic Code and Agents Work Together

By [Jack Jin](/) · January 5, 2026 · Updated October 4, 2026 · 11 min read · Includes my 9:42 video

Two agent systems, and one idea under both: let deterministic code set the order and hold the numbers, and let agents make the judgment calls. The first is a Next.js evaluator. A scan runs first, a Claude Agent SDK agent checks the live page, and code blends the two scores 70/30, so the scan still stands if the agent fails. The second is a harness: a deterministic loop that runs planning agents in a fixed order, then research, build and validate agents on each task, where a defect becomes a new subtask. Its second run finished in about a quarter of the time and tokens of the first.

---

+-------------------------------------------------------------------------------------------------------------+
| Rail                                                                                                        |
+------------------------------------------------------+------------------------------------------------------+
|                                                      | **Since then**\                                      |
|                                                      | [What changed](#since)                               |
+------------------------------------------------------+------------------------------------------------------+
| ![][image0]                                          | **Part 1**\                                          |
|                                                      | [Scan plus agent score](#project-1)                  |
+------------------------------------------------------+------------------------------------------------------+
| ![][image1]                                          | **Part 2**\                                          |
|                                                      | [Three levels of capability](#capabilities)          |
+------------------------------------------------------+------------------------------------------------------+
| ![][image2]                                          | **Part 3**\                                          |
|                                                      | [Sub-agents for long sessions](#subagents)           |
+------------------------------------------------------+------------------------------------------------------+
| ![][image3]                                          | **Part 4**\                                          |
|                                                      | [A harness and its requirements](#harness)           |
+------------------------------------------------------+------------------------------------------------------+
| ![][image4]                                          | **Part 5**\                                          |
|                                                      | [Run on main, improve on develop](#iterate)          |
+------------------------------------------------------+------------------------------------------------------+
| ![][image5]                                          | **Part 6**\                                          |
|                                                      | [Defects become subtasks](#loop)                     |
+------------------------------------------------------+------------------------------------------------------+
|                                                      | **Next**\                                            |
|                                                      | [Not built yet](#next)                               |
+------------------------------------------------------+------------------------------------------------------+
| [Watch the video, 9:42](#video)                                                                             |
|                                                                                                             |
| [Project 1 code on GitHub](https://github.com/jackzhaojin/azure-da-mcp/tree/0aacf6d/content-authoring-eval) |
+-------------------------------------------------------------------------------------------------------------+

---

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Fine Print                                                                                                                                                                                                                                                                                                                                                          |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| First published as a LinkedIn video on January 5, 2026, recorded the evening before. Rewritten for this site in October 2026. Code for the first project: [`azure-da-mcp/content-authoring-eval`](https://github.com/jackzhaojin/azure-da-mcp/tree/0aacf6d/content-authoring-eval) at release v1.0.1 (`0aacf6d`). The harness from the second project isn't public. |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

---

+---------------------------------------------------------------------------------------------------------------------------------------+
| Figure                                                                                                                                |
+---------------------------------------------------------------------------------------------------------------------------------------+
| [From Prompts to Harness: Two Agent Systems I Built Over the Holiday Break](https://youtu.be/2CT4u0ToEzA)                             |
|                                                                                                                                       |
| Recorded January 4, 2026. Most parts below link to their moment in the video, or [watch it on YouTube](https://youtu.be/2CT4u0ToEzA). |
+---------------------------------------------------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| id      | video  |
+---------+--------+

---

## What changed since January

These two projects were the start of a run. Two weeks later I turned the harness idea into a plan for a continuous running agent that finds its own work. Later that month I had [my harness and agent build a Playwright demo and present it back to me](/writing/2026-01-29-playwright-stakeholder-demos/), and in February I wrote about [making these AI development modules reusable](/writing/2026-02-05-reusable-ai-development-modules/) instead of rebuilding them each time. The continuous agent grew into [version 2.1](/writing/2026-04-05-continuous-executive-agent-v2-1/) by April.

The rest of this page is how each project works and what it taught me.

+------------------+
| Section Metadata |
+---------+--------+
| id      | since  |
+---------+--------+

---

## 1. An evaluator that blends a deterministic scan with an agent's score

I've been playing with deterministic and agentic capabilities around DA Live for a while. An agent here means a program where the model decides its own next step. Deterministic means the good old workflows, written as code with libraries, that do the same thing every time. The first project mixes the two on purpose.

A user puts in a set of links: PDFs, HTML pages, the original content and the migrated page. Four agents assess the page: structure, accessibility, content fidelity and visual correctness. I built it in Next.js, because it gives you a nice UI with shadcn, it's popular with the AI coding community, and it does everything I need. Instead of a database I used session storage and local storage. Instead of a fancy separate backend I used Next.js's own API routes. And to add a little fun, server-sent events stream results back, so the UI talks to the backend a lot while a batch runs.

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Architecture diagram. The user inputs a set of PDF links and HTML links into a Next.js UI in the browser, which saves to localStorage and sessionStorage. A batch or single request goes to a batch processor doing parallel processing, which streams progress back over SSE. The processor runs deterministic logic (times four) and agentic logic (times four); the agentic side feeds results back to the deterministic side and to the processor. Below the agentic logic: MCP capability, pre-enabled scripts enabled by the agent, and bash with the ability to write and execute its own scripts. A legend colors user boxes black, deterministic blue, agentic red and mixed purple.][image6] |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| The board I walked through in the video. Blue is deterministic, red is agentic, purple is a mix of both.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Most of my time went into the backend. Each of the four agents runs its deterministic step first: Cheerio parses the HTML for structure, axe-core scans accessibility, unpdf pulls text out of the PDF, and Playwright with pixelmatch captures and compares screenshots. Those return numbers, booleans and lists, with no interpretation. Then the agent gets those results in its prompt, goes and looks at the live page with its own tools, and writes the findings, the recommendations and a score.

Then deterministic code puts it back together. The final score for each agent is 70% the agent's judgment and 30% the scan:

+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| Code (wrap)                                                                                                                                            |
+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| content-authoring-eval/src/lib/agents/accessibility/agentic.ts, lines 228 to 239                                                                       |
|                                                                                                                                                        |
| [0aacf6d on GitHub](https://github.com/jackzhaojin/azure-da-mcp/blob/0aacf6d/content-authoring-eval/src/lib/agents/accessibility/agentic.ts#L228-L239) |
+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                                                    |
| /**                                                                                                                                                    |
|  * Calculate final score by combining deterministic and agentic scores                                                                                 |
|  * 70% agentic (Claude's user-impact assessment) \+ 30% deterministic (automated scan)                                                                 |
|  */                                                                                                                                                    |
| function calculateFinalScore(                                                                                                                          |
|   deterministicScore: number,                                                                                                                          |
|   agenticScore: number                                                                                                                                 |
| ): number {                                                                                                                                            |
|   // Weighted combination: 70% agentic \+ 30% deterministic                                                                                            |
|   const finalScore = Math.round(agenticScore * 0.7 \+ deterministicScore * 0.3);                                                                       |
|   return Math.max(0, Math.min(100, finalScore));                                                                                                       |
| }                                                                                                                                                      |
| ```                                                                                                                                                    |
+--------------------------------------------------------------------------------------------------------------------------------------------------------+

And if the agent step fails, the scan's result stands on its own. Below are the repo's own two functions with the numbers from one of its tests: the scan scores a page 65, the agent scores it 45. Drag either score to see that the agent's number moves the result more than twice as much as the scan's. Then tick the failure box to see what the report falls back to.

+--------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Explainer (score blend)                                                                                                                                      |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Score blend · calculateFinalScore and calculateGrade, the same 70/30 formula in all four agents                                                              |
|                                                                                                                                                              |
| [source](https://github.com/jackzhaojin/azure-da-mcp/blob/0aacf6d/content-authoring-eval/src/lib/agents/accessibility/agentic.ts#L228-L250)                  |
+---------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| A test in the repo uses this example: the                     | ```                                                                                          |
| scan scores the page 65, the agent scores it                  | Math.round(45 * 0.7 \+ 65 * 0.3)                                                             |
| 45\. With JavaScript on, you can move both                    | = Math.round(51)                                                                             |
| scores and make the agent step fail.                          | = 51                                                                                         |
|                                                               | ```                                                                                          |
| **Deterministic score** axe-core scan, runs first, every time |                                                                                              |
|                                                               | *Grade thresholds from calculateGrade*                                                       |
| **Agent's score** Claude reads the scan,                      |                                                                                              |
| then checks the live page                                     | 1. **excellent** 90 and up                                                                   |
|                                                               | 2. **good** 75 to 89                                                                         |
| The agent step fails (no response, or an                      | 3. **acceptable** 60 to 74                                                                   |
| answer missing a required field)                              | 4. **needs improvement** 40 to 59                                                            |
|                                                               | 5. **critical** below 40                                                                     |
| What each side contributes                                    |                                                                                              |
|                                                               |                                                                                              |
| - agent × 0.7                                                 |                                                                                              |
| - scan × 0.3                                                  |                                                                                              |
+---------------------------------------------------------------+-----------------------------------------------+----------------------------------------------+
| Final score **{score}**, {grade}                              | The two scores agree, so the blend matches    | Score **{scan}**, from the scan alone        |
|                                                               | the scan.                                     |                                              |
| 70% of the agent's {agent} plus 30% of the scan's {scan}.     |                                               | The agent step failed, so the report keeps   |
| {pull}                                                        | The agent's lower score pulls the result      | the scan's {scan} on its own: one finding    |
|                                                               | {points} under the scan.                      | per axe-core violation, no summary and no    |
|                                                               |                                               | grade.                                       |
|                                                               | The agent's higher score lifts the result     |                                              |
|                                                               | {points} over the scan.                       |                                              |
+---------------------------------------------------------------+-----------------------------------------------+----------------------------------------------+

This is the mix I was after. Deterministic code kicks off the agents, the agents work from deterministic results, and deterministic code takes the agents' output and assembles the final report. There are lots of reasons to keep parts of a system deterministic. When the agent misbehaves, the report still has numbers in it. On January 1, I tagged release 1.0.1 and the containers went out to my free Oracle Cloud VM.

Watch this part [0:16 Two projects, and the evaluator](https://youtu.be/2CT4u0ToEzA?t=16) [1:12 Deterministic steps in the backend](https://youtu.be/2CT4u0ToEzA?t=72)

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | project-1 |
+---------+-----------+

---

## 2. Three levels of agent capability, from MCP tools to writing its own code

The agents can do three kinds of things. In the board above they're the three boxes along the bottom.

First, MCP. The Model Context Protocol is how an agent gets tools, and with the Claude Agent SDK each agent can use a set of MCP servers. The important one is Playwright, which gives the agent eyes: it can open the page in a real browser, see the work, and check its own logic against what's actually there.

Second, scripts written ahead of time. Beyond MCP tools, I wanted scripts that already exist, for the AI to decide to use when it's appropriate. Say an agent can choose between scripts one, two and three based on the criteria it's assessing. It can look at a page and decide this one needs script two and script three, and that choice is the important part.

Third, writing and running its own code. This one is arguably the most dangerous, but also the most interesting. There was a talk from someone at Anthropic recently about how giving agents the ability to write code and execute it on the fly makes them much more capable. You're not asking someone to do work without letting them write code themselves. This is where I did the most experimenting. Here's how every agent is started:

+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| Code (wrap)                                                                                                                                            |
+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| content-authoring-eval/src/lib/agents/accessibility/agentic.ts, lines 297 to 309                                                                       |
|                                                                                                                                                        |
| [0aacf6d on GitHub](https://github.com/jackzhaojin/azure-da-mcp/blob/0aacf6d/content-authoring-eval/src/lib/agents/accessibility/agentic.ts#L297-L309) |
+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                                                    |
|     // Stream messages from Claude with tool access                                                                                                    |
|     for await (const message of query({                                                                                                                |
|       prompt: userPrompt,                                                                                                                              |
|       options: {                                                                                                                                       |
|         model: 'claude-sonnet-4-5-20250929',                                                                                                           |
|         maxTurns: 20,                                                                                                                                  |
|         systemPrompt: systemPromptText,                                                                                                                |
|         mcpServers,                                                                                                                                    |
|         permissionMode: 'bypassPermissions' as const,                                                                                                  |
|         allowDangerouslySkipPermissions: true,                                                                                                         |
|         cwd: process.cwd(),                                                                                                                            |
|       }                                                                                                                                                |
|     })) {                                                                                                                                              |
| ```                                                                                                                                                    |
+--------------------------------------------------------------------------------------------------------------------------------------------------------+

The `mcpServers` line hands over Playwright and a filesystem server. `bypassPermissions` means the agent doesn't stop to ask before it runs a Bash command. That's only something I'd do on a machine I trust enough, and the release runs in a Docker container on that Oracle VM. The prompts tell each agent what's worth running. The structure agent, for example, is told to run `lighthouse --only-categories=seo <url> --output=json --quiet` through Bash, and to open the page with Playwright and inspect the live DOM before it gives its assessment.

Watch this part [2:01 MCP and Playwright](https://youtu.be/2CT4u0ToEzA?t=121) [2:24 Scripts written ahead of time](https://youtu.be/2CT4u0ToEzA?t=144) [2:53 Writing and running its own code](https://youtu.be/2CT4u0ToEzA?t=173)

+------------------------+
| Section Metadata       |
+---------+--------------+
| id      | capabilities |
+---------+--------------+

---

## 3. Long build sessions, with the work handed to sub-agents

How I built this one isn't too different from most of my AI coding projects, with one big change: Claude does the long working sessions. My longest session on this project ran an hour and 45 minutes.

The technique is a mini agent harness. Claude does the orchestration, but its context window barely fills up, because all the building work is handed off to sub-agents. A sub-agent is a separate agent session with its own context window. Each one takes a piece end to end, and in total they can run for many hours. That's a big improvement over what I did before, when I was doing the planning, the refinement and the task-level work myself.

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Diagram titled how it was built. From Me, three branches: ChatGPT voice brainstorming and idealization; Claude refinement on why, what, how and when; and Claude Code long running build orchestration. The orchestration box leads to sub-agents for building, about two hours per batch, and to all my inputs and results or actions logged. At the bottom, two dashed boxes compare five months ago, three monitors and manual build orchestration, with now, better AI life balance.][image7] |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| How the first project was built. The bottom row compares orchestrating builds by hand with handing them to sub-agents.                                                                                                                                                                                                                                                                                                                                                                              |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Five months before this, I ran three agents at the same time, by hand, on three monitors, and I was the orchestrator. It was a lot of work. With sub-agents, a build ran for two hours on its own and I didn't need to be at the desk.

Watch this part [3:37 How I built it](https://youtu.be/2CT4u0ToEzA?t=217) [4:34 Three agents by hand, five months before](https://youtu.be/2CT4u0ToEzA?t=274)

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | subagents |
+---------+-----------+

---

## 4. A harness that builds software, and the requirements I gave it

The second project shifts from building a piece of software to building a harness that builds software. A harness, in this sense, is the code around the agents: the loop, the order they run in, what they hand each other and how the work gets checked. One file goes in, a full solution comes out, and it runs for hours, possibly days if you have the tokens.

There's a lot of talk right now about agent harnesses, the Ralph loop and a bunch of other ideas. I drew on those, on my own earlier projects (two versions of spec-driven development and the sub-agent orchestration above), on the BMAD and Spec Kit projects, and on years of consulting work in content management systems.

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                                         |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Diagram. Five inputs feed into Harness idealization and concepting: spec driven development v1 with task master, spec driven development v2 with ad hoc and test suite, the BMAD project and Spec Kit project, sub-agent orchestration and context management, and years of consulting in CMS. A requirements box lists seven requirements.][image8] |
|                                                                                                                                                                                                                                                                                                                                                        |
| What went into the harness, and the requirements I gave it.                                                                                                                                                                                                                                                                                            |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

I came up with a set of requirements:

1. A 24-hour agentic run, from feature to bug.
2. Works on a new or an existing code base.
3. Human-readable memory and handoffs, and each run has its own context.
4. Eventually, support for multiple models and AI vendors.
5. Move away from chatting. This is built for a generation of workers who googled.
6. Repeatable and evaluable: run time, quality, defect loops, did it work, and how close it came to the original requirements.
7. A learning project. The best way to understand a harness, and to figure out where the human in the loop should be, is to jump right in.

Then I had Claude build it. This one was a lot more hands-on for me. I wasn't writing the code, but I was watching every line of code and reading every single prompt and refining it. The first build cycle took some time, me and the AI refining it together, because I had a good idea of how it should be done. I was guiding the AI on how to build a harness.

Watch this part [5:03 A harness that builds software](https://youtu.be/2CT4u0ToEzA?t=303) [5:48 The requirements](https://youtu.be/2CT4u0ToEzA?t=348) [5:59 Having Claude build it](https://youtu.be/2CT4u0ToEzA?t=359)

+-------------------+
| Section Metadata  |
+---------+---------+
| id      | harness |
+---------+---------+

---

## 5. Running on main while improving the next run on develop

Once it was built and running, this was the first time I had a real reason to use branches in my solo projects. The agent on `main` runs for hours. The first run took six hours to finish. While it runs, a `develop` branch off `main` holds the next run's improvements. Any immediate bug fix that needs a restart of the build goes into `main`. Every enhancement for the next run goes into `develop`.

In a second VS Code window, my agent and I read the handoff documents of the run in progress. That's why one of my requirements is that every AI handoff is human readable. Me and the AI were looking at the memory, the logs and how the AI proceeded with each step, and optimizing it for the next run while the first one was still going.

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Diagram continuing from harness idealization: building and dev cycle; then git worktree, a second VS Code assessing ongoing handoffs and runs to optimize, with a note on iterative refinement via a closed loop similar to gradient descent; then repeat and optimize, looking at both the process and the output, with a dotted line back to building. An outcomes box: the first complete build didn't fail but took three human-in-the-loop iterations and six hours; the run with the same requirements later completed all requirements in code quality and pattern in a quarter of the time and tokens with no human intervention.][image9] |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| The iteration cycle. On the board I misspelled gradient descent; the idea is a closed loop that improves a little each run.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

The outcomes: the first complete build didn't fail, but it took six hours and three rounds of me stepping in. The second run, with the same requirements, finished in about a quarter of the time and tokens, met all the requirements on code quality and patterns, and needed no human intervention. I saved a lot of money.

Watch this part [6:22 Running on main, improving on develop](https://youtu.be/2CT4u0ToEzA?t=382) [7:20 Six hours, then a quarter of the time](https://youtu.be/2CT4u0ToEzA?t=440)

+-------------------+
| Section Metadata  |
+---------+---------+
| id      | iterate |
+---------+---------+

---

## 6. A deterministic loop where defects become subtasks

What I built is a long-running session. I want to move away from chat. I don't even start the run myself anymore. I have the AI launch it, log it and monitor it.

The loop itself is deterministic. It decides which agent runs next and walks through them. I made it deterministic because I don't want the AI to give up easily. Each run starts with four separate planning agents, and they run in exactly this order: why, what, how, when. I've done this planning by hand quite a few times, and the order matters. Without the how, the when doesn't know how big to break down each task.

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Harness architecture diagram. A long spec written by a human with AI, no prompting, goes to AI log monitoring and collaboration, which launches and monitors a deterministic processor that, once in task mode, picks up the next available task. The processor runs planning agents (why, what, how, when in sequence) and task-level agents, both returning human-readable handoffs. Task-level agents split into research (analyze current code and goal, generate a task spec), build (Playwright MCP giving AI eyes and self validation, build plus test, ad hoc and e2e regression), and validate (product owner UAT, will create a subtask, so executing on v2 creates v2.1). A dashed box off validate reads call for human in the loop or replan.][image10] |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| The harness loop. Blue is the deterministic processor, red is the agents.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Then the task-level agents run, one task at a time for now. There's room for optimization there. The research agent looks at the current code and the goal and produces a really good functional spec for the task. The build agent builds it. It has MCP and Playwright, so it can test what it's building, and that's really important. It also has to keep a solid regression test suite and do a bunch of ad hoc testing while it builds.

The validation agent is one of the most important parts. In my manual builds, I was the one validating what the AI built, and I logged defects whenever it didn't give me what I expected. So I dedicated an agent to that job. When it finds a defect on task 2, it creates task 2.1, or 2.1 and 2.2. When task 2 is done, the deterministic loop checks whether 2.1 or 2.2 exists before it moves on to task 3. So even a deterministic loop can pick up the validator's handoff. To the loop, a subtask is just the next task.

Below is a simplified model of that ordering rule, not the harness code. It starts with the case from the video, task 2 coming back with a defect. Change what the validator finds on any task and the run order on the right updates: each subtask lands right after its parent, before the next planned task.

+-----------------------------------------------------------------------------------------------------------------------+
| Explainer (task loop)                                                                                                 |
+-----------------------------------------------------------------------------------------------------------------------+
| Loop order · a simplified model of the rule from the video                                                            |
+-----------------------------------------------------------+-----------------------------------------------------------+
| Planning agents, once per run                             | The order the loop runs them                              |
|                                                           |                                                           |
| 1. why                                                    | Run order 1, 2, 2.1, 3, 4: the defect on task 2 became    |
| 2. what                                                   | task 2.1, and the loop ran it before task 3.              |
| 3. how                                                    |                                                           |
| 4. when                                                   | 1. 1                                                      |
|                                                           | 2. 2                                                      |
| What the validator finds on each task                     | 3. 2.1                                                    |
|                                                           | 4. 3                                                      |
| - **Task 1** passes                                       | 5. 4                                                      |
| - **Task 2** 1 defect                                     |                                                           |
| - **Task 3** passes                                       | ```                                                       |
| - **Task 4** passes                                       | loop: run planning agents in order: why, what, how, when  |
|                                                           | loop: next available task is 1                            |
| * passes                                                  |   validate: passed                                        |
| * 1 defect                                                | loop: next available task is 2                            |
| * 2 defects                                               |   validate: 1 defect logged, created 2.1                  |
|                                                           | loop: 2.1 exists, so it runs before 3                     |
| *Defects on task {n}*                                     | loop: next available task is 2.1                          |
|                                                           |   validate: passed                                        |
|                                                           | loop: next available task is 3                            |
|                                                           |   validate: passed                                        |
|                                                           | loop: next available task is 4                            |
|                                                           |   validate: passed                                        |
|                                                           | loop: no tasks left, run complete                         |
|                                                           | ```                                                       |
+-----------------------------------------------------------+-----------------------------------------------------------+
| ```                                                       | Run order {order}: each defect became a subtask           |
| loop: run planning agents in order: {plan}                | ({subtasks}), and the loop ran each one right after its   |
| loop: next available task is {task}                       | parent task.                                              |
|   validate: {count} logged, created {subtasks}            |                                                           |
| loop: {first} exists, so it runs before {next}            | Run order {order}: no defects, so the loop ran the plan   |
|   validate: passed                                        | as written.                                               |
| loop: no tasks left, run complete                         |                                                           |
| ```                                                       |                                                           |
|                                                           |                                                           |
| the run ends                                              |                                                           |
+-----------------------------------------------------------+-----------------------------------------------------------+
| Subtasks pass in this model to keep it short. In the real harness each one gets the same research, build and validate |
| cycle.                                                                                                                |
+-----------------------------------------------------------------------------------------------------------------------+

On the board, the validator also has a dashed box: call for a human in the loop, or replan. That's the future state. If the build drifts far enough from the original vision, say ten steps back the plan no longer fits, the validator should be able to trigger a replan so the roadmap realigns before the next iteration. I hadn't built that yet.

Watch this part [7:47 Why the loop is deterministic](https://youtu.be/2CT4u0ToEzA?t=467) [8:04 Planning: why, what, how, when](https://youtu.be/2CT4u0ToEzA?t=484) [8:31 Research and build agents](https://youtu.be/2CT4u0ToEzA?t=511) [8:53 The validator turns defects into subtasks](https://youtu.be/2CT4u0ToEzA?t=533)

+------------------+
| Section Metadata |
+---------+--------+
| id      | loop   |
+---------+--------+

---

## 7. What the harness still doesn't do

Next for me is to keep building the harness and integrate it with other work, because understanding comes from doing and building.

What I didn't get to: the task agents still run one at a time, the replan step is only a dashed box, and the harness code isn't something I've published. If you've built a harness with a replan step, I'd like to know how you decide when the drift is big enough to stop and replan.

+------------------+
| Section Metadata |
+---------+--------+
| id      | next   |
+---------+--------+

---

## Related

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Row List                                                                                                                                                                |
+-----------+---------------------------------------------------------------------------------------------------------------------+---------------------------------------+
| Portfolio | [The Content Factory](/portfolio/content-factory/)                                                                  | The azure-da-mcp repo this evaluator  |
|           |                                                                                                                     | lives in, and what it grew into.      |
+-----------+---------------------------------------------------------------------------------------------------------------------+---------------------------------------+
| Writing   | [Making AI-Driven Development Modules Reusable](/writing/2026-02-05-reusable-ai-development-modules/)               | A month later: one harness under      |
|           |                                                                                                                     | every pattern instead of a rebuild    |
|           |                                                                                                                     | each time.                            |
+-----------+---------------------------------------------------------------------------------------------------------------------+---------------------------------------+
| Writing   | [A 24/7 Coding Agent: the Continuous Executive Agent at v2.1](/writing/2026-04-05-continuous-executive-agent-v2-1/) | Where the harness idea went: an agent |
|           |                                                                                                                     | that picks its own work.              |
+-----------+---------------------------------------------------------------------------------------------------------------------+---------------------------------------+

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

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Metadata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| title                   | From Prompts to Harness: Deterministic Code and Agents \| Jack Jin                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| description             | How to mix deterministic code and agents: an evaluator that blends a scan with an agent's score 70/30, and a harness loop of planning, build and validate agents.                                                                                                                                                                                                                                                                                                                                                                                                        |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| template                | article                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image                   | ![Two of Jack's whiteboard diagrams side by side: the evaluator that mixes deterministic and agentic logic, and the agentic harness loop][image11]                                                                                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image:alt               | Two of Jack's whiteboard diagrams side by side: the evaluator that mixes deterministic and agentic logic, and the agentic harness loop                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| published-time          | 2026-01-05                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| modified-time           | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| json-ld                 | {"@context":"https\://schema.org","@graph":\[{"@type":"Person","@id":"https\://www\.jackzhaojin.com/#person","name":"Jack Jin","url":"https\://www\.jackzhaojin.com/","jobTitle":"Associate Director","worksFor":{"@type":"Organization","name":"Accenture","department":{"@type":"Organization","name":"Adobe Business Group"}},"sameAs":\["https\://www\.linkedin.com/in/jackjin","https\://github.com/jackzhaojin","https\://www\.youtube.com/@jackjin8467","https\://www\.credly.com/users/jack-jin"],"award":\["Adobe Experience Manager Champion, class of         |
|                         | 2026-2027","AEM Rockstar winner, Adobe Summit 2024"]},{"@type":"WebSite","@id":"https\://www\.jackzhaojin.com/#website","url":"https\://www\.jackzhaojin.com/","name":"Jack Jin","publisher":{"@id":"https\://www\.jackzhaojin.com/#person"}},{"@type":"TechArticle","@id":"https\://www\.jackzhaojin.com/writing/2026-01-05-from-prompts-to-harness/#article","headline":"From Prompts to Harness: How Deterministic Code and Agents Work Together","description":"How to mix deterministic code and agents: an evaluator that blends a scan with an agent's score      |
|                         | 70/30, and a harness loop of planning, build and validate agents.","author":{"@id":"https\://www\.jackzhaojin.com/#person"},"publisher":{"@id":"https\://www\.jackzhaojin.com/#person"},"image":"https\://www\.jackzhaojin.com/writing/2026-01-05-from-prompts-to-harness/media\_1ed1a50bdf6ad96ebbb6ceeb9b2918a3f93850dc3.jpg","mainEntityOfPage":"https\://www\.jackzhaojin.com/writing/2026-01-05-from-prompts-to-harness/","isPartOf":{"@id":"https\://www\.jackzhaojin.com/#website"},"about":\["AI agent harness","Claude Agent SDK","Deterministic and agentic    |
|                         | workflows","Playwright MCP","Next.js"],"datePublished":"2026-01-05","dateModified":"2026-10-04","inLanguage":"en","video":{"@id":"https\://www\.jackzhaojin.com/writing/2026-01-05-from-prompts-to-harness/#video"}},{"@type":"VideoObject","@id":"https\://www\.jackzhaojin.com/writing/2026-01-05-from-prompts-to-harness/#video","name":"From Prompts to Harness: Two Agent Systems I Built Over the Holiday Break","description":"Two agent systems, and one idea under both: let deterministic code set the order and hold the numbers, and let agents make the     |
|                         | judgment                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|                         | calls.","thumbnailUrl":"https\://www\.jackzhaojin.com/writing/2026-01-05-from-prompts-to-harness/media\_1ed1a50bdf6ad96ebbb6ceeb9b2918a3f93850dc3.jpg","uploadDate":"2026-10-03T19:56:59Z","duration":"PT9M42S","embedUrl":"https\://www\.youtube-nocookie.com/embed/2CT4u0ToEzA"},{"@type":"BreadcrumbList","@id":"https\://www\.jackzhaojin.com/writing/2026-01-05-from-prompts-to-harness/#breadcrumb","itemListElement":\[{"@type":"ListItem","position":1,"name":"Home","item":"https\://www\.jackzhaojin.com/"},{"@type":"ListItem","position":2,"name":"Technical |
|                         | Writing","item":"https\://www\.jackzhaojin.com/writing/"},{"@type":"ListItem","position":3,"name":"From Prompts to Harness","item":"https\://www\.jackzhaojin.com/writing/2026-01-05-from-prompts-to-harness/"}]}]}                                                                                                                                                                                                                                                                                                                                                      |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| og:image:alt            | Two of Jack's whiteboard diagrams side by side: the evaluator that mixes deterministic and agentic logic, and the agentic harness loop                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:published\_time | 2026-01-05                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:modified\_time  | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:author          | https\://www\.jackzhaojin.com/                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-summary         | Let deterministic code set the order and hold the numbers, and let agents make the judgment calls. A Next.js evaluator that blends a scan with an agent's score 70/30, and a harness loop where a defect becomes a subtask, with the real scoring code and a model of the loop to play with.                                                                                                                                                                                                                                                                             |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-image           | https\://www\.jackzhaojin.com/writing/media\_1ed1a50bdf6ad96ebbb6ceeb9b2918a3f93850dc3.jpg?width=750\&format=jpg\&optimize=medium                                                                                                                                                                                                                                                                                                                                                                                                                                        |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-topics          | AI Engineering                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-reading-time    | 11 min read                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-video-time      | 9:42 video                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-url       | https\://youtu.be/2CT4u0ToEzA                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-label     | Watch on YouTube                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-keywords        | agent harness claude agent sdk claude code sub-agents playwright mcp mcp next.js shadcn server-sent events axe-core cheerio unpdf pixelmatch lighthouse docker oracle cloud vm git branches git worktree spec-driven development bmad spec kit ralph loop da live deterministic and agentic                                                                                                                                                                                                                                                                              |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_1a9eca5bfb574dc73606f8827100e913630832f24.png#width=144&height=92

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_134aad09ad72c03f093e0de6c96d24c4206cf4124.png#width=144&height=92

[image2]: https://main--www-eds--jackzhaojin.aem.page/media_1c12c43d85c581e64857bfae9cfe129ae19a1e197.png#width=144&height=92

[image3]: https://main--www-eds--jackzhaojin.aem.page/media_1bf15e4b361867a3d3ba9d860e070c197e539993c.png#width=144&height=92

[image4]: https://main--www-eds--jackzhaojin.aem.page/media_1c430c6829152f86ab7a48624f011e20e2ed0e02f.png#width=144&height=92

[image5]: https://main--www-eds--jackzhaojin.aem.page/media_137e92ec11ceae7ae3070b85045580149f032232a.png#width=144&height=92

[image6]: https://main--www-eds--jackzhaojin.aem.page/media_145404a061e76336c0f9f9d29673f6bae03440303.png#width=1600&height=1416

[image7]: https://main--www-eds--jackzhaojin.aem.page/media_14d77799a82fc0ad30a2165835f610633267aadd1.png#width=1600&height=1338

[image8]: https://main--www-eds--jackzhaojin.aem.page/media_1ffd8af0569c24885c2210d258e2fda279fc67ecc.png#width=1600&height=630

[image9]: https://main--www-eds--jackzhaojin.aem.page/media_17bd3c47afebdddb766df900b2b16c69aa78ecdc9.png#width=1600&height=1110

[image10]: https://main--www-eds--jackzhaojin.aem.page/media_1f36237c2a01b0e3af3ab8853b6f200ee657429ca.png#width=1600&height=1443

[image11]: https://main--www-eds--jackzhaojin.aem.page/media_1ed1a50bdf6ad96ebbb6ceeb9b2918a3f93850dc3.jpg#width=1280&height=720
