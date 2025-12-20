/**
 * Sales - Client List Page
 * DataTable view of all PPG clients
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable } from '@/src/components/tables/DataTable';
import { MOCK_CLIENTS } from '@/src/data/ps-edge/clients.data';
import type { Client, ClientStatus } from '@/src/types/ps-edge/services.types';

function getClientStatusColor(status: ClientStatus): string {
  switch (status) {
    case 'ACTIVE':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    case 'PROSPECT':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    case 'INACTIVE':
      return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    case 'CHURNED':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
  }
}

export default function ClientsPage() {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState<ClientStatus | 'ALL'>('ALL');

  const filteredClients =
    filterStatus === 'ALL'
      ? MOCK_CLIENTS
      : MOCK_CLIENTS.filter((c) => c.status === filterStatus);

  const columns = [
    {
      key: 'name',
      header: 'Client Name',
      sortable: true,
      filterable: true,
      width: '25%',
    },
    {
      key: 'clientType',
      header: 'Type',
      sortable: true,
      render: (row: Client) => (
        <span className="text-sm capitalize">
          {row.clientType.toLowerCase().replace('_', ' ')}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (row: Client) => (
        <span
          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getClientStatusColor(
            row.status
          )}`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: 'focusAreas',
      header: 'Focus Areas',
      render: (row: Client) => (
        <div className="flex flex-wrap gap-1">
          {row.focusAreas.slice(0, 2).map((area) => (
            <span
              key={area}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              {area}
            </span>
          ))}
          {row.focusAreas.length > 2 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              +{row.focusAreas.length - 2}
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'annualRevenue',
      header: 'Annual Revenue',
      sortable: true,
      render: (row: Client) =>
        row.annualRevenue
          ? `$${(row.annualRevenue / 1000000).toFixed(1)}M`
          : 'N/A',
    },
    {
      key: 'isNPEdgeClient',
      header: 'NP-Edge',
      render: (row: Client) =>
        row.isNPEdgeClient ? (
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">
            Active
          </span>
        ) : (
          <span className="text-gray-400 dark:text-gray-600 text-xs">—</span>
        ),
    },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Clients
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {filteredClients.length} total clients
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
                  setFilterStatus(e.target.value as ClientStatus | 'ALL')
                }
                className="px-3 py-1.5 text-sm border border-gray-300 dark:border-dark-border-default rounded bg-white dark:bg-dark-bg-tertiary text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              >
                <option value="ALL">All</option>
                <option value="ACTIVE">Active</option>
                <option value="PROSPECT">Prospect</option>
                <option value="INACTIVE">Inactive</option>
                <option value="CHURNED">Churned</option>
              </select>
            </div>

            <button className="btn-primary text-sm">+ Add Client</button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto p-6">
        <DataTable
          data={filteredClients}
          columns={columns}
          keyExtractor={(row) => row.id}
          onRowClick={(row) => router.push(`/dashboard/sales/client/${row.id}`)}
          pagination={{ pageSize: 15 }}
        />
      </div>
    </div>
  );
}
