import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Home from './Home'

describe('Home page', () => {
  it('renders the profile header and professional summary', () => {
    render(<Home />)

    expect(screen.getByRole('heading', { name: 'Joel Tengco' })).toBeInTheDocument()
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument()
    expect(screen.getByText(/Software engineer with a passion towards devops/)).toBeInTheDocument()
  })

  it('renders all three employment history entries', () => {
    render(<Home />)

    expect(screen.getByText(/Senior Software Engineer — Intuit, Los Angeles, CA/)).toBeInTheDocument()
    expect(screen.getByText(/Software Engineer II — Intuit, Los Angeles/)).toBeInTheDocument()
    expect(screen.getByText(/Software Engineer — Orange Logic, Irvine/)).toBeInTheDocument()
  })

  it('renders the skills list', () => {
    render(<Home />)

    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('CloudFormation')).toBeInTheDocument()
  })

  it('renders the recognition section', () => {
    render(<Home />)

    expect(screen.getAllByText("President's Honor List").length).toBeGreaterThan(0)
    expect(screen.getAllByText('Graduation with Highest Honors').length).toBeGreaterThan(0)
  })
})
