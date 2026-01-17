/**
 * Register New App
 * Form for registering a new application
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

export default function NewAppPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    slug: '',
    name: '',
    description: '',
    repoPath: '',
    repoUrl: '',
    port: '',
    hostname: '',
    tier: 'demo',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/aicc/acc/apps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          port: form.port ? parseInt(form.port, 10) : undefined,
        }),
      });

      const data = await response.json();
      if (data.success) {
        router.push(`/aicc/acc/apps/${form.slug}`);
      } else {
        setError(data.error || 'Failed to register app');
      }
    } catch (err) {
      setError('Failed to connect to API');
    } finally {
      setLoading(false);
    }
  }

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div className="flex items-center gap-4">
          <Link
            href="/aicc/acc/apps"
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary rounded"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Register New App
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Add a new application to the Agent Control Center
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="card p-6 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                App Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => {
                  setForm({
                    ...form,
                    name: e.target.value,
                    slug: form.slug || generateSlug(e.target.value),
                  });
                }}
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-dark-border-default bg-white dark:bg-dark-bg-tertiary"
                placeholder="e.g., Sales Performance Tool"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Slug *
              </label>
              <input
                type="text"
                required
                pattern="^[a-z0-9-]+$"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-dark-border-default bg-white dark:bg-dark-bg-tertiary"
                placeholder="e.g., spot"
              />
              <p className="text-xs text-gray-500 mt-1">
                Lowercase letters, numbers, and dashes only
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-dark-border-default bg-white dark:bg-dark-bg-tertiary"
                placeholder="Brief description of this application"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Repository Path
              </label>
              <input
                type="text"
                value={form.repoPath}
                onChange={(e) => setForm({ ...form, repoPath: e.target.value })}
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-dark-border-default bg-white dark:bg-dark-bg-tertiary"
                placeholder="e.g., /Users/toddlebaron/dev/spot"
              />
              <p className="text-xs text-gray-500 mt-1">
                Local filesystem path for syncing agent files
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Repository URL
              </label>
              <input
                type="url"
                value={form.repoUrl}
                onChange={(e) => setForm({ ...form, repoUrl: e.target.value })}
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-dark-border-default bg-white dark:bg-dark-bg-tertiary"
                placeholder="e.g., https://github.com/org/repo"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Port
                </label>
                <input
                  type="number"
                  value={form.port}
                  onChange={(e) => setForm({ ...form, port: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-dark-border-default bg-white dark:bg-dark-bg-tertiary"
                  placeholder="e.g., 3020"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Hostname
                </label>
                <input
                  type="text"
                  value={form.hostname}
                  onChange={(e) => setForm({ ...form, hostname: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-dark-border-default bg-white dark:bg-dark-bg-tertiary"
                  placeholder="e.g., spot.local"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tier
              </label>
              <select
                value={form.tier}
                onChange={(e) => setForm({ ...form, tier: e.target.value })}
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-dark-border-default bg-white dark:bg-dark-bg-tertiary"
              >
                <option value="core">Core</option>
                <option value="demo">Demo</option>
                <option value="external">External</option>
              </select>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                {loading ? 'Registering...' : 'Register App'}
              </button>
              <Link
                href="/aicc/acc/apps"
                className="px-4 py-2 bg-gray-100 dark:bg-dark-bg-tertiary text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-bg-quaternary text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
