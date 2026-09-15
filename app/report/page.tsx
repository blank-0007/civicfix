import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ReportFlow } from '@/components/report-flow'

export default function ReportPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="border-b border-border bg-muted/30">
          <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Report an issue
            </h1>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Add a photo and a short description. Our AI will classify the
              issue and route it to the right city department.
            </p>
          </div>
        </div>
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
          <ReportFlow />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
