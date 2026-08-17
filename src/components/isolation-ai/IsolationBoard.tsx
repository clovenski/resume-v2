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
  const [dragging, setDragging] = useState(false)
  const [dragOverSpace, setDragOverSpace] = useState<Space | null>(null)

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

  function handlePieceDragStart(event: React.DragEvent<HTMLImageElement>) {
    if (!interactive) {
      event.preventDefault()
      return
    }
    event.dataTransfer.effectAllowed = 'move'
    setDragging(true)
  }

  function handlePieceDragEnd() {
    setDragging(false)
    setDragOverSpace(null)
  }

  function handleDragEnter(space: Space, event: React.DragEvent<HTMLButtonElement>) {
    if (interactive && space.isLegalMove) {
      event.preventDefault()
      setDragOverSpace(space)
    }
  }

  function handleDragOver(space: Space, event: React.DragEvent<HTMLButtonElement>) {
    if (interactive && space.isLegalMove) {
      event.preventDefault()
    }
  }

  function handleDragLeave(space: Space, event: React.DragEvent<HTMLButtonElement>) {
    // dragleave fires when the pointer moves onto a child element (e.g. the
    // legal-move dot) within the same cell — ignore those, only clear when
    // the pointer has actually left the cell.
    const nextTarget = event.relatedTarget as Node | null
    if (nextTarget && event.currentTarget.contains(nextTarget)) return

    setDragOverSpace((current) => (current === space ? null : current))
  }

  function handleDrop(space: Space, event: React.DragEvent<HTMLButtonElement>) {
    event.preventDefault()
    setDragging(false)
    setDragOverSpace(null)
    if (interactive && space.isLegalMove) {
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
          const isDragTarget = dragOverSpace === space
          const canInteract = interactive && (isPlayer || space.isLegalMove)

          return (
            <button
              key={`${space.x}-${space.y}`}
              type="button"
              role="gridcell"
              aria-label={`Space ${space.x}, ${space.y}`}
              onClick={() => handleClick(space)}
              disabled={!canInteract}
              onDragEnter={(event) => handleDragEnter(space, event)}
              onDragOver={(event) => handleDragOver(space, event)}
              onDragLeave={(event) => handleDragLeave(space, event)}
              onDrop={(event) => handleDrop(space, event)}
              className={`relative flex aspect-square items-center justify-center ${
                space.wasUsed
                  ? 'bg-white dark:bg-slate-900'
                  : isDragTarget
                    ? 'bg-white'
                    : isDark
                      ? 'bg-[#bd9b7c]'
                      : 'bg-[#f3dfbf]'
              } ${selected && space.isLegalMove ? 'ring-2 ring-inset ring-indigo-500' : ''}`}
            >
              {isPlayer && (
                <img
                  src={asset('assets/white_queen.png')}
                  alt="Player queen"
                  draggable={interactive}
                  onDragStart={handlePieceDragStart}
                  onDragEnd={handlePieceDragEnd}
                  className="w-3/4"
                />
              )}
              {isComputer && (
                <img
                  src={asset('assets/black_queen.png')}
                  alt="Computer queen"
                  draggable={false}
                  className="w-3/4"
                />
              )}
              {(selected || dragging) && space.isLegalMove && !isPlayer && !isComputer && !isDragTarget && (
                <span className="h-2 w-2 rounded-full bg-slate-500" />
              )}
            </button>
          )
        }),
      )}
    </div>
  )
}
