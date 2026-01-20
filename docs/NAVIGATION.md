# PS-Edge Navigation Guide

**Version:** 2.0 (6 P's Navigation)
**Last Updated:** January 20, 2026
**Migration Status:** ✅ Complete

---

## Overview

PS-Edge uses a **6 P's-based navigation system** following the SGM pattern (sticky navbar + fixed footer, no sidebar). All 29 pages are organized under the 6 P's framework for better business alignment and mobile-first UX.

---

## Navigation Architecture

### Layout Pattern (SGM)

```
┌─────────────────────────────────────┐
│ Navbar (sticky, top)                │ ← Logo, Active P, Breadcrumbs, User
├─────────────────────────────────────┤
│                                     │
│ Main Content (pb-24)                │ ← Full-width, max-w-7xl mx-auto
│                                     │
│                                     │
├─────────────────────────────────────┤
│ Footer (fixed, bottom)              │ ← 6 P's Links, AI Orbs, Legal
└─────────────────────────────────────┘
```

**Key Features:**
- No left sidebar (mobile-first)
- Footer navigation always visible
- Full-width content area
- Responsive on all devices

---

## 6 P's Navigation Structure

### PEOPLE `/dashboard/people`
**Color:** Purple (#7c3aed)
**Focus:** Team capacity, utilization, and workforce metrics

| Page | Route | Description |
|------|-------|-------------|
| **Team** | `/dashboard/people/team` | Team member directory and utilization tracking |
| **Capacity** | `/dashboard/people/capacity` | Aggregated capacity and utilization metrics |
| **Onboarding** | `/dashboard/people/onboarding` | Client and employee onboarding workflows |

**Legacy Routes:** `/dashboard/delivery/team`, `/dashboard/client-success/onboarding`

---

### PROCESS `/dashboard/process`
**Color:** Violet (#8b5cf6)
**Focus:** Workflow efficiency, deliverables, and timelines

| Page | Route | Description |
|------|-------|-------------|
| **Engagements** | `/dashboard/process/engagements` | Active client engagements and projects |
| **Deliverables** | `/dashboard/process/deliverables` | Project deliverables and completion tracking |
| **Support** | `/dashboard/process/support` | Client support tickets and issue resolution |
| **Documents** | `/dashboard/process/documents` | Document library (templates, contracts, proposals) |
| **Knowledge** | `/dashboard/process/knowledge` | Knowledge base (methodologies, playbooks, best practices) |

**Legacy Routes:** `/dashboard/delivery/engagements`, `/dashboard/delivery/deliverables`, `/dashboard/client-success/support`, `/dashboard/operations/documents`, `/dashboard/operations/knowledge`

---

### PLATFORM `/dashboard/platform`
**Color:** Fuchsia (#c026d3)
**Focus:** Technology, tools, and systems enablement

| Page | Route | Description |
|------|-------|-------------|
| **AI Management** | `/dashboard/platform/ai` | AI tools and agents management |
| **Integration Hub** | `/dashboard/platform/integrations` | Third-party integrations and APIs |
| **Data Management** | `/dashboard/platform/data` | Data sources and pipelines |
| **API Usage** | `/dashboard/platform/usage` | API usage monitoring and logs |
| **Tenant Management** | `/dashboard/platform/tenants` | Multi-tenant client management |
| **Settings** | `/dashboard/platform/settings` | Platform configuration and preferences |

**Legacy Routes:** `/dashboard/operations/ai`, `/dashboard/operations/integrations`, `/dashboard/operations/data`, `/dashboard/partner-portal/usage`, `/dashboard/partner-portal/tenants`, `/dashboard/settings`

---

### PERFORMANCE `/dashboard/performance`
**Color:** Pink (#db2777)
**Focus:** KPIs, outcomes, and operational metrics

| Page | Route | Description |
|------|-------|-------------|
| **KPI Dashboard** | `/dashboard/performance/kpis` | Aggregated 6 P's performance metrics (NEW) |
| **Client Health** | `/dashboard/performance/health` | Client health scores and engagement tracking |
| **Pipeline** | `/dashboard/performance/pipeline` | Sales pipeline and deal tracking (Kanban view) |
| **Benchmarks** | `/dashboard/performance/benchmarks` | Industry benchmarks and comparisons |
| **Signals** | `/dashboard/performance/signals` | Real-time client signals and alerts |

**Legacy Routes:** `/dashboard/client-success/health`, `/dashboard/sales/pipeline`, `/dashboard/partner-portal/benchmarks`, `/dashboard/partner-portal/signals`

---

### PROFIT `/dashboard/profit`
**Color:** Orange (#f97316)
**Focus:** Revenue, margins, and financial health

| Page | Route | Description |
|------|-------|-------------|
| **Revenue Overview** | `/dashboard/profit/revenue` | Revenue tracking and forecasting |
| **Timesheets** | `/dashboard/profit/timesheets` | Time tracking and billable hours |
| **Invoices** | `/dashboard/profit/invoices` | Invoice management and payments |
| **Commissions** | `/dashboard/profit/commissions` | Partner commissions and payouts |
| **Partner Revenue** | `/dashboard/profit/partner-revenue` | Revenue sharing with partners |

**Legacy Routes:** `/dashboard/finance/revenue`, `/dashboard/finance/timesheets`, `/dashboard/finance/invoices`, `/dashboard/partner-portal/commissions`, `/dashboard/partner-portal/revenue`

---

### PURPOSE `/dashboard/purpose`
**Color:** Yellow (#facc15)
**Focus:** Mission alignment, client satisfaction, and impact

| Page | Route | Description |
|------|-------|-------------|
| **Mission Dashboard** | `/dashboard/purpose/mission` | Mission alignment and impact metrics (NEW) |
| **Client Success** | `/dashboard/purpose/success` | Client success stories and testimonials |
| **Renewals** | `/dashboard/purpose/renewals` | Client renewal tracking and health |
| **Proposals** | `/dashboard/purpose/proposals` | Proposal creation and tracking |
| **Clients** | `/dashboard/purpose/clients` | Client directory and relationships |

**Legacy Routes:** `/dashboard/client-success`, `/dashboard/client-success/renewals`, `/dashboard/sales/proposals`, `/dashboard/sales/clients`

---

## Navigation Flow

### User Journey

1. **Entry Point:** User lands on `/dashboard`
2. **Footer Navigation:** Click any of the 6 P's links in footer
3. **Landing Page:** View P landing page with quick links grid
4. **Sub-Page:** Click quick link to navigate to specific page
5. **Active State:** Current P highlighted in footer, navbar shows active P indicator

### Example: Finding Team Members

```
/dashboard
  ↓ (click "People" in footer)
/dashboard/people
  ↓ (click "Team" quick link)
/dashboard/people/team
```

---

## Component Architecture

### Key Components

**Layout Components:**
- `Navbar.tsx` - Top navigation with logo, active P indicator, breadcrumbs, user dropdown
- `Footer.tsx` - 6 P's links, AI orbs, legal links, branding
- `Breadcrumbs.tsx` - Dynamic breadcrumb trail (Dashboard → P → Page)

**Navigation Components:**
- `PLandingPage.tsx` - Reusable landing page template for each P
- Navigation config: `/src/config/navigation.config.ts`

**Configuration:**
- `navigation.config.ts` - Single source of truth for all routes and mappings
- `brand.config.ts` - 6 P's colors and gradients
- `six-ps.types.ts` - TypeScript definitions for 6 P's framework

---

## Redirect Strategy

All legacy department-based routes automatically redirect to new P-based routes:

```typescript
// Example: /dashboard/delivery/team
export default function LegacyTeamPage() {
  redirect('/dashboard/people/team');
}
```

**Benefits:**
- No broken links
- Bookmarks continue working
- Search engine indexing preserved
- Gradual user education

---

## Mobile Experience

### Footer Navigation (Mobile-First)

On mobile (< 640px):
- Footer remains fixed at bottom
- AI orbs hide automatically
- 6 P's links wrap responsively
- Touch-friendly tap targets
- No hamburger menu needed

### Responsive Breakpoints

```css
sm:  640px  /* Show AI orbs */
md:  768px  /* Show active P indicator in navbar */
lg:  1024px /* Show breadcrumbs in navbar center */
```

---

## Dark Mode Support

All navigation components support dark mode:
- Navbar: `dark:bg-gray-900`
- Footer: `dark:bg-gray-900`
- Active states: `dark:text-purple-400`
- Borders: `dark:border-gray-800`

---

## Accessibility

### WCAG 2.1 AA Compliance

✅ **Keyboard Navigation**
- All links focusable
- Logical tab order
- Skip links available

✅ **Color Contrast**
- 6 P's colors meet 4.5:1 minimum
- Dark mode variants tested

✅ **Screen Readers**
- Semantic HTML (`<nav>`, `<footer>`)
- ARIA labels on interactive elements
- Alt text on icons

---

## Performance

### Optimization Strategies

**Code Splitting:**
- Footer lazy loads on client
- P landing pages use dynamic imports

**CSS Optimization:**
- Tailwind CSS purges unused styles
- Gradient utilities pre-compiled

**Route Prefetching:**
- Next.js prefetches P links on hover
- Instant navigation between pages

---

## Development Guide

### Adding a New Page to a P

1. **Create route file:**
   ```bash
   mkdir -p app/dashboard/[p-slug]/[page-name]
   touch app/dashboard/[p-slug]/[page-name]/page.tsx
   ```

2. **Add to navigation config:**
   ```typescript
   // src/config/navigation.config.ts
   {
     category: 'PEOPLE',
     pages: [
       // ...existing pages
       {
         name: 'New Page',
         href: '/dashboard/people/new-page',
         description: 'Description of new page'
       }
     ]
   }
   ```

3. **Landing page auto-updates** - The P landing page will automatically show the new page in its quick links grid.

### Creating a New P (Future)

If you need to add a 7th P:

1. Add to `six-ps.types.ts`:
   ```typescript
   export type SixPCategory = 'PEOPLE' | ... | 'NEW_P';
   ```

2. Add to `brand.config.ts`:
   ```typescript
   sixPs: {
     newP: { ... }
   }
   ```

3. Add to `navigation.config.ts`:
   ```typescript
   export const SIX_PS_NAVIGATION: PNavigation[] = [
     // ... existing
     { category: 'NEW_P', slug: 'new-p', pages: [...] }
   ]
   ```

4. Create landing page:
   ```typescript
   // app/dashboard/new-p/page.tsx
   export default function NewPPage() {
     return <PLandingPage category="NEW_P" />;
   }
   ```

---

## Troubleshooting

### Common Issues

**Q: Footer not showing on my page**
- A: Ensure dashboard layout is applied: page must be under `/app/dashboard/`

**Q: Active P not highlighting**
- A: Check that route matches pattern: `/dashboard/[p-slug]/...`

**Q: Breadcrumbs not showing**
- A: Breadcrumbs hidden on mobile/tablet. Only visible on `lg` breakpoint (1024px+)

**Q: Legacy route not redirecting**
- A: Verify redirect file exists at old route location with `redirect()` call

---

## Migration Notes

### What Changed (Jan 2026)

**Before:** Department-based sidebar navigation
```
/dashboard/sales/pipeline
/dashboard/delivery/team
/dashboard/finance/revenue
```

**After:** P-based footer navigation
```
/dashboard/performance/pipeline
/dashboard/people/team
/dashboard/profit/revenue
```

**Migration Status:**
- ✅ All 29 pages migrated
- ✅ All legacy redirects in place
- ✅ Navigation fully functional
- ✅ Mobile responsive
- ✅ Dark mode working

---

## Support

For questions or issues with navigation:
1. Check this guide first
2. Review `/src/config/navigation.config.ts`
3. See migration log: `.claude/plans/MIGRATION_LOG.md`
4. Contact: Development team

---

**Last Updated:** January 20, 2026
**Migration Version:** 2.0
**Status:** ✅ Production Ready
