1. [Home](/)
2. [Technical Writing](/writing/)
3. MCP Server for EDS da.live

# Building an MCP Server for EDS da.live: Scripted AI Flow vs Agent Tools

By [Jack Jin](/) · October 5, 2025 · Updated October 4, 2026 · 10 min read · Includes my 9:57 video

There are two ways to let a model edit a da.live page, the newest way to author Edge Delivery Services sites when I built this. In a scripted flow, an Azure Function fetches the page, asks Claude for an edit and saves it. With an MCP server, get and save become two tools, and the model decides when to call them. I built both: same content quality, about twice the time and tokens for the tools, and a lot more flexibility. The code for both is below, with a side-by-side run of both versions that shows where the extra cost comes from.

---

+--------------------------------------------------------------------------------+
| Rail                                                                           |
+--------------------------------------+-----------------------------------------+
|                                      | **Since then**\                         |
|                                      | [What changed after](#changed)          |
+--------------------------------------+-----------------------------------------+
|                                      | **Part 1**\                             |
|                                      | [da.live works in HTML](#part-1)        |
+--------------------------------------+-----------------------------------------+
| ![][image0]                          | **Part 2**\                             |
|                                      | [The scripted flow](#part-2)            |
+--------------------------------------+-----------------------------------------+
|                                      | **Part 3**\                             |
|                                      | [Why an MCP server](#part-3)            |
+--------------------------------------+-----------------------------------------+
| ![][image1]                          | **Part 4**\                             |
|                                      | [Two tools and an agent](#part-4)       |
+--------------------------------------+-----------------------------------------+
| ![][image2]                          | **Part 5**\                             |
|                                      | [The Claude Desktop demo](#part-5)      |
+--------------------------------------+-----------------------------------------+
|                                      | **Wrap-up**\                            |
|                                      | [Same quality, twice the cost](#part-6) |
+--------------------------------------+-----------------------------------------+
| [Watch the video, 9:57](#video)                                                |
|                                                                                |
| [Compare the two versions](#decision-lab)                                      |
|                                                                                |
| [Code on GitHub](https://github.com/jackzhaojin/azure-da-mcp/tree/81e4cac)     |
+--------------------------------------------------------------------------------+

---

+--------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure                                                                                                                                           |
+--------------------------------------------------------------------------------------------------------------------------------------------------+
| [Building an MCP Server for EDS da.live: From a Scripted AI Flow to Agent Tools](https://youtu.be/r_L1tHBKeZQ)                                   |
|                                                                                                                                                  |
| Recorded the night of October 5, 2025. Each part below links to its moment in the video, or [watch it on YouTube](https://youtu.be/r_L1tHBKeZQ). |
+--------------------------------------------------------------------------------------------------------------------------------------------------+

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Fine Print                                                                                                                                                                                                                                                               |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| First published as a LinkedIn video on October 5, 2025. Rewritten for this site in October 2026. Code: [azure-da-mcp](https://github.com/jackzhaojin/azure-da-mcp/tree/81e4cac) at `81e4cac`, the last commit before I recorded, and `1ffb600` for the scripted version. |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| id      | video  |
+---------+--------+

---

## What changed after October 2025

A week later I pushed the same server much harder: Claude, Gemini and Azure OpenAI on one MCP server, a deploy to Azure Functions, and n8n on top. That's [part two](/writing/2025-10-12-da-live-mcp-across-ai-platforms/).

The repo kept going after that. In November 2025 it picked up tools to [preview and publish](https://github.com/jackzhaojin/azure-da-mcp/commit/6b67c39), [create pages](https://github.com/jackzhaojin/azure-da-mcp/commit/8b8c137) and [create folders](https://github.com/jackzhaojin/azure-da-mcp/commit/bb7bdfe). Over the next months it grew into [the Content Factory](/portfolio/content-factory/), agents that generate, migrate and evaluate da.live content, which became my [adaptTo() 2026 talk](/talks/adaptto-2026/). This article stays with the October 2025 version: two tools, one weekend.

+-------------------+
| Section Metadata  |
+---------+---------+
| id      | changed |
+---------+---------+

---

## Content is where AI meets EDS, and da.live works in plain HTML

I think content and marketing enablement is ripe for AI. It has migration use cases, personalization use cases, and a lot more, if you can figure out how to get AI to work with content. AEM is a content management system, and Edge Delivery Services is no different.

As I covered in [an earlier video](/writing/2025-07-13-three-eds-offerings/), EDS comes in three flavors, and each one needs a completely different way of thinking about AI work:

+-----------------------------------------------------------------+
| Data Table                                                      |
+---------------------+-------------------------------------------+
| How you author      | What an AI integration works with         |
+---------------------+-------------------------------------------+
| Word or Google Docs | The documents themselves                  |
+---------------------+-------------------------------------------+
| Universal Editor    | AEM nodes: JCR nodes and their properties |
+---------------------+-------------------------------------------+
| da.live             | HTML                                      |
+---------------------+-------------------------------------------+

This one is about da.live, which was Adobe's newest EDS flavor when I built this. Unlike Universal Editor, where you deal with how AEM thinks about content, here you're literally dealing with HTML. Both the get call and the save call carry HTML, and HTML is much cleaner to hand to a model than a tree of nodes.

Watch this part [0:00 Content is where AI meets EDS](https://youtu.be/r_L1tHBKeZQ?t=0) [0:31 Three EDS flavors, and da.live works in HTML](https://youtu.be/r_L1tHBKeZQ?t=31)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-1 |
+---------+--------+

---

## The first version, a scripted flow with one model call

I started with two Azure Functions. `GetContent` just fetches a page. No AI, just a call: you pass the bearer token you get from `admin.da.live`, and the [source API](https://docs.da.live/developers/api/source) hands back the page as HTML. Saving is a POST to the same path, with the HTML sent as form data in a field called `data`.

+-----------------------------------------------------------------------------------------------------------------------------+
| Code                                                                                                                        |
+-----------------------------------------------------------------------------------------------------------------------------+
| functions/src/modules/DaliveClient.js, lines 15 to 23 and 60 to 77                                                          |
|                                                                                                                             |
| [81e4cac on GitHub](https://github.com/jackzhaojin/azure-da-mcp/blob/81e4cac/functions/src/modules/DaliveClient.js#L15-L77) |
+-----------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                         |
| export async function getContent(path, bearerToken) {                                                                       |
|   try {                                                                                                                     |
|     const response = await axios.get(`${DALIVE_API_URL}${path}`, {                                                          |
|       headers: {                                                                                                            |
|         'Authorization': `Bearer ${bearerToken}`                                                                            |
|       },                                                                                                                    |
|       timeout: 5000,                                                                                                        |
|       responseType: 'text' // Get raw HTML text, not JSON                                                                   |
|     });                                                                                                                     |
|   // … retry and error handling trimmed                                                                                     |
|       // Create multipart form data with HTML as a file                                                                     |
|       const formData = new FormData();                                                                                      |
|       formData.append('data', Buffer.from(html), {                                                                          |
|         filename: 'content.html',                                                                                           |
|         contentType: 'text/html'                                                                                            |
|       });                                                                                                                   |
|                                                                                                                             |
|       const response = await axios.post(                                                                                    |
|         `${DALIVE_API_URL}${path}`,                                                                                         |
|         formData,                                                                                                           |
|         {                                                                                                                   |
|           headers: {                                                                                                        |
|             'Authorization': `Bearer ${bearerToken}`,                                                                       |
|             ...formData.getHeaders()                                                                                        |
|           },                                                                                                                |
|           timeout: 5000                                                                                                     |
|         }                                                                                                                   |
|       );                                                                                                                    |
| ```                                                                                                                         |
+-----------------------------------------------------------------------------------------------------------------------------+

For the token, the repo's `.env.example` has the steps: open da.live, open the browser's DevTools, go to the Network tab, and copy the `Authorization` header value from a request.

`EditContent` is what I call the good old classical flow. Get the content, run it through whatever AI scaffolding you have, save it back. The scaffolding here is a prompt plus one call to Claude.

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-2 |
+---------+--------+

---

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Explainer (scripted flow)                                                                                                                                                                                       |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![The scripted flow. Get Content calls the da.live source API with a GET. Edit Content calls the same GET, hands the HTML to Claude with AI scaffolding, then saves the result back to the source API.][image3] |
|                                                                                                                                                                                                                 |
| ![The scripted flow. Get Content calls the da.live source API with a GET. Edit Content calls the same GET, hands the HTML to Claude with AI scaffolding, then saves the result back to the source API.][image4] |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| - Function                                                                                                                                                                                                      |
| - Adobe API                                                                                                                                                                                                     |
| - LLM                                                                                                                                                                                                           |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| The scripted flow, redrawn from the board I opened the video with. Every arrow is a call my code makes, in a fixed order.                                                                                       |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+---------------------------------------------------------------------------------------------------------------------------------------+
| Code                                                                                                                                  |
+---------------------------------------------------------------------------------------------------------------------------------------+
| functions/src/functions/EditContentFunction.js, the scripted version                                                                  |
|                                                                                                                                       |
| [1ffb600 on GitHub](https://github.com/jackzhaojin/azure-da-mcp/blob/1ffb600/functions/src/functions/EditContentFunction.js#L79-L139) |
+---------------------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                                   |
|       // PHASE 1: Fetch HTML content from da.live                                                                                     |
|       const daliveFetchStart = Date.now();                                                                                            |
|       let pageContent;                                                                                                                |
|       try {                                                                                                                           |
|         pageContent = await getContent(path, bearerToken);                                                                            |
|   // … timing and error handling trimmed                                                                                              |
|       // PHASE 2: Build LLM prompt with HTML content                                                                                  |
|       const llmPrompt = buildPrompt(command, pageContent.html, path);                                                                 |
|                                                                                                                                       |
|       // PHASE 3: Call LLM API                                                                                                        |
|       const llmCallStart = Date.now();                                                                                                |
|       let llmResponse;                                                                                                                |
|       try {                                                                                                                           |
|         llmResponse = await generateEdit(llmPrompt);                                                                                  |
|   // … timing and error handling trimmed                                                                                              |
|       // PHASE 4: Update content in da.live with edited HTML                                                                          |
|       const daliveUpdateStart = Date.now();                                                                                           |
|       try {                                                                                                                           |
|         await updateContent(path, llmResponse.editedHtml, bearerToken);                                                               |
| ```                                                                                                                                   |
+---------------------------------------------------------------------------------------------------------------------------------------+

Keep one number in mind. This flow took about 15 seconds end to end, and that's with an expensive model that spends a bunch of reasoning tokens. A faster model would probably do it in 5 seconds, if you don't care about quality.

Watch this part [1:21 The scripted flow](https://youtu.be/r_L1tHBKeZQ?t=81) [2:45 The da.live source API](https://youtu.be/r_L1tHBKeZQ?t=165) [3:33 15 seconds end to end](https://youtu.be/r_L1tHBKeZQ?t=213)

+--------------------------+
| Section Metadata         |
+---------+----------------+
| id      | scripted-board |
+---------+----------------+

---

## Why I turned it into an MCP server

A scripted flow like this is a very old pattern. MCP, the Model Context Protocol, is a standard way to hand tools to a model. A server lists what it can do, and any client that speaks MCP (Claude Desktop, n8n, an agent you wrote) lets the model call those tools.

There were three reasons for the pivot:

1. It's more universally plug and play. Agent platforms like n8n work with tools, and if my content operations are tools, any of them can use them.
2. Content operations as tools have real uses: content migration, personalization, and more.
3. I think this is where the world is going, even with the bottlenecks and drawbacks I'm about to get to.

Watch this part [4:00 Three reasons to make it an MCP server](https://youtu.be/r_L1tHBKeZQ?t=240)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-3 |
+---------+--------+

---

## Two MCP tools, and an agent that decides when to call them

The MCP server does two things: it gets content and it saves content. Everything else moves into a box I call the agent, because that's how n8n and a lot of folks name it. There are so many ways to draw this diagram, and I'm not a fan of drawing it this way, but this is where the board ended up:

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                              |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Diagram titled EDS da.live, AI Enablement Foundational Work. Get Content calls admin.da.live/source GET. Edit Content calls Agent with Scaffolding, which talks to Claude and has two MCP server tools below it: admin.da.live/source GET and admin.da.live/source Save. A legend marks Function, LLM, Adobe API and MCP Server.][image5] |
|                                                                                                                                                                                                                                                                                                                                             |
| The board at the end of the video. The two calls the code used to make are now MCP tools, and the agent with its scaffolding decides when to use them.                                                                                                                                                                                      |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

The scaffolding moved too. It used to be the order of the calls in my code. Now it lives in how the agent prompts the model. The prompt in [`edit-content/v1.0.0.json`](https://github.com/jackzhaojin/azure-da-mcp/blob/81e4cac/functions/src/prompts/edit-content/v1.0.0.json#L11) says `FIRST: Call get_dalive_content` and `LAST: Call save_dalive_content`, and the code runs a loop: call the model, and if it asks for a tool, run the tool, add the result to the conversation and call the model again.

+----------------------------------------------------------------------------------------------------------------------------+
| Code                                                                                                                       |
+----------------------------------------------------------------------------------------------------------------------------+
| functions/src/modules/LlmClient.js, the tool loop                                                                          |
|                                                                                                                            |
| [81e4cac on GitHub](https://github.com/jackzhaojin/azure-da-mcp/blob/81e4cac/functions/src/modules/LlmClient.js#L102-L223) |
+----------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                        |
|       while (iterationCount < MAX_TOOL_ITERATIONS) {                                                                       |
|         iterationCount\+\+;                                                                                                |
|   // … logging and bookkeeping trimmed                                                                                     |
|         const response = await client.messages.create(requestParams);                                                      |
|   // … logging and bookkeeping trimmed                                                                                     |
|         // Check if response contains tool use                                                                             |
|         const toolUseBlock = response.content.find(block => block.type === 'tool_use');                                    |
|                                                                                                                            |
|         if (toolUseBlock && mcpSession) {                                                                                  |
|   // … logging and bookkeeping trimmed                                                                                     |
|             toolResult = await callMcpTool(mcpSession, toolName, toolInput);                                               |
|   // … logging and bookkeeping trimmed                                                                                     |
|           // Add tool result to conversation                                                                               |
|           messages.push({                                                                                                  |
|             role: 'assistant',                                                                                             |
|             content: response.content                                                                                      |
|           });                                                                                                              |
|                                                                                                                            |
|           messages.push({                                                                                                  |
|             role: 'user',                                                                                                  |
|             content: [                                                                                                     |
|               {                                                                                                            |
|                 type: 'tool_result',                                                                                       |
|                 tool_use_id: toolUseId,                                                                                    |
|                 content: JSON.stringify(toolResult)                                                                        |
|               }                                                                                                            |
|             ]                                                                                                              |
|           });                                                                                                              |
|                                                                                                                            |
|           // Continue conversation loop                                                                                    |
|           continue;                                                                                                        |
|   // … logging and bookkeeping trimmed                                                                                     |
|         // No tool use - this is the final response                                                                        |
|         const textBlock = response.content.find(block => block.type === 'text');                                           |
| ```                                                                                                                        |
+----------------------------------------------------------------------------------------------------------------------------+

So what did it do? First, in terms of content quality, there was zero difference. Second, it took twice as long and used twice as many tokens: my 15 seconds became 30 or more. Before, I had a fairly scripted AI workflow, where the agentic level is maybe 2 out of 10. Now the agent decides when to get and save content. Slower, but much more scalable.

That loop is where the extra time and tokens come from. Below is a simplified model of both versions of the same edit, built from the two commits. Pick a version, and for the tool loop, a scenario. The log lists every call to the model in order, and the counters show the cost: how many times the model was called, and how many times the whole page went back to it.

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-4 |
+---------+--------+

---

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Explainer (tool loop)                                                                                                                                                                                                                                                                                                                                                                                          |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| The same edit, two versions                                                                                                                                                                                                                                                                                                                                                                                    |
|                                                                                                                                                                                                                                                                                                                                                                                                                |
| [the loop in LlmClient.js](https://github.com/jackzhaojin/azure-da-mcp/blob/81e4cac/functions/src/modules/LlmClient.js#L96-L262)                                                                                                                                                                                                                                                                               |
+---------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Both versions are in the log. The counts are for the tool loop following the order its      | 1. Scripted flow: the code decides                                                                                                                                                                                                                                                                               |
| prompt asks for.                                                                            | 2. **step 1** Code fetches the page HTML from admin.da.live.                                                                                                                                                                                                                                                     |
|                                                                                             | 3. **step 2** Code builds the prompt with the HTML inside it.                                                                                                                                                                                                                                                    |
| *Which version runs*                                                                        | 4. **call 1** Code calls the model once. It returns the edited HTML.                                                                                                                                                                                                                                             |
|                                                                                             | 5. **step 3** Code saves the edited HTML to admin.da.live.                                                                                                                                                                                                                                                       |
| *What the model does*                                                                       | 6. Tool loop: the model decides                                                                                                                                                                                                                                                                                  |
|                                                                                             | 7. **call 1** Sends the prompt. The model asks for get\_dalive\_content.                                                                                                                                                                                                                                         |
|                                                                                             | 8. **call 2** Sends the conversation so far, page HTML included. The model asks for save\_dalive\_content.                                                                                                                                                                                                       |
|                                                                                             | 9. **call 3** Sends it all again, page HTML included. The model answers with text, so the loop ends.                                                                                                                                                                                                             |
|                                                                                             |                                                                                                                                                                                                                                                                                                                  |
|                                                                                             | Same edit. The scripted flow calls the model once. The tool loop calls it three times, and the page goes along on the last two.                                                                                                                                                                                  |
+---------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Scripted flow: the code decides                                                             | Nothing to pick. The code runs the same four steps every time.                                                        | Running the four steps in order.                                                                                                                                                         |
+---------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------+
|                                                                                             | 1. **step 1** Code fetches the page HTML from admin.da.live.                                                          | - model calls\                                                                              | Same order every time: get, one model call, save. The code decides, so the order can’t go  |
|                                                                                             | 2. **step 2** Code builds the prompt with the HTML inside it.                                                         |   **1**                                                                                     | wrong. In my test this took about 15 seconds end to end.                                   |
|                                                                                             | 3. **call 1** Code calls the model **once**, page HTML included. It returns the edited HTML. No tools are offered.    | - page sent to the model\                                                                   |                                                                                            |
|                                                                                             | 4. **step 3** Code saves the edited HTML to admin.da.live.                                                            |   **1 time**                                                                                | `ok`                                                                                       |
|                                                                                             |                                                                                                                       | - tool calls\                                                                               |                                                                                            |
|                                                                                             |                                                                                                                       |   **0**                                                                                     |                                                                                            |
|                                                                                             |                                                                                                                       | - page saved\                                                                               |                                                                                            |
|                                                                                             |                                                                                                                       |   **yes**                                                                                   |                                                                                            |
+---------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------+
| **Tool loop: the model decides**                                                            | The model picks every step. Pick what it does:                                                                        | Running the loop.                                                                                                                                                                        |
+---------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------+
| **Follows the prompt** get the page, save it, answer                                        | 1. **call 1** Sends the prompt. The model asks for **get\_dalive\_content**.                                          | - model calls\                                                                              | 3 model calls where the scripted flow makes one, and the page goes to the model 2 times    |
|                                                                                             | 2. **tool** Fetches the page HTML from admin.da.live and adds it to the conversation.                                 |   **3**                                                                                     | instead of once. That is where the extra time and tokens come from.                        |
|                                                                                             | 3. **call 2** Sends the whole conversation so far, page HTML included. The model asks for **save\_dalive\_content**.  | - page sent to the model\                                                                   |                                                                                            |
|                                                                                             | 4. **tool** Saves the HTML the model wrote to admin.da.live.                                                          |   **2 times**                                                                               | `ok`                                                                                       |
|                                                                                             | 5. **call 3** Sends the whole conversation so far, page HTML included. The model answers with text, so the loop ends. | - tool calls\                                                                               |                                                                                            |
|                                                                                             |                                                                                                                       |   **2**                                                                                     |                                                                                            |
|                                                                                             |                                                                                                                       | - page saved\                                                                               |                                                                                            |
|                                                                                             |                                                                                                                       |   **yes**                                                                                   |                                                                                            |
+---------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------+
| **Gets the page again before saving** what Claude did in my demo                            | 1. **call 1** Sends the prompt. The model asks for **get\_dalive\_content**.                                          | - model calls\                                                                              | Still the right result, with one more model call and one more copy of the page in every    |
|                                                                                             | 2. **tool** Fetches the page HTML from admin.da.live and adds it to the conversation.                                 |   **4**                                                                                     | call after it. Every time I ran it, it did different things.                               |
|                                                                                             | 3. **call 2** Sends the whole conversation so far, page HTML included. The model asks for **get\_dalive\_content**.   | - page sent to the model\                                                                   |                                                                                            |
|                                                                                             | 4. **tool** Fetches the page HTML from admin.da.live and adds it to the conversation.                                 |   **3 times**                                                                               | `ok`                                                                                       |
|                                                                                             | 5. **call 3** Sends the whole conversation so far, page HTML included. The model asks for **save\_dalive\_content**.  | - tool calls\                                                                               |                                                                                            |
|                                                                                             | 6. **tool** Saves the HTML the model wrote to admin.da.live.                                                          |   **3**                                                                                     |                                                                                            |
|                                                                                             | 7. **call 4** Sends the whole conversation so far, page HTML included. The model answers with text, so the loop ends. | - page saved\                                                                               |                                                                                            |
|                                                                                             |                                                                                                                       |   **yes**                                                                                   |                                                                                            |
+---------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------+
| **Saves without reading the page** nothing in the loop stops it                             | 1. **call 1** Sends the prompt. The model asks for **save\_dalive\_content**.                                         | - model calls\                                                                              | Saved, but the model never read the page, so it wrote HTML blind. The prompt says to get   |
|                                                                                             | 2. **tool** Saves the HTML the model wrote to admin.da.live.                                                          |   **2**                                                                                     | the page first. Nothing in the code enforces it. The scripted flow cannot do this.         |
|                                                                                             | 3. **call 2** Sends the whole conversation so far. The model answers with text, so the loop ends.                     | - page sent to the model\                                                                   |                                                                                            |
|                                                                                             |                                                                                                                       |   **0 times**                                                                               | `warn`                                                                                     |
|                                                                                             |                                                                                                                       | - tool calls\                                                                               |                                                                                            |
|                                                                                             |                                                                                                                       |   **1**                                                                                     |                                                                                            |
|                                                                                             |                                                                                                                       | - page saved\                                                                               |                                                                                            |
|                                                                                             |                                                                                                                       |   **yes, unread**                                                                           |                                                                                            |
+---------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------+
| A simplified model: no real calls are made. The scripted flow follows [EditContentFunction.js at 1ffb600](https://github.com/jackzhaojin/azure-da-mcp/blob/1ffb600/functions/src/functions/EditContentFunction.js#L79-L139), the tool loop follows [LlmClient.js at 81e4cac](https://github.com/jackzhaojin/azure-da-mcp/blob/81e4cac/functions/src/modules/LlmClient.js#L96-L262).                            |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Tracing the loop shows two more things. Every turn re-sends the whole conversation, so once the page is fetched, its HTML goes back to the model on every call after that. And nothing in the loop checks that a save happened, or that a get came first. The scripted flow guarantees both in code. The tool loop leaves them to the prompt.

Watch this part [4:55 Two tools and an agent that decides](https://youtu.be/r_L1tHBKeZQ?t=295) [6:16 Same quality, twice the time and tokens](https://youtu.be/r_L1tHBKeZQ?t=376)

+------------------------+
| Section Metadata       |
+---------+--------------+
| id      | decision-lab |
+---------+--------------+

---

## The demo in Claude Desktop, reading the page before editing it

For the demo I drove the tools by hand from Claude Desktop, doing what an agent would normally do. Claude Desktop talks to MCP servers over stdio, and my server speaks HTTP, so a small bridge script in the repo reads JSON-RPC from stdin, forwards it to the function with the bearer token, and writes the answers back. The config is a few lines:

+---------------------------------------------------------------------------------------------------+
| Code                                                                                              |
+---------------------------------------------------------------------------------------------------+
| README.md, Claude Desktop setup                                                                   |
|                                                                                                   |
| [81e4cac on GitHub](https://github.com/jackzhaojin/azure-da-mcp/blob/81e4cac/README.md#L447-L465) |
+---------------------------------------------------------------------------------------------------+
| ```                                                                                               |
|    {                                                                                              |
|      "mcpServers": {                                                                              |
|        "azure-da-mcp": {                                                                          |
|          "command": "node",                                                                       |
|          "args": ["/absolute/path/to/azure-da-mcp/functions/mcp-stdio-bridge.js"],                |
|          "env": {                                                                                 |
|            "MCP_SERVER_URL": "http://localhost:7071/api/mcp",                                     |
|            "DALIVE_BEARER_TOKEN": "your-dalive-bearer-token-here"                                 |
|          }                                                                                        |
|        }                                                                                          |
|      }                                                                                            |
|    }                                                                                              |
| ```                                                                                               |
+---------------------------------------------------------------------------------------------------+

The page is a normal da.live page from my postal demo site. I pasted its editor URL into the chat. The tool accepts that, the `admin.da.live` URL or an `aem.page` URL, and normalizes it to `/source/org/site/path`.

Then I used what I call two-shot prompting. First: "Can you please get content from this page and let me know what you think." That fetches the content and gets it into context, the front of the model's memory. I can check that it read the page, because it tells me what it thinks. Then the real ask: "Looking at the first cards, can we have Air Hyper Express? Cost will be twice as much as the next highest cost, and write in the rest of the copy."

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board)                                                                                                                                                                                                                                                                                                                             |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![Top: the da.live editor showing a new Air Hyper Express card, Premium Choice, priced at $57.90, next to Ground Shipping at $9.65. Bottom: Claude Desktop saying the highest current cost is $28.95 for Priority Express so the new card will be $57.90, with two tool calls listed, Get dalive content and Save dalive content.][image6] |
|                                                                                                                                                                                                                                                                                                                                            |
| The result in the da.live editor, top, and in Claude Desktop, bottom. It read the highest price on the page and doubled it.                                                                                                                                                                                                                |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

It got the content again, which is fine. Then it saved. The new card showed up in the da.live editor without me even refreshing the screen.

This is also the part to keep in mind: AI is unpredictable. Every time I run this, it does different things. That unpredictability is both a feature and a challenge. The wording of the scaffolding, how the agent prompts the model and how the model chooses its tools, is what drives how effective and how accurate your agent is.

Watch this part [7:13 Demo in Claude Desktop](https://youtu.be/r_L1tHBKeZQ?t=433) [7:41 Get the page first](https://youtu.be/r_L1tHBKeZQ?t=461) [8:17 Ask for the new card](https://youtu.be/r_L1tHBKeZQ?t=497) [9:22 The card in da.live](https://youtu.be/r_L1tHBKeZQ?t=562)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-5 |
+---------+--------+

---

## Same quality, twice the cost, far more flexible

Hopefully this is a good demo of MCP versus not. In the grand scheme of system design, it comes down to your requirements and what your product needs to do. Here's where I landed:

- Content quality was the same either way.
- The tool version costs about twice the time and twice the tokens, because the model makes more calls and the page rides along on each one.
- It's much more flexible. The agent decides when to fetch and when to save, and any MCP client can drive the same two tools.
- Accuracy now depends on how the agent prompts the model. The order of calls used to live in my code.

At this point the server was still a foundation. The bearer token is copied by hand from the browser, and the server only gets and saves; there's no create, preview or publish yet.

Next, I wanted to know whether the same server would work with models other than Claude, and from somewhere other than my laptop. That's [part two](/writing/2025-10-12-da-live-mcp-across-ai-platforms/).

Watch this part [9:32 Wrap-up](https://youtu.be/r_L1tHBKeZQ?t=572)

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-6 |
+---------+--------+

---

## Related

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Row List                                                                                                                                                                   |
+-----------+----------------------------------------------------------------------------------------------------------------------------+-----------------------------------+
| Article   | [One da.live MCP Server Across Claude, Gemini, Azure OpenAI and n8n](/writing/2025-10-12-da-live-mcp-across-ai-platforms/) | Part two: the same tools on three |
|           |                                                                                                                            | models, Azure Functions and n8n.  |
+-----------+----------------------------------------------------------------------------------------------------------------------------+-----------------------------------+
| Article   | [Three Ways to Author on AEM Edge Delivery Services](/writing/2025-07-13-three-eds-offerings/)                             | Word and Google Docs, Universal   |
|           |                                                                                                                            | Editor and da.live, side by side. |
+-----------+----------------------------------------------------------------------------------------------------------------------------+-----------------------------------+
| Portfolio | [The Content Factory](/portfolio/content-factory/)                                                                         | Where this MCP server went next:  |
|           |                                                                                                                            | agents that generate, migrate and |
|           |                                                                                                                            | evaluate content.                 |
+-----------+----------------------------------------------------------------------------------------------------------------------------+-----------------------------------+
| Talk      | [AI Agent-Driven Content Migration for Edge Delivery Services](/talks/adaptto-2026/)                                       | adaptTo() 2026, Berlin.           |
+-----------+----------------------------------------------------------------------------------------------------------------------------+-----------------------------------+

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

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Metadata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| title                   | MCP Server for da.live: Scripted AI Flow vs Agent Tools \| Jack Jin                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| description             | How to expose da.live get and save as MCP tools, and what moving from a scripted AI flow to a tool loop costs: same quality, twice the time and tokens.                                                                                                                                                                                                                                                                                                                                                                                                                          |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| template                | article                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image                   | ![My draw.io board: Edit Content calls an agent with scaffolding, which talks to Claude and uses two MCP tools to get and save da.live content.][image7]                                                                                                                                                                                                                                                                                                                                                                                                                         |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image:alt               | My draw\.io board: Edit Content calls an agent with scaffolding, which talks to Claude and uses two MCP tools to get and save da.live content.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| published-time          | 2025-10-05                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| modified-time           | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| json-ld                 | {"@context":"https\://schema.org","@graph":\[{"@type":"Person","@id":"https\://www\.jackzhaojin.com/#person","name":"Jack Jin","url":"https\://www\.jackzhaojin.com/","jobTitle":"Associate Director","worksFor":{"@type":"Organization","name":"Accenture","department":{"@type":"Organization","name":"Adobe Business Group"}},"sameAs":\["https\://www\.linkedin.com/in/jackjin","https\://github.com/jackzhaojin","https\://www\.youtube.com/@jackjin8467","https\://www\.credly.com/users/jack-jin"],"award":\["Adobe Experience Manager Champion, class of 2026-2027","AEM |
|                         | Rockstar winner, Adobe Summit 2024"]},{"@type":"WebSite","@id":"https\://www\.jackzhaojin.com/#website","url":"https\://www\.jackzhaojin.com/","name":"Jack Jin","publisher":{"@id":"https\://www\.jackzhaojin.com/#person"}},{"@type":"TechArticle","@id":"https\://www\.jackzhaojin.com/writing/2025-10-05-mcp-server-for-eds-da-live/#article","headline":"Building an MCP Server for EDS da.live: Scripted AI Flow vs Agent Tools","description":"How to expose da.live get and save as MCP tools, and what moving from a scripted AI flow to a tool loop costs: same        |
|                         | quality, twice the time and tokens.","author":{"@id":"https\://www\.jackzhaojin.com/#person"},"publisher":{"@id":"https\://www\.jackzhaojin.com/#person"},"image":"https\://www\.jackzhaojin.com/writing/2025-10-05-mcp-server-for-eds-da-live/media\_16ce5e730c0d17f1dcd226ecee3c78f21b8ccc0f2.jpg","mainEntityOfPage":"https\://www\.jackzhaojin.com/writing/2025-10-05-mcp-server-for-eds-da-live/","isPartOf":{"@id":"https\://www\.jackzhaojin.com/#website"},"about":\["Model Context Protocol","da.live","Edge Delivery Services","Azure                                  |
|                         | Functions","Claude"],"datePublished":"2025-10-05","dateModified":"2026-10-04","inLanguage":"en","video":{"@id":"https\://www\.jackzhaojin.com/writing/2025-10-05-mcp-server-for-eds-da-live/#video"}},{"@type":"VideoObject","@id":"https\://www\.jackzhaojin.com/writing/2025-10-05-mcp-server-for-eds-da-live/#video","name":"Building an MCP Server for EDS da.live: From a Scripted AI Flow to Agent Tools","description":"Two ways to let a model edit a da.live page: a scripted flow on Azure Functions, and an MCP server with get and save tools the model calls        |
|                         | itself.","thumbnailUrl":"https\://www\.jackzhaojin.com/writing/2025-10-05-mcp-server-for-eds-da-live/media\_16ce5e730c0d17f1dcd226ecee3c78f21b8ccc0f2.jpg","uploadDate":"2026-10-03T19:56:55Z","duration":"PT9M57S","embedUrl":"https\://www\.youtube-nocookie.com/embed/r\_L1tHBKeZQ"},{"@type":"BreadcrumbList","@id":"https\://www\.jackzhaojin.com/writing/2025-10-05-mcp-server-for-eds-da-live/#breadcrumb","itemListElement":\[{"@type":"ListItem","position":1,"name":"Home","item":"https\://www\.jackzhaojin.com/"},{"@type":"ListItem","position":2,"name":"Technical |
|                         | Writing","item":"https\://www\.jackzhaojin.com/writing/"},{"@type":"ListItem","position":3,"name":"MCP Server for EDS da.live","item":"https\://www\.jackzhaojin.com/writing/2025-10-05-mcp-server-for-eds-da-live/"}]}]}                                                                                                                                                                                                                                                                                                                                                        |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| og:image:alt            | My draw\.io board: Edit Content calls an agent with scaffolding, which talks to Claude and uses two MCP tools to get and save da.live content.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:published\_time | 2025-10-05                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:modified\_time  | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:author          | https\://www\.jackzhaojin.com/                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-summary         | Two ways to let a model edit a da.live page: a scripted AI flow, and an MCP server with get and save tools the model calls itself. Same quality, twice the time and tokens, far more flexible. The code for both, and a side-by-side run of both versions.                                                                                                                                                                                                                                                                                                                       |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-image           | https\://www\.jackzhaojin.com/writing/media\_16ce5e730c0d17f1dcd226ecee3c78f21b8ccc0f2.jpg?width=750\&format=jpg\&optimize=medium                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-topics          | Adobe AEM & EDS\|AI Engineering                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-reading-time    | 10 min read                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-video-time      | 9:57 video                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-url       | https\://youtu.be/r\_L1tHBKeZQ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-watch-label     | Watch on YouTube                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-keywords        | model context protocol mcp server da.live document authoring edge delivery services admin.da.live source api azure functions claude desktop claude sonnet tool use agent loop                                                                                                                                                                                                                                                                                                                                                                                                    |
+-------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_112a9e7b9aecdf63fa9358fd21cefcb898de740e5.jpg#width=144&height=92

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_121c81c0b7d803905cd289a2db39514458f6712f5.jpg#width=144&height=92

[image2]: https://main--www-eds--jackzhaojin.aem.page/media_147d2fa7c38ddc7c088066e3660294714e2964d51.jpg#width=144&height=92

[image3]: https://main--www-eds--jackzhaojin.aem.page/media_11e2da8682005e644d43160a1f7737d8f703dfc83.svg#width=760&height=200

[image4]: https://main--www-eds--jackzhaojin.aem.page/media_1b2cac7869ae1046985ab12d293006951edbb2d19.svg#width=320&height=560

[image5]: https://main--www-eds--jackzhaojin.aem.page/media_121bd571b1b5195b1370b58901a7d93ef30748ad4.png#width=1200&height=963

[image6]: https://main--www-eds--jackzhaojin.aem.page/media_16397e81ae230da2a2e4929bf65da71c297e8c932.jpg#width=1145&height=698

[image7]: https://main--www-eds--jackzhaojin.aem.page/media_16ce5e730c0d17f1dcd226ecee3c78f21b8ccc0f2.jpg#width=1280&height=720
