import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import IsolationGame from './IsolationGame.tsx'
import * as isolationApi from './isolationApi'

describe('IsolationGame', () => {
  it('moves the player, requests a computer move, and lists both in the history table', async () => {
    vi.spyOn(isolationApi, 'getComputerMove').mockImplementation(async (board) => board.spaces[6][0])

    render(<IsolationGame />)

    // select the player's queen at (1,8), then move to the legal space (2,8)
    fireEvent.click(screen.getByLabelText('Space 1, 8'))
    fireEvent.click(screen.getByLabelText('Space 2, 8'))

    expect(screen.getByText('Computer is thinking...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Please make a move.')).toBeInTheDocument()
    })

    expect(screen.getByText('(2, 8)')).toBeInTheDocument()
    expect(screen.getByText('(7, 1)')).toBeInTheDocument()
  })

  it('shows an error message when the computer move request fails', async () => {
    vi.spyOn(isolationApi, 'getComputerMove').mockRejectedValue(new Error('network error'))

    render(<IsolationGame />)

    fireEvent.click(screen.getByLabelText('Space 1, 8'))
    fireEvent.click(screen.getByLabelText('Space 2, 8'))

    await waitFor(() => {
      expect(screen.getByText('The computer move request failed. Please try again later.')).toBeInTheDocument()
    })
  })
})
