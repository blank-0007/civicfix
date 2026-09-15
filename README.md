# CivicFix

CivicFix is a civic issue-reporting experience that helps residents report problems in their neighborhoods and gives city administrators a focused workflow for reviewing, prioritizing, and updating those reports.

The application is designed around one polished demonstration journey:

> **Citizen reports an issue → AI analyzes it → a report is created → an admin sees it → the admin changes its status.**

This repository contains a frontend-first demo optimized for presentations, hackathons, and product walkthroughs. It uses seeded data and an in-memory store so the complete workflow can be demonstrated without configuring a database or third-party AI provider.

## Contents

- [Product overview](#product-overview)
- [Core demo journey](#core-demo-journey)
- [Features](#features)
- [Routes](#routes)
- [Project structure](#project-structure)
- [Technology stack](#technology-stack)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [How the demo data works](#how-the-demo-data-works)
- [Design and accessibility](#design-and-accessibility)
- [Production roadmap](#production-roadmap)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Product overview

CivicFix turns a loosely described neighborhood problem into a structured service request. A resident can submit a photo, describe what they saw, and provide a location. The simulated AI layer then interprets the report, assigns a category and severity, recommends a city department, and explains its reasoning.

The admin side is intentionally simple: city staff can scan incoming reports, filter the queue, open a report, and move it through the workflow. The public tracking view makes the status understandable to the person who submitted the issue.

## Core demo journey

### 1. Citizen creates a report

Start at the landing page and choose **Report an issue**. The guided report flow supports:

- Selecting a real or preloaded sample image
- Describing the issue in plain language
- Adding a location
- Reviewing the information before analysis

The sample report option is useful during a live demo because it avoids spending time on data entry while still showing the complete product behavior.

### 2. AI analysis appears

The report flow presents an animated analysis state before showing the results. The simulated analysis returns:

- Issue type and category
- Severity level
- Recommended department
- Confidence score
- Plain-language reasoning
- Suggested next action

This step is intentionally visible and understandable so the audience can see how unstructured citizen input becomes an actionable municipal report.

### 3. The report is created

After reviewing the analysis, the citizen submits the report. CivicFix displays a confirmation state with a generated tracking ID and a success toast. The report is added to the shared in-memory store and becomes available to the admin experience during the same browser session.

### 4. Admin reviews the queue

Open `/admin` to see the operations dashboard. The dashboard includes summary statistics, filters, severity indicators, department assignments, and a report table. Newly submitted reports can be identified by their status and tracking ID.

### 5. Admin changes the status

Open an individual report at `/admin/[id]`. The detail view exposes clear status controls, allowing an admin to move the report from **Submitted** to **In Progress**, **Resolved**, or another supported state. The timeline and confirmation toast update immediately so the final handoff is obvious.

### 6. Citizen tracks progress

Use `/track` to show the public-facing progress view. A tracking ID can be used to display the report summary, current status, assigned department, severity, location, and status timeline.

## Features

### Citizen experience

- CivicFix landing page with clear calls to action
- Guided multi-step report form at `/report`
- Sample report shortcut for demos
- Image selection and issue description
- Location capture and report review
- Simulated AI processing state with scan-line animation
- AI-generated classification, severity, routing, reasoning, and confidence
- Submission confirmation with trackable report ID
- Responsive layouts for mobile and desktop screens

### Public tracking

- Tracking page at `/track`
- Report summary and issue details
- Current status and severity badges
- Assigned department and location
- Visual status timeline from submission through resolution

### Admin operations

- Dashboard at `/admin`
- Summary cards for report volume and status distribution
- Search and filtering for the report queue
- Severity, status, and department indicators
- Individual report detail view at `/admin/[id]`
- One-click status transitions
- Immediate timeline updates
- Confirmation toasts for administrative actions

## Routes

| Route | Audience | Purpose |
| --- | --- | --- |
| `/` | Everyone | Introduces CivicFix and links to the main demo paths |
| `/report` | Citizens | Creates and submits a new issue report |
| `/track` | Citizens | Displays the progress of a report |
| `/admin` | City staff | Reviews the incoming report queue |
| `/admin/[id]` | City staff | Reviews one report and changes its status |

## Project structure

```text
app/
├── admin/
│   ├── [id]/page.tsx       # Admin report detail route
│   └── page.tsx            # Admin dashboard route
├── report/page.tsx         # Citizen report flow route
├── track/page.tsx          # Public tracking route
├── globals.css             # Global styles, tokens, and animations
├── layout.tsx              # Root layout, metadata, and providers
└── page.tsx                # Landing page

components/
├── admin-dashboard.tsx     # Dashboard statistics, filters, and report table
├── admin-report-detail.tsx # Report details and status controls
├── badges.tsx              # Reusable severity and status badges
├── logo.tsx                # CivicFix brand mark
├── report-flow.tsx         # Multi-step citizen reporting experience
├── site-footer.tsx         # Shared footer
├── site-header.tsx         # Shared navigation header
├── stat-cards.tsx          # Dashboard metric cards
├── status-timeline.tsx     # Shared status progress component
├── toaster.tsx             # Toast provider and notification utilities
└── track-view.tsx          # Public tracking experience

lib/
├── ai.ts                   # Deterministic simulated AI analysis
├── mock-data.ts             # Seed reports, sample issues, and demo values
├── reports-store.tsx       # Shared client-side report state and mutations
└── types.ts                # Shared TypeScript domain types

public/images/
└── ...                     # Generated and curated demo report imagery
```

## Technology stack

- [Next.js 16](https://nextjs.org/) with the App Router
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) and Base UI primitives
- [Lucide React](https://lucide.dev/) for interface icons
- [Vercel Analytics](https://vercel.com/analytics)
- pnpm for dependency management

## Getting started

### Prerequisites

Install the following locally:

- Node.js 20 or newer
- pnpm 12 or a compatible pnpm version

Check your installed versions:

```bash
node --version
pnpm --version
```

### Install dependencies

Clone the repository, enter the project directory, and install dependencies:

```bash
pnpm install
```

### Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

### Create a production build

```bash
pnpm build
pnpm start
```

The production server runs on the port configured by Next.js, typically [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Starts the Next.js development server with hot reload |
| `pnpm build` | Creates an optimized production build and checks the application for build errors |
| `pnpm start` | Starts the previously built production application |

## How the demo data works

CivicFix currently uses a client-side in-memory store rather than a persistent backend. The store is initialized with seeded reports from `lib/mock-data.ts` and exposes the report operations needed by the demo:

- Read the current report collection
- Create a report after the citizen flow is submitted
- Find a report by tracking ID
- Update the status of an existing report
- Reflect changes across the citizen and admin components during the session

The AI behavior in `lib/ai.ts` is also simulated. It returns predictable analysis data based on the submitted report content rather than calling an external model.

### Important demo limitation

A full browser refresh resets the in-memory store. To preserve a newly created report while demonstrating the citizen-to-admin handoff, use the navigation links inside the application instead of refreshing the page. In a production implementation, reports and status changes should be stored server-side.

## Design and accessibility

The interface uses a civic-blue visual system intended to feel trustworthy, calm, and operational. The design emphasizes:

- One obvious primary action per screen
- Strong visual hierarchy and readable spacing
- Semantic colors for severity and report status
- Responsive mobile-first layouts
- Accessible contrast and descriptive labels
- Clear success, progress, and error feedback
- Shared components for consistent behavior across routes

The interface is deliberately optimized for the primary demo journey instead of adding unrelated features that could distract from the citizen-to-admin handoff.

## Production roadmap

The current project is a self-contained demonstration. A production version would likely add the following capabilities:

### Data and APIs

- Replace the in-memory store with a persistent database
- Add server actions or route handlers for report creation and updates
- Add server-side validation and sanitization for every submitted field
- Add pagination and server-side filtering for larger report queues
- Preserve status history and administrative audit events

### Authentication and authorization

- Add citizen accounts or secure anonymous report tokens
- Add administrator authentication
- Enforce role-based access to the admin routes
- Scope administrative actions by department or jurisdiction
- Protect all state-changing endpoints against unauthorized requests

### AI and media

- Move AI analysis to a server-side API or durable workflow
- Store uploaded photos in object storage
- Add image moderation and file-type/size validation
- Capture AI model version, confidence, and decision metadata
- Add a human review path for low-confidence classifications

### Notifications and operations

- Notify citizens when a status changes
- Notify departments when new reports are assigned
- Add email or SMS delivery preferences
- Add duplicate-report detection
- Add map-based issue clustering and geographic reporting
- Add analytics for resolution time and department workload

### Quality and reliability

- Add unit tests for the report store and AI classification logic
- Add integration tests for report creation and status transitions
- Add browser tests for the complete demo journey
- Add error boundaries and retry states
- Add structured logging and monitoring

## Deployment

The project is compatible with Vercel deployment. From the connected v0 project, use the project publish controls to create a deployment.

For a local production-style check:

```bash
pnpm build
pnpm start
```

Because the current demo has no external backend, it does not require database credentials or AI provider keys to run. If persistence, authentication, storage, or a hosted AI service is added later, configure those values through the deployment platform's environment variable settings rather than committing secrets to the repository.

## Contributing

When extending CivicFix, preserve the main product principle: the citizen report journey should remain easy to understand and fast to demonstrate.

Recommended contribution workflow:

1. Create a feature branch.
2. Install dependencies with `pnpm install`.
3. Run the development server with `pnpm dev`.
4. Make the smallest focused change possible.
5. Check the primary flow on mobile and desktop sizes.
6. Run `pnpm build` before opening a pull request.
7. Describe any data-model, route, or environment-variable changes in the pull request.

Please keep reusable UI in `components/`, shared domain logic in `lib/`, and route-level composition in `app/`.

## Continue working with v0

This repository is linked to a [v0](https://v0.app) project, so the application can continue to be iterated on through v0 and synchronized with the connected GitHub repository.

[Continue working on CivicFix in v0 →](https://v0.app/chat/projects/prj_cI1SjguuySnBfg5fROCf2Lo3Naox)

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/learn)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [v0 Documentation](https://v0.app/docs)

## License

This project is private by default and does not currently specify an open-source license. Add a `LICENSE` file before distributing the repository publicly under a defined license.
