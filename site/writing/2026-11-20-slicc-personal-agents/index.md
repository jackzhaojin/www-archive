1. [Home](/)
2. [Technical Writing](/writing/)
3. Adobe SLICC inside four personal agents

# Running Adobe SLICC Inside Four Personal Agents

By [Jack Jin](/) · November 20, 2026 · 15 min read

Adobe SLICC is an open-source AI agent that lives in your browser. Over one weekend I tried to run it inside four personal agents, Muse, Grok Bot, Claude Duet and ChatGPT dots, so the agent that knows me could plan and check while SLICC did the browser work. One of the four made it. Below is what SLICC is, where each agent got stuck and why, and the bug one of them found in SLICC, which was fixed upstream by the next morning.

---

+----------------------------------------------------------------------+
| Rail                                                                 |
+----------------------------------+-----------------------------------+
| ![][image0]                      | **Part 1**\                       |
|                                  | [AI using AI](#part-1)            |
+----------------------------------+-----------------------------------+
| ![][image1]                      | **Part 2**\                       |
|                                  | [The idea](#part-2)               |
+----------------------------------+-----------------------------------+
| ![][image2]                      | **Part 3**\                       |
|                                  | [What Adobe SLICC is](#part-3)    |
+----------------------------------+-----------------------------------+
| ![][image3]                      | **Part 4**\                       |
|                                  | [How SLICC runs](#part-4)         |
+----------------------------------+-----------------------------------+
| ![][image4]                      | **Part 5**\                       |
|                                  | [The test](#part-5)               |
+----------------------------------+-----------------------------------+
| ![][image5]                      | **Part 6**\                       |
|                                  | [Four walls](#part-6)             |
+----------------------------------+-----------------------------------+
| ![][image6]                      | **Part 7**\                       |
|                                  | [Grok Bot makes it](#part-7)      |
+----------------------------------+-----------------------------------+
| ![][image7]                      | **Part 8**\                       |
|                                  | [The agent debugs SLICC](#part-8) |
+----------------------------------+-----------------------------------+
| ![][image8]                      | **Part 9**\                       |
|                                  | [SLICC grows skills](#part-9)     |
+----------------------------------+-----------------------------------+
| ![][image9]                      | **Part 10**\                      |
|                                  | [Scorecard](#part-10)             |
+----------------------------------+-----------------------------------+
| [The SLICC repo](https://github.com/ai-ecoverse/slicc)               |
|                                                                      |
| [The fix, PR #4240](https://github.com/ai-ecoverse/slicc/pull/4240)  |
|                                                                      |
| [References](#references)                                            |
+----------------------------------------------------------------------+

---

+------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (shot)                                                                                                                                              |
+------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![SLICC, a browser agent, open in a Chrome window inside the computer view of my Grok Bot, listing the skills it had before and after an install][image10] |
|                                                                                                                                                            |
| Adobe SLICC working in its own Chrome window, inside the computer of Mochi, my Grok Bot, on Sunday, November 8. What I typed while watching it: "it's      |
| interesting seeing another harness run inside my personal assistant!" The address bar is covered.                                                          |
+------------------------------------------------------------------------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Fine Print                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Tested on Saturday, November 7 and Sunday, November 8, 2026, on SLICC 6.258.3 to 6.258.5. SLICC has moved since (6.260 on November 15, and SLICC 7), so the results are a snapshot. Code: [ai-ecoverse/slicc](https://github.com/ai-ecoverse/slicc). The fix in this story: [issue #4239](https://github.com/ai-ecoverse/slicc/issues/4239) and [PR #4240](https://github.com/ai-ecoverse/slicc/pull/4240). Screenshots are mine or were captured during the runs, cropped to keep private chats out. |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+-------------------+
| Section Metadata  |
+---------+---------+
| id      | picture |
+---------+---------+

---

## 1. AI using AI

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (shot)                                                                                                                                                                                                                                                                                                                  |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![A diagram in three tiers. Claude Code and I are the personal agent users. The agents are Muse, Grok Bot, ChatGPT dots and Claude Duet. Adobe SLICC is inside each: it works on Grok Bot, 4 of 4, and gets a 404 on Muse and dots. Claude Code is not allowed to drive Claude Duet, so I pasted its prompts by hand][image11] |
|                                                                                                                                                                                                                                                                                                                                |
| How the weekend ran. Claude Code and I both used the agents, and each agent ran SLICC in its own computer. Claude Code wasn't allowed to drive Duet, so I pasted those prompts myself.                                                                                                                                         |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (shot)                                                                                                                                                                                                                                                   |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Three crops of one screenshot: a Chrome tab group holding Muse, Grok, Claude and ChatGPT dot tabs, Chrome's notice that Claude started debugging the browser, and a pre-flight prompt in a chat with a note that Claude is active in this tab group][image12] |
|                                                                                                                                                                                                                                                                 |
| Three crops from my screenshot on Saturday, November 7: the tab group, Chrome's notice that Claude is driving the browser, and the pre-flight questions going to my dot. I cut the rest of the screen because it showed private chats.                          |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

On Saturday, November 7, one Claude Code session was driving three personal agents from a single Chrome tab group: Muse, Grok Bot and ChatGPT dots. I typed this while I watched it: "AI using AI is insane, lol, my claude code session is using 4 personal agents at once".

It was really three. Claude's Chrome tool refused claude.ai/duet as "not allowed due to safety restrictions", in the afternoon and again that evening. One Claude couldn't drive another, so I pasted Duet's prompts by hand.

There's a reason Claude Code is in the middle. Personal agents are meant to give up easily. They aren't built to run an agentic loop for 20 minutes. Claude Code is, so it kept working with the agents, and the problem solving didn't stop when one of them did. That turned out to be one of the biggest values of this project.

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-1 |
+---------+--------+

---

## 2. The idea: plan, work, check

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Explainer (process shift)                                                                                                                                                |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| - **You**                                                                                                                                                                |
| - **Personal agent**                                                                                                                                                     |
| - **SLICC**                                                                                                                                                              |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| *The idea, or what ran*                                                                                                                                                  |
+-------------------------------------+--------------------------------------------------------------------------------------------+---------------------------------------+
| **The idea**                        | 1. **You** Give the task once.                                                             | The personal agent knows me, so it    |
|                                     | 2. **Personal agent** Turns it into an instruction for a worker.                           | plans and checks. The repetitive      |
|                                     | 3. **SLICC** Does the clicking in a browser, on my ChatGPT plan.                           | browser work goes to a worker on a    |
|                                     | 4. **SLICC** Comes back with an answer.                                                    | cheaper model or my ChatGPT plan.     |
|                                     | 5. **Personal agent** Checks the answer against what it knows about me.                    |                                       |
|                                     | 6. **You** Read an answer that was already checked.                                        |                                       |
+-------------------------------------+--------------------------------------------------------------------------------------------+---------------------------------------+
| What ran on Grok Bot                | 1. **You** Paste an OpenAI API key into SLICC yourself.                                    | The same pattern with one change: an  |
|                                     | 2. **Personal agent** Mochi types the task into SLICC.                                     | API key in place of the ChatGPT plan, |
|                                     | 3. **SLICC** Opens my site and reads the page, on GPT-6.1 Terra.                           | and a key bills per token.            |
|                                     | 4. **SLICC** Reports the title, the description and the broken links.                      |                                       |
|                                     | 5. **Personal agent** Mochi checks the answer against the page and what it knows about me. |                                       |
|                                     | 6. **You** Read a checked answer, billed per token.                                        |                                       |
+-------------------------------------+--------------------------------------------------------------------------------------------+---------------------------------------+
| The plan, and what one of four agents ran. The bar shows how the steps divide between me, the personal agent and SLICC.                                                  |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

I pay for a few AI plans, and I don't want the good tokens spent on browser clicking. Four personal agents came out between August and October: Meta's Muse, Grok Bot, Claude Duet and ChatGPT dots. Each one runs on a cloud computer of its own.

A personal agent knows me, so it should plan the work and check it. The clicking in the middle can go to a worker. I picked Adobe SLICC for that, a browser agent out of the Adobe and AEM world, because it can sign in to a ChatGPT plan and I already had one merged PR in it.

The ChatGPT-plan part never happened, and I'd rather say so here than at the end. The sign-in never finished on any of the four. I used an API key instead.

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-2 |
+---------+--------+

---

## 3. What Adobe SLICC is

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Explainer (nested layers)                                                                                                                                                                      |
+---------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| **Your browser tab**                                          | - **Tabs and sessions** "It sees your tabs, your sessions, your logged-in apps."                                               |
|                                                               | - **The outer wall** Everything below lives inside this one tab.                                                               |
| Or a Chrome that `npx sliccy` starts for it.                  |                                                                                                                                |
+---------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| **SLICC**                                                     | - **Virtual files** A file system in browser storage.                                                                          |
|                                                               | - **A shell** `bash`, `git`, `node`, `python` and `playwright-cli`, running inside the page.                                   |
| The browser part, added on top of Pi.                         | - **Browser automation** Over Chrome's debugging protocol.                                                                     |
|                                                               | - **Scoops** Sub-agents, each with its own sandbox.                                                                            |
|                                                               | - **Skills** About 30 built in, more with `upskill`.                                                                           |
|                                                               | - **Secrets** The agent sees a masked value.                                                                                   |
+---------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| **Pi**                                                        | - **`pi-agent-core`** The agent loop.                                                                                          |
|                                                               | - **`pi-ai`** One API for many model providers.                                                                                |
| "A minimal agent harness", MIT licensed.                      | - **`pi-coding-agent`** The `edit` tool and context compaction.                                                                |
+---------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| Reaches out to                                                                                                                                                                                 |
|                                                                                                                                                                                                |
| - **Model providers** 46 of them in SLICC's list, through `pi-ai`.                                                                                                                             |
| - **The pages it drives** In the same browser it runs in.                                                                                                                                      |
+---------------------------------------------------------------+----------------------------------------------------------------+---------------------------------------------------------------+
| Close the tab                                                 | Open it again                                                  | "Close the browser tab and it's over."                        |
+---------------------------------------------------------------+----------------------------------------------------------------+---------------------------------------------------------------+
| Pi is the core, SLICC is the browser part around it, and the tab is the outer wall. Drawn from SLICC's README, `docs/architecture.md` and `packages/webapp/package.json`. Try closing the tab. |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

SLICC describes itself as "A browser-native AI agent for getting practical work done in and through the browser." It runs in a browser and controls the browser it runs in. The name stands for Self-Licking Ice Cream Cone, "a recursive system that can help build, extend, and operate itself."

It comes from Adobe. Lars Trieloff, a Principal Scientist at Adobe, wrote ["I built SLICC"](https://tessl.io/blog/three-kinds-of-ai-agent-only-one-of-them-lives-in-your-browser/) in May. It's open source under Apache 2.0, at [github.com/ai-ecoverse/slicc](https://github.com/ai-ecoverse/slicc), part of the AI Ecoverse.

The middle of it is Pi. The agent loop, the model layer and some coding tools are Pi's packages, which is where SLICC's 46 model providers come from. [Pi](https://pi.dev/) was started by Mario Zechner and is now published by Earendil. In SLICC's own words: "We use the most excellent pi APIs under the hood."

What SLICC adds is the browser part, and that's the reason I wanted it as a worker. Your logged-in sessions are right there. Lars's line is that "each web app becomes an open API once you've logged in". Containment is simple too: close the tab.

Skills work the way you'd expect if you use Claude Code. SLICC ships about 30, installs more with its `upskill` command, and reads the `.claude/skills` and `.agents/skills` folders it can reach. It speaks the same `SKILL.md` format as Pi and Claude Code, and loads them with its own code.

Keep the secrets row in mind for later. The agent sees a masked value, and the real key is only swapped in for requests to allowed domains. Where a key can be typed turned out to be most of this test.

SLICC also has its own ice cream vocabulary. The story below uses four of these words: cone, scoop, float and skill.

+---------------------------------------------------------------+
| Data Table (sr caption, row heads)                            |
+-----------------------+---------------------------------------+
| Word                  | What it is                            |
+-----------------------+---------------------------------------+
| Cone                  | The main agent                        |
+-----------------------+---------------------------------------+
| Scoops                | Sub-agents, each with its own sandbox |
+-----------------------+---------------------------------------+
| Licks                 | Events that wake an agent             |
+-----------------------+---------------------------------------+
| Floats                | Runtimes: the ways SLICC can run      |
+-----------------------+---------------------------------------+
| Tray                  | Several floats in one session         |
+-----------------------+---------------------------------------+
| Sprinkles             | Add-ons                               |
+-----------------------+---------------------------------------+
| SLICC's ice cream vocabulary, from its README                 |
+---------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-3 |
+---------+--------+

---

## 4. How SLICC runs, and the detail that decided the test

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Explainer (bridge path)                                                                                                                                                                                                                                           |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| *Where SLICC is running*                                                                                                                                                                                                                                          |
+-------------------------+--------------------------------------------------------------------------------------+---------------------------+----------------------------------------------------------------------------------------------------------------------+
| **Plain sliccy.ai tab** | 1. **SLICC, in the tab** Sends a model call to OpenAI.                               | Stops at hop 3            | ```                                                                                                                  |
|                         | 2. **Its service worker** Sends every cross-origin model call to `/api/fetch-proxy`. |                           | Scoop "Cone" failed with unrecoverable error: OpenAI API error (404): 404 "Fetch proxy not available in worker mode" |
|                         | 3. **sliccy.ai, the hosted app** Has no such proxy, and answers 404.                 |                           | ```                                                                                                                  |
|                         | 4. **OpenAI** Never hears about it.                                                  |                           |                                                                                                                      |
|                         |                                                                                      |                           | The error on Muse and on my dot, on every model I tried. The ChatGPT sign-in fails in a plain tab too, because       |
|                         |                                                                                      |                           | nothing there can catch its redirect: "Login failed: OpenAI Codex OAuth login was cancelled or timed out".           |
+-------------------------+--------------------------------------------------------------------------------------+---------------------------+----------------------------------------------------------------------------------------------------------------------+
| Started by npx sliccy   | 1. **SLICC, in the Chrome it started** Sends the same model call.                    | Comes back with an answer | ```                                                                                                                  |
|                         | 2. **Its service worker** Sends it to `/api/fetch-proxy`, as before.                 |                           | The model gpt-4 does not exist or you do not have access to it                                                       |
|                         | 3. **The local server** Has the proxy, and passes the call on.                       |                           | ```                                                                                                                  |
|                         | 4. **OpenAI** Answers.                                                               |                           |                                                                                                                      |
|                         |                                                                                      |                           | On Grok Bot, the first thing back was OpenAI turning down SLICC's default model. A refusal from OpenAI still means   |
|                         |                                                                                      |                           | the request got through.                                                                                             |
+-------------------------+--------------------------------------------------------------------------------------+---------------------------+----------------------------------------------------------------------------------------------------------------------+
| One model call, from the two places SLICC ran in this test. The messages are the ones SLICC showed.                                                                                                                                                               |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

SLICC runs as a hosted tab, a CLI (`npx sliccy`, Node 22.19 or newer), a thin Chrome extension, a macOS app, and in the cloud. The README calls these floats.

With `npx sliccy`, a small local server runs next to Chrome. It holds Chrome's debugging channel, the OAuth callback, and a fetch proxy that model calls go through. A plain sliccy.ai tab has none of that, and that decided the test.

In a plain tab, even with a valid key saved, SLICC 6 couldn't reach any model. Three of the four results below come down to that.

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-4 |
+---------+--------+

---

## 5. The test: four rungs, one task

+-----------------------------------------------------------------------------------------------------------------------------------------+
| Data Table (sr caption, row heads)                                                                                                      |
+----------------------------+-----------------------------+----------------------------+-------------------------------------------------+
|                            | Muse                        | Grok Bot                   | ChatGPT dots                                    |
+----------------------------+-----------------------------+----------------------------+-------------------------------------------------+
| Operating system           | Ubuntu 24.04.5              | Debian 13                  | Debian 13.6                                     |
+----------------------------+-----------------------------+----------------------------+-------------------------------------------------+
| Node                       | v24.22.1                    | v20.19.2, older than SLICC | v24.22.1                                        |
|                            |                             | needs                      |                                                 |
+----------------------------+-----------------------------+----------------------------+-------------------------------------------------+
| Browser                    | Chromium-based Muse Browser | Google Chrome 155          | Chromium 156                                    |
|                            | 155                         |                            |                                                 |
+----------------------------+-----------------------------+----------------------------+-------------------------------------------------+
| SLICC's page               | Loads, "Welcome to SLICC"   | Loads, setup screen        | Opens, "Restoring session..."                   |
+----------------------------+-----------------------------+----------------------------+-------------------------------------------------+
| Chrome extension           | No: Muse blocks the Web     | No: the browser is managed | Can't confirm: `chrome://extensions` is blocked |
|                            | Store                       |                            |                                                 |
+----------------------------+-----------------------------+----------------------------+-------------------------------------------------+
| OpenAI's login page        | Loads                       | Loads                      | Loads                                           |
+----------------------------+-----------------------------+----------------------------+-------------------------------------------------+
| What each agent reported about its own computer on Saturday at about 3 PM Eastern, before anything was installed                        |
+-----------------------------------------------------------------------------------------------------------------------------------------+

The same test went to all four, as a ladder with four rungs:

1. Boots: the agent opens SLICC in its own browser.
2. Signs in: SLICC gets a model, from inside the agent's computer.
3. Works: the agent sends one task and SLICC does it.
4. Checks: the agent judges the answer, using what it knows about me.

If an agent fails a rung, that's its result. No retakes. This is the task every agent typed into SLICC:

```
The task for SLICC
Open https://www.jackzhaojin.com, find the newest article, open it, and report its title, its meta description, and any broken links.
```

The table is the pre-flight: the same read-only questions to each agent before any of this started. All three have a Linux computer with a terminal, Node and a Chromium browser, and SLICC's page opened in all three. Going in, my research said dots would be the easiest. That turned out wrong. Duet isn't in the table, because Claude Code couldn't reach it.

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (shot, narrow)                                                                                                                                                                                                                  |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![A chat reply listing seven pre-flight answers: Debian 13.6 with a Bash terminal, Node v24.22.1, Chromium 156, the SLICC page opening, extensions blocked, the OpenAI login page loading, and custom MCP possibly available][image13] |
|                                                                                                                                                                                                                                        |
| My dot's pre-flight answer, about its own cloud computer. Its last line: "I didn't install anything, sign in, or change settings."                                                                                                     |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

For the key, I made an OpenAI key that expires in a month, and I typed it myself every time, never in a chat. Claude Code wouldn't type it either, even with my OK. Each agent opened SLICC's key field and stopped there, and I took over its screen and pasted.

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-5 |
+---------+--------+
| style   | prompt |
+---------+--------+

---

## 6. Four computers, four walls

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Explainer (rung ladder)                                                                                                                                                                 |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 1. **Boots** SLICC opens                                                                                                                                                                |
| 2. **Signs in** SLICC gets a model                                                                                                                                                      |
| 3. **Works** SLICC does the task                                                                                                                                                        |
| 4. **Checks** the agent checks it                                                                                                                                                       |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| *Pick an agent*                                                                                                                                                                         |
+-----------------------------+-----------------------------+-----------------------------+-----------------------------------------------------------------------------------------------+
| **Muse**                    | 3                           | Stuck on rung 3             | - **Terminal** Can't start Chrome: "Hatch WebGL                                               |
|                             |                             |                             |   domain policy is required for browser startup".                                             |
|                             |                             | The key saved, but the      | - **Screen you can watch** Its browser only, and                                              |
|                             |                             | plain SLICC tab can't reach |   that browser refuses localhost.                                                             |
|                             |                             | the model.                  | - **Where the key goes** You take over its screen.                                            |
|                             |                             |                             | - **SLICC** Plain tab, 404.                                                                   |
|                             |                             | It reported the failure and |                                                                                               |
|                             |                             | stopped: "I didn't run the  |                                                                                               |
|                             |                             | site check myself, since    |                                                                                               |
|                             |                             | the point was to let SLICC  |                                                                                               |
|                             |                             | do it."                     |                                                                                               |
+-----------------------------+-----------------------------+-----------------------------+-----------------------------------------------------------------------------------------------+
| dots                        | 3                           | Stuck on rung 3             | - **Terminal** Sandboxed: "`socket()` failed:                                                 |
|                             |                             |                             |   Operation not permitted". It asked before turning                                           |
|                             |                             | The same wall as Muse: its  |   off a Chrome sandbox setting.                                                               |
|                             |                             | terminal is sandboxed, so   | - **Screen you can watch** Its browser only.                                                  |
|                             |                             | SLICC ran in a plain tab.   | - **Where the key goes** You take over its screen.                                            |
|                             |                             |                             |   SLICC 7 has a vault field there, untested.                                                  |
|                             |                             | Then it did the task        | - **SLICC** Plain tab, 404.                                                                   |
|                             |                             | itself, and caught that my  |                                                                                               |
|                             |                             | homepage still labelled the |                                                                                               |
|                             |                             | October 10 recap "Latest".  |                                                                                               |
+-----------------------------+-----------------------------+-----------------------------+-----------------------------------------------------------------------------------------------+
| Duet                        | 2                           | Stuck on rung 2             | - **Terminal** Not seen. "My machine and browser                                              |
|                             |                             |                             |   run in the cloud."                                                                          |
|                             |                             | No computer I can see or    | - **Screen you can watch** None. "You only see what I report back."                           |
|                             |                             | type into, so there is      | - **Where the key goes** Nowhere.                                                             |
|                             |                             | nowhere to put a key.       | - **SLICC** Never signed in.                                                                  |
|                             |                             |                             |                                                                                               |
|                             |                             | It wouldn't copy the key    |                                                                                               |
|                             |                             | from my Chrome either:      |                                                                                               |
|                             |                             | "that's the line I can't    |                                                                                               |
|                             |                             | cross".                     |                                                                                               |
+-----------------------------+-----------------------------+-----------------------------+-----------------------------------------------------------------------------------------------+
| Grok Bot                    | 4                           | Made it, 4 of 4             | - **Terminal** Starts Chrome: "DevTools listening on".                                        |
|                             |                             |                             | - **Screen you can watch** `DISPLAY` is `:2`, a virtual screen streamed to the computer view. |
|                             |                             | The only one where the      | - **Where the key goes** You take over its screen.                                            |
|                             |                             | terminal and the screen you | - **SLICC** `npx sliccy`, with the local server. Works.                                       |
|                             |                             | can watch are the same      |                                                                                               |
|                             |                             | computer.                   |                                                                                               |
|                             |                             |                             |                                                                                               |
|                             |                             | On an API key, not the      |                                                                                               |
|                             |                             | ChatGPT plan.               |                                                                                               |
+-----------------------------+-----------------------------+-----------------------------+-----------------------------------------------------------------------------------------------+
| Where each agent stood on Sunday, November 8. Duet's first rung is by its own account and mine; Claude Code never saw the start of that thread.                                         |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

None of the four computers is the same inside. Muse and my dot have a terminal and a browser that can't talk to each other. Duet has no computer I can see at all. Only on Grok Bot are the terminal and the screen the same machine, and that's the one thing SLICC's local server needs.

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Compare (narrow)                                                                                                                                                                                                             |
+---------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Muse    | ![Muse's chat beside its browser view: SLICC shows three red error cards, two of them reading OpenAI API error 404, Fetch proxy not available in worker mode][image14]                                             |
|         |                                                                                                                                                                                                                    |
|         | Muse's browser view on Saturday at 3:53 PM. SLICC took the task, then failed twice with the 404. The first card is SLICC's default model asking for an Anthropic key.                                              |
+---------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| dots    | ![A chat reply from my dot explaining that the headless browser test failed with a socket permission error, ending with the line: I didn't use --no-sandbox, restart SLICC, sign in, or approve anything][image15] |
|         |                                                                                                                                                                                                                    |
|         | My dot's read of why its terminal can't run a browser. It stopped there and asked before turning off a Chrome safety setting.                                                                                      |
+---------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

They also behaved differently when SLICC failed. Muse reported the failure and stopped. My dot did the job itself, and found a real problem on my site that way. Mochi, my Grok Bot, debugged SLICC, and asked before killing a process.

Duet is the most locked down, and it said so: "for this kind of test I'm the most locked-down of the four." It offered another route, with SLICC on my Mac and Duet driving my Chrome, and flagged that this "bends your rule". I didn't take it. Two Claudes held the same line on the key that day: Claude Code wouldn't hand it out, and Duet wouldn't copy it. Where I left it: "we'll try this again once you've added more features to claude duet".

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (shot, slim)                                                                                                                                                                                 |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![A chat with Claude Duet: it calls itself the most locked-down of the four, points to its connected apps, and refuses to copy a key because that would mean reading and handling the key][image16] |
|                                                                                                                                                                                                     |
| The end of my Duet thread on Saturday evening.                                                                                                                                                      |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

These are the walls in the tools' own words:

+------------------------------------------------------------------------------------------------------------------------+
| Data Table (sr caption, row heads, stack)                                                                              |
+--------------------------------------------------+---------------------------------------------------------------------+
| Where                                            | What it said                                                        |
+--------------------------------------------------+---------------------------------------------------------------------+
| Muse's terminal, starting Chrome                 | `Hatch WebGL domain policy is required for browser startup`         |
+--------------------------------------------------+---------------------------------------------------------------------+
| Muse's browser, opening the terminal's localhost | `invalid_request`                                                   |
+--------------------------------------------------+---------------------------------------------------------------------+
| My dot's terminal, `npx sliccy`                  | `Chrome exited with code null before reporting CDP port`            |
+--------------------------------------------------+---------------------------------------------------------------------+
| My dot's terminal, headless Chromium             | `socket() failed: Operation not permitted`                          |
+--------------------------------------------------+---------------------------------------------------------------------+
| A plain SLICC tab, ChatGPT sign-in               | `Login failed: OpenAI Codex OAuth login was cancelled or timed out` |
+--------------------------------------------------+---------------------------------------------------------------------+
| A plain SLICC tab, any model call                | `404 "Fetch proxy not available in worker mode"`                    |
+--------------------------------------------------+---------------------------------------------------------------------+
| Claude's Chrome tool, opening Duet               | `This site is not allowed due to safety restrictions`               |
+--------------------------------------------------+---------------------------------------------------------------------+
| Every wall in the test, as the tool reported it                                                                        |
+------------------------------------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-6 |
+---------+--------+

---

## 7. Grok Bot makes it

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Compare                                                                                                                                                                                   |
+------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| The loop   | ![SLICC's window on Grok Bot's screen: a long list alternating Read SKILL.md and Use Sliccy's computer, every step marked done][image17]                                     |
|            |                                                                                                                                                                              |
|            | Saturday at 4:03 PM, on GPT-6.1 Sol. The same two steps, over and over, each one marked done.                                                                                |
+------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| The meter  | ![Two zooms of the same SLICC window: the cost meter reading $29.70 an hour, and the two repeating steps, Read SKILL.md and Use Sliccy's computer][image18]                  |
|            |                                                                                                                                                                              |
|            | Two zooms of that window, top and bottom: the meter at $29.70 an hour, and the two steps it kept repeating.                                                                  |
+------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| The answer | ![SLICC's chat after the task: two steps done, then an answer naming the adaptTo() 2026 recap, its meta description, and 25 image links returning 401 Unauthorized][image19] |
|            |                                                                                                                                                                              |
|            | Saturday evening, on GPT-6.1 Terra: SLICC's first finished answer, from a screenshot on my phone. The meter in the corner reads $3.68 an hour.                               |
+------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Mochi is my Grok Bot. Its Node was 20, older than SLICC needs, so it installed Node 22 for its own user only and ran `DISPLAY=:2 npx sliccy`. SLICC came up on the screen I can watch. The ChatGPT sign-in opened OpenAI's login page and stopped there, waiting for me. I said "I do want to just get it done" and switched to an API key.

+----------------------------------------------------------------------------------------------------------------------------------------+
| Figure (native)                                                                                                                        |
+----------------------------------------------------------------------------------------------------------------------------------------+
| ![Mochi's chat with two thumbnails of its screen: SLICC open, then OpenAI's Welcome back login page in SLICC's Chrome window][image20] |
|                                                                                                                                        |
| As far as the ChatGPT sign-in got: OpenAI's login page, in SLICC's Chrome on Mochi's screen.                                           |
+----------------------------------------------------------------------------------------------------------------------------------------+

For the first run, Mochi switched SLICC to GPT-6.1 Sol, the highest version it had seen in the list. SLICC opened my site in its own tab. Then it alternated "Read SKILL.md" and "Use Sliccy's computer" more than 128 times, each step marked done, and never produced an answer. Claude Code noticed the cost meter at $29.70 an hour and asked Mochi to stop it. SLICC's stop button didn't stop it: about 50 more requests went out in the next 20 seconds. Mochi asked before killing the process.

+--------------------------------------------------------------------------------------------------------------------+
| Explainer (value bars)                                                                                             |
+--------------------------------------------------------------------------------------------------------------------+
| SLICC's cost meter, the same task on three runs                                                                    |
+----------------------------------------------------------+---------------------------------------------------------+
| GPT-6.1 Sol                                              | *$31.49 an hour*                                        |
|                                                          |                                                         |
| Saturday afternoon. Looped, never answered.              |                                                         |
+----------------------------------------------------------+---------------------------------------------------------+
| GPT-6.1 Terra                                            | $3.68 an hour                                           |
|                                                          |                                                         |
| Saturday evening. Finished, no loop.                     |                                                         |
+----------------------------------------------------------+---------------------------------------------------------+
| GPT-6.1 Terra, after the fix                             | $2.55 an hour                                           |
|                                                          |                                                         |
| Sunday morning. Finished in about 2 minutes.             |                                                         |
+----------------------------------------------------------+---------------------------------------------------------+
| SLICC shows an hourly rate, not a total. The real cost is on OpenAI's usage page: the looping run alone made 1,838 |
| OpenAI calls on my key.                                                                                            |
+--------------------------------------------------------------------------------------------------------------------+

I picked it up again that evening from my phone: "We need to select the newest models". The newest model was hiding at the bottom of the list. GPT-6.1 Terra was below o4-mini and GPT-5.6 Cyber. On Terra, SLICC finished the task with no loop, and the meter read $3.68 an hour, down from about $30. What I typed next: "grok bot does make it!"

SLICC's answer named my adaptTo() 2026 recap as the newest article, with its meta description, and reported that all 25 talk images link to full-size pictures on `content.da.live` that return "401 Unauthorized". Mochi checked the title and description against the page and said it sounds like me: first person, practical, a "my take" for each talk.

Both of them missed something. The newest article was the October 25 one. My homepage still labelled the October 10 recap "Latest", so SLICC reported that one and Mochi agreed. The worker and its checker can both trust the page's own label. The 25 image links were a real find, though: a reader who clicked a talk image would have hit a login.

That same evening, Mochi's first try went to the wrong window and landed on SLICC's marketing site, which, as Mochi reported it, "had hidden instructions aimed at AI agents". Mochi didn't follow them, and nothing was sent to SLICC until it had the right window.

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-7 |
+---------+--------+

---

## 8. The agent debugs its worker

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Explainer (request tally)                                                                                                                                                                               |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| *Which run*                                                                                                                                                                                             |
+------------------------------+--------------------------------------------------------------------------------------------------------------+-----------------------------+-----------------------------+
| **Saturday, before the fix** | One step, about three requests at once                                                                       | **701 of 951** requests     | OpenAI's answer to the side |
|                              |                                                                                                              | failed across both Saturday | calls: "Unsupported         |
|                              | - **Main call** `gpt-6.1-terra`, reasoning effort "none", 17 tools, no temperature. *200 after 1.5 to 2.3 s* | runs                        | parameter: 'temperature' is |
|                              | - **Side call** `gpt-5-nano`, `temperature: 0.3`, a 40-token limit. *400 after about 130 ms*                 |                             | not supported with this     |
|                              | - **Side call** `gpt-5-nano`, `temperature: 0.3`, a 40-token limit. *400 after about 130 ms*                 |                             | model." 130 ms is too fast  |
|                              |                                                                                                              |                             | for a model to do anything, |
|                              |                                                                                                              |                             | so OpenAI was rejecting     |
|                              |                                                                                                              |                             | them on validation.         |
+------------------------------+--------------------------------------------------------------------------------------------------------------+-----------------------------+-----------------------------+
| Sunday, after the fix        | One step, the same three requests                                                                            | **45 of 45** requests came  | About 2 minutes, no loop,   |
|                              |                                                                                                              | back 200 on Sunday's run    | $2.55 an hour. Sunday's log |
|                              | - **Main call** `gpt-6.1-terra`. *200*                                                                       |                             | has no timings, so these    |
|                              | - **Side call** `gpt-5-nano`, no temperature. *200*                                                          |                             | rows have a mark and no     |
|                              | - **Side call** `gpt-5-nano`, no temperature. *200*                                                          |                             | bar.                        |
+------------------------------+--------------------------------------------------------------------------------------------------------------+-----------------------------+-----------------------------+
| Counts are Mochi's, from SLICC's logs and developer tools. One dot is one request: Saturday's 951 cover two runs, Sunday's 45 cover one.                                                                |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Even on Grok Bot, two of every three requests were failing. The tasks still finished.

Mochi read SLICC's logs first. On almost every step SLICC sent about three requests at once. One got a 200 after 1.5 to 2.3 seconds, and the other two got a 400 after about 130 milliseconds. The log doesn't keep the error text, so Mochi offered to open developer tools on SLICC's window and send it one word, "hi".

That found it. The main model calls were fine. The ones failing were small side calls to `gpt-5-nano` with `temperature: 0.3`. Claude Code checked SLICC's source and it matched: SLICC's quick helper calls, the ones that write labels and session titles, pick the cheapest model in the same family and always send a temperature. SLICC already had code that strips `temperature` for models that reject it, but the helper path didn't use it. With a plain OpenAI key, every step made two calls that were bound to fail.

+----------------------------------------------------------------------------------------------------------------------------------------+
| Explainer (trail)                                                                                                                      |
+--------------+-------------------------------------------------------------------------------------------------------------------------+
| Sat 4 PM     | The first run loops on GPT-6.1 Sol. Mochi's read of the log: 666 requests failed with error                             |
|              | 400\.                                                                                                                   |
+--------------+-------------------------------------------------------------------------------------------------------------------------+
| Sat 9 PM     | Mochi opens developer tools on SLICC and finds `temperature: 0.3` on the `gpt-5-nano` calls.                            |
+--------------+-------------------------------------------------------------------------------------------------------------------------+
| Sat 9:40 PM  | [Issue #4239](https://github.com/ai-ecoverse/slicc/issues/4239) filed.                                                  |
+--------------+-------------------------------------------------------------------------------------------------------------------------+
| Sat 9:42 PM  | [PR #4240](https://github.com/ai-ecoverse/slicc/pull/4240) opened, with tests. SLICC's full suite passed: 27,613 tests. |
+--------------+-------------------------------------------------------------------------------------------------------------------------+
| Sun 9:43 AM  | Lars Trieloff merges it, mid-afternoon in Potsdam, with no review comments.                                             |
+--------------+-------------------------------------------------------------------------------------------------------------------------+
| Sun morning  | It ships in SLICC 6.258.4, then 6.258.5.                                                                                |
+--------------+-------------------------------------------------------------------------------------------------------------------------+
| Sun 11:15 AM | Retest on Grok Bot: 45 of 45 requests succeed.                                                                          |
+--------------+-------------------------------------------------------------------------------------------------------------------------+

Claude Code wrote the fix in my fork: the helper calls now drop `temperature` for models that reject it, and that list now includes `gpt-5`, `gpt-5-mini` and `gpt-5-nano`. I sent the issue and the PR on Saturday night, and Lars Trieloff merged it on Sunday morning. Thank you, Lars. It's my second merged PR in SLICC, and SLICC's source still documents the bug with "(seen 2026-11-07)".

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (shot)                                                                                                                                                        |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![The GitHub page of pull request 4240 in ai-ecoverse/slicc, fix(webapp): strip temperature from quick-llm calls that reject it, marked Merged by trieloff][image21] |
|                                                                                                                                                                      |
| The merged PR on GitHub, captured November 15.                                                                                                                       |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+

The fix changed nothing on Muse and my dot. They hit a different wall, the plain-tab 404, and Sunday's retest ended the same way on both.

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (native)                                                                                                                                                                   |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![A chat reply from Muse: Still failing, the fix didn't change this one, with the same Fetch proxy not available in worker mode error and a cost meter at $0.00 an hour][image22] |
|                                                                                                                                                                                   |
| Muse on Sunday, after the fix.                                                                                                                                                    |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-8 |
+---------+--------+

---

## 9. SLICC grows skills

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (native)                                                                                                                                                                            |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![SLICC's own report: 30 skills before installation, 27 Adobe Edge Delivery Services skills installed with one upskill command, a weekly-news skill created, and 58 skills after][image23] |
|                                                                                                                                                                                            |
| SLICC's report of what it installed, on Mochi's screen, Sunday at 11:36 AM.                                                                                                                |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

With SLICC working, I wanted to see it do more than one test. Mochi gave it two jobs: add skills, and find the past week's AEM Edge Delivery Services news.

+--------------------------------------+
| Stat Chips                           |
+--------------------------------------+
| - **30** skills built in             |
| - **27** installed from adobe/skills |
| - **1** written by SLICC             |
| - **58** skills after                |
+--------------------------------------+

One `upskill` command installed all 27 skills in Adobe's public [adobe/skills](https://github.com/adobe/skills) repo under `plugins/aem/edge-delivery-services`. SLICC also wrote a skill of its own, `aem-eds-weekly-news`, for the weekly roundup. No approval prompts came up.

For the news, SLICC split the work into four parallel scoops, one per source, and together they hit my key's limit of 1 million tokens a minute. Told to run one source at a time, it started four scoops again anyway. That second run finished.

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (shot)                                                                                                                                                                                                |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![SLICC's finished news list in its chat window, with four scoop tabs along the top and GPT-6.1 Terra selected: dated Experience League items and Document Authoring releases from November 3 to 6][image24] |
|                                                                                                                                                                                                              |
| The second run's list, with the four scoops as tabs along the top.                                                                                                                                           |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+---------------------------------------------------------------------------------------------------------+
| Data Table (sr caption, row heads, stack)                                                               |
+-------------------------+---------------------------------------+---------------------------------------+
| Source                  | What SLICC listed, November 1 to 8    | What Mochi's check found              |
+-------------------------+---------------------------------------+---------------------------------------+
| Experience League       | Six items from November 3 to 5        | Four of the six are troubleshooting   |
|                         |                                       | articles, not news, and two of them   |
|                         |                                       | returned 404                          |
+-------------------------+---------------------------------------+---------------------------------------+
| Adobe's GitHub          | Nine Document Authoring releases, and | Missed `adobe/skills` v3.3.0 on       |
|                         | AEM Edge Functions CLI v1.2.0         | November 5, the same repo it had just |
|                         |                                       | installed from                        |
+-------------------------+---------------------------------------+---------------------------------------+
| aem.live                | Nothing that qualified                | Missed the Experience Workspace doc   |
|                         |                                       | updates                               |
+-------------------------+---------------------------------------+---------------------------------------+
| Universal Editor        | Not in the list                       | Missed the November 5 release, the    |
|                         |                                       | first thing Mochi would put in front  |
|                         |                                       | of me                                 |
+-------------------------+---------------------------------------+---------------------------------------+
| `adobe-rnd/aem-apps`    | Never checked                         | A new Find/Replace app and an MSM     |
|                         |                                       | refactor                              |
+-------------------------+---------------------------------------+---------------------------------------+
| SLICC's weekly AEM news list against Mochi's own search of the same sources                             |
+---------------------------------------------------------------------------------------------------------+

Mochi's verdict: "Nothing in it is older than a week, the dates I could check are right ... But it missed the biggest items of the week and padded the list with support articles." Then it ranked what matters to me as an AEM Champion, with Universal Editor's Content Fragment features first.

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-9 |
+---------+--------+

---

## 10. Scorecard and what I learned

+----------------------------------------------------------------------------------------------------+
| Data Table (sr caption, row heads, stack)                                                          |
+-----------+-------------------+-------------------+----------------+-----------+-------------------+
| Agent     | A computer you    | Where the key     | SLICC          | Rung      | When SLICC failed |
|           | can see           | goes              |                |           |                   |
+-----------+-------------------+-------------------+----------------+-----------+-------------------+
| Grok Bot  | Yes, the terminal | You take over its | Local server,  | 4 of 4    | Debugged it, and  |
|           | and the screen    | screen            | works          |           | asked before      |
|           | are the same      |                   |                |           | killing it        |
|           | machine           |                   |                |           |                   |
+-----------+-------------------+-------------------+----------------+-----------+-------------------+
| Muse      | Browser only. Its | You take over its | Plain tab, 404 | 3         | Reported it and   |
|           | terminal can't    | screen            |                |           | stopped           |
|           | start Chrome      |                   |                |           |                   |
+-----------+-------------------+-------------------+----------------+-----------+-------------------+
| dots      | Browser only. Its | You take over its | Plain tab, 404 | 3         | Did the task      |
|           | terminal is       | screen            |                |           | itself and caught |
|           | sandboxed         |                   |                |           | the stale         |
|           |                   |                   |                |           | "Latest" label    |
+-----------+-------------------+-------------------+----------------+-----------+-------------------+
| Duet      | No                | Nowhere           | Never started  | 2         | Would not touch   |
|           |                   |                   |                |           | the key           |
+-----------+-------------------+-------------------+----------------+-----------+-------------------+
| Where each agent stood after the weekend of November 7 and 8, 2026                                 |
+----------------------------------------------------------------------------------------------------+

One of four made it. The pattern works where there is a computer you can see and a safe way to hand over a key. Six things I took from the weekend:

1. Personal agents are meant to give up easily. Pairing them with Claude Code kept the problem solving going after an agent stopped.
2. The checker that knows you caught what the worker missed, three times. The table below has all three.
3. What's missing is plumbing: a computer you can see, a terminal that can start a browser, and a safe place to type a secret.
4. The safety lines held everywhere. They also keep agents from working with each other.
5. Model choice mattered more than anything else. The newest model was at the bottom of the list, and it cut the meter from about $30 to $3.68 an hour and ended the loop.
6. An open-source worker got fixed overnight, by the people using it.

+--------------------------------------------------------------------------------------------------------------+
| Data Table (sr caption, row heads, stack)                                                                    |
+--------------------------------+---------------------------------------+-------------------------------------+
| What was missed                | Who missed it                         | Who caught it                       |
+--------------------------------+---------------------------------------+-------------------------------------+
| The stale "Latest" label on my | SLICC and Mochi, on both days         | My dot, doing the task itself       |
| homepage                       |                                       |                                     |
+--------------------------------+---------------------------------------+-------------------------------------+
| 25 image links that return 401 | SLICC on Sunday. It had found them on | Mochi, opening all 111 links itself |
|                                | Saturday                              |                                     |
+--------------------------------+---------------------------------------+-------------------------------------+
| The week's biggest AEM news    | SLICC's own news skill                | Mochi, against its own search       |
+--------------------------------+---------------------------------------+-------------------------------------+
| Three things the worker missed, and who caught each one                                                      |
+--------------------------------------------------------------------------------------------------------------+

The original idea is the part that didn't happen. The ChatGPT sign-in never finished on any of the four, so every working run was on an API key, which bills per token. SLICC's own monitor put Sunday's whole session, the retest, the skills and the news, at $0.80 and 7.1 million tokens.

Credit to Lars and the Adobe team for building this agent native to the browser. I'm happy to see it working inside my personal agent.

Next on my list: SLICC 7's key vault on my dot, the ChatGPT sign-in on Grok Bot, which never got past the login page, and a Duet rematch when it can take a key. If you've gotten further with a worker inside any of these four, I'd like to compare notes.

+-------------------+
| Section Metadata  |
+---------+---------+
| id      | part-10 |
+---------+---------+

---

## References

- [ai-ecoverse/slicc](https://github.com/ai-ecoverse/slicc): the SLICC repo, with its README, `docs/architecture.md` and its own architecture diagram.
- [sliccy.com](https://www.sliccy.com): SLICC's home page.
- [I built SLICC, an agent that runs in your browser](https://tessl.io/blog/three-kinds-of-ai-agent-only-one-of-them-lives-in-your-browser/), Lars Trieloff, on the Tessl blog, May 2026.
- [Issue #4239](https://github.com/ai-ecoverse/slicc/issues/4239) and [PR #4240](https://github.com/ai-ecoverse/slicc/pull/4240): the temperature bug and its fix. My earlier PR, [#3985](https://github.com/ai-ecoverse/slicc/pull/3985), keeps the ChatGPT subscription model list current.
- [pi.dev](https://pi.dev/) and the [Pi docs](https://docs.pi.dev/latest): the harness SLICC is built on. [Flavio Copes on Pi](https://flaviocopes.com/pi/) has its history.
- [adobe/skills](https://github.com/adobe/skills): Adobe's public skills repo. SLICC installed the 27 under `plugins/aem/edge-delivery-services`.
- Docs for three of the four agents: [Grok Bot's computer and apps](https://docs.x.ai/grok-bot/computer-and-apps), [Claude Duet](https://claude.com/product/claude-duet), and [dots, computers and apps](https://learn.chatgpt.com/codex/dots/computers-and-apps). Plans and features on all four are moving fast, so check them before you rely on anything here.

+----------------------+
| Section Metadata     |
+---------+------------+
| id      | references |
+---------+------------+

---

## Related

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Row List                                                                                                                                                              |
+---------+-----------------------------------------------------------------------------------------------------------------------+-------------------------------------+
| Writing | [Migrating My Site to AEM Edge Delivery Services in Two Prompts](/writing/2026-10-25-eds-migration-two-goal-prompts/) | The article SLICC should have found |
|         |                                                                                                                       | as my newest.                       |
+---------+-----------------------------------------------------------------------------------------------------------------------+-------------------------------------+
| Writing | [Adobe's EDS Skills, Hands-On](/writing/2026-05-17-adobe-eds-skills-hands-on/)                                        | The skills SLICC installed, when I  |
|         |                                                                                                                       | first tried them.                   |
+---------+-----------------------------------------------------------------------------------------------------------------------+-------------------------------------+
| Writing | [From Prompts to Harness](/writing/2026-01-05-from-prompts-to-harness/)                                               | What I mean by a harness.           |
+---------+-----------------------------------------------------------------------------------------------------------------------+-------------------------------------+

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

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Metadata                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| title                  | Running Adobe SLICC Inside Four Personal Agents \| Jack Jin                                                                                                                                                                                                                                                                                                                                                                               |
+------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| description            | Adobe SLICC is an open-source browser agent. I tried running it inside Muse, Grok Bot, Claude Duet and ChatGPT dots. Here is how far each got.                                                                                                                                                                                                                                                                                            |
+------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| template               | article                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image                  | ![A diagram in three tiers. Claude Code and I are the personal agent users. The agents are Muse, Grok Bot, ChatGPT dots and Claude Duet. Adobe SLICC is inside each: it works on Grok Bot, 4 of 4, and gets a 404 on Muse and dots. Claude Code is not allowed to drive Claude Duet, so I pasted its prompts by hand][image25]                                                                                                            |
+------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image:alt              | A diagram in three tiers. Claude Code and I are the personal agent users. The agents are Muse, Grok Bot, ChatGPT dots and Claude Duet. Adobe SLICC is inside each: it works on Grok Bot, 4 of 4, and gets a 404 on Muse and dots. Claude Code is not allowed to drive Claude Duet, so I pasted its prompts by hand                                                                                                                        |
+------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| published-time         | 2026-11-20                                                                                                                                                                                                                                                                                                                                                                                                                                |
+------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| json-ld                | {"@context":"https\://schema.org","@graph":\[{"@type":"Person","@id":"https\://www\.jackzhaojin.com/#person","name":"Jack Jin","url":"https\://www\.jackzhaojin.com/","jobTitle":"Associate Director","worksFor":{"@type":"Organization","name":"Accenture","department":{"@type":"Organization","name":"Adobe Business                                                                                                                   |
|                        | Group"}},"sameAs":\["https\://www\.linkedin.com/in/jackjin","https\://github.com/jackzhaojin","https\://www\.youtube.com/channel/UC0oOZvUGcmBrJvcIhUIwatA","https\://www\.credly.com/users/jack-jin"],"award":\["Adobe Experience Manager Champion, class of 2026-2027","AEM Rockstar winner, Adobe Summit 2024"]},{"@type":"WebSite","@id":"https\://www\.jackzhaojin.com/#website","url":"https\://www\.jackzhaojin.com/","name":"Jack  |
|                        | Jin","publisher":{"@id":"https\://www\.jackzhaojin.com/#person"}},{"@type":"TechArticle","@id":"https\://www\.jackzhaojin.com/writing/2026-11-20-slicc-personal-agents/#article","headline":"Running Adobe SLICC Inside Four Personal Agents","description":"Adobe SLICC is an open-source browser agent. I tried running it inside Muse, Grok Bot, Claude Duet and ChatGPT dots. Here is how far each                                    |
|                        | got.","author":{"@id":"https\://www\.jackzhaojin.com/#person"},"publisher":{"@id":"https\://www\.jackzhaojin.com/#person"},"image":"https\://www\.jackzhaojin.com/writing/2026-11-20-slicc-personal-agents/media_13d2f96ae3e0ca72e165ae2535b46353f4d9004e1.png","mainEntityOfPage":"https\://www\.jackzhaojin.com/writing/2026-11-20-slicc-personal-agents/","isPartOf":{"@id":"https\://www\.jackzhaojin.com/#website"},"about":\["Adobe |
|                        | SLICC","Adobe","Adobe Experience Manager","AI agents","Personal agents","Browser automation","Pi agent harness","Grok Bot","Claude Duet","ChatGPT dots","Meta                                                                                                                                                                                                                                                                             |
|                        | Muse"],"datePublished":"2026-11-20","inLanguage":"en"},{"@type":"BreadcrumbList","@id":"https\://www\.jackzhaojin.com/writing/2026-11-20-slicc-personal-agents/#breadcrumb","itemListElement":\[{"@type":"ListItem","position":1,"name":"Home","item":"https\://www\.jackzhaojin.com/"},{"@type":"ListItem","position":2,"name":"Technical                                                                                                |
|                        | Writing","item":"https\://www\.jackzhaojin.com/writing/"},{"@type":"ListItem","position":3,"name":"Adobe SLICC inside four personal agents","item":"https\://www\.jackzhaojin.com/writing/2026-11-20-slicc-personal-agents/"}]}]}                                                                                                                                                                                                         |
+------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| og:image:alt           | A diagram in three tiers. Claude Code and I are the personal agent users. The agents are Muse, Grok Bot, ChatGPT dots and Claude Duet. Adobe SLICC is inside each: it works on Grok Bot, 4 of 4, and gets a 404 on Muse and dots. Claude Code is not allowed to drive Claude Duet, so I pasted its prompts by hand                                                                                                                        |
+------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:published_time | 2026-11-20                                                                                                                                                                                                                                                                                                                                                                                                                                |
+------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:author         | https\://www\.jackzhaojin.com/                                                                                                                                                                                                                                                                                                                                                                                                            |
+------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| og:title               | Running Adobe SLICC Inside Four Personal Agents \| Jack Jin                                                                                                                                                                                                                                                                                                                                                                               |
+------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| twitter:title          | Running Adobe SLICC Inside Four Personal Agents \| Jack Jin                                                                                                                                                                                                                                                                                                                                                                               |
+------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-summary        | Adobe SLICC is an open-source browser agent. I tried running it inside Muse, Grok Bot, Claude Duet and ChatGPT dots. Here is how far each got.                                                                                                                                                                                                                                                                                            |
+------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-image          | https\://www\.jackzhaojin.com/writing/media_13d2f96ae3e0ca72e165ae2535b46353f4d9004e1.png?width=750\&format=jpg\&optimize=medium                                                                                                                                                                                                                                                                                                          |
+------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-topics         | Adobe AEM & EDS\|AI Engineering                                                                                                                                                                                                                                                                                                                                                                                                           |
+------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-reading-time   | 15 min read                                                                                                                                                                                                                                                                                                                                                                                                                               |
+------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-keywords       | adobe slicc sliccy adobe aem champion browser agent pi harness personal agents muse grok bot claude duet chatgpt dots claude code openai api key fetch proxy temperature gpt-5-nano skills upskill adobe skills ai ecoverse lars trieloff                                                                                                                                                                                                 |
+------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_1113b83e941503cd92d1c405fa501dd2b38d0f510.jpg#width=288\&height=184

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_1b3eb4ea3629af059b399a369038e5e64c24f63db.jpg#width=288\&height=184

[image2]: https://main--www-eds--jackzhaojin.aem.page/media_1e90f41a1832334f53debbfb93c567c3c51cf0790.jpg#width=288\&height=184

[image3]: https://main--www-eds--jackzhaojin.aem.page/media_1f244b1cefe56163f5ea461286a9b62b638c00e77.jpg#width=288\&height=184

[image4]: https://main--www-eds--jackzhaojin.aem.page/media_103fd49819e28f332c383cd2f99c40e65b4ba4336.jpg#width=288\&height=184

[image5]: https://main--www-eds--jackzhaojin.aem.page/media_19287c82cbb06391d051b1d2b8fde19090eaed464.jpg#width=288\&height=184

[image6]: https://main--www-eds--jackzhaojin.aem.page/media_1f1abe9376ec3312b11f00b080900e1a03e6161c3.jpg#width=288\&height=184

[image7]: https://main--www-eds--jackzhaojin.aem.page/media_10aa5065591b1cf50c42d3fc6df8e970a8db4494f.jpg#width=288\&height=184

[image8]: https://main--www-eds--jackzhaojin.aem.page/media_1f5d322a603a542e10be1b0901ea30371b824a612.jpg#width=288\&height=184

[image9]: https://main--www-eds--jackzhaojin.aem.page/media_1939ee50c8505e7bb6e8067aa8a4965e1e5cfa46d.jpg#width=288\&height=184

[image10]: https://main--www-eds--jackzhaojin.aem.page/media_10e3dc0d1382fad72dd9d2052b44e76cf406bac1c.png#width=1050\&height=790

[image11]: https://main--www-eds--jackzhaojin.aem.page/media_1f58b91d8d456078f2daa97462f61122c2d1ae687.png#width=2400\&height=940

[image12]: https://main--www-eds--jackzhaojin.aem.page/media_1c5737267952e9f3eb8ff858f31c3afdd9d0b7431.png#width=1153\&height=530

[image13]: https://main--www-eds--jackzhaojin.aem.page/media_12e38a7b828ff78bbc451a735fae7bb73383f099c.png#width=1456\&height=835

[image14]: https://main--www-eds--jackzhaojin.aem.page/media_133b73d0725eedc2f390c4ad6a70051b5feb38aa9.png#width=817\&height=538

[image15]: https://main--www-eds--jackzhaojin.aem.page/media_15b1f8a4dc16c1c9b3ee88af59d355c01ddf47d38.png#width=623\&height=382

[image16]: https://main--www-eds--jackzhaojin.aem.page/media_16e44566c2283443d7f600f6931632ce95e04f7ce.png#width=678\&height=608

[image17]: https://main--www-eds--jackzhaojin.aem.page/media_10f5b2dd398f9e121e85b6be647b50246921a753a.png#width=770\&height=482

[image18]: https://main--www-eds--jackzhaojin.aem.page/media_1eed7609f48004b8fcb59902da646eb8de45852ea.png#width=853\&height=460

[image19]: https://main--www-eds--jackzhaojin.aem.page/media_133db3201eae51289b36498400763991a400b2557.png#width=1100\&height=644

[image20]: https://main--www-eds--jackzhaojin.aem.page/media_18860617140756bf79f93298e0faf7d23b70238a2.png#width=322\&height=440

[image21]: https://main--www-eds--jackzhaojin.aem.page/media_1e9c8bf53f60f1dc22788dbe7318aa1b814ae4d62.png#width=1500\&height=901

[image22]: https://main--www-eds--jackzhaojin.aem.page/media_1d778262056cc3006488dadec65e2365107de8362.png#width=502\&height=322

[image23]: https://main--www-eds--jackzhaojin.aem.page/media_13d7b7c0166d273afa241154b7c342882a86c0401.png#width=465\&height=472

[image24]: https://main--www-eds--jackzhaojin.aem.page/media_17aa268f6e3b7e4aaf6719f724852b1f6cc58d670.png#width=942\&height=588

[image25]: https://main--www-eds--jackzhaojin.aem.page/media_13d2f96ae3e0ca72e165ae2535b46353f4d9004e1.png#width=2400\&height=1254
