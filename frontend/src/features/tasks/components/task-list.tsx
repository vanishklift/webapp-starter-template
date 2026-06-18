import { CheckCircle2, Circle } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export type Task = {
  _id: string
  text: string
  isCompleted: boolean
}

type TaskListProps = {
  tasks: Task[]
}

export function TaskList({ tasks }: TaskListProps) {
  const completedCount = tasks.filter((task) => task.isCompleted).length

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks from Convex</CardTitle>
        <CardDescription>
          {tasks.length === 0
            ? 'No tasks yet. Import sample data to get started.'
            : `${completedCount} of ${tasks.length} tasks completed.`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Run{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              npm --prefix backend exec convex import --table tasks
              backend/sampleData.jsonl
            </code>{' '}
            from the repo root.
          </p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="flex items-center gap-3 rounded-lg border px-4 py-3"
              >
                {task.isCompleted ? (
                  <CheckCircle2 className="size-5 shrink-0 text-primary" />
                ) : (
                  <Circle className="size-5 shrink-0 text-muted-foreground" />
                )}
                <span
                  className={
                    task.isCompleted
                      ? 'text-muted-foreground line-through'
                      : undefined
                  }
                >
                  {task.text}
                </span>
                {task.isCompleted && (
                  <Badge variant="outline" className="ml-auto">
                    Done
                  </Badge>
                )}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
