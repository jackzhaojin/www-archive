1. [Home](/)
2. [Technical Writing](/writing/)
3. AI-Coded Next.js Agent, Part 1

# A 100% AI-Coded Next.js Agent, Part 1: The Four Practices Behind Release 1.0

By [Jack Jin](/) · July 6, 2025 · Updated October 4, 2026 · 9 min read · Includes my 9:30 video

Can AI write every line of a public-facing app? In June 2025 I tested it with a Next.js AI agent, in a framework I had never coded in, without writing or pasting a single line of code. Release 1.0 went live on Azure with full CI/CD. This part covers what the agent does and the four practices that got it there: planning files the AI works from, early CI/CD with real cloud access, a person in the product manager seat, and comparing models. It also covers where each one fell short.

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Series                                                                                                                                                                                     |
+----------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+
| Three-part series                                                                            | Series: the 100% AI-coded Next.js agent                                                     |
+----------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+
| **[Part 1](/writing/2025-07-06-ai-coded-nextjs-agent-release-1/)**[The four practices behind release 1.0](/writing/2025-07-06-ai-coded-nextjs-agent-release-1/)                            |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **[Part 2](/writing/2025-07-07-ai-coded-nextjs-agent-cicd-infrastructure/)**[CI/CD, cloud identities and the architecture](/writing/2025-07-07-ai-coded-nextjs-agent-cicd-infrastructure/) |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **[Part 3](/writing/2025-07-11-scaling-ai-coding-delivery-methodology/)**[Scaling the method to a delivery team](/writing/2025-07-11-scaling-ai-coding-delivery-methodology/)              |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

---

