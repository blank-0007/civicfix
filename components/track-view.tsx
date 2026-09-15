'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Building2, MapPin, Search, Sparkles, TicketX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SeverityBadge, StatusBadge } from '@/components/badges'
import { StatusTimeline } from '@/components/status-timeline'
import { useReports } from '@/lib/reports-store'
import type { Report } from '@/lib/types'

export function TrackView() {
  const params = useSearchParams()
  const { reports } = useReports()
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState<string | null>(null)

  useEffect(() => {
    const id = params.get('id')
    if (id) {
      setQuery(id)
      setSubmitted(id)
    }
  }, [params])

  const report: Report | undefined = submitted
    ? reports.find((r) => r.id.toLowerCase() === submitted.trim().toLowerCase())
    : undefined

  return (
    <div className="space-y-8">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setSubmitted(query)
        }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter tracking ID (e.g. CF-1040)"
            className="w-full rounded-lg border border-input bg-card py-3 pl-10 pr-3.5 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:ring-4 focus:ring-ring/15"
          />
        </div>
        <Button type="submit" className="h-12 px-6 text-sm font-semibold">
          Track report
        </Button>
      </form>

      {submitted && !report ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-card py-14 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <TicketX className="size-6" />
          </span>
          <p className="mt-4 font-semibold text-foreground">No report found</p>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            We couldn&apos;t find a report with ID &ldquo;{submitted}&rdquo;. Double-check
            the ID and try again.
          </p>
        </div>
      ) : null}

      {report ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="relative aspect-video">
              <Image
                src={report.imageUrl || '/placeholder.svg'}
                alt={report.issueType}
                fill
                sizes="500px"
                className="object-cover"
              />
              <div className="absolute left-3 top-3">
                <StatusBadge status={report.status} className="shadow-sm" />
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                  {report.id}
                </span>
                <SeverityBadge severity={report.severity} />
              </div>
              <h2 className="mt-3 text-lg font-semibold text-foreground">
                {report.issueType}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {report.description}
              </p>
              <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="size-4" />
                  {report.location}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="size-4" />
                  Handled by {report.department}
                </div>
              </dl>
              <div className="mt-4 rounded-lg border border-border bg-muted/40 p-3.5">
                <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <Sparkles className="size-3.5" />
                  AI assessment
                </p>
                <p className="text-sm leading-relaxed text-foreground">
                  {report.aiReasoning}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-base font-semibold text-foreground">
              Progress timeline
            </h3>
            <p className="mb-6 mt-0.5 text-sm text-muted-foreground">
              Track how your report moves toward resolution.
            </p>
            <StatusTimeline status={report.status} updates={report.updates} />
          </div>
        </div>
      ) : null}

      {!submitted ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-6 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Don&apos;t have an ID handy?</p>
          <p className="mt-1">
            Try a sample: {' '}
            <button
              type="button"
              className="font-semibold text-primary hover:underline"
              onClick={() => {
                setQuery('CF-1040')
                setSubmitted('CF-1040')
              }}
            >
              CF-1040
            </button>
          </p>
        </div>
      ) : null}
    </div>
  )
}
