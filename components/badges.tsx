import { cn } from '@/lib/utils'
import type { Severity, Status } from '@/lib/types'

const SEVERITY_STYLES: Record<Severity, string> = {
  Low: 'bg-success/10 text-success ring-success/20',
  Medium: 'bg-warning/15 text-warning-foreground ring-warning/30',
  High: 'bg-danger/10 text-danger ring-danger/20',
}

export function SeverityBadge({
  severity,
  className,
}: {
  severity: Severity
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset',
        SEVERITY_STYLES[severity],
        className,
      )}
    >
      <span
        className={cn(
          'size-1.5 rounded-full',
          severity === 'Low' && 'bg-success',
          severity === 'Medium' && 'bg-warning',
          severity === 'High' && 'bg-danger',
        )}
      />
      {severity}
    </span>
  )
}

const STATUS_STYLES: Record<Status, string> = {
  Reported: 'bg-muted text-muted-foreground ring-border',
  Assigned: 'bg-primary/10 text-primary ring-primary/20',
  'In Progress': 'bg-warning/15 text-warning-foreground ring-warning/30',
  Resolved: 'bg-success/10 text-success ring-success/20',
}

export function StatusBadge({
  status,
  className,
}: {
  status: Status
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset',
        STATUS_STYLES[status],
        className,
      )}
    >
      {status}
    </span>
  )
}
