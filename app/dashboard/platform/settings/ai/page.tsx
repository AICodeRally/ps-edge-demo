'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useAISettings } from '@/src/components/ai/AISettingsProvider';
import {
  LightningBoltIcon,
  ChatBubbleIcon,
  CheckCircledIcon,
  InfoCircledIcon,
  ResetIcon,
  ExclamationTriangleIcon,
  BellIcon,
  QuestionMarkCircledIcon,
  ActivityLogIcon,
} from '@radix-ui/react-icons';

interface FeatureToggleProps {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  enabled: boolean;
  disabled?: boolean;
  onChange: (enabled: boolean) => void;
}

function FeatureToggle({ id, label, description, icon: Icon, enabled, disabled, onChange }: FeatureToggleProps) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-lg border ${
      disabled
        ? 'bg-gray-50 dark:bg-dark-bg-tertiary border-gray-200 dark:border-dark-border-default opacity-60'
        : 'bg-white dark:bg-dark-bg-secondary border-gray-200 dark:border-dark-border-default'
    }`}>
      <div className="flex items-center gap-4">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
          enabled && !disabled
            ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
            : 'bg-gray-100 dark:bg-dark-bg-tertiary text-gray-500 dark:text-gray-400'
        }`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <label htmlFor={id} className="font-medium text-gray-900 dark:text-gray-100 cursor-pointer">
            {label}
          </label>
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={enabled}
        disabled={disabled}
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          disabled
            ? 'cursor-not-allowed bg-gray-200 dark:bg-gray-700'
            : enabled
              ? 'bg-purple-600'
              : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

export default function AISettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { settings, aiEnabled, setAIEnabled, setFeatureEnabled, updateSettings, reset } = useAISettings();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Note: Removed access control for demo purposes
  // In production, you might want to restrict to certain roles

  const userEmail = session?.user?.email || 'unknown';

  const handleMasterToggle = (enabled: boolean) => {
    setAIEnabled(enabled, userEmail);
  };

  const handleDemoDataToggle = (enabled: boolean) => {
    updateSettings({ useDemoData: enabled, updatedBy: userEmail });
  };

  const handleFeatureToggle = (feature: keyof typeof settings.features, enabled: boolean) => {
    setFeatureEnabled(feature, enabled, userEmail);
  };

  const handleReset = () => {
    reset();
    setShowResetConfirm(false);
  };

  const features = [
    {
      id: 'opsChief',
      key: 'opsChief' as const,
      label: 'OpsChief Orb',
      description: 'Business health insights and operational analytics',
      icon: ActivityLogIcon,
    },
    {
      id: 'askPS',
      key: 'askPS' as const,
      label: 'AskPS Orb',
      description: 'AI chat assistant for professional services questions',
      icon: ChatBubbleIcon,
    },
    {
      id: 'pulse',
      key: 'pulse' as const,
      label: 'Pulse Orb',
      description: 'AI-powered operational insights and notifications',
      icon: BellIcon,
    },
    {
      id: 'tasks',
      key: 'tasks' as const,
      label: 'Tasks Orb',
      description: 'Task management synced with AICR platform',
      icon: CheckCircledIcon,
    },
    {
      id: 'pageKb',
      key: 'pageKb' as const,
      label: 'Page KB Panel',
      description: 'Context-aware page documentation and help',
      icon: QuestionMarkCircledIcon,
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">AI Features</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Control AI assistant visibility for this session
        </p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Policy Warning */}
          <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800">
            <div className="flex gap-3">
              <ExclamationTriangleIcon className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-900 dark:text-amber-300">Client AI Policy</h3>
                <p className="text-sm text-amber-800 dark:text-amber-400 mt-1">
                  Some clients may have policies restricting AI assistant usage. Disable AI features
                  before demos or client sessions if their policy prohibits AI tools.
                </p>
              </div>
            </div>
          </div>

          {/* Master Toggle */}
          <div className="p-6 rounded-xl bg-white dark:bg-dark-bg-secondary border-2 border-gray-200 dark:border-dark-border-default">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${
                  aiEnabled
                    ? 'bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white'
                    : 'bg-gray-100 dark:bg-dark-bg-tertiary text-gray-500 dark:text-gray-400'
                }`}>
                  <LightningBoltIcon className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    AI Assistants
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {aiEnabled ? 'All AI features are enabled' : 'All AI features are disabled'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={aiEnabled}
                onClick={() => handleMasterToggle(!aiEnabled)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  aiEnabled
                    ? 'bg-purple-600'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform ${
                    aiEnabled ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Demo Data Mode Toggle */}
          <div className="p-6 rounded-xl bg-white dark:bg-dark-bg-secondary border-2 border-gray-200 dark:border-dark-border-default">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${
                  settings.useDemoData
                    ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white'
                    : 'bg-gray-100 dark:bg-dark-bg-tertiary text-gray-500 dark:text-gray-400'
                }`}>
                  <InfoCircledIcon className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Demo Data Mode
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {settings.useDemoData
                      ? 'Using nonprofit consulting demo data - realistic scenarios for Phoenix Philanthropy Group'
                      : 'Connected to live AICR platform for real-time insights'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.useDemoData}
                onClick={() => handleDemoDataToggle(!settings.useDemoData)}
                disabled={!aiEnabled}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  !aiEnabled
                    ? 'cursor-not-allowed bg-gray-200 dark:bg-gray-700'
                    : settings.useDemoData
                      ? 'bg-orange-600'
                      : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform ${
                    settings.useDemoData ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            {!aiEnabled && (
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <InfoCircledIcon className="h-4 w-4" />
                Enable AI Assistants to configure demo data mode
              </p>
            )}
          </div>

          {/* Individual Feature Toggles */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Individual Orbs
            </h3>
            <div className="space-y-3">
              {features.map((feature) => (
                <FeatureToggle
                  key={feature.id}
                  id={feature.id}
                  label={feature.label}
                  description={feature.description}
                  icon={feature.icon}
                  enabled={settings.features[feature.key]}
                  disabled={!aiEnabled}
                  onChange={(enabled) => handleFeatureToggle(feature.key, enabled)}
                />
              ))}
            </div>
            {!aiEnabled && (
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <InfoCircledIcon className="h-4 w-4" />
                Enable the master toggle to configure individual features
              </p>
            )}
          </div>

          {/* Reset Section */}
          <div className="border-t border-gray-200 dark:border-dark-border-default pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Reset to Defaults</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Restore all AI features to their default enabled state
                </p>
              </div>
              {showResetConfirm ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-dark-border-default text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 text-sm rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                  >
                    Confirm Reset
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-dark-border-default text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary"
                >
                  <ResetIcon className="h-4 w-4" />
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Last Updated Info */}
          {settings.updatedAt && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Last updated: {new Date(settings.updatedAt).toLocaleString()}
              {settings.updatedBy && ` by ${settings.updatedBy}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
