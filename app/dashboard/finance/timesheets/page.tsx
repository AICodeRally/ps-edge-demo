/**
 * Finance - Timesheets Page
 * Manage consultant time tracking and timesheet approval
 */

'use client';

import { CheckCircledIcon, ClockIcon, Cross2Icon } from '@radix-ui/react-icons';
import { useState } from 'react';

interface TimesheetEntry {
  id: string;
  consultant: string;
  week: string;
  client: string;
  engagement: string;
  hoursLogged: number;
  billableHours: number;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  billingRate: number;
  totalValue: number;
  submittedDate?: string;
  approvedDate?: string;
}

const timesheets: TimesheetEntry[] = [
  {
    id: 'ts-001',
    consultant: 'Sarah Mitchell',
    week: 'Jan 13-19, 2025',
    client: 'Hopewell Community Foundation',
    engagement: 'Capital Campaign Strategy',
    hoursLogged: 40,
    billableHours: 38,
    status: 'submitted',
    billingRate: 185,
    totalValue: 7030,
    submittedDate: '2025-01-19',
  },
  {
    id: 'ts-002',
    consultant: 'Michael Chen',
    week: 'Jan 13-19, 2025',
    client: 'Education Excellence Fund',
    engagement: 'Strategic Planning',
    hoursLogged: 35,
    billableHours: 35,
    status: 'approved',
    billingRate: 175,
    totalValue: 6125,
    submittedDate: '2025-01-19',
    approvedDate: '2025-01-20',
  },
  {
    id: 'ts-003',
    consultant: 'Jennifer Martinez',
    week: 'Jan 13-19, 2025',
    client: 'Community Arts Alliance',
    engagement: 'Board Development',
    hoursLogged: 32,
    billableHours: 30,
    status: 'approved',
    billingRate: 165,
    totalValue: 4950,
    submittedDate: '2025-01-18',
    approvedDate: '2025-01-19',
  },
  {
    id: 'ts-004',
    consultant: 'David Thompson',
    week: 'Jan 13-19, 2025',
    client: 'Heritage Preservation Society',
    engagement: 'Grant Writing Workshop',
    hoursLogged: 28,
    billableHours: 28,
    status: 'submitted',
    billingRate: 155,
    totalValue: 4340,
    submittedDate: '2025-01-19',
  },
  {
    id: 'ts-005',
    consultant: 'Lisa Anderson',
    week: 'Jan 13-19, 2025',
    client: 'Youth Development Network',
    engagement: 'Fundraising Strategy',
    hoursLogged: 42,
    billableHours: 40,
    status: 'submitted',
    billingRate: 170,
    totalValue: 6800,
    submittedDate: '2025-01-19',
  },
  {
    id: 'ts-006',
    consultant: 'Robert Wilson',
    week: 'Jan 13-19, 2025',
    client: 'Internal - Admin',
    engagement: 'Administrative',
    hoursLogged: 8,
    billableHours: 0,
    status: 'draft',
    billingRate: 0,
    totalValue: 0,
  },
  {
    id: 'ts-007',
    consultant: 'Emily Davis',
    week: 'Jan 13-19, 2025',
    client: 'Animal Rescue Coalition',
    engagement: 'Feasibility Study',
    hoursLogged: 25,
    billableHours: 25,
    status: 'approved',
    billingRate: 160,
    totalValue: 4000,
    submittedDate: '2025-01-18',
    approvedDate: '2025-01-19',
  },
  {
    id: 'ts-008',
    consultant: 'Amanda Brown',
    week: 'Jan 6-12, 2025',
    client: 'Homeless Outreach Network',
    engagement: 'Training Workshop',
    hoursLogged: 16,
    billableHours: 16,
    status: 'rejected',
    billingRate: 150,
    totalValue: 2400,
    submittedDate: '2025-01-13',
  },
];

const statusConfig = {
  draft: {
    label: 'Draft',
    color: 'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400',
  },
  submitted: {
    label: 'Pending Approval',
    color: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
  },
  approved: {
    label: 'Approved',
    color: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
  },
  rejected: {
    label: 'Rejected',
    color: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400',
  },
};

export default function TimesheetsPage() {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredTimesheets = timesheets.filter((ts) => {
    if (filterStatus === 'all') return true;
    return ts.status === filterStatus;
  });

  const stats = {
    totalHours: timesheets.reduce((sum, ts) => sum + ts.hoursLogged, 0),
    billableHours: timesheets.reduce((sum, ts) => sum + ts.billableHours, 0),
    totalValue: timesheets.reduce((sum, ts) => sum + ts.totalValue, 0),
    pendingApproval: timesheets.filter((ts) => ts.status === 'submitted').length,
  };

  const utilizationRate = ((stats.billableHours / stats.totalHours) * 100).toFixed(1);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Timesheets
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Track and approve consultant timesheets
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Hours</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.totalHours}</div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Billable Hours</div>
              <div className="text-3xl font-bold text-green-600">{stats.billableHours}</div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Value</div>
              <div className="text-3xl font-bold text-blue-600">${(stats.totalValue / 1000).toFixed(1)}k</div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Utilization Rate</div>
              <div className="text-3xl font-bold text-purple-600">{utilizationRate}%</div>
            </div>
          </div>

          {/* Filters */}
          <div className="card p-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 dark:border-dark-border-default rounded-lg bg-white dark:bg-dark-bg-primary text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Timesheets</option>
              <option value="draft">Draft</option>
              <option value="submitted">Pending Approval</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Timesheets Table */}
          <div className="card p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-border-default">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Consultant
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Week
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Client
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Engagement
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Hours
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Billable
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Value
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTimesheets.map((timesheet) => (
                    <tr
                      key={timesheet.id}
                      className="border-b border-gray-100 dark:border-dark-border-default hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary"
                    >
                      <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                        {timesheet.consultant}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {timesheet.week}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                        {timesheet.client}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {timesheet.engagement}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                        {timesheet.hoursLogged}h
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold text-green-600">
                        {timesheet.billableHours}h
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                        ${timesheet.totalValue.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${statusConfig[timesheet.status].color}`}>
                          {statusConfig[timesheet.status].label}
                        </span>
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
