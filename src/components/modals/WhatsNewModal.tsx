'use client';

/**
 * What's New Modal (NP-Edge)
 *
 * Introduces users to nonprofit operations modules
 * Shows on first visit, dismissable with "Don't show again"
 */

import { useState, useEffect } from 'react';
import {
  CheckCircledIcon,
  Cross2Icon,
  PersonIcon,
  HeartIcon,
  RocketIcon,
  TargetIcon,
  FileTextIcon,
  CalendarIcon,
} from '@radix-ui/react-icons';

const WELCOME_KEY = 'np-edge-welcome-modal-seen';
const MODAL_VERSION = '3.0'; // Nonprofit version

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

  const modules = [
    {
      name: 'Programs',
      icon: RocketIcon,
      color: '#22c55e',
      description: 'Manage foster care programs and track beneficiaries',
      features: ['Keys to Success', 'Educational Support', 'Scholarships', 'Transition Services'],
    },
    {
      name: 'Fundraising',
      icon: HeartIcon,
      color: '#14b8a6',
      description: 'Donor management and campaign tracking',
      features: ['Donor Database', 'Campaigns', 'Grant Management', 'Gift Processing'],
    },
    {
      name: 'Volunteers',
      icon: PersonIcon,
      color: '#3b82f6',
      description: 'Volunteer roster and engagement tracking',
      features: ['Volunteer Directory', 'Hours Tracking', 'Skills Inventory', 'Assignments'],
    },
    {
      name: 'Beneficiaries',
      icon: TargetIcon,
      color: '#a855f7',
      description: 'Foster children served and impact outcomes',
      features: ['Youth Directory', 'Program Enrollment', 'Case Notes', 'Outcomes Tracking'],
    },
    {
      name: 'Compliance',
      icon: FileTextIcon,
      color: '#6b7280',
      description: 'Form 990, filings, and regulatory requirements',
      features: ['IRS Form 990', 'State Reports', 'Board Minutes', 'Grant Reporting'],
    },
    {
      name: 'Events',
      icon: CalendarIcon,
      color: '#f97316',
      description: 'Fundraising galas and community events',
      features: ['Event Calendar', 'Registration Management', 'Fundraising Goals', 'Attendance'],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-[1200px] max-w-[95vw] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div
          className="px-6 py-5 text-white relative"
          style={{
            background: 'linear-gradient(90deg, #22c55e, #14b8a6)',
          }}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/20 transition-colors"
            aria-label="Close modal"
          >
            <Cross2Icon className="w-5 h-5" />
          </button>
          <h2 className="text-3xl font-bold">Welcome to NP-Edge!</h2>
          <p className="text-white/90 text-sm mt-1">
            Complete operations platform for Arizona Friends of Foster Children Foundation
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Nonprofit Operations Modules
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                6 modules for complete nonprofit management
              </p>
            </div>

            {/* Modules Grid - 2 rows of 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules.map((module) => {
                const IconComponent = module.icon;
                return (
                  <div
                    key={module.name}
                    className="border-2 rounded-xl p-4 hover:shadow-lg transition-all cursor-default"
                    style={{
                      borderColor: `${module.color}40`,
                      backgroundColor: `${module.color}08`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${module.color}20`, color: module.color }}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-base" style={{ color: module.color }}>
                        {module.name}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 mb-3 leading-tight">
                      {module.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {module.features.map((feature) => (
                        <span
                          key={feature}
                          className="text-[11px] px-2 py-1 rounded-full font-medium"
                          style={{ backgroundColor: `${module.color}18`, color: module.color }}
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

          {/* Bottom row: How to Navigate + About AFFCF */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-4">
              <h3 className="text-sm font-bold text-green-700 dark:text-green-300 mb-3">
                🧭 How to Navigate
              </h3>
              <div className="grid grid-cols-2 gap-y-2 text-xs text-green-600 dark:text-green-400">
                <p><strong>1.</strong> Use left sidebar</p>
                <p><strong>2.</strong> Command Palette (<kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 border border-green-300 dark:border-green-700 rounded text-[10px]">Cmd+K</kbd>)</p>
                <p><strong>3.</strong> Footer quick links</p>
                <p><strong>4.</strong> AI orbs (bottom corners)</p>
              </div>
            </div>

            <div className="bg-teal-50 dark:bg-teal-900/20 border-2 border-teal-200 dark:border-teal-800 rounded-xl p-4">
              <h3 className="text-sm font-bold text-teal-700 dark:text-teal-300 mb-1 inline-flex items-center gap-1.5">
                <CheckCircledIcon className="w-4 h-4" />
                About AFFCF
              </h3>
              <p className="text-xs text-teal-600 dark:text-teal-400 leading-relaxed">
                Arizona Friends of Foster Children Foundation has enriched the lives of children in Arizona's foster care system for over 40 years. We serve 2,500+ foster youth annually through 6 core programs, 342 active volunteers, and $2.1M in annual support.
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
                className="w-4 h-4 text-green-600 border-gray-300 dark:border-gray-600 rounded focus:ring-green-500 focus:ring-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Don't show this again</span>
            </label>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 font-semibold text-white rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg"
              style={{
                background: 'linear-gradient(90deg, #22c55e, #14b8a6)',
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
