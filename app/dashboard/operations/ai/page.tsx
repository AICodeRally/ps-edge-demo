/**
 * Operations - AI Management
 * Configure AI assistants, models, prompts, and knowledge sources
 */

'use client';

import { useState } from 'react';
import {
  LightningBoltIcon,
  GearIcon,
  CheckIcon,
  ReloadIcon,
} from '@radix-ui/react-icons';

export default function AIManagementPage() {
  const [ragEnabled, setRagEnabled] = useState(true);
  const [opsChiefFrequency, setOpsChiefFrequency] = useState('hourly');
  const [opsChiefDepth, setOpsChiefDepth] = useState('standard');
  const [askPSMaxTokens, setAskPSMaxTokens] = useState(2048);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([
    'methodologies',
    'templates',
    'case-studies',
  ]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const availableAssets = [
    { id: 'methodologies', name: 'Consulting Methodologies', count: 42 },
    { id: 'templates', name: 'Proposal Templates', count: 156 },
    { id: 'case-studies', name: 'Client Case Studies', count: 78 },
    { id: 'playbooks', name: 'Delivery Playbooks', count: 34 },
    { id: 'frameworks', name: 'Strategic Frameworks', count: 29 },
    { id: 'best-practices', name: 'Best Practices', count: 93 },
    { id: 'training', name: 'Training Materials', count: 127 },
    { id: 'research', name: 'Industry Research', count: 245 },
  ];

  const toggleAsset = (assetId: string) => {
    setSelectedAssets((prev) =>
      prev.includes(assetId) ? prev.filter((id) => id !== assetId) : [...prev, assetId]
    );
  };

  const handleSave = () => {
    setSaving(true);
    setSaved(false);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  const handleReset = () => {
    setRagEnabled(true);
    setOpsChiefFrequency('hourly');
    setOpsChiefDepth('standard');
    setAskPSMaxTokens(2048);
    setSelectedAssets(['methodologies', 'templates', 'case-studies']);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              AI Management
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Configure AI assistants, models, and knowledge sources
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-dark-border-default text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary transition-colors flex items-center gap-2"
            >
              <ReloadIcon className="w-4 h-4" />
              Reset to Defaults
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 via-fuchsia-600 to-yellow-600 text-white hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <ReloadIcon className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : saved ? (
                <>
                  <CheckIcon className="w-4 h-4" />
                  Saved
                </>
              ) : (
                <>
                  <GearIcon className="w-4 h-4" />
                  Save Configuration
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* AI Models */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <LightningBoltIcon className="w-5 h-5 text-yellow-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                AI Models
              </h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-dark-bg-tertiary border border-gray-200 dark:border-dark-border-default">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Primary Model
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Rally LLaMA (PS-tuned)
                    </p>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                    Active
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Custom-tuned model for professional services consulting context
                </p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-dark-bg-tertiary border border-gray-200 dark:border-dark-border-default">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Fallback Model
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Claude Opus 4.5
                    </p>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                    Standby
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Automatic failover for high availability
                </p>
              </div>
            </div>
          </div>

          {/* OpsChief Configuration */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              OpsChief Configuration
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Analysis Frequency
                </label>
                <select
                  value={opsChiefFrequency}
                  onChange={(e) => setOpsChiefFrequency(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-gray-100"
                >
                  <option value="realtime">Real-time</option>
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="manual">Manual Only</option>
                </select>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  How often OpsChief analyzes operational data for insights
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Analysis Depth
                </label>
                <div className="space-y-2">
                  {[
                    {
                      value: 'light',
                      label: 'Light',
                      desc: 'Quick surface-level analysis (faster, lower cost)',
                    },
                    {
                      value: 'standard',
                      label: 'Standard',
                      desc: 'Balanced depth and performance (recommended)',
                    },
                    {
                      value: 'deep',
                      label: 'Deep',
                      desc: 'Comprehensive analysis with detailed recommendations',
                    },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-dark-border-default hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="depth"
                        value={option.value}
                        checked={opsChiefDepth === option.value}
                        onChange={(e) => setOpsChiefDepth(e.target.value)}
                        className="mt-0.5"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {option.label}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {option.desc}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AskPS Configuration */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              AskPS Configuration
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Maximum Response Length
                </label>
                <input
                  type="range"
                  min="256"
                  max="4096"
                  step="256"
                  value={askPSMaxTokens}
                  onChange={(e) => setAskPSMaxTokens(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
                  <span>256 tokens (brief)</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {askPSMaxTokens} tokens
                  </span>
                  <span>4096 tokens (detailed)</span>
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Longer responses provide more detail but take more time and cost more
                </p>
              </div>
            </div>
          </div>

          {/* RAG Configuration */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Knowledge Base (RAG) Configuration
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Enable RAG
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Use knowledge base to enhance AI responses with domain context
                  </p>
                </div>
                <button
                  onClick={() => setRagEnabled(!ragEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    ragEnabled ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      ragEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {ragEnabled && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Selected Knowledge Assets ({selectedAssets.length})
                  </label>
                  <div className="space-y-2">
                    {availableAssets.map((asset) => (
                      <label
                        key={asset.id}
                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-dark-border-default hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedAssets.includes(asset.id)}
                          onChange={() => toggleAsset(asset.id)}
                          className="rounded"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {asset.name}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {asset.count} documents
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Usage Stats */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              AI Usage Statistics (Last 30 Days)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Requests</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">1,234</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Tokens Used</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">487K</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avg Response</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">1.8s</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">99.2%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
