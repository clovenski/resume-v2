import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ProjectCard from './ProjectCard'
import type { Project } from '../data/projects'

const baseProject: Project = {
  title: 'Sample Project',
  period: '2026',
  learningOutcomes: ['Testing'],
  description: 'A sample project for testing.',
}

describe('ProjectCard', () => {
  it('renders a "Watch full demo" link when videoUrl is set', () => {
    render(<ProjectCard project={{ ...baseProject, videoUrl: 'https://youtube.com/watch?v=abc123' }} />)

    expect(screen.getByRole('link', { name: /watch full demo/i })).toHaveAttribute(
      'href',
      'https://youtube.com/watch?v=abc123',
    )
  })

  it('does not render a "Watch full demo" link when videoUrl is absent', () => {
    render(<ProjectCard project={baseProject} />)

    expect(screen.queryByRole('link', { name: /watch full demo/i })).not.toBeInTheDocument()
  })
})
