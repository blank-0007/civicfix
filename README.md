# CivicFix

CivicFix is a civic issue-reporting demo that helps residents report problems in their neighborhoods and gives city administrators a clear workflow for reviewing and resolving them.

The project is optimized around one end-to-end demo journey:

> **Citizen reports an issue → AI analyzes it → a report is created → an admin sees it → the admin changes its status.**

## What the demo includes

### Citizen experience

- Landing page explaining how CivicFix works
- Guided report form at `/report`
- Sample issue flow for fast demonstrations
- Photo, description, and location capture
- Simulated AI analysis with:
  - Issue classification
  - Severity assessment
  - Department routing
  - Reasoning and confidence score
- Confirmation screen with a trackable report ID

### Tracking experience

- Public tracking page at `/track`
- Report status timeline
- Issue summary, category, severity, assigned department, and location
- Clear progress from submitted to resolved

### Admin experience

- Admin dashboard at `/admin`
- Overview statistics for incoming reports
- Filterable report list
- Severity and status badges
- Detail view at `/admin/[id]`
- One-click status updates
- Timeline updates and confirmation toasts after changes

## Demo flow

1. Open the homepage.
2. Select **Report an issue**.
3. Use the sample report or enter an issue manually.
4. Continue through the AI analysis step.
5. Submit the report and note the generated tracking ID.
6. Navigate to the admin dashboard.
7. Open a report and change its status, such as from **Submitted** to **In Progress**.
8. Use the tracking view to show the updated progress timeline.

For the current demo, reports are stored in an in-memory client-side store. Use client-side navigation between pages so a newly submitted report remains available during the demo. A full page refresh resets the in-memory data.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | CivicFix landing page |
| `/report` | Citizen report creation flow |
| `/track` | Public report tracking |
| `/admin` | Admin report dashboard |
| `/admin/[id]` | Admin report details and status controls |

## Project structure

```text
app/
├── admin/
│   ├── [id]/page.tsx       # Admin report detail route
│   └── page.tsx            # Admin dashboard route
├── report/page.tsx         # Citizen report flow
├── track/page.tsx          # Public tracking route
├── globals.css             # Global styles and design tokens
├── layout.tsx              # Root layout and metadata
└── page.tsx                # Landing page

components/
├── admin-dashboard.tsx     # Dashboard table and filters
├── admin-report-detail.tsx # Status update experience
├── report-flow.tsx         # Multi-step citizen report flow
├── track-view.tsx          # Public tracking UI
├── status-timeline.tsx     # Shared report progress timeline
├── badges.tsx              # Severity and status badges
├── stat-cards.tsx          # Dashboard summary cards
├── site-header.tsx         # Shared navigation
├── site-footer.tsx         # Shared footer
└── toaster.tsx             # Toast provider

lib/
├── ai.ts                   # Simulated AI analysis
├── mock-data.ts             # Seed reports and sample content
├── reports-store.tsx       # Shared in-memory report state
└── types.ts                # Shared TypeScript types

public/images/
└── ...                     # Demo imagery used by the report experience
```

## Technology

- [Next.js 16](https://nextjs.org/) with the App Router
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) and Base UI primitives
- [Lucide React](https://lucide.dev/) for interface icons
- [Vercel Analytics](https://vercel.com/analytics)

## Getting started

### Prerequisites

- Node.js 20 or newer
- pnpm 12 or a compatible package manager

### Install dependencies

```bash
pnpm install
```

### Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Create a production build

```bash
pnpm build
pnpm start
```

## Available scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Starts the Next.js development server |
| `pnpm build` | Creates an optimized production build |
| `pnpm start` | Starts the production server |

## Design direction

CivicFix uses a clean civic-blue visual system designed to make the reporting workflow feel trustworthy, approachable, and easy to scan. Status and severity use distinct semantic colors, while the layouts prioritize strong hierarchy, obvious calls to action, accessible contrast, and responsive behavior on mobile screens.

The interface intentionally prioritizes the demo path over secondary features. Every major screen points users toward the next step in the citizen-to-admin workflow.

## Data and production considerations

This repository is currently a frontend demo. The report store and AI analysis are intentionally simulated so the complete workflow can be demonstrated without external services.

For a production deployment, the next implementation steps would be:

- Replace the in-memory store with a persistent database
- Add authentication and role-based admin access
- Move AI analysis to a server-side API or workflow
- Validate and sanitize report inputs on the server
- Store uploaded images in object storage
- Add notifications for status changes
- Add audit history for administrative actions
- Add automated tests for report creation and status transitions

## Continue working with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing the application in v0, where changes can be generated and pushed to the connected repository.

[Continue working on CivicFix in v0 →](https://v0.app/chat/projects/prj_cI1SjguuySnBfg5fROCf2Lo3Naox)

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/learn)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
- [v0 Documentation](https://v0.app/docs)

## License

This project is private by default and does not currently specify an open-source license.
