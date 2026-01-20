# PS-Edge Demo
**Professional Services Edge for Phoenix Philanthropy Group (PPG)**

> **Navigation:** 6 P's Framework (People, Process, Platform, Performance, Profit, Purpose)
> **Pattern:** SGM (sticky navbar + fixed footer, no sidebar)
> **Pages:** 29 pages organized by business dimension

A dual-purpose platform combining:
1. **Professional Services Business Operations** - Managing PPG's consulting business (clients, projects, proposals, time tracking, billing)
2. **Multi-Tenant Channel Partner Portal** - Managing nonprofit clients using NP-Edge product (telemetry ingestion, benchmarking, health monitoring)

**NEW:** All navigation organized through the **6 P's Framework** for holistic business management.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL + Prisma ORM
- **UI**: React 19.2, TypeScript 5.9, Tailwind CSS 4.1
- **Charts**: Recharts 3.4
- **Icons**: Radix UI Icons

## Project Structure (6 P's Architecture)

```
ps-edge-demo/
├── app/                        # Next.js App Router
│   ├── dashboard/              # Main application
│   │   ├── people/             # PEOPLE (3 pages): Team, Capacity, Onboarding
│   │   ├── process/            # PROCESS (5 pages): Engagements, Deliverables, Support, Docs, Knowledge
│   │   ├── platform/           # PLATFORM (6 pages): AI, Integrations, Data, Usage, Tenants, Settings
│   │   ├── performance/        # PERFORMANCE (5 pages): KPIs, Health, Pipeline, Benchmarks, Signals
│   │   ├── profit/             # PROFIT (5 pages): Revenue, Timesheets, Invoices, Commissions, Partner Revenue
│   │   └── purpose/            # PURPOSE (5 pages): Mission, Success, Renewals, Proposals, Clients
│   └── api/                    # API routes
│       ├── telemetry/          # Telemetry ingestion endpoint
│       ├── ps-edge/            # Business logic APIs
│       └── channel/            # Channel partner APIs
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── layout/             # Navbar, Footer, Breadcrumbs (SGM pattern)
│   │   └── ps-edge/            # PLandingPage, 6Ps components
│   ├── config/                 # Navigation and brand configuration
│   │   ├── navigation.config.ts  # 6 P's route mapping
│   │   └── brand.config.ts       # 6 P's colors and gradients
│   ├── types/ps-edge/          # TypeScript type definitions
│   ├── data/ps-edge/           # Mock data for development
│   └── lib/                    # Utilities and helpers
├── prisma/
│   └── schema.prisma           # Database schema (12 models)
├── docs/                       # Documentation
│   ├── NAVIGATION.md           # Navigation guide
│   └── 6PS_FRAMEWORK.md        # 6 P's philosophy and usage
└── .claude/
    └── plans/
        └── MIGRATION_LOG.md    # Migration tracking
```

## 🌟 Key Highlights

This demo serves as the **foundation for all future Edge demos** with:

- **29 fully functional pages** organized by the 6 P's Framework
- **SGM navigation pattern**: Footer-based navigation, no sidebar, mobile-first
- **Dual-purpose platform**: Internal business operations + channel partner management
- **Advanced AI integration**: Two specialized AI orbs with distinct personalities and use cases
- **6 P's business framework**: Holistic view across People, Process, Platform, Performance, Profit, Purpose
- **Complete brand customization**: Gradient color system with 6 P's color progression
- **Production-ready design system**: Reusable components, dark mode, responsive layouts
- **Comprehensive mock data**: 1000+ realistic records across 12 data models
- **Social media optimized**: Beautiful link previews, custom favicon, OpenGraph support
- **Legacy route support**: All old department routes redirect seamlessly

## 6 P's Framework - Functional Organization

PS-Edge organizes all functionality through the **6 P's Framework** - a holistic, cross-functional approach that eliminates departmental silos.

