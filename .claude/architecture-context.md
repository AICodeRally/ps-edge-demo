# PS-Edge Demo - Architecture Context

## Architecture Pattern: Contracts + Ports + Bindings

This application implements a 3-layer clean architecture pattern designed for flexible data sourcing and easy testing.

## Layer 1: Contracts

**Location**: `src/lib/contracts/`

**Purpose**: Define domain entities with both TypeScript types and Zod schemas

**Structure**:
```typescript
// Example: src/lib/contracts/client.contract.ts
import { z } from 'zod';

export const ClientSchema = z.object({
  id: z.string().cuid(),
  tenantId: z.string(),
  name: z.string().min(1).max(200),
  industry: z.string(),
  status: z.enum(['active', 'inactive', 'prospect']),
  // ... more fields
});

export type Client = z.infer<typeof ClientSchema>;
```

**Benefits**:
- Runtime validation via Zod
- Compile-time type safety via TypeScript
- Single source of truth for entity shape
- API request/response validation

**Current Contracts**:
- `client.contract.ts` - Client entity
- `engagement.contract.ts` - Project engagements
- `consultant.contract.ts` - Team members
- `time-entry.contract.ts` - Time tracking
- `invoice.contract.ts` - Billing
- `deliverable.contract.ts` - Project deliverables
- `proposal.contract.ts` - Sales proposals
- `client-tenant.contract.ts` - Channel partner tenants
- `client-signal.contract.ts` - Telemetry signals

## Layer 2: Ports

**Location**: `src/lib/ports/`

**Purpose**: Define service interfaces for dependency injection

**Structure**:
```typescript
// Example: src/lib/ports/client.port.ts
import type { Client } from '@/src/lib/contracts/client.contract';

export interface IClientPort {
  getClients(): Promise<Client[]>;
  getClientById(id: string): Promise<Client | null>;
  createClient(data: Partial<Client>): Promise<Client>;
  updateClient(id: string, data: Partial<Client>): Promise<Client>;
  deleteClient(id: string): Promise<void>;
}
```

**Benefits**:
- No implementation details in interface
- Enables dependency injection
- Swappable implementations
- Easy to mock for testing

## Layer 3: Bindings

**Location**: `src/lib/bindings/`

**Purpose**: Provide concrete implementations of ports

**Modes**:

### 1. Synthetic (Default)

**Location**: `src/lib/bindings/synthetic/`

In-memory providers with pre-loaded mock data. Zero external dependencies.

```typescript
// Example: src/lib/bindings/synthetic/client.synthetic.ts
export class SyntheticClientProvider implements IClientPort {
  private clients: Map<string, Client>;

  constructor() {
    this.clients = new Map(syntheticClients.map(c => [c.id, c]));
  }

  async getClients(): Promise<Client[]> {
    return Array.from(this.clients.values());
  }

  // ... implement all IClientPort methods
}
```

**Benefits**:
- Instant demo-ready
- No database required
- Perfect for development
- Fast test execution
- 1000+ mock records across 12 models

### 2. Live (Future)

**Location**: `src/lib/bindings/live/`

Prisma-based database access for production deployments.

```typescript
// Example: src/lib/bindings/live/client.live.ts
export class LiveClientProvider implements IClientPort {
  constructor(private prisma: PrismaClient) {}

  async getClients(): Promise<Client[]> {
    return await this.prisma.client.findMany({
      where: { tenantId: 'ppg-main' }
    });
  }

  // ... implement all IClientPort methods
}
```

**Use Cases**:
- Production deployments (ps-edge.info)
- Multi-tenant SaaS
- Persistent data storage

## Provider Registry

**Location**: `src/lib/bindings/registry.ts`

**Purpose**: Resolve ports to implementations based on configuration

```typescript
export class ProviderRegistry {
  getClient(): IClientPort {
    const mode = getBindingMode();
    switch (mode) {
      case 'synthetic': return new SyntheticClientProvider();
      case 'live': return new LiveClientProvider(prisma);
      default: throw new Error(`Unknown binding mode: ${mode}`);
    }
  }
}
```

## Configuration

**Location**: `src/lib/config/binding-config.ts`

```typescript
export type BindingMode = 'synthetic' | 'live';

export interface BindingConfig {
  providers: {
    client: BindingMode;
    engagement: BindingMode;
    consultant: BindingMode;
    timeEntry: BindingMode;
    invoice: BindingMode;
    deliverable: BindingMode;
    proposal: BindingMode;
    clientTenant: BindingMode;
    clientSignal: BindingMode;
    clientBenchmark: BindingMode;
    partnerRevenue: BindingMode;
    apiUsageLog: BindingMode;
  };
  dataLoad: {
    demo: boolean;
    templates: boolean;
  };
}
```

**Environment Variables**:
- `BINDING_MODE=synthetic` - Sets default mode for all providers
- `ENABLE_DEMO_DATA=true` - Load demo data (default in dev)
- `DATABASE_URL` - PostgreSQL connection string (for live mode)

## Data Flow

### 1. Page Component → API Route → Port → Binding

```
app/dashboard/purpose/clients/page.tsx
  ↓
GET /api/clients
  ↓
src/lib/bindings/registry.ts → getClient()
  ↓
src/lib/bindings/synthetic/client.synthetic.ts (in dev)
  ↓
Returns: Client[]
```

