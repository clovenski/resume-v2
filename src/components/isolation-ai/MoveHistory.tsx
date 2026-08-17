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
