/**
 * App Registry List
 * Lists all registered applications with their agent counts
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  PlusIcon,
  UpdateIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  ClockIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';
import type { AppRegistry } from '@/lib/acc';

interface AppWithAgents extends AppRegistry {
  agents?: Array<{ id: string; slug: string; name: string; status: string }>;
}

export default function AppsListPage() {
  const [apps, setApps] = useState<AppWithAgents[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState<string | null>(null);
  const [filter, setFilter] = useState({ tier: '', status: '', search: '' });

  useEffect(() => {
    loadApps();
  }, [filter]);

  async function loadApps() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter.tier) params.set('tier', filter.tier);
      if (filter.status) params.set('status', filter.status);
      if (filter.search) params.set('search', filter.search);

      const response = await fetch(`/api/aicc/acc/apps?${params}`);
      const data = await response.json();
      if (data.success) {
        setApps(data.data);
      }
    } catch (error) {
      console.error('Failed to load apps:', error);
    } finally {
      setLoading(false);
    }
  }

  async function syncApp(slug: string) {
    setSyncing(slug);
    try {
      await fetch(`/api/aicc/acc/apps/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sync', direction: 'pull' }),
      });
      await loadApps();
    } finally {
      setSyncing(null);
    }
  }

  function getSyncStatusIcon(status: string | null | undefined) {
    switch (status) {
      case 'success':
        return <CheckCircledIcon className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <CrossCircledIcon className="w-4 h-4 text-red-500" />;
      case 'pending':
        return <ClockIcon className="w-4 h-4 text-yellow-500" />;
      default:
        return <DotsHorizontalIcon className="w-4 h-4 text-gray-400" />;
    }
  }

  function getTierBadge(tier: string) {
    const colors: Record<string, string> = {
      core: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      demo: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      external: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
    };
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[tier] ?? colors.external}`}>
        {tier}
      </span>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Registered Apps
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Applications with agent infrastructure
            </p>
          </div>
          <Link
            href="/aicc/acc/apps/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            Register App
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-3 bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-dark-border-default">
        <div className="flex gap-4 items-center">
          <select
            value={filter.tier}
            onChange={(e) => setFilter({ ...filter, tier: e.target.value })}
            className="px-3 py-1.5 rounded border border-gray-300 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary text-sm"
          >
            <option value="">All Tiers</option>
            <option value="core">Core</option>
            <option value="demo">Demo</option>
            <option value="external">External</option>
          </select>
          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="px-3 py-1.5 rounded border border-gray-300 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary text-sm"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="archived">Archived</option>
          </select>
          <input
            type="text"
            placeholder="Search apps..."
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            className="px-3 py-1.5 rounded border border-gray-300 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary text-sm flex-1 max-w-xs"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          ) : apps.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                No apps registered yet
              </p>
              <Link
                href="/aicc/acc/apps/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <PlusIcon className="w-4 h-4" />
                Register Your First App
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {apps.map((app) => (
                <div
                  key={app.id}
                  className="card p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Link
                          href={`/aicc/acc/apps/${app.slug}`}
                          className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-purple-600"
                        >
                          {app.name}
                        </Link>
                        {getTierBadge(app.tier)}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {app.description || 'No description'}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                        {app.port && (
                          <span>Port: {app.port}</span>
                        )}
                        <span>Agents: {app.agents?.length ?? 0}</span>
                        <span className="flex items-center gap-1">
                          {getSyncStatusIcon(app.lastSyncStatus)}
                          Last sync:{' '}
                          {app.lastSyncAt
                            ? new Date(app.lastSyncAt).toLocaleString()
                            : 'Never'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => syncApp(app.slug)}
                        disabled={syncing === app.slug}
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 dark:bg-dark-bg-tertiary text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-dark-bg-quaternary disabled:opacity-50"
                      >
                        <UpdateIcon className={`w-4 h-4 ${syncing === app.slug ? 'animate-spin' : ''}`} />
                        Sync
                      </button>
                      <Link
                        href={`/aicc/acc/apps/${app.slug}`}
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 dark:bg-dark-bg-tertiary text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-dark-bg-quaternary"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
