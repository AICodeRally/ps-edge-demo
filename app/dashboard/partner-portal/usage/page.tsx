/**
 * Partner Portal - Usage Analytics
 * API usage and platform utilization tracking
 */

'use client';

import { ArrowUpIcon, ArrowDownIcon } from '@radix-ui/react-icons';

interface UsageMetric {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
}

interface ClientUsage {
  clientName: string;
  apiCalls: number;
  avgResponseTime: number;
  errorRate: number;
  dataTransfer: number; // MB
  tier: string;
}

interface EndpointUsage {
  endpoint: string;
  method: string;
  calls: number;
  avgResponseTime: number;
  errorRate: number;
  percentOfTotal: number;
}

const usageMetrics: UsageMetric[] = [
  { label: 'Total API Calls', value: '48,451', change: '+12.4%', trend: 'up', color: 'text-blue-600' },
  { label: 'Avg Response Time', value: '247ms', change: '-8.2%', trend: 'up', color: 'text-green-600' },
  { label: 'Error Rate', value: '0.43%', change: '-0.15%', trend: 'up', color: 'text-green-600' },
  { label: 'Data Transfer', value: '1.24 GB', change: '+18.5%', trend: 'up', color: 'text-purple-600' },
];

const clientUsage: ClientUsage[] = [
  {
    clientName: 'Education Excellence Fund',
    apiCalls: 9123,
    avgResponseTime: 198,
    errorRate: 0.21,
    dataTransfer: 243,
    tier: 'Enterprise',
  },
  {
    clientName: 'Hopewell Community Foundation',
    apiCalls: 8234,
    avgResponseTime: 215,
    errorRate: 0.34,
    dataTransfer: 217,
    tier: 'Enterprise',
  },
  {
    clientName: 'Heritage Preservation Society',
    apiCalls: 7856,
    avgResponseTime: 223,
    errorRate: 0.28,
    dataTransfer: 198,
    tier: 'Enterprise',
  },
  {
    clientName: 'Youth Development Network',
    apiCalls: 6123,
    avgResponseTime: 256,
    errorRate: 0.45,
    dataTransfer: 156,
    tier: 'Professional',
  },
  {
    clientName: 'Homeless Outreach Network',
    apiCalls: 5876,
    avgResponseTime: 241,
    errorRate: 0.38,
    dataTransfer: 145,
    tier: 'Professional',
  },
  {
    clientName: 'Community Wellness Initiative',
    apiCalls: 5234,
    avgResponseTime: 268,
    errorRate: 0.52,
    dataTransfer: 134,
    tier: 'Professional',
  },
  {
    clientName: 'Community Arts Alliance',
    apiCalls: 4521,
    avgResponseTime: 287,
    errorRate: 0.61,
    dataTransfer: 123,
    tier: 'Professional',
  },
  {
    clientName: 'Seniors Support Services',
    apiCalls: 3456,
    avgResponseTime: 312,
    errorRate: 0.78,
    dataTransfer: 98,
    tier: 'Professional',
  },
  {
    clientName: 'Animal Rescue Coalition',
    apiCalls: 2134,
    avgResponseTime: 298,
    errorRate: 0.54,
    dataTransfer: 67,
    tier: 'Starter',
  },
  {
    clientName: 'Environmental Action Group',
    apiCalls: 1234,
    avgResponseTime: 342,
    errorRate: 0.89,
    dataTransfer: 45,
    tier: 'Starter',
  },
];

const endpointUsage: EndpointUsage[] = [
  {
    endpoint: '/api/v1/donors',
    method: 'GET',
    calls: 12453,
    avgResponseTime: 189,
    errorRate: 0.23,
    percentOfTotal: 25.7,
  },
  {
    endpoint: '/api/v1/donations',
    method: 'POST',
    calls: 9871,
    avgResponseTime: 312,
    errorRate: 0.45,
    percentOfTotal: 20.4,
  },
  {
    endpoint: '/api/v1/volunteers',
    method: 'GET',
    calls: 7654,
    avgResponseTime: 198,
    errorRate: 0.34,
    percentOfTotal: 15.8,
  },
  {
    endpoint: '/api/v1/grants',
    method: 'GET',
    calls: 5432,
    avgResponseTime: 245,
    errorRate: 0.52,
    percentOfTotal: 11.2,
  },
  {
    endpoint: '/api/v1/events',
    method: 'GET',
    calls: 4321,
    avgResponseTime: 176,
    errorRate: 0.18,
    percentOfTotal: 8.9,
  },
  {
    endpoint: '/api/v1/reports/generate',
    method: 'POST',
    calls: 3210,
    avgResponseTime: 1234,
    errorRate: 0.67,
    percentOfTotal: 6.6,
  },
  {
    endpoint: '/api/v1/analytics/dashboard',
    method: 'GET',
    calls: 2876,
    avgResponseTime: 567,
    errorRate: 0.41,
    percentOfTotal: 5.9,
  },
  {
    endpoint: '/api/v1/users',
    method: 'GET',
    calls: 2634,
    avgResponseTime: 145,
    errorRate: 0.29,
    percentOfTotal: 5.4,
  },
];

