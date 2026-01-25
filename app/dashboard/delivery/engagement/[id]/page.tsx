/**
 * Delivery - Engagement Detail Page
 * Detailed view of a single engagement
 */

'use client';

import { useParams, useRouter } from 'next/navigation';
import { MOCK_ENGAGEMENTS } from '@/data/ps-edge/engagements.data';
import { MOCK_CLIENTS } from '@/data/ps-edge/clients.data';
import {
  getEngagementStatusColor,
  ENGAGEMENT_TYPE_LABELS,
} from '@/types/ps-edge/services.types';
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  FileTextIcon,
  PersonIcon,
  TargetIcon,
  DashboardIcon,
} from '@radix-ui/react-icons';

export default function EngagementDetailPage() {
  const params = useParams();
  const router = useRouter();
  const engagementId = params.id as string;

  const engagement = MOCK_ENGAGEMENTS.find((e) => e.id === engagementId);
  const client = engagement
    ? MOCK_CLIENTS.find((c) => c.id === engagement.clientId)
    : null;

  if (!engagement || !client) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Engagement Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The engagement you are looking for does not exist.
          </p>
          <button
            onClick={() => router.push('/dashboard/delivery/engagements')}
            className="btn-primary"
          >
            Back to Engagements
          </button>
        </div>
      </div>
    );
  }

  const progress = engagement.estimatedHours
    ? Math.min(100, ((engagement.actualHours || 0) / engagement.estimatedHours) * 100)
    : 0;

  const remainingHours = engagement.estimatedHours - (engagement.actualHours || 0);
  const daysElapsed = Math.floor(
    (Date.now() - new Date(engagement.startDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <button
              onClick={() => router.push('/dashboard/delivery/engagements')}
              className="mt-1 p-2 hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary rounded transition-colors"
              title="Back to Engagements"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {engagement.engagementName}
                </h1>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getEngagementStatusColor(
                    engagement.status
                  )}`}
                >
                  {engagement.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {client.name}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="btn-secondary text-sm">Edit Engagement</button>
            {engagement.status === 'IN_PROGRESS' && (
              <button className="btn-primary text-sm">Log Time</button>
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
                <DashboardIcon className="w-4 h-4 text-gray-400" />
                <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Contract Value
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                ${engagement.contractValue.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {engagement.billingType.replace('_', ' ')}
                {engagement.hourlyRate && ` • $${engagement.hourlyRate}/hr`}
              </div>
            </div>

            <div className="card p-4">
              <div className="flex items-center gap-2 mb-2">
                <ClockIcon className="w-5 h-5 text-gray-400" />
                <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Hours Progress
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {engagement.actualHours || 0} / {engagement.estimatedHours}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {remainingHours > 0 ? `${remainingHours}h remaining` : 'Over budget'}
              </div>
            </div>

            <div className="card p-4">
              <div className="flex items-center gap-2 mb-2">
                <CalendarIcon className="w-5 h-5 text-gray-400" />
                <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Timeline
                </div>
              </div>
              <div className="text-sm font-bold text-gray-900 dark:text-gray-100 mt-2">
                {new Date(engagement.startDate).toLocaleDateString()}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {engagement.endDate ? (
                  <>to {new Date(engagement.endDate).toLocaleDateString()}</>
                ) : (
                  'No end date'
                )}
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
                {ENGAGEMENT_TYPE_LABELS[engagement.engagementType]}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Overall Progress
              </h2>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {progress.toFixed(0)}%
              </span>
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
              <span>Started {daysElapsed} days ago</span>
              {engagement.endDate && (
                <span>
                  {Math.ceil(
                    (new Date(engagement.endDate).getTime() - Date.now()) /
                      (1000 * 60 * 60 * 24)
                  )}{' '}
                  days remaining
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="card p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              Description
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {engagement.description}
            </p>
          </div>

          {/* Objectives */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <TargetIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Objectives
              </h2>
            </div>
            <ul className="space-y-2">
              {engagement.objectives.map((objective, idx) => (
                <li
                  key={idx}
                  className="text-sm text-gray-700 dark:text-gray-300 flex gap-3"
                >
                  <span className="text-blue-600 dark:text-blue-400 font-bold">
                    {idx + 1}.
                  </span>
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Team & Client Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <PersonIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Team
                </h2>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Project Manager
                  </div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {engagement.projectManagerId}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Team Members ({engagement.teamMemberIds.length})
                  </div>
                  <div className="space-y-1">
                    {engagement.teamMemberIds.map((memberId) => (
                      <div
                        key={memberId}
                        className="text-sm text-gray-700 dark:text-gray-300"
                      >
                        {memberId}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                Client Information
              </h2>
              <div className="space-y-3">
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
          </div>

          {/* Contract Details */}
          <div className="card p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              Contract Details
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
                  Billing Type
                </div>
                <div className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                  {engagement.billingType.replace('_', ' ')}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
                  Estimated Hours
                </div>
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {engagement.estimatedHours}h
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
                  Effective Rate
                </div>
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  $
                  {(
                    engagement.contractValue / engagement.estimatedHours
                  ).toFixed(0)}
                  /hr
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
