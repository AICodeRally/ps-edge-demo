/**
 * Agent Control Center (ACC) Dashboard
 * Unified management for Claude Code agents, runtime AI agents, and custom agents
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  RocketIcon,
  PersonIcon,
  GearIcon,
  UpdateIcon,
  PlusIcon,
  ActivityLogIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  ClockIcon,
} from '@radix-ui/react-icons';
import type { ACCDashboardStats } from '@/src/lib/acc';

export default function ACCDashboard() {
  const [stats, setStats] = useState<ACCDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await fetch('/api/aicc/acc');
        const data = await response.json();
        if (data.success) {
          setStats(data.data);
        } else {
          setError(data.error || 'Failed to load stats');
        }
      } catch (err) {
        setError('Failed to connect to API');
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <CrossCircledIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-fuchsia-600 to-teal-500 bg-clip-text text-transparent">
              Agent Control Center
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Manage agent infrastructure across all registered apps
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/10 border-2 border-blue-200 dark:border-blue-800 flex items-center justify-center">
                  <RocketIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {stats?.apps.total ?? 0}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Apps Registered
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-purple-50 dark:bg-purple-900/10 border-2 border-purple-200 dark:border-purple-800 flex items-center justify-center">
                  <PersonIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {stats?.agents.total ?? 0}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Agents Active
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 border-2 border-yellow-200 dark:border-yellow-800 flex items-center justify-center">
                  <ClockIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {stats?.agents.pendingReview ?? 0}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Pending Review
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-teal-50 dark:bg-teal-900/10 border-2 border-teal-200 dark:border-teal-800 flex items-center justify-center">
                  <UpdateIcon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {stats?.sync.lastGlobalSync
                      ? new Date(stats.sync.lastGlobalSync).toLocaleDateString()
                      : 'Never'}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Last Sync
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <GearIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Quick Actions
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/aicc/acc/sync"
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <UpdateIcon className="w-4 h-4" />
                Sync All Apps
              </Link>
              <Link
                href="/aicc/acc/apps/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-dark-bg-tertiary text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-bg-quaternary transition-colors"
              >
                <PlusIcon className="w-4 h-4" />
                Register App
              </Link>
              <Link
                href="/aicc/acc/agents/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-dark-bg-tertiary text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-bg-quaternary transition-colors"
              >
                <PlusIcon className="w-4 h-4" />
                Create Agent
              </Link>
              <Link
                href="/aicc/acc/contracts"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-dark-bg-tertiary text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-bg-quaternary transition-colors"
              >
                <ActivityLogIcon className="w-4 h-4" />
                View Contracts
              </Link>
            </div>
          </div>

          {/* Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/aicc/acc/apps"
              className="card p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/10 border-2 border-blue-200 dark:border-blue-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <RocketIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    App Registry
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Manage registered applications and their agent infrastructure
                  </p>
                  <div className="flex gap-4">
                    <div>
                      <div className="text-xs text-gray-500">Total</div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {stats?.apps.total ?? 0} apps
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Active</div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {stats?.apps.byStatus?.active ?? 0}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link
              href="/aicc/acc/agents"
              className="card p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-50 dark:bg-purple-900/10 border-2 border-purple-200 dark:border-purple-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PersonIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    Agent Catalog
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Browse and manage all agents across apps and providers
                  </p>
                  <div className="flex gap-4">
                    <div>
                      <div className="text-xs text-gray-500">Claude</div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {stats?.agents.byProvider?.claude ?? 0}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">OpenAI</div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {stats?.agents.byProvider?.openai ?? 0}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Ollama</div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {stats?.agents.byProvider?.ollama ?? 0}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link
              href="/aicc/acc/sync"
              className="card p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-teal-50 dark:bg-teal-900/10 border-2 border-teal-200 dark:border-teal-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UpdateIcon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    Sync Status
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Monitor and trigger file sync between repos and database
                  </p>
                  <div className="flex gap-4">
                    <div>
                      <div className="text-xs text-gray-500">Needing Sync</div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {stats?.sync.appsNeedingSync ?? 0}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Agent Types Breakdown */}
          {stats && Object.keys(stats.agents.byType).length > 0 && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Agents by Type
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.entries(stats.agents.byType).map(([type, count]) => (
                  <div
                    key={type}
                    className="p-4 rounded-lg bg-gray-50 dark:bg-dark-bg-tertiary border border-gray-200 dark:border-dark-border-default text-center"
                  >
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {count}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {type.replace('_', ' ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
