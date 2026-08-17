# resume-v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the resume-v2 React site (Home, Projects with a playable Isolation AI game, and a placeholder Hobbies page) ready to deploy to GitHub Pages at `clovenski.github.io/resume-v2`.

**Architecture:** A Vite + React 18 + TypeScript single-page app with three routes (React Router), styled with Tailwind CSS. Content is data-driven (plain TS objects) rendered by page components. The Isolation AI game is a self-contained module (pure board-logic functions + a Lambda-calling API module + presentational components) wired into the Projects page.

**Tech Stack:** Vite, React 18, TypeScript, React Router 6, Tailwind CSS 3, Vitest + React Testing Library, npm.

**Spec:** `docs/superpowers/specs/2026-08-17-resume-v2-design.md`

## Global Constraints

- Deployed to GitHub Pages at `clovenski.github.io/resume-v2` → Vite `base: '/resume-v2/'`, React Router `basename="/resume-v2"`.
- No backend of our own. The Isolation AI computer move calls the existing AWS Lambda at `https://mwlqaxo302.execute-api.us-west-1.amazonaws.com/prod/computermove` (approved decision — not reimplemented client-side).
- Styling is Tailwind CSS only, with light/dark mode via `prefers-color-scheme` (Tailwind's default `media` strategy).
- Navigation is multi-page via React Router: routes `/`, `/projects`, `/hobbies`.
- Isolation AI move interaction is click-to-select-then-click-to-move, not drag-and-drop.
- Home page content is sourced from the resume PDF (`Joel_Tengco_-_Senior_Software_Engineer_2026.07.27.pdf`) for the summary/employment/education/skills; the Recognition section is kept from the old site; the AWS certification is dropped (not in the current resume).
- Projects page content is verbatim from `clovenski.github.io/resume/projects`.
- Hobbies page is an intentional placeholder ("Coming soon"), no further content — Joel will fill it in later.
- Package manager: npm.

---

### Task 1: Project scaffold (Vite + React + TypeScript + Tailwind)

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/index.css`
- Create: `.gitignore`

**Interfaces:**
- Produces: a buildable Vite project (`npm run build` → `dist/`) with Tailwind utility classes working, and `App` as the default export of `src/App.tsx` mounted by `src/main.tsx`. Later tasks replace `App.tsx`'s content but keep it as the root component rendered into `#root`.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "resume-v2",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "typescript": "^5.6.3",
    "vite": "^5.4.10"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Create `vite.config.ts`**

```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/resume-v2/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
  },
})
```

- [ ] **Step 4: Create `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
```

- [ ] **Step 5: Create `postcss.config.js`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 6: Create `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Joel Tengco — Senior Software Engineer</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 7: Create `src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 8: Create `src/App.tsx`**

```tsx
function App() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl font-semibold">resume-v2</h1>
    </div>
  )
}

export default App
```

- [ ] **Step 9: Create `src/main.tsx`**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 10: Create `.gitignore`**

```
node_modules
dist
.DS_Store
*.local
```

- [ ] **Step 11: Install dependencies**

Run: `npm install`
Expected: exits 0, creates `node_modules/` and `package-lock.json`.

- [ ] **Step 12: Verify the project builds**

Run: `npm run build`
Expected: exits 0, creates `dist/index.html` and `dist/assets/*.css` containing compiled Tailwind utility classes.

- [ ] **Step 13: Commit**

```bash
git add package.json package-lock.json tsconfig.json vite.config.ts tailwind.config.ts postcss.config.js index.html src/index.css src/App.tsx src/main.tsx .gitignore
git commit -m "Scaffold Vite + React + TypeScript + Tailwind project"
```

---

### Task 2: Test tooling, routing shell, layout, and asset copy

**Files:**
- Modify: `package.json` (add `react-router-dom` dependency; add test devDependencies)
- Modify: `tsconfig.json` (add `types` for Vitest/RTL globals)
- Create: `src/setupTests.ts`
- Modify: `src/App.tsx`
- Create: `src/components/Layout.tsx`
- Create: `src/pages/Home.tsx`
- Create: `src/pages/Projects.tsx`
- Create: `src/pages/Hobbies.tsx`
- Create: `src/App.test.tsx`
- Create: `public/assets/` (copied image/gif files)

**Interfaces:**
- Consumes: `App` default export from Task 1 (`src/App.tsx`, replaced here).
- Produces: `Layout` default export (`src/components/Layout.tsx`) rendering a header nav (`Home`, `Projects`, `Hobbies` internal links; `LinkedIn`, `GitHub` external links) + `<Outlet />` + footer. `Home`, `Projects`, `Hobbies` default exports from `src/pages/*.tsx` (stubs here, filled in by Tasks 3, 4, 7). Routes mounted at `/`, `/projects`, `/hobbies` under `basename="/resume-v2"`.

- [ ] **Step 1: Install test tooling and React Router**

Run: `npm install react-router-dom`
Run: `npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event`
Expected: both exit 0, `package.json` updated.

- [ ] **Step 2: Add Vitest/RTL types to `tsconfig.json`**

Update the `compilerOptions` block to add a `types` entry:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Create `src/setupTests.ts`**

```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 4: Write the failing test — `src/App.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App routing', () => {
  it('renders nav links to Home, Projects and Hobbies at the root route', () => {
    window.history.pushState({}, '', '/resume-v2/')
    render(<App />)

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Hobbies' })).toBeInTheDocument()
  })

  it('renders the Hobbies placeholder at /hobbies', () => {
    window.history.pushState({}, '', '/resume-v2/hobbies')
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Hobbies' })).toBeInTheDocument()
    expect(screen.getByText('Coming soon.')).toBeInTheDocument()
  })
})
```

- [ ] **Step 5: Run the test to verify it fails**

Run: `npm run test`
Expected: FAIL — `App.tsx` still renders the Task 1 placeholder, no nav links exist yet.

- [ ] **Step 6: Create `src/components/Layout.tsx`**

```tsx
import { NavLink, Outlet } from 'react-router-dom'

function navLinkClasses({ isActive }: { isActive: boolean }): string {
  return `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive
      ? 'text-slate-900 dark:text-white'
      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
  }`
}

