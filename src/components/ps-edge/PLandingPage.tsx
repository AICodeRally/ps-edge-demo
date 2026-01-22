/**
 * P Landing Page Component
 * Reusable template for 6 P's landing pages
 * Shows P title, key metrics, and nested dashboard panels for sub-pages
 */

'use client';

import Link from 'next/link';
import { SIX_PS_DEFINITIONS, type SixPCategory, type SixPMetric } from '@/src/types/ps-edge/six-ps.types';
import { getPNavigation } from '@/src/config/navigation.config';
import { AGGREGATE_SIX_PS } from '@/src/data/ps-edge/six-ps.data';
import { SetPageTitle } from '@/src/components/SetPageTitle';
import * as RadixIcons from '@radix-ui/react-icons';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  ExclamationTriangleIcon,
  CheckCircledIcon,
  LightningBoltIcon,
  ActivityLogIcon,
} from '@radix-ui/react-icons';

interface PLandingPageProps {
  category: SixPCategory;
}

// Get diverse content for each sub-page panel (alerts, actions, insights, activity)
function getPageContent(category: SixPCategory, pageName: string): {
  items: Array<{ type: 'alert' | 'action' | 'insight' | 'activity' | 'metric'; text: string; value?: string; urgency?: 'high' | 'medium' | 'low' }>;
} {
  // Analytics-heavy content for each page
  const contentMap: Record<string, Record<string, any>> = {
    PURPOSE: {
      'Mission Dashboard': {
        items: [
          { type: 'metric', text: 'Mission Alignment', value: '92%', urgency: 'high' },
          { type: 'insight', text: '3 clients requesting AI readiness assessments (Phase 1 opportunity)', urgency: 'medium' },
          { type: 'action', text: 'Update impact metrics for Q1 board presentation', urgency: 'high' },
          { type: 'activity', text: '12 new community hours logged this week', urgency: 'low' },
        ],
      },
      'Client Success': {
        items: [
          { type: 'metric', text: 'Published Stories', value: '12', urgency: 'high' },
          { type: 'action', text: 'Review draft testimonial from Hopewell Foundation', urgency: 'medium' },
          { type: 'insight', text: 'Board development stories get 3x more engagement than other types', urgency: 'low' },
          { type: 'alert', text: 'Heritage Arts case study awaiting final approval (5 days)', urgency: 'medium' },
        ],
      },
      'Renewals': {
        items: [
          { type: 'metric', text: 'Renewal Rate', value: '94%', urgency: 'high' },
          { type: 'alert', text: '2 renewals up for decision in next 14 days (Community Health, Youth Alliance)', urgency: 'high' },
          { type: 'action', text: 'Schedule QBR with Safe Harbor before renewal window', urgency: 'high' },
          { type: 'insight', text: 'Clients with 2+ service lines renew at 98% vs 87% for single-service', urgency: 'medium' },
        ],
      },
      'Proposals': {
        items: [
          { type: 'metric', text: 'Win Rate', value: '42%', urgency: 'medium' },
          { type: 'action', text: '3 proposals awaiting pricing approval (total value: $124K)', urgency: 'high' },
          { type: 'alert', text: 'Ocean Conservation proposal due Friday - still in draft', urgency: 'high' },
          { type: 'insight', text: 'AI readiness proposals have 67% win rate (above avg)', urgency: 'medium' },
        ],
      },
      'Clients': {
        items: [
          { type: 'metric', text: 'Active Clients', value: '24', urgency: 'high' },
          { type: 'alert', text: 'Community Health Partners NPS dropped to 6 (was 9)', urgency: 'high' },
          { type: 'action', text: '5 clients need quarterly check-in calls scheduled', urgency: 'medium' },
          { type: 'activity', text: 'New client onboarded: Urban Innovation Lab ($45K engagement)', urgency: 'low' },
        ],
      },
    },
    PEOPLE: {
      'Team': {
        items: [
          { type: 'metric', text: 'Utilization', value: '84%', urgency: 'high' },
          { type: 'alert', text: '3 consultants over 95% utilization (burnout risk)', urgency: 'high' },
          { type: 'action', text: 'Review capacity for 2 incoming strategic planning engagements', urgency: 'high' },
          { type: 'insight', text: 'AI specialist (consultant-003) at 68% - available for new projects', urgency: 'medium' },
        ],
      },
      'Capacity & Utilization': {
        items: [
          { type: 'metric', text: 'Available Hours', value: '142', urgency: 'medium' },
          { type: 'alert', text: 'All senior consultants booked through Q1 - new requests need junior staff', urgency: 'high' },
          { type: 'action', text: 'Ocean Conservation + Urban Gardens need staffing decisions', urgency: 'high' },
          { type: 'insight', text: 'Grant cycle (Feb 15) creating 3 simultaneous strategic plan demands', urgency: 'medium' },
        ],
      },
      'Onboarding': {
        items: [
          { type: 'metric', text: 'New Hires (90d)', value: '2', urgency: 'low' },
          { type: 'action', text: '1 onboarding checklist incomplete (hire date +14 days)', urgency: 'medium' },
          { type: 'activity', text: 'New AI specialist completed CFRE certification', urgency: 'low' },
          { type: 'insight', text: 'Advancement Academy facilitators need AI training module', urgency: 'medium' },
        ],
      },
    },
    PROCESS: {
      'Engagements': {
        items: [
          { type: 'metric', text: 'Active Projects', value: '12', urgency: 'high' },
          { type: 'alert', text: 'Safe Harbor capital campaign 8% over budget (scope creep)', urgency: 'high' },
          { type: 'action', text: '2 engagements need SOW amendment for AI deliverables', urgency: 'medium' },
          { type: 'insight', text: 'Executive coaching engagements averaging 28% higher satisfaction', urgency: 'low' },
        ],
      },
      'Deliverables': {
        items: [
          { type: 'metric', text: 'This Month', value: '47', urgency: 'high' },
          { type: 'alert', text: 'AI Readiness Assessment report for Hopewell due in 3 days', urgency: 'high' },
          { type: 'action', text: '5 deliverables pending client review (avg age: 6 days)', urgency: 'medium' },
          { type: 'activity', text: 'Board development toolkit template updated with new governance frameworks', urgency: 'low' },
        ],
      },
      'Support': {
        items: [
          { type: 'metric', text: 'Open Tickets', value: '8', urgency: 'medium' },
          { type: 'alert', text: 'Lakeside Arts dashboard issue open 8 days (SLA: 5 days)', urgency: 'high' },
          { type: 'action', text: '3 tickets awaiting consultant response', urgency: 'high' },
          { type: 'insight', text: 'NP-Edge platform issues down 42% after Q4 training', urgency: 'low' },
        ],
      },
      'Document Library': {
        items: [
          { type: 'metric', text: 'Total Docs', value: '247', urgency: 'low' },
          { type: 'action', text: 'Update proposal templates with AI readiness language', urgency: 'medium' },
          { type: 'activity', text: '12 strategic plans archived to knowledge base', urgency: 'low' },
          { type: 'insight', text: 'Most accessed: Board governance toolkit (42 views this month)', urgency: 'low' },
        ],
      },
      'Knowledge Library': {
        items: [
          { type: 'metric', text: 'Articles', value: '89', urgency: 'low' },
          { type: 'action', text: 'Create AI governance best practices article (3 client requests)', urgency: 'medium' },
          { type: 'activity', text: '4 new nonprofit sector research articles published', urgency: 'low' },
          { type: 'insight', text: 'Campaign fundraising articles get 2x more views than average', urgency: 'low' },
        ],
      },
      'Timesheets': {
        items: [
          { type: 'metric', text: 'Submitted', value: '94%', urgency: 'high' },
          { type: 'action', text: '4 consultants have unsubmitted hours (3+ weeks old)', urgency: 'high' },
          { type: 'alert', text: 'Safe Harbor engagement showing 12 hours unallocated', urgency: 'medium' },
          { type: 'insight', text: 'Billable ratio improved to 78% (was 76% in Q3)', urgency: 'low' },
        ],
      },
      'Invoices': {
        items: [
          { type: 'metric', text: 'Outstanding', value: '$124K', urgency: 'high' },
          { type: 'alert', text: '2 invoices overdue by 30+ days (Community Health: $24K)', urgency: 'high' },
          { type: 'action', text: 'Send payment reminders to 5 clients (invoices at 15-day mark)', urgency: 'medium' },
          { type: 'activity', text: 'Collected $42K in aged AR this week', urgency: 'low' },
        ],
      },
    },
    PRACTICE: {
      'AI Tools': {
        items: [
          { type: 'metric', text: 'Requests', value: '24.9K', urgency: 'high' },
          { type: 'alert', text: 'GPT-4 cost up 18% month-over-month ($437 → $515 projected)', urgency: 'medium' },
          { type: 'action', text: 'Review AI usage policy - 3 consultants exceeding guidelines', urgency: 'medium' },
          { type: 'insight', text: 'Donor analytics pilot queries showing 98.7% accuracy', urgency: 'low' },
        ],
      },
      'Integrations': {
        items: [
          { type: 'metric', text: 'Active', value: '8', urgency: 'high' },
          { type: 'alert', text: 'QuickBooks sync failed last night - invoices not updated', urgency: 'high' },
          { type: 'action', text: 'Configure new Salesforce webhook for NP-Edge tenant signals', urgency: 'medium' },
          { type: 'activity', text: 'Stripe integration upgraded to latest API version', urgency: 'low' },
        ],
      },
      'Data Management': {
        items: [
          { type: 'metric', text: 'Data Quality Score', value: '96%', urgency: 'high' },
          { type: 'alert', text: '3 client records missing required nonprofit tax ID', urgency: 'medium' },
          { type: 'action', text: 'Deduplicate 14 consultant time entries (weekend data entry)', urgency: 'medium' },
          { type: 'insight', text: 'AI data validation catching 87% of errors before submission', urgency: 'low' },
        ],
      },
      'Tenant Management': {
        items: [
          { type: 'metric', text: 'NP-Edge Tenants', value: '12', urgency: 'high' },
          { type: 'alert', text: 'Metro Food Bank health score dropped to 6.2 (was 8.1)', urgency: 'high' },
          { type: 'action', text: '3 tenants need quarterly health check-in calls', urgency: 'medium' },
          { type: 'insight', text: 'Tenants using donor analytics module have 22% higher health scores', urgency: 'low' },
        ],
      },
    },
    PERFORMANCE: {
      'KPI Dashboard': {
        items: [
          { type: 'metric', text: 'NPS Score', value: '72', urgency: 'high' },
          { type: 'alert', text: 'Project success rate dipped to 94% (target: 96%)', urgency: 'medium' },
          { type: 'insight', text: 'AI readiness engagements showing 89% satisfaction (above avg)', urgency: 'medium' },
          { type: 'activity', text: 'Board development win rate improved to 38% (was 33%)', urgency: 'low' },
        ],
      },
      'Client Health': {
        items: [
          { type: 'metric', text: 'Avg Score', value: '8.2', urgency: 'high' },
          { type: 'alert', text: '2 clients flagged "at risk" (scores below 6.5)', urgency: 'high' },
          { type: 'action', text: 'Schedule intervention calls with Community Health + Youth Alliance', urgency: 'high' },
          { type: 'insight', text: 'Clients with monthly touchpoints have 1.8pt higher health scores', urgency: 'medium' },
        ],
      },
      'Pipeline': {
        items: [
          { type: 'metric', text: 'Value', value: '$1.8M', urgency: 'high' },
          { type: 'action', text: '7 proposals in "decision" stage - follow up this week', urgency: 'high' },
          { type: 'insight', text: 'AI readiness pipeline grew 340% in Q4 2025', urgency: 'medium' },
          { type: 'alert', text: 'Ocean Conservation ($84K) stalled for 18 days', urgency: 'medium' },
        ],
      },
      'Benchmarks': {
        items: [
          { type: 'metric', text: 'Data Points', value: '1.2K', urgency: 'high' },
          { type: 'insight', text: 'Nonprofit sector NPS average: 68 (we\'re at 72)', urgency: 'medium' },
          { type: 'activity', text: 'New AI governance benchmarks added from 3 Phase 1 clients', urgency: 'low' },
          { type: 'action', text: 'Update campaign ROI benchmarks with 2025 data', urgency: 'low' },
        ],
      },
      'Signals': {
        items: [
          { type: 'metric', text: 'This Week', value: '847', urgency: 'high' },
          { type: 'alert', text: '3 critical signals: Metro Food Bank error rate spike', urgency: 'high' },
          { type: 'action', text: 'Review 12 "engagement drop" signals from last 48 hours', urgency: 'medium' },
          { type: 'insight', text: 'Signal volume up 23% - platform adoption growing', urgency: 'low' },
        ],
      },
    },
    PIPELINE: {
      'Sales Pipeline': {
        items: [
          { type: 'metric', text: 'Pipeline Value', value: '$1.8M', urgency: 'high' },
          { type: 'alert', text: '7 proposals in decision stage - follow up this week', urgency: 'high' },
          { type: 'action', text: 'Ocean Conservation ($84K) stalled for 18 days', urgency: 'medium' },
          { type: 'insight', text: 'AI readiness proposals have 67% win rate (above 42% avg)', urgency: 'medium' },
        ],
      },
      'Proposals': {
        items: [
          { type: 'metric', text: 'Active Proposals', value: '18', urgency: 'high' },
          { type: 'action', text: '3 proposals awaiting pricing approval (total: $124K)', urgency: 'high' },
          { type: 'alert', text: 'Ocean Conservation proposal due Friday - still in draft', urgency: 'high' },
          { type: 'insight', text: 'Board development win rate improving: 38% (was 33%)', urgency: 'low' },
        ],
      },
      'Revenue Forecasting': {
        items: [
          { type: 'metric', text: 'Q1 Forecast', value: '$850K', urgency: 'high' },
          { type: 'insight', text: 'AI readiness revenue: $96K projected (6 assessments)', urgency: 'medium' },
          { type: 'alert', text: 'Feb forecast gap: $28K below target', urgency: 'medium' },
          { type: 'activity', text: 'Strategic planning bookings up 18% YoY', urgency: 'low' },
        ],
      },
      'Commissions': {
        items: [
          { type: 'metric', text: 'This Month', value: '$24K', urgency: 'high' },
          { type: 'activity', text: 'Top performer: Sarah Chen ($8.2K from 3 closed deals)', urgency: 'low' },
          { type: 'insight', text: 'AI readiness deals generating 22% higher commission per hour', urgency: 'medium' },
          { type: 'action', text: 'Review commission structure for Advancement Academy workshops', urgency: 'low' },
        ],
      },
      'Partner Revenue': {
        items: [
          { type: 'metric', text: 'Channel', value: '$142K', urgency: 'high' },
          { type: 'alert', text: '1 NP-Edge tenant churned this month (Metro Food Bank)', urgency: 'high' },
          { type: 'action', text: '3 tenants eligible for upsell to premium tier ($18K ARR opportunity)', urgency: 'medium' },
          { type: 'insight', text: 'Dual clients (consulting + NP-Edge) have 98% retention vs 87% single-service', urgency: 'medium' },
        ],
      },
    },
  };

  return contentMap[category]?.[pageName] || {
    items: [
      { type: 'activity', text: 'Page content loading...', urgency: 'low' },
    ],
  };
}

