1. [Home](/)
2. [Technical Writing](/writing/)
3. Four Frontier Models, One Prompt

# Four Frontier Models, One 1,032-Line Prompt: What Each Built, and the Merge I Kept

By [Jack Jin](/) · July 21, 2026 · Updated October 4, 2026 · 9 min read · Includes my 14:15 video

Picking which AI model to pay for is hard, so I ran my own test. GPT 5.6, Kimi K3, Gemini 3.5 Flash and Claude Fable 5 each built my portfolio site from the same 1,032-line prompt, on top of about 5,000 lines of context about my work. I graded the four sites in a paper notebook, ranked them, then had AI merge the best of all four into one site.

---

+-----------------------------------------------------------------+
| Rail                                                            |
+-----------------+-----------------------------------------------+
| ![][image0]     | **Part 1**\                                   |
|                 | [One prompt, four ingredients](#part-1)       |
+-----------------+-----------------------------------------------+
| ![][image1]     | **Part 2**\                                   |
|                 | [GPT 5.6, best home screen](#part-2)          |
+-----------------+-----------------------------------------------+
| ![][image2]     | **Part 3**\                                   |
|                 | [Kimi K3, deepest on context](#part-3)        |
+-----------------+-----------------------------------------------+
| ![][image3]     | **Part 4**\                                   |
|                 | [Gemini 3.5 Flash, most basic](#part-4)       |
+-----------------+-----------------------------------------------+
| ![][image4]     | **Part 5**\                                   |
|                 | [Claude Fable 5, most premium](#part-5)       |
+-----------------+-----------------------------------------------+
| ![][image5]     | **Part 6**\                                   |
|                 | [The merge, and what it kept](#part-6)        |
+-----------------+-----------------------------------------------+
| ![][image6]     | **Wrap-up**\                                  |
|                 | [What I took away, which to pay for](#part-7) |
+-----------------+-----------------------------------------------+
| [Watch the video, 14:15](#video)                                |
+-----------------------------------------------------------------+

---

Most of the video is me going through each model's site, one at a time, with the pros and cons from my notebook. This page follows the same order, and each part links to its moment in the video.

---

+-----------------------------------------------------------------------------------------------------------------------------------+
| Figure                                                                                                                            |
+-----------------------------------------------------------------------------------------------------------------------------------+
| [I Made 4 Frontier Models Build My Portfolio Site With the Same 1,032-Line Prompt](https://youtu.be/twYqEHXh91U)                  |
|                                                                                                                                   |
| Recorded July 21, 2026. Each part below links to its moment in the video, or [watch it on YouTube](https://youtu.be/twYqEHXh91U). |
+-----------------------------------------------------------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------------------------------------------+
| Fine Print                                                                                                           |
+----------------------------------------------------------------------------------------------------------------------+
| First published on LinkedIn on July 21, 2026. Rewritten for this site in October 2026. Line counts on this page come |
| from the five builds as they were on the night of the video.                                                         |
+----------------------------------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| id      | video  |
+---------+--------+

---

## 1. One 1,032-line prompt built from four ingredients

I made it challenging on purpose. The prompt is 1,032 lines, and it is a merge of four things.

- A mountain of context. A library of 48 files, 4,817 lines of markdown, mined from every project, post and talk of the last 18 months. The library has its own catalogs and indexes, and the models read what they need. So this also tests whether a model can traverse a lot of context to do a thing.
- A common design from Google Stitch, about 990 lines of HTML, so all four sites start from the same visual language. In theory the result should look a lot better than my old blogs and videos page, which works but isn't what I'd call premium.
- Premium storytelling. I'm exploring different ways to present the material, and I called out Adobe here: I think their SLICC site looks very cool, the way it tells you a story as you scroll. My prompt asks for four themes, every project told inside one of them, as a single-page scroll story.
- Ground rules. Three files, HTML, CSS and JavaScript, and build on the prior work instead of redoing it.

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Page titled The Experiment: 4 frontier models, the exact same prompt. A prompt.txt panel lists four ingredients: a mountain of context (48 files, about 5,000 lines, 18 months of projects, posts and talks), a design from Stitch (about 990 lines of HTML), premium storytelling (4 themes, single-page scroll story, carousels and video) and ground rules (3 files, HTML, CSS and JS, build on prior work). To the right, cards for GPT 5.6, Gemini 3.5 Flash, Kimi K3 and Fable 5, each labeled same prompt.][image7] |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| The page I opened the video with: four ingredients in, one 1,032-line `prompt.txt`, the same input four times.                                                                                                                                                                                                                                                                                                                                                                                                               |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

I judged each one on four things: how it interpreted the situation, how it handled that much context, whether it made things up, and how well it did premium storytelling on top of the design. Because they all got the same design and the same library, the four sites came back looking like siblings. The differences are in the details: animations, interactions, and what holds up and what breaks. The tabs below are the four home screens and the merged one, at the same size. Look for how alike they are; that is the shared design and library doing its job.

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Compare (touch)                                                                                                                                                                  |
+------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------+
| GPT 5.6          | ![GPT 5.6 home screen: The patterns behind working with AI, with a list of the four patterns on the right][image8]                                            |
|                  |                                                                                                                                                               |
|                  | GPT 5.6: my favorite home screen                                                                                                                              |
+------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Kimi K3          | ![Kimi K3 home screen: Four patterns for working with AI, centered, with four pattern chips below][image9]                                                    |
|                  |                                                                                                                                                               |
|                  | Kimi K3: less in front of the material                                                                                                                        |
+------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Gemini 3.5 Flash | ![Gemini 3.5 Flash home screen: The Patterns Behind Working With AI, with two buttons and four pattern cards][image10]                                        |
|                  |                                                                                                                                                               |
|                  | Gemini 3.5 Flash: the most basic of the four                                                                                                                  |
+------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Claude Fable 5   | ![Claude Fable 5 home screen: Four patterns for working with AI, with a short paragraph about eighteen months of real builds and four pattern chips][image11] |
|                  |                                                                                                                                                               |
|                  | Claude Fable 5: the most complete build                                                                                                                       |
+------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------+
| The merge        | ![The merged home screen: GPT's layout with the pattern list on the right, and Kimi's wording, Four patterns for working with AI][image12]                    |
|                  |                                                                                                                                                               |
|                  | The merge: GPT's layout, Kimi's words                                                                                                                         |
+------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------+

Watch this part [0:12 5,000 lines of context](https://youtu.be/twYqEHXh91U?t=12) [0:43 A design from Stitch](https://youtu.be/twYqEHXh91U?t=43) [1:23 Premium storytelling](https://youtu.be/twYqEHXh91U?t=83)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-1 |
+---------+--------+

---

## 2. GPT 5.6 had my favorite home screen, and a glaring hole

First up, GPT 5.6 Sol, which I ran in Codex. When I first land on this screen, it looks quite nice. It's one of my favorite home screens. I don't love the navigation, but I like the home screen a lot.

As I scroll, the site looks pretty and it functions, but the navigation bar doesn't light up as I scroll. There is a scroll bar at the very top, but it's hard to see. The aesthetics are clean, and it did a good job mirroring Stitch. The carousel with overlapping cards is nice, there's animation as I scroll, and the slider is accurate.

What I didn't like: clickable elements that don't do anything. And then one screen came up with content missing. For a premium model, I did not expect that screen to ever come up. Overall it's visually pleasing with visual flaws, and highly usable as a base. I would use it.

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (page)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Handwritten notebook page titled Model Comparison. At the top, circled: content needs to be reworked, common. GPT 5.6 Sol: plus home screen look and feel and animation, plus clean blocks, plus interaction, plus scrolling animation; minus second screen content, minus interaction doesn't work, minus unfinished work, minus not working on the 4th tile, minus menu and top bar. Kimi: plus cleaner intro content, plus scrolling animation, plus content found, plus subslides with two exclamation points, minus accessibility, dark on dark.][image13] |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| My notebook, page one. The note at the top applies to every model: the content needs to be reworked.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Watch this part [2:22 GPT 5.6](https://youtu.be/twYqEHXh91U?t=142) [3:27 Clickable but does nothing](https://youtu.be/twYqEHXh91U?t=207)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-2 |
+---------+--------+

---

## 3. Kimi K3 dug deepest into the context, and made some up

Second, Kimi K3 in thinking mode, from Moonshot. It's one of the open-weight Chinese models competing with the top models right now. I've always liked Kimi's models because they're cheaper, and because I really like the slide decks it builds: pass in a few markdown files from a codebase and you get usable, editable slides full of accurate information that I'd be happy to take to a conference.

On the site, the first screen looks a little different. I still like GPT's more, but I like that there isn't a ton of information before you get to the material, and the navigation bar lights up as I scroll, which GPT's didn't. One part is very dark and hard to see; that may have come from the Stitch design, but I don't know how accessible it is. The carousel didn't have GPT's overlapping effect, but it works.

There are two animations I really liked. Agent work is tough to demonstrate, and one of them shows two things talking to each other. The other counts numbers up as you scroll down. Kimi also got the only double exclamation points in my notebook, for its subslides and its prompt animation. And it picked out the five parts of my talk. Kimi understood the 5,000 lines of context a little better than GPT did.

The part I didn't like: one piece completely missed the mark. It made up a bunch of stuff. In my notebook that's the minus next to the harness diagram. Overall, though, the navigation works better than GPT's, there's no glaring defect like GPT's missing content, and at the bottom it plotted my projects into categories on a timeline, which I don't think I asked for. I'm happy to see AI taking the premium storytelling to another level.

Watch this part [4:08 Kimi K3](https://youtu.be/twYqEHXh91U?t=248) [5:14 The site](https://youtu.be/twYqEHXh91U?t=314) [6:31 Five parts of my talk](https://youtu.be/twYqEHXh91U?t=391) [7:01 Made up](https://youtu.be/twYqEHXh91U?t=421)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-3 |
+---------+--------+

---

## 4. Gemini 3.5 Flash was the most disappointing of the four

Third, Gemini 3.5 Flash, set to high. I won't spend long here. It was the most disappointing model of the four we tested. It looks basic, it isn't premium storytelling, and the scrolling animation is extremely lacking. My notebook has no notes for it at all. Sorry, Google, we're moving on.

Watch this part [7:50 Gemini 3.5 Flash](https://youtu.be/twYqEHXh91U?t=470)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-4 |
+---------+--------+

---

## 5. Claude Fable 5 looked the most premium, with too much animation

Last, Claude Fable 5. It opens with a timeline chart, similar to Kimi's, except Claude made it navigable: click a project and it takes you to that part of the page. That's storytelling over a timeline, very well executed. I don't like that the items wrap onto two lines.

Some of it is too flashy. A few elements are too bright, and when I'm trying to read, things flashing next to the text are distracting. It tried a little too hard with the animation. I want interactive, but the site should be readable. Still, overall it looks very premium, and Fable took in the design system from Stitch very well. The carousel is my favorite of the four because it saves space, where Kimi's version ran too long. It also found the outbound links, so every project points to the real post, and it had a typing animation and the best slider.

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (page)                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Handwritten notebook page. Kimi continued: plus prompt animation with two exclamation points, minus harness diagram, plus visual of timeline and projects. Claude: minus intro view, plus navigable timeline, plus outbound links, plus typing animation, plus slides in a carousel on diagrams, minus animation a bit distracting, I want interactive but site should be readable, plus best slider, plus good animation, some does not distract.][image14] |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Page two: the rest of Kimi, and Claude. "I want interactive, but site should be readable" became a rule for the merge.                                                                                                                                                                                                                                                                                                                                         |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Comparing all four, I'd rank Fable number one, Kimi number two and Codex, GPT 5.6, number three, especially because GPT literally had missing content in its HTML. I know it's a one-shot, but we're comparing state-of-the-art models now.

Watch this part [8:14 Claude Fable 5](https://youtu.be/twYqEHXh91U?t=494) [10:03 My ranking](https://youtu.be/twYqEHXh91U?t=603)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-5 |
+---------+--------+

---

## 6. Merging the best of all four, and what the merge really kept

Then I took all four and told AI to merge them. This is the important part, because there are clearly elements I like and don't like in each one. I took my paper notes, photographed them and uploaded them to Fable 5: pluses are good, minuses are bad. In case it couldn't read my scribbles, it asked me eight multiple-choice questions. Then it built a combined page from the elements I liked.

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![The merge session. AI summarizes: benefit is not starting from scratch, you can react to sample work and want the best of all of it combined. Then eight questions with my answers, including: Claude base makes sense, intro screen could be a lot better like GPT's; ratio slider; calm default for looping animations; project timeline in its own section after the hero; GPT layout plus Kimi voice for the home screen; Claude and Kimi pastels; Claude's nav; and for Gemini, nothing.][image15] |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| The eight questions it asked me, with my answers. The first one set Claude's build as the base the others were grafted onto.                                                                                                                                                                                                                                                                                                                                                                              |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

So the final has GPT's home screen, Kimi's animation and scrolling, and Claude's navigation. I felt it took more of Kimi's HTML, which was a more faithful take on the original Stitch design. I also told AI to dim the animations once they stop, so they aren't overly aggressive, and it did a really good job of that. The numbers count up like in Kimi's and Claude's, and I took the carousel view.

Afterward I wanted to see what the merge actually kept, so I traced every line of the final files back to the four builds. Pick a model below. On the left is what I said I kept from it; on the right, how many lines of the final site appear only in that model's build. For Claude the two agree. For Kimi and GPT they don't, and the gap is the point of the next paragraph.

+--------------------------------------------------------------------------------------------------------------------------+
| Explainer (model merge)                                                                                                  |
+--------------------------------------------------------------------------------------------------------------------------+
| What I said I kept, and what the lines say                                                                               |
+-----------------------------+--------------------------------+-----------------------------------------------------------+
| Model                       | What I said I kept from        | The final site's 1,714 lines, by where they came from     |
+-----------------------------+--------------------------------+-----------------------------------------------------------+
| Claude Fable 5              | - The foundation the others    | They agree. Claude was the base, and 1,121 of the 1,714   |
|                             |   were grafted onto            | lines (65%) appear only in its build.                     |
|                             | - The navigation and the       |                                                           |
|                             |   navigable timeline           |                                                           |
|                             | - The carousel view and the    |                                                           |
|                             |   slider                       |                                                           |
|                             | - The numbers that count up,   |                                                           |
|                             |   shared with Kimi             |                                                           |
+-----------------------------+--------------------------------+-----------------------------------------------------------+
| Kimi K3                     | - The scrolling and the        | They don't agree. Only 14 lines (under 1%) appear only in |
|                             |   animation                    | Kimi's build. What I kept from Kimi was a look and a      |
|                             | - The numbers that count up    | behavior, and it mostly came in as new code.              |
|                             |   as you scroll                |                                                           |
|                             | - Its HTML, which I felt       |                                                           |
|                             |   followed the Stitch design   |                                                           |
|                             |   more faithfully              |                                                           |
|                             | - The pastel palette, shared   |                                                           |
|                             |   with Claude                  |                                                           |
+-----------------------------+--------------------------------+-----------------------------------------------------------+
| GPT 5.6                     | - The home screen: its         | They don't agree. Only 25 lines (1.5%) appear only in     |
|                             |   layout, look and feel        | GPT's build. The home screen I kept mostly came in as new |
|                             | - Paired with Kimi's words.    | code on Claude's skeleton.                                |
|                             |   My answer to the merge       |                                                           |
|                             |   question was "GPT layout,    |                                                           |
|                             |   Kimi voice"                  |                                                           |
+-----------------------------+--------------------------------+-----------------------------------------------------------+
| Gemini 3.5 Flash            | - Nothing. Asked whether       | They agree. I kept nothing, and only 4 lines appear only  |
|                             |   anything was worth saving, I | in Gemini's build.                                        |
|                             |   said no.                     |                                                           |
+-----------------------------+--------------------------------+-----------------------------+-----------------------------+
| Distinct lines in the final | HTML                           | CSS                         | JS                          |
+-----------------------------+--------------------------------+-----------------------------+-----------------------------+
| Only in Claude Fable 5      | 459                            | 425                         | 237                         |
+-----------------------------+--------------------------------+-----------------------------+-----------------------------+
| Only in Kimi K3             | 1                              | 11                          | 2                           |
+-----------------------------+--------------------------------+-----------------------------+-----------------------------+
| Only in GPT 5.6             | 5                              | 19                          | 1                           |
+-----------------------------+--------------------------------+-----------------------------+-----------------------------+
| Only in Gemini 3.5 Flash    | 0                              | 0                           | 4                           |
+-----------------------------+--------------------------------+-----------------------------+-----------------------------+
| In two or more builds       | 31                             | 148                         | 19                          |
+-----------------------------+--------------------------------+-----------------------------+-----------------------------+
| New in the merge            | 67                             | 167                         | 118                         |
+-----------------------------+--------------------------------+-----------------------------+-----------------------------+
| Total                       | 563                            | 770                         | 381                         |
+-----------------------------+--------------------------------+-----------------------------+-----------------------------+
| Each distinct non-blank line of the final HTML, CSS and JavaScript (1,714 in all), matched against the four builds. A    |
| line found in exactly one build counts for that model. A line in none of them was written during the merge. The left     |
| column comes from the video and my answers to the merge questions.                                                       |
+--------------------------------------------------------------------------------------------------------------------------+

The trace says something I didn't say on camera. Line for line, the final is Claude's skeleton: more than half of every file appears only in Claude's build. What I picked from GPT and Kimi, the home screen layout and the scrolling, mostly came in as new code written to match them, which is why the merge added hundreds of lines no model wrote. A line count can't see a design choice, so both views are true. The skeleton is Claude's, and the feel is a mix of all three.

The one benefit I wrote down for myself: I'm not starting from scratch. I'm not a UX designer or a content designer, but seeing four versions of the same thing, I do have some taste. I can take what I like from all four and combine it into one, and for my taste the combined result is by far the best of the five.

Watch this part [10:29 Merging all four](https://youtu.be/twYqEHXh91U?t=629) [11:00 Eight questions](https://youtu.be/twYqEHXh91U?t=660) [11:36 The combined site](https://youtu.be/twYqEHXh91U?t=696)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-6 |
+---------+--------+

---

## 7. What I took away, and which model to pay for

Being able to run this test with all four frontier models, take what I liked from each and put it together into one final output is something you could do for many different tasks, not just storytelling in HTML. You don't have to pick one model up front. Make them compete, keep the best of each, and merge.

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (page)                                                                                                                                                                |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Handwritten notebook page: 1, Benefit. Not starting from scratch, I'm not UX and content designer but I see sample work and have thoughts. Best of all the work.][image16] |
|                                                                                                                                                                              |
| Page three, the takeaway, written before I recorded.                                                                                                                         |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

On the subscription question I opened with: I'm fortunate to have a paid subscription to each of these, at enough capacity to run tests like this without draining any one of them. All of them are good. ChatGPT's plans get you further for the money than Fable's. Fable is clearly the state-of-the-art model that everyone is competing against. And Kimi K3 is good, especially if you like its slide and deck building; I pay for Kimi so I can build decks and run some of my work in its cloud.

If you've run your own bake-off on a real project, I'd like to know whether you crowned a winner or merged like I did.

Watch this part [13:05 What I took away](https://youtu.be/twYqEHXh91U?t=785) [13:18 Choosing a model](https://youtu.be/twYqEHXh91U?t=798)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-7 |
+---------+--------+

---

## Related

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Row List                                                                                                                                                           |
+-----------+----------------------------------------------------------------------------------------------------------------+---------------------------------------+
| Portfolio | [Portfolio](/portfolio/)                                                                                       | The project portfolio this experiment |
|           |                                                                                                                | was building toward.                  |
+-----------+----------------------------------------------------------------------------------------------------------------+---------------------------------------+
| Article   | [Making AI-Driven Development Modules Reusable](/writing/2026-02-05-reusable-ai-development-modules/)          | Where I first described running one   |
|           |                                                                                                                | ramble through several models and     |
|           |                                                                                                                | merging the best.                     |
+-----------+----------------------------------------------------------------------------------------------------------------+---------------------------------------+
| Article   | [Theming a Brand-New EDS Site with Google Stitch and MCP](/writing/2026-05-24-theming-eds-with-google-stitch/) | Two months earlier, a Stitch design   |
|           |                                                                                                                | wired into an Edge Delivery site.     |
+-----------+----------------------------------------------------------------------------------------------------------------+---------------------------------------+

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
| title                   | Four Frontier Models, One Prompt: My Portfolio Bake-Off \| Jack Jin                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| description             | GPT 5.6, Kimi K3, Gemini 3.5 Flash and Claude Fable 5 built my portfolio from one 1,032-line prompt. What each got right and wrong, and the merge I kept.                                                                                                                                                                                                                                                                                                                                                                                                                                 |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| template                | article                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image                   | ![The merged portfolio home screen: Four patterns for working with AI, with the four patterns listed on the right][image17]                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image:alt               | The merged portfolio home screen: Four patterns for working with AI, with the four patterns listed on the right                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| published-time          | 2026-07-21                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| modified-time           | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| json-ld                 | {"@context":"https\://schema.org","@graph":\[{"@type":"Person","@id":"https\://www\.jackzhaojin.com/#person","name":"Jack Jin","url":"https\://www\.jackzhaojin.com/","jobTitle":"Associate Director","worksFor":{"@type":"Organization","name":"Accenture","department":{"@type":"Organization","name":"Adobe Business Group"}},"sameAs":\["https\://www\.linkedin.com/in/jackjin","https\://github.com/jackzhaojin","https\://www\.youtube.com/@jackjin8467","https\://www\.credly.com/users/jack-jin"],"award":\["Adobe Experience Manager Champion, class of 2026-2027","AEM Rockstar |
|                         | winner, Adobe Summit 2024"]},{"@type":"WebSite","@id":"https\://www\.jackzhaojin.com/#website","url":"https\://www\.jackzhaojin.com/","name":"Jack Jin","publisher":{"@id":"https\://www\.jackzhaojin.com/#person"}},{"@type":"TechArticle","@id":"https\://www\.jackzhaojin.com/writing/2026-07-21-four-frontier-models-one-prompt/#article","headline":"Four Frontier Models, One 1,032-Line Prompt: What Each Built, and the Merge I Kept","description":"GPT 5.6, Kimi K3, Gemini 3.5 Flash and Claude Fable 5 built my portfolio from one 1,032-line prompt. What each got right and |
|                         | wrong, and the merge I kept.","author":{"@id":"https\://www\.jackzhaojin.com/#person"},"publisher":{"@id":"https\://www\.jackzhaojin.com/#person"},"image":"https\://www\.jackzhaojin.com/writing/2026-07-21-four-frontier-models-one-prompt/media\_15c0f67eec9dddb80869840bfe75f0b3cedeab711.jpg","mainEntityOfPage":"https\://www\.jackzhaojin.com/writing/2026-07-21-four-frontier-models-one-prompt/","isPartOf":{"@id":"https\://www\.jackzhaojin.com/#website"},"about":\["GPT 5.6","Kimi K3","Gemini 3.5 Flash","Claude Fable 5","Google Stitch","Model                            |
|                         | comparison"],"datePublished":"2026-07-21","dateModified":"2026-10-04","inLanguage":"en","video":{"@id":"https\://www\.jackzhaojin.com/writing/2026-07-21-four-frontier-models-one-prompt/#video"}},{"@type":"VideoObject","@id":"https\://www\.jackzhaojin.com/writing/2026-07-21-four-frontier-models-one-prompt/#video","name":"I Made 4 Frontier Models Build My Portfolio Site With the Same 1,032-Line Prompt","description":"GPT 5.6, Kimi K3, Gemini 3.5 Flash and Claude Fable 5 each built my portfolio site from the same 1,032-line prompt and context library. A walkthrough  |
|                         | of all four, then the                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|                         | merge.","thumbnailUrl":"https\://www\.jackzhaojin.com/writing/2026-07-21-four-frontier-models-one-prompt/media\_15c0f67eec9dddb80869840bfe75f0b3cedeab711.jpg","uploadDate":"2026-07-23T03:18:39Z","duration":"PT14M15S","embedUrl":"https\://www\.youtube-nocookie.com/embed/twYqEHXh91U"},{"@type":"BreadcrumbList","@id":"https\://www\.jackzhaojin.com/writing/2026-07-21-four-frontier-models-one-prompt/#breadcrumb","itemListElement":\[{"@type":"ListItem","position":1,"name":"Home","item":"https\://www\.jackzhaojin.com/"},{"@type":"ListItem","position":2,"name":"Technical |
|                         | Writing","item":"https\://www\.jackzhaojin.com/writing/"},{"@type":"ListItem","position":3,"name":"Four Frontier Models, One Prompt","item":"https\://www\.jackzhaojin.com/writing/2026-07-21-four-frontier-models-one-prompt/"}]}]}                                                                                                                                                                                                                                                                                                                                                      |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| og:image:alt            | The merged portfolio home screen: Four patterns for working with AI, with the four patterns listed on the right                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:published\_time | 2026-07-21                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:modified\_time  | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:author          | https\://www\.jackzhaojin.com/                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-summary         | GPT 5.6, Kimi K3, Gemini 3.5 Flash and Claude Fable 5 each built my portfolio from the same 1,032-line prompt. What each got right and wrong in my notebook, my ranking, and what the merge really kept, line by line.                                                                                                                                                                                                                                                                                                                                                                    |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-image           | https\://www\.jackzhaojin.com/writing/media\_15c0f67eec9dddb80869840bfe75f0b3cedeab711.jpg?width=750\&format=jpg\&optimize=medium                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-topics          | AI Engineering                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-reading-time    | 9 min read                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-video-time      | 14:15 video                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-url       | https\://youtu.be/twYqEHXh91U                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-label     | Watch on YouTube                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-keywords        | gpt 5.6 codex kimi k3 moonshot gemini 3.5 flash claude fable 5 google stitch model comparison frontier models prompt engineering slicc                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_18004bca08543832917137c31da8efff67b66f38e.png#width=144&height=92

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_157959220eacb3fd6190001e793fd7f248f70d8a9.png#width=144&height=92

[image2]: https://main--www-eds--jackzhaojin.aem.page/media_1177781d92783434de01f6a08b58e8f386b0a2d52.png#width=144&height=92

[image3]: https://main--www-eds--jackzhaojin.aem.page/media_128c517ef44edae0d64674c6b4efdda5f34d19d6a.png#width=144&height=92

[image4]: https://main--www-eds--jackzhaojin.aem.page/media_17832cb93b374afea791ce34fba37d948f54a64d3.png#width=144&height=92

[image5]: https://main--www-eds--jackzhaojin.aem.page/media_1e0cd4f72eb2fd6de83c5d4ebbda7610824f3a320.png#width=144&height=92

[image6]: https://main--www-eds--jackzhaojin.aem.page/media_1f7fd3395aefc8971cdfa538afdf362694e6fa545.png#width=144&height=92

[image7]: https://main--www-eds--jackzhaojin.aem.page/media_13b748fd79c33c1b7314860f4273ad164d6ab3498.jpg#width=1400&height=640

[image8]: https://main--www-eds--jackzhaojin.aem.page/media_1e3e7487f8dec27fb780639361c9ea6226064de17.jpg#width=1280&height=800

[image9]: https://main--www-eds--jackzhaojin.aem.page/media_10e2658dc1ea6d24b928af945a788782673b799af.jpg#width=1280&height=800

[image10]: https://main--www-eds--jackzhaojin.aem.page/media_161c1bbc4efcdffc5e4240b5043f304e76c757899.jpg#width=1280&height=800

[image11]: https://main--www-eds--jackzhaojin.aem.page/media_13bbf339bfc24a30c9d16aa744906165ded96bf62.jpg#width=1280&height=800

[image12]: https://main--www-eds--jackzhaojin.aem.page/media_19861945b00e5ba1bf9da66348c5130d47eba68c1.jpg#width=1280&height=800

[image13]: https://main--www-eds--jackzhaojin.aem.page/media_126d70200512b150285d32816bc582f791b5ce720.jpg#width=750&height=1000

[image14]: https://main--www-eds--jackzhaojin.aem.page/media_1b83b61f9653fe0a90cfdcee8ab19480f777677e6.jpg#width=750&height=1000

[image15]: https://main--www-eds--jackzhaojin.aem.page/media_17ea58045d84552b42a8209fc96cf057716e2dfd2.png#width=1056&height=830

[image16]: https://main--www-eds--jackzhaojin.aem.page/media_16b82fd88b3ccbef20f8259f2928611409292414d.jpg#width=750&height=1000

[image17]: https://main--www-eds--jackzhaojin.aem.page/media_15c0f67eec9dddb80869840bfe75f0b3cedeab711.jpg#width=1280&height=720
