/**
 * PLATFORM - API Usage
 */

'use client';

export default function UsagePage() {
  const recentSessions = [
    { user: 'Sarah Chen', page: 'KPI Dashboard', duration: '18m 32s', status: 'active', timestamp: '2m ago' },
    { user: 'Marcus Webb', page: 'Client Details', duration: '12m 14s', status: 'ended', timestamp: '5m ago' },
    { user: 'Emily Rodriguez', page: 'Proposals', duration: '24m 07s', status: 'active', timestamp: '8m ago' },
    { user: 'David Kim', page: 'Timesheets', duration: '9m 43s', status: 'ended', timestamp: '12m ago' },
    { user: 'Jennifer Walsh', page: 'Invoices', duration: '15m 28s', status: 'active', timestamp: '15m ago' },
    { user: 'Robert Taylor', page: 'Team Dashboard', duration: '7m 19s', status: 'ended', timestamp: '18m ago' },
    { user: 'Lisa Anderson', page: 'Engagements', duration: '21m 55s', status: 'active', timestamp: '22m ago' },
    { user: 'Michael Brooks', page: 'Health Monitor', duration: '11m 42s', status: 'ended', timestamp: '28m ago' },
  ];

  const pageViews = [
    { page: 'KPI Dashboard', views: 1247, uniqueUsers: 89, avgTime: '8m 12s' },
    { page: 'Client Details', views: 892, uniqueUsers: 67, avgTime: '12m 34s' },
    { page: 'Proposals', views: 743, uniqueUsers: 54, avgTime: '15m 42s' },
    { page: 'Timesheets', views: 687, uniqueUsers: 48, avgTime: '6m 28s' },
    { page: 'Invoices', views: 634, uniqueUsers: 42, avgTime: '9m 15s' },
    { page: 'Team Dashboard', views: 589, uniqueUsers: 41, avgTime: '7m 33s' },
    { page: 'Engagements', views: 521, uniqueUsers: 38, avgTime: '14m 21s' },
    { page: 'Health Monitor', views: 487, uniqueUsers: 35, avgTime: '10m 45s' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">API Usage</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">API usage monitoring and logs</p>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-3 mt-4">
          <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg p-3">
            <div className="text-xs text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-wide">Active Users</div>
            <div className="text-lg font-bold text-fuchsia-900 dark:text-fuchsia-100 mt-1">147</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
            <div className="text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wide">Sessions Today</div>
            <div className="text-lg font-bold text-purple-900 dark:text-purple-100 mt-1">1,834</div>
          </div>
          <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-3">
            <div className="text-xs text-pink-600 dark:text-pink-400 uppercase tracking-wide">Avg Session Time</div>
            <div className="text-lg font-bold text-pink-900 dark:text-pink-100 mt-1">12m 34s</div>
          </div>
          <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg p-3">
            <div className="text-xs text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-wide">Page Views</div>
            <div className="text-lg font-bold text-fuchsia-900 dark:text-fuchsia-100 mt-1">8,942</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-3">
            <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">API Usage</div>
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">78%</div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Recent Sessions */}
          <div className="card">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border-default">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Sessions</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Active and recent user sessions</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-dark-border-default">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">User</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Page</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Duration</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-border-default">
                  {recentSessions.map((session, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{session.user}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{session.page}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{session.duration}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          session.status === 'active' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                        }`}>
                          {session.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{session.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Page Views Breakdown */}
          <div className="card">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border-default">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Page Views Breakdown</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Most popular pages and engagement metrics</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-dark-border-default">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Page</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Total Views</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Unique Users</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Avg Time on Page</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-border-default">
                  {pageViews.map((page, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{page.page}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{page.views.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{page.uniqueUsers}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{page.avgTime}</td>
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
