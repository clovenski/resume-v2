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
        <nav className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-y-1 px-4 py-3">
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
        Last modified: 2026-08-17
      </footer>
    </div>
  )
}
