/**
 * PROCESS - Document Library
 * Manage templates, contracts, proposals, and deliverable documents
 */

'use client';

const mockDocuments = [
  { name: 'Engagement Template - Standard', type: 'Template', size: '245 KB', modified: '2 days ago', category: 'Contracts' },
  { name: 'Phoenix Foundation - Proposal', type: 'Proposal', size: '1.2 MB', modified: '1 week ago', category: 'Sales' },
  { name: 'Impact Assessment Framework', type: 'Deliverable', size: '890 KB', modified: '3 days ago', category: 'Deliverables' },
  { name: 'SOW Template - Consulting', type: 'Template', size: '178 KB', modified: '1 month ago', category: 'Contracts' },
  { name: 'Hopewell Foundation - Final Report', type: 'Deliverable', size: '2.4 MB', modified: '5 days ago', category: 'Deliverables' },
];

export default function DocumentLibraryPage() {
  const stats = {
    total: 147,
    templates: 23,
    proposals: 18,
    deliverables: 89,
    recentUploads: 12,
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Document Library</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Templates, contracts, proposals, and deliverable documents
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-3 mt-4">
          <div className="bg-violet-50 dark:bg-violet-900/20 rounded-lg p-3">
            <div className="text-xs text-violet-600 dark:text-violet-400 uppercase tracking-wide">Total Documents</div>
            <div className="text-lg font-bold text-violet-900 dark:text-violet-100 mt-1">{stats.total}</div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
            <div className="text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wide">Templates</div>
            <div className="text-lg font-bold text-blue-900 dark:text-blue-100 mt-1">{stats.templates}</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
            <div className="text-xs text-green-600 dark:text-green-400 uppercase tracking-wide">Proposals</div>
            <div className="text-lg font-bold text-green-900 dark:text-green-100 mt-1">{stats.proposals}</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
            <div className="text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wide">Deliverables</div>
            <div className="text-lg font-bold text-purple-900 dark:text-purple-100 mt-1">{stats.deliverables}</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Recent (30d)</div>
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">{stats.recentUploads}</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Recent Documents */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Documents</h2>
              <button className="btn-primary text-sm">+ Upload Document</button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-dark-border-default">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Document Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Size</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Modified</th>
                </tr>
              </thead>
              <tbody>
                {mockDocuments.map((doc, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-100 dark:border-dark-border-default hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary cursor-pointer"
                  >
                    <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">{doc.name}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400">
                        {doc.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{doc.category}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{doc.size}</td>
                    <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-500">{doc.modified}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
