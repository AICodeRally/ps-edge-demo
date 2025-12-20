/**
 * Mock 6Ps Data
 * Aggregate and department-specific 6Ps metrics
 */

import type { DepartmentSixPs } from '@/src/types/ps-edge/six-ps.types';

// AGGREGATE 6Ps (All Departments Combined)
export const AGGREGATE_SIX_PS: DepartmentSixPs = {
  department: 'AGGREGATE',
  people: {
    category: 'PEOPLE',
    title: 'People',
    description: 'Team capacity, utilization, and workforce metrics',
    icon: '👥',
    color: 'text-purple-600',
    metrics: [
      { label: 'Total Team Members', value: '28', trend: 'up', trendValue: '+2' },
      { label: 'Avg Utilization', value: '84%', trend: 'up', trendValue: '+3%' },
      { label: 'Active Engagements', value: '12', trend: 'stable' },
      { label: 'Team Satisfaction', value: '4.6/5', trend: 'up', trendValue: '+0.2' }
    ]
  },
  process: {
    category: 'PROCESS',
    title: 'Process',
    description: 'Workflow efficiency, deliverables, and timelines',
    icon: '⚙️',
    color: 'text-blue-600',
    metrics: [
      { label: 'On-Time Delivery', value: '94%', trend: 'up', trendValue: '+2%' },
      { label: 'Avg Cycle Time', value: '6.2 days', trend: 'down', trendValue: '-0.5d' },
      { label: 'Deliverables This Month', value: '47', trend: 'up', trendValue: '+8' },
      { label: 'Process Adherence', value: '91%', trend: 'stable' }
    ]
  },
  platform: {
    category: 'PLATFORM',
    title: 'Platform',
    description: 'Technology, tools, and systems enablement',
    icon: '🖥️',
    color: 'text-indigo-600',
    metrics: [
      { label: 'System Uptime', value: '99.8%', trend: 'stable' },
      { label: 'Active Integrations', value: '8', trend: 'up', trendValue: '+1' },
      { label: 'Data Quality Score', value: '96%', trend: 'up', trendValue: '+1%' },
      { label: 'User Adoption', value: '89%', trend: 'up', trendValue: '+4%' }
    ]
  },
  performance: {
    category: 'PERFORMANCE',
    title: 'Performance',
    description: 'KPIs, outcomes, and operational metrics',
    icon: '📊',
    color: 'text-green-600',
    metrics: [
      { label: 'Client Satisfaction (NPS)', value: '72', trend: 'stable' },
      { label: 'Proposal Win Rate', value: '42%', trend: 'down', trendValue: '-3%' },
      { label: 'Project Success Rate', value: '96%', trend: 'up', trendValue: '+2%' },
      { label: 'Billable Hours %', value: '78%', trend: 'up', trendValue: '+2%' }
    ]
  },
  profit: {
    category: 'PROFIT',
    title: 'Profit',
    description: 'Revenue, margins, and financial health',
    icon: '💰',
    color: 'text-yellow-600',
    metrics: [
      { label: 'Monthly Revenue', value: '$487K', trend: 'up', trendValue: '+12%' },
      { label: 'Gross Margin', value: '64%', trend: 'up', trendValue: '+2%' },
      { label: 'Outstanding AR', value: '$124K', trend: 'down', trendValue: '-8%' },
      { label: 'Revenue Per Consultant', value: '$17.4K', trend: 'up', trendValue: '+8%' }
    ]
  },
  purpose: {
    category: 'PURPOSE',
    title: 'Purpose',
    description: 'Mission alignment, client satisfaction, and impact',
    icon: '🎯',
    color: 'text-red-600',
    metrics: [
      { label: 'Client Impact Score', value: '8.4/10', trend: 'up', trendValue: '+0.3' },
      { label: 'Mission Alignment', value: '92%', trend: 'stable' },
      { label: 'Community Hours', value: '146', trend: 'up', trendValue: '+24' },
      { label: 'Client Retention', value: '94%', trend: 'up', trendValue: '+2%' }
    ]
  }
};

