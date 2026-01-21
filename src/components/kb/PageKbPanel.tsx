'use client';

import { useState } from 'react';
import { QuestionMarkCircledIcon, Cross2Icon, ReloadIcon } from '@radix-ui/react-icons';
import { usePageKb } from './PageKbProvider';
import ReactMarkdown from 'react-markdown';

interface PageKbPanelProps {
  enabled?: boolean;
}

/**
 * PageKbPanel - Context-aware page documentation
 *
 * Displays help content specific to the current page:
 * - Auto-loads KB content on navigation
 * - Markdown-formatted documentation
 * - Page metadata (owner, last updated, tags)
 * - Quick links to related pages
 *
 * Content structure: /kb/pages/{pathname}.md
 *
 * Position: Bottom-left (position 3)
 */
export function PageKbPanel({ enabled = true }: PageKbPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { kbContent, isLoading, error, refreshKb } = usePageKb();

  if (!enabled) return null;

  return (
    <>
      {/* Orb Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-36 z-40 w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center text-white"
        style={{
          background: 'linear-gradient(135deg, #c026d3, #db2777)',
        }}
        title="Page Knowledge Base"
      >
        <QuestionMarkCircledIcon className="w-6 h-6" />
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-20 left-36 z-50 w-[500px] bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[600px] flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900 dark:text-gray-100">Page Help</h3>
                {kbContent?.title && (
                  <span className="text-xs text-gray-500">• {kbContent.title}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={refreshKb}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                  title="Refresh"
                >
                  <ReloadIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                >
                  <Cross2Icon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Metadata */}
            {kbContent && (
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                {kbContent.owner && (
                  <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">
                    Owner: {kbContent.owner}
                  </span>
                )}
                {kbContent.lastUpdated && (
                  <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">
                    Updated: {new Date(kbContent.lastUpdated).toLocaleDateString()}
                  </span>
                )}
              </div>
            )}
            {kbContent?.tags && kbContent.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {kbContent.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 text-xs bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {isLoading ? (
              <div className="text-center text-gray-500 py-8">
                <ReloadIcon className="w-8 h-8 mx-auto mb-2 animate-spin" />
                <p>Loading page help...</p>
              </div>
            ) : error ? (
              <div className="text-center text-red-600 py-8">
                <p>Failed to load help content</p>
                <p className="text-sm mt-2">{error}</p>
                <button
                  onClick={refreshKb}
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded hover:shadow-lg transition-shadow"
                >
                  Retry
                </button>
              </div>
            ) : kbContent ? (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {kbContent.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-4">
                    {kbContent.description}
                  </p>
                )}
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 mt-4">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2 mt-3">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 mb-2">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside text-sm text-gray-700 dark:text-gray-300 mb-2">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="mb-1">{children}</li>
                    ),
                    code: ({ children }) => (
                      <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-x-auto mb-2">
                        {children}
                      </pre>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className="text-purple-600 dark:text-purple-400 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {kbContent.content}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <QuestionMarkCircledIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No help content available</p>
                <p className="text-xs mt-1">Documentation is being prepared for this page.</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 text-center">
            Context-aware page help
          </div>
        </div>
      )}
    </>
  );
}
