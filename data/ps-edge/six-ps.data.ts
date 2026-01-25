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
    description: 'Nonprofit consultant expertise and capacity',
    icon: '👥',
    color: 'text-purple-600',
    metrics: [
      { label: 'Nonprofit Consultants', value: '28', trend: 'up', trendValue: '+2' },
      { label: 'Consultant Utilization', value: '84%', trend: 'up', trendValue: '+3%' },
      { label: 'Active Nonprofit Engagements', value: '12', trend: 'stable' },
      { label: 'CFRE Certified', value: '14', trend: 'up', trendValue: '+2' },
      { label: 'Consultant Satisfaction', value: '4.6/5', trend: 'up', trendValue: '+0.2' }
    ]
  },
  process: {
    category: 'PROCESS',
    title: 'Process',
    description: 'Campaign execution and nonprofit engagement delivery',
    icon: '⚙️',
    color: 'text-violet-600',
    metrics: [
      { label: 'Campaign On-Time Completion', value: '94%', trend: 'up', trendValue: '+2%' },
      { label: 'Avg Engagement Cycle Time', value: '6.2 months', trend: 'down', trendValue: '-0.5mo' },
      { label: 'Deliverables This Month', value: '47', trend: 'up', trendValue: '+8' },
      { label: 'Client Satisfaction (NPS)', value: '78', trend: 'up', trendValue: '+5' },
      { label: 'Process Adherence', value: '91%', trend: 'stable' }
    ]
  },
  practice: {
    category: 'PRACTICE',
    title: 'Practice',
    description: 'Service lines, methodologies, and nonprofit expertise',
    icon: '🎓',
    color: 'text-fuchsia-600',
    metrics: [
      { label: 'Service Lines', value: '12', trend: 'up', trendValue: '+1', color: 'text-purple-600' },
      { label: 'Campaign Revenue', value: '$1.2M', trend: 'up', trendValue: '+18%' },
      { label: 'Avg Service Margin', value: '42.5%', trend: 'up', trendValue: '+1.2%' },
      { label: 'Advancement Academy Enrollments', value: '22', trend: 'up', trendValue: '+5' },
      { label: 'Client Satisfaction by Service', value: '4.7/5', trend: 'up', trendValue: '+0.1' }
    ]
  },
  performance: {
    category: 'PERFORMANCE',
    title: 'Performance',
    description: 'Business outcomes - operational and financial metrics',
    icon: '📊',
    color: 'text-orange-600',
    metrics: [
      { label: 'Nonprofit Client Satisfaction (NPS)', value: '72', trend: 'stable' },
      { label: 'Campaign Success Rate', value: '96%', trend: 'up', trendValue: '+2%' },
      { label: 'Consultant Utilization × Realization', value: '78%', trend: 'up', trendValue: '+2%' },
      { label: 'Gross Margin', value: '42.5%', trend: 'up', trendValue: '+1.2%' },
      { label: 'Monthly Recurring Revenue', value: '$487K', trend: 'up', trendValue: '+12%' }
    ]
  },
  pipeline: {
    category: 'PIPELINE',
    title: 'Pipeline',
    description: 'Nonprofit prospect pipeline and sales forecasting',
    icon: '📈',
    color: 'text-pink-600',
    metrics: [
      { label: 'Nonprofit Prospect Pipeline', value: '$1.8M', trend: 'up', trendValue: '+15%' },
      { label: 'Proposal Win Rate', value: '42%', trend: 'down', trendValue: '-3%' },
      { label: 'Avg Sales Cycle', value: '87 days', trend: 'down', trendValue: '-5d' },
      { label: 'New Nonprofit Prospects', value: '18', trend: 'up', trendValue: '+6' },
      { label: 'Forecasted Monthly Revenue', value: '$487K', trend: 'up', trendValue: '+12%' }
    ]
  },
  purpose: {
    category: 'PURPOSE',
    title: 'Purpose',
    description: 'Nonprofit sector impact and client mission advancement',
    icon: '🎯',
    color: 'text-yellow-600',
    metrics: [
      { label: 'Nonprofit Client Impact', value: '8.4/10', trend: 'up', trendValue: '+0.3' },
      { label: 'Dollars Raised for Clients', value: '$124M', trend: 'up', trendValue: '+$18M' },
      { label: 'Nonprofit Leaders Coached', value: '146', trend: 'up', trendValue: '+24' },
      { label: 'Campaigns Completed', value: '23', trend: 'up', trendValue: '+5' },
      { label: 'Nonprofit Client Retention', value: '94%', trend: 'up', trendValue: '+2%' }
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
  practice: {
    category: 'PRACTICE',
    title: 'Practice',
    description: 'Sales methodologies and proposal tools',
    icon: '🖥️',
    color: 'text-indigo-600',
    metrics: [
      { label: 'Proposal Tool Adoption', value: '94%', trend: 'up', trendValue: '+2%' },
      { label: 'Sales Methodology Use', value: '88%', trend: 'up', trendValue: '+6%' },
      { label: 'CRM Data Quality', value: '91%', trend: 'stable' },
      { label: 'Template Library Usage', value: '82%', trend: 'up', trendValue: '+4%' }
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
  pipeline: {
    category: 'PIPELINE',
    title: 'Pipeline',
    description: 'Sales pipeline and deal tracking',
    icon: '💰',
    color: 'text-yellow-600',
    metrics: [
      { label: 'Pipeline Value', value: '$1.8M', trend: 'up', trendValue: '+12%' },
      { label: 'Active Deals', value: '18', trend: 'up', trendValue: '+3' },
      { label: 'Avg Deal Size', value: '$64K', trend: 'up', trendValue: '+8%' },
      { label: 'Commission Earned', value: '$28K', trend: 'up', trendValue: '+15%' }
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
  practice: {
    category: 'PRACTICE',
    title: 'Practice',
    description: 'Delivery methodologies and toolkits',
    icon: '🖥️',
    color: 'text-indigo-600',
    metrics: [
      { label: 'Methodology Adoption', value: '98%', trend: 'stable' },
      { label: 'Toolkit Utilization', value: '91%', trend: 'up', trendValue: '+3%' },
      { label: 'Best Practice Compliance', value: '94%', trend: 'up', trendValue: '+2%' },
      { label: 'Quality Framework Use', value: '89%', trend: 'up', trendValue: '+4%' }
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
  pipeline: {
    category: 'PIPELINE',
    title: 'Pipeline',
    description: 'Project pipeline and upcoming work',
    icon: '💰',
    color: 'text-yellow-600',
    metrics: [
      { label: 'Scheduled Projects', value: '12', trend: 'up', trendValue: '+2' },
      { label: 'Pipeline Hours', value: '2,840', trend: 'up', trendValue: '+340' },
      { label: 'Avg Project Value', value: '$58K', trend: 'up', trendValue: '+6%' },
      { label: 'Utilization Forecast', value: '84%', trend: 'stable' }
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
  practice: {
    category: 'PRACTICE',
    title: 'Practice',
    description: 'Client success methodologies and frameworks',
    icon: '🖥️',
    color: 'text-indigo-600',
    metrics: [
      { label: 'Success Framework Use', value: '96%', trend: 'stable' },
      { label: 'Onboarding Methodology', value: '99%', trend: 'stable' },
      { label: 'Health Score Model', value: '92%', trend: 'up', trendValue: '+4%' },
      { label: 'Playbook Adoption', value: '88%', trend: 'up', trendValue: '+6%' }
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
  pipeline: {
    category: 'PIPELINE',
    title: 'Pipeline',
    description: 'Renewal and expansion pipeline',
    icon: '💰',
    color: 'text-yellow-600',
    metrics: [
      { label: 'Renewal Pipeline', value: '$420K', trend: 'up', trendValue: '+8%' },
      { label: 'Upsell Opportunities', value: '14', trend: 'up', trendValue: '+3' },
      { label: 'Expansion Pipeline', value: '$156K', trend: 'up', trendValue: '+12%' },
      { label: 'At-Risk Accounts', value: '2', trend: 'down', trendValue: '-3' }
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
  practice: {
    category: 'PRACTICE',
    title: 'Practice',
    description: 'Financial systems and reporting frameworks',
    icon: '🖥️',
    color: 'text-indigo-600',
    metrics: [
      { label: 'Accounting System Uptime', value: '99.9%', trend: 'stable' },
      { label: 'Financial Reporting Quality', value: '98%', trend: 'stable' },
      { label: 'Process Automation', value: '84%', trend: 'up', trendValue: '+6%' },
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
  pipeline: {
    category: 'PIPELINE',
    title: 'Pipeline',
    description: 'Revenue forecast and collections pipeline',
    icon: '💰',
    color: 'text-yellow-600',
    metrics: [
      { label: 'Revenue Forecast (Q1)', value: '$850K', trend: 'up', trendValue: '+12%' },
      { label: 'Collections Pipeline', value: '$186K', trend: 'down', trendValue: '-8%' },
      { label: 'Forecast Accuracy', value: '94%', trend: 'up', trendValue: '+1%' },
      { label: 'Cash Flow Projection', value: '+$124K', trend: 'up', trendValue: '+$18K' }
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
