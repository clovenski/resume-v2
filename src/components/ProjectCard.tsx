import { useEffect, useState } from 'react'
import { asset } from '../lib/asset'
import type { Project } from '../data/projects'

export default function ProjectCard({ project }: { project: Project }) {
  const [zoomed, setZoomed] = useState(false)

  useEffect(() => {
    if (!zoomed) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setZoomed(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [zoomed])

  return (
    <>
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
        {project.demoVideo && (
          <div className="mt-4">
            <video autoPlay muted loop playsInline className="h-auto w-full rounded-md border border-slate-200 dark:border-slate-800">
              <source src={asset(project.demoVideo)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        {project.images && (
          <div className="mt-4 flex flex-wrap items-start gap-3">
            {project.images.map((image) => (
              <img
                key={image}
                src={asset(image)}
                alt={`${project.title} screenshot`}
                className="h-auto min-w-0 flex-1 basis-64 rounded-md border border-slate-200 dark:border-slate-800"
              />
            ))}
          </div>
        )}
        {project.architectureDiagram && (
          <figure className="mt-4">
            <img
              src={asset(project.architectureDiagram)}
              alt={`${project.title} systems architecture`}
              loading="lazy"
              onClick={() => setZoomed(true)}
              className="w-full cursor-zoom-in rounded-md border border-slate-200 dark:border-slate-800"
            />
            <figcaption className="mt-2 font-mono text-xs text-slate-500 dark:text-slate-400">
              Systems architecture — tap to enlarge
            </figcaption>
          </figure>
        )}
        {project.fullVideoUrl && (
          <p className="mt-3">
            <a
              href={project.fullVideoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Watch full demo &rarr;
            </a>
          </p>
        )}
      </article>
      {project.architectureDiagram && zoomed && (
        <div
          className="fixed inset-0 z-50 grid cursor-zoom-out place-items-start justify-center overflow-auto bg-slate-950/90 p-6"
          onClick={() => setZoomed(false)}
        >
          <img src={asset(project.architectureDiagram)} alt="" className="w-[1760px] max-w-none" />
        </div>
      )}
    </>
  )
}