+----------------------------------------------------------------------------------------------------+
| Rail                                                                                               |
+--------------------------------------------------+-------------------------------------------------+
|                                                  | **Since 2025**\                                 |
|                                                  | [Where it stands now](#changed)                 |
+--------------------------------------------------+-------------------------------------------------+
| ![][image0]                                      | **The rules**\                                  |
|                                                  | [Zero lines of code, new framework](#part-1)    |
+--------------------------------------------------+-------------------------------------------------+
|                                                  | **The demo**\                                   |
|                                                  | [What release 1.0 does](#part-2)                |
+--------------------------------------------------+-------------------------------------------------+
|                                                  | **1**\                                          |
|                                                  | [PRD, MDC, plus a blueprint](#part-3)           |
+--------------------------------------------------+-------------------------------------------------+
| ![][image1]                                      | **2**\                                          |
|                                                  | [Backend tested, UI not](#part-4)               |
+--------------------------------------------------+-------------------------------------------------+
| ![][image2]                                      | **3**\                                          |
|                                                  | [Technical product manager](#part-5)            |
+--------------------------------------------------+-------------------------------------------------+
| ![][image3]                                      | **4**\                                          |
|                                                  | [Models, and efficiency](#part-6)               |
+--------------------------------------------------+-------------------------------------------------+
| ![][image4]                                      | **Wrap-up**\                                    |
|                                                  | [Takeaways and limits](#takeaways)              |
+--------------------------------------------------+-------------------------------------------------+
| [Watch the video, 9:30](#video)                                                                    |
|                                                                                                    |
| [Part 2: CI/CD and infrastructure](/writing/2025-07-07-ai-coded-nextjs-agent-cicd-infrastructure/) |
|                                                                                                    |
| [Part 3: Scaling the method](/writing/2025-07-11-scaling-ai-coding-delivery-methodology/)          |
|                                                                                                    |
| [Code on GitHub](https://github.com/jackzhaojin/shadow-pivot-ai-agentv2/tree/75de1c3)              |
+----------------------------------------------------------------------------------------------------+

---

+--------------------------------------------------------------------------------------------------------------------+
| Figure                                                                                                             |
+--------------------------------------------------------------------------------------------------------------------+
| [100% AI-Coded, Public-Facing Next.js Agent - Release 1.0](https://youtu.be/5cdnilROxbs)                           |
|                                                                                                                    |
| Published on YouTube on June 29, 2025, a week before the LinkedIn post. Each part below links to its moment in the |
| video, or [watch it on YouTube](https://youtu.be/5cdnilROxbs).                                                     |
+--------------------------------------------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Fine Print                                                                                                                                                                                                                                                                                                                                         |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| First published as a LinkedIn video on July 6, 2025. Rewritten for this site in October 2026. Code: [shadow-pivot-ai-agentv2](https://github.com/jackzhaojin/shadow-pivot-ai-agentv2/tree/75de1c3) at `75de1c3`. Release 1.0 is the [`v1.0.0` tag](https://github.com/jackzhaojin/shadow-pivot-ai-agentv2/releases/tag/v1.0.0) from June 17, 2025. |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| id      | video  |
+---------+--------+

---

## Where the project stands now

The repo is still public, but the project stopped at the start of release 1.1. The last commit, on July 15, 2025, switched the docs to focus on 1.1. The only 1.1 work in the repo is a Cypress test plan.

The hosted demo is gone. When I checked on October 3, 2026, its address returned a 504 error from CloudFront. So this page uses screenshots and the code instead of a live link.

I kept going with this way of working. My later pieces on [moving from prompts to a harness](/writing/2026-01-05-from-prompts-to-harness/), [continuously running agents](/writing/2026-04-05-continuous-executive-agent-v2-1/) and [reusable AI development modules](/writing/2026-02-05-reusable-ai-development-modules/) pick up where this project left off.

+-------------------+
| Section Metadata  |
+---------+---------+
| id      | changed |
+---------+---------+

---

## Zero lines of code, in a framework I had never used

In mid 2025 there was a lot of noise about AI and coding. On one end, AI produces useless code. On the other, AI will replace programmers. Which is it? I wanted to find out with my own hands.

These were the rules I set:

- I write zero lines of code and paste zero lines of code. I edit markdown files, and mostly I ask AI to edit them for me.
- A framework I don't know. I had no professional hands-on experience with Next.js. No AEM, Java or Spring Boot, so I couldn't lean on what I already know.
- A public-facing agent flow, something anyone can open in a browser.
- Reasonable boundaries: no infrastructure as code, and Azure, the cloud I'm most familiar with.

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board, open)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [![Hand-drawn STAR board. Situation: noise in the AI space, a quick intro, AI as a hobby to reinvention, first video. Task: write 0 lines of code and paste 0, create an app in a new language, no infrastructure as code and Azure, release 1.0 demo. Action: five approaches (PRD and MDC from YouTube learnings, early CI/CD and AI autonomy, my new role and AI logging, evaluating models, reviewing each step) each with a lesson learned and an outcome. Result: enable and guide teams, what, how and when documents are key, I had fun and started release 1.1.][image5]](https://content.da.live/jackzhaojin/www-eds/media/writing/2025-07-06-ai-coded-nextjs-agent-release-1/board-star.png) |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| The STAR board I planned the video with. It's checked into the repo next to the code, and this page follows it.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

The repo's README spells out the split of work. Agents handle all code, tests, documentation and CI/CD configuration. I handle markdown, manual testing and the Azure resources.

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (shot, narrow)                                                                                                                                                                                                                                                                                                                             |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![The AI Development Approach section of the repo README: a table splitting work between AI agents (all code implementation, documentation and test automation, architecture and implementation) and the human maintainer (minor markdown adjustments, manual testing, Azure resource management), then a six-step development workflow.][image6] |
|                                                                                                                                                                                                                                                                                                                                                   |
| The rules, as the agents read them in the README.                                                                                                                                                                                                                                                                                                 |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Watch this part [0:00 The noise about AI coding](https://youtu.be/5cdnilROxbs?t=0) [1:23 The challenge](https://youtu.be/5cdnilROxbs?t=83)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-1 |
+---------+--------+

---

## What release 1.0 does with a one-line brief

For the demo I typed something simple: "login form with reset password and a register link. Please make it modern." Then the agent runs a pipeline of steps, all on its own:

1. It generates three to five design concepts from the brief. My demo run made five.
2. The model scores and ranks the concepts, with fallbacks when a response can't be parsed, and picks the best one to move forward.
3. It generates three Figma specifications in parallel, each with its components and design system.
4. It evaluates each spec and writes a rating a person can read. This is the part I like most. It's close to something I would otherwise do by hand.
5. It selects the best spec, and you can download the artifacts.

The model behind it is GPT-4o mini on Azure AI Foundry. The release 1.0 PRD kept the scope to Figma specs: no code generation and no saved sessions, which were planned for later releases. I kept the browser's network tab open during the demo for anyone who wanted to see the calls.

One correction to my own claim. Saying "100% AI" isn't quite right: I did a lot of the architecture and design, and arguably engineering. The AI wrote every line of code.

Watch this part [1:54 The release 1.0 demo](https://youtu.be/5cdnilROxbs?t=114) [4:32 Not quite 100% AI](https://youtu.be/5cdnilROxbs?t=272)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-2 |
+---------+--------+

---

## 1. A PRD and an MDC task list, plus a blueprint for consistency

I went in with what the vibe coding videos recommended. The [best one I found](https://www.youtube.com/watch?v=dH4mc9VQ96g) shows how to write a PRD, a product requirements document, and break it into an MDC file. The MDC is the task list the AI works through. Think of it as a Jira ticket that checks off its own boxes.

That was a must-do, and I still had to pause and replan twice. Partly because I changed direction in the middle of the project, and partly because I hadn't spent enough time planning and designing the product in the first place.

The second lesson was consistency. Ask AI to build the same thing seven times and you might get it three different ways. As a technical architect, I didn't want that. So I added two things of my own:

- A technical blueprint that says how the app is built. Its diagrams are Mermaid, diagrams as code, so the AI can read them too.
- One feature, the parallel Figma spec step, that the AI built test-driven exactly the way I wanted. I captured it as the standard for every step after it.

The outcome was a PRD and MDC that span several releases, and a release 1.0 built on the core blueprint. [Part 3](/writing/2025-07-11-scaling-ai-coding-delivery-methodology/) goes through the documents themselves.

Watch this part [4:46 The PRD and the MDC](https://youtu.be/5cdnilROxbs?t=286) [5:18 The technical blueprint](https://youtu.be/5cdnilROxbs?t=318)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-3 |
+---------+--------+

---

## 2. Early CI/CD let the AI test the backend, but not the UI

The second thing I did was invest early in CI/CD. Every commit, whether a snapshot or a release, gets packaged and deployed. The AI also needed access to the Azure resources, so it could run against the real services and check its own work. I wrote a [separate article](/writing/2025-06-12-azure-rbac-cicd-for-ai-agents/) on how each agent gets that access, and [Part 2](/writing/2025-07-07-ai-coded-nextjs-agent-cicd-infrastructure/) walks through the pipelines.

It paid off on the backend. I started test-driven, so the AI wrote its own unit, end-to-end and endpoint tests and ran them. It could validate the backend routes the whole way through, and it found a lot of its own defects that way.

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (shot, narrow)                                                                                                                                                                                                                                                                            |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Terminal output of node tests/run-endpoint-tests.js against localhost:3000: AI Connection, Design Concepts Generation (5 concepts), Figma Spec Generation, Figma Spec Evaluation and Design Evaluation all succeed with status 200. Summary: passed 5 of 5, success rate 100 percent.][image7] |
|                                                                                                                                                                                                                                                                                                  |
| The endpoint suite, which the AI could run itself: every step of the agent, against the real Azure model.                                                                                                                                                                                        |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

What I didn't invest in was front-end automation, something like Cypress. I should have. Endpoint tests can't replace the UI flow, so I spent a lot of my time testing the UI by hand. With Cypress, the AI could have caught more of its own UI mistakes instead of me acting as its tester. That's why Cypress is the first item of release 1.1, and the plan for it is in [`release-1.1.mdc`](https://github.com/jackzhaojin/shadow-pivot-ai-agentv2/blob/75de1c3/release-1.1.mdc#L23).

Watch this part [5:39 CI/CD and AI autonomy](https://youtu.be/5cdnilROxbs?t=339) [6:15 Codex pull requests](https://youtu.be/5cdnilROxbs?t=375)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-4 |
+---------+--------+

---

## 3. My job became technical product manager

If I'm not writing or pasting code, what am I doing? I'm talking to agents. Some of them are verbose and I have to rein them in to keep them on the mission. Others go straight to the work and won't do anything you didn't ask for. It felt like managing a team of different personalities.

My role became whatever the AI didn't do. Mostly that was technical product management and UI testing. I also kept a log of the conversations worth keeping, in [`docs/ai-log`](https://github.com/jackzhaojin/shadow-pivot-ai-agentv2/tree/75de1c3/docs/ai-log), so I could learn to talk to agents better. And the prompts the app sends to its own model live in versioned JSON files, which [Part 2](/writing/2025-07-07-ai-coded-nextjs-agent-cicd-infrastructure/#part-5) shows.

Two moments show what the job looked like. In the first, the download at the end of the flow gave me a corrupt 198-byte zip, and I saw no server call. I pasted in the server logs and the browser console, and the agent traced the download path and fixed it. In the second, the Figma specs had shrunk from a full, very verbose spec to about 1 KB. I asked what happened and pointed at the prompt template. The template only asked for a simple structure, so the agent wrote a fuller one and the specs came back at 5 KB and up.

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Compare (narrow)                                                                                                                                                                                                                                                                                                                        |
+--------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| The download bug   | ![My message in the editor's agent chat: the UI looks good, but download artifacts gives a corrupt 198-byte zip and no server-side call, followed by the server log and browser console log. The agent reads StepExecutor.tsx and the download route, then changes three files.][image8]                           |
|                    |                                                                                                                                                                                                                                                                                                                    |
|                    | My bug report: what I saw, the server logs and the console log. The agent did the triage.                                                                                                                                                                                                                          |
+--------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| The shrinking spec | ![My message: the flow works, but the Figma JSON lost its detail and is now about 1 KB; it used to be very verbose, maybe look at v1.json. The agent reads the route, the figmaSpec service and the v1.json template and finds the template only asks for a name, a description and a list of components.][image9] |
|                    |                                                                                                                                                                                                                                                                                                                    |
|                    | The tough problem: the specs got thin. I pointed at the prompt template.                                                                                                                                                                                                                                           |
+--------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Its fix            | ![The agent's completion summary: root cause was the simple v1.json template; the fix is a new v2.json template and a nested FigmaSpec interface with design system, layout, interactions, accessibility and implementation; the token limit went from 1000 to 3000 and specs are now 5 KB and up.][image10]       |
|                    |                                                                                                                                                                                                                                                                                                                    |
|                    | The fix: a new prompt template, a richer interface and a higher token limit.                                                                                                                                                                                                                                       |
+--------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Ticket 3.3.6 shows the role best. The agent generates three Figma specs in parallel. When one of them came back without a `name`, the evaluation API answered with a 400 and the whole flow stopped, even though the other two specs were fine. I wrote it up as a story in the MDC, the way I'd write it for a developer, and the agent changed the route to filter out bad specs and keep going.

The figure below runs the route's validation loop from both commits, with the same checks, messages and status codes. The third spec starts out broken, the way the ticket describes it. Switch between before and after: before, one bad spec fails the whole step; after, it gets filtered out and the other two go on. That's the difference between a flow that dies on a partial failure and one that keeps going.

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Explainer (spec filter)                                                                                                                                                     |
+---------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------+
| the checks in app/api/agent/evaluate-figma-specs/route.ts                       | [the fix, dc287d3](https://github.com/jackzhaojin/shadow-pivot-ai-agentv2/commit/dc287d3) |
+---------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------+
| Which version of the route                                                      | What the API sends back                                                                   |
|                                                                                 |                                                                                           |
| - Before the fix                                                                | - All {total} specs go on to the model for evaluation.                                    |
| - After the fix                                                                 | - {evaluated} of {total} specs go on. The flow keeps going and the response says what was |
|                                                                                 |   dropped.                                                                                |
| Three specs from the parallel step go to the evaluation API                     | - The first bad spec ends the request. The whole step fails and the flow stops, whatever  |
|                                                                                 |   the other specs looked like.                                                            |
| 1. Spec 1: Valid spec                                                           | - Nothing valid is left, so this still fails.                                             |
| 2. Spec 2: Valid spec                                                           |                                                                                           |
| 3. Spec 3: Missing its name                                                     | ### Before the fix                                                                        |
|                                                                                 |                                                                                           |
| - Valid spec                                                                    | ```                                                                                       |
| - Missing its name                                                              | HTTP 400                                                                                  |
| - Not a spec at all (null)                                                      | {                                                                                         |
|                                                                                 |   "success": false,                                                                       |
| A simplified run of the route's checks before (`5919200`) and after (`dc287d3`) |   "error": "Invalid spec at index 2: missing or invalid name field"                       |
| the fix. The specs are placeholders made on this page, and the model call isn't | }                                                                                         |
| run.                                                                            | ```                                                                                       |
|                                                                                 |                                                                                           |
|                                                                                 | ### After the fix                                                                         |
|                                                                                 |                                                                                           |
|                                                                                 | ```                                                                                       |
|                                                                                 | HTTP 200                                                                                  |
|                                                                                 | {                                                                                         |
|                                                                                 |   "success": true,                                                                        |
|                                                                                 |   "evaluationResults": [ /* 2 results */ ],                                               |
|                                                                                 |   "message": "Figma specs evaluated successfully",                                        |
|                                                                                 |   "warning": "1 invalid specs were filtered out",                                         |
|                                                                                 |   "invalidSpecs": [ { "index": 2, "reason": "missing or invalid name field" } ]           |
|                                                                                 | }                                                                                         |
|                                                                                 | ```                                                                                       |
+---------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------+

Here's the fix. Bad specs go into a list with the reason, good ones go on, and the request only fails when nothing valid is left:

+----------------------------------------------------------------------------------------------------------------------------------------------+
| Code (stack)                                                                                                                                 |
+----------------------------------------------------------------------------------------------------------------------------------------------+
| app/api/agent/evaluate-figma-specs/route.ts, lines 32 to 58                                                                                  |
|                                                                                                                                              |
| [dc287d3 on GitHub](https://github.com/jackzhaojin/shadow-pivot-ai-agentv2/blob/dc287d3/app/api/agent/evaluate-figma-specs/route.ts#L32-L58) |
+----------------------------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                                          |
|     // Filter out invalid specs and continue with valid ones                                                                                 |
|     const validSpecs = [];                                                                                                                   |
|     const invalidSpecs = [];                                                                                                                 |
|                                                                                                                                              |
|     for (let i = 0; i < figmaSpecs.length; i\+\+) {                                                                                          |
|       const spec = figmaSpecs[i];                                                                                                            |
|       if (!spec \|\| typeof spec !== 'object') {                                                                                             |
|         console.warn(`⚠️ /api/agent/evaluate-figma-specs - Skipping invalid spec at index ${i}: must be an object`);                         |
|         invalidSpecs.push({ index: i, reason: 'must be an object' });                                                                        |
|         continue;                                                                                                                            |
|       }                                                                                                                                      |
|       if (!spec.name \|\| typeof spec.name !== 'string') {                                                                                   |
|         console.warn(`⚠️ /api/agent/evaluate-figma-specs - Skipping invalid spec at index ${i}: missing or invalid name field`);             |
|         invalidSpecs.push({ index: i, reason: 'missing or invalid name field' });                                                            |
|         continue;                                                                                                                            |
|       }                                                                                                                                      |
|       validSpecs.push(spec);                                                                                                                 |
|     }                                                                                                                                        |
|                                                                                                                                              |
|     if (validSpecs.length === 0) {                                                                                                           |
|       console.error('❌ /api/agent/evaluate-figma-specs - No valid specs found');                                                             |
|       return NextResponse.json({                                                                                                             |
|         success: false,                                                                                                                      |
|         error: 'No valid specs found',                                                                                                       |
|         invalidSpecs                                                                                                                         |
|       }, { status: 400 });                                                                                                                   |
|     }                                                                                                                                        |
| ```                                                                                                                                          |
+----------------------------------------------------------------------------------------------------------------------------------------------+

The agent also wrote a test that sends five specs, two valid and three invalid, and checks for a 200 with two evaluation results. And it ticked off the story in the MDC, which is how I knew where things stood.

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (shot)                                                                                                                                                                                                                                                                                                                                                                                  |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Ticket 3.3.6 in release-1.0.mdc, Figma Spec Validation Error Handling, marked completed: the story, the problem (one invalid spec of three made the evaluation API return 400 and stop the flow), and checked tasks to locate the validation, filter invalid specs, improve frontend handling, strengthen prompt validation and add a test with two valid and three invalid specs.][image11] |
|                                                                                                                                                                                                                                                                                                                                                                                                |
| The ticket, as the agent left it in `release-1.0.mdc`: story, problem, every task checked.                                                                                                                                                                                                                                                                                                     |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Watch this part [6:33 My role in vibe coding](https://youtu.be/5cdnilROxbs?t=393) [7:00 Prompts as code 3.0](https://youtu.be/5cdnilROxbs?t=420)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-5 |
+---------+--------+

---

## 4. Claude Sonnet 4 won, and 100% AI still isn't efficient

The fourth thing I did was compare models. Claude Sonnet 4 won. For me it was by far the strongest engineer. It does a bit more than you ask without expanding the scope too much, and if you feed it a lot of context (the PRD, the MDC, the technical design) it comes back close to what you wanted. GPT and Codex do exactly what you ask and nothing more, so they need more input and more direction. They're very good at fixing defects. I tried Gemini 2.5 as well.

Codex runs in the cloud, so you just fire it off. It can finish a pull request while I'm away on the road, and I review it later. Not all of them worked, and some I didn't like, but I merged most. The repo has 42 pull requests. 37 came from Codex branches, and 38 were merged.

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (shot, narrow)                                                                                                                                                                                                                                                                     |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![A list of pull requests on shadow-pivot-ai-agentv2 from June 13 to 18, 2025, such as Implement 3.7 and follow MDC pattern, Start work on version 3.5, Analyze and fix UI defect, and Run tests and generate report, most merged and two closed, with lines added and removed.][image12] |
|                                                                                                                                                                                                                                                                                           |
| Codex pull requests from the middle of the build. Most merged, some closed.                                                                                                                                                                                                               |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

As for efficiency: building 100% with AI isn't efficient yet. Release 1.0 took about 180 commits and 40 pull requests (the `v1.0.0` tag is commit 177), and parts of it were painful. Some models were simply wrong at times. I could have built it a lot faster with AI's help than with AI alone. The best mix is an engineer plus AI.

Watch this part [7:21 Comparing models](https://youtu.be/5cdnilROxbs?t=441) [7:44 180 commits, 40 pull requests](https://youtu.be/5cdnilROxbs?t=464)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-6 |
+---------+--------+

---

## Two takeaways, and the limits of one project

Here's where I landed after release 1.0:

- Leaders need to enable and guide. I had led teams that used AI, with varied results. Enabling means making sure access is given. Guiding means championing it, showing the team what it can do, and making sure everyone uses it the same way so nobody goes out of bounds.
- Write documents that AI and people can both read, and check them into the codebase. The PRD is the what, the technical design is the how, and the release MDC is the when. If you want reliable, consistent, piece-by-piece AI delivery, those three are non-negotiable to me.

Now the limits. It's one person working evenings on one app. The infrastructure was set up by hand. I tested the UI myself because there was no UI automation yet. And the demo isn't running anymore.

Next in the series, [Part 2](/writing/2025-07-07-ai-coded-nextjs-agent-cicd-infrastructure/) slows down on the pipelines, the cloud identities and the architecture, and [Part 3](/writing/2025-07-11-scaling-ai-coding-delivery-methodology/) turns the documents into a method a team can use.

Watch this part [8:04 Three takeaways](https://youtu.be/5cdnilROxbs?t=484) [8:51 Starting release 1.1](https://youtu.be/5cdnilROxbs?t=531)

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | takeaways |
+---------+-----------+

---

## Related

+---------------------------------------------------------------------------------------------------------------------------------------------------------+
| Row List                                                                                                                                                |
+-----------+-------------------------------------------------------------------------------------------------------+-------------------------------------+
| Portfolio | [Shadow Pivot: my first AI-coded app](/portfolio/shadow-pivot/)                                       | The project chapter, with all three |
|           |                                                                                                       | acts and both repos.                |
+-----------+-------------------------------------------------------------------------------------------------------+-------------------------------------+
| Article   | [Azure role-based access and CI/CD for AI agents](/writing/2025-06-12-azure-rbac-cicd-for-ai-agents/) | How each agent on this project got  |
|           |                                                                                                       | access to Azure.                    |
+-----------+-------------------------------------------------------------------------------------------------------+-------------------------------------+
| Article   | [A STAR story generator on Azure](/writing/2025-04-13-vibe-coding-star-story-generator/)              | Prompting GPT-4o-mini for JSON and  |
|           |                                                                                                       | parsing what comes back, two months |
|           |                                                                                                       | earlier.                            |
+-----------+-------------------------------------------------------------------------------------------------------+-------------------------------------+

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

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Metadata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| title                   | AI-Coded Next.js Agent, Part 1: Four Practices Behind Release 1.0 \| Jack Jin                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| description             | What it took to ship a Next.js AI agent written entirely by AI: planning files the AI works from, early CI/CD, a fix for partial failures, and model trade-offs.                                                                                                                                                                                                                                                                                                                                                                                                                             |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| template                | article                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image                   | ![My hand-drawn STAR board for release 1.0: situation, task, five approaches with lessons and outcomes, and the result][image13]                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image:alt               | My hand-drawn STAR board for release 1.0: situation, task, five approaches with lessons and outcomes, and the result                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| published-time          | 2025-07-06                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| modified-time           | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| json-ld                 | {"@context":"https\://schema.org","@graph":\[{"@type":"Person","@id":"https\://www\.jackzhaojin.com/#person","name":"Jack Jin","url":"https\://www\.jackzhaojin.com/","jobTitle":"Associate Director","worksFor":{"@type":"Organization","name":"Accenture","department":{"@type":"Organization","name":"Adobe Business Group"}},"sameAs":\["https\://www\.linkedin.com/in/jackjin","https\://github.com/jackzhaojin","https\://www\.youtube.com/@jackjin8467","https\://www\.credly.com/users/jack-jin"],"award":\["Adobe Experience Manager Champion, class of 2026-2027","AEM Rockstar    |
|                         | winner, Adobe Summit 2024"]},{"@type":"WebSite","@id":"https\://www\.jackzhaojin.com/#website","url":"https\://www\.jackzhaojin.com/","name":"Jack Jin","publisher":{"@id":"https\://www\.jackzhaojin.com/#person"}},{"@type":"TechArticle","@id":"https\://www\.jackzhaojin.com/writing/2025-07-06-ai-coded-nextjs-agent-release-1/#article","headline":"A 100% AI-Coded Next.js Agent, Part 1: The Four Practices Behind Release 1.0","description":"What it took to ship a Next.js AI agent written entirely by AI: planning files the AI works from, early CI/CD, a fix for partial      |
|                         | failures, and model trade-offs.","author":{"@id":"https\://www\.jackzhaojin.com/#person"},"publisher":{"@id":"https\://www\.jackzhaojin.com/#person"},"image":"https\://www\.jackzhaojin.com/writing/2025-07-06-ai-coded-nextjs-agent-release-1/media\_198292da3e9bbce5fdd7f065244a6117108b8df02.jpg","mainEntityOfPage":"https\://www\.jackzhaojin.com/writing/2025-07-06-ai-coded-nextjs-agent-release-1/","isPartOf":{"@id":"https\://www\.jackzhaojin.com/#website"},"about":\["AI-assisted software development","Next.js","Azure AI Foundry","Product requirements documents","Coding  |
|                         | agents"],"datePublished":"2025-07-06","dateModified":"2026-10-04","inLanguage":"en","video":{"@id":"https\://www\.jackzhaojin.com/writing/2025-07-06-ai-coded-nextjs-agent-release-1/#video"}},{"@type":"VideoObject","@id":"https\://www\.jackzhaojin.com/writing/2025-07-06-ai-coded-nextjs-agent-release-1/#video","name":"100% AI-Coded, Public-Facing Next.js Agent - Release 1.0","description":"Release 1.0 of a public-facing Next.js AI agent written entirely by AI: the demo, the four things I did, my role, the models I compared, and three                                    |
|                         | takeaways.","thumbnailUrl":"https\://www\.jackzhaojin.com/writing/2025-07-06-ai-coded-nextjs-agent-release-1/media\_198292da3e9bbce5fdd7f065244a6117108b8df02.jpg","uploadDate":"2025-06-29T21:30:22Z","duration":"PT9M30S","embedUrl":"https\://www\.youtube-nocookie.com/embed/5cdnilROxbs"},{"@type":"BreadcrumbList","@id":"https\://www\.jackzhaojin.com/writing/2025-07-06-ai-coded-nextjs-agent-release-1/#breadcrumb","itemListElement":\[{"@type":"ListItem","position":1,"name":"Home","item":"https\://www\.jackzhaojin.com/"},{"@type":"ListItem","position":2,"name":"Technical |
|                         | Writing","item":"https\://www\.jackzhaojin.com/writing/"},{"@type":"ListItem","position":3,"name":"AI-Coded Next.js Agent, Part 1","item":"https\://www\.jackzhaojin.com/writing/2025-07-06-ai-coded-nextjs-agent-release-1/"}]}]}                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| og:image:alt            | My hand-drawn STAR board for release 1.0: situation, task, five approaches with lessons and outcomes, and the result                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:published\_time | 2025-07-06                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:modified\_time  | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:author          | https\://www\.jackzhaojin.com/                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-summary         | What it took to ship a Next.js AI agent written entirely by AI: what release 1.0 does, the four practices behind it (planning files the AI works from, early CI/CD with real cloud access, a person in the product manager seat, comparing models), where each fell short, and a lab that runs the real fix for a partial failure.                                                                                                                                                                                                                                                           |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-image           | https\://www\.jackzhaojin.com/writing/media\_198292da3e9bbce5fdd7f065244a6117108b8df02.jpg?width=750\&format=jpg\&optimize=medium                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-topics          | AI Engineering                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-reading-time    | 9 min read                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-video-time      | 9:30 video                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-url       | https\://youtu.be/5cdnilROxbs                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-label     | Watch on YouTube                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-keywords        | next.js vibe coding ai coding agents claude sonnet 4 openai codex github copilot gpt-4o mini azure ai foundry prd mdc cypress shadow-pivot-ai-agentv2                                                                                                                                                                                                                                                                                                                                                                                                                                        |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_1b303b2743231648d5c17b3f912210b291ad24f87.png#width=144&height=92

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_1e15c801ecfa2265a39fc5869b1f9a2d657334130.png#width=144&height=92

[image2]: https://main--www-eds--jackzhaojin.aem.page/media_16418cfd5e528d28a4e3885fb36ef6d823aa1b4a5.png#width=144&height=92

[image3]: https://main--www-eds--jackzhaojin.aem.page/media_12e2528168932f6c46adf5e0ec152206616248496.png#width=144&height=92

[image4]: https://main--www-eds--jackzhaojin.aem.page/media_1df6ea7c2eedad3785ee0aa1ef3e18cfa5470ea50.png#width=144&height=92

[image5]: https://main--www-eds--jackzhaojin.aem.page/media_1f38242a298b65c5571ef463ec30b305f5bab67a7.png#width=1600&height=1230

[image6]: https://main--www-eds--jackzhaojin.aem.page/media_1c126c15f5eabcb0fc8d21c393f807c913b6a7f9a.png#width=890&height=1127

[image7]: https://main--www-eds--jackzhaojin.aem.page/media_159db9f30b4fa4384a049e3a5db6ae9db970be0ad.png#width=597&height=567

[image8]: https://main--www-eds--jackzhaojin.aem.page/media_12e8cbe03b15fcae16745977ea41dbd14a08261d5.png#width=850&height=1279

[image9]: https://main--www-eds--jackzhaojin.aem.page/media_1cf52847edfda0fec44e152481aae6058e8963ca1.png#width=840&height=1279

[image10]: https://main--www-eds--jackzhaojin.aem.page/media_172c95823be7e36d351ed000819bab61360fd5d51.png#width=845&height=1295

[image11]: https://main--www-eds--jackzhaojin.aem.page/media_1cd47734c7fdcc23a50407393c781ccb5a7ec3bd1.png#width=1600&height=563

[image12]: https://main--www-eds--jackzhaojin.aem.page/media_18e36f94742bc5041036598c0b1327cc132a897d9.png#width=780&height=769

[image13]: https://main--www-eds--jackzhaojin.aem.page/media_198292da3e9bbce5fdd7f065244a6117108b8df02.jpg#width=1280&height=720
