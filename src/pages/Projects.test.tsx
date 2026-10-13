import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { projects } from '../data/projects'
import Projects from './Projects'

describe('Projects page', () => {
  it('renders a heading for every project in the data, plus Isolation AI', () => {
    render(<Projects />)

    for (const { title } of projects) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
    }
    expect(screen.getByRole('heading', { name: 'Isolation AI' })).toBeInTheDocument()
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
