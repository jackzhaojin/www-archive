1. [Home](/)
2. [Technical Writing](/writing/)
3. Reusable AI Development Modules

# Making AI-Driven Development Modules Reusable: Four Patterns, One Stack

By [Jack Jin](/) · February 5, 2026 · Updated October 4, 2026 · 6 min read · Includes my 9:44 video

Four AI development patterns stack on each other: ad hoc prompting, spec-driven development on top of it, a harness that runs the specs in a loop, and a continuous agent that runs the harness around the clock. Each layer should work on its own and be reused by the layer above, not rebuilt. I learned that by rebuilding the bottom layer four times because AI made rebuilding feel easy. Here is the board that made the mistake obvious, what each layer adds, and the refactor that followed.

---

+------------------------------------------------------------------------------------+
| Rail                                                                               |
+---------------------------------------+--------------------------------------------+
|                                       | **Since then**\                            |
|                                       | [What changed since February](#changed)    |
+---------------------------------------+--------------------------------------------+
| ![][image0]                           | **Part 1**\                                |
|                                       | [Ad hoc prompting](#part-1)                |
+---------------------------------------+--------------------------------------------+
| ![][image1]                           | **Part 2**\                                |
|                                       | [Specs at project and task level](#part-2) |
+---------------------------------------+--------------------------------------------+
| ![][image2]                           | **Part 3**\                                |
|                                       | [A harness on top of the specs](#part-3)   |
+---------------------------------------+--------------------------------------------+
| ![][image3]                           | **Part 4**\                                |
|                                       | [A continuous agent, rebuilt](#part-4)     |
+---------------------------------------+--------------------------------------------+
| ![][image4]                           | **Part 5**\                                |
|                                       | [Reuse the layer below](#part-5)           |
+---------------------------------------+--------------------------------------------+
| [Watch the video, 9:44](#video)                                                    |
|                                                                                    |
| [continuous-agent on GitHub](https://github.com/jackzhaojin/continuous-agent)      |
+------------------------------------------------------------------------------------+

---

It is one diagram in four parts and a lesson. Each part links to its moment in the video if you would rather watch.

---

+--------------------------------------------------------------------------------------------------------------------------------------+
| Figure                                                                                                                               |
+--------------------------------------------------------------------------------------------------------------------------------------+
| [I Rebuilt My AI Agent Stack 4 Times Before Learning This Lesson](https://youtu.be/3l_MtNA3kDY)                                      |
|                                                                                                                                      |
| Recorded February 5, 2026. Each part below links to its moment in the video, or [watch it on YouTube](https://youtu.be/3l_MtNA3kDY). |
+--------------------------------------------------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Fine Print                                                                                                                                                                                                                                                                                                  |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| First published on LinkedIn on February 5, 2026. Rewritten for this site in October 2026. Examples: [harness-v2-test](https://github.com/jackzhaojin/harness-v2-test/tree/03c009e/ai-docs/TASKS) for a harness run, [continuous-agent](https://github.com/jackzhaojin/continuous-agent) for the 24/7 agent. |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| id      | video  |
+---------+--------+

---

## What changed since February

I did the refactor from part 5, at least for the harness. In April 2026 my continuous agent gained a harness execution pattern (commit [`9a85f70`](https://github.com/jackzhaojin/continuous-agent/commit/9a85f70), April 11). The same harness now runs two ways: standalone from one command, or as a goal the 24/7 agent picks up and drives. From the repo's [`HARNESS.md`](https://github.com/jackzhaojin/continuous-agent/blob/360333a/HARNESS.md):

```
npm run harness -- --name generic \
  --prompt ./input/my-app/PROMPT.md \
  --target /tmp/my-app
```

That is the "usable by itself, or inside the next layer up" rule from part 5, in code. Two months later I also pushed reuse one level lower, to skills, in [Two AI Skills for Team Enablement](/writing/2026-04-12-two-ai-skills-team-enablement/).

+-------------------+
| Section Metadata  |
+---------+---------+
| id      | changed |
+---------+---------+

---

## 1. Ad hoc prompting is where we all start

Ad hoc prompting is where I started, and I think where we all start. A good form of it is just me talking to AI. You want to give it a very good first prompt. Sometimes that's me rambling into voice to text, and AI gives me a bunch of work back.

The more advanced version: ramble the same ramble into multiple models, have them compare each other's work, then have one merge it together, keeping the best part of each output. I later did exactly that with four frontier models on my portfolio site, in [Four Frontier Models, One Prompt](/writing/2026-07-21-four-frontier-models-one-prompt/).

In the diagram, ad hoc prompting is red. There is a reason everything is color coded, and it shows up at the end.

Watch this part [0:23 Ad hoc prompting](https://youtu.be/3l_MtNA3kDY?t=23)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-1 |
+---------+--------+

---

## 2. Spec-driven development puts specs at the project and the task level

The next iteration is spec-driven development, which looks like specs. At the project level, specs cover the why, the what and the how, divided up into the when. That's where overall design principles live, so a million tasks all do things the same way.

In my version, each task also gets its own detailed packet, from functional requirements to technical design. When an agent executes a task, and there are many of them, it is very clear on what to do. You review the specs, you produce the specs, and the specs give AI consistency. This alone is enough acceleration to completely change the way we work.

It isn't only for code. I use the same idea to configure a VM: plan every step up front, then have AI run it through with me, checking each command before it runs.

Along the way I started prompt logging. I keep a log of mostly what I'm doing, and AI summarizes its response and action. That is how I keep track of my own work. I said on camera it would matter in a big way. Two months later it became one of my team skills, the [Conversation Logger](/writing/2026-04-12-two-ai-skills-team-enablement/).

One thing I want to highlight: spec-driven development builds on top of ad hoc prompting. In the diagram, the green box sits on a red one.

Watch this part [1:20 Spec-driven development](https://youtu.be/3l_MtNA3kDY?t=80) [2:31 Specs for a VM](https://youtu.be/3l_MtNA3kDY?t=151) [3:06 Prompt logging](https://youtu.be/3l_MtNA3kDY?t=186)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-2 |
+---------+--------+

---

## 3. A harness is an orchestration layer on top of the specs

Then I thought, let's build a harness. My definition: you still have the project-level architecture blueprint, the why, what, how and when. The task breakdown happens ahead of time, with task-level specs planned out and room for defects. Then the tasks execute in sequence without me. By hand, each task takes me 10 to 20 minutes of sitting with it. The harness strings 20 of them together.

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                    |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![GitHub folder listing of harness-v2-test ai-docs/TASKS on the feature/dashboard-mvp branch, with numbered task folders and commit messages such as feat(task-12): Add Kanban board layout with task cards on Tasks page and feat(task-21): Add highlights demo script with voice-over.][image5] |
|                                                                                                                                                                                                                                                                                                   |
| The run I showed in the video: one folder per task in [harness-v2-test](https://github.com/jackzhaojin/harness-v2-test/tree/03c009e/ai-docs/TASKS), 22 tasks executed in sequence. Each folder holds that task's spec and its build and validate records.                                         |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

There are a lot of learnings here. It doesn't work the first time, kind of works the second time, and by the fifth run it's pretty good. The trick is to think about the input and the output. The input isn't a single prompt if you are going to do that much work. It's what I call a prompt packet: a large, verbose set of documentation, like the packet you exit a design phase with in consulting. So there are two inputs, the packet and the harness, and one output.

When the output is wrong, I don't fix the output. I fix the input or the harness, or have AI figure out how to make the next run better. After enough rounds of running, fixing and analyzing, you have a pretty good harness.

What I'm realizing now is that a harness is an orchestration layer on top of spec-driven development. It's a big loop with more intelligence, and it validates the output, so I don't want to oversimplify. But underneath, it runs the same spec-driven development, and that runs on prompting. Blue on green on red. There are reusable parts in there.

Watch this part [3:54 What a harness is](https://youtu.be/3l_MtNA3kDY?t=234) [5:03 Input and output](https://youtu.be/3l_MtNA3kDY?t=303) [6:01 An orchestration layer](https://youtu.be/3l_MtNA3kDY?t=361)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-3 |
+---------+--------+

---

## 4. A continuous agent runs all the time, and I rebuilt it from scratch

My fourth project, the one I was building in February, is a continuous agent. The harness builds a bunch of stuff when I start it. The continuous agent does stuff all the time. It finds different things to work on, and it writes its progress to Notion, so it's no longer a markdown file I'm reading. It's a human-friendly interface: when I wake up in the morning, I can see exactly what AI worked on overnight. It can also improve itself, build new Claude skills and run skills that you built.

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                  |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Notion timeline titled Continuous Agent, Agent Dashboard, Agent Milestones, from 9:15 PM on February 3, 2026 to 2:15 AM on February 4. Milestones for Migrate Recipe Discovery Platform from local Postgres run first, then milestones for Build PageForge CMS, an AEM-inspired visual page builder, after midnight.][image6] |
|                                                                                                                                                                                                                                                                                                                                 |
| What I saw in the morning, from the video: the agent's milestones on the night of February 3, one project in the evening and another after midnight.                                                                                                                                                                            |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

And I did this one wrong. I built the continuous agent by referencing my earlier work, not reusing it.

Watch this part [6:58 The continuous agent](https://youtu.be/3l_MtNA3kDY?t=418) [7:43 "I did this wrong"](https://youtu.be/3l_MtNA3kDY?t=463)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-4 |
+---------+--------+

---

## 5. Reuse the layer below, don't rebuild it

Here is the whole board. Every pattern sits on the one before it. The 24/7 agent is orange on blue on green on red.

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                                                       |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Diagram titled AI Driven Development Patterns, How I am thinking about reuse and iterate. A box labeled Me points to four patterns. Ad Hoc Prompting stands alone. Spec Driven Dev sits on Ad Hoc Prompting. Harness sits on Spec Driven Dev, which sits on Ad Hoc Prompting. 24 Cont Agent sits on Harness, then Spec Driven Dev, then Ad Hoc Prompting.][image7] |
|                                                                                                                                                                                                                                                                                                                                                                      |
| The board I drew in the video, dated February 5, 2026. Ten boxes, four kinds.                                                                                                                                                                                                                                                                                        |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

My mistake is easy to see once it's drawn. I rebuilt the bottom piece four separate times. AI made rebuilding feel easy, so I'd reference my old code and rebuild fresh, when I should have understood the modular pieces and reused them.

Below are the four stacks from the board. Switch between what I did and what I should have done, and count the solid boxes: each one is a piece built from scratch inside that pattern. A dashed box is a piece reused from the pattern before it.

+-------------------------------------------------------------------------------------------------------------------+
| Explainer (reuse stacks)                                                                                          |
+-------------------------------------------------------------------------------------------------------------------+
| Rebuild or reuse · the four stacks from the board                                                                 |
+-------------------------------------------------------------------------------------------------------------------+
| How the four patterns get built                                                                                   |
|                                                                                                                   |
| - What I did: rebuild each time                                                                                   |
| - What I should have done: reuse                                                                                  |
+---------------------------------------------------------+---------------------------------------------------------+
| 1. Ad hoc prompting                                     | - built here                                            |
| 2. Spec-driven dev                                      | - reused                                                |
| 3. Harness                                              |                                                         |
| 4. 24/7 continuous agent                                |                                                         |
+---------------------------------------------------------+---------------------------------------------------------+
| Built the way I did it, the four patterns hold ten pieces, and ad hoc prompting is built four times. Reusing the  |
| layer below, each of the four pieces is built once.                                                               |
+-------------------------------------------------------------------------------------------------------------------+
| Dashed boxes are reused, solid ones are built in that pattern. The counts come straight from the board: a pattern |
| contains itself and every piece under it.                                                                         |
+-------------------------------------------------------------------------------------------------------------------+

From me rambling, to specs, to harnesses, to continuous agents, they could all be reusing the same thing. Each piece should work alone or stacked. Spec-driven development should be usable by itself. I can run it on its own, run it with a harness, or run it with a 24-hour agent that runs the harness. Each layer should reuse the layer below instead of referencing it.

So that's my takeaway: I have a lot of AI-driven refactoring to do, and I'd rather you didn't fall into the same pit. Build for reuse from the start, even when rebuilding with AI feels fast. If you've built your own stack of patterns, I'd like to know which layer you made reusable first, and whether it held up when the next layer arrived.

Watch this part [8:42 The lesson](https://youtu.be/3l_MtNA3kDY?t=522)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-5 |
+---------+--------+

---

## Related

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Row List                                                                                                                                                                    |
+-----------+--------------------------------------------------------------------------------------------------------------------------+--------------------------------------+
| Portfolio | [Continuous Executive Agent](/portfolio/continuous-executive-agent/)                                                     | The 24/7 agent from part 4, after it |
|           |                                                                                                                          | ran for four months.                 |
+-----------+--------------------------------------------------------------------------------------------------------------------------+--------------------------------------+
| Writing   | [Two AI Skills for Team Enablement](/writing/2026-04-12-two-ai-skills-team-enablement/)                                  | Reuse one level lower: prompt logs   |
|           |                                                                                                                          | and skills.                          |
+-----------+--------------------------------------------------------------------------------------------------------------------------+--------------------------------------+
| Writing   | [From Prompts to Harness: How Deterministic Code and Agents Work Together](/writing/2026-01-05-from-prompts-to-harness/) | The January harness from part 3, and |
|           |                                                                                                                          | how its loop works.                  |
+-----------+--------------------------------------------------------------------------------------------------------------------------+--------------------------------------+

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

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Metadata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| title                   | Reusable AI Development Modules: Four Patterns, One Stack \| Jack Jin                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| description             | Ad hoc prompting, spec-driven development, harnesses and a 24/7 agent stack on each other. Build each layer to work alone and be reused by the one above.                                                                                                                                                                                                                                                                                                                                                                                                                                 |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| template                | article                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image                   | ![Jack's board, AI Driven Development Patterns: four stacks from ad hoc prompting up to a 24/7 continuous agent][image8]                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image:alt               | Jack's board, AI Driven Development Patterns: four stacks from ad hoc prompting up to a 24/7 continuous agent                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| published-time          | 2026-02-05                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| modified-time           | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| json-ld                 | {"@context":"https\://schema.org","@graph":\[{"@type":"Person","@id":"https\://www\.jackzhaojin.com/#person","name":"Jack Jin","url":"https\://www\.jackzhaojin.com/","jobTitle":"Associate Director","worksFor":{"@type":"Organization","name":"Accenture","department":{"@type":"Organization","name":"Adobe Business Group"}},"sameAs":\["https\://www\.linkedin.com/in/jackjin","https\://github.com/jackzhaojin","https\://www\.youtube.com/@jackjin8467","https\://www\.credly.com/users/jack-jin"],"award":\["Adobe Experience Manager Champion, class of 2026-2027","AEM Rockstar |
|                         | winner, Adobe Summit 2024"]},{"@type":"WebSite","@id":"https\://www\.jackzhaojin.com/#website","url":"https\://www\.jackzhaojin.com/","name":"Jack Jin","publisher":{"@id":"https\://www\.jackzhaojin.com/#person"}},{"@type":"TechArticle","@id":"https\://www\.jackzhaojin.com/writing/2026-02-05-reusable-ai-development-modules/#article","headline":"Making AI-Driven Development Modules Reusable: Four Patterns, One Stack","description":"Ad hoc prompting, spec-driven development, harnesses and a 24/7 agent stack on each other. Build each layer to work alone and be reused |
|                         | by the one above.","author":{"@id":"https\://www\.jackzhaojin.com/#person"},"publisher":{"@id":"https\://www\.jackzhaojin.com/#person"},"image":"https\://www\.jackzhaojin.com/writing/2026-02-05-reusable-ai-development-modules/media\_10b278242ca261ccf8a9b8f7967b0ab04661d101e.jpg","mainEntityOfPage":"https\://www\.jackzhaojin.com/writing/2026-02-05-reusable-ai-development-modules/","isPartOf":{"@id":"https\://www\.jackzhaojin.com/#website"},"about":\["Spec-driven development","AI harness","Continuous AI agents","Prompt engineering","Software                         |
|                         | reuse"],"datePublished":"2026-02-05","dateModified":"2026-10-04","inLanguage":"en","video":{"@id":"https\://www\.jackzhaojin.com/writing/2026-02-05-reusable-ai-development-modules/#video"}},{"@type":"VideoObject","@id":"https\://www\.jackzhaojin.com/writing/2026-02-05-reusable-ai-development-modules/#video","name":"I Rebuilt My AI Agent Stack 4 Times Before Learning This Lesson","description":"Ad hoc prompting, spec-driven development, harnesses and continuous agents share core pieces. I rebuilt everything from scratch each time; each layer should reuse the layer |
|                         | below.","thumbnailUrl":"https\://www\.jackzhaojin.com/writing/2026-02-05-reusable-ai-development-modules/media\_10b278242ca261ccf8a9b8f7967b0ab04661d101e.jpg","uploadDate":"2026-02-08T16:59:57Z","duration":"PT9M44S","embedUrl":"https\://www\.youtube-nocookie.com/embed/3l\_MtNA3kDY"},{"@type":"BreadcrumbList","@id":"https\://www\.jackzhaojin.com/writing/2026-02-05-reusable-ai-development-modules/#breadcrumb","itemListElement":\[{"@type":"ListItem","position":1,"name":"Home","item":"https\://www\.jackzhaojin.com/"},{"@type":"ListItem","position":2,"name":"Technical |
|                         | Writing","item":"https\://www\.jackzhaojin.com/writing/"},{"@type":"ListItem","position":3,"name":"Reusable AI Development Modules","item":"https\://www\.jackzhaojin.com/writing/2026-02-05-reusable-ai-development-modules/"}]}]}                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| og:image:alt            | Jack's board, AI Driven Development Patterns: four stacks from ad hoc prompting up to a 24/7 continuous agent                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:published\_time | 2026-02-05                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:modified\_time  | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:author          | https\://www\.jackzhaojin.com/                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-summary         | Ad hoc prompting, specs, harnesses and a 24/7 agent stack on each other, and each layer should be reused by the one above, not rebuilt. The board, a counter you can click for what rebuilding costs, and the refactor I did in April.                                                                                                                                                                                                                                                                                                                                                    |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-image           | https\://www\.jackzhaojin.com/writing/media\_10b278242ca261ccf8a9b8f7967b0ab04661d101e.jpg?width=750\&format=jpg\&optimize=medium                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-topics          | AI Engineering                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-reading-time    | 6 min read                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-video-time      | 9:44 video                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-url       | https\://youtu.be/3l\_MtNA3kDY                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-label     | Watch on YouTube                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-keywords        | spec-driven development ai harness continuous agent prompt packet prompt logging notion claude code software reuse agentic development patterns                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_1fd82b25d0a3f6996ae6e9707ab60f755c334ceb1.png#width=144&height=92

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_1ba9d79f938b06a2dbe05c63e354bef3204553a27.png#width=144&height=92

[image2]: https://main--www-eds--jackzhaojin.aem.page/media_1dee0070eae2b7e04bc80b3fe7dd5b780b19a44e5.png#width=144&height=92

[image3]: https://main--www-eds--jackzhaojin.aem.page/media_18b0bad7754758d2ba675c5a7284c6033e576be30.png#width=144&height=92

[image4]: https://main--www-eds--jackzhaojin.aem.page/media_16af129de0f40867314ab9315e12f34c5fc90625a.png#width=144&height=92

[image5]: https://main--www-eds--jackzhaojin.aem.page/media_1d4dc4478fc03943eb8b2237719de7e2dcb969b0b.jpg#width=1400&height=576

[image6]: https://main--www-eds--jackzhaojin.aem.page/media_1539edfc7db3c94580b1db78381f74441405b3978.jpg#width=1400&height=632

[image7]: https://main--www-eds--jackzhaojin.aem.page/media_1143641014fb70b1d31f332b1e14dcf4090949b54.png#width=1600&height=1059

[image8]: https://main--www-eds--jackzhaojin.aem.page/media_10b278242ca261ccf8a9b8f7967b0ab04661d101e.jpg#width=1280&height=720