// SALES DEPARTMENT 6Ps
export const SALES_SIX_PS: DepartmentSixPs = {
  department: 'SALES',
  people: {
    category: 'PEOPLE',
    title: 'People',
    description: 'Sales team capacity and performance',
    icon: '👥',
    color: 'text-purple-600',
    metrics: [
      { label: 'Sales Team Size', value: '6', trend: 'stable' },
      { label: 'Avg Utilization', value: '68%', trend: 'down', trendValue: '-7%' },
      { label: 'Active Pipelines', value: '24', trend: 'up', trendValue: '+3' },
      { label: 'Team Quota Attainment', value: '87%', trend: 'down', trendValue: '-5%' }
    ]
  },
  process: {
    category: 'PROCESS',
    title: 'Process',
    description: 'Sales workflow efficiency',
    icon: '⚙️',
    color: 'text-blue-600',
    metrics: [
      { label: 'Avg Sales Cycle', value: '42 days', trend: 'up', trendValue: '+3d' },
      { label: 'Proposals Sent', value: '18', trend: 'up', trendValue: '+4' },
      { label: 'Follow-up Rate', value: '89%', trend: 'stable' },
      { label: 'Lead Response Time', value: '4.2 hrs', trend: 'down', trendValue: '-0.8h' }
    ]
  },
  platform: {
    category: 'PLATFORM',
    title: 'Platform',
    description: 'Sales tools and CRM effectiveness',
    icon: '🖥️',
    color: 'text-indigo-600',
    metrics: [
      { label: 'CRM Data Quality', value: '94%', trend: 'up', trendValue: '+2%' },
      { label: 'Email Engagement', value: '31%', trend: 'stable' },
      { label: 'Automation Usage', value: '76%', trend: 'up', trendValue: '+5%' },
      { label: 'Pipeline Visibility', value: '98%', trend: 'stable' }
    ]
  },
  performance: {
    category: 'PERFORMANCE',
    title: 'Performance',
    description: 'Sales KPIs and outcomes',
    icon: '📊',
    color: 'text-green-600',
    metrics: [
      { label: 'Win Rate', value: '42%', trend: 'down', trendValue: '-3%' },
      { label: 'Pipeline Value', value: '$1.8M', trend: 'up', trendValue: '+12%' },
      { label: 'Avg Deal Size', value: '$64K', trend: 'up', trendValue: '+8%' },
      { label: 'New Clients This Q', value: '7', trend: 'stable' }
    ]
  },
  profit: {
    category: 'PROFIT',
    title: 'Profit',
    description: 'Sales revenue and profitability',
    icon: '💰',
    color: 'text-yellow-600',
    metrics: [
      { label: 'Revenue Closed', value: '$412K', trend: 'up', trendValue: '+15%' },
      { label: 'Avg Contract Value', value: '$58.9K', trend: 'up', trendValue: '+6%' },
      { label: 'Sales Efficiency', value: '3.2x', trend: 'up', trendValue: '+0.3x' },
      { label: 'CAC', value: '$8.4K', trend: 'down', trendValue: '-$1.2K' }
    ]
  },
  purpose: {
    category: 'PURPOSE',
    title: 'Purpose',
    description: 'Client fit and mission alignment',
    icon: '🎯',
    color: 'text-red-600',
    metrics: [
      { label: 'Ideal Client Profile Fit', value: '86%', trend: 'stable' },
      { label: 'Mission-Aligned Wins', value: '91%', trend: 'up', trendValue: '+4%' },
      { label: 'Referral Rate', value: '34%', trend: 'up', trendValue: '+2%' },
      { label: 'Client Satisfaction (New)', value: '4.7/5', trend: 'up', trendValue: '+0.1' }
    ]
  }
};

