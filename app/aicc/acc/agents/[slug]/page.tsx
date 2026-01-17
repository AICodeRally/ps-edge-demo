/**
 * Agent Detail Page
 * Shows agent details and allows editing
 */

'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  CheckCircledIcon,
  TrashIcon,
  DownloadIcon,
} from '@radix-ui/react-icons';
import type { AgentContract } from '@/src/lib/acc';
import { PROVIDER_INFO } from '@/src/lib/acc/adapters';

interface AgentWithId extends AgentContract {
  id: string;
  appSlug?: string;
}

export default function AgentDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = params.slug as string;
  const appRegistryId = searchParams.get('appRegistryId') || undefined;

  const [agent, setAgent] = useState<AgentWithId | null>(null);
  const [loading, setLoading] = useState(true);
  const [pushing, setPushing] = useState(false);

  useEffect(() => {
    loadAgent();
  }, [slug, appRegistryId]);

  async function loadAgent() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (appRegistryId) params.set('appRegistryId', appRegistryId);

      const response = await fetch(`/api/aicc/acc/agents/${slug}?${params}`);
      const data = await response.json();
      if (data.success) {
        setAgent(data.data);
      }
    } catch (error) {
      console.error('Failed to load agent:', error);
    } finally {
      setLoading(false);
    }
  }

  async function approveAgent() {
    if (!agent) return;
    try {
      const response = await fetch(`/api/aicc/acc/agents/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve', approvedBy: 'user' }),
      });
      const data = await response.json();
      if (data.success) {
        setAgent(data.data);
      }
    } catch (error) {
      console.error('Failed to approve agent:', error);
    }
  }

  async function pushToFile() {
    if (!agent) return;
    setPushing(true);
    try {
      await fetch(`/api/aicc/acc/agents/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'push' }),
      });
    } finally {
      setPushing(false);
    }
  }

  async function deleteAgent() {
    if (!confirm('Are you sure you want to delete this agent?')) return;
    try {
      await fetch(`/api/aicc/acc/agents/${slug}`, { method: 'DELETE' });
      router.push('/aicc/acc/agents');
    } catch (error) {
      console.error('Failed to delete agent:', error);
    }
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Agent not found</p>
          <Link
            href="/aicc/acc/agents"
            className="inline-flex items-center gap-2 text-purple-600 hover:underline"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Agents
          </Link>
        </div>
      </div>
    );
  }

  const providerInfo = PROVIDER_INFO[agent.provider as keyof typeof PROVIDER_INFO];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/aicc/acc/agents"
              className="p-2 hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary rounded"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {agent.name}
                </h1>
                <span
                  className="px-2 py-0.5 rounded text-xs font-medium"
                  style={{
                    backgroundColor: `${providerInfo?.color ?? '#6b7280'}20`,
                    color: providerInfo?.color ?? '#6b7280',
                  }}
                >
                  {providerInfo?.icon} {providerInfo?.name ?? agent.provider}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {agent.slug} | {agent.agentType.replace('_', ' ')} | v{agent.version}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {agent.status === 'draft' && (
              <button
                onClick={approveAgent}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <CheckCircledIcon className="w-4 h-4" />
                Approve
              </button>
            )}
            <button
              onClick={pushToFile}
              disabled={pushing}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              <DownloadIcon className="w-4 h-4" />
              {pushing ? 'Pushing...' : 'Push to File'}
            </button>
            <button
              onClick={deleteAgent}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <TrashIcon className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Status & Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card p-4">
              <label className="text-sm text-gray-500 dark:text-gray-400">Status</label>
              <div className="mt-1">
                <span className={`px-2 py-0.5 rounded text-sm font-medium ${
                  agent.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                  agent.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                }`}>
                  {agent.status}
                </span>
              </div>
            </div>
            <div className="card p-4">
              <label className="text-sm text-gray-500 dark:text-gray-400">Scope</label>
              <div className="mt-1 text-gray-900 dark:text-gray-100 capitalize">
                {agent.scope}
              </div>
            </div>
            <div className="card p-4">
              <label className="text-sm text-gray-500 dark:text-gray-400">App</label>
              <div className="mt-1 text-gray-900 dark:text-gray-100">
                {agent.appSlug || 'Platform-wide'}
              </div>
            </div>
          </div>

          {/* Description */}
          {agent.description && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Description
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{agent.description}</p>
            </div>
          )}

          {/* Tools */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Tools ({agent.tools.length})
            </h2>
            <div className="flex flex-wrap gap-2">
              {agent.tools.map(tool => (
                <span
                  key={tool}
                  className="px-3 py-1 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* System Prompt */}
          {agent.systemPrompt && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                System Prompt
              </h2>
              <pre className="p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">
                {agent.systemPrompt}
              </pre>
            </div>
          )}

          {/* Configuration */}
          {agent.config && Object.keys(agent.config).length > 0 && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Configuration
              </h2>
              <pre className="p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg overflow-x-auto text-sm font-mono">
                {JSON.stringify(agent.config, null, 2)}
              </pre>
            </div>
          )}

          {/* Session Management */}
          {agent.sessionManagement && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Session Management
              </h2>
              <div className="space-y-4">
                {agent.sessionManagement.startProcedure && (
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">Start Procedure</label>
                    <pre className="mt-1 p-3 bg-gray-50 dark:bg-dark-bg-tertiary rounded text-sm">
                      {agent.sessionManagement.startProcedure}
                    </pre>
                  </div>
                )}
                {agent.sessionManagement.endProcedure && (
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">End Procedure</label>
                    <pre className="mt-1 p-3 bg-gray-50 dark:bg-dark-bg-tertiary rounded text-sm">
                      {agent.sessionManagement.endProcedure}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
