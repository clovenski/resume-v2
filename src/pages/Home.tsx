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
