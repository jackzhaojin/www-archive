1. [Home](/)
2. [Technical Writing](/writing/)
3. Agentic Admin API Configuration

# Agentic Admin API Configuration for Edge Delivery Services: GET Before POST, With a Hard Stop

By [Jack Jin](/) · March 23, 2026 · Updated October 4, 2026 · 10 min read · Includes my 9:06 video

If you work on Edge Delivery Services long enough, you'll need to configure the Admin API, whether your site is authored in Word, Universal Editor or da.live. That work can move out of Postman and into an agent skill that researches the API, writes a plan and always GETs before it POSTs, with a Claude Code hook that stops the skill's writes for approval, even in bypass permissions mode. Below are the demo, the hook's code, what its checks catch and miss, and how to install the open-source skill or the guarded plugin.

---

+------------------------------------------------------------------------------------+
| Rail                                                                               |
+---------------------------------------+--------------------------------------------+
|                                       | **Since then**\                            |
|                                       | [The kit grew, the skill didn't](#changed) |
+---------------------------------------+--------------------------------------------+
|                                       | **Part 1**\                                |
|                                       | [The Admin API](#part-1)                   |
+---------------------------------------+--------------------------------------------+
| ![][image0]                           | **Part 2**\                                |
|                                       | [A plan, then the GETs](#part-2)           |
+---------------------------------------+--------------------------------------------+
| ![][image1]                           | **Part 3**\                                |
|                                       | [Reviewing the POST](#part-3)              |
+---------------------------------------+--------------------------------------------+
| ![][image2]                           | **Part 4**\                                |
|                                       | [A hook stops the POST](#part-4)           |
+---------------------------------------+--------------------------------------------+
| ![][image3]                           | **Part 5**\                                |
|                                       | [Plan, ask, keep a record](#part-5)        |
+---------------------------------------+--------------------------------------------+
|                                       | **Part 6**\                                |
|                                       | [Install it](#part-6)                      |
+---------------------------------------+--------------------------------------------+
|                                       | **Wrap-up**\                               |
|                                       | [What works, the limits](#part-7)          |
+---------------------------------------+--------------------------------------------+
| [Watch the video, 9:06](#video)                                                    |
|                                                                                    |
| [Test a command against the hook](#guard-lab)                                      |
|                                                                                    |
| [Code on GitHub](https://github.com/jackzhaojin/ai-builder-kit/tree/cfb0f59)       |
+------------------------------------------------------------------------------------+

---

I'll walk through it the way the video does: the demo first, then the three things I like about it, then how to get it.

---

+-------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure                                                                                                                                          |
+-------------------------------------------------------------------------------------------------------------------------------------------------+
| [I built an agentic workflow for Helix admin API config](https://youtu.be/ojlh7o_3U9w)                                                          |
|                                                                                                                                                 |
| Recorded the night of March 22, 2026. Each part below links to its moment in the video, or [watch it on YouTube](https://youtu.be/ojlh7o_3U9w). |
+-------------------------------------------------------------------------------------------------------------------------------------------------+

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Fine Print                                                                                                                                                                                                                     |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| First published as a LinkedIn video on March 23, 2026. Rewritten for this site in October 2026. Code: [ai-builder-kit](https://github.com/jackzhaojin/ai-builder-kit/tree/cfb0f59) at `cfb0f59`, the commit before I recorded. |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| id      | video  |
+---------+--------+

---

## Since March, the kit grew and the skill stayed the same

The skill and the guard hook haven't changed in the repo since that night. What grew is the kit around them: [AI Builder Kit](/portfolio/ai-builder-kit/) is now a marketplace of nine published skills. Two months later I also spent a weekend with Adobe's own Edge Delivery skills, which I wrote up in [a hands-on review](/writing/2026-05-17-adobe-eds-skills-hands-on/).

+-------------------+
| Section Metadata  |
+---------+---------+
| id      | changed |
+---------+---------+

---

## The Admin API is part of every EDS flavor

If you've been doing EDS for some time, you'll need to configure the Admin API. It's part of all three offerings: sites authored in Word or Google Docs, Universal Editor, and the newer da.live. Robots.txt, site config, access, versions: it all goes through `admin.hlx.page`, documented in the [Admin API reference](https://www.aem.live/docs/admin.html).

The usual tools are Postman, the editors on [tools.aem.live](https://tools.aem.live/), or a CLI. I wanted to do it more agentically, with the AI doing the research, planning and execution while I stay in the driver's seat and review every step.

Watch this part [0:00 The Admin API](https://youtu.be/ojlh7o_3U9w?t=0)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-1 |
+---------+--------+

---

## The agent writes a plan and runs the GETs first

I started a new Claude Code session, at 0% context, and asked for something very generic: update my robots.txt to simply accept everything, keep it simple, and do the GET-SET-GET. To make sure it picked up the right skill, I named it, the Helix 5 admin skill, and pasted in the org and the site. It loaded the skill, did its research and came back with a plan before touching anything:

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                                                          |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Claude Code terminal: Here's the plan. Step 1, GET config versions. Step 2, GET current robots.txt (before). Step 3, POST simplified robots.txt with just User-agent star and Allow slash. Step 4, GET robots.txt to verify after. Steps 1 and 2 are both GETs, shall I run them now? Below it, my reply: I reviewed, let's run GETs and let me take a look.][image4] |
|                                                                                                                                                                                                                                                                                                                                                                         |
| The plan, before anything ran. Two GETs, one POST, one GET to verify.                                                                                                                                                                                                                                                                                                   |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

The skill understands the API well, and it almost always enforces a GET-SET-GET pattern, so we're not setting things without getting them first. That's what I consider best practice anyway: always get the latest before you touch anything, in case a teammate changed it. Here's the rule as the skill states it:

+----------------------------------------------------------------------------------------------------------------------------------+
| Code                                                                                                                             |
+----------------------------------------------------------------------------------------------------------------------------------+
| skills/hlx-admin-api-executor/SKILL.md, lines 186 to 193                                                                         |
|                                                                                                                                  |
| [cfb0f59 on GitHub](https://github.com/jackzhaojin/ai-builder-kit/blob/cfb0f59/skills/hlx-admin-api-executor/SKILL.md#L186-L193) |
+----------------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                              |
| ## GET/SET/GET Pattern                                                                                                           |
|                                                                                                                                  |
| For every modification, execute in sequence, one step at a time:                                                                 |
| 1. **GET before** - Capture current state, wait for user                                                                         |
| 2. **SET** - Apply the change, wait for user                                                                                     |
| 3. **GET after** - Verify persistence, wait for user                                                                             |
|                                                                                                                                  |
| **Never execute multiple steps without user confirmation between them.**                                                         |
| ```                                                                                                                              |
+----------------------------------------------------------------------------------------------------------------------------------+

The GETs came back with the current config version and the current robots.txt: `User-agent: *`, `Allow: /`, a `Disallow: /sitemap*` and a `Crawl-delay: 3`. The change would remove the last two.

Watch this part [1:05 The demo starts](https://youtu.be/ojlh7o_3U9w?t=65) [2:11 GET-SET-GET](https://youtu.be/ojlh7o_3U9w?t=131) [2:34 The plan](https://youtu.be/ojlh7o_3U9w?t=154) [3:08 Running the GETs](https://youtu.be/ojlh7o_3U9w?t=188)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-2 |
+---------+--------+

---

## Reviewing the POST before it runs

Before the POST, the AI tells me exactly what it's about to do, in a fixed format: why, what changes from before to after, and how. It shows the endpoint, the file the payload was saved to, and the exact curl command it will run:

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Claude Code terminal showing Change Review: Step 3, Simplify Robots.txt. WHY: you want the simplest possible robots.txt. WHAT: before, User-agent star, Allow slash, Disallow /sitemap star, Crawl-delay 3; after, User-agent star and Allow slash. HOW: POST replaces the entire robots.txt content, Content-Type text/plain with --data-binary. Endpoint POST https://admin.hlx.page/config/jackzhaojin/sites/eds-doc-authoring/robots.txt, the request payload file, and the full curl command.][image5] |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| The change review for the one POST in this session, against my test site. Two lines change.                                                                                                                                                                                                                                                                                                                                                                                                                   |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

This is important. It's a moment to take a breather. Even though the AI prepares all of this for you, you're still responsible for checking it. Me as the architect or engineer working on this, I look at the two-line change before it executes, and only then do I say yes.

Watch this part [4:00 The change review](https://youtu.be/ojlh7o_3U9w?t=240)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-3 |
+---------+--------+

---

## A hook that stops the POST, even in bypass mode

The skill takes us this far: a plan, the GETs, a review. The plugin adds a Claude Code hook that stops the session before the write. It's a pre-tool-call hook: I'm about to call the Bash tool to run a curl request, it happens to have a POST in there, so the hook fires and Claude Code asks me to confirm.

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                                      |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Claude Code terminal: the Bash command with curl --request POST to the robots.txt endpoint, then Hook PreToolUse:Bash requires confirmation for this command: HLX Admin API Guard, POST request to BASE\_URL/config/ORG/sites/SITE/robots.txt. This is a destructive admin API operation. Approve? Do you want to proceed? 1. Yes 2. No.][image6] |
|                                                                                                                                                                                                                                                                                                                                                     |
| The hook firing in the recording. I had already said yes to the review; this is the second, deterministic stop.                                                                                                                                                                                                                                     |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

That's really good if you're kind of paranoid like I am. I was running with bypass permissions on, and this still stopped Claude Code. It matters most when you've done something a bunch of times in lower environments, you're comfortable with it, and now you're doing it on production. It's always good to take a pause, and to make sure the pause isn't only an agentic pause but a deterministic one. With agentic systems, more layers like that can be better.

The hook is two small files. `hooks.json` registers a script to run before every Bash tool call:

+------------------------------------------------------------------------------------------------------------------------------------------------+
| Code                                                                                                                                           |
+------------------------------------------------------------------------------------------------------------------------------------------------+
| plugins/hlx-admin-api-executor-guarded/hooks/hooks.json                                                                                        |
|                                                                                                                                                |
| [cfb0f59 on GitHub](https://github.com/jackzhaojin/ai-builder-kit/blob/cfb0f59/plugins/hlx-admin-api-executor-guarded/hooks/hooks.json#L1-L17) |
+------------------------------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                                            |
| {                                                                                                                                              |
|   "description": "Guards destructive AEM Admin API operations (POST/PUT/DELETE/PATCH to admin.hlx.page)",                                      |
|   "hooks": {                                                                                                                                   |
|     "PreToolUse": [                                                                                                                            |
|       {                                                                                                                                        |
|         "matcher": "Bash",                                                                                                                     |
|         "hooks": [                                                                                                                             |
|           {                                                                                                                                    |
|             "type": "command",                                                                                                                 |
|             "command": "bash ${CLAUDE_PLUGIN_ROOT}/hooks/guard-admin-api.sh",                                                                  |
|             "timeout": 5                                                                                                                       |
|           }                                                                                                                                    |
|         ]                                                                                                                                      |
|       }                                                                                                                                        |
|     ]                                                                                                                                          |
|   }                                                                                                                                            |
| }                                                                                                                                              |
| ```                                                                                                                                            |
+------------------------------------------------------------------------------------------------------------------------------------------------+

The script reads the command Claude Code is about to run and asks three questions in a row. Is it curl? Is there a write method after `--request` or `-X`? Is it aimed at `admin.hlx.page` or `${BASE_URL}`? Three yeses and it answers `ask`, which puts the prompt in front of you. Anything else exits 0 with no output, and the command runs.

+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| Code                                                                                                                                                     |
+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| plugins/hlx-admin-api-executor-guarded/hooks/guard-admin-api.sh, lines 1 to 43                                                                           |
|                                                                                                                                                          |
| [cfb0f59 on GitHub](https://github.com/jackzhaojin/ai-builder-kit/blob/cfb0f59/plugins/hlx-admin-api-executor-guarded/hooks/guard-admin-api.sh#L1-L46)   |
+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                                                      |
| #!/usr/bin/env bash                                                                                                                                      |
| # guard-admin-api.sh                                                                                                                                     |
| # PreToolUse hook: guards curl POST/PUT/DELETE/PATCH to admin.hlx.page                                                                                   |
| # Returns "ask" decision so Claude Code prompts user for yes/no approval.                                                                                |
| #                                                                                                                                                        |
| # Fails open: if parsing fails, the command is allowed through.                                                                                          |
|                                                                                                                                                          |
| set -euo pipefail                                                                                                                                        |
|                                                                                                                                                          |
| COMMAND=$(jq -r '.tool_input.command // ""')                                                                                                             |
|                                                                                                                                                          |
| # If extraction failed, allow (fail-open)                                                                                                                |
| if [ -z "$COMMAND" ]; then                                                                                                                               |
|   exit 0                                                                                                                                                 |
| fi                                                                                                                                                       |
|                                                                                                                                                          |
| # Check for destructive curl targeting admin.hlx.page or ${BASE_URL}                                                                                     |
| IS_DESTRUCTIVE=false                                                                                                                                     |
|                                                                                                                                                          |
| if echo "$COMMAND" \| grep -qiE 'curl\b'; then                                                                                                           |
|   if echo "$COMMAND" \| grep -qiE '(--request\|-X)\s\+(POST\|PUT\|DELETE\|PATCH)'; then                                                                  |
|     if echo "$COMMAND" \| grep -qiE '(admin\.hlx\.page\|\$\{?BASE_URL\}?)'; then                                                                         |
|       IS_DESTRUCTIVE=true                                                                                                                                |
|     fi                                                                                                                                                   |
|   fi                                                                                                                                                     |
| fi                                                                                                                                                       |
|                                                                                                                                                          |
| if [ "$IS_DESTRUCTIVE" = true ]; then                                                                                                                    |
|   METHOD=$(echo "$COMMAND" \| grep -oiE '(--request\|-X)\s\+(POST\|PUT\|DELETE\|PATCH)' \| head -1 \| awk '{print toupper($NF)}')                        |
|   URL_TARGET=$(echo "$COMMAND" \| grep -oiE '(admin\.hlx\.page\|BASE_URL)[^ ]*' \| head -1)                                                              |
|                                                                                                                                                          |
|   jq -n \                                                                                                                                                |
|     --arg method "$METHOD" \                                                                                                                             |
|     --arg target "${URL_TARGET:-admin.hlx.page}" \                                                                                                       |
|     '{                                                                                                                                                   |
|       hookSpecificOutput: {                                                                                                                              |
|         hookEventName: "PreToolUse",                                                                                                                     |
|         permissionDecision: "ask",                                                                                                                       |
|         permissionDecisionReason: ("[HLX Admin API Guard] " \+ $method \+ " request to " \+ $target \+ ". This is a destructive admin API operation. Ap |
| prove?")                                                                                                                                                 |
|       }                                                                                                                                                  |
|     }'                                                                                                                                                   |
|   exit 0                                                                                                                                                 |
| fi                                                                                                                                                       |
| ```                                                                                                                                                      |
+----------------------------------------------------------------------------------------------------------------------------------------------------------+

Those three checks are regular expressions, so they decide what gets stopped. Below, pick a command (or edit one) to see which checks it passes and whether Claude Code would stop for approval. The first two are from the demo. The last two still write to the Admin API, and the hook lets them through, which is why I call it a guardrail for the skill's own commands and not a security boundary.

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-4 |
+---------+--------+

---

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Explainer (hook guard)                                                                                                                                                                                                                                                                           |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| The hook's three checks, run in your browser (ported from guard-admin-api.sh at cfb0f59)                                                                                                                                                                                                         |
|                                                                                                                                                                                                                                                                                                  |
| [source](https://github.com/jackzhaojin/ai-builder-kit/blob/cfb0f59/plugins/hlx-admin-api-executor-guarded/hooks/guard-admin-api.sh#L17-L43)                                                                                                                                                     |
+------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------+
| The skill's GET                                                                                | ```                                                                                            | A read. Nothing changes on the site, so there is                                               |
|                                                                                                | curl -s --request GET \                                                                        | nothing to approve.                                                                            |
|                                                                                                |   --url "${BASE_URL}/config/${ORG}/sites/${SITE}.json" \                                       |                                                                                                |
|                                                                                                |   --header "X-Auth-Token: ${AUTH_TOKEN}" \                                                     |                                                                                                |
|                                                                                                |   -o execution-files/step-1.1-get-site-config-response.json \                                  |                                                                                                |
|                                                                                                |   -w "%{http_code}"                                                                            |                                                                                                |
|                                                                                                | ```                                                                                            |                                                                                                |
+------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------+
| The POST from my demo                                                                          | ```                                                                                            | This is the write from the video. Claude Code stops and                                        |
|                                                                                                | curl -s --request POST \                                                                       | asks, even in bypass permissions mode.                                                         |
|                                                                                                |   --url "${BASE_URL}/config/${ORG}/sites/${SITE}/robots.txt" \                                 |                                                                                                |
|                                                                                                |   --header "Content-Type: text/plain" \                                                        |                                                                                                |
|                                                                                                |   --header "X-Auth-Token: ${AUTH_TOKEN}" \                                                     |                                                                                                |
|                                                                                                |   --data-binary @execution-files/step-3.1-set-robots-txt-request.txt \                         |                                                                                                |
|                                                                                                |   -o execution-files/step-3.2-set-robots-txt-response.txt \                                    |                                                                                                |
|                                                                                                |   -w "%{http_code}"                                                                            |                                                                                                |
|                                                                                                | ```                                                                                            |                                                                                                |
+------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------+
| A POST to da.live                                                                              | ```                                                                                            | A write, but to the DA content API on admin.da.live,                                           |
|                                                                                                | curl -X POST "https://admin.da.live/source/my-org/my-site/index.html" -F "data=@index.html"    | which this hook does not cover. The guard only watches                                         |
|                                                                                                | ```                                                                                            | the Edge Delivery Admin API.                                                                   |
+------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------+
| POST written as -XPOST                                                                         | ```                                                                                            | This still sends a POST to the Admin API. The pattern                                          |
|                                                                                                | curl -XPOST "https://admin.hlx.page/config/my-org/sites/my-site/robots.txt"                    | expects a space after -X, so the hook misses it.                                               |
|                                                                                                | ```                                                                                            |                                                                                                |
+------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------+
| POST from --data alone                                                                         | ```                                                                                            | curl sends a POST whenever there is a body, even with                                          |
|                                                                                                | curl --data-binary @robots.txt "https://admin.hlx.page/config/my-org/sites/my-site/robots.txt" | no method named. No --request or -X, so the hook misses                                        |
|                                                                                                | ```                                                                                            | it.                                                                                            |
+------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------+
| The command Claude Code is about to run (you can edit it)                                                                                                                                                                                                                                        |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 1. **Is it curl?** `grep -qiE 'curl\b'`                                                                                                                                                                                                                                                          |
| 2. **A write method after `--request` or `-X`?** POST, PUT, DELETE or PATCH, any case                                                                                                                                                                                                            |
| 3. **Aimed at the Admin API?** `admin.hlx.page` or `${BASE_URL}`                                                                                                                                                                                                                                 |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| The POST from my demo matches all three checks, so the hook answers **ask** and Claude Code stops for approval. Of the other presets, the GET and the POST to da.live are allowed by design, while `-XPOST` and `--data` with no method are writes to the Admin API that the hook lets through.  |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| A port of the script's three checks to JavaScript. Every preset was also run through the real script with `jq` and gets the same answer.                                                                                                                                                         |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

The hook matches the way the skill writes commands. The skill's conventions say to always spell out `--request METHOD`, so every write the skill makes gets caught. A command written another way, like `-XPOST` with no space, or `--data` with no method at all, which curl sends as a POST, goes straight through. The README says it plainly too: the hook fails open. Treat it as a guardrail for the skill's own commands.

Watch this part [4:22 The hook stops the POST](https://youtu.be/ojlh7o_3U9w?t=262)

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | guard-lab |
+---------+-----------+

---

## Planning, no-judgment questions and a self-documenting record

Now that the demo's over, this thing really has three benefits for me.

First, it plans. Humans plan, and AI plans. It's good to always plan with someone, and AI is great for that. It researches the current state, drafts the change and waits for my approval. Having someone to plan with, even an AI, catches things you'd miss on your own.

Second, you can ask really basic questions, even dumb questions, and AI doesn't judge you.

Third, the whole process is self-documenting. Every session gets a dated folder with an `EXECUTION.md` and every request and response saved as a file, and the checklist gets ticked off as it goes:

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                     |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![The EXECUTION.md diff in Claude Code: step 4 result HTTP 200, content matches the step 3 request payload, update verified, and the completion checklist with all four steps checked: GET config versions, GET robots.txt before, POST robots.txt update human-approved, GET robots.txt after to verify.][image7] |
|                                                                                                                                                                                                                                                                                                                    |
| The execution log updating itself at the end of the run: four steps, all checked, the POST marked as human-approved.                                                                                                                                                                                               |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Now imagine six sites with three environments each. That's 18 configurations to track. Who configured what, and when? Very confusing. With a tool like this, all your executions live in one place. This was just my local environment, certainly not a client thing, but picture a real client with three or four EDS sites and three or four environments each.

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board, native)                                                                                                                                                                                                                                          |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![VS Code file tree: an api-test-2026-03-22 folder holding dated execution folders, 2026-03-22-robots-simplify-and-versions with execution-files, .env-setup.sh and EXECUTION.md, plus robots-txt-update-2 through 5 and site-audit-and-robots-update.][image8] |
|                                                                                                                                                                                                                                                                 |
| One folder per session, all from the same day of testing.                                                                                                                                                                                                       |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

The last thing I demoed: say you need to give a KT session or a report. I asked it to look through everything I'd done in that folder and put together a summary. It read the execution folders and gave me an activity report: the two sites it found in my org, then six rounds of robots.txt changes and what each round changed.

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                                                                              |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Claude Code output: Activity Report, 2026-03-22, site eds-doc-authoring, org jackzhaojin. Site audit and discovery found two sites. Robots.txt iterations: six rounds in a table, from initial setup with comments and Allow slash, through adding a sitemap directive and crawl delays of 10, 5 and 3, to today's final change that removed Disallow sitemap and Crawl-delay 3.][image9] |
|                                                                                                                                                                                                                                                                                                                                                                                             |
| A report written from the saved executions, with no extra effort from me.                                                                                                                                                                                                                                                                                                                   |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

That's a lot of manual work people don't generally want to do. Compared with Postman, or one-off windows across many environments, this keeps things organized without effort. On top of the research, the no-judgment questions and the safety, it's like having a buddy: it reviews your changes and you review its changes.

Watch this part [5:30 It plans with you](https://youtu.be/ojlh7o_3U9w?t=330) [5:45 No judgment](https://youtu.be/ojlh7o_3U9w?t=345) [6:10 Self-documenting](https://youtu.be/ojlh7o_3U9w?t=370) [6:47 The report](https://youtu.be/ojlh7o_3U9w?t=407)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-5 |
+---------+--------+

---

## Install the guarded plugin or copy the skill

It's open source in my [AI Builder Kit](https://github.com/jackzhaojin/ai-builder-kit) repo, in two forms. For the full, guarded experience, install the plugin: add my repository as a marketplace in Claude Code, then install `hlx-admin-api-executor-guarded` from it. The README has both ways to add the marketplace; this is the settings one:

+---------------------------------------------------------------------------------------------------+
| Code                                                                                              |
+---------------------------------------------------------------------------------------------------+
| README.md, adding the marketplace to \~/.claude/settings.json                                     |
|                                                                                                   |
| [cfb0f59 on GitHub](https://github.com/jackzhaojin/ai-builder-kit/blob/cfb0f59/README.md#L21-L33) |
+---------------------------------------------------------------------------------------------------+
| ```                                                                                               |
| {                                                                                                 |
|   "extraKnownMarketplaces": {                                                                     |
|     "ai-builder-kit": {                                                                           |
|       "source": {                                                                                 |
|         "source": "git",                                                                          |
|         "url": "https://github.com/jackzhaojin/ai-builder-kit.git"                                |
|       }                                                                                           |
|     }                                                                                             |
|   }                                                                                               |
| }                                                                                                 |
| ```                                                                                               |
+---------------------------------------------------------------------------------------------------+

If you don't want the guarded experience, say you don't run with bypass permissions and you're happy with Claude Code's default prompts, you can just copy the [skill folder](https://github.com/jackzhaojin/ai-builder-kit/tree/cfb0f59/skills/hlx-admin-api-executor) into your skills. It works with Claude Code, Codex or GitHub Copilot, whatever you choose to use. The hook is the part that's specific to Claude Code.

Watch this part [0:41 Plugin or skill](https://youtu.be/ojlh7o_3U9w?t=41) [8:08 Open source on GitHub](https://youtu.be/ojlh7o_3U9w?t=488)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-6 |
+---------+--------+

---

## What works and the limits to know

The workflow does what I wanted: a plan before anything runs, a GET before every change, a review I have to read, a hard stop before every write, and a record of all of it I can turn into a report.

There are limits. The hook catches the commands the skill writes, not every possible write to the Admin API, and it fails open. I ran all of this against my own test site on my laptop, not a client program. And the review still depends on the human actually reading it.

Where I'd like this to go is more systems that are agentic on the other end, software an agent can interact with directly. My side is very agentic; there's nothing agentic on the other end yet. If you use this skill on a real program, let me know how it goes.

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-7 |
+---------+--------+

---

## Related

+----------------------------------------------------------------------------------------------------------------------------------------------+
| Row List                                                                                                                                     |
+-----------+-------------------------------------------------------------------------------------------+--------------------------------------+
| Portfolio | [AI Builder Kit](/portfolio/ai-builder-kit/)                                              | The marketplace this skill shipped   |
|           |                                                                                           | in, and the skills that came after   |
|           |                                                                                           | it.                                  |
+-----------+-------------------------------------------------------------------------------------------+--------------------------------------+
| Article   | [Building an MCP Server for EDS da.live](/writing/2025-10-05-mcp-server-for-eds-da-live/) | An agent on a different EDS API,     |
|           |                                                                                           | where the order of calls was left to |
|           |                                                                                           | the model.                           |
+-----------+-------------------------------------------------------------------------------------------+--------------------------------------+

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

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Metadata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| title                   | EDS Admin API Config with an Agent and a Hard Stop \| Jack Jin                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| description             | An agent skill for the Edge Delivery Admin API: it plans, GETs before it POSTs, and a hook stops its writes for approval, even in bypass mode.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| template                | article                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image                   | ![The change review from the video: why, what and how for a robots.txt POST to the Edge Delivery Admin API, with the exact curl command.][image10]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image:alt               | The change review from the video: why, what and how for a robots.txt POST to the Edge Delivery Admin API, with the exact curl command.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| published-time          | 2026-03-23                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| modified-time           | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| json-ld                 | {"@context":"https\://schema.org","@graph":\[{"@type":"Person","@id":"https\://www\.jackzhaojin.com/#person","name":"Jack Jin","url":"https\://www\.jackzhaojin.com/","jobTitle":"Associate Director","worksFor":{"@type":"Organization","name":"Accenture","department":{"@type":"Organization","name":"Adobe Business Group"}},"sameAs":\["https\://www\.linkedin.com/in/jackjin","https\://github.com/jackzhaojin","https\://www\.youtube.com/@jackjin8467","https\://www\.credly.com/users/jack-jin"],"award":\["Adobe Experience Manager Champion, class of 2026-2027","AEM Rockstar winner, Adobe Summit                                                                                       |
|                         | 2024"]},{"@type":"WebSite","@id":"https\://www\.jackzhaojin.com/#website","url":"https\://www\.jackzhaojin.com/","name":"Jack Jin","publisher":{"@id":"https\://www\.jackzhaojin.com/#person"}},{"@type":"TechArticle","@id":"https\://www\.jackzhaojin.com/writing/2026-03-23-eds-hlx-admin-agentic-config/#article","headline":"Agentic Admin API Configuration for Edge Delivery Services: GET Before POST, With a Hard Stop","description":"An agent skill for the Edge Delivery Admin API: it plans, GETs before it POSTs, and a hook stops its writes for approval, even in bypass                                                                                                             |
|                         | mode.","author":{"@id":"https\://www\.jackzhaojin.com/#person"},"publisher":{"@id":"https\://www\.jackzhaojin.com/#person"},"image":"https\://www\.jackzhaojin.com/writing/2026-03-23-eds-hlx-admin-agentic-config/media\_12a7353ad37df185964025c0763053a6d0f385a2c.jpg","mainEntityOfPage":"https\://www\.jackzhaojin.com/writing/2026-03-23-eds-hlx-admin-agentic-config/","isPartOf":{"@id":"https\://www\.jackzhaojin.com/#website"},"about":\["Edge Delivery Services","AEM Admin API","Claude Code hooks","Agent                                                                                                                                                                               |
|                         | skills"],"datePublished":"2026-03-23","dateModified":"2026-10-04","inLanguage":"en","video":{"@id":"https\://www\.jackzhaojin.com/writing/2026-03-23-eds-hlx-admin-agentic-config/#video"}},{"name":"I built an agentic workflow for Helix admin API config","description":"An AI-powered config tool for the Helix admin API that plans changes, enforces review gates, and documents everything it                                                                                                                                                                                                                                                                                                 |
|                         | does.","thumbnailUrl":"https\://www\.jackzhaojin.com/writing/2026-03-23-eds-hlx-admin-agentic-config/media\_12a7353ad37df185964025c0763053a6d0f385a2c.jpg","uploadDate":"2026-04-18T15:40:04Z","duration":"PT9M6S","embedUrl":"https\://www\.youtube-nocookie.com/embed/ojlh7o\_3U9w","@type":"VideoObject","@id":"https\://www\.jackzhaojin.com/writing/2026-03-23-eds-hlx-admin-agentic-config/#video"},{"@type":"BreadcrumbList","@id":"https\://www\.jackzhaojin.com/writing/2026-03-23-eds-hlx-admin-agentic-config/#breadcrumb","itemListElement":\[{"@type":"ListItem","position":1,"name":"Home","item":"https\://www\.jackzhaojin.com/"},{"@type":"ListItem","position":2,"name":"Technical |
|                         | Writing","item":"https\://www\.jackzhaojin.com/writing/"},{"@type":"ListItem","position":3,"name":"Agentic Admin API Configuration","item":"https\://www\.jackzhaojin.com/writing/2026-03-23-eds-hlx-admin-agentic-config/"}]}]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| og:image:alt            | The change review from the video: why, what and how for a robots.txt POST to the Edge Delivery Admin API, with the exact curl command.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:published\_time | 2026-03-23                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:modified\_time  | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:author          | https\://www\.jackzhaojin.com/                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-summary         | Move Edge Delivery Admin API config out of Postman and into an agent skill that plans, GETs before it POSTs, and hits a Claude Code hook that stops its writes for approval. The demo, the hook's code, and a lab that shows exactly what it catches and what it misses.                                                                                                                                                                                                                                                                                                                                                                                                                             |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-image           | https\://www\.jackzhaojin.com/writing/media\_12a7353ad37df185964025c0763053a6d0f385a2c.jpg?width=750\&format=jpg\&optimize=medium                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-topics          | Adobe AEM & EDS\|AI Engineering                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-reading-time    | 10 min read                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-video-time      | 9:06 video                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-url       | https\://youtu.be/ojlh7o\_3U9w                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-label     | Watch on YouTube                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-keywords        | aem admin api admin.hlx.page helix 5 edge delivery services robots.txt claude code pretooluse hook bypass permissions agent skills plugin marketplace get/set/get execution.md tools.aem.live postman                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_1e620505667d6c107882f94271f875d4bb9e17f2d.jpg#width=144&height=92

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_14ebe9adaa69a07f980d8d9c2c21059be20f78f87.jpg#width=144&height=92

[image2]: https://main--www-eds--jackzhaojin.aem.page/media_1c6ba29c84e1121d7a7ea756647d0865216d88391.jpg#width=144&height=92

[image3]: https://main--www-eds--jackzhaojin.aem.page/media_19c2622ba68e6fe19a8413dae6cc3654bbec7f784.jpg#width=144&height=92

[image4]: https://main--www-eds--jackzhaojin.aem.page/media_10ee7b04ff0a45c6704015a31797ff2ee45aff34f.jpg#width=1360&height=240

[image5]: https://main--www-eds--jackzhaojin.aem.page/media_136c26bfadc1d68ec3c6c5e4ceddced700f41a8ee.jpg#width=1340&height=790

[image6]: https://main--www-eds--jackzhaojin.aem.page/media_1697b2d5eed8fd71ef61801661b805f53e7a6dbe6.jpg#width=1340&height=420

[image7]: https://main--www-eds--jackzhaojin.aem.page/media_1f2d8d5ba966e65742b1ed720a0108beeb57e693a.jpg#width=1600&height=467

[image8]: https://main--www-eds--jackzhaojin.aem.page/media_1d15baefed6d9a80a42663640a2f7bed7eb88667f.jpg#width=690&height=280

[image9]: https://main--www-eds--jackzhaojin.aem.page/media_1073aa5d2ffa625be3cc4f7a1b64de09ec0304553.jpg#width=1222&height=588

[image10]: https://main--www-eds--jackzhaojin.aem.page/media_12a7353ad37df185964025c0763053a6d0f385a2c.jpg#width=1280&height=720
