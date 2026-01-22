/**
 * Partner Portal - Client Tenants
 * Manage NP-Edge client tenant deployments
 */

'use client';

import Link from 'next/link';
import {
  MagnifyingGlassIcon,
  CheckCircledIcon,
  ExclamationTriangleIcon,
  CrossCircledIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@radix-ui/react-icons';
import { useState } from 'react';

interface ClientTenant {
  id: string;
  organizationName: string;
  tier: 'Enterprise' | 'Professional' | 'Starter';
  status: 'active' | 'warning' | 'inactive';
  monthlyFee: number;
  healthScore: number;
  activeUsers: number;
  totalUsers: number;
  goLiveDate: string;
  apiCallsThisMonth: number;
  lastActivity: string;
  primaryContact: string;
  email: string;
}

const clientTenants: ClientTenant[] = [
  {
    id: 'hopewell-community',
    organizationName: 'Hopewell Community Foundation',
    tier: 'Enterprise',
    status: 'active',
    monthlyFee: 499,
    healthScore: 98,
    activeUsers: 24,
    totalUsers: 25,
    goLiveDate: '2024-01-15',
    apiCallsThisMonth: 8234,
    lastActivity: '2 hours ago',
    primaryContact: 'Sarah Johnson',
    email: 'sarah.johnson@hopewell.org',
  },
  {
    id: 'community-arts',
    organizationName: 'Community Arts Alliance',
    tier: 'Professional',
    status: 'active',
    monthlyFee: 299,
    healthScore: 94,
    activeUsers: 15,
    totalUsers: 18,
    goLiveDate: '2024-02-01',
    apiCallsThisMonth: 4521,
    lastActivity: '1 day ago',
    primaryContact: 'Michael Chen',
    email: 'mchen@communityarts.org',
  },
  {
    id: 'youth-development',
    organizationName: 'Youth Development Network',
    tier: 'Professional',
    status: 'active',
    monthlyFee: 299,
    healthScore: 87,
    activeUsers: 12,
    totalUsers: 15,
    goLiveDate: '2024-03-10',
    apiCallsThisMonth: 6123,
    lastActivity: '5 hours ago',
    primaryContact: 'Jennifer Martinez',
    email: 'jmartinez@ydn.org',
  },
  {
    id: 'environmental-action',
    organizationName: 'Environmental Action Group',
    tier: 'Starter',
    status: 'warning',
    monthlyFee: 99,
    healthScore: 62,
    activeUsers: 3,
    totalUsers: 8,
    goLiveDate: '2024-11-20',
    apiCallsThisMonth: 1234,
    lastActivity: '5 days ago',
    primaryContact: 'David Thompson',
    email: 'dthompson@eag.org',
  },
  {
    id: 'heritage-preservation',
    organizationName: 'Heritage Preservation Society',
    tier: 'Enterprise',
    status: 'active',
    monthlyFee: 499,
    healthScore: 92,
    activeUsers: 18,
    totalUsers: 20,
    goLiveDate: '2024-01-20',
    apiCallsThisMonth: 7856,
    lastActivity: '3 hours ago',
    primaryContact: 'Lisa Anderson',
    email: 'landerson@heritage.org',
  },
  {
    id: 'wellness-initiative',
    organizationName: 'Community Wellness Initiative',
    tier: 'Professional',
    status: 'active',
    monthlyFee: 299,
    healthScore: 89,
    activeUsers: 14,
    totalUsers: 16,
    goLiveDate: '2024-04-15',
    apiCallsThisMonth: 5234,
    lastActivity: '8 hours ago',
    primaryContact: 'Robert Wilson',
    email: 'rwilson@wellness.org',
  },
  {
    id: 'education-fund',
    organizationName: 'Education Excellence Fund',
    tier: 'Enterprise',
    status: 'active',
    monthlyFee: 499,
    healthScore: 96,
    activeUsers: 22,
    totalUsers: 24,
    goLiveDate: '2023-12-01',
    apiCallsThisMonth: 9123,
    lastActivity: '1 hour ago',
    primaryContact: 'Emily Davis',
    email: 'edavis@educationfund.org',
  },
  {
    id: 'animal-rescue',
    organizationName: 'Animal Rescue Coalition',
    tier: 'Starter',
    status: 'active',
    monthlyFee: 99,
    healthScore: 78,
    activeUsers: 5,
    totalUsers: 6,
    goLiveDate: '2024-10-01',
    apiCallsThisMonth: 2134,
    lastActivity: '2 days ago',
    primaryContact: 'Amanda Brown',
    email: 'abrown@animalrescue.org',
  },
  {
    id: 'homeless-outreach',
    organizationName: 'Homeless Outreach Network',
    tier: 'Professional',
    status: 'active',
    monthlyFee: 299,
    healthScore: 91,
    activeUsers: 16,
    totalUsers: 18,
    goLiveDate: '2024-05-10',
    apiCallsThisMonth: 5876,
    lastActivity: '4 hours ago',
    primaryContact: 'Marcus Johnson',
    email: 'mjohnson@homelessoutreach.org',
  },
  {
    id: 'seniors-support',
    organizationName: 'Seniors Support Services',
    tier: 'Professional',
    status: 'warning',
    monthlyFee: 299,
    healthScore: 68,
    activeUsers: 8,
    totalUsers: 14,
    goLiveDate: '2024-06-15',
    apiCallsThisMonth: 3456,
    lastActivity: '6 days ago',
    primaryContact: 'Patricia Lee',
    email: 'plee@seniors.org',
  },
];

const tierColors = {
  Enterprise: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
  Professional: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
  Starter: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
};

export default function TenantsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTier, setFilterTier] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredTenants = clientTenants.filter((tenant) => {
    const matchesSearch =
      searchQuery === '' ||
      tenant.organizationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.primaryContact.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = filterTier === 'all' || tenant.tier === filterTier;
    const matchesStatus = filterStatus === 'all' || tenant.status === filterStatus;
    return matchesSearch && matchesTier && matchesStatus;
  });

  const stats = {
    total: clientTenants.length,
    active: clientTenants.filter((t) => t.status === 'active').length,
    warning: clientTenants.filter((t) => t.status === 'warning').length,
    avgHealth: Math.round(
      clientTenants.reduce((sum, t) => sum + t.healthScore, 0) / clientTenants.length
    ),
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Client Tenants
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage nonprofit clients using NP-Edge platform
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Tenants</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.total}</div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active</div>
              <div className="text-3xl font-bold text-green-600">{stats.active}</div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Need Attention</div>
              <div className="text-3xl font-bold text-yellow-600">{stats.warning}</div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Health Score</div>
              <div className="text-3xl font-bold text-blue-600">{stats.avgHealth}%</div>
            </div>
          </div>

          {/* Filters */}
          <div className="card p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by organization or contact..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-dark-border-default rounded-lg bg-white dark:bg-dark-bg-primary text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Tier Filter */}
              <select
                value={filterTier}
                onChange={(e) => setFilterTier(e.target.value)}
                className="px-4 py-2 border border-gray-200 dark:border-dark-border-default rounded-lg bg-white dark:bg-dark-bg-primary text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Tiers</option>
                <option value="Enterprise">Enterprise</option>
                <option value="Professional">Professional</option>
                <option value="Starter">Starter</option>
              </select>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-200 dark:border-dark-border-default rounded-lg bg-white dark:bg-dark-bg-primary text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="warning">Warning</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Tenants Table */}
          <div className="card p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-border-default">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Organization
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Tier
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Health
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Users
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      API Calls
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Last Activity
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      MRR
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTenants.map((tenant) => (
                    <tr
                      key={tenant.id}
                      className="border-b border-gray-100 dark:border-dark-border-default hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary"
                    >
                      <td className="py-3 px-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {tenant.organizationName}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {tenant.primaryContact}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${tierColors[tenant.tier]}`}>
                          {tenant.tier}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {tenant.status === 'active' && (
                          <CheckCircledIcon className="w-5 h-5 text-green-500" />
                        )}
                        {tenant.status === 'warning' && (
                          <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
                        )}
                        {tenant.status === 'inactive' && (
                          <CrossCircledIcon className="w-5 h-5 text-red-500" />
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 dark:bg-dark-bg-tertiary rounded-full overflow-hidden w-20">
                            <div
                              className={`h-full ${
                                tenant.healthScore >= 90
                                  ? 'bg-green-500'
                                  : tenant.healthScore >= 70
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${tenant.healthScore}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 w-8">
                            {tenant.healthScore}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                        {tenant.activeUsers}/{tenant.totalUsers}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                        {tenant.apiCallsThisMonth.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {tenant.lastActivity}
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                        ${tenant.monthlyFee}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredTenants.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  No tenants match your search criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
