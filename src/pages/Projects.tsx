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
