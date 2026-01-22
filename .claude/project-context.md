# PS-Edge Demo - Project Context

## Project Overview

**ps-edge-demo** is a standalone Next.js 16+ application demonstrating professional services operations management for Phoenix Philanthropy Group (PPG). It showcases the **Contracts + Ports + Bindings** architecture pattern with synthetic-first data providers and the 6 P's navigation framework.

## Product Description

**PS-Edge (Professional Services Edge)** is a dual-purpose platform for Phoenix Philanthropy Group (PPG):

1. **Consulting Operations (Primary)** - PPG's nonprofit consulting business
   - 11 service lines: Campaign fundraising, strategic planning, board development, grant writing, executive coaching, M&A advisory, operational fundraising, relationship management, interim management, philanthropy advisory, alumni relations
   - 2026 AI Line of Service: AI readiness assessments, ethical governance advisory, pilot implementations
   - Advancement Academy training programs
   - Client relationship management, project tracking, team capacity, billing, proposals

2. **Channel Partner Portal (Secondary)** - NP-Edge software sales
   - Multi-tenant nonprofit client management
   - Telemetry signal ingestion from NP-Edge deployments
   - Performance benchmarking across nonprofit clients
   - Health monitoring and usage analytics
   - Revenue tracking for channel commissions

**Current Demo:** Nonprofit Consulting Pack deployment showcasing PPG's full service range

## Technology Stack

- **Framework**: Next.js 16.0.10 (App Router)
- **Language**: TypeScript 5.7+ (strict mode)
- **Styling**: Tailwind CSS 4.1.18
- **Validation**: Zod 3.24+ (runtime + compile-time)
- **Icons**: @radix-ui/react-icons
- **Charts**: Recharts 2.15+
- **Dates**: date-fns 4.1+
- **Auth**: NextAuth.js 4.24+
- **Database**: Prisma ORM 6.2+ (PostgreSQL)
- **Markdown**: react-markdown + remark-gfm

## Architecture Pattern

**Contracts + Ports + Bindings** (3-layer clean architecture):

1. **Contracts** (`src/lib/contracts/`) - Entity definitions with Zod schemas
2. **Ports** (`src/lib/ports/`) - Service interfaces (dependency injection)
3. **Bindings** (`src/lib/bindings/`) - Provider implementations

**Binding Modes:**
- **Synthetic** (default) - In-memory providers with 1000+ mock records
- **Live** (production) - Prisma database access (PostgreSQL)

**Configuration**: `src/lib/config/binding-config.ts`

## Development

```bash
# Start dev server (port 3033)
npm run dev

# Build for production
npm run build

# Run production build
npm run start

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Prisma Studio (DB browser)
npx prisma studio

# Knowledge base report
npm run kb:report
```

## Port

Runs on port **3033** (PS-Edge Demo)

Production: **ps-edge.info**

## 6 P's Framework

Primary navigation organized by 6 categories:

