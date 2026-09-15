import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { StatCards } from '@/components/stat-cards'
import { AdminDashboard } from '@/components/admin-dashboard'

export default function AdminPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1 bg-muted/20">
        <div className="border-b border-border bg-card">
          <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                City Admin
              </span>
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              <span className="text-xs text-muted-foreground">Live</span>
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
              Issue Dashboard
            </h1>
            <p className="mt-1 text-muted-foreground">
              Monitor incoming civic reports and manage their resolution.
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
          <StatCards />
          <div className="mt-8">
            <AdminDashboard />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
