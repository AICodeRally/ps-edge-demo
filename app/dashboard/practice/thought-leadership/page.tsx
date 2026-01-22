/**
 * PRACTICE - Thought Leadership
 * Nonprofit sector insights, publications, and research
 */

'use client';

import { SetPageTitle } from '@/src/components/SetPageTitle';

export default function ThoughtLeadershipPage() {
  const publications = [
    { title: '2026 State of Nonprofit Fundraising Report', type: 'Annual Report', downloads: 2847, published: 'Jan 2026' },
    { title: 'AI Ethics in Nonprofit Governance', type: 'Whitepaper', downloads: 1523, published: 'Dec 2025', badge: 'NEW' },
    { title: 'Board Development Best Practices Guide', type: 'Guide', downloads: 3241, published: 'Nov 2025' },
    { title: 'Campaign Success Factors Analysis', type: 'Research', downloads: 1872, published: 'Oct 2025' },
    { title: 'Donor Retention Strategies for 2026', type: 'Whitepaper', downloads: 2156, published: 'Sep 2025' },
  ];

  return (
    <div className="h-full flex flex-col">
      <SetPageTitle title="Thought Leadership" />
      
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Thought Leadership</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Nonprofit sector insights, research, and publications
        </p>
        
        <div className="grid grid-cols-4 gap-3 mt-4">
          <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg p-3">
            <div className="text-xs text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-wide">Publications</div>
            <div className="text-lg font-bold text-fuchsia-900 dark:text-fuchsia-100 mt-1">23</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
            <div className="text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wide">Total Downloads</div>
            <div className="text-lg font-bold text-purple-900 dark:text-purple-100 mt-1">11.6K</div>
          </div>
          <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-3">
            <div className="text-xs text-pink-600 dark:text-pink-400 uppercase tracking-wide">This Year</div>
            <div className="text-lg font-bold text-pink-900 dark:text-pink-100 mt-1">5</div>
          </div>
          <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg p-3">
            <div className="text-xs text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-wide">Avg Downloads</div>
            <div className="text-lg font-bold text-fuchsia-900 dark:text-fuchsia-100 mt-1">504</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="card">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border-default">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Publications</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-dark-border-default">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Title</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Downloads</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Published</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-border-default">
                  {publications.map((pub, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                        <div className="flex items-center gap-2">
                          {pub.title}
                          {pub.badge && (
                            <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold rounded-full">
                              {pub.badge}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{pub.type}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{pub.downloads.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{pub.published}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
