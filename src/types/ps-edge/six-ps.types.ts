/**
 * 6Ps Framework Type Definitions
 * Business performance tracking across People, Process, Platform, Performance, Profit, Purpose
 */

export type SixPCategory = 'PEOPLE' | 'PROCESS' | 'PLATFORM' | 'PERFORMANCE' | 'PROFIT' | 'PURPOSE';

export interface SixPMetric {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  icon?: string;
  color?: string;
}

export interface SixPSection {
  category: SixPCategory;
  title: string;
  description: string;
  icon: string;
  color: string;
  metrics: SixPMetric[];
}

export interface DepartmentSixPs {
  department: 'SALES' | 'DELIVERY' | 'CLIENT_SUCCESS' | 'FINANCE' | 'AGGREGATE';
  people: SixPSection;
  process: SixPSection;
  platform: SixPSection;
  performance: SixPSection;
  profit: SixPSection;
  purpose: SixPSection;
}

import { BRAND_CONFIG } from '@/src/config/brand.config';

// 6Ps Definitions with Radix icon names - Colors derived from brand gradient
export const SIX_PS_DEFINITIONS: Record<SixPCategory, { title: string; description: string; iconName: string; color: string; bgColor: string; borderColor: string; hoverShadow: string }> = {
  PEOPLE: {
    title: 'People',
    description: 'Team capacity, utilization, and workforce metrics',
    iconName: 'PersonIcon',
    color: BRAND_CONFIG.sixPs.people.textClass,
    bgColor: BRAND_CONFIG.sixPs.people.bgClass,
    borderColor: BRAND_CONFIG.sixPs.people.borderClass,
    hoverShadow: BRAND_CONFIG.sixPs.people.hoverShadow,
  },
  PROCESS: {
    title: 'Process',
    description: 'Workflow efficiency, deliverables, and timelines',
    iconName: 'GearIcon',
    color: BRAND_CONFIG.sixPs.process.textClass,
    bgColor: BRAND_CONFIG.sixPs.process.bgClass,
    borderColor: BRAND_CONFIG.sixPs.process.borderClass,
    hoverShadow: BRAND_CONFIG.sixPs.process.hoverShadow,
  },
  PLATFORM: {
    title: 'Product',
    description: 'Technology, tools, and systems enablement',
    iconName: 'CubeIcon', // Product/technology icon
    color: BRAND_CONFIG.sixPs.platform.textClass,
    bgColor: BRAND_CONFIG.sixPs.platform.bgClass,
    borderColor: BRAND_CONFIG.sixPs.platform.borderClass,
    hoverShadow: BRAND_CONFIG.sixPs.platform.hoverShadow,
  },
  PERFORMANCE: {
    title: 'Pipeline',
    description: 'Sales pipeline, deals, and revenue forecasting',
    iconName: 'LayersIcon', // Pipeline/stages icon
    color: BRAND_CONFIG.sixPs.performance.textClass,
    bgColor: BRAND_CONFIG.sixPs.performance.bgClass,
    borderColor: BRAND_CONFIG.sixPs.performance.borderClass,
    hoverShadow: BRAND_CONFIG.sixPs.performance.hoverShadow,
  },
  PROFIT: {
    title: 'Performance',
    description: 'Revenue, margins, and financial performance',
    iconName: 'BarChartIcon', // Performance/metrics icon
    color: BRAND_CONFIG.sixPs.profit.textClass,
    bgColor: BRAND_CONFIG.sixPs.profit.bgClass,
    borderColor: BRAND_CONFIG.sixPs.profit.borderClass,
    hoverShadow: BRAND_CONFIG.sixPs.profit.hoverShadow,
  },
  PURPOSE: {
    title: 'Purpose',
    description: 'Mission alignment, client satisfaction, and impact',
    iconName: 'TargetIcon',
    color: BRAND_CONFIG.sixPs.purpose.textClass,
    bgColor: BRAND_CONFIG.sixPs.purpose.bgClass,
    borderColor: BRAND_CONFIG.sixPs.purpose.borderClass,
    hoverShadow: BRAND_CONFIG.sixPs.purpose.hoverShadow,
  }
};
