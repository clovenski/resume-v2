import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App routing', () => {
  it('renders nav links to Home, Projects and Hobbies at the root route', () => {
    window.history.pushState({}, '', '/resume-v2/')
    render(<App />)

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Hobbies' })).toBeInTheDocument()
  })

  it('renders the Hobbies placeholder at /hobbies', () => {
    window.history.pushState({}, '', '/resume-v2/hobbies')
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Hobbies' })).toBeInTheDocument()
    expect(screen.getByText('Coming soon.')).toBeInTheDocument()
  })
})
