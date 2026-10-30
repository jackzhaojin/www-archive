1. [Home](/)
2. [Technical Writing](/writing/)
3. Company of Zero

# Company of Zero: How AnimaMesh Runs a Company's Back Office on Cloudflare Workers

By [Jack Jin](/) · August 15, 2026 · Updated October 4, 2026 · 14 min read · Includes my 11:09 video

AnimaMesh is an open source engine where AI agents do a company's back office on Cloudflare Workers and the human only approves. One public engine holds all the code, and each company gets a private brain of markdown with zero lines of code. Part by part, with the code behind each: decoupled beats where one agent can fail without stopping the rest, read-only reach into SharePoint, a brain that files its own GitHub issues past a leak guard, and AI that reaches out to the owner instead of waiting for a prompt. It started as my AI Tinkerers Columbus talk on August 3, 2026.

---

+-----------------------------------------------------------------------------------+
| Rail                                                                              |
+-------------------------------------+---------------------------------------------+
|                                     | **0:00**\                                   |
|                                     | [One founder, many companies](#dream)       |
+-------------------------------------+---------------------------------------------+
| ![][image0]                         | **1:00**\                                   |
|                                     | [Public engine, private brains](#engine)    |
+-------------------------------------+---------------------------------------------+
| ![][image1]                         | **3:20**\                                   |
|                                     | [A brain with zero code](#brain)            |
+-------------------------------------+---------------------------------------------+
| ![][image2]                         | **4:38**\                                   |
|                                     | [Agents take sick days](#beat)              |
+-------------------------------------+---------------------------------------------+
| ![][image3]                         | **5:57**\                                   |
|                                     | [Reaching files where they live](#reach)    |
+-------------------------------------+---------------------------------------------+
|                                     | **7:02**\                                   |
|                                     | [All code in the open engine](#open-source) |
+-------------------------------------+---------------------------------------------+
| ![][image4]                         | **7:47**\                                   |
|                                     | [The brain files its own issues](#issues)   |
+-------------------------------------+---------------------------------------------+
|                                     | **9:13**\                                   |
|                                     | [Demo: reading my non-compete](#demo)       |
+-------------------------------------+---------------------------------------------+
| ![][image5]                         | **10:06**\                                  |
|                                     | [AI reaches out to you](#unlock)            |
+-------------------------------------+---------------------------------------------+
|                                     | **Wrap-up**\                                |
|                                     | [What works, where it stops](#result)       |
+-------------------------------------+---------------------------------------------+
| [Watch the video, 11:09](#video)                                                  |
|                                                                                   |
| [Code on GitHub](https://github.com/jackzhaojin/anima-mesh/tree/0874733)          |
+-----------------------------------------------------------------------------------+

---

I follow the order of the talk. Every part links to its moment in the recorded version if you'd rather watch.

---

+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure                                                                                                                                                           |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [I Built an AI Engine That Runs a Company of Zero on Cloudflare Workers](https://youtu.be/zYytfy1PAkc)                                                           |
|                                                                                                                                                                  |
| Recorded August 15, 2026, as a studio version of the August 3 talk. Each part below links to its moment, or [watch it on YouTube](https://youtu.be/zYytfy1PAkc). |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Fine Print                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Code: [anima-mesh](https://github.com/jackzhaojin/anima-mesh/tree/0874733) at `0874733` (v0.17.0, the engine as it stood for the recording), Apache-2.0. The engine has since moved to v0.17.2. I gave the talk with a deck at [AI Tinkerers Columbus on August 3, 2026](/portfolio/anima-mesh/#ai-tinkerers-2026-animamesh), and it took second place in AI Tinkerers' global [Top AI Demos #40](https://post-training.aitinkerers.org/p/top-ai-demos-40-zero-cost-companies-declarative-agents-and-llm-world-sims). I shared the conference pre-read deck on LinkedIn on August 3, 2026, and a 35-second clip on August 25. Both are folded into this page, rewritten for this site in October 2026. |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| id      | video  |
+---------+--------+

---

## Letting one founder run more than one company

The dream of this project is to let founders start more than one company. As people, we're still liable for the LLC, the C Corp or the S Corp. But so much of what keeps a company running is preparable work: the compliance calendar, bookkeeping prep, keeping documents in order, governance, research. How much of that can run agentically, with the human as the approval gate?

One founder running seven companies is a thought experiment for now. The project started from two simple requirements:

1. All of the company's knowledge lives in markdown files. The format I picked is Google's Open Knowledge Format (OKF): one concept per file, YAML frontmatter on top, and links between files that turn them into a graph an agent can read.
2. AI reaches out to the owners, instead of the owners reaching out to AI.

With those two, I set out to build what I presented at AI Tinkerers.

Watch this part [0:00 The company of zero dream](https://youtu.be/zYytfy1PAkc)

+------------------+
| Section Metadata |
+---------+--------+
| id      | dream  |
+---------+--------+

---

## One public engine, many private brains

The first idea is the split. The engine is where all the code is. It's a public GitHub repository that anyone can use, and it never names a company, a person or a persona. The brain is the real knowledge: one company, in a private repository, with zero lines of code. Just markdown and a little JSON for configuration.

The dependency only goes one way. The brain picks an engine version by git tag, so if your brain isn't ready to upgrade to the latest AnimaMesh, it doesn't have to. The engine never knows the brain exists. That's how one engine can power many companies. The whole coupling is a few lines in the brain's config:

+----------------------------------------------------------------------------------------------------------------------------+
| Code                                                                                                                       |
+----------------------------------------------------------------------------------------------------------------------------+
| docs/sample-brain/animamesh.config.json, lines 7 to 11                                                                     |
|                                                                                                                            |
| [0874733 on GitHub](https://github.com/jackzhaojin/anima-mesh/blob/0874733/docs/sample-brain/animamesh.config.json#L7-L11) |
+----------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                        |
|   "engine": {                                                                                                              |
|     "repo": "github.com/jackzhaojin/anima-mesh",                                                                           |
|     "ref": "v0.12.0",                                                                                                      |
|     "localPath": "../.."                                                                                                   |
|   },                                                                                                                       |
| ```                                                                                                                        |
+----------------------------------------------------------------------------------------------------------------------------+

The brain also decides its own staff. Because the agents are data and not code, the brain configures its own capabilities. The sample brain in the repo, a made-up company, has five agents on its roster, and each one does something different. Each brain defines how many agents it wants.

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board, open)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [![Diagram of the two repos. Left, the public engine: src with the harness, providers, sources, gates, ledger and channels; workers for the cloud tier; templates and docs; and the one hard rule that no private identity ever appears in engine code. Right, the private brain: animamesh.config.json pins the engine by tag, bundle holds one concept per file, the ledger, approvals, reports and drafts hold the evidence, and credentials stay outside git. An arrow shows the brain depends on the engine, and a dashed arrow shows capabilities promoted back to the engine de-identified.][image6]](https://content.da.live/jackzhaojin/www-eds/media/writing/2026-08-15-anima-mesh-company-of-zero/engine-and-instance.svg) |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| The engine and the instance, the first diagram of the talk. Everything after it sits on one side or the other.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Watch this part [1:00 One engine, many brains](https://youtu.be/zYytfy1PAkc?t=60)

+------------------+
| Section Metadata |
+---------+--------+
| id      | engine |
+---------+--------+

---

## A brain is markdown files with zero lines of code

A lot of this is based on the second brain idea, except it's for a company. You want the different kinds of memory in one place: facts, decisions, events, the constitution of hard limits. Everything that works in a second brain for a person goes here.

OKF gives it a structure. Every concept is its own markdown file with a required `type` in its frontmatter, and two files are reserved: `index.md` is the map and `log.md` is the story. I chose it because the same file is readable by a person, an agent and a validator. There's no database, no admin UI and nothing to export. One concept per file means every git diff is one meaningful change, and typed frontmatter means `pnpm cli validate` can check the whole brain. The deck adds where this came from: plain files under git, adopted after a SaaS vendor deleted years of data.

An agent is a file too. Here is the hub's wiring from the sample brain. The job itself is prose underneath.

+-------------------------------------------------------------------------------------------------------------------------------------+
| Code                                                                                                                                |
+-------------------------------------------------------------------------------------------------------------------------------------+
| docs/sample-brain/bundle/agents/chief-of-staff.md, lines 5 to 9                                                                     |
|                                                                                                                                     |
| [0874733 on GitHub](https://github.com/jackzhaojin/anima-mesh/blob/0874733/docs/sample-brain/bundle/agents/chief-of-staff.md#L5-L9) |
+-------------------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                                 |
| level: L3                                                                                                                           |
| model: "claude-sonnet-5"                                                                                                            |
| harness: anthropic-api                                                                                                              |
| heartbeat: daily                                                                                                                    |
| whitelist: [schedule-update, draft-write, defect-report]                                                                            |
| ```                                                                                                                                 |
+-------------------------------------------------------------------------------------------------------------------------------------+

`level` is the agent's rung on an autonomy ladder from L1 (report only) to L4 (external actions, each behind a human approval). `harness` picks the model provider, `heartbeat` sets its rhythm, and `whitelist` lists the writes it may propose. Adding an agent is copying a template. Retiring one is deleting the file. Promoting one is a one-line edit, and git history is the paper trail.

What's more unique is that agents run on Cloudflare and check out the brain to work on it. The brain's GitHub repo is every agent's source of truth. Every agent commits what it did, and at the end the chief of staff pulls everything together and sends one brief to the CEO of the company, who is a human. In the talk I said the whole thing is basically free, because it's fractional serverless compute that runs under the Workers limits. The reason it fits is that a model call is waiting on the network, not using the Worker's CPU.

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board, open)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [![Anatomy of a brain in three columns. The knowledge: constitution, facts, decisions, events, ops, the cabinet, the CRM, index and log. The roster: chief-of-staff as the daily hub, compliance-ops daily, librarian and research-watch weekly, bookkeeper monthly, governance quarterly, and three commercial agents that stay dormant. The evidence surfaces: the append-only ledger, approvals as the human gate, reports and drafts, plus the cloud deploy workspace and a note that no code lives in the brain.][image7]](https://content.da.live/jackzhaojin/www-eds/media/writing/2026-08-15-anima-mesh-company-of-zero/brain-anatomy.svg) |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| A brain as plain files. Left to right: what the mesh knows, the agents on the roster, and what their work leaves behind.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Watch this part [3:20 Inside a brain](https://youtu.be/zYytfy1PAkc?t=200)

+------------------+
| Section Metadata |
+---------+--------+
| id      | brain  |
+---------+--------+

---

## Decoupled beats let agents take sick days

The third idea is the sequence. Each agent runs when its beat comes up, and the chief of staff runs last to get everyone's results together. In the cloud, one Durable Object alarm fires at 08:00 in the company's own timezone and decides who is due:

- Each agent declares `daily`, `weekly`, `monthly` or `quarterly`, and the beat compares that with the agent's last `run-completed` line in the ledger. The thresholds sit under the calendar period (6 days for weekly, 27 for monthly, 85 for quarterly), so a beat that drifts by a few minutes never skips a run.
- Daily means "not yet today" on the local calendar, not 20 hours since the last run. A comment in the code says why: on the first scheduled morning, my 1 a.m. debug runs silenced the 8 a.m. brief.
- The due spokes run one at a time in alphabetical order, and the hub runs last so its brief reads the day's fresh reports.
- Everything lands in one commit. Only then does the brief go out.

It's this decoupled for two reasons: I want it to run for free on Cloudflare, and I want each brain to be able to customize itself. Each company should have its own staff. The deck adds why the spokes run one after another: the hub needs them finished, one vendor call at a time keeps rate-limit errors from piling up, and a failure points at exactly one agent.

Because it's my most decoupled agent architecture, two or three agents failing doesn't fail the whole thing. Say your company has 20 or 40 agents. If two or three fail, that's reported as a failure, but it doesn't crash the beat. People take sick days and the company keeps going. Their work isn't done that day, and that's maybe okay. The rule came from a real failure, and the comment is still in the code:

+---------------------------------------------------------------------------------------------------------------------+
| Code                                                                                                                |
+---------------------------------------------------------------------------------------------------------------------+
| src/harness/heartbeat-core.ts, lines 219 to 248, trimmed                                                            |
|                                                                                                                     |
| [0874733 on GitHub](https://github.com/jackzhaojin/anima-mesh/blob/0874733/src/harness/heartbeat-core.ts#L219-L248) |
+---------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                 |
|   // One spoke's failure never aborts the beat - an unattended mesh must                                            |
|   // degrade agent-by-agent, not collapse. (Lesson from the first launchd                                           |
|   // beat: an auth error in one provider killed the remaining runs.)                                                |
|   const hubName = config.delivery?.deliverAgent ?? "chief-of-staff";                                                |
|   const runs: RunReport[] = [];                                                                                     |
|   const failures: HeartbeatFailure[] = [];                                                                          |
|   for (const { agent } of due) {                                                                                    |
|     progress(`heartbeat: running ${agent.name}`);                                                                   |
|     try {                                                                                                           |
|       // lines 228 to 242: run the agent; the hub also gets the scheduler notes                                     |
|     } catch (err) {                                                                                                 |
|       const message = err instanceof Error ? err.message : String(err);                                             |
|       failures.push({ agent: agent.name, error: message });                                                         |
|       progress(`heartbeat: x ${agent.name} failed - ${message.slice(0, 200)} (continuing)                           |
|     }                                                                                                               |
|   }                                                                                                                 |
| ```                                                                                                                 |
+---------------------------------------------------------------------------------------------------------------------+

A failure still has to reach the human. If anything failed, the Worker sends a separate failure DM. No DM means the mesh is healthy, so silence must mean success.

Below is a simplified model of one morning's beat on the sample brain's five agents, with research-watch set to fail. Press **Run the 08:00 beat**: the other agents still finish, the brief still goes out, and a separate failure DM says which agent broke. Then press **Next day** and the failed agent is simply due again.

+--------------------------------------------------------------------------------------------------------------------------+
| Explainer (beat sim)                                                                                                     |
+--------------------------------------------------------------------------------------------------------------------------+
| beat simulator · the due decision and run order of heartbeat-core.ts                                                     |
|                                                                                                                          |
| [source](https://github.com/jackzhaojin/anima-mesh/blob/0874733/src/harness/heartbeat-core.ts#L98-L134)                  |
+-----------------------------+------------------------------+------------------------------+------------------------------+
| Agent                       | Rhythm                       | Runs on                      | Make it fail                 |
+-----------------------------+------------------------------+------------------------------+------------------------------+
| `chief-of-staff` *hub*      | daily                        | cloud                                                       |
+-----------------------------+------------------------------+-------------------------------------------------------------+
| `compliance-ops`            | daily                        | laptop only                                                 |
+-----------------------------+------------------------------+-------------------------------------------------------------+
| `librarian`                 | weekly                       | laptop only                                                 |
+-----------------------------+------------------------------+-------------------------------------------------------------+
| `research-watch`            | weekly                       | cloud                                                       |
+-----------------------------+------------------------------+-------------------------------------------------------------+
| `sales-qualification`       | daily                        | commercial, gated                                           |
+-----------------------------+------------------------------+-------------------------------------------------------------+
| controls                    | Run the 08:00 beat                                                                         |
|                             |                                                                                            |
|                             | Next day                                                                                   |
|                             |                                                                                            |
|                             | Reset                                                                                      |
+-----------------------------+--------------------------------------------------------------------------------------------+
| start                       | 2026-07-27T12:00:00.000Z                                                                   |
+-----------------------------+--------------------------------------------------------------------------------------------+
| time zone                   | America/New\_York                                                                          |
+-----------------------------+--------------------------------------------------------------------------------------------+
| ledger                      | - research-watch 2026-07-20T12:04:42.031Z                                                  |
|                             | - chief-of-staff 2026-07-21T12:05:18.007Z                                                  |
+-----------------------------+--------------------------------------------------------------------------------------------+
| fails first                 | research-watch                                                                             |
+-----------------------------+--------------------------------------------------------------------------------------------+
| toggle                      | fails today                                                                                |
+-----------------------------+--------------------------------------------------------------------------------------------+
| not run                     | not run by the cloud beat                                                                  |
+-----------------------------+--------------------------------------------------------------------------------------------+
| reason due                  | {cadence}: last ran {days} days ago, so it is due                                          |
+-----------------------------+--------------------------------------------------------------------------------------------+
| reason not due              | {cadence}: ran {days} days ago, not due yet                                                |
+-----------------------------+--------------------------------------------------------------------------------------------+
| reason laptop due           | due, but it only runs on my laptop, so the brief reminds me to run it                      |
+-----------------------------+--------------------------------------------------------------------------------------------+
| reason laptop               | only runs on my laptop, and not due today                                                  |
+-----------------------------+--------------------------------------------------------------------------------------------+
| reason commercial           | commercial agent, stays off until its activation gates open                                |
+-----------------------------+--------------------------------------------------------------------------------------------+
| reason never                | never run yet, so it is due                                                                |
+-----------------------------+--------------------------------------------------------------------------------------------+
| takeaway failed             | {failed} failed, and the beat kept going: {runs} agent{s} still ran, the brief went out,   |
|                             | and a separate failure DM names {failed}. It never logged a finished run, so it is due     |
|                             | again at the next beat.                                                                    |
+-----------------------------+--------------------------------------------------------------------------------------------+
| takeaway idle               | Nobody was due, so nothing ran and nothing was sent.                                       |
+-----------------------------+--------------------------------------------------------------------------------------------+
| takeaway ok                 | Every due agent ran and the brief went out. No failure DM was sent, so silence means       |
|                             | success.                                                                                   |
+-----------------------------+--------------------------------------------------------------------------------------------+
| takeaway blocked            | The brief also reminds me to run {names} on my laptop.                                     |
+-----------------------------+--------------------------------------------------------------------------------------------+
| hint                        | Tick or untick "fails today", then run the beat.                                           |
+-----------------------------+--------------------------------------------------------------------------------------------+
| due label                   | Due, in run order                                                                          |
+-----------------------------+--------------------------------------------------------------------------------------------+
| skipped label               | Skipped                                                                                    |
+-----------------------------+--------------------------------------------------------------------------------------------+
| nobody due                  | Nobody is due.                                                                             |
+-----------------------------+--------------------------------------------------------------------------------------------+
| failed                      | failed, the beat continues                                                                 |
+-----------------------------+--------------------------------------------------------------------------------------------+
| ran                         | report written                                                                             |
+-----------------------------+--------------------------------------------------------------------------------------------+
| hub note                    | its prompt includes a note to remind me about {names}                                      |
+-----------------------------+--------------------------------------------------------------------------------------------+
| term label                  | What the beat leaves behind                                                                |
+-----------------------------+--------------------------------------------------------------------------------------------+
| term commit                 | commit                                                                                     |
+-----------------------------+--------------------------------------------------------------------------------------------+
| term deliver                | deliver                                                                                    |
+-----------------------------+--------------------------------------------------------------------------------------------+
| term dm                     | failure DM                                                                                 |
+-----------------------------+--------------------------------------------------------------------------------------------+
| term no dm                  | none, so silence means success                                                             |
+-----------------------------+--------------------------------------------------------------------------------------------+
| when                        | {date}, 08:00 New York                                                                     |
+-----------------------------+--------------------------------------------------------------------------------------------+
| example                     | research-watch failed, and the beat kept going: 1 agent still ran, the brief went out, and |
|                             | a separate failure DM names research-watch. It never logged a finished run, so it is due   |
|                             | again at the next beat.                                                                    |
|                             |                                                                                            |
|                             | Example: the beat on Monday, July 27, 2026, with research-watch failing                    |
|                             |                                                                                            |
|                             | 1. **research-watch** weekly: last ran 7 days ago, so it is due\                           |
|                             |    failed, the beat continues                                                              |
|                             | 2. **chief-of-staff** daily: not yet run today\                                            |
|                             |    report written\                                                                         |
|                             |    its prompt includes a note to remind me about compliance-ops and librarian              |
|                             |                                                                                            |
|                             | Skipped                                                                                    |
|                             |                                                                                            |
|                             | - **compliance-ops** due, but it only runs on my laptop, so the brief reminds me to run it |
|                             | - **librarian** due, but it only runs on my laptop, so the brief reminds me to run it      |
|                             | - **sales-qualification** commercial agent, stays off until its activation gates open      |
|                             |                                                                                            |
|                             | *commit* beat(cloud): 2026-07-27 - 1 run(s), 1 failure(s)\                                 |
|                             | *deliver* brief DM: today's chief-of-staff report\                                         |
|                             | *failure DM* cloud beat 2026-07-27: 1/2 due agent(s) failed\                               |
|                             | research-watch: provider call failed (demo error)                                          |
|                             |                                                                                            |
|                             | With JavaScript on, you can run this beat and the days after it.                           |
+-----------------------------+--------------------------------------------------------------------------------------------+
| A simplified model. The five agents and the starting ledger come from the repo's sample brain. It runs the code's due    |
| rules, run order, commit message and failure DM on the cloud tier, with the code's reasons reworded for reading, and one |
| change: the agents keep their declared providers (the sample's own config reroutes them to an offline fake provider).    |
| Failures are simulated; nothing calls a model.                                                                           |
+--------------------------------------------------------------------------------------------------------------------------+

Watch the laptop-only agents. When one is due, the cloud tier doesn't just skip it: it rides into the hub's prompt as a note, so the brief nags me to run it locally. And a failed agent never writes its `run-completed` line, so it's simply due again at the next beat.

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board, open)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [![Sequence diagram of one beat, in fourteen steps across the Durable Object, the brain repo, read sources, model vendors and the principal: the alarm fires at 08:00 local, the beat takes a lock, reads the whole brain as one tarball, makes the due decision, loops over due spokes one at a time, runs the hub last, flushes one commit, delivers the brief as a bot DM, sends a failure DM only when something failed, and re-arms tomorrow's alarm.][image8]](https://content.da.live/jackzhaojin/www-eds/media/writing/2026-08-15-anima-mesh-company-of-zero/heartbeat-sequence.svg) |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| One beat, end to end. The simulator above covers steps 5 to 12.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Watch this part [4:38 Decoupled beats](https://youtu.be/zYytfy1PAkc?t=278)

+------------------+
| Section Metadata |
+---------+--------+
| id      | beat   |
+---------+--------+

---

## The brain reaches files where they already live

The fourth idea is reach. Just like people, I sometimes need to reach into a file cabinet, because I don't have perfect memory of, in theory, the ten companies I'm running. I need to dig out a piece of paper I read two years ago. AI is the same. Not everything has to be in OKF, but the agents need to reach into your SharePoint or your Google Drive.

Right now the project is Microsoft based. Documents stay in SharePoint and OneDrive and are read through Microsoft Graph: delegated, read-only, with the live folder listing in the agent's prompt. The brain records where the truth lives and what it means, and the original stays put: the EIN stays in the letter. The brain doesn't need all the knowledge, just like a human brain doesn't. It needs to know where to get the files. The demo is built for SharePoint, and I think it can be extended to Google Workspace.

The deck and repo go a little further than the talk did. The CRM was bootstrapped from the mailbox's sent items with a one-off consent and a token that's never saved, because your outbox is the ground truth of your real relationships. The cloud tier also reads sibling GitHub repos as sources. And there's one deliberate gap: no direct bank access. It's designed, not wired, and money stays behind the constitution's gates.

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board, open)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [![Resource reach diagram in three columns. Corporate resources: SharePoint and OneDrive read through Microsoft Graph, the company mailbox, GitHub repos, and a bank read that is not wired on purpose. The brain, one private repo: cabinet, facts and ops, the CRM and the agent roster. Actions, gated and ledgered: the daily brief, beat commits, public issues on the engine repo, and approvals as the human gate for money, filings, publishing, credentials and access.][image9]](https://content.da.live/jackzhaojin/www-eds/media/writing/2026-08-15-anima-mesh-company-of-zero/resource-reach.svg) |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Nothing migrates into the mesh. Reads are consented and read-only; every write is gated and ledgered.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Watch this part [5:57 Reach into SharePoint](https://youtu.be/zYytfy1PAkc?t=357)

+------------------+
| Section Metadata |
+---------+--------+
| id      | reach  |
+---------+--------+

---

## Every line of code in the open source engine

Number five is a big part of the goal. I want every single line of code in the open source code base, and each company, each brain, to have only its own markdown files. It's deliberate. The engine can be improved for everyone, and each brain is an instance of the engine.

That's a new way I'm thinking about my open source projects. If something is private and I don't want to share it, that's fine: separate the knowledge from the engine. The rule that makes it safe is strict. No private identity, real email, secret or persona name ever goes into engine code, templates, tests or docs, because one leaked name in a public repo is history you can't take back. When a brain proves a capability that's generally useful, it gets promoted into the engine with placeholders instead of names.

Watch this part [7:02 Open source engine, private knowledge](https://youtu.be/zYytfy1PAkc?t=422)

+-----------------------+
| Section Metadata      |
+---------+-------------+
| id      | open-source |
+---------+-------------+

---

## The brain files its own GitHub issues

This is the part I find the coolest. The brain is all markdown and zero lines of code, but the AI running it is fairly smart, and sometimes it realizes there's a bug in the engine. The brain can only change files in its own repo. It can't modify the engine. So the AI opens an issue on the engine, the same way people open issues on a project they don't control. No human does anything. When I recorded the video there were five issues on the engine, and all five had been opened by AI. Then I, as the maintainer of the engine, can see which brain hit what. My AI looks at the issue and makes a fix, the engine tags a release, and every brain gets the fix when it moves its pin.

Code decides what leaves a private brain for a public repo. The agent only writes the report, ending it with a fenced `defect-report` block, and four checks run on it:

1. The whitelist gate: only an L3 agent with `defect-report` on its whitelist may ask.
2. The identity-leak guard: any word of the principal's or persona's name, or any configured email, and the report is never filed. The guard denies; it never rewrites, because a guard that edits text is one you can't audit.
3. Title dedup against the engine's open defect issues, so a recurring bug is one issue.
4. A cap of two per run, and a ledger line either way. Anything that can't be filed becomes a private draft in the brain.

Issue #4 was an agent twice reporting a failure of a web tool that never existed: its job budgeted web searches while its harness sent no tools. That became the v0.12 release, where providers declare what they can actually do and the prompt says so out loud. Issues #5 and #6 were filed by a mesh's own hub and became v0.13, where an agent's required files are always put in its prompt or marked as missing.

Below, the engine's real checks run in your browser on a sample report. Each preset trips one of the four checks, and switching the agent to research-watch trips the first. The top line says what happened, and the lines under it are the ledger entries the engine would write. You can also edit the report text.

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Explainer (defect lab)                                                                                                                                                                     |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| defect gate lab · parse, gate, leak guard, dedup and cap from the engine                                                                                                                   |
|                                                                                                                                                                                            |
| [source](https://github.com/jackzhaojin/anima-mesh/blob/0874733/src/harness/defects.ts#L51-L184)                                                                                           |
+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| Clean report                                              | ````                                                                                                                           |
|                                                           | ```defect-report                                                                                                               |
|                                                           | title: External web-fetch tool returns no usable content across consecutive agent runs                                         |
|                                                           | ---                                                                                                                            |
|                                                           | Repro: an agent whose job budgets web searches runs on a harness that sends no tools.                                          |
|                                                           | Expected: the prompt says plainly that no web search is available.                                                             |
|                                                           | Actual: two runs in a row report a failed search tool that never existed.                                                      |
|                                                           | ```                                                                                                                            |
|                                                           | ````                                                                                                                           |
+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| Names a person                                            | ````                                                                                                                           |
|                                                           | ```defect-report                                                                                                               |
|                                                           | title: External web-fetch tool returns no usable content across consecutive agent runs                                         |
|                                                           | ---                                                                                                                            |
|                                                           | Repro: an agent whose job budgets web searches runs on a harness that sends no tools.                                          |
|                                                           | Expected: the prompt says plainly that no web search is available.                                                             |
|                                                           | Actual: Mira's brief to Casey went out with no research, and two runs in a row report a failed search tool that never existed. |
|                                                           | ```                                                                                                                            |
|                                                           | ````                                                                                                                           |
+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| Already an open issue                                     | ````                                                                                                                           |
|                                                           | ```defect-report                                                                                                               |
|                                                           | title: claude-code harness: opaque failure when local login expires; instance env not passed to CLI providers                  |
|                                                           | ---                                                                                                                            |
|                                                           | Repro: run a laptop-tier agent after the local CLI login has expired.                                                          |
|                                                           | Expected: a clear auth error. Actual: an opaque failure.                                                                       |
|                                                           | ```                                                                                                                            |
|                                                           | ````                                                                                                                           |
+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| Three in one run                                          | ````                                                                                                                           |
|                                                           | ```defect-report                                                                                                               |
|                                                           | title: Demo defect 1: schedule note repeated in the brief                                                                      |
|                                                           | ---                                                                                                                            |
|                                                           | Repro 1: the same scheduler note appears twice in one brief.                                                                   |
|                                                           | ```                                                                                                                            |
|                                                           |                                                                                                                                |
|                                                           | ```defect-report                                                                                                               |
|                                                           | title: Demo defect 2: schedule note repeated in the brief                                                                      |
|                                                           | ---                                                                                                                            |
|                                                           | Repro 2: the same scheduler note appears twice in one brief.                                                                   |
|                                                           | ```                                                                                                                            |
|                                                           |                                                                                                                                |
|                                                           | ```defect-report                                                                                                               |
|                                                           | title: Demo defect 3: schedule note repeated in the brief                                                                      |
|                                                           | ---                                                                                                                            |
|                                                           | Repro 3: the same scheduler note appears twice in one brief.                                                                   |
|                                                           | ```                                                                                                                            |
|                                                           | ````                                                                                                                           |
+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| reports label                                             | Pick a report                                                                                                                  |
+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| report                                                    | The end of the agent's report                                                                                                  |
+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| agent                                                     | Agent:                                                                                                                         |
|                                                           |                                                                                                                                |
|                                                           | - chief-of-staff (allowed to file)                                                                                             |
|                                                           | - research-watch (report only)                                                                                                 |
+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| agents label                                              | Which agent wrote it                                                                                                           |
+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| gates                                                     | - chief-of-staff: L3, schedule-update, draft-write, defect-report                                                              |
|                                                           | - research-watch: L1                                                                                                           |
+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| identity                                                  | Identity the guard checks (the sample brain's fictional people)                                                                |
|                                                           |                                                                                                                                |
|                                                           | Casey Lund · casey\@copperline.example\                                                                                        |
|                                                           | Mira Solen · mira.solen\@copperline.example                                                                                    |
+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| issues                                                    | Open defect issues on the engine, October 3, 2026                                                                              |
|                                                           |                                                                                                                                |
|                                                           | - \#7 claude-code harness: opaque failure when local login expires; instance env not passed to CLI providers                   |
+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| no report                                                 | No report block, so nothing leaves the private brain.                                                                          |
+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| not allowed                                               | Stopped at check 1: this agent is not allowed to file engine issues. Nothing leaves the brain.                                 |
+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| leak                                                      | Stopped at check 2: the report names one of the brain's people, so it is never filed. It becomes a private draft in the brain  |
|                                                           | instead.                                                                                                                       |
+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| duplicate                                                 | Stopped at check 3: the same bug is already an open issue, so no second issue is filed.                                        |
+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| capped                                                    | Check 4: {filed} filed, and the rest refused by the cap of two per run.                                                        |
+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| refused                                                   | Refused before filing. Nothing leaves the brain.                                                                               |
+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| passes                                                    | Passes all four checks: this would become a public issue on the engine.                                                        |
+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| count                                                     | {n} defect-report block{s} parsed                                                                                              |
+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| no block                                                  | No defect-report block found. Nothing leaves the run.                                                                          |
+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| would file                                                | Would file a new public issue on the engine, labeled defect. No draft kept.                                                    |
+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| already open                                              | Already open upstream as issue #{number}. No second issue.                                                                     |
+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| The parse rule, the leak guard, the dedup, the cap and the gate messages are the engine's, run in your browser; it assumes the brain holds its filing token. Issue #4 is closed now, so    |
| its title passes dedup, which only looks at open issues. Nothing is sent to GitHub from this page.                                                                                         |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board, open)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [![The defect loop. A brain mid-run ends its report with a defect-report block. The trust pipeline runs four checks: whitelist gate, identity-leak guard as the hard stop, title dedup and a per-run cap with a ledger line. A clean report becomes a public issue on the engine, with exhibits #4 the phantom web tool, #5 context-assembly gaps and #6 filed by the cloud beat. A leaky report falls back to a private draft. The flywheel: the maintainer fixes, the engine tags a release, every brain re-pins by tag.][image10]](https://content.da.live/jackzhaojin/www-eds/media/writing/2026-08-15-anima-mesh-company-of-zero/defect-loop.svg) |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| The defect loop from the repo. The agent is the first user of its own bug tracker.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Watch this part [7:47 The AI files its own GitHub issues](https://youtu.be/zYytfy1PAkc?t=467)

+------------------+
| Section Metadata |
+---------+--------+
| id      | issues |
+---------+--------+

---

## The live demo read my non-compete to answer a question

The last thing I demoed took a little longer in Columbus. I still work for Accenture, so I asked a real question: with my non-compete, can I still present at AI Tinkerers Columbus, or would that be a problem? During the demo, the agent read the knowledge graph, pulled my actual non-compete PDF out of SharePoint through Microsoft Graph, read it and answered.

What I find powerful is that it didn't just answer from the knowledge graph. It went from the graph to the document, worked through it, and figured out what applied. I'm not showing the answer here, since it's my own employment paperwork.

Reading one specific document on request is v0.17.0, tagged the day of the talk. The agent ends its output with a `read-request` block naming files it saw in a listing, and deterministic code checks the source allowlist, the path and the caps (4 files, about 32K characters) before it serves them, with a ledger entry either way.

Watch this part [9:13 Demo: asking my non-compete a question](https://youtu.be/zYytfy1PAkc?t=553)

+------------------+
| Section Metadata |
+---------+--------+
| id      | demo   |
+---------+--------+

---

## The real unlock is AI that reaches out to you

The crux of the engine wasn't demoable, because I'm not going to show a company's real data. The powerful part is that AI reaches out to the owners, not the other way around. Most of the time when people use AI, they sit down and type into it. Very seldom does AI take the mental load and the friction off you, organize its 10 or 25 workers, and then reach out to you about what's missing. To me, that's the only way one person could run ten companies: the mental load moves off the individual and into an agent orchestration layer.

The 35-second clip I posted on August 25 is this part of the live talk. If AI reaches out to you as the owner, it carries the mental load and keeps you focused, assuming the AI is good enough. My example was that AI may need me to download a statement from Chase.

In the engine, everything the mesh does ends in a channel I already live in. The daily brief arrives as a Discord DM. A failed beat sends its own DM. A nag comes back every morning with its day count until its done-condition is met. Due work the cloud can't run becomes an explicit ask. And the ask arrives with the work started: the sample brain's prep pack for a bank export has a session starter to paste, the prep already done, and quiz questions, so answering takes judgment, not reloading context. The machine holds the calendar and the state. I hold only the decisions.

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board, open)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [![The AI comes to you diagram. The mesh, on its own clock, runs the 08:00 beat and treats delivery as part of the beat. What travels toward the human: the daily brief, the failure DM, the nag with its day count, the blocked ask, the prep pack and the ticket. You, minutes a day: read the DM, answer a quiz question, approve, veto or redirect, and a reply becomes a direction. Deliberately absent: a dashboard to open, a status meeting, a backlog to groom.][image11]](https://content.da.live/jackzhaojin/www-eds/media/writing/2026-08-15-anima-mesh-company-of-zero/ai-comes-to-you.svg) |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| The push posture. Founder attention is the scarce resource, so nothing here waits to be checked.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Watch this part [10:06 The real unlock](https://youtu.be/zYytfy1PAkc?t=606)

+------------------+
| Section Metadata |
+---------+--------+
| id      | unlock |
+---------+--------+

---

## What works today and where it stops

The engine runs its beat on Workers and Durable Objects against a private GitHub brain, and the same brain runs on a laptop through the CLI. You don't need my brain or any credentials to try it. The sample brain validates and runs on the engine's offline fake provider:

```
pnpm cli validate docs/sample-brain
pnpm cli run chief-of-staff --instance docs/sample-brain
```

Where it stops:

- It's pre-release. The deck documents v0.16.1 and the recording runs v0.17.0.
- Seven companies with one founder is still a thought experiment.
- Reach is SharePoint, OneDrive and the mailbox through Microsoft Graph, plus GitHub. Google Drive isn't built.
- There's no direct bank access, on purpose, and the commercial agents stay dormant until their activation gates are open.
- The spokes run one at a time by design, so a busy beat takes as long as its model calls.
- A CRM kept as one file per record suits hundreds of relationships, not tens of thousands.
- Agents can still be wrong, and a failed agent's work just doesn't happen that day. That's why money movement, filings, publishing, credentials and access always end at the human.

The repo has the full talk as a page, [diagram then code, stop by stop](https://github.com/jackzhaojin/anima-mesh/blob/0874733/docs/sample-brain/2026-08-04-ai-tinkerers-talk.md), and [a guide from an empty directory to a running brain](https://github.com/jackzhaojin/anima-mesh/blob/0874733/docs/starting-a-company.md). Since the recording, v0.17.1 and v0.17.2 have followed. If you're building anything agent-memory powered that reaches out to builders, not the other way around, I'd like to hear how you're doing it.

+------------------+
| Section Metadata |
+---------+--------+
| id      | result |
+---------+--------+

---

## Related

+---------------------------------------------------------------------------------------------------------------------------------------------+
| Row List                                                                                                                                    |
+-----------+-----------------------------------------------------------------------------------------+---------------------------------------+
| Portfolio | [Anima Mesh: the company-of-0 experiment](/portfolio/anima-mesh/)                       | The project chapter, with the cloud   |
|           |                                                                                         | architecture and all six diagrams.    |
+-----------+-----------------------------------------------------------------------------------------+---------------------------------------+
| Article   | [Continuous agent, second brain](/writing/2026-05-31-continuous-agent-second-brain/)    | The second brain idea for one person, |
|           |                                                                                         | before I applied it to a company.     |
+-----------+-----------------------------------------------------------------------------------------+---------------------------------------+
| Article   | [Continuous executive agent v2.1](/writing/2026-04-05-continuous-executive-agent-v2-1/) | My 24/7 coding agent, from my earlier |
|           |                                                                                         | AI Tinkerers Columbus talk.           |
+-----------+-----------------------------------------------------------------------------------------+---------------------------------------+

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

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Metadata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| title                   | Company of Zero: AnimaMesh on Cloudflare Workers \| Jack Jin                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| description             | AnimaMesh, an open source engine where AI agents run a company's back office on Cloudflare Workers: one public engine, a private markdown brain per company.                                                                                                                                                                                                                                                                                                                                                                                                                      |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| template                | article                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| title-keep-together     | Cloudflare Workers                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image                   | ![Diagram from the AnimaMesh repo: the mesh runs on its own clock and sends the daily brief, failure DMs, nags and prep packs to the human, who spends minutes a day deciding][image12]                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image:alt               | Diagram from the AnimaMesh repo: the mesh runs on its own clock and sends the daily brief, failure DMs, nags and prep packs to the human, who spends minutes a day deciding                                                                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| published-time          | 2026-08-15                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| modified-time           | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| json-ld                 | {"@context":"https\://schema.org","@graph":\[{"@type":"Person","@id":"https\://www\.jackzhaojin.com/#person","name":"Jack Jin","url":"https\://www\.jackzhaojin.com/","jobTitle":"Associate Director","worksFor":{"@type":"Organization","name":"Accenture","department":{"@type":"Organization","name":"Adobe Business Group"}},"sameAs":\["https\://www\.linkedin.com/in/jackjin","https\://github.com/jackzhaojin","https\://www\.youtube.com/@jackjin8467","https\://www\.credly.com/users/jack-jin"],"award":\["Adobe Experience Manager Champion, class of 2026-2027","AEM  |
|                         | Rockstar winner, Adobe Summit 2024"]},{"@type":"WebSite","@id":"https\://www\.jackzhaojin.com/#website","url":"https\://www\.jackzhaojin.com/","name":"Jack Jin","publisher":{"@id":"https\://www\.jackzhaojin.com/#person"}},{"@type":"TechArticle","@id":"https\://www\.jackzhaojin.com/writing/2026-08-15-anima-mesh-company-of-zero/#article","headline":"Company of Zero: How AnimaMesh Runs a Company's Back Office on Cloudflare Workers","description":"AnimaMesh, an open source engine where AI agents run a company's back office on Cloudflare Workers: one public    |
|                         | engine, a private markdown brain per company.","author":{"@id":"https\://www\.jackzhaojin.com/#person"},"publisher":{"@id":"https\://www\.jackzhaojin.com/#person"},"image":"https\://www\.jackzhaojin.com/writing/2026-08-15-anima-mesh-company-of-zero/media\_1365070f3bfc3eceef1a6d8c2ad6d7488bbbcecb3.jpg","mainEntityOfPage":"https\://www\.jackzhaojin.com/writing/2026-08-15-anima-mesh-company-of-zero/","isPartOf":{"@id":"https\://www\.jackzhaojin.com/#website"},"about":\["AnimaMesh","AI agents","Cloudflare Workers","Durable Objects","Open Knowledge             |
|                         | Format","Microsoft Graph"],"datePublished":"2026-08-15","dateModified":"2026-10-04","inLanguage":"en","video":{"@id":"https\://www\.jackzhaojin.com/writing/2026-08-15-anima-mesh-company-of-zero/#video"}},{"@type":"VideoObject","@id":"https\://www\.jackzhaojin.com/writing/2026-08-15-anima-mesh-company-of-zero/#video","name":"I Built an AI Engine That Runs a Company of Zero on Cloudflare Workers","description":"The recorded version of my AI Tinkerers Columbus talk: one public engine, many private brains, AI agents that run a company's back office on         |
|                         | Cloudflare Workers, and a human who                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|                         | approves.","thumbnailUrl":"https\://www\.jackzhaojin.com/writing/2026-08-15-anima-mesh-company-of-zero/media\_1365070f3bfc3eceef1a6d8c2ad6d7488bbbcecb3.jpg","uploadDate":"2026-08-15T21:32:38Z","duration":"PT11M9S","embedUrl":"https\://www\.youtube-nocookie.com/embed/zYytfy1PAkc"},{"@type":"BreadcrumbList","@id":"https\://www\.jackzhaojin.com/writing/2026-08-15-anima-mesh-company-of-zero/#breadcrumb","itemListElement":\[{"@type":"ListItem","position":1,"name":"Home","item":"https\://www\.jackzhaojin.com/"},{"@type":"ListItem","position":2,"name":"Technical |
|                         | Writing","item":"https\://www\.jackzhaojin.com/writing/"},{"@type":"ListItem","position":3,"name":"Company of Zero","item":"https\://www\.jackzhaojin.com/writing/2026-08-15-anima-mesh-company-of-zero/"}]}]}                                                                                                                                                                                                                                                                                                                                                                    |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| og:image:alt            | Diagram from the AnimaMesh repo: the mesh runs on its own clock and sends the daily brief, failure DMs, nags and prep packs to the human, who spends minutes a day deciding                                                                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:published\_time | 2026-08-15                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:modified\_time  | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:author          | https\://www\.jackzhaojin.com/                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-summary         | AnimaMesh, an open source engine on Cloudflare Workers: one public engine, a private markdown brain per company, agents that take sick days, a brain that files its own GitHub issues past a leak guard, and AI that reaches out to the owner instead of waiting for a prompt.                                                                                                                                                                                                                                                                                                    |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-image           | https\://www\.jackzhaojin.com/writing/media\_1365070f3bfc3eceef1a6d8c2ad6d7488bbbcecb3.jpg?width=750\&format=jpg\&optimize=medium                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-topics          | AI Engineering                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-reading-time    | 14 min read                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-video-time      | 11:09 video                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-talk-url        | https\://www\.jackzhaojin.com/talks/#ai-tinkerers-2026-animamesh                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-talk-label      | Given as a talk at AI Tinkerers Columbus, August 3, 2026                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-talk-note       | 2nd place, AI Tinkerers global Top AI Demos                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-url       | https\://youtu.be/zYytfy1PAkc                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-label     | Watch on YouTube                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-keywords        | talk ai tinkerers columbus 2nd place, ai tinkerers global top ai demos animamesh company of zero ai agents multi-agent cloudflare workers durable objects open knowledge format okf second brain microsoft graph sharepoint discord github issues ai tinkerers columbus agent orchestration                                                                                                                                                                                                                                                                                       |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_19767e9ef0fdff740c2b9e6925a86e6e2b70f5133.png#width=144&height=92

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_1469bda7b036876f539bd7970e200ba427e8540cc.png#width=144&height=92

[image2]: https://main--www-eds--jackzhaojin.aem.page/media_114d9addaaa9478c5953003d009ec54fb9eb4556e.png#width=144&height=92

[image3]: https://main--www-eds--jackzhaojin.aem.page/media_15ff55929f6f943f158eb02ce60b6a78ee6a18f43.png#width=144&height=92

[image4]: https://main--www-eds--jackzhaojin.aem.page/media_1ef62e95f0ed71b83f6a532ab817e8a5abc305f71.png#width=144&height=92

[image5]: https://main--www-eds--jackzhaojin.aem.page/media_1ebcc3bf546ff1cb03bd15ebb8b5187297ddd3dd2.png#width=144&height=92

[image6]: https://main--www-eds--jackzhaojin.aem.page/media_128fd5493d98b2a8e4bf1900816410977b3166df3.svg#width=1280&height=980

[image7]: https://main--www-eds--jackzhaojin.aem.page/media_144a6924eba90d90d0138ec2d00866c98a6cda10b.svg#width=1280&height=1010

[image8]: https://main--www-eds--jackzhaojin.aem.page/media_18a342a3b57627e8643a5bac1f9ce3b40b7b596f7.svg#width=1280&height=1100

[image9]: https://main--www-eds--jackzhaojin.aem.page/media_18d2f313a396a855b0e09d0ead1e2ec1b65b026be.svg#width=1280&height=880

[image10]: https://main--www-eds--jackzhaojin.aem.page/media_17b23a040d6355c716ecd95366e3d24d8e2ac9bd4.svg#width=1280&height=760

[image11]: https://main--www-eds--jackzhaojin.aem.page/media_1a83409cfcdaad1a93deaa62b34f67a635be624a2.svg#width=1280&height=734

[image12]: https://main--www-eds--jackzhaojin.aem.page/media_1365070f3bfc3eceef1a6d8c2ad6d7488bbbcecb3.jpg#width=1280&height=720
