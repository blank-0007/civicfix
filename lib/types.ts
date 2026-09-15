export type Severity = 'Low' | 'Medium' | 'High'

export type Status = 'Reported' | 'Assigned' | 'In Progress' | 'Resolved'

export const STATUS_ORDER: Status[] = [
  'Reported',
  'Assigned',
  'In Progress',
  'Resolved',
]

export type Department =
  | 'Sanitation'
  | 'Roads'
  | 'Electrical'
  | 'Water Supply'
  | 'Parks & Recreation'

export type IssueCategory =
  | 'Garbage Accumulation'
  | 'Pothole'
  | 'Broken Streetlight'
  | 'Water Leakage'
  | 'Damaged Road'
  | 'Illegal Dumping'
  | 'Other'

export interface AiAnalysis {
  issueType: IssueCategory
  severity: Severity
  department: Department
  reasoning: string
  confidence: number
}

export interface ReportUpdate {
  status: Status
  note: string
  at: string
}

export interface Report {
  id: string
  issueType: IssueCategory
  severity: Severity
  department: Department
  description: string
  location: string
  imageUrl: string
  status: Status
  createdAt: string
  updatedAt: string
  aiReasoning: string
  confidence: number
  updates: ReportUpdate[]
  internalNotes: { note: string; at: string }[]
}

export interface NewReportInput {
  description: string
  location: string
  imageUrl: string
  analysis: AiAnalysis
}
