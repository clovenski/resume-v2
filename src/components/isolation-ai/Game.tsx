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