const externalLinkClasses =
  'px-3 py-2 rounded-md text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-200 dark:border-slate-800">
        <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <div className="flex gap-1">
            <NavLink to="/" end className={navLinkClasses}>
              Home
            </NavLink>
            <NavLink to="/projects" className={navLinkClasses}>
              Projects
            </NavLink>
            <NavLink to="/hobbies" className={navLinkClasses}>
              Hobbies
            </NavLink>
          </div>
          <div className="flex gap-1">
            <a
              href="https://www.linkedin.com/in/joel-tengco-a1710218a/"
              target="_blank"
              rel="noreferrer"
              className={externalLinkClasses}
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/clovenski"
              target="_blank"
              rel="noreferrer"
              className={externalLinkClasses}
            >
              GitHub
            </a>
          </div>
        </nav>
      </header>
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        Joel Tengco
      </footer>
    </div>
  )
}
```

- [ ] **Step 7: Create stub pages**

`src/pages/Home.tsx`:

```tsx
export default function Home() {
  return <div>Home</div>
}
```

`src/pages/Projects.tsx`:

```tsx
export default function Projects() {
  return <div>Projects</div>
}
```

`src/pages/Hobbies.tsx` (final content — this page is done after this task):

```tsx
export default function Hobbies() {
  return (
    <div className="flex flex-col items-center gap-2 py-24 text-center">
      <h1 className="text-2xl font-semibold">Hobbies</h1>
      <p className="text-slate-500 dark:text-slate-400">Coming soon.</p>
    </div>
  )
}
```

- [ ] **Step 8: Update `src/App.tsx` to mount the router**

```tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Hobbies from './pages/Hobbies'
import Projects from './pages/Projects'

