/**
 * Partner Portal - Commissions
 * Track commission earnings, payouts, margins, and costs
 */

'use client';

import {
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarIcon,
} from '@radix-ui/react-icons';

interface CommissionRecord {
  month: string;
  clientRevenue: number;
  upstreamCosts: number;
  grossMargin: number;
  marginPercent: number;
  clientCount: number;
}

const commissionHistory: CommissionRecord[] = [
  {
    month: 'Jan 2025',
    clientRevenue: 14784,
    upstreamCosts: 9750,
    grossMargin: 5034,
    marginPercent: 34,
    clientCount: 47,
  },
  {
    month: 'Dec 2024',
    clientRevenue: 13680,
    upstreamCosts: 9150,
    grossMargin: 4530,
    marginPercent: 33,
    clientCount: 44,
  },
  {
    month: 'Nov 2024',
    clientRevenue: 12950,
    upstreamCosts: 8920,
    grossMargin: 4030,
    marginPercent: 31,
    clientCount: 42,
  },
  {
    month: 'Oct 2024',
    clientRevenue: 11240,
    upstreamCosts: 8450,
    grossMargin: 2790,
    marginPercent: 25,
    clientCount: 39,
  },
  {
    month: 'Sep 2024',
    clientRevenue: 10580,
    upstreamCosts: 8120,
    grossMargin: 2460,
    marginPercent: 23,
    clientCount: 37,
  },
  {
    month: 'Aug 2024',
    clientRevenue: 9870,
    upstreamCosts: 7850,
    grossMargin: 2020,
    marginPercent: 20,
    clientCount: 35,
  },
];

interface EarningsBreakdown {
  source: string;
  tier: string;
  clients: number;
  monthlyFee: number;
  totalMRR: number;
  ourCost: number;
  margin: number;
}

const earningsBreakdown: EarningsBreakdown[] = [
  {
    source: 'NP-Edge Enterprise',
    tier: 'Enterprise',
    clients: 12,
    monthlyFee: 499,
    totalMRR: 5988,
    ourCost: 3593,
    margin: 2395,
  },
  {
    source: 'NP-Edge Professional',
    tier: 'Professional',
    clients: 28,
    monthlyFee: 299,
    totalMRR: 8372,
    ourCost: 5023,
    margin: 3349,
  },
  {
    source: 'NP-Edge Starter',
    tier: 'Starter',
    clients: 7,
    monthlyFee: 99,
    totalMRR: 693,
    ourCost: 416,
    margin: 277,
  },
];

interface CostBreakdown {
  vendor: string;
  type: string;
  monthlyCost: number;
  commissionRate: string;
  ourRevenue: number;
  netCost: number;
}

const costBreakdown: CostBreakdown[] = [
  {
    vendor: 'NP-Edge Platform',
    type: 'License Fees',
    monthlyCost: 2500,
    commissionRate: '20%',
    ourRevenue: 15053,
    netCost: 12043,
  },
  {
    vendor: 'Rally AI Services',
    type: 'AI Usage',
    monthlyCost: 1200,
    commissionRate: '15%',
    ourRevenue: 15053,
    netCost: 12797,
  },
  {
    vendor: 'Vercel Hosting',
    type: 'Infrastructure',
    monthlyCost: 450,
    commissionRate: '0%',
    ourRevenue: 0,
    netCost: 450,
  },
  {
    vendor: 'Support & Training',
    type: 'Service Costs',
    monthlyCost: 850,
    commissionRate: '0%',
    ourRevenue: 0,
    netCost: 850,
  },
];

