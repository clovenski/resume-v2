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
