/**
 * Operations - Integration Hub
 * Monitor and manage third-party integrations (QuickBooks, PSA, CRM, databases)
 */

'use client';

import {
  CheckCircledIcon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
  ReloadIcon,
  GearIcon,
} from '@radix-ui/react-icons';

interface Integration {
  id: string;
  name: string;
  category: 'Accounting' | 'PSA' | 'CRM' | 'Database' | 'HR' | 'Other';
  status: 'active' | 'warning' | 'error' | 'inactive';
  health: number; // 0-100
  lastSync: string;
  syncFrequency: string;
  recordsSynced?: number;
  description: string;
}

const integrations: Integration[] = [
  {
    id: 'qb',
    name: 'QuickBooks Online',
    category: 'Accounting',
    status: 'active',
    health: 98,
    lastSync: '5 minutes ago',
    syncFrequency: 'Every 15 minutes',
    recordsSynced: 1247,
    description: 'Financial data, invoices, and payment tracking',
  },
  {
    id: 'deltek',
    name: 'Deltek Vantagepoint',
    category: 'PSA',
    status: 'active',
    health: 95,
    lastSync: '12 minutes ago',
    syncFrequency: 'Hourly',
    recordsSynced: 3421,
    description: 'Project management, time tracking, and resource planning',
  },
  {
    id: 'salesforce',
    name: 'Salesforce CRM',
    category: 'CRM',
    status: 'active',
    health: 100,
    lastSync: '2 minutes ago',
    syncFrequency: 'Real-time',
    recordsSynced: 892,
    description: 'Client contacts, opportunities, and sales pipeline',
  },
  {
    id: 'postgres',
    name: 'PostgreSQL Database',
    category: 'Database',
    status: 'active',
    health: 99,
    lastSync: 'Continuous',
    syncFrequency: 'N/A',
    description: 'Primary application database',
  },
  {
    id: 'unanet',
    name: 'Unanet',
    category: 'PSA',
    status: 'warning',
    health: 78,
    lastSync: '3 hours ago',
    syncFrequency: 'Every hour',
    recordsSynced: 567,
    description: 'Alternative PSA for federal projects',
  },
  {
    id: 'stripe',
    name: 'Stripe Payments',
    category: 'Accounting',
    status: 'active',
    health: 97,
    lastSync: '8 minutes ago',
    syncFrequency: 'Every 30 minutes',
    recordsSynced: 234,
    description: 'Online payment processing and subscriptions',
  },
  {
    id: 'hubspot',
    name: 'HubSpot Marketing',
    category: 'CRM',
    status: 'active',
    health: 92,
    lastSync: '45 minutes ago',
    syncFrequency: 'Hourly',
    recordsSynced: 1523,
    description: 'Marketing automation and lead nurturing',
  },
  {
    id: 'bamboo',
    name: 'BambooHR',
    category: 'HR',
    status: 'active',
    health: 94,
    lastSync: '1 day ago',
    syncFrequency: 'Daily',
    recordsSynced: 156,
    description: 'Employee data and HR management',
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'Other',
    status: 'active',
    health: 100,
    lastSync: 'Real-time',
    syncFrequency: 'Real-time',
    description: 'Team communication and notifications',
  },
  {
    id: 'jira',
    name: 'Jira Software',
    category: 'Other',
    status: 'error',
    health: 45,
    lastSync: '2 days ago',
    syncFrequency: 'Hourly',
    description: 'Issue tracking for technical projects',
  },
  {
    id: 'gsuite',
    name: 'Google Workspace',
    category: 'Other',
    status: 'active',
    health: 98,
    lastSync: 'Real-time',
    syncFrequency: 'Real-time',
    recordsSynced: 2847,
    description: 'Email, calendar, and document collaboration',
  },
  {
    id: 'zendesk',
    name: 'Zendesk Support',
    category: 'Other',
    status: 'inactive',
    health: 0,
    lastSync: 'Never',
    syncFrequency: 'Not configured',
    description: 'Client support ticketing (not yet configured)',
  },
];

const getStatusIcon = (status: Integration['status']) => {
  switch (status) {
    case 'active':
      return <CheckCircledIcon className="w-5 h-5 text-green-500" />;
    case 'warning':
      return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />;
    case 'error':
      return <CrossCircledIcon className="w-5 h-5 text-red-500" />;
    case 'inactive':
      return <div className="w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600" />;
  }
};

const getHealthColor = (health: number) => {
  if (health >= 90) return 'bg-green-500';
  if (health >= 70) return 'bg-yellow-500';
  if (health >= 50) return 'bg-orange-500';
  return 'bg-red-500';
};

export default function IntegrationHubPage() {
  const activeCount = integrations.filter((i) => i.status === 'active').length;
  const warningCount = integrations.filter((i) => i.status === 'warning').length;
  const errorCount = integrations.filter((i) => i.status === 'error').length;
  const avgHealth =
    integrations.filter((i) => i.status !== 'inactive').reduce((sum, i) => sum + i.health, 0) /
    integrations.filter((i) => i.status !== 'inactive').length;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Integration Hub
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Monitor and manage third-party system connections
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Total Integrations
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {integrations.length}
              </div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active</div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {activeCount}
              </div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Warnings / Errors
              </div>
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                {warningCount} / {errorCount}
              </div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Average Health
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {avgHealth.toFixed(0)}%
              </div>
            </div>
          </div>

          {/* Integrations Table */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                System Integrations
              </h2>
              <button className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-dark-border-default text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary transition-colors flex items-center gap-2">
                <ReloadIcon className="w-4 h-4" />
                Refresh All
              </button>
            </div>

            <div className="space-y-3">
              {integrations.map((integration) => (
                <div
                  key={integration.id}
                  className="p-4 rounded-lg border border-gray-200 dark:border-dark-border-default hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="pt-1">{getStatusIcon(integration.status)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {integration.name}
                          </h3>
                          <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-dark-bg-tertiary text-gray-600 dark:text-gray-400">
                            {integration.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {integration.description}
                        </p>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Last Sync:</span>
                            <div className="text-gray-900 dark:text-gray-100 font-medium">
                              {integration.lastSync}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Frequency:</span>
                            <div className="text-gray-900 dark:text-gray-100 font-medium">
                              {integration.syncFrequency}
                            </div>
                          </div>
                          {integration.recordsSynced && (
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">
                                Records Synced:
                              </span>
                              <div className="text-gray-900 dark:text-gray-100 font-medium">
                                {integration.recordsSynced.toLocaleString()}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3 ml-4">
                      <div className="text-right">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Health</div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 dark:bg-dark-bg-tertiary rounded-full overflow-hidden">
                            <div
                              className={`h-full ${getHealthColor(integration.health)}`}
                              style={{ width: `${integration.health}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 w-10 text-right">
                            {integration.health}%
                          </span>
                        </div>
                      </div>
                      <button className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-dark-border-default text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary transition-colors flex items-center gap-2">
                        <GearIcon className="w-4 h-4" />
                        Configure
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
