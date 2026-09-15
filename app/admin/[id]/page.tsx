import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { AdminReportDetail } from '@/components/admin-report-detail'

export default async function AdminReportPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1 bg-muted/20">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
          <AdminReportDetail id={id} />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
