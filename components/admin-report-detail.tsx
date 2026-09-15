'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowLeft,
  Building2,
  Calendar,
  Check,
  MapPin,
  Send,
  Sparkles,
  StickyNote,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SeverityBadge, StatusBadge } from '@/components/badges'
import { StatusTimeline } from '@/components/status-timeline'
import { useToast } from '@/components/toaster'
import { useReports } from '@/lib/reports-store'
import { DEPARTMENTS, SEVERITIES } from '@/lib/mock-data'
import { STATUS_ORDER, type Department, type Severity, type Status } from '@/lib/types'
import { cn } from '@/lib/utils'

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export function AdminReportDetail({ id }: { id: string }) {
  const { getReport, setStatus, updateReport, addNote } = useReports()
  const { toast } = useToast()
  const report = getReport(id)
  const [note, setNote] = useState('')

  if (!report) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card py-16 text-center">
        <p className="font-semibold text-foreground">Report not found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          The report {id} doesn&apos;t exist.
        </p>
        <Button render={<Link href="/admin" />} variant="outline" className="mt-5 h-10">
          <ArrowLeft className="size-4" />
          Back to dashboard
        </Button>
      </div>
    )
  }

  function handleStatus(next: Status) {
    if (next === report!.status) return
    setStatus(report!.id, next)
    toast({
      variant: next === 'Resolved' ? 'success' : 'info',
      title: `Status updated to ${next}`,
      description: `${report!.id} is now marked ${next.toLowerCase()}.`,
    })
  }

  return (
    <div>
      <Link
        href="/admin"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to dashboard
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        {/* Left: issue detail */}
        <div className="space-y-6">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="relative aspect-video">
              <Image
                src={report.imageUrl || '/placeholder.svg'}
                alt={report.issueType}
                fill
                sizes="600px"
                priority
                className="object-cover"
              />
              <div className="absolute left-4 top-4 flex gap-2">
                <StatusBadge status={report.status} className="shadow-sm" />
                <SeverityBadge severity={report.severity} className="shadow-sm" />
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                  {report.id}
                </span>
              </div>
              <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
                {report.issueType}
              </h1>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {report.description}
              </p>
              <dl className="mt-5 grid gap-3 border-t border-border pt-5 text-sm sm:grid-cols-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="size-4 shrink-0" />
                  {report.location}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="size-4 shrink-0" />
                  {report.department}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="size-4 shrink-0" />
                  {formatDate(report.createdAt)}
                </div>
              </dl>

              <div className="mt-5 rounded-xl border border-primary/15 bg-primary/5 p-4">
                <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
                  <Sparkles className="size-3.5" />
                  AI assessment · {Math.round(report.confidence * 100)}% confidence
                </p>
                <p className="text-sm leading-relaxed text-foreground">
                  {report.aiReasoning}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-6 text-base font-semibold text-foreground">
              Activity timeline
            </h2>
            <StatusTimeline status={report.status} updates={report.updates} />
          </div>
        </div>

        {/* Right: controls */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-base font-semibold text-foreground">
                Update status
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Move this report through the resolution workflow.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {STATUS_ORDER.map((s) => {
                  const active = report.status === s
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleStatus(s)}
                      className={cn(
                        'flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2.5 text-sm font-medium transition-all',
                        active
                          ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                          : 'border-border bg-background text-foreground hover:border-primary/40 hover:bg-primary/5',
                      )}
                    >
                      {active ? <Check className="size-4" /> : null}
                      {s}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-base font-semibold text-foreground">
                Assignment
              </h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label
                    htmlFor="department"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    Department
                  </label>
                  <select
                    id="department"
                    value={report.department}
                    onChange={(e) => {
                      updateReport(report.id, {
                        department: e.target.value as Department,
                      })
                      toast({ variant: 'info', title: `Reassigned to ${e.target.value}` })
                    }}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-4 focus:ring-ring/15"
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="severity"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    Priority
                  </label>
                  <select
                    id="severity"
                    value={report.severity}
                    onChange={(e) => {
                      updateReport(report.id, {
                        severity: e.target.value as Severity,
                      })
                      toast({ variant: 'info', title: `Priority set to ${e.target.value}` })
                    }}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-4 focus:ring-ring/15"
                  >
                    {SEVERITIES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
                <StickyNote className="size-4 text-muted-foreground" />
                Internal notes
              </h2>
              {report.internalNotes.length > 0 ? (
                <ul className="mt-4 space-y-2">
                  {report.internalNotes.map((n, i) => (
                    <li
                      key={i}
                      className="rounded-lg bg-muted/50 p-3 text-sm text-foreground"
                    >
                      {n.note}
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {formatDate(n.at)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">
                  No internal notes yet.
                </p>
              )}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (!note.trim()) return
                  addNote(report.id, note.trim())
                  setNote('')
                  toast({ variant: 'success', title: 'Note added' })
                }}
                className="mt-4 flex gap-2"
              >
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a note for your team…"
                  className="flex-1 rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:ring-4 focus:ring-ring/15"
                />
                <Button type="submit" className="h-11 px-3" aria-label="Add note">
                  <Send className="size-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
