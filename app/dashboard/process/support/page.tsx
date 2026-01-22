/**
 * PROCESS - Support Tickets
 * Manage client support requests and issue resolution
 */

'use client';

const tickets = [
  { id: 'SUP-145', client: 'Education Excellence', subject: 'Grant report export error', priority: 'High', status: 'Open', age: '2h' },
  { id: 'SUP-144', client: 'Hopewell Community', subject: 'User permission question', priority: 'Low', status: 'Resolved', age: '1d' },
  { id: 'SUP-143', client: 'Environmental Action', subject: 'Cannot access dashboard', priority: 'Critical', status: 'In Progress', age: '4h' },
  { id: 'SUP-142', client: 'Community Arts', subject: 'Volunteer CSV import failing', priority: 'Medium', status: 'Open', age: '6h' },
  { id: 'SUP-141', client: 'Seniors Support', subject: 'Training request for new staff', priority: 'Low', status: 'Scheduled', age: '2d' },
  { id: 'SUP-140', client: 'Youth Development', subject: 'Donor deduplication help', priority: 'Medium', status: 'Resolved', age: '3d' },
];

const priorityColors = {
  Critical: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400',
  High: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
  Medium: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
  Low: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
};

const statusColors = {
  Open: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
  'In Progress': 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
  Scheduled: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
  Resolved: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
};

export default function SupportPage() {
  const openTickets = tickets.filter(t => t.status !== 'Resolved').length;
  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Support Tickets</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage client support requests</p>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Open Tickets</div>
              <div className="text-3xl font-bold text-yellow-600">{openTickets}</div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Resolved Today</div>
              <div className="text-3xl font-bold text-green-600">2</div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Response Time</div>
              <div className="text-3xl font-bold text-blue-600">1.2h</div>
            </div>
          </div>
          <div className="card p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-dark-border-default">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Ticket ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Client</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Subject</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Priority</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Age</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-gray-100 dark:border-dark-border-default hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">{ticket.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">{ticket.client}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{ticket.subject}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${priorityColors[ticket.priority as keyof typeof priorityColors]}`}>{ticket.priority}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusColors[ticket.status as keyof typeof statusColors]}`}>{ticket.status}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{ticket.age}</td>
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