export function PLandingPage({ category }: PLandingPageProps) {
  const pConfig = SIX_PS_DEFINITIONS[category];
  const pNav = getPNavigation(category);

  if (!pNav) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-red-600">Navigation configuration not found for {category}</p>
      </div>
    );
  }

  // Get the icon component dynamically
  const IconComponent = (RadixIcons as any)[pConfig.iconName] || RadixIcons.QuestionMarkIcon;

  // Get metrics for this P from the aggregate data
  const metricsMap: Record<SixPCategory, any> = {
    PEOPLE: AGGREGATE_SIX_PS.people,
    PROCESS: AGGREGATE_SIX_PS.process,
    PRACTICE: AGGREGATE_SIX_PS.practice,
    PERFORMANCE: AGGREGATE_SIX_PS.performance,
    PIPELINE: AGGREGATE_SIX_PS.pipeline,
    PURPOSE: AGGREGATE_SIX_PS.purpose,
  };

  const metrics = metricsMap[category]?.metrics || [];

  return (
    <div className="h-full flex flex-col">
      {/* Update navbar title */}
      <SetPageTitle
        title={pConfig.title}
        description={pConfig.description}
      />

      {/* Header Bar */}
      <div className="h-14 flex items-center px-6 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${pConfig.bgColor} ${pConfig.borderColor} border flex items-center justify-center`}>
            <IconComponent className={`w-5 h-5 ${pConfig.color}`} />
          </div>
          <div>
            <h1 className={`text-xl font-bold ${pConfig.color}`}>
              {pConfig.title}
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {pConfig.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Key Metrics */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Key Metrics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {metrics.map((metric: SixPMetric, idx: number) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border-2 ${pConfig.borderColor} ${pConfig.bgColor} hover:shadow-md transition-all`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {metric.label}
                    </span>
                    {metric.trend && (
                      <div className={`flex items-center gap-1 text-xs ${
                        metric.trend === 'up' ? 'text-green-600' :
                        metric.trend === 'down' ? 'text-red-600' :
                        'text-gray-600'
                      }`}>
                        {metric.trend === 'up' && <ArrowUpIcon className="w-3 h-3" />}
                        {metric.trend === 'down' && <ArrowDownIcon className="w-3 h-3" />}
                        {metric.trendValue && <span>{metric.trendValue}</span>}
                      </div>
                    )}
                  </div>
                  <div className={`text-2xl font-bold ${pConfig.color}`}>
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-Page Dashboard Panels (Nested Dashboard) */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Quick Overview - All {pConfig.title} Pages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pNav.pages.map((page) => {
                const pageContent = getPageContent(category, page.name);
                const isUnderConstruction = !page.href.startsWith('/dashboard');

                const getItemIcon = (type: string) => {
                  switch (type) {
                    case 'alert': return ExclamationTriangleIcon;
                    case 'action': return CheckCircledIcon;
                    case 'insight': return LightningBoltIcon;
                    case 'activity': return ActivityLogIcon;
                    case 'metric': return ArrowUpIcon;
                    default: return ArrowRightIcon;
                  }
                };

                const getItemColor = (urgency?: string) => {
                  switch (urgency) {
                    case 'high': return 'text-red-700 dark:text-red-400';
                    case 'medium': return 'text-orange-700 dark:text-orange-400';
                    case 'low': return 'text-gray-600 dark:text-gray-400';
                    default: return 'text-gray-600 dark:text-gray-400';
                  }
                };

                const getIconColor = (type: string, urgency?: string) => {
                  if (type === 'alert') return urgency === 'high' ? 'text-red-600 dark:text-red-400' : 'text-orange-600 dark:text-orange-400';
                  if (type === 'action') return urgency === 'high' ? 'text-orange-600 dark:text-orange-400' : 'text-blue-600 dark:text-blue-400';
                  if (type === 'insight') return 'text-purple-600 dark:text-purple-400';
                  if (type === 'activity') return 'text-gray-500 dark:text-gray-400';
                  if (type === 'metric') return pConfig.color;
                  return 'text-gray-500 dark:text-gray-400';
                };

                return (
                  <Link
                    key={page.href}
                    href={page.href}
                    className={`block p-4 rounded-lg border-2 ${pConfig.borderColor} bg-white dark:bg-dark-bg-secondary hover:shadow-lg ${pConfig.hoverShadow} transition-all ${isUnderConstruction ? 'opacity-60 cursor-not-allowed' : ''}`}
                    onClick={(e) => isUnderConstruction && e.preventDefault()}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-bold text-base ${pConfig.color}`}>
                        {page.name}
                      </h3>
                      {isUnderConstruction ? (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 font-medium">
                          Coming Soon
                        </span>
                      ) : (
                        <ArrowRightIcon className={`w-4 h-4 ${pConfig.color}`} />
                      )}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                      {page.description}
                    </p>
                    {!isUnderConstruction && (
                      <div className="space-y-1.5">
                        {pageContent.items.map((item, idx) => {
                          const ItemIcon = getItemIcon(item.type);
                          return (
                            <div key={idx} className="flex items-start gap-1.5 text-xs">
                              <ItemIcon className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${getIconColor(item.type, item.urgency)}`} />
                              <span className={`flex-1 leading-tight ${getItemColor(item.urgency)}`}>
                                {item.type === 'metric' && item.value && (
                                  <span className={`font-bold ${pConfig.color}`}>{item.value}</span>
                                )}
                                {item.type === 'metric' && item.value && ' - '}
                                {item.text}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
