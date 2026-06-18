import { QueryClient } from '@tanstack/react-query'
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { ConvexQueryClient } from '@convex-dev/react-query'
import { ConvexProvider } from 'convex/react'
import { routeTree } from './routeTree.gen'

function getConvexUrl(): string {
  const convexUrl = import.meta.env.VITE_CONVEX_URL

  if (!convexUrl) {
    const message =
      'VITE_CONVEX_URL is not set. Run `npm run dev:backend`, copy the deployment URL into frontend/.env.local, then restart the frontend dev server.'

    if (import.meta.env.DEV) {
      throw new Error(message)
    }

    console.warn(message)
    return ''
  }

  return convexUrl
}

export function getRouter() {
  const convexQueryClient = new ConvexQueryClient(getConvexUrl())
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryKeyHashFn: convexQueryClient.hashFn(),
        queryFn: convexQueryClient.queryFn(),
      },
    },
  })

  convexQueryClient.connect(queryClient)

  const router = createTanStackRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    Wrap: ({ children }) => (
      <ConvexProvider client={convexQueryClient.convexClient}>
        {children}
      </ConvexProvider>
    ),
  })

  setupRouterSsrQueryIntegration({ router, queryClient })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
