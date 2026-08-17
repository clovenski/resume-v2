import { afterEach, describe, expect, it, vi } from 'vitest'
import { initBoard, movePlayer } from './isolationGame'
import { encodeBoardState, getComputerMove } from './isolationApi'

describe('encodeBoardState', () => {
  it('encodes the opening board (only player and computer spaces occupied) as a decimal string', () => {
    const board = initBoard()

    // 64 bits, MSB-first from (x=1,y=8)..(x=8,y=1): bit 63 is the player (1,8),
    // bit 0 is the computer (8,1); everything else is 0.
    const expected = (BigInt(1) << BigInt(63)) + BigInt(1)

    expect(encodeBoardState(board)).toBe(expected.toString())
  })

  it('reflects a used space after the player moves', () => {
    const board = initBoard()
    movePlayer(board, board.spaces[1][7]) // player moves to (2,8)

    const before = BigInt(encodeBoardState(initBoard()))
    const after = BigInt(encodeBoardState(board))

    expect(after).toBeGreaterThan(before)
  })
})

describe('getComputerMove', () => {
  const originalFetch = global.fetch

  afterEach(() => {
    global.fetch = originalFetch
  })

  it('parses a hex NextMove into the corresponding board space', async () => {
    const board = initBoard()
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ NextMove: 0x71 }), // x=7, y=1
    }) as unknown as typeof fetch

    const move = await getComputerMove(board)

    expect(move).toBe(board.spaces[6][0])
    expect(global.fetch).toHaveBeenCalledWith(
      'https://mwlqaxo302.execute-api.us-west-1.amazonaws.com/prod/computermove',
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('throws when the response is not ok', async () => {
    const board = initBoard()
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 }) as unknown as typeof fetch

    await expect(getComputerMove(board)).rejects.toThrow('status 500')
  })
})