**Philosophy:** Organize by FUNCTION (what you're trying to do), not DEPARTMENT (who owns it).
- ✅ Promotes collaboration and shared ownership
- ✅ Reduces territorial thinking and fiefdoms
- ✅ Makes it easier to find what you need
- ✅ Encourages inclusion over exclusion

| P | Color | Focus | Pages |
|---|-------|-------|-------|
| **People** 👥 | Purple (#7c3aed) | Team capacity, utilization, workforce metrics | 3 |
| **Process** ⚙️ | Violet (#8b5cf6) | Workflow efficiency, deliverables, timelines | 5 |
| **Platform** 🔧 | Fuchsia (#c026d3) | Technology, tools, systems enablement | 6 |
| **Performance** 📊 | Pink (#db2777) | KPIs, outcomes, operational metrics | 5 |
| **Profit** 💰 | Orange (#f97316) | Revenue, margins, financial health | 5 |
| **Purpose** 🎯 | Yellow (#facc15) | Mission alignment, client satisfaction, impact | 5 |

**Total:** 29 pages across 6 P's

**Navigation:** Click any P in the footer to access its landing page, then navigate to specific pages via quick links.

See [docs/6PS_FRAMEWORK.md](docs/6PS_FRAMEWORK.md) for detailed philosophy and usage guide.

## Data Models

### Professional Services (7 models)
1. **Client** - PPG's consulting clients
2. **Engagement** - Consulting projects
3. **Proposal** - Sales proposals
4. **TimeEntry** - Consultant hours worked
5. **Invoice** - Client billing
6. **Deliverable** - Project deliverables
7. **Consultant** - PPG staff members

### Channel Partner (5 models)
1. **ClientTenant** - Nonprofits using NP-Edge that PPG manages
2. **ClientSignal** - Telemetry signals from client deployments
3. **ClientBenchmark** - Aggregated portfolio analytics
4. **PartnerRevenue** - Channel fees and commissions
5. **ApiUsageLog** - API usage tracking

## Getting Started

### Prerequisites
- Node.js 18.17.0 or later
- PostgreSQL database (or Vercel Postgres)
- pnpm, npm, or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Copy `.env.local` and update with your database URL:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/ps_edge_demo?schema=ppg-main"
   TELEMETRY_API_KEY="your-api-key-here"
   ```

3. **Initialize database**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3033](http://localhost:3033) to view the application.

## Development

### Available Scripts

- `npm run dev` - Start development server on port 3033
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database Management

- `npx prisma studio` - Open Prisma Studio to view/edit data
- `npx prisma generate` - Regenerate Prisma Client after schema changes
- `npx prisma db push` - Push schema changes to database
- `npx prisma migrate dev` - Create a new migration

## Features

### ✅ 6 P's Navigation (29 Pages)

**Core Infrastructure**
- ✅ Next.js 16 with App Router and TypeScript 5.9
- ✅ Prisma ORM with 12 data models
- ✅ SGM Pattern: Sticky navbar + fixed footer (no sidebar)
- ✅ 6 P's-based navigation (footer links)
- ✅ Tailwind CSS 4.1 with gradient design system
- ✅ Dark mode support with theme persistence
- ✅ Breadcrumb navigation system
- ✅ Mobile-first responsive design

**PEOPLE (3 pages)**
- ✅ **Team** - Team member directory with utilization tracking
- ✅ **Capacity** - Aggregated capacity and utilization metrics (NEW)
- ✅ **Onboarding** - Client/employee onboarding workflows

**PROCESS (5 pages)**
- ✅ **Engagements** - Active client engagements and projects
- ✅ **Deliverables** - Project deliverable tracking
- ✅ **Support** - Client support ticket management
- ✅ **Documents** - Template and contract library
- ✅ **Knowledge** - Methodologies and playbooks

**PLATFORM (6 pages)**
- ✅ **AI Management** - AI tools and agents
- ✅ **Integration Hub** - Third-party integrations
- ✅ **Data Management** - Data sources and pipelines
- ✅ **API Usage** - API monitoring and logs
- ✅ **Tenant Management** - Multi-tenant client management
- ✅ **Settings** - Platform configuration

**PERFORMANCE (5 pages)**
- ✅ **KPI Dashboard** - Aggregated 6 P's metrics (NEW)
- ✅ **Client Health** - Health scores and monitoring
- ✅ **Pipeline** - Sales pipeline Kanban view
- ✅ **Benchmarks** - Industry comparisons
- ✅ **Signals** - Real-time client alerts

**PROFIT (5 pages)**
- ✅ **Revenue Overview** - Revenue tracking and forecasting
- ✅ **Timesheets** - Time tracking and billable hours
- ✅ **Invoices** - Invoice management and payments
- ✅ **Commissions** - Partner commissions and payouts
- ✅ **Partner Revenue** - Revenue sharing tracking

**PURPOSE (5 pages)**
- ✅ **Mission Dashboard** - Mission alignment and impact (NEW)
- ✅ **Client Success** - Success stories and testimonials
- ✅ **Renewals** - Client renewal tracking
- ✅ **Proposals** - Proposal creation and tracking
- ✅ **Clients** - Client directory and relationships

**Legacy Route Support**
- ✅ All old department routes redirect to new P-based routes
- ✅ Bookmarks and external links continue working
- ✅ Smooth migration path for users

**AI Features**
- ✅ **OpsChief Orb**: Business health insights and operational analytics (dark purple gradient)
- ✅ **AskPS Orb**: Conversational AI assistant for professional services (light purple gradient)
- ✅ Pulsing glow animation when orbs are active (consuming telemetry, loading, processing)
- ✅ Inline sidebar positioning with toggle open/close
- ✅ Purple = AI (consistent visual language)

**Brand Customization**
- ✅ 3-color gradient customization (Start/Middle/End)
- ✅ Real-time UI updates across entire app
- ✅ Live preview in Settings page
- ✅ LocalStorage persistence
- ✅ CSS custom properties for dynamic theming
- ✅ Default: Purple (#9333ea) → Fuchsia (#c026d3) → Yellow (#facc15)

**Social Media & SEO**
- ✅ Dynamic favicon with PS logo (Next.js ImageResponse)
- ✅ OpenGraph meta tags for rich link previews
- ✅ Twitter Card support
- ✅ Apple touch icon for iOS home screen
- ✅ Beautiful social media preview cards (1200x630)

**Mock Data**
- ✅ 50+ clients with realistic nonprofit data
- ✅ 80+ engagements across 8 project types
- ✅ 100+ proposals with status tracking
- ✅ 500+ time entries with billable hours
- ✅ 120+ invoices with payment tracking
- ✅ 40+ deliverables with completion percentages
- ✅ 15+ consultants with specializations
- ✅ 25+ client tenants with health scores
- ✅ 60+ telemetry signals across 7 categories
- ✅ Benchmark data for 6 key metrics

### 🚀 Phase 2: Advanced (Future)
- Live telemetry ingestion from NP-Edge deployments
- Automated health score calculation engine
- Real-time signal-based alerting (email/Slack)
- QuickBooks integration for invoicing
- Stripe integration for payment processing
- Advanced revenue forecasting
- Resource allocation AI
- Automated benchmark calculation jobs

## Architecture Highlights

### Multi-Tenant Strategy
- **PPG** has single `tenantId: 'ppg-main'` for all internal data
- **Client tenants** emit telemetry signals to PPG's system
- Signals stored in PPG's schema under `ClientSignal` model

### Telemetry Data Flow
```
Client NP-Edge Deployments
       ↓ (HTTPS POST)
/api/telemetry/ingest
       ↓
1. Validate signal
2. Lookup ClientTenant
3. Store in ClientSignal
4. Update health score
5. Alert if critical/high
       ↓
Partner Portal Dashboard
```

## Navigation & UX

### 6 P's Footer Navigation

The application uses **footer-based navigation** following the SGM pattern:

**How to Navigate:**
1. Click any of the 6 P's links in the footer (People, Process, Platform, Performance, Profit, Purpose)
2. View the P landing page with quick links to all sub-pages
3. Click a quick link to navigate to the desired page
4. Use breadcrumbs in navbar to navigate back

**Active State:**
- Current P highlighted in footer with color and background
- Navbar shows active P indicator (on medium+ screens)
- Breadcrumbs show full path: Dashboard → P → Page

**Mobile Experience:**
- Footer remains fixed at bottom
- No hamburger menu needed
- All P links accessible
- Touch-friendly targets

See [docs/NAVIGATION.md](docs/NAVIGATION.md) for complete navigation guide.

## Design System

### 6 P's Colors (Gradient Progression)

The color system flows from purple to yellow, representing the journey from input to outcome:

- **People**: Purple (#7c3aed) - Foundation
- **Process**: Violet (#8b5cf6) - Execution
- **Platform**: Fuchsia (#c026d3) - Enablement
- **Performance**: Pink (#db2777) - Measurement
- **Profit**: Orange (#f97316) - Sustainability
- **Purpose**: Yellow (#facc15) - Impact

### Component Variants
- Buttons: `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.btn-destructive`
- Cards: `.card`, `.card-elevated`, `.card-interactive`
- Badges: `.badge-primary`, `.badge-success`, `.badge-warning`, `.badge-danger`

### Typography
- Display sizes: `text-display-2xl` to `text-display-sm`
- Body sizes: `text-body-xl` to `text-body-xs`
- Label sizes: `text-label-lg` to `text-label-sm`

## License

Private - Phoenix Philanthropy Group Demo

## Support

For questions or issues, contact the development team.
