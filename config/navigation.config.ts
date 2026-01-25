/**
 * PS-Edge Navigation Configuration
 * Single source of truth for 6 P's-based navigation structure
 *
 * PHILOSOPHY: Organize by FUNCTION, not DEPARTMENT
 * - Eliminates departmental silos and promotes cross-functional collaboration
 * - People find what they need by what they're trying to do (the P), not which team owns it
 * - Encourages inclusion over exclusion, shared ownership over fiefdoms
 *
 * Framework: PURPOSE → PEOPLE → PROCESS → PRACTICE → PIPELINE → PROFIT
 * Focus: Nonprofit consulting operations for Phoenix Philanthropy Group
 * Used by Footer, Navbar, Breadcrumbs, and routing logic
 */

import { type SixPCategory } from '@/src/types/ps-edge/six-ps.types';

export interface NavPage {
  name: string;
  href: string;
  description: string;
  // Old route (for migration/redirects)
  legacyHref?: string;
}

export interface PNavigation {
  category: SixPCategory;
  slug: string;
  landingPageHref: string;
  pages: NavPage[];
}

/**
 * 6 P's Navigation Structure
 *
 * Each P has:
 * - category: The SixPCategory enum value
 * - slug: URL segment (e.g., 'people')
 * - landingPageHref: Link to P landing page
 * - pages: Array of pages under this P
 */
export const SIX_PS_NAVIGATION: PNavigation[] = [
  {
    category: 'PEOPLE',
    slug: 'people',
    landingPageHref: '/dashboard/people',
    pages: [
      {
        name: 'Team',
        href: '/dashboard/people/team',
        description: 'Nonprofit consulting team directory and expertise',
        legacyHref: '/dashboard/delivery/team',
      },
      {
        name: 'Capacity & Utilization',
        href: '/dashboard/people/capacity',
        description: 'Consultant availability and utilization across nonprofit engagements',
      },
      {
        name: 'Onboarding',
        href: '/dashboard/people/onboarding',
        description: 'Onboarding nonprofit consultants and building sector expertise',
        legacyHref: '/dashboard/client-success/onboarding',
      },
    ],
  },
  {
    category: 'PROCESS',
    slug: 'process',
    landingPageHref: '/dashboard/process',
    pages: [
      {
        name: 'Engagements',
        href: '/dashboard/process/engagements',
        description: 'Active nonprofit client campaigns and consulting projects',
        legacyHref: '/dashboard/delivery/engagements',
      },
      {
        name: 'Deliverables',
        href: '/dashboard/process/deliverables',
        description: 'Campaign plans, strategic roadmaps, and feasibility studies',
        legacyHref: '/dashboard/delivery/deliverables',
      },
      {
        name: 'Support',
        href: '/dashboard/process/support',
        description: 'Nonprofit client support and inquiry management',
        legacyHref: '/dashboard/client-success/support',
      },
      {
        name: 'Document Library',
        href: '/dashboard/process/documents',
        description: 'Templates: case statements, donor pyramids, board materials',
        legacyHref: '/dashboard/operations/documents',
      },
      {
        name: 'Knowledge Library',
        href: '/dashboard/process/knowledge',
        description: 'Nonprofit sector best practices and methodologies',
        legacyHref: '/dashboard/operations/knowledge',
      },
      {
        name: 'Timesheets',
        href: '/dashboard/process/timesheets',
        description: 'Consultant billable hours on nonprofit engagements',
        legacyHref: '/dashboard/finance/timesheets',
      },
      {
        name: 'Invoices',
        href: '/dashboard/process/invoices',
        description: 'Client billing for completed nonprofit consulting work',
        legacyHref: '/dashboard/finance/invoices',
      },
    ],
  },
  {
    category: 'PRACTICE',
    slug: 'practice',
    landingPageHref: '/dashboard/practice',
    pages: [
      {
        name: 'Service Lines',
        href: '/dashboard/practice/services',
        description: '11 PPG nonprofit consulting service lines + 2026 AI offerings',
        legacyHref: '/dashboard/operations/ai',
      },
      {
        name: 'Methodologies',
        href: '/dashboard/practice/methodologies',
        description: 'Proven consulting frameworks for nonprofit sector excellence',
        legacyHref: '/dashboard/operations/integrations',
      },
      {
        name: 'Advancement Academy',
        href: '/dashboard/practice/academy',
        description: 'Professional development training for nonprofit professionals',
        legacyHref: '/dashboard/operations/data',
      },
      {
        name: 'Thought Leadership',
        href: '/dashboard/practice/thought-leadership',
        description: 'Nonprofit sector research, insights, and publications',
      },
    ],
  },
  {
    category: 'PERFORMANCE',
    slug: 'performance',
    landingPageHref: '/dashboard/performance',
    pages: [
      {
        name: 'KPI Dashboard',
        href: '/dashboard/performance/kpis',
        description: 'Business outcomes - operational KPIs, financial metrics, and efficiency',
      },
      {
        name: 'Client Health',
        href: '/dashboard/performance/health',
        description: 'Nonprofit client health scores and engagement quality',
        legacyHref: '/dashboard/client-success/health',
      },
      {
        name: 'Pipeline',
        href: '/dashboard/performance/pipeline',
        description: 'Sales pipeline snapshot (NOTE: Duplicate of PIPELINE P)',
        legacyHref: '/dashboard/sales/pipeline',
      },
      {
        name: 'Benchmarks',
        href: '/dashboard/performance/benchmarks',
        description: 'Nonprofit sector benchmarks and portfolio comparisons',
        legacyHref: '/dashboard/partner-portal/benchmarks',
      },
      {
        name: 'Signals',
        href: '/dashboard/performance/signals',
        description: 'Real-time alerts from nonprofit client engagements',
        legacyHref: '/dashboard/partner-portal/signals',
      },
    ],
  },
  {
    category: 'PIPELINE',
    slug: 'pipeline',
    landingPageHref: '/dashboard/pipeline',
    pages: [
      {
        name: 'Sales Pipeline',
        href: '/dashboard/pipeline/sales-pipeline',
        description: 'Nonprofit prospects by stage (lead → RFP → proposal → contract)',
        legacyHref: '/dashboard/sales/pipeline',
      },
      {
        name: 'Proposals',
        href: '/dashboard/pipeline/proposals',
        description: 'Active proposals to nonprofits - campaign, board, strategic planning',
      },
      {
        name: 'Revenue Forecasting',
        href: '/dashboard/pipeline/forecasting',
        description: 'Projected revenue from nonprofit prospect pipeline (future $)',
        legacyHref: '/dashboard/finance/revenue',
      },
      {
        name: 'Commissions',
        href: '/dashboard/pipeline/commissions',
        description: 'NP-Edge channel commissions (NOTE: Should move to PROFIT)',
        legacyHref: '/dashboard/partner-portal/commissions',
      },
      {
        name: 'Partner Revenue',
        href: '/dashboard/pipeline/partner-revenue',
        description: 'NP-Edge MRR/ARR tracking (NOTE: Should move to PROFIT)',
        legacyHref: '/dashboard/partner-portal/revenue',
      },
    ],
  },
  {
    category: 'PURPOSE',
    slug: 'purpose',
    landingPageHref: '/dashboard/purpose',
    pages: [
      {
        name: 'Mission Dashboard',
        href: '/dashboard/purpose/mission',
        description: 'PPG impact on nonprofit sector - dollars raised, leaders coached',
      },
      {
        name: 'Client Success',
        href: '/dashboard/purpose/success',
        description: 'Nonprofit campaign outcomes and client testimonials',
        legacyHref: '/dashboard/client-success',
      },
      {
        name: 'Renewals',
        href: '/dashboard/purpose/renewals',
        description: 'Nonprofit client retention and renewal tracking',
        legacyHref: '/dashboard/client-success/renewals',
      },
      {
        name: 'Proposals',
        href: '/dashboard/purpose/proposals',
        description: 'Proposals to nonprofit organizations (tied to client outcomes)',
        legacyHref: '/dashboard/sales/proposals',
      },
      {
        name: 'Clients',
        href: '/dashboard/purpose/clients',
        description: 'Nonprofit client directory (universities, museums, foundations)',
        legacyHref: '/dashboard/sales/clients',
      },
    ],
  },
];

