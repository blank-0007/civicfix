import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Building2,
  Camera,
  Gauge,
  LayoutDashboard,
  MapPin,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { StatCards } from '@/components/stat-cards'

const STEPS = [
  {
    icon: Camera,
    title: 'Snap & describe',
    body: 'A citizen photographs a problem — garbage, a pothole, a broken light — and adds a quick note.',
  },
  {
    icon: Sparkles,
    title: 'AI analyzes instantly',
    body: 'Our model classifies the issue, gauges severity, and routes it to the correct department.',
  },
  {
    icon: LayoutDashboard,
    title: 'City acts & resolves',
    body: 'Admins see every report on a live dashboard, update status, and close the loop with citizens.',
  },
]

const CATEGORIES = [
  { label: 'Garbage', img: '/images/report-garbage.png', dept: 'Sanitation' },
  { label: 'Potholes', img: '/images/report-pothole.png', dept: 'Roads' },
  { label: 'Streetlights', img: '/images/report-streetlight.png', dept: 'Electrical' },
  { label: 'Water leaks', img: '/images/report-water.png', dept: 'Water Supply' },
]

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/images/hero-city.png"
              alt=""
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
          </div>

          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <Sparkles className="size-3.5" />
                AI-powered civic reporting
              </span>
              <h1 className="mt-5 text-pretty text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Cleaner cities.{' '}
                <span className="text-primary">Healthier communities.</span>
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                Report a civic issue in seconds. AI instantly classifies it,
                assesses severity, and routes it to the right department — so
                problems get fixed faster.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  render={<Link href="/report" />}
                  className="h-12 px-6 text-base font-semibold"
                >
                  <Camera className="size-5" />
                  Report an Issue
                  <ArrowRight className="size-5" />
                </Button>
                <Button
                  render={<Link href="/admin" />}
                  variant="outline"
                  className="h-12 bg-background/60 px-6 text-base font-semibold backdrop-blur"
                >
                  <LayoutDashboard className="size-5" />
                  View Admin Dashboard
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Live stats */}
        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="-mt-8 rounded-2xl border border-border bg-card/60 p-4 shadow-sm backdrop-blur sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-success" />
              </span>
              <p className="text-sm font-medium text-muted-foreground">
                Live city activity
              </p>
            </div>
            <StatCards />
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How CivicFix works
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              From a single photo to a resolved issue — in three simple steps.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className="relative rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <span className="absolute -top-3 right-6 text-6xl font-bold text-muted/60">
                  {i + 1}
                </span>
                <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <step.icon className="size-6" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="border-y border-border bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div className="max-w-xl">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Report almost anything
                </h2>
                <p className="mt-3 text-lg text-muted-foreground">
                  CivicFix understands the most common civic issues and routes
                  each to the department that can fix it.
                </p>
              </div>
              <Button
                render={<Link href="/report" />}
                variant="outline"
                className="h-11 px-5 font-semibold"
              >
                Start a report
                <ArrowRight className="size-4" />
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {CATEGORIES.map((c) => (
                <div
                  key={c.label}
                  className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={c.img || '/placeholder.svg'}
                      alt={c.label}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 p-4">
                    <span className="font-semibold text-foreground">
                      {c.label}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Building2 className="size-3.5" />
                      {c.dept}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature strip */}
        <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: 'Instant AI triage',
                body: 'No forms to fill out. AI reads the photo and description and does the classification for you.',
              },
              {
                icon: Gauge,
                title: 'Severity-aware',
                body: 'Urgent, safety-critical issues are flagged high priority so cities act on them first.',
              },
              {
                icon: MapPin,
                title: 'Right department, first time',
                body: 'Every report is routed automatically — no more issues lost between departments.',
              },
            ].map((f) => (
              <div key={f.title} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {f.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center shadow-lg sm:px-12">
            <div className="absolute inset-0 opacity-10">
              <Image src="/images/hero-city.png" alt="" fill className="object-cover" />
            </div>
            <div className="relative">
              <h2 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                See a problem? Report it now.
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-pretty text-primary-foreground/80">
                It takes less than a minute. Your report goes straight to the
                people who can fix it.
              </p>
              <Button
                render={<Link href="/report" />}
                variant="secondary"
                className="mt-8 h-12 px-7 text-base font-semibold"
              >
                <Camera className="size-5" />
                Report an Issue
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
