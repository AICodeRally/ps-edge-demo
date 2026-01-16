# PS-Edge Demo - AI Agent Instructions

> **This file is auto-read by Claude Code at session start.**
> Last updated: January 2026

## What Is This?

**PS-Edge Demo** (Professional Services Edge) is a dual-purpose platform for **Phoenix Philanthropy Group (PPG)**:
1. **Professional Services Operations** - Consulting business management (clients, projects, proposals, time tracking, billing)
2. **Channel Partner Portal** - Multi-tenant nonprofit client management (telemetry, benchmarking, health monitoring)

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5.9 |
| **Styling** | Tailwind CSS 4.1 |
| **Database** | PostgreSQL + Prisma ORM |
| **Charts** | Recharts 3.4 |
| **Icons** | Radix UI Icons |

## Project Structure

```
app/
  dashboard/
    sales/           # Pipeline, proposals, clients
    delivery/        # Projects, engagements, deliverables
    client-success/  # Health monitoring, renewals
    finance/         # Timesheets, invoicing, revenue
    partner-portal/  # Tenant monitoring, signals, commissions
  api/
    telemetry/       # Signal ingestion endpoint
    ps-edge/         # Business logic APIs
    channel/         # Partner APIs

src/
  components/        # Reusable UI components
  types/ps-edge/     # TypeScript definitions
  data/ps-edge/      # Mock data
  lib/               # Utilities

prisma/
  schema.prisma      # 12 models (7 PS + 5 Channel)
```

## Department Structure (6 Core)

| Department | Color | Functions |
|------------|-------|-----------|
| **Sales** | Orange (#f97316) | Pipeline, Proposals, Onboarding |
| **Delivery** | Blue (#3b82f6) | Projects, Engagements, Deliverables |
| **Client Success** | Green (#10b981) | Health, Support, Renewals |
| **Finance** | Purple (#9333ea) | Invoicing, Revenue, Time Tracking |
| **Operations** | Gray (#6b7280) | Data, Integrations, AI, Docs |
| **Partner Portal** | Teal (#14b8a6) | Tenant Monitoring, Benchmarks, Commissions |

## Data Models

**Professional Services (7):** Client, Engagement, Proposal, TimeEntry, Invoice, Deliverable, Consultant

**Channel Partner (5):** ClientTenant, ClientSignal, ClientBenchmark, PartnerRevenue, ApiUsageLog

## Key Commands

```bash
npm run dev         # Start on port 3010
npm run build       # Build for production
npx prisma studio   # Open Prisma Studio
npx prisma db push  # Push schema changes
```

## AI Features

- **OpsChief Orb** - Business health insights (dark purple gradient)
- **AskPS Orb** - Conversational assistant (light purple gradient)
- Purple = AI (consistent visual language)

## Critical Notes

- **Multi-Tenant**: PPG uses `tenantId: 'ppg-main'` for internal data
- **Telemetry Flow**: Client deployments POST to `/api/telemetry/ingest`
- **38 Pages** across 6 departments
- **1000+ Mock Records** across 12 models

## Environment

```bash
DATABASE_URL="postgresql://user:pass@localhost:5432/ps_edge_demo?schema=ppg-main"
TELEMETRY_API_KEY="your-api-key"
```

---

**Port:** 3010
**Demo URL:** localhost:3010