function App() {
  return (
    <BrowserRouter basename="/resume-v2">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="hobbies" element={<Hobbies />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

- [ ] **Step 9: Run the test to verify it passes**

Run: `npm run test`
Expected: PASS (2 tests).

- [ ] **Step 10: Copy image assets into `public/assets/`**

Run:
```bash
mkdir -p public/assets
cp "C:/Users/Joel/source/repos/resume/.worktrees/angular-upgrade/src/assets/avatar.jpg" public/assets/
cp "C:/Users/Joel/source/repos/resume/.worktrees/angular-upgrade/src/assets/black_queen.png" public/assets/
cp "C:/Users/Joel/source/repos/resume/.worktrees/angular-upgrade/src/assets/white_queen.png" public/assets/
cp "C:/Users/Joel/source/repos/resume/.worktrees/angular-upgrade/src/assets/circuit_sim_1.gif" public/assets/
cp "C:/Users/Joel/source/repos/resume/.worktrees/angular-upgrade/src/assets/dtm_sim_1.gif" public/assets/
cp "C:/Users/Joel/source/repos/resume/.worktrees/angular-upgrade/src/assets/dtm_sim_2.jpg" public/assets/
cp "C:/Users/Joel/source/repos/resume/.worktrees/angular-upgrade/src/assets/dtm_sim_3.jpg" public/assets/
cp "C:/Users/Joel/source/repos/resume/.worktrees/angular-upgrade/src/assets/dtm_sim_4.jpg" public/assets/
```
Expected: 8 files present in `public/assets/`.

- [ ] **Step 11: Verify the project still builds**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 12: Commit**

```bash
git add package.json package-lock.json tsconfig.json src/setupTests.ts src/App.tsx src/App.test.tsx src/components/Layout.tsx src/pages public/assets
git commit -m "Add routing shell, layout nav, Hobbies placeholder, and copy assets"
```

---

### Task 3: Resume data and Home page

**Files:**
- Create: `src/lib/asset.ts`
- Create: `src/data/resume.ts`
- Modify: `src/pages/Home.tsx`
- Create: `src/pages/Home.test.tsx`

**Interfaces:**
- Produces: `asset(path: string): string` (`src/lib/asset.ts`) — prefixes a `public/`-relative path with the Vite base URL; reused by Tasks 4 and 7 for image sources. `profile`, `links`, `employment`, `education`, `skills`, `recognition` named exports from `src/data/resume.ts`, with `EmploymentEntry`, `EducationEntry`, `RecognitionEntry` types.

- [ ] **Step 1: Create `src/lib/asset.ts`**

```ts
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
```

- [ ] **Step 2: Create `src/data/resume.ts`**

```ts
export interface EmploymentEntry {
  title: string
  company: string
  location: string
  period: string
  bullets: string[]
}

export interface EducationEntry {
  degree: string
  school: string
  period: string
  details: string[]
}

export interface RecognitionEntry {
  title: string
  org: string
  period: string
  description: string
}

export const profile = {
  name: 'Joel Tengco',
  title: 'Senior Software Engineer',
  location: 'Los Angeles, United States',
  email: 'joeltengco3510@gmail.com',
  summary:
    'Software engineer with a passion towards devops and infrastructure engineering. Learns, adapts, and delivers code at a high velocity. High quality code design, documentation, and testing are my pillars in software engineering.',
}

export const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/joel-tengco-a1710218a/' },
  { label: 'GitHub', href: 'https://github.com/clovenski' },
  { label: 'VTuber Schedules', href: 'https://vtuberschedules.com/' },
]

export const employment: EmploymentEntry[] = [
  {
    title: 'Senior Software Engineer',
    company: 'Intuit',
    location: 'Los Angeles, CA',
    period: 'Aug 2024 — Jul 2026',
    bullets: [
      "Developed the core backend service behind funds distribution within Intuit's Turbo Tax 5 Days Early program; major contribution being developing a platform that we used for consuming webhooks from our third-party vendor.",
      'Developed core backend components of a throttling and prioritization platform that optimized ACH and RTP payment processing by prioritizing time-sensitive ACH transfers while enforcing third-party API rate limits at scale; enabling the delivery of $13.2B in tax refunds to 4.4M customers during tax year 2025.',
      'Leveraged Claude, Cursor, Augment, and custom Claude skills/commands to automate development workflows, accelerate implementation, and reduce engineering toil.',
    ],
  },
  {
    title: 'Software Engineer II',
    company: 'Intuit',
    location: 'Los Angeles',
    period: 'May 2022 — Aug 2024',
    bullets: [
      "Contributed to launching the service that provides the capability for Intuit's QuickBooks users to buy, sell, and hold cryptocurrencies.",
      'Served as Operational Excellence Champion across three engineering teams, driving initiatives focused on code coverage, disaster recovery readiness, and security.',
      'Spearheaded backend development for a generative AI initiative enabling QuickBooks customers to take action directly from customer email interactions.',
      'Developed a proof of concept leveraging generative AI to assist engineers in resolving support channel inquiries and improving developer productivity.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Orange Logic',
    location: 'Irvine',
    period: 'Sept 2019 — May 2022',
    bullets: [
      'Provide organizations a digital asset management web application completely suited to their needs and custom workflows.',
      'Developed a proprietary monitoring solution to eliminate the toil around producing debug analysis files of the app.',
      'Developed a background cron job that maintains consistency in a graph-structured database table that contains over 50M records.',
    ],
  },
]

export const education: EducationEntry[] = [
  {
    degree: 'Computer Science, B.S.',
    school: 'California Polytechnic State University, Pomona',
    period: 'Sept 2017 — May 2019',
    details: ['magna cum laude, 3.73 GPA', "2017-18, 2018-19 President's Honor List"],
  },
  {
    degree: 'Mathematics for Transfer',
    school: 'Cerritos College',
    period: 'Aug 2014 — Jun 2017',
    details: ["Spring 2016 President's Honors List", 'Graduation with Highest Honors'],
  },
]

export const skills = [
  'Java',
  'TypeScript',
  'Python',
  'Kotlin',
  'C#',
  'Scala',
  'PostgreSQL',
  'SQL Server',
  'Docker',
  'Jenkins',
  'TeamCity',
  'Kafka',
  'Apache Pulsar',
  'AWS',
  'CloudFormation',
  'Angular',
  'Claude',
  'Gatling',
  'PagerDuty',
  'Splunk',
]

export const recognition: RecognitionEntry[] = [
  {
    title: "President's Honor List",
    org: 'California Polytechnic State University, Pomona',
    period: '2018 - 2019',
    description:
      'For the Fall and Spring semesters, I took at least 12 units and maintained a GPA of 3.5 or higher in each semester.',
  },
  {
    title: "President's Honor List",
    org: 'California Polytechnic State University, Pomona',
    period: '2017 - 2018',
    description:
      'For the Fall, Winter and Spring quarters, I took at least 12 units and maintained a GPA of 3.5 or higher in each quarter.',
  },
  {
    title: 'Graduation with Highest Honors',
    org: 'Cerritos College',
    period: '2017',
    description: 'I graduated with an undergraduate cumulative GPA of over 3.7.',
  },
  {
    title: "President's Honors List",
    org: 'Cerritos College',
    period: 'Spring 2016',
    description: 'I took at least 12 units in Spring 2016 and ended with a 4.0 GPA.',
  },
]
```

- [ ] **Step 3: Write the failing test — `src/pages/Home.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Home from './Home'

describe('Home page', () => {
  it('renders the profile header and professional summary', () => {
    render(<Home />)

    expect(screen.getByRole('heading', { name: 'Joel Tengco' })).toBeInTheDocument()
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument()
    expect(screen.getByText(/Software engineer with a passion towards devops/)).toBeInTheDocument()
  })

  it('renders all three employment history entries', () => {
    render(<Home />)

    expect(screen.getByText(/Senior Software Engineer — Intuit, Los Angeles, CA/)).toBeInTheDocument()
    expect(screen.getByText(/Software Engineer II — Intuit, Los Angeles/)).toBeInTheDocument()
    expect(screen.getByText(/Software Engineer — Orange Logic, Irvine/)).toBeInTheDocument()
  })

  it('renders the skills list', () => {
    render(<Home />)

    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('CloudFormation')).toBeInTheDocument()
  })

  it('renders the recognition section', () => {
    render(<Home />)

    expect(screen.getAllByText("President's Honor List").length).toBeGreaterThan(0)
    expect(screen.getByText('Graduation with Highest Honors')).toBeInTheDocument()
  })
})
```

- [ ] **Step 4: Run the test to verify it fails**

Run: `npm run test`
Expected: FAIL — `Home.tsx` still renders the Task 2 stub (`<div>Home</div>`).

- [ ] **Step 5: Implement `src/pages/Home.tsx`**

```tsx
import { asset } from '../lib/asset'
import { education, employment, links, profile, recognition, skills } from '../data/resume'

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col items-center gap-3 text-center">
        <img
          src={asset('assets/avatar.jpg')}
          alt={profile.name}
          className="h-28 w-28 rounded-full object-cover shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{profile.name}</h1>
          <p className="text-slate-500 dark:text-slate-400">{profile.title}</p>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {profile.location} • {profile.email}
        </p>
        <div className="flex gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="max-w-xl text-slate-600 dark:text-slate-300">{profile.summary}</p>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Employment History</h2>
        <div className="flex flex-col gap-6">
          {employment.map((job) => (
            <article
              key={`${job.company}-${job.title}`}
              className="rounded-lg border border-slate-200 p-5 dark:border-slate-800"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-semibold">
                  {job.title} — {job.company}, {job.location}
                </h3>
                <span className="text-sm text-slate-500 dark:text-slate-400">{job.period}</span>
              </div>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Education</h2>
        <div className="flex flex-col gap-4">
          {education.map((entry) => (
            <article
              key={entry.school}
              className="rounded-lg border border-slate-200 p-5 dark:border-slate-800"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-semibold">
                  {entry.degree}, {entry.school}
                </h3>
                <span className="text-sm text-slate-500 dark:text-slate-400">{entry.period}</span>
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600 dark:text-slate-300">
                {entry.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Recognition</h2>
        <div className="flex flex-col gap-4">
          {recognition.map((entry) => (
            <article
              key={`${entry.title}-${entry.period}`}
              className="rounded-lg border border-slate-200 p-5 dark:border-slate-800"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-semibold">{entry.title}</h3>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {entry.org} • {entry.period}
                </span>
              </div>
              <p className="mt-2 text-slate-600 dark:text-slate-300">{entry.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `npm run test`
Expected: PASS (all `Home` tests + Task 2's `App` tests).

- [ ] **Step 7: Commit**

```bash
git add src/lib/asset.ts src/data/resume.ts src/pages/Home.tsx src/pages/Home.test.tsx
git commit -m "Add resume data and implement Home page"
```

---

### Task 4: Project data and Projects page (excluding the game)

**Files:**
- Create: `src/data/projects.ts`
- Create: `src/components/ProjectCard.tsx`
- Modify: `src/pages/Projects.tsx`
- Create: `src/pages/Projects.test.tsx`

**Interfaces:**
- Consumes: `asset` from `src/lib/asset.ts` (Task 3).
- Produces: `projects: Project[]` named export from `src/data/projects.ts` (`Project` type: `title`, `href?`, `period`, `learningOutcomes: string[]`, `description: string`, `images?: string[]`), in order `[vtuberSchedules, nijisanjiEnSchedules, dtmSimulator, circuitSimulator]`. `ProjectCard` default export (`src/components/ProjectCard.tsx`, prop `project: Project`) — reused by Task 4 only here, but available to any future project card needs.

- [ ] **Step 1: Create `src/data/projects.ts`**

```ts
export interface Project {
  title: string
  href?: string
  period: string
  learningOutcomes: string[]
  description: string
  images?: string[]
}

export const projects: Project[] = [
  {
    title: 'VTuber Schedules',
    href: 'https://vtuberschedules.com/',
    period: 'Since 2023',
    learningOutcomes: [
      'Full stack engineering',
      'AWS - CloudFormation, CloudFront, Cloud Development Kit, Lambda, DynamoDB, Route53',
      'Angular',
    ],
    description:
      'Improved and generalized version of Nijisanji EN schedules; hosting schedules for VTubers of multiple platforms and agencies.',
  },
  {
    title: 'Nijisanji EN Schedules',
    href: 'https://nijisanji-en-schedules.com/',
    period: '2022',
    learningOutcomes: ['Full stack engineering', 'AWS - API Gateway, Lambda, DynamoDB, Route53', 'Angular'],
    description: 'Single page to quickly view Nijisanji EN stream schedules.',
  },
  {
    title: 'Deterministic Turing Machine Simulator',
    href: 'https://github.com/clovenski/dtm-simulator',
    period: '2019',
    learningOutcomes: ['Python Tkinter'],
    description: '',
    images: ['assets/dtm_sim_1.gif', 'assets/dtm_sim_2.jpg', 'assets/dtm_sim_3.jpg', 'assets/dtm_sim_4.jpg'],
  },
  {
    title: 'Circuit Simulator',
    href: 'https://github.com/clovenski/circuit-simulator',
    period: '2018',
    learningOutcomes: ['Object-oriented Programming', 'Topological ordering graph algorithm', 'Terminal-driven application'],
    description: '',
    images: ['assets/circuit_sim_1.gif'],
  },
]
```

- [ ] **Step 2: Write the failing test — `src/pages/Projects.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Projects from './Projects'

describe('Projects page', () => {
  it('renders all five project titles', () => {
    render(<Projects />)

    expect(screen.getByRole('heading', { name: 'VTuber Schedules' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Nijisanji EN Schedules' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Isolation AI' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Deterministic Turing Machine Simulator' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Circuit Simulator' })).toBeInTheDocument()
  })

  it('links each project title to its external URL where applicable', () => {
    render(<Projects />)

    expect(screen.getByRole('link', { name: 'VTuber Schedules' })).toHaveAttribute(
      'href',
      'https://vtuberschedules.com/',
    )
    expect(screen.getByRole('link', { name: 'Deterministic Turing Machine Simulator' })).toHaveAttribute(
      'href',
      'https://github.com/clovenski/dtm-simulator',
    )
  })

  it('renders the footer GitHub link', () => {
    render(<Projects />)

    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/clovenski')
  })
})
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm run test`
Expected: FAIL — `Projects.tsx` still renders the Task 2 stub (`<div>Projects</div>`).

- [ ] **Step 4: Create `src/components/ProjectCard.tsx`**

```tsx
import { asset } from '../lib/asset'
import type { Project } from '../data/projects'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-lg border border-slate-200 p-6 dark:border-slate-800">
      <h3 className="text-lg font-semibold">
        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            {project.title}
          </a>
        ) : (
          project.title
        )}
      </h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{project.period}</p>
      <div className="mt-3">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Learning outcomes:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-slate-600 dark:text-slate-300">
          {project.learningOutcomes.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ul>
      </div>
      {project.description && <p className="mt-3 text-slate-600 dark:text-slate-300">{project.description}</p>}
      {project.images && (
        <div className="mt-4 flex flex-wrap gap-3">
          {project.images.map((image) => (
            <img
              key={image}
              src={asset(image)}
              alt={`${project.title} screenshot`}
              className="max-h-64 rounded-md border border-slate-200 dark:border-slate-800"
            />
          ))}
        </div>
      )}
    </article>
  )
}
```

- [ ] **Step 5: Implement `src/pages/Projects.tsx`**

```tsx
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

