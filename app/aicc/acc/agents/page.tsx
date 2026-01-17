/**
 * Agent Catalog
 * Lists all agents across all apps and providers
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  PlusIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import type { AgentContract } from '@/src/lib/acc';
import { PROVIDER_INFO } from '@/src/lib/acc/adapters';

interface AgentWithApp extends AgentContract {
  id: string;
  appSlug?: string;
}

export default function AgentsListPage() {
  const [agents, setAgents] = useState<AgentWithApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    provider: '',
    agentType: '',
    status: '',
    search: '',
  });

  useEffect(() => {
    loadAgents();
  }, [filter]);

  async function loadAgents() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter.provider) params.set('provider', filter.provider);
      if (filter.agentType) params.set('agentType', filter.agentType);
      if (filter.status) params.set('status', filter.status);
      if (filter.search) params.set('search', filter.search);

      const response = await fetch(`/api/aicc/acc/agents?${params}`);
      const data = await response.json();
      if (data.success) {
        setAgents(data.data);
      }
    } catch (error) {
      console.error('Failed to load agents:', error);
    } finally {
      setLoading(false);
    }
  }

  function getStatusBadge(status: string) {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      deprecated: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      archived: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
    };
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[status] ?? colors.archived}`}>
        {status}
      </span>
    );
  }

  function getProviderBadge(provider: string) {
    const info = PROVIDER_INFO[provider as keyof typeof PROVIDER_INFO];
    return (
      <span
        className="px-2 py-0.5 rounded text-xs font-medium"
        style={{
          backgroundColor: `${info?.color ?? '#6b7280'}20`,
          color: info?.color ?? '#6b7280',
        }}
      >
        {info?.icon} {info?.name ?? provider}
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
              Agent Catalog
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              All agents across apps and providers
            </p>
          </div>
          <Link
            href="/aicc/acc/agents/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            Create Agent
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-3 bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-dark-border-default">
        <div className="flex gap-4 items-center flex-wrap">
          <select
            value={filter.provider}
            onChange={(e) => setFilter({ ...filter, provider: e.target.value })}
            className="px-3 py-1.5 rounded border border-gray-300 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary text-sm"
          >
            <option value="">All Providers</option>
            <option value="claude">Claude</option>
            <option value="openai">OpenAI</option>
            <option value="ollama">Ollama</option>
            <option value="custom">Custom</option>
          </select>
          <select
            value={filter.agentType}
            onChange={(e) => setFilter({ ...filter, agentType: e.target.value })}
            className="px-3 py-1.5 rounded border border-gray-300 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary text-sm"
          >
            <option value="">All Types</option>
            <option value="plan_execute">Plan & Execute</option>
            <option value="multi_agent">Multi-Agent</option>
            <option value="rag">RAG</option>
            <option value="tool_qa">Tool Q&A</option>
            <option value="domain_expert">Domain Expert</option>
            <option value="assistant">Assistant</option>
          </select>
          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="px-3 py-1.5 rounded border border-gray-300 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary text-sm"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="deprecated">Deprecated</option>
            <option value="archived">Archived</option>
          </select>
          <input
            type="text"
            placeholder="Search agents..."
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
          ) : agents.length === 0 ? (
            <div className="text-center py-12">
              <PersonIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                No agents found
              </p>
              <Link
                href="/aicc/acc/agents/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <PlusIcon className="w-4 h-4" />
                Create Your First Agent
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-border-default">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Agent
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Provider
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                      App
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map((agent) => (
                    <tr
                      key={agent.id}
                      className="border-b border-gray-100 dark:border-dark-border-muted hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary"
                    >
                      <td className="py-3 px-4">
                        <Link
                          href={`/aicc/acc/agents/${agent.slug}`}
                          className="flex items-center gap-3"
                        >
                          <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800 flex items-center justify-center">
                            <PersonIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-gray-100 hover:text-purple-600">
                              {agent.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {agent.slug}
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td className="py-3 px-4">
                        {getProviderBadge(agent.provider)}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {agent.appSlug || '—'}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400 capitalize">
                        {agent.agentType.replace('_', ' ')}
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(agent.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
