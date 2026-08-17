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
