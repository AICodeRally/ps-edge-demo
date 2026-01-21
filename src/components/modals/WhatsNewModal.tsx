'use client';

import { useState, useEffect } from 'react';
import { Cross2Icon, RocketIcon } from '@radix-ui/react-icons';
import ReactMarkdown from 'react-markdown';

/**
 * WhatsNewModal - Feature announcements and updates
 *
 * Shows on first visit or when version changes
 * Can be dismissed or set to "remind me later"
 */
export function WhatsNewModal() {
  const [isOpen, setIsOpen] = useState(false);
  const currentVersion = '1.0.0'; // Update this when releasing new features

  useEffect(() => {
    // Check if user has seen this version
    const lastSeenVersion = localStorage.getItem('ps-edge-whats-new-version');
    const dismissed = localStorage.getItem('ps-edge-whats-new-dismissed');

    if (!lastSeenVersion || lastSeenVersion !== currentVersion) {
      if (!dismissed || dismissed !== currentVersion) {
        // Show modal after a brief delay
        setTimeout(() => setIsOpen(true), 1000);
      }
    }
  }, []);

  const handleDismiss = (forever: boolean) => {
    if (forever) {
      localStorage.setItem('ps-edge-whats-new-version', currentVersion);
    } else {
      localStorage.setItem('ps-edge-whats-new-dismissed', currentVersion);
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const content = `
# What's New in PS-Edge v1.0

Welcome to the **AICR Platform Migration**! Here's what's new:

## 🤖 5 AI Orbs

We've added 5 powerful AI assistants to help you work smarter:

- **OpsChief** (bottom-left) - Business health insights and operational analytics
- **Pulse** (bottom-left) - Real-time notifications and urgent insights
- **PageKB** (bottom-left) - Context-aware help for every page
- **Tasks** (bottom-right) - Task management synced with AICR
- **AskPS** (bottom-right) - AI chat assistant for questions

## 🎨 New Navbar Design

- Shows **client name** instead of product name (defaults to "DEMO Edge")
- Clean, single-row layout
- Demo badge for non-production data
- Enhanced user dropdown with quick access to Settings

## ⚙️ Full Settings Control

Navigate to **Platform → Settings → AI Features** to:
- Toggle AI orbs on/off (master switch)
- Control individual orbs
- Respect client AI policies

## 📊 Nested Dashboard Metrics

Every page now has relevant metric panels:
- Main dashboard: 6P aggregate view
- P landing pages: Key metrics for that P
- Sub-pages: Detailed stats + data tables

## ⌨️ Keyboard Shortcuts

- **Cmd+K** - Open command palette for quick navigation
- **Esc** - Close any panel or modal

---

**Ready to explore?** Click the AI orbs in the bottom corners to get started!
  `;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-white">
              <RocketIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">What's New</h2>
              <p className="text-xs text-gray-500">Version {currentVersion}</p>
            </div>
          </div>
          <button
            onClick={() => handleDismiss(true)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          >
            <Cross2Icon className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 mt-6">
                  {children}
                </h2>
              ),
              p: ({ children }) => (
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 mb-3 space-y-1">
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li className="ml-2">{children}</li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-gray-900 dark:text-gray-100">{children}</strong>
              ),
              code: ({ children }) => (
                <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">
                  {children}
                </code>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <button
            onClick={() => handleDismiss(false)}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            Remind me later
          </button>
          <button
            onClick={() => handleDismiss(true)}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-lg hover:shadow-lg transition-shadow text-sm font-medium"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
