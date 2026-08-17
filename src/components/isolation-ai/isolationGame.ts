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
