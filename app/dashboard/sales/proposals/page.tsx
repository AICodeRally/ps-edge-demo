/**
 * Sales - Proposals List Page
 * DataTable view of all sales proposals
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable } from '@/src/components/tables/DataTable';
import { MOCK_PROPOSALS } from '@/src/data/ps-edge/proposals.data';
import { MOCK_CLIENTS } from '@/src/data/ps-edge/clients.data';
import type { Proposal, ProposalStatus } from '@/src/types/ps-edge/services.types';
import { getProposalStatusColor, ENGAGEMENT_TYPE_LABELS } from '@/src/types/ps-edge/services.types';

export default function ProposalsPage() {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState<ProposalStatus | 'ALL'>('ALL');

  const filteredProposals =
    filterStatus === 'ALL'
      ? MOCK_PROPOSALS
      : MOCK_PROPOSALS.filter((p) => p.status === filterStatus);

  // Create client lookup map
  const clientMap = new Map(MOCK_CLIENTS.map((c) => [c.id, c.name]));

  const columns = [
    {
      key: 'proposalNumber',
      header: 'Proposal #',
      sortable: true,
      filterable: true,
      width: '12%',
      render: (row: Proposal) => (
        <span className="font-mono text-sm">{row.proposalNumber}</span>
      ),
    },
    {
      key: 'title',
      header: 'Title',
      sortable: true,
      filterable: true,
      width: '30%',
      render: (row: Proposal) => (
        <div className="max-w-md">
          <div className="font-medium text-gray-900 dark:text-gray-100 truncate">
            {row.title}
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
      render: (row: Proposal) => (
        <span className="text-sm">
          {ENGAGEMENT_TYPE_LABELS[row.engagementType]}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (row: Proposal) => (
        <span
          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getProposalStatusColor(
            row.status
          )}`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: 'proposedValue',
      header: 'Value',
      sortable: true,
      render: (row: Proposal) => (
        <span className="font-medium">
          ${row.proposedValue.toLocaleString()}
        </span>
      ),
    },
    {
      key: 'submittedDate',
      header: 'Submitted',
      sortable: true,
      render: (row: Proposal) =>
        row.submittedDate
          ? new Date(row.submittedDate).toLocaleDateString()
          : <span className="text-gray-400 dark:text-gray-600 text-xs">Not submitted</span>,
    },
    {
      key: 'proposedStartDate',
      header: 'Start Date',
      sortable: true,
      render: (row: Proposal) =>
        new Date(row.proposedStartDate).toLocaleDateString(),
    },
  ];

  // Calculate stats
  const stats = {
    total: MOCK_PROPOSALS.length,
    draft: MOCK_PROPOSALS.filter((p) => p.status === 'DRAFT').length,
    submitted: MOCK_PROPOSALS.filter((p) => p.status === 'SUBMITTED').length,
    negotiating: MOCK_PROPOSALS.filter((p) => p.status === 'NEGOTIATING').length,
    won: MOCK_PROPOSALS.filter((p) => p.status === 'WON').length,
    lost: MOCK_PROPOSALS.filter((p) => p.status === 'LOST').length,
    totalValue: MOCK_PROPOSALS.reduce((sum, p) => sum + p.proposedValue, 0),
    pipelineValue: MOCK_PROPOSALS.filter(
      (p) => p.status === 'SUBMITTED' || p.status === 'NEGOTIATING'
    ).reduce((sum, p) => sum + p.proposedValue, 0),
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Proposals
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {filteredProposals.length} proposals
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
                  setFilterStatus(e.target.value as ProposalStatus | 'ALL')
                }
                className="px-3 py-1.5 text-sm border border-gray-300 dark:border-dark-border-default rounded bg-white dark:bg-dark-bg-tertiary text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              >
                <option value="ALL">All</option>
                <option value="DRAFT">Draft</option>
                <option value="SUBMITTED">Submitted</option>
                <option value="NEGOTIATING">Negotiating</option>
                <option value="WON">Won</option>
                <option value="LOST">Lost</option>
              </select>
            </div>

            <button className="btn-primary text-sm">+ New Proposal</button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-3">
          <div className="bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg p-3">
            <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Pipeline Value
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">
              ${(stats.pipelineValue / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {stats.submitted + stats.negotiating} active
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
            <div className="text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wide">
              Submitted
            </div>
            <div className="text-lg font-bold text-blue-900 dark:text-blue-100 mt-1">
              {stats.submitted}
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
            <div className="text-xs text-yellow-600 dark:text-yellow-400 uppercase tracking-wide">
              Negotiating
            </div>
            <div className="text-lg font-bold text-yellow-900 dark:text-yellow-100 mt-1">
              {stats.negotiating}
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
            <div className="text-xs text-green-600 dark:text-green-400 uppercase tracking-wide">
              Won
            </div>
            <div className="text-lg font-bold text-green-900 dark:text-green-100 mt-1">
              {stats.won}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              ${(MOCK_PROPOSALS.filter(p => p.status === 'WON').reduce((sum, p) => sum + p.proposedValue, 0) / 1000).toFixed(0)}K
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg p-3">
            <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Draft
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">
              {stats.draft}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto p-6">
        <DataTable
          data={filteredProposals}
          columns={columns}
          keyExtractor={(row) => row.id}
          onRowClick={(row) =>
            router.push(`/dashboard/sales/proposal/${row.id}`)
          }
          pagination={{ pageSize: 15 }}
        />
      </div>
    </div>
  );
}
