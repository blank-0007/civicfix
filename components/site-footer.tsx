import Link from 'next/link'
import { Logo } from '@/components/logo'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground">
            AI-powered civic issue reporting for cleaner, healthier communities.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/report" className="text-muted-foreground hover:text-foreground">
            Report an Issue
          </Link>
          <Link href="/track" className="text-muted-foreground hover:text-foreground">
            Track Report
          </Link>
          <Link href="/admin" className="text-muted-foreground hover:text-foreground">
            Admin Dashboard
          </Link>
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto w-full max-w-6xl px-4 py-4 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} CivicFix · Built for First Summit Hackathon
        </p>
      </div>
    </footer>
  )
}
