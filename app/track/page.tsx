import { Suspense } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { TrackView } from '@/components/track-view'

export default function TrackPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="border-b border-border bg-muted/30">
          <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Track your report
            </h1>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Enter your tracking ID to see the latest status and updates.
            </p>
          </div>
        </div>
        <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
          <Suspense>
            <TrackView />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
