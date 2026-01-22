/**
 * Partner Portal - Signals
 * Monitor telemetry signals from client deployments
 */

'use client';

import {
  ExclamationTriangleIcon,
  InfoCircledIcon,
  CheckCircledIcon,
  Cross2Icon,
} from '@radix-ui/react-icons';
import { useState } from 'react';

type SignalSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
type SignalCategory =
  | 'CLIENT_HEALTH'
  | 'FEATURE_ADOPTION'
  | 'USER_ENGAGEMENT'
  | 'DATA_QUALITY'
  | 'COMPLIANCE_RISK'
  | 'REVENUE_OPPORTUNITY'
  | 'CHURN_RISK';

interface Signal {
  id: string;
  clientName: string;
  category: SignalCategory;
  severity: SignalSeverity;
  title: string;
  description: string;
  affectedModule: string;
  detectedValue: string;
  suggestedAction: string;
  isResolved: boolean;
  emittedAt: string;
  resolvedAt?: string;
}

const signals: Signal[] = [
  {
    id: 'sig-001',
    clientName: 'Environmental Action Group',
    category: 'CLIENT_HEALTH',
    severity: 'HIGH',
    title: 'Low User Activity Detected',
    description: '62% of active users haven\'t logged in within the past 14 days',
    affectedModule: 'User Management',
    detectedValue: '3/8 active users',
    suggestedAction: 'Schedule check-in call to address engagement issues',
    isResolved: false,
    emittedAt: '2025-01-19T08:30:00Z',
  },
  {
    id: 'sig-002',
    clientName: 'Seniors Support Services',
    category: 'CHURN_RISK',
    severity: 'CRITICAL',
    title: 'Health Score Below Critical Threshold',
    description: 'Client health score has been below 70 for 30+ days',
    affectedModule: 'Overall Platform',
    detectedValue: 'Health: 68%',
    suggestedAction: 'Immediate intervention required - escalate to account manager',
    isResolved: false,
    emittedAt: '2025-01-19T07:15:00Z',
  },
  {
    id: 'sig-003',
    clientName: 'Hopewell Community Foundation',
    category: 'REVENUE_OPPORTUNITY',
    severity: 'LOW',
    title: 'Tier Upgrade Opportunity',
    description: 'Client is utilizing features beyond their current tier limits',
    affectedModule: 'Usage Monitoring',
    detectedValue: 'API calls: 8,234 (limit: 10,000)',
    suggestedAction: 'Propose upgrade to higher tier for enhanced limits',
    isResolved: false,
    emittedAt: '2025-01-18T16:45:00Z',
  },
  {
    id: 'sig-004',
    clientName: 'Community Arts Alliance',
    category: 'FEATURE_ADOPTION',
    severity: 'MEDIUM',
    title: 'Core Module Underutilized',
    description: 'Grant management module has not been accessed in 30 days',
    affectedModule: 'Grant Management',
    detectedValue: 'Last access: 32 days ago',
    suggestedAction: 'Send training resources and schedule feature demo',
    isResolved: false,
    emittedAt: '2025-01-18T14:20:00Z',
  },
  {
    id: 'sig-005',
    clientName: 'Youth Development Network',
    category: 'DATA_QUALITY',
    severity: 'MEDIUM',
    title: 'Duplicate Records Detected',
    description: 'System identified 47 potential duplicate donor records',
    affectedModule: 'Donor Management',
    detectedValue: '47 duplicates (5.2% of records)',
    suggestedAction: 'Schedule data cleanup session with client admin',
    isResolved: false,
    emittedAt: '2025-01-17T11:30:00Z',
  },
  {
    id: 'sig-006',
    clientName: 'Heritage Preservation Society',
    category: 'USER_ENGAGEMENT',
    severity: 'LOW',
    title: 'Dashboard Activity Increasing',
    description: 'Dashboard views up 45% compared to previous month',
    affectedModule: 'Analytics Dashboard',
    detectedValue: '+45% month-over-month',
    suggestedAction: 'Document success story for case study',
    isResolved: false,
    emittedAt: '2025-01-17T09:00:00Z',
  },
  {
    id: 'sig-007',
    clientName: 'Hopewell Community Foundation',
    category: 'COMPLIANCE_RISK',
    severity: 'HIGH',
    title: 'Grant Report Overdue',
    description: 'Federal grant report is 14 days past filing deadline',
    affectedModule: 'Grant Compliance',
    detectedValue: '14 days overdue',
    suggestedAction: 'Alert compliance officer immediately',
    isResolved: true,
    emittedAt: '2025-01-15T13:00:00Z',
    resolvedAt: '2025-01-16T10:30:00Z',
  },
  {
    id: 'sig-008',
    clientName: 'Education Excellence Fund',
    category: 'CLIENT_HEALTH',
    severity: 'LOW',
    title: 'Excellent Platform Utilization',
    description: 'Client achieving 96% health score with high feature adoption',
    affectedModule: 'Overall Platform',
    detectedValue: 'Health: 96%',
    suggestedAction: 'Request testimonial or referral',
    isResolved: false,
    emittedAt: '2025-01-14T10:15:00Z',
  },
];

