import { convexQuery } from '@convex-dev/react-query'
import { useSuspenseQuery } from '@tanstack/react-query'

import { api } from '@convex/_generated/api'

export function useTasks() {
  return useSuspenseQuery(convexQuery(api.tasks.list, {}))
}
