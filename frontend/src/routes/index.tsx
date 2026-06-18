import { convexQuery } from '@convex-dev/react-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { api } from '../../../backend/convex/_generated/api'

export const Route = createFileRoute('/')({
  component: Home,
  pendingComponent: () => (
    <div className="p-8 text-gray-500">Loading tasks from Convex...</div>
  ),
})

function Home() {
  const { data: tasks } = useSuspenseQuery(convexQuery(api.tasks.list, {}))

  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="text-4xl font-bold">Workbench</h1>
      <p className="mt-2 text-lg text-gray-600">
        TanStack Start frontend + Convex backend starter.
      </p>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Tasks from Convex</h2>
        {tasks.length === 0 ? (
          <p className="mt-4 text-gray-500">
            No tasks yet. Import sample data with{' '}
            <code className="rounded bg-gray-100 px-1">
              npx convex import --table tasks backend/sampleData.jsonl
            </code>
          </p>
        ) : (
          <ul className="mt-4 space-y-2">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="flex items-center gap-2 rounded border border-gray-200 px-3 py-2"
              >
                <span
                  className={
                    task.isCompleted ? 'text-green-600' : 'text-gray-400'
                  }
                >
                  {task.isCompleted ? '✓' : '○'}
                </span>
                <span>{task.text}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