export default function CommissionsPage() {
  const currentMonth = commissionHistory[0];
  const previousMonth = commissionHistory[1];
  const revenueChange = ((currentMonth.clientRevenue - previousMonth.clientRevenue) / previousMonth.clientRevenue * 100).toFixed(1);
  const marginChange = ((currentMonth.grossMargin - previousMonth.grossMargin) / previousMonth.grossMargin * 100).toFixed(1);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Commission Management
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Track revenue, costs, margins, and commission payouts
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Current Month Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Client Revenue (MRR)
              </div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                ${currentMonth.clientRevenue.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 mt-1 text-sm text-green-600">
                <ArrowUpIcon className="w-4 h-4" />
                <span>{revenueChange}%</span>
              </div>
            </div>

            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Upstream Costs
              </div>
              <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                ${currentMonth.upstreamCosts.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <ArrowUpIcon className="w-4 h-4" />
                <span>6.6%</span>
              </div>
            </div>

            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Gross Margin
              </div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                ${currentMonth.grossMargin.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 mt-1 text-sm text-green-600">
                <ArrowUpIcon className="w-4 h-4" />
                <span>{marginChange}%</span>
              </div>
            </div>

            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Margin %
              </div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {currentMonth.marginPercent}%
              </div>
              <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <ArrowDownIcon className="w-4 h-4" />
                <span>1%</span>
              </div>
            </div>
          </div>

          {/* Earnings Breakdown by Tier */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Earnings Breakdown by Tier
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-border-default">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Source
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
                      Our Cost (60%)
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Margin (40%)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {earningsBreakdown.map((item, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-100 dark:border-dark-border-default hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary"
                    >
                      <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                        {item.source}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                        {item.clients}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        ${item.monthlyFee}
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                        ${item.totalMRR.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-red-600 dark:text-red-400">
                        ${item.ourCost.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold text-green-600 dark:text-green-400">
                        ${item.margin.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 dark:bg-dark-bg-tertiary font-semibold">
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                      Total
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                      {earningsBreakdown.reduce((sum, item) => sum + item.clients, 0)}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      -
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                      ${earningsBreakdown.reduce((sum, item) => sum + item.totalMRR, 0).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-red-600 dark:text-red-400">
                      ${earningsBreakdown.reduce((sum, item) => sum + item.ourCost, 0).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-green-600 dark:text-green-400">
                      ${earningsBreakdown.reduce((sum, item) => sum + item.margin, 0).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Cost Breakdown & Upstream Commissions
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-border-default">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Vendor
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Monthly Cost
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Commission Rate
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Our Revenue
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Net Cost
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {costBreakdown.map((cost, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-100 dark:border-dark-border-default hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary"
                    >
                      <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                        {cost.vendor}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {cost.type}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                        ${cost.monthlyCost.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                        {cost.commissionRate}
                      </td>
                      <td className="py-3 px-4 text-sm text-green-600 dark:text-green-400">
                        {cost.ourRevenue > 0 ? `$${cost.ourRevenue.toLocaleString()}` : '-'}
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                        ${cost.netCost.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 dark:bg-dark-bg-tertiary font-semibold">
                    <td colSpan={2} className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                      Total Monthly Costs
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                      ${costBreakdown.reduce((sum, cost) => sum + cost.monthlyCost, 0).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      -
                    </td>
                    <td className="py-3 px-4 text-sm text-green-600 dark:text-green-400">
                      ${costBreakdown.reduce((sum, cost) => sum + cost.ourRevenue, 0).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-red-600 dark:text-red-400">
                      ${costBreakdown.reduce((sum, cost) => sum + cost.netCost, 0).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Historical Trend */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              6-Month Commission History
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-border-default">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Month
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Clients
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Client Revenue
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Upstream Costs
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Gross Margin
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Margin %
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {commissionHistory.map((record, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-100 dark:border-dark-border-default hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary"
                    >
                      <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                        {record.month}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                        {record.clientCount}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                        ${record.clientRevenue.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-red-600 dark:text-red-400">
                        ${record.upstreamCosts.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold text-green-600 dark:text-green-400">
                        ${record.grossMargin.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 dark:bg-dark-bg-tertiary rounded-full overflow-hidden max-w-[100px]">
                            <div
                              className="h-full bg-purple-500"
                              style={{ width: `${record.marginPercent}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 w-10">
                            {record.marginPercent}%
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
