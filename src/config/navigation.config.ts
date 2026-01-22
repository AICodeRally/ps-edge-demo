/**
 * PS-Edge Navigation Configuration
 * Single source of truth for 6 P's-based navigation structure
 *
 * PHILOSOPHY: Organize by FUNCTION, not DEPARTMENT
 * - Eliminates departmental silos and promotes cross-functional collaboration
 * - People find what they need by what they're trying to do (the P), not which team owns it
 * - Encourages inclusion over exclusion, shared ownership over fiefdoms
 *
 * Maps pages to their corresponding P (People, Process, Platform, Performance, Profit, Purpose)
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
        description: 'View and manage team members',
        legacyHref: '/dashboard/delivery/team',
      },
      {
        name: 'Capacity & Utilization',
        href: '/dashboard/people/capacity',
        description: 'Track team capacity and utilization metrics',
      },
      {
        name: 'Onboarding',
        href: '/dashboard/people/onboarding',
        description: 'Client and employee onboarding workflows',
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
        description: 'Active client engagements and projects',
        legacyHref: '/dashboard/delivery/engagements',
      },
      {
        name: 'Deliverables',
        href: '/dashboard/process/deliverables',
        description: 'Track deliverables across engagements',
        legacyHref: '/dashboard/delivery/deliverables',
      },
      {
        name: 'Support',
        href: '/dashboard/process/support',
        description: 'Client support tickets and requests',
        legacyHref: '/dashboard/client-success/support',
      },
      {
        name: 'Document Library',
        href: '/dashboard/process/documents',
        description: 'Centralized document repository',
        legacyHref: '/dashboard/operations/documents',
      },
      {
        name: 'Knowledge Library',
        href: '/dashboard/process/knowledge',
        description: 'Knowledge base and best practices',
        legacyHref: '/dashboard/operations/knowledge',
      },
      {
        name: 'Timesheets',
        href: '/dashboard/process/timesheets',
        description: 'Time tracking and billable hours',
        legacyHref: '/dashboard/finance/timesheets',
      },
      {
        name: 'Invoices',
        href: '/dashboard/process/invoices',
        description: 'Invoice management and payments',
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
        name: 'AI Tools',
        href: '/dashboard/practice/ai',
        description: 'AI tools for consulting delivery and product features',
        legacyHref: '/dashboard/operations/ai',
      },
      {
        name: 'Integrations',
        href: '/dashboard/practice/integrations',
        description: 'Consulting tools and NP-Edge platform connectors',
        legacyHref: '/dashboard/operations/integrations',
      },
      {
        name: 'Data Management',
        href: '/dashboard/practice/data',
        description: 'Client engagement data and NP-Edge tenant data quality',
        legacyHref: '/dashboard/operations/data',
      },
      {
        name: 'Tenant Management',
        href: '/dashboard/practice/tenants',
        description: 'NP-Edge customer portal and health monitoring',
        legacyHref: '/dashboard/partner-portal/tenants',
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
        description: 'Aggregated 6 Ps KPIs and metrics',
      },
      {
        name: 'Client Health',
        href: '/dashboard/performance/health',
        description: 'Client health scores and monitoring',
        legacyHref: '/dashboard/client-success/health',
      },
      {
        name: 'Pipeline',
        href: '/dashboard/performance/pipeline',
        description: 'Sales pipeline and deal tracking',
        legacyHref: '/dashboard/sales/pipeline',
      },
      {
        name: 'Benchmarks',
        href: '/dashboard/performance/benchmarks',
        description: 'Industry benchmarks and comparisons',
        legacyHref: '/dashboard/partner-portal/benchmarks',
      },
      {
        name: 'Signals',
        href: '/dashboard/performance/signals',
        description: 'Real-time client signals and alerts',
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
        description: 'Active deals and opportunities tracking',
        legacyHref: '/dashboard/sales/pipeline',
      },
      {
        name: 'Proposals',
        href: '/dashboard/pipeline/proposals',
        description: 'Proposal tracking and win rates',
      },
      {
        name: 'Revenue Forecasting',
        href: '/dashboard/pipeline/forecasting',
        description: 'Sales forecasting and revenue targets',
        legacyHref: '/dashboard/finance/revenue',
      },
      {
        name: 'Commissions',
        href: '/dashboard/pipeline/commissions',
        description: 'Sales team compensation and payouts',
        legacyHref: '/dashboard/partner-portal/commissions',
      },
      {
        name: 'Partner Revenue',
        href: '/dashboard/pipeline/partner-revenue',
        description: 'NP-Edge channel sales revenue',
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
        description: 'Mission alignment and impact metrics',
      },
      {
        name: 'Client Success',
        href: '/dashboard/purpose/success',
        description: 'Client success stories and testimonials',
        legacyHref: '/dashboard/client-success',
      },
      {
        name: 'Renewals',
        href: '/dashboard/purpose/renewals',
        description: 'Client renewal tracking and health',
        legacyHref: '/dashboard/client-success/renewals',
      },
      {
        name: 'Proposals',
        href: '/dashboard/purpose/proposals',
        description: 'Proposal creation and tracking',
        legacyHref: '/dashboard/sales/proposals',
      },
      {
        name: 'Clients',
        href: '/dashboard/purpose/clients',
        description: 'Client directory and relationships',
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
