/**
 * Sync Status Page
 * Monitor and trigger file synchronization
 */

'use client';

import { useEffect, useState } from 'react';
import {
  UpdateIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  ClockIcon,
} from '@radix-ui/react-icons';
import type { SyncResult } from '@/src/lib/acc';

interface SyncStatus {
  lastGlobalSync: string | null;
  apps: Array<{
    id: string;
    slug: string;
    name: string;
    lastSyncAt: string | null;
    lastSyncStatus: string | null;
    agentCount: number;
  }>;
}

export default function SyncPage() {
  const [status, setStatus] = useState<SyncStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncResults, setSyncResults] = useState<SyncResult[] | null>(null);

  useEffect(() => {
    loadStatus();
  }, []);

  async function loadStatus() {
    setLoading(true);
    try {
      const response = await fetch('/api/aicc/acc/sync');
      const data = await response.json();
      if (data.success) {
        setStatus(data.data);
      }
    } catch (error) {
      console.error('Failed to load sync status:', error);
    } finally {
      setLoading(false);
    }
  }

  async function syncAll() {
    setSyncing(true);
    setSyncResults(null);
    try {
      const response = await fetch('/api/aicc/acc/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direction: 'pull' }),
      });
      const data = await response.json();
      if (data.data?.results) {
        setSyncResults(data.data.results);
      }
      await loadStatus();
    } finally {
      setSyncing(false);
    }
  }

  async function syncApp(appId: string, slug: string) {
    try {
      const response = await fetch(`/api/aicc/acc/apps/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sync', direction: 'pull' }),
      });
      const data = await response.json();
      if (data.data) {
        setSyncResults([data.data]);
      }
      await loadStatus();
    } catch (error) {
      console.error('Failed to sync app:', error);
    }
  }

  function getSyncIcon(syncStatus: string | null) {
    switch (syncStatus) {
      case 'success':
        return <CheckCircledIcon className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <CrossCircledIcon className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-400" />;
    }
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Sync Status
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              File synchronization between repositories and database
            </p>
          </div>
          <button
            onClick={syncAll}
            disabled={syncing}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            <UpdateIcon className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing All...' : 'Sync All Apps'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Last Sync Results */}
          {syncResults && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Sync Results
              </h2>
              <div className="space-y-4">
                {syncResults.map((result) => (
                  <div
                    key={result.appId}
                    className={`p-4 rounded-lg border ${
                      result.status === 'success'
                        ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
                        : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {result.appSlug}
                      </span>
                      <span className={`text-sm ${
                        result.status === 'success' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {result.status} ({result.duration}ms)
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Processed: {result.agentsProcessed} |
                      Created: {result.agentsCreated} |
                      Updated: {result.agentsUpdated}
                    </div>
                    {result.errors.length > 0 && (
                      <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                        Errors: {result.errors.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* App Sync Status */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              App Sync Status
            </h2>
            {status?.apps.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No apps registered yet
              </div>
            ) : (
              <div className="space-y-3">
                {status?.apps.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-dark-border-default"
                  >
                    <div className="flex items-center gap-4">
                      {getSyncIcon(app.lastSyncStatus)}
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {app.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {app.slug} | {app.agentCount} agents
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400 text-right">
                        {app.lastSyncAt
                          ? new Date(app.lastSyncAt).toLocaleString()
                          : 'Never synced'}
                      </div>
                      <button
                        onClick={() => syncApp(app.id, app.slug)}
                        className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-dark-bg-tertiary text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-dark-bg-quaternary"
                      >
                        Sync
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sync Info */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              How Sync Works
            </h2>
            <div className="prose dark:prose-invert max-w-none text-sm">
              <p className="text-gray-600 dark:text-gray-400">
                The sync process reads agent definitions from <code>.claude/agents/*.md</code> files
                in each registered app's repository and imports them into the database.
              </p>
              <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mt-4 mb-2">
                Pull (File → Database)
              </h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                <li>Reads all .md files from .claude/agents/</li>
                <li>Parses YAML frontmatter and markdown body</li>
                <li>Creates or updates agent definitions in database</li>
                <li>Uses file hash for change detection</li>
              </ul>
              <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mt-4 mb-2">
                Push (Database → File)
              </h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                <li>Generates YAML frontmatter from agent definition</li>
                <li>Writes to .claude/agents/&lt;slug&gt;.md</li>
                <li>Updates file hash in database</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
