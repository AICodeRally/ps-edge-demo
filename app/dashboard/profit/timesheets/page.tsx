/**
 * PROFIT - Timesheets
 */

'use client';

export default function TimesheetsPage() {
  const timesheets = [
    { consultant: 'Sarah Chen', client: 'Global Giving Foundation', project: 'CRM Migration', hours: 32.5, billableHours: 32.5, status: 'Approved', week: 'Week of Jan 13' },
    { consultant: 'Marcus Webb', client: 'Community Impact Network', project: 'Strategic Planning', hours: 28.0, billableHours: 28.0, status: 'Approved', week: 'Week of Jan 13' },
    { consultant: 'Emily Rodriguez', client: 'Phoenix Philanthropy Group', project: 'Internal - Admin', hours: 40.0, billableHours: 0.0, status: 'Approved', week: 'Week of Jan 13' },
    { consultant: 'David Kim', client: 'Youth Development Alliance', project: 'Program Evaluation', hours: 35.5, billableHours: 35.5, status: 'Pending', week: 'Week of Jan 13' },
    { consultant: 'Jennifer Walsh', client: 'Education First Collaborative', project: 'Data Analytics', hours: 30.0, billableHours: 30.0, status: 'Pending', week: 'Week of Jan 13' },
    { consultant: 'Robert Taylor', client: 'Health Access Partners', project: 'Process Optimization', hours: 25.5, billableHours: 25.5, status: 'Approved', week: 'Week of Jan 13' },
    { consultant: 'Lisa Anderson', client: 'Global Giving Foundation', project: 'Change Management', hours: 38.0, billableHours: 38.0, status: 'Approved', week: 'Week of Jan 13' },
    { consultant: 'Michael Brooks', client: 'Community Impact Network', project: 'Tech Implementation', hours: 42.5, billableHours: 40.0, status: 'Pending', week: 'Week of Jan 13' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Timesheets</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Time tracking and billable hours</p>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-3 mt-4">
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
            <div className="text-xs text-orange-600 dark:text-orange-400 uppercase tracking-wide">Total Hours</div>
            <div className="text-lg font-bold text-orange-900 dark:text-orange-100 mt-1">2,847</div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3">
            <div className="text-xs text-amber-600 dark:text-amber-400 uppercase tracking-wide">Billable Hours</div>
            <div className="text-lg font-bold text-amber-900 dark:text-amber-100 mt-1">2,341</div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
            <div className="text-xs text-yellow-600 dark:text-yellow-400 uppercase tracking-wide">Non-Billable</div>
            <div className="text-lg font-bold text-yellow-900 dark:text-yellow-100 mt-1">506</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
            <div className="text-xs text-green-600 dark:text-green-400 uppercase tracking-wide">Utilization %</div>
            <div className="text-lg font-bold text-green-900 dark:text-green-100 mt-1">82.2%</div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
            <div className="text-xs text-orange-600 dark:text-orange-400 uppercase tracking-wide">Pending Approval</div>
            <div className="text-lg font-bold text-orange-900 dark:text-orange-100 mt-1">147</div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="card">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border-default">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Timesheet Entries</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Recent timesheet submissions and approvals</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-dark-border-default">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Consultant</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Client</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Project</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Total Hours</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Billable</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Period</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-border-default">
                  {timesheets.map((entry, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{entry.consultant}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{entry.client}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{entry.project}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{entry.hours}h</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{entry.billableHours}h</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          entry.status === 'Approved' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                        }`}>
                          {entry.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{entry.week}</td>
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
