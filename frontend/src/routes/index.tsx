import { createFileRoute } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'

import { PageShell } from '@/components/app/page-shell'
import { Separator } from '@/components/ui/separator'
import { TaskList } from '@/features/tasks/components/task-list'
import { useTasks } from '@/features/tasks/hooks/use-tasks'

export const Route = createFileRoute('/')({
  component: Home,
  pendingComponent: TaskListLoading,
})

function TaskListLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="size-6 animate-spin text-muted-foreground" />
      <span className="ml-2 text-muted-foreground">
        Loading tasks from Convex...
      </span>
    </div>
  )
}

function Home() {
  const { data: tasks } = useTasks()

  return (
    <PageShell
      title="Workbench"
      description="TanStack Start frontend + Convex backend with shadcn/ui."
    >
      <Separator />
      <TaskList tasks={tasks} />
    </PageShell>
  )
}
