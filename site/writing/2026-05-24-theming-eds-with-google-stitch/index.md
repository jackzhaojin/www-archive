1. [Home](/)
2. [Technical Writing](/writing/)
3. Theming EDS with Google Stitch

# Theming a Brand-New EDS Site with Google Stitch and MCP: One Prompt, Three Steps, Two Lessons

By [Jack Jin](/) · May 24, 2026 · Updated October 4, 2026 · 8 min read · Includes my 14:23 video

I couldn't find an Adobe EDS skill that themes a brand-new site, so here's a three-step way to do it: define what an EDS-friendly theme needs, design it in Google Stitch, then wire it back into the site through the Stitch MCP server. I ran all three in one long prompt with Claude Opus 4.7 while MLflow traced it. The theme landed well. The calls to action didn't, and that miss is where my two lessons came from.

---

+---------------------------------------------------------------------------------------------------------------------------------------+
| Rail                                                                                                                                  |
+-------------------------------------------------------------------+-------------------------------------------------------------------+
| ![][image0]                                                       | **Part 1**\                                                       |
|                                                                   | [Three steps to theme EDS](#part-1)                               |
+-------------------------------------------------------------------+-------------------------------------------------------------------+
| ![][image1]                                                       | **Part 2**\                                                       |
|                                                                   | [One prompt drove Stitch](#part-2)                                |
+-------------------------------------------------------------------+-------------------------------------------------------------------+
| ![][image2]                                                       | **Part 3**\                                                       |
|                                                                   | [Designing in Stitch](#part-3)                                    |
+-------------------------------------------------------------------+-------------------------------------------------------------------+
|                                                                   | **Part 4**\                                                       |
|                                                                   | [Wiring it into EDS](#part-4)                                     |
+-------------------------------------------------------------------+-------------------------------------------------------------------+
| ![][image3]                                                       | **Part 5**\                                                       |
|                                                                   | [Missed calls to action](#part-5)                                 |
+-------------------------------------------------------------------+-------------------------------------------------------------------+
|                                                                   | **Part 6**\                                                       |
|                                                                   | [Theme first, blocks second](#part-6)                             |
+-------------------------------------------------------------------+-------------------------------------------------------------------+
| [Watch the video, 14:23](#video)                                                                                                      |
|                                                                                                                                       |
| [The theme commit on GitHub](https://github.com/jackzhaojin/eds-skill-assess-2026-05/commit/d6355ee4f21281d39c13cff360b546a944b2a15f) |
+---------------------------------------------------------------------------------------------------------------------------------------+

---

The six parts below follow the video. Each one links to its moment in the video if you'd rather watch.

---

+----------------------------------------------------------------------------------------------------------------------------------+
| Figure                                                                                                                           |
+----------------------------------------------------------------------------------------------------------------------------------+
| [Theming an EDS Site from Scratch with Google Stitch MCP](https://youtu.be/2BZ8QHUxc-E)                                          |
|                                                                                                                                  |
| Recorded May 24, 2026. Each part below links to its moment in the video, or [watch it on YouTube](https://youtu.be/2BZ8QHUxc-E). |
+----------------------------------------------------------------------------------------------------------------------------------+

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Fine Print                                                                                                                                                                                                                                                                                                                                                                      |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| First published as a LinkedIn video on May 24, 2026. Rewritten for this site in October 2026. Code: the theme landed in [eds-skill-assess-2026-05 at `d6355ee`](https://github.com/jackzhaojin/eds-skill-assess-2026-05/commit/d6355ee4f21281d39c13cff360b546a944b2a15f), the same site I built in [my Adobe EDS skills video](/writing/2026-05-17-adobe-eds-skills-hands-on/). |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| id      | video  |
+---------+--------+

---

## 1. Three steps to theme a new EDS site

Say you have a brand-new website you want to theme. How do you approach it? The step I found missing from Adobe's skills is one that sets up typography and styles before anyone builds blocks. My site had a teaser block built with content-driven development and the boilerplate's default look. I broke the theming into three steps.

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Hand-drawn board titled Theming our new EDS site. Three boxes joined by arrows. Box 1, define what EDS theme could be: include EDS standards, aspirations, breakpoints, default content, the teaser and our vision. Box 2, use Google Stitch (figma killer?) and generate: paste in prompt, answer questions, question mark, profit (get design). Box 3, leverage Stitch MCP and theme an EDS site and our teaser: have AI get the design, theme the site and test in one prompt, go into the teaser and test, have AI deploy and show me the work.][image4] |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| The plan I drew before recording. Step two's "3. ?" shows how much I knew going in.                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

The first step matters most for EDS. I wanted Google Stitch to generate a theme that's EDS-friendly, so the definition includes the EDS standards, what default content is, and what breakpoints to design for. That gives Stitch the best chance of producing something that actually drops into an Edge Delivery site. The second step is Stitch itself, my preferred AI design tool. My board calls it a Figma killer, with a question mark. The third is the Stitch MCP server, which lets the agent pull the design out of Stitch and apply it to the site, then the teaser, testing as it goes.

Watch this part [0:00 The three steps](https://youtu.be/2BZ8QHUxc-E?t=0)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-1 |
+---------+--------+

---

## 2. One long prompt, and the agent drove Stitch through MCP

Since this was an experiment, I launched MLflow first to make sure the session was traced. Then I gave the agent one large prompt. When I want AI to do a thing or two for me, I give it a long first prompt, usually by talking to it with voice-to-text. The prompt gave the agent the context of what an EDS block is, asked it to think about what makes sense for theming, and pointed it at Google Stitch. It also linked Adobe's [Development Collaboration and Good Practices](https://www.aem.live/docs/dev-collab-and-good-practices) page.

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![MLflow trace of the first prompt. The trace has the tag skill\_invocation\_sources. The breakdown lists tool\_ToolSearch, tool\_Bash, four tool\_Read spans, tool\_WebFetch, tool\_mcp\_\_stitch\_\_list\_projects, tool\_AskUserQuestion and another tool\_WebFetch. The chat panel shows my spoken prompt about defining the theme of our website with a link to aem.live dev-collab-and-good-practices, and the assistant answering that it will gather the good-practices doc, the current default theme and the teaser block with all its variations before touching Stitch, loading tools and reading local files in parallel.][image5] |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| The start of the first prompt in MLflow. Reads and a web fetch run before the first Stitch call.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

One thing that's very cool: the agent figures out what it needs to do and then does it in parallel. I've noticed Claude Opus 4.7 with the million-token context window does this quite often. It runs its research side by side, so you're not waiting for one lookup to finish before the next one starts. From a developer's point of view, that saves quite a bit of time.

Then I got a pleasant surprise. I'd forgotten I already had the Stitch MCP server configured on my machine at the user level. So instead of me pasting a prompt into Stitch, the agent drove Stitch directly through MCP, and steps one and two merged. With AI, sometimes the best-laid plans just change, and you go with it.

Watch this part [1:15 One long prompt](https://youtu.be/2BZ8QHUxc-E?t=75) [2:29 Research in parallel](https://youtu.be/2BZ8QHUxc-E?t=149) [7:14 Back to the plan](https://youtu.be/2BZ8QHUxc-E?t=434)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-2 |
+---------+--------+

---

## 3. Designing the theme in Stitch, between Apple and Adobe

Partway through, the agent stopped and asked me design questions as multiple choice, and I answered on the spot. Everyone likes Apple's and Adobe's clean design, so I asked for research on both and a hybrid somewhere between Apple and Adobe. Light, not dark. As with all things AI, I was improvising.

We also went a little backwards. Usually you have a design, then you build the variations. Here the teaser block already existed, built with content-driven development, so Stitch made proper designs for each teaser variant on top of the general theming. It created a Stitch project and a design system, then the typography and the teaser cards.

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Google Stitch project EDS, Apple by Adobe Hybrid Theme. On the right, a Teaser variants screen with two cards, The Future of Content Authoring and Sustainable Digital Ecosystems, each with a small uppercase eyebrow and a small uppercase blue pill button. On the left, Stitch's notes: both the 2-column and 4-column teaser grids use an 8px corner radius and faint tonal lifts; headlines use Inter with tight tracking and Source Sans 3 for body copy; the palette is anchored by #1d1d1f ink and #1473e6 brand blue; button specimens show the pill-style primary blue, outlined secondary and red accent fill.][image6] |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| The teaser variants in Stitch. Its notes name the fonts and colors that ended up in the site's CSS.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

I'm not a designer, and a designer would probably have opinions on this. What I can say is that AI helped me prototype something that a year ago wouldn't even have been possible. Credit where it's due: Magic, one of the first MCP servers I experimented with about ten months earlier, generated UI in a similar way. Stitch works at a much higher level, both in creating design and in presenting it.

Watch this part [3:23 Answering Stitch's questions](https://youtu.be/2BZ8QHUxc-E?t=203) [4:29 Designing backwards from the teaser](https://youtu.be/2BZ8QHUxc-E?t=269) [5:49 Credit to Magic](https://youtu.be/2BZ8QHUxc-E?t=349)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-3 |
+---------+--------+

---

## 4. Wiring the design into styles.css, fonts and the teaser

When the agent asked what to do next, I said implement it now. On an Edge Delivery site, most of a theme lives in one place. The boilerplate's `styles/styles.css` starts with a `:root` block of CSS custom properties for colors, fonts and sizes, and every block reads from those. Fonts load from `styles/fonts.css`, and each block has its own CSS on top. The agent edited all three. Here's the new `:root`. Line 14, left out here, is a comment naming the Stitch design system, Considered Clarity:

+------------------------------------------------------------------------------------------------------------------------------------------------------+
| Code                                                                                                                                                 |
+------------------------------------------------------------------------------------------------------------------------------------------------------+
| styles/styles.css, lines 13 to 28                                                                                                                    |
|                                                                                                                                                      |
| [d6355ee on GitHub](https://github.com/jackzhaojin/eds-skill-assess-2026-05/blob/d6355ee4f21281d39c13cff360b546a944b2a15f/styles/styles.css#L13-L28) |
+------------------------------------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                                                  |
| :root {                                                                                                                                              |
|   --background-color: #fff;                                                                                                                          |
|   --light-color: #f5f5f7; /* Apple grey: alternating sections, card surfaces */                                                                      |
|   --dark-color: #424245; /* Apple dark grey for subtle UI */                                                                                         |
|   --text-color: #1d1d1f; /* near-black ink, never pure #000 */                                                                                       |
|   --muted-color: #6e6e73; /* secondary text, eyebrows */                                                                                             |
|   --border-color: #e8e8ed; /* hairline, low-contrast separators */                                                                                   |
|   --link-color: #1473e6; /* primary blue, between Apple #0071e3 & Adobe #2680eb */                                                                   |
|   --link-hover-color: #0d5fc4;                                                                                                                       |
|   --accent-color: #e34850; /* Adobe red, reserved for high-impact CTAs */                                                                            |
|   --accent-hover-color: #d3373f;                                                                                                                     |
|                                                                                                                                                      |
|   /* fonts */                                                                                                                                        |
|   --body-font-family: source-sans, source-sans-fallback, sans-serif;                                                                                 |
|   --heading-font-family: inter, inter-fallback, sans-serif;                                                                                          |
| ```                                                                                                                                                  |
+------------------------------------------------------------------------------------------------------------------------------------------------------+

The boilerplate's six color tokens were re-pointed and four new ones added. Roboto and Roboto Condensed went out, with their four font files. Inter and Source Sans 3 came in as variable fonts, each with a fallback face sized against Arial so the page doesn't jump when they load.

The sample teaser below starts with the finished theme. Each switch puts one group back to the boilerplate value, so you can see how much of the look comes from a few lines of CSS. It's also why theming deserves its own pass: these tokens restyle every block on the site, not only the teaser.

+-------------------------------------------------------------------------------------------------------------------------------+
| Explainer (theme swap)                                                                                                        |
+-------------------------------------------------------------------------------------------------------------------------------+
| Simplified half-size teaser, real values from styles.css                                                                      |
|                                                                                                                               |
| [diff](https://github.com/jackzhaojin/eds-skill-assess-2026-05/commit/d6355ee4f21281d39c13cff360b546a944b2a15f)               |
+-------------------------------------------------------------------------------------------------------------------------------+
| - Stitch colors                                                                                                               |
| - Stitch fonts                                                                                                                |
| - Stitch buttons                                                                                                              |
+-----------------------------------------+-------------------------------------------------------------------------------------+
| Teaser block showcase                   | MLflow \+ EDS                                                                       |
|                                         |                                                                                     |
| One block, four variants. Authored as a | Auto-trace every block you build                                                    |
| `teaser` block with a variant class.    |                                                                                     |
|                                         | This very page was created while MLflow recorded each tool call.                    |
| Read the <u>quick start guide</u> next. |                                                                                     |
|                                         | - View traces                                                                       |
|                                         | - Explore the repo                                                                  |
+-----------------------------------------+---------------------------+---------------------------------------------------------+
| Token                                   | Boilerplate               | Stitch theme                                            |
+-----------------------------------------+---------------------------+-----------------------------+---------------------------+
| `--text-color`                          | \#131313                  | \#1d1d1f                    | colors                    |
+-----------------------------------------+---------------------------+-----------------------------+---------------------------+
| `--link-color`                          | \#3b63fb                  | \#1473e6                    | colors                    |
+-----------------------------------------+---------------------------+-----------------------------+---------------------------+
| `--light-color`                         | \#f8f8f8                  | \#f5f5f7                    | colors                    |
+-----------------------------------------+---------------------------+-----------------------------+---------------------------+
| `--dark-color`                          | \#505050                  | \#424245                    | colors                    |
+-----------------------------------------+---------------------------+-----------------------------+---------------------------+
| `--muted-color`                         | none                      | \#6e6e73                    | colors                    |
+-----------------------------------------+---------------------------+-----------------------------+---------------------------+
| `--accent-color`                        | none                      | \#e34850                    | colors                    |
+-----------------------------------------+---------------------------+-----------------------------+---------------------------+
| `--heading-font-family`                 | roboto-condensed          | inter                       | fonts                     |
+-----------------------------------------+---------------------------+-----------------------------+---------------------------+
| `--body-font-family`                    | roboto                    | source-sans                 | fonts                     |
+-----------------------------------------+---------------------------+-----------------------------+---------------------------+
| `.button` style                         | 2.4em radius, weight 500  | pill, uppercase, weight 700 | buttons                   |
+-----------------------------------------+---------------------------+-----------------------------+---------------------------+
| `.button.primary`                       | text color fill           | link color fill             | buttons                   |
+-----------------------------------------+---------------------------+-----------------------------+---------------------------+
| The finished theme from the commit: Stitch colors, fonts and buttons.                                                         |
+-------------------------------------------------------------------------------------------------------------------------------+

For testing, the agent started the local dev server on `localhost:3000` and used the Playwright CLI as a skill. It took its own screenshots, read them, and acted on what it saw. Having the right skill certainly helps here.

It also did one thing I wouldn't do. It didn't realize the content was already on the server, so it built a local HTML page instead, `drafts/theme-preview.plain.html`, filled with sample content it wrote itself. Adobe's content-driven-development skill does describe local HTML as a temporary option for test content, but it's certainly not what I'd do in any real production setting. Since this was an experiment and MLflow was capturing everything, I let it go.

The first prompt ran for about twenty minutes without me. Around fifteen minutes in, it was still going, nonstop, on that one prompt. It's a good example of how long Claude can work without a lot of human interference.

Watch this part [8:14 Testing on localhost](https://youtu.be/2BZ8QHUxc-E?t=494) [9:23 The local HTML](https://youtu.be/2BZ8QHUxc-E?t=563) [9:57 Twenty minutes in](https://youtu.be/2BZ8QHUxc-E?t=597)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-4 |
+---------+--------+

---

## 5. The calls to action missed, and a second prompt fixed them

I asked the agent to open the teaser page in Chrome so I could compare it with the Stitch design. The theming looked good, and the site looked much better than the boilerplate. I liked the card shadow. But the calls to action were way off.

The three tabs below are the same teaser cards at each stage: the Stitch design the agent was working from, the first prompt's result, and the second prompt's fix. Look at the buttons: their case, their size and where they sit in the card.

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Compare (touch)                                                                                                                                                                                                                         |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| The Stitch design       | ![The Stitch design for two teaser cards: small uppercase eyebrows, large headings, and small uppercase blue pill buttons, Explore specs and Learn more][image7]                                              |
|                         |                                                                                                                                                                                                               |
|                         | The Stitch design: small uppercase labels on blue pills.                                                                                                                                                      |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| After the first prompt  | ![The site after the first prompt: three cards with sentence-case blue buttons, Explore Studio, See benchmarks and Try Canvas, sitting at different heights, followed by a two-up highlights section][image8] |
|                         |                                                                                                                                                                                                               |
|                         | After the first prompt, on the agent's local test page: sentence-case buttons at uneven heights.                                                                                                              |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| After the second prompt | ![The live teaser page today: two cards with uppercase eyebrows, Quick start and Author kit, and full-width blue pill buttons, See the guide and Browse blocks, aligned at the bottom of each card][image9]   |
|                         |                                                                                                                                                                                                               |
|                         | After the second prompt, on the live `/teasers` page, captured October 3, 2026.                                                                                                                               |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

So I sent a second prompt, through voice-to-text again: how did we miss the teaser, and how do we fix the calls to action? This one ran for 10 minutes and 23 seconds. The agent worked out that the theming was right but the teaser wasn't as accurate as it should be, went back, and got the call to action exactly where it needed to be on all four cards.

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![The agent's summary in the terminal after the second prompt. It says the CTAs now match the Stitch comp: bold uppercase tracked Inter labels; full-width filled blue pills for cards-2 and cards-3; lighter DETAILS arrow text links for cards-4; the banner keeps the red accent and outlined secondary. It lists what it matched from the Stitch-generated CSS, the files it changed, and one judgment call: the Stitch project uses sentence case on the homepage screen but uppercase on the variants sheet, and it went with uppercase. The footer reads Crunched for 10m 23s.][image10] |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| The agent's own summary of the fix. Note the judgment call it flagged about the Stitch project.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

The summary shows something I liked. The Stitch project was internally inconsistent, sentence case on one screen and uppercase on the button reference sheet. The agent flagged that as a judgment call and told me which one it picked. Most of the fix was CSS in `teaser.css`: equal-height cards with the links pinned to the bottom, full-width buttons on the two- and three-card variants, and arrow links on the four-card one. One change was in the block's JavaScript, so the banner, the high-impact unit, gets the red accent button:

+------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Code                                                                                                                                                       |
+------------------------------------------------------------------------------------------------------------------------------------------------------------+
| blocks/teaser/teaser.js, lines 40 to 42                                                                                                                    |
|                                                                                                                                                            |
| [d6355ee on GitHub](https://github.com/jackzhaojin/eds-skill-assess-2026-05/blob/d6355ee4f21281d39c13cff360b546a944b2a15f/blocks/teaser/teaser.js#L40-L42) |
+------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                                                        |
|   // banner is the high-impact unit: its first CTA uses the reserved accent (red);                                                                         |
|   // card variants use the standard primary (blue).                                                                                                        |
|   const primaryClass = variant === 'banner' ? 'accent' : 'primary';                                                                                        |
| ```                                                                                                                                                        |
+------------------------------------------------------------------------------------------------------------------------------------------------------------+

Watch this part [10:36 Comparing with Stitch](https://youtu.be/2BZ8QHUxc-E?t=636) [11:04 The second prompt](https://youtu.be/2BZ8QHUxc-E?t=664) [11:34 The fixed calls to action](https://youtu.be/2BZ8QHUxc-E?t=694)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-5 |
+---------+--------+

---

## 6. Next time, theme first and blocks second, with better input for Stitch

Looking back through the MLflow trace for the first prompt, the agent did a lot of research in parallel, created the Stitch project and then the design system, stopped to ask me its questions, then moved on to editing. It edited `styles.css` and understood what users are supposed to do on the teaser. Claude is also quite good at testing its own work: the Playwright CLI takes a screenshot, and the agent reads it and acts on it. For a single session, I'd call this fairly successful. The agent themed the site, prototyped the design in Stitch, and made it real in EDS.

There are two things I'd do differently:

1. Never theme the main site and the teaser at the same time. Focus on one thing at a time, and the theming first. It's really important to get the theming right, and doing both at once is how the agent nailed one and missed the other.
2. Give Stitch more deterministic, thoughtful instructions up front. If I had known one prompt would carry the whole flow through MCP from beginning to end, I would have put more context into it.

In August I came back to design on EDS from Adobe's side with [Adobe Stardust](/writing/2026-08-09-adobe-stardust-explained/), and compared it with a block library I had designed in Google Stitch. If you've themed a greenfield EDS site with an agent, I'd like to hear how you split the passes.

Watch this part [12:13 The trace](https://youtu.be/2BZ8QHUxc-E?t=733) [13:27 Two things I'd do differently](https://youtu.be/2BZ8QHUxc-E?t=807)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-6 |
+---------+--------+

---

## Related

+-----------------------------------------------------------------------------------------------------------------------------------------+
| Row List                                                                                                                                |
+-----------+--------------------------------------------------------------------------------------+--------------------------------------+
| Article   | [Adobe's EDS skills on a real build](/writing/2026-05-17-adobe-eds-skills-hands-on/) | Where this site and its teaser block |
|           |                                                                                      | came from.                           |
+-----------+--------------------------------------------------------------------------------------+--------------------------------------+
| Article   | [Adobe Stardust explained](/writing/2026-08-09-adobe-stardust-explained/)            | Adobe's design skill, compared       |
|           |                                                                                      | against a Stitch baseline.           |
+-----------+--------------------------------------------------------------------------------------+--------------------------------------+
| Portfolio | [Conversion Factory](/portfolio/conversion-factory/)                                 | Agents that evolve blocks on an Edge |
|           |                                                                                      | Delivery site.                       |
+-----------+--------------------------------------------------------------------------------------+--------------------------------------+

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
| title                   | Theming an EDS Site with Google Stitch and MCP \| Jack Jin                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| description             | Theme a new Edge Delivery site in three steps: define the theme, design it in Google Stitch, wire it back through MCP. The real tokens, the miss and the fix.                                                                                                                                                                                                                                                                                                                                                                                                                            |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| template                | article                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image                   | ![My hand-drawn board: theming our new EDS site in three steps, define the theme, use Google Stitch, then Stitch MCP to theme the site and the teaser][image11]                                                                                                                                                                                                                                                                                                                                                                                                                          |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image:alt               | My hand-drawn board: theming our new EDS site in three steps, define the theme, use Google Stitch, then Stitch MCP to theme the site and the teaser                                                                                                                                                                                                                                                                                                                                                                                                                                      |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| published-time          | 2026-05-24                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| modified-time           | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| json-ld                 | {"@context":"https\://schema.org","@graph":\[{"@type":"Person","@id":"https\://www\.jackzhaojin.com/#person","name":"Jack Jin","url":"https\://www\.jackzhaojin.com/","jobTitle":"Associate Director","worksFor":{"@type":"Organization","name":"Accenture","department":{"@type":"Organization","name":"Adobe Business Group"}},"sameAs":\["https\://www\.linkedin.com/in/jackjin","https\://github.com/jackzhaojin","https\://www\.youtube.com/@jackjin8467","https\://www\.credly.com/users/jack-jin"],"award":\["Adobe Experience Manager Champion, class of 2026-2027","AEM         |
|                         | Rockstar winner, Adobe Summit 2024"]},{"@type":"WebSite","@id":"https\://www\.jackzhaojin.com/#website","url":"https\://www\.jackzhaojin.com/","name":"Jack Jin","publisher":{"@id":"https\://www\.jackzhaojin.com/#person"}},{"@type":"TechArticle","@id":"https\://www\.jackzhaojin.com/writing/2026-05-24-theming-eds-with-google-stitch/#article","headline":"Theming a Brand-New EDS Site with Google Stitch and MCP: One Prompt, Three Steps, Two Lessons","description":"Theme a new Edge Delivery site in three steps: define the theme, design it in Google Stitch, wire it     |
|                         | back through MCP. The real tokens, the miss and the fix.","author":{"@id":"https\://www\.jackzhaojin.com/#person"},"publisher":{"@id":"https\://www\.jackzhaojin.com/#person"},"image":"https\://www\.jackzhaojin.com/writing/2026-05-24-theming-eds-with-google-stitch/media\_1444244aa1673941c64ebb086738c6d536d91b2f9.jpg","mainEntityOfPage":"https\://www\.jackzhaojin.com/writing/2026-05-24-theming-eds-with-google-stitch/","isPartOf":{"@id":"https\://www\.jackzhaojin.com/#website"},"about":\["Edge Delivery Services","Google Stitch","Model Context Protocol","CSS custom  |
|                         | properties","Claude Code"],"datePublished":"2026-05-24","dateModified":"2026-10-04","inLanguage":"en","video":{"@id":"https\://www\.jackzhaojin.com/writing/2026-05-24-theming-eds-with-google-stitch/#video"}},{"@type":"VideoObject","@id":"https\://www\.jackzhaojin.com/writing/2026-05-24-theming-eds-with-google-stitch/#video","name":"Theming an EDS Site from Scratch with Google Stitch MCP","description":"Theming a brand-new Edge Delivery Services site in three steps: define the theme, generate it in Google Stitch, and wire it back into the site through the Stitch  |
|                         | MCP server, traced in                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|                         | MLflow.","thumbnailUrl":"https\://www\.jackzhaojin.com/writing/2026-05-24-theming-eds-with-google-stitch/media\_1444244aa1673941c64ebb086738c6d536d91b2f9.jpg","uploadDate":"2026-05-27T03:55:47Z","duration":"PT14M23S","embedUrl":"https\://www\.youtube-nocookie.com/embed/2BZ8QHUxc-E"},{"@type":"BreadcrumbList","@id":"https\://www\.jackzhaojin.com/writing/2026-05-24-theming-eds-with-google-stitch/#breadcrumb","itemListElement":\[{"@type":"ListItem","position":1,"name":"Home","item":"https\://www\.jackzhaojin.com/"},{"@type":"ListItem","position":2,"name":"Technical |
|                         | Writing","item":"https\://www\.jackzhaojin.com/writing/"},{"@type":"ListItem","position":3,"name":"Theming EDS with Google Stitch","item":"https\://www\.jackzhaojin.com/writing/2026-05-24-theming-eds-with-google-stitch/"}]}]}                                                                                                                                                                                                                                                                                                                                                        |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| og:image:alt            | My hand-drawn board: theming our new EDS site in three steps, define the theme, use Google Stitch, then Stitch MCP to theme the site and the teaser                                                                                                                                                                                                                                                                                                                                                                                                                                      |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:published\_time | 2026-05-24                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:modified\_time  | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:author          | https\://www\.jackzhaojin.com/                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-summary         | Theme a brand-new Edge Delivery site in three steps: define the theme, design it in Google Stitch, and wire it back through the Stitch MCP server, all in one long prompt. The real tokens that changed, the call-to-action miss, the fix, and why theming and blocks belong in separate passes.                                                                                                                                                                                                                                                                                         |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-image           | https\://www\.jackzhaojin.com/writing/media\_1444244aa1673941c64ebb086738c6d536d91b2f9.jpg?width=750\&format=jpg\&optimize=medium                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-topics          | Adobe AEM & EDS\|AI Engineering                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-reading-time    | 8 min read                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-video-time      | 14:23 video                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-url       | https\://youtu.be/2BZ8QHUxc-E                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-label     | Watch on YouTube                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-keywords        | google stitch stitch mcp model context protocol edge delivery services eds theming styles.css css custom properties aem-boilerplate claude opus 4.7 mlflow playwright cli teaser block inter source sans 3                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_1c70097d24de33a6283023059ad8a733b4652cc49.png#width=144&height=92

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_17dc410ff7ccf6cb930505e4f1ee8ca05cfec99b8.jpg#width=144&height=92

[image2]: https://main--www-eds--jackzhaojin.aem.page/media_1df5207cd19ae2849fb1044217ec68c55d4b19142.jpg#width=144&height=92

[image3]: https://main--www-eds--jackzhaojin.aem.page/media_10c7dcd548b3344c4b9421e1df0695615aae0d3a2.jpg#width=144&height=92

[image4]: https://main--www-eds--jackzhaojin.aem.page/media_11a37375528c3de8b955bd9a3b92d2b179cbc70dc.png#width=1600&height=588

[image5]: https://main--www-eds--jackzhaojin.aem.page/media_1b1eb298b97e4a0662f7c2c6f1c6a99da4f695665.jpg#width=1157&height=715

[image6]: https://main--www-eds--jackzhaojin.aem.page/media_1c7e5cfd691bac989dcbb06f2e73be77f4cd62eb4.jpg#width=1280&height=761

[image7]: https://main--www-eds--jackzhaojin.aem.page/media_19042ae7fd8ee022c40bb112e4eae45900df8e4bc.jpg#width=1280&height=720

[image8]: https://main--www-eds--jackzhaojin.aem.page/media_19bf89abc249d2439182cb4fb89fe62f16fbe3013.jpg#width=1280&height=720

[image9]: https://main--www-eds--jackzhaojin.aem.page/media_1ff9ad1a968724a02f0b4c685e3991b6b621ec75d.jpg#width=1280&height=720

[image10]: https://main--www-eds--jackzhaojin.aem.page/media_17d12ba07c0e57ba4aed351893c3773dd384698aa.jpg#width=1280&height=523

[image11]: https://main--www-eds--jackzhaojin.aem.page/media_1444244aa1673941c64ebb086738c6d536d91b2f9.jpg#width=1280&height=720
