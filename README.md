# PS-Edge Demo
**Professional Services Edge for Phoenix Philanthropy Group (PPG)**

A dual-purpose platform combining:
1. **Professional Services Business Operations** - Managing PPG's consulting business (clients, projects, proposals, time tracking, billing)
2. **Multi-Tenant Channel Partner Portal** - Managing nonprofit clients using NP-Edge product (telemetry ingestion, benchmarking, health monitoring)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL + Prisma ORM
- **UI**: React 19.2, TypeScript 5.9, Tailwind CSS 4.1
- **Charts**: Recharts 3.4
- **Icons**: Radix UI Icons

## Project Structure

```
ps-edge-demo/
├── app/                    # Next.js App Router
│   ├── dashboard/          # Main application pages
│   │   ├── sales/          # Sales department
│   │   ├── delivery/       # Delivery department
│   │   ├── client-success/ # Client Success department
│   │   ├── finance/        # Finance department
│   │   └── partner-portal/ # Partner Portal department
│   └── api/                # API routes
│       ├── telemetry/      # Telemetry ingestion endpoint
│       ├── ps-edge/        # Business logic APIs
│       └── channel/        # Channel partner APIs
├── src/
│   ├── components/         # Reusable UI components
│   ├── types/ps-edge/      # TypeScript type definitions
│   ├── data/ps-edge/       # Mock data for development
│   └── lib/                # Utilities and helpers
├── prisma/
│   └── schema.prisma       # Database schema (12 models)
└── tailwind.config.js      # PS-Edge brand colors
```

## Department Structure

PS-Edge organizes around 5 core departments:

| Department | Color | Primary Functions |
|------------|-------|-------------------|
| **Sales** | Orange (#f97316) | Pipeline, Proposals, Client Onboarding |
| **Delivery** | Blue (#3b82f6) | Projects, Engagements, Deliverables |
| **Client Success** | Green (#10b981) | Client Health, Support, Renewals |
| **Finance** | Purple (#9333ea) | Invoicing, Revenue, Time Tracking |
| **Partner Portal** | Teal (#14b8a6) | Tenant Monitoring, Benchmarks, Signals |

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

   Open [http://localhost:3010](http://localhost:3010) to view the application.

## Development

### Available Scripts

- `npm run dev` - Start development server on port 3010
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database Management

- `npx prisma studio` - Open Prisma Studio to view/edit data
- `npx prisma generate` - Regenerate Prisma Client after schema changes
- `npx prisma db push` - Push schema changes to database
- `npx prisma migrate dev` - Create a new migration

## Features

### Phase 1: MVP (Current)
- ✅ Next.js 16 project structure
- ✅ Prisma schema with 12 models
- ✅ TypeScript types for all entities
- ✅ Tailwind design system with department colors
- ⏳ Professional services core pages
- ⏳ Partner portal foundation
- ⏳ Mock data for demos

### Phase 2: Advanced (Planned)
- Telemetry ingestion API endpoint
- Health score calculation
- Portfolio benchmarking
- Signal-based alerting
- Advanced analytics dashboards

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

## Design System

### Brand Colors
- **Primary Brand**: Teal (#14b8a6)
- **Sales**: Orange (#f97316)
- **Delivery**: Blue (#3b82f6)
- **Client Success**: Green (#10b981)
- **Finance**: Purple (#9333ea)
- **Partner Portal**: Teal (#14b8a6)

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
