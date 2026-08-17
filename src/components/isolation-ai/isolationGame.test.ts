import { describe, expect, it } from 'vitest'
import { getLegalMovesMap, hasLegalMove, initBoard, moveComputer, movePlayer } from './isolationGame'

describe('initBoard', () => {
  it('places the player at (1,8) and the computer at (8,1)', () => {
    const board = initBoard()

    expect(board.playerSpace).toEqual({ x: 1, y: 8, wasUsed: false, isLegalMove: false })
    expect(board.compSpace).toEqual({ x: 8, y: 1, wasUsed: false, isLegalMove: false })
  })

  it('marks no space as used', () => {
    const board = initBoard()

    const anyUsed = board.spaces.flat().some((space) => space.wasUsed)
    expect(anyUsed).toBe(false)
  })
})

describe('getLegalMovesMap', () => {
  it("computes the player's 20 legal opening moves along the row, column and open diagonal", () => {
    const board = initBoard()

    const legalMoves = getLegalMovesMap(board, true)
    const legalCount = legalMoves.flat().filter(Boolean).length

    expect(legalCount).toBe(20)
    expect(legalMoves[1][7]).toBe(true) // (2,8) along the row
    expect(legalMoves[0][6]).toBe(true) // (1,7) along the column
    expect(legalMoves[6][1]).toBe(true) // (7,2) along the open diagonal
    expect(legalMoves[7][0]).toBe(false) // (8,1) occupied by the computer
  })

  it('stops a sliding direction at a used space', () => {
    const board = initBoard()
    board.spaces[3][7].wasUsed = true // mark (4,8) used, along the player's row

    const legalMoves = getLegalMovesMap(board, true)

    expect(legalMoves[1][7]).toBe(true) // (2,8) still reachable
    expect(legalMoves[2][7]).toBe(true) // (3,8) still reachable
    expect(legalMoves[3][7]).toBe(false) // (4,8) itself is used, not a legal target
    expect(legalMoves[4][7]).toBe(false) // (5,8) beyond the used space is blocked
  })
})

describe('movePlayer', () => {
  it('marks the vacated space used, updates playerSpace, and recomputes legal moves', () => {
    const board = initBoard()
    const target = board.spaces[1][7] // (2,8)

    movePlayer(board, target)

    expect(board.spaces[0][7].wasUsed).toBe(true) // (1,8) vacated
    expect(board.playerSpace).toBe(target)
    expect(board.playerSpace.isLegalMove).toBe(false)
  })
})

describe('moveComputer', () => {
  it('marks the vacated space used and updates compSpace', () => {
    const board = initBoard()
    const target = board.spaces[6][0] // (7,1)

    moveComputer(board, target)

    expect(board.spaces[7][0].wasUsed).toBe(true) // (8,1) vacated
    expect(board.compSpace).toBe(target)
  })
})

describe('hasLegalMove', () => {
  it('is true for both sides on the opening board', () => {
    const board = initBoard()

    expect(hasLegalMove(board, true)).toBe(true)
    expect(hasLegalMove(board, false)).toBe(true)
  })

  it('is false once every neighboring space is used', () => {
    const board = initBoard()
    board.playerSpace = board.spaces[3][3] // move the player to an isolated interior space: (4,4)
    board.compSpace = board.spaces[7][7] // keep the computer out of the way

    const neighborOffsets = [
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
      [-1, 0],
      [-1, 1],
    ]
    for (const [dx, dy] of neighborOffsets) {
      board.spaces[3 + dx][3 + dy].wasUsed = true
    }

    expect(hasLegalMove(board, true)).toBe(false)
  })
})
