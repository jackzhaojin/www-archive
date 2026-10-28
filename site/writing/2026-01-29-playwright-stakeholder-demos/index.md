1. [Home](/)
2. [Technical Writing](/writing/)
3. Playwright Stakeholder Demos

# Playwright Stakeholder Demos: Captions Timed to Each Click and a Voice the Video Waits For

By [Jack Jin](/) · January 29, 2026 · Updated October 4, 2026 · 8 min read · Includes my 1:33 video

When AI builds more than you can keep track of, have it demo the work back to you. This is the pipeline my harness used on a React dashboard it built: Playwright scripts that click through the real app, a caption overlay injected right before each action, video recorded at the viewport size, and a merge step that holds the video on a frame until each voice clip finishes. With the code at the commits that built it.

---

+----------------------------------------------------------------------------------+
| Rail                                                                             |
+---------------------------------------+------------------------------------------+
|                                       | **Since then**\                          |
|                                       | [What changed since January](#changed)   |
+---------------------------------------+------------------------------------------+
| ![][image0]                           | **Part 1**\                              |
|                                       | [More than you can track](#part-1)       |
+---------------------------------------+------------------------------------------+
|                                       | **Part 2**\                              |
|                                       | [Asking the harness for a demo](#part-2) |
+---------------------------------------+------------------------------------------+
| ![][image1]                           | **Part 3**\                              |
|                                       | [Captions before each click](#part-3)    |
+---------------------------------------+------------------------------------------+
| ![][image2]                           | **Part 4**\                              |
|                                       | [A voice the video waits for](#part-4)   |
+---------------------------------------+------------------------------------------+
| ![][image3]                           | **Part 5**\                              |
|                                       | [Demo prep found bugs](#part-5)          |
+---------------------------------------+------------------------------------------+
|                                       | **Wrap-up**\                             |
|                                       | [Lessons and limits](#part-6)            |
+---------------------------------------+------------------------------------------+
| [Watch the video, 1:33](#video)                                                  |
|                                                                                  |
| [Code on GitHub](https://github.com/jackzhaojin/harness-v2-test/tree/fc9e09c)    |
+----------------------------------------------------------------------------------+

---

+---------------------------------------------------------------------------------------------------------------------+
| Figure                                                                                                              |
+---------------------------------------------------------------------------------------------------------------------+
| [AI Built the Product and Demoed It Back to Me with Playwright](https://youtu.be/W1wD5tKoF3M)                       |
|                                                                                                                     |
| The highlights cut, made January 31, 2026: the captioned Playwright recording with a generated voice and background |
| music added. Nobody is on camera; the demo presents itself. Or [watch it on YouTube](https://youtu.be/W1wD5tKoF3M). |
+---------------------------------------------------------------------------------------------------------------------+

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Fine Print                                                                                                                                                                                                                   |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| First published on LinkedIn on January 29, 2026. Rewritten for this site in October 2026. Code: [harness-v2-test](https://github.com/jackzhaojin/harness-v2-test/tree/fc9e09c) at `fc9e09c`, branch `feature/dashboard-mvp`. |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| id      | video  |
+---------+--------+

---

## What changed since January

In June 2026 the pipeline on this page became a reusable skill, [`playwright-demo-video`](https://github.com/jackzhaojin/ai-builder-kit/tree/2497dd7/skills/playwright-demo-video) in my public ai-builder-kit. Two lessons from January went into it. The voice timings in January were estimates, traced from the wait calls in the script; the skill records exact timestamps while the spec runs. And it adds a data check before any narration gets written, because, in the skill's own words, "you cannot narrate what doesn't exist." The [portfolio entry](/portfolio/ai-builder-kit/#p-kit-video) has the later demo.

+-------------------+
| Section Metadata  |
+---------+---------+
| id      | changed |
+---------+---------+

---

## 1. When AI builds more than you can keep track of

AI builds so much now that I can't track all the features. By late January I had ten product specs going across AEM Edge Delivery Services, da.live, React and platforms I had never coded in before. The specs are complex, they take iterations, and I don't remember what we decided on half of them. No one person can memorize all of it.

Reading the code and the test results didn't scale either. I needed to see it run. So I had AI demo its own work back to me: a live Playwright demo with captions, the way a team shows its work at the end of a sprint.

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                               |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![ProjectHub dashboard: four stat cards (10 projects, 13 active tasks, 8 team members, 4 completed this week), a task completions line chart and a tasks by status donut chart, with the caption Welcome to ProjectHub, a modern project management dashboard, burned into the bottom of the frame.][image4] |
|                                                                                                                                                                                                                                                                                                              |
| The first frame of the demo. The app is ProjectHub, a project management dashboard my harness built: React 18, TypeScript and Tailwind CSS, no backend. The caption at the bottom is part of the recording.                                                                                                  |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

The app in this video is the test project for my generic harness, the one I used to try out version two of it. The dashboard came out of a 24-task harness run that finished on January 29. A harness, in my vocabulary, is a program that plans the work into tasks and runs a research, build and validate loop on each one without me in the chair.

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-1 |
+---------+--------+

---

## 2. Asking the harness for a demo, as an enhancement

The demo went into the harness as an enhancement to the existing build, not a fresh start. This is the input I gave it, close to word for word:

> Why: so I can show a demo of this thing to others and have AI always drive it and fix it as needed. What: a Playwright headful script with a combined voice-over script with timing. How: Playwright headful script, just markdown for voice-over for now. It should show off all the work the agent has done! If we have defects with functionality we should fix it, or fix the demo.

I asked it to ask me three questions first. I answered natural pace, a harness enhancement task, and two versions: get a highlights reel working first, then build a full tour. Then I added a research requirement, so the harness would spend cycles on Playwright best practices for headed demos before writing any script: demo patterns, drag-and-drop reliability, pacing, viewport resizing, selector strategy and the Playwright config itself.

The harness planned three new tasks on top of the existing ones. All three passed on the first attempt, about an hour in total, per the run's [progress log](https://github.com/jackzhaojin/harness-v2-test/blob/03c009e/ai-docs/SPEC/PROGRESS_LOG.md):

+----------------------------------------------------------------------------------------------------------------------+
| Data Table (nowrap)                                                                                                  |
+------+------------------------------------------------------------------------------------------------------+--------+
| Task | What it built                                                                                        | Time   |
+------+------------------------------------------------------------------------------------------------------+--------+
| 20   | Demo infrastructure: a demo Playwright config, shared helpers                                        | 16 min |
|      | for pacing, scrolling, viewport and drag-and-drop, and `data-testid` attributes for stable selectors |        |
+------+------------------------------------------------------------------------------------------------------+--------+
| 21   | The highlights demo script with a voice-over document, plus app fixes found along the way            | 20 min |
+------+------------------------------------------------------------------------------------------------------+--------+
| 22   | The full tour demo script with its voice-over document                                               | 19 min |
+------+------------------------------------------------------------------------------------------------------+--------+

Then I watched both demos run. I asked for the full tour to be longer and to show every page in mobile view, because I was hoping for something closer to four minutes. After five test runs it landed at 3.7 minutes, and I said that was fine. That change is commit [`03c009e`](https://github.com/jackzhaojin/harness-v2-test/commit/03c009e).

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-2 |
+---------+--------+

---

## 3. Captions injected into the page right before each click

That evening a separate pass turned the voice-over markdown into a caption track that lives inside the page. The demo script injects one fixed `<div>` at the bottom of the viewport and swaps its text as it goes. If a navigation wipes the page, the next caption puts the overlay back:

+--------------------------------------------------------------------------------------------------------------------------------+
| Code (wrap)                                                                                                                    |
+--------------------------------------------------------------------------------------------------------------------------------+
| demo/highlights-with-captions.spec.ts, lines 47 to 60                                                                          |
|                                                                                                                                |
| [fc9e09c on GitHub](https://github.com/jackzhaojin/harness-v2-test/blob/fc9e09c/demo/highlights-with-captions.spec.ts#L47-L60) |
+--------------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                            |
| /** Show caption text. Persists until next show or hide. Re-injects overlay if lost after navigation. */                       |
| async function showCaption(page: Page, text: string): Promise<void> {                                                          |
|   await page.evaluate(([t, css]: string[]) => {                                                                                |
|     let el = document.getElementById('demo-caption');                                                                          |
|     if (!el) {                                                                                                                 |
|       el = document.createElement('div');                                                                                      |
|       el.id = 'demo-caption';                                                                                                  |
|       el.style.cssText = css;                                                                                                  |
|       document.body.appendChild(el);                                                                                           |
|     }                                                                                                                          |
|     el.textContent = t;                                                                                                        |
|     el.style.opacity = '1';                                                                                                    |
|   }, [text, CAPTION_CSS]);                                                                                                     |
|   await page.waitForTimeout(300);                                                                                              |
| ```                                                                                                                            |
+--------------------------------------------------------------------------------------------------------------------------------+

Each caption goes up right before the action it describes, so the caption and the click stay in sync. Here is the Kanban part of the highlights script, the caption and then the drag:

+----------------------------------------------------------------------------------------------------------------------------------+
| Code (wrap)                                                                                                                      |
+----------------------------------------------------------------------------------------------------------------------------------+
| demo/highlights-with-captions.spec.ts, lines 236 to 245                                                                          |
|                                                                                                                                  |
| [fc9e09c on GitHub](https://github.com/jackzhaojin/harness-v2-test/blob/fc9e09c/demo/highlights-with-captions.spec.ts#L236-L245) |
+----------------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                              |
|   if (todoCount > 0) {                                                                                                           |
|     await showCaption(page, 'Moving a task from To Do to In Progress.');                                                         |
|     await dragAndDrop(                                                                                                           |
|       page,                                                                                                                      |
|       '[data-testid="kanban-column-todo"] article[draggable="true"]:first-of-type',                                              |
|       '[data-testid="kanban-column-in-progress"]',                                                                               |
|       { steps: 15, holdMs: 150 },                                                                                                |
|     );                                                                                                                           |
|     await scenicPause(page, 1800);                                                                                               |
|   }                                                                                                                              |
| ```                                                                                                                              |
+----------------------------------------------------------------------------------------------------------------------------------+

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                           |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![ProjectHub Tasks page with To Do, In Progress and Done columns of task cards, and the caption The Kanban board, drag-and-drop task management, at the bottom.][image5] |
|                                                                                                                                                                          |
| The Kanban board in the recording. The drag uses a helper that moves the mouse in 15 steps with a short hold, so a viewer can follow the card.                           |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

The recording comes from Playwright's built-in video capture. A third config runs the captioned scripts headless at 1280 by 800, with the video size matching the viewport, so there is no browser chrome in the frame:

+---------------------------------------------------------------------------------------------------------------------+
| Code (wrap)                                                                                                         |
+---------------------------------------------------------------------------------------------------------------------+
| playwright.video.config.ts, lines 36 to 44                                                                          |
|                                                                                                                     |
| [fc9e09c on GitHub](https://github.com/jackzhaojin/harness-v2-test/blob/fc9e09c/playwright.video.config.ts#L36-L44) |
+---------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                 |
|     /* Record video at full viewport resolution */                                                                  |
|     video: {                                                                                                        |
|       mode: 'on',                                                                                                   |
|       size: { width: 1280, height: 800 },                                                                           |
|     },                                                                                                              |
|                                                                                                                     |
|     /* Match the video size */                                                                                      |
|     viewport: { width: 1280, height: 800 },                                                                         |
|                                                                                                                     |
| ```                                                                                                                 |
+---------------------------------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-3 |
+---------+--------+

---

## 4. Adding a voice track the video waits for

Two days later I wanted the highlights reel to talk. Each of the 21 captions became its own voice clip from ElevenLabs, a text-to-speech service. Then the clips had to land on the video. The first script placed each clip at its caption's time with ffmpeg delays and printed a warning whenever a clip overlapped the next one.

The fix in `merge-highlights-v2.mjs` was to make the video wait for the voice, never the other way around. A clip starts half a second before its caption, clips never overlap, and there is at least 0.3 seconds of silence between them. When a clip would have to start before the previous one ends, the merge holds the video on one frame for as long as needed:

+----------------------------------------------------------------------------------------------------------------------------------+
| Code (wrap)                                                                                                                      |
+----------------------------------------------------------------------------------------------------------------------------------+
| demo/pipeline/merge-highlights-v2.mjs, lines 107 to 133                                                                          |
|                                                                                                                                  |
| [fc9e09c on GitHub](https://github.com/jackzhaojin/harness-v2-test/blob/fc9e09c/demo/pipeline/merge-highlights-v2.mjs#L107-L133) |
+----------------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                              |
| function calculateFreezes() {                                                                                                    |
|   let videoShift = 0;   // cumulative freeze time inserted                                                                       |
|   let prevEnd = -Infinity;                                                                                                       |
|   const freezes = [];                                                                                                            |
|                                                                                                                                  |
|   for (const cap of CAPTIONS) {                                                                                                  |
|     const visualNew = cap.startSec \+ videoShift;                                                                                |
|     let idealStart = visualNew \+ AUDIO_SHIFT;                                                                                   |
|     const earliest = prevEnd \+ MIN_GAP;                                                                                         |
|                                                                                                                                  |
|     if (idealStart < earliest) {                                                                                                 |
|       // Need a freeze frame to let previous clip finish                                                                         |
|       const freezeDur = Math.ceil((earliest - idealStart) * 10) / 10; // round up to 0.1s                                        |
|       freezes.push({                                                                                                             |
|         originalTime: cap.startSec,  // where to freeze in the source video                                                      |
|         duration: freezeDur,                                                                                                     |
|       });                                                                                                                        |
|       videoShift \+= freezeDur;                                                                                                  |
|       idealStart = earliest;                                                                                                     |
|     }                                                                                                                            |
|                                                                                                                                  |
|     cap.newAudioStart = Math.max(idealStart, 0);                                                                                 |
|     prevEnd = cap.newAudioStart \+ cap.audioDuration;                                                                            |
|   }                                                                                                                              |
|                                                                                                                                  |
|   return freezes;                                                                                                                |
| }                                                                                                                                |
| ```                                                                                                                              |
+----------------------------------------------------------------------------------------------------------------------------------+

Below is that same walk with the real numbers: the script's 21 caption times and the lengths of the 21 voice clips committed in the repo. The striped blocks on the video lane are the held frames, each one a place where the previous clip is still talking when the next caption comes up. Slide the voice faster and most of the holds go away. Slide it slower and they pile up.

+-----------------------------------------------------------------------------------------------------------------------+
| Explainer (freezeframe)                                                                                               |
+-----------------------------------------------------------------------------------------------------------------------+
| Held frames · the rule from merge-highlights-v2.mjs, with the real clip lengths                                       |
|                                                                                                                       |
| [source](https://github.com/jackzhaojin/harness-v2-test/blob/fc9e09c/demo/pipeline/merge-highlights-v2.mjs#L107-L133) |
+---------------------------------------+-------------------------------------------------------------------------------+
| **Voice speed**                       | Back to the recorded clips                                                    |
+---------------------------------------+-------------------------------------------------------------------------------+
| - Video                               | - recorded video                                                              |
| - Voice                               | - held frame                                                                  |
|                                       | - voice clip                                                                  |
+---------------------------------------+-------------------------------------------------------------------------------+
| With the clips as recorded, the merge holds the video 7 times, 7.6 s in total, so no clip ever talks over the next    |
| caption.                                                                                                              |
|                                                                                                                       |
| 1. 0.5 s before caption 2, "Interactive stat cards show key metrics at a glance.", at 0:05.5 in the recording         |
| 2. 2.2 s before caption 8, "Real-time filtering as you type.", at 0:27.0 in the recording                             |
| 3. 0.7 s before caption 12, "The Kanban board, drag-and-drop task management.", at 0:41.5 in the recording            |
| 4. 0.6 s before caption 14, "And from In Progress to Done.", at 0:50.0 in the recording                               |
| 5. 1.1 s before caption 19, "Tablet, the sidebar collapses to icons.", at 1:15.0 in the recording                     |
| 6. 1.1 s before caption 20, "Back to desktop, full layout restored.", at 1:17.5 in the recording                      |
| 7. 1.4 s before caption 21, the outro, at 1:19.5 in the recording                                                     |
+-----------------------------------------------------------------------------------------------------------------------+
| - recorded: 84                                                                                                        |
| - gap: 0.3                                                                                                            |
| - shift: -0.5                                                                                                         |
+---------------------------------------+---------------------------------------+---------------------------------------+
| 1.4                                   | 4.226                                 | Welcome to ProjectHub, a modern       |
|                                       |                                       | project management dashboard.         |
+---------------------------------------+---------------------------------------+---------------------------------------+
| 5.5                                   | 3.529                                 | Interactive stat cards show key       |
|                                       |                                       | metrics at a glance.                  |
+---------------------------------------+---------------------------------------+---------------------------------------+
| 9.7                                   | 2.74                                  | Data visualization powered by         |
|                                       |                                       | Recharts.                             |
+---------------------------------------+---------------------------------------+---------------------------------------+
| 12.8                                  | 2.926                                 | Hover tooltips reveal exact data      |
|                                       |                                       | points.                               |
+---------------------------------------+---------------------------------------+---------------------------------------+
| 17                                    | 3.483                                 | The activity feed tracks team actions |
|                                       |                                       | in real time.                         |
+---------------------------------------+---------------------------------------+---------------------------------------+
| 21.5                                  | 2.647                                 | Next, the Projects page.              |
+---------------------------------------+---------------------------------------+---------------------------------------+
| 24.5                                  | 4.319                                 | Search, sorting, and pagination, all  |
|                                       |                                       | built in.                             |
+---------------------------------------+---------------------------------------+---------------------------------------+
| 27                                    | 1.997                                 | Real-time filtering as you type.      |
+---------------------------------------+---------------------------------------+---------------------------------------+
| 30.5                                  | 2.694                                 | Sortable column headers toggle        |
|                                       |                                       | direction.                            |
+---------------------------------------+---------------------------------------+---------------------------------------+
| 34                                    | 2.694                                 | Creating a new project via modal      |
|                                       |                                       | form.                                 |
+---------------------------------------+---------------------------------------+---------------------------------------+
| 38.5                                  | 3.344                                 | Success, the new project appears      |
|                                       |                                       | instantly.                            |
+---------------------------------------+---------------------------------------+---------------------------------------+
| 41.5                                  | 3.529                                 | The Kanban board, drag-and-drop task  |
|                                       |                                       | management.                           |
+---------------------------------------+---------------------------------------+---------------------------------------+
| 47                                    | 3.251                                 | Moving a task from To Do to In        |
|                                       |                                       | Progress.                             |
+---------------------------------------+---------------------------------------+---------------------------------------+
| 50                                    | 2.322                                 | And from In Progress to Done.         |
+---------------------------------------+---------------------------------------+---------------------------------------+
| 53.5                                  | 3.994                                 | Dark mode, one click transforms the   |
|                                       |                                       | entire interface.                     |
+---------------------------------------+---------------------------------------+---------------------------------------+
| 59                                    | 2.926                                 | Every chart and card adapts to the    |
|                                       |                                       | dark palette.                         |
+---------------------------------------+---------------------------------------+---------------------------------------+
| 67.5                                  | 3.483                                 | Responsive design, from desktop to    |
|                                       |                                       | mobile.                               |
+---------------------------------------+---------------------------------------+---------------------------------------+
| 71.5                                  | 4.226                                 | Mobile at 375 pixels, everything      |
|                                       |                                       | adapts.                               |
+---------------------------------------+---------------------------------------+---------------------------------------+
| 75                                    | 3.344                                 | Tablet, the sidebar collapses to      |
|                                       |                                       | icons.                                |
+---------------------------------------+---------------------------------------+---------------------------------------+
| 77.5                                  | 3.111                                 | Back to desktop, full layout          |
|                                       |                                       | restored.                             |
+---------------------------------------+---------------------------------------+---------------------------------------+
| 79.5                                  | 7.848                                 | ProjectHub, React 18, TypeScript,     |
|                                       |                                       | Tailwind CSS. No backend required.    |
|                                       |                                       | Thanks for watching.                  |
+---------------------------------------+---------------------------------------+---------------------------------------+
| A simplified model of `calculateFreezes()`: the same walk, the script's settings (voice 0.5 s before its caption, 0.3 |
| s minimum gap), and a faster or slower voice modeled as proportionally shorter or longer clips. The caption times     |
| were estimates traced from the script's wait calls, the weak spot section 6 comes back to.                            |
+-----------------------------------------------------------------------------------------------------------------------+

The last step mixed in a royalty-free music track at about 15 percent volume, low enough to keep the voice on top. That is the cut in the video at the top of this page.

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-4 |
+---------+--------+

---

## 5. Demo prep found bugs, like a sprint demo does

The harness found and fixed bugs while it prepared the demo. When I first wrote this up I listed drag-and-drop issues and features that broke end to end. That is exactly what happens before a real sprint demo: the moment you have to show something live, you click the paths nobody clicked.

It was also in the plan. Task 21's acceptance criteria said that any app feature that fails during demo scripting gets fixed in the app's source code, with drag-and-drop, modals, the theme toggle and the responsive layout named. The change I can point to in the commit history is a small one. Toast notifications closed after 3 seconds, too fast to read at demo pace, so commit [`1ba8c6b`](https://github.com/jackzhaojin/harness-v2-test/commit/1ba8c6b) moved the auto-dismiss to 4.5 seconds. It's the kind of fix you only find by watching the demo.

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                 |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![The New Project modal over the Projects table, with Name, Status, Team Lead and Due Date fields and a Create Project button, and the caption Creating a new project via modal form.][image6] |
|                                                                                                                                                                                                |
| Creating a project in the demo. The success toast that follows is the one that had to stay on screen longer.                                                                                   |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-5 |
+---------+--------+

---

## 6. Lessons, and the limits of a generated demo

Here is what I took away in January:

- When AI builds enough volume, the presentation back to the stakeholder becomes the bottleneck. Reading code and test results doesn't scale. You need to see it run.
- Demo prep is its own quality gate, for the same reason it is on a human team.
- I'm the stakeholder now, not the builder. I set the goals across AEM, React and experimental platforms. AI executes, AI presents, and I decide what ships and what iterates.
- This works across what my harnesses produce, so every Edge Delivery site build can come with its own stakeholder demo that walks through every block, every breakpoint and every content interaction.

The limits, plainly. The harness wrote and ran the demo scripts; the caption, voice and music passes after that were separate sessions I asked for. The voice timings were estimates, so a clip could drift from its click, which is what the June skill fixed with recorded timestamps. And the app has no backend, so the demo shows seeded mock data, not a live system.

If you have shown a generated demo to a real stakeholder, I'd like to know whether they trusted it more or less than a person clicking through.

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-6 |
+---------+--------+

---

## Related

+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| Row List                                                                                                                                               |
+-----------+-------------------------------------------------------------------------------------------------------+------------------------------------+
| Portfolio | [AI Builder Kit: Playwright spec to narrated MP4](/portfolio/ai-builder-kit/#p-kit-video)             | Where this pipeline ended up, as a |
|           |                                                                                                       | skill anyone can install.          |
+-----------+-------------------------------------------------------------------------------------------------------+------------------------------------+
| Writing   | [Making AI-Driven Development Modules Reusable](/writing/2026-02-05-reusable-ai-development-modules/) | A week later: why I stopped        |
|           |                                                                                                       | rebuilding the harness for every   |
|           |                                                                                                       | pattern.                           |
+-----------+-------------------------------------------------------------------------------------------------------+------------------------------------+

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

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Metadata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| title                   | Playwright Stakeholder Demos: Captions, Voice, Freeze Frames \| Jack Jin                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| description             | Turn Playwright scripts into a stakeholder demo: a caption overlay timed to each click, video at the viewport size, and voice clips the video waits for.                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| template                | article                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image                   | ![The ProjectHub dashboard from the generated Playwright demo, with stat cards, two charts and the opening caption][image7]                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image:alt               | The ProjectHub dashboard from the generated Playwright demo, with stat cards, two charts and the opening caption                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| published-time          | 2026-01-29                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| modified-time           | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| json-ld                 | {"@context":"https\://schema.org","@graph":\[{"@type":"Person","@id":"https\://www\.jackzhaojin.com/#person","name":"Jack Jin","url":"https\://www\.jackzhaojin.com/","jobTitle":"Associate Director","worksFor":{"@type":"Organization","name":"Accenture","department":{"@type":"Organization","name":"Adobe Business Group"}},"sameAs":\["https\://www\.linkedin.com/in/jackjin","https\://github.com/jackzhaojin","https\://www\.youtube.com/@jackjin8467","https\://www\.credly.com/users/jack-jin"],"award":\["Adobe Experience Manager Champion, class of 2026-2027","AEM   |
|                         | Rockstar winner, Adobe Summit 2024"]},{"@type":"WebSite","@id":"https\://www\.jackzhaojin.com/#website","url":"https\://www\.jackzhaojin.com/","name":"Jack Jin","publisher":{"@id":"https\://www\.jackzhaojin.com/#person"}},{"@type":"TechArticle","@id":"https\://www\.jackzhaojin.com/writing/2026-01-29-playwright-stakeholder-demos/#article","headline":"Playwright Stakeholder Demos: Captions Timed to Each Click and a Voice the Video Waits For","description":"Turn Playwright scripts into a stakeholder demo: a caption overlay timed to each click, video at the    |
|                         | viewport size, and voice clips the video waits for.","author":{"@id":"https\://www\.jackzhaojin.com/#person"},"publisher":{"@id":"https\://www\.jackzhaojin.com/#person"},"image":"https\://www\.jackzhaojin.com/writing/2026-01-29-playwright-stakeholder-demos/media\_1fd2fbfc5c24a1d860b84a9a7aaa928a01e364bfc.jpg","mainEntityOfPage":"https\://www\.jackzhaojin.com/writing/2026-01-29-playwright-stakeholder-demos/","isPartOf":{"@id":"https\://www\.jackzhaojin.com/#website"},"about":\["Playwright","AI harness","Demo video automation","ElevenLabs text to             |
|                         | speech","ffmpeg"],"datePublished":"2026-01-29","dateModified":"2026-10-04","inLanguage":"en","video":{"@id":"https\://www\.jackzhaojin.com/writing/2026-01-29-playwright-stakeholder-demos/#video"}},{"@type":"VideoObject","@id":"https\://www\.jackzhaojin.com/writing/2026-01-29-playwright-stakeholder-demos/#video","name":"AI Built the Product and Demoed It Back to Me with Playwright","description":"My harness built a React dashboard, then generated Playwright scripts that click through it, a caption track timed to each action, and recorded the demo as         |
|                         | video.","thumbnailUrl":"https\://www\.jackzhaojin.com/writing/2026-01-29-playwright-stakeholder-demos/media\_1fd2fbfc5c24a1d860b84a9a7aaa928a01e364bfc.jpg","uploadDate":"2026-04-18T15:40:03Z","duration":"PT1M33S","embedUrl":"https\://www\.youtube-nocookie.com/embed/W1wD5tKoF3M"},{"@type":"BreadcrumbList","@id":"https\://www\.jackzhaojin.com/writing/2026-01-29-playwright-stakeholder-demos/#breadcrumb","itemListElement":\[{"@type":"ListItem","position":1,"name":"Home","item":"https\://www\.jackzhaojin.com/"},{"@type":"ListItem","position":2,"name":"Technical |
|                         | Writing","item":"https\://www\.jackzhaojin.com/writing/"},{"@type":"ListItem","position":3,"name":"Playwright Stakeholder Demos","item":"https\://www\.jackzhaojin.com/writing/2026-01-29-playwright-stakeholder-demos/"}]}]}                                                                                                                                                                                                                                                                                                                                                      |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| og:image:alt            | The ProjectHub dashboard from the generated Playwright demo, with stat cards, two charts and the opening caption                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:published\_time | 2026-01-29                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:modified\_time  | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:author          | https\://www\.jackzhaojin.com/                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-summary         | Have AI demo its own work back to you: Playwright scripts that click through the real app, a caption overlay injected right before each action, and a merge step that holds the video until each voice clip finishes. The code, and a lab for the freeze-frame rule.                                                                                                                                                                                                                                                                                                               |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-image           | https\://www\.jackzhaojin.com/writing/media\_1fd2fbfc5c24a1d860b84a9a7aaa928a01e364bfc.jpg?width=750\&format=jpg\&optimize=medium                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-topics          | AI Engineering                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-reading-time    | 8 min read                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-video-time      | 1:33 video                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-url       | https\://youtu.be/W1wD5tKoF3M                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-label     | Watch on YouTube                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-keywords        | playwright playwright video recording demo automation ai harness elevenlabs ffmpeg freeze frame stakeholder demo claude code react vite                                                                                                                                                                                                                                                                                                                                                                                                                                            |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_193c42b9cafd08c846ef902356a6db3e1dcceb110.png#width=144&height=92

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_140d83c1cd30ed8ea05236b6e93ba753ab371fa14.png#width=144&height=92

[image2]: https://main--www-eds--jackzhaojin.aem.page/media_1a3abe2113fbf65c282b642c70a50330b7cca9cc7.png#width=144&height=92

[image3]: https://main--www-eds--jackzhaojin.aem.page/media_1dd2cdb3eae4c526e0969058ad4321c4ad1df0fae.png#width=144&height=92

[image4]: https://main--www-eds--jackzhaojin.aem.page/media_187a2570a5173830882c5fee7e78bf4a2f9f3b86e.jpg#width=1280&height=800

[image5]: https://main--www-eds--jackzhaojin.aem.page/media_199f03b6dabd63712d02afae602bc70f150d01575.jpg#width=1280&height=800

[image6]: https://main--www-eds--jackzhaojin.aem.page/media_11f10dd5984ee8d77a07e6425915a50b915095be9.jpg#width=1280&height=800

[image7]: https://main--www-eds--jackzhaojin.aem.page/media_1fd2fbfc5c24a1d860b84a9a7aaa928a01e364bfc.jpg#width=1280&height=720
