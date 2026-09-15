'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { INITIAL_REPORTS } from './mock-data'
import type { NewReportInput, Report, Status } from './types'

interface ReportsContextValue {
  reports: Report[]
  getReport: (id: string) => Report | undefined
  addReport: (input: NewReportInput) => Report
  updateReport: (id: string, patch: Partial<Report>) => void
  setStatus: (id: string, status: Status, note?: string) => void
  addNote: (id: string, note: string) => void
}

const ReportsContext = createContext<ReportsContextValue | null>(null)

function nextId(reports: Report[]): string {
  const max = reports.reduce((acc, r) => {
    const n = Number.parseInt(r.id.replace('CF-', ''), 10)
    return Number.isNaN(n) ? acc : Math.max(acc, n)
  }, 1041)
  return `CF-${max + 1}`
}

export function ReportsProvider({ children }: { children: React.ReactNode }) {
  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS)

  const getReport = useCallback(
    (id: string) => reports.find((r) => r.id.toLowerCase() === id.toLowerCase()),
    [reports],
  )

  const addReport = useCallback((input: NewReportInput) => {
    const now = new Date().toISOString()
    let created: Report
    setReports((prev) => {
      const id = nextId(prev)
      created = {
        id,
        issueType: input.analysis.issueType,
        severity: input.analysis.severity,
        department: input.analysis.department,
        description: input.description,
        location: input.location,
        imageUrl: input.imageUrl,
        status: 'Reported',
        createdAt: now,
        updatedAt: now,
        aiReasoning: input.analysis.reasoning,
        confidence: input.analysis.confidence,
        updates: [
          { status: 'Reported', note: 'Report received from citizen.', at: now },
        ],
        internalNotes: [],
      }
      return [created, ...prev]
    })
    // created is assigned synchronously inside the updater above
    return created!
  }, [])

  const updateReport = useCallback((id: string, patch: Partial<Report>) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, ...patch, updatedAt: new Date().toISOString() }
          : r,
      ),
    )
  }, [])

  const setStatus = useCallback((id: string, status: Status, note?: string) => {
    const now = new Date().toISOString()
    setReports((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r
        const update = {
          status,
          note: note || `Status changed to ${status}.`,
          at: now,
        }
        return {
          ...r,
          status,
          updatedAt: now,
          updates: [...r.updates, update],
        }
      }),
    )
  }, [])

  const addNote = useCallback((id: string, note: string) => {
    const now = new Date().toISOString()
    setReports((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, internalNotes: [...r.internalNotes, { note, at: now }] }
          : r,
      ),
    )
  }, [])

  const value = useMemo(
    () => ({ reports, getReport, addReport, updateReport, setStatus, addNote }),
    [reports, getReport, addReport, updateReport, setStatus, addNote],
  )

  return (
    <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>
  )
}

export function useReports() {
  const ctx = useContext(ReportsContext)
  if (!ctx) throw new Error('useReports must be used within ReportsProvider')
  return ctx
}
