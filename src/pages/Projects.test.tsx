import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Projects from './Projects'

describe('Projects page', () => {
  it('renders all five project titles', () => {
    render(<Projects />)

    expect(screen.getByRole('heading', { name: 'VTuber Schedules' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Nijisanji EN Schedules' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Isolation AI' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Deterministic Turing Machine Simulator' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Circuit Simulator' })).toBeInTheDocument()
  })

  it('links each project title to its external URL where applicable', () => {
    render(<Projects />)

    expect(screen.getByRole('link', { name: 'VTuber Schedules' })).toHaveAttribute(
      'href',
      'https://vtuberschedules.com/',
    )
    expect(screen.getByRole('link', { name: 'Deterministic Turing Machine Simulator' })).toHaveAttribute(
      'href',
      'https://github.com/clovenski/dtm-simulator',
    )
  })

  it('renders the footer GitHub link', () => {
    render(<Projects />)

    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/clovenski')
  })
})