export default function UsagePage() {
  const totalCalls = clientUsage.reduce((sum, c) => sum + c.apiCalls, 0);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            API Usage Analytics
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Monitor platform utilization and API consumption
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Usage Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {usageMetrics.map((metric) => (
              <div key={metric.label} className="card p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {metric.label}
                </div>
                <div className={`text-3xl font-bold ${metric.color || 'text-gray-900 dark:text-gray-100'}`}>
                  {metric.value}
                </div>
                {metric.change && (
                  <div className={`flex items-center gap-1 mt-1 text-sm ${
                    metric.trend === 'up' && metric.label !== 'Error Rate' ? 'text-green-600' :
                    metric.trend === 'up' && metric.label === 'Error Rate' ? 'text-green-600' :
                    'text-red-600'
                  }`}>
                    {metric.trend === 'up' && metric.label !== 'Error Rate' && metric.label !== 'Avg Response Time' && (
                      <ArrowUpIcon className="w-4 h-4" />
                    )}
                    {metric.trend === 'down' && (
                      <ArrowDownIcon className="w-4 h-4" />
                    )}
                    {metric.label === 'Avg Response Time' || metric.label === 'Error Rate' ? (
                      metric.change.startsWith('-') ? <ArrowDownIcon className="w-4 h-4" /> : null
                    ) : null}
                    <span>{metric.change}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Client Usage */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Usage by Client
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-border-default">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Client
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Tier
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      API Calls
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Avg Response
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Error Rate
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Data Transfer
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      % of Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clientUsage.map((client) => {
                    const percentOfTotal = ((client.apiCalls / totalCalls) * 100).toFixed(1);

                    return (
                      <tr
                        key={client.clientName}
                        className="border-b border-gray-100 dark:border-dark-border-default hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary"
                      >
                        <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                          {client.clientName}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            client.tier === 'Enterprise'
                              ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                              : client.tier === 'Professional'
                              ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                              : 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                          }`}>
                            {client.tier}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {client.apiCalls.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-sm ${
                            client.avgResponseTime < 250
                              ? 'text-green-600'
                              : client.avgResponseTime < 300
                              ? 'text-yellow-600'
                              : 'text-red-600'
                          }`}>
                            {client.avgResponseTime}ms
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-sm ${
                            client.errorRate < 0.5
                              ? 'text-green-600'
                              : client.errorRate < 0.8
                              ? 'text-yellow-600'
                              : 'text-red-600'
                          }`}>
                            {client.errorRate}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                          {client.dataTransfer} MB
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-200 dark:bg-dark-bg-tertiary rounded-full overflow-hidden w-16">
                              <div
                                className="h-full bg-teal-500"
                                style={{ width: `${percentOfTotal}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400 w-10">
                              {percentOfTotal}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Endpoint Performance */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Top Endpoints by Traffic
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-border-default">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Endpoint
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Method
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Calls
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Avg Response
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Error Rate
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      % of Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {endpointUsage.map((endpoint) => (
                    <tr
                      key={`${endpoint.method}-${endpoint.endpoint}`}
                      className="border-b border-gray-100 dark:border-dark-border-default hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary"
                    >
                      <td className="py-3 px-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                        {endpoint.endpoint}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          endpoint.method === 'GET'
                            ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : endpoint.method === 'POST'
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                            : 'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400'
                        }`}>
                          {endpoint.method}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {endpoint.calls.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-sm ${
                          endpoint.avgResponseTime < 300
                            ? 'text-green-600'
                            : endpoint.avgResponseTime < 600
                            ? 'text-yellow-600'
                            : 'text-red-600'
                        }`}>
                          {endpoint.avgResponseTime}ms
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-sm ${
                          endpoint.errorRate < 0.5
                            ? 'text-green-600'
                            : endpoint.errorRate < 0.8
                            ? 'text-yellow-600'
                            : 'text-red-600'
                        }`}>
                          {endpoint.errorRate}%
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 dark:bg-dark-bg-tertiary rounded-full overflow-hidden w-16">
                            <div
                              className="h-full bg-blue-500"
                              style={{ width: `${endpoint.percentOfTotal}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 w-10">
                            {endpoint.percentOfTotal}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
