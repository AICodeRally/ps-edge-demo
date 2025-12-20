/**
 * Partner Portal - Dashboard
 * Overview of channel partner operations, upstream vendors, and downstream clients
 */

'use client';

import Link from 'next/link';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  PersonIcon,
  RocketIcon,
  LightningBoltIcon,
  ExclamationTriangleIcon,
  CheckCircledIcon,
} from '@radix-ui/react-icons';

interface PartnerMetric {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
}

const upstreamPartners = [
  {
    name: 'NP-Edge Platform Provider',
    type: 'Software Vendor',
    status: 'active',
    monthlyFee: '$2,500',
    ourCommission: '20%',
    lastMonth: '$12,400',
  },
  {
    name: 'Rally AI Services',
    type: 'AI Provider',
    status: 'active',
    monthlyFee: '$1,200',
    ourCommission: '15%',
    lastMonth: '$5,800',
  },
  {
    name: 'Vercel Hosting',
    type: 'Infrastructure',
    status: 'active',
    monthlyFee: '$450',
    ourCommission: '0%',
    lastMonth: '$450',
  },
];

const downstreamClients = [
  {
    name: 'Hopewell Community Foundation',
    tier: 'Enterprise',
    status: 'active',
    monthlyFee: '$499',
    theirUsage: '8,234 API calls',
    health: 98,
  },
  {
    name: 'Community Arts Alliance',
    tier: 'Professional',
    status: 'active',
    monthlyFee: '$299',
    theirUsage: '4,521 API calls',
    health: 94,
  },
  {
    name: 'Youth Development Network',
    tier: 'Professional',
    status: 'active',
    monthlyFee: '$299',
    theirUsage: '6,123 API calls',
    health: 87,
  },
  {
    name: 'Environmental Action Group',
    tier: 'Starter',
    status: 'warning',
    monthlyFee: '$99',
    theirUsage: '1,234 API calls',
    health: 62,
  },
];

const portfolioMetrics: PartnerMetric[] = [
  { label: 'Total MRR', value: '$14,784', change: '+8.2%', trend: 'up', color: 'text-green-600' },
  { label: 'Active Clients', value: '47', change: '+3', trend: 'up', color: 'text-blue-600' },
  { label: 'Avg Health Score', value: '89%', change: '+2%', trend: 'up', color: 'text-purple-600' },
  { label: 'Commission Margin', value: '34%', change: '-1%', trend: 'down', color: 'text-orange-600' },
];

export default function PartnerPortalDashboard() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Partner Portal
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Channel partner ecosystem: upstream vendors and downstream clients
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Portfolio Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {portfolioMetrics.map((metric) => (
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

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/dashboard/partner-portal/tenants"
              className="card p-6 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-500 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform">
                  <PersonIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                    Client Tenants
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Manage {downstreamClients.length} downstream clients
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/dashboard/partner-portal/commissions"
              className="card p-6 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform">
                  <RocketIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                    Commissions
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Track earnings and payouts
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/dashboard/partner-portal/signals"
              className="card p-6 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-500 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform">
                  <LightningBoltIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                    Signals Inbox
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Monitor client health alerts
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Upstream Partners (Vendors to Us) */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Upstream Partners (Vendors to PPG)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-border-default">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Partner
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Monthly Fee
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Commission Rate
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Last Month
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {upstreamPartners.map((partner, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-100 dark:border-dark-border-default hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary"
                    >
                      <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                        {partner.name}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {partner.type}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                          {partner.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                        {partner.monthlyFee}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                        {partner.ourCommission}
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {partner.lastMonth}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Downstream Clients (Clients We Manage) */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Downstream Clients (Nonprofits Using NP-Edge)
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
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Monthly Fee
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Usage
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Health
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {downstreamClients.map((client, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-100 dark:border-dark-border-default hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary"
                    >
                      <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                        {client.name}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                          {client.tier}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {client.status === 'active' ? (
                          <CheckCircledIcon className="w-5 h-5 text-green-500" />
                        ) : (
                          <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                        {client.monthlyFee}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {client.theirUsage}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 dark:bg-dark-bg-tertiary rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                client.health >= 90
                                  ? 'bg-green-500'
                                  : client.health >= 70
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${client.health}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 w-10">
                            {client.health}%
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
