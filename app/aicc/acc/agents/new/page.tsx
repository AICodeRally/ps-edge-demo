/**
 * Create New Agent
 * Form for creating a new agent definition
 */

'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

const TOOLS = [
  'Bash', 'Read', 'Write', 'Edit', 'Grep', 'Glob',
  'LS', 'Task', 'WebFetch', 'WebSearch', 'NotebookEdit', 'TodoWrite',
];

function NewAgentForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialAppSlug = searchParams.get('appSlug') || '';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apps, setApps] = useState<Array<{ id: string; slug: string; name: string }>>([]);
  const [form, setForm] = useState({
    slug: '',
    name: '',
    description: '',
    agentType: 'plan_execute',
    provider: 'claude',
    modelId: '',
    scope: 'app',
    systemPrompt: '',
    tools: ['Read', 'Write', 'Edit', 'Bash', 'Grep', 'Glob'],
    appSlug: initialAppSlug,
  });

  useEffect(() => {
    // Load apps for selection
    fetch('/api/aicc/acc/apps')
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setApps(data.data);
        }
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/aicc/acc/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (data.success) {
        router.push(`/aicc/acc/agents/${form.slug}`);
      } else {
        setError(data.error || 'Failed to create agent');
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

  function toggleTool(tool: string) {
    setForm(prev => ({
      ...prev,
      tools: prev.tools.includes(tool)
        ? prev.tools.filter(t => t !== tool)
        : [...prev.tools, tool],
    }));
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div className="flex items-center gap-4">
          <Link
            href="/aicc/acc/agents"
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary rounded"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Create New Agent
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Define a new agent with the universal contract
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
                Agent Name *
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
                placeholder="e.g., SPOT Development Agent"
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
                placeholder="e.g., spot-dev"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-dark-border-default bg-white dark:bg-dark-bg-tertiary"
                placeholder="Brief description of the agent's purpose"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Agent Type *
                </label>
                <select
                  value={form.agentType}
                  onChange={(e) => setForm({ ...form, agentType: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-dark-border-default bg-white dark:bg-dark-bg-tertiary"
                >
                  <option value="plan_execute">Plan & Execute</option>
                  <option value="multi_agent">Multi-Agent</option>
                  <option value="rag">RAG</option>
                  <option value="tool_qa">Tool Q&A</option>
                  <option value="domain_expert">Domain Expert</option>
                  <option value="assistant">Assistant</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Provider *
                </label>
                <select
                  value={form.provider}
                  onChange={(e) => setForm({ ...form, provider: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-dark-border-default bg-white dark:bg-dark-bg-tertiary"
                >
                  <option value="claude">Claude</option>
                  <option value="openai">OpenAI</option>
                  <option value="ollama">Ollama</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Model ID
                </label>
                <input
                  type="text"
                  value={form.modelId}
                  onChange={(e) => setForm({ ...form, modelId: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-dark-border-default bg-white dark:bg-dark-bg-tertiary"
                  placeholder="e.g., sonnet, gpt-4o, llama3:8b"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  App
                </label>
                <select
                  value={form.appSlug}
                  onChange={(e) => setForm({ ...form, appSlug: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-dark-border-default bg-white dark:bg-dark-bg-tertiary"
                >
                  <option value="">No app (platform-wide)</option>
                  {apps.map(app => (
                    <option key={app.id} value={app.slug}>
                      {app.name} ({app.slug})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tools
              </label>
              <div className="flex flex-wrap gap-2">
                {TOOLS.map(tool => (
                  <button
                    key={tool}
                    type="button"
                    onClick={() => toggleTool(tool)}
                    className={`px-3 py-1 rounded text-sm ${
                      form.tools.includes(tool)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 dark:bg-dark-bg-tertiary text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {tool}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                System Prompt
              </label>
              <textarea
                value={form.systemPrompt}
                onChange={(e) => setForm({ ...form, systemPrompt: e.target.value })}
                rows={8}
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-dark-border-default bg-white dark:bg-dark-bg-tertiary font-mono text-sm"
                placeholder="# Agent Name

## Overview
...

## Responsibilities
..."
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Agent'}
              </button>
              <Link
                href="/aicc/acc/agents"
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

export default function NewAgentPage() {
  return (
    <Suspense fallback={
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    }>
      <NewAgentForm />
    </Suspense>
  );
}
