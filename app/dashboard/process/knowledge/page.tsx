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
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Knowledge Base Categories */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Knowledge Base Categories</h2>
              <button className="btn-primary text-sm">+ New Article</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Methodologies', count: 34, color: 'violet' },
                { name: 'Playbooks', count: 28, color: 'purple' },
                { name: 'Best Practices', count: 56, color: 'fuchsia' },
                { name: 'Templates', count: 42, color: 'pink' },
                { name: 'Onboarding', count: 23, color: 'violet' },
                { name: 'Training', count: 31, color: 'purple' },
                { name: 'Case Studies', count: 19, color: 'fuchsia' },
                { name: 'FAQs', count: 14, color: 'pink' },
              ].map((category) => (
                <div
                  key={category.name}
                  className={`p-4 rounded-lg border-2 border-${category.color}-200 dark:border-${category.color}-800 bg-${category.color}-50 dark:bg-${category.color}-900/20 hover:shadow-md transition-all cursor-pointer`}
                >
                  <h3 className={`font-semibold text-${category.color}-900 dark:text-${category.color}-100 mb-1`}>
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{category.count} articles</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Articles */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Articles</h2>
            <div className="space-y-3">
              {[
                { title: 'Strategic Planning Framework 2026', category: 'Methodologies', views: 342, updated: '2 days ago' },
                { title: 'Client Onboarding Playbook', category: 'Playbooks', views: 287, updated: '5 days ago' },
                { title: 'Effective Donor Engagement', category: 'Best Practices', views: 234, updated: '1 week ago' },
                { title: 'Proposal Template - Strategic', category: 'Templates', views: 198, updated: '1 week ago' },
                { title: 'New Consultant Orientation', category: 'Onboarding', views: 156, updated: '2 weeks ago' },
              ].map((article, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary cursor-pointer"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{article.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="px-2 py-0.5 rounded text-xs bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400">
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-500">{article.views} views</span>
                      <span className="text-xs text-gray-500">Updated {article.updated}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
