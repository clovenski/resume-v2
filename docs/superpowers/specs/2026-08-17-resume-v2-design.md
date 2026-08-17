# resume-v2 — Design Spec

Date: 2026-08-17
Status: Approved for planning

## Overview

Rebuild Joel Tengco's resume site (currently an Angular app at `clovenski.github.io/resume`) as a modern React + TypeScript site, deployed to GitHub Pages at `clovenski.github.io/resume-v2`. Three pages: Home, Projects (including a playable recreation of the "Isolation AI" game), and a placeholder Hobbies page.

## Goals

- Modern, polished visual design — not a re-skin of the old Bootstrap/Angular-Material look.
- Content sourced from the current resume PDF (`Joel_Tengco_-_Senior_Software_Engineer_2026.07.27.pdf`) for Home, and from the live `clovenski.github.io/resume/projects` page for Projects (verbatim content, already extracted below).
- Fully playable Isolation AI game, calling the existing AWS Lambda backend.
- Static site, deployable via GitHub Actions to GitHub Pages, no server component of our own.
- Hobbies page exists and is linked in nav, but intentionally left blank/placeholder.

## Non-goals

- No CMS or dynamic content editing.
- No reimplementation of the Isolation AI's minimax backend (kept as-is on AWS Lambda per decision below).
- No changes to the old Angular resume site or its repo.
- No custom domain — the `github.io/resume-v2` URL is the target.

## Tech Stack

- **Build tool**: Vite
- **Framework**: React 18 + TypeScript
- **Routing**: React Router (`BrowserRouter`), routes: `/`, `/projects`, `/hobbies`
- **Styling**: Tailwind CSS, with light/dark mode (`class` strategy, respecting `prefers-color-scheme` by default, no manual toggle required for v1)
- **Deployment**: GitHub Actions workflow → `actions/upload-pages-artifact` + `actions/deploy-pages`, triggered on push to `main`
- **Package manager**: npm

## Project Structure

```
resume-v2/
  public/
    assets/            # avatar.jpg, black_queen.png, white_queen.png, gifs, screenshots
    404.html           # SPA redirect trick for GitHub Pages deep links
  src/
    main.tsx
    App.tsx             # router + layout
    components/
      Layout.tsx         # header nav + footer, shared across pages
      isolation-ai/
        IsolationBoard.tsx
        MoveHistory.tsx
        isolationGame.ts   # board model, legal-move resolution, move application (ported from Angular services)
        isolationApi.ts    # Lambda call + board-state encoding
    pages/
      Home.tsx
      Projects.tsx
      Hobbies.tsx
    data/
      resume.ts          # structured resume content (summary, employment, education, skills, recognition, links)
      projects.ts         # structured project content
  .github/workflows/deploy.yml
  vite.config.ts          # base: '/resume-v2/'
  tailwind.config.ts
  index.html
```

## Page Content

### Home (`/`)

Source of truth: resume PDF (2026-07-27), with the Recognition section kept from the old site per approved decision (AWS certification dropped — not in current resume).

**Header**: avatar (`assets/avatar.jpg`), "Joel Tengco", "Senior Software Engineer", location "Los Angeles, United States", email `joeltengco3510@gmail.com`.

**Links**: LinkedIn (`https://www.linkedin.com/in/joel-tengco-a1710218a/`), GitHub (`https://github.com/clovenski`), VTuber Schedules (`https://vtuberschedules.com/`).

**Professional Summary**:
> Software engineer with a passion towards devops and infrastructure engineering. Learns, adapts, and delivers code at a high velocity. High quality code design, documentation, and testing are my pillars in software engineering.

**Employment History** (verbatim from PDF):

1. **Senior Software Engineer — Intuit, Los Angeles, CA** (Aug 2024 — Jul 2026)
   - Developed the core backend service behind funds distribution within Intuit's Turbo Tax 5 Days Early program; major contribution being developing a platform that we used for consuming webhooks from our third-party vendor.
   - Developed core backend components of a throttling and prioritization platform that optimized ACH and RTP payment processing by prioritizing time-sensitive ACH transfers while enforcing third-party API rate limits at scale; enabling the delivery of $13.2B in tax refunds to 4.4M customers during tax year 2025.
   - Leveraged Claude, Cursor, Augment, and custom Claude skills/commands to automate development workflows, accelerate implementation, and reduce engineering toil.

