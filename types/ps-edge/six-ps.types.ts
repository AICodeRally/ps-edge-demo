/**
 * 6Ps Framework Type Definitions
 * Business performance tracking across People, Process, Platform, Performance, Profit, Purpose
 */

export type SixPCategory = 'PEOPLE' | 'PROCESS' | 'PRACTICE' | 'PERFORMANCE' | 'PIPELINE' | 'PURPOSE';

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
  practice: SixPSection;
  performance: SixPSection;
  pipeline: SixPSection;
  purpose: SixPSection;
}

import { BRAND_CONFIG } from '@/config/brand.config';

// 6Ps Definitions with Radix icon names - Colors derived from brand gradient
export const SIX_PS_DEFINITIONS: Record<SixPCategory, { title: string; description: string; iconName: string; color: string; colorHex: string; bgColor: string; borderColor: string; hoverShadow: string }> = {
  PEOPLE: {
    title: 'People',
    description: 'Team capacity, utilization, and workforce metrics',
    iconName: 'PersonIcon',
    color: BRAND_CONFIG.sixPs.people.textClass,
    colorHex: '#7c3aed', // Purple
    bgColor: BRAND_CONFIG.sixPs.people.bgClass,
    borderColor: BRAND_CONFIG.sixPs.people.borderClass,
    hoverShadow: BRAND_CONFIG.sixPs.people.hoverShadow,
  },
  PROCESS: {
    title: 'Process',
    description: 'Workflow efficiency, deliverables, and timelines',
    iconName: 'GearIcon',
    color: BRAND_CONFIG.sixPs.process.textClass,
    colorHex: '#8b5cf6', // Violet
    bgColor: BRAND_CONFIG.sixPs.process.bgClass,
    borderColor: BRAND_CONFIG.sixPs.process.borderClass,
    hoverShadow: BRAND_CONFIG.sixPs.process.hoverShadow,
  },
  PRACTICE: {
    title: 'Practice',
    description: 'Methodologies, tools, and delivery excellence',
    iconName: 'CubeIcon',
    color: BRAND_CONFIG.sixPs.practice.textClass,
    colorHex: '#c026d3', // Fuchsia
    bgColor: BRAND_CONFIG.sixPs.practice.bgClass,
    borderColor: BRAND_CONFIG.sixPs.practice.borderClass,
    hoverShadow: BRAND_CONFIG.sixPs.practice.hoverShadow,
  },
  PERFORMANCE: {
    title: 'Performance',
    description: 'KPIs, outcomes, and operational metrics',
    iconName: 'LayersIcon',
    color: BRAND_CONFIG.sixPs.performance.textClass,
    colorHex: '#db2777', // Pink
    bgColor: BRAND_CONFIG.sixPs.performance.bgClass,
    borderColor: BRAND_CONFIG.sixPs.performance.borderClass,
    hoverShadow: BRAND_CONFIG.sixPs.performance.hoverShadow,
  },
  PIPELINE: {
    title: 'Pipeline',
    description: 'Sales pipeline, proposals, and revenue forecasting',
    iconName: 'BarChartIcon',
    color: BRAND_CONFIG.sixPs.pipeline.textClass,
    colorHex: '#f97316', // Orange
    bgColor: BRAND_CONFIG.sixPs.pipeline.bgClass,
    borderColor: BRAND_CONFIG.sixPs.pipeline.borderClass,
    hoverShadow: BRAND_CONFIG.sixPs.pipeline.hoverShadow,
  },
  PURPOSE: {
    title: 'Purpose',
    description: 'Mission alignment, client satisfaction, and impact',
    iconName: 'TargetIcon',
    color: BRAND_CONFIG.sixPs.purpose.textClass,
    colorHex: '#facc15', // Yellow
    bgColor: BRAND_CONFIG.sixPs.purpose.bgClass,
    borderColor: BRAND_CONFIG.sixPs.purpose.borderClass,
    hoverShadow: BRAND_CONFIG.sixPs.purpose.hoverShadow,
  }
};