const severityConfig = {
  CRITICAL: {
    color: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400',
    icon: ExclamationTriangleIcon,
    bgColor: 'bg-red-500',
  },
  HIGH: {
    color: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    icon: ExclamationTriangleIcon,
    bgColor: 'bg-orange-500',
  },
  MEDIUM: {
    color: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
    icon: InfoCircledIcon,
    bgColor: 'bg-yellow-500',
  },
  LOW: {
    color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    icon: InfoCircledIcon,
    bgColor: 'bg-blue-500',
  },
};

const categoryLabels: Record<SignalCategory, string> = {
  CLIENT_HEALTH: 'Client Health',
  FEATURE_ADOPTION: 'Feature Adoption',
  USER_ENGAGEMENT: 'User Engagement',
  DATA_QUALITY: 'Data Quality',
  COMPLIANCE_RISK: 'Compliance Risk',
  REVENUE_OPPORTUNITY: 'Revenue Opportunity',
  CHURN_RISK: 'Churn Risk',
};

export default function SignalsPage() {
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterResolved, setFilterResolved] = useState<string>('unresolved');

  const filteredSignals = signals.filter((signal) => {
    const matchesSeverity = filterSeverity === 'all' || signal.severity === filterSeverity;
    const matchesCategory = filterCategory === 'all' || signal.category === filterCategory;
    const matchesResolved =
      filterResolved === 'all' ||
      (filterResolved === 'resolved' && signal.isResolved) ||
      (filterResolved === 'unresolved' && !signal.isResolved);
    return matchesSeverity && matchesCategory && matchesResolved;
  });

  const stats = {
    total: signals.length,
    critical: signals.filter((s) => s.severity === 'CRITICAL' && !s.isResolved).length,
    high: signals.filter((s) => s.severity === 'HIGH' && !s.isResolved).length,
    unresolved: signals.filter((s) => !s.isResolved).length,
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Signals Inbox
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Monitor telemetry signals from client NP-Edge deployments
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Signals</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.total}</div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Critical</div>
              <div className="text-3xl font-bold text-red-600">{stats.critical}</div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">High Priority</div>
              <div className="text-3xl font-bold text-orange-600">{stats.high}</div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Unresolved</div>
              <div className="text-3xl font-bold text-yellow-600">{stats.unresolved}</div>
            </div>
          </div>

          {/* Filters */}
          <div className="card p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="px-4 py-2 border border-gray-200 dark:border-dark-border-default rounded-lg bg-white dark:bg-dark-bg-primary text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Severities</option>
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-200 dark:border-dark-border-default rounded-lg bg-white dark:bg-dark-bg-primary text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Categories</option>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>

              <select
                value={filterResolved}
                onChange={(e) => setFilterResolved(e.target.value)}
                className="px-4 py-2 border border-gray-200 dark:border-dark-border-default rounded-lg bg-white dark:bg-dark-bg-primary text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Status</option>
                <option value="unresolved">Unresolved</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>

          {/* Signals List */}
          <div className="space-y-3">
            {filteredSignals.map((signal) => {
              const SeverityIcon = severityConfig[signal.severity].icon;

              return (
                <div
                  key={signal.id}
                  className={`card p-4 border-l-4 ${
                    signal.isResolved ? 'opacity-60' : ''
                  }`}
                  style={{
                    borderLeftColor: signal.isResolved
                      ? '#6b7280'
                      : severityConfig[signal.severity].bgColor.replace('bg-', '').replace('-500', ''),
                  }}
                >
                  <div className="flex items-start gap-4">
                    {/* Severity Icon */}
                    <div className={`w-10 h-10 rounded-lg ${severityConfig[signal.severity].bgColor} flex items-center justify-center flex-shrink-0`}>
                      <SeverityIcon className="w-5 h-5 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              {signal.title}
                            </h3>
                            {signal.isResolved && (
                              <CheckCircledIcon className="w-5 h-5 text-green-500" />
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              {signal.clientName}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${severityConfig[signal.severity].color}`}>
                              {signal.severity}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-600 dark:text-gray-400">
                              {categoryLabels[signal.category]}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-500 dark:text-gray-400">
                              {formatDate(signal.emittedAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                        {signal.description}
                      </p>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Module: </span>
                          <span className="text-gray-900 dark:text-gray-100 font-medium">
                            {signal.affectedModule}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Detected: </span>
                          <span className="text-gray-900 dark:text-gray-100 font-medium">
                            {signal.detectedValue}
                          </span>
                        </div>
                        {signal.isResolved && signal.resolvedAt && (
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Resolved: </span>
                            <span className="text-gray-900 dark:text-gray-100 font-medium">
                              {formatDate(signal.resolvedAt)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Suggested Action */}
                      <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <InfoCircledIcon className="w-4 h-4 text-teal-600 dark:text-teal-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-xs font-semibold text-teal-700 dark:text-teal-300 mb-1">
                              Suggested Action
                            </div>
                            <div className="text-sm text-teal-900 dark:text-teal-100">
                              {signal.suggestedAction}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredSignals.length === 0 && (
            <div className="card p-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                No signals match your filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