// DELIVERY DEPARTMENT 6Ps
export const DELIVERY_SIX_PS: DepartmentSixPs = {
  department: 'DELIVERY',
  people: {
    category: 'PEOPLE',
    title: 'People',
    description: 'Delivery team capacity and productivity',
    icon: '👥',
    color: 'text-purple-600',
    metrics: [
      { label: 'Consultants', value: '14', trend: 'up', trendValue: '+2' },
      { label: 'Avg Utilization', value: '92%', trend: 'up', trendValue: '+4%' },
      { label: 'Certified Staff', value: '86%', trend: 'up', trendValue: '+8%' },
      { label: 'Burnout Risk', value: '12%', trend: 'up', trendValue: '+4%', color: 'text-red-600' }
    ]
  },
  process: {
    category: 'PROCESS',
    title: 'Process',
    description: 'Project delivery efficiency',
    icon: '⚙️',
    color: 'text-blue-600',
    metrics: [
      { label: 'On-Time Delivery', value: '96%', trend: 'up', trendValue: '+2%' },
      { label: 'Avg Project Duration', value: '8.4 weeks', trend: 'down', trendValue: '-0.6w' },
      { label: 'Change Order Rate', value: '8%', trend: 'down', trendValue: '-2%' },
      { label: 'Quality Score', value: '4.8/5', trend: 'stable' }
    ]
  },
  platform: {
    category: 'PLATFORM',
    title: 'Platform',
    description: 'Project management tools',
    icon: '🖥️',
    color: 'text-indigo-600',
    metrics: [
      { label: 'PM Tool Adoption', value: '98%', trend: 'stable' },
      { label: 'Documentation Quality', value: '91%', trend: 'up', trendValue: '+3%' },
      { label: 'Template Usage', value: '84%', trend: 'up', trendValue: '+6%' },
      { label: 'Collaboration Score', value: '4.6/5', trend: 'up', trendValue: '+0.2' }
    ]
  },
  performance: {
    category: 'PERFORMANCE',
    title: 'Performance',
    description: 'Delivery KPIs and outcomes',
    icon: '📊',
    color: 'text-green-600',
    metrics: [
      { label: 'Client Satisfaction', value: '4.7/5', trend: 'stable' },
      { label: 'Project Success Rate', value: '96%', trend: 'up', trendValue: '+2%' },
      { label: 'Scope Creep', value: '6%', trend: 'down', trendValue: '-3%' },
      { label: 'Deliverables Completed', value: '47', trend: 'up', trendValue: '+8' }
    ]
  },
  profit: {
    category: 'PROFIT',
    title: 'Profit',
    description: 'Delivery profitability',
    icon: '💰',
    color: 'text-yellow-600',
    metrics: [
      { label: 'Project Margin', value: '68%', trend: 'up', trendValue: '+3%' },
      { label: 'Billable Hours', value: '82%', trend: 'up', trendValue: '+2%' },
      { label: 'Avg Hourly Rate', value: '$185', trend: 'stable' },
      { label: 'Revenue Per Consultant', value: '$21.2K', trend: 'up', trendValue: '+9%' }
    ]
  },
  purpose: {
    category: 'PURPOSE',
    title: 'Purpose',
    description: 'Impact and client outcomes',
    icon: '🎯',
    color: 'text-red-600',
    metrics: [
      { label: 'Client Impact Score', value: '8.6/10', trend: 'up', trendValue: '+0.4' },
      { label: 'Outcome Achievement', value: '94%', trend: 'up', trendValue: '+3%' },
      { label: 'Client Testimonials', value: '12', trend: 'up', trendValue: '+4' },
      { label: 'Repeat Engagement Rate', value: '78%', trend: 'stable' }
    ]
  }
};