2. **Software Engineer II — Intuit, Los Angeles** (May 2022 — Aug 2024)
   - Contributed to launching the service that provides the capability for Intuit's QuickBooks users to buy, sell, and hold cryptocurrencies.
   - Served as Operational Excellence Champion across three engineering teams, driving initiatives focused on code coverage, disaster recovery readiness, and security.
   - Spearheaded backend development for a generative AI initiative enabling QuickBooks customers to take action directly from customer email interactions.
   - Developed a proof of concept leveraging generative AI to assist engineers in resolving support channel inquiries and improving developer productivity.

3. **Software Engineer — Orange Logic, Irvine** (Sept 2019 — May 2022)
   - Provide organizations a digital asset management web application completely suited to their needs and custom workflows.
   - Developed a proprietary monitoring solution to eliminate the toil around producing debug analysis files of the app.
   - Developed a background cron job that maintains consistency in a graph-structured database table that contains over 50M records.

**Education**:
- Computer Science, B.S., California Polytechnic State University, Pomona (Sept 2017 — May 2019) — magna cum laude, 3.73 GPA; 2017-18 & 2018-19 President's Honor List
- Mathematics for Transfer, Cerritos College (Aug 2014 — Jun 2017) — Spring 2016 President's Honors List; Graduation with Highest Honors

**Skills** (verbatim list from PDF): Java, TypeScript, Python, Kotlin, C#, Scala, PostgreSQL, SQL Server, Docker, Jenkins, TeamCity, Kafka, Apache Pulsar, AWS, CloudFormation, Angular, Claude, Gatling, PagerDuty, Splunk

**Recognition** (kept from old site, not contradicted by PDF):
- President's Honor List — Cal Poly Pomona, 2018-2019 (Fall & Spring semesters, ≥12 units, GPA ≥3.5 each semester)
- President's Honor List — Cal Poly Pomona, 2017-2018 (Fall, Winter & Spring quarters, ≥12 units, GPA ≥3.5 each quarter)
- Graduation with Highest Honors — Cerritos College, 2017 (cumulative GPA over 3.7)
- President's Honors List — Cerritos College, Spring 2016 (≥12 units, 4.0 GPA)

### Projects (`/projects`)

Verbatim content extracted from the live old site, five project cards in this order:

1. **VTuber Schedules** — link `https://vtuberschedules.com/` — "Since 2023"
   Learning outcomes: Full stack engineering; AWS - CloudFormation, CloudFront, Cloud Development Kit, Lambda, DynamoDB, Route53; Angular
   Description: "Improved and generalized version of Nijisanji EN schedules; hosting schedules for VTubers of multiple platforms and agencies."

2. **Nijisanji EN Schedules** — link `https://nijisanji-en-schedules.com/` — "2022"
   Learning outcomes: Full stack engineering; AWS - API Gateway, Lambda, DynamoDB, Route53; Angular
   Description: "Single page to quickly view Nijisanji EN stream schedules."

3. **Isolation AI** — no external link, embeds the playable game (see below) — "2019 - AI class, written original engine in C++" / "2021 - Angular front-end, ported engine to C# and hosted it on AWS"
   Learning outcomes: Minimax algorithm with alpha-beta pruning; Angular front-end (→ React front-end in this rebuild); Amazon API Gateway + AWS Lambda
   Intro copy: "On a chess board, two queen pieces move around and occupy spaces on the board. The spaces they occupy cannot be occupied again. The goal of the game is to isolate your opponent so they don't have any legal moves on their next turn."

4. **Deterministic Turing Machine Simulator** — link `https://github.com/clovenski/dtm-simulator` — "2019"
   Learning outcomes: Python Tkinter
   Media: `assets/dtm_sim_1.gif`, `assets/dtm_sim_2.jpg`, `assets/dtm_sim_3.jpg`, `assets/dtm_sim_4.jpg`

5. **Circuit Simulator** — link `https://github.com/clovenski/circuit-simulator` — "2018"
   Learning outcomes: Object-oriented Programming; Topological ordering graph algorithm; Terminal-driven application
   Media: `assets/circuit_sim_1.gif`

Footer line: "You can check more projects showcased on my [GitHub](https://github.com/clovenski)"

### Hobbies (`/hobbies`)

Nav-linked, reachable page. Content: an intentionally minimal placeholder (e.g. centered "Coming soon" message). No further structure — Joel will fill this in later.

## Isolation AI Game

Ported from the Angular implementation at `resume/.worktrees/angular-upgrade/src/app/isolation-ai/**` and `src/app/services/isolation-ai/**`.

**Board model**: 8x8 grid, 1-indexed coordinates (x,y) internally. Player starts at (1,8) top-left, computer starts at (8,1) bottom-right — i.e. opposite corners, matching original `board-initializer.service.ts`. Each space tracks `wasUsed` (permanently blocked once vacated) and `isLegalMove` (recomputed after every move).

