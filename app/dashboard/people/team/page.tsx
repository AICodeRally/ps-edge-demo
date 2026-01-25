/**
 * PEOPLE - Team/Consultants Page
 * DataTable view of all PPG consultants
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable } from '@/components/tables/DataTable';
import { MOCK_CONSULTANTS } from '@/data/ps-edge/consultants.data';
import type { Consultant, ConsultantRole } from '@/types/ps-edge/services.types';

function getUtilizationColor(utilization: number): string {
  if (utilization >= 90) return 'text-red-600 dark:text-red-400';
  if (utilization >= 75) return 'text-green-600 dark:text-green-400';
  if (utilization >= 50) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-gray-600 dark:text-gray-400';
}

export default function TeamPage() {
  const router = useRouter();
  const [filterDepartment, setFilterDepartment] = useState<string>('ALL');

  const filteredConsultants =
    filterDepartment === 'ALL'
      ? MOCK_CONSULTANTS
      : MOCK_CONSULTANTS.filter((c) => c.department === filterDepartment);

  const departments = Array.from(
    new Set(MOCK_CONSULTANTS.map((c) => c.department))
  ).sort();

  const columns = [
    {
      key: 'title',
      header: 'Name & Title',
      sortable: true,
      filterable: true,
      width: '25%',
      render: (row: Consultant) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-gray-100">
            {row.personId.replace('person-', 'Consultant ')}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {row.title}
          </div>
        </div>
      ),
    },
    {
      key: 'department',
      header: 'Department',
      sortable: true,
      render: (row: Consultant) => (
        <span className="text-sm">{row.department}</span>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (row: Consultant) => (
        <span className="text-sm capitalize">
          {row.role.toLowerCase().replace(/_/g, ' ')}
        </span>
      ),
    },
    {
      key: 'specializations',
      header: 'Specializations',
      render: (row: Consultant) => (
        <div className="flex flex-wrap gap-1">
          {row.specializations.slice(0, 2).map((spec) => (
            <span
              key={spec}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
            >
              {spec}
            </span>
          ))}
          {row.specializations.length > 2 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              +{row.specializations.length - 2}
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'currentUtilization',
      header: 'Utilization',
      sortable: true,
      render: (row: Consultant) => (
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-[80px]">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${row.currentUtilization}%` }}
            />
          </div>
          <span
            className={`text-sm font-medium w-12 text-right ${getUtilizationColor(
              row.currentUtilization
            )}`}
          >
            {row.currentUtilization}%
          </span>
        </div>
      ),
    },
    {
      key: 'weeklyCapacityHours',
      header: 'Capacity',
      sortable: true,
      render: (row: Consultant) => (
        <span className="text-sm">{row.weeklyCapacityHours}h/wk</span>
      ),
    },
    {
      key: 'defaultBillingRate',
      header: 'Rate',
      sortable: true,
      render: (row: Consultant) => (
        <span className="text-sm font-medium">
          ${row.defaultBillingRate}/hr
        </span>
      ),
    },
  ];

  // Calculate stats
  const stats = {
    total: MOCK_CONSULTANTS.length,
    avgUtilization:
      MOCK_CONSULTANTS.reduce((sum, c) => sum + c.currentUtilization, 0) /
      MOCK_CONSULTANTS.length,
    overCapacity: MOCK_CONSULTANTS.filter((c) => c.currentUtilization >= 90)
      .length,
    underUtilized: MOCK_CONSULTANTS.filter((c) => c.currentUtilization < 50)
      .length,
    totalCapacity: MOCK_CONSULTANTS.reduce(
      (sum, c) => sum + c.weeklyCapacityHours,
      0
    ),
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Team Members
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {filteredConsultants.length} consultants
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Department:
              </label>
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="px-3 py-1.5 text-sm border border-gray-300 dark:border-dark-border-default rounded bg-white dark:bg-dark-bg-tertiary text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              >
                <option value="ALL">All</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn-primary text-sm">+ Add Team Member</button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-3">
          <div className="bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg p-3">
            <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Total Consultants
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">
              {stats.total}
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
            <div className="text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wide">
              Avg Utilization
            </div>
            <div className="text-lg font-bold text-blue-900 dark:text-blue-100 mt-1">
              {stats.avgUtilization.toFixed(0)}%
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
            <div className="text-xs text-green-600 dark:text-green-400 uppercase tracking-wide">
              Weekly Capacity
            </div>
            <div className="text-lg font-bold text-green-900 dark:text-green-100 mt-1">
              {stats.totalCapacity}h
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
            <div className="text-xs text-red-600 dark:text-red-400 uppercase tracking-wide">
              Over Capacity
            </div>
            <div className="text-lg font-bold text-red-900 dark:text-red-100 mt-1">
              {stats.overCapacity}
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
            <div className="text-xs text-yellow-600 dark:text-yellow-400 uppercase tracking-wide">
              Under-Utilized
            </div>
            <div className="text-lg font-bold text-yellow-900 dark:text-yellow-100 mt-1">
              {stats.underUtilized}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto p-6">
        <DataTable
          data={filteredConsultants}
          columns={columns}
          keyExtractor={(row) => row.id}
          onRowClick={(row) =>
            router.push(`/dashboard/people/consultant/${row.id}`)
          }
          pagination={{ pageSize: 15 }}
        />
      </div>
    </div>
  );
}
