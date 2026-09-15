'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  ArrowRight,
  Building2,
  Camera,
  CheckCircle2,
  Copy,
  Gauge,
  ListChecks,
  MapPin,
  Search,
  Sparkles,
  Tag,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SeverityBadge } from '@/components/badges'
import { useToast } from '@/components/toaster'
import { analyzeIssue } from '@/lib/ai'
import { useReports } from '@/lib/reports-store'
import { cn } from '@/lib/utils'
import type { AiAnalysis, IssueCategory, Report } from '@/lib/types'

type Step = 'form' | 'analyzing' | 'analyzed' | 'done'

const SAMPLE_PHOTOS: {
  src: string
  label: string
  category: IssueCategory
}[] = [
  { src: '/images/report-garbage.png', label: 'Garbage', category: 'Garbage Accumulation' },
  { src: '/images/report-pothole.png', label: 'Pothole', category: 'Pothole' },
  { src: '/images/report-streetlight.png', label: 'Streetlight', category: 'Broken Streetlight' },
  { src: '/images/report-water.png', label: 'Water leak', category: 'Water Leakage' },
  { src: '/images/report-road.png', label: 'Damaged road', category: 'Damaged Road' },
]

const SCAN_STEPS = [
  'Detecting objects in image…',
  'Classifying issue type…',
  'Assessing severity & public-safety risk…',
  'Routing to the right department…',
]

const SAMPLE = {
  photoIndex: 0,
  description:
    'Garbage has been piling up next to the community bin for over a week. It is overflowing onto the footpath, smells terrible, and stray animals are scattering it around. Kids walk past here to school every day.',
  location: 'Shastri Nagar, Jaipur, Rajasthan',
}