**Movement rule**: queen-style — 8 directions (`OFFSETS` in `board-moves-resolver.service.ts`), sliding until board edge, a used space, or an occupied space (exclusive) blocks further movement in that direction. Ported 1:1 into `isolationGame.ts`.

**Turn flow** (from `isolation-ai.component.ts`):
1. Player selects a destination among legal moves → space marked used, player moves, legal moves recomputed.
2. If computer has no legal moves → "Player won!", game ends.
3. Otherwise status → "Computer is thinking...", call Lambda for computer's move.
4. Computer moves, legal moves recomputed.
5. If player has no legal moves → "Computer won!", game ends.
6. Otherwise status → "Please make a move.", back to step 1.

**Interaction model**: click-to-select-then-click-to-move (replacing the Angular version's HTML5/CDK drag-and-drop) — click the player's queen (only enabled when awaiting player move), legal destination squares highlight, click a highlighted square to move there. More touch-friendly than drag-and-drop.

**Computer AI (backend)**: kept as the existing AWS Lambda, per approved decision. Request contract (from `computer-ai-gateway.service.ts`):
- `POST https://mwlqaxo302.execute-api.us-west-1.amazonaws.com/prod/computermove`
- Body: `{ BoardState: string, PlayerPos: number, CompPos: number, Difficulty: number }`
  - `BoardState`: 64-bit binary string (MSB-first, row y=7 downto 0, col x=0..7) with `1` for used/occupied spaces, `0` for free, converted to a decimal string via `BigInt` (avoids float precision loss)
  - `PlayerPos` / `CompPos`: hex-encoded two-digit coordinates, e.g. x=1,y=8 → `0x18` → `24`
  - `Difficulty`: `1` (only difficulty used in the original; no difficulty selector in v1)
- Response: `{ NextMove: number }`, a byte whose hex digits are the 1-indexed (x,y) target coordinates.
- **CORS note**: the Lambda currently allows the origin `https://clovenski.github.io` (same registrable origin as the new site, different path). Expected to work without changes since GitHub Pages project sites share the account's root origin; flagged as a post-deploy verification item, not a blocker.

**Visuals**: reuse `assets/white_queen.png` (player) and `assets/black_queen.png` (computer) on an 8x8 grid, tan/cream checkerboard (colors carried over: `#bd9b7c` / `#f3dfbf`, may be refined during implementation for the new design system), a small dot on legal-move squares, a two-column move history table (Player moves / Computer moves), and a status line.

## Styling / Design System

- Tailwind CSS with a refined, neutral palette (exact tokens to be chosen during implementation — not prescribed here beyond: professional, not primary-colors-heavy like the old blue navbar).
- Light/dark mode via `prefers-color-scheme`, using Tailwind's `dark:` variants.
- Consistent card/section treatment across Home and Projects (subtle borders/shadows, generous spacing, readable type scale).
- Responsive: usable down to mobile widths, including the game board (board scales, history table becomes scrollable/collapsible if needed).

## Assets

Copied from `resume/.worktrees/angular-upgrade/src/assets/` into `resume-v2/public/assets/`:
`avatar.jpg`, `black_queen.png`, `white_queen.png`, `circuit_sim_1.gif`, `dtm_sim_1.gif`, `dtm_sim_2.jpg`, `dtm_sim_3.jpg`, `dtm_sim_4.jpg`.

## Routing & Deployment

- `vite.config.ts`: `base: '/resume-v2/'`
- React Router `BrowserRouter` with routes `/`, `/projects`, `/hobbies`; nav links to all three plus external LinkedIn/GitHub buttons.
- `public/404.html`: standard GitHub Pages SPA-redirect trick (encodes the requested path into a query string redirect to `index.html`) so deep-linked/refreshed routes (e.g. `/resume-v2/projects`) don't 404.
- `.github/workflows/deploy.yml`: on push to `main` — checkout, setup Node, `npm ci`, `npm run build`, upload `dist/` as Pages artifact, deploy via `actions/deploy-pages`.
- Creating the actual `resume-v2` GitHub repo, pushing the initial commit, and enabling GitHub Pages in repo settings are explicit, confirmed actions — not automated silently. These happen after implementation is complete and reviewed locally.

## Risks / Open Items

- Lambda CORS behavior from the new path — verify post-deploy; if blocked, will need to update the Lambda's allowed origins (out of scope for this repo, flagged for Joel to action on the AWS side if needed).
- Old site's exact color palette/typography is not being carried over verbatim (explicitly a "modern redesign," not a re-skin) — final look is an implementation-time decision within the constraints above.
