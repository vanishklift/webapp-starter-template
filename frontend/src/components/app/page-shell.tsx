import { Badge } from '@/components/ui/badge'

type PageShellProps = {
  badge?: string
  title: string
  description: string
  children: React.ReactNode
}

export function PageShell({
  badge = 'Workbench Starter',
  title,
  description,
  children,
}: PageShellProps) {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col gap-8 p-8">
      <header className="space-y-2">
        <Badge variant="secondary">{badge}</Badge>
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        <p className="text-lg text-muted-foreground">{description}</p>
      </header>
      {children}
    </div>
  )
}