| P | Color | Pages | Route Pattern |
|---|-------|-------|---------------|
| **People** | Purple (#7c3aed) | Team, Capacity, Onboarding | `/dashboard/people/*` |
| **Process** | Violet (#8b5cf6) | Engagements, Deliverables, Support, Documents, Knowledge | `/dashboard/process/*` |
| **Platform** | Fuchsia (#c026d3) | AI, Integrations, Data, Usage, Tenants, Settings | `/dashboard/platform/*` |
| **Performance** | Pink (#db2777) | KPI Dashboard, Health, Pipeline, Benchmarks, Signals | `/dashboard/performance/*` |
| **Profit** | Orange (#f97316) | Revenue, Timesheets, Invoices, Commissions, Partner Revenue | `/dashboard/profit/*` |
| **Purpose** | Yellow (#facc15) | Mission Dashboard, Success, Renewals, Proposals, Clients | `/dashboard/purpose/*` |

**Navigation**: Footer-based 6 P's links (always visible, mobile-friendly)

## Data Models

**12 Prisma Models** (7 PS + 5 Channel):

### Professional Services:
- `Client` - Consulting clients
- `Engagement` - Active projects
- `Proposal` - Sales proposals
- `TimeEntry` - Time tracking
- `Invoice` - Billing records
- `Deliverable` - Project outputs
- `Consultant` - Team members

### Channel Partner Portal:
- `ClientTenant` - Partner tenant deployments
- `ClientSignal` - Telemetry signals
- `ClientBenchmark` - Performance benchmarks
- `PartnerRevenue` - Commission tracking
- `ApiUsageLog` - API usage metrics

## Key Principles

1. **Demo-first** - Orange "Demo Data" badge when in synthetic mode
2. **Type-safe** - Zod schemas for runtime validation
3. **Clean architecture** - Clear separation of concerns
4. **6 P's navigation** - Footer-based primary navigation
5. **Purple = AI** - Consistent AI component theming
6. **Multi-tenant** - PPG uses `tenantId: 'ppg-main'`
7. **Telemetry flow** - Client deployments POST to `/api/telemetry/ingest`

## AI Components

All AI components use purple-themed gradients:

- **OpsChiefOrb** - Business health insights and operational alerts (dark purple)
- **AskPSOrb** - Conversational assistant (light purple)
- **PulseOrb** - AI-curated content feed (articles, best practices, sector news)
- **TaskOrb** - Task management widget

## Context Provider Stack

```tsx
SessionProvider          // NextAuth authentication
  → ThemeProvider        // Light/dark mode
    → BrandProvider      // 6 P's branding
      → AISettingsProvider // AI feature toggles
        → PageTitleProvider // Dynamic page titles
          → PageKbProvider // Knowledge base
```

## Design System

**Colors**: CSS variables in `app/globals.css`
- SPARCC gradient: Purple → Fuchsia → Pink → Yellow (#9333ea → #c026d3 → #db2777 → #facc15)
- 6 P's semantic colors (people, process, platform, performance, profit, purpose)
- Dark mode support via `.dark` class

**Typography**: Inter font (sans), Fira Code (mono)
**Icons**: Radix UI Icons only
**Component Classes**: Tailwind utility-first (no custom component classes in v4)

## Deployment

**Production**: ps-edge.info (Vercel)
**Environment**: PostgreSQL + Prisma (or synthetic mode)
**Build Output**: Next.js standalone

**Environment Variables**:
```bash
DATABASE_URL="postgresql://..."       # PostgreSQL connection
BINDING_MODE=synthetic                # Data source mode
ENABLE_DEMO_DATA=true                 # Load demo data
NEXTAUTH_SECRET=                      # Session encryption
NEXTAUTH_URL=https://ps-edge.info    # Auth callback URL
TELEMETRY_API_KEY=                    # Telemetry ingestion key
```

## Testing Strategy

- **GitHub Actions CI**: Type checking + Build + Smoke test
- **Synthetic Mode**: Zero-DB development & testing
- **Type Safety**: Strict TypeScript + Zod validation
- **Smoke Test**: Basic homepage load validation in CI

## Knowledge Base

**Location**: `kb/` directory
**Integration**: PageKbProvider for per-page articles
**Format**: Markdown with gray-matter frontmatter
**Report**: `npm run kb:report`

## Command Palette

**Trigger**: Cmd+K / Ctrl+K
**Component**: `src/components/CommandPalette.tsx`
**Features**: Fuzzy search, navigation, create actions

## Related Projects

- **AICR** - Primary development platform (monorepo)
- **SGM-SPARCC-Demo** - Gold standard demo reference
- **PS-Edge Rally** - AICR rally definition (`rallies/demos/ps-edge.yaml`)

## Status

**Current Phase**: Demo-Ready Production

**Features**:
- ✅ 6 P's Navigation (29 pages)
- ✅ Contracts + Ports + Bindings architecture
- ✅ Synthetic data mode (1000+ records)
- ✅ AI components (OpsChief, AskPS, Pulse, Task)
- ✅ Demo data badge
- ✅ Context provider stack
- ✅ Command palette
- ✅ GitHub Actions CI
- ✅ Tailwind CSS 4.1.18
- ✅ Enhanced .claude/ documentation

**Next Steps**:
- Comprehensive Zod validation on all API routes
- Live database mode implementation
- Electron desktop app (optional)
- Docker containerization (optional)

---

**Quick Start**: `npm install && npm run dev` (port 3033)
