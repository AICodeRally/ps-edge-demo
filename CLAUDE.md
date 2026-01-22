# PS-Edge Demo - AI Agent Instructions

> **This file is auto-read by Claude Code at session start.**
> Last updated: January 2026 (6 P's Navigation Migration Complete)

## What Is This?

**PS-Edge Demo** (Professional Services Edge) is a dual-purpose platform for **Phoenix Philanthropy Group (PPG)**:

1. **Consulting Operations (Primary)** - PPG's nonprofit consulting business
   - 11 service lines: Campaign fundraising, strategic planning, board development, grant writing, executive coaching, M&A advisory, operational fundraising, relationship management, interim management, philanthropy advisory, alumni relations
   - 2026 AI Line of Service: AI readiness assessments, ethical governance advisory, pilot implementations
   - Advancement Academy training programs

2. **Channel Partner Portal (Secondary)** - NP-Edge software sales
   - Multi-tenant nonprofit client management
   - Telemetry ingestion and health monitoring
   - Performance benchmarking across nonprofit clients
   - Revenue tracking for channel sales

**Current Demo:** Nonprofit Consulting Pack deployed

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5.9 |
| **Styling** | Tailwind CSS 4.1 |
| **Database** | PostgreSQL + Prisma ORM |
| **Charts** | Recharts 3.4 |
| **Icons** | Radix UI Icons |

## Project Structure (6 P's Navigation)

```
app/
  dashboard/
    people/          # Team, Capacity, Onboarding (3 pages)
    process/         # Engagements, Deliverables, Support, Documents, Knowledge (5 pages)
    platform/        # AI, Integrations, Data, Usage, Tenants, Settings (6 pages)
    performance/     # KPIs, Health, Pipeline, Benchmarks, Signals (5 pages)
    profit/          # Revenue, Timesheets, Invoices, Commissions, Partner Revenue (5 pages)
    purpose/         # Mission, Success, Renewals, Proposals, Clients (5 pages)
  api/
    telemetry/       # Signal ingestion endpoint
    ps-edge/         # Business logic APIs
    channel/         # Partner APIs

src/
  components/        # Reusable UI components
    layout/          # Navbar, Footer, Breadcrumbs
    ps-edge/         # PLandingPage, 6Ps components
  types/ps-edge/     # TypeScript definitions
  config/            # navigation.config.ts, brand.config.ts
  data/ps-edge/      # Mock data
  lib/               # Utilities

prisma/
  schema.prisma      # 12 models (7 PS + 5 Channel)
```

## 6 P's Framework (Primary Navigation)

| P | Color | Gradient | Focus | Pages |
|---|-------|----------|-------|-------|
| **People** | Purple (#7c3aed) | Purple → Violet | Team capacity, utilization, workforce metrics | Team, Capacity, Onboarding |
| **Process** | Violet (#8b5cf6) | Violet → Fuchsia | Workflow efficiency, deliverables, timelines | Engagements, Deliverables, Support, Documents, Knowledge |
| **Platform** | Fuchsia (#c026d3) | Fuchsia gradient | Technology, tools, systems enablement | AI, Integrations, Data, Usage, Tenants, Settings |
| **Performance** | Pink (#db2777) | Pink gradient | KPIs, outcomes, operational metrics | KPI Dashboard, Health, Pipeline, Benchmarks, Signals |
| **Profit** | Orange (#f97316) | Orange gradient | Revenue, margins, financial health | Revenue, Timesheets, Invoices, Commissions, Partner Revenue |
| **Purpose** | Yellow (#facc15) | Yellow gradient | Mission alignment, client satisfaction, impact | Mission Dashboard, Success, Renewals, Proposals, Clients |

**Navigation Pattern:**
- Footer: 6 P's links (always visible, mobile-friendly)
- Each P: Dedicated landing page with quick links
- 29 total pages organized by P category

## Data Models

**Professional Services (7):** Client, Engagement, Proposal, TimeEntry, Invoice, Deliverable, Consultant

**Channel Partner (5):** ClientTenant, ClientSignal, ClientBenchmark, PartnerRevenue, ApiUsageLog

## Key Commands

```bash
npm run dev         # Start on port 3033
npm run build       # Build for production
npx prisma studio   # Open Prisma Studio
npx prisma db push  # Push schema changes
```

## AI Features

- **OpsChief Orb** - Business health insights and operational alerts (dark purple gradient)
- **AskPS Orb** - Conversational assistant (light purple gradient)
- **Pulse Orb** - AI-curated content feed with nonprofit sector articles, best practices, and trends (purple gradient)
- Purple = AI (consistent visual language)

## Critical Notes

- **Multi-Tenant**: PPG uses `tenantId: 'ppg-main'` for internal data
- **Telemetry Flow**: Client deployments POST to `/api/telemetry/ingest`
- **29 Pages** organized across 6 P's (People, Process, Platform, Performance, Profit, Purpose)
- **Navigation**: Footer-based 6 P's links (SGM pattern, no sidebar)
- **1000+ Mock Records** across 12 models
- **Legacy Routes**: All old department routes redirect to new P-based routes

## Environment

```bash
DATABASE_URL="postgresql://user:pass@localhost:5432/ps_edge_demo?schema=ppg-main"
TELEMETRY_API_KEY="your-api-key"
```

## Agent Instructions

See `.claude/agents/` for agent definitions and session starters.

**Available Agents:**
- `ps-edge-dev` - Primary development agent

**At session end:**
1. Update `.claude/daily-reviews/YYYY-MM-DD/PROGRESS.md` with final status
2. Log any discovered issues or improvements

---

**Port:** 3033
**Demo URL:** localhost:3033
**Navigation:** Footer-based 6 P's (no sidebar)
