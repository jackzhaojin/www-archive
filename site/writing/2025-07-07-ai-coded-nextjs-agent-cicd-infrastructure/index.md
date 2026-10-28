1. [Home](/)
2. [Technical Writing](/writing/)
3. AI-Coded Next.js Agent, Part 2

# A 100% AI-Coded Next.js Agent, Part 2: CI/CD, Cloud Identities and the Architecture

By [Jack Jin](/) · July 7, 2025 · Updated October 4, 2026 · 8 min read

How an app written entirely by AI gets from a commit to the cloud: two GitHub Actions pipelines picked by branch name, five actors that each get into Azure their own way, a public copy on CloudFront and EC2, a layered Next.js architecture, and prompts kept as versioned JSON files. It's the plumbing of the AI-coded agent from [Part 1](/writing/2025-07-06-ai-coded-nextjs-agent-release-1/), and all of it is in the public repo.

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Series                                                                                                                                                                                     |
+----------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+
| Three-part series                                                                            | Series: the 100% AI-coded Next.js agent                                                     |
+----------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+
| **[Part 1](/writing/2025-07-06-ai-coded-nextjs-agent-release-1/)**[The four practices behind release 1.0](/writing/2025-07-06-ai-coded-nextjs-agent-release-1/)                            |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **[Part 2](/writing/2025-07-07-ai-coded-nextjs-agent-cicd-infrastructure/)**[CI/CD, cloud identities and the architecture](/writing/2025-07-07-ai-coded-nextjs-agent-cicd-infrastructure/) |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **[Part 3](/writing/2025-07-11-scaling-ai-coding-delivery-methodology/)**[Scaling the method to a delivery team](/writing/2025-07-11-scaling-ai-coding-delivery-methodology/)              |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

---

