import type {
  Department,
  IssueCategory,
  Report,
  Severity,
} from './types'

export const ISSUE_CATEGORIES: IssueCategory[] = [
  'Garbage Accumulation',
  'Pothole',
  'Broken Streetlight',
  'Water Leakage',
  'Damaged Road',
  'Illegal Dumping',
  'Other',
]

export const DEPARTMENTS: Department[] = [
  'Sanitation',
  'Roads',
  'Electrical',
  'Water Supply',
  'Parks & Recreation',
]

export const SEVERITIES: Severity[] = ['Low', 'Medium', 'High']

export const CATEGORY_IMAGE: Record<string, string> = {
  'Garbage Accumulation': '/images/report-garbage.png',
  Pothole: '/images/report-pothole.png',
  'Broken Streetlight': '/images/report-streetlight.png',
  'Water Leakage': '/images/report-water.png',
  'Damaged Road': '/images/report-road.png',
  'Illegal Dumping': '/images/report-garbage.png',
  Other: '/images/report-road.png',
}

export const INITIAL_REPORTS: Report[] = [
  {
    id: 'CF-1041',
    issueType: 'Pothole',
    severity: 'Medium',
    department: 'Roads',
    description:
      'Deep pothole near the market crossing. Two-wheelers are swerving to avoid it and it gets worse after rain.',
    location: 'MI Road, Jaipur, Rajasthan',
    imageUrl: '/images/report-pothole.png',
    status: 'Assigned',
    createdAt: '2026-09-14T09:12:00Z',
    updatedAt: '2026-09-14T14:20:00Z',
    aiReasoning:
      'The image shows a sizable pothole on a heavily used road. It presents a moderate safety risk to two-wheelers and should be routed to the roads department for repair.',
    confidence: 0.91,
    updates: [
      { status: 'Reported', note: 'Report received from citizen.', at: '2026-09-14T09:12:00Z' },
      { status: 'Assigned', note: 'Assigned to Roads department, ticket queued.', at: '2026-09-14T14:20:00Z' },
    ],
    internalNotes: [],
  },
  {
    id: 'CF-1040',
    issueType: 'Broken Streetlight',
    severity: 'High',
    department: 'Electrical',
    description:
      'Streetlight has been off for a week. The whole lane is dark at night and feels unsafe for women walking home.',
    location: 'Vaishali Nagar, Jaipur, Rajasthan',
    imageUrl: '/images/report-streetlight.png',
    status: 'In Progress',
    createdAt: '2026-09-13T19:40:00Z',
    updatedAt: '2026-09-15T08:05:00Z',
    aiReasoning:
      'A non-functional streetlight on a residential lane raises a public-safety concern, especially at night. Escalated to the electrical department as high priority.',
    confidence: 0.88,
    updates: [
      { status: 'Reported', note: 'Report received from citizen.', at: '2026-09-13T19:40:00Z' },
      { status: 'Assigned', note: 'Assigned to Electrical department.', at: '2026-09-14T10:00:00Z' },
      { status: 'In Progress', note: 'Field crew dispatched to inspect the pole.', at: '2026-09-15T08:05:00Z' },
    ],
    internalNotes: [],
  },
  {
    id: 'CF-1039',
    issueType: 'Water Leakage',
    severity: 'Medium',
    department: 'Water Supply',
    description:
      'Water pipe leaking on the roadside for two days, flooding the footpath and wasting a lot of water.',
    location: 'Malviya Nagar, Jaipur, Rajasthan',
    imageUrl: '/images/report-water.png',
    status: 'In Progress',
    createdAt: '2026-09-13T11:15:00Z',
    updatedAt: '2026-09-14T16:30:00Z',
    aiReasoning:
      'Visible pipe leakage causing water pooling and wastage. Routed to water supply for a repair crew.',
    confidence: 0.85,
    updates: [
      { status: 'Reported', note: 'Report received from citizen.', at: '2026-09-13T11:15:00Z' },
      { status: 'Assigned', note: 'Assigned to Water Supply department.', at: '2026-09-13T15:00:00Z' },
      { status: 'In Progress', note: 'Repair crew scheduled.', at: '2026-09-14T16:30:00Z' },
    ],
    internalNotes: [],
  },
  {
    id: 'CF-1038',
    issueType: 'Damaged Road',
    severity: 'Low',
    department: 'Roads',
    description:
      'Cracked road surface with loose gravel near the school gate.',
    location: 'C-Scheme, Jaipur, Rajasthan',
    imageUrl: '/images/report-road.png',
    status: 'Resolved',
    createdAt: '2026-09-10T08:00:00Z',
    updatedAt: '2026-09-12T13:00:00Z',
    aiReasoning:
      'Minor road surface damage with low immediate risk. Queued for routine maintenance by the roads department.',
    confidence: 0.79,
    updates: [
      { status: 'Reported', note: 'Report received from citizen.', at: '2026-09-10T08:00:00Z' },
      { status: 'Assigned', note: 'Assigned to Roads department.', at: '2026-09-10T12:00:00Z' },
      { status: 'In Progress', note: 'Patch work started.', at: '2026-09-11T09:00:00Z' },
      { status: 'Resolved', note: 'Road patched and cleared.', at: '2026-09-12T13:00:00Z' },
    ],
    internalNotes: [],
  },
  {
    id: 'CF-1037',
    issueType: 'Illegal Dumping',
    severity: 'High',
    department: 'Sanitation',
    description:
      'Someone is dumping construction debris on the empty plot every night. It is blocking the drain.',
    location: 'Mansarovar, Jaipur, Rajasthan',
    imageUrl: '/images/report-garbage.png',
    status: 'Reported',
    createdAt: '2026-09-15T07:20:00Z',
    updatedAt: '2026-09-15T07:20:00Z',
    aiReasoning:
      'Repeated illegal dumping of debris blocking a drain can cause water-logging and health hazards. Flagged as high priority for sanitation.',
    confidence: 0.9,
    updates: [
      { status: 'Reported', note: 'Report received from citizen.', at: '2026-09-15T07:20:00Z' },
    ],
    internalNotes: [],
  },
  {
    id: 'CF-1036',
    issueType: 'Garbage Accumulation',
    severity: 'Medium',
    department: 'Sanitation',
    description:
      'Community bin overflowing near the park entrance over the weekend.',
    location: 'Central Park, Jaipur, Rajasthan',
    imageUrl: '/images/report-garbage.png',
    status: 'Resolved',
    createdAt: '2026-09-08T10:30:00Z',
    updatedAt: '2026-09-09T11:00:00Z',
    aiReasoning:
      'Overflowing community bin near a public park. Routine sanitation pickup recommended.',
    confidence: 0.82,
    updates: [
      { status: 'Reported', note: 'Report received from citizen.', at: '2026-09-08T10:30:00Z' },
      { status: 'Assigned', note: 'Assigned to Sanitation department.', at: '2026-09-08T12:00:00Z' },
      { status: 'In Progress', note: 'Collection truck routed.', at: '2026-09-09T08:00:00Z' },
      { status: 'Resolved', note: 'Bin cleared and area cleaned.', at: '2026-09-09T11:00:00Z' },
    ],
    internalNotes: [],
  },
  {
    id: 'CF-1035',
    issueType: 'Pothole',
    severity: 'High',
    department: 'Roads',
    description:
      'A large crater-like pothole on the main highway causing traffic to slow down suddenly. Very dangerous at night.',
    location: 'Tonk Road, Jaipur, Rajasthan',
    imageUrl: '/images/report-pothole.png',
    status: 'In Progress',
    createdAt: '2026-09-12T18:00:00Z',
    updatedAt: '2026-09-14T09:00:00Z',
    aiReasoning:
      'A deep pothole on a high-speed arterial road is a serious accident risk. Escalated to roads department as high priority.',
    confidence: 0.93,
    updates: [
      { status: 'Reported', note: 'Report received from citizen.', at: '2026-09-12T18:00:00Z' },
      { status: 'Assigned', note: 'Assigned to Roads department.', at: '2026-09-13T09:00:00Z' },
      { status: 'In Progress', note: 'Materials mobilized for repair.', at: '2026-09-14T09:00:00Z' },
    ],
    internalNotes: [],
  },
  {
    id: 'CF-1034',
    issueType: 'Water Leakage',
    severity: 'Low',
    department: 'Water Supply',
    description: 'Slow drip from a public tap left running in the market.',
    location: 'Bapu Bazaar, Jaipur, Rajasthan',
    imageUrl: '/images/report-water.png',
    status: 'Resolved',
    createdAt: '2026-09-06T09:00:00Z',
    updatedAt: '2026-09-07T10:00:00Z',
    aiReasoning:
      'Minor water wastage from a public tap. Low priority maintenance task for water supply.',
    confidence: 0.76,
    updates: [
      { status: 'Reported', note: 'Report received from citizen.', at: '2026-09-06T09:00:00Z' },
      { status: 'Assigned', note: 'Assigned to Water Supply department.', at: '2026-09-06T12:00:00Z' },
      { status: 'In Progress', note: 'Plumber assigned.', at: '2026-09-06T15:00:00Z' },
      { status: 'Resolved', note: 'Tap washer replaced.', at: '2026-09-07T10:00:00Z' },
    ],
    internalNotes: [],
  },
]
