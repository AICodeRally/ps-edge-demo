/**
 * App Detail Page
 * Shows app details and its agents
 */

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  UpdateIcon,
  TrashIcon,
  PersonIcon,
  ExternalLinkIcon,
} from '@radix-ui/react-icons';
import type { AppRegistry } from '@/lib/acc';

interface AppWithAgents extends AppRegistry {
  agents?: Array<{ id: string; slug: string; name: string; status: string; agentType: string }>;
}

export default function AppDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [app, setApp] = useState<AppWithAgents | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadApp();
  }, [slug]);

  async function loadApp() {
    setLoading(true);
    try {
      const response = await fetch(`/api/aicc/acc/apps/${slug}`);
      const data = await response.json();
      if (data.success) {
        setApp(data.data);
      }
    } catch (error) {
      console.error('Failed to load app:', error);
    } finally {
      setLoading(false);
    }
  }

  async function syncApp() {
    setSyncing(true);
    try {
      await fetch(`/api/aicc/acc/apps/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sync', direction: 'pull' }),
      });
      await loadApp();
    } finally {
      setSyncing(false);
    }
  }

  async function deleteApp() {
    if (!confirm('Are you sure you want to delete this app? This will also delete all associated agents.')) {
      return;
    }
    setDeleting(true);
    try {
      await fetch(`/api/aicc/acc/apps/${slug}`, { method: 'DELETE' });
      router.push('/aicc/acc/apps');
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">App not found</p>
          <Link
            href="/aicc/acc/apps"
            className="inline-flex items-center gap-2 text-purple-600 hover:underline"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Apps
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/aicc/acc/apps"
              className="p-2 hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary rounded"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {app.name}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {app.slug} | {app.tier} | {app.status}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={syncApp}
              disabled={syncing}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              <UpdateIcon className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
              {syncing ? 'Syncing...' : 'Sync'}
            </button>
            <button
              onClick={deleteApp}
              disabled={deleting}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
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
          {/* App Info */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              App Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">Description</label>
                <p className="text-gray-900 dark:text-gray-100 mt-1">
                  {app.description || 'No description'}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">Repository Path</label>
                <p className="text-gray-900 dark:text-gray-100 mt-1 font-mono text-sm">
                  {app.repoPath || 'Not configured'}
                </p>
              </div>
              {app.repoUrl && (
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">Repository URL</label>
                  <a
                    href={app.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-purple-600 hover:underline mt-1"
                  >
                    {app.repoUrl}
                    <ExternalLinkIcon className="w-3 h-3" />
                  </a>
                </div>
              )}
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">Port / Hostname</label>
                <p className="text-gray-900 dark:text-gray-100 mt-1">
                  {app.port || 'N/A'} / {app.hostname || 'N/A'}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">Last Sync</label>
                <p className="text-gray-900 dark:text-gray-100 mt-1">
                  {app.lastSyncAt
                    ? new Date(app.lastSyncAt).toLocaleString()
                    : 'Never'}{' '}
                  <span className={`text-sm ${
                    app.lastSyncStatus === 'success' ? 'text-green-500' :
                    app.lastSyncStatus === 'failed' ? 'text-red-500' :
                    'text-gray-500'
                  }`}>
                    ({app.lastSyncStatus || 'never'})
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Agents */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Agents ({app.agents?.length ?? 0})
              </h2>
              <Link
                href={`/aicc/acc/agents/new?appSlug=${app.slug}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 dark:bg-dark-bg-tertiary text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-dark-bg-quaternary"
              >
                Add Agent
              </Link>
            </div>
            {app.agents && app.agents.length > 0 ? (
              <div className="space-y-3">
                {app.agents.map((agent) => (
                  <Link
                    key={agent.id}
                    href={`/aicc/acc/agents/${agent.slug}?appRegistryId=${app.id}`}
                    className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-dark-border-default hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/10 border-2 border-purple-200 dark:border-purple-800 flex items-center justify-center">
                      <PersonIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {agent.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {agent.slug} | {agent.agentType}
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      agent.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                      agent.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                    }`}>
                      {agent.status}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <PersonIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No agents found</p>
                <p className="text-sm mt-1">
                  {app.repoPath ? 'Click "Sync" to import agents from .claude/agents/' : 'Configure repo path to enable sync'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