export function ReportFlow() {
  const router = useRouter()
  const { toast } = useToast()
  const { addReport } = useReports()

  const [step, setStep] = useState<Step>('form')
  const [photoIndex, setPhotoIndex] = useState<number | null>(null)
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [scanIndex, setScanIndex] = useState(0)
  const [analysis, setAnalysis] = useState<AiAnalysis | null>(null)
  const [created, setCreated] = useState<Report | null>(null)

  const photo = photoIndex !== null ? SAMPLE_PHOTOS[photoIndex] : null
  const canAnalyze = photo !== null && description.trim().length >= 10 && location.trim().length >= 3

  function fillSample() {
    setPhotoIndex(SAMPLE.photoIndex)
    setDescription(SAMPLE.description)
    setLocation(SAMPLE.location)
  }

  function runAnalysis() {
    if (!canAnalyze || !photo) return
    setStep('analyzing')
    setScanIndex(0)

    let i = 0
    const interval = setInterval(() => {
      i += 1
      if (i < SCAN_STEPS.length) {
        setScanIndex(i)
      }
    }, 620)

    setTimeout(() => {
      clearInterval(interval)
      const result = analyzeIssue(description, photo.category)
      setAnalysis(result)
      setStep('analyzed')
    }, 2600)
  }

  function submitReport() {
    if (!analysis || !photo) return
    const report = addReport({
      description,
      location,
      imageUrl: photo.src,
      analysis,
    })
    setCreated(report)
    setStep('done')
    toast({
      variant: 'success',
      title: `Report ${report.id} submitted`,
      description: 'Your issue is now visible to the city admin team.',
    })
  }

  if (step === 'done' && created) {
    return <SuccessPanel report={created} />
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
      {/* Left: form */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Describe the issue
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Add a photo, a short description, and the location.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 shrink-0"
            onClick={fillSample}
            disabled={step === 'analyzing'}
          >
            <Sparkles className="size-3.5" />
            Use sample
          </Button>
        </div>

        {/* Photo picker */}
        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
          <Camera className="size-4 text-muted-foreground" />
          Photo of the issue
        </label>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {SAMPLE_PHOTOS.map((p, i) => {
            const selected = photoIndex === i
            return (
              <button
                key={p.src}
                type="button"
                onClick={() => setPhotoIndex(i)}
                disabled={step === 'analyzing'}
                className={cn(
                  'group relative aspect-square overflow-hidden rounded-lg ring-2 ring-inset transition-all',
                  selected
                    ? 'ring-primary'
                    : 'ring-transparent hover:ring-border',
                )}
                aria-pressed={selected}
              >
                <Image
                  src={p.src || '/placeholder.svg'}
                  alt={p.label}
                  fill
                  sizes="120px"
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <span
                  className={cn(
                    'absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/70 to-transparent px-1.5 pb-1 pt-3 text-left text-[10px] font-medium text-white',
                  )}
                >
                  {p.label}
                </span>
                {selected ? (
                  <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <CheckCircle2 className="size-3" />
                  </span>
                ) : null}
              </button>
            )
          })}
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">
          Pick a sample photo to simulate a camera upload.
        </p>

        {/* Description */}
        <div className="mt-5">
          <label
            htmlFor="description"
            className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground"
          >
            <Tag className="size-4 text-muted-foreground" />
            What&apos;s wrong?
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={step === 'analyzing'}
            rows={5}
            placeholder="e.g. Overflowing garbage bin blocking the footpath near the school…"
            className="w-full resize-none rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:ring-4 focus:ring-ring/15"
          />
        </div>

        {/* Location */}
        <div className="mt-4">
          <label
            htmlFor="location"
            className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground"
          >
            <MapPin className="size-4 text-muted-foreground" />
            Location
          </label>
          <input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={step === 'analyzing'}
            placeholder="Street, area, city"
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:ring-4 focus:ring-ring/15"
          />
        </div>

        <Button
          type="button"
          onClick={runAnalysis}
          disabled={!canAnalyze || step === 'analyzing'}
          className="mt-6 h-11 w-full text-sm font-semibold"
        >
          {step === 'analyzing' ? (
            'Analyzing…'
          ) : (
            <>
              <Sparkles className="size-4" />
              Analyze with AI
            </>
          )}
        </Button>
        {!canAnalyze ? (
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Add a photo, at least a short description, and a location to continue.
          </p>
        ) : null}
      </div>

      {/* Right: AI panel */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <AiPanel
          step={step}
          photo={photo}
          scanIndex={scanIndex}
          analysis={analysis}
          onSubmit={submitReport}
        />
      </div>
    </div>
  )
}

function AiPanel({
  step,
  photo,
  scanIndex,
  analysis,
  onSubmit,
}: {
  step: Step
  photo: { src: string; label: string } | null
  scanIndex: number
  analysis: AiAnalysis | null
  onSubmit: () => void
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-2 border-b border-border bg-gradient-to-r from-primary/5 to-transparent px-5 py-3.5">
        <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Sparkles className="size-4" />
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">AI Analysis</p>
          <p className="text-xs text-muted-foreground">
            Automatic classification & routing
          </p>
        </div>
      </div>

      <div className="p-5">
        {step === 'form' ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
              <Search className="size-6" />
            </span>
            <p className="mt-4 text-sm font-medium text-foreground">
              Waiting for your report
            </p>
            <p className="mt-1 max-w-[220px] text-sm text-muted-foreground">
              Once you analyze, AI will classify the issue and route it to the
              right department.
            </p>
          </div>
        ) : null}

        {step === 'analyzing' && photo ? (
          <div>
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <Image
                src={photo.src || '/placeholder.svg'}
                alt="Issue being analyzed"
                fill
                sizes="400px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/10" />
              <div className="scan-line absolute inset-x-0 h-1/3 bg-gradient-to-b from-primary/40 via-primary/10 to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-primary/40" />
            </div>
            <div className="mt-5 space-y-2.5">
              {SCAN_STEPS.map((s, i) => {
                const active = i === scanIndex
                const done = i < scanIndex
                return (
                  <div
                    key={s}
                    className={cn(
                      'flex items-center gap-2.5 text-sm transition-opacity',
                      done || active ? 'opacity-100' : 'opacity-40',
                    )}
                  >
                    {done ? (
                      <CheckCircle2 className="size-4 shrink-0 text-success" />
                    ) : active ? (
                      <span className="size-4 shrink-0 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    ) : (
                      <span className="size-4 shrink-0 rounded-full border-2 border-muted" />
                    )}
                    <span
                      className={cn(
                        done || active
                          ? 'text-foreground'
                          : 'text-muted-foreground',
                      )}
                    >
                      {s}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        ) : null}

        {step === 'analyzed' && analysis ? (
          <div className="animate-in fade-in slide-in-from-bottom-2">
            <div className="mb-4 flex items-center justify-between rounded-lg bg-success/10 px-3 py-2 text-sm font-medium text-success">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4" />
                Analysis complete
              </span>
              <span className="text-xs font-semibold">
                {Math.round(analysis.confidence * 100)}% confidence
              </span>
            </div>

            <dl className="space-y-3">
              <ResultRow icon={Tag} label="Issue type">
                <span className="font-semibold text-foreground">
                  {analysis.issueType}
                </span>
              </ResultRow>
              <ResultRow icon={Gauge} label="Severity">
                <SeverityBadge severity={analysis.severity} />
              </ResultRow>
              <ResultRow icon={Building2} label="Routed to">
                <span className="font-semibold text-foreground">
                  {analysis.department}
                </span>
              </ResultRow>
            </dl>

            <div className="mt-4 rounded-lg border border-border bg-muted/40 p-3.5">
              <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <ListChecks className="size-3.5" />
                AI reasoning
              </p>
              <p className="text-sm leading-relaxed text-foreground">
                {analysis.reasoning}
              </p>
            </div>

            <Button
              type="button"
              onClick={onSubmit}
              className="mt-5 h-11 w-full text-sm font-semibold"
            >
              Submit report
              <ArrowRight className="size-4" />
            </Button>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              You can review the classification before submitting.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function ResultRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0">
      <dt className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="size-4" />
        {label}
      </dt>
      <dd>{children}</dd>
    </div>
  )
}

function SuccessPanel({ report }: { report: Report }) {
  const { toast } = useToast()

  return (
    <div className="mx-auto max-w-xl">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex flex-col items-center border-b border-border bg-gradient-to-b from-success/10 to-transparent px-6 py-10 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-success text-success-foreground shadow-lg shadow-success/20 animate-in zoom-in">
            <CheckCircle2 className="size-8" />
          </span>
          <h2 className="mt-5 text-2xl font-bold text-foreground">
            Report submitted
          </h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Thanks for helping improve your city. Your report has been logged and
            routed to the {report.department} department.
          </p>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between rounded-xl border border-dashed border-primary/30 bg-primary/5 px-4 py-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Your tracking ID
              </p>
              <p className="text-lg font-bold tracking-tight text-primary">
                {report.id}
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-9"
              onClick={() => {
                navigator.clipboard?.writeText(report.id)
                toast({ variant: 'info', title: 'Tracking ID copied' })
              }}
            >
              <Copy className="size-3.5" />
              Copy
            </Button>
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg bg-muted/50 p-3">
              <dt className="text-xs text-muted-foreground">Issue</dt>
              <dd className="mt-0.5 font-semibold text-foreground">
                {report.issueType}
              </dd>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <dt className="text-xs text-muted-foreground">Severity</dt>
              <dd className="mt-1">
                <SeverityBadge severity={report.severity} />
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Button
              render={<Link href={`/track?id=${report.id}`} />}
              className="h-11 flex-1 text-sm font-semibold"
            >
              Track this report
              <ArrowRight className="size-4" />
            </Button>
            <Button
              render={<Link href="/report" />}
              variant="outline"
              className="h-11 flex-1 text-sm font-semibold"
              onClick={() => window.location.reload()}
            >
              Report another
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
