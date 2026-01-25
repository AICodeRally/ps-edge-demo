'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, Cross2Icon, GearIcon } from '@radix-ui/react-icons';

interface CommandItem {
  id: string;
  label: string;
  description: string;
  href: string;
  category: string;
  icon?: string;
}

/**
 * CommandPalette - Global search and navigation (Cmd+K)
 *
 * Features:
 * - Quick page navigation
 * - 6 P's shortcuts
 * - Settings access
 * - Keyboard shortcuts (Cmd+K to open, Esc to close, arrows to navigate)
 */
export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // All available commands
  const allCommands: CommandItem[] = [
    // 6 P's
    { id: 'people', label: 'People', description: 'Team capacity and utilization', href: '/dashboard/people', category: '6 Ps' },
    { id: 'process', label: 'Process', description: 'Workflows and deliverables', href: '/dashboard/process', category: '6 Ps' },
    { id: 'platform', label: 'Platform', description: 'Technology and tools', href: '/dashboard/platform', category: '6 Ps' },
    { id: 'performance', label: 'Performance', description: 'KPIs and outcomes', href: '/dashboard/performance', category: '6 Ps' },
    { id: 'profit', label: 'Profit', description: 'Revenue and margins', href: '/dashboard/profit', category: '6 Ps' },
    { id: 'purpose', label: 'Purpose', description: 'Mission and impact', href: '/dashboard/purpose', category: '6 Ps' },

    // People
    { id: 'team', label: 'Team Members', description: 'View all consultants', href: '/dashboard/people/team', category: 'People' },
    { id: 'capacity', label: 'Capacity Planning', description: 'Resource allocation', href: '/dashboard/people/capacity', category: 'People' },
    { id: 'onboarding', label: 'Onboarding', description: 'New client onboarding', href: '/dashboard/people/onboarding', category: 'People' },

    // Process
    { id: 'engagements', label: 'Engagements', description: 'Active client projects', href: '/dashboard/process/engagements', category: 'Process' },
    { id: 'deliverables', label: 'Deliverables', description: 'Project outputs', href: '/dashboard/process/deliverables', category: 'Process' },
    { id: 'support', label: 'Support Tickets', description: 'Client support', href: '/dashboard/process/support', category: 'Process' },
    { id: 'documents', label: 'Documents', description: 'Templates and files', href: '/dashboard/process/documents', category: 'Process' },
    { id: 'knowledge', label: 'Knowledge Base', description: 'Documentation', href: '/dashboard/process/knowledge', category: 'Process' },

    // Practice
    { id: 'ai-features', label: 'AI Features', description: 'Configure AI orbs', href: '/dashboard/settings/ai', category: 'Settings' },
    { id: 'integrations', label: 'Integrations', description: 'Connected services', href: '/dashboard/practice/integrations', category: 'Practice' },
    { id: 'tenants', label: 'Tenants', description: 'Client organizations', href: '/dashboard/practice/tenants', category: 'Practice' },

    // Settings
    { id: 'settings', label: 'Settings', description: 'System configuration', href: '/dashboard/settings', category: 'Settings' },
    { id: 'profile', label: 'Profile', description: 'Your account', href: '/dashboard/settings/profile', category: 'Settings' },
    { id: 'brand', label: 'Brand Settings', description: 'Customize colors', href: '/dashboard/settings/brand', category: 'Settings' },
  ];

  // Filter commands based on search
  const filteredCommands = search.trim() === ''
    ? allCommands
    : allCommands.filter((cmd) =>
        cmd.label.toLowerCase().includes(search.toLowerCase()) ||
        cmd.description.toLowerCase().includes(search.toLowerCase()) ||
        cmd.category.toLowerCase().includes(search.toLowerCase())
      );

  // Group by category
  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }

      // Esc to close
      if (e.key === 'Escape') {
        setIsOpen(false);
      }

      // Arrow navigation
      if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1));
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            handleSelect(filteredCommands[selectedIndex]);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Reset selection when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const handleSelect = (command: CommandItem) => {
    router.push(command.href);
    setIsOpen(false);
    setSearch('');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search pages, settings, or type a command..."
            className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          >
            <Cross2Icon className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto p-2">
          {Object.keys(groupedCommands).length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No results found for "{search}"
            </div>
          ) : (
            Object.entries(groupedCommands).map(([category, commands]) => (
              <div key={category} className="mb-4 last:mb-0">
                <div className="px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {category}
                </div>
                {commands.map((cmd, idx) => {
                  const globalIndex = filteredCommands.indexOf(cmd);
                  const isSelected = globalIndex === selectedIndex;

                  return (
                    <button
                      key={cmd.id}
                      onClick={() => handleSelect(cmd)}
                      onMouseEnter={() => setSelectedIndex(globalIndex)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-left transition-colors ${
                        isSelected
                          ? 'bg-gradient-to-r from-purple-100 to-fuchsia-100 dark:from-purple-900/30 dark:to-fuchsia-900/30'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {cmd.label}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {cmd.description}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="text-xs text-gray-400">↵</div>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
              ⌘K
            </kbd>
            <span>to open</span>
          </div>
        </div>
      </div>
    </div>
  );
}
