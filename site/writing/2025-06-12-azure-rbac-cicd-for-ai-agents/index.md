1. [Home](/)
2. [Technical Writing](/writing/)
3. Azure RBAC for AI coding agents

# Azure RBAC and CI/CD for AI Coding Agents: Five Actors, Four Auth Patterns, Almost No Passwords

By [Jack Jin](/) · June 12, 2025 · Updated October 4, 2026 · 11 min read

If your AI agents can't test, they can't build. In June 2025 I gave five actors on one Next.js project access to Azure Storage and Azure AI Foundry: me, GitHub Copilot, the Azure Web App, OpenAI Codex and GitHub Actions. They use four Azure authentication patterns, and only one of them needs a secret. This is how each one works, with the code and the role-based access control behind it.

---

+-------------------------------------------------------------------------------------------------+
| Rail                                                                                            |
+-------------------------------------------+-----------------------------------------------------+
|                                           | **Since 2025**\                                     |
|                                           | [What changed since June 2025](#what-changed)       |
+-------------------------------------------+-----------------------------------------------------+
|                                           | **Part 1**\                                         |
|                                           | [AI writes all the code](#series)                   |
+-------------------------------------------+-----------------------------------------------------+
| ![][image0]                               | **Part 2**\                                         |
|                                           | [Five actors, four sign-ins](#actors)               |
+-------------------------------------------+-----------------------------------------------------+
| ![][image1]                               | **Part 3**\                                         |
|                                           | [Laptop: one az login](#local)                      |
+-------------------------------------------+-----------------------------------------------------+
| ![][image2]                               | **Part 4**\                                         |
|                                           | [The web app's managed identity](#managed-identity) |
+-------------------------------------------+-----------------------------------------------------+
| ![][image3]                               | **Part 5**\                                         |
|                                           | [Codex: a timed secret](#codex)                     |
+-------------------------------------------+-----------------------------------------------------+
| ![][image4]                               | **Part 6**\                                         |
|                                           | [GitHub Actions over OIDC](#github-actions)         |
+-------------------------------------------+-----------------------------------------------------+
| ![][image5]                               | **Part 7**\                                         |
|                                           | [Cheat sheet and why](#together)                    |
+-------------------------------------------+-----------------------------------------------------+
| [Code on GitHub](https://github.com/jackzhaojin/shadow-pivot-ai-agentv2/tree/f761ff7)           |
+-------------------------------------------------------------------------------------------------+

---

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Fine Print                                                                                                                                                                                                                                                                                                |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| First published as a LinkedIn article on June 12, 2025. Rewritten for this site in October 2026. Code: [shadow-pivot-ai-agentv2](https://github.com/jackzhaojin/shadow-pivot-ai-agentv2/tree/f761ff7) at `f761ff7`, the commit deployed when I took the screenshots. Azure SDK: `@azure/identity` 4.10.0. |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

---

## What changed since June 2025

The project kept going. The same app shipped as release 1.0 a few weeks later, and I wrote it up in three parts: [release 1.0](/writing/2025-07-06-ai-coded-nextjs-agent-release-1/), then [the CI/CD and infrastructure behind it](/writing/2025-07-07-ai-coded-nextjs-agent-cicd-infrastructure/), then [the delivery method I pulled out of it](/writing/2025-07-11-scaling-ai-coding-delivery-methodology/).

The Azure SDK moved too. `DefaultAzureCredential`, the piece that makes three of these patterns work, now lets you choose exactly which credential it uses. Version 4.10.0, the one this project locked, already read an `AZURE_TOKEN_CREDENTIALS` variable set to `dev` or `prod`. In 4.11.0 (August 5, 2025) it also accepts a single credential name, such as `AzureCliCredential` or `EnvironmentCredential`, and the chain gained a Visual Studio Code sign-in. Both are in the [@azure/identity changelog](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/CHANGELOG.md). The last case in the credential chain figure in part 3 shows the `dev` setting.

+------------------------+
| Section Metadata       |
+---------+--------------+
| id      | what-changed |
+---------+--------------+

---

## 1. An app where AI writes all the code, so AI has to test

The project is a public-facing AI agent app in Next.js where I don't write a single line of code myself. AI writes all of the code and all of the test automation. It has a modern UI and no sign-in, but it remembers you and lets you download your earlier work. That rule is why access matters so much here: if the agents can't reach the real services, they can't test their own code.

My part is limited to three things:

- Updating markdown files: the product requirements document, the agent instructions and the project plan.
- Testing, locally and on Azure. I don't change the code, the test automation or its configuration myself.
- Configuring Azure by hand. To keep the scope reasonable there's no infrastructure as code; AI helps me document the setup in `infrastructure.md`.

I'm not an expert in cloud auth, so this is the setup as I worked it out, including where it didn't hold.

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Fine Print                                                                                                                                                                       |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| The [test version](https://shadow-pivot-ai-agentv2-fpfzhqgyeqdpdwce.eastus2-01.azurewebsites.net/) runs as a container on a free Azure plan, so it can take a moment to wake up. |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| id      | series |
+---------+--------+

---

## 2. Five actors that need Azure, four ways to sign in

For AI to be useful it needs the same access a developer has: the real cloud resources, the data stores, the permissioned APIs. Here that means an Azure Storage account (Blob Storage for now) and an Azure AI Foundry instance, which can serve models from several vendors. Five actors need in:

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board, open)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [![Diagram titled Enabling Agentic AI Agents with Proper Azure Role-Based Access Control. Five rows, each actor to its auth method to its Azure identity to a resource. Local User and Local GitHub Copilot both go through az login (passwordless) to a user identity, then storage and AI Foundry. OpenAI Codex uses tenant, ID and secret with a service principal with a timed secret, then storage and AI Foundry. GitHub Action uses OIDC (passwordless) with a federated service principal, then the Azure Web App. Azure Web App uses its system managed identity (passwordless), then storage and AI Foundry.][image6]](https://www.jackzhaojin.com/writing/2025-06-12-azure-rbac-cicd-for-ai-agents/media_13754aaea4006b55ee32f82415dceaaeef903b970.png) |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| My diagram from the original post. Green is the actor, red how it signs in, orange the identity Azure sees, blue the resource it reaches.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Each actor uses a different pattern, and each identity gets its own role assignments in Azure. The goal for all of them is enablement: unblock the agents so they can code, test and deploy like real developers. And keep it as passwordless as Azure allows. The one exception is Codex, in part 5.

+------------------+
| Section Metadata |
+---------+--------+
| id      | actors |
+---------+--------+

---

## 3. Me and Copilot on my laptop share one az login

Local development is where it all begins, and locally there are two developers: me, and GitHub Copilot running in the same VS Code terminal with the same sign-in. That sign-in comes from one command, `az login`. The Azure CLI opens a browser, I sign in, and the CLI keeps a token on my machine. No password goes into the project, and Copilot never sees a credential.

The part that confused me at first is why that's enough for a Node.js app. The answer is `DefaultAzureCredential` in the Azure SDK. It's a chain. It tries several credentials in a fixed order and uses the first one that works. On my laptop the earlier ones have nothing to go on, so it reaches `AzureCliCredential`, which asks the CLI for a token as whoever ran `az login`. The app's code never changes between environments:

+-----------------------------------------------------------------------------------------------------------------+
| Code (stack)                                                                                                    |
+-----------------------------------------------------------------------------------------------------------------+
| lib/aiClient.ts, lines 1 to 16                                                                                  |
|                                                                                                                 |
| [f761ff7 on GitHub](https://github.com/jackzhaojin/shadow-pivot-ai-agentv2/blob/f761ff7/lib/aiClient.ts#L1-L16) |
+-----------------------------------------------------------------------------------------------------------------+
| ```                                                                                                             |
| import { AzureOpenAI } from 'openai';                                                                           |
| import { DefaultAzureCredential } from '@azure/identity';                                                       |
|                                                                                                                 |
| export function getAIClient() {                                                                                 |
|   const endpoint = process.env.AZURE_OPENAI_ENDPOINT \|\| 'https://story-generation-v1.openai.azure.com/';      |
|   const credential = new DefaultAzureCredential();                                                              |
|                                                                                                                 |
|   return new AzureOpenAI({                                                                                      |
|     endpoint: endpoint,                                                                                         |
|     apiVersion: '2024-02-01',                                                                                   |
|     azureADTokenProvider: async () => {                                                                         |
|       const token = await credential.getToken('https://cognitiveservices.azure.com/.default');                  |
|       return token?.token \|\| '';                                                                              |
|     }                                                                                                           |
|   });                                                                                                           |
| }                                                                                                               |
| ```                                                                                                             |
+-----------------------------------------------------------------------------------------------------------------+

The storage client in `lib/storageClient.ts` does the same with `new DefaultAzureCredential()` and a `BlobServiceClient`. So when I type `npm run dev`, or the agent types it for me, the dev server can reach both services, passwordless:

```
$ npm run dev
> shadow-pivot-ai-agentv2@0.1.0 dev
> next dev --turbopack

   ▲ Next.js 15.3.3 (Turbopack)
   - Local:        http://localhost:3000
   - Environments: .env.local

 ✓ Ready in 1555ms
 GET / 200 in 9084ms
 GET /api/test-storage 200 in 3521ms
 GET /api/test-ai 200 in 5254ms
```

That's from my screenshot in the original post, with the network address and the compile lines trimmed. The repo's `baseline-testing/test-azure-connections.sh` hits the same two routes and also checks that the CLI is signed in.

Which credential wins depends on what the machine has. Pick where the code runs below: the list shows each credential the SDK tries, in order, and the line under it says who the app ends up signed in as. This is why the same `aiClient.ts` works on my laptop, on the web app and in Codex without a code change.

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Explainer (credential chain)                                                                                                                                                                                                                |
+-------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------+
| which credential answers · DefaultAzureCredential in @azure/identity          | [source](https://github.com/Azure/azure-sdk-for-js/blob/%40azure/identity_4.10.0/sdk/identity/identity/src/credentials/defaultAzureCredential.ts#L233-L292) |
| 4\.10.0                                                                       |                                                                                                                                                             |
+-------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Where the code runs                                                           | The chain, in order                                                                                                                                         |
|                                                                               |                                                                                                                                                             |
| - My laptop, me or Copilot                                                    | 1. EnvironmentCredential                                                                                                                                    |
| - The Azure Web App                                                           | 2. WorkloadIdentityCredential                                                                                                                               |
| - A Codex task                                                                | 3. ManagedIdentityCredential                                                                                                                                |
| - Codex, secret expired                                                       | 4. AzureCliCredential                                                                                                                                       |
| - My laptop with Codex's variables                                            | 5. AzurePowerShellCredential                                                                                                                                |
| - Same laptop, dev mode                                                       | 6. AzureDeveloperCliCredential                                                                                                                              |
|                                                                               |                                                                                                                                                             |
| Or set the switches yourself                                                  |                                                                                                                                                             |
|                                                                               |                                                                                                                                                             |
| Signals the credential chain looks for                                        |                                                                                                                                                             |
|                                                                               |                                                                                                                                                             |
| - `AZURE_TENANT_ID`, `AZURE_CLIENT_ID` and `AZURE_CLIENT_SECRET` are set      |                                                                                                                                                             |
| - and the secret is still valid                                               |                                                                                                                                                             |
| - Running in App Service with a managed identity (`IDENTITY_ENDPOINT` is set) |                                                                                                                                                             |
| - The Azure CLI is signed in with `az login`                                  |                                                                                                                                                             |
|                                                                               |                                                                                                                                                             |
| `AZURE_TOKEN_CREDENTIALS`                                                     |                                                                                                                                                             |
|                                                                               |                                                                                                                                                             |
| - not set: the full chain                                                     |                                                                                                                                                             |
| - dev: developer tools only                                                   |                                                                                                                                                             |
| - prod: deployed-service credentials only                                     |                                                                                                                                                             |
+-------------------------------------------------------------------------------+------------------------------------------------------------------------------+------------------------------------------------------------------------------+
| Where the code runs                                                           | What it has                                                                  | Which credential answers                                                     |
+-------------------------------------------------------------------------------+------------------------------------------------------------------------------+------------------------------------------------------------------------------+
| My laptop, me or Copilot                                                      | `az login`                                                                   | AzureCliCredential, after the first three report unavailable                 |
+-------------------------------------------------------------------------------+------------------------------------------------------------------------------+------------------------------------------------------------------------------+
| The Azure Web App                                                             | A system-assigned managed identity                                           | ManagedIdentityCredential                                                    |
+-------------------------------------------------------------------------------+------------------------------------------------------------------------------+------------------------------------------------------------------------------+
| A Codex task                                                                  | Tenant, client ID and secret as environment variables                        | EnvironmentCredential, first in line                                         |
+-------------------------------------------------------------------------------+------------------------------------------------------------------------------+------------------------------------------------------------------------------+
| Codex, secret expired                                                         | The same variables, rejected                                                 | None. EnvironmentCredential fails with an authentication error, and the      |
|                                                                               |                                                                              | chain stops                                                                  |
+-------------------------------------------------------------------------------+------------------------------------------------------------------------------+------------------------------------------------------------------------------+
| My laptop with Codex's variables                                              | The variables and `az login`                                                 | EnvironmentCredential: the app runs as the service principal, not as me      |
+-------------------------------------------------------------------------------+------------------------------------------------------------------------------+------------------------------------------------------------------------------+
| Same laptop, dev mode (`AZURE_TOKEN_CREDENTIALS=dev`)                         | The variables and `az login`                                                 | AzureCliCredential: the dev setting leaves the first three out               |
+-------------------------------------------------------------------------------+------------------------------------------------------------------------------+------------------------------------------------------------------------------+
| A simplified model of `DefaultAzureCredential` in 4.10.0. The order, the dev and prod split, and the rule that only an "unavailable" result moves on to the next credential come from its source. No tokens are requested. GitHub Actions   |
| isn't here because my workflow doesn't use the SDK: it signs the CLI in and runs `az` commands.                                                                                                                                             |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Two of those cases can catch you out. Leave a service principal's variables exported in your terminal and the app signs in as the service principal, not as you. And an expired secret doesn't fall back to your `az login`; the chain ends with an error.

With that access, the agent can check its own work against the real services. Here I asked Copilot to validate a task another agent said it had finished. It read the code, ran the integration test against AI Foundry, and gave me manual test steps:

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board, compact, open)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [![GitHub Copilot chat in VS Code. Prompt: Another Agent mentioned it finished 3.2.1, can you validate its work? Copilot searches the workspace, reads project-management.mdc, aiClient.ts, ai-connection.test.js and the route files, runs node tests/ai-connection.test.js, and reports that the 3.2.1 Azure AI Foundry Service Connection is present and complete and the test ran without errors.][image7]](https://www.jackzhaojin.com/writing/2025-06-12-azure-rbac-cicd-for-ai-agents/media_14a121bb59701814eefe7a116e48a35d4b73ba901.png) |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Copilot checking another agent's task against the live AI Foundry endpoint, through my `az login`.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Test-driven development has to be part of every agent-driven product. They will do all the work. All you have to do is ask nicely. For access, I gave my user account roles on the storage account and the AI Foundry instance through the Azure portal. In a real project, roles should go to groups, not to users directly.

+------------------+
| Section Metadata |
+---------+--------+
| id      | local  |
+---------+--------+

---

## 4. The web app signs in with its own managed identity

In production the Azure Web App needs the same two services, and it can't use my laptop's sign-in. This is where a system-assigned managed identity comes in. It's an identity Azure creates for the web app itself, so there's no enterprise application or service principal to set up, and Azure deletes it when the app is deleted. App Service gives the app a local endpoint to get tokens for that identity, and `DefaultAzureCredential` finds it on its own ([Microsoft's docs on how it works](https://learn.microsoft.com/en-us/azure/app-service/overview-managed-identity)).

No keys and no passwords. Just role-based access control. I assigned the identity roles on the storage account and on AI Foundry in the portal:

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Explainer (role assignments)                                                                                                                                                                                                                                                                                                 |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Storage Blob Data Contributor (2)                                                                                                                                                                                                                                                                                            |
+-------------------------------------------------------------------------------+-------------------------------------------------------------------------------+------------------------------------------------------------------------------+-------------------------------------------------------------------------------+
| Name                                                                          | Type                                                                          | Role                                                                         | Scope                                                                         |
+-------------------------------------------------------------------------------+-------------------------------------------------------------------------------+------------------------------------------------------------------------------+-------------------------------------------------------------------------------+
| Jack Jin                                                                      | User                                                                          | Storage Blob Data Contributor                                                | This resource                                                                 |
+-------------------------------------------------------------------------------+-------------------------------------------------------------------------------+------------------------------------------------------------------------------+-------------------------------------------------------------------------------+
| shadow-pivot-ai-agentv2                                                       | Managed identity                                                              | Storage Blob Data Contributor                                                | This resource                                                                 |
+-------------------------------------------------------------------------------+-------------------------------------------------------------------------------+------------------------------------------------------------------------------+-------------------------------------------------------------------------------+
| The storage account's role assignments in the Azure portal: my user from part 3 and the web app's managed identity. Transcribed from [my portal screenshot](https://www.jackzhaojin.com/writing/2025-06-12-azure-rbac-cicd-for-ai-agents/media_13ee6613f78b5c4ab9517d20edbaae879aa6ff2ef.png), with the object IDs left out. |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

This is Azure at its best: services talking to services with built-in identities and scoped permissions. It's the most basic pattern of the four, and it has to work first. I configured it by hand in the portal for speed, with no infrastructure as code yet.

A system-assigned identity belongs to one app. If I add more apps later, a user-assigned identity can be shared by several of them. I haven't needed that yet.

+----------------------------+
| Section Metadata           |
+---------+------------------+
| id      | managed-identity |
+---------+------------------+

---

## 5. Codex gets a service principal with a timed secret

This is my favorite one. OpenAI's Codex was brand new in June 2025, and it runs pull request tasks in the cloud. It needs the same thing as everyone else: if the AI can't test, the AI can't code. You wouldn't want a teammate who can't test either.

Codex didn't support managed identity or OpenID Connect at the time, so this is where I had to make an exception to passwordless. I didn't give it storage account keys or OpenAI keys; I don't consider that proper authorization. I fell back to Azure's most universal option: a service principal with a secret. This pattern has been around for years. It's not glamorous, but it works. The permissions are still controlled with role-based access control, the same way as the web app's.

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board, open)                                                                                                                                                                                                                                                      |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [![Azure portal client secrets list with one secret, condex-secret-2025-06-09, expiring 6/9/2027. The value column is hidden.][image8]](https://www.jackzhaojin.com/writing/2025-06-12-azure-rbac-cicd-for-ai-agents/media_15ee50e404ad6a78e0f6e10772d41841f121259ba.png) |
|                                                                                                                                                                                                                                                                           |
| The service principal's secret, with an expiry date. I hid the value.                                                                                                                                                                                                     |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

The secret isn't in a `.env` file or anywhere on disk. It goes into the Codex environment as three variables:

```
AZURE_CLIENT_ID=<service principal app ID>
AZURE_TENANT_ID=<tenant ID>
AZURE_CLIENT_SECRET=<secret>
```

Those three names are exactly what `EnvironmentCredential` looks for, and it's first in the chain from part 3, so the same code signs in as the service principal with no change. Codex uses it to make its calls to Azure during its validation steps, and when I wrote this, it worked. One thing I hit: Codex has its own secrets setting, but at the time `DefaultAzureCredential` didn't read values put there, so the three went in as environment variables. And since Codex reads `AGENTS.md`, the last line of mine tells it plainly: "AZ login does not work, use service principle credentials provided AZURE\_CLIENT\_SECRET".

Azure gives every secret an expiry timer, and a service principal can hold more than one secret at a time, so rotating one is easy. Is it perfect? No. But it's a big step toward agents that verify their own work in the cloud.

+------------------+
| Section Metadata |
+---------+--------+
| id      | codex  |
+---------+--------+

---

## 6. GitHub Actions deploys over OIDC with no stored secret

Once code is written, by me, Copilot or Codex, I want it deployed quickly and securely. That's where GitHub Actions and Azure's OpenID Connect support come in. I created an enterprise application in Azure, mapped it to a service principal, and added a federated credential that trusts GitHub for my repo's `main` branch:

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board, open)                                                                                                                                                                                                                                                                                                                                                                                                                           |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [![Azure portal Federated credentials tab showing three credentials: ghcr-deploy-main for repo jackzhaojin/shadow-pivot-nextjs, ghcr-deploy-ai-agent-main for jackzhaojin/shadow-pivot-ai-agent, and ghcr-deploy-ai-agentv2-main for jackzhaojin/shadow-pivot-ai-agentv2, each on the main branch.][image9]](https://www.jackzhaojin.com/writing/2025-06-12-azure-rbac-cicd-for-ai-agents/media_1e6071225c500a4ed40747420624be83f42e2572a.png) |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| One app registration, one federated credential per repo. GitHub gets a token from Azure without any stored secret.                                                                                                                                                                                                                                                                                                                             |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

A tip for that form: if it's confusing, take a screenshot of the form and of the GitHub branch you're setting up, and Copilot or another assistant will tell you which field gets what.

On every push to `main`, the workflow builds the image, pushes it to the GitHub Container Registry, signs in to Azure with OIDC and restarts the web app:

+----------------------------------------------------------------------------------------------------------------------------------------------------+
| Code (stack)                                                                                                                                       |
+----------------------------------------------------------------------------------------------------------------------------------------------------+
| .github/workflows/main\_shadow-pivot-ai-agentv2.yml, lines 1 to 76                                                                                 |
|                                                                                                                                                    |
| [f761ff7 on GitHub](https://github.com/jackzhaojin/shadow-pivot-ai-agentv2/blob/f761ff7/.github/workflows/main_shadow-pivot-ai-agentv2.yml#L1-L76) |
+----------------------------------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                                                |
| name: Build Docker → Push to GHCR → Restart Azure Web App                                                                                          |
|                                                                                                                                                    |
| on:                                                                                                                                                |
|   push:                                                                                                                                            |
|     branches:                                                                                                                                      |
|       - main                                                                                                                                       |
|   workflow_dispatch:                                                                                                                               |
|                                                                                                                                                    |
| permissions:                                                                                                                                       |
|   id-token: write                                                                                                                                  |
|   contents: read                                                                                                                                   |
|   packages: write                                                                                                                                  |
|                                                                                                                                                    |
| env:                                                                                                                                               |
|   IMAGE_NAME: ghcr.io/${{ github.repository_owner }}/shadow-pivot-ai-agentv2                                                                       |
|   RESOURCE_GROUP_NAME: ShadowPivot                                                                                                                 |
|   WEBAPP_NAME: shadow-pivot-ai-agentv2                                                                                                             |
|   # lines 18 to 59 not shown: the build-and-push job                                                                                               |
|   azure-steps:                                                                                                                                     |
|     runs-on: ubuntu-latest                                                                                                                         |
|     needs: build-and-push                                                                                                                          |
|                                                                                                                                                    |
|     steps:                                                                                                                                         |
|       - name: Login to Azure                                                                                                                       |
|         uses: azure/login@v2                                                                                                                       |
|         with:                                                                                                                                      |
|           client-id: ${{ vars.AZURE_CLIENT_ID }}                                                                                                   |
|           tenant-id: ${{ vars.AZURE_TENANT_ID }}                                                                                                   |
|           subscription-id: ${{ vars.AZURE_SUBSCRIPTION_ID }}                                                                                       |
|                                                                                                                                                    |
|       - name: Restart Azure Web App to trigger GHCR image pull                                                                                     |
|         run: \|                                                                                                                                    |
|           az webapp restart \                                                                                                                      |
|             --name $WEBAPP_NAME \                                                                                                                  |
|             --resource-group $RESOURCE_GROUP_NAME                                                                                                  |
| ```                                                                                                                                                |
+----------------------------------------------------------------------------------------------------------------------------------------------------+

The `id-token: write` permission lets the job ask GitHub for an OIDC token, and `azure/login` trades it for an Azure session through the federated credential. The client, tenant and subscription IDs are repository variables, not secrets. The restart is there because on the free plan I'm using, the web app doesn't pick up a new container image when one is pushed. Restarting it makes Azure pull the latest one.

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board, open)                                                                                                                                                                                                                                                                                                                                                                                                         |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [![GitHub Actions page for shadow-pivot-ai-agentv2 listing 30 workflow runs of Build Docker, Push to GHCR, Restart Azure Web App. The latest runs, including merges of Codex pull requests 10, 11 and 12, succeeded in about two to three minutes each. One earlier run failed.][image10]](https://www.jackzhaojin.com/writing/2025-06-12-azure-rbac-cicd-for-ai-agents/media_194ac365d32854bac0013227dbebb65ba18e2b533.png) |
|                                                                                                                                                                                                                                                                                                                                                                                                                              |
| The pipeline at the time: the latest merges to main, including three Codex pull requests, each deployed in two to three minutes. One earlier run failed.                                                                                                                                                                                                                                                                     |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

I'm only pushing a `latest` tag, with no multi-stage build or image optimization yet, and I'm skipping a lot of DevOps setup to keep this about authorization. The one catch is the free plan: a web app that's been idle takes a while to wake up. A paid plan, or a cloud with a longer free tier, wouldn't have that problem.

+--------------------------+
| Section Metadata         |
+---------+----------------+
| id      | github-actions |
+---------+----------------+

---

## 7. The cheat sheet, and why agents need this access

Here's the cheat sheet from the original post:

+----------------------------------------------------------------------------------------------------------+
| Data Table (cheat, stack)                                                                                |
+----------------+-----------------------+---------------------+-----------------------+-------------------+
| Actor          | Auth method           | Identity Azure sees | Reaches               | Notes             |
+----------------+-----------------------+---------------------+-----------------------+-------------------+
| Me, locally    | `az login` CLI token  | My user             | Storage, AI Foundry   | The CLI keeps the |
|                |                       |                     |                       | token             |
+----------------+-----------------------+---------------------+-----------------------+-------------------+
| GitHub Copilot | Inherits the CLI      | My user             | Storage, AI Foundry   | Runs in my local  |
|                | sign-in               |                     |                       | Node.js context   |
+----------------+-----------------------+---------------------+-----------------------+-------------------+
| Azure Web App  | System-assigned       | The app's own       | Storage, AI Foundry   | Roles set in the  |
|                | managed identity      | identity            |                       | portal            |
+----------------+-----------------------+---------------------+-----------------------+-------------------+
| Codex          | Service principal and | A service principal | Storage, AI Foundry   | Environment       |
|                | secret                |                     |                       | variables, timed  |
|                |                       |                     |                       | secret            |
+----------------+-----------------------+---------------------+-----------------------+-------------------+
| GitHub Actions | OIDC and a federated  | A service principal | The web app (restart) | No secrets stored |
|                | credential            |                     |                       |                   |
+----------------+-----------------------+---------------------+-----------------------+-------------------+

One correction to that table. In June 2025 I wrote Contributor as the role in every row. The portal screenshot in part 4 is more exact: on the storage account, my user and the web app hold Storage Blob Data Contributor, a role for reading and writing the data. The repo's [infrastructure.md](https://github.com/jackzhaojin/shadow-pivot-ai-agentv2/blob/f761ff7/infrastructure.md) lists the roles for each setup step, including Cognitive Services OpenAI User for the AI resource.

Every one of these patterns exists to unblock the AI as a real member of the team. In this project I write 0% of the code, so letting the AI test, validate and deploy isn't optional. If agents can't reach the data store or the models in AI Foundry, they get confused, slowed down and unproductive. It's like coding a database application without a database.

Not everything held. The day after this post, a Codex pull request ([#17](https://github.com/jackzhaojin/shadow-pivot-ai-agentv2/pull/17)) changed the baseline tests to skip the AI Foundry checks when they run inside Codex or can't reach the endpoint. The storage checks still run there. And everything in Azure was still configured by hand.

This was the foundation: full CI/CD, and both agents, Copilot locally and Codex in the cloud, able to validate their own work. If AI can't test, it can't code. That's the baseline.

+--------------------+
| Section Metadata   |
+---------+----------+
| id      | together |
+---------+----------+

---

## Related

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Row List                                                                                                                                                                  |
+-----------+------------------------------------------------------------------------------------------------------------------------+--------------------------------------+
| Portfolio | [Shadow Pivot: my first AI-coded app](/portfolio/shadow-pivot/)                                                        | The whole project, from release 1.0  |
|           |                                                                                                                        | to the method behind it.             |
+-----------+------------------------------------------------------------------------------------------------------------------------+--------------------------------------+
| Article   | [The CI/CD and infrastructure behind the AI-coded app](/writing/2025-07-07-ai-coded-nextjs-agent-cicd-infrastructure/) | Both pipelines, the EC2 copy and the |
|           |                                                                                                                        | app's architecture.                  |
+-----------+------------------------------------------------------------------------------------------------------------------------+--------------------------------------+

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

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Metadata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| title                   | Azure RBAC and CI/CD for AI Coding Agents \| Jack Jin                                                                                                                                                                                                                                                                                                                                                                                                         |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| description             | How I gave Copilot, Codex, GitHub Actions and an Azure Web App access to Storage and AI Foundry with az login, managed identity, OIDC and one timed secret.                                                                                                                                                                                                                                                                                                   |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| template                | article                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image                   | ![Diagram of five actors and four Azure auth patterns: az login, a service principal with a timed secret, OIDC with a federated credential, and a system-assigned managed identity][image11]                                                                                                                                                                                                                                                                  |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image:alt               | Diagram of five actors and four Azure auth patterns: az login, a service principal with a timed secret, OIDC with a federated credential, and a system-assigned managed identity                                                                                                                                                                                                                                                                              |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| published-time          | 2025-06-12                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| modified-time           | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| json-ld                 | {"@context":"https\://schema.org","@graph":\[{"@type":"Person","@id":"https\://www\.jackzhaojin.com/#person","name":"Jack Jin","url":"https\://www\.jackzhaojin.com/","jobTitle":"Associate Director","worksFor":{"@type":"Organization","name":"Accenture","department":{"@type":"Organization","name":"Adobe Business                                                                                                                                       |
|                         | Group"}},"sameAs":\["https\://www\.linkedin.com/in/jackjin","https\://github.com/jackzhaojin","https\://www\.youtube.com/@jackjin8467","https\://www\.credly.com/users/jack-jin"],"award":\["Adobe Experience Manager Champion, class of 2026-2027","AEM Rockstar winner, Adobe Summit 2024"]},{"@type":"WebSite","@id":"https\://www\.jackzhaojin.com/#website","url":"https\://www\.jackzhaojin.com/","name":"Jack                                          |
|                         | Jin","publisher":{"@id":"https\://www\.jackzhaojin.com/#person"}},{"@type":"TechArticle","@id":"https\://www\.jackzhaojin.com/writing/2025-06-12-azure-rbac-cicd-for-ai-agents/#article","headline":"Azure RBAC and CI/CD for AI Coding Agents: Five Actors, Four Auth Patterns, Almost No Passwords","description":"How I gave Copilot, Codex, GitHub Actions and an Azure Web App access to Storage and AI Foundry with az login, managed identity, OIDC    |
|                         | and one timed                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|                         | secret.","author":{"@id":"https\://www\.jackzhaojin.com/#person"},"publisher":{"@id":"https\://www\.jackzhaojin.com/#person"},"image":"https\://www\.jackzhaojin.com/writing/2025-06-12-azure-rbac-cicd-for-ai-agents/media\_18941507385fa7c35acba3c24f5b002bd466f5361.jpg","mainEntityOfPage":"https\://www\.jackzhaojin.com/writing/2025-06-12-azure-rbac-cicd-for-ai-agents/","isPartOf":{"@id":"https\://www\.jackzhaojin.com/#website"},"about":\["Azure |
|                         | role-based access control","DefaultAzureCredential","Managed identity","OpenID Connect","GitHub Actions","OpenAI Codex","GitHub Copilot","Azure AI                                                                                                                                                                                                                                                                                                            |
|                         | Foundry"],"datePublished":"2025-06-12","dateModified":"2026-10-04","inLanguage":"en","wordCount":2377},{"@type":"BreadcrumbList","@id":"https\://www\.jackzhaojin.com/writing/2025-06-12-azure-rbac-cicd-for-ai-agents/#breadcrumb","itemListElement":\[{"@type":"ListItem","position":1,"name":"Home","item":"https\://www\.jackzhaojin.com/"},{"@type":"ListItem","position":2,"name":"Technical                                                            |
|                         | Writing","item":"https\://www\.jackzhaojin.com/writing/"},{"@type":"ListItem","position":3,"name":"Azure RBAC for AI coding agents","item":"https\://www\.jackzhaojin.com/writing/2025-06-12-azure-rbac-cicd-for-ai-agents/"}]}]}                                                                                                                                                                                                                             |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| og:image:alt            | Diagram of five actors and four Azure auth patterns: az login, a service principal with a timed secret, OIDC with a federated credential, and a system-assigned managed identity                                                                                                                                                                                                                                                                              |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:published\_time | 2025-06-12                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:modified\_time  | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:author          | https\://www\.jackzhaojin.com/                                                                                                                                                                                                                                                                                                                                                                                                                                |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-summary         | How I gave Copilot, Codex, GitHub Actions and an Azure Web App access to Azure Storage and AI Foundry with az login, managed identity, OIDC and one timed secret. Includes a lab that shows which credential DefaultAzureCredential picks.                                                                                                                                                                                                                    |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-image           | https\://www\.jackzhaojin.com/writing/media\_18941507385fa7c35acba3c24f5b002bd466f5361.jpg?width=750\&format=jpg\&optimize=medium                                                                                                                                                                                                                                                                                                                             |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-topics          | AI Engineering                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-reading-time    | 11 min read                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-keywords        | azure rbac defaultazurecredential az login managed identity service principal openid connect oidc federated credential github actions openai codex github copilot azure ai foundry azure blob storage azure web app azure\_token\_credentials next.js                                                                                                                                                                                                         |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_1cbbbeea9df37ea0701c0b5a8e59cc7eba8b7adaf.png#width=144&height=92

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_1d03e2b1bb50e34aeccf95c90a269aa5eb847b371.png#width=144&height=92

[image2]: https://main--www-eds--jackzhaojin.aem.page/media_10eb20ac85a4bf35a566a31b6897b92a7dd738027.png#width=144&height=92

[image3]: https://main--www-eds--jackzhaojin.aem.page/media_1a404407163826a1d8955b6a87ed4343cbe26144c.png#width=144&height=92

[image4]: https://main--www-eds--jackzhaojin.aem.page/media_149988e92cadac6169476340560d09db543dadcce.png#width=144&height=92

[image5]: https://main--www-eds--jackzhaojin.aem.page/media_1154480f70535b2b6cb7ec4d9dfecc4a823b88a89.png#width=144&height=92

[image6]: https://main--www-eds--jackzhaojin.aem.page/media_13754aaea4006b55ee32f82415dceaaeef903b970.png#width=1600&height=866

[image7]: https://main--www-eds--jackzhaojin.aem.page/media_14a121bb59701814eefe7a116e48a35d4b73ba901.png#width=669&height=920

[image8]: https://main--www-eds--jackzhaojin.aem.page/media_15ee50e404ad6a78e0f6e10772d41841f121259ba.png#width=1046&height=299

[image9]: https://main--www-eds--jackzhaojin.aem.page/media_1e6071225c500a4ed40747420624be83f42e2572a.png#width=1700&height=543

[image10]: https://main--www-eds--jackzhaojin.aem.page/media_194ac365d32854bac0013227dbebb65ba18e2b533.png#width=1600&height=721

[image11]: https://main--www-eds--jackzhaojin.aem.page/media_18941507385fa7c35acba3c24f5b002bd466f5361.jpg#width=1280&height=720
