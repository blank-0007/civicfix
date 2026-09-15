import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { STATUS_ORDER, type ReportUpdate, type Status } from '@/lib/types'

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function StatusTimeline({
  status,
  updates,
}: {
  status: Status
  updates: ReportUpdate[]
}) {
  const currentIndex = STATUS_ORDER.indexOf(status)
  const lastUpdateFor = (s: Status) =>
    [...updates].reverse().find((u) => u.status === s)

  return (
    <ol className="relative space-y-6">
      {STATUS_ORDER.map((step, i) => {
        const done = i < currentIndex
        const active = i === currentIndex
        const update = lastUpdateFor(step)
        return (
          <li key={step} className="relative flex gap-4">
            {i < STATUS_ORDER.length - 1 ? (
              <span
                className={cn(
                  'absolute left-[15px] top-8 h-[calc(100%-8px)] w-0.5',
                  done ? 'bg-primary' : 'bg-border',
                )}
                aria-hidden="true"
              />
            ) : null}
            <span
              className={cn(
                'z-10 flex size-8 shrink-0 items-center justify-center rounded-full ring-4 ring-background transition-colors',
                done && 'bg-primary text-primary-foreground',
                active && 'bg-primary text-primary-foreground animate-pulse',
                !done && !active && 'bg-muted text-muted-foreground',
              )}
            >
              {done ? (
                <Check className="size-4" />
              ) : (
                <span className="size-2 rounded-full bg-current" />
              )}
            </span>
            <div className="flex-1 pb-1">
              <p
                className={cn(
                  'text-sm font-semibold',
                  done || active ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {step}
              </p>
              {update ? (
                <>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {update.note}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground/70">
                    {formatWhen(update.at)}
                  </p>
                </>
              ) : (
                <p className="mt-0.5 text-sm text-muted-foreground/60">
                  Pending
                </p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
