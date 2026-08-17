import type { Board, Space } from './isolationGame'

export interface ComputerMoveRequest {
  BoardState: string
  PlayerPos: number
  CompPos: number
  Difficulty: number
}

export interface ComputerMoveResponse {
  NextMove: number
}

const API_URL = 'https://mwlqaxo302.execute-api.us-west-1.amazonaws.com/prod/computermove'

export function encodeBoardState(board: Board): string {
  let bits = ''

  for (let y = 8; y >= 1; y--) {
    for (let x = 1; x <= 8; x++) {
      const space = board.spaces[x - 1][y - 1]
      const occupied = space.wasUsed || space === board.playerSpace || space === board.compSpace
      bits += occupied ? '1' : '0'
    }
  }

  return BigInt(`0b${bits}`).toString()
}

function encodePosition(space: Space): number {
  return Number(`0x${space.x}${space.y}`)
}

export async function getComputerMove(board: Board): Promise<Space> {
  const request: ComputerMoveRequest = {
    BoardState: encodeBoardState(board),
    PlayerPos: encodePosition(board.playerSpace),
    CompPos: encodePosition(board.compSpace),
    Difficulty: 1,
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error(`Computer move request failed with status ${response.status}`)
  }

  const data = (await response.json()) as ComputerMoveResponse
  const move = data.NextMove.toString(16)
  const x = Number(move.charAt(0))
  const y = Number(move.charAt(1))

  return board.spaces[x - 1][y - 1]
}
