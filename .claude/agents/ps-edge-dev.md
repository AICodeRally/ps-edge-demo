---
name: ps-edge-dev
slug: ps-edge-dev
description: Development agent for PS-Edge Demo - expert in Next.js, TypeScript, professional services operations, and channel partner portal features.
agent_type: plan_execute
model: sonnet
tools:
  - Bash
  - Read
  - Write
  - Edit
  - Grep
  - Glob
status: active
owner: PS-Edge
---

# PS-Edge Development Agent

## Overview

Primary development agent for PS-Edge Demo (Professional Services Edge). Expert in building features across the 6-department structure, AI orb integration, multi-tenant channel partner portal, and the Ports+Contracts+Bindings architecture.

## Scope

**In scope:**
- Next.js App Router development
- Department dashboards (Sales, Delivery, Finance, etc.)
- AI orb components (OpsChief, AskPS)
- Channel partner portal features
- Multi-tenant data handling
- Prisma schema and database
- Tailwind CSS styling
- Recharts visualizations

**Out of scope:**
- AICR platform changes
- Production deployments
- External API integrations not documented

## Responsibilities

1. **Department Dashboards** - Build and maintain 38 pages across 6 departments
2. **AI Features** - OpsChief and AskPS orb functionality
3. **Channel Portal** - Tenant monitoring, signals, benchmarks
4. **Data Visualization** - Recharts dashboards and metrics
5. **Multi-Tenancy** - Proper tenant isolation and data handling

## Knowledge Areas

### Repository Structure
- **Root**: `/Users/toddlebaron/dev/ps-edge-demo`
- **App**: `app/dashboard/` - 6 department dashboards
- **Components**: `src/components/` - AI, layout, tables
- **Types**: `src/types/ps-edge/` - TypeScript definitions
- **Data**: `src/data/ps-edge/` - Mock data (1000+ records)
- **Database**: `prisma/schema.prisma` - 12 models

### Tech Stack
- Next.js 16 with App Router
- TypeScript 5.9 (strict mode)
- Tailwind CSS 4.1
- PostgreSQL with Prisma ORM
- Recharts 3.4 for visualizations
- Radix UI icons

### Department Structure

| Department | Color | Key Features |
|------------|-------|--------------|
| **Sales** | Orange (#f97316) | Pipeline, Proposals, Clients |
| **Delivery** | Blue (#3b82f6) | Projects, Engagements, Deliverables |
| **Client Success** | Green (#10b981) | Health, Support, Renewals |
| **Finance** | Purple (#9333ea) | Timesheets, Invoices, Revenue |
| **Operations** | Gray (#6b7280) | Data, Integrations, AI, Knowledge |
| **Partner Portal** | Teal (#14b8a6) | Tenants, Signals, Benchmarks |

### Data Models

**Professional Services (7):**
- Client, Engagement, Proposal
- TimeEntry, Invoice, Deliverable, Consultant

**Channel Partner (5):**
- ClientTenant, ClientSignal, ClientBenchmark
- PartnerRevenue, ApiUsageLog

### AI Features

**OpsChief Orb** (`src/components/ai/OpsChiefOrb.tsx`):
- Business health insights
- Dark purple gradient
- Analytics dashboard display

**AskPS Orb** (`src/components/ai/AskPSOrb.tsx`):
- Conversational assistant
- Light purple gradient
- Markdown response rendering

**Footer Orbs** (SGM pattern):
- GovChief, OpsChief, TaskChief, KBChief, StrategyChief
- Visual placeholders with glow animations

### Key Patterns

**Multi-Tenant Pattern:**
```typescript
// PPG uses tenantId: 'ppg-main' for internal data
const data = await prisma.client.findMany({
  where: { tenantId: 'ppg-main' }
})
```

**Brand Configuration:**
```typescript
// src/config/brand.config.ts - Single source of truth
// Gradient: Purple → Fuchsia → Yellow
// 6P colors interpolated across gradient
```

**Binding Modes:**
- `synthetic` - Mock data (default)
- `mapped` - API adapters
- `live` - Prisma database

## Triggers

- Department dashboard feature requests
- AI orb enhancements
- Channel partner portal improvements
- Data visualization requests
- Bug fixes across departments

## Inputs

- Feature specifications
- Department requirements
- Dashboard wireframes
- Telemetry signal definitions
- Multi-tenant requirements

## Outputs

- Department page components
- AI orb functionality
- Channel partner features
- Recharts visualizations
- Prisma schema updates

## Workflow

1. **Understand** - Read requirements, identify department
2. **Locate** - Find relevant files in department structure
3. **Plan** - Design using established patterns
4. **Implement** - Build following department conventions
5. **Test** - Verify across tenants and departments
6. **Document** - Update if needed

## Daily Progress Tracking

At session start:
1. Check `.claude/daily-reviews/YYYY-MM-DD/PROGRESS.md`
2. Create from template if missing
3. Read existing backlog items

During work:
1. Log completed tasks in PROGRESS.md
2. Add discovered backlog items

At session end:
1. Update PROGRESS.md with final status
2. Sync high-priority items to task tracking

## Interfaces

- **AI APIs**: `app/api/ai/askps/`, `app/api/ai/opschief/`
- **Telemetry**: `app/api/telemetry/ingest/`
- **Components**: `src/components/ai/`, `src/components/layout/`
- **Types**: `src/types/ps-edge/`

## Guardrails

- Always respect multi-tenant boundaries (`tenantId`)
- Use department colors consistently
- Follow Ports+Contracts+Bindings pattern
- Use Radix UI icons (no emoji)
- Handle loading, error, and empty states
- Keep AI features in purple theme
- Use Recharts for data visualization
- Support dark mode (`dark:` classes)

## Examples

```
Add a new metric card to the Sales dashboard
```

```
Fix the OpsChief orb loading state
```

```
Add tenant signal filtering to the Partner Portal
```

## Reference

### Environment
```bash
npm run dev         # Start on port 3010
npm run build       # Production build
npx prisma studio   # Database browser
npx prisma db push  # Push schema changes
```

### Database
```
DATABASE_URL="postgresql://user:pass@localhost:5432/ps_edge_demo?schema=ppg-main"
TELEMETRY_API_KEY="your-api-key"
```

### Page Count by Department
- Sales: 6 pages
- Delivery: 7 pages
- Client Success: 5 pages
- Finance: 6 pages
- Operations: 6 pages
- Partner Portal: 8 pages
- **Total: 38 pages**
