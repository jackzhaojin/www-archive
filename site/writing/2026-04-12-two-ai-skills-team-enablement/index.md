1. [Home](/)
2. [Technical Writing](/writing/)
3. Two AI Skills for Team Enablement

# Two AI Skills for Team Enablement: Log the Prompts You Typed, File the AI Docs Behind Them

By [Jack Jin](/) · April 12, 2026 · Updated October 4, 2026 · 8 min read · Includes my 9:49 video

To make a team's AI work repeatable, keep the prompts people actually typed and file the documents behind them where others can find them. Two open source skills do that: a Conversation Logger that records the human side verbatim and the AI's side in one line, and an AI Knowledge Harvester that files specs, logs and prompt packets under one taxonomy. Along the way: how to coach a team on AI, and how to turn a one-off build into a reusable skill.

---

+---------------------------------------------------------------------------------+
| Rail                                                                            |
+---------------------------------------+-----------------------------------------+
|                                       | **Since then**\                         |
|                                       | [One log file per session](#changed)    |
+---------------------------------------+-----------------------------------------+
| ![][image0]                           | **Part 1**\                             |
|                                       | [Coaching a team on AI](#part-1)        |
+---------------------------------------+-----------------------------------------+
| ![][image1]                           | **Part 2**\                             |
|                                       | [Logging what you typed](#part-2)       |
+---------------------------------------+-----------------------------------------+
| ![][image2]                           | **Part 3**\                             |
|                                       | [A one-off build into a skill](#part-3) |
+---------------------------------------+-----------------------------------------+
| ![][image3]                           | **Part 4**\                             |
|                                       | [Prompt packets](#part-4)               |
+---------------------------------------+-----------------------------------------+
| ![][image4]                           | **Part 5**\                             |
|                                       | [Filing under one taxonomy](#part-5)    |
+---------------------------------------+-----------------------------------------+
|                                       | **Wrap-up**\                            |
|                                       | [Install, and what I learned](#part-6)  |
+---------------------------------------+-----------------------------------------+
| [Watch the video, 9:49](#video)                                                 |
|                                                                                 |
| [Code on GitHub](https://github.com/jackzhaojin/ai-builder-kit/tree/93cfafd)    |
+---------------------------------------------------------------------------------+

---

The video walks through three goals and then the two skills, in that order, and so does this page. Each part links to its moment in the video.

---

+------------------------------------------------------------------------------------------------------------------------------------+
| Figure                                                                                                                             |
+------------------------------------------------------------------------------------------------------------------------------------+
| [I Built Two AI Skills to Make Team AI Work Repeatable and Shareable](https://youtu.be/5U_fOYZxMD4)                                |
|                                                                                                                                    |
| Recorded April 12, 2026. Each part below links to its moment in the video, or [watch it on YouTube](https://youtu.be/5U_fOYZxMD4). |
+------------------------------------------------------------------------------------------------------------------------------------+

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Fine Print                                                                                                                                                                                                                                                                                                                                          |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| First published on LinkedIn on April 12, 2026. Rewritten for this site in October 2026. Code: [ai-builder-kit](https://github.com/jackzhaojin/ai-builder-kit/tree/93cfafd) at `93cfafd`, the version from the day of the video. Example output: the [`ai-docs`](https://github.com/jackzhaojin/ciam-demo/tree/a5195f9/ai-docs) folder of ciam-demo. |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| id      | video  |
+---------+--------+

---

## Since April, the logger writes one file per session

Both skills are still in [ai-builder-kit](https://github.com/jackzhaojin/ai-builder-kit), and the logger kept changing as I used it. In April I added a sibling, `chat-conversation-logger`, for conversations in the Claude.ai chat app. In May the logger moved from one long `prompt-log.md` per project to one file per session, named by date, a counter and a topic, so a folder listing reads in time order. The harvester's taxonomy is unchanged.

+-------------------+
| Section Metadata  |
+---------+---------+
| id      | changed |
+---------+---------+

---

## 1. Coaching a team on AI: show, watch, three likes and one thought

The first goal I have for everyone is to think about how we make our teams better at using AI. I've tried a lot of methods, on my project team and in other parts of Accenture. The best one I've seen, from other people and from doing it myself, goes like this. First I show people what I do on a common project task. Then I watch them do a similar task, and I tell them three things I like and one thing they could think about.

Every once in a while someone asks me something right on point and fairly difficult, and I think: I did this two weeks ago. If only I had a way to show them what I did. But that was on my AI laptop, which isn't my Accenture laptop, and I can't just whip up the situation and the prompt that solved it. That happens more often than I like to admit.

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Diagram titled AI Skills on Enabling Your Team. Three goals across the top: Share Knowledge and Give Feedback, Building reusable skills, and Making your AI-docs findable under a single taxonomy. Arrows lead down to two skills: Conversation Logger and AI Knowledge Harvester.][image5] |
|                                                                                                                                                                                                                                                                                               |
| The board from the video: three goals on top, two skills underneath. All three goals feed the Conversation Logger; the third one also needs the AI Knowledge Harvester.                                                                                                                       |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Watch this part [0:21 Making the team better at AI](https://youtu.be/5U_fOYZxMD4?t=21)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-1 |
+---------+--------+

---

## 2. The Conversation Logger keeps what you typed, word for word

So I started standardizing how I log my AI conversations. Think about any kind of engineering in STAR terms: the situation you're in, the task you're given, the action you take, and the result. With AI, the action is the prompting. The Conversation Logger focuses on the action I take with AI, not so much on what AI does. It still captures the AI's side, it just isn't the main record.

Here's a real one, from a Sunday morning session on my CIAM demo, a customer identity and access management proof of concept. The logger kept what I typed verbatim, including answers to the questions AI asked me, and summarized each response and action in a line:

+--------------------------------------------------------------------------------------------------------------------------------------------------+
| Code (wrap, prose)                                                                                                                               |
+--------------------------------------------------------------------------------------------------------------------------------------------------+
| ai-docs/prompt-logs/2026-02-22-01-v1-3-pre-plan.md, lines 60 to 68                                                                               |
|                                                                                                                                                  |
| [a5195f9 on GitHub](https://github.com/jackzhaojin/ciam-demo/blob/a5195f9/ai-docs/prompt-logs/2026-02-22-01-v1-3-pre-plan.md#L60-L68)            |
+--------------------------------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                                              |
| ### Prompt 4: Four Architecture Decisions (10:25 AM)                                                                                             |
|                                                                                                                                                  |
| > (Answered refined 4 questions:)                                                                                                                |
| > - Auth code flow: Headless OIDC \+ updated the design markdown                                                                                 |
| > - Java 8 compat: Portable utility classes (Recommended)                                                                                        |
| > - Session mgmt: Focus spec on auth only                                                                                                        |
| > - Login page arch: Next.js client component (Recommended)                                                                                      |
|                                                                                                                                                  |
| → Response: Read updated `input-design-pkce.md` (now with sequence diagram showing React→Keycloak→Spring flow), wrote full v1.3 incremental PRD. |
| ```                                                                                                                                              |
+--------------------------------------------------------------------------------------------------------------------------------------------------+

Not every prompt works the first try, and the log shows that too: each follow-up, as I typed it. I use voice to text a lot, so the prompts aren't polished, and that's fine. What you put into the system matters, and so does what the system has (MCP servers, tools, skills, specs). The most important part is how you use AI. When a teammate asks "Jack, have you done this?", I can pull up the log and show exactly what I put into Claude Code or GitHub Copilot to move forward.

The skill tells the model to record the human side in full and the AI's side in one line each, "like a lab notebook". It also works out which tool it is running in, so it can read real prompt timestamps from that tool's history file instead of guessing:

+-----------------------------------------------------------------------------------------------------------------------------+
| Code (wrap)                                                                                                                 |
+-----------------------------------------------------------------------------------------------------------------------------+
| skills/conversation-logger/SKILL.md, lines 24 to 26                                                                         |
|                                                                                                                             |
| [93cfafd on GitHub](https://github.com/jackzhaojin/ai-builder-kit/blob/93cfafd/skills/conversation-logger/SKILL.md#L24-L26) |
+-----------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                         |
| if [ "$CLAUDECODE" = "1" ]; then echo "claude-code"                                                                         |
| elif [ -d "$HOME/.codex" ]; then echo "codex"                                                                               |
| else echo "unknown"; fi                                                                                                     |
| ```                                                                                                                         |
+-----------------------------------------------------------------------------------------------------------------------------+

Claude Code keeps its history in `~/.claude/history.jsonl` and Codex in `~/.codex/history.jsonl`. Copilot keeps chat history inside VS Code's own databases, so there the log falls back to the current time and says the timestamps are approximate.

Watch this part [1:20 Why log the human side](https://youtu.be/5U_fOYZxMD4?t=80) [1:51 A real log](https://youtu.be/5U_fOYZxMD4?t=111)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-2 |
+---------+--------+

---

## 3. Turning a one-off build into a skill with the skill creator

The second goal is building reusable skills. My example is the same CIAM demo. AI did most of the work of setting up the identity system, on Keycloak hosted by Phase Two. I had never set up a system like this before. AI did the research, told me the manual steps, and wrote the shell scripts that configure it, which got my proof of concept done. As far as I can tell, it did the work correctly. And I wanted that to be repeatable.

So I asked Anthropic's out-of-the-box skill creator for Claude to build a skill from it. I pasted in the prompt blocks I used to generate the specs, and the goal: other people pass in their CIAM requirements and get similar output. Then I pointed it at the code, so it would know what the result was. It read my markdown files, read what makes a good skill, and built one from the situation, my prompts as the action, and the shell scripts as the result. After about five minutes I had a CIAM architect skill that can repeat something I had done once. Early results are promising, and I'm still iterating on it.

The result it learned from is public: twelve numbered scripts in [`ciam/scripts`](https://github.com/jackzhaojin/ciam-demo/tree/a5195f9/ciam/scripts), from `00-helpers.sh` and `01-configure-realm.sh` to `11-configure-frontend-mappers.sh`, plus a `setup-all.sh`.

Watch this part [3:26 Building reusable skills](https://youtu.be/5U_fOYZxMD4?t=206) [4:21 The skill creator](https://youtu.be/5U_fOYZxMD4?t=261) [5:51 The finished skill](https://youtu.be/5U_fOYZxMD4?t=351)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-3 |
+---------+--------+

---

## 4. Complex builds need a prompt packet, not one prompt

The third goal is cataloging my AI work in a way that's findable, so I can turn it into a harness later. The way I think about AI, my four patterns all build around skills at the lowest level. If I capture capabilities as skills, I can make AI do a lot more with harnesses and a 24-hour agent. (That's the stack from [Making AI-Driven Development Modules Reusable](/writing/2026-02-05-reusable-ai-development-modules/).)

Some builds take a lot of planning. You feed AI a very large prompt, a prompt packet, and it plans and builds in phases. For the CIAM demo I used Claude's agent teams, similar to Kimi's agent swarm. The kickoff prompt doesn't do that work justice. It points to a [kickoff guide](https://github.com/jackzhaojin/ciam-demo/blob/a5195f9/ai-docs/working-docs/2026-02-07-06-kickoff-guide.md), and the kickoff guide sets a reading order for six documents. So logging prompts isn't enough. If you want to build something complex, you need the packet, and you need to get all of it checked in somewhere you can find it.

Watch this part [6:17 Making AI work findable](https://youtu.be/5U_fOYZxMD4?t=377) [6:54 Prompt packets](https://youtu.be/5U_fOYZxMD4?t=414)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-4 |
+---------+--------+

---

## 5. The AI Knowledge Harvester files AI docs under one taxonomy

That's my second skill. The Conversation Logger looks at your current session and your Claude Code or Copilot history. The AI Knowledge Harvester collects everything else: specs, prompt logs, working docs and prompt packets, filed in one consistent taxonomy. If you're into digital asset management, you know taxonomy is big. I wanted all the AI knowledge behind my capabilities in one repository with a documented taxonomy.

The rules are simple enough to try by hand. The first tier is always the GitHub repo name. The second tier is the sub-project, or the repo name again for a simple repo. Then one folder per document type, and a file name that starts with the date, so every folder sorts in time order. Sources stay where they are, and it never pushes.

Below, pick one of six example files to see the folder and file name the harvester would give it, and the reason for each part of the path. The last two show what it leaves alone. This is the point of the taxonomy: anyone on the team can guess where a prompt log or a spec lives without asking.

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Explainer (harvest sorter)                                                                                                                                                                 |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Where the harvester files a document (rules from ai-knowledge-harvester at 93cfafd)                                                                                                        |
|                                                                                                                                                                                            |
| [source](https://github.com/jackzhaojin/ai-builder-kit/blob/93cfafd/skills/ai-knowledge-harvester/SKILL.md)                                                                                |
+-----------------------------+-----------------------------+-------------------------------------------------------------+------------------------------------------------------------------+
| A prompt log in a monorepo  | jack-dev-server-configs     | local/generic-harness-v1/ai-docs/init/prompt-log.md         | ```                                                              |
|                             |                             |                                                             | # Prompt Log                                                     |
|                             |                             |                                                             | ### Prompt 1: Kickoff (10:00 AM)                                 |
|                             |                             |                                                             | > Read the kickoff guide first, then ask me four questions.      |
|                             |                             |                                                             | → Response: Read the guide and asked four questions.             |
|                             |                             |                                                             | → Action: Read 6 files.                                          |
|                             |                             |                                                             | ```                                                              |
+-----------------------------+-----------------------------+-------------------------------------------------------------+------------------------------------------------------------------+
| A spec                      | jack-dev-server-configs     | local/generic-harness-v1/ai-docs/init/CONSOLIDATED\_SPEC.md | ```                                                              |
|                             |                             |                                                             | # Consolidated Specification                                     |
|                             |                             |                                                             | Requirements and architecture decisions for the generic harness. |
|                             |                             |                                                             | ```                                                              |
+-----------------------------+-----------------------------+-------------------------------------------------------------+------------------------------------------------------------------+
| A CLAUDE.md                 | jack-dev-server-configs     | local/generic-harness-v1/CLAUDE.md                          | ```                                                              |
|                             |                             |                                                             | # CLAUDE.md                                                      |
|                             |                             |                                                             | Guidance for agents working in this harness.                     |
|                             |                             |                                                             | ```                                                              |
+-----------------------------+-----------------------------+-------------------------------------------------------------+------------------------------------------------------------------+
| A kickoff guide             | ciam-demo                   | ai-docs/kickoff-guide.md                                    | ```                                                              |
|                             |                             |                                                             | # CIAM Claims PoC, Kickoff Guide                                 |
|                             |                             |                                                             | The "Start Here" document for AI agents and humans.              |
|                             |                             |                                                             | ```                                                              |
+-----------------------------+-----------------------------+-------------------------------------------------------------+------------------------------------------------------------------+
| A README                    | ciam-demo                   | README.md                                                   | ```                                                              |
|                             |                             |                                                             | # CIAM Demo                                                      |
|                             |                             |                                                             | Public documentation for the project.                            |
|                             |                             |                                                             | ```                                                              |
+-----------------------------+-----------------------------+-------------------------------------------------------------+------------------------------------------------------------------+
| A docs/ page                | ciam-demo                   | docs/architecture.md                                        | ```                                                              |
|                             |                             |                                                             | # Architecture                                                   |
|                             |                             |                                                             | How the services fit together.                                   |
|                             |                             |                                                             | ```                                                              |
+-----------------------------+-----------------------------+-------------------------------------------------------------+------------------------------------------------------------------+
| Example files, from the     | The file, in its source     | Where it lands in the knowledge repo                                                                                           |
| skill's own docs and        | repo                        |                                                                                                                                |
| ciam-demo                   |                             |                                                                                                                                |
+-----------------------------+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| ai-knowledge/projects/jack-dev-server-configs/generic-harness-v1/prompt-logs/2026-04-12-01-prompt-log.md                                                                                   |
|                                                                                                                                                                                            |
| - Tier 1 is the GitHub repo name: `jack-dev-server-configs`.                                                                                                                               |
| - Tier 2 is `generic-harness-v1`: the path starts with local/generic-harness-v1/, so this is a monorepo sub-project.                                                                       |
| - Type is `prompt-log`: it reads like a session log, prompts followed by → Response and → Action lines.                                                                                    |
| - The name is the date, a sequence number and a slug, so the folder sorts in time order.                                                                                                   |
| - It is a copy. The source file stays where it is.                                                                                                                                         |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| - date: 2026-04-12                                                                                                                                                                         |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| A simplified model. The harvester is a skill, written instructions an AI model follows, so on real files the model makes these calls and asks you before it copies anything. This applies  |
| the same written rules literally. The example paths come from the skill's documentation and ciam-demo.                                                                                     |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Every harvested file also gets frontmatter: title, project, sub-project, type, date, why it is private, status, source repo and source tool. You can see the result in the public ciam-demo repo, where the harvest left [three folders](https://github.com/jackzhaojin/ciam-demo/tree/a5195f9/ai-docs): `specs`, `prompt-logs` and `working-docs`, each file dated and numbered.

Watch this part [8:04 The AI Knowledge Harvester](https://youtu.be/5U_fOYZxMD4?t=484)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-5 |
+---------+--------+

---

## 6. Installing both skills, and what I learned

Both skills are open source in ai-builder-kit. Install them with one command:

```
npx skills add jackzhaojin/ai-builder-kit
```

Pick the skills with the space bar (I picked the AI Knowledge Harvester and the Conversation Logger), hit enter, and you're done. On camera I said "npx skill add"; the command in the repo's README is `npx skills add`.

I'm still early on all of this. Logging the human side has been more useful than logging the AI's output, a one-off build can become a skill if you hand the skill creator your prompts and your results, and findable takes a taxonomy, not just saved files. What I don't have yet is the best coaching loop for a team; three things I like and one thing to think about is where I am today. If you are thinking about team AI enablement, I'd like to hear what is working for you.

Watch this part [8:54 Installing the skills](https://youtu.be/5U_fOYZxMD4?t=534)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-6 |
+---------+--------+

---

## Related

+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| Row List                                                                                                                                                 |
+-----------+-------------------------------------------------------------------------------------------------------+--------------------------------------+
| Portfolio | [AI Builder Kit](/portfolio/ai-builder-kit/)                                                          | Every skill in the kit, including    |
|           |                                                                                                       | these two.                           |
+-----------+-------------------------------------------------------------------------------------------------------+--------------------------------------+
| Portfolio | [CIAM Demo: customer identity, end to end](/portfolio/ciam-demo/)                                     | The build these logs and the CIAM    |
|           |                                                                                                       | skill came from.                     |
+-----------+-------------------------------------------------------------------------------------------------------+--------------------------------------+
| Writing   | [Making AI-Driven Development Modules Reusable](/writing/2026-02-05-reusable-ai-development-modules/) | The four patterns that sit on top of |
|           |                                                                                                       | skills.                              |
+-----------+-------------------------------------------------------------------------------------------------------+--------------------------------------+

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

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Metadata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| title                   | Two AI Skills for Team Enablement: Logger and Harvester \| Jack Jin                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| description             | Make a team's AI work repeatable: log the prompts people typed, turn one-off builds into skills, and file AI docs under one taxonomy. Two open source skills.                                                                                                                                                                                                                                                                                                                                                                                                                            |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| template                | article                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image                   | ![Jack's board, AI Skills on Enabling Your Team: three goals above two skills, Conversation Logger and AI Knowledge Harvester][image6]                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image:alt               | Jack's board, AI Skills on Enabling Your Team: three goals above two skills, Conversation Logger and AI Knowledge Harvester                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| published-time          | 2026-04-12                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| modified-time           | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| json-ld                 | {"@context":"https\://schema.org","@graph":\[{"@type":"Person","@id":"https\://www\.jackzhaojin.com/#person","name":"Jack Jin","url":"https\://www\.jackzhaojin.com/","jobTitle":"Associate Director","worksFor":{"@type":"Organization","name":"Accenture","department":{"@type":"Organization","name":"Adobe Business Group"}},"sameAs":\["https\://www\.linkedin.com/in/jackjin","https\://github.com/jackzhaojin","https\://www\.youtube.com/@jackjin8467","https\://www\.credly.com/users/jack-jin"],"award":\["Adobe Experience Manager Champion, class of 2026-2027","AEM         |
|                         | Rockstar winner, Adobe Summit 2024"]},{"@type":"WebSite","@id":"https\://www\.jackzhaojin.com/#website","url":"https\://www\.jackzhaojin.com/","name":"Jack Jin","publisher":{"@id":"https\://www\.jackzhaojin.com/#person"}},{"@type":"TechArticle","@id":"https\://www\.jackzhaojin.com/writing/2026-04-12-two-ai-skills-team-enablement/#article","headline":"Two AI Skills for Team Enablement: Log the Prompts You Typed, File the AI Docs Behind Them","description":"Make a team's AI work repeatable: log the prompts people typed, turn one-off builds into skills, and file AI |
|                         | docs under one taxonomy. Two open source skills.","author":{"@id":"https\://www\.jackzhaojin.com/#person"},"publisher":{"@id":"https\://www\.jackzhaojin.com/#person"},"image":"https\://www\.jackzhaojin.com/writing/2026-04-12-two-ai-skills-team-enablement/media\_14b0c0445297528fa704ee7e6dfcfcc80c07480bf.jpg","mainEntityOfPage":"https\://www\.jackzhaojin.com/writing/2026-04-12-two-ai-skills-team-enablement/","isPartOf":{"@id":"https\://www\.jackzhaojin.com/#website"},"about":\["Agent skills","Claude Code","Prompt logging","Knowledge management","Team AI            |
|                         | enablement"],"datePublished":"2026-04-12","dateModified":"2026-10-04","inLanguage":"en","video":{"@id":"https\://www\.jackzhaojin.com/writing/2026-04-12-two-ai-skills-team-enablement/#video"}},{"@type":"VideoObject","@id":"https\://www\.jackzhaojin.com/writing/2026-04-12-two-ai-skills-team-enablement/#video","name":"I Built Two AI Skills to Make Team AI Work Repeatable and Shareable","description":"Three goals for team AI enablement and two open source skills: Conversation Logger, which captures the prompts you type, and AI Knowledge Harvester, which catalogs AI |
|                         | docs in one                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|                         | taxonomy.","thumbnailUrl":"https\://www\.jackzhaojin.com/writing/2026-04-12-two-ai-skills-team-enablement/media\_14b0c0445297528fa704ee7e6dfcfcc80c07480bf.jpg","uploadDate":"2026-04-18T15:40:01Z","duration":"PT9M49S","embedUrl":"https\://www\.youtube-nocookie.com/embed/5U\_fOYZxMD4"},{"@type":"BreadcrumbList","@id":"https\://www\.jackzhaojin.com/writing/2026-04-12-two-ai-skills-team-enablement/#breadcrumb","itemListElement":\[{"@type":"ListItem","position":1,"name":"Home","item":"https\://www\.jackzhaojin.com/"},{"@type":"ListItem","position":2,"name":"Technical |
|                         | Writing","item":"https\://www\.jackzhaojin.com/writing/"},{"@type":"ListItem","position":3,"name":"Two AI Skills for Team Enablement","item":"https\://www\.jackzhaojin.com/writing/2026-04-12-two-ai-skills-team-enablement/"}]}]}                                                                                                                                                                                                                                                                                                                                                      |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| og:image:alt            | Jack's board, AI Skills on Enabling Your Team: three goals above two skills, Conversation Logger and AI Knowledge Harvester                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:published\_time | 2026-04-12                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:modified\_time  | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:author          | https\://www\.jackzhaojin.com/                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-summary         | Keep the prompts people actually typed, turn one-off builds into skills, and file the AI docs behind them under one taxonomy. Two open source skills, a Conversation Logger and an AI Knowledge Harvester, and a sorter to try the filing rules.                                                                                                                                                                                                                                                                                                                                         |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-image           | https\://www\.jackzhaojin.com/writing/media\_14b0c0445297528fa704ee7e6dfcfcc80c07480bf.jpg?width=750\&format=jpg\&optimize=medium                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-topics          | AI Engineering                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-reading-time    | 8 min read                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-video-time      | 9:49 video                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-url       | https\://youtu.be/5U\_fOYZxMD4                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-label     | Watch on YouTube                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-keywords        | agent skills claude code github copilot codex conversation logger ai knowledge harvester prompt packet skill creator ai-builder-kit npx skills ciam keycloak phase two                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_1f1b0067cdb1b4506f5491a3fe4c8918074f98f0e.png#width=144&height=92

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_1e478133bc442c3e00388b7279e5bc531a647b3b9.png#width=144&height=92

[image2]: https://main--www-eds--jackzhaojin.aem.page/media_116e53ecf26056986ac176a024d0e68d273eaccd7.png#width=144&height=92

[image3]: https://main--www-eds--jackzhaojin.aem.page/media_1e1d36fae0e4aa6c0cfd2f428c8117bc0c8b15749.png#width=144&height=92

[image4]: https://main--www-eds--jackzhaojin.aem.page/media_1a33478f88d2decc923ade617338ebe8dd296ba23.png#width=144&height=92

[image5]: https://main--www-eds--jackzhaojin.aem.page/media_10cd8bd569513e5d0b84550cc2560b6deb012310b.png#width=1600&height=650

[image6]: https://main--www-eds--jackzhaojin.aem.page/media_14b0c0445297528fa704ee7e6dfcfcc80c07480bf.jpg#width=1280&height=720