/**
 * 7th P: PARTNERS (Toggleable Channel Partner Module)
 *
 * Displayed horizontally below the main 6 P grid when enabled.
 * Manages nonprofit NP-Edge tenant monitoring, telemetry, and channel revenue.
 */
export const PARTNERS_NAVIGATION = {
  category: 'PARTNERS' as const,
  slug: 'partners',
  landingPageHref: '/dashboard/partners',
  pages: [
    {
      name: 'Client Tenants',
      href: '/dashboard/partners/tenants',
      description: 'Nonprofit organizations using NP-Edge',
      legacyHref: '/dashboard/partner-portal/tenants',
    },
    {
      name: 'Signals Inbox',
      href: '/dashboard/partners/signals',
      description: 'Real-time health alerts from client deployments',
      legacyHref: '/dashboard/partner-portal/signals',
    },
    {
      name: 'Benchmarks',
      href: '/dashboard/partners/benchmarks',
      description: 'Portfolio-wide performance analytics',
      legacyHref: '/dashboard/partner-portal/benchmarks',
    },
    {
      name: 'Usage Analytics',
      href: '/dashboard/partners/usage',
      description: 'API usage and performance monitoring',
      legacyHref: '/dashboard/partner-portal/usage',
    },
    {
      name: 'Commissions',
      href: '/dashboard/partners/commissions',
      description: 'Revenue sharing and vendor costs',
      legacyHref: '/dashboard/partner-portal/commissions',
    },
    {
      name: 'Partner Revenue',
      href: '/dashboard/partners/revenue',
      description: 'MRR, ARR, and revenue stream tracking',
      legacyHref: '/dashboard/partner-portal/revenue',
    },
  ],
};

/**
 * Get P navigation by category
 */
export function getPNavigation(category: SixPCategory): PNavigation | undefined {
  return SIX_PS_NAVIGATION.find((p) => p.category === category);
}

/**
 * Get P navigation by slug
 */
export function getPNavigationBySlug(slug: string): PNavigation | undefined {
  return SIX_PS_NAVIGATION.find((p) => p.slug === slug);
}

/**
 * Get all pages across all P's
 */
export function getAllPages(): NavPage[] {
  return SIX_PS_NAVIGATION.flatMap((p) => p.pages);
}

/**
 * Find page by href
 */
export function getPageByHref(href: string): { page: NavPage; p: PNavigation } | undefined {
  for (const p of SIX_PS_NAVIGATION) {
    const page = p.pages.find((pg) => pg.href === href || pg.legacyHref === href);
    if (page) {
      return { page, p };
    }
  }
  return undefined;
}

/**
 * Get P category from pathname
 */
export function getPCategoryFromPath(pathname: string): SixPCategory | null {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length < 2 || segments[0] !== 'dashboard') return null;

  const pSlug = segments[1];
  const pNav = getPNavigationBySlug(pSlug);
  return pNav?.category || null;
}
