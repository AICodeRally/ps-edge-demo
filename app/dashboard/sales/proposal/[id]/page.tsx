/**
 * Sales - Proposal Detail Page
 * Detailed view of a single proposal
 */

'use client';

import { useParams, useRouter } from 'next/navigation';
import { MOCK_PROPOSALS } from '@/src/data/ps-edge/proposals.data';
import { MOCK_CLIENTS } from '@/src/data/ps-edge/clients.data';
import {
  getProposalStatusColor,
  ENGAGEMENT_TYPE_LABELS,
} from '@/src/types/ps-edge/services.types';
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  FileTextIcon,
  CheckCircledIcon,
  CrossCircledIcon,
} from '@radix-ui/react-icons';

export default function ProposalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const proposalId = params.id as string;

  const proposal = MOCK_PROPOSALS.find((p) => p.id === proposalId);
  const client = proposal
    ? MOCK_CLIENTS.find((c) => c.id === proposal.clientId)
    : null;

  if (!proposal || !client) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Proposal Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The proposal you are looking for does not exist.
          </p>
          <button
            onClick={() => router.push('/dashboard/sales/proposals')}
            className="btn-primary"
          >
            Back to Proposals
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <button
              onClick={() => router.push('/dashboard/sales/proposals')}
              className="mt-1 p-2 hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary rounded transition-colors"
              title="Back to Proposals"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {proposal.proposalNumber}
                </h1>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getProposalStatusColor(
                    proposal.status
                  )}`}
                >
                  {proposal.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {proposal.title}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="btn-secondary text-sm">Edit Proposal</button>
            {proposal.status === 'DRAFT' && (
              <button className="btn-primary text-sm">Submit Proposal</button>
            )}
            {(proposal.status === 'SUBMITTED' ||
              proposal.status === 'NEGOTIATING') && (
              <>
                <button className="btn-destructive text-sm">Mark Lost</button>
                <button className="btn-primary text-sm">Mark Won</button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-4 gap-4">
            <div className="card p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-400">💰</span>
                <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Proposed Value
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                ${proposal.proposedValue.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {proposal.billingType.replace('_', ' ')} •{' '}
                {proposal.estimatedHours}h
              </div>
            </div>

            <div className="card p-4">
              <div className="flex items-center gap-2 mb-2">
                <CalendarIcon className="w-5 h-5 text-gray-400" />
                <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Start Date
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {new Date(proposal.proposedStartDate).toLocaleDateString(
                  'en-US',
                  { month: 'short', day: 'numeric' }
                )}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {proposal.proposedDuration} weeks
              </div>
            </div>

            <div className="card p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileTextIcon className="w-5 h-5 text-gray-400" />
                <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Engagement Type
                </div>
              </div>
              <div className="text-sm font-bold text-gray-900 dark:text-gray-100 mt-2">
                {ENGAGEMENT_TYPE_LABELS[proposal.engagementType]}
              </div>
            </div>

            <div className="card p-4">
              <div className="flex items-center gap-2 mb-2">
                <ClockIcon className="w-5 h-5 text-gray-400" />
                <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  {proposal.submittedDate ? 'Submitted' : 'Created'}
                </div>
              </div>
              <div className="text-sm font-bold text-gray-900 dark:text-gray-100 mt-2">
                {new Date(
                  proposal.submittedDate || proposal.createdAt
                ).toLocaleDateString()}
              </div>
              {proposal.decisionDate && (
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Decision:{' '}
                  {new Date(proposal.decisionDate).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>

          {/* Client Info */}
          <div className="card p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              Client Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
                  Client Name
                </div>
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {client.name}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
                  Client Type
                </div>
                <div className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                  {client.clientType.toLowerCase().replace('_', ' ')}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
                  Annual Revenue
                </div>
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {client.annualRevenue
                    ? `$${(client.annualRevenue / 1000000).toFixed(1)}M`
                    : 'N/A'}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
                  Focus Areas
                </div>
                <div className="flex flex-wrap gap-1">
                  {client.focusAreas.map((area) => (
                    <span
                      key={area}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scope of Work */}
          <div className="card p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              Scope of Work
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {proposal.scopeOfWork}
            </p>
          </div>

          {/* Assumptions & Exclusions */}
          <div className="grid grid-cols-2 gap-4">
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircledIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Assumptions
                </h2>
              </div>
              <ul className="space-y-2">
                {proposal.assumptions.map((assumption, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-gray-700 dark:text-gray-300 flex gap-2"
                  >
                    <span className="text-green-600 dark:text-green-400">
                      •
                    </span>
                    <span>{assumption}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <CrossCircledIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Exclusions
                </h2>
              </div>
              <ul className="space-y-2">
                {proposal.exclusions.map((exclusion, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-gray-700 dark:text-gray-300 flex gap-2"
                  >
                    <span className="text-red-600 dark:text-red-400">•</span>
                    <span>{exclusion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lost Reason (if applicable) */}
          {proposal.status === 'LOST' && proposal.lostReason && (
            <div className="card p-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <h2 className="text-lg font-bold text-red-900 dark:text-red-100 mb-2">
                Lost Reason
              </h2>
              <p className="text-sm text-red-700 dark:text-red-300">
                {proposal.lostReason}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
