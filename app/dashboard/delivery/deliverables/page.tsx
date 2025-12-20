/**
 * Delivery - Deliverables Tracker
 * Monitor project deliverables and completion status
 */

'use client';

const deliverables = [
  { id: 'DEL-089', engagement: 'Capital Campaign Strategy', client: 'Hopewell Community', deliverable: 'Campaign Plan Document', dueDate: '2025-01-25', status: 'Completed', completion: 100, owner: 'Sarah Mitchell' },
  { id: 'DEL-090', engagement: 'Strategic Planning', client: 'Education Excellence', deliverable: '5-Year Strategic Plan', dueDate: '2025-02-10', status: 'In Progress', completion: 75, owner: 'Michael Chen' },
  { id: 'DEL-091', engagement: 'Board Development', client: 'Community Arts', deliverable: 'Board Training Materials', dueDate: '2025-01-30', status: 'In Progress', completion: 60, owner: 'Jennifer Martinez' },
  { id: 'DEL-092', engagement: 'Grant Writing Workshop', client: 'Heritage Preservation', deliverable: 'Workshop Slides & Handouts', dueDate: '2025-02-05', status: 'In Progress', completion: 85, owner: 'David Thompson' },
  { id: 'DEL-093', engagement: 'Fundraising Strategy', client: 'Youth Development', deliverable: 'Donor Cultivation Plan', dueDate: '2025-02-15', status: 'Not Started', completion: 0, owner: 'Lisa Anderson' },
  { id: 'DEL-094', engagement: 'Feasibility Study', client: 'Animal Rescue', deliverable: 'Feasibility Report', dueDate: '2025-01-28', status: 'Completed', completion: 100, owner: 'Emily Davis' },
  { id: 'DEL-095', engagement: 'Training Workshop', client: 'Homeless Outreach', deliverable: 'Training Curriculum', dueDate: '2025-01-22', status: 'Overdue', completion: 45, owner: 'Amanda Brown' },
];

const statusColors = {
  'Completed': 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
  'In Progress': 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
  'Not Started': 'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400',
  'Overdue': 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400',
};

export default function DeliverablesPage() {
  const completed = deliverables.filter(d => d.status === 'Completed').length;
  const overdue = deliverables.filter(d => d.status === 'Overdue').length;
  const avgCompletion = Math.round(deliverables.reduce((sum, d) => sum + d.completion, 0) / deliverables.length);
  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Deliverables Tracker</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Monitor project deliverables and completion status</p>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Deliverables</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{deliverables.length}</div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Completed</div>
              <div className="text-3xl font-bold text-green-600">{completed}</div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Overdue</div>
              <div className="text-3xl font-bold text-red-600">{overdue}</div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Completion</div>
              <div className="text-3xl font-bold text-blue-600">{avgCompletion}%</div>
            </div>
          </div>
          <div className="card p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-dark-border-default">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Deliverable</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Client</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Owner</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Due Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Progress</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Status</th>
                </tr>
              </thead>
              <tbody>
                {deliverables.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 dark:border-dark-border-default hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">{item.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">{item.deliverable}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{item.client}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{item.owner}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{item.dueDate}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-dark-bg-tertiary rounded-full overflow-hidden w-20">
                          <div className={`h-full ${item.completion === 100 ? 'bg-green-500' : item.completion >= 50 ? 'bg-blue-500' : 'bg-yellow-500'}`} style={{ width: `${item.completion}%` }} />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{item.completion}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusColors[item.status as keyof typeof statusColors]}`}>{item.status}</span>
                    </td>
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
