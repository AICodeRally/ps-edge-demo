/**
 * PERFORMANCE - Sales Pipeline
 * Kanban-style board showing proposals by status
 */

'use client';

import { useRouter } from 'next/navigation';
import { MOCK_PROPOSALS } from '@/src/data/ps-edge/proposals.data';
import { MOCK_CLIENTS } from '@/src/data/ps-edge/clients.data';
import type { ProposalStatus } from '@/src/types/ps-edge/services.types';
import { getProposalStatusColor, ENGAGEMENT_TYPE_LABELS } from '@/src/types/ps-edge/services.types';
import { CalendarIcon, ClockIcon } from '@radix-ui/react-icons';

const PIPELINE_STATUSES: Array<{
  status: ProposalStatus;
  label: string;
  color: string;
}> = [
  { status: 'DRAFT', label: 'Draft', color: 'bg-gray-100 border-gray-300' },
  {
    status: 'SUBMITTED',
    label: 'Submitted',
    color: 'bg-blue-50 border-blue-300',
  },
  {
    status: 'NEGOTIATING',
    label: 'Negotiating',
    color: 'bg-yellow-50 border-yellow-300',
  },
  { status: 'WON', label: 'Won', color: 'bg-green-50 border-green-300' },
  { status: 'LOST', label: 'Lost', color: 'bg-red-50 border-red-300' },
];

export default function PipelinePage() {
  const router = useRouter();
  const clientMap = new Map(MOCK_CLIENTS.map((c) => [c.id, c.name]));

  const proposalsByStatus = PIPELINE_STATUSES.map((stage) => ({
    ...stage,
    proposals: MOCK_PROPOSALS.filter((p) => p.status === stage.status),
    totalValue: MOCK_PROPOSALS.filter((p) => p.status === stage.status).reduce(
      (sum, p) => sum + p.proposedValue,
      0
    ),
  }));

  const totalPipelineValue = MOCK_PROPOSALS.filter(
    (p) => p.status === 'SUBMITTED' || p.status === 'NEGOTIATING'
  ).reduce((sum, p) => sum + p.proposedValue, 0);

  const wonValue = MOCK_PROPOSALS.filter((p) => p.status === 'WON').reduce(
    (sum, p) => sum + p.proposedValue,
    0
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Sales Pipeline
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {MOCK_PROPOSALS.length} total proposals
            </p>
          </div>

          {/* Pipeline Stats */}
          <div className="flex gap-6">
            <div>
              <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Active Pipeline
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-0.5">
                ${(totalPipelineValue / 1000).toFixed(0)}K
              </div>
            </div>
            <div>
              <div className="text-xs text-green-600 dark:text-green-400 uppercase tracking-wide">
                Won This Year
              </div>
              <div className="text-2xl font-bold text-green-900 dark:text-green-100 mt-0.5">
                ${(wonValue / 1000).toFixed(0)}K
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-auto p-6">
        <div className="flex gap-4 h-full">
          {proposalsByStatus.map((stage) => (
            <div key={stage.status} className="flex-1 flex flex-col min-w-[280px]">
              {/* Column Header */}
              <div
                className={`${stage.color} dark:bg-dark-bg-secondary dark:border-dark-border-default border rounded-t-lg px-4 py-3`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100">
                      {stage.label}
                    </h3>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                      {stage.proposals.length} proposals
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900 dark:text-gray-100">
                      ${(stage.totalValue / 1000).toFixed(0)}K
                    </div>
                  </div>
                </div>
              </div>

              {/* Cards */}
              <div className="flex-1 bg-gray-50 dark:bg-dark-bg-tertiary border-l border-r border-b dark:border-dark-border-default rounded-b-lg p-3 space-y-3 overflow-auto">
                {stage.proposals.length === 0 ? (
                  <div className="text-center text-gray-400 dark:text-gray-600 text-sm py-8">
                    No proposals
                  </div>
                ) : (
                  stage.proposals.map((proposal) => (
                    <div
                      key={proposal.id}
                      onClick={() =>
                        router.push(`/dashboard/performance/proposal/${proposal.id}`)
                      }
                      className="card p-4 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      {/* Client Name */}
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {clientMap.get(proposal.clientId) || 'Unknown Client'}
                      </div>

                      {/* Proposal Title */}
                      <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                        {proposal.title}
                      </h4>

                      {/* Type Badge */}
                      <div className="mb-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                          {ENGAGEMENT_TYPE_LABELS[proposal.engagementType]}
                        </span>
                      </div>

                      {/* Value */}
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className="text-sm">💰</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                          ${proposal.proposedValue.toLocaleString()}
                        </span>
                      </div>

                      {/* Dates */}
                      <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3" />
                          <span>
                            Start:{' '}
                            {new Date(
                              proposal.proposedStartDate
                            ).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                        {proposal.submittedDate && (
                          <div className="flex items-center gap-1">
                            <ClockIcon className="w-3 h-3" />
                            <span>
                              {Math.floor(
                                (Date.now() -
                                  new Date(proposal.submittedDate).getTime()) /
                                  (1000 * 60 * 60 * 24)
                              )}
                              d ago
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Proposal Number */}
                      <div className="mt-2 pt-2 border-t border-gray-200 dark:border-dark-border-default">
                        <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                          {proposal.proposalNumber}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