+-------------------------------------------------------------------------------------------+
| Rail                                                                                      |
+---------------------------------------------+---------------------------------------------+
|                                             | **Since 2025**\                             |
|                                             | [The public copy is down](#changed)         |
+---------------------------------------------+---------------------------------------------+
| ![][image0]                                 | **1**\                                      |
|                                             | [Two pipelines, by branch](#part-1)         |
+---------------------------------------------+---------------------------------------------+
| ![][image1]                                 | **2**\                                      |
|                                             | [Five actors, one code path](#part-2)       |
+---------------------------------------------+---------------------------------------------+
| ![][image2]                                 | **3**\                                      |
|                                             | [Public copy on EC2](#part-3)               |
+---------------------------------------------+---------------------------------------------+
| ![][image3]                                 | **4**\                                      |
|                                             | [How a request moves](#part-4)              |
+---------------------------------------------+---------------------------------------------+
|                                             | **5**\                                      |
|                                             | [Prompts as versioned JSON](#part-5)        |
+---------------------------------------------+---------------------------------------------+
|                                             | **Wrap-up**\                                |
|                                             | [What it covers and doesn't](#results)      |
+---------------------------------------------+---------------------------------------------+
| [Part 1: Release 1.0](/writing/2025-07-06-ai-coded-nextjs-agent-release-1/)               |
|                                                                                           |
| [Part 3: Scaling the method](/writing/2025-07-11-scaling-ai-coding-delivery-methodology/) |
|                                                                                           |
| [Code on GitHub](https://github.com/jackzhaojin/shadow-pivot-ai-agentv2/tree/75de1c3)     |
+-------------------------------------------------------------------------------------------+

---

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Fine Print                                                                                                                                                                                                                                                |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| First published as a LinkedIn video on July 7, 2025. Rewritten for this site in October 2026. Code: [shadow-pivot-ai-agentv2](https://github.com/jackzhaojin/shadow-pivot-ai-agentv2/tree/75de1c3) at `75de1c3`, the commit where I added these diagrams. |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

---

## Since July 2025, the public copy is down

The public copy is down. On October 3, 2026, `ai-ui-agent-2025.experiencereinvented.com` returned a 504 error from CloudFront. The repo, both workflows and the [`v1.0.0` release](https://github.com/jackzhaojin/shadow-pivot-ai-agentv2/releases/tag/v1.0.0) are still there, so everything below can be read in the code.

+-------------------+
| Section Metadata  |
+---------+---------+
| id      | changed |
+---------+---------+

---

## 1. Two CI/CD pipelines, picked by the branch name

I invested in CI/CD early, because AI work has to land somewhere real. You need to deploy to the cloud and have people look at it. Have your mom try it. That's hard when everything only works on your laptop, and it's hard for the AI to validate its own code too.

The repo has two GitHub Actions workflows, and the branch you push decides which one runs. A push to `main` builds a Docker image, pushes it to GitHub Container Registry as `:latest`, logs in to Azure and restarts the Azure Web App, which pulls the new image. A push to a `release/` branch builds versioned images and a GitHub release, and restarts nothing.

Pick a branch below to see which workflow runs and where the code ends up. I never choose a pipeline by hand: the branch name does it, and a release branch with a bad version name fails before anything is built.

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Explainer (branch push)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| the push triggers in .github/workflows                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [workflows at 75de1c3](https://github.com/jackzhaojin/shadow-pivot-ai-agentv2/tree/75de1c3/.github/workflows)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Push to this branch                                                                                                                                                                                                                         | ### Build Docker → Push to GHCR → Restart Azure Web App *main\_shadow-pivot-ai-agentv2.yml · on push to main*                                                                                                                                                                                                                                            |
|                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                          |
| *Pick a branch*                                                                                                                                                                                                                             | Runs on every push to main.                                                                                                                                                                                                                                                                                                                              |
|                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                          |
| Where it lands                                                                                                                                                                                                                              | 1. Build the Docker image and push `:latest`                                                                                                                                                                                                                                                                                                             |
|                                                                                                                                                                                                                                             | 2. Log in to Azure with OpenID Connect                                                                                                                                                                                                                                                                                                                   |
| **release/1.0.0** runs the release workflow: it builds `:1.0.0` and `:release-latest`, creates GitHub release `v1.0.0` and restarts nothing. **main** runs the main workflow and restarts the Azure Web App. Any other branch runs neither. | 3. Restart the Web App so it pulls the new image                                                                                                                                                                                                                                                                                                         |
|                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                          |
|                                                                                                                                                                                                                                             | ### Build and Push Release to GHCR *release.yml · on push to release/\**                                                                                                                                                                                                                                                                                 |
|                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                          |
|                                                                                                                                                                                                                                             | Runs on every push to a release/ branch.                                                                                                                                                                                                                                                                                                                 |
|                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                          |
|                                                                                                                                                                                                                                             | 1. Extract the version from the branch name                                                                                                                                                                                                                                                                                                              |
|                                                                                                                                                                                                                                             | 2. Validate it as #.# or #.#.#                                                                                                                                                                                                                                                                                                                           |
|                                                                                                                                                                                                                                             | 3. Build and push `:version` and `:release-latest`                                                                                                                                                                                                                                                                                                       |
|                                                                                                                                                                                                                                             | 4. Create the GitHub release. No Azure restart.                                                                                                                                                                                                                                                                                                          |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| main                                                                                                                                                                                                                                        | Runs on this push.                                                                      | Does not run: the branch does not match "release/\*".                                       | **Lands on the Azure Web App.** The restart makes it pull the new `:latest` image, a couple of minutes after the push.                                           |
|                                                                                                                                                                                                                                             |                                                                                         |                                                                                             |                                                                                                                                                                  |
|                                                                                                                                                                                                                                             | 1. Build the Docker image and push `ghcr.io/jackzhaojin/shadow-pivot-ai-agentv2:latest` |                                                                                             |                                                                                                                                                                  |
|                                                                                                                                                                                                                                             | 2. Log in to Azure with OpenID Connect (`azure/login@v2`), no secret stored             |                                                                                             |                                                                                                                                                                  |
|                                                                                                                                                                                                                                             | 3. `az webapp restart --name shadow-pivot-ai-agentv2 --resource-group ShadowPivot`      |                                                                                             |                                                                                                                                                                  |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **release/1.0.0**                                                                                                                                                                                                                           | Does not run: the filter is exactly "main".                                             | Runs on this push.                                                                          | **Lands in the registry and on GitHub Releases.** Nothing restarts. The EC2 copy picks it up when I run `./deploy-with-azure.sh`, which pulls `:release-latest`. |
|                                                                                                                                                                                                                                             |                                                                                         |                                                                                             |                                                                                                                                                                  |
|                                                                                                                                                                                                                                             |                                                                                         | 1. Extract the version from the branch name: `1.0.0`                                        |                                                                                                                                                                  |
|                                                                                                                                                                                                                                             |                                                                                         | 2. Validate version format                                                                  |                                                                                                                                                                  |
|                                                                                                                                                                                                                                             |                                                                                         | 3. Build and push `ghcr.io/jackzhaojin/shadow-pivot-ai-agentv2:1.0.0` and `:release-latest` |                                                                                                                                                                  |
|                                                                                                                                                                                                                                             |                                                                                         | 4. Create GitHub release `v1.0.0`. No Azure services are restarted.                         |                                                                                                                                                                  |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| release/v1.1                                                                                                                                                                                                                                | Does not run: the filter is exactly "main".                                             | Runs, and stops at the version check.                                                       | **Lands nowhere.** The run fails, so no image and no release.                                                                                                    |
|                                                                                                                                                                                                                                             |                                                                                         |                                                                                             |                                                                                                                                                                  |
|                                                                                                                                                                                                                                             |                                                                                         | 1. Extract the version from the branch name: `v1.1`                                         |                                                                                                                                                                  |
|                                                                                                                                                                                                                                             |                                                                                         | 2. Validate version format *Invalid version format: v1.1*\                                  |                                                                                                                                                                  |
|                                                                                                                                                                                                                                             |                                                                                         |    *Expected format: #.# or #.#.# (e.g., 3.4 or 3.4.1)*                                     |                                                                                                                                                                  |
|                                                                                                                                                                                                                                             |                                                                                         | 3. Build and push the release images                                                        |                                                                                                                                                                  |
|                                                                                                                                                                                                                                             |                                                                                         | 4. Create the GitHub release                                                                |                                                                                                                                                                  |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| a Codex branch                                                                                                                                                                                                                              | Does not run: the filter is exactly "main".                                             | Does not run: the branch does not match "release/\*".                                       | **Lands nowhere.** No workflow runs on this push. Both workflows can still be started by hand from the Actions tab.                                              |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| A simplified model of the two workflows' push triggers and the release workflow's version check, from the files at `75de1c3`. Nothing runs; the steps are what each workflow would do.                                                                                                                                                                                                                                                                                                                                                                                                                 |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

The release workflow takes the version straight from the branch name and refuses anything that isn't `#.#` or `#.#.#`. That's the check the branch figure runs:

+--------------------------------------------------------------------------------------------------------------------------------+
| Code (stack)                                                                                                                   |
+--------------------------------------------------------------------------------------------------------------------------------+
| .github/workflows/release.yml, lines 24 to 40                                                                                  |
|                                                                                                                                |
| [75de1c3 on GitHub](https://github.com/jackzhaojin/shadow-pivot-ai-agentv2/blob/75de1c3/.github/workflows/release.yml#L24-L40) |
+--------------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                            |
|       - name: Extract release version from branch name                                                                         |
|         id: extract_version                                                                                                    |
|         run: \|                                                                                                                |
|           # Extract version from branch name (e.g., release/3.4 -> 3.4, release/3.4.1 -> 3.4.1)                                |
|           VERSION=$(echo ${GITHUB_REF#refs/heads/release/})                                                                    |
|           echo "version=$VERSION" >> $GITHUB_OUTPUT                                                                            |
|           echo "Release version: $VERSION"                                                                                     |
|                                                                                                                                |
|       - name: Validate version format                                                                                          |
|         run: \|                                                                                                                |
|           VERSION="${{ steps.extract_version.outputs.version }}"                                                               |
|           if [[ ! $VERSION =~ ^[0-9]\+\.[0-9]\+(\.[0-9]\+)?$ ]]; then                                                          |
|             echo "❌ Invalid version format: $VERSION"                                                                          |
|             echo "Expected format: #.# or #.#.# (e.g., 3.4 or 3.4.1)"                                                          |
|             exit 1                                                                                                             |
|           fi                                                                                                                   |
|           echo "✅ Valid version format: $VERSION"                                                                              |
| ```                                                                                                                            |
+--------------------------------------------------------------------------------------------------------------------------------+

Release 1.0 went out exactly this way: the `release/1.0.0` branch, merged as pull request #41, produced the `v1.0.0` release on June 17, 2025. One small detail I like in the main workflow: the Docker layer caching came from a GitHub Copilot recommendation, and the comment in the file says so.

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (shot)                                                                                                                                                                                                                                                                                                     |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ![The GitHub Actions run history for Build Docker, Push to GHCR, Restart Azure Web App: 123 workflow runs, the newest for commits such as Update star diagram image for release 1.0 and the Cypress testing plan, each taking between about two and five and a half minutes, with two older failed runs.][image4] |
|                                                                                                                                                                                                                                                                                                                   |
| The main pipeline in June 2025: 123 runs by then, a few minutes each. Every push to main went live this way.                                                                                                                                                                                                      |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-1 |
+---------+--------+

---

## 2. Five actors get into Azure, and the code doesn't care which

For AI to be useful it needs access to real environments, the same as any developer. On this project five different actors reach Azure, and each one gets in its own way:

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board, open)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [![Diagram titled Enabling Agentic AI Agents with Proper Azure Role-Based Access Control. Rows from actor to auth to Azure identity to resource: local user and local GitHub Copilot use az login (passwordless) as a user identity to reach storage and AI Foundry; OpenAI Codex uses tenant, ID and secret as a service principal with a timed secret; GitHub Action uses OIDC (passwordless) as a federated service principal to reach the Azure Web App; the Azure Web App uses a system managed identity (passwordless); EC2 behind CloudFront, release only, uses tenant, ID and secret as a service principal with a timed secret.][image5]](https://content.da.live/jackzhaojin/www-eds/media/writing/2025-07-07-ai-coded-nextjs-agent-cicd-infrastructure/board-auth.png) |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| My map of who gets into Azure, and how. Three of the five are passwordless.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+---------------------------------------------------------------------------------------------------------------------+
| Data Table                                                                                                          |
+--------------------------------+-------------------------------------------------+----------------------------------+
| Actor                          | Credential                                      | Reaches                          |
+--------------------------------+-------------------------------------------------+----------------------------------+
| Me and GitHub Copilot, locally | `az login`, my own user, no password in the app | Storage and AI Foundry           |
+--------------------------------+-------------------------------------------------+----------------------------------+
| OpenAI Codex, in the cloud     | Service principal, tenant and client ID plus a  | Storage and AI Foundry           |
|                                | secret that expires                             |                                  |
+--------------------------------+-------------------------------------------------+----------------------------------+
| GitHub Actions                 | OpenID Connect to a federated service           | The Azure Web App, to restart it |
|                                | principal, no secret                            |                                  |
+--------------------------------+-------------------------------------------------+----------------------------------+
| Azure Web App                  | System managed identity, no secret              | Storage and AI Foundry           |
+--------------------------------+-------------------------------------------------+----------------------------------+
| EC2, release only              | Service principal with a secret that expires    | Storage and AI Foundry           |
+--------------------------------+-------------------------------------------------+----------------------------------+

The app code doesn't care which one it is. Every Azure call goes through `DefaultAzureCredential`, here asking for a token for the AI Foundry endpoint:

+----------------------------------------------------------------------------------------------------------------------+
| Code (stack)                                                                                                         |
+----------------------------------------------------------------------------------------------------------------------+
| lib/daos/aiClient.ts, lines 5 to 17                                                                                  |
|                                                                                                                      |
| [75de1c3 on GitHub](https://github.com/jackzhaojin/shadow-pivot-ai-agentv2/blob/75de1c3/lib/daos/aiClient.ts#L5-L17) |
+----------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                  |
| export function getAIClient() {                                                                                      |
|   const endpoint = process.env.AZURE_OPENAI_ENDPOINT \|\| 'https://story-generation-v1.openai.azure.com/';           |
|   const credential = new DefaultAzureCredential();                                                                   |
|                                                                                                                      |
|   return new AzureOpenAI({                                                                                           |
|     endpoint: endpoint,                                                                                              |
|     apiVersion: '2024-02-01',                                                                                        |
|     azureADTokenProvider: async () => {                                                                              |
|       const token = await credential.getToken('https://cognitiveservices.azure.com/.default');                       |
|       return token?.token \|\| '';                                                                                   |
|     }                                                                                                                |
|   });                                                                                                                |
| }                                                                                                                    |
| ```                                                                                                                  |
+----------------------------------------------------------------------------------------------------------------------+

`DefaultAzureCredential` tries a fixed list of credentials and uses the first one that works. In the version pinned in the app's lockfile, [`@azure/identity` 4.10.0](https://unpkg.com/@azure/identity@4.10.0/dist/commonjs/credentials/defaultAzureCredential.js), the order is environment variables, workload identity, managed identity, Azure CLI, Azure PowerShell and Azure Developer CLI. So Codex and EC2 are picked up at the first step from their `AZURE_CLIENT_ID`, `AZURE_TENANT_ID` and `AZURE_CLIENT_SECRET`, the Web App at managed identity, and my laptop, with no service principal variables set, at the Azure CLI login.

That chain is also where I got stuck. The early tests and scripts called `az` commands, and Codex has no Azure CLI, so they failed there. Commit [`1df352a`](https://github.com/jackzhaojin/shadow-pivot-ai-agentv2/commit/1df352a) moved everything to Node and `DefaultAzureCredential`, and I added a rule for the agents to `AGENTS.md`:

+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| Code (prose, plain, stack)                                                                                                                               |
+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| AGENTS.md, lines 66 to 67                                                                                                                                |
|                                                                                                                                                          |
| [75de1c3 on GitHub](https://github.com/jackzhaojin/shadow-pivot-ai-agentv2/blob/75de1c3/AGENTS.md#L66-L67)                                               |
+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                                                      |
| - when developing test driven development which is always needed, never use az cli commands since it doesn't work on codex, always use node and then De |
| faultAzureCredential, which works for everyone                                                                                                           |
| - All Azure authentication and testing should use DefaultAzureCredential with Service Principal credentials (AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, AZUR |
| E_TENANT_ID)                                                                                                                                             |
| ```                                                                                                                                                      |
+----------------------------------------------------------------------------------------------------------------------------------------------------------+

Setting up each of these, with the role assignments and screenshots, is its own article: [Azure role-based access and CI/CD for AI agents](/writing/2025-06-12-azure-rbac-cicd-for-ai-agents/). The one row that article doesn't have is EC2, which came a week later.

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-2 |
+---------+--------+

---

## 3. A public copy on EC2, behind CloudFront

I wanted the agent to be public-facing, something anyone can try, without handing out Azure accounts and passwords. That's why I built my own app instead of using one of the many agent platforms. CloudFront on AWS gives me the public front door, and I can reverse proxy to whatever I want behind it.

Behind CloudFront is an EC2 instance that only runs release images. The setup is somewhat manual but integrated. The Azure service principal's values sit in AWS Systems Manager Parameter Store, with the client secret stored as an encrypted `SecureString`. A script loads them and restarts the container:

+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Code (prose, stack)                                                                                                                                            |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| deploy-with-azure.sh, from the June 19 session notes, lines 88 to 110                                                                                          |
|                                                                                                                                                                |
| [75de1c3 on GitHub](https://github.com/jackzhaojin/shadow-pivot-ai-agentv2/blob/75de1c3/docs/ai-log/2025-06-19-ec2-azure-credentials-setup/README.md#L88-L110) |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ````                                                                                                                                                           |
| #!/bin/bash                                                                                                                                                    |
|                                                                                                                                                                |
| # Load Azure credentials from Parameter Store                                                                                                                  |
| source ~/get-azure-secrets.sh                                                                                                                                  |
|                                                                                                                                                                |
| # Update container                                                                                                                                             |
| sudo docker stop shadow-pivot-ai 2>/dev/null \|\| true                                                                                                         |
| sudo docker rm shadow-pivot-ai 2>/dev/null \|\| true                                                                                                           |
| docker pull ghcr.io/jackzhaojin/shadow-pivot-ai-agentv2:release-latest                                                                                         |
|                                                                                                                                                                |
| sudo docker run -d \                                                                                                                                           |
|   --name shadow-pivot-ai \                                                                                                                                     |
|   -p 80:3000 \                                                                                                                                                 |
|   --restart unless-stopped \                                                                                                                                   |
|   -e AZURE_CLIENT_ID="$AZURE_CLIENT_ID" \                                                                                                                      |
|   -e AZURE_CLIENT_SECRET="$AZURE_CLIENT_SECRET" \                                                                                                              |
|   -e AZURE_TENANT_ID="$AZURE_TENANT_ID" \                                                                                                                      |
|   -e AZURE_SUBSCRIPTION_ID="$AZURE_SUBSCRIPTION_ID" \                                                                                                          |
|   ghcr.io/jackzhaojin/shadow-pivot-ai-agentv2:release-latest                                                                                                   |
|                                                                                                                                                                |
| echo "🚀 Deployment complete with Azure authentication!"                                                                                                       |
| docker ps \| grep shadow-pivot-ai                                                                                                                              |
| ```                                                                                                                                                            |
| ````                                                                                                                                                           |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------+

The session notes record the choice. Environment variables alone were simple but not secure. OpenID Connect federation between AWS and Azure would be the most secure, with no long-lived secret, but more complex to set up. Parameter Store was the balance, and federation stayed on the list as a future step.

The two copies follow the two pipelines. The Azure Web App always runs `:latest` from `main`. The EC2 copy runs `:release-latest` and only changes when I run the script.

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-3 |
+---------+--------+

---

## 4. How a request moves through routes, services, prompts and the DAO

Here's how a request moves through the app:

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Figure (board, open)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [![Logical architecture diagram. The browser's initial load goes through CloudFront to Next.js server-side rendering. Client flow processing runs in the browser, and its async calls go through CloudFront to a Next.js server box holding the API controller, the AI service, prompting in JSON and the DAO, in that order. The DAO calls Azure AI Foundry, which runs GPT-4o mini. A dashed line goes from the controller to Azure storage.][image6]](https://content.da.live/jackzhaojin/www-eds/media/writing/2025-07-07-ai-coded-nextjs-agent-cicd-infrastructure/board-arch.png) |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| The logical architecture: one Next.js app, server-rendered first, then API calls in layers.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

The first page load goes through CloudFront to Next.js, rendered on the server. After that the agent flow runs in the browser, and each step is an async call back through CloudFront to a Next.js API route. On the server, every call goes through the same four layers. Storage is drawn dashed: the release 1.0 PRD keeps execution data in memory, with Blob Storage planned for release 1.2.

+-------------------------------------------------------------------------------------------------------------+
| Data Table                                                                                                  |
+-------------------------+-------------------------------------------+---------------------------------------+
| Layer on the diagram    | Where it lives                            | What it does                          |
+-------------------------+-------------------------------------------+---------------------------------------+
| Next.js APIs controller | `app/api/agent/*/route.ts`                | Parses the request, calls one         |
|                         |                                           | service, returns JSON                 |
+-------------------------+-------------------------------------------+---------------------------------------+
| AI service              | `lib/services/`                           | The step's logic: generate, evaluate, |
|                         |                                           | select                                |
+-------------------------+-------------------------------------------+---------------------------------------+
| Prompting in JSON       | `prompts/` and `lib/utils/promptUtils.ts` | Loads a versioned template and fills  |
|                         |                                           | it in                                 |
+-------------------------+-------------------------------------------+---------------------------------------+
| DAO                     | `lib/daos/`                               | The only code that talks to Azure     |
+-------------------------+-------------------------------------------+---------------------------------------+

A controller stays small. This is the whole route for the first step:

+-------------------------------------------------------------------------------------------------------------------------------------------------+
| Code (stack)                                                                                                                                    |
+-------------------------------------------------------------------------------------------------------------------------------------------------+
| app/api/agent/generate-design-concepts/route.ts, lines 1 to 14                                                                                  |
|                                                                                                                                                 |
| [75de1c3 on GitHub](https://github.com/jackzhaojin/shadow-pivot-ai-agentv2/blob/75de1c3/app/api/agent/generate-design-concepts/route.ts#L1-L14) |
+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                                             |
| import { NextResponse } from 'next/server';                                                                                                     |
| import { generateDesignConcepts } from '@/lib/services/designConcept';                                                                          |
|                                                                                                                                                 |
| export async function POST(req: Request) {                                                                                                      |
|   try {                                                                                                                                         |
|     const { brief } = await req.json();                                                                                                         |
|     const userGuid = req.headers.get('x-user-guid') \|\| 'anonymous';                                                                           |
|     const concepts = await generateDesignConcepts(brief);                                                                                       |
|     return NextResponse.json({ userGuid, concepts });                                                                                           |
|   } catch (error) {                                                                                                                             |
|     const message = error instanceof Error ? error.message : 'Unknown error';                                                                   |
|     return NextResponse.json({ error: message }, { status: 500 });                                                                              |
|   }                                                                                                                                             |
| }                                                                                                                                               |
| ```                                                                                                                                             |
+-------------------------------------------------------------------------------------------------------------------------------------------------+

The service behind it loads the prompt template, fills it in and calls the model through the DAO:

+-------------------------------------------------------------------------------------------------------------------------------+
| Code (stack)                                                                                                                  |
+-------------------------------------------------------------------------------------------------------------------------------+
| lib/services/designConcept.ts, lines 9 to 21                                                                                  |
|                                                                                                                               |
| [75de1c3 on GitHub](https://github.com/jackzhaojin/shadow-pivot-ai-agentv2/blob/75de1c3/lib/services/designConcept.ts#L9-L21) |
+-------------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                           |
| export async function generateDesignConcepts(brief: string): Promise<string[]> {                                              |
|   // Load the design concept template                                                                                         |
|   const templatePath = path.join('prompts', 'design-concepts', 'v1.json');                                                    |
|   const template = loadPromptTemplate(templatePath);                                                                          |
|                                                                                                                               |
|   // Apply variables to template                                                                                              |
|   const { systemPrompt, userPrompt, temperature } = applyTemplate(template, { brief });                                       |
|                                                                                                                               |
|   // Call the LLM with our structured prompt                                                                                  |
|   const response = await generateChatCompletion([                                                                             |
|     { role: 'system', content: systemPrompt },                                                                                |
|     { role: 'user', content: userPrompt }                                                                                     |
|   ], { temperature: temperature });                                                                                           |
| ```                                                                                                                           |
+-------------------------------------------------------------------------------------------------------------------------------+

One rule in `AGENTS.md` keeps the layers apart: server components and API routes may call Azure SDKs, client components may not. The browser never holds an Azure credential.

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-4 |
+---------+--------+

---

## 5. Prompts kept as versioned JSON files

The prompts this app sends to its own model are files, not strings buried in code. The model steps each have a folder under `prompts/` with numbered versions. A template holds the system prompt, the response format the answer must match, examples, the temperature, and a user prompt with `{{variables}}`:

+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| Code (stack)                                                                                                                                             |
+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| prompts/design-concepts/v1.json, lines 1 to 27                                                                                                           |
|                                                                                                                                                          |
| [75de1c3 on GitHub](https://github.com/jackzhaojin/shadow-pivot-ai-agentv2/blob/75de1c3/prompts/design-concepts/v1.json#L1-L27)                          |
+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| ```                                                                                                                                                      |
| {                                                                                                                                                        |
|   "version": "1.0",                                                                                                                                      |
|   "name": "design-concepts-generation",                                                                                                                  |
|   "systemPrompt": "You are a UI design assistant. Your task is to generate creative, diverse UI design concepts based on a brief. IMPORTANT: You MUST r |
| espond with a valid JSON array containing 3-5 distinct design concepts. Each concept should be a concise description of a unique approach.",             |
|   "responseFormat": {                                                                                                                                    |
|     "type": "array",                                                                                                                                     |
|     "items": {                                                                                                                                           |
|       "type": "string",                                                                                                                                  |
|       "description": "A concise UI design concept description"                                                                                           |
|     },                                                                                                                                                   |
|     "minItems": 3,                                                                                                                                       |
|     "maxItems": 5                                                                                                                                        |
|   },                                                                                                                                                     |
|   "examples": [                                                                                                                                          |
|     {                                                                                                                                                    |
|       "input": "Create a landing page for a fitness app",                                                                                                |
|       "output": [                                                                                                                                        |
|         "Dynamic split-screen layout with workout videos on one side and personalized stats on the other",                                               |
|         "Minimalist design with large typography and subtle animations highlighting key fitness metrics",                                                |
|         "Gamified interface with progress bars, achievement badges, and community challenge leaderboards",                                               |
|         "Nature-inspired color scheme with rounded UI elements and progress arcs showing weekly activity"                                                |
|       ]                                                                                                                                                  |
|     }                                                                                                                                                    |
|   ],                                                                                                                                                     |
|   "temperature": 0.8,                                                                                                                                    |
|   "userPromptTemplate": "Design brief: {{brief}}\n\nGenerate 3-5 distinct UI design concepts based on this brief. Each concept should offer a unique ap |
| proach. Return ONLY a JSON array of strings with no additional text or explanation."                                                                     |
| }                                                                                                                                                        |
| ```                                                                                                                                                      |
+----------------------------------------------------------------------------------------------------------------------------------------------------------+

I think of this as code 3.0, after Andrej Karpathy's talk [Software Is Changing (Again)](https://www.youtube.com/watch?v=LCEmiRjPEtQ), where he calls it Software 3.0. We used to write machine code and then programming languages. Now a lot of what we write is instructions for AI, and those need to be tracked, understood and versioned like any other code. A template can change without touching the business logic, a new version goes next to the old one, and the service validates every answer against the template's format.

It mattered in practice. When the Figma specs in [Part 1](/writing/2025-07-06-ai-coded-nextjs-agent-release-1/#part-5) shrank to about 1 KB, the cause was a template that asked for too little, and the fix was a new `v2.json` next to the old one.

+------------------+
| Section Metadata |
+---------+--------+
| id      | part-5 |
+---------+--------+

---

## What this setup covers, and what it doesn't

It does the job I built it for. Every push to `main` is live on Azure a few minutes later. Releases are versioned images with a GitHub release behind them. Every actor, human or AI, has its own identity, and the agents can test against the real Azure services.

What it doesn't cover:

- No infrastructure as code. That was one of my rules, and every Azure resource was set up by hand from `infrastructure.md`.
- The EC2 deploy is a script I run myself.
- Two long-lived secrets remain: the service principal secrets for Codex and for EC2.
- The Web App pulls from GitHub Container Registry with a personal access token.
- Both copies are offline now.

[Part 3](/writing/2025-07-11-scaling-ai-coding-delivery-methodology/) moves from plumbing to people: how this way of working could scale to a delivery team.

+-------------------+
| Section Metadata  |
+---------+---------+
| id      | results |
+---------+---------+

---

## Related

+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
| Row List                                                                                                                                                  |
+-----------+-------------------------------------------------------------------------------------------------------+---------------------------------------+
| Article   | [Azure role-based access and CI/CD for AI agents](/writing/2025-06-12-azure-rbac-cicd-for-ai-agents/) | Each identity on the map above, set   |
|           |                                                                                                       | up step by step.                      |
+-----------+-------------------------------------------------------------------------------------------------------+---------------------------------------+
| Portfolio | [Shadow Pivot: my first AI-coded app](/portfolio/shadow-pivot/)                                       | The project chapter. This page is its |
|           |                                                                                                       | infrastructure act.                   |
+-----------+-------------------------------------------------------------------------------------------------------+---------------------------------------+

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

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Metadata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| title                   | AI-Coded Next.js Agent, Part 2: CI/CD and Infrastructure \| Jack Jin                                                                                                                                                                                                                                                                                                                                                                                                                 |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| description             | How my AI-coded Next.js agent ships: two GitHub Actions pipelines, five ways into Azure, CloudFront and EC2, the code layers, and prompts as versioned JSON.                                                                                                                                                                                                                                                                                                                         |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| template                | article                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image                   | ![My diagram of five actors reaching Azure: local Copilot, Codex, GitHub Actions, the Azure Web App and EC2 behind CloudFront, each with its own credential][image7]                                                                                                                                                                                                                                                                                                                 |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| image:alt               | My diagram of five actors reaching Azure: local Copilot, Codex, GitHub Actions, the Azure Web App and EC2 behind CloudFront, each with its own credential                                                                                                                                                                                                                                                                                                                            |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| published-time          | 2025-07-07                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| modified-time           | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| json-ld                 | {"@context":"https\://schema.org","@graph":\[{"@type":"Person","@id":"https\://www\.jackzhaojin.com/#person","name":"Jack Jin","url":"https\://www\.jackzhaojin.com/","jobTitle":"Associate Director","worksFor":{"@type":"Organization","name":"Accenture","department":{"@type":"Organization","name":"Adobe Business                                                                                                                                                              |
|                         | Group"}},"sameAs":\["https\://www\.linkedin.com/in/jackjin","https\://github.com/jackzhaojin","https\://www\.youtube.com/@jackjin8467","https\://www\.credly.com/users/jack-jin"],"award":\["Adobe Experience Manager Champion, class of 2026-2027","AEM Rockstar winner, Adobe Summit 2024"]},{"@type":"WebSite","@id":"https\://www\.jackzhaojin.com/#website","url":"https\://www\.jackzhaojin.com/","name":"Jack                                                                 |
|                         | Jin","publisher":{"@id":"https\://www\.jackzhaojin.com/#person"}},{"@type":"TechArticle","@id":"https\://www\.jackzhaojin.com/writing/2025-07-07-ai-coded-nextjs-agent-cicd-infrastructure/#article","headline":"A 100% AI-Coded Next.js Agent, Part 2: CI/CD, Cloud Identities and the Architecture","description":"How my AI-coded Next.js agent ships: two GitHub Actions pipelines, five ways into Azure, CloudFront and EC2, the code layers, and prompts as versioned          |
|                         | JSON.","author":{"@id":"https\://www\.jackzhaojin.com/#person"},"publisher":{"@id":"https\://www\.jackzhaojin.com/#person"},"image":"https\://www\.jackzhaojin.com/writing/2025-07-07-ai-coded-nextjs-agent-cicd-infrastructure/media\_16c27a122ddc3c82e4780e7866946b68b29ff616f.jpg","mainEntityOfPage":"https\://www\.jackzhaojin.com/writing/2025-07-07-ai-coded-nextjs-agent-cicd-infrastructure/","isPartOf":{"@id":"https\://www\.jackzhaojin.com/#website"},"about":\["GitHub |
|                         | Actions","GitHub Container Registry","Azure App Service","DefaultAzureCredential","OpenID Connect","Amazon CloudFront","Amazon EC2","Next.js","Prompt                                                                                                                                                                                                                                                                                                                                |
|                         | templates"],"datePublished":"2025-07-07","dateModified":"2026-10-04","inLanguage":"en"},{"@type":"BreadcrumbList","@id":"https\://www\.jackzhaojin.com/writing/2025-07-07-ai-coded-nextjs-agent-cicd-infrastructure/#breadcrumb","itemListElement":\[{"@type":"ListItem","position":1,"name":"Home","item":"https\://www\.jackzhaojin.com/"},{"@type":"ListItem","position":2,"name":"Technical                                                                                      |
|                         | Writing","item":"https\://www\.jackzhaojin.com/writing/"},{"@type":"ListItem","position":3,"name":"AI-Coded Next.js Agent, Part 2","item":"https\://www\.jackzhaojin.com/writing/2025-07-07-ai-coded-nextjs-agent-cicd-infrastructure/"}]}]}                                                                                                                                                                                                                                         |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| og:image:alt            | My diagram of five actors reaching Azure: local Copilot, Codex, GitHub Actions, the Azure Web App and EC2 behind CloudFront, each with its own credential                                                                                                                                                                                                                                                                                                                            |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:published\_time | 2025-07-07                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:modified\_time  | 2026-10-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| article:author          | https\://www\.jackzhaojin.com/                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-summary         | How an app written entirely by AI gets from a commit to the cloud: two GitHub Actions pipelines picked by branch name, five actors that each get into Azure their own way, a public copy on CloudFront and EC2, a layered Next.js architecture, and prompts kept as versioned JSON.                                                                                                                                                                                                  |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-image           | https\://www\.jackzhaojin.com/writing/media\_16c27a122ddc3c82e4780e7866946b68b29ff616f.jpg?width=750\&format=jpg\&optimize=medium                                                                                                                                                                                                                                                                                                                                                    |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-topics          | AI Engineering                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-reading-time    | 8 min read                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| listing-keywords        | github actions github container registry docker azure app service openid connect defaultazurecredential @azure/identity service principal managed identity amazon cloudfront amazon ec2 aws systems manager parameter store next.js app router prompt templates handlebars                                                                                                                                                                                                           |
+-------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_10c4db685097b9a02d2411cdfa3ac53bccf5aaf17.png#width=144&height=92

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_12af0230e4702f77327f4b580ed01f44141716807.png#width=144&height=92

[image2]: https://main--www-eds--jackzhaojin.aem.page/media_1ad64f98f305b171cdcd6d1046ba7810c232dab82.png#width=144&height=92

[image3]: https://main--www-eds--jackzhaojin.aem.page/media_1915e200edece03d126dad36feb95e7933c5074ec.png#width=144&height=92

[image4]: https://main--www-eds--jackzhaojin.aem.page/media_1b6bd9aecce71b31b34375f74fb5c184cb5c3b49a.png#width=1302&height=1076

[image5]: https://main--www-eds--jackzhaojin.aem.page/media_16546a0e516b3396282163e86fc8aab19dc94db92.png#width=1360&height=830

[image6]: https://main--www-eds--jackzhaojin.aem.page/media_1580dd25d1ce65cde108b28bbeba22f04908d3ab6.png#width=1600&height=607

[image7]: https://main--www-eds--jackzhaojin.aem.page/media_16c27a122ddc3c82e4780e7866946b68b29ff616f.jpg#width=1280&height=720
