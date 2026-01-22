# PS-Edge Demo - AI Agent Instructions

> **This file is auto-read by Claude Code at session start.**
> Last updated: January 2026 (7th P Partners Module + Nonprofit Focus Complete)

## What Is This?

**PS-Edge Demo** (Professional Services Edge) is a dual-purpose platform for **Phoenix Philanthropy Group (PPG)**:

1. **Consulting Operations (Primary)** - PPG's nonprofit consulting business
   - **11 PPG Service Lines:** Campaign fundraising, volunteer leadership (board development), executive coaching, M&A advisory, operational fundraising, relationship management, interim management, philanthropy advisory, strategic planning, alumni relations, Advancement Academy
   - **2026 AI Line of Service:** AI readiness assessments, ethical governance advisory, AI pilot implementations for nonprofits
   - **Client Focus:** Universities, museums, foundations, arts organizations, community nonprofits

2. **Channel Partner Portal (Secondary - Toggleable 7th P)** - NP-Edge software sales
   - Multi-tenant nonprofit client management (47 active)
   - Telemetry ingestion and health monitoring
   - Performance benchmarking across nonprofit portfolio
   - Channel revenue tracking (MRR: $14,784)
   - **Toggle:** Can be hidden for pure consulting demos

**Current Demo:** Full nonprofit consulting platform with optional channel partner module

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

**Order:** PURPOSE → PEOPLE → PROCESS → PRACTICE → PIPELINE → PERFORMANCE (+ PARTNERS as toggleable 7th P)

| P | Color | Focus | Pages | Nonprofit Context |
|---|-------|-------|-------|-------------------|
| **PURPOSE** 🎯 | Yellow (#facc15) | Mission & nonprofit sector impact | Mission, Client Success, Renewals, Proposals, Clients | Dollars raised for nonprofits, campaign outcomes |
| **PEOPLE** 👥 | Purple (#7c3aed) | Consultant expertise | Team, Capacity, Onboarding | Nonprofit specialists, CFRE credentials, sector expertise |
| **PROCESS** ⚙️ | Violet (#8b5cf6) | Service delivery | Engagements, Deliverables, Support, Documents, Knowledge, Timesheets, Invoices | Campaign execution, case statements, donor pyramids |
| **PRACTICE** 🎓 | Fuchsia (#c026d3) | Service lines & methodologies | Service Lines (11), Methodologies, Advancement Academy, Thought Leadership | PPG's consulting offerings for nonprofits |
| **PIPELINE** 📈 | Pink (#db2777) | Sales & business development | Sales Pipeline, Proposals, Forecasting | Future nonprofit client acquisition (RFPs, proposals) |
| **PERFORMANCE** 📊 | Orange (#f97316) | Business outcomes | KPIs, Client Health, Benchmarks, Signals | Operational & financial metrics |
| **PARTNERS** 🤝 | Blue (#3b82f6) | Channel partner management (toggleable) | Tenants, Signals, Benchmarks, Usage, Commissions, Revenue | NP-Edge nonprofit customer monitoring |

**Navigation Pattern:**
- Footer: 6 P's links (always visible, mobile-friendly)
- Each P: Dedicated landing page with quick links
- 7th P (Partners): Horizontal module below 6 P grid (toggleable in Settings → Business Modules)
- Total: 35+ pages organized by P category

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

## AI Features (5 Orbs)

- **OpsChief Orb** - Business health insights for nonprofit consulting operations
- **AskPS Orb** - Conversational assistant for nonprofit sector questions
- **Pulse Orb** - AI-curated nonprofit sector articles, best practices, and trends
- **Task Orb** - AICR-synced task management
- **PageKB Orb** - Context-aware help for each page
- Purple = AI (consistent visual language)

## Critical Notes

- **Multi-Tenant**: PPG uses `tenantId: 'ppg-main'` for internal consulting data
- **Telemetry Flow**: Nonprofit NP-Edge client deployments POST to `/api/telemetry/ingest`
- **35+ Pages** organized across 6 P's + Partners (toggleable 7th P)
- **Navigation**: Footer-based 6 P's links (SGM pattern, no sidebar)
- **Nonprofit Focus**: All clients are nonprofits (universities, museums, foundations, arts orgs)
- **11 Service Lines**: Engagement types match Phoenix Philanthropy's actual services
- **7th P Toggle**: Partners module can be hidden in Settings → Business Modules
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
