1. [Home](/)
2. [Technical Writing](/writing/)
3. Patterns of Work

# Patterns of Work: Five Layers of Working with AI

By [Jack Jin](/) · June 28, 2026 · Updated October 4, 2026 · 27 min read · Includes my 14:40 video

A model for working with AI in five layers, from one person running many loops to humans and agents managing work together. Each layer covers what changes, where it gets hard, and where I got it wrong, plus the spine that runs through all five (context, governance, observability, evals) and the shared context foundation under them.

---

+---------------------------------------------------------------------------------------------+
| Rail                                                                                        |
+---------------------------------------+-----------------------------------------------------+
|                                       | **Start**\                                          |
|                                       | [Where this comes from](#starting-point)            |
+---------------------------------------+-----------------------------------------------------+
| ![][image0]                           | **The frame**\                                      |
|                                       | [Five layers, one spine](#frame)                    |
+---------------------------------------+-----------------------------------------------------+
| ![][image1]                           | **Layer 1**\                                        |
|                                       | [One person, many loops](#layer-1)                  |
+---------------------------------------+-----------------------------------------------------+
| ![][image2]                           | **Layer 2**\                                        |
|                                       | [Teams, speed does not add](#layer-2)               |
+---------------------------------------+-----------------------------------------------------+
| ![][image3]                           | **Layer 3**\                                        |
|                                       | [AI as a contributor](#layer-3)                     |
+---------------------------------------+-----------------------------------------------------+
| ![][image4]                           | **Layer 4**\                                        |
|                                       | [AI and human management, siloed](#layer-4)         |
+---------------------------------------+-----------------------------------------------------+
| ![][image5]                           | **Between 4 and 5**\                                |
|                                       | [AI with humans is the hard part](#learning)        |
+---------------------------------------+-----------------------------------------------------+
| ![][image6]                           | **Layer 5**\                                        |
|                                       | [Humans and AI, one mesh](#layer-5)                 |
+---------------------------------------+-----------------------------------------------------+
| ![][image7]                           | **The spine**\                                      |
|                                       | [Context, governance, observability, evals](#spine) |
+---------------------------------------+-----------------------------------------------------+
| ![][image8]                           | **The foundation**\                                 |
|                                       | [Shared context services](#foundation)              |
+---------------------------------------+-----------------------------------------------------+
|                                       | **Wrap-up**\                                        |
|                                       | [The new craft](#where-i-land)                      |
+---------------------------------------+-----------------------------------------------------+
| [Watch the video, 14:40](#video)                                                            |
|                                                                                             |
| [Walk the five layers](#explore)                                                            |
|                                                                                             |
| [continuous-agent on GitHub](https://github.com/jackzhaojin/continuous-agent)               |
+---------------------------------------------------------------------------------------------+

---

+--------------------------------------------------------------------------------------------------------------------+
| Fine Print                                                                                                         |
+--------------------------------------------------------------------------------------------------------------------+
| These are my own professional views as of June 2026. They do not represent Accenture or the firm's reinvention     |
| program or the firm's position on AI or ways of working. First published on LinkedIn on June 28, 2026, as "After a |
| Year: Where I Think Knowledge Work Is Heading", a week after I drew the model by hand in a video on June 21.       |
| Rewritten for this site in October 2026, with a few points from that video folded in.                              |
+--------------------------------------------------------------------------------------------------------------------+

---

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure                                                                                                                                                               |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [Five Layers of Working with AI, from One Person to a Whole Organization](https://youtu.be/YA7rvs6K1bw)                                                              |
|                                                                                                                                                                      |
| Recorded June 21, 2026, a week before the written version. Each part below links to its moment in the video, or [watch it on YouTube](https://youtu.be/YA7rvs6K1bw). |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| id      | video  |
+---------+--------+

---

## Where this model comes from

Harnesses, coding agents, loops that run around the clock. I built them on my own time and in public, inside client work when it fit, and with my own teams testing agentic ways of working.

None of it is theory. It is what I have seen building, breaking, and rebuilding, including where I got it wrong.

One caveat up front. Part of this is unpopular. Managing an AI like a contributor, giving it memory and feedback, eventually handing it a real slice of work, makes people uneasy. I still think it is where this goes.

+--------------------------+
| Section Metadata         |
+---------+----------------+
| id      | starting-point |
+---------+----------------+

---

## Five layers, one spine and one foundation

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board, open)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [![The master Patterns of Work diagram. Five stacked layers from individual at the top to organization at the bottom: 1 Individuals, IC and leaders; 2 Team; 3 AI as an individual contributor; 4 Management, siloed, with humans managing humans and AI managing AI; 5 Management, merged, where human and agentic managers share one common context. A box between 3 and 4 reads: not data readiness, agents working alongside us on a shared surface. The spine, context, governance, observability and evals, runs up the right side, and shared context services sit underneath as the foundation.][image9]](https://content.da.live/jackzhaojin/www-eds/media/writing/2026-06-28-patterns-of-work/patterns-of-work.svg "Open the full-size diagram") |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| The whole model on one page. Every section below takes one block of it.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

I think about this as patterns of work. Five layers. It scales from the individual at the top down to the whole organization at the bottom. The individual is at the top not because it matters most, but because it is the one almost everyone can already feel. From there each layer adds people, then adds management, then merges the two tracks back together.

One spine runs through all of it. Context. Governance. Observability. Evals. I will come back to it at every layer, because the layers are the visible part and the spine is what actually holds them up. Under everything sits one foundation: shared context services. The places humans and agents both go to find what they need and put back what they learned.

The big idea, before the detail: almost everyone wants to be at Layer 5, where humans and AI work as one. The real question is not how fast you can get there. It is whether you rush there, or build the foundations that let you actually stand there once you arrive. It is a gradient, not a blueprint. I do not have the whole thing figured out. I have a year of receipts and a strong opinion about the shape.

The map below is the board from the video, one layer at a time. Pick a layer to see the steps I drew for it and where it gets hard. Or pick a spine pillar, like governance, to see how the same concern changes from one person (what my agent may touch) to the whole organization. It is a shortcut through the model; every line in it comes from the sections below.

+------------------+
| Section Metadata |
+---------+--------+
| id      | frame  |
+---------+--------+

---

+--------------------------------------------------------------------------------------------------------------------+
| Explainer (work patterns)                                                                                          |
+--------------------------------------------------------------------------------------------------------------------+
| The spine: follow a pillar                                                                                         |
|                                                                                                                    |
| - Context                                                                                                          |
| - Governance                                                                                                       |
| - Observability                                                                                                    |
| - Evals                                                                                                            |
|                                                                                                                    |
| **[Foundation](#foundation)**[ Shared context services](#foundation)                                               |
+--------------------------------------------------------------------------------------------------------------------+
| *Context*, up the five layers                                                                                      |
|                                                                                                                    |
| Pick a row to open that layer.                                                                                     |
|                                                                                                                    |
| [Read about the spine](#spine)                                                                                     |
+--------------------------------------------------------+-----------------------------------------------------------+
| Individuals                                            | 1 Individuals: IC and leaders                             |
|                                                        |                                                           |
|                                                        | One person, IC or leader, running many loops at once. One |
|                                                        | person can do the work of many team members.              |
|                                                        |                                                           |
|                                                        | The steps I drew on the board                             |
|                                                        |                                                           |
|                                                        | 1. Ad hoc prompting                                       |
|                                                        | 2. AI tests its work, integrates tools, enables AI sync   |
|                                                        | 3. Skills and projects                                    |
|                                                        | 4. Harness or loop engineering                            |
|                                                        | 5. AI coding 24x7                                         |
|                                                        |                                                           |
|                                                        | Where it gets hard                                        |
|                                                        |                                                           |
|                                                        | Starting loops is easy. Working the same agent over time, |
|                                                        | managing and versioning its output, is the actual skill.  |
|                                                        |                                                           |
|                                                        | - **Context** what my agent needs to know                 |
|                                                        | - **Governance** what my agent may touch                  |
|                                                        | - **Observability** what it did overnight                 |
|                                                        | - **Evals** is this skill any good                        |
|                                                        |                                                           |
|                                                        | [Read Layer 1](#layer-1)                                  |
+--------------------------------------------------------+-----------------------------------------------------------+
| Team                                                   | 2 Team                                                    |
|                                                        |                                                           |
|                                                        | AI-enabled teammates who share context, not just results. |
|                                                        |                                                           |
|                                                        | The steps I drew on the board                             |
|                                                        |                                                           |
|                                                        | 1. Skills and projects                                    |
|                                                        | 2. Share AI-driven output                                 |
|                                                        | 3. Share native AI artifacts, not just output             |
|                                                        |                                                           |
|                                                        | Where it gets hard                                        |
|                                                        |                                                           |
|                                                        | \+300% faster each. Together, about \+150%. Speed does    |
|                                                        | not add, because the limit is coordination.               |
|                                                        |                                                           |
|                                                        | - **Context** shared across the team                      |
|                                                        | - **Governance** shared, governed skills                  |
|                                                        | - **Observability** see each other's agent work           |
|                                                        | - **Evals** is the team actually getting better           |
|                                                        |                                                           |
|                                                        | [Read Layer 2](#layer-2)                                  |
+--------------------------------------------------------+-----------------------------------------------------------+
| AI as an IC                                            | 3 AI as an individual contributor                         |
|                                                        |                                                           |
|                                                        | A real, accountable contributor that owns its work. A     |
|                                                        | gradient, from a markdown file to a portion of me.        |
|                                                        |                                                           |
|                                                        | The steps I drew on the board                             |
|                                                        |                                                           |
|                                                        | 1. Skills                                                 |
|                                                        | 2. Evals                                                  |
|                                                        | 3. Memory, context, capabilities                          |
|                                                        |                                                           |
|                                                        | Where it gets hard                                        |
|                                                        |                                                           |
|                                                        | I can build the contributor. What I cannot yet build is   |
|                                                        | the trust envelope that makes handing it real work        |
|                                                        | responsible.                                              |
|                                                        |                                                           |
|                                                        | - **Context** the agent's working memory                  |
|                                                        | - **Governance** the agent owns its work                  |
|                                                        | - **Observability** its actions are visible               |
|                                                        | - **Evals** how good is this agent, at what               |
|                                                        |                                                           |
|                                                        | [Read Layer 3](#layer-3)                                  |
+--------------------------------------------------------+-----------------------------------------------------------+
| Management, siloed                                     | 4 Management, but siloed                                  |
|                                                        |                                                           |
|                                                        | Humans manage humans. AI manages AI. Two separate tracks, |
|                                                        | running in parallel.                                      |
|                                                        |                                                           |
|                                                        | The steps I drew on the board                             |
|                                                        |                                                           |
|                                                        | 1. AI management and coordination skills                  |
|                                                        | 2. AI has its own working surface, same with humans       |
|                                                        | 3. Evals, observability, governance                       |
|                                                        |                                                           |
|                                                        | Where it gets hard                                        |
|                                                        |                                                           |
|                                                        | The siloing is efficient and it is alienating at the same |
|                                                        | time. Humans feel left out of the productivity loop.      |
|                                                        |                                                           |
|                                                        | - **Context** shared across the agent mesh                |
|                                                        | - **Governance** rules for agents at scale                |
|                                                        | - **Observability** watch the mesh, not every step        |
|                                                        | - **Evals** how do you grade an agent mesh                |
|                                                        |                                                           |
|                                                        | [Read Layer 4](#layer-4)                                  |
+--------------------------------------------------------+-----------------------------------------------------------+
| Humans and AI, merged                                  | 5 Humans and AI, merged                                   |
|                                                        |                                                           |
|                                                        | Human managers and agentic managers sharing one common    |
|                                                        | context. The silos from Layer 4 dissolve into one mesh.   |
|                                                        |                                                           |
|                                                        | What I drew it needs                                      |
|                                                        |                                                           |
|                                                        | - Common context pool                                     |
|                                                        | - Governance and observability                            |
|                                                        | - Evals                                                   |
|                                                        |                                                           |
|                                                        | Where it gets hard                                        |
|                                                        |                                                           |
|                                                        | The hard jump is the merge, and it is hard for an         |
|                                                        | unglamorous, fixable reason: our surfaces were never      |
|                                                        | built for agents.                                         |
|                                                        |                                                           |
|                                                        | - **Context** one live context for humans and AI          |
|                                                        | - **Governance** accountable across the mesh              |
|                                                        | - **Observability** humans see the agentic side           |
|                                                        | - **Evals** grade the human and agent delivery            |
|                                                        |                                                           |
|                                                        | [Read Layer 5](#layer-5)                                  |
+--------------------------------------------------------+-----------------------------------------------------------+
| The steps for each layer are the board I drew by hand in the June 21 video. The spine cells come from the spine    |
| diagram further down. With JavaScript off, all five layers are listed in full.                                     |
+--------------------------------------------------------------------------------------------------------------------+

Watch this part [0:00 Five layers of working with AI](https://youtu.be/YA7rvs6K1bw?t=0)

+-------------------+
| Section Metadata  |
+---------+---------+
| id      | explore |
+---------+---------+

---

## Layer 1. One person, IC or leader, running many loops

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board, open)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [![Layer 1 diagram: one person at the center running five trigger, act, observe loops in parallel, each marked 24/7. A receipt box: continuous-agent, a 24/7 autonomous coding agent built in the open and demoed live at AI Tinkerers Columbus. A note: invest in level of output, volume plus quality, not just speed. Bottom: starting loops is easy, the party trick; working the same agent over time, managing and versioning its output, is the actual skill.][image10]](https://content.da.live/jackzhaojin/www-eds/media/writing/2026-06-28-patterns-of-work/layer-1-individual.svg "Open the full-size diagram") |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| One person, many loops. The gap at the bottom is the point of this layer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Start with the layer I have lived the most. You, solo. One person and their agents.

This is where most of my year went. Building harnesses, building coding agents, running them around the clock. I will give you concrete receipts rather than ask you to take my word for it, and most of them are public.

The first is my [continuous-agent](https://github.com/jackzhaojin/continuous-agent), built in the open across the year, from a first version in January to a ["Second Brain" version](/writing/2026-05-31-continuous-agent-second-brain/) this spring. It is a 24/7 autonomous coding agent, and I demoed a running version of it live at [AI Tinkerers in Columbus](/talks/ai-tinkerers-2026/). The second is what I think of as an AI dark factory: [a harness I built](/writing/2026-01-05-from-prompts-to-harness/) back in January that runs lights-out and produces real outputs, not toy ones. The third is a build. Starting from a design, I put together [a site I am proud of](http://main--adapt-to-2026-demo--jackzhaojin.aem.page/ai-content/), about twelve blocks, in roughly eight hours. One person, one working day, a real site.

The headline, at least the way I have built it, is that this amplifies a single person enormously. One person can do the work of many team members. We are at a new point of personal acceleration, and I mean that literally. Not in a slide-deck way. In a "this actually shipped over the weekend" way.

I want to be precise about what I optimized for, because it is not the obvious thing. Most people reach for speed. The thing I invested most heavily in is the level of output. Volume and quality of what one person can ship, held high as the volume climbs. Speed is easy to get and easy to fake. Sustained output that you would actually put your name on is the hard one.

This layer is for both ICs and leaders, and I mean that literally. A leader building with AI is still one person being amplified. Same layer, same work. That matters later, at Layer 5, so I am planting it here: with AI, building is not something you graduate out of when you get promoted.

Inside this layer there is a climb, and it was the first row I drew on the board for the video. Before AI, you just do your work. Then comes ad hoc prompting, and from there AI testing its own work, integrating tools, and several AIs talking to each other. Then a pattern sets in. If you have done something with AI ten times, by the eleventh you have a pattern, and that is when it becomes a skill or a project. After that comes the harness. I have been [talking about harnesses](/writing/2026-01-05-from-prompts-to-harness/) since late 2025, and now people call it loop engineering. Instead of you working with the AI, you use AI to work with AI, which makes the output repeatable and more consistent. A loop can start from different triggers: a schedule, you, or even another AI. Even at the top of that climb, it is still the individual track, and none of it scales to a team on its own yet.

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board, narrow)                                                                                                                                                                                                                                                                                                                                                                        |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![A page from a spiral notebook, handwritten: AI, 1. Ad hoc, then MCP and self val, then skills, then a box for loop or harness reading trigger, acts, stop and observe. Arrows split to 24/7 with systemic context, to A2A, and down to H plus A in BPM with change management. At the bottom: 1, AI plus deterministic process; 2, AI process only; 3, mix, with a question mark.][image11] |
|                                                                                                                                                                                                                                                                                                                                                                                               |
| Where my thinking started: the notebook page pinned in the corner of my board for the June 21 video. The top half is the Layer 1 climb.                                                                                                                                                                                                                                                       |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Here is the part nobody tells you. The fun part is starting loops. One person can kick off a lot of loops at once, and the first week feels like magic. The hard part is not starting them. It is working the same agent over time. Managing its output. Versioning it. Keeping quality high across dozens of runs when the easy eighty percent is done and the last twenty percent is where all the judgment lives. Starting an agent is a party trick. Living with one is the actual skill.

So the real shape of Layer 1 is: enormous individual leverage, gated by your ability to manage what you started. The bottleneck moves from "can I produce this" to "can I keep what I produce coherent." That is a new muscle, and most of us are still building it.

Watch this part [0:56 Individuals, ICs and leaders](https://youtu.be/YA7rvs6K1bw?t=56) [2:10 Harnesses and loop engineering](https://youtu.be/YA7rvs6K1bw?t=130)

+-------------------+
| Section Metadata  |
+---------+---------+
| id      | layer-1 |
+---------+---------+

---

## Layer 2. Teams, where individual speed does not add up

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board, open)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [![Layer 2 diagram: Person A works in markdown and Git and tracks every change line by line; Person B works in Word, PowerPoint and Excel with versions in SharePoint and file copies. Each runs their own agent and is \+300% faster on their own. Banner: \+300% faster each, together about \+150%, speed does not add. Why it stalls: the tools were built for humans, not for agents to hand work to each other; different formats, different systems, and a flood of versions. What we need: one frictionless surface both humans and agents can read and write, a common format, shared ways of working, and versions anyone and any agent can trace.][image12]](https://content.da.live/jackzhaojin/www-eds/media/writing/2026-06-28-patterns-of-work/layer-2-team.svg "Open the full-size diagram") |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Two fast people do not make a fast pair. The blocker is the systems between them.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Now add people. This is something I am thinking about and experimenting with constantly in my actual day job, and it is the layer I am least done with.

My team is more agentic than ever. Each of us is about three hundred percent faster on our own work than a year ago. Speed does not add across people, though. Put two of us together and the combined output lands around a hundred and fifty percent, never past the speed of one. Individual speed is real. It mostly does not turn into team throughput, because the limit is coordination, not horsepower.

The reason is not the people. It is the systems. Our agents do not hand work to each other, so everything still routes through us, through meetings and shared drives and status calls. The leverage is real, and it is trapped inside each person. We are coordinating on tools built for humans, in a world where each of us now has an agent that could be doing the coordinating.

The shift I want is teammates sharing context, not just results. And both halves matter. The formulation, which is the inputs and framing we feed our agents, and the output. We are reasonably good at sharing outputs. We are bad at sharing the formulation, and the formulation is where the real intent lives. Take a spec-driven project: the functional lead produces a functional spec, the architect produces the architecture, and the engineer puts the two together with the right skills to build the thing. What gets passed along is the finished artifact. The stuff behind making the sausage, the source material and the reasoning, gets lost on the way.

If the project context is simply available to each other, a lot of meetings stop being necessary. AI can pre-align on the why, the what, and the how before we ever meet. Or it can tell us a meeting is actually needed and put one on the calendar, instead of the default of meeting first and thinking second. The idea that another architect's AI could read my thinking and anticipate it is a little strange. It is also kind of great. That is the upside.

In practice, collaboration at this layer looks like two concrete mechanisms.

First, shared skills or project instructions that teammates can use and contribute back to. A common, agentic way to put your knowledge somewhere a colleague's agent can pick it up. Not a wiki nobody reads. Live instructions that get executed. In code, that means skills checked into the repo and reviewed like any other change, so the whole team works from the same set of instructions. I have pushed on this directly with my own team, building [shared AI skills aimed at concrete enablement objectives](/writing/2026-04-12-two-ai-skills-team-enablement/) rather than one-off prompts, so that the same governed skill lifts more than one person.

Second, agentic artifact handoff. One teammate's agent output becomes the input to another teammate's agent flow. My agent produces something, your agent consumes it, and neither of us had to sit in a meeting to make the handoff happen.

Here is the concrete version of why it is hard, and it is more mundane than you would guess. The blocker is often just file formats. I can produce HTML and have my agent build from it, because HTML is an AI-friendly format. So is markdown. But a business partner I work with might live in Word docs, PowerPoints, and Excel files. Some formats are AI-enabled. Some are not. And it runs past formats into tooling. I track my changes in Git. My business partner is not a Git expert, and should not have to be. So even when both of us are highly agentic on our own, we cannot easily clap our hands together, because we are working in different formats with different ways of working. What we are missing is a common format, a shared stream of communication, that both the humans and our agents can read and write. Until that exists, the handoff falls back to a meeting.

There is also a problem underneath all of this that almost nobody talks about. Versions. When one person works with AI, the output multiplies fast, and tracking what actually changed is already hard. I lean on Git for exactly that. Now multiply it by every person on the team and every agent they run, all producing versions at once. Traceability and maintainability stop being nice-to-haves. Whether the answer is Git, SharePoint history, or something built for this, tracking changes across people and their agents is going to be one of the defining problems of this layer.

So why this is hard, and why I am not done: most of our current work surfaces have no easy way for each person's agents to talk to each other. The tooling assumes a human is the integration point between any two pieces of work. Take the human out and there is often no wire left to connect. This is an open problem I am actively trying to solve, and it is an interesting one. I do not have a clean answer yet. I have experiments.

Watch this part [3:07 The team](https://youtu.be/YA7rvs6K1bw?t=187) [4:01 Sharing AI native artifacts, not just output](https://youtu.be/YA7rvs6K1bw?t=241)

+-------------------+
| Section Metadata  |
+---------+---------+
| id      | layer-2 |
+---------+---------+

---

## Layer 3. AI as an individual contributor that owns its work

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board, open)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [![The Layer 3 spectrum, four cards from simple to advanced. 1, a skill: a markdown file with an objective that runs, then stops, triggered by a human or another agent, the lower bar to entry. 2, a shareable project: bundled context and instructions others can pick up, reusable across the team. 3, an acting agent: the right tools and a memory, takes real actions, its actions visible to humans and AI. 4, a portion of me: goals of its own, episodic memory that stores and retrieves, learns and runs its own retrospectives, accountable, reviewed, self-improving, everything a human IC has.][image13]](https://content.da.live/jackzhaojin/www-eds/media/writing/2026-06-28-patterns-of-work/layer-3-spectrum.svg "Open the full-size diagram") |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| The spectrum I showed in the video. Every point on the line counts as a contributor.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

This is the one that is really big for me, and the centerpiece of the whole model. AI as a real individual contributor. Not a tool you operate. A contributor that owns its work.

The reframe is the whole point. When you treat AI as a tool, you ask "what can I get it to do for me." When you treat it as a contributor, you ask different questions. What is it accountable for. How does it get better. Who gives it feedback. What does it remember. Those questions change how you build, and they are the questions that take you past the demo and into something that compounds.

Let me be careful here, because this is exactly the part people find uncomfortable, and I do not want to hand-wave it.

It is a gradient, not a switch. This is the most important thing to understand about Layer 3, and it is what keeps it grounded. An AI IC is a unit of work along a spectrum, not a single all-or-nothing autonomous robot.

At the simple end, an agent can literally be a markdown file. It has an objective. It runs. It stops. A human triggers it as a skill or a project, or another agent triggers it. That still counts. It is a real, if small, contributor. Do not let anyone tell you it has to be sophisticated to count.

Next along the spectrum is a shareable project. Bundled context and instructions that others can pick up and run, which is also the bridge back to Layer 2.

Then an agent with the right tools and memory that actually takes actions, not just reads and advises. And those actions are visible. To humans and to other AI. Capability and observability arrive together, on purpose. An agent that can act but cannot be watched is not a contributor, it is a liability.

At the far end is the part that makes people lean back: a portion of me. Goals. A memory layer like a person has, that stores what happened and pulls it back when it is relevant. It learns. It runs its own retrospectives. It is accountable, reviewable, and yes, it gets something like a performance review. Ideally it is self-improving. Everything a human IC has, scoped to a slice of real work.

When I drew this layer on the board, I drew the build order rather than the spectrum. Everything starts with skills. Then evals, so the agent can tell whether it is getting better. Then memory, context and capabilities. And from there it gets very dynamic, very quickly.

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board, open)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [![Anatomy of an AI individual contributor: an accountable contributor at the center. Objective in from the top, a goal scoped to a slice of real work. Tools and the ability to act on the right, with actions visible to humans and AI. Observability out on the left, so humans and other agents can see what it did. Memory with a lock, episodic, stored and retrieved, marked the value and the liability. Feedback coming in from humans and from other AI, good and bad, starting positive.][image14]](https://content.da.live/jackzhaojin/www-eds/media/writing/2026-06-28-patterns-of-work/layer-3-anatomy.svg "Open the full-size diagram") |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| What a contributor has that a tool does not. The lock on memory comes back at the end of this section.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

A few things I have come to believe matter a lot at this layer.

### Memory is the thing that turns a tool into a contributor

Episodic memory, stored and retrieved, is what lets an agent get better instead of starting from zero every morning. This is the part I went deepest on this year. When I gave my continuous-agent a real memory store, the hard problem was never storing things. It was retrieval, and it was deciding what kind of memory you were even dealing with. I ended up splitting it into five types, principle, semantic, procedural, episodic, and reflective, because a procedure an agent should always follow is a different thing from a one-time episode it should remember happened. Memory is also, as I will get to, the single biggest liability. Hold that thought, especially the word episodic.

### Feedback is not optional, and it has a shape

Positive and negative, and you start positive, the same way you would with a person. Feedback comes from everyone who uses the agent, not just whoever built it. Even other AI. And the agent takes that feedback in on its own and acts on it. The day you give an AI a structured performance review and it actually changes behavior because of it is the day the reframe stops being a metaphor.

### The AI IC is a lower bar to entry, not a higher one

This is the practical payoff people miss. Getting business partners to install skills and tooling just to get value is hard. Most will not do it. Say I have twenty skills loaded and a teammate joins who does not love AI. How do they get the same benefit? Asking them to copy my setup is a hard sell. An AI contributor you can just talk to is a far lower on-ramp than asking everyone to become a builder. The accountable-IC framing is the high end of the spectrum. The low end is "you can finally just ask."

### Most of the work of making an agent good is giving it context, and a team channel hands you that for free

Tag Claude in a Slack or Teams channel and it does not start cold. It inherits the channel. The decisions, the history, the half-finished threads, who said what and why. I have watched an agent give a sharp answer in a project channel purely because the channel had been carrying that project for months. Nobody set out to build a context store. The team built one by working in the open, one message at a time, and that crowd-sourced pile of context turns out to be one of the best things you can point an agent at. It is the first hint of the foundation I get to at the end. A channel is a small version of the shared surface the whole model rests on.

### The dream at the far end, and the real blocker

Here is a dream of mine. I keep coming back to it, and it is the most unpopular part of all this.

The far end of that spectrum is taking a slice of what I do and giving it to an agent. My knowledge, mentored and trained into it, carrying some of my own internal work. Not my direct reports. Managing people stays human, full stop. But a piece of my own contributions, running as an agent, inside the firm I am at. I think that would be very cool.

This is still aspirational. Plenty of people are already building fragments of what they do as separate little agents, a skill here, a workflow there, scattered across different tools. That part is real and it is happening now. The version I specifically want to build is the one that runs on a strong memory implementation, because memory is the thing that turns a drawer full of disconnected fragments into something that is actually a piece of you. Without it you have a pile of tools. With it you have a contributor that remembers.

Let me be clear about what I am not saying, because this is the part that gets misread. I am not talking about leaving. I am happy where I am and I am not planning to go anywhere. I am not talking about automating myself out of a job, or anyone else out of one. And this is aspiration, not a roadmap I am running. It is a direction I find exciting, hedged on purpose, because the real version of an exciting idea includes its limits.

And here is the turn that matters. Even once I nail the memory, the hardest blocker is not engineering at all. It is trust and data security.

Think about it this way. A person is good at keeping secrets. We are bound by a code of honor, and even someone who leaves a firm generally does not leak what they knew. An agent's memory is a different kind of thing. The very feature that makes it valuable, deep episodic memory, is the exposure. If two thousand of its memories leak, that is two thousand specific things out in the open, and they can be used against you all at once. A human forgets, blurs, protects. An agent remembers precisely, and precision is the risk.

So the AI IC is, to me, both the most exciting layer and the one most gated by something other than capability. I can build the contributor. What I cannot yet build is the trust envelope that makes handing it real work responsible. That gap is real, and it is where the interesting work is.

Watch this part [5:42 AI as an individual contributor](https://youtu.be/YA7rvs6K1bw?t=342) [7:06 Skills, evals, memory](https://youtu.be/YA7rvs6K1bw?t=426) [7:50 The teammate who does not love AI](https://youtu.be/YA7rvs6K1bw?t=470)

+-------------------+
| Section Metadata  |
+---------+---------+
| id      | layer-3 |
+---------+---------+

---

## Layer 4. AI manages AI and humans manage humans, in silos

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board, open)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [![Layer 4 diagram: two parallel management tracks separated by a dashed wall. Left, humans manage humans: ancient, well understood, chain of command since the Roman days, a manager over two reports. Right, AI manages AI: a spectrum from one 24/7 agent to an agent-to-agent mesh, wide open, most of the innovation is here. Middle note: you don't need advanced agents, simple streamlined flows count: page, research, preview and publish, legal review bots. Bottom: efficient, and alienating, because when AI manages AI in its own silo, humans feel left out of the productivity loop.][image15]](https://content.da.live/jackzhaojin/www-eds/media/writing/2026-06-28-patterns-of-work/layer-4-siloed.svg "Open the full-size diagram") |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Two tracks and a wall. The wall is what Layer 5 takes down.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Now management. And the first real version of it is siloed. Humans manage humans. AI manages AI. Two separate tracks, running in parallel, not yet integrated.

The human side is not new. We have managed people since, pick your line, the Roman days. That baseline is ancient and well understood. Chain of command, spans of control, reviews. We did not invent any of it recently.

The AI side is wide open, and it is a spectrum on its own. On one end is my single agent running around the clock, managed entirely by me. On the other end is a full agent-to-agent mesh, where agents coordinate and hand off to each other with a human watching the boundary rather than every step. Between those two ends is most of the actual innovation happening right now. A lot of it runs on protocols for agents talking to agents, like A2A and ACP, and each agent in the mesh can carry its own skills.

One nuance that took me a while to internalize: you do not need advanced agents to reach Layer 4. The agents can be advanced, but the work can be simple, straight out of Layer 3. The thing that makes it Layer 4 is not agent sophistication. It is that the coordination between agents runs on its own instead of routing through a person every time.

A concrete, deliberately unglamorous example. AI creates a page. It does the research. It runs preview and publish. It feeds the result through legal review bots. The whole flow runs end to end, done deterministically or agentically, with a human at the edges rather than in the middle of every step. None of those agents is exotic. The win is that the handoffs no longer wait on a human to carry them.

This is one of the bigger steps in the whole model. Agents managing themselves to produce a larger output than any single agent could. It is where I see a ton of innovation, and it is not hypothetical for me. I have one built, a [content factory](/portfolio/content-factory/), where agents collaborate agent-to-agent, each using a different part of the agentic toolkit, handing off to each other to produce an output bigger than any one of them alone. When I wrote this in June, I was getting ready to present it at [adaptTo() 2026](https://adapt.to/2026/) that September. So when I describe this layer, I am describing something I have actually stood up, not a diagram I am hoping comes true.

There is also a framework layer forming here, and it is worth naming. Orchestration frameworks that can spawn their own agents, keep those agents decoupled from each other, and bake in observability and governance from the start rather than bolting them on later. The decoupling is the part that matters. It is what keeps a mesh debuggable instead of a black box, and it is what lets you swap or fix one agent without the whole thing falling over.

What this layer needs most is knowledge from knowledge workers. I see a lot of posts saying the agentic revolution depends on data, getting all your data clean and organized first, and I think that is partly right. I think it depends more on the knowledge people carry: what the top contributors and the top leaders in a space actually do, and whether that can be turned into agents that are observable and run under strong governance. That takes knowledge from knowledge workers, a lot of change management, and a lot of human evals looking at the output.

Here is why Layer 4 also scares people, and I think naming it is more useful than pretending it does not. When AI manages AI in its own silo, humans can feel left out of the productivity loop. The gains are clearly happening, but they are happening somewhere people are not invited. The siloing is efficient and it is alienating at the same time. That tension is the entire reason Layer 5 has to exist.

Watch this part [8:04 AI manages AI](https://youtu.be/YA7rvs6K1bw?t=484) [9:54 Knowledge from knowledge workers](https://youtu.be/YA7rvs6K1bw?t=594)

+-------------------+
| Section Metadata  |
+---------+---------+
| id      | layer-4 |
+---------+---------+

---

## Why AI with AI is easy and AI with humans is hard

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board, open)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [![The learning between Layer 4 and 5, two panels. Left, green: AI to AI is easier than expected, given a shared AI-friendly interface, shared context and shared storage; this is why the Layer 4 agent track moves fast. Right, amber: AI to humans is the hard part, because our human interfaces were never built for agents; humans read screens, click buttons and sit in meetings, and an agent dropped in works one-handed; this is the real jump to Layer 5. Below: fix the foundation, make the shared surface AI-friendly and human-friendly at once, and the merge gets a lot less hard.][image16]](https://content.da.live/jackzhaojin/www-eds/media/writing/2026-06-28-patterns-of-work/learning-4-to-5.svg "Open the full-size diagram") |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Where the difficulty actually is. It is the reason the foundation section exists.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Before Layer 5, the single most useful thing I learned this year, because it reframes where the difficulty actually is.

It is much easier to get AI to work with and manage other AI than I expected. As long as they share an AI-friendly interface, shared context, and shared storage, agents coordinate with each other remarkably well. That is why the Layer 4 agent track moves fast.

It is a whole other thing to get AI and humans working together. And a big reason is uncomfortable: a lot of our human interfaces were never built to be AI-friendly. Our tools assume a human reads the screen, clicks the button, sits in the meeting. Drop an agent into that and it is working with one hand tied behind its back.

So the hard jump is not agent-to-agent. We mostly know how to do that. The hard jump is the merge, and it is hard for an unglamorous, fixable reason: our surfaces. That is the bridge to Layer 5, and it is why the foundation at the bottom matters as much as it does.

Watch this part [9:27 AI to AI is easier than AI with humans](https://youtu.be/YA7rvs6K1bw?t=567)

+--------------------+
| Section Metadata   |
+---------+----------+
| id      | learning |
+---------+----------+

---

## Layer 5. Humans and AI merged into one mesh

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board, open)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [![Layer 5 diagram: the wall comes down. One merged field where two human managers, judgment and intent, priorities and trust, and two agentic managers, scale and recall, tireless execution, connect to one shared context of memory, context and outputs, governed and observable, with roles mixing. A box of what stays human: coaching, guiding, leading. A box quoting the Bloomberg headline from June 2026, Why Companies Are Cutting Middle Managers in the AI Era, read as an over-reaction, with the truth in between: coordinate, not cut. Bottom: not cutting people, amplifying them; when an agent is confident it finishes the task, when it is not it routes to a person.][image17]](https://content.da.live/jackzhaojin/www-eds/media/writing/2026-06-28-patterns-of-work/layer-5-merged.svg "Open the full-size diagram") |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| One field, shared context, and confidence deciding who takes the work.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

This is the dream. The silos from Layer 4 dissolve into one mesh. Human managers and agentic managers sharing one common context, both with visibility above and below them, the way good leaders already operate.

This layer is the most speculative. I am reacting to what I read and what I have built, not reporting from a finished system. Nobody is fully living at Layer 5 yet, me included.

There is a Bloomberg headline from June 2026. "Why Companies Are Cutting Middle Managers in the AI Era." It is bold, and it is pointing at exactly this shift. I am only going to quote the headline, because that is what I can stand behind. But it sets up where I land.

I read "cut the managers" as an over-reaction. Not wrong to notice the shift, just the wrong conclusion drawn from it. The truth, for me, sits somewhere in between. The point is not to remove people, and it is not to freeze everything exactly as it was either. It is to merge the two tracks: humans and AI coordinating the work of both human and AI contributors, as one connected stream, with real governance and observability around it. Layer 4 feels scary precisely because it leaves humans out. Layer 5 is the version where everyone is back in the loop, the routing is shared, and the productivity is shared rather than siphoned.

What that merge actually requires is not magic. It is specific. Memory sharing. Context sharing. Making sure the AIs have the live context, not a stale copy of it. And making sure humans have observability, reporting, and governance, plus the irreducibly human work of coaching, guiding, and leading. The agents get context and the ability to act. The humans get visibility and the judgment calls. Same mesh, different roles.

One test for context: if a meeting happened and the AI does not know about it, the common context is already broken. And governance and observability will take more effort at first. There will be a lot of piloting, rolling out and collecting what we learned, and a lot of the human work shifts from doing the work to watching AI do it.

This layer is still theoretical, and it can mean a few different things. Let me give you two versions, from simpler to more advanced, because I think the gap between them is the whole story.

The simpler version: human flows and AI flows each do their own work and hand off to each other at the seams. Two tracks, but with real handoffs instead of a wall between them. That is basically Layer 4 with the silo opened up, and it is within reach.

The more advanced version is the one I find hard, and worth it. Here, AI and humans both direct work, onto both AI and human ICs. And the routing runs on confidence. When an agent is highly confident in a task, it just completes it, no human in the path. When it is uncertain, it routes to deep human expertise, and it lets the humans take their time and do the thing only they can do well. The answer to "what should I work on next" stops coming from only your human manager. It arrives as one blended stream, from human leaders and from agentic ones, drawing on the same context. A human IC and an AI IC could both get their next priority from a mix of human and AI direction, and neither source feels bolted on. Leaders and ICs, human and AI, all collaborating in one loop. This is the layer I am least sure how to build, and the one I most want to get right.

It also means better outputs, and we have to actually define what better means. That definition can be done agentically, deterministically, and the good old-fashioned human way. All three, not one of them pretending to be objective.

This is also why the "cut the managers" framing misses it for me. The same capability that someone reads as a reason to remove people is the one that, used well, amplifies them instead. Two completely different futures, built on the same technology. I know which one I am trying to build toward.

Watch this part [10:49 Humans and AI in one mesh](https://youtu.be/YA7rvs6K1bw?t=649) [12:13 The meeting test](https://youtu.be/YA7rvs6K1bw?t=733) [13:01 A leadership grid](https://youtu.be/YA7rvs6K1bw?t=781)

+-------------------+
| Section Metadata  |
+---------+---------+
| id      | layer-5 |
+---------+---------+

---

## The spine of context, governance, observability and evals

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board, open)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [![The spine as a grid: four pillars, context, governance, observability and evals, across all five layers. Context runs from what my agent needs to know at Layer 1 to one live context for humans and AI at Layer 5. Governance from what my agent may touch to accountable across the mesh. Observability from what it did overnight to humans see the agentic side. Evals from is this skill any good to grade the human and agent delivery. Footer: evals are the rigor to refine what you have, not an excuse to chase the next shiny thing.][image18]](https://content.da.live/jackzhaojin/www-eds/media/writing/2026-06-28-patterns-of-work/spine.svg "Open the full-size diagram") |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| The same four pillars at every layer. The map near the top lets you follow one pillar at a time.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

I have mentioned the spine at every layer. Now the spine on its own, because it is the part that decides whether any of the five layers actually holds weight or just looks good in a diagram.

Four pillars run vertically through all five layers. Each one runs the whole height. Sometimes a pillar looks the same at every layer, and that is fine. Often it changes shape as you climb, and those are the differences worth watching.

### Context

Every layer needs the right context in. The individual's agent, the team's shared instructions, the AI IC's working knowledge, the management mesh's shared picture. Context is not abstract. It is the raw material every layer runs on, and most failures I have seen are really context failures wearing a different costume.

### Governance

Who is allowed to do what. What an agent can touch, what it cannot, who is accountable when it acts. As you climb the layers, governance stops being a checkbox and becomes the thing that lets you sleep at night while agents act on your behalf. Of the four pillars, governance is the one I would underline. It is the biggest open piece as the agents get more capable, and it is the one most likely to decide whether any of this is allowed to scale.

### Observability

Can you see what happened. Not just the final output, but the actions along the way, for both humans and agents. At Layer 1 this is "what did my agent do overnight." At Layer 5 it is "can a human leader actually see into the agentic side of the mesh." Same pillar, rising stakes. Here is a useful dependency I have noticed. When the system is properly decoupled, with agents cleanly separated and the right human positioned in the loop, observability starts to come naturally. You do not have to bolt it on after the fact, because the seams where you would watch are already there. Coupling is what makes a system opaque. Decoupling is what makes it watchable.

### Evals

I do not enjoy building evals. They are the unglamorous part. But I have come to believe they are where the real value is, end to end. And the question changes as you climb. At Layer 1, is this skill any good. At Layer 2, is the team actually getting better, and how would you know. At Layer 3, how good is this agent, and at what. At Layer 4, how do you even grade an agent mesh. At Layer 5, how do you evaluate a real delivery system run by humans and agents together. Humans evaluate. Agents evaluate too.

Here is how I think about evals, and it is the most on-voice thing I will say in this whole piece. Evals are the rigor to refine what you already have. They are not an excuse to go chase the next shiny thing. That discipline is the entire difference between a system that gets better and a system that just gets bigger. Almost everyone is optimizing for bigger. The teams that win will be the ones boring enough to optimize for better.

Here is where I am on this. I cannot yet tell you the clean war story where an eval caught the thing that would have shipped broken. I am not there yet. The conviction is ahead of my receipts on this one. But I believe, more than almost anything else on this board, that evals are the future. I would rather say that plainly than dress up a story I have not earned.

Watch this part [11:55 What the merge needs](https://youtu.be/YA7rvs6K1bw?t=715) [12:20 Governance and observability](https://youtu.be/YA7rvs6K1bw?t=740) [12:53 Evals](https://youtu.be/YA7rvs6K1bw?t=773)

+------------------+
| Section Metadata |
+---------+--------+
| id      | spine  |
+---------+--------+

---

## The foundation is shared context services

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board, open)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [![The foundation drawn as a two-way surface: humans on top, people doing the work and looking for context as they go; agents on the bottom, models pulling and pushing the same context; one shared context store in the middle, with read and write arrows flowing both ways for each. Tagged the SharePoint and Teams of the AI era. Before AI: Teams and SharePoint, so people could find context. Now: the same thing, for people and agents.][image19]](https://content.da.live/jackzhaojin/www-eds/media/writing/2026-06-28-patterns-of-work/foundation.svg "Open the full-size diagram") |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Read and write, both ways, for people and agents. Everything above sits on this.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

All five layers and the whole spine sit on one thing. Shared context services. This is the least exciting part of the model and possibly the most important, so I want to give it its due.

Think about what we had before AI. Microsoft Teams. SharePoint. Wikis. Drives. Places where humans went to find the context they needed to do the job, and places they put context back so the next person could find it. That infrastructure was not glamorous, and everything rested on it. No shared context, no team.

Agents are no different. They need their context within reach, often closer to the task and more specialized than a human would need. And critically, they need to contribute back, in a way that is useful to both humans and AI. Two-way. A shared surface, not a one-way feed.

This is also where the Layer 4-to-5 learning pays off. The reason AI-to-AI is easy and AI-with-humans is hard is mostly that our human surfaces were never built to be read and written by agents. Fix the foundation, make the shared context services AI-friendly and human-friendly at the same time, and the hard merge at Layer 5 gets a lot less hard. The foundation is not below the interesting work. It is the thing that decides whether the interesting work is even possible.

Watch this part [12:01 A common context pool](https://youtu.be/YA7rvs6K1bw?t=721)

+----------------------+
| Section Metadata     |
+---------+------------+
| id      | foundation |
+---------+------------+

---

## The new craft is designing where humans and agents work as one

We have run on the same management fundamentals for a very long time. Rome gave us chain of command. The Mongols coordinated the largest contiguous land empire in history with horse-relay stations and no ERP, no Slack, no dashboards. We inherited those fundamentals and, for the most part, never questioned them. They were simply the water we swam in.

AI is the first real reason to ask the question from first principles. Not "how do we make the old way faster," but "is the old way even the right way anymore." For the first time, that question is open. A lot of what we built our ways of working on is no longer a given. I think how we work in ten or twenty years will look very different from how we work now.

So here is where I land after a year of building this, breaking it, and trying again.

The new craft is not building the agent. Building the agent is getting easier every month. The new craft is designing the layer where humans and agents work as one. That is the hard part, the unsolved part, and the part worth your best people.

And I will say the unpopular thing plainly, since it is why I bothered to write all this down. Managing an AI like a contributor, giving it memory, giving it feedback, eventually handing it a real slice of work, is going to feel strange and it is going to make people uneasy. I still think it is where this goes. Not to replace the people. To finally let the builders keep building and the leaders keep leading, at the same time, which was never possible before.

I have been thinking a lot about this, and I am glad I took the time to put it together.

Watch this part [13:35 How we work in ten or twenty years](https://youtu.be/YA7rvs6K1bw?t=815)

+------------------------+
| Section Metadata       |
+---------+--------------+
| id      | where-i-land |
+---------+--------------+

---

## Related

+----------------------------------------------------------------------------------------------------------------------------------------------+
| Row List                                                                                                                                     |
+-----------+------------------------------------------------------------------------------------------+---------------------------------------+
| Portfolio | [The Content Factory: a decoupled agent mesh](/portfolio/content-factory/)               | The Layer 4 build: agents handing     |
|           |                                                                                          | work to agents, and my adaptTo() 2026 |
|           |                                                                                          | talk material.                        |
+-----------+------------------------------------------------------------------------------------------+---------------------------------------+
| Portfolio | [Continuous Executive Agent](/portfolio/continuous-executive-agent/)                     | The 24/7 coding agent behind most of  |
|           |                                                                                          | my Layer 1 receipts.                  |
+-----------+------------------------------------------------------------------------------------------+---------------------------------------+
| Writing   | [Continuous agent: the Second Brain](/writing/2026-05-31-continuous-agent-second-brain/) | The memory store and the five memory  |
|           |                                                                                          | types from Layer 3.                   |
+-----------+------------------------------------------------------------------------------------------+---------------------------------------+
| Writing   | [Two AI skills for team enablement](/writing/2026-04-12-two-ai-skills-team-enablement/)  | Shared, governed skills at Layer 2.   |
+-----------+------------------------------------------------------------------------------------------+---------------------------------------+

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

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Metadata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| title                   | Patterns of Work: Five Layers of Working with AI \| Jack Jin                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| description             | Five layers of working with AI, from one person to a whole organization, the spine and foundation that hold them up, and where each layer gets hard.                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| template                | article                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image                   | ![Patterns of Work: five layers rising as steps from Individuals to Team, AI as a contributor, Management siloed and Management merged, over a bar reading context, governance, observability, evals under every layer][image20]                                                                                                                                                                                                                                                                                                                               |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image:alt               | Patterns of Work: five layers rising as steps from Individuals to Team, AI as a contributor, Management siloed and Management merged, over a bar reading context, governance, observability, evals under every layer                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| published-time          | 2026-06-28                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| modified-time           | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| json-ld                 | {"@context":"https\://schema.org","@graph":\[{"@type":"Person","@id":"https\://www\.jackzhaojin.com/#person","name":"Jack Jin","url":"https\://www\.jackzhaojin.com/","jobTitle":"Associate Director","worksFor":{"@type":"Organization","name":"Accenture","department":{"@type":"Organization","name":"Adobe Business Group"}},"sameAs":\["https\://www\.linkedin.com/in/jackjin","https\://github.com/jackzhaojin","https\://www\.youtube.com/@jackjin8467","https\://www\.credly.com/users/jack-jin"],"award":\["Adobe Experience Manager Champion, class  |
|                         | of 2026-2027","AEM Rockstar winner, Adobe Summit 2024"]},{"@type":"WebSite","@id":"https\://www\.jackzhaojin.com/#website","url":"https\://www\.jackzhaojin.com/","name":"Jack Jin","publisher":{"@id":"https\://www\.jackzhaojin.com/#person"}},{"@type":"Article","@id":"https\://www\.jackzhaojin.com/writing/2026-06-28-patterns-of-work/#article","headline":"Patterns of Work: Five Layers of Working with AI","alternativeHeadline":"After a Year: Where I Think Knowledge Work Is Heading","description":"Five layers of working with AI, from one     |
|                         | person to a whole organization, the spine and foundation that hold them up, and where each layer gets hard.","author":{"@id":"https\://www\.jackzhaojin.com/#person"},"publisher":{"@id":"https\://www\.jackzhaojin.com/#person"},"image":"https\://www\.jackzhaojin.com/writing/2026-06-28-patterns-of-work/media\_1a1c5441cba5b6a812b8b9ae9860ab0d6474c5095.jpg","mainEntityOfPage":"https\://www\.jackzhaojin.com/writing/2026-06-28-patterns-of-work/","isPartOf":{"@id":"https\://www\.jackzhaojin.com/#website"},"about":\["AI ways of working","Future  |
|                         | of knowledge work","AI agents as individual contributors","Agent governance, observability and evals"],"datePublished":"2026-06-28","dateModified":"2026-10-04","inLanguage":"en","video":{"@id":"https\://www\.jackzhaojin.com/writing/2026-06-28-patterns-of-work/#video"}},{"@type":"VideoObject","@id":"https\://www\.jackzhaojin.com/writing/2026-06-28-patterns-of-work/#video","name":"Five Layers of Working with AI, from One Person to a Whole Organization","description":"A model for working with AI in five layers, from one person running many |
|                         | loops to humans and agents managing work                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|                         | together.","thumbnailUrl":"https\://www\.jackzhaojin.com/writing/2026-06-28-patterns-of-work/media\_1a1c5441cba5b6a812b8b9ae9860ab0d6474c5095.jpg","uploadDate":"2026-10-03T19:57:00Z","duration":"PT14M40S","embedUrl":"https\://www\.youtube-nocookie.com/embed/YA7rvs6K1bw"},{"@type":"BreadcrumbList","@id":"https\://www\.jackzhaojin.com/writing/2026-06-28-patterns-of-work/#breadcrumb","itemListElement":\[{"@type":"ListItem","position":1,"name":"Home","item":"https\://www\.jackzhaojin.com/"},{"@type":"ListItem","position":2,"name":"Technical |
|                         | Writing","item":"https\://www\.jackzhaojin.com/writing/"},{"@type":"ListItem","position":3,"name":"Patterns of Work","item":"https\://www\.jackzhaojin.com/writing/2026-06-28-patterns-of-work/"}]}]}                                                                                                                                                                                                                                                                                                                                                          |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| og:image:alt            | Patterns of Work: five layers rising as steps from Individuals to Team, AI as a contributor, Management siloed and Management merged, over a bar reading context, governance, observability, evals under every layer                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:published\_time | 2026-06-28                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:modified\_time  | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:author          | https\://www\.jackzhaojin.com/                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-summary         | Five layers of working with AI, from one person running loops around the clock to humans and agents managing work together, plus the spine and foundation that decide whether any of it holds. Each layer covers what changes and where it gets hard, with an explorer to walk the model.                                                                                                                                                                                                                                                                      |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-image           | https\://www\.jackzhaojin.com/writing/media\_1a1c5441cba5b6a812b8b9ae9860ab0d6474c5095.jpg?width=750\&format=jpg\&optimize=medium                                                                                                                                                                                                                                                                                                                                                                                                                              |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-topics          | AI Engineering                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-reading-time    | 27 min read                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-video-time      | 14:40 video                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-url       | https\://youtu.be/YA7rvs6K1bw                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-label     | Watch on YouTube                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-keywords        | patterns of work future of work knowledge work ai as an individual contributor agent memory agent mesh a2a acp loop engineering harness evals agent governance observability shared context continuous-agent adaptto() 2026                                                                                                                                                                                                                                                                                                                                    |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_1a24fbf646be3332b783b29bb8f924af1a4372ff4.png#width=144&height=92

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_10ab1cf043d72c601b2b205b6ee0c8a994ce89e28.png#width=144&height=92

[image2]: https://main--www-eds--jackzhaojin.aem.page/media_1d7a78f76dd1079690f9b618effaea6003bea8a9d.png#width=144&height=92

[image3]: https://main--www-eds--jackzhaojin.aem.page/media_1feaf44d2effa19c9c99d2592fb2abb8db97314d2.png#width=144&height=92

[image4]: https://main--www-eds--jackzhaojin.aem.page/media_1cfe2962653cd955cf1ee80ed298c9752f5d1154e.png#width=144&height=92

[image5]: https://main--www-eds--jackzhaojin.aem.page/media_1093f8ddd057b9991e2ca7870365209b93060afbc.png#width=144&height=92

[image6]: https://main--www-eds--jackzhaojin.aem.page/media_14848b32621263e1cfc435c39e3b9d8222fe04b2e.png#width=144&height=92

[image7]: https://main--www-eds--jackzhaojin.aem.page/media_1f9120bd475ad0155665d1b067031c3a84089905c.png#width=144&height=92

[image8]: https://main--www-eds--jackzhaojin.aem.page/media_1b8dd09ebbe30a3467fd12ee0c954c0e381bc90ba.png#width=144&height=92

[image9]: https://main--www-eds--jackzhaojin.aem.page/media_1a4fdc23b91686cc264112b9054f82d6bc322bb44.svg#width=1400&height=2120

[image10]: https://main--www-eds--jackzhaojin.aem.page/media_1bf185f9cddf145457394e61d441b5e5217db36b7.svg#width=1600&height=900

[image11]: https://main--www-eds--jackzhaojin.aem.page/media_1a489e33196e50a851fe176e7b42e0561a3c0440f.jpg#width=900&height=675

[image12]: https://main--www-eds--jackzhaojin.aem.page/media_1cb1c3c9293193fa02d57679390ec2ab22617362b.svg#width=1600&height=900

[image13]: https://main--www-eds--jackzhaojin.aem.page/media_13873c4bd63ddd1fbcadbe21db5eee1c44c09d304.svg#width=1600&height=900

[image14]: https://main--www-eds--jackzhaojin.aem.page/media_10c52f914a57e8a61eb492c25680a1f5147de10a1.svg#width=1600&height=900

[image15]: https://main--www-eds--jackzhaojin.aem.page/media_1f9a0da21b93c6b47dd509e4971e355f13cdacf8d.svg#width=1600&height=900

[image16]: https://main--www-eds--jackzhaojin.aem.page/media_16d2995d4366d3bd2556899eb9ad93e887377c8a5.svg#width=1600&height=900

[image17]: https://main--www-eds--jackzhaojin.aem.page/media_10e9f313c0b7a59cf85bf6a9302d83cec3992b13d.svg#width=1600&height=900

[image18]: https://main--www-eds--jackzhaojin.aem.page/media_1e0615d3de747f3093f2a7bb9c9b5e1aa78567428.svg#width=1600&height=900

[image19]: https://main--www-eds--jackzhaojin.aem.page/media_141b2b033a15e95423da6c3070a5c74bd86fc1380.svg#width=1600&height=900

[image20]: https://main--www-eds--jackzhaojin.aem.page/media_1a1c5441cba5b6a812b8b9ae9860ab0d6474c5095.jpg#width=1280&height=720
