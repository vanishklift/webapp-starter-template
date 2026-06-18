import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TaskList } from './task-list'

describe('TaskList', () => {
  it('renders tasks and completion summary', () => {
    render(
      <TaskList
        tasks={[
          { _id: '1', text: 'Write docs', isCompleted: true },
          { _id: '2', text: 'Ship feature', isCompleted: false },
        ]}
      />,
    )

    expect(screen.getByText('Tasks from Convex')).toBeInTheDocument()
    expect(screen.getByText('1 of 2 tasks completed.')).toBeInTheDocument()
    expect(screen.getByText('Write docs')).toBeInTheDocument()
    expect(screen.getByText('Ship feature')).toBeInTheDocument()
    expect(screen.getByText('Done')).toBeInTheDocument()
  })

  it('renders empty-state guidance when there are no tasks', () => {
    render(<TaskList tasks={[]} />)

    expect(
      screen.getByText('No tasks yet. Import sample data to get started.'),
    ).toBeInTheDocument()
    expect(screen.getByText(/convex import/)).toBeInTheDocument()
  })
})
