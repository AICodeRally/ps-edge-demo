/**
 * Partner Portal - Revenue
 * Channel partner revenue and commission tracking
 */

'use client';

import {
  ArrowUpIcon,
  ArrowDownIcon,
} from '@radix-ui/react-icons';

interface RevenueMetric {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
}

interface MonthlyRevenue {
  month: string;
  subscriptionMRR: number;
  usageRevenue: number;
  oneTimeFees: number;
  total: number;
  clientCount: number;
}

interface TierRevenue {
  tier: string;
  clients: number;
  monthlyFee: number;
  totalMRR: number;
  percentOfTotal: number;
  color: string;
}

const revenueMetrics: RevenueMetric[] = [
  { label: 'Monthly Recurring Revenue', value: '$15,053', change: '+8.2%', trend: 'up', color: 'text-green-600' },
  { label: 'Annual Run Rate', value: '$180,636', change: '+12.4%', trend: 'up', color: 'text-blue-600' },
  { label: 'Average Revenue Per Client', value: '$320', change: '+2.1%', trend: 'up', color: 'text-purple-600' },
  { label: 'Client Lifetime Value', value: '$11,520', change: '+5.8%', trend: 'up', color: 'text-orange-600' },
];

const monthlyRevenue: MonthlyRevenue[] = [
  {
    month: 'Jan 2025',
    subscriptionMRR: 15053,
    usageRevenue: 1231,
    oneTimeFees: 500,
    total: 16784,
    clientCount: 47,
  },
  {
    month: 'Dec 2024',
    subscriptionMRR: 13912,
    usageRevenue: 1089,
    oneTimeFees: 0,
    total: 15001,
    clientCount: 44,
  },
  {
    month: 'Nov 2024',
    subscriptionMRR: 13234,
    usageRevenue: 967,
    oneTimeFees: 1500,
    total: 15701,
    clientCount: 43,
  },
  {
    month: 'Oct 2024',
    subscriptionMRR: 12678,
    usageRevenue: 834,
    oneTimeFees: 0,
    total: 13512,
    clientCount: 41,
  },
  {
    month: 'Sep 2024',
    subscriptionMRR: 11956,
    usageRevenue: 723,
    oneTimeFees: 500,
    total: 13179,
    clientCount: 39,
  },
  {
    month: 'Aug 2024',
    subscriptionMRR: 11234,
    usageRevenue: 656,
    oneTimeFees: 0,
    total: 11890,
    clientCount: 37,
  },
];

const tierRevenue: TierRevenue[] = [
  {
    tier: 'Enterprise',
    clients: 12,
    monthlyFee: 499,
    totalMRR: 5988,
    percentOfTotal: 39.8,
    color: 'bg-purple-500',
  },
  {
    tier: 'Professional',
    clients: 23,
    monthlyFee: 299,
    totalMRR: 6877,
    percentOfTotal: 45.7,
    color: 'bg-blue-500',
  },
  {
    tier: 'Starter',
    clients: 12,
    monthlyFee: 99,
    totalMRR: 1188,
    percentOfTotal: 7.9,
    color: 'bg-green-500',
  },
  {
    tier: 'Usage & Add-ons',
    clients: 47,
    monthlyFee: 0,
    totalMRR: 1000,
    percentOfTotal: 6.6,
    color: 'bg-orange-500',
  },
];

const revenueStreams = [
  {
    name: 'Subscription Fees',
    description: 'Recurring monthly platform fees by tier',
    amount: 15053,
    percentage: 89.7,
    growth: '+8.2%',
  },
  {
    name: 'Usage Charges',
    description: 'API calls, storage, compute overages',
    amount: 1231,
    percentage: 7.3,
    growth: '+13.1%',
  },
  {
    name: 'One-Time Fees',
    description: 'Setup, training, customization',
    amount: 500,
    percentage: 3.0,
    growth: '-',
  },
];

export default function PartnerRevenuePage() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Partner Revenue
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Track channel fees and commission revenue
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Revenue Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {revenueMetrics.map((metric) => (
              <div key={metric.label} className="card p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {metric.label}
                </div>
                <div className={`text-3xl font-bold ${metric.color || 'text-gray-900 dark:text-gray-100'}`}>
                  {metric.value}
                </div>
                {metric.change && (
                  <div className={`flex items-center gap-1 mt-1 text-sm ${
                    metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {metric.trend === 'up' && <ArrowUpIcon className="w-4 h-4" />}
                    {metric.trend === 'down' && <ArrowDownIcon className="w-4 h-4" />}
                    <span>{metric.change}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Revenue Streams */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Revenue Streams
            </h2>
            <div className="space-y-4">
              {revenueStreams.map((stream) => (
                <div key={stream.name} className="border-b border-gray-200 dark:border-dark-border-default pb-4 last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        {stream.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {stream.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        ${stream.amount.toLocaleString()}
                      </div>
                      {stream.growth !== '-' && (
                        <div className="text-sm text-green-600">
                          {stream.growth}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-dark-bg-tertiary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-500"
                        style={{ width: `${stream.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-12">
                      {stream.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue by Tier */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Revenue by Tier
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-border-default">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Tier
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Clients
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Monthly Fee
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Total MRR
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      % of Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tierRevenue.map((tier) => (
                    <tr
                      key={tier.tier}
                      className="border-b border-gray-100 dark:border-dark-border-default hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${tier.color}`} />
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {tier.tier}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                        {tier.clients}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                        {tier.monthlyFee > 0 ? `$${tier.monthlyFee}` : 'Variable'}
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                        ${tier.totalMRR.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 dark:bg-dark-bg-tertiary rounded-full overflow-hidden">
                            <div
                              className={tier.color}
                              style={{ width: `${tier.percentOfTotal}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100 w-12">
                            {tier.percentOfTotal}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Monthly Revenue Trend */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              6-Month Revenue Trend
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-border-default">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Month
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Subscription MRR
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Usage Revenue
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      One-Time Fees
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Total Revenue
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Client Count
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyRevenue.map((record, idx) => {
                    const prevRecord = monthlyRevenue[idx + 1];
                    const growth = prevRecord
                      ? ((record.total - prevRecord.total) / prevRecord.total * 100).toFixed(1)
                      : null;

                    return (
                      <tr
                        key={record.month}
                        className="border-b border-gray-100 dark:border-dark-border-default hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary"
                      >
                        <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                          {record.month}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                          ${record.subscriptionMRR.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                          ${record.usageRevenue.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                          {record.oneTimeFees > 0 ? `$${record.oneTimeFees.toLocaleString()}` : '-'}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                              ${record.total.toLocaleString()}
                            </span>
                            {growth && (
                              <span className={`text-xs ${
                                parseFloat(growth) > 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {parseFloat(growth) > 0 ? '+' : ''}{growth}%
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                          {record.clientCount}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