// CLIENT SUCCESS DEPARTMENT 6Ps
export const CLIENT_SUCCESS_SIX_PS: DepartmentSixPs = {
  department: 'CLIENT_SUCCESS',
  people: {
    category: 'PEOPLE',
    title: 'People',
    description: 'Client success team capacity',
    icon: '👥',
    color: 'text-purple-600',
    metrics: [
      { label: 'CS Team Size', value: '5', trend: 'stable' },
      { label: 'Avg Utilization', value: '81%', trend: 'up', trendValue: '+2%' },
      { label: 'Clients Per CSM', value: '5.6', trend: 'stable' },
      { label: 'Team Satisfaction', value: '4.5/5', trend: 'up', trendValue: '+0.1' }
    ]
  },
  process: {
    category: 'PROCESS',
    title: 'Process',
    description: 'CS workflow efficiency',
    icon: '⚙️',
    color: 'text-blue-600',
    metrics: [
      { label: 'QBR Completion Rate', value: '94%', trend: 'up', trendValue: '+4%' },
      { label: 'Avg Response Time', value: '2.1 hrs', trend: 'down', trendValue: '-0.4h' },
      { label: 'Support Tickets Resolved', value: '87%', trend: 'up', trendValue: '+3%' },
      { label: 'Onboarding Time', value: '4.2 weeks', trend: 'down', trendValue: '-0.3w' }
    ]
  },
  platform: {
    category: 'PLATFORM',
    title: 'Platform',
    description: 'CS tools and systems',
    icon: '🖥️',
    color: 'text-indigo-600',
    metrics: [
      { label: 'CRM Health Score', value: '96%', trend: 'stable' },
      { label: 'Support Ticket System', value: '99%', trend: 'stable' },
      { label: 'Client Portal Adoption', value: '82%', trend: 'up', trendValue: '+6%' },
      { label: 'Automation Coverage', value: '68%', trend: 'up', trendValue: '+4%' }
    ]
  },
  performance: {
    category: 'PERFORMANCE',
    title: 'Performance',
    description: 'CS KPIs and outcomes',
    icon: '📊',
    color: 'text-green-600',
    metrics: [
      { label: 'Client Retention Rate', value: '94%', trend: 'up', trendValue: '+2%' },
      { label: 'NPS Score', value: '72', trend: 'stable' },
      { label: 'Upsell/Cross-sell Rate', value: '28%', trend: 'up', trendValue: '+4%' },
      { label: 'Client Health (Avg)', value: '8.2/10', trend: 'up', trendValue: '+0.3' }
    ]
  },
  profit: {
    category: 'PROFIT',
    title: 'Profit',
    description: 'CS revenue contribution',
    icon: '💰',
    color: 'text-yellow-600',
    metrics: [
      { label: 'Renewal Revenue', value: '$392K', trend: 'up', trendValue: '+8%' },
      { label: 'Expansion Revenue', value: '$124K', trend: 'up', trendValue: '+12%' },
      { label: 'Churn Prevention', value: '$86K', trend: 'up', trendValue: '+$18K' },
      { label: 'Avg Account Value', value: '$14.2K', trend: 'up', trendValue: '+5%' }
    ]
  },
  purpose: {
    category: 'PURPOSE',
    title: 'Purpose',
    description: 'Client satisfaction and impact',
    icon: '🎯',
    color: 'text-red-600',
    metrics: [
      { label: 'Client Satisfaction', value: '4.7/5', trend: 'stable' },
      { label: 'Testimonials Received', value: '12', trend: 'up', trendValue: '+4' },
      { label: 'Referrals Generated', value: '9', trend: 'up', trendValue: '+2' },
      { label: 'Success Story Published', value: '3', trend: 'stable' }
    ]
  }
};

