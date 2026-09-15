import type { AiAnalysis, Department, IssueCategory, Severity } from './types'

interface Rule {
  keywords: string[]
  issueType: IssueCategory
  department: Department
  baseSeverity: Severity
  reasoning: string
}

const RULES: Rule[] = [
  {
    keywords: ['garbage', 'trash', 'waste', 'bin', 'smell', 'stray', 'rotting', 'litter'],
    issueType: 'Garbage Accumulation',
    department: 'Sanitation',
    baseSeverity: 'High',
    reasoning:
      'The image shows overflowing garbage bins and scattered waste on the roadside. This poses a public-health risk and requires attention from the sanitation department.',
  },
  {
    keywords: ['dumping', 'debris', 'construction', 'dump'],
    issueType: 'Illegal Dumping',
    department: 'Sanitation',
    baseSeverity: 'High',
    reasoning:
      'The description indicates repeated illegal dumping of debris. This can block drains and create health hazards, so it is routed to the sanitation department as high priority.',
  },
  {
    keywords: ['streetlight', 'street light', 'lamp', 'light', 'dark', 'pole'],
    issueType: 'Broken Streetlight',
    department: 'Electrical',
    baseSeverity: 'High',
    reasoning:
      'A non-functional streetlight leaves the area dark and raises a public-safety concern at night. Escalated to the electrical department.',
  },
  {
    keywords: ['water', 'leak', 'pipe', 'drain', 'flood', 'tap', 'sewage'],
    issueType: 'Water Leakage',
    department: 'Water Supply',
    baseSeverity: 'Medium',
    reasoning:
      'Visible water leakage is causing pooling and wastage. Routed to the water supply department for a repair crew.',
  },
  {
    keywords: ['pothole', 'crater', 'hole'],
    issueType: 'Pothole',
    department: 'Roads',
    baseSeverity: 'Medium',
    reasoning:
      'The image shows a pothole on a used road, presenting a safety risk to vehicles. Routed to the roads department for repair.',
  },
  {
    keywords: ['road', 'crack', 'asphalt', 'surface', 'gravel'],
    issueType: 'Damaged Road',
    department: 'Roads',
    baseSeverity: 'Low',
    reasoning:
      'The description points to damaged road surface. Queued for maintenance by the roads department.',
  },
]

const URGENT_WORDS = ['danger', 'dangerous', 'accident', 'unsafe', 'health', 'child', 'school', 'days', 'week', 'blocking', 'severe', 'emergency']

function escalate(base: Severity, matches: number): Severity {
  const order: Severity[] = ['Low', 'Medium', 'High']
  const idx = Math.min(order.indexOf(base) + (matches > 0 ? 1 : 0), 2)
  return order[idx]
}

/**
 * Simulated on-device AI classifier. In production this call would hit an
 * AWS-hosted vision + text model; the shape of the return value is designed
 * to map cleanly onto that future backend response.
 */
export function analyzeIssue(
  description: string,
  category?: IssueCategory | '',
): AiAnalysis {
  const text = description.toLowerCase()

  let rule =
    RULES.find((r) => r.keywords.some((k) => text.includes(k))) ?? RULES[0]

  if (category && category !== 'Other') {
    const byCategory = RULES.find((r) => r.issueType === category)
    if (byCategory) rule = byCategory
  }

  const urgentMatches = URGENT_WORDS.filter((w) => text.includes(w)).length
  const severity = escalate(rule.baseSeverity, urgentMatches)

  const confidence = Math.min(
    0.98,
    0.82 + rule.keywords.filter((k) => text.includes(k)).length * 0.04,
  )

  return {
    issueType: rule.issueType,
    department: rule.department,
    severity,
    reasoning: rule.reasoning,
    confidence: Number(confidence.toFixed(2)),
  }
}
