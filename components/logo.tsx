import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm',
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-[60%]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 4.87 6.16 11.28 6.42 11.55a.8.8 0 0 0 1.16 0C12.84 20.28 19 13.87 19 9c0-3.87-3.13-7-7-7Z"
          fill="currentColor"
          opacity="0.25"
        />
        <path
          d="M12 12.5c2.2 0 3.8-1.3 4.5-3.5-2.2 0-3.8 1-4.5 2.4C11.3 10 9.7 9 7.5 9c.7 2.2 2.3 3.5 4.5 3.5Z"
          fill="currentColor"
        />
        <circle cx="12" cy="12.2" r="1.1" fill="currentColor" />
      </svg>
    </span>
  )
}

export function Logo({
  className,
  markClassName,
  compact = false,
}: {
  className?: string
  markClassName?: string
  compact?: boolean
}) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <LogoMark className={cn('size-9', markClassName)} />
      {!compact ? (
        <span className="text-lg font-bold tracking-tight text-foreground">
          Civic<span className="text-primary">Fix</span>
        </span>
      ) : null}
    </span>
  )
}