export default function Projects() {
  const [vtuberSchedules, nijisanji, dtmSimulator, circuitSimulator] = projects

  return (
    <div className="flex flex-col gap-6">
      <ProjectCard project={vtuberSchedules} />
      <ProjectCard project={nijisanji} />

      <article className="rounded-lg border border-slate-200 p-6 dark:border-slate-800">
        <h3 className="text-lg font-semibold">Isolation AI</h3>
        <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          <p>2019 - AI class, written original engine in C++</p>
          <p>2021 - Angular front-end, ported engine to C# and hosted it on AWS</p>
        </div>
        <div className="mt-3">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Learning outcomes:</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-slate-600 dark:text-slate-300">
            <li>Minimax algorithm with alpha-beta pruning</li>
            <li>React front-end</li>
            <li>Amazon API Gateway + AWS Lambda</li>
          </ul>
        </div>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          On a chess board, two queen pieces move around and occupy spaces on the board. The spaces they occupy
          cannot be occupied again. The goal of the game is to isolate your opponent so they don't have any legal
          moves on their next turn.
        </p>
        <p className="mt-4 text-sm italic text-slate-500 dark:text-slate-400">Game coming soon.</p>
      </article>

      <ProjectCard project={dtmSimulator} />
      <ProjectCard project={circuitSimulator} />

      <p className="text-sm text-slate-500 dark:text-slate-400">
        You can check more projects showcased on my{' '}
        <a
          href="https://github.com/clovenski"
          target="_blank"
          rel="noreferrer"
          className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          GitHub
        </a>
      </p>
    </div>
  )
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `npm run test`
Expected: PASS (all `Projects` tests + prior tests).

- [ ] **Step 7: Commit**

```bash
git add src/data/projects.ts src/components/ProjectCard.tsx src/pages/Projects.tsx src/pages/Projects.test.tsx
git commit -m "Add project data and implement Projects page (excluding Isolation AI game)"
```

---

### Task 5: Isolation AI board logic

**Files:**
- Create: `src/components/isolation-ai/isolationGame.ts`
- Create: `src/components/isolation-ai/isolationGame.test.ts`

**Interfaces:**
- Produces: types `Space` (`{ x: number; y: number; wasUsed: boolean; isLegalMove: boolean }`) and `Board` (`{ spaces: Space[][]; playerSpace: Space; compSpace: Space }`); functions `initBoard(): Board`, `getLegalMovesMap(board: Board, forPlayer: boolean): boolean[][]`, `applyLegalMoves(board: Board): Board`, `movePlayer(board: Board, target: Space): void`, `moveComputer(board: Board, target: Space): void`, `hasLegalMove(board: Board, forPlayer: boolean): boolean`. `board.spaces` is indexed `[x-1][y-1]` with `x,y` in `1..8`. Consumed by Task 6 (`isolationApi.ts`) and Task 7 (UI components).

- [ ] **Step 1: Write the failing tests — `src/components/isolation-ai/isolationGame.test.ts`**

```ts
import { describe, expect, it } from 'vitest'
import { getLegalMovesMap, hasLegalMove, initBoard, moveComputer, movePlayer } from './isolationGame'

describe('initBoard', () => {
  it('places the player at (1,8) and the computer at (8,1)', () => {
    const board = initBoard()

    expect(board.playerSpace).toEqual({ x: 1, y: 8, wasUsed: false, isLegalMove: false })
    expect(board.compSpace).toEqual({ x: 8, y: 1, wasUsed: false, isLegalMove: false })
  })

  it('marks no space as used', () => {
    const board = initBoard()

    const anyUsed = board.spaces.flat().some((space) => space.wasUsed)
    expect(anyUsed).toBe(false)
  })
})

describe('getLegalMovesMap', () => {
  it("computes the player's 20 legal opening moves along the row, column and open diagonal", () => {
    const board = initBoard()

    const legalMoves = getLegalMovesMap(board, true)
    const legalCount = legalMoves.flat().filter(Boolean).length

    expect(legalCount).toBe(20)
    expect(legalMoves[1][7]).toBe(true) // (2,8) along the row
    expect(legalMoves[0][6]).toBe(true) // (1,7) along the column
    expect(legalMoves[6][1]).toBe(true) // (7,2) along the open diagonal
    expect(legalMoves[7][0]).toBe(false) // (8,1) occupied by the computer
  })

  it('stops a sliding direction at a used space', () => {
    const board = initBoard()
    board.spaces[3][7].wasUsed = true // mark (4,8) used, along the player's row

    const legalMoves = getLegalMovesMap(board, true)

    expect(legalMoves[1][7]).toBe(true) // (2,8) still reachable
    expect(legalMoves[2][7]).toBe(true) // (3,8) still reachable
    expect(legalMoves[3][7]).toBe(false) // (4,8) itself is used, not a legal target
    expect(legalMoves[4][7]).toBe(false) // (5,8) beyond the used space is blocked
  })
})

describe('movePlayer', () => {
  it('marks the vacated space used, updates playerSpace, and recomputes legal moves', () => {
    const board = initBoard()
    const target = board.spaces[1][7] // (2,8)

    movePlayer(board, target)

    expect(board.spaces[0][7].wasUsed).toBe(true) // (1,8) vacated
    expect(board.playerSpace).toBe(target)
    expect(board.playerSpace.isLegalMove).toBe(false)
  })
})

describe('moveComputer', () => {
  it('marks the vacated space used and updates compSpace', () => {
    const board = initBoard()
    const target = board.spaces[6][0] // (7,1)

    moveComputer(board, target)

    expect(board.spaces[7][0].wasUsed).toBe(true) // (8,1) vacated
    expect(board.compSpace).toBe(target)
  })
})

describe('hasLegalMove', () => {
  it('is true for both sides on the opening board', () => {
    const board = initBoard()

    expect(hasLegalMove(board, true)).toBe(true)
    expect(hasLegalMove(board, false)).toBe(true)
  })

  it('is false once every neighboring space is used', () => {
    const board = initBoard()
    board.playerSpace = board.spaces[3][3] // move the player to an isolated interior space: (4,4)
    board.compSpace = board.spaces[7][7] // keep the computer out of the way

    const neighborOffsets = [
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
      [-1, 0],
      [-1, 1],
    ]
    for (const [dx, dy] of neighborOffsets) {
      board.spaces[3 + dx][3 + dy].wasUsed = true
    }

    expect(hasLegalMove(board, true)).toBe(false)
  })
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm run test`
Expected: FAIL — `./isolationGame` does not exist yet.

- [ ] **Step 3: Implement `src/components/isolation-ai/isolationGame.ts`**

```ts
export interface Space {
  x: number
  y: number
  wasUsed: boolean
  isLegalMove: boolean
}

export interface Board {
  spaces: Space[][]
  playerSpace: Space
  compSpace: Space
}

const DIRECTION_OFFSETS = [
  { dx: 0, dy: 1 },
  { dx: 1, dy: 1 },
  { dx: 1, dy: 0 },
  { dx: 1, dy: -1 },
  { dx: 0, dy: -1 },
  { dx: -1, dy: -1 },
  { dx: -1, dy: 0 },
  { dx: -1, dy: 1 },
]

export function initBoard(): Board {
  const spaces: Space[][] = []

  for (let x = 1; x <= 8; x++) {
    const column: Space[] = []
    for (let y = 1; y <= 8; y++) {
      column.push({ x, y, wasUsed: false, isLegalMove: false })
    }
    spaces.push(column)
  }

  const board: Board = {
    spaces,
    playerSpace: spaces[0][7],
    compSpace: spaces[7][0],
  }

  applyLegalMoves(board)

  return board
}

export function getLegalMovesMap(board: Board, forPlayer: boolean): boolean[][] {
  const legalMoves = Array.from({ length: 8 }, () => Array<boolean>(8).fill(false))
  const rootSpace = forPlayer ? board.playerSpace : board.compSpace

  for (const { dx, dy } of DIRECTION_OFFSETS) {
    for (let magnitude = 1; magnitude <= 7; magnitude++) {
      const targetX = rootSpace.x + dx * magnitude
      const targetY = rootSpace.y + dy * magnitude

      if (targetX < 1 || targetX > 8 || targetY < 1 || targetY > 8) break

      const targetSpace = board.spaces[targetX - 1][targetY - 1]
      if (targetSpace.wasUsed || targetSpace === board.compSpace || targetSpace === board.playerSpace) {
        break
      }

      legalMoves[targetX - 1][targetY - 1] = true
    }
  }

  return legalMoves
}

export function applyLegalMoves(board: Board): Board {
  const legalMoves = getLegalMovesMap(board, true)

  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      board.spaces[x][y].isLegalMove = legalMoves[x][y]
    }
  }

  return board
}

export function movePlayer(board: Board, target: Space): void {
  board.playerSpace.wasUsed = true
  board.playerSpace = target
  applyLegalMoves(board)
}

export function moveComputer(board: Board, target: Space): void {
  board.compSpace.wasUsed = true
  board.compSpace = target
  applyLegalMoves(board)
}

export function hasLegalMove(board: Board, forPlayer: boolean): boolean {
  const moves = getLegalMovesMap(board, forPlayer)
  return moves.some((column) => column.some((isLegal) => isLegal))
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm run test`
Expected: PASS (all `isolationGame` tests + prior tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/isolation-ai/isolationGame.ts src/components/isolation-ai/isolationGame.test.ts
git commit -m "Add Isolation AI board logic (queen movement, legal moves, win detection)"
```

---

### Task 6: Isolation AI Lambda API module

**Files:**
- Create: `src/components/isolation-ai/isolationApi.ts`
- Create: `src/components/isolation-ai/isolationApi.test.ts`

**Interfaces:**
- Consumes: `Board`, `Space` types and `initBoard`, `movePlayer` from `./isolationGame` (Task 5).
- Produces: `encodeBoardState(board: Board): string`, `getComputerMove(board: Board): Promise<Space>`, types `ComputerMoveRequest`, `ComputerMoveResponse`. Consumed by Task 7's `IsolationGame.tsx`.

- [ ] **Step 1: Write the failing tests — `src/components/isolation-ai/isolationApi.test.ts`**

```ts
import { afterEach, describe, expect, it, vi } from 'vitest'
import { initBoard, movePlayer } from './isolationGame'
import { encodeBoardState, getComputerMove } from './isolationApi'

describe('encodeBoardState', () => {
  it('encodes the opening board (only player and computer spaces occupied) as a decimal string', () => {
    const board = initBoard()

    // 64 bits, MSB-first from (x=1,y=8)..(x=8,y=1): bit 63 is the player (1,8),
    // bit 0 is the computer (8,1); everything else is 0.
    const expected = (BigInt(1) << BigInt(63)) + BigInt(1)

    expect(encodeBoardState(board)).toBe(expected.toString())
  })

  it('reflects a used space after the player moves', () => {
    const board = initBoard()
    movePlayer(board, board.spaces[1][7]) // player moves to (2,8)

    const before = BigInt(encodeBoardState(initBoard()))
    const after = BigInt(encodeBoardState(board))

    expect(after).toBeGreaterThan(before)
  })
})

describe('getComputerMove', () => {
  const originalFetch = global.fetch

  afterEach(() => {
    global.fetch = originalFetch
  })

  it('parses a hex NextMove into the corresponding board space', async () => {
    const board = initBoard()
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ NextMove: 0x71 }), // x=7, y=1
    }) as unknown as typeof fetch

    const move = await getComputerMove(board)

    expect(move).toBe(board.spaces[6][0])
    expect(global.fetch).toHaveBeenCalledWith(
      'https://mwlqaxo302.execute-api.us-west-1.amazonaws.com/prod/computermove',
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('throws when the response is not ok', async () => {
    const board = initBoard()
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 }) as unknown as typeof fetch

    await expect(getComputerMove(board)).rejects.toThrow('status 500')
  })
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm run test`
Expected: FAIL — `./isolationApi` does not exist yet.

- [ ] **Step 3: Implement `src/components/isolation-ai/isolationApi.ts`**

```ts
import type { Board, Space } from './isolationGame'

export interface ComputerMoveRequest {
  BoardState: string
  PlayerPos: number
  CompPos: number
  Difficulty: number
}

export interface ComputerMoveResponse {
  NextMove: number
}

const API_URL = 'https://mwlqaxo302.execute-api.us-west-1.amazonaws.com/prod/computermove'

export function encodeBoardState(board: Board): string {
  let bits = ''

  for (let y = 8; y >= 1; y--) {
    for (let x = 1; x <= 8; x++) {
      const space = board.spaces[x - 1][y - 1]
      const occupied = space.wasUsed || space === board.playerSpace || space === board.compSpace
      bits += occupied ? '1' : '0'
    }
  }

  return BigInt(`0b${bits}`).toString()
}

function encodePosition(space: Space): number {
  return Number(`0x${space.x}${space.y}`)
}

export async function getComputerMove(board: Board): Promise<Space> {
  const request: ComputerMoveRequest = {
    BoardState: encodeBoardState(board),
    PlayerPos: encodePosition(board.playerSpace),
    CompPos: encodePosition(board.compSpace),
    Difficulty: 1,
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error(`Computer move request failed with status ${response.status}`)
  }

  const data = (await response.json()) as ComputerMoveResponse
  const move = data.NextMove.toString(16)
  const x = Number(move.charAt(0))
  const y = Number(move.charAt(1))

  return board.spaces[x - 1][y - 1]
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm run test`
Expected: PASS (all `isolationApi` tests + prior tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/isolation-ai/isolationApi.ts src/components/isolation-ai/isolationApi.test.ts
git commit -m "Add Isolation AI Lambda API client (board-state encoding, computer move fetch)"
```

---

### Task 7: Isolation AI UI and wiring into the Projects page

**Files:**
- Create: `src/components/isolation-ai/IsolationBoard.tsx`
- Create: `src/components/isolation-ai/MoveHistory.tsx`
- Create: `src/components/isolation-ai/IsolationGame.tsx`
- Create: `src/components/isolation-ai/IsolationGame.test.tsx`
- Modify: `src/pages/Projects.tsx`

**Interfaces:**
- Consumes: `Board`, `Space`, `initBoard`, `movePlayer`, `moveComputer`, `hasLegalMove` from `./isolationGame` (Task 5); `getComputerMove` from `./isolationApi` (Task 6); `asset` from `../../lib/asset` (Task 3).
- Produces: `IsolationBoard` default export (props: `board: Board`, `interactive: boolean`, `onMove: (target: Space) => void`), `MoveHistory` default export (props: `playerMoves: Space[]`, `compMoves: Space[]`), `IsolationGame` default export (no props) — mounted directly in `Projects.tsx` in place of the "Game coming soon" placeholder.

- [ ] **Step 1: Write the failing tests — `src/components/isolation-ai/IsolationGame.test.tsx`**

```tsx
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import IsolationGame from './IsolationGame'
import * as isolationApi from './isolationApi'

describe('IsolationGame', () => {
  it('moves the player, requests a computer move, and lists both in the history table', async () => {
    vi.spyOn(isolationApi, 'getComputerMove').mockImplementation(async (board) => board.spaces[6][0])

    render(<IsolationGame />)

    // select the player's queen at (1,8), then move to the legal space (2,8)
    fireEvent.click(screen.getByLabelText('Space 1, 8'))
    fireEvent.click(screen.getByLabelText('Space 2, 8'))

    expect(screen.getByText('Computer is thinking...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Please make a move.')).toBeInTheDocument()
    })

    expect(screen.getByText('(2, 8)')).toBeInTheDocument()
    expect(screen.getByText('(7, 1)')).toBeInTheDocument()
  })

  it('shows an error message when the computer move request fails', async () => {
    vi.spyOn(isolationApi, 'getComputerMove').mockRejectedValue(new Error('network error'))

    render(<IsolationGame />)

    fireEvent.click(screen.getByLabelText('Space 1, 8'))
    fireEvent.click(screen.getByLabelText('Space 2, 8'))

    await waitFor(() => {
      expect(screen.getByText('The computer move request failed. Please try again later.')).toBeInTheDocument()
    })
  })
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm run test`
Expected: FAIL — `./IsolationGame` does not exist yet.

- [ ] **Step 3: Implement `src/components/isolation-ai/IsolationBoard.tsx`**

```tsx
import { useState } from 'react'
import { asset } from '../../lib/asset'
import type { Board, Space } from './isolationGame'

interface IsolationBoardProps {
  board: Board
  interactive: boolean
  onMove: (target: Space) => void
}

export default function IsolationBoard({ board, interactive, onMove }: IsolationBoardProps) {
  const [selected, setSelected] = useState(false)

  function getSpace(row: number, col: number): Space {
    // rendered top-to-bottom (y=8..1), left-to-right (x=1..8)
    const y = 8 - row
    const x = col + 1
    return board.spaces[x - 1][y - 1]
  }

  function handleClick(space: Space) {
    if (!interactive) return

    if (space === board.playerSpace) {
      setSelected((wasSelected) => !wasSelected)
      return
    }

    if (selected && space.isLegalMove) {
      setSelected(false)
      onMove(space)
    }
  }

  return (
    <div
      className="grid aspect-square w-full max-w-md grid-cols-8 overflow-hidden rounded-md border border-slate-300 dark:border-slate-700"
      role="grid"
      aria-label="Isolation game board"
    >
      {Array.from({ length: 8 }, (_, row) =>
        Array.from({ length: 8 }, (_, col) => {
          const space = getSpace(row, col)
          const isDark = (row + col) % 2 === 1
          const isPlayer = space === board.playerSpace
          const isComputer = space === board.compSpace
          const canClick = interactive && (isPlayer || (selected && space.isLegalMove))

          return (
            <button
              key={`${space.x}-${space.y}`}
              type="button"
              role="gridcell"
              aria-label={`Space ${space.x}, ${space.y}`}
              onClick={() => handleClick(space)}
              disabled={!canClick}
              className={`relative flex items-center justify-center ${
                space.wasUsed
                  ? 'bg-white dark:bg-slate-900'
                  : isDark
                    ? 'bg-amber-200 dark:bg-amber-900'
                    : 'bg-amber-50 dark:bg-amber-950'
              } ${selected && space.isLegalMove ? 'ring-2 ring-inset ring-indigo-500' : ''}`}
            >
              {isPlayer && <img src={asset('assets/white_queen.png')} alt="Player queen" className="w-3/4" />}
              {isComputer && <img src={asset('assets/black_queen.png')} alt="Computer queen" className="w-3/4" />}
              {selected && space.isLegalMove && !isPlayer && !isComputer && (
                <span className="h-2 w-2 rounded-full bg-slate-500" />
              )}
            </button>
          )
        }),
      )}
    </div>
  )
}
```

- [ ] **Step 4: Implement `src/components/isolation-ai/MoveHistory.tsx`**

```tsx
import type { Space } from './isolationGame'

function formatSpace(space: Space): string {
  return `(${space.x}, ${space.y})`
}

interface MoveHistoryProps {
  playerMoves: Space[]
  compMoves: Space[]
}

export default function MoveHistory({ playerMoves, compMoves }: MoveHistoryProps) {
  const rowCount = Math.max(playerMoves.length, compMoves.length)

  return (
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b border-slate-200 dark:border-slate-800">
          <th className="py-1 font-medium text-slate-500 dark:text-slate-400">Player</th>
          <th className="py-1 font-medium text-slate-500 dark:text-slate-400">Computer</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rowCount }, (_, i) => (
          <tr key={i}>
            <td className="py-0.5 text-slate-700 dark:text-slate-200">{playerMoves[i] ? formatSpace(playerMoves[i]) : ''}</td>
            <td className="py-0.5 text-slate-700 dark:text-slate-200">{compMoves[i] ? formatSpace(compMoves[i]) : ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

- [ ] **Step 5: Implement `src/components/isolation-ai/IsolationGame.tsx`**

```tsx
import { useState } from 'react'
import { getComputerMove } from './isolationApi'
import { hasLegalMove, initBoard, moveComputer, movePlayer } from './isolationGame'
import type { Board, Space } from './isolationGame'
import IsolationBoard from './IsolationBoard'
import MoveHistory from './MoveHistory'

type GameStatus = 'awaiting-player' | 'computer-thinking' | 'player-won' | 'computer-won' | 'error'

const STATUS_MESSAGES: Record<GameStatus, string> = {
  'awaiting-player': 'Please make a move.',
  'computer-thinking': 'Computer is thinking...',
  'player-won': 'Player won!',
  'computer-won': 'Computer won!',
  error: 'The computer move request failed. Please try again later.',
}

export default function IsolationGame() {
  const [board, setBoard] = useState<Board>(() => initBoard())
  const [status, setStatus] = useState<GameStatus>('awaiting-player')
  const [playerMoves, setPlayerMoves] = useState<Space[]>([])
  const [compMoves, setCompMoves] = useState<Space[]>([])

  async function handlePlayerMove(target: Space) {
    if (status !== 'awaiting-player') return

    movePlayer(board, target)
    setPlayerMoves((moves) => [...moves, target])

    if (!hasLegalMove(board, false)) {
      setBoard({ ...board })
      setStatus('player-won')
      return
    }

    setBoard({ ...board })
    setStatus('computer-thinking')

    try {
      const compMove = await getComputerMove(board)
      moveComputer(board, compMove)
      setCompMoves((moves) => [...moves, compMove])

      if (!hasLegalMove(board, true)) {
        setBoard({ ...board })
        setStatus('computer-won')
        return
      }

      setBoard({ ...board })
      setStatus('awaiting-player')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <IsolationBoard board={board} interactive={status === 'awaiting-player'} onMove={handlePlayerMove} />
      <div className="flex flex-col gap-3 sm:w-56">
        <MoveHistory playerMoves={playerMoves} compMoves={compMoves} />
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{STATUS_MESSAGES[status]}</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm run test`
Expected: PASS (all `IsolationGame` tests + prior tests).

- [ ] **Step 7: Wire the game into `src/pages/Projects.tsx`**

In the Isolation AI `<article>` block, replace:

```tsx
        <p className="mt-4 text-sm italic text-slate-500 dark:text-slate-400">Game coming soon.</p>
```

with:

```tsx
        <div className="mt-4">
          <IsolationGame />
        </div>
```

And add the import at the top of the file:

```tsx
import IsolationGame from '../components/isolation-ai/IsolationGame'
```

- [ ] **Step 8: Run the full test suite and build**

Run: `npm run test`
Expected: PASS (all tests, including `Projects.test.tsx` from Task 4, which is unaffected by this change since it only asserts on headings/links).

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 9: Commit**

```bash
git add src/components/isolation-ai/IsolationBoard.tsx src/components/isolation-ai/MoveHistory.tsx src/components/isolation-ai/IsolationGame.tsx src/components/isolation-ai/IsolationGame.test.tsx src/pages/Projects.tsx
git commit -m "Add Isolation AI board UI and wire the playable game into Projects"
```

---

### Task 8: GitHub Pages deployment configuration

**Files:**
- Create: `public/404.html`
- Modify: `index.html`
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- None (deployment configuration only; no code interfaces).

- [ ] **Step 1: Create `public/404.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Joel Tengco — Senior Software Engineer</title>
    <script type="text/javascript">
      // GitHub Pages SPA redirect: https://github.com/rafgraph/spa-github-pages
      var segmentCount = 1
      var l = window.location
      l.replace(
        l.protocol +
          '//' +
          l.hostname +
          (l.port ? ':' + l.port : '') +
          l.pathname
            .split('/')
            .slice(0, 1 + segmentCount)
            .join('/') +
          '/?/' +
          l.pathname.slice(1).split('/').slice(segmentCount).join('/').replace(/&/g, '~and~') +
          (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
          l.hash,
      )
    </script>
  </head>
  <body></body>
</html>
```

- [ ] **Step 2: Add the redirect-decode script to `index.html`**

Update `index.html` to add the decode script before the module script tag:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Joel Tengco — Senior Software Engineer</title>
    <script type="text/javascript">
      // GitHub Pages SPA redirect decode: https://github.com/rafgraph/spa-github-pages
      ;(function (l) {
        if (l.search[1] === '/') {
          var decoded = l.search
            .slice(1)
            .split('&')
            .map(function (s) {
              return s.replace(/~and~/g, '&')
            })
            .join('?')
          window.history.replaceState(null, '', l.pathname.slice(0, -1) + decoded + l.hash)
        }
      })(window.location)
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run test
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 4: Verify the production build includes the 404 page and correct base path**

Run: `npm run build`
Expected: exits 0; `dist/404.html` exists; `dist/index.html` references `/resume-v2/assets/...` for the built JS/CSS (confirm by opening `dist/index.html` and checking the `<script src="...">` / `<link href="...">` paths start with `/resume-v2/`).

- [ ] **Step 5: Commit**

```bash
git add public/404.html index.html .github/workflows/deploy.yml
git commit -m "Add GitHub Pages deployment workflow and SPA redirect handling"
```

---

### Task 9: End-to-end manual verification

**Files:**
- None expected, but fix forward in whichever file if an issue is found (see Step 4).

**Interfaces:**
- None — this task verifies the integrated app built by Tasks 1-8.

- [ ] **Step 1: Run the full automated test suite**

Run: `npm run test`
Expected: PASS, all test files from Tasks 2-7.

- [ ] **Step 2: Run a production build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Start the dev server and visually verify each page**

Run: `npm run dev` (background/long-running — use a separate terminal or run in background)
Then open `http://localhost:5173/resume-v2/` in a browser (use the `run` skill or Chrome browser automation tooling if available) and check:
- **Home**: avatar loads; name/title/location/email correct; all three employment entries render with their bullets; both education entries render; the 20-item skills list renders; all four recognition entries render; LinkedIn/GitHub/VTuber Schedules links open the correct URLs; nav highlights "Home" as active.
- **Projects**: all 5 project cards render in order (VTuber Schedules, Nijisanji EN Schedules, Isolation AI, DTM Simulator, Circuit Simulator); DTM Simulator shows 4 images, Circuit Simulator shows 1 gif; the Isolation AI board renders as an 8x8 grid with the white queen at the top-left corner and the black queen at the bottom-right corner; clicking the white queen highlights legal squares (dots appear along the top row, left column, and open diagonal); clicking a highlighted square moves the queen there and the status line changes to "Computer is thinking..." (a real move response depends on the Lambda's CORS policy allowing `localhost` — if the request fails, confirm the status line changes to the error message rather than the UI breaking); the footer GitHub link is present.
- **Hobbies**: shows the "Hobbies" heading and "Coming soon." text; nav highlights "Hobbies" as active.
- Resize the browser to a narrow (mobile) width and confirm the layout reflows without horizontal overflow on all three pages.

- [ ] **Step 4: Fix any issues found**

If Step 3 surfaces a visual or functional issue, fix it in the relevant file (`src/pages/*.tsx`, `src/components/**/*.tsx`, or `src/data/*.ts`) and re-run `npm run test` and `npm run build` to confirm the fix doesn't break anything.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "Fix issues found during end-to-end verification"
```

(Skip this step if Step 3 found no issues.)