### 2. Demo Data Mode

All pages display a "Demo Data" badge in the navbar when running in synthetic mode:

```tsx
{/* Navbar.tsx */}
<span className="px-3 py-1 text-sm font-bold uppercase" style={{
  background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FDB813 100%)'
}}>
  Demo Data
</span>
```

## 6 P's Framework

**Navigation Pattern**: Footer-based navigation with 6 categories

| P | Color | Focus | Pages |
|---|-------|-------|-------|
| **People** | Purple | Team capacity, utilization | Team, Capacity, Onboarding |
| **Process** | Violet | Workflow efficiency | Engagements, Deliverables, Support, Documents, Knowledge |
| **Platform** | Fuchsia | Technology, tools | AI, Integrations, Data, Usage, Tenants, Settings |
| **Performance** | Pink | KPIs, outcomes | KPI Dashboard, Health, Pipeline, Benchmarks, Signals |
| **Profit** | Orange | Revenue, margins | Revenue, Timesheets, Invoices, Commissions, Partner Revenue |
| **Purpose** | Yellow | Mission alignment | Mission Dashboard, Success, Renewals, Proposals, Clients |

**Route Structure**:
```
/dashboard/{p}/{page}

Examples:
- /dashboard/people/team
- /dashboard/process/engagements
- /dashboard/platform/ai
- /dashboard/performance/kpis
- /dashboard/profit/revenue
- /dashboard/purpose/clients
```

## AI Components

All AI components use purple-themed gradients (purple = AI):

### OpsChiefOrb
**Location**: `src/components/ai/OpsChiefOrb.tsx`
- Business health insights
- Dark purple gradient: `#7c3aed → #5b21b6`
- Severity levels: critical, high, medium, low

### AskPSOrb
**Location**: `src/components/ai/AskPSOrb.tsx`
- Conversational AI assistant
- Light purple gradient: `#9333ea → #c026d3`
- Markdown support

### PulseOrb & TaskOrb
**Location**: `src/components/ai/PulseOrb.tsx`, `TaskOrb.tsx`
- Health metrics & task management
- Purple-themed widgets

## Context Provider Stack

**Location**: `app/layout.tsx`

```tsx
<SessionProvider>          {/* NextAuth authentication */}
  <ThemeProvider>          {/* Light/dark mode */}
    <BrandProvider>        {/* 6 P's branding */}
      <AISettingsProvider> {/* AI feature toggles */}
        <PageTitleProvider>{/* Dynamic page titles */}
          <PageKbProvider> {/* Knowledge base */}
            {children}
          </PageKbProvider>
        </PageTitleProvider>
      </AISettingsProvider>
    </BrandProvider>
  </ThemeProvider>
</SessionProvider>
```

## Database Schema (Prisma)

**Location**: `prisma/schema.prisma`

**12 Models**:

### Professional Services (7):
- `Client` - Consulting clients
- `Engagement` - Active projects
- `Proposal` - Sales proposals
- `TimeEntry` - Time tracking
- `Invoice` - Billing records
- `Deliverable` - Project outputs
- `Consultant` - Team members

### Channel Partner Portal (5):
- `ClientTenant` - Partner tenant deployments
- `ClientSignal` - Telemetry signals
- `ClientBenchmark` - Performance benchmarks
- `PartnerRevenue` - Commission tracking
- `ApiUsageLog` - API usage metrics

**Multi-Tenant Strategy**:
- PPG uses `tenantId: 'ppg-main'` for internal data
- Channel partners have unique tenant IDs
- All models scoped to tenant

## Deployment

**Production**: ps-edge.info
**Dev Server**: localhost:3033
**Build**: Next.js standalone output
**Environment**: Vercel + PostgreSQL (or synthetic mode)

## Key Commands

```bash
npm run dev              # Start dev server (port 3033)
npm run build            # Production build
npm run start            # Run production build
npm run lint             # ESLint
npx prisma studio        # Visual DB browser
npx prisma db push       # Push schema changes
npm run kb:report        # Knowledge base report
```

## Design System

**Colors**: CSS variables defined in `app/globals.css`
- SPARCC gradient: Purple → Fuchsia → Pink → Yellow
- 6 P's colors: People (purple), Process (violet), Platform (fuchsia), Performance (pink), Profit (orange), Purpose (yellow)
- Dark mode support via `.dark` class

**Typography**: Inter font family
**Icons**: Radix UI Icons
**Charts**: Recharts
**Styling**: Tailwind CSS 4.1.18

## Testing Strategy

**GitHub Actions CI**: Type checking + Build + Smoke test
**Synthetic Mode**: Zero-DB development & testing
**Type Safety**: Strict TypeScript + Zod validation

## Knowledge Base Integration

**PageKbProvider**: Per-page knowledge articles
**Location**: `kb/` directory
**Integration**: KBCC (Knowledge Base Control Center)
**Format**: Markdown with gray-matter frontmatter

## Command Palette

**Location**: `src/components/CommandPalette.tsx`
**Trigger**: Cmd+K / Ctrl+K
**Features**: Fuzzy search, navigation, create actions

---

This architecture enables rapid demo deployment while maintaining production-grade code quality and clear migration path to live database backends.