// FINANCE DEPARTMENT 6Ps
export const FINANCE_SIX_PS: DepartmentSixPs = {
  department: 'FINANCE',
  people: {
    category: 'PEOPLE',
    title: 'People',
    description: 'Finance team capacity',
    icon: '👥',
    color: 'text-purple-600',
    metrics: [
      { label: 'Finance Team Size', value: '3', trend: 'stable' },
      { label: 'Avg Utilization', value: '76%', trend: 'stable' },
      { label: 'Controllers/Analysts', value: '2/1', trend: 'stable' },
      { label: 'Team Satisfaction', value: '4.4/5', trend: 'stable' }
    ]
  },
  process: {
    category: 'PROCESS',
    title: 'Process',
    description: 'Finance workflow efficiency',
    icon: '⚙️',
    color: 'text-blue-600',
    metrics: [
      { label: 'Invoice Turnaround', value: '3.2 days', trend: 'down', trendValue: '-0.6d' },
      { label: 'Month-End Close', value: '5 days', trend: 'stable' },
      { label: 'Approval Cycle Time', value: '1.8 days', trend: 'down', trendValue: '-0.3d' },
      { label: 'Timesheet Submission', value: '94%', trend: 'up', trendValue: '+2%' }
    ]
  },
  platform: {
    category: 'PLATFORM',
    title: 'Platform',
    description: 'Finance systems and tools',
    icon: '🖥️',
    color: 'text-indigo-600',
    metrics: [
      { label: 'Accounting System Uptime', value: '99.9%', trend: 'stable' },
      { label: 'QuickBooks Integration', value: '98%', trend: 'stable' },
      { label: 'Automated Invoicing', value: '84%', trend: 'up', trendValue: '+6%' },
      { label: 'Data Accuracy', value: '99.2%', trend: 'stable' }
    ]
  },
  performance: {
    category: 'PERFORMANCE',
    title: 'Performance',
    description: 'Finance KPIs',
    icon: '📊',
    color: 'text-green-600',
    metrics: [
      { label: 'Days Sales Outstanding', value: '32 days', trend: 'down', trendValue: '-4d' },
      { label: 'Collection Rate', value: '96%', trend: 'up', trendValue: '+2%' },
      { label: 'Budget Variance', value: '2.3%', trend: 'down', trendValue: '-0.8%' },
      { label: 'Forecast Accuracy', value: '94%', trend: 'up', trendValue: '+1%' }
    ]
  },
  profit: {
    category: 'PROFIT',
    title: 'Profit',
    description: 'Financial health metrics',
    icon: '💰',
    color: 'text-yellow-600',
    metrics: [
      { label: 'Monthly Revenue', value: '$487K', trend: 'up', trendValue: '+12%' },
      { label: 'Gross Margin', value: '64%', trend: 'up', trendValue: '+2%' },
      { label: 'Operating Margin', value: '22%', trend: 'up', trendValue: '+3%' },
      { label: 'Cash on Hand', value: '$842K', trend: 'up', trendValue: '+$124K' }
    ]
  },
  purpose: {
    category: 'PURPOSE',
    title: 'Purpose',
    description: 'Financial stewardship',
    icon: '🎯',
    color: 'text-red-600',
    metrics: [
      { label: 'Audit Compliance', value: '100%', trend: 'stable' },
      { label: 'Tax Filing Timeliness', value: '100%', trend: 'stable' },
      { label: 'Financial Transparency', value: '4.8/5', trend: 'stable' },
      { label: 'Stakeholder Trust', value: '4.7/5', trend: 'up', trendValue: '+0.1' }
    ]
  }
};

// Helper function to get 6Ps by department
export function getSixPsByDepartment(dept: 'SALES' | 'DELIVERY' | 'CLIENT_SUCCESS' | 'FINANCE' | 'AGGREGATE'): DepartmentSixPs {
  switch (dept) {
    case 'SALES':
      return SALES_SIX_PS;
    case 'DELIVERY':
      return DELIVERY_SIX_PS;
    case 'CLIENT_SUCCESS':
      return CLIENT_SUCCESS_SIX_PS;
    case 'FINANCE':
      return FINANCE_SIX_PS;
    case 'AGGREGATE':
    default:
      return AGGREGATE_SIX_PS;
  }
}
