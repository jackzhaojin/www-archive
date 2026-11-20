1. [Home](/)
2. [Technical Writing](/writing/)
3. Sites and AI

# Sites and AI: Leveraging AI to Create and Maintain AEM Content

By [Jack Jin](/) · November 11, 2026 · Updated November 16, 2026 · 11 min read

Creating content with AI has never been easier, and it has never been harder to make it good. On November 11, 2026 I gave Adobe's Learn From Your Peers webinar on how I use AI across my own content work on an AEM Edge Delivery Services site: research and briefs, authoring, and evaluation, with three demos in each. This is that talk written down, with all nine demos.

[Watch the recording on Adobe Experience League](https://experienceleague.adobe.com/en/on-demand-events/ai-create-maintain-aem-content), or [download the original deck as a PDF](/writing/2026-11-11-sites-and-ai/sites-and-ai-deck.pdf).

---

+--------------------------------------------------------------------------------------------------------+
| Rail                                                                                                   |
+----------------------------------------------------+---------------------------------------------------+
|                                                    | **Why now**\                                      |
|                                                    | [Never easier, never harder](#moment)             |
+----------------------------------------------------+---------------------------------------------------+
|                                                    | **Trust**\                                        |
|                                                    | [Trust comes before scale](#trust)                |
+----------------------------------------------------+---------------------------------------------------+
|                                                    | **01**\                                           |
|                                                    | [Research and briefs](#research-ai)               |
+----------------------------------------------------+---------------------------------------------------+
|                                                    | **02**\                                           |
|                                                    | [Authoring](#authoring)                           |
+----------------------------------------------------+---------------------------------------------------+
|                                                    | **03**\                                           |
|                                                    | [Evaluation](#evaluation)                         |
+----------------------------------------------------+---------------------------------------------------+
|                                                    | **Close**\                                        |
|                                                    | [Across all three](#intent)                       |
+----------------------------------------------------+---------------------------------------------------+
|                                                    | **Try**\                                          |
|                                                    | [Three things to try](#first-week)                |
+----------------------------------------------------+---------------------------------------------------+
|                                                    | **Q\&A**\                                         |
|                                                    | [Questions](#questions)                           |
+----------------------------------------------------+---------------------------------------------------+
| [The recording](https://experienceleague.adobe.com/en/on-demand-events/ai-create-maintain-aem-content) |
|                                                                                                        |
| [The original deck (PDF)](/writing/2026-11-11-sites-and-ai/sites-and-ai-deck.pdf)                      |
|                                                                                                        |
| [References](#references)                                                                              |
+--------------------------------------------------------------------------------------------------------+

---

## Never easier to make, never harder to make good

Most brands don't need a new page once or twice a day. Neither do I, if my personal website counts as a brand. I'd like a new article every two weeks. So I don't need AI to go faster at the same quality as before. I need it to help me produce the best content I'm able to.

Six months ago it was cool to show how much you made with AI. The tone has changed, and there is a real pushback against AI slop. Everyone has the same AI, so the bar went up.

I'm a technical architect, and I've always struggled with writing. AI lets people like me get our ideas out. That doesn't mean an article deserves less effort. What you publish still represents you, and your readers, human or AI, should get the best you're able to produce.

+-------------------------------------------------------------------+
| Scene (quality bar)                                               |
+----------+--------------------------------------------------------+
| label    | AI making pages faster and faster that pile up under a |
|          | rising line, the bar, while three pages, checked by    |
|          | automation and approved by you, pass through it to a   |
|          | shelf above.                                           |
+----------+--------------------------------------------------------+
| replay   | Replay the animation                                   |
+----------+--------------------------------------------------------+
| make     | Easy to make                                           |
+----------+--------------------------------------------------------+
| bar      | The bar                                                |
+----------+--------------------------------------------------------+
| good     | Worth reading                                          |
+----------+--------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| id      | moment |
+---------+--------+
| style   | moment |
+---------+--------+

---

## Trust comes before scale

So how do you start using AI without adding to the slop? The idea that explains it best for me comes from Lauren Tan, an engineer at Cursor: you build trust with AI before you hand it more. Trust goes up the side, and how much you hand to AI goes along the bottom.

The biggest pitfall is starting at the far end. Ask AI to do the research, write the post and check it, and you will most likely get work you can't put your signature on.

+--------------------------------------------------------------------+
| Scene (trust curve)                                                |
+----------+---------------------------------------------------------+
| label    | A curve of trust against how much you hand to AI: steep |
|          | at first, then flattening, with one AI agent at Start   |
|          | here, three at Build trust and nine at Go further.      |
+----------+---------------------------------------------------------+
| caption  | The idea: Lauren Tan (@poteto), trust and the number of |
|          | agents                                                  |
+----------+---------------------------------------------------------+
| replay   | Replay the animation                                    |
+----------+---------------------------------------------------------+
| trust    | Trust                                                   |
+----------+---------------------------------------------------------+
| axis     | What you hand to AI                                     |
+----------+---------------------------------------------------------+
| start    | Start here                                              |
+----------+---------------------------------------------------------+
| build    | Build trust                                             |
+----------+---------------------------------------------------------+
| further  | Go further                                              |
+----------+---------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| id      | trust  |
+---------+--------+
| style   | moment |
+---------+--------+

---

Start the way you'd bring on a new teammate. You don't hand a new hire your homepage on day one.

+---------------------------------------------------------------------------------------------------------------------------+
| Explainer (process shift)                                                                                                 |
+---------------------------------------------------------------------------------------------------------------------------+
| - **You**                                                                                                                 |
| - **AI**                                                                                                                  |
+---------------------------------------------------------------------------------------------------------------------------+
| *Trust step*                                                                                                              |
+-------------------------------+----------------------------------------------------+--------------------------------------+
| Start here                    | 1. **You** pick one small job                      | One job, and you check all of it.    |
|                               | 2. **You** write the prompt                        | This is where you learn what AI is   |
|                               | 3. **AI** do the job                               | good at.                             |
|                               | 4. **You** read every answer                       |                                      |
+-------------------------------+----------------------------------------------------+--------------------------------------+
| Build trust                   | 1. **You** refine the prompt where it slipped      | Refinement and repetition. You learn |
|                               | 2. **AI** do the job again                         | how your input shapes what comes     |
|                               | 3. **You** see what changed, and get a feel for it | back, until the results are ones     |
|                               | 4. **AI** repeat it on more of the same work       | you're happy with.                   |
+-------------------------------+----------------------------------------------------+--------------------------------------+
| Go further                    | 1. **You** keep the process that works             | Only once the process is repeatable  |
|                               | 2. **AI** do it on every page                      | and you're happy with it. Each new   |
|                               | 3. **AI** take on the next job too                 | job starts small again.              |
|                               | 4. **AI** sum up what it did                       |                                      |
|                               | 5. **You** approve it, or send it back             |                                      |
+-------------------------------+----------------------------------------------------+--------------------------------------+
| Building trust with AI, the same way at all three stages. Pick a step to run it, or replay it.                            |
+---------------------------------------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| id      | how    |
+---------+--------+

---

The rest follows the three stages of my own content work, with three demos in each, all recorded on my own site. This is what I do, not a list of best practices.

+--------------------------------------------------------------------+
| Scene (agenda)                                                     |
+---------+----------------------------------------------------------+
| label   | Three sources sending what matters into one brief, whose |
|         | sections fill in turn, and you tick the brief.           |
+---------+----------------------------------------------------------+
| caption | ### [Research and briefs](#research-ai)                  |
|         |                                                          |
|         | Getting the right context in.                            |
+---------+----------------------------------------------------------+
| replay  | Replay the animation                                     |
+---------+----------------------------------------------------------+
| sources | Sources                                                  |
+---------+----------------------------------------------------------+
| brief   | The brief                                                |
+---------+----------------------------------------------------------+

+--------------------------------------------------------------------+
| Scene (agenda)                                                     |
+---------+----------------------------------------------------------+
| label   | The brief's lines flowing into a page built from blocks, |
|         | each block filling in turn, and you tick the page.       |
+---------+----------------------------------------------------------+
| caption | ### [Authoring](#authoring)                              |
|         |                                                          |
|         | Reducing friction.                                       |
+---------+----------------------------------------------------------+
| replay  | Replay the animation                                     |
+---------+----------------------------------------------------------+
| brief   | The brief                                                |
+---------+----------------------------------------------------------+
| page    | The page                                                 |
+---------+----------------------------------------------------------+

+---------------------------------------------------------------------+
| Scene (agenda)                                                      |
+---------+-----------------------------------------------------------+
| label   | The page and the brief's questions side by side, joined   |
|         | where they match; one unanswered question is flagged, a   |
|         | new section answers it, and every question gets its tick. |
+---------+-----------------------------------------------------------+
| caption | ### [Evaluation](#evaluation)                             |
|         |                                                           |
|         | Closing the loop.                                         |
+---------+-----------------------------------------------------------+
| replay  | Replay the animation                                      |
+---------+-----------------------------------------------------------+
| page    | The page                                                  |
+---------+-----------------------------------------------------------+
| brief   | The brief                                                 |
+---------+-----------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| id      | agenda |
+---------+--------+
| style   | plates |
+---------+--------+

---

## Research and briefs: getting the right context in

Every page starts before anyone writes a word. I have AI research the topic first, and I hand it three things.

+----------------------------------------------------------------------+
| Scene (source sweep)                                                 |
+-----------+----------------------------------------------------------+
| label     | A fan of source pages, docs, posts and threads, with the |
|           | lines that matter lifting out of each and stacking up as |
|           | one set of notes.                                        |
+-----------+----------------------------------------------------------+
| caption   | ### It reads more than you can                           |
|           |                                                          |
|           | Docs, release notes, blog posts, forum threads. AI reads |
|           | them in minutes and pulls out what your readers keep     |
|           | asking.                                                  |
+-----------+----------------------------------------------------------+
| replay    | Replay the animation                                     |
+-----------+----------------------------------------------------------+
| sources   | Sources                                                  |
+-----------+----------------------------------------------------------+
| notes     | Your notes                                               |
+-----------+----------------------------------------------------------+

+---------------------------------------------------------------------+
| Scene (gap scan)                                                    |
+---------+-----------------------------------------------------------+
| label   | Your page and three competing pages side by side, section |
|         | by section, a scan line lighting up the sections only     |
|         | they have.                                                |
+---------+-----------------------------------------------------------+
| caption | ### It spots what's missing                               |
|         |                                                           |
|         | Put your page next to the ones you compete with. AI lists |
|         | what they cover that you don't.                           |
+---------+-----------------------------------------------------------+
| replay  | Replay the animation                                      |
+---------+-----------------------------------------------------------+
| yours   | Your page                                                 |
+---------+-----------------------------------------------------------+
| theirs  | Theirs                                                    |
+---------+-----------------------------------------------------------+
| gap     | Gap                                                       |
+---------+-----------------------------------------------------------+

+---------------------------------------------------------------------+
| Scene (news radar)                                                  |
+----------+----------------------------------------------------------+
| label    | A sweep that goes out once a week, picks up what changed |
|          | at each source and stacks it up for Monday morning.      |
+----------+----------------------------------------------------------+
| caption  | ### It keeps watching                                    |
|          |                                                          |
|          | Run the same research every week and it tells you what   |
|          | changed, before your readers ask.                        |
+----------+----------------------------------------------------------+
| replay   | Replay the animation                                     |
+----------+----------------------------------------------------------+
| week     | Every week                                               |
+----------+----------------------------------------------------------+
| new      | What's new                                               |
+----------+----------------------------------------------------------+

For me it's usually not a brand new topic. I tell AI what I know, what I think is true and where I'm less sure, and it checks what I believe. When I ran the gap check on one of my own articles, two of the pages I compete with had a comparison table and question headings. Mine had neither. And a scheduled job in ChatGPT tells me every week what changed in Edge Delivery Services, so I can learn it, and maybe write about it.

+-----------------------+
| Section Metadata      |
+---------+-------------+
| id      | research-ai |
+---------+-------------+
| style   | plates      |
+---------+-------------+

---

### Demo 1.1: My beliefs come first

Before I open any AI, I write down what I believe. Three lines. Then AI does the research, and it reads more than I could in an afternoon. Then I read what came back myself. That part is mine.

Here I'm about to write about AEM Edge Functions, so I give Claude's Research my three beliefs. They run my code on Adobe's CDN. They're WebAssembly on Fastly, like Cloudflare Workers. And I got them running on my laptop, but I don't know their limits yet. Every claim needs a source, and if there's no source, it has to say so.

+----------------------------------------------------------------------+
| Scene (belief read)                                                  |
+----------+-----------------------------------------------------------+
| label    | Three beliefs written by a person, an ink ring. AI, an    |
|          | accent disc, reads a stack of sources and two beliefs get |
|          | pushed back while one holds. The person reads the         |
|          | verdicts, and the two beliefs gain a line.                |
+----------+-----------------------------------------------------------+
| replay   | Replay the animation                                      |
+----------+-----------------------------------------------------------+
| beliefs  | 1 Beliefs                                                 |
+----------+-----------------------------------------------------------+
| research | 2 Research                                                |
+----------+-----------------------------------------------------------+
| read     | 3 My read                                                 |
+----------+-----------------------------------------------------------+
| sharper  | Sharper before I write                                    |
+----------+-----------------------------------------------------------+

+-----------------------------------------------------------------------------------------------------------------------+
| Figure                                                                                                                |
+-----------------------------------------------------------------------------------------------------------------------+
| ![Demo 1.1: The research assistant][image0]                                                                           |
|                                                                                                                       |
| [Demo 1.1: The research assistant](/media/sites-ai-webinar/demos/media_1808e333ee455990abe9f5c523c8850bfa23842a7.mp4) |
|                                                                                                                       |
| Claude Research on AEM Edge Functions: 292 sources in 5 min 38 s, sped up.                                            |
+-----------------------------------------------------------------------------------------------------------------------+

It went through 292 sources in 5 minutes 38 seconds and gave each belief a verdict: the first two partly supported, the third supported, and the limits I said I didn't know were right there. I don't take its word for it. I open one source and find the claim in Adobe's own docs.

AI doesn't care that you're wrong, and it doesn't judge you. The only person who could fact check me used to be someone more senior who also knew the project, and that person is hard to get. I knew more than when I started, and I still hadn't written a word.

+--------------------+
| Section Metadata   |
+---------+----------+
| id      | demo-1-1 |
+---------+----------+
| style   | moment   |
+---------+----------+

---

### Demo 1.2: Talking is input

I'm better at demoing and talking things through than I am at writing, so talking is my input. A recording becomes a transcript, the transcript becomes a brief in my words, and the brief becomes a page.

This one starts from 12 minutes and 23 seconds of me sharing my screen and talking through a migration, with no script. I ask for a brief from the transcript: my order, my own words, and nothing I didn't say. It comes back with three quotes, each with its timestamp, and it flags what it couldn't confirm.

+------------------------------------------------------------------------+
| Scene (talk to page)                                                   |
+------------+-----------------------------------------------------------+
| label      | A person talks and a waveform runs down the left.         |
|            | Automation makes a transcript, AI makes a brief with      |
|            | three lines in the person's words, and the brief becomes  |
|            | a page. Eight moments in the recording each run a wire to |
|            | their place on the page.                                  |
+------------+-----------------------------------------------------------+
| replay     | Replay the animation                                      |
+------------+-----------------------------------------------------------+
| recording  | Recording                                                 |
+------------+-----------------------------------------------------------+
| transcript | Transcript                                                |
+------------+-----------------------------------------------------------+
| brief      | Brief in my words                                         |
+------------+-----------------------------------------------------------+
| page       | Page                                                      |
+------------+-----------------------------------------------------------+
| mapped     | Every moment mapped                                       |
+------------+-----------------------------------------------------------+

+-----------------------------------------------------------------------------------------------------------------------------+
| Figure                                                                                                                      |
+-----------------------------------------------------------------------------------------------------------------------------+
| ![Demo 1.2: From my recording to writing][image1]                                                                           |
|                                                                                                                             |
| [Demo 1.2: From my recording to writing](/media/sites-ai-webinar/demos/media_1bd454db27f4d8d1e226d5a163e1a654cb226541f.mp4) |
|                                                                                                                             |
| My 12:23 recording, the brief from it, and the page it became.                                                              |
+-----------------------------------------------------------------------------------------------------------------------------+

I ask for that flag because AI can add things you didn't say. The coverage map at the end of the clip is how I check: every moment of the recording has a place on the page.

Fifteen minutes of me talking about something I researched is original material, and that is how I keep the slop out. If you have a call with your brand manager before you write, get that transcript in. Adobe does this at enterprise scale: GenStudio for Content Marketing turns long documents and videos into web articles.

+--------------------+
| Section Metadata   |
+---------+----------+
| id      | demo-1-2 |
+---------+----------+
| style   | moment   |
+---------+----------+

---

### Demo 1.3: My second brain is plain files

This is the advanced one: give AI a large context of you. Mine is plain files: my talks, how I write and speak, my goals, the research I've already done. None of that changes day to day. For a company, that is the brand, and Adobe calls its version Brand Intelligence.

In the clip I ask Claude Code which talks I gave in 2026 and how I usually open one, and it answers from my own files. Then I ask for a brief for a new article from what I've already said, and every point cites a file and a line.

+-------------------------------------------------------------------+
| Scene (file brain)                                                |
+----------+--------------------------------------------------------+
| label    | Three shelves of small documents, talks, voice and     |
|          | research. AI reads a thread from each into a waiting   |
|          | page, a person ticks the page, and a frame draws round |
|          | the shelves.                                           |
+----------+--------------------------------------------------------+
| replay   | Replay the animation                                   |
+----------+--------------------------------------------------------+
| talks    | Talks                                                  |
+----------+--------------------------------------------------------+
| voice    | My voice                                               |
+----------+--------------------------------------------------------+
| research | Research                                               |
+----------+--------------------------------------------------------+
| page     | Before I author                                        |
+----------+--------------------------------------------------------+
| brand    | For a company, the brand                               |
+----------+--------------------------------------------------------+

+-----------------------------------------------------------------------------------------------------------------------------+
| Figure                                                                                                                      |
+-----------------------------------------------------------------------------------------------------------------------------+
| ![Demo 1.3: A second brain that knows me][image2]                                                                           |
|                                                                                                                             |
| [Demo 1.3: A second brain that knows me](/media/sites-ai-webinar/demos/media_156d35df766361e8d08442b34bd3dda6b0e7916ce.mp4) |
|                                                                                                                             |
| Claude Code in my brain repo, citing file and line.                                                                         |
+-----------------------------------------------------------------------------------------------------------------------------+

I read that brief before I open the editor, top down, while changing direction is still quick. The closer the first draft is to right, the less editing I do later. Hold on to this brief, because the next stage builds it.

+--------------------+
| Section Metadata   |
+---------+----------+
| id      | demo-1-3 |
+---------+----------+
| style   | moment   |
+---------+----------+

---

## Authoring: reducing friction

How does the brief turn into a page? Usually by copy and paste. The draft lives in a doc, the page lives in AEM, and somebody moves it over one block at a time. The layout drifts from the design, small fixes wait in someone's queue, and once it's live, nobody can tell you exactly what changed, or when.

The morning of the webinar gave me an example of the opposite. I had taken the day off, and I was still in bed. At 9:30 I picked up my phone and asked Claude Code to publish the deck on my site and make sure it showed up in the listing, an hour and a half before I presented from it.

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (shot, slim)                                                                                                                                                      |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![A phone screenshot of a Claude Code session at 9:30 AM: Jack asks for this deck to be published and listed, and answers a question with Deploy the Worker now][image3] |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Bring the authoring interface to where you are. For me that's Claude Code. For you it might be Experience Workspace, or your own agent.

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | authoring |
+---------+-----------+

---

Three things change once AI can reach the page.

+---------------------------------------------------------------------+
| Scene (block fill)                                                  |
+----------+----------------------------------------------------------+
| label    | Lines from the brief flowing into a page built from      |
|          | blocks, each block filling in turn while its outline     |
|          | stays put.                                               |
+----------+----------------------------------------------------------+
| caption  | ### It drafts into your blocks                           |
|          |                                                          |
|          | Your blocks are your reusable components. AI writes into |
|          | them, so the page stays on brand however the words got   |
|          | written.                                                 |
+----------+----------------------------------------------------------+
| replay   | Replay the animation                                     |
+----------+----------------------------------------------------------+
| brief    | The brief                                                |
+----------+----------------------------------------------------------+
| blocks   | Your blocks                                              |
+----------+----------------------------------------------------------+

+----------------------------------------------------------------------+
| Scene (plain edit)                                                   |
+----------+-----------------------------------------------------------+
| label    | A one-line request turning into a single changed line in  |
|          | the page, the old line struck out and the new one written |
|          | in.                                                       |
+----------+-----------------------------------------------------------+
| caption  | ### You ask in plain words                                |
|          |                                                           |
|          | "Shorten the title." "Add a comparison table." AI makes   |
|          | the change in the same document your authors edit.        |
+----------+-----------------------------------------------------------+
| replay   | Replay the animation                                      |
+----------+-----------------------------------------------------------+
| ask      | Your ask                                                  |
+----------+-----------------------------------------------------------+
| change   | One line changes                                          |
+----------+-----------------------------------------------------------+

+---------------------------------------------------------------------+
| Scene (change trail)                                                |
+-----------+---------------------------------------------------------+
| label     | A line of commits, one per publish, each with its small |
|           | diff, and a step back to an earlier one.                |
+-----------+---------------------------------------------------------+
| caption   | ### Every publish leaves a record                       |
|           |                                                         |
|           | Snapshot the live site into Git after each publish, and |
|           | every change becomes a commit you can read, and roll    |
|           | back.                                                   |
+-----------+---------------------------------------------------------+
| replay    | Replay the animation                                    |
+-----------+---------------------------------------------------------+
| publish   | Publish                                                 |
+-----------+---------------------------------------------------------+
| commit    | Commit                                                  |
+-----------+---------------------------------------------------------+
| rollback  | Roll back                                               |
+-----------+---------------------------------------------------------+

On my own site, when I moved it to Edge Delivery last month, AI built the blocks from my design system before any page moved over, about forty of them. Now they're the design every AI edit has to fit.

+------------------------+
| Section Metadata       |
+---------+--------------+
| id      | authoring-ai |
+---------+--------------+
| style   | plates       |
+---------+--------------+

---

### Demo 2.1: Start with one small ask

The smallest start. The assistant sits beside the page in Experience Workspace. It knows your site and what your blocks let it edit. It doesn't know your intent unless you tell it.

I make one small ask: make the title clearer for someone choosing between the three ways to author, keep it under 60 characters, and keep my block. It reads the page first, picks a shorter title, and stops. Nothing changes until I approve. Then I send it to preview.

+-----------------------------------------------------------------------+
| Scene (approve gate)                                                  |
+-----------+-----------------------------------------------------------+
| label     | An editor drawn in lines, the assistant's panel beside    |
|           | the page. A person types one ask, AI writes a suggestion  |
|           | that stops at a bar beside the title, the person          |
|           | approves, the title gets shorter, nothing else moves, and |
|           | preview lights.                                           |
+-----------+-----------------------------------------------------------+
| replay    | Replay the animation                                      |
+-----------+-----------------------------------------------------------+
| ask       | One small ask                                             |
+-----------+-----------------------------------------------------------+
| gate      | Nothing changes until I approve                           |
+-----------+-----------------------------------------------------------+
| preview   | Preview                                                   |
+-----------+-----------------------------------------------------------+

+--------------------------------------------------------------------------------------------------------------------------------------+
| Figure                                                                                                                               |
+--------------------------------------------------------------------------------------------------------------------------------------+
| ![Demo 2.1: The assistant in Experience Workspace][image4]                                                                           |
|                                                                                                                                      |
| [Demo 2.1: The assistant in Experience Workspace](/media/sites-ai-webinar/demos/media_1422998838f32ab4641cf8201f6e28a2156d86379.mp4) |
|                                                                                                                                      |
| A draft copy of my article, on preview only.                                                                                         |
+--------------------------------------------------------------------------------------------------------------------------------------+

+--------------------+
| Section Metadata   |
+---------+----------+
| id      | demo-2-1 |
+---------+----------+
| style   | moment   |
+---------+----------+

---

### Demo 2.2: My blocks are the design system

There's a trend across MarTech right now: platforms letting other agents do the work, without their interfaces. I call it working headless. The content still lives in AEM. The agent just doesn't need the screens. The next two demos are that, on my own site.

My blocks are my design system. They're all in the Library inside Experience Workspace, each variant with what it's for and an example from a real page. Authors see this, and AI reads the same thing. So I ask Claude Code for a page plan from the brief, library blocks only.

+---------------------------------------------------------------------+
| Scene (block map)                                                   |
+---------+-----------------------------------------------------------+
| label   | A library of six block shapes on the left. AI reads it    |
|         | once, then each part of a plan on the right gets a wire   |
|         | from the block that fits. One part has no block and stays |
|         | dashed with a question mark.                              |
+---------+-----------------------------------------------------------+
| replay  | Replay the animation                                      |
+---------+-----------------------------------------------------------+
| library | My library                                                |
+---------+-----------------------------------------------------------+
| plan    | The plan                                                  |
+---------+-----------------------------------------------------------+
| gap     | Gap named, not invented                                   |
+---------+-----------------------------------------------------------+

+-------------------------------------------------------------------------------------------------------------------------------+
| Figure                                                                                                                        |
+-------------------------------------------------------------------------------------------------------------------------------+
| ![Demo 2.2: AI that knows my block library][image5]                                                                           |
|                                                                                                                               |
| [Demo 2.2: AI that knows my block library](/media/sites-ai-webinar/demos/media_16ae34c1bef021c45aee9ffb9fa73ea82075e7a1f.mp4) |
|                                                                                                                               |
| Headless in Claude Code: a plan from my library, and the parts it has no block for.                                           |
+-------------------------------------------------------------------------------------------------------------------------------+

It came back with eleven library blocks and three gaps: three things it has no block for, a pull quote for one. It said so instead of making one up.

Review that mapping before anything gets built. AI guesses right about 90% of the time, I would say, but you're the one putting your signature on the page. Say when you'd choose a different block. Voice to text is enough.

+--------------------+
| Section Metadata   |
+---------+----------+
| id      | demo-2-2 |
+---------+----------+
| style   | moment   |
+---------+----------+

---

### Demo 2.3: AI tests itself before I look

This is my own setup, and it's headless all the way: my site, my second brain and my tools in one Claude Code session. The brief goes in with two instructions. Push it to preview only, never publish. And check your own work before you hand it to me.

The run took 22 minutes and 34 seconds. It wrote the page into my blocks, then checked it on desktop and phone, in light and dark. A code block overflowed on phones, so it fixed that and ran again. One rerun tested an old preview, so it said that one didn't count, and it waited for the fresh page.

+-----------------------------------------------------------------------+
| Scene (tested first)                                                  |
+-----------+-----------------------------------------------------------+
| label     | One session holding site, brain and tools. A brief goes   |
|           | in, AI builds a page and runs four checks, fixes the one  |
|           | that fails, and sends it to preview. A person outside the |
|           | session looks only then.                                  |
+-----------+-----------------------------------------------------------+
| replay    | Replay the animation                                      |
+-----------+-----------------------------------------------------------+
| session   | One session                                               |
+-----------+-----------------------------------------------------------+
| site      | Site                                                      |
+-----------+-----------------------------------------------------------+
| brain     | Brain                                                     |
+-----------+-----------------------------------------------------------+
| tools     | Tools                                                     |
+-----------+-----------------------------------------------------------+
| preview   | Preview                                                   |
+-----------+-----------------------------------------------------------+
| look      | Only then do I look                                       |
+-----------+-----------------------------------------------------------+

+-------------------------------------------------------------------------------------------------------------------------------------+
| Figure                                                                                                                              |
+-------------------------------------------------------------------------------------------------------------------------------------+
| ![Demo 2.3: Claude Code with everything wired in][image6]                                                                           |
|                                                                                                                                     |
| [Demo 2.3: Claude Code with everything wired in](/media/sites-ai-webinar/demos/media_1552a9156b78831c1e1d0ac8a8e52a9287c94a789.mp4) |
|                                                                                                                                     |
| Built headless, still editable in Experience Workspace. On preview, 404 on live.                                                    |
+-------------------------------------------------------------------------------------------------------------------------------------+

Only then do I open it. All 104 authored texts were still editable, so a page built headless is still one my authors can change word by word.

If you don't have AI go through this loop, you become AI's tester. When someone tells me AI didn't give them what they wanted, I ask two things. What did you give it to begin with? And did you ask it to check the work before it handed it to you?

+--------------------+
| Section Metadata   |
+---------+----------+
| id      | demo-2-3 |
+---------+----------+
| style   | moment   |
+---------+----------+

---

### AI needs to be observed and traced

When AI writes to your site headless, nobody watches it in the editor. Chat logs are hard to follow, and sessions get lost. So you need to see exactly what it changed, and trace it back.

My answer is Git on the rendered pages. After each publish I snapshot the live site into an archive site, so every change is a commit anyone can read, and roll back. This is one publish from October 31.

+------------------------------------------------------------------------------------------------------------------+
| Code (plain)                                                                                                     |
+------------------------------------------------------------------------------------------------------------------+
| My site's archive after one publish, October 31, 2026                                                            |
|                                                                                                                  |
| [7f01594 on GitHub](https://github.com/jackzhaojin/www-archive/commit/7f01594)                                   |
+------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                              |
| $ git show --stat 7f01594                                                                                        |
| snapshot: v1.3.4, event data Google accepts                                                                      |
|                                                                                                                  |
|  site/query-index.json                                     \|  2 \+-                                             |
|  site/scripts/talks-list.js                                \| 13 \+\+\+\+\+\+---                                 |
|  site/sitemap.xml                                          \|  2 \+-                                             |
|  .../2025-09-10-ai-in-professional-services/index.html     \| 35 \+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+--- |
|  .../2026-09-11-knowledge-work-as-a-product/index.html     \| 26 \+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+--              |
|  snapshot.json                                             \| 20 \+\+\+\+\+\+\+-------                           |
|  8 files changed, 85 insertions(\+), 24 deletions(-)                                                             |
| ```                                                                                                              |
+------------------------------------------------------------------------------------------------------------------+

The archive holds the pages as served, the same HTML readers and AI answer engines get, so I'm tracing the result, not just the edit. It's public at [archive.jackzhaojin.com](https://archive.jackzhaojin.com/). An enterprise wouldn't do it the way I do, and not everyone needs this.

+----------------------------+
| Section Metadata           |
+---------+------------------+
| id      | authoring-record |
+---------+------------------+

---

## Evaluation: closing the loop

How do you know it's good before it goes live? Most of us find out after. We proofread, we publish, and weeks later the analytics tell us what we missed. The check comes last, when a fix costs the most. And almost nobody checks the page against what it was supposed to answer in the first place.

Authoring that used to take four hours now takes fifteen or twenty minutes, so this is the stage where a page clears the bar, or doesn't. To me it's the most important of the three. I run three kinds of checks, in this order, because each one catches what the others miss.

+----------------------------------------------------------------------+
| Scene (rule check)                                                   |
+----------+-----------------------------------------------------------+
| label    | One page run through the same five rules twice, each run  |
|          | ticking and flagging the same lines in the same order,    |
|          | with matching results.                                    |
+----------+-----------------------------------------------------------+
| caption  | ### Deterministic checks                                  |
|          |                                                           |
|          | Rules a script runs the same way every time: title        |
|          | length, one h1, structured data, links, alt text.         |
|          | Experience Workspace's Preflight panel has some built in. |
+----------+-----------------------------------------------------------+
| replay   | Replay the animation                                      |
+----------+-----------------------------------------------------------+
| rules    | Same rules                                                |
+----------+-----------------------------------------------------------+
| runs     | Same result                                               |
+----------+-----------------------------------------------------------+

+-----------------------------------------------------------------------+
| Scene (agent check)                                                   |
+-----------+-----------------------------------------------------------+
| label     | The AI disc reading a page like a reviewer, raising       |
|           | questions where the page is thin, glancing at competing   |
|           | pages, and writing notes in the margin.                   |
+-----------+-----------------------------------------------------------+
| caption   | ### Agentic checks                                        |
|           |                                                           |
|           | AI reads the page like a reviewer would: does it answer   |
|           | the brief, how does it compare, what would a reader still |
|           | ask.                                                      |
+-----------+-----------------------------------------------------------+
| replay    | Replay the animation                                      |
+-----------+-----------------------------------------------------------+
| page      | The page                                                  |
+-----------+-----------------------------------------------------------+
| questions | Open questions                                            |
+-----------+-----------------------------------------------------------+
| notes     | Review notes                                              |
+-----------+-----------------------------------------------------------+

+----------------------------------------------------------------------+
| Scene (human check)                                                  |
+----------+-----------------------------------------------------------+
| label    | A person, an ink ring, reading the page against the brief |
|          | line by line, pausing to mark a margin note, then making  |
|          | the call with a tick.                                     |
+----------+-----------------------------------------------------------+
| caption  | ### Human checks                                          |
|          |                                                           |
|          | You read it against the brief and make the call: the      |
|          | voice, the judgment, whether it's worth publishing at     |
|          | all. It's the last check, not the only one.               |
+----------+-----------------------------------------------------------+
| replay   | Replay the animation                                      |
+----------+-----------------------------------------------------------+
| brief    | The brief                                                 |
+----------+-----------------------------------------------------------+
| page     | The page                                                  |
+----------+-----------------------------------------------------------+
| call     | Your call                                                 |
+----------+-----------------------------------------------------------+

+----------------------+
| Section Metadata     |
+---------+------------+
| id      | evaluation |
+---------+------------+
| style   | plates     |
+---------+------------+

---

### Demo 3.1: Rules first

Same input, same answer, every time, and no AI. Experience Workspace has this built in as Preflight. On this draft it reports 6 failed and 19 passed, and running it again gives the same answer. One finding is a link that came back 404, with a suggested fix. I had AI break a few things first, so there would be something to show.

+--------------------------------------------------------------------------------------------------------------+
| Figure                                                                                                       |
+--------------------------------------------------------------------------------------------------------------+
| ![Demo 3.1: Deterministic][image7]                                                                           |
|                                                                                                              |
| [Demo 3.1: Deterministic](/media/sites-ai-webinar/demos/media_18871a455782f0d666d0332c3ea2db53b9da94bdd.mp4) |
|                                                                                                              |
| Preflight on my draft, then the site's own check on www.                                                     |
+--------------------------------------------------------------------------------------------------------------+

The second half of the clip checks the whole published site the same way. Not everything has to burn tokens. If a rule can check it, use the rule, and have AI run the rule for you. It costs less, and the answer is the same every time.

+--------------------+
| Section Metadata   |
+---------+----------+
| id      | demo-3-1 |
+---------+----------+

---

### Demo 3.2: A reviewer with my voice rules

Rules can't judge everything, so the next check has judgment: a reviewer that loads my voice rules first. I have words I never use. Load-bearing is one. I've also saved my best emails and posts as examples of how I sound. There are three ways out: pass, auto-revise, or ask me. Anything that changes the meaning comes to me.

+-----------------------------------------------------------------------+
| Scene (three outcomes)                                                |
+------------+----------------------------------------------------------+
| label      | A draft and a card of voice rules that drops into AI.    |
|            | Findings leave along three paths: a pass, an auto-revise |
|            | that swaps a line, and one that goes down to a person,   |
|            | where the path stays lit.                                |
+------------+----------------------------------------------------------+
| replay     | Replay the animation                                     |
+------------+----------------------------------------------------------+
| draft      | The draft                                                |
+------------+----------------------------------------------------------+
| rules      | My voice rules                                           |
+------------+----------------------------------------------------------+
| pass       | Pass                                                     |
+------------+----------------------------------------------------------+
| revise     | Auto-revise                                              |
+------------+----------------------------------------------------------+
| ask        | Ask me                                                   |
+------------+----------------------------------------------------------+

+--------------------------------------------------------------------------------------------------------+
| Figure                                                                                                 |
+--------------------------------------------------------------------------------------------------------+
| ![Demo 3.2: Agentic][image8]                                                                           |
|                                                                                                        |
| [Demo 3.2: Agentic](/media/sites-ai-webinar/demos/media_19624b0405b1308ee774687af1b0dcf16fc76e296.mp4) |
|                                                                                                        |
| My critique skill on the AI draft of a real LinkedIn post.                                             |
+--------------------------------------------------------------------------------------------------------+

Here it runs on the raw AI draft of a real LinkedIn post. The mechanical scans found nothing. But one line was wrong: "This time it took two prompts." My point in the video was a long planning conversation plus two build prompts. It didn't touch the draft. It proposed an edit and asked me.

As a technical architect, I've been wrong, and I don't think there's a technical architect or content author who hasn't. This is my last check before I hit post. Point it at a page instead of a post, and it's your brand's reviewer.

+--------------------+
| Section Metadata   |
+---------+----------+
| id      | demo-3-2 |
+---------+----------+
| style   | moment   |
+---------+----------+

---

### Demo 3.3: It's OK to clean it up yourself

AI takes me 80 to 90 percent of the way. I'm the expert, and it's OK to clean up the rest myself. A lot of AI systems are a black box: to change what AI made, you have to go back through their AI. Here I open Experience Workspace, da.live if that's what you still call it, select a line that reads a bit stiff, and retype it in plainer words, with no prompt.

+----------------------------------------------------------------------+
| Scene (human check)                                                  |
+----------+-----------------------------------------------------------+
| label    | A person, an ink ring, reading the page against the brief |
|          | line by line, stopping to mark a margin note, then making |
|          | the call with a tick.                                     |
+----------+-----------------------------------------------------------+
| replay   | Replay the animation                                      |
+----------+-----------------------------------------------------------+
| page     | The page                                                  |
+----------+-----------------------------------------------------------+
| brief    | The brief                                                 |
+----------+-----------------------------------------------------------+
| call     | My edit                                                   |
+----------+-----------------------------------------------------------+

+------------------------------------------------------------------------------------------------------------------+
| Figure                                                                                                           |
+------------------------------------------------------------------------------------------------------------------+
| ![Demo 3.3: Human in the loop][image9]                                                                           |
|                                                                                                                  |
| [Demo 3.3: Human in the loop](/media/sites-ai-webinar/demos/media_1508dc6b3ba2df7368ed5952a097334da098786e4.mp4) |
|                                                                                                                  |
| One line, retyped in a plainer tone, in Experience Workspace.                                                    |
+------------------------------------------------------------------------------------------------------------------+

When I find myself fixing the same thing over and over, that's a pattern, and it goes back into the skill or the process.

+--------------------+
| Section Metadata   |
+---------+----------+
| id      | demo-3-3 |
+---------+----------+
| style   | moment   |
+---------+----------+

---

## Does the page still match what we meant?

That's the question across all three stages. Research and briefs gets your context in: what you believe, what you've said, what you've already made. Authoring lets AI do the work and test it before you look. Evaluation runs the checks in order: deterministic, agentic, human.

Context in, friction down, loop closed. That's how a page clears the bar, and at every stage trust grows one step at a time.

Everything here is how I work on my own site, and parts of it would look different in an enterprise.

+------------------+
| Section Metadata |
+---------+--------+
| id      | intent |
+---------+--------+

---

## Three things to try on Monday

1. Before your next page, write down three things you believe, then run a research assistant on the topic and read what comes back.
2. Open one real page in Experience Workspace and ask the assistant for one small fix.
3. Run Preflight on your next page before it publishes.

Start small. I've gotten stronger with AI as I keep building trust, and I still build it every day in my day job.

If you've automated any of this already, I'd like to compare notes. I learn more from conversations than I do from giving talks.

+----------------------+
| Section Metadata     |
+---------+------------+
| id      | first-week |
+---------+------------+

---

## Questions from the session

Three of the questions from the audience, with my answers shortened.

### What if you don't have strong beliefs about the topic to start from?

If you don't know something about a topic, maybe you shouldn't write about it. Start from expertise, yours or your client's. Even now, when it all seems so easy, the writing has to be something about you.

### Which of your skills can't you live without?

The one that sounds like me. When I rehearse a talk, I have Claude record how I speak, so over time it knows how I talk and how I'd like to communicate. The skill merges the two and keeps out the words I'd never say. My video skills are second. For these demos I recorded about 40 minutes of my screen and told AI what the talk was about. It found and cut the clips, and told me when one was missing.

### How do you fact check AI before you trust it?

Ask for variations. Nobody writes a perfect prompt, and I'm far from it. I still want one thing, but I have AI make six, and I pick. Sometimes all six miss. The morning of this webinar I asked for new versions of my title slide, and I couldn't get one I'd put my name on, so I kept the slide I had. Sometimes AI fails, and you're the judge of what's good.

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | questions |
+---------+-----------+

---

## References

- [The recording of the webinar](https://experienceleague.adobe.com/en/on-demand-events/ai-create-maintain-aem-content) on Adobe Experience League: about an hour, with the questions at the end.
- [The original deck (PDF)](/writing/2026-11-11-sites-and-ai/sites-and-ai-deck.pdf), as I sent it to Adobe the evening before.
- The trust curve is Lauren Tan's idea (@poteto): trust against the number of agents.
- [www.jackzhaojin.com](https://www.jackzhaojin.com/), the site in every demo, and [archive.jackzhaojin.com](https://archive.jackzhaojin.com/), the record of every publish ([github.com/jackzhaojin/www-archive](https://github.com/jackzhaojin/www-archive)).
- [Building an MCP Server for EDS da.live](/writing/2025-10-05-mcp-server-for-eds-da-live/)
- [One da.live MCP Server Across Claude, Gemini, Azure OpenAI and n8n](/writing/2025-10-12-da-live-mcp-across-ai-platforms/)
- [Agentic Admin API Configuration for Edge Delivery Services](/writing/2026-03-23-eds-hlx-admin-agentic-config/)

+----------------------+
| Section Metadata     |
+---------+------------+
| id      | references |
+---------+------------+

---

## Related

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Row List                                                                                                                                                                                            |
+---------+-------------------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------+
| Writing | [Migrating My Site to AEM Edge Delivery Services in Two Prompts](/writing/2026-10-25-eds-migration-two-goal-prompts/)                                 | Where the blocks in Demo 2.2 came |
|         |                                                                                                                                                       | from.                             |
+---------+-------------------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------+
| Writing | [AEM Edge Functions on a Laptop: Google Sign-in, Members-Only Pages and API Data at the Edge](/writing/2026-09-20-aem-edge-functions-google-sign-in/) | The topic Demo 1.1 researches.    |
+---------+-------------------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------+
| Talks   | [Talks](/talks/)                                                                                                                                      | My other talks, with their        |
|         |                                                                                                                                                       | recordings.                       |
+---------+-------------------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------+

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

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Metadata                                                                                                                                                                                                                                                                                                                                                                                                 |
+------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| title                  | Sites and AI: Leveraging AI to Create and Maintain AEM Content \| Jack Jin                                                                                                                                                                                                                                                                                                      |
+------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| description            | How I use AI across AEM content work on an Edge Delivery site: research and briefs, authoring, and evaluation, with nine demos from my Adobe webinar.                                                                                                                                                                                                                           |
+------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| template               | article                                                                                                                                                                                                                                                                                                                                                                         |
+------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| theme                  | adobe                                                                                                                                                                                                                                                                                                                                                                           |
+------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| published-time         | 2026-11-11                                                                                                                                                                                                                                                                                                                                                                      |
+------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| modified-time          | 2026-11-16                                                                                                                                                                                                                                                                                                                                                                      |
+------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| json-ld                | {"@context":"https\://schema.org","@graph":\[{"@type":"Person","@id":"https\://www\.jackzhaojin.com/#person","name":"Jack Jin","url":"https\://www\.jackzhaojin.com/","jobTitle":"Associate Director","worksFor":{"@type":"Organization","name":"Accenture","department":{"@type":"Organization","name":"Adobe Business                                                         |
|                        | Group"}},"sameAs":\["https\://www\.linkedin.com/in/jackjin","https\://github.com/jackzhaojin","https\://www\.youtube.com/channel/UC0oOZvUGcmBrJvcIhUIwatA","https\://www\.credly.com/users/jack-jin"],"award":\["Adobe Experience Manager Champion, class of 2026-2027","AEM Rockstar winner, Adobe Summit                                                                      |
|                        | 2024"]},{"@type":"WebSite","@id":"https\://www\.jackzhaojin.com/#website","url":"https\://www\.jackzhaojin.com/","name":"Jack Jin","publisher":{"@id":"https\://www\.jackzhaojin.com/#person"}},{"@type":"TechArticle","@id":"https\://www\.jackzhaojin.com/writing/2026-11-11-sites-and-ai/#article","headline":"Sites and AI: Leveraging AI to Create and Maintain AEM        |
|                        | Content","description":"How I use AI across AEM content work on an Edge Delivery site: research and briefs, authoring, and evaluation, with nine demos from my Adobe                                                                                                                                                                                                            |
|                        | webinar.","author":{"@id":"https\://www\.jackzhaojin.com/#person"},"publisher":{"@id":"https\://www\.jackzhaojin.com/#person"},"mainEntityOfPage":"https\://www\.jackzhaojin.com/writing/2026-11-11-sites-and-ai/","isPartOf":{"@id":"https\://www\.jackzhaojin.com/#website"},"about":\["Adobe Experience Manager","AEM Edge Delivery Services","Experience Workspace","AI     |
|                        | content authoring","Content research with AI","Content                                                                                                                                                                                                                                                                                                                          |
|                        | evaluation","Preflight"],"datePublished":"2026-11-11","dateModified":"2026-11-16","inLanguage":"en"},{"@type":"BreadcrumbList","@id":"https\://www\.jackzhaojin.com/writing/2026-11-11-sites-and-ai/#breadcrumb","itemListElement":\[{"@type":"ListItem","position":1,"name":"Home","item":"https\://www\.jackzhaojin.com/"},{"@type":"ListItem","position":2,"name":"Technical |
|                        | Writing","item":"https\://www\.jackzhaojin.com/writing/"},{"@type":"ListItem","position":3,"name":"Sites and AI","item":"https\://www\.jackzhaojin.com/writing/2026-11-11-sites-and-ai/"}]}]}                                                                                                                                                                                   |
+------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:published_time | 2026-11-11                                                                                                                                                                                                                                                                                                                                                                      |
+------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:modified_time  | 2026-11-16                                                                                                                                                                                                                                                                                                                                                                      |
+------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:author         | https\://www\.jackzhaojin.com/                                                                                                                                                                                                                                                                                                                                                  |
+------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| og:title               | Sites and AI: Leveraging AI to Create and Maintain AEM Content \| Jack Jin                                                                                                                                                                                                                                                                                                      |
+------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| twitter:title          | Sites and AI: Leveraging AI to Create and Maintain AEM Content \| Jack Jin                                                                                                                                                                                                                                                                                                      |
+------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-summary        | How I use AI across AEM content work on an Edge Delivery site: research and briefs, authoring, and evaluation, with nine demos from my Adobe webinar.                                                                                                                                                                                                                           |
+------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-topics         | Adobe AEM & EDS\|AI Engineering                                                                                                                                                                                                                                                                                                                                                 |
+------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-reading-time   | 11 min read                                                                                                                                                                                                                                                                                                                                                                     |
+------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-url      | https\://experienceleague.adobe.com/en/on-demand-events/ai-create-maintain-aem-content                                                                                                                                                                                                                                                                                          |
+------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-label    | Watch the recording                                                                                                                                                                                                                                                                                                                                                             |
+------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-keywords       | sites and ai adobe webinar learn from your peers aem edge delivery services experience workspace preflight claude code research brief authoring evaluation ai slop trust headless second brain                                                                                                                                                                                  |
+------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_1c82f4a9662fb0b1dd88fd0a649642b739984da91.jpg#width=1920\&height=1080

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_14107bd3f368b02228c66775cffb78719eb575ac7.jpg#width=1920\&height=1080

[image2]: https://main--www-eds--jackzhaojin.aem.page/media_1480f4cbeff98ca16a76e60788f2ca9bc0d98a70f.jpg#width=1920\&height=1080

[image3]: https://main--www-eds--jackzhaojin.aem.page/media_1e47ebbcbde8389d307b2bccc713d769140fba0d9.png#width=1000\&height=1254

[image4]: https://main--www-eds--jackzhaojin.aem.page/media_196e5b86a9ec1caf8879d025c9072d2a11a68d1df.jpg#width=1920\&height=1080

[image5]: https://main--www-eds--jackzhaojin.aem.page/media_1674498b3d9b0008b86498a89863d0c2b642d6a35.jpg#width=1920\&height=1080

[image6]: https://main--www-eds--jackzhaojin.aem.page/media_1ee7ba03d85889c6b5c36038f1a7f4b00319501c1.jpg#width=1920\&height=1080

[image7]: https://main--www-eds--jackzhaojin.aem.page/media_1b9c95a00a69f019579d6421f65e85ab4c32e0103.jpg#width=1920\&height=1080

[image8]: https://main--www-eds--jackzhaojin.aem.page/media_1e214e03b52de576b7dce69fe86845f3619b36128.jpg#width=1920\&height=1080

[image9]: https://main--www-eds--jackzhaojin.aem.page/media_168c65d567df9cfbe90228dba161b96179b6033be.jpg#width=1920\&height=1080
