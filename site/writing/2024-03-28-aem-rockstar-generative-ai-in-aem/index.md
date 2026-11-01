1. [Home](/)
2. [Technical Writing](/writing/)
3. AEM Rockstar 2024

# AEM Rockstar 2024: Generative AI Inside AEM Authoring, From a Prompt to an Experience Fragment Variation

By [Jack Jin](/) · March 28, 2024 · Updated November 1, 2026 · 14 min read · Includes the session recording

At Adobe Summit 2024 in Las Vegas I won AEM Rockstar with a generative AI framework built into AEM's own authoring screens. An author opens an experience fragment, types who the audience is, reviews every original and generated value side by side, and one click creates a new variation, saved through AEM's out of the box APIs. The same idea writes a page's SEO title and description, and a fine-tuned model swaps in from an OSGi configuration. This is my demo written up, with the code at the commit I presented, my own slides, and what has changed since.

---

+-------------------------------------------------------------------------------------------+
| Rail                                                                                      |
+---------------------------------------------+---------------------------------------------+
|                                             | **Since then**\                             |
|                                             | [What changed since](#changed)              |
+---------------------------------------------+---------------------------------------------+
|                                             | **Part 1**\                                 |
|                                             | [AEM has content](#story)                   |
+---------------------------------------------+---------------------------------------------+
|                                             | **Part 2**\                                 |
|                                             | [Any model, inside AEM](#framework)         |
+---------------------------------------------+---------------------------------------------+
| ![][image0]                                 | **Part 3**\                                 |
|                                             | [A variation in one click](#demo-1)         |
+---------------------------------------------+---------------------------------------------+
| ![][image1]                                 | **Part 4**\                                 |
|                                             | [Under the console](#underneath)            |
+---------------------------------------------+---------------------------------------------+
| ![][image2]                                 | **Part 5**\                                 |
|                                             | [SEO title and description](#demo-2)        |
+---------------------------------------------+---------------------------------------------+
| ![][image3]                                 | **Part 6**\                                 |
|                                             | [A fine-tuned model](#demo-3)               |
+---------------------------------------------+---------------------------------------------+
| ![][image4]                                 | **Part 7**\                                 |
|                                             | [Where it fits](#architecture)              |
+---------------------------------------------+---------------------------------------------+
| ![][image5]                                 | **Part 8**\                                 |
|                                             | [Three ways to train](#training)            |
+---------------------------------------------+---------------------------------------------+
|                                             | **Wrap-up**\                                |
|                                             | [What works, the limits](#result)           |
+---------------------------------------------+---------------------------------------------+
|                                             | **Last**\                                   |
|                                             | [We know content](#next)                    |
+---------------------------------------------+---------------------------------------------+
| [Watch the session](#video)                                                               |
|                                                                                           |
| [Run the two flows](#hero-flow)                                                           |
|                                                                                           |
| [Code on GitHub](https://github.com/jackzhaojin/acn-aem-genai-rockstar-2024/tree/01d6c49) |
+-------------------------------------------------------------------------------------------+

---

I'll go through it in the order I presented it: the story, what the framework does, three demos, two slides and my final thoughts.

---

+--------------------------------------------------------------------------------------------------------------------+
| Figure                                                                                                             |
+--------------------------------------------------------------------------------------------------------------------+
| [AEM Rockstar 2024 at Adobe Summit: The Finalists Face Off and Winner Announcement](https://youtu.be/zDwBhpevuz8)  |
|                                                                                                                    |
| The whole session, recorded at Adobe Summit 2024. I went first, from 6:31 to 25:50, and the winner is announced at |
| 61:56. Each part below links to its moment, or [watch my part on YouTube](https://youtu.be/zDwBhpevuz8?t=391).     |
+--------------------------------------------------------------------------------------------------------------------+

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Fine Print                                                                                                                                                                                                                                                                                                                                                         |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Presented at Adobe Summit 2024 in Las Vegas on March 28, 2024. Written up for this site in November 2026. Code: [acn-aem-genai-rockstar-2024](https://github.com/jackzhaojin/acn-aem-genai-rockstar-2024/tree/01d6c49) at `01d6c49`, version 1.2, the last commit before the talk. The demo screens are from my own recording of the demo, two days before Summit. |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| id      | video  |
+---------+--------+

---

## What has changed since I presented this

I presented this in March 2024, in the GPT-4 days. Three things are different now.

- Adobe ships this pattern itself. [Generate Variations](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/ai-in-aem/generate-variations/generate-variations) in AEM as a Cloud Service writes copy variations from prompts, Adobe's or your own, and authors open it from the AEM navigation panel, the Edge Delivery Services Sidekick or the Content Fragments editor. A person still picks what to use. My build is the same idea seen from the inside, on a model you choose.
- The models are gone. OpenAI [shut down](https://developers.openai.com/api/docs/deprecations) `gpt-4`, this code's default, on October 23, 2026, along with `gpt-3.5-turbo`, and fine-tuned models follow their base model. The model is an OSGi setting here, so switching is a configuration change, but a fine-tuned model would have to be trained again on a current one.
- One part I still use is the review table: the model proposes the values, the author reviews every row, and AEM's own APIs write them. I build that way now, with agents and deterministic code ([From Prompts to Harness](/writing/2026-01-05-from-prompts-to-harness/)).

+-------------------+
| Section Metadata  |
+---------+---------+
| id      | changed |
+---------+---------+

---

## My generative AI moment: AEM has content

In May 2023 I came back from paternity leave really interested in generative AI. I'd been playing with it during the leave, and I wanted to do more with it. Back at work, I'm the AEM architect, so I do AEM architect things, and at the time that included a lot of business development.

Business development means telling stories about your past implementations, and that's something I'm not very good at. In about 18 years in the services industry, I'd say I spent 98% of my time building solutions, and less than 2% telling compelling stories about them.

So I worked with ChatGPT until it gave me the story I was looking for. It wasn't perfect right away, but it was way better than anything I could have come up with on my own. The secret sauce: paste in the case study, a little about the client you're presenting to, and something the slide doesn't know, like a struggle in the middle or a few dates, so the story doesn't just repeat the slide. It worked wonderfully.

That was my generative AI moment. Right behind it came the epiphany: AEM has content. I'd been doing AEM work for 12 years, and generative AI is very good at analyzing content, transforming content and generating new content from what you have. That's where this framework started.

Watch this part [6:45 The story](https://youtu.be/zDwBhpevuz8?t=405)

+------------------+
| Section Metadata |
+---------+--------+
| id      | story  |
+---------+--------+

---

## What the framework does: your choice of model, inside AEM

Personalization at scale is where brands are going, and generative AI gets content out faster. So what does the framework add? It does four things. Really, it's two and two.

First, you choose the AI model. The framework doesn't care which one. I demoed GPT-4 and a fine-tuned model, and it could work with Gemini or others. The right model depends on the client, for legal reasons or for content reasons.

Second, it's built into AEM, which does two things. It finds the content for you, so nobody copies text out and pastes it into a chat window. And it saves the content right back into AEM, so nobody pastes anything back in.

So far it has two capabilities, out of hundreds of possible use cases: personalization at scale, on experience fragments, and content summarization, which today means an SEO title and description for a page.

Watch this part [10:00 What it addresses](https://youtu.be/zDwBhpevuz8?t=600) [11:15 What the framework does](https://youtu.be/zDwBhpevuz8?t=675)

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | framework |
+---------+-----------+

---

## Demo 1: a personalized experience fragment variation in one click

The demo starts with an experience fragment: the Adobe Summit 2024 sign up banner, rebuilt on a WKND instance. I took Summit's imagery but didn't quite get the font, so, Adobe judges, please don't be too harsh. The font isn't brand approved, but the text is.

In the fragment's properties there's an extra tab, AI Personalization. I type an audience, say *banking aem customer*, and click Generate Content. The console shows a table: every text property it found, its original value and its generated value.

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (shot)                                                                                                                                                                                                                                                     |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![The AI Personalization console on the Summit 2024 Main Banner fragment: the chat prompt banking aem customer, and a table with two paths, their original values and the generated values, "Your banking journey advances at Adobe Summit." among them.][image6] |
|                                                                                                                                                                                                                                                                   |
| The console after one Generate Content click: two text properties, each with its original and generated value.                                                                                                                                                    |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

If I like what I see, I name the variation and click Create Variation. A few seconds later there's a new variation of the fragment, open in the editor, with the generated copy saved.

On stage I used diamond partners. It's like Marriott telling me I'm Platinum every time I book: the more they tell me, the happier I am. Tell your diamond partners they're diamond, and they feel good about it.

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (shot)                                                                                                                                                                                                                                                                     |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![The AEM editor showing the new Banking Aem Customer variation of the Summit banner, with the heading "Your banking journey advances at Adobe Summit." and the Variations list: Summit 2024 Main Banner, Marketer In Banking, Diamond Partner and Banking Aem Customer.][image7] |
|                                                                                                                                                                                                                                                                                   |
| The new Banking Aem Customer variation, next to the variations I made before it.                                                                                                                                                                                                  |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Why experience fragments? You can export them to Target, to Campaign, pretty much anywhere. They're the perfect medium between the page and the content fragment, so to me, personalization at scale starts with experience fragments.

Watch this part [12:45 Demo 1](https://youtu.be/zDwBhpevuz8?t=765)

+------------------+
| Section Metadata |
+---------+--------+
| id      | demo-1 |
+---------+--------+

---

Here is what changes for the author, by hand and with the framework:

+------------------------------------------------------------------------------------------------------------------------------------+
| Explainer (process shift)                                                                                                          |
+------------------------------------------------------------------------------------------------------------------------------------+
| - **Author**                                                                                                                       |
| - **AI**                                                                                                                           |
| - **AEM**                                                                                                                          |
+------------------------------------------------------------------------------------------------------------------------------------+
| *Process version*                                                                                                                  |
+---------------------------------+----------------------------------------------------------+---------------------------------------+
| By hand                         | 1. **Author** copies the fragment's heading              | Five of the six steps are the         |
|                                 |    and body text out of AEM                              | author's, and the content leaves AEM  |
|                                 | 2. **Author** pastes them into a chat window,            | and comes back by hand.               |
|                                 |    with the audience and a prompt                        |                                       |
|                                 | 3. **AI** rewrites the copy                              |                                       |
|                                 | 4. **Author** copies each rewritten value back           |                                       |
|                                 | 5. **Author** creates a new variation                    |                                       |
|                                 | 6. **Author** pastes each value into its field and saves |                                       |
+---------------------------------+----------------------------------------------------------+---------------------------------------+
| With the framework              | 1. **Author** types the audience: banking aem customer   | The author types once and reviews     |
|                                 | 2. **AEM** finds every text and description property in  | once. AEM finds the content and saves |
|                                 |    the variation                                         | it, and nothing is pasted anywhere.   |
|                                 | 3. **AI** rewrites each one, inside a prompt template    |                                       |
|                                 |    the author never sees                                 |                                       |
|                                 | 4. **Author** reviews the original and generated value   |                                       |
|                                 |    of each row, and types a name for the variation       |                                       |
|                                 | 5. **AEM** copies the variation                          |                                       |
|                                 | 6. **AEM** saves the generated values and opens the new  |                                       |
|                                 |    variation in the editor                               |                                       |
+---------------------------------+----------------------------------------------------------+---------------------------------------+
| Making a banking variation of the Summit banner, by hand and with the framework. Pick one to run it.                               |
+------------------------------------------------------------------------------------------------------------------------------------+

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | hero-flow |
+---------+-----------+

---

## What runs under the console

Everything in the demo runs on AEM's out of the box APIs: a copy command and a Sling POST for the writes, and one servlet for the model. Two clicks, seven steps:

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Explainer (request pipe)                                                                                                                                                            |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------+-------------------------+
| **Ask**                 | The console sends the prompt, plus the last chat id when Continue Chat is ticked, as a GET                                      | properties.js           |
|                         | to the variation's `jcr:content.aipreview.json`.                                                                                |                         |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------+-------------------------+
| **Route**               | Sling picks the servlet by the stock experience fragment page type, the `aipreview` selector and the `json` extension.          | ExfragGptServlet        |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------+-------------------------+
| **Find the content**    | QueryBuilder walks the variation for nodes with a `text` or `jcr:description` property, skipping any path with `actions` in it. | searchProperties        |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------+-------------------------+
| **Rewrite**             | One Chat Completions call per property: a system message, then the prompt template wrapped around that property's value.        | useGptConvertStrings    |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------+-------------------------+
| **Review**              | The servlet returns a path, an original value and a generated value per row, and the console draws the table.                   | displayTableData        |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------+-------------------------+
| **Copy**                | Create Variation posts `cmd=copyPage` with the new name, so the copy lands next to the original.                                | /bin/wcmcommand         |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------+-------------------------+
| **Save**                | One Sling POST to the copy writes every generated value, plus a `jcr:title` made from the variation name.                       | Sling POST servlet      |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------+-------------------------+
| Two clicks, at `01d6c49`. Steps 1 to 5 are one GET request and its response.                                                                                                        |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

The servlet is bound to the stock experience fragment page type with its own selector, so there's no new page type and no new path. It answers on the variation's own URL, and the author's permissions on that fragment apply.

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Code (wrap, stack)                                                                                                                                                                  |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| core/.../servlets/ExfragGptServlet.java, lines 44 to 49                                                                                                                             |
|                                                                                                                                                                                     |
| [01d6c49 on GitHub](https://github.com/jackzhaojin/acn-aem-genai-rockstar-2024/blob/01d6c49/core/src/main/java/com/accenture/aem/genai/core/servlets/ExfragGptServlet.java#L44-L49) |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                                                                                 |
| @Component(service = { Servlet.class })                                                                                                                                             |
| @SlingServletResourceTypes(                                                                                                                                                         |
|         resourceTypes="cq/experience-fragments/components/xfpage",                                                                                                                  |
|         methods=HttpConstants.METHOD_GET,                                                                                                                                           |
|         selectors = "aipreview",                                                                                                                                                    |
|         extensions="json")                                                                                                                                                          |
| ```                                                                                                                                                                                 |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

The prompt the author types is only part of what the model gets. The service wraps it in a template the author never sees: keep the HTML markup, no quotes around the answer, about the same length, a little shorter.

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Code (wrap, stack)                                                                                                                                                                            |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| core/.../services/impl/ChatGptServiceImpl.java, lines 161 to 175                                                                                                                              |
|                                                                                                                                                                                               |
| [01d6c49 on GitHub](https://github.com/jackzhaojin/acn-aem-genai-rockstar-2024/blob/01d6c49/core/src/main/java/com/accenture/aem/genai/core/services/impl/ChatGptServiceImpl.java#L161-L175)  |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                                                                                           |
|     private static String getPersonalizedContent(String prompt, String content) {                                                                                                             |
|                                                                                                                                                                                               |
| //        return prompt \+ "In the text below. Please preserve all HTML markup if there are any. " \+                                                                                         |
| //                "Please Do not convert to bullet form unless the original message was in bullet \n" \+ content;                                                                             |
|                                                                                                                                                                                               |
|                                                                                                                                                                                               |
|         StringBuffer sb = new StringBuffer();                                                                                                                                                 |
|         sb.append("I am a content copy writer who needs to write personalized content.")                                                                                                      |
|                 .append("Below I will provide my personalization \"Prompt\" and the \"Content to be Personalized\" that needs to be personalized. \n")                                        |
|                 .append("\nIf my \"Content to be Personalized\" in this chat has HTML markup, please respond with the same HTML markup structure. For example, if <p> exist in the prompt, k |
| eep the <p> in the response.")                                                                                                                                                                |
|                 .append("\nAlso please do not add quotes or any rational around the response, only respond back with personalized content! Also please keep the response around the same len |
| gth as the Content to be Personalized.")                                                                                                                                                      |
|                 .append("\nPrompt: " \+ prompt \+ ", please keep the content shorter")                                                                                                        |
|                 .append("\nContent to be Personalized: " \+ content);                                                                                                                         |
|         return sb.toString();                                                                                                                                                                 |
|     }                                                                                                                                                                                         |
| ```                                                                                                                                                                                           |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Then the two writes. Create Variation copies the variation with AEM's own copy command, `copyPage` on `/bin/wcmcommand`:

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Code (wrap, stack)                                                                                                                                                                                 |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ui.apps/.../authorui/clientlibs/editor/js/properties.js, lines 186 to 200                                                                                                                          |
|                                                                                                                                                                                                    |
| [01d6c49 on GitHub](https://github.com/jackzhaojin/acn-aem-genai-rockstar-2024/blob/01d6c49/ui.apps/src/main/content/jcr_root/apps/acngenai/authorui/clientlibs/editor/js/properties.js#L186-L200) |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                                                                                                |
|             var payload = {                                                                                                                                                                        |
|                 _charset_: "UTF-8",                                                                                                                                                                |
|                 cmd: "copyPage",                                                                                                                                                                   |
|                 srcPath: currentExfragVar,                                                                                                                                                         |
|                 destParentPath: stripLastSegment(currentExfragVar),                                                                                                                                |
|                 before: "",                                                                                                                                                                        |
|                 destName: destName,                                                                                                                                                                |
|                 shallow: false                                                                                                                                                                     |
|             };                                                                                                                                                                                     |
|                                                                                                                                                                                                    |
|             // Convert the payload object to x-www-form-urlencoded format                                                                                                                          |
|             var formData = $.param(payload);                                                                                                                                                       |
|                                                                                                                                                                                                    |
|             // Make the POST request to /bin/wcmcommand                                                                                                                                            |
|             $.post("/bin/wcmcommand", formData, function (response) {                                                                                                                              |
| ```                                                                                                                                                                                                |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

When the copy comes back with its new path, a Sling POST writes the generated values into it, each property path relative to the variation, plus a title made from the variation name:

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Code (wrap, stack)                                                                                                                                                                                 |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ui.apps/.../authorui/clientlibs/editor/js/properties.js, lines 214 to 233                                                                                                                          |
|                                                                                                                                                                                                    |
| [01d6c49 on GitHub](https://github.com/jackzhaojin/acn-aem-genai-rockstar-2024/blob/01d6c49/ui.apps/src/main/content/jcr_root/apps/acngenai/authorui/clientlibs/editor/js/properties.js#L214-L233) |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                                                                                                |
|                 var formData = '';                                                                                                                                                                 |
|                 for (var jsonToUpdate in latestResponse) {                                                                                                                                         |
|                                                                                                                                                                                                    |
|                     var propertyKey = latestResponse[jsonToUpdate].path.replace(currentExfragVar, "");                                                                                             |
|                     // propertyKey = propertyKey.slice(0, propertyKey.lastIndexOf("/")) \+ "@" \+ propertyKey.slice(propertyKey.lastIndexOf("/") \+ 1);                                            |
|                     let generatedValue = latestResponse[jsonToUpdate].generatedValue;                                                                                                              |
|                     updatePropertyMap[propertyKey] =  generatedValue;                                                                                                                              |
|                     if (jsonToUpdate != 0) {                                                                                                                                                       |
|                         formData \+= '&';                                                                                                                                                          |
|                     }                                                                                                                                                                              |
|                                                                                                                                                                                                    |
|                     // remove extra quotes from generated value                                                                                                                                    |
|                     var cleanedValue = generatedValue.replace(/^"\|"$/g, '');                                                                                                                      |
|                                                                                                                                                                                                    |
|                     formData \+= "." \+ propertyKey \+ '=' \+ cleanedValue;                                                                                                                        |
|                 }                                                                                                                                                                                  |
|                                                                                                                                                                                                    |
|                 // adding in jcr title to match exfrag var name                                                                                                                                    |
|                 var uiFriendlyTitle = convertToTitleCase(destName);                                                                                                                                |
|                 formData \+= "&." \+ '/jcr:content/jcr:title' \+ '=' \+ uiFriendlyTitle;                                                                                                           |
| ```                                                                                                                                                                                                |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Continue Chat is the other detail. When it's ticked, the console sends the chat id from the last run, and the service sends only the new prompt into each property's saved conversation, so the model refines its last answer instead of starting over.

+----------------------+
| Section Metadata     |
+---------+------------+
| id      | underneath |
+---------+------------+

---

## Demo 2: an SEO title and description from the page itself

The second capability is content summarization. On stage, this is where the venue internet got me: the page properties wouldn't open. I said I had a recording, talked it through, and moved on to fine-tuning. My own recording from two days earlier shows it working.

It's the same console idea, except the author doesn't type a prompt. The prompt is in the back, and it asks for an SEO friendly title and an SEO friendly description. On a WKND adventure page, the AI Content Refinement tab has two checkboxes, Generate Title and Generate Description. Generate Content fills in both, and Save Checked Content writes them to the page's `jcr:title` and `jcr:description`.

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (shot)                                                                                                                                                                                                                                                                                   |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![The AI Content Refinement console on the Ski Touring Mont Blanc page: Generate Title and Generate Description checked, the generated title "Ski Touring Mont Blanc: A Five-Day Winter Adventure in Western Europe" and a generated description, and the Save Checked Content button.][image8] |
|                                                                                                                                                                                                                                                                                                 |
| The AI Content Refinement console: a title and a description generated from the page's own content.                                                                                                                                                                                             |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

To summarize a page, the model needs all of it, where Demo 1 sent one property at a time. The service renders the page's content tree as JSON inside AEM, through the Sling request processor, with no HTTP round trip, and sends that with the prompt:

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Code (wrap, stack)                                                                                                                                                                           |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| core/.../services/impl/ChatGptServiceImpl.java, lines 318 to 329                                                                                                                             |
|                                                                                                                                                                                              |
| [01d6c49 on GitHub](https://github.com/jackzhaojin/acn-aem-genai-rockstar-2024/blob/01d6c49/core/src/main/java/com/accenture/aem/genai/core/services/impl/ChatGptServiceImpl.java#L318-L329) |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                                                                                          |
|         path = path \+ ".-1.json";                                                                                                                                                           |
|                                                                                                                                                                                              |
|         HttpServletRequest pageReq = requestResponseFactory.createRequest("GET", path);                                                                                                      |
|         WCMMode.DISABLED.toRequest(req);                                                                                                                                                     |
|                                                                                                                                                                                              |
|         /* Setup response */                                                                                                                                                                 |
|         ByteArrayOutputStream out = new ByteArrayOutputStream();                                                                                                                             |
|         HttpServletResponse resp = requestResponseFactory.createResponse(out);                                                                                                               |
|                                                                                                                                                                                              |
|         /* Process request through Sling */                                                                                                                                                  |
|         try {                                                                                                                                                                                |
|             slingRequestProcessor.processRequest(pageReq, resp, resourceResolver);                                                                                                           |
| ```                                                                                                                                                                                          |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

And this is just a start. With the right prompt, you can ask it to tag things, check for plagiarism or check spelling. It's quick to set up, and it doesn't take much code.

Watch this part [15:35 Demo 2](https://youtu.be/zDwBhpevuz8?t=935)

+------------------+
| Section Metadata |
+---------+--------+
| id      | demo-2 |
+---------+--------+

---

## Demo 3: a fine-tuned model, switched in from OSGi

Last demo: can we do better than the generic models? The answer is absolutely yes. A friend and I explored training data and fine-tuning, and once you have a trained model, plugging it in is a configuration change.

The model is a field in the framework's OSGi configuration, next to the secret key and the max tokens. I paste in the fine-tuned model's id and save, and every call after that goes to the fine-tuned model.

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (shot)                                                                                                                                                                   |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![The Chat Gpt Dao Configuration dialog in the AEM Web Console: Secret Key (masked), Chat GPT Model set to a fine-tuned gpt-3.5-turbo-1106 model, and Max Tokens 1000.][image9] |
|                                                                                                                                                                                 |
| The OSGi configuration with a fine-tuned `gpt-3.5-turbo-1106` model in place of the default `gpt-4`. The rest of the model id is blurred.                                       |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Integrating the model takes a few hundred lines of code. The fine-tuning is where the data science is. We spent our proof of concept on one question: how do we get summer to do summer really well? All 30 training examples use the prompt *summer*, so that's what I ran:

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (shot)                                                                                                                                                                        |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![The AI Personalization console with the prompt summer: the generated heading "Empower your summer experiences with Adobe Summit." and a summer version of the body text.][image10] |
|                                                                                                                                                                                      |
| The prompt *summer* on the fine-tuned model.                                                                                                                                         |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

A training example is a whole conversation: the system message, the user message and the answer we wanted. The user message is the exact template from Demo 1, with the prompt and the content filled in:

+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| Code (prose, wrap, stack)                                                                                                                                |
+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| fine-tuned-models/baseline1.jsonl, the first example, formatted                                                                                          |
|                                                                                                                                                          |
| [01d6c49 on GitHub](https://github.com/jackzhaojin/acn-aem-genai-rockstar-2024/blob/01d6c49/fine-tuned-models/baseline1.jsonl)                           |
+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                                                      |
| {                                                                                                                                                        |
|   "messages": [                                                                                                                                          |
|     {                                                                                                                                                    |
|       "role": "system",                                                                                                                                  |
|       "content": "You are a helpful assistant for generating personalized content"                                                                       |
|     },                                                                                                                                                   |
|     {                                                                                                                                                    |
|       "role": "user",                                                                                                                                    |
|       "content": "I am a content copy writer who needs to write personalized content.Below I will provide my personalization \"Prompt\" and the \"Conte |
| nt to be Personalized\" that needs to be personalized. \n\nIf my \"Content to be Personalized\" in this chat has HTML markup, please respond with the s |
| ame HTML markup structure. For example, if <p> exist in the prompt, keep the <p> in the response.\n\nAlso please do not add quotes or any rational arou |
| nd the response, only respond back with personalized content! Also please keep the response around the same length as the Content to be Personalized.\n |
| \nPrompt: summer, please keep the content shorter\n\nContent to be Personalized: <h2>Choose a credit card that matches your needs </h2>"                 |
|     },                                                                                                                                                   |
|     {                                                                                                                                                    |
|       "role": "assistant",                                                                                                                               |
|       "content": "<h2>Discover the perfect summer credit card for your needs</h2>"                                                                       |
|     }                                                                                                                                                    |
|   ]                                                                                                                                                      |
| }                                                                                                                                                        |
| ```                                                                                                                                                      |
+----------------------------------------------------------------------------------------------------------------------------------------------------------+

That's also what I answered in the Q\&A. On quality: in my runs, the general models failed about 2 to 3% of the time, not following the prompt, and the fine-tuned model succeeded every time, because it's fed the same prompt it was trained on.

The second question was about several products on one AEM instance, all sharing one OSGi setting. In ChatGPT's fine-tuning data there are three pieces: the system, the user and the response. One model can hold 20 different systems, and as long as you call it with the exact system you trained with, it works. System for system is how the capabilities stay apart.

Watch this part [17:15 Demo 3](https://youtu.be/zDwBhpevuz8?t=1035) [23:45 Q\&A: quality](https://youtu.be/zDwBhpevuz8?t=1425) [24:45 Q\&A: one model, many products](https://youtu.be/zDwBhpevuz8?t=1485)

+------------------+
| Section Metadata |
+---------+--------+
| id      | demo-3 |
+---------+--------+

---

## Where it fits: upstream, downstream and any model

Back to the slides. Everything in purple is what I demoed. Everything in black is potential, in three directions.

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board, open)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![High level architecture slide. Upstream content and planning capabilities (Workfront, Accenture AdTune, other work planning tools) feed AEM as a Cloud Service and AEM 6.5, which has four layers: UI (generate content from prompt and CMS content, render preview, create exfrag variation), servlet, workflow, scheduler and listener (personalization API, OOTB exfrag creation endpoint, OOTB Sling servlet to update content, workflow process, additional APIs), backend logic (personalization logic and prompting, common service layer, content refinement) and data access (GPT 4 DAO, AI service DAOs). The DAOs call AI services: Chat GPT 4 API, DALL-E, Google Bard, Adobe Sensei, Adobe Firefly, Azure AI capabilities and other content AI services. Purple boxes are current, black boxes are future possibilities.][image11] |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| My high level architecture slide. Purple is what the demo ran, black is a future possibility.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Upstream: planning tools like Workfront could feed it. Downstream: Target, Edge Delivery, Campaign. And third, the independence of AI: we're in an AI arms race, and this framework lets AEM work with any model. The data access layer has a GPT-4 DAO today, with room for other AI service DAOs beside it.

Watch this part [19:30 The architecture](https://youtu.be/zDwBhpevuz8?t=1170)

+------------------------+
| Section Metadata       |
+---------+--------------+
| id      | architecture |
+---------+--------------+

---

## Three ways to train a content model

This is my favorite slide. There are three ways content can train a model.

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board, open)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Customer trained model slide. Work planning and upstream authoring (Workfront integration) feeds AEM as a Cloud Service and 6.5, simplified: a human refinement process, UI, API and workflows, and Gen AI capabilities. AEM uses an enhanced model inside OpenAI. A human in the loop box shows AI generated data going out as unrefined data to a human refinement process and coming back as refined data to the enhanced model. AEM also sends AI data on correction updates, and an existing data set trains the model.][image12] |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| My slide on customer trained models: existing data, a human in the loop, and corrections sent back from AEM.                                                                                                                                                                                                                                                                                                                                                                                                                             |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

First, existing data: SEO descriptions or personalized content you're already happy with, fed right in.

Second, the human in the loop: people refine what the model generates, and the refined data makes the model better. That's how we get to the segment of one, by investing in making the model great.

Third, and this one is an idea, not part of the framework code: capture the best output generative AI produces in our consoles, and the corrections authors make, and feed that back into the model.

Watch this part [20:15 Training a model](https://youtu.be/zDwBhpevuz8?t=1215)

+--------------------+
| Section Metadata   |
+---------+----------+
| id      | training |
+---------+----------+

---

## What works, and what does not

The judges picked it as the 2024 AEM Rockstar, announced at the end of the session.

What works end to end, in the code at `01d6c49`: a fragment variation from a prompt, with a review table and a one click save; an SEO title and description saved to the page; any OpenAI chat model, fine-tuned ones included, set by configuration; and 30 summer examples to fine-tune with.

What I didn't build: the feedback loop from the third training idea, images, export to Target from the console, and any measured evaluation. The 2 to 3% is what I saw in my runs, not a benchmark.

A few limits are worth knowing if you read the code. The Continue Chat history lives in memory in one OSGi service, so it's per author instance and gone on a restart ([line 50](https://github.com/jackzhaojin/acn-aem-genai-rockstar-2024/blob/01d6c49/core/src/main/java/com/accenture/aem/genai/core/services/impl/ChatGptServiceImpl.java#L50-L50)). Every text property is its own model call. And the Sling POST body is built by joining strings without URL encoding, so a generated value with an `&` or `=` in it would break the save ([line 228](https://github.com/jackzhaojin/acn-aem-genai-rockstar-2024/blob/01d6c49/ui.apps/src/main/content/jcr_root/apps/acngenai/authorui/clientlibs/editor/js/properties.js#L228-L228)).

How it came together, from the commits:

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Explainer (trail)                                                                                                                                                                                                                                                                                                                                            |
+------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Aug 15, 2023     | A fresh AEM archetype v43 project, the first code ported in, version 1.0.0 ([`43195cd`](https://github.com/jackzhaojin/acn-aem-genai-rockstar-2024/commit/43195cd), [`6dddcc2`](https://github.com/jackzhaojin/acn-aem-genai-rockstar-2024/commit/6dddcc2)).                                                                              |
+------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Aug 25, 2023     | The model and max tokens become OSGi settings, and GPT-4 becomes the default ([`c29c155`](https://github.com/jackzhaojin/acn-aem-genai-rockstar-2024/commit/c29c155), [`4e2440f`](https://github.com/jackzhaojin/acn-aem-genai-rockstar-2024/commit/4e2440f)).                                                                            |
+------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Oct 21, 2023     | Unit tests, a disclaimer and better prompting, version 1.1 ([`8323369`](https://github.com/jackzhaojin/acn-aem-genai-rockstar-2024/commit/8323369), [`d548d3e`](https://github.com/jackzhaojin/acn-aem-genai-rockstar-2024/commit/d548d3e), [`0b4c502`](https://github.com/jackzhaojin/acn-aem-genai-rockstar-2024/commit/0b4c502)).      |
+------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Nov 3 to 5, 2023 | Page refinement, the SEO title and description, and version 1.2 ([`21cd57c`](https://github.com/jackzhaojin/acn-aem-genai-rockstar-2024/commit/21cd57c), [`e01bc83`](https://github.com/jackzhaojin/acn-aem-genai-rockstar-2024/commit/e01bc83), [`561aa06`](https://github.com/jackzhaojin/acn-aem-genai-rockstar-2024/commit/561aa06)). |
+------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Nov 29, 2023     | The first 10 summer training examples ([`f4bc6d3`](https://github.com/jackzhaojin/acn-aem-genai-rockstar-2024/commit/f4bc6d3)).                                                                                                                                                                                                           |
+------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Jan 25, 2024     | 20 more training examples ([`01d6c49`](https://github.com/jackzhaojin/acn-aem-genai-rockstar-2024/commit/01d6c49)), the last commit before the talk.                                                                                                                                                                                      |
+------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Mar 28, 2024     | The demo at Adobe Summit, and the 2024 AEM Rockstar.                                                                                                                                                                                                                                                                                      |
+------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

I didn't do it alone. Business and industry colleagues helped me think through the most common use cases and the roadmap, my leadership believed in it and brought me to Summit, and my data training partner spent nights and weekends with me working out how to fine-tune the models. That part is the new stuff. The integration is the easy part.

+------------------+
| Section Metadata |
+---------+--------+
| id      | result |
+---------+--------+

---

## Final thoughts: we know content

I closed with three final thoughts.

First, Adobe leads in generative AI capabilities, and I can't wait to work with all of it. What I'd build next is to have this generate images, not only text.

Second, the word democratized gets used a lot, but generative AI really is democratized. There's so much investment in the industry that it's easy and cheap to get started, and with Adobe I/O and Workfront Fusion, a lot of the integration is low code or no code.

Third, we're experience makers. We don't need to be AI experts, but we know content better than data scientists do. I asked ChatGPT for an example of this, and it said that we, the content experts, are the musicians, and the data scientists are the instrument makers. That's my favorite example.

If you've put generative AI inside AEM authoring for real authors, I'd like to compare notes: did they trust a review table like this one, or did they want something else?

Watch this part [22:00 Final thoughts](https://youtu.be/zDwBhpevuz8?t=1320)

+------------------+
| Section Metadata |
+---------+--------+
| id      | next   |
+---------+--------+

---

## Related

+------------------------------------------------------------------------------------------------------------------------------------------------+
| Row List                                                                                                                                       |
+-----------+--------------------------------------------------------------------------------------------+---------------------------------------+
| Portfolio | [AEM Rockstar 2024](/portfolio/aem-rockstar-2024/)                                         | The project page: the build, its flow |
|           |                                                                                            | and the numbers.                      |
+-----------+--------------------------------------------------------------------------------------------+---------------------------------------+
| Talk      | [AEM Rockstar at Adobe Summit 2024](/talks/#aem-rockstar-2024)                             | The talk in my list of talks, with    |
|           |                                                                                            | the Adobe session page.               |
+-----------+--------------------------------------------------------------------------------------------+---------------------------------------+
| Article   | [From Prompts to Harness](/writing/2026-01-05-from-prompts-to-harness/)                    | Where the review table went next:     |
|           |                                                                                            | deterministic code and agents working |
|           |                                                                                            | together.                             |
+-----------+--------------------------------------------------------------------------------------------+---------------------------------------+
| Article   | [AEM Headless and Omnichannel](/writing/2025-07-12-aem-headless-omnichannel-architecture/) | Experience fragments as the channel   |
|           |                                                                                            | unit, among three architectures.      |
+-----------+--------------------------------------------------------------------------------------------+---------------------------------------+

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

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Metadata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| title                   | AEM Rockstar 2024: Generative AI in AEM Authoring \| Jack Jin                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| description             | My AEM Rockstar 2024 winning demo: generative AI inside AEM authoring that writes experience fragment variations and SEO text, saved with AEM's own APIs.                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| template                | article                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image                   | ![The new Banking Aem Customer variation of the Adobe Summit 2024 banner in the AEM editor, written by the framework from the prompt banking aem customer.][image7]                                                                                                                                                                                                                                                                                                                                             |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image:alt               | The new Banking Aem Customer variation of the Adobe Summit 2024 banner in the AEM editor, written by the framework from the prompt banking aem customer.                                                                                                                                                                                                                                                                                                                                                        |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| published-time          | 2024-03-28                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| modified-time           | 2026-11-01                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| json-ld                 | {"@context":"https\://schema.org","@graph":\[{"@type":"Person","@id":"https\://www\.jackzhaojin.com/#person","name":"Jack Jin","url":"https\://www\.jackzhaojin.com/","jobTitle":"Associate Director","worksFor":{"@type":"Organization","name":"Accenture","department":{"@type":"Organization","name":"Adobe Business                                                                                                                                                                                         |
|                         | Group"}},"sameAs":\["https\://www\.linkedin.com/in/jackjin","https\://github.com/jackzhaojin","https\://www\.youtube.com/@jackjin8467","https\://www\.credly.com/users/jack-jin"],"award":\["Adobe Experience Manager Champion, class of 2026-2027","AEM Rockstar winner, Adobe Summit 2024"]},{"@type":"WebSite","@id":"https\://www\.jackzhaojin.com/#website","url":"https\://www\.jackzhaojin.com/","name":"Jack                                                                                            |
|                         | Jin","publisher":{"@id":"https\://www\.jackzhaojin.com/#person"}},{"@type":"TechArticle","@id":"https\://www\.jackzhaojin.com/writing/2024-03-28-aem-rockstar-generative-ai-in-aem/#article","headline":"AEM Rockstar 2024: Generative AI Inside AEM Authoring, From a Prompt to an Experience Fragment Variation","description":"My AEM Rockstar 2024 winning demo: generative AI inside AEM authoring that writes experience fragment variations and SEO text, saved with AEM's own                           |
|                         | APIs.","author":{"@id":"https\://www\.jackzhaojin.com/#person"},"publisher":{"@id":"https\://www\.jackzhaojin.com/#person"},"image":"https\://www\.jackzhaojin.com/writing/2024-03-28-aem-rockstar-generative-ai-in-aem/media\_121afd009b64d956f983c7af02a20b6ff965434bc.jpg","mainEntityOfPage":"https\://www\.jackzhaojin.com/writing/2024-03-28-aem-rockstar-generative-ai-in-aem/","isPartOf":{"@id":"https\://www\.jackzhaojin.com/#website"},"about":\["Adobe Experience Manager","Generative             |
|                         | AI","Experience fragments","Personalization at scale","AEM Rockstar","Adobe Summit 2024"],"datePublished":"2024-03-28","dateModified":"2026-11-01","inLanguage":"en","video":\[{"@id":"https\://www\.jackzhaojin.com/writing/2024-03-28-aem-rockstar-generative-ai-in-aem/#video"}]},{"@type":"VideoObject","@id":"https\://www\.jackzhaojin.com/writing/2024-03-28-aem-rockstar-generative-ai-in-aem/#video","name":"AEM Rockstar 2024 at Adobe Summit: The Finalists Face Off and Winner                      |
|                         | Announcement","description":"The full AEM Rockstar 2024 session from Adobe Summit in Las Vegas: three finalists give live demos, and the winner is announced at the end. Jack Jin presents first, generative AI built into AEM                                                                                                                                                                                                                                                                                  |
|                         | authoring.","thumbnailUrl":"https\://i.ytimg.com/vi/zDwBhpevuz8/maxresdefault.jpg","uploadDate":"2026-10-27T02:45:08Z","duration":"PT62M19S","embedUrl":"https\://www\.youtube-nocookie.com/embed/zDwBhpevuz8"},{"@type":"BreadcrumbList","@id":"https\://www\.jackzhaojin.com/writing/2024-03-28-aem-rockstar-generative-ai-in-aem/#breadcrumb","itemListElement":\[{"@type":"ListItem","position":1,"name":"Home","item":"https\://www\.jackzhaojin.com/"},{"@type":"ListItem","position":2,"name":"Technical |
|                         | Writing","item":"https\://www\.jackzhaojin.com/writing/"},{"@type":"ListItem","position":3,"name":"AEM Rockstar 2024","item":"https\://www\.jackzhaojin.com/writing/2024-03-28-aem-rockstar-generative-ai-in-aem/"}]}]}                                                                                                                                                                                                                                                                                         |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| og:image:alt            | The new Banking Aem Customer variation of the Adobe Summit 2024 banner in the AEM editor, written by the framework from the prompt banking aem customer.                                                                                                                                                                                                                                                                                                                                                        |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:published\_time | 2024-03-28                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:modified\_time  | 2026-11-01                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:author          | https\://www\.jackzhaojin.com/                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-summary         | The demo that won AEM Rockstar at Adobe Summit 2024: generative AI inside AEM's own authoring screens. Type an audience, review every generated value, and one click saves a new experience fragment variation. With the code, my slides and what has changed since.                                                                                                                                                                                                                                            |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-image           | https\://www\.jackzhaojin.com/writing/2024-03-28-aem-rockstar-generative-ai-in-aem/media\_121afd009b64d956f983c7af02a20b6ff965434bc.jpg?width=750\&format=jpg\&optimize=medium                                                                                                                                                                                                                                                                                                                                  |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-topics          | Adobe AEM & EDS\|AI Engineering                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-reading-time    | 14 min read                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-talk-url        | https\://www\.jackzhaojin.com/talks/#aem-rockstar-2024                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-talk-label      | Given as a talk at Adobe Summit 2024, Las Vegas, March 28, 2024                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-talk-note       | Winner of AEM Rockstar 2024                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-url       | https\://youtu.be/zDwBhpevuz8?t=391                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-label     | Watch on YouTube                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-keywords        | aem rockstar 2024 adobe summit las vegas generative ai aem authoring experience fragment variation personalization at scale chatgpt gpt-4 fine-tuning fine-tuned model osgi configuration sling selector servlet querybuilder wcmcommand copypage sling post seo title description wknd content summarization                                                                                                                                                                                                   |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_1b21e05b200b601af4bd00cdba00c78eb23e8ff82.jpg#width=288&height=184

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_1811f7df8dfb5c65afa1f59bd9c5cd95b5bf1d9f3.jpg#width=288&height=184

[image2]: https://main--www-eds--jackzhaojin.aem.page/media_17668e94a1a44214adb422c81a618041b742672ee.jpg#width=288&height=184

[image3]: https://main--www-eds--jackzhaojin.aem.page/media_10cfe5947553b5c96a7c045ce27d7a39b8c41af0d.jpg#width=288&height=184

[image4]: https://main--www-eds--jackzhaojin.aem.page/media_147584f566f9e9255cd45feff772c2953d825c7a1.jpg#width=288&height=184

[image5]: https://main--www-eds--jackzhaojin.aem.page/media_1ad8e821e5e0b8f507bdd957d8a674d20e7731b28.jpg#width=288&height=184

[image6]: https://main--www-eds--jackzhaojin.aem.page/media_1509de79ccbe0ae087276acbbf198918b98598220.jpg#width=1070&height=490

[image7]: https://main--www-eds--jackzhaojin.aem.page/media_121afd009b64d956f983c7af02a20b6ff965434bc.jpg#width=1108&height=538

[image8]: https://main--www-eds--jackzhaojin.aem.page/media_180f56cb8a165ec75c02a29d31d6ebaf0485e7b05.jpg#width=1108&height=494

[image9]: https://main--www-eds--jackzhaojin.aem.page/media_1fd3a7271bb6d481efbb0deb7e629bf5986699d29.jpg#width=1000&height=210

[image10]: https://main--www-eds--jackzhaojin.aem.page/media_158f79d380d9002b4d4b4a4c68d3198a8b6d3785a.jpg#width=1060&height=250

[image11]: https://main--www-eds--jackzhaojin.aem.page/media_1f472c75c337b2fddb24f6c3138bdb1545ecb5315.jpg#width=905&height=498

[image12]: https://main--www-eds--jackzhaojin.aem.page/media_135dfe8ec086e090db01c84b19b525cb04fd03eb9.jpg#width=714&height=322
