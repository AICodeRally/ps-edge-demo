/**
 * Partner Portal - Benchmarks
 * Portfolio benchmarking and analytics
 */

'use client';

import { ArrowUpIcon, ArrowDownIcon } from '@radix-ui/react-icons';

interface BenchmarkMetric {
  metric: string;
  category: string;
  portfolioAverage: number;
  portfolioMedian: number;
  p25: number;
  p75: number;
  topPerformer: string;
  topValue: number;
  unit: string;
}

interface ClientPerformance {
  clientName: string;
  avgDonation: number;
  donorRetention: number;
  volunteerHours: number;
  grantApproval: number;
  userAdoption: number;
  overallScore: number;
}

const benchmarkMetrics: BenchmarkMetric[] = [
  {
    metric: 'Average Donation Amount',
    category: 'Fundraising',
    portfolioAverage: 287,
    portfolioMedian: 265,
    p25: 185,
    p75: 345,
    topPerformer: 'Heritage Preservation Society',
    topValue: 456,
    unit: '$',
  },
  {
    metric: 'Donor Retention Rate',
    category: 'Fundraising',
    portfolioAverage: 68,
    portfolioMedian: 71,
    p25: 58,
    p75: 78,
    topPerformer: 'Education Excellence Fund',
    topValue: 84,
    unit: '%',
  },
  {
    metric: 'Campaign Success Rate',
    category: 'Fundraising',
    portfolioAverage: 73,
    portfolioMedian: 75,
    p25: 62,
    p75: 82,
    topPerformer: 'Hopewell Community Foundation',
    topValue: 91,
    unit: '%',
  },
  {
    metric: 'Volunteer Hours/Month',
    category: 'Volunteer Management',
    portfolioAverage: 142,
    portfolioMedian: 138,
    p25: 95,
    p75: 178,
    topPerformer: 'Community Arts Alliance',
    topValue: 234,
    unit: 'hrs',
  },
  {
    metric: 'Volunteer Retention Rate',
    category: 'Volunteer Management',
    portfolioAverage: 62,
    portfolioMedian: 64,
    p25: 51,
    p75: 72,
    topPerformer: 'Animal Rescue Coalition',
    topValue: 79,
    unit: '%',
  },
  {
    metric: 'Grant Approval Rate',
    category: 'Grant Management',
    portfolioAverage: 41,
    portfolioMedian: 43,
    p25: 32,
    p75: 52,
    topPerformer: 'Education Excellence Fund',
    topValue: 67,
    unit: '%',
  },
  {
    metric: 'Average Grant Size',
    category: 'Grant Management',
    portfolioAverage: 18500,
    portfolioMedian: 15000,
    p25: 8500,
    p75: 25000,
    topPerformer: 'Heritage Preservation Society',
    topValue: 42000,
    unit: '$',
  },
  {
    metric: 'Active User Rate',
    category: 'Platform Adoption',
    portfolioAverage: 78,
    portfolioMedian: 81,
    p25: 68,
    p75: 88,
    topPerformer: 'Hopewell Community Foundation',
    topValue: 96,
    unit: '%',
  },
  {
    metric: 'Module Adoption Score',
    category: 'Platform Adoption',
    portfolioAverage: 65,
    portfolioMedian: 67,
    p25: 52,
    p75: 76,
    topPerformer: 'Education Excellence Fund',
    topValue: 89,
    unit: '%',
  },
];

const clientPerformance: ClientPerformance[] = [
  {
    clientName: 'Hopewell Community Foundation',
    avgDonation: 324,
    donorRetention: 79,
    volunteerHours: 189,
    grantApproval: 52,
    userAdoption: 96,
    overallScore: 98,
  },
  {
    clientName: 'Education Excellence Fund',
    avgDonation: 398,
    donorRetention: 84,
    volunteerHours: 156,
    grantApproval: 67,
    userAdoption: 89,
    overallScore: 96,
  },
  {
    clientName: 'Heritage Preservation Society',
    avgDonation: 456,
    donorRetention: 76,
    volunteerHours: 134,
    grantApproval: 58,
    userAdoption: 85,
    overallScore: 92,
  },
  {
    clientName: 'Community Arts Alliance',
    avgDonation: 289,
    donorRetention: 71,
    volunteerHours: 234,
    grantApproval: 45,
    userAdoption: 81,
    overallScore: 94,
  },
  {
    clientName: 'Homeless Outreach Network',
    avgDonation: 276,
    donorRetention: 73,
    volunteerHours: 167,
    grantApproval: 48,
    userAdoption: 83,
    overallScore: 91,
  },
  {
    clientName: 'Community Wellness Initiative',
    avgDonation: 265,
    donorRetention: 68,
    volunteerHours: 145,
    grantApproval: 43,
    userAdoption: 78,
    overallScore: 89,
  },
  {
    clientName: 'Youth Development Network',
    avgDonation: 243,
    donorRetention: 65,
    volunteerHours: 128,
    grantApproval: 39,
    userAdoption: 74,
    overallScore: 87,
  },
  {
    clientName: 'Animal Rescue Coalition',
    avgDonation: 198,
    donorRetention: 61,
    volunteerHours: 112,
    grantApproval: 34,
    userAdoption: 71,
    overallScore: 78,
  },
  {
    clientName: 'Seniors Support Services',
    avgDonation: 187,
    donorRetention: 58,
    volunteerHours: 95,
    grantApproval: 32,
    userAdoption: 64,
    overallScore: 68,
  },
  {
    clientName: 'Environmental Action Group',
    avgDonation: 156,
    donorRetention: 54,
    volunteerHours: 78,
    grantApproval: 28,
    userAdoption: 58,
    overallScore: 62,
  },
];

