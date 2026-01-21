/**
 * PROCESS - Knowledge Library
 * Methodologies, playbooks, best practices, and onboarding resources
 * Content migrated from operations/knowledge
 */

'use client';

export default function KnowledgeLibraryPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Knowledge Library</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Methodologies, playbooks, best practices, and learning resources</p>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-3 mt-4">
          <div className="bg-violet-50 dark:bg-violet-900/20 rounded-lg p-3">
            <div className="text-xs text-violet-600 dark:text-violet-400 uppercase tracking-wide">Total Articles</div>
            <div className="text-lg font-bold text-violet-900 dark:text-violet-100 mt-1">247</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
            <div className="text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wide">Categories</div>
            <div className="text-lg font-bold text-purple-900 dark:text-purple-100 mt-1">12</div>
          </div>
          <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg p-3">
            <div className="text-xs text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-wide">Page Views (30d)</div>
            <div className="text-lg font-bold text-fuchsia-900 dark:text-fuchsia-100 mt-1">8,429</div>
          </div>
          <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-3">
            <div className="text-xs text-pink-600 dark:text-pink-400 uppercase tracking-wide">Avg Rating</div>
            <div className="text-lg font-bold text-pink-900 dark:text-pink-100 mt-1">4.6/5</div>
          </div>
          <div className="bg-violet-50 dark:bg-violet-900/20 rounded-lg p-3">
            <div className="text-xs text-violet-600 dark:text-violet-400 uppercase tracking-wide">Recent Updates</div>
            <div className="text-lg font-bold text-violet-900 dark:text-violet-100 mt-1">23</div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="card p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">🚧 Page Migration in Progress</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This page is being migrated to the PROCESS section.
            </p>
            <p className="text-sm text-gray-500">
              Full content from operations/knowledge will be available soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
