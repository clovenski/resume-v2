import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App routing', () => {
  it('renders nav links to Home and Projects at the root route', () => {
    window.history.pushState({}, '', '/resume-v2/')
    render(<App />)

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument()
  })
})
