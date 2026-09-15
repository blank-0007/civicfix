'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowUpRight, Building2, Search } from 'lucide-react'
import { SeverityBadge, StatusBadge } from '@/components/badges'
import { useReports } from '@/lib/reports-store'
import { STATUS_ORDER, type Status } from '@/lib/types'
import { cn } from '@/lib/utils'

const FILTERS: (Status | 'All')[] = ['All', ...STATUS_ORDER]

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.round(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.round(hrs / 24)
  return `${days}d ago`
}

export function AdminDashboard() {
  const { reports } = useReports()
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return reports.filter((r) => {
      const matchesFilter = filter === 'All' || r.status === filter
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        r.id.toLowerCase().includes(q) ||
        r.issueType.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q)
      return matchesFilter && matchesQuery
    })
  }, [reports, filter, query])

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => {
            const count =
              f === 'All'
                ? reports.length
                : reports.filter((r) => r.status === f).length
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                  filter === f
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                {f}
                <span
                  className={cn(
                    'rounded px-1.5 text-xs',
                    filter === f
                      ? 'bg-primary-foreground/20'
                      : 'bg-muted-foreground/10',
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
        <div className="relative sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reports…"
            className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:ring-4 focus:ring-ring/15"
          />
        </div>
      </div>

      {/* Table (md+) */}
      <div className="hidden md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-3 font-medium">Issue</th>
              <th className="px-4 py-3 font-medium">Severity</th>
              <th className="px-4 py-3 font-medium">Department</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Reported</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr
                key={r.id}
                className="group border-b border-border/60 transition-colors last:border-0 hover:bg-muted/40"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative size-11 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={r.imageUrl || '/placeholder.svg'}
                        alt={r.issueType}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground">
                        {r.issueType}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {r.id} · {r.location}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <SeverityBadge severity={r.severity} />
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <Building2 className="size-3.5" />
                    {r.department}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={r.status} />
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {timeAgo(r.createdAt)}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/${r.id}`}
                    className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm font-medium text-primary opacity-0 transition-opacity hover:bg-primary/10 group-hover:opacity-100 focus:opacity-100"
                  >
                    Manage
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards (mobile) */}
      <div className="divide-y divide-border md:hidden">
        {filtered.map((r) => (
          <Link
            key={r.id}
            href={`/admin/${r.id}`}
            className="flex items-center gap-3 p-4 transition-colors hover:bg-muted/40"
          >
            <div className="relative size-14 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={r.imageUrl || '/placeholder.svg'}
                alt={r.issueType}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate font-semibold text-foreground">
                  {r.issueType}
                </p>
                <SeverityBadge severity={r.severity} />
              </div>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                {r.id} · {r.location}
              </p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <StatusBadge status={r.status} />
                <span className="text-xs text-muted-foreground">
                  {timeAgo(r.createdAt)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="py-16 text-center text-sm text-muted-foreground">
          No reports match your filters.
        </div>
      ) : null}
    </div>
  )
}
