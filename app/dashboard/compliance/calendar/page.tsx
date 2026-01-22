'use client';

export default function FilingCalendarPage() {
  const deadlines = [
    { date: '2025-02-15', item: 'Q4 Board Meeting Minutes', type: 'Internal' },
    { date: '2025-02-28', item: 'Grant Report - Foundation ABC', type: 'Grant' },
    { date: '2025-03-01', item: 'State Charitable Registration Renewal', type: 'State' },
    { date: '2025-05-15', item: 'IRS Form 990', type: 'Federal' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Filing Calendar</h1>
        <p className="text-gray-600 dark:text-gray-400">Track upcoming deadlines and due dates</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Upcoming Deadlines</h3>
        <div className="space-y-4">
          {deadlines.map((deadline, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-gray-100">{deadline.item}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Due: {new Date(deadline.date).toLocaleDateString()}</p>
              </div>
              <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                {deadline.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
