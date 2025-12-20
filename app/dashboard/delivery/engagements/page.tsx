/**
 * Delivery - Engagements List Page
 * DataTable view of all consulting engagements
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable } from '@/src/components/tables/DataTable';
import { MOCK_ENGAGEMENTS } from '@/src/data/ps-edge/engagements.data';
import { MOCK_CLIENTS } from '@/src/data/ps-edge/clients.data';
import type { Engagement, EngagementStatus } from '@/src/types/ps-edge/services.types';
import {
  getEngagementStatusColor,
  ENGAGEMENT_TYPE_LABELS,
} from '@/src/types/ps-edge/services.types';

export default function EngagementsPage() {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState<EngagementStatus | 'ALL'>('ALL');

  const filteredEngagements =
    filterStatus === 'ALL'
      ? MOCK_ENGAGEMENTS
      : MOCK_ENGAGEMENTS.filter((e) => e.status === filterStatus);

  // Create client lookup map
  const clientMap = new Map(MOCK_CLIENTS.map((c) => [c.id, c.name]));

  const columns = [
    {
      key: 'engagementName',
      header: 'Engagement',
      sortable: true,
      filterable: true,
      width: '30%',
      render: (row: Engagement) => (
        <div className="max-w-md">
          <div className="font-medium text-gray-900 dark:text-gray-100 truncate">
            {row.engagementName}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {clientMap.get(row.clientId) || 'Unknown Client'}
          </div>
        </div>
      ),
    },
    {
      key: 'engagementType',
      header: 'Type',
      sortable: true,
      render: (row: Engagement) => (
        <span className="text-sm">
          {ENGAGEMENT_TYPE_LABELS[row.engagementType]}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (row: Engagement) => (
        <span
          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getEngagementStatusColor(
            row.status
          )}`}
        >
          {row.status.replace('_', ' ')}
        </span>
      ),
    },
    {
      key: 'contractValue',
      header: 'Value',
      sortable: true,
      render: (row: Engagement) => (
        <span className="font-medium">
          ${row.contractValue.toLocaleString()}
        </span>
      ),
    },
    {
      key: 'progress',
      header: 'Progress',
      render: (row: Engagement) => {
        const progress = row.estimatedHours
          ? Math.min(100, ((row.actualHours || 0) / row.estimatedHours) * 100)
          : 0;
        return (
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-[100px]">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 w-12 text-right">
              {progress.toFixed(0)}%
            </span>
          </div>
        );
      },
    },
    {
      key: 'startDate',
      header: 'Start Date',
      sortable: true,
      render: (row: Engagement) =>
        new Date(row.startDate).toLocaleDateString(),
    },
    {
      key: 'endDate',
      header: 'End Date',
      sortable: true,
      render: (row: Engagement) =>
        row.endDate ? (
          new Date(row.endDate).toLocaleDateString()
        ) : (
          <span className="text-gray-400 dark:text-gray-600 text-xs">TBD</span>
        ),
    },
  ];

  // Calculate stats
  const stats = {
    total: MOCK_ENGAGEMENTS.length,
    planning: MOCK_ENGAGEMENTS.filter((e) => e.status === 'PLANNING').length,
    inProgress: MOCK_ENGAGEMENTS.filter((e) => e.status === 'IN_PROGRESS').length,
    onHold: MOCK_ENGAGEMENTS.filter((e) => e.status === 'ON_HOLD').length,
    completed: MOCK_ENGAGEMENTS.filter((e) => e.status === 'COMPLETED').length,
    totalValue: MOCK_ENGAGEMENTS.reduce((sum, e) => sum + e.contractValue, 0),
    activeValue: MOCK_ENGAGEMENTS.filter(
      (e) => e.status === 'IN_PROGRESS' || e.status === 'PLANNING'
    ).reduce((sum, e) => sum + e.contractValue, 0),
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Engagements
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {filteredEngagements.length} engagements
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Status:
              </label>
              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value as EngagementStatus | 'ALL')
                }
                className="px-3 py-1.5 text-sm border border-gray-300 dark:border-dark-border-default rounded bg-white dark:bg-dark-bg-tertiary text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              >
                <option value="ALL">All</option>
                <option value="PLANNING">Planning</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="ON_HOLD">On Hold</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            <button className="btn-primary text-sm">+ New Engagement</button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-3">
          <div className="bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg p-3">
            <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Active Value
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">
              ${(stats.activeValue / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {stats.planning + stats.inProgress} active
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
            <div className="text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wide">
              Planning
            </div>
            <div className="text-lg font-bold text-blue-900 dark:text-blue-100 mt-1">
              {stats.planning}
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
            <div className="text-xs text-green-600 dark:text-green-400 uppercase tracking-wide">
              In Progress
            </div>
            <div className="text-lg font-bold text-green-900 dark:text-green-100 mt-1">
              {stats.inProgress}
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
            <div className="text-xs text-yellow-600 dark:text-yellow-400 uppercase tracking-wide">
              On Hold
            </div>
            <div className="text-lg font-bold text-yellow-900 dark:text-yellow-100 mt-1">
              {stats.onHold}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg p-3">
            <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Completed
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">
              {stats.completed}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto p-6">
        <DataTable
          data={filteredEngagements}
          columns={columns}
          keyExtractor={(row) => row.id}
          onRowClick={(row) =>
            router.push(`/dashboard/delivery/engagement/${row.id}`)
          }
          pagination={{ pageSize: 15 }}
        />
      </div>
    </div>
  );
}
