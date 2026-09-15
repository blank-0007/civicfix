'use client'

import { AlertTriangle, CheckCircle2, ClipboardList, Loader2 } from 'lucide-react'
import { useReports } from '@/lib/reports-store'
import { cn } from '@/lib/utils'

export function StatCards({ className }: { className?: string }) {
  const { reports } = useReports()

  const total = reports.length
  const high = reports.filter((r) => r.severity === 'High').length
  const inProgress = reports.filter(
    (r) => r.status === 'In Progress' || r.status === 'Assigned',
  ).length
  const resolved = reports.filter((r) => r.status === 'Resolved').length

  const stats = [
    {
      label: 'Total reports',
      value: total,
      icon: ClipboardList,
      tint: 'bg-primary/10 text-primary',
    },
    {
      label: 'High priority',
      value: high,
      icon: AlertTriangle,
      tint: 'bg-danger/10 text-danger',
    },
    {
      label: 'In progress',
      value: inProgress,
      icon: Loader2,
      tint: 'bg-warning/15 text-warning-foreground',
    },
    {
      label: 'Resolved',
      value: resolved,
      icon: CheckCircle2,
      tint: 'bg-success/10 text-success',
    },
  ]

  return (
    <div className={cn('grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4', className)}>
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5"
        >
          <div className="flex items-center justify-between">
            <span className={cn('flex size-9 items-center justify-center rounded-lg', s.tint)}>
              <s.icon className="size-4.5" />
            </span>
          </div>
          <p className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {s.value}
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>
  )
}
