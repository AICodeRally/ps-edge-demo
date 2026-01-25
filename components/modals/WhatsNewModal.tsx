'use client';

/**
 * What's New Modal (PS-Edge)
 *
 * Introduces users to the 6 P's organizational framework
 * Shows on first visit, dismissable with "Don't show again"
 * Matches SGM-SPARCC gold standard onboarding pattern
 */

import { useState, useEffect } from 'react';
import { SIX_PS_DEFINITIONS, type SixPCategory } from '@/types/ps-edge/six-ps.types';
import {
  CheckCircledIcon,
  Cross2Icon,
  PersonIcon,
  GearIcon,
  RocketIcon,
  BarChartIcon,
  PieChartIcon,
  StarIcon,
} from '@radix-ui/react-icons';

// Map 6 P's to icon components
const iconMap: Record<SixPCategory, React.ComponentType<{ className?: string }>> = {
  PEOPLE: PersonIcon,
  PROCESS: GearIcon,
  PRACTICE: RocketIcon,
  PERFORMANCE: BarChartIcon,
  PIPELINE: BarChartIcon, // Using BarChartIcon for sales pipeline visual
  PURPOSE: StarIcon,
};

const WELCOME_KEY = 'ps-edge-welcome-modal-seen';
const MODAL_VERSION = '2.0'; // Increment to show modal again for updates

interface WhatsNewModalProps {
  onClose?: () => void;
}

export function WhatsNewModal({ onClose }: WhatsNewModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    // Check if user has seen this version of the modal
    const seenVersion = localStorage.getItem(WELCOME_KEY);
    if (seenVersion !== MODAL_VERSION) {
      // Show after brief delay
      setTimeout(() => setIsOpen(true), 800);
    }
  }, []);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem(WELCOME_KEY, MODAL_VERSION);
    }
    setIsOpen(false);
    onClose?.();
  };

  if (!isOpen) {
    return null;
  }

  const sixPs = [
    {
      category: 'PURPOSE' as SixPCategory,
      description: 'Mission alignment and client impact',
      features: ['Mission', 'Success', 'Renewals', 'Proposals', 'Clients'],
    },
    {
      category: 'PEOPLE' as SixPCategory,
      description: 'Team capacity and workforce management',
      features: ['Team Dashboard', 'Capacity Planning', 'Onboarding'],
    },
    {
      category: 'PROCESS' as SixPCategory,
      description: 'Workflow efficiency and deliverables',
      features: ['Engagements', 'Deliverables', 'Support', 'Knowledge'],
    },
    {
      category: 'PRACTICE' as SixPCategory,
      description: 'Methodologies, tools, and delivery excellence',
      features: ['AI Tools', 'Integrations', 'Data', 'Tenants'],
    },
    {
      category: 'PIPELINE' as SixPCategory,
      description: 'Sales pipeline, proposals, and revenue forecasting',
      features: ['Sales Pipeline', 'Proposals', 'Forecasting', 'Commissions', 'Channel Revenue'],
    },
    {
      category: 'PERFORMANCE' as SixPCategory,
      description: 'KPIs and operational metrics',
      features: ['KPI Dashboard', 'Health', 'Benchmarks', 'Signals'],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-[1200px] max-w-[95vw] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div
          className="px-6 py-5 text-white relative"
          style={{
            background: 'linear-gradient(90deg, #9333ea, #c026d3, #db2777, #facc15)',
          }}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/20 transition-colors"
            aria-label="Close modal"
          >
            <Cross2Icon className="w-5 h-5" />
          </button>
          <h2 className="text-3xl font-bold">Welcome to PS-Edge!</h2>
          <p className="text-white/90 text-sm mt-1">
            Organized by the 6 P's Framework for nonprofit consulting excellence
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Navigate by the 6 P's
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                29 pages organized by business function
              </p>
            </div>

            {/* 6 P's Grid - 2 rows of 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sixPs.map(({ category, description, features }) => {
                const config = SIX_PS_DEFINITIONS[category];
                const IconComponent = iconMap[category];
                return (
                  <div
                    key={category}
                    className="border-2 rounded-xl p-4 hover:shadow-lg transition-all cursor-default"
                    style={{
                      borderColor: `${config.colorHex}40`,
                      backgroundColor: `${config.colorHex}08`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${config.colorHex}20`, color: config.colorHex }}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-base" style={{ color: config.colorHex }}>
                        {config.title}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 mb-3 leading-tight">
                      {description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {features.map((feature) => (
                        <span
                          key={feature}
                          className="text-[11px] px-2 py-1 rounded-full font-medium"
                          style={{ backgroundColor: `${config.colorHex}18`, color: config.colorHex }}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom row: How to Navigate + Key Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-xl p-4">
              <h3 className="text-sm font-bold text-purple-700 dark:text-purple-300 mb-3">
                🧭 How to Navigate
              </h3>
              <div className="grid grid-cols-2 gap-y-2 text-xs text-purple-600 dark:text-purple-400">
                <p><strong>1.</strong> Click P's in footer</p>
                <p><strong>2.</strong> Use Command Palette (<kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 border border-purple-300 dark:border-purple-700 rounded text-[10px]">Cmd+K</kbd>)</p>
                <p><strong>3.</strong> Dashboard landing pages</p>
                <p><strong>4.</strong> Direct URLs: /dashboard/people</p>
              </div>
            </div>

            <div className="bg-teal-50 dark:bg-teal-900/20 border-2 border-teal-200 dark:border-teal-800 rounded-xl p-4">
              <h3 className="text-sm font-bold text-teal-700 dark:text-teal-300 mb-1 inline-flex items-center gap-1.5">
                <CheckCircledIcon className="w-4 h-4" />
                Nonprofit Consulting Pack
              </h3>
              <p className="text-xs text-teal-600 dark:text-teal-400 leading-relaxed">
                This deployment includes the Nonprofit Consulting Pack with 11 specialized service lines: campaign fundraising, strategic planning, board development, grant writing, executive coaching, and more. Now featuring 2026 AI Line of Service for ethical AI adoption.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="w-4 h-4 text-purple-600 border-gray-300 dark:border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Don't show this again</span>
            </label>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 font-semibold text-white rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg"
              style={{
                background: 'linear-gradient(90deg, #9333ea, #c026d3, #db2777, #facc15)',
              }}
            >
              Got it, Let's Go!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