const categories = ['Fundraising', 'Volunteer Management', 'Grant Management', 'Platform Adoption'];

export default function BenchmarksPage() {
  const formatValue = (value: number, unit: string) => {
    if (unit === '$' && value >= 1000) {
      return `$${(value / 1000).toFixed(1)}k`;
    }
    if (unit === '$') {
      return `$${value}`;
    }
    if (unit === '%') {
      return `${value}%`;
    }
    return `${value}${unit}`;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Benchmark Reports
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Portfolio-wide analytics and performance benchmarks
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Category Sections */}
          {categories.map((category) => {
            const categoryMetrics = benchmarkMetrics.filter((m) => m.category === category);

            return (
              <div key={category} className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {category} Benchmarks
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-dark-border-default">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                          Metric
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                          Portfolio Avg
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                          Median
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                          25th %ile
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                          75th %ile
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                          Top Performer
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryMetrics.map((metric) => (
                        <tr
                          key={metric.metric}
                          className="border-b border-gray-100 dark:border-dark-border-default hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary"
                        >
                          <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                            {metric.metric}
                          </td>
                          <td className="py-3 px-4 text-sm font-semibold text-teal-600 dark:text-teal-400">
                            {formatValue(metric.portfolioAverage, metric.unit)}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                            {formatValue(metric.portfolioMedian, metric.unit)}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                            {formatValue(metric.p25, metric.unit)}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                            {formatValue(metric.p75, metric.unit)}
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-sm">
                              <div className="font-medium text-gray-900 dark:text-gray-100">
                                {metric.topPerformer}
                              </div>
                              <div className="text-green-600 dark:text-green-400">
                                {formatValue(metric.topValue, metric.unit)}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}

          {/* Client Performance Ranking */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Overall Client Performance Ranking
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-border-default">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Rank
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Client
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Avg Donation
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Donor Retention
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Volunteer Hrs
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Grant Approval
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      User Adoption
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Overall Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clientPerformance.map((client, idx) => {
                    const avgBenchmark = benchmarkMetrics.find((m) => m.metric === 'Average Donation Amount');
                    const donorBenchmark = benchmarkMetrics.find((m) => m.metric === 'Donor Retention Rate');
                    const volunteerBenchmark = benchmarkMetrics.find((m) => m.metric === 'Volunteer Hours/Month');
                    const grantBenchmark = benchmarkMetrics.find((m) => m.metric === 'Grant Approval Rate');
                    const userBenchmark = benchmarkMetrics.find((m) => m.metric === 'Active User Rate');

                    return (
                      <tr
                        key={client.clientName}
                        className="border-b border-gray-100 dark:border-dark-border-default hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary"
                      >
                        <td className="py-3 px-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                            idx === 1 ? 'bg-gray-100 text-gray-700' :
                            idx === 2 ? 'bg-orange-100 text-orange-700' :
                            'bg-gray-50 text-gray-600'
                          }`}>
                            {idx + 1}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                          {client.clientName}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-900 dark:text-gray-100">
                              ${client.avgDonation}
                            </span>
                            {avgBenchmark && client.avgDonation > avgBenchmark.portfolioAverage && (
                              <ArrowUpIcon className="w-4 h-4 text-green-500" />
                            )}
                            {avgBenchmark && client.avgDonation < avgBenchmark.portfolioAverage && (
                              <ArrowDownIcon className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-900 dark:text-gray-100">
                              {client.donorRetention}%
                            </span>
                            {donorBenchmark && client.donorRetention > donorBenchmark.portfolioAverage && (
                              <ArrowUpIcon className="w-4 h-4 text-green-500" />
                            )}
                            {donorBenchmark && client.donorRetention < donorBenchmark.portfolioAverage && (
                              <ArrowDownIcon className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-900 dark:text-gray-100">
                              {client.volunteerHours}
                            </span>
                            {volunteerBenchmark && client.volunteerHours > volunteerBenchmark.portfolioAverage && (
                              <ArrowUpIcon className="w-4 h-4 text-green-500" />
                            )}
                            {volunteerBenchmark && client.volunteerHours < volunteerBenchmark.portfolioAverage && (
                              <ArrowDownIcon className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-900 dark:text-gray-100">
                              {client.grantApproval}%
                            </span>
                            {grantBenchmark && client.grantApproval > grantBenchmark.portfolioAverage && (
                              <ArrowUpIcon className="w-4 h-4 text-green-500" />
                            )}
                            {grantBenchmark && client.grantApproval < grantBenchmark.portfolioAverage && (
                              <ArrowDownIcon className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-900 dark:text-gray-100">
                              {client.userAdoption}%
                            </span>
                            {userBenchmark && client.userAdoption > userBenchmark.portfolioAverage && (
                              <ArrowUpIcon className="w-4 h-4 text-green-500" />
                            )}
                            {userBenchmark && client.userAdoption < userBenchmark.portfolioAverage && (
                              <ArrowDownIcon className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-200 dark:bg-dark-bg-tertiary rounded-full overflow-hidden w-20">
                              <div
                                className={`h-full ${
                                  client.overallScore >= 90
                                    ? 'bg-green-500'
                                    : client.overallScore >= 70
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                                }`}
                                style={{ width: `${client.overallScore}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 w-10">
                              {client.overallScore}
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
        </div>
      </div>
    </div>
  );
}
